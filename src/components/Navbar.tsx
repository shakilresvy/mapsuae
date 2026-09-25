import { Menu, X, Search, Sparkles, ExternalLink, ArrowRight, Phone } from 'lucide-react';
import { useState, useEffect, useRef, useMemo, FormEvent } from 'react';
import { getSearchableInventory, getAllQuickHeadlines, PartRecord } from '../data';
import { WhatsAppIcon } from './WhatsAppIcon';
import { UaeFlag } from './UaeFlag';

interface NavbarProps {
  currentHash: string;
}

export default function Navbar({ currentHash }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [navQuery, setNavQuery] = useState('');
  const [suggestions, setSuggestions] = useState<PartRecord[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [animatedPlaceholder, setAnimatedPlaceholder] = useState('');
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const quickHeadlines = useMemo(() => getAllQuickHeadlines(), []);

  // Animated typewriter cycling through QUICK TRY part numbers one by one
  useEffect(() => {
    if (!quickHeadlines || quickHeadlines.length === 0) return;

    let currentItemIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let timeoutId: NodeJS.Timeout;

    const typeStep = () => {
      const currentPartNum = quickHeadlines[currentItemIdx]?.num || '64215';

      if (!isDeleting) {
        // Typing forward
        charIdx++;
        setAnimatedPlaceholder(currentPartNum.substring(0, charIdx));

        if (charIdx >= currentPartNum.length) {
          // Pause when full number is typed
          isDeleting = true;
          timeoutId = setTimeout(typeStep, 2200);
        } else {
          timeoutId = setTimeout(typeStep, 100);
        }
      } else {
        // Deleting backward
        charIdx--;
        setAnimatedPlaceholder(currentPartNum.substring(0, charIdx));

        if (charIdx <= 0) {
          isDeleting = false;
          currentItemIdx = (currentItemIdx + 1) % quickHeadlines.length;
          timeoutId = setTimeout(typeStep, 350);
        } else {
          timeoutId = setTimeout(typeStep, 50);
        }
      }
    };

    timeoutId = setTimeout(typeStep, 500);

    return () => clearTimeout(timeoutId);
  }, [quickHeadlines]);

  const links = [
    { name: 'Home', hash: '#home' },
    { name: 'Catalogue', hash: '#catalogue' },
    { name: 'Profile', hash: '#profile' },
    { name: 'About Us', hash: '#about' },
  ];

  // Sync navQuery with URL query param if present
  useEffect(() => {
    const hash = window.location.hash;
    if (hash.includes('?q=')) {
      const q = decodeURIComponent(hash.split('?q=')[1] || '').split('&')[0];
      if (q) {
        setNavQuery(q);
      }
    }
  }, [currentHash]);

  // Listen to external search trigger (e.g. clicking Quick Try ticker)
  useEffect(() => {
    const handleSearchEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ query: string }>;
      if (customEvent.detail && customEvent.detail.query) {
        setNavQuery(customEvent.detail.query);
        setIsDropdownOpen(false);
      }
    };
    window.addEventListener('maps-search-event', handleSearchEvent);
    return () => window.removeEventListener('maps-search-event', handleSearchEvent);
  }, []);

  // Update suggestions on query change
  useEffect(() => {
    const term = navQuery.trim().toLowerCase();
    if (term.length >= 1) {
      const inventory = getSearchableInventory();
      const matched = inventory.filter(record =>
        record.partNumber.toLowerCase().includes(term) ||
        record.descriptions.some(d => d.toLowerCase().includes(term))
      ).slice(0, 6);
      setSuggestions(matched);
    } else {
      setSuggestions([]);
    }
  }, [navQuery]);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const triggerSearch = (queryTerm: string) => {
    const term = queryTerm.trim();
    if (!term) return;
    setIsDropdownOpen(false);
    setIsMenuOpen(false);

    // If currently not on home, update hash to #home?q=...
    const newHash = `#home?q=${encodeURIComponent(term)}`;
    if (window.location.hash !== newHash) {
      window.location.hash = newHash;
    }

    // Always dispatch custom event for immediate responsive search execution
    window.dispatchEvent(new CustomEvent('maps-search-event', {
      detail: { query: term, timestamp: Date.now() }
    }));

    setTimeout(() => {
      const elem = document.getElementById('search-results-section');
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 150);
  };

  const handleNavSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    const queryToSearch = navQuery.trim() || animatedPlaceholder.trim();
    if (queryToSearch) {
      setNavQuery(queryToSearch);
      triggerSearch(queryToSearch);
    }
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md text-slate-900 shadow-md border-b-2 border-amber-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-24 gap-3 lg:gap-6">
          
          {/* Brand Logo & Title */}
          <div className="flex items-center shrink-0">
            <a 
              href="#home" 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-3 group cursor-pointer"
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden bg-white flex items-center justify-center border-2 border-amber-400 shadow-md shrink-0 p-1 ring-2 ring-amber-400/30">
                <img
                  src="https://drive.google.com/thumbnail?id=1J9OxCYtCmvmtpxT33219Hzd2_Wvb3w3m&sz=w1200"
                  alt="MAPS Logo - Since 1992"
                  className="w-full h-full object-contain scale-[1.22] origin-center group-hover:scale-[1.28] transition-transform duration-200"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.dataset.triedLh3) {
                      target.dataset.triedLh3 = 'true';
                      target.src = 'https://lh3.googleusercontent.com/d/1J9OxCYtCmvmtpxT33219Hzd2_Wvb3w3m';
                    }
                  }}
                />
              </div>
              <div className="flex items-start gap-2">
                <div className="flex flex-col">
                  <span className="font-black text-2xl sm:text-3xl tracking-tight text-blue-900 hover:text-blue-950 transition-colors leading-none">
                    MOHAMMED AMIN
                  </span>
                  <div className="w-full flex justify-between items-center text-[10.5px] sm:text-[12px] font-extrabold text-amber-600 uppercase select-none mt-1 leading-none tracking-wider">
                    <span>AUTOMOTIVE</span>
                    <span>PARTS</span>
                    <span>SHOP</span>
                    <span>L.L.C.</span>
                  </div>
                </div>
                <div className="flex flex-col items-stretch gap-1 mt-0.5 sm:mt-1 shrink-0">
                  <span className="text-[10px] sm:text-xs font-black text-red-600 bg-red-50 border-2 border-amber-300 px-2 py-0.5 rounded-md tracking-wider whitespace-nowrap shadow-2xs text-center flex items-center justify-center leading-none">
                    EST. 1993
                  </span>
                  <UaeFlag
                    className="w-full h-3.5 sm:h-4 rounded-xs border border-amber-300/80 shadow-2xs"
                    border={false}
                    shadow={false}
                    aspectRatio="none"
                  />
                </div>
              </div>
            </a>
          </div>

          {/* Integrated Navbar Search Bar (Desktop & Tablet) */}
          <div className="hidden md:flex flex-1 max-w-md lg:max-w-xl relative" ref={dropdownRef}>
            <form onSubmit={handleNavSearchSubmit} className="w-full relative flex items-center">
              <div className="relative w-full flex items-center bg-slate-50 hover:bg-white focus-within:bg-white rounded-xl border-2 border-slate-200 focus-within:border-amber-500 focus-within:ring-2 focus-within:ring-amber-400/20 transition-all shadow-xs">
                <div className="pl-3.5 pr-1 text-amber-600 flex items-center pointer-events-none">
                  <Search className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600" />
                </div>
                <input
                  ref={inputRef}
                  id="navbar-search-input-desktop"
                  type="text"
                  value={navQuery}
                  onChange={(e) => {
                    setNavQuery(e.target.value);
                    setIsDropdownOpen(true);
                  }}
                  onFocus={() => {
                    if (navQuery.trim().length > 0) setIsDropdownOpen(true);
                  }}
                  placeholder={animatedPlaceholder}
                  className="w-full py-2.5 sm:py-2.5 px-2 bg-transparent text-sm sm:text-base text-slate-900 placeholder-slate-400 focus:placeholder-transparent focus:outline-none font-semibold placeholder:font-mono"
                />
                {navQuery && (
                  <button
                    type="button"
                    onClick={() => {
                      setNavQuery('');
                      setIsDropdownOpen(false);
                    }}
                    className="p-1.5 text-slate-400 hover:text-slate-700 transition-colors mr-1 cursor-pointer"
                    title="Clear search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                <button
                  type="submit"
                  id="navbar-search-submit-btn-desktop"
                  className="bg-blue-900 hover:bg-blue-800 text-amber-400 font-extrabold px-4 sm:px-5 py-2 my-1 mr-1 rounded-lg transition-all text-xs sm:text-sm shrink-0 shadow-sm flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Search</span>
                </button>
              </div>
            </form>

            {/* Live Autocomplete Suggestions Dropdown */}
            {isDropdownOpen && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl border-2 border-amber-300 shadow-2xl overflow-hidden z-50 divide-y divide-slate-100">
                <div className="px-3.5 py-2.5 bg-amber-50/80 flex items-center justify-between text-xs text-amber-900 border-b border-amber-200/60">
                  <span className="font-bold flex items-center gap-1.5 text-amber-900">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Matches found ({suggestions.length})
                  </span>
                  <span className="text-slate-500 font-medium">Click to view details</span>
                </div>
                <div className="max-h-72 overflow-y-auto">
                  {suggestions.map((item) => (
                    <button
                      key={item.partNumber}
                      type="button"
                      onClick={() => {
                        setNavQuery(item.partNumber);
                        triggerSearch(item.partNumber);
                      }}
                      className="w-full px-4 py-2.5 text-left hover:bg-amber-50/60 transition-colors flex items-center justify-between gap-3 group cursor-pointer"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-black text-blue-900 text-sm group-hover:text-blue-700">
                            #{item.partNumber}
                          </span>
                          <div className="flex items-center gap-1">
                            <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-800 text-[10px] font-bold px-1.5 py-0.5 rounded border border-amber-300">
                              <Phone className="w-2.5 h-2.5 text-amber-700" /> Call
                            </span>
                            <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold px-1.5 py-0.5 rounded border border-emerald-300">
                              <WhatsAppIcon className="w-2.5 h-2.5" /> WhatsApp
                            </span>
                          </div>
                        </div>
                        <p className="text-xs text-slate-600 truncate mt-0.5 font-medium">
                          {item.descriptions[0] || 'Genuine Automotive Replacement Part'}
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-700 group-hover:translate-x-0.5 transition-all shrink-0" />
                    </button>
                  ))}
                </div>
                <div className="px-4 py-2.5 bg-slate-50 text-center border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => triggerSearch(navQuery)}
                    className="text-xs font-extrabold text-blue-900 hover:text-blue-700 transition-colors"
                  >
                    View all results for "{navQuery}" →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 shrink-0">
            {links.map((link) => {
              const isActive = (currentHash === link.hash || ((currentHash === '' || currentHash.startsWith('#home')) && link.hash === '#home'));
              return (
                <a
                  key={link.name}
                  href={link.hash}
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className={`transition-all px-3.5 py-2 rounded-xl text-sm lg:text-base font-extrabold cursor-pointer ${
                    isActive
                      ? 'bg-blue-50 text-blue-900 border-2 border-blue-200 shadow-2xs'
                      : 'text-slate-700 hover:bg-amber-50/80 hover:text-blue-900'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-slate-700 hover:text-blue-900 focus:outline-none p-2.5 rounded-xl bg-slate-100 hover:bg-blue-50 transition-colors border border-slate-200"
              aria-label="Toggle navigation menu"
            >
              {isMenuOpen ? <X className="w-6 h-6 text-blue-900" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar Row (Always visible right under the navbar header on mobile) */}
        <div className="md:hidden pb-3 pt-1 relative">
          <form onSubmit={handleNavSearchSubmit} className="relative flex items-center">
            <div className="relative w-full flex items-center bg-slate-50 rounded-xl border-2 border-slate-200 focus-within:border-amber-500 focus-within:ring-2 focus-within:ring-amber-400/20 transition-all">
              <div className="pl-3 text-amber-600 flex items-center pointer-events-none">
                <Search className="w-4 h-4 text-amber-600" />
              </div>
              <input
                id="navbar-search-input-mobile"
                type="text"
                value={navQuery}
                onChange={(e) => setNavQuery(e.target.value)}
                placeholder={animatedPlaceholder}
                className="w-full py-2 px-2 bg-transparent text-sm text-slate-900 placeholder-slate-400 focus:placeholder-transparent focus:outline-none font-semibold placeholder:font-mono"
              />
              {navQuery && (
                <button
                  type="button"
                  onClick={() => setNavQuery('')}
                  className="p-1.5 text-slate-400 hover:text-slate-700 transition-colors mr-1"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                type="submit"
                id="navbar-search-submit-btn-mobile"
                className="bg-blue-900 hover:bg-blue-800 text-amber-400 font-extrabold px-3.5 py-1.5 my-1 mr-1 rounded-lg text-xs shrink-0 shadow-xs"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Mobile Nav Links Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-2xl border-t-2 border-amber-200">
          <div className="px-4 pt-3 pb-4 space-y-1.5">
            {links.map((link) => {
              const isActive = (currentHash === link.hash || ((currentHash === '' || currentHash.startsWith('#home')) && link.hash === '#home'));
              return (
                <a
                  key={link.name}
                  href={link.hash}
                  onClick={() => {
                    setIsMenuOpen(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`block px-4 py-2.5 rounded-xl text-base font-extrabold transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-blue-50 text-blue-900 border-2 border-blue-200'
                      : 'text-slate-700 hover:bg-amber-50 hover:text-blue-900'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
