import { Home, ChevronLeft, MapPin, Phone, Clock, Plane, Info, Users, Luggage, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

export function AirportInfo() {
  const navigate = useNavigate();

  return (
    <div className="pt-24 px-6 pb-44 max-w-md mx-auto space-y-8">
      <button 
        onClick={() => navigate('/')}
        className="w-full py-5 bg-primary-container text-white rounded-xl font-bold text-lg shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-transform"
      >
        <ChevronLeft size={20} />
        返回首頁
      </button>

      <section className="space-y-4">
        <div className="flex items-end justify-between px-1">
          <h2 className="text-2xl font-extrabold tracking-tight text-primary">機場接送</h2>
          <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Taoyuan Airport</span>
        </div>
        <div className="relative bg-surface-container-lowest rounded-xl p-6 shadow-sm overflow-hidden border border-outline-variant/10">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary-container"></div>
          <div className="space-y-5">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] font-bold text-outline uppercase tracking-tighter">Reservation ID</p>
                <p className="text-lg font-bold text-on-surface">202604018268</p>
              </div>
              <div className="bg-secondary-container/20 px-3 py-1 rounded-full">
                <span className="text-[10px] font-extrabold text-on-secondary-container">已預約</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[10px] font-bold text-outline uppercase">Pick-up Time</p>
                <p className="font-bold text-sm">2026-05-23 09:30</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-outline uppercase">Vehicle</p>
                <p className="font-bold text-sm">Luxury 7-seater</p>
              </div>
            </div>
            <button 
              onClick={() => window.open('https://www.google.com/maps/search/?api=1&query=台中市烏日區沙鹿區中航路一段598巷', '_blank')}
              className="w-full text-left group"
            >
              <p className="text-[10px] font-bold text-outline uppercase">Pick-up Location</p>
              <p className="font-medium text-sm leading-relaxed group-hover:text-primary transition-colors">台中市烏日區沙鹿區中航路一段598巷</p>
            </button>
            <div className="flex items-center gap-6 py-3 border-y border-surface-variant/30">
              <div className="flex items-center gap-2">
                <Users className="text-secondary" size={18} />
                <span className="text-sm font-bold">6 Adults</span>
              </div>
              <div className="flex items-center gap-2">
                <Luggage className="text-secondary" size={18} />
                <span className="text-sm font-bold">6 Large</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-primary">
                  <Plane size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-outline">Flight</p>
                  <p className="font-bold text-sm">MM924 (14:50)</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold text-outline">Contact</p>
                <p className="font-bold text-sm">陳○花 (0912***895)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-end justify-between px-1">
          <h2 className="text-2xl font-extrabold tracking-tight text-primary">機場停車</h2>
          <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Taichung Airport</span>
        </div>
        <div className="space-y-6">
          <div className="bg-surface-container-low rounded-xl p-6 space-y-4">
            <h3 className="text-lg font-bold text-on-surface">文昌加盟-台中機場2站</h3>
            <button 
              onClick={() => window.open('https://www.google.com/maps/search/?api=1&query=文昌加盟停車場', '_blank')}
              className="flex items-center gap-1 mt-1 text-primary hover:underline w-full text-left"
            >
              <MapPin size={14} />
              <p className="text-sm">台中清泉崗機場正對面</p>
            </button>
            <div className="grid grid-cols-1 gap-3">
              <ContactLink icon={Phone} label="04-26151014" href="tel:04-26151014" />
              <div className="bg-surface-container-lowest p-4 rounded-lg flex items-center gap-3">
                <Clock className="text-secondary" size={18} />
                <p className="font-bold text-sm">24H 服務</p>
              </div>
            </div>
            <div className="pt-2">
              <div className="bg-primary/5 rounded-lg p-3 border border-primary/10 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium bg-primary text-white px-2 py-0.5 rounded">服務特色</span>
                  <p className="text-sm font-bold text-on-surface-variant">可停休旅車</p>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  <span className="font-bold">支援信用卡：</span>台中, 台新, 玉山, 星展, 美國運通, 新光, 聯邦
                </p>
              </div>
            </div>
          </div>

          <div className="bg-surface-container-low rounded-xl p-6 space-y-4">
            <h3 className="text-lg font-bold text-on-surface">大漁停車 | 機場</h3>
            <button 
              onClick={() => window.open('https://www.google.com/maps/search/?api=1&query=大漁停車場', '_blank')}
              className="flex items-center gap-1 mt-1 text-primary hover:underline w-full text-left"
            >
              <MapPin size={14} />
              <p className="text-sm">臺中市沙鹿區中航路一段</p>
            </button>
            <div className="grid grid-cols-1 gap-3">
              <ContactLink icon={Phone} label="0980-928-666" href="tel:0980-928-666" />
              <ContactLink icon={Globe} label="官方網站預約" href="https://greatportparking.pse.is/" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ContactLink({ icon: Icon, label, href }: any) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="bg-surface-container-lowest p-4 rounded-lg flex items-center justify-between group active:scale-[0.98] transition-all"
    >
      <div className="flex items-center gap-3">
        <Icon className="text-tertiary" size={18} />
        <p className="font-bold text-sm">{label}</p>
      </div>
      <ChevronLeft className="text-outline rotate-180" size={16} />
    </a>
  );
}
