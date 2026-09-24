import { COMPANY_INFO, CONTACT_CONFIG, getEmailUrl } from '../config';
import { Mail, MapPin, ArrowRight, ShieldCheck, Clock } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="bg-white text-slate-700 pt-14 pb-10 border-t-2 border-amber-300 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 lg:gap-0">
          
          {/* Column 1: Company Profile & TRN */}
          <div className="flex flex-col justify-between space-y-4 md:pr-8 lg:pr-10">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="font-black text-xl text-slate-900 tracking-tight">
                  {COMPANY_INFO.name}
                </span>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed max-w-sm font-medium">
                Providing top-quality European truck & trailer parts, lubricants, batteries, filters, and workshop consumables across the UAE since {COMPANY_INFO.established}.
              </p>
            </div>
            
            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-900 border border-blue-800 text-xs font-mono text-amber-400 shadow-2xs font-bold">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>TRN: <strong className="text-amber-300">{COMPANY_INFO.trn}</strong></span>
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links (Centered) */}
          <div className="pt-6 md:pt-0 border-t border-slate-200 md:border-t-0 md:border-l md:border-slate-200 md:px-8 lg:px-10 flex flex-col items-center text-center">
            <h3 className="text-slate-900 text-base font-extrabold mb-4 flex items-center justify-center gap-2">
              <span className="w-1.5 h-4 bg-amber-500 rounded-full inline-block" />
              <span>Quick Navigation</span>
            </h3>
            <ul className="space-y-2.5 text-sm flex flex-col items-center">
              <li>
                <a 
                  href="#home" 
                  onClick={scrollToTop} 
                  className="text-slate-600 hover:text-blue-900 transition-colors inline-flex items-center gap-2 group cursor-pointer font-semibold"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-amber-500 group-hover:text-blue-700 group-hover:translate-x-1 transition-all" />
                  <span>Home & OE Search</span>
                </a>
              </li>
              <li>
                <a 
                  href="#catalogue" 
                  onClick={scrollToTop} 
                  className="text-slate-600 hover:text-blue-900 transition-colors inline-flex items-center gap-2 group cursor-pointer font-semibold"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-amber-500 group-hover:text-blue-700 group-hover:translate-x-1 transition-all" />
                  <span>Product Catalogue</span>
                </a>
              </li>
              <li>
                <a 
                  href="#profile" 
                  onClick={scrollToTop} 
                  className="text-slate-600 hover:text-blue-900 transition-colors inline-flex items-center gap-2 group cursor-pointer font-semibold"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-amber-500 group-hover:text-blue-700 group-hover:translate-x-1 transition-all" />
                  <span>Company Profile & Locations</span>
                </a>
              </li>
              <li>
                <a 
                  href="#about" 
                  onClick={scrollToTop} 
                  className="text-slate-600 hover:text-blue-900 transition-colors inline-flex items-center gap-2 group cursor-pointer font-semibold"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-amber-500 group-hover:text-blue-700 group-hover:translate-x-1 transition-all" />
                  <span>About Our Founder & History</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Showroom (with boundary line) */}
          <div className="pt-6 md:pt-0 border-t border-slate-200 md:border-t-0 md:border-l md:border-slate-200 md:pl-8 lg:pl-10">
            <h3 className="text-slate-900 text-base font-extrabold mb-4 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-amber-500 rounded-full inline-block" />
              <span>Musaffah Showroom</span>
            </h3>
            <ul className="space-y-4 text-sm text-slate-600">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-md bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                  <MapPin className="w-3.5 h-3.5 text-blue-900" />
                </div>
                <span className="font-medium text-slate-700 leading-snug">{CONTACT_CONFIG.company.address}</span>
              </li>

              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-md bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                  <Clock className="w-3.5 h-3.5 text-blue-900" />
                </div>
                <div className="flex flex-col text-xs sm:text-sm font-medium text-slate-700 leading-snug">
                  <span className="font-bold text-slate-900">Mon – Sat: <span className="font-semibold text-slate-600">8:00 AM – 8:00 PM</span></span>
                  <span className="text-slate-500 text-xs">Sunday: <span className="font-bold text-red-600">Closed</span></span>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-md bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                  <Mail className="w-3.5 h-3.5 text-blue-900" />
                </div>
                <a 
                  href={getEmailUrl(CONTACT_CONFIG.emails.primary)} 
                  className="text-slate-800 hover:text-blue-900 transition-colors font-bold text-xs sm:text-sm pt-0.5 break-all"
                >
                  {CONTACT_CONFIG.emails.primary}
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Symmetrical Divider & Sub-Footer */}
        <div className="mt-12 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} {COMPANY_INFO.shortName}. All rights reserved.</p>
          <div className="flex items-center gap-4 text-slate-600">
            <span>Musaffah M-5, Abu Dhabi, UAE</span>
            <span>•</span>
            <span className="text-blue-900 font-extrabold">Genuine European Truck Parts</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
