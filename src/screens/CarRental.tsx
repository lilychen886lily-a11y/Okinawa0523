import { useState } from 'react';
import { Home, Calendar, User, Car, Wallet, MapPin, Phone, Info, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

export function CarRental() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'4' | '5'>('4');

  const cars = {
    '4': {
      pnr: 'RC42461117512190502',
      driver: 'Chen Chiung-hua (陳 瓊花)',
      type: 'A Class (4-seater)',
      period: '2026/05/24 12:00 → 05/27 12:00',
      price: '12,150',
      color: 'border-secondary'
    },
    '5': {
      pnr: 'RC42461117515550622',
      driver: 'Hsieh Hsiao-chi (謝 曉琪)',
      type: 'A Class (5-seater)',
      period: '2026/05/24 12:00 → 05/28 18:00',
      price: '15,250',
      color: 'border-primary'
    }
  };

  const currentCar = cars[activeTab];

  return (
    <div className="pb-44 bg-background min-h-screen">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl flex items-center justify-between px-6 py-4 border-b border-outline-variant/10">
        <button 
          onClick={() => navigate(-1)}
          className="material-symbols-outlined text-primary p-2 rounded-full hover:bg-surface-container transition-colors"
        >
          arrow_back
        </button>
        <h1 className="font-bold text-lg text-on-surface">租車詳情</h1>
        <button className="material-symbols-outlined text-primary p-2 rounded-full hover:bg-surface-container transition-colors">
          more_vert
        </button>
      </header>

      <main className="max-w-2xl mx-auto px-6 pt-6 space-y-6">
        <button 
          onClick={() => navigate('/')}
          className="w-full py-4 bg-primary text-white rounded-xl font-bold flex items-center justify-center gap-3 shadow-md shadow-primary/20 active:scale-[0.98] transition-all"
        >
          <Home size={20} fill="currentColor" />
          <span className="text-lg">返回首頁</span>
        </button>

        {/* Tab Switcher */}
        <div className="flex p-1.5 bg-surface-container rounded-2xl shadow-inner">
          <button 
            onClick={() => setActiveTab('4')}
            className={cn(
              "flex-1 py-3 rounded-xl text-sm font-bold transition-all duration-300",
              activeTab === '4' ? "bg-white text-primary shadow-sm" : "text-on-surface-variant hover:text-on-surface"
            )}
          >
            4人座 (4-seater)
          </button>
          <button 
            onClick={() => setActiveTab('5')}
            className={cn(
              "flex-1 py-3 rounded-xl text-sm font-bold transition-all duration-300",
              activeTab === '5' ? "bg-white text-primary shadow-sm" : "text-on-surface-variant hover:text-on-surface"
            )}
          >
            5人座 (5-seater)
          </button>
        </div>

        <div className="space-y-1">
          <p className="text-[10px] font-bold text-outline-variant tracking-[0.2em] uppercase">Details</p>
          <h2 className="text-3xl font-extrabold text-on-surface tracking-tight">租車資訊 ({activeTab}人座)</h2>
        </div>

        {/* Booking Details Card */}
        <section className={cn(
          "bg-white p-6 rounded-3xl relative overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-l-[6px]", 
          currentCar.color.replace('border-', 'border-')
        )}>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-xl">confirmation_number</span>
            </div>
            <h3 className="font-bold text-lg text-on-surface">預約詳情</h3>
          </div>

          <div className="space-y-8">
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-outline uppercase tracking-widest">PNR 預約編號</p>
              <p className="text-2xl font-black text-on-surface tracking-tight break-all">{currentCar.pnr}</p>
            </div>

            <div className="space-y-1">
              <p className="text-[10px] font-bold text-outline uppercase tracking-widest">租車費用</p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-primary">{currentCar.price}</span>
                <span className="text-sm font-bold text-primary">JPY</span>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-[10px] font-bold text-outline uppercase tracking-widest">用車期間</p>
              <div className="bg-surface-container-low/50 rounded-2xl p-4 flex items-center gap-4 border border-outline-variant/10">
                <Calendar size={18} className="text-primary" />
                <p className="text-sm font-bold text-on-surface tracking-tight">{currentCar.period}</p>
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-[10px] font-bold text-outline uppercase tracking-widest">駕駛人</p>
              <p className="text-xl font-bold text-on-surface">{currentCar.driver}</p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-on-surface-variant">車型</span>
              <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-bold ring-1 ring-primary/20">
                {currentCar.type}
              </span>
            </div>
          </div>
        </section>

        {/* Location Info Card */}
        <section className="bg-surface-container-low/30 p-8 rounded-[32px] space-y-8 border border-outline-variant/10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
              <MapPin size={24} />
            </div>
            <h3 className="text-xl font-bold text-on-surface">營業所資訊</h3>
          </div>

          <div className="space-y-6">
            <div className="group inline-block">
              <h4 className="text-2xl font-black text-on-surface group-hover:text-primary transition-colors border-b-2 border-primary/30 inline">ABC租車 那霸機場營業所</h4>
              <p className="text-sm font-medium text-on-surface-variant mt-3">沖繩縣那霸市田原 1-17-9</p>
            </div>

            <button 
              onClick={() => window.open('tel:0988595555')}
              className="bg-white border border-outline-variant/20 py-4 px-8 rounded-2xl flex items-center gap-4 shadow-sm hover:shadow-md active:scale-95 transition-all w-full md:w-auto"
            >
              <Phone className="text-primary" size={20} />
              <span className="text-xl font-black text-on-surface">098-859-5555</span>
            </button>

            <div className="bg-primary/5 rounded-3xl p-6 border border-primary/10 flex items-start gap-5">
              <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-primary text-2xl">airport_shuttle</span>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-black text-primary uppercase tracking-wider">機場接駁資訊</p>
                <p className="text-sm font-medium text-on-surface-variant leading-relaxed font-semibold">請前往機場 Gate 11-A 搭乘專屬接駁車</p>
              </div>
            </div>
          </div>
        </section>

        {/* Reminders Section */}
        <section className="bg-white px-8 py-10 rounded-[32px] shadow-[0_8px_40px_rgb(0,0,0,0.03)] border border-outline-variant/10 space-y-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-tertiary flex items-center justify-center text-white shadow-lg shadow-tertiary/20">
              <AlertCircle size={24} />
            </div>
            <h3 className="text-xl font-bold text-on-surface">租車提醒</h3>
          </div>

          <ul className="space-y-6">
            {[
              <>請於 <span className="text-primary font-black">5/24 12:00</span> 前抵達營業所辦理取車手續。</>,
              <>取車時必須出示：<span className="text-on-surface font-black underline decoration-primary decoration-2 underline-offset-4">護照、台灣駕照正本、日文翻譯件</span>。</>,
              <>付款方式：<span className="text-on-surface font-black">現場支付</span>。請確保您的支付工具可用。</>,
              <>還車規範：請於還車前將油箱 <span className="text-on-surface font-black text-tertiary">加滿油</span>。</>
            ].map((text, i) => (
              <li key={i} className="flex gap-4 items-start group">
                <div className="w-2.5 h-2.5 rounded-full bg-tertiary/30 mt-1.5 shrink-0 group-hover:scale-125 transition-transform"></div>
                <p className="text-[15px] font-medium text-on-surface-variant leading-relaxed">{text}</p>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
