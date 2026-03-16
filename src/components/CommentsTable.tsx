import React, { useState } from 'react';
import { Search, Filter, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { FeedbackItem } from '../lib/analysis';
import { cn } from '../lib/utils';

interface CommentsTableProps {
  items: FeedbackItem[];
}

export const CommentsTable: React.FC<CommentsTableProps> = ({ items }) => {
  const [search, setSearch] = useState('');
  const [sentimentFilter, setSentimentFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const filtered = items.filter(item => {
    const matchesSearch = item.comment.toLowerCase().includes(search.toLowerCase()) || 
                         item.summary.toLowerCase().includes(search.toLowerCase());
    const matchesSentiment = sentimentFilter === 'all' || item.sentiment === sentimentFilter;
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    return matchesSearch && matchesSentiment && matchesCategory;
  });

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const categories = Array.from(new Set(items.map(i => i.category)));

  return (
    <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-zinc-200 flex flex-col md:flex-row gap-4 items-center justify-between bg-zinc-50/50">
        <h3 className="text-lg font-bold text-zinc-900">评论明细表</h3>
        
        <div className="flex flex-wrap gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              placeholder="搜索评论或摘要..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm border border-zinc-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
          
          <select
            value={sentimentFilter}
            onChange={(e) => setSentimentFilter(e.target.value)}
            className="px-3 py-2 text-sm border border-zinc-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none bg-white cursor-pointer"
          >
            <option value="all">所有情绪</option>
            <option value="positive">正向</option>
            <option value="neutral">中性</option>
            <option value="negative">负向</option>
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 text-sm border border-zinc-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none bg-white cursor-pointer"
          >
            <option value="all">所有分类</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-zinc-50 border-b border-zinc-200">
              <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">原始评论</th>
              <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">分析摘要</th>
              <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">情绪</th>
              <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">分类</th>
              <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">关键词</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {paginated.map((item) => (
              <tr key={item.id} className="hover:bg-zinc-50 transition-colors group">
                <td className="px-6 py-4 max-w-md">
                  <p className="text-sm text-zinc-900 line-clamp-2 leading-relaxed">{item.comment}</p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-zinc-600 italic leading-relaxed">{item.summary}</p>
                </td>
                <td className="px-6 py-4">
                  <span className={cn(
                    "inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase",
                    item.sentiment === 'positive' ? "bg-emerald-50 text-emerald-700" :
                    item.sentiment === 'negative' ? "bg-rose-50 text-rose-700" :
                    "bg-zinc-100 text-zinc-600"
                  )}>
                    {item.sentiment === 'positive' ? '正向' : item.sentiment === 'negative' ? '负向' : '中性'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs font-medium text-zinc-700 bg-zinc-100 px-2 py-1 rounded">
                    {item.category}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {item.keywords.map(kw => (
                      <span key={kw} className="text-[10px] text-indigo-600 font-medium">#{kw}</span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
            {paginated.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-zinc-400 text-sm">
                  未找到匹配的评论
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-6 py-4 bg-zinc-50 border-t border-zinc-200 flex items-center justify-between">
          <p className="text-xs text-zinc-500 font-medium">
            显示 {(currentPage - 1) * pageSize + 1} 到 {Math.min(currentPage * pageSize, filtered.length)} 条，共 {filtered.length} 条
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg border border-zinc-200 bg-white hover:bg-zinc-50 disabled:opacity-50 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-1 px-2">
              <span className="text-sm font-bold text-indigo-600">{currentPage}</span>
              <span className="text-sm text-zinc-400">/</span>
              <span className="text-sm text-zinc-600">{totalPages}</span>
            </div>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-lg border border-zinc-200 bg-white hover:bg-zinc-50 disabled:opacity-50 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
