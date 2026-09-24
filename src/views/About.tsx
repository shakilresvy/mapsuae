import { COMPANY_INFO } from '../data';
import { Target, Award, Clock, MapPin } from 'lucide-react';

export default function About() {
  return (
    <div className="w-full bg-white min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-amber-50 border-2 border-amber-300 text-amber-900 px-4 py-1.5 rounded-full text-xs sm:text-sm font-extrabold mb-4 shadow-2xs">
            <Award className="w-4 h-4 text-amber-600" />
            Four Decades of Excellence
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 mb-6 tracking-tight">
            About <span className="text-blue-900">Us</span>
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed font-medium">
            Alhamdulillah, our company was established in {COMPANY_INFO.established}, founded by the {COMPANY_INFO.founder}. 
            Currently being managed with the highest integrity by {COMPANY_INFO.chairman}, we provide our services with utmost honesty.
          </p>
        </div>

        {/* Story & Mission */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[3/4] sm:aspect-[4/5] lg:h-[650px] w-full bg-white flex items-center justify-center border-2 border-amber-300 hover:border-amber-500 transition-colors">
            <img 
              src="https://lh3.googleusercontent.com/d/1yzmOq0bkPLsJ9ajl5qu1U7pe-0FQrQbo" 
              alt="Mohd. Amin Automotive Parts Shop" 
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
              onError={(e) => {
                const target = e.currentTarget;
                if (!target.dataset.triedThumb) {
                  target.dataset.triedThumb = "true";
                  target.src = "https://drive.google.com/thumbnail?id=1yzmOq0bkPLsJ9ajl5qu1U7pe-0FQrQbo&sz=w1600";
                }
              }}
            />
          </div>
          <div>
            <div className="inline-flex items-center gap-2 bg-red-50 border-2 border-amber-300 text-red-700 px-3.5 py-1.5 rounded-full text-xs font-black mb-6 uppercase tracking-wider shadow-2xs">
              <Award className="w-4 h-4 text-red-600" />
              EST. 1992 • UAE Pioneer
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-6 tracking-tight">Our Journey</h2>
            <p className="text-slate-600 mb-6 leading-relaxed font-medium">
              About four decades ago, our business venture began with extraordinarily little capital. Today, while we operate from a single, centralized hub without branches, we have grown to become a premier supplier of auto parts for European trailer trucks, pickup trucks, and buses.
            </p>
            <p className="text-slate-600 mb-6 leading-relaxed font-medium">
              We supply everything from motor oils, batteries, and filters to heavy-duty spare parts in both retail and wholesale volumes.
            </p>
            <div className="bg-gradient-to-br from-amber-50/70 to-white p-6 rounded-2xl border-2 border-amber-300 shadow-sm">
              <h3 className="font-black text-slate-900 text-lg mb-2 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-900"></span>
                Honesty is Our Capital
              </h3>
              <p className="text-slate-700 italic font-medium">
                "For an exceedingly long time, our sales team has been providing the best service to our respected customers. We are happy to satisfy the needs of our valued customers by supplying the most cost-conscious solutions, being completely open about genuine and alternative products."
              </p>
            </div>
          </div>
        </div>

        {/* Operating Information */}
        <div className="bg-white rounded-3xl overflow-hidden shadow-xl border-2 border-amber-200 text-slate-900">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x-2 divide-amber-100">
            <div className="p-10 flex flex-col items-center text-center">
              <div className="bg-amber-50 border-2 border-amber-300 p-4 rounded-2xl mb-6 text-amber-700 shadow-2xs">
                <MapPin className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-4">Location</h3>
              <p className="text-slate-600 font-medium leading-relaxed">
                {COMPANY_INFO.address}
              </p>
            </div>
            <div className="p-10 flex flex-col items-center text-center">
              <div className="bg-amber-50 border-2 border-amber-300 p-4 rounded-2xl mb-6 text-amber-700 shadow-2xs">
                <Clock className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-4">Operating Hours</h3>
              <p className="text-slate-600 font-medium leading-relaxed">
                Monday - Saturday<br/>
                8:00 AM - 8:00 PM<br/>
                Sunday: Closed
              </p>
            </div>
            <div className="p-10 flex flex-col items-center text-center">
              <div className="bg-amber-50 border-2 border-amber-300 p-4 rounded-2xl mb-6 text-amber-700 shadow-2xs">
                <Target className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-4">Our Commitment</h3>
              <p className="text-slate-600 font-medium leading-relaxed">
                We kindly request our customers to carefully verify the authenticity of products before making any purchase.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
