import React from 'react';
import { Zap, ShieldCheck, Heart } from 'lucide-react';
import { CATEGORIES } from '../data/toolsData';

interface FooterProps {
  onSelectCategory: (catId: string) => void;
  onGoHome: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory, onGoHome }) => {
  return (
    <footer className="bg-white border-t border-slate-200 pt-12 pb-16 text-slate-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-200">
          
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <div
              onClick={onGoHome}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                <Zap className="w-4 h-4 fill-white" />
              </div>
              <span className="font-extrabold text-lg text-slate-900">
                Converter<span className="gradient-text">Hub</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              100% free online conversion & SEO utility suite. Built with high performance, client-side security, and zero file uploads.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 w-fit">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>100% Free Forever</span>
            </div>
          </div>

          {/* Categories Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-4">Tool Categories</h4>
            <ul className="space-y-2.5 text-xs font-medium">
              {CATEGORIES.filter(c => c.id !== 'all').map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => onSelectCategory(cat.id)}
                    className="hover:text-indigo-600 transition"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* SEO & Popular Tools Links */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-4">Popular Utilities</h4>
            <ul className="space-y-2.5 text-xs text-slate-600 font-medium">
              <li>WebP to PNG Converter</li>
              <li>JPG & PNG Image Compressor</li>
              <li>Image to PDF Converter</li>
              <li>SEO Meta Tag & SERP Preview</li>
              <li>JSON Formatter & Validator</li>
              <li>Loan & EMI Calculator</li>
            </ul>
          </div>

          {/* Legal & Privacy Disclosure */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-4">Privacy & Security</h4>
            <p className="text-xs text-slate-500 leading-relaxed mb-3">
              Your files and input data are processed entirely in your web browser. No files are stored or logged on remote servers.
            </p>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 font-medium">
              ⚡ Google Core Web Vitals & SEO Compliant
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-slate-500">
          <p>© {new Date().getFullYear()} ConverterHub. All rights reserved.</p>
          <div className="flex items-center gap-1 text-slate-500">
            Made with <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500 mx-1" /> 100% Free for everyone.
          </div>
        </div>
      </div>
    </footer>
  );
};
