import React, { useState } from 'react';
import { Upload, FileText, Play, RotateCcw, ChevronDown } from 'lucide-react';
import Papa from 'papaparse';
import { DEMO_COMMENTS } from '../data/demo-comments';
import { cn } from '../lib/utils';

interface UploadPanelProps {
  onAnalyze: (comments: string[]) => void;
  isLoading: boolean;
}

export const UploadPanel: React.FC<UploadPanelProps> = ({ onAnalyze, isLoading }) => {
  const [text, setText] = useState('');
  const [csvData, setCsvData] = useState<any[]>([]);
  const [csvHeaders, setCsvHeaders] = useState<string[]>([]);
  const [selectedHeader, setSelectedHeader] = useState('');
  const [fileName, setFileName] = useState('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (results.data.length > 0) {
          const headers = Object.keys(results.data[0] as object);
          setCsvHeaders(headers);
          setCsvData(results.data);
          
          // Auto-select common headers
          const common = ['comment', 'review', 'feedback', 'text', 'content'];
          const found = headers.find(h => common.includes(h.toLowerCase()));
          setSelectedHeader(found || headers[0]);
        }
      }
    });
  };

  const handleStart = () => {
    if (csvData.length > 0 && selectedHeader) {
      const comments = csvData.map(row => row[selectedHeader]).filter(Boolean);
      onAnalyze(comments);
    } else if (text.trim()) {
      const comments = text.split('\n').map(s => s.trim()).filter(Boolean);
      onAnalyze(comments);
    }
  };

  const handleDemo = () => {
    setText(DEMO_COMMENTS.join('\n'));
    setCsvData([]);
    setFileName('');
  };

  const handleReset = () => {
    setText('');
    setCsvData([]);
    setCsvHeaders([]);
    setSelectedHeader('');
    setFileName('');
  };

  return (
    <div className="bg-white rounded-2xl border border-zinc-200 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-zinc-900 flex items-center gap-2">
          <Upload className="w-5 h-5 text-indigo-600" />
          数据导入
        </h2>
        <div className="flex gap-2">
          <button
            onClick={handleDemo}
            className="text-sm font-medium text-indigo-600 hover:text-indigo-700 px-3 py-1 rounded-lg hover:bg-indigo-50 transition-colors"
          >
            示例数据
          </button>
          <button
            onClick={handleReset}
            className="text-sm font-medium text-zinc-500 hover:text-zinc-700 px-3 py-1 rounded-lg hover:bg-zinc-50 transition-colors flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            重置
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {/* Text Input */}
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-2">
            粘贴评论 (每行一条)
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="在此输入或粘贴用户评论..."
            className="w-full h-32 p-3 text-sm border border-zinc-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-none"
            disabled={isLoading}
          />
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-zinc-200"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="px-2 bg-white text-xs text-zinc-400 uppercase tracking-wider">或</span>
          </div>
        </div>

        {/* CSV Upload */}
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-2">
            上传 CSV 文件
          </label>
          <div className={cn(
            "relative border-2 border-dashed rounded-xl p-6 transition-all flex flex-col items-center justify-center gap-2 overflow-hidden",
            fileName ? "border-indigo-300 bg-indigo-50/30" : "border-zinc-200 hover:border-indigo-300 hover:bg-zinc-50"
          )}>
            <input
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              disabled={isLoading}
            />
            <FileText className={cn("w-8 h-8", fileName ? "text-indigo-600" : "text-zinc-400")} />
            <p className="text-sm text-zinc-600 font-medium">
              {fileName || "点击或拖拽上传 CSV"}
            </p>
            <p className="text-xs text-zinc-400">支持 .csv 格式</p>
          </div>
        </div>

        {/* CSV Header Selection */}
        {csvHeaders.length > 0 && (
          <div className="animate-in fade-in slide-in-from-top-2 duration-300">
            <label className="block text-sm font-medium text-zinc-700 mb-2">
              选择分析字段
            </label>
            <div className="relative">
              <select
                value={selectedHeader}
                onChange={(e) => setSelectedHeader(e.target.value)}
                className="w-full appearance-none bg-white border border-zinc-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer"
              >
                {csvHeaders.map(header => (
                  <option key={header} value={header}>{header}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
            </div>
          </div>
        )}

        <button
          onClick={handleStart}
          disabled={isLoading || (!text.trim() && csvData.length === 0)}
          className={cn(
            "w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all shadow-sm",
            isLoading 
              ? "bg-zinc-100 text-zinc-400 cursor-not-allowed" 
              : "bg-indigo-600 text-white hover:bg-indigo-700 active:scale-[0.98]"
          )}
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-zinc-300 border-t-zinc-600 rounded-full animate-spin" />
              分析中...
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-current" />
              开始 AI 分析
            </>
          )}
        </button>
      </div>
    </div>
  );
};
