import React, { useState } from 'react';
import { Search, Copy, Check, Globe, Code } from 'lucide-react';

export const MetaTagGen: React.FC = () => {
  const [title, setTitle] = useState('ConverterHub - 100% Free Online Tools Suite');
  const [description, setDescription] = useState('Convert images, format JSON, generate SEO meta tags, and calculate loan EMIs instantly in your web browser. 100% free & client-side.');
  const [url, setUrl] = useState('https://converter-hub5.netlify.app');
  const [siteName, setSiteName] = useState('ConverterHub');
  const [copied, setCopied] = useState(false);

  const generatedHtml = `<!-- Primary Meta Tags -->
<title>${title}</title>
<meta name="title" content="${title}">
<meta name="description" content="${description}">

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:url" content="${url}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:site_name" content="${siteName}">

<!-- Twitter Cards -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url" content="${url}">
<meta property="twitter:title" content="${title}">
<meta property="twitter:description" content="${description}">`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedHtml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const titleLength = title.length;
  const descLength = description.length;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="glass-card rounded-2xl p-6 border border-slate-200 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 mb-1 flex items-center gap-2">
          <Search className="w-5 h-5 text-indigo-600" />
          SEO Meta Tag & SERP Snippet Generator
        </h2>
        <p className="text-xs text-slate-500 mb-6">
          Generate SEO title, description, OpenGraph, and Twitter tags with real-time Google search snippet preview.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Inputs */}
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1">
                <span>Page Meta Title</span>
                <span className={titleLength > 60 ? 'text-amber-600' : 'text-emerald-600'}>
                  {titleLength} / 60 chars
                </span>
              </div>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="glass-input w-full px-3.5 py-2 rounded-xl text-sm"
              />
            </div>

            <div>
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1">
                <span>Meta Description</span>
                <span className={descLength > 160 ? 'text-amber-600' : 'text-emerald-600'}>
                  {descLength} / 160 chars
                </span>
              </div>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="glass-input w-full px-3.5 py-2 rounded-xl text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Canonical URL</label>
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="glass-input w-full px-3 py-2 rounded-xl text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Brand / Site Name</label>
                <input
                  type="text"
                  value={siteName}
                  onChange={(e) => setSiteName(e.target.value)}
                  className="glass-input w-full px-3 py-2 rounded-xl text-xs"
                />
              </div>
            </div>
          </div>

          {/* SERP Live Google Preview Box */}
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-white border border-slate-300 text-slate-900 shadow-md">
              <div className="flex items-center gap-2 mb-2 text-xs text-slate-500">
                <Globe className="w-4 h-4 text-emerald-600" />
                <span className="truncate">{url}</span>
              </div>
              <h3 className="text-base sm:text-lg text-[#1a0dab] font-medium hover:underline cursor-pointer leading-snug line-clamp-1 mb-1">
                {title || 'Your Meta Title Will Appear Here'}
              </h3>
              <p className="text-xs sm:text-sm text-[#4d5156] leading-relaxed line-clamp-2">
                {description || 'Your meta description text preview will appear here in Google SERP results format.'}
              </p>
            </div>

            {/* Generated Code Display */}
            <div className="relative rounded-2xl bg-slate-900 p-4 border border-slate-800 text-slate-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-indigo-400 flex items-center gap-1">
                  <Code className="w-3.5 h-3.5" /> HTML Meta Tags Code
                </span>
                <button
                  onClick={copyToClipboard}
                  className="px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1 transition"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied!' : 'Copy Code'}
                </button>
              </div>
              <pre className="text-[11px] font-mono text-emerald-400 overflow-x-auto p-2 bg-slate-950 rounded-xl max-h-40">
                {generatedHtml}
              </pre>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
