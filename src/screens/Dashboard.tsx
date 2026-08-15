import React, { useState, useEffect } from 'react';
import { 
  Plane, Hotel, Car, Calendar, ChevronRight, Wallet, ShieldAlert, 
  Sun, PiggyBank
} from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { db } from '../lib/firebase';
import { collection, onSnapshot } from 'firebase/firestore';

export function Dashboard() {
  const navigate = useNavigate();
  const [balance, setBalance] = useState<number | null>(null);

  // 監聽公積金記帳餘額 (使用目前 Firebase transactions 計算的實際 balance)
  useEffect(() => {
    try {
      const unsubscribe = onSnapshot(collection(db, 'transactions'), (snapshot) => {
        let totalIncome = 0;
        let totalExpense = 0;
        snapshot.docs.forEach(doc => {
          const data = doc.data();
          const amt = Number(data.amount) || 0;
          if (data.type === 'income') totalIncome += amt;
          else if (data.type === 'expense') totalExpense += amt;
        });
        if (snapshot.docs.length > 0) {
          setBalance(totalIncome - totalExpense);
        }
      }, () => {
        // Firebase 離線或未初始化時保留
      });
      return () => unsubscribe();
    } catch {
      // 容錯
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#F7FAFC] pt-20 px-4 pb-44 max-w-xl mx-auto space-y-4">
      {/* 頂部標題 */}
      <section className="px-1 space-y-1">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight font-sans">
          ITALY × CROATIA
        </h1>
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 font-mono">
          <Calendar size={13} className="shrink-0 text-slate-400" />
          <span>09/27 — 10/23 · 27 DAYS</span>
        </div>
      </section>

      {/* 兩張並排資訊卡：今日天氣 + 公積金餘額 */}
      <div className="grid grid-cols-2 gap-3 pt-1">
        {/* 左：今日天氣 (保留之後接 API 的位置) */}
        <div 
          className="bg-white rounded-2xl p-4 flex flex-col justify-between select-none"
          style={{ boxShadow: '0 3px 8px rgba(15,70,95,0.07)' }}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">今日天氣</span>
            <Sun size={18} className="text-sky-500" />
          </div>
          <div className="my-2">
            <div className="text-2xl sm:text-3xl font-black text-slate-800 font-mono tracking-tight">
              24°C
            </div>
            <div className="text-xs font-bold text-slate-500 mt-0.5">
              今日目的地
            </div>
          </div>
        </div>

        {/* 右：公積金餘額 */}
        <div 
          onClick={() => navigate('/budget')}
          className="bg-white rounded-2xl p-4 flex flex-col justify-between select-none cursor-pointer hover:opacity-95 transition-opacity"
          style={{ boxShadow: '0 3px 8px rgba(15,70,95,0.07)' }}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">公積金餘額</span>
            <PiggyBank size={18} className="text-emerald-500" />
          </div>
          <div className="my-2">
            <div className="text-2xl sm:text-3xl font-black text-slate-800 font-mono tracking-tight">
              € {balance !== null ? balance.toLocaleString('en-US') : '0'}
            </div>
            <div className="text-xs font-bold text-slate-500 mt-0.5">
              旅行公積金
            </div>
          </div>
        </div>
      </div>

      {/* 6 個長條實色功能按鈕 */}
      <div className="grid grid-cols-1 gap-2.5 pt-1">
        {/* 1. 航班資訊 #178FCA */}
        <NavCard 
          icon={Plane}
          label="航班資訊"
          bgColor="#178FCA"
          onClick={() => navigate('/flights')}
        />

        {/* 2. 租車・巴士 #1596A6 */}
        <NavCard 
          icon={Car}
          label="租車・巴士"
          bgColor="#1596A6"
          onClick={() => navigate('/car-rental')}
        />

        {/* 3. 飯店住宿 #16879A */}
        <NavCard 
          icon={Hotel}
          label="飯店住宿"
          bgColor="#16879A"
          onClick={() => navigate('/accommodation')}
        />

        {/* 4. 每日行程 #268DC2 */}
        <NavCard 
          icon={Calendar}
          label="每日行程"
          bgColor="#268DC2"
          onClick={() => navigate('/itinerary')}
        />

        {/* 5. 旅行費用 #D56C2C */}
        <NavCard 
          icon={Wallet}
          label="旅行費用"
          bgColor="#D56C2C"
          onClick={() => navigate('/budget')}
        />

        {/* 6. 注意事項 #607987 */}
        <NavCard 
          icon={ShieldAlert}
          label="注意事項"
          bgColor="#607987"
          onClick={() => navigate('/airport-info')}
        />
      </div>
    </div>
  );
}

interface NavCardProps {
  icon: React.ElementType;
  label: string;
  bgColor: string;
  onClick: () => void;
}

function NavCard({ icon: Icon, label, bgColor, onClick }: NavCardProps) {
  return (
    <motion.button 
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="relative flex items-center justify-between w-full text-left transition-transform duration-100"
      style={{
        backgroundColor: bgColor,
        height: '65px',
        borderRadius: '16px',
        paddingLeft: '16px',
        paddingRight: '16px',
        boxShadow: '0 3px 8px rgba(15,70,95,0.07)',
      }}
    >
      <div className="flex items-center gap-3.5">
        {/* 38x38 半透明 Icon 方塊 */}
        <div 
          className="flex items-center justify-center shrink-0"
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '11px',
            backgroundColor: 'rgba(255, 255, 255, 0.12)',
          }}
        >
          <Icon size={20} className="text-white" strokeWidth={2.2} />
        </div>
        <span className="text-white text-[15px] sm:text-base font-bold tracking-tight font-sans">
          {label}
        </span>
      </div>
      <ChevronRight size={19} className="text-white/80 shrink-0" strokeWidth={2.5} />
    </motion.button>
  );
}

