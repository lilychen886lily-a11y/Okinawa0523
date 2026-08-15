import React from 'react';
import { Plane, Hotel, Car, Calendar, ChevronRight, Wallet, ShieldAlert } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

export function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="mt-20 px-4 pb-44 max-w-3xl mx-auto space-y-4">
      {/* Banner / Hero section - Ultra Clean Trip Summary */}
      <section className="p-4 sm:p-5 bg-surface-container-lowest rounded-3xl border border-outline-variant/10 shadow-xs space-y-1">
        <h2 className="text-primary font-black text-xl sm:text-2xl tracking-tight uppercase font-mono">
          ITALY × CROATIA
        </h2>
        <p className="text-xs sm:text-sm font-bold text-on-surface-variant font-mono">
          09/27 — 10/23 · 27 DAYS
        </p>
      </section>

      {/* Main Navigation List - 清爽淡色系 6 大核心入口 */}
      <div className="grid grid-cols-1 gap-3">
        <NavButton 
          icon={Plane} 
          label="航班資訊" 
          bgColor="bg-[#EFF7FC]" 
          iconColor="text-[#2878A5]" 
          onClick={() => navigate('/flights')} 
        />
        <NavButton 
          icon={Car} 
          label="租車・巴士" 
          bgColor="bg-[#EFF8F5]" 
          iconColor="text-[#32806F]" 
          onClick={() => navigate('/car-rental')} 
        />
        <NavButton 
          icon={Hotel} 
          label="飯店住宿" 
          bgColor="bg-[#F5F2F8]" 
          iconColor="text-[#786A8C]" 
          onClick={() => navigate('/accommodation')} 
        />
        <NavButton 
          icon={Calendar} 
          label="每日行程" 
          bgColor="bg-[#F2F6FA]" 
          iconColor="text-[#52758D]" 
          onClick={() => navigate('/itinerary')} 
        />
        <NavButton 
          icon={Wallet} 
          label="旅行費用" 
          bgColor="bg-[#FBF5EC]" 
          iconColor="text-[#A56C32]" 
          onClick={() => navigate('/budget')} 
        />
        <NavButton 
          icon={ShieldAlert} 
          label="注意事項" 
          bgColor="bg-[#FAF6E9]" 
          iconColor="text-[#96762E]" 
          onClick={() => navigate('/airport-info')} 
        />
      </div>
    </div>
  );
}

interface NavButtonProps {
  icon: React.ElementType;
  label: string;
  bgColor: string;
  iconColor: string;
  onClick: () => void;
  extra?: React.ReactNode;
}

function NavButton({ icon: Icon, label, bgColor, iconColor, onClick, extra }: NavButtonProps) {
  return (
    <motion.button 
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "relative block w-full rounded-2xl border border-black/5 p-4 text-left shadow-xs transition-all duration-150 min-h-[44px]",
        bgColor
      )}
    >
      <div className="relative h-full flex items-center justify-between">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-white/80 shadow-2xs flex items-center justify-center shrink-0">
            <Icon className={cn(iconColor)} size={20} />
          </div>
          <span className="text-on-surface text-base font-bold tracking-tight">{label}</span>
        </div>
        {extra ? extra : <ChevronRight className="text-on-surface-variant/40 shrink-0" size={20} />}
      </div>
    </motion.button>
  );
}
