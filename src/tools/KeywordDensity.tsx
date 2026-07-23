import React, { useState } from 'react';
import { BarChart3, Clock, Type, AlignLeft } from 'lucide-react';

export const KeywordDensity: React.FC = () => {
  const [text, setText] = useState(
    'Search engine optimization (SEO) requires writing clear, engaging content. ConverterHub provides free SEO tools to analyze keyword density, format JSON code, and convert images online.'
  );

  // Statistics calculation
  const words = text.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  const characterCount = text.length;
  const readingTime = Math.ceil(wordCount / 200);

  // Calculate word frequency
  const frequencyMap: { [key: string]: number } = {};
  const stopWords = new Set(['the', 'and', 'a', 'to', 'of', 'in', 'i', 'is', 'that', 'it', 'on', 'you', 'this', 'for', 'with', 'was', 'as', 'at', 'by', 'an', 'be', 'are']);

  words.forEach((w) => {
    const cleanWord = w.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (cleanWord.length > 2 && !stopWords.has(cleanWord)) {
      frequencyMap[cleanWord] = (frequencyMap[cleanWord] || 0) + 1;
    }
  });

  const sortedKeywords = Object.entries(frequencyMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="glass-card rounded-2xl p-6 border border-slate-200 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 mb-1 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-indigo-600" />
          SEO Keyword Density & Content Analyzer
        </h2>
        <p className="text-xs text-slate-500 mb-6">
          Paste your article text to check word count, reading duration, and keyword density percentage.
        </p>

        {/* Text Area */}
        <textarea
          rows={6}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste or type your content here..."
          className="glass-input w-full p-4 rounded-2xl text-sm font-sans mb-6"
        />

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
            <Type className="w-5 h-5 text-indigo-600 mx-auto mb-1" />
            <div className="text-xl font-bold text-slate-900">{wordCount}</div>
            <div className="text-[11px] text-slate-500 font-medium">Total Words</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
            <AlignLeft className="w-5 h-5 text-purple-600 mx-auto mb-1" />
            <div className="text-xl font-bold text-slate-900">{characterCount}</div>
            <div className="text-[11px] text-slate-500 font-medium">Characters</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
            <Clock className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
            <div className="text-xl font-bold text-slate-900">{readingTime} min</div>
            <div className="text-[11px] text-slate-500 font-medium">Read Time</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
            <BarChart3 className="w-5 h-5 text-pink-600 mx-auto mb-1" />
            <div className="text-xl font-bold text-slate-900">{sortedKeywords.length}</div>
            <div className="text-[11px] text-slate-500 font-medium">Unique Keywords</div>
          </div>
        </div>

        {/* Density Table */}
        {sortedKeywords.length > 0 && (
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-3">Top Keyword Density Analysis</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-100 text-slate-700 uppercase font-semibold">
                  <tr>
                    <th className="p-3 rounded-l-xl">Keyword</th>
                    <th className="p-3">Count</th>
                    <th className="p-3 rounded-r-xl">Density %</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {sortedKeywords.map(([word, count]) => {
                    const density = ((count / wordCount) * 100).toFixed(2);
                    return (
                      <tr key={word} className="hover:bg-slate-50">
                        <td className="p-3 font-bold text-indigo-600">{word}</td>
                        <td className="p-3 text-slate-700 font-medium">{count}</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded-md font-mono text-xs font-bold ${
                            Number(density) > 3 ? 'bg-pink-100 text-pink-700' : 'bg-emerald-100 text-emerald-700'
                          }`}>
                            {density}%
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
