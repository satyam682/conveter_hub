import React, { useState } from 'react';
import { Code, Copy, Check, AlertCircle, Zap } from 'lucide-react';

export const JsonFormatter: React.FC = () => {
  const [inputJson, setInputJson] = useState('{\n  "appName": "ConverterHub",\n  "status": "active",\n  "freeForever": true,\n  "toolsCount": 10,\n  "features": ["Image Converter", "SEO Suite", "PDF Suite"]\n}');
  const [formattedJson, setFormattedJson] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const formatJson = () => {
    try {
      setError(null);
      const parsed = JSON.parse(inputJson);
      setFormattedJson(JSON.stringify(parsed, null, 2));
    } catch (err: any) {
      setError(err.message || 'Invalid JSON format syntax.');
      setFormattedJson('');
    }
  };

  const minifyJson = () => {
    try {
      setError(null);
      const parsed = JSON.parse(inputJson);
      setFormattedJson(JSON.stringify(parsed));
    } catch (err: any) {
      setError(err.message || 'Invalid JSON format syntax.');
      setFormattedJson('');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(formattedJson || inputJson);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="glass-card rounded-2xl p-6 border border-slate-200 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 mb-1 flex items-center gap-2">
          <Code className="w-5 h-5 text-indigo-600" />
          JSON Formatter & Validator
        </h2>
        <p className="text-xs text-slate-500 mb-6">
          Prettify, validate, minify, and check JSON syntax errors instantly in client browser. 100% Free.
        </p>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <button
            onClick={formatJson}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 transition shadow-sm"
          >
            <Zap className="w-3.5 h-3.5" /> Prettify / Format
          </button>
          <button
            onClick={minifyJson}
            className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-1.5 transition shadow-sm"
          >
            Minify JSON
          </button>
          <button
            onClick={copyToClipboard}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-xs font-bold flex items-center gap-1.5 transition"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied!' : 'Copy Code'}
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-pink-50 border border-pink-200 text-pink-700 text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>Syntax Error: {error}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Input JSON */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Input Raw JSON</label>
            <textarea
              rows={14}
              value={inputJson}
              onChange={(e) => setInputJson(e.target.value)}
              className="glass-input w-full p-3.5 rounded-2xl text-xs font-mono"
            />
          </div>

          {/* Formatted Output JSON */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Formatted Output</label>
            <textarea
              rows={14}
              readOnly
              value={formattedJson}
              placeholder="Click 'Prettify / Format' to generate formatted JSON..."
              className="glass-input w-full p-3.5 rounded-2xl text-xs font-mono bg-slate-900 text-emerald-400"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
