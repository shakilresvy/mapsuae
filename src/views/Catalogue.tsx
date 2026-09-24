import { useState } from 'react';
import { CATALOGUE_PDFS } from '../data';
import { FileText, ExternalLink, BookOpen, Layers, CheckCircle2 } from 'lucide-react';

export default function Catalogue() {
  const [selectedPdfId, setSelectedPdfId] = useState<string>(CATALOGUE_PDFS[0].id);

  const activePdf = CATALOGUE_PDFS.find(p => p.id === selectedPdfId) || CATALOGUE_PDFS[0];

  return (
    <div className="w-full bg-white min-h-screen pb-24">
      {/* Header */}
      <div className="bg-gradient-to-b from-amber-50/50 via-white to-slate-50 text-slate-900 py-16 sm:py-20 border-b-2 border-amber-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border-2 border-amber-300 text-amber-900 text-xs sm:text-sm font-extrabold mb-4 shadow-2xs">
            <BookOpen className="w-4 h-4 text-amber-600" /> Official Parts Documentation
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-6">
            Product <span className="text-blue-900">Catalogue</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-medium">
            Browse our comprehensive digital catalogues. Explore detailed specs, technical diagrams, and OE cross-references for commercial vehicles and heavy transport equipment.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        {/* Official Catalog PDFs Hub */}
        <section className="mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 text-amber-700 font-extrabold text-sm tracking-wider uppercase mb-1">
                <Layers className="w-4 h-4 text-amber-600" /> Digital Documentation
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Official Parts Catalogues
              </h2>
              <p className="text-slate-600 mt-1 max-w-2xl font-medium">
                Select from our official technical volume catalogues below to view interactive diagrams, part numbers, and specifications.
              </p>
            </div>
            <div className="flex items-center gap-2 bg-blue-50 text-blue-900 px-4 py-2 rounded-xl text-xs sm:text-sm font-black border border-blue-200 shadow-2xs shrink-0">
              <FileText className="w-4 h-4 text-blue-700" /> 2 Volumes Available
            </div>
          </div>

          {/* 2 PDF Selector Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {CATALOGUE_PDFS.map((pdf) => {
              const isSelected = pdf.id === selectedPdfId;
              return (
                <div
                  key={pdf.id}
                  onClick={() => setSelectedPdfId(pdf.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setSelectedPdfId(pdf.id); }}
                  className={`cursor-pointer rounded-2xl p-6 transition-all duration-200 text-left border-2 flex flex-col justify-between relative ${
                    isSelected
                      ? 'bg-white text-slate-900 border-blue-900 shadow-xl ring-2 ring-blue-500/20 -translate-y-1'
                      : 'bg-white text-slate-800 border-slate-200 hover:border-amber-400 hover:shadow-md'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className={`text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider ${
                        isSelected 
                          ? 'bg-blue-900 text-amber-400 shadow-2xs' 
                          : 'bg-slate-100 text-slate-700 border border-slate-200'
                      }`}>
                        {pdf.badge}
                      </span>
                      {isSelected && (
                        <span className="flex items-center gap-1 text-xs font-bold text-blue-900">
                          <CheckCircle2 className="w-4 h-4 text-amber-500" /> Active Viewer
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-black mb-2 text-slate-900">
                      {pdf.title}
                    </h3>
                    <p className="text-xs font-bold mb-3 text-amber-800">
                      {pdf.subtitle}
                    </p>
                    <p className="text-sm leading-relaxed mb-6 text-slate-600 font-medium">
                      {pdf.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className={`text-xs font-extrabold ${isSelected ? 'text-blue-900' : 'text-slate-500'}`}>
                      {isSelected ? 'Viewing Document below ↓' : 'Click to Load in Viewer →'}
                    </span>
                    <a
                      href={pdf.driveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className={`p-2 rounded-lg transition-colors flex items-center gap-1.5 text-xs font-extrabold ${
                        isSelected 
                          ? 'bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200' 
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                      title="Open in Google Drive"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Open</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Embedded Interactive PDF Viewer Container */}
          <div className="bg-white rounded-2xl overflow-hidden border-2 border-amber-300 shadow-xl">
            {/* Viewer Toolbar Header */}
            <div className="px-6 py-4 bg-white border-b-2 border-amber-200 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 border-2 border-amber-300 flex items-center justify-center text-amber-600">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black bg-blue-900 text-amber-400 px-2 py-0.5 rounded">
                      {activePdf.badge}
                    </span>
                    <h3 className="text-base sm:text-lg font-black text-slate-900">
                      {activePdf.title}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    {activePdf.subtitle}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={activePdf.driveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs sm:text-sm font-black shadow-md transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Open Full Screen</span>
                </a>
              </div>
            </div>

            {/* Embedded Google Drive PDF Viewer Frame */}
            <div className="w-full h-[750px] sm:h-[900px] bg-slate-100 relative">
              <iframe
                key={activePdf.driveId}
                src={activePdf.embedUrl}
                className="w-full h-full border-none"
                title={`${activePdf.title} PDF Viewer`}
                allow="autoplay"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
