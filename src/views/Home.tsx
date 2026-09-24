import { useState, useEffect, useRef, useMemo } from 'react';
import { 
  CATALOGUE_VOL_3, 
  getSearchableInventory, 
  getAllQuickHeadlines, 
  PartRecord, 
  QuickHeadline, 
  COMPANY_INFO,
  CONTACT_CONFIG,
  getWhatsAppUrl,
  getPhoneUrl,
  getGoogleImagesUrl
} from '../data';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import ErrorBoundary from '../components/ErrorBoundary';
import { 
  Search, 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  Settings2, 
  CheckCircle2, 
  ExternalLink, 
  Copy, 
  Check, 
  Phone, 
  PackageX, 
  AlertCircle,
  X,
  Sparkles,
  Layers,
  FileText,
  BookOpen,
  HeartHandshake,
  Award,
  Trophy,
  Disc,
  Wrench,
  Zap,
  Truck,
  Battery,
  HardHat,
  Droplets,
  BadgeCheck,
  Shield,
  Star
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<PartRecord[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [copiedPart, setCopiedPart] = useState<string | null>(null);

  // Dynamic Headline Ticker Pool
  const allHeadlines = useMemo(() => getAllQuickHeadlines(), []);
  
  // Random dynamic headline
  const [currentHeadline, setCurrentHeadline] = useState<QuickHeadline>(() => {
    const list = getAllQuickHeadlines();
    return list[Math.floor(Math.random() * list.length)] || {
      num: '64215',
      desc: 'H-7 Bulb LED / White',
      category: 'Electrical & Lighting'
    };
  });
  const [headlineKey, setHeadlineKey] = useState(0);
  const [isTickerPaused, setIsTickerPaused] = useState(false);

  const resultsRef = useRef<HTMLDivElement | null>(null);

  // Auto-shuffle to a truly random fresh item every 3 seconds so it's always random instead of a fixed loop
  useEffect(() => {
    if (isTickerPaused || allHeadlines.length === 0) return;

    const tickerInterval = setInterval(() => {
      setCurrentHeadline((prev) => {
        if (allHeadlines.length <= 1) return allHeadlines[0];
        let next: QuickHeadline;
        let attempts = 0;
        do {
          next = allHeadlines[Math.floor(Math.random() * allHeadlines.length)];
          attempts++;
        } while (next.num === prev.num && attempts < 10);
        return next;
      });
      setHeadlineKey((k) => k + 1);
    }, 3000);

    return () => clearInterval(tickerInterval);
  }, [isTickerPaused, allHeadlines]);

  // Search logic
  const performSearch = (queryTerm: string) => {
    const term = queryTerm.trim().toLowerCase();
    if (!term) {
      setResults([]);
      setHasSearched(false);
      return;
    }
    
    // Strict search inside OE inventory database
    const inventory = getSearchableInventory();
    const matched = inventory.filter(record => 
      record.partNumber.toLowerCase().includes(term) ||
      record.descriptions.some(d => d.toLowerCase().includes(term))
    );
    
    setResults(matched);
    setHasSearched(true);

    // Scroll smoothly to results
    setTimeout(() => {
      const elem = resultsRef.current || document.getElementById('search-results-section');
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 120);
  };

  // Initialize from hash query param if exists (e.g. #search?q=109975982 or #home?q=64215)
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash.includes('?q=')) {
        const q = decodeURIComponent(hash.split('?q=')[1] || '').split('&')[0];
        if (q) {
          setSearchQuery(q);
          performSearch(q);
        }
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Listen to custom search events dispatched from Navbar or Quick Try ticker
  useEffect(() => {
    const handleSearchEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ query: string }>;
      if (customEvent.detail && customEvent.detail.query) {
        const q = customEvent.detail.query;
        setSearchQuery(q);
        performSearch(q);
      }
    };
    window.addEventListener('maps-search-event', handleSearchEvent);
    return () => window.removeEventListener('maps-search-event', handleSearchEvent);
  }, []);

  const handleCopyPart = (partNum: string) => {
    navigator.clipboard.writeText(partNum);
    setCopiedPart(partNum);
    setTimeout(() => setCopiedPart(null), 2000);
  };

  const handleQuickHeadlineClick = (num: string) => {
    setSearchQuery(num);
    performSearch(num);
    window.dispatchEvent(new CustomEvent('maps-search-event', {
      detail: { query: num }
    }));
  };

  return (
    <div className="w-full">
      {/* Hero Section with Centered Text & Dynamic Infinite News-Style Quick Try Headline Ticker */}
      <section className="relative bg-gradient-to-b from-amber-50/40 via-white to-slate-50 overflow-hidden border-b-2 border-amber-200/80">
        <div className="absolute inset-0 pointer-events-none">
          <img 
            src="https://lh3.googleusercontent.com/d/1qvTlzZTAspGXCXrzVtAyoLPmhoAtUP71" 
            alt="Commercial automotive parts warehouse background" 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-15"
            onError={(e) => {
              const target = e.currentTarget;
              if (!target.dataset.fallback) {
                target.dataset.fallback = 'true';
                target.src = 'https://drive.google.com/thumbnail?id=1qvTlzZTAspGXCXrzVtAyoLPmhoAtUP71&sz=w2000';
              }
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/85 via-white/75 to-white/95" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 flex flex-col items-center text-center">
          
          {/* Top Tagline Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border-2 border-amber-300 text-amber-900 text-xs sm:text-sm font-extrabold mb-6 shadow-2xs">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>Live OE Inventory & Direct Google Image Lookup</span>
          </div>

          {/* Centered Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight mb-6 leading-tight max-w-4xl">
            Genuine OE, Aftermarket and Budget Parts for <span className="text-blue-900">European Trucks & Trailers</span>
          </h1>

          {/* Centered Description */}
          <p className="text-base sm:text-lg lg:text-xl text-slate-600 mb-8 max-w-3xl leading-relaxed font-medium">
            Search by exact part number to instantly verify stock, inspect technical fitment, and look up real-world product photos on Google Images.
          </p>

          {/* Quick Try: Dynamic News Headline Style Rotating Ticker (Infinite Diverse Feed) */}
          <div 
            className="w-full max-w-4xl lg:max-w-5xl bg-white border-2 border-amber-300 hover:border-blue-900 rounded-2xl p-2.5 sm:p-3.5 mb-10 shadow-lg backdrop-blur-sm transition-all flex flex-col sm:flex-row items-center gap-3.5"
            onMouseEnter={() => setIsTickerPaused(true)}
            onMouseLeave={() => setIsTickerPaused(false)}
          >
            {/* News Ticker Label Badge with Live Pulsing Dot */}
            <div className="flex items-center gap-2 bg-blue-900 text-amber-400 font-black text-xs uppercase px-3.5 py-1.5 rounded-xl shrink-0 shadow-xs tracking-wider border-2 border-amber-400/40">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600"></span>
              </span>
              <span>Quick Try:</span>
            </div>

            {/* Rotating Animated Headline Item - Centered with snug Search Part button */}
            <div className="overflow-hidden flex-1 w-full min-h-[36px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${currentHeadline.num}-${headlineKey}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.28, ease: 'easeOut' }}
                  className="w-full flex items-center justify-center gap-2.5 sm:gap-3.5 cursor-pointer group px-1"
                  onClick={() => handleQuickHeadlineClick(currentHeadline.num)}
                  title="Click to search this OE part number"
                >
                  <div className="flex flex-wrap items-center justify-center gap-2 text-center">
                    <span className="font-mono font-black text-blue-900 text-sm sm:text-base group-hover:text-blue-700 underline decoration-blue-400/40 underline-offset-2 shrink-0">
                      #{currentHeadline.num}
                    </span>
                    <span className="text-slate-800 text-xs sm:text-sm font-bold tracking-normal">
                      ({currentHeadline.desc})
                    </span>
                    <span className="hidden md:inline-block text-[11px] font-bold text-amber-900 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md shrink-0">
                      {currentHeadline.category}
                    </span>
                  </div>

                  <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-blue-900 group-hover:text-white shrink-0 bg-blue-50 group-hover:bg-blue-900 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl border border-blue-200 transition-colors shadow-2xs">
                    <span>Search Part</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Centered Key Value Badges */}
          <div className="w-full max-w-4xl lg:max-w-5xl grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t-2 border-amber-100">
            <div className="flex items-center justify-center gap-3 bg-white p-3.5 rounded-2xl border-2 border-amber-200/80 shadow-xs">
              <div className="bg-amber-50 p-2.5 rounded-xl text-amber-600 border border-amber-200 shrink-0 shadow-2xs">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="text-left">
                <h3 className="text-slate-900 font-extrabold text-sm">Genuine OEM</h3>
                <p className="text-slate-500 text-xs font-medium">Direct European supply</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 bg-white p-3.5 rounded-2xl border-2 border-amber-200/80 shadow-xs">
              <div className="bg-amber-50 p-2.5 rounded-xl text-amber-600 border border-amber-200 shrink-0 shadow-2xs">
                <Settings2 className="w-6 h-6" />
              </div>
              <div className="text-left">
                <h3 className="text-slate-900 font-extrabold text-sm">Exact Fitment</h3>
                <p className="text-slate-500 text-xs font-medium">Cross-referenced numbers</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 bg-white p-3.5 rounded-2xl border-2 border-amber-200/80 shadow-xs">
              <div className="bg-amber-50 p-2.5 rounded-xl text-amber-600 border border-amber-200 shrink-0 shadow-2xs">
                <Clock className="w-6 h-6" />
              </div>
              <div className="text-left">
                <h3 className="text-slate-900 font-extrabold text-sm">Fast Inquiry</h3>
                <p className="text-slate-500 text-xs font-medium">Immediate WhatsApp reply</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Dynamic Search Results Section (Shown whenever user searches) */}
      {hasSearched && (
        <section id="search-results-section" ref={resultsRef} className="py-12 bg-slate-50/70 border-b-2 border-slate-200 scroll-mt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ErrorBoundary compact resetKeys={[searchQuery, results.length]}>
              {results.length > 0 ? (
                <div className="max-w-5xl mx-auto">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                      <span className="text-blue-900">{results.length}</span> Part{results.length !== 1 && 's'} Found in Inventory
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
                      Search results for <span className="font-bold text-slate-900">"{searchQuery}"</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 self-start">
                    <a
                      href={getPhoneUrl(CONTACT_CONFIG.showroom.primaryPhone)}
                      className="inline-flex items-center gap-1.5 bg-white hover:bg-blue-50 text-blue-900 border-2 border-blue-200 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all shadow-2xs"
                    >
                      <Phone className="w-4 h-4 text-blue-700" />
                      <span>Call Showroom</span>
                    </a>
                    <a
                      href={getWhatsAppUrl(`Hello MAPS UAE, I am inquiring about search results for "${searchQuery}".`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-xs"
                    >
                      <WhatsAppIcon className="w-4 h-4" />
                      <span>WhatsApp Inquiry</span>
                    </a>
                  </div>
                </div>

                <div className="space-y-6">
                  {results.map((item) => {
                    const googleImagesUrl = getGoogleImagesUrl(item.partNumber, item.descriptions);
                    const primaryDesc = item.descriptions[0] || 'Automotive Replacement Part';

                    return (
                      <div 
                        key={item.partNumber} 
                        className="bg-white rounded-2xl shadow-md border-2 border-amber-200 hover:border-blue-900 transition-all duration-200 p-6 sm:p-8"
                      >
                        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                          
                          {/* Part Details */}
                          <div className="flex-grow">
                            <div className="flex flex-wrap items-center gap-2.5 mb-2">
                              <span className="bg-blue-50 text-blue-900 text-xs font-mono font-black px-2.5 py-1 rounded-md border border-blue-200 shadow-2xs">
                                OE RECORD
                              </span>
                              <div className="flex flex-wrap items-center gap-1.5">
                                <a
                                  href={googleImagesUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 bg-amber-50 hover:bg-amber-100 text-slate-900 border border-amber-300 text-xs font-bold px-2.5 py-1 rounded-md transition-colors shadow-2xs"
                                  title="Google search photos of this part"
                                >
                                  <Search className="w-3 h-3 text-amber-700" />
                                  <span>Google Photos</span>
                                  <ExternalLink className="w-2.5 h-2.5 opacity-60 ml-0.5" />
                                </a>
                                <a
                                  href={getPhoneUrl(CONTACT_CONFIG.showroom.primaryPhone)}
                                  className="inline-flex items-center gap-1 bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200 text-xs font-bold px-2.5 py-1 rounded-md transition-colors"
                                  title="Call Showroom for this part"
                                >
                                  <Phone className="w-3 h-3 text-amber-600" />
                                  <span>Call</span>
                                </a>
                                <a
                                  href={getWhatsAppUrl(`Hello MAPS UAE, I am inquiring about OE Part #${item.partNumber} (${primaryDesc}).`)}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-2.5 py-1 rounded-md transition-colors shadow-2xs"
                                  title="WhatsApp Inquiry for this part"
                                >
                                  <WhatsAppIcon className="w-3 h-3" />
                                  <span>WhatsApp</span>
                                </a>
                              </div>
                            </div>

                            <div className="flex items-baseline gap-3 my-2">
                              <h3 className="text-3xl sm:text-4xl font-black text-blue-900 font-mono tracking-tight">
                                #{item.partNumber}
                              </h3>
                              <button
                                type="button"
                                onClick={() => handleCopyPart(item.partNumber)}
                                className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                                title="Copy part number"
                              >
                                {copiedPart === item.partNumber ? (
                                  <Check className="w-5 h-5 text-emerald-600" />
                                ) : (
                                  <Copy className="w-5 h-5" />
                                )}
                              </button>
                            </div>

                            {/* Descriptions list */}
                            <div className="mt-4 space-y-2">
                              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                Description & Fitment
                              </p>
                              <ul className="space-y-1.5">
                                {item.descriptions.map((desc, idx) => (
                                  <li key={idx} className="flex items-start gap-2 text-slate-700 text-sm sm:text-base font-semibold">
                                    <span className="text-amber-500 font-bold text-base">●</span>
                                    <span>{desc}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          {/* Actions Column */}
                          <div className="lg:w-80 shrink-0 flex flex-col gap-3 pt-4 lg:pt-0 lg:border-l lg:border-slate-100 lg:pl-6">
                            {/* Dedicated Google Search Button */}
                            <a 
                              href={googleImagesUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black py-3 px-4 rounded-xl border-2 border-amber-600/30 transition-all shadow-xs text-sm group/btn"
                            >
                              <Search className="w-4 h-4 text-slate-950 group-hover/btn:scale-110 transition-transform" />
                              <span>Google Search Item</span>
                              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                            </a>

                            {/* WhatsApp Inquiry */}
                            <a 
                              href={getWhatsAppUrl(`Hello MAPS UAE, I am inquiring about OE Part #${item.partNumber} (${primaryDesc}). Is it currently available in stock?`)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-xs text-sm"
                            >
                              <WhatsAppIcon className="w-4 h-4" />
                              <span>Inquire via WhatsApp</span>
                            </a>
                            
                            {/* Showroom Direct Details */}
                            <a 
                              href="#profile" 
                              className="w-full flex items-center justify-center gap-2 bg-slate-50 hover:bg-amber-50 text-slate-800 font-bold py-2.5 px-4 rounded-xl border border-slate-200 transition-colors text-xs"
                            >
                              <span>Showroom Phone & Location</span>
                              <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                            </a>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              /* No Results State */
              <div className="max-w-2xl mx-auto text-center py-12 bg-white rounded-2xl border-2 border-amber-200 shadow-sm p-8">
                <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-300 flex items-center justify-center text-amber-600 mx-auto mb-4">
                  <PackageX className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-2">No direct match found</h3>
                <p className="text-slate-600 mb-6 max-w-md mx-auto leading-relaxed text-sm font-medium">
                  We couldn't find an exact match for <span className="font-mono bg-blue-50 text-blue-900 border border-blue-200 px-2 py-0.5 rounded font-black">"{searchQuery}"</span> in our indexed database. Our Musaffah warehouse stocks 50,000+ parts.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a 
                    href={`https://www.google.com/search?tbm=isch&q=${encodeURIComponent(searchQuery + ' auto truck part')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-blue-900 hover:bg-blue-800 text-amber-400 font-extrabold px-5 py-2.5 rounded-xl transition-colors shadow-xs text-sm"
                  >
                    <Search className="w-4 h-4 text-amber-400" /> Google Search "{searchQuery}"
                    <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                  </a>
                  <a href="#catalogue" className="flex items-center gap-2 bg-white hover:bg-amber-50 text-slate-800 font-bold px-5 py-2.5 rounded-xl border border-slate-300 transition-colors shadow-2xs text-sm">
                    <Layers className="w-4 h-4 text-amber-600" /> Browse Catalogues
                  </a>
                  <a 
                    href={getWhatsAppUrl(`Hello MAPS UAE, I need help finding part number: ${searchQuery}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2.5 rounded-xl transition-colors shadow-xs text-sm"
                  >
                    <WhatsAppIcon className="w-4 h-4" /> Ask Sales Team
                  </a>
                </div>
                
                <div className="mt-6 flex items-start gap-3 bg-amber-50 p-3.5 rounded-xl text-left max-w-lg mx-auto border border-amber-300">
                  <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                  <p className="text-xs text-amber-900 leading-relaxed font-medium">
                    <strong>Search Tip:</strong> Ensure you are entering the exact numeric part number (e.g. <code className="font-bold text-blue-900">64215</code>, <code className="font-bold text-blue-900">109975982</code>, <code className="font-bold text-blue-900">69782</code>). You can also contact our Musaffah showroom at <strong>{CONTACT_CONFIG.showroom.primaryPhone}</strong>.
                  </p>
                </div>
              </div>
            )}
            </ErrorBoundary>
          </div>
        </section>
      )}

      {/* Metrics Section */}
      <section className="bg-gradient-to-r from-amber-50/80 via-white to-blue-50/60 py-12 border-y-2 border-amber-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-amber-200">
            <div>
              <p className="text-4xl font-black text-slate-900 mb-2">10,000+</p>
              <p className="text-xs font-black text-blue-950 uppercase tracking-wider">OE Parts Indexed</p>
            </div>
            <div>
              <p className="text-4xl font-black text-slate-900 mb-2">9+</p>
              <p className="text-xs font-black text-blue-950 uppercase tracking-wider">Major Categories</p>
            </div>
            <div>
              <p className="text-4xl font-black text-slate-900 mb-2">30+</p>
              <p className="text-xs font-black text-blue-950 uppercase tracking-wider">Years Experience</p>
            </div>
            <div>
              <p className="text-4xl font-black text-slate-900 mb-2">2</p>
              <p className="text-xs font-black text-blue-950 uppercase tracking-wider">Major Facilities</p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values and Philosophy Section */}
      <section className="py-20 bg-white text-slate-900 relative overflow-hidden border-b-2 border-amber-200/80">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border-2 border-amber-300 text-amber-900 text-xs sm:text-sm font-extrabold mb-4 shadow-2xs">
              <HeartHandshake className="w-4 h-4 text-amber-600" />
              <span>Core Values & Philosophy</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 mb-4">
              "Honesty is our capital"
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-medium">
              At MAPS (Mohd. Amin Automotive Parts Shop L.L.C.), our management prides itself on transparent customer service and absolute integrity in every transaction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Value Card 1 */}
            <div className="bg-white border-2 border-amber-200 hover:border-blue-900 rounded-2xl p-8 transition-all duration-300 shadow-md flex flex-col">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 border-2 border-amber-300 flex items-center justify-center text-amber-600 mb-6 shrink-0 shadow-2xs">
                <BadgeCheck className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-3">Genuine vs. Duplicate Clarity</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4 flex-1 font-medium">
                We maintain an uncompromising commitment to being completely open with customers regarding whether products are <strong className="text-slate-900">genuine OE, aftermarket OEM, or replacement duplicates</strong> upon request.
              </p>
              <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-blue-900">
                <CheckCircle2 className="w-4 h-4 text-amber-500" /> 100% Disclosure & Clear Advice
              </div>
            </div>

            {/* Value Card 2 */}
            <div className="bg-white border-2 border-amber-200 hover:border-blue-900 rounded-2xl p-8 transition-all duration-300 shadow-md flex flex-col">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 border-2 border-amber-300 flex items-center justify-center text-amber-600 mb-6 shrink-0 shadow-2xs">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-3">Direct Supply Integrity</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4 flex-1 font-medium">
                Sourcing directly from globally accredited Tier-1 manufacturers and certified distributors across Germany, Europe, and Japan to guarantee mechanical reliability for heavy transport fleets.
              </p>
              <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-blue-900">
                <CheckCircle2 className="w-4 h-4 text-amber-500" /> Verified Tier-1 Quality
              </div>
            </div>

            {/* Value Card 3 */}
            <div className="bg-white border-2 border-amber-200 hover:border-blue-900 rounded-2xl p-8 transition-all duration-300 shadow-md flex flex-col">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 border-2 border-amber-300 flex items-center justify-center text-amber-600 mb-6 shrink-0 shadow-2xs">
                <HeartHandshake className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-3">Long-Term Fleet Partnerships</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4 flex-1 font-medium">
                Building trust across over three decades of service with commercial fleet operators, logistics companies, workshops, and contractors throughout Abu Dhabi, Dubai, and the GCC.
              </p>
              <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-blue-900">
                <CheckCircle2 className="w-4 h-4 text-amber-500" /> Over 30 Years of Trusted Service
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comprehensive Product Categories Section */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border-2 border-amber-300 text-amber-900 text-xs sm:text-sm font-extrabold mb-3 shadow-2xs">
                <Layers className="w-4 h-4 text-amber-600" />
                <span>Extensive Fleet Inventory</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
                Product Categories
              </h2>
              <p className="text-slate-600 max-w-2xl mt-2 text-sm sm:text-base leading-relaxed font-medium">
                We provide a highly comprehensive inventory of automotive and heavy machinery parts, supporting mechanical overhauls, routine fleet maintenance, and occupational safety.
              </p>
            </div>

            <a
              href={getWhatsAppUrl('Hello MAPS UAE, I would like to inquire about parts availability across your product categories.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-3 rounded-xl transition-all shadow-md text-sm shrink-0 self-start md:self-auto"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span>Inquire for Any Category</span>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Category 1 */}
            <div className="bg-white rounded-2xl border-2 border-slate-200 hover:border-amber-400 p-6 shadow-sm transition-all duration-200 hover:shadow-md flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center mb-4">
                  <Disc className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Axle, Steering & Braking Systems
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  Brake drums, discs, brake linings, pads, slack adjusters, tie rods, drag links, brake chambers, master cylinders, and Wabco/Knorr air brake valves.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-bold text-blue-900">Heavy Trucks & Trailers</span>
                <div className="flex items-center gap-1.5">
                  <a 
                    href={getPhoneUrl(CONTACT_CONFIG.showroom.primaryPhone)} 
                    className="inline-flex items-center gap-1 bg-amber-50 hover:bg-amber-100 text-amber-800 text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-md border border-amber-200 transition-colors"
                  >
                    <Phone className="w-3 h-3 text-amber-600" /> Call
                  </a>
                  <a 
                    href={getWhatsAppUrl('Hello MAPS UAE, I am inquiring about parts for Heavy Trucks & Trailers (Axle, Steering & Braking Systems).')} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-md border border-emerald-200 transition-colors"
                  >
                    <WhatsAppIcon className="w-3 h-3" /> WhatsApp
                  </a>
                </div>
              </div>
            </div>

            {/* Category 2 */}
            <div className="bg-white rounded-2xl border-2 border-slate-200 hover:border-amber-400 p-6 shadow-sm transition-all duration-200 hover:shadow-md flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center mb-4">
                  <Wrench className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Engine, Exhaust & Filter Systems
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  Complete oil, fuel, air, and hydraulic filter elements from Fleetguard, Mann, Donaldson & Hengst; plus turbochargers, manifolds, silencers, and overhaul gasket sets.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-bold text-blue-900">Powertrain & Filtration</span>
                <div className="flex items-center gap-1.5">
                  <a 
                    href={getPhoneUrl(CONTACT_CONFIG.showroom.primaryPhone)} 
                    className="inline-flex items-center gap-1 bg-amber-50 hover:bg-amber-100 text-amber-800 text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-md border border-amber-200 transition-colors"
                  >
                    <Phone className="w-3 h-3 text-amber-600" /> Call
                  </a>
                  <a 
                    href={getWhatsAppUrl('Hello MAPS UAE, I am inquiring about parts for Powertrain & Filtration (Engine, Exhaust & Filter Systems).')} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-md border border-emerald-200 transition-colors"
                  >
                    <WhatsAppIcon className="w-3 h-3" /> WhatsApp
                  </a>
                </div>
              </div>
            </div>

            {/* Category 3 */}
            <div className="bg-white rounded-2xl border-2 border-slate-200 hover:border-amber-400 p-6 shadow-sm transition-all duration-200 hover:shadow-md flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Electrical & A/C Parts
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  Heavy-duty 24V alternators, starter motors, Hella & Bosch LED lighting, halogen bulbs, relays, sensors, switches, A/C compressors, condensers, and cabin blowers.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-bold text-blue-900">24V Commercial Systems</span>
                <div className="flex items-center gap-1.5">
                  <a 
                    href={getPhoneUrl(CONTACT_CONFIG.showroom.primaryPhone)} 
                    className="inline-flex items-center gap-1 bg-amber-50 hover:bg-amber-100 text-amber-800 text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-md border border-amber-200 transition-colors"
                  >
                    <Phone className="w-3 h-3 text-amber-600" /> Call
                  </a>
                  <a 
                    href={getWhatsAppUrl('Hello MAPS UAE, I am inquiring about parts for 24V Commercial Systems (Electrical & A/C Parts).')} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-md border border-emerald-200 transition-colors"
                  >
                    <WhatsAppIcon className="w-3 h-3" /> WhatsApp
                  </a>
                </div>
              </div>
            </div>

            {/* Category 4 */}
            <div className="bg-white rounded-2xl border-2 border-slate-200 hover:border-amber-400 p-6 shadow-sm transition-all duration-200 hover:shadow-md flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center mb-4">
                  <Truck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Universal Parts for Trucks & Trailers
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  Fifth wheels, kingpins, heavy landing gears, container twist locks, mudguards, air springs/bellows, hubs, wheel studs, and high-pressure pneumatic fittings.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-bold text-blue-900">Semi & Flatbed Trailers</span>
                <div className="flex items-center gap-1.5">
                  <a 
                    href={getPhoneUrl(CONTACT_CONFIG.showroom.primaryPhone)} 
                    className="inline-flex items-center gap-1 bg-amber-50 hover:bg-amber-100 text-amber-800 text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-md border border-amber-200 transition-colors"
                  >
                    <Phone className="w-3 h-3 text-amber-600" /> Call
                  </a>
                  <a 
                    href={getWhatsAppUrl('Hello MAPS UAE, I am inquiring about parts for Semi & Flatbed Trailers (Universal Parts).')} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-md border border-emerald-200 transition-colors"
                  >
                    <WhatsAppIcon className="w-3 h-3" /> WhatsApp
                  </a>
                </div>
              </div>
            </div>

            {/* Category 5 */}
            <div className="bg-white rounded-2xl border-2 border-slate-200 hover:border-amber-400 p-6 shadow-sm transition-all duration-200 hover:shadow-md flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center mb-4">
                  <Battery className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Diverse Range of Batteries & Tyre Tubes
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  High-cranking commercial maintenance-free batteries for heavy diesel engines, diverse automotive tyre tubes, tyre flaps, valves, and puncture repair accessories.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-bold text-blue-900">Power & Wheel Hardware</span>
                <div className="flex items-center gap-1.5">
                  <a 
                    href={getPhoneUrl(CONTACT_CONFIG.showroom.primaryPhone)} 
                    className="inline-flex items-center gap-1 bg-amber-50 hover:bg-amber-100 text-amber-800 text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-md border border-amber-200 transition-colors"
                  >
                    <Phone className="w-3 h-3 text-amber-600" /> Call
                  </a>
                  <a 
                    href={getWhatsAppUrl('Hello MAPS UAE, I am inquiring about Batteries & Tyre Tubes.')} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-md border border-emerald-200 transition-colors"
                  >
                    <WhatsAppIcon className="w-3 h-3" /> WhatsApp
                  </a>
                </div>
              </div>
            </div>

            {/* Category 6 */}
            <div className="bg-white rounded-2xl border-2 border-slate-200 hover:border-amber-400 p-6 shadow-sm transition-all duration-200 hover:shadow-md flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center mb-4">
                  <HardHat className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Hardware Items & Safety Gear
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  Complete PPE safety gear including industrial hard hats, steel-toe safety boots, high-visibility reflective vests, heavy-duty work gloves, and certified fire extinguishers.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-bold text-blue-900">PPE & Site Protection</span>
                <div className="flex items-center gap-1.5">
                  <a 
                    href={getPhoneUrl(CONTACT_CONFIG.showroom.primaryPhone)} 
                    className="inline-flex items-center gap-1 bg-amber-50 hover:bg-amber-100 text-amber-800 text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-md border border-amber-200 transition-colors"
                  >
                    <Phone className="w-3 h-3 text-amber-600" /> Call
                  </a>
                  <a 
                    href={getWhatsAppUrl('Hello MAPS UAE, I am inquiring about Hardware Items & Safety Gear.')} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-md border border-emerald-200 transition-colors"
                  >
                    <WhatsAppIcon className="w-3 h-3" /> WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brands and Vehicle Specializations Section */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border-2 border-amber-300 text-amber-900 text-xs sm:text-sm font-extrabold mb-3 shadow-2xs">
              <Truck className="w-4 h-4 text-amber-600" />
              <span>Specializations & Tier-1 Partners</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mb-4">
              Brands and Vehicle Specializations
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-medium">
              MAPS services major heavy vehicle brands and carries a wide array of genuine parts and premium maintenance fluids from world-renowned manufacturers.
            </p>
          </div>

          {/* 1. Heavy Vehicle Brands */}
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-6 pb-2 border-b-2 border-amber-100">
              <span className="bg-blue-50 text-blue-900 border border-blue-200 font-black text-xs px-2.5 py-1 rounded-md">
                TRUCK FLEETS
              </span>
              <h3 className="text-xl font-black text-slate-900">
                Major Commercial Vehicle Brands Serviced
              </h3>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { name: "Mercedes-Benz", models: "Actros • Atego • Axor" },
                { name: "Volvo Trucks", models: "FH • FM • FMX" },
                { name: "MAN Truck & Bus", models: "TGX • TGS • TGM" },
                { name: "Scania", models: "R-Series • G-Series • P-Series" },
                { name: "ISUZU", models: "NPR • NQR • Forward • Giga" },
                { name: "Mitsubishi Fuso", models: "Canter • Fighter • Super Great" }
              ].map((brand) => (
                <div 
                  key={brand.name}
                  className="bg-slate-50 border-2 border-slate-200 hover:border-amber-400 rounded-2xl p-4 text-center transition-all duration-200 hover:shadow-md flex flex-col items-center justify-center min-h-[110px]"
                >
                  <span className="font-black text-slate-900 text-base tracking-tight mb-1">
                    {brand.name}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-500">
                    {brand.models}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 2. Genuine Parts Manufacturers */}
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-6 pb-2 border-b-2 border-amber-100">
              <span className="bg-blue-50 text-blue-900 border border-blue-200 font-black text-xs px-2.5 py-1 rounded-md">
                OEM BRANDS
              </span>
              <h3 className="text-xl font-black text-slate-900">
                Genuine Parts from Well-Known Manufacturers
              </h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
              {[
                { name: "Bosch", spec: "Electrical & Fuel" },
                { name: "Sachs", spec: "Clutch & Shocks" },
                { name: "Valeo", spec: "Thermal & Starters" },
                { name: "Hella", spec: "Lighting & Sensors" },
                { name: "Wabco", spec: "Air Brake Systems" },
                { name: "febi", spec: "Steering & Engine" },
                { name: "LUK", spec: "Transmission" },
                { name: "Hengst", spec: "Filtration Systems" }
              ].map((maker) => (
                <div 
                  key={maker.name}
                  className="bg-white text-slate-900 rounded-xl p-3.5 text-center border-2 border-amber-200 hover:border-blue-900 transition-colors shadow-2xs"
                >
                  <p className="font-black text-blue-900 text-base tracking-tight">{maker.name}</p>
                  <p className="text-[10px] text-slate-500 font-bold mt-0.5">{maker.spec}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Maintenance Fluids, Grease & Motor Oils */}
          <div>
            <div className="flex items-center gap-3 mb-6 pb-2 border-b-2 border-amber-100">
              <span className="bg-blue-50 text-blue-900 border border-blue-200 font-black text-xs px-2.5 py-1 rounded-md">
                LUBRICATION
              </span>
              <h3 className="text-xl font-black text-slate-900">
                Maintenance Fluids, Heavy Duty Grease & Motor Oils
              </h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { name: "Shell", type: "Rimula & Tellus Oils" },
                { name: "Total", type: "Rubia Engine & Gear Oils" },
                { name: "Valvoline", type: "All-Fleet HD Lubricants" },
                { name: "Caltex", type: "Delo Heavy Duty Fluids" },
                { name: "Gulf", type: "Superfleet & EP Greases" },
                { name: "ZIC", type: "Synthetic Commercial Oils" }
              ].map((fluid) => (
                <div 
                  key={fluid.name}
                  className="bg-amber-50/60 border-2 border-amber-300/80 rounded-xl p-4 text-center hover:bg-amber-100/60 transition-colors shadow-2xs"
                >
                  <div className="flex items-center justify-center text-amber-600 mb-1.5">
                    <Droplets className="w-5 h-5" />
                  </div>
                  <h4 className="font-black text-slate-900 text-base">{fluid.name}</h4>
                  <p className="text-[11px] font-bold text-slate-600 mt-0.5">{fluid.type}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Awards and Recognition Section */}
      <section className="py-20 bg-white text-slate-900 border-b-2 border-amber-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border-2 border-blue-200 text-blue-900 text-xs sm:text-sm font-black mb-3 shadow-2xs">
                <Trophy className="w-4 h-4 text-blue-700" />
                <span>Industry Credibility</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900">
                Awards and Recognition
              </h2>
              <p className="text-slate-600 max-w-2xl mt-2 text-sm sm:text-base leading-relaxed font-medium">
                The company's profile highlights its industry credibility through multiple awards, certified distributor recognitions, and plaques of excellence from established partners such as Total, Bosch, and AtlasEx.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-extrabold text-amber-900 bg-amber-50 border-2 border-amber-300 px-4 py-2.5 rounded-xl shrink-0 self-start shadow-2xs">
              <Shield className="w-4 h-4 text-amber-600" />
              <span>Verified Commercial Partner in UAE</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Award 1 */}
            <div className="bg-white border-2 border-amber-200 hover:border-blue-900 rounded-2xl p-6 transition-all duration-300 shadow-md flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-50 border-2 border-amber-300 flex items-center justify-center text-amber-600 shadow-2xs">
                    <Award className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-mono font-black bg-blue-50 text-blue-900 border border-blue-200 px-2.5 py-1 rounded-md">
                    TOTAL PARTNER
                  </span>
                </div>
                <h3 className="text-lg font-black text-slate-900 mb-2">
                  TotalEnergies Outstanding Partner Recognition
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4 font-medium">
                  Honoring MAPS for exceptional distribution volume, quality compliance, and consistent supply of certified Total Rubia heavy-duty lubricants across UAE transport sectors.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 text-xs font-bold text-blue-900 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-amber-500" /> Certified Lubricants Distributor
              </div>
            </div>

            {/* Award 2 */}
            <div className="bg-white border-2 border-amber-200 hover:border-blue-900 rounded-2xl p-6 transition-all duration-300 shadow-md flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-50 border-2 border-amber-300 flex items-center justify-center text-amber-600 shadow-2xs">
                    <Trophy className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-mono font-black bg-blue-50 text-blue-900 border border-blue-200 px-2.5 py-1 rounded-md">
                    BOSCH EXCELLENCE
                  </span>
                </div>
                <h3 className="text-lg font-black text-slate-900 mb-2">
                  Bosch Automotive Aftermarket Plaque
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4 font-medium">
                  Commemorating MAPS' commitment to technical precision, authentic electrical & braking parts supply, and long-standing partnership excellence.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 text-xs font-bold text-blue-900 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-amber-500" /> OEM Parts Sourcing Partner
              </div>
            </div>

            {/* Award 3 */}
            <div className="bg-white border-2 border-amber-200 hover:border-blue-900 rounded-2xl p-6 transition-all duration-300 shadow-md flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-50 border-2 border-amber-300 flex items-center justify-center text-amber-600 shadow-2xs">
                    <BadgeCheck className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-mono font-black bg-blue-50 text-blue-900 border border-blue-200 px-2.5 py-1 rounded-md">
                    ATLASEX CREDIBILITY
                  </span>
                </div>
                <h3 className="text-lg font-black text-slate-900 mb-2">
                  AtlasEx Global Sourcing Milestone
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4 font-medium">
                  Recognizing MAPS for logistics reliability, transparent trade ethics, and seamless supply continuity for heavy equipment and trailer assemblies.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 text-xs font-bold text-blue-900 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-amber-500" /> Global Supply Chain Credibility
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Catalogue: Volume 3 */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border-2 border-amber-300 text-amber-900 text-xs sm:text-sm font-extrabold mb-3 shadow-2xs">
                <BookOpen className="w-4 h-4 text-amber-600" /> Featured Digital Documentation
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
                {CATALOGUE_VOL_3.title}
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href={CATALOGUE_VOL_3.driveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-blue-900 hover:bg-blue-800 text-amber-400 font-black px-5 py-3 rounded-xl transition-all shadow-md text-sm"
              >
                <ExternalLink className="w-4 h-4 text-amber-300" />
                <span>Open in Google Drive</span>
              </a>
              <a
                href="#catalogue"
                className="inline-flex items-center gap-2 bg-white hover:bg-amber-50 text-slate-800 font-bold px-5 py-3 rounded-xl transition-all border-2 border-slate-200 shadow-xs text-sm"
              >
                <Layers className="w-4 h-4 text-amber-600" />
                <span>View Volumes 1 & 2</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </a>
            </div>
          </div>

          {/* Embedded Interactive PDF Viewer */}
          <div className="bg-white rounded-3xl overflow-hidden border-2 border-amber-300 shadow-xl">
            {/* Viewer Top Toolbar */}
            <div className="px-6 py-4 bg-white border-b-2 border-amber-200 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 border-2 border-amber-300 flex items-center justify-center text-amber-600 shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black bg-blue-900 text-amber-400 px-2 py-0.5 rounded">
                      {CATALOGUE_VOL_3.badge}
                    </span>
                    <h3 className="text-base sm:text-lg font-black text-slate-900">
                      {CATALOGUE_VOL_3.title}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    {CATALOGUE_VOL_3.subtitle}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={getWhatsAppUrl(`Hello MAPS UAE, I am reviewing Parts Catalogue - Volume 3 and would like to inquire about pricing and stock.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-sm transition-colors"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5" />
                  <span>Inquire via WhatsApp</span>
                </a>
                <a
                  href={CATALOGUE_VOL_3.driveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs sm:text-sm font-black shadow-md transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Full Screen</span>
                </a>
              </div>
            </div>

            {/* Embedded Google Drive Iframe Frame */}
            <div className="w-full h-[700px] sm:h-[850px] bg-slate-100 relative">
              <iframe
                key={CATALOGUE_VOL_3.driveId}
                src={CATALOGUE_VOL_3.embedUrl}
                className="w-full h-full border-none"
                title={`${CATALOGUE_VOL_3.title} PDF Viewer`}
                allow="autoplay"
              />
            </div>
          </div>

          {/* Quick Category Focus Badges in Volume 3 */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-2xl border-2 border-slate-200 shadow-2xs">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-900 shrink-0"></span>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Oil, Fuel & Air Filters</h4>
                  <p className="text-xs text-slate-500 font-medium">Fleetguard, Mann & Donaldson</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-2xl border-2 border-slate-200 shadow-2xs">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-900 shrink-0"></span>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Heavy Duty Engine Oils</h4>
                  <p className="text-xs text-slate-500 font-medium">15W40, 10W40, Coolants & ATF</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-2xl border-2 border-slate-200 shadow-2xs">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-900 shrink-0"></span>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Workshop Consumables</h4>
                  <p className="text-xs text-slate-500 font-medium">Tools, Greases, Tire Accessories</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-2xl border-2 border-slate-200 shadow-2xs">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-900 shrink-0"></span>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Safety & Lashing Belts</h4>
                  <p className="text-xs text-slate-500 font-medium">Cargo Ratchets & Mirrors</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
