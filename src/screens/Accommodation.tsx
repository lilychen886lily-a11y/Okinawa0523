import { Home, ChevronLeft, Map as MapIcon, Calendar, Clock, Globe, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

export function Accommodation() {
  const navigate = useNavigate();

  const stays = [
    {
      date: '5/23 (SAT)',
      name: '那霸小祿站前 Y\'s Inn',
      subName: 'Y\'s Inn Naha Oroku Ekimae',
      checkIn: '15:00',
      room: '標準雙床房 x 4',
      meals: '不含餐食',
      platform: 'Booking.com',
      address: '沖繩縣那霸市赤嶺 2-1-5',
      phone: '098-851-8107',
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=Y\'s+Inn+Naha+Oroku+Ekimae'
    },
    {
      date: '5/24 (SUN)',
      name: '沖繩殘波岬美爵度假酒店',
      subName: 'Grand Mercure Zanpa Cape',
      checkIn: '15:00',
      room: '行政雙床 x 1, 高級三人間 x 2',
      meals: 'All-inclusive 全包式',
      mealTag: true,
      platform: 'Ikyu.com 一休',
      address: '沖繩縣中頭郡讀谷村字宇座 1575',
      phone: '098-958-5000',
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=Grand+Mercure+Okinawa+Zanpa+Cape+Resort'
    },
    {
      date: '5/25 (MON)',
      name: '沖繩殘波岬 (續住)',
      subName: 'Stay Extension',
      type: '續住',
      room: '行政雙床房 x 3',
      meals: '純住房 (Room Only)',
      platform: 'Ikyu.com 一休',
      address: '沖繩縣中頭郡讀谷村字宇座 1575',
      phone: '098-958-5000',
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=Grand+Mercure+Okinawa+Zanpa+Cape+Resort',
      isExtension: true
    },
    {
      date: '5/26 (TUE)',
      name: '南城市水晶別墅',
      subName: 'Crystal Villa Nanjo',
      checkIn: '15:00',
      room: '整棟出租 (8人包棟)',
      meals: '不含餐食',
      platform: 'Booking.com',
      address: '沖繩縣南城市玉城親慶原 296',
      phone: '098-949-7333',
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=Crystal+Villa+Nanjo'
    },
    {
      date: '5/27 (WED)',
      name: '古宇利島 Coldio 度假公寓',
      subName: 'Coldio Smart Resort Kouri Island',
      checkIn: '15:00',
      room: '公寓套房 x 1',
      meals: '不含餐食',
      platform: 'Booking.com',
      address: '沖繩縣國頭郡今歸仁村古宇利 191',
      phone: '098-989-1316',
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=Coldio+Smart+Resort+Kouri+Island'
    }
  ];

  return (
    <div className="pt-20 px-4 pb-44 space-y-6 max-w-md mx-auto">
      <button 
        onClick={() => navigate('/')}
        className="w-full py-5 px-6 rounded-xl bg-primary text-white flex items-center justify-center gap-3 shadow-lg shadow-primary/20 active:scale-[0.98] transition-transform"
      >
        <ChevronLeft size={20} />
        <span className="font-bold tracking-wide">返回首頁 Return to Home</span>
      </button>

      <div className="py-2">
        <p className="text-on-surface-variant font-medium tracking-[0.2em] uppercase text-[10px]">Travel Timeline</p>
        <h2 className="text-3xl font-extrabold tracking-tighter text-on-surface mt-1">住宿行程表</h2>
        <p className="text-primary font-semibold">5/23 (六) — 5/27 (三)</p>
      </div>

      <div className="space-y-4">
        {stays.map((stay, i) => (
          <div 
            key={i} 
            className={cn(
              "relative bg-surface-container-lowest p-5 rounded-xl shadow-sm border-l-4",
              stay.isExtension ? "border-outline-variant bg-surface-container-low/50" : "border-secondary-container"
            )}
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <span className={cn(
                  "text-xs font-bold tracking-widest uppercase px-2 py-1 rounded-full",
                  stay.isExtension ? "bg-surface-container-high text-on-surface-variant" : "bg-primary-fixed text-primary"
                )}>
                  {stay.date}
                </span>
                <h3 className="text-xl font-extrabold text-on-surface mt-2">{stay.name}</h3>
                <p className={cn("text-on-surface-variant text-sm font-medium", stay.isExtension && "italic")}>{stay.subName}</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold text-on-surface-variant block uppercase">
                  {stay.type || 'CHECK-IN'}
                </span>
                <span className={cn("text-lg font-black", stay.isExtension ? "text-on-surface-variant" : "text-secondary")}>
                  {stay.checkIn || stay.type}
                </span>
              </div>
            </div>
            
            <div className={cn("grid grid-cols-1 gap-y-3 py-3 border-t", stay.isExtension ? "border-outline-variant/30" : "border-outline-variant/15")}>
              <DetailRow label="Address" value={stay.address} isAddress />
              <DetailRow label="Phone" value={stay.phone} isPhone />
              <DetailRow label="Room Type" value={stay.room} />
              <DetailRow 
                label="Meals" 
                value={stay.meals} 
                isTag={stay.mealTag}
              />
              <DetailRow label="Platform" value={stay.platform} isPlatform />
            </div>

            <a 
              href={stay.mapUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className={cn(
                "mt-2 w-full py-3 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-colors",
                stay.isExtension ? "bg-surface-container-high/50 text-on-surface-variant" : "bg-surface-container-low text-secondary hover:bg-secondary-fixed"
              )}
            >
              <MapIcon size={14} />
              在 Google Maps 查看
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

function DetailRow({ label, value, isTag, isPlatform, isAddress, isPhone }: any) {
  return (
    <div className={cn("flex justify-between items-start", !isAddress && "items-center")}>
      <p className="text-[10px] text-on-surface-variant font-bold uppercase mt-0.5">{label}</p>
      <div className="text-right max-w-[70%]">
        {isTag ? (
          <span className="text-xs font-bold bg-tertiary/10 text-tertiary px-2 py-0.5 rounded-md">{value}</span>
        ) : isPhone ? (
          <p className="text-sm font-bold text-secondary flex items-center justify-end gap-1">
            <Phone size={10} />
            {value}
          </p>
        ) : (
          <p className={cn(
            "text-sm font-semibold leading-tight", 
            isPlatform && "text-primary-container font-bold",
            isAddress && "text-[11px] text-on-surface-variant"
          )}>
            {value}
          </p>
        )}
      </div>
    </div>
  );
}
