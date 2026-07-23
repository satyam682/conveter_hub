import React, { useState } from 'react';
import { DollarSign, X, Check, Info, ShieldCheck } from 'lucide-react';

interface AdSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  pubId: string;
  onSavePubId: (newPubId: string) => void;
}

export const AdSettingsModal: React.FC<AdSettingsModalProps> = ({
  isOpen,
  onClose,
  pubId,
  onSavePubId
}) => {
  const [inputPubId, setInputPubId] = useState(pubId);
  const [saved, setSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSavePubId(inputPubId);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="glass-panel w-full max-w-md rounded-2xl p-6 border border-slate-700 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">AdSense Monetization Control</h3>
            <p className="text-xs text-slate-400">Configure your Google AdSense Publisher ID</p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Google AdSense Publisher ID (ca-pub-XXXXXXXXXXXXXXXX)
            </label>
            <input
              type="text"
              placeholder="e.g. ca-pub-1234567890123456"
              value={inputPubId}
              onChange={(e) => setInputPubId(e.target.value)}
              className="glass-input w-full px-3.5 py-2.5 rounded-xl text-sm font-mono focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/50 text-xs text-slate-300 space-y-2">
            <div className="flex items-start gap-2">
              <Info className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
              <p>
                When empty, the app displays interactive demo sponsor banners. Entering your AdSense Publisher ID will automatically serve live Google Ads on all designated banner zones.
              </p>
            </div>
            <div className="flex items-center gap-2 text-emerald-400 font-medium">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>100% Google AdSense Policy Compliant Layout</span>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1.5 transition shadow-lg shadow-emerald-600/30"
            >
              {saved ? (
                <>
                  <Check className="w-4 h-4" /> Saved!
                </>
              ) : (
                'Save Settings'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
