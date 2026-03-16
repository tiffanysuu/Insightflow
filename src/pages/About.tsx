import React from 'react';
import { Info, Code2, Workflow, Users, Target, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

export const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Hero */}
      <div className="bg-zinc-900 py-20 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold text-white mb-6">关于 InsightFlow</h1>
            <p className="text-zinc-400 text-lg leading-relaxed">
              InsightFlow 是一个专为互联网运营人员打造的 AI 反馈分析平台。我们致力于通过大语言模型技术，将碎片化的用户反馈转化为结构化的业务增长动力。
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 mt-16 space-y-24">
        {/* Value Prop */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-zinc-900">解决什么问题？</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-zinc-50 p-8 rounded-3xl border border-zinc-200">
              <h3 className="font-bold text-zinc-900 mb-4">传统方式的痛点</h3>
              <ul className="space-y-3 text-sm text-zinc-600">
                <li className="flex gap-2">❌ 人工阅读海量评论，耗时耗力</li>
                <li className="flex gap-2">❌ 情绪判断主观性强，难以量化</li>
                <li className="flex gap-2">❌ 问题分类混乱，难以沉淀报告</li>
                <li className="flex gap-2">❌ 缺乏数据支撑，运营建议靠直觉</li>
              </ul>
            </div>
            <div className="bg-indigo-600 p-8 rounded-3xl text-white shadow-xl shadow-indigo-200">
              <h3 className="font-bold mb-4">InsightFlow 的方案</h3>
              <ul className="space-y-3 text-sm text-indigo-100">
                <li className="flex gap-2">✅ AI 批量秒级处理，效率提升 100x</li>
                <li className="flex gap-2">✅ 标准化情绪识别，客观准确</li>
                <li className="flex gap-2">✅ 自动结构化分类，一键生成看板</li>
                <li className="flex gap-2">✅ 基于全量洞察，提供专业运营建议</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Workflow */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center">
              <Workflow className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-zinc-900">分析流程</h2>
          </div>
          <div className="relative">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-zinc-100 -z-10 hidden md:block" />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { step: '01', title: '上传评论', desc: 'CSV 或粘贴文本' },
                { step: '02', title: 'AI 分析', desc: '情绪、分类、关键词' },
                { step: '03', title: '汇总可视化', desc: '图表与指标卡片' },
                { step: '04', title: '生成建议', desc: '输出运营复盘报告' }
              ].map((item, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border border-zinc-200 text-center shadow-sm">
                  <span className="text-3xl font-black text-zinc-100 block mb-2">{item.step}</span>
                  <h4 className="font-bold text-zinc-900 mb-1">{item.title}</h4>
                  <p className="text-xs text-zinc-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-amber-600 rounded-xl flex items-center justify-center">
              <Code2 className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-zinc-900">技术栈</h2>
          </div>
          <div className="flex flex-wrap gap-4">
            {[
              'React 19', 'TypeScript', 'Tailwind CSS', 'Gemini AI API', 
              'Recharts', 'Motion', 'Lucide Icons', 'PapaParse'
            ].map(tech => (
              <span key={tech} className="px-4 py-2 bg-zinc-100 text-zinc-700 rounded-xl text-sm font-bold border border-zinc-200">
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* Scenarios */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-zinc-900">适用场景</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              '用户反馈分析', '活动复盘总结', '社区评论洞察', 
              '客服工单分析', '问卷开放题分析', '竞品口碑调研'
            ].map(scene => (
              <div key={scene} className="flex items-center gap-2 p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span className="text-sm font-medium text-zinc-700">{scene}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
