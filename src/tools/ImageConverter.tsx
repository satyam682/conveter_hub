import React, { useState } from 'react';
import { Upload, Download, RefreshCw, CheckCircle, Image as ImageIcon, Sparkles, Sliders } from 'lucide-react';
import confetti from 'canvas-confetti';

export const ImageConverter: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [targetFormat, setTargetFormat] = useState<string>('png');
  const [quality, setQuality] = useState<number>(90);
  const [convertedUrl, setConvertedUrl] = useState<string | null>(null);
  const [convertedSize, setConvertedSize] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setConvertedUrl(null);
      setConvertedSize(null);

      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewUrl(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const convertImage = () => {
    if (!previewUrl || !selectedFile) return;

    setIsProcessing(true);
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = previewUrl;

    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');

      if (!ctx) return;

      // Handle transparent PNG to JPG conversion background fill
      if (targetFormat === 'jpeg' || targetFormat === 'jpg') {
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      ctx.drawImage(img, 0, 0);

      const mimeType = targetFormat === 'png' ? 'image/png'
        : targetFormat === 'webp' ? 'image/webp'
        : targetFormat === 'gif' ? 'image/gif'
        : 'image/jpeg';

      const dataUrl = canvas.toDataURL(mimeType, quality / 100);
      setConvertedUrl(dataUrl);

      // Estimate byte length
      const head = `data:${mimeType};base64,`;
      const sizeInBytes = Math.round((dataUrl.length - head.length) * 3 / 4);
      setConvertedSize(sizeInBytes);
      setIsProcessing(false);

      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.7 }
      });
    };
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="glass-card rounded-2xl p-6 border border-slate-200 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 mb-1 flex items-center gap-2">
          <ImageIcon className="w-5 h-5 text-indigo-600" />
          Image Format Converter & Compressor
        </h2>
        <p className="text-xs text-slate-500 mb-6">
          Convert WebP, PNG, JPG, & GIF images instantly. Adjust quality settings for maximum compression. 100% Free.
        </p>

        {/* Upload Drop Zone */}
        <div className="relative border-2 border-dashed border-indigo-200 hover:border-indigo-500 bg-indigo-50/50 hover:bg-indigo-50 rounded-2xl p-8 text-center transition cursor-pointer group">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
          />
          <div className="flex flex-col items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md group-hover:scale-110 transition">
              <Upload className="w-7 h-7" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800">
                {selectedFile ? selectedFile.name : 'Drag & drop your image here, or click to browse'}
              </p>
              <p className="text-xs text-slate-500 mt-1 font-medium">
                Supports PNG, JPG, WebP, GIF, BMP (Max 50MB)
              </p>
            </div>
          </div>
        </div>

        {/* Preview & Controls */}
        {selectedFile && previewUrl && (
          <div className="mt-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              
              {/* Target Format Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  Target Format
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {['png', 'webp', 'jpeg', 'gif'].map((fmt) => (
                    <button
                      key={fmt}
                      type="button"
                      onClick={() => setTargetFormat(fmt)}
                      className={`py-2 rounded-xl text-xs font-bold uppercase transition ${
                        targetFormat === fmt
                          ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {fmt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Compression Quality Slider */}
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-2">
                  <span className="flex items-center gap-1">
                    <Sliders className="w-3.5 h-3.5 text-indigo-600" /> Image Quality
                  </span>
                  <span className="text-indigo-600">{quality}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={quality}
                  onChange={(e) => setQuality(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>

            </div>

            {/* Convert Button */}
            <button
              onClick={convertImage}
              disabled={isProcessing}
              className="w-full py-3 rounded-xl gradient-btn text-white text-sm font-bold flex items-center justify-center gap-2 shadow-lg"
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" /> Processing...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" /> Convert to {targetFormat.toUpperCase()} Now
                </>
              )}
            </button>
          </div>
        )}

        {/* Converted Output Download Zone */}
        {convertedUrl && (
          <div className="mt-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4 animate-fade-in">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-emerald-600 shrink-0" />
              <div>
                <p className="text-sm font-bold text-slate-900">Conversion Complete!</p>
                <p className="text-xs text-slate-600 font-medium">
                  Original: {formatBytes(selectedFile?.size || 0)} ➔ Output: {formatBytes(convertedSize || 0)}
                </p>
              </div>
            </div>
            <a
              href={convertedUrl}
              download={`converted-image.${targetFormat}`}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-2 transition shadow-md shadow-emerald-600/20"
            >
              <Download className="w-4 h-4" /> Download Image
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
