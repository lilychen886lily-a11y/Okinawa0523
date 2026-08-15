import { Plane, Hotel, Car, Calendar, ChevronRight, ExternalLink, Wallet, ClipboardList, ShieldAlert, Navigation } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

export function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="mt-20 px-4 pb-44 max-w-3xl mx-auto">
      {/* Banner / Hero section */}
      <section className="mb-6 p-5 bg-surface-container-lowest rounded-3xl border border-outline-variant/10 shadow-sm space-y-3">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-primary font-black text-[11px] uppercase tracking-widest block">27 天尊榮漫遊</span>
            <h2 className="text-on-surface text-2xl font-black tracking-tight">義大利 & 克羅埃西亞</h2>
            <div className="flex items-center gap-2 text-on-surface-variant font-bold text-xs mt-1">
              <Calendar size={14} className="text-primary" />
              <span>2026/09/27 - 2026/10/23 (共 27 天)</span>
            </div>
          </div>
          <span className="px-2.5 py-1 bg-primary/10 text-primary font-extrabold text-xs rounded-xl">
            全員 5 人
          </span>
        </div>

        {/* Departure batches overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-outline-variant/10 text-xs">
          <div 
            onClick={() => navigate('/flights/BR95')}
            className="p-3 bg-blue-50/70 dark:bg-blue-950/20 rounded-2xl border border-blue-100 dark:border-blue-900/30 cursor-pointer hover:bg-blue-100/60 transition-colors"
          >
            <span className="text-[10px] font-black uppercase text-blue-700 dark:text-blue-400 block">第一批出發 (9/27 長榮 BR95)</span>
            <p className="font-extrabold text-on-surface text-xs mt-0.5">小許、春香、麗安</p>
            <span className="text-[10px] text-blue-600 dark:text-blue-300">直飛米蘭 (MXP) ➜ 前往羅馬/威尼斯</span>
          </div>
          <div 
            onClick={() => navigate('/flights/CX423')}
            className="p-3 bg-amber-50/70 dark:bg-amber-950/20 rounded-2xl border border-amber-100 dark:border-amber-900/30 cursor-pointer hover:bg-amber-100/60 transition-colors"
          >
            <span className="text-[10px] font-black uppercase text-amber-700 dark:text-amber-400 block">第二批出發 (10/5 高雄/卡達聯程)</span>
            <p className="font-extrabold text-on-surface text-xs mt-0.5">小花、頭家娘</p>
            <span className="text-[10px] text-amber-600 dark:text-amber-300">10/6 薩格勒布 (ZAG) 全員大會合</span>
          </div>
        </div>
      </section>

      {/* Main Navigation List */}
      <div className="grid grid-cols-1 gap-3">
        <NavButton 
          icon={Calendar} 
          label="每日行程" 
          color="bg-[#005d90]" 
          onClick={() => navigate('/itinerary')} 
        />
        <NavButton 
          icon={Hotel} 
          label="飯店住宿" 
          color="bg-[#00677d]" 
          onClick={() => navigate('/accommodation')} 
        />
        <NavButton 
          icon={Car} 
          label="交通指南" 
          color="bg-[#0d9488]" 
          onClick={() => navigate('/car-rental')} 
        />
        <NavButton 
          icon={Plane} 
          label="航班資訊" 
          color="bg-[#0077b6]" 
          onClick={() => navigate('/flights')} 
          extra={<div className="flex items-center gap-1.5 opacity-80 text-white"><ExternalLink size={16} /></div>}
        />
        <NavButton 
          icon={ClipboardList} 
          label="行前待辦" 
          color="bg-[#1e293b]" 
          onClick={() => navigate('/todos')} 
        />
        <NavButton 
          icon={Wallet} 
          label="旅行記帳" 
          color="bg-[#9d370c]" 
          onClick={() => navigate('/budget')} 
        />
        <NavButton 
          icon={ShieldAlert} 
          label="ZTL & 停車" 
          color="bg-[#854d0e]" 
          onClick={() => navigate('/parking')} 
        />
        <NavButton 
          icon={Navigation} 
          label="退稅指南" 
          color="bg-[#334155]" 
          onClick={() => navigate('/airport-info')} 
        />
      </div>
    </div>
  );
}

function NavButton({ icon: Icon, label, color, onClick, extra }: any) {
  return (
    <motion.button 
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "relative block w-full rounded-2xl overflow-hidden shadow-sm transition-all duration-200 p-4 text-left",
        color
      )}
    >
      <div className="relative h-full flex items-center justify-between">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
            <Icon className="text-white" size={20} />
          </div>
          <span className="text-white text-base font-bold tracking-tight">{label}</span>
        </div>
        {extra ? extra : <ChevronRight className="text-white/60 shrink-0" size={20} />}
      </div>
    </motion.button>
  );
}

