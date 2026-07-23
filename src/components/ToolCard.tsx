import React from 'react';
import * as Icons from 'lucide-react';
import type { ToolDefinition } from '../data/toolsData';

interface ToolCardProps {
  tool: ToolDefinition;
  onSelect: (tool: ToolDefinition) => void;
}

export const ToolCard: React.FC<ToolCardProps> = ({ tool, onSelect }) => {
  // Dynamically load Lucide Icon
  const IconComponent = (Icons as any)[tool.icon] || Icons.Wrench;

  return (
    <div
      onClick={() => onSelect(tool)}
      className="glass-card rounded-2xl p-5 cursor-pointer group flex flex-col justify-between h-full relative overflow-hidden"
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 group-hover:scale-110 group-hover:text-white group-hover:bg-indigo-600 transition-all duration-300 shadow-xs">
            <IconComponent className="w-6 h-6" />
          </div>
          {tool.badge && (
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              {tool.badge}
            </span>
          )}
        </div>

        <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors mb-2">
          {tool.name}
        </h3>
        <p className="text-xs text-slate-500 leading-relaxed line-clamp-3 mb-4">
          {tool.shortDesc}
        </p>
      </div>

      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-600 group-hover:text-indigo-700">
        <span>Use Tool Free</span>
        <Icons.ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  );
};
