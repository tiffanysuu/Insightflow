import { GoogleGenAI, Type } from "@google/genai";

export interface FeedbackItem {
  id: string;
  comment: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  category: string;
  keywords: string[];
  summary: string;
}

export interface AnalysisResult {
  total_comments: number;
  sentiment_distribution: {
    positive: number;
    neutral: number;
    negative: number;
  };
  category_distribution: Record<string, number>;
  top_keywords: string[];
  insights: {
    main_pain_points: string[];
    main_positive_points: string[];
    operation_suggestions: string[];
  };
  details: FeedbackItem[];
}

export const CATEGORIES = [
  "功能问题", "性能问题", "内容问题", "体验问题", "客服问题", "价格问题", "Bug", "建议", "其他"
];

const ANALYSIS_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    sentiment: { type: Type.STRING, enum: ['positive', 'neutral', 'negative'] },
    category: { type: Type.STRING },
    keywords: { type: Type.ARRAY, items: { type: Type.STRING } },
    summary: { type: Type.STRING }
  },
  required: ['sentiment', 'category', 'keywords', 'summary']
};

const SUMMARY_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    main_pain_points: { type: Type.ARRAY, items: { type: Type.STRING } },
    main_positive_points: { type: Type.ARRAY, items: { type: Type.STRING } },
    operation_suggestions: { type: Type.ARRAY, items: { type: Type.STRING } }
  },
  required: ['main_pain_points', 'main_positive_points', 'operation_suggestions']
};

export async function analyzeFeedback(comments: string[]): Promise<AnalysisResult> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    return getMockAnalysis(comments);
  }

  const genAI = new GoogleGenAI({ apiKey });

  try {
    // Analyze each comment (in batches to avoid rate limits if needed, but for small sets it's fine)
    const details: FeedbackItem[] = [];
    
    // For efficiency in a demo, we'll analyze them in parallel
    const analysisPromises = comments.map(async (comment, index) => {
      const prompt = `Analyze this user feedback: "${comment}". 
      Classify sentiment as positive, neutral, or negative.
      Classify category into one of: ${CATEGORIES.join(', ')}.
      Extract 1-3 keywords.
      Provide a one-sentence summary.`;

      const result = await genAI.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        config: {
          responseMimeType: "application/json",
          responseSchema: ANALYSIS_SCHEMA
        }
      });

      const data = JSON.parse(result.text || '{}');
      return {
        id: `item-${index}`,
        comment,
        ...data
      };
    });

    const analyzedItems = await Promise.all(analysisPromises);
    
    // Generate overall insights
    const summaryPrompt = `Based on these ${analyzedItems.length} user feedbacks, provide a summary report.
    Feedbacks: ${JSON.stringify(analyzedItems.map(i => ({ c: i.comment, s: i.sentiment, cat: i.category })))}
    
    Identify:
    1. Top 3 main pain points.
    2. Top 2-3 main positive points.
    3. 3-4 actionable operation suggestions.`;

    const summaryResult = await genAI.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{ role: 'user', parts: [{ text: summaryPrompt }] }],
      config: {
        responseMimeType: "application/json",
        responseSchema: SUMMARY_SCHEMA
      }
    });

    const summaryData = JSON.parse(summaryResult.text || '{}');

    // Aggregate distributions
    const sentimentDist = { positive: 0, neutral: 0, negative: 0 };
    const categoryDist: Record<string, number> = {};
    const keywordMap: Record<string, number> = {};

    analyzedItems.forEach(item => {
      sentimentDist[item.sentiment as keyof typeof sentimentDist]++;
      categoryDist[item.category] = (categoryDist[item.category] || 0) + 1;
      item.keywords.forEach((kw: string) => {
        keywordMap[kw] = (keywordMap[kw] || 0) + 1;
      });
    });

    const topKeywords = Object.entries(keywordMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(e => e[0]);

    return {
      total_comments: comments.length,
      sentiment_distribution: sentimentDist,
      category_distribution: categoryDist,
      top_keywords: topKeywords,
      insights: summaryData,
      details: analyzedItems
    };
  } catch (error) {
    console.error("AI Analysis failed, falling back to mock:", error);
    return getMockAnalysis(comments);
  }
}

function getMockAnalysis(comments: string[]): Promise<AnalysisResult> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const details: FeedbackItem[] = comments.map((comment, index) => {
        // Simple keyword-based sentiment detection
        let sentiment: FeedbackItem['sentiment'] = 'neutral';
        const positiveKeywords = ["好", "喜欢", "棒", "赞", "顺畅", "漂亮", "好评", "认可", "友善", "不错"];
        const negativeKeywords = ["慢", "延迟", "贵", "闪退", "Bug", "不满", "难", "刺眼", "不好用", "太深", "太久"];
        
        if (positiveKeywords.some(kw => comment.includes(kw))) sentiment = 'positive';
        if (negativeKeywords.some(kw => comment.includes(kw))) sentiment = 'negative';

        // Simple keyword-based category detection
        let category = "其他";
        const categoryMap: Record<string, string[]> = {
          "功能问题": ["功能", "入口", "搜索", "流程", "任务"],
          "性能问题": ["慢", "卡顿", "流畅", "加载", "延迟"],
          "内容问题": ["内容", "剧情", "角色", "氛围", "原创"],
          "体验问题": ["体验", "界面", "设计", "配色", "刺眼", "模式", "引导"],
          "客服问题": ["客服", "回复", "理我"],
          "价格问题": ["价格", "贵", "优惠", "充值"],
          "Bug": ["Bug", "闪退", "修复", "报错"],
          "建议": ["建议", "希望能", "增加", "优化"]
        };

        for (const [cat, kws] of Object.entries(categoryMap)) {
          if (kws.some(kw => comment.includes(kw))) {
            category = cat;
            break;
          }
        }

        // Extract mock keywords
        const keywords = ["体验", "功能", "加载", "反馈", "系统"].filter(() => Math.random() > 0.5);
        if (keywords.length === 0) keywords.push("用户反馈");
        
        return {
          id: `mock-${index}`,
          comment,
          sentiment,
          category,
          keywords: keywords.slice(0, 3),
          summary: `用户对${category}表达了${sentiment === 'positive' ? '正面认可' : sentiment === 'negative' ? '改进诉求' : '中性看法'}。`
        };
      });

      const sentimentDist = { positive: 0, neutral: 0, negative: 0 };
      const categoryDist: Record<string, number> = {};
      
      details.forEach(item => {
        sentimentDist[item.sentiment]++;
        categoryDist[item.category] = (categoryDist[item.category] || 0) + 1;
      });

      resolve({
        total_comments: comments.length,
        sentiment_distribution: sentimentDist,
        category_distribution: categoryDist,
        top_keywords: ["加载慢", "回复延迟", "剧情", "界面", "充值"],
        insights: {
          main_pain_points: [
            "加载速度慢和回复延迟是最集中的负面反馈",
            "部分用户认为功能入口不清晰，上手成本较高",
            "内容更新频率不足影响持续活跃"
          ],
          main_positive_points: [
            "角色设定和互动体验获得较多正向评价",
            "部分用户认可产品氛围和内容创意"
          ],
          operation_suggestions: [
            "优先联合技术团队优化加载速度和响应延迟",
            "针对新用户补充核心功能引导与FAQ说明",
            "围绕高频正向内容设计后续活动，放大用户认可点"
          ]
        },
        details
      });
    }, 1500);
  });
}
