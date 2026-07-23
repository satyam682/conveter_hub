import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ToolCard } from './components/ToolCard';
import { AdBanner } from './components/AdBanner';
import { SEOHead } from './components/SEOHead';
import { TOOLS } from './data/toolsData';
import type { ToolDefinition } from './data/toolsData';

// Import Tools
import { ImageConverter } from './tools/ImageConverter';
import { PdfSuite } from './tools/PdfSuite';
import { MetaTagGen } from './tools/MetaTagGen';
import { KeywordDensity } from './tools/KeywordDensity';
import { JsonFormatter } from './tools/JsonFormatter';
import { Base64Tool } from './tools/Base64Tool';
import { UnitConverter } from './tools/UnitConverter';
import { EmiCalculator } from './tools/EmiCalculator';

import { Sparkles, ArrowLeft, HelpCircle, CheckCircle2, ShieldCheck } from 'lucide-react';

export function App() {
  const [selectedTool, setSelectedTool] = useState<ToolDefinition | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Sync URL Path with Selected Tool state (e.g. /image-converter, /pdf-suite)
  useEffect(() => {
    const handleUrlRoute = () => {
      const path = window.location.pathname.replace(/^\//, '');
      const hash = window.location.hash.replace(/^#\/?/, '');
      const currentSlug = path || hash;

      if (currentSlug) {
        const foundTool = TOOLS.find((t) => t.id === currentSlug);
        if (foundTool) {
          setSelectedTool(foundTool);
          return;
        }
      }
      setSelectedTool(null);
    };

    // Check initial route
    handleUrlRoute();

    // Listen for browser Back/Forward navigation
    window.addEventListener('popstate', handleUrlRoute);
    return () => window.removeEventListener('popstate', handleUrlRoute);
  }, []);

  const navigateToTool = (tool: ToolDefinition | null) => {
    setSelectedTool(tool);
    if (tool) {
      const targetPath = `/${tool.id}`;
      window.history.pushState({}, '', targetPath);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.history.pushState({}, '', '/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Filter tools by category and search
  const filteredTools = TOOLS.filter((tool) => {
    const matchesCategory = activeCategory === 'all' || tool.category === activeCategory;
    const matchesSearch =
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.keywords.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const renderActiveToolComponent = (toolId: string) => {
    switch (toolId) {
      case 'image-converter':
      case 'image-compressor':
        return <ImageConverter />;
      case 'pdf-suite':
        return <PdfSuite />;
      case 'meta-tag-generator':
        return <MetaTagGen />;
      case 'keyword-density':
        return <KeywordDensity />;
      case 'json-formatter':
        return <JsonFormatter />;
      case 'base64-tool':
        return <Base64Tool />;
      case 'unit-converter':
        return <UnitConverter />;
      case 'emi-calculator':
        return <EmiCalculator />;
      default:
        return <ImageConverter />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-900 selection:bg-indigo-500 selection:text-white">
      {/* Inject SEO Tags & JSON-LD Schema dynamically */}
      <SEOHead tool={selectedTool} />

      {/* Header Bar */}
      <Header
        activeCategory={activeCategory}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          navigateToTool(null);
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onGoHome={() => {
          setActiveCategory('all');
          setSearchQuery('');
          navigateToTool(null);
        }}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Top Leaderboard Ad Placement (Active when Publisher ID is provided) */}
        <AdBanner type="leaderboard" />

        {selectedTool ? (
          /* SINGLE TOOL WORKSPACE VIEW */
          <div className="space-y-6">
            
            {/* Breadcrumb Navigation */}
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <button
                onClick={() => navigateToTool(null)}
                className="hover:text-indigo-600 flex items-center gap-1 transition font-bold"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to All Tools
              </button>
              <span>/</span>
              <span className="capitalize text-slate-600">{selectedTool.category}</span>
              <span>/</span>
              <span className="text-indigo-600 font-bold">{selectedTool.name}</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              
              {/* Main Interactive Tool Area */}
              <div className="lg:col-span-3 space-y-6">
                {renderActiveToolComponent(selectedTool.id)}

                {/* In-Content Native Ad Placement */}
                <AdBanner type="in-content" />

                {/* SEO Rich FAQ & Guide Section for Google Rich Snippets */}
                <div className="glass-card rounded-2xl p-6 border border-slate-200 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-indigo-600" />
                    Frequently Asked Questions ({selectedTool.name})
                  </h3>
                  <div className="space-y-4">
                    {selectedTool.faqs.map((faq, index) => (
                      <div key={index} className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                        <h4 className="text-sm font-bold text-slate-900 mb-1.5 flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          {faq.question}
                        </h4>
                        <p className="text-xs text-slate-600 leading-relaxed pl-6 font-medium">
                          {faq.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar Desktop Area */}
              <div className="lg:col-span-1 space-y-6 hidden lg:block">
                <AdBanner type="sidebar" />
                
                <div className="glass-card rounded-2xl p-4 border border-slate-200 shadow-sm space-y-3 text-xs">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" /> 100% Free & Private
                  </div>
                  <p className="text-slate-500 leading-relaxed font-medium">
                    All file conversions run inside your Web Browser memory. Your files are never stored or transmitted to external servers.
                  </p>
                </div>
              </div>

            </div>
          </div>
        ) : (
          /* HOMEPAGE GRID VIEW */
          <div className="space-y-8">
            
            {/* Hero Section */}
            <div className="text-center max-w-3xl mx-auto py-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>100% Free Online Converter & SEO Utility Suite</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                Supercharge Your Workflow & <span className="gradient-text">SEO Performance</span>
              </h1>
              <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
                Convert WebP, PNG, JPG & PDF files, generate SEO meta tags, prettify JSON, and calculate loan EMIs with zero lag and 100% free client-side privacy.
              </p>
            </div>

            {/* Tools Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredTools.map((tool) => (
                <ToolCard
                  key={tool.id}
                  tool={tool}
                  onSelect={(t) => navigateToTool(t)}
                />
              ))}
            </div>

          </div>
        )}

      </main>

      {/* Footer */}
      <Footer
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          navigateToTool(null);
        }}
        onGoHome={() => {
          setActiveCategory('all');
          navigateToTool(null);
        }}
      />

      {/* Bottom Sticky Banner Placement */}
      <AdBanner type="sticky-bottom" />
    </div>
  );
}
export default App;
