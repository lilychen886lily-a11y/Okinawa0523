import { CalendarDays, ChevronRight, Navigation, Clock, MapPin, Phone, Car } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

export function ParkingDetails() {
  const navigate = useNavigate();

  return (
    <div className="pb-44 pt-20 px-4 space-y-6 max-w-md mx-auto">
      <button 
        onClick={() => navigate('/itinerary')}
        className="w-full py-4 px-6 bg-surface-container-lowest rounded-xl flex items-center justify-between group active:scale-95 transition-all duration-200 shadow-sm"
      >
        <div className="flex items-center gap-3">
          <CalendarDays className="text-primary" size={20} />
          <span className="font-bold text-on-surface tracking-tight">返回行程 (Back to Itinerary)</span>
        </div>
        <ChevronRight className="text-outline-variant group-hover:translate-x-1 transition-transform" size={18} />
      </button>

      <section className="space-y-3">
        <div className="flex items-center justify-between px-2">
          <h2 className="text-on-surface-variant font-bold text-sm tracking-widest uppercase">Route Overview</h2>
          <span className="text-xs font-semibold text-secondary px-2 py-1 bg-secondary-fixed rounded-full">32 mins • 18.5 km</span>
        </div>
        <div className="relative h-56 w-full rounded-3xl overflow-hidden shadow-sm">
          <img 
            className="w-full h-full object-cover" 
            alt="Taichung Map" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdsBvTi82EZv4I4BCxqy6eExN6HgHhZpgIVImOsmS5E13t_qehUQtCvhzPb2De-BhtswXfPuArfS63xH39oVXx6OsUKgkxHtdwtzE1eCKdNH76D90WHs1kjBchKmVBIDffOSaUo4qAUpVyQ0q7lBwdQS2NDctofJwVL80AB5DAnukIs7lB52ujq45gmmaqg7WIB6dgUWaHwkSYIbAFb7HdH0XPZU1BZc_64B-7P8cZT9QPROvzsAuNM0NkueJ4zdkYCeCKZ_b6UeI"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-3 rounded-2xl flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-container flex items-center justify-center rounded-xl">
              <Navigation className="text-white fill-white" size={20} />
            </div>
            <div>
              <p className="text-xs text-on-surface-variant font-medium">Destination</p>
              <p className="text-sm font-bold text-on-surface">Taichung International Airport (RMQ)</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-tertiary/10 p-4 rounded-3xl flex items-start gap-4 border border-tertiary/20">
        <div className="bg-tertiary p-2 rounded-xl shrink-0">
          <Clock className="text-white" size={20} />
        </div>
        <div className="space-y-1">
          <h3 className="text-tertiary font-bold">Time Reminder</h3>
          <p className="text-sm text-on-surface-variant leading-relaxed">
            Arrival target <span className="font-bold text-tertiary">09:30 AM</span> to ensure airport shuttle at <span className="font-bold text-tertiary">09:30 AM</span>. Please allow for traffic.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-on-surface-variant font-bold text-sm tracking-widest uppercase px-2">Parking Options</h2>
        
        <ParkingCard 
          title="文昌加盟 (Wenchang Parking)" 
          tag="24H" 
          location="台中清泉崗機場正對面" 
          phone="04-26151014" 
          isSecondary
        />
        
        <ParkingCard 
          title="大漁停車 (Dayu Parking)" 
          location="臺中市沙鹿區中航路一段" 
          phone="0980-928-666" 
        />
      </section>
    </div>
  );
}

function ParkingCard({ title, tag, location, phone, isSecondary }: any) {
  return (
    <div className="bg-surface-container-lowest rounded-[2rem] p-6 space-y-4 relative overflow-hidden group shadow-sm border border-outline-variant/10">
      <div className={cn("absolute top-0 left-0 w-1 h-full", isSecondary ? "bg-secondary" : "bg-outline-variant/30")}></div>
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-lg font-extrabold tracking-tight">{title}</h3>
            {tag && <span className="px-2 py-0.5 bg-secondary-container text-on-secondary-container text-[10px] font-bold rounded-full uppercase">{tag}</span>}
          </div>
          <p className="text-sm text-on-surface-variant flex items-start gap-2">
            <MapPin size={14} className="mt-0.5" />
            {location}
          </p>
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-[10px] uppercase tracking-wider text-outline">Contact</span>
        <span className="text-sm font-bold text-primary">{phone}</span>
      </div>
      <button className="flex items-center justify-center gap-2 w-full py-3 bg-primary text-white rounded-2xl font-bold transition-transform active:scale-95 shadow-md">
        <Navigation size={18} />
        Google Map 導航
      </button>
    </div>
  );
}
