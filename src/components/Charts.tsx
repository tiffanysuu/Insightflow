import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { AnalysisResult } from '../lib/analysis';

interface ChartsProps {
  data: AnalysisResult;
}

export const Charts: React.FC<ChartsProps> = ({ data }) => {
  const sentimentData = [
    { name: '正向', value: data.sentiment_distribution.positive, color: '#10b981' },
    { name: '中性', value: data.sentiment_distribution.neutral, color: '#94a3b8' },
    { name: '负向', value: data.sentiment_distribution.negative, color: '#f43f5e' },
  ];

  const categoryData = Object.entries(data.category_distribution)
    .map(([name, value]) => ({ name, value: Number(value) }))
    .sort((a, b) => b.value - a.value);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Sentiment Chart */}
      <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
        <h3 className="text-sm font-semibold text-zinc-900 mb-6 uppercase tracking-wider">情绪分布</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={sentimentData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {sentimentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              />
              <Legend verticalAlign="bottom" height={36}/>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Category Chart */}
      <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
        <h3 className="text-sm font-semibold text-zinc-900 mb-6 uppercase tracking-wider">问题分类分布</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={categoryData} layout="vertical" margin={{ left: 20 }}>
              <XAxis type="number" hide />
              <YAxis 
                dataKey="name" 
                type="category" 
                width={80} 
                axisLine={false} 
                tickLine={false}
                style={{ fontSize: '12px', fontWeight: 500 }}
              />
              <Tooltip 
                cursor={{ fill: '#f8fafc' }}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              />
              <Bar dataKey="value" fill="#6366f1" radius={[0, 4, 4, 0]} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
