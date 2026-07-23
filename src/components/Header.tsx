import React from 'react';
import { Search, Shield, Zap } from 'lucide-react';
import { CATEGORIES } from '../data/toolsData';

interface HeaderProps {
  activeCategory: string;
  onSelectCategory: (catId: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onGoHome: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onGoHome
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-xl border-b border-slate-200 transition-all shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & Brand Name */}
          <div
            onClick={onGoHome}
            className="flex items-center gap-3 cursor-pointer group shrink-0"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300">
              <Zap className="w-5 h-5 text-white fill-white" />
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-slate-900 flex items-center gap-1.5">
                Converter<span className="gradient-text">Hub</span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-300">
                  100% FREE
                </span>
              </span>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
                Free Online Tools & SEO Suite
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md relative hidden md:block">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search 10+ free tools (e.g. WebP to PNG, Meta Tags, EMI)..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="glass-input w-full pl-10 pr-4 py-2 rounded-xl text-xs sm:text-sm placeholder-slate-400 focus:outline-none"
            />
          </div>

          {/* Client-Side Privacy Badge */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="flex items-center gap-2 text-xs text-slate-600 bg-slate-100/80 px-3.5 py-1.5 rounded-xl border border-slate-200 font-medium">
              <Shield className="w-3.5 h-3.5 text-indigo-600" />
              <span>100% Client-Side Privacy</span>
            </div>
          </div>
        </div>

        {/* Category Pill Bar */}
        <div className="flex items-center gap-2 overflow-x-auto py-2.5 no-scrollbar scroll-smooth border-t border-slate-100">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-200'
                }`}
              >
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
