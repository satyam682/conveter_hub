import React, { useState } from 'react';
import { Upload, Download, FileText, Trash2, Layers, ArrowLeft, ArrowRight, Eye, X } from 'lucide-react';
import jsPDF from 'jspdf';
import confetti from 'canvas-confetti';

interface ImageItem {
  id: string;
  file: File;
  preview: string;
}

export const PdfSuite: React.FC = () => {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [fileName, setFileName] = useState<string>('my-converted-document');
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewPdfUrl, setPreviewPdfUrl] = useState<string | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState<boolean>(false);

  const handleImageAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      const newItems = newFiles.map((file) => ({
        id: Math.random().toString(36).substring(7),
        file,
        preview: URL.createObjectURL(file)
      }));
      setImages((prev) => [...prev, ...newItems]);
      setPreviewPdfUrl(null);
    }
  };

  const removeImage = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
    setPreviewPdfUrl(null);
  };

  // Reorder Images (Move Left / Move Right)
  const moveImage = (index: number, direction: 'left' | 'right') => {
    const newImages = [...images];
    const targetIndex = direction === 'left' ? index - 1 : index + 1;

    if (targetIndex >= 0 && targetIndex < newImages.length) {
      const temp = newImages[index];
      newImages[index] = newImages[targetIndex];
      newImages[targetIndex] = temp;
      setImages(newImages);
      setPreviewPdfUrl(null);
    }
  };

  // Create jsPDF Document Instance
  const createPdfDoc = async (): Promise<jsPDF | null> => {
    if (images.length === 0) return null;

    const doc = new jsPDF();
    for (let i = 0; i < images.length; i++) {
      const imgItem = images[i];
      const img = new Image();
      img.src = imgItem.preview;

      await new Promise((resolve) => {
        img.onload = resolve;
      });

      if (i > 0) {
        doc.addPage();
      }

      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();

      const imgAspect = img.width / img.height;
      let renderWidth = pageWidth - 20;
      let renderHeight = renderWidth / imgAspect;

      if (renderHeight > pageHeight - 20) {
        renderHeight = pageHeight - 20;
        renderWidth = renderHeight * imgAspect;
      }

      const xPos = (pageWidth - renderWidth) / 2;
      const yPos = (pageHeight - renderHeight) / 2;

      doc.addImage(imgItem.preview, 'JPEG', xPos, yPos, renderWidth, renderHeight);
    }

    return doc;
  };

  // Generate & Live Preview PDF
  const handlePreviewPdf = async () => {
    if (images.length === 0) return;
    setIsGenerating(true);

    try {
      const doc = await createPdfDoc();
      if (doc) {
        const blobUrl = doc.output('bloburl').toString();
        setPreviewPdfUrl(blobUrl);
        setIsPreviewOpen(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  // Download PDF
  const generateAndDownloadPdf = async () => {
    if (images.length === 0) return;
    setIsGenerating(true);

    try {
      const doc = await createPdfDoc();
      if (doc) {
        const safeName = fileName.trim().length > 0 ? fileName.trim() : 'document';
        doc.save(`${safeName}.pdf`);

        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="glass-card rounded-2xl p-6 border border-slate-200 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 mb-1 flex items-center gap-2">
          <FileText className="w-5 h-5 text-indigo-600" />
          Image to PDF Converter
        </h2>
        <p className="text-xs text-slate-500 mb-6">
          Combine photos into a PDF, reorder page sequence, rename filename, and preview before downloading. 100% Free.
        </p>

        {/* Upload Zone */}
        <div className="relative border-2 border-dashed border-indigo-200 hover:border-indigo-500 bg-indigo-50/50 hover:bg-indigo-50 rounded-2xl p-8 text-center transition cursor-pointer group mb-6">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageAdd}
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
          />
          <div className="flex flex-col items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md group-hover:scale-110 transition">
              <Upload className="w-7 h-7" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800">
                Select one or multiple images to convert to PDF
              </p>
              <p className="text-xs text-slate-500 mt-1 font-medium">
                Drag & drop files or click to add photos
              </p>
            </div>
          </div>
        </div>

        {/* Selected Images Control Grid */}
        {images.length > 0 && (
          <div className="space-y-6">
            
            {/* Options Bar: Rename PDF & Item Count */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Custom PDF Filename
                </label>
                <div className="flex items-center gap-1.5">
                  <input
                    type="text"
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                    placeholder="e.g. my-scanned-document"
                    className="glass-input flex-1 px-3 py-1.5 rounded-xl text-xs font-semibold"
                  />
                  <span className="text-xs font-bold text-slate-500">.pdf</span>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-3 text-xs text-slate-700 font-bold">
                <span className="flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-indigo-600" /> {images.length} Page(s) Total
                </span>
                <button
                  onClick={() => { setImages([]); setPreviewPdfUrl(null); }}
                  className="text-pink-600 hover:text-pink-700 transition"
                >
                  Clear All
                </button>
              </div>
            </div>

            {/* Reorderable Image Cards */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                Page Sequence (Use ⬅️ ➡️ arrows to change order):
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {images.map((img, idx) => (
                  <div key={img.id} className="relative rounded-xl overflow-hidden border border-slate-200 bg-white shadow-xs group">
                    <img src={img.preview} alt="preview" className="w-full h-28 object-cover" />
                    
                    <div className="absolute top-1 left-1 px-2 py-0.5 rounded-md bg-slate-900/80 text-[10px] font-bold text-white">
                      Page {idx + 1}
                    </div>

                    {/* Delete button */}
                    <button
                      onClick={() => removeImage(img.id)}
                      className="absolute top-1 right-1 p-1 rounded-md bg-pink-600 text-white opacity-90 hover:opacity-100 transition shadow-xs"
                      title="Delete Page"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    {/* Reorder Left / Right Arrows Bar */}
                    <div className="p-1.5 bg-slate-100 border-t border-slate-200 flex items-center justify-between">
                      <button
                        onClick={() => moveImage(idx, 'left')}
                        disabled={idx === 0}
                        className={`p-1 rounded-lg text-xs font-bold flex items-center gap-0.5 transition ${
                          idx === 0
                            ? 'text-slate-300 cursor-not-allowed'
                            : 'bg-white hover:bg-indigo-50 text-indigo-600 border border-slate-200 shadow-xs'
                        }`}
                        title="Move Page Up"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" /> Move
                      </button>

                      <button
                        onClick={() => moveImage(idx, 'right')}
                        disabled={idx === images.length - 1}
                        className={`p-1 rounded-lg text-xs font-bold flex items-center gap-0.5 transition ${
                          idx === images.length - 1
                            ? 'text-slate-300 cursor-not-allowed'
                            : 'bg-white hover:bg-indigo-50 text-indigo-600 border border-slate-200 shadow-xs'
                        }`}
                        title="Move Page Down"
                      >
                        Move <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons: Preview & Download */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                onClick={handlePreviewPdf}
                disabled={isGenerating}
                className="py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center justify-center gap-2 border border-slate-300 transition"
              >
                <Eye className="w-4 h-4 text-indigo-600" /> Preview PDF Document
              </button>

              <button
                onClick={generateAndDownloadPdf}
                disabled={isGenerating}
                className="py-3 rounded-xl gradient-btn text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg"
              >
                <Download className="w-4 h-4" /> Download PDF ({fileName}.pdf)
              </button>
            </div>

          </div>
        )}
      </div>

      {/* PDF Live Preview Modal */}
      {isPreviewOpen && previewPdfUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-fade-in">
          <div className="bg-white w-full max-w-4xl h-[85vh] rounded-2xl border border-slate-300 shadow-2xl flex flex-col overflow-hidden">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-indigo-600" />
                <div>
                  <h3 className="text-sm font-bold text-slate-900">PDF Document Live Preview</h3>
                  <p className="text-xs text-slate-500 font-medium">{fileName}.pdf ({images.length} pages)</p>
                </div>
              </div>
              
              <button
                onClick={() => setIsPreviewOpen(false)}
                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Embedded PDF View */}
            <div className="flex-1 bg-slate-200 p-2">
              <iframe
                src={previewPdfUrl}
                title="PDF Preview"
                className="w-full h-full rounded-xl border border-slate-300 bg-white"
              />
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3 border-t border-slate-200 bg-white flex items-center justify-end gap-3">
              <button
                onClick={() => setIsPreviewOpen(false)}
                className="px-4 py-2 text-xs font-bold rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
              >
                Close Preview
              </button>
              <button
                onClick={generateAndDownloadPdf}
                className="px-5 py-2 text-xs font-bold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-1.5 transition shadow-md"
              >
                <Download className="w-4 h-4" /> Download PDF Now
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
