import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BarChart3, Info, Home, Github } from 'lucide-react';
import { cn } from '../lib/utils';

export const Navbar: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: '首页', icon: Home },
    { path: '/dashboard', label: '分析台', icon: BarChart3 },
    { path: '/about', label: '关于', icon: Info },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-zinc-900 tracking-tight">InsightFlow</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-1.5 text-sm font-medium transition-colors",
                  location.pathname === item.path 
                    ? "text-indigo-600" 
                    : "text-zinc-500 hover:text-zinc-900"
                )}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noreferrer"
              className="p-2 text-zinc-400 hover:text-zinc-900 transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <Link 
              to="/dashboard"
              className="bg-zinc-900 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-zinc-800 transition-all active:scale-95 shadow-sm"
            >
              立即体验
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
