import React from 'react';
import { Lightbulb, AlertCircle, CheckCircle, ArrowRight } from 'lucide-react';
import { AnalysisResult } from '../lib/analysis';

interface InsightPanelProps {
  data: AnalysisResult;
}

export const InsightPanel: React.FC<InsightPanelProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
      <div className="bg-zinc-50 border-b border-zinc-200 px-6 py-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-zinc-900 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-amber-500" />
          AI 洞察与运营建议
        </h2>
        <span className="text-xs font-medium text-zinc-500 bg-white px-2 py-1 rounded border border-zinc-200 uppercase">
          自动生成报告
        </span>
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Pain Points */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-rose-600 flex items-center gap-2 uppercase tracking-tight">
            <AlertCircle className="w-4 h-4" />
            核心痛点 (Pain Points)
          </h3>
          <ul className="space-y-3">
            {data.insights.main_pain_points.map((point, i) => (
              <li key={i} className="flex gap-3 text-sm text-zinc-600 leading-relaxed">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center text-[10px] font-bold mt-0.5">
                  {i + 1}
                </span>
                {point}
              </li>
            ))}
          </ul>
        </div>

        {/* Positive Points */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-emerald-600 flex items-center gap-2 uppercase tracking-tight">
            <CheckCircle className="w-4 h-4" />
            核心亮点 (Highlights)
          </h3>
          <ul className="space-y-3">
            {data.insights.main_positive_points.map((point, i) => (
              <li key={i} className="flex gap-3 text-sm text-zinc-600 leading-relaxed">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-[10px] font-bold mt-0.5">
                  {i + 1}
                </span>
                {point}
              </li>
            ))}
          </ul>
        </div>

        {/* Suggestions */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-indigo-600 flex items-center gap-2 uppercase tracking-tight">
            <TrendingUpIcon className="w-4 h-4" />
            运营建议 (Actionable Advice)
          </h3>
          <div className="space-y-3">
            {data.insights.operation_suggestions.map((suggestion, i) => (
              <div key={i} className="p-3 bg-indigo-50/50 rounded-xl border border-indigo-100 group hover:bg-indigo-50 transition-colors">
                <p className="text-sm text-indigo-900 font-medium flex items-start gap-2">
                  <ArrowRight className="w-3.5 h-3.5 mt-1 flex-shrink-0 text-indigo-400 group-hover:translate-x-1 transition-transform" />
                  {suggestion}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-6 py-4 bg-zinc-50 border-t border-zinc-200 flex justify-between items-center">
        <div className="flex gap-2">
          {data.top_keywords.slice(0, 5).map(kw => (
            <span key={kw} className="text-[10px] font-bold text-zinc-500 bg-white border border-zinc-200 px-2 py-0.5 rounded-full uppercase">
              #{kw}
            </span>
          ))}
        </div>
        <p className="text-[10px] text-zinc-400 font-medium uppercase">InsightFlow AI Engine v1.0</p>
      </div>
    </div>
  );
};

const TrendingUpIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);
