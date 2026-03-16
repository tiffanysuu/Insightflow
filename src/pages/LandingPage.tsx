import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { BarChart3, ShieldCheck, Zap, Target, ArrowRight, Sparkles } from 'lucide-react';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-50 animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-50 animate-pulse delay-700" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-6 border border-indigo-100">
              <Sparkles className="w-3 h-3" />
              AI-Powered Feedback Analysis
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-zinc-900 tracking-tight mb-6 leading-[1.1]">
              洞察用户心声，<br />
              <span className="text-indigo-600">驱动产品增长</span>
            </h1>
            <p className="text-xl text-zinc-600 max-w-2xl mx-auto mb-10 leading-relaxed">
              批量导入用户评论，自动完成情绪识别、问题分类、关键词提取与运营建议生成。让海量反馈变成可执行的洞察。
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/dashboard"
                className="w-full sm:w-auto bg-indigo-600 text-white px-8 py-4 rounded-2xl text-lg font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 group"
              >
                立即体验
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/about"
                className="w-full sm:w-auto bg-white text-zinc-900 border border-zinc-200 px-8 py-4 rounded-2xl text-lg font-bold hover:bg-zinc-50 transition-all"
              >
                了解更多
              </Link>
            </div>
          </motion.div>

          {/* Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-20 relative"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-[2.5rem] blur opacity-20" />
            <div className="relative bg-zinc-900 rounded-[2rem] p-4 shadow-2xl overflow-hidden border border-white/10">
              <img 
                src="https://picsum.photos/seed/dashboard/1200/800?blur=2" 
                alt="Dashboard Preview" 
                className="rounded-2xl opacity-80"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-3xl text-white text-center">
                  <BarChart3 className="w-12 h-12 mx-auto mb-4 text-indigo-400" />
                  <p className="text-2xl font-bold">专业级数据看板</p>
                  <p className="text-white/60">可视化呈现每一条用户反馈的价值</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-zinc-50 border-y border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-zinc-900 mb-4">核心亮点</h2>
            <p className="text-zinc-600">专为运营人员设计的 AI 分析工作流</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: '批量评论分析',
                desc: '支持 CSV 上传或直接粘贴，秒级处理成百上千条反馈。',
                icon: BarChart3,
                color: 'bg-blue-50 text-blue-600'
              },
              {
                title: '情绪识别',
                desc: '精准识别用户正向、中性、负向情绪，量化用户满意度。',
                icon: ShieldCheck,
                color: 'bg-emerald-50 text-emerald-600'
              },
              {
                title: '问题分类',
                desc: '自动归纳功能、性能、体验等维度，快速定位薄弱环节。',
                icon: Target,
                color: 'bg-amber-50 text-amber-600'
              },
              {
                title: '运营建议',
                desc: '基于全量数据生成可执行的运营报告，拒绝空泛总结。',
                icon: Zap,
                color: 'bg-indigo-50 text-indigo-600'
              }
            ].map((feature, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm hover:shadow-md transition-shadow">
                <div className={`${feature.color} w-12 h-12 rounded-2xl flex items-center justify-center mb-6`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-zinc-900 mb-3">{feature.title}</h3>
                <p className="text-zinc-600 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-6 h-6 bg-indigo-600 rounded flex items-center justify-center">
              <BarChart3 className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold text-zinc-900">InsightFlow</span>
          </div>
          <p className="text-sm text-zinc-400">© 2026 InsightFlow AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};
