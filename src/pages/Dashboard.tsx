import React, { useState } from 'react';
import { LayoutPanelLeft, RefreshCw, Download } from 'lucide-react';
import { UploadPanel } from '../components/UploadPanel';
import { SummaryCards } from '../components/SummaryCards';
import { Charts } from '../components/Charts';
import { InsightPanel } from '../components/InsightPanel';
import { CommentsTable } from '../components/CommentsTable';
import { analyzeFeedback, AnalysisResult } from '../lib/analysis';
import { motion, AnimatePresence } from 'motion/react';

export const Dashboard: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleAnalyze = async (comments: string[]) => {
    setIsLoading(true);
    try {
      const data = await analyzeFeedback(comments);
      setResult(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-zinc-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-zinc-200 px-4 py-8 mb-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-zinc-900 flex items-center gap-2">
              <LayoutPanelLeft className="w-6 h-6 text-indigo-600" />
              分析控制台
            </h1>
            <p className="text-zinc-500 text-sm mt-1">上传用户反馈，获取 AI 深度洞察报告</p>
          </div>
          
          {result && (
            <div className="flex gap-3">
              <button 
                onClick={handleReset}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-zinc-200 rounded-xl text-sm font-semibold text-zinc-600 hover:bg-zinc-50 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                重新分析
              </button>
              <button 
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-sm"
              >
                <Download className="w-4 h-4" />
                导出报告
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Input Panel */}
          <div className="lg:col-span-4">
            <UploadPanel onAnalyze={handleAnalyze} isLoading={isLoading} />
          </div>

          {/* Right: Results */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {!result && !isLoading ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full min-h-[400px] flex flex-col items-center justify-center bg-white rounded-2xl border border-zinc-200 border-dashed p-12 text-center"
                >
                  <div className="w-16 h-16 bg-zinc-50 rounded-full flex items-center justify-center mb-6">
                    <LayoutPanelLeft className="w-8 h-8 text-zinc-300" />
                  </div>
                  <h3 className="text-lg font-bold text-zinc-900 mb-2">暂无分析数据</h3>
                  <p className="text-zinc-500 max-w-xs mx-auto">
                    请在左侧面板输入评论或上传 CSV 文件，点击“开始分析”按钮启动 AI 引擎。
                  </p>
                </motion.div>
              ) : isLoading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full min-h-[400px] flex flex-col items-center justify-center bg-white rounded-2xl border border-zinc-200 p-12 text-center"
                >
                  <div className="relative w-20 h-20 mb-8">
                    <div className="absolute inset-0 border-4 border-indigo-100 rounded-full" />
                    <div className="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin" />
                    <SparklesIcon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-indigo-600" />
                  </div>
                  <h3 className="text-xl font-bold text-zinc-900 mb-2">AI 正在深度分析中...</h3>
                  <p className="text-zinc-500 animate-pulse">正在识别情绪、提取关键词并生成运营建议</p>
                </motion.div>
              ) : (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-8"
                >
                  <SummaryCards data={result} />
                  <Charts data={result} />
                  <InsightPanel data={result} />
                  <CommentsTable items={result.details} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

const SparklesIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);
