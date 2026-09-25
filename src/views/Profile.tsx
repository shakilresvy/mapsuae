import { COMPANY_INFO, CONTACT_CONFIG, getPhoneUrl, getWhatsAppUrl, getEmailUrl } from '../config';
import { Phone, Mail, FileText, CheckCircle2, MessageSquare, Smartphone, Building2, Warehouse, User, PhoneCall, MapPin } from 'lucide-react';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import { UaeFlag, UaeFlagLogo } from '../components/UaeFlag';

export default function Profile() {
  const brands = [
    { 
      name: "Mercedes-Benz", 
      category: "Actros • Atego • Axor",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Mercedes-Logo.svg/512px-Mercedes-Logo.svg.png",
      fallbackLogo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/mercedes.svg"
    },
    { 
      name: "Volvo Trucks", 
      category: "FH • FM • FMX Series",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Volvo_Trucks_logo.svg/512px-Volvo_Trucks_logo.svg.png",
      fallbackLogo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/volvo.svg"
    },
    { 
      name: "MAN Truck & Bus", 
      category: "TGX • TGS • TGM Series",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/MAN_logo.svg/512px-MAN_logo.svg.png",
      fallbackLogo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/man.svg"
    },
    { 
      name: "Scania", 
      category: "R-Series • G-Series • P-Series",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Scania_logo.svg/512px-Scania_logo.svg.png",
      fallbackLogo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/scania.svg"
    },
    { 
      name: "Isuzu", 
      category: "NPR • NQR • Forward • Giga",
      logo: "https://lh3.googleusercontent.com/d/1TSmubXaJjCj-pH1H6C9noFGgpRVzWfwq",
      fallbackLogo: "https://drive.google.com/thumbnail?id=1TSmubXaJjCj-pH1H6C9noFGgpRVzWfwq&sz=w800",
      isGrayscale: true
    },
    { 
      name: "Mitsubishi Fuso", 
      category: "Canter • Fighter • Super Great",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Mitsubishi_logo.svg/512px-Mitsubishi_logo.svg.png",
      fallbackLogo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/mitsubishi.svg"
    },
    { 
      name: "DAF Trucks", 
      category: "XF • CF • LF Heavy Duty",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/DAF_logo.svg/512px-DAF_logo.svg.png",
      fallbackLogo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/daf.svg"
    },
    { 
      name: "Iveco", 
      category: "Stralis • Trakker • Eurocargo",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/IVECO_logo.svg/512px-IVECO_logo.svg.png",
      fallbackLogo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/iveco.svg"
    },
    { 
      name: "Renault Trucks", 
      category: "T-High • K-Range • C-Range",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Renault_Trucks_logo.svg/512px-Renault_Trucks_logo.svg.png",
      fallbackLogo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/renault.svg"
    }
  ];

  return (
    <div className="w-full bg-white min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Profile Card Header */}
        <div className="bg-white rounded-2xl shadow-sm border-2 border-amber-200 overflow-hidden mb-12">
          <div className="h-32 bg-gradient-to-r from-blue-950 via-blue-900 to-amber-600 relative">
            <div className="absolute -bottom-16 left-8">
              <div className="w-32 h-32 bg-white rounded-2xl shadow-lg border-4 border-white overflow-hidden flex items-center justify-center p-1.5 relative ring-2 ring-amber-400/30">
                <img
                  src="https://drive.google.com/thumbnail?id=1J9OxCYtCmvmtpxT33219Hzd2_Wvb3w3m&sz=w1200"
                  alt="MAPS Logo"
                  className="w-full h-full object-contain scale-[1.22] origin-center"
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
            </div>
            <div className="absolute right-8 top-8 flex items-center gap-2.5">
               <UaeFlagLogo variant="pill" />
               <span className="hidden sm:inline-block bg-white text-blue-900 font-black px-4 py-1.5 rounded-full text-sm border-2 border-amber-300 shadow-sm">Verified Supplier</span>
            </div>
          </div>
          
          <div className="pt-20 px-8 pb-8">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
              <div>
                <h1 className="text-3xl font-black text-slate-900 mb-2">{COMPANY_INFO.name}</h1>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-slate-600 text-sm mb-4">
                  <span className="flex items-center gap-1.5 font-semibold">
                    <FileText className="w-4 h-4 text-amber-600" /> TRN: <span className="font-mono bg-amber-50 border border-amber-200 px-2 py-0.5 rounded font-black text-amber-900">{COMPANY_INFO.trn}</span>
                  </span>
                  <span className="flex items-center gap-1.5 font-semibold text-slate-700">
                    <MapPin className="w-4 h-4 text-blue-900" /> <span>{COMPANY_INFO.address}</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-bold bg-emerald-50 text-emerald-900 border border-emerald-300 px-2.5 py-0.5 rounded-md text-xs shadow-2xs">
                    <UaeFlag className="w-4 h-2 rounded-[2px]" border={false} shadow={false} />
                    <span>United Arab Emirates • Abu Dhabi</span>
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-blue-50 text-blue-900 px-3 py-1 rounded-full text-xs font-bold border border-blue-200">Retail & Wholesale</span>
                  <span className="bg-blue-50 text-blue-900 px-3 py-1 rounded-full text-xs font-bold border border-blue-200">European Trucks</span>
                  <span className="bg-blue-50 text-blue-900 px-3 py-1 rounded-full text-xs font-bold border border-blue-200">Heavy Duty Parts</span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <a href={getPhoneUrl(CONTACT_CONFIG.management.mobile)} className="flex items-center justify-center gap-2 bg-blue-900 text-amber-400 px-6 py-3 rounded-xl font-bold hover:bg-blue-800 shadow-sm transition-colors">
                  <Phone className="w-5 h-5" /> Call Now
                </a>
                <a href={getWhatsAppUrl('Hello Chairman / MAPS UAE, I would like to connect.', CONTACT_CONFIG.management.mobile)} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#128C7E] shadow-sm transition-colors">
                  <MessageSquare className="w-5 h-5" /> WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Contact Details */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white rounded-2xl shadow-sm border-2 border-slate-200/90 p-6 sm:p-7">
              <div className="flex items-center justify-between pb-5 border-b border-slate-100 mb-6">
                <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2.5">
                  <span className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-400/40 flex items-center justify-center text-amber-600">
                    <PhoneCall className="w-5 h-5" />
                  </span>
                  <span>Commercial Contacts</span>
                </h3>
              </div>
              
              <div className="space-y-6">
                {/* 1. Chairman Direct */}
                <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 transition-all hover:border-slate-300">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-slate-500" />
                      <span className="text-xs font-black text-slate-500 uppercase tracking-wider">Executive Management</span>
                    </div>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-amber-500/15 text-amber-800 border border-amber-400/30 px-2 py-0.5 rounded-md uppercase tracking-wider">
                      Chairman
                    </span>
                  </div>
                  <p className="font-extrabold text-slate-900 text-base mb-2.5">{COMPANY_INFO.chairman}</p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                          <Smartphone className="w-3 h-3" /> Mobile
                        </span>
                        <a 
                          href={getPhoneUrl(CONTACT_CONFIG.management.mobile)} 
                          className="font-mono font-black text-red-600 hover:text-red-700 transition-colors"
                        >
                          {CONTACT_CONFIG.management.mobile}
                        </a>
                      </div>
                      <a
                        href={getWhatsAppUrl('Hello Chairman / MAPS UAE, I would like to inquire directly.', CONTACT_CONFIG.management.mobile)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-600 hover:text-emerald-700 p-1"
                        title="Chat on WhatsApp"
                      >
                        <WhatsAppIcon className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
                
                {/* 2. Showroom Dept */}
                <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 transition-all hover:border-slate-300">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-slate-500" />
                      <span className="text-xs font-black text-slate-500 uppercase tracking-wider">Main Showroom (Musaffah)</span>
                    </div>
                    <span className="text-[10px] font-bold bg-slate-200/80 text-slate-700 px-2 py-0.5 rounded-md">Sales & OE Inquiries</span>
                  </div>

                  <div className="space-y-2">
                    {/* Landline 1 & 2 */}
                    <div className="bg-white border border-slate-200 rounded-lg p-2.5">
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 flex items-center gap-1">
                          <Phone className="w-3 h-3" /> Landline (Tel)
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 pl-1">
                        {CONTACT_CONFIG.showroom.phones.map((tel, idx) => (
                          <a
                            key={idx}
                            href={getPhoneUrl(tel)}
                            className="font-mono font-black text-red-600 hover:text-red-700 text-xs transition-colors flex items-center gap-1"
                          >
                            <span>{tel}</span>
                            {idx < CONTACT_CONFIG.showroom.phones.length - 1 && (
                              <span className="text-slate-300 ml-1">/</span>
                            )}
                          </a>
                        ))}
                      </div>
                    </div>

                    {/* Mobile 1 & 2 */}
                    <div className="bg-white border border-slate-200 rounded-lg p-2.5">
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                          <Smartphone className="w-3 h-3" /> Mobile / WhatsApp
                        </span>
                      </div>
                      <div className="space-y-1.5 pl-1">
                        {CONTACT_CONFIG.showroom.mobiles.map((mob, idx) => (
                          <div key={idx} className="flex items-center justify-between text-xs">
                            <a
                              href={getPhoneUrl(mob)}
                              className="font-mono font-black text-red-600 hover:text-red-700 transition-colors"
                            >
                              {mob}
                            </a>
                            <a
                              href={getWhatsAppUrl('Hello MAPS UAE Showroom, I am inquiring about parts availability.', mob)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-emerald-600 hover:text-emerald-700 inline-flex items-center gap-1 text-[11px] font-semibold"
                              title="Chat on WhatsApp"
                            >
                              <WhatsAppIcon className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Showroom Physical Address */}
                    <div className="bg-white border border-slate-200 rounded-lg p-2.5">
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-200 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-amber-600" /> Showroom Address
                        </span>
                      </div>
                      <p className="text-xs text-slate-800 pl-1 font-semibold leading-relaxed">
                        {CONTACT_CONFIG.company.address}
                      </p>
                    </div>
                  </div>
                </div>

                {/* 3. Warehouse Logistics */}
                <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 transition-all hover:border-slate-300">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <Warehouse className="w-4 h-4 text-slate-500" />
                      <span className="text-xs font-black text-slate-500 uppercase tracking-wider">Central Warehouse</span>
                    </div>
                    <span className="text-[10px] font-bold bg-slate-200/80 text-slate-700 px-2 py-0.5 rounded-md">Logistics & Dispatch</span>
                  </div>

                  <div className="space-y-2">
                    {/* Landline */}
                    <div className="bg-white border border-slate-200 rounded-lg p-2.5">
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 flex items-center gap-1">
                          <Phone className="w-3 h-3" /> Landline (Tel)
                        </span>
                      </div>
                      <a
                        href={getPhoneUrl(CONTACT_CONFIG.warehouse.phone)}
                        className="font-mono font-black text-red-600 hover:text-red-700 text-xs transition-colors block pl-1"
                      >
                        {CONTACT_CONFIG.warehouse.phone}
                      </a>
                    </div>

                    {/* Mobile */}
                    <div className="bg-white border border-slate-200 rounded-lg p-2.5">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                          <Smartphone className="w-3 h-3" /> Mobile / WhatsApp
                        </span>
                        <a
                          href={getWhatsAppUrl('Hello MAPS UAE Warehouse, I am inquiring about shipment and dispatch.', CONTACT_CONFIG.warehouse.mobile)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-emerald-600 hover:text-emerald-700"
                          title="Chat on WhatsApp"
                        >
                          <WhatsAppIcon className="w-3.5 h-3.5" />
                        </a>
                      </div>
                      <a
                        href={getPhoneUrl(CONTACT_CONFIG.warehouse.mobile)}
                        className="font-mono font-black text-red-600 hover:text-red-700 text-xs transition-colors block pl-1"
                      >
                        {CONTACT_CONFIG.warehouse.mobile}
                      </a>
                    </div>
                  </div>
                </div>
                
                {/* 4. Official Emails */}
                <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 transition-all hover:border-slate-300">
                  <div className="flex items-center gap-2 mb-2.5">
                    <Mail className="w-4 h-4 text-slate-500" />
                    <span className="text-xs font-black text-slate-500 uppercase tracking-wider">Official Email Inquiries</span>
                  </div>
                  <div className="space-y-1.5">
                    {CONTACT_CONFIG.emails.all.map((email, idx) => (
                      <a 
                        key={idx} 
                        href={getEmailUrl(email)} 
                        className="text-slate-800 hover:text-blue-600 block text-xs font-medium hover:underline break-all bg-white border border-slate-200 rounded-lg px-3 py-2"
                      >
                        {email}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Supported Brands & Information */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Supported Brands */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Supported Automotive Brands</h3>
              <p className="text-slate-600 mb-8">
                We supply genuine and premium replacement parts for the following major commercial vehicle manufacturers, ensuring strict OE specifications are met.
              </p>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
                {brands.map((brand) => (
                  <div 
                    key={brand.name} 
                    className="group flex flex-col items-center text-center p-5 border-2 border-slate-200/80 rounded-2xl bg-white hover:border-amber-400 hover:shadow-lg transition-all duration-200"
                  >
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center p-3 mb-3.5 shadow-2xs group-hover:scale-105 transition-transform duration-300">
                      <img 
                        src={brand.logo} 
                        alt={`${brand.name} Logo`} 
                        className={`w-full h-full object-contain filter drop-shadow-2xs ${brand.isGrayscale ? 'grayscale contrast-125' : ''}`}
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (!target.dataset.triedFallback && brand.fallbackLogo) {
                            target.dataset.triedFallback = 'true';
                            target.src = brand.fallbackLogo;
                          }
                        }}
                      />
                    </div>
                    <span className="font-extrabold text-slate-900 text-sm sm:text-base tracking-tight mb-1">
                      {brand.name}
                    </span>
                    <span className="text-[11px] font-medium text-slate-500 line-clamp-1">
                      {brand.category}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Guarantees */}
            <div className="bg-white rounded-2xl shadow-md p-8 text-slate-900 border-2 border-amber-200">
              <div className="flex items-center gap-2 mb-6">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-900"></span>
                <h3 className="text-xl font-black text-slate-900">Our Commercial Guarantees</h3>
              </div>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50/50 border border-amber-200/80">
                  <CheckCircle2 className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-extrabold text-slate-900 mb-1">Honesty is Our Capital</h4>
                    <p className="text-slate-600 text-xs sm:text-sm font-medium">Transparency in all transactions, clearly distinguishing between genuine and aftermarket parts.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50/50 border border-amber-200/80">
                  <CheckCircle2 className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-extrabold text-slate-900 mb-1">Direct Import Quality</h4>
                    <p className="text-slate-600 text-xs sm:text-sm font-medium">Sourcing directly from reputable global manufacturers and authorized distributors.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50/50 border border-amber-200/80">
                  <CheckCircle2 className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-extrabold text-slate-900 mb-1">Wholesale Capabilities</h4>
                    <p className="text-slate-600 text-xs sm:text-sm font-medium">Dedicated warehouse facilities to support bulk orders and fleet maintenance contracts.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50/50 border border-amber-200/80">
                  <CheckCircle2 className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-extrabold text-slate-900 mb-1">Expert Consultation</h4>
                    <p className="text-slate-600 text-xs sm:text-sm font-medium">Four decades of technical knowledge to ensure you get the exact matching part number.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
