import React from 'react';
import { MessageSquare, Smile, Frown, Tag, Target, TrendingUp } from 'lucide-react';
import { AnalysisResult } from '../lib/analysis';

interface SummaryCardsProps {
  data: AnalysisResult;
}

export const SummaryCards: React.FC<SummaryCardsProps> = ({ data }) => {
  const posRate = Math.round((Number(data.sentiment_distribution.positive) / Number(data.total_comments)) * 100);
  const negRate = Math.round((Number(data.sentiment_distribution.negative) / Number(data.total_comments)) * 100);
  
  const mainCategory = Object.entries(data.category_distribution)
    .sort((a, b) => Number(b[1]) - Number(a[1]))[0]?.[0] || 'N/A';

  const cards = [
    {
      label: '总评论数',
      value: data.total_comments,
      icon: MessageSquare,
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    {
      label: '正向占比',
      value: `${posRate}%`,
      icon: Smile,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50'
    },
    {
      label: '负向占比',
      value: `${negRate}%`,
      icon: Frown,
      color: 'text-rose-600',
      bg: 'bg-rose-50'
    },
    {
      label: '主要问题',
      value: mainCategory,
      icon: Tag,
      color: 'text-amber-600',
      bg: 'bg-amber-50'
    },
    {
      label: '核心主题',
      value: data.top_keywords[0] || 'N/A',
      icon: Target,
      color: 'text-indigo-600',
      bg: 'bg-indigo-50'
    },
    {
      label: '关键词数',
      value: data.top_keywords.length,
      icon: TrendingUp,
      color: 'text-purple-600',
      bg: 'bg-purple-50'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {cards.map((card, i) => (
        <div 
          key={i} 
          className="bg-white p-4 rounded-2xl border border-zinc-200 shadow-sm flex flex-col gap-3"
        >
          <div className={`${card.bg} ${card.color} w-10 h-10 rounded-xl flex items-center justify-center`}>
            <card.icon className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-1">{card.label}</p>
            <p className="text-xl font-bold text-zinc-900 truncate">{card.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
