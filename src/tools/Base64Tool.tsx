import React, { useState } from 'react';
import { Binary, Copy, Check, ArrowRightLeft } from 'lucide-react';

export const Base64Tool: React.FC = () => {
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [inputText, setInputText] = useState('Hello ConverterHub!');
  const [outputText, setOutputText] = useState('');
  const [copied, setCopied] = useState(false);

  const processText = () => {
    try {
      if (mode === 'encode') {
        setOutputText(btoa(inputText));
      } else {
        setOutputText(atob(inputText));
      }
    } catch (e) {
      setOutputText('Error: Invalid Base64 input string for decoding.');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="glass-card rounded-2xl p-6 border border-slate-200 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 mb-1 flex items-center gap-2">
          <Binary className="w-5 h-5 text-indigo-600" />
          Base64 Encoder & Decoder
        </h2>
        <p className="text-xs text-slate-500 mb-6">
          Convert plain text to Base64 format or decode Base64 back into readable text string. 100% Free.
        </p>

        {/* Mode Toggle */}
        <div className="flex items-center gap-2 mb-4">
          <button
            onClick={() => setMode('encode')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              mode === 'encode' ? 'bg-indigo-600 text-white shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Encode to Base64
          </button>
          <button
            onClick={() => setMode('decode')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              mode === 'decode' ? 'bg-indigo-600 text-white shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Decode from Base64
          </button>
          <button
            onClick={processText}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-bold flex items-center gap-1.5 transition ml-auto shadow-md"
          >
            <ArrowRightLeft className="w-3.5 h-3.5" /> Convert Now
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              {mode === 'encode' ? 'Plain Text Input' : 'Base64 Encoded Input'}
            </label>
            <textarea
              rows={4}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="glass-input w-full p-3.5 rounded-2xl text-xs font-mono"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-bold text-slate-700">
                {mode === 'encode' ? 'Base64 Result' : 'Decoded Plain Text'}
              </label>
              {outputText && (
                <button
                  onClick={copyToClipboard}
                  className="text-xs text-indigo-600 hover:text-indigo-700 flex items-center gap-1 font-bold"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
              )}
            </div>
            <textarea
              rows={4}
              readOnly
              value={outputText}
              placeholder="Click 'Convert Now' to produce output..."
              className="glass-input w-full p-3.5 rounded-2xl text-xs font-mono bg-slate-900 text-emerald-400"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
