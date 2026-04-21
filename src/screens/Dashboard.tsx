import { useState, useEffect } from 'react';
import { Sun, Cloud, CloudRain, CloudSun, CloudLightning, Bus, Plane, Hotel, Car, Calendar, Wallet, ChevronRight, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { db } from '../lib/firebase';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { cn } from '@/lib/utils';

export function Dashboard() {
  const navigate = useNavigate();
  const [balance, setBalance] = useState(0);
  const [weather, setWeather] = useState<{ temp: number; description: string; icon: any } | null>(null);

  useEffect(() => {
    // Fetch transactions
    const q = query(collection(db, 'transactions'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const transactions = snapshot.docs.map(doc => doc.data());
      const totalIncome = transactions
        .filter((t: any) => t.type === 'income')
        .reduce((acc, curr: any) => acc + curr.amount, 0);
      const totalExpense = transactions
        .filter((t: any) => t.type === 'expense')
        .reduce((acc, curr: any) => acc + curr.amount, 0);
      setBalance(totalIncome - totalExpense);
    });

    // Fetch Weather (Naha, Okinawa: 26.2124, 127.6809)
    const fetchWeather = async () => {
      try {
        const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=26.2124&longitude=127.6809&current=temperature_2m,weather_code');
        const data = await res.json();
        
        const code = data.current.weather_code;
        let description = '晴朗';
        let WeatherIcon = Sun;

        if (code === 0) { description = '晴朗'; WeatherIcon = Sun; }
        else if (code <= 3) { description = '多雲'; WeatherIcon = CloudSun; }
        else if (code <= 48) { description = '有霧'; WeatherIcon = Cloud; }
        else if (code <= 65 || (code >= 80 && code <= 82)) { description = '下雨'; WeatherIcon = CloudRain; }
        else if (code >= 95) { description = '雷雨'; WeatherIcon = CloudLightning; }
        else { description = '多雲'; WeatherIcon = Cloud; }

        setWeather({
          temp: Math.round(data.current.temperature_2m),
          description,
          icon: WeatherIcon
        });
      } catch (error) {
        console.error('Failed to fetch weather:', error);
      }
    };

    fetchWeather();
    return () => unsubscribe();
  }, []);

  const WeatherIcon = weather?.icon || Sun;

  return (
    <div className="mt-20 px-4 pb-44">
      <section className="mb-8 px-2">
        <h2 className="text-on-surface text-3xl font-extrabold tracking-tight mb-2">沖繩，我們來啦</h2>
        <div className="flex items-center gap-2 text-on-surface-variant font-medium">
          <Calendar size={14} />
          <span className="text-sm">2026/05/23 - 05/28</span>
        </div>
      </section>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Weather Card */}
        <a 
          href="https://www.accuweather.com/zh/jp/naha-shi/225881/weather-forecast/225881" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-surface-container-lowest p-5 rounded-2xl flex flex-col justify-between border border-outline-variant/10 shadow-sm transition-transform active:scale-95"
        >
          <div className="flex justify-between items-start mb-4">
            <span className="text-on-surface-variant font-semibold text-xs uppercase tracking-wider">那霸天氣</span>
            <WeatherIcon className="text-secondary fill-secondary/20" size={20} />
          </div>
          <div>
            <div className="text-3xl font-bold text-on-surface">{weather ? `${weather.temp}°C` : '--°C'}</div>
            <div className="text-[11px] text-on-surface-variant font-medium">沖繩 {weather?.description || '載入中...'}</div>
          </div>
        </a>

        {/* Fund Balance Card */}
        <button 
          onClick={() => navigate('/budget')}
          className="bg-surface-container-lowest p-5 rounded-2xl flex flex-col justify-between border border-outline-variant/10 shadow-sm transition-transform active:scale-95 text-left"
        >
          <div className="flex justify-between items-start mb-4">
            <span className="text-on-surface-variant font-semibold text-xs uppercase tracking-wider">公積金餘額</span>
            <Wallet className="text-primary" size={20} />
          </div>
          <div>
            <div className="text-2xl font-bold text-on-surface">¥ {balance.toLocaleString()}</div>
            <div className="text-[11px] text-on-surface-variant font-medium">即時公積金餘額</div>
          </div>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <NavButton 
          icon={Bus} 
          label="機場接送/停車" 
          color="bg-[#0e7490]" 
          onClick={() => navigate('/airport-info')} 
        />
        <NavButton 
          icon={Plane} 
          label="機票詳情" 
          color="bg-[#0077b6]" 
          onClick={() => navigate('/flights')} 
          extra={<div className="flex items-center gap-1.5 opacity-70"><span className="text-[10px] font-bold text-white uppercase tracking-widest">Go to</span><ExternalLink size={16} /></div>}
        />
        <NavButton 
          icon={Hotel} 
          label="住宿資料" 
          color="bg-[#00677d]" 
          onClick={() => navigate('/accommodation')} 
        />
        <NavButton 
          icon={Car} 
          label="租車資訊" 
          color="bg-[#4da3ff]" 
          onClick={() => navigate('/car-rental')} 
        />
        <NavButton 
          icon={Calendar} 
          label="每日行程" 
          color="bg-[#005d90]" 
          onClick={() => navigate('/itinerary')} 
        />
        <NavButton 
          icon={Wallet} 
          label="公積金預算" 
          color="bg-[#9d370c]" 
          onClick={() => navigate('/budget')} 
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
        "relative block w-full h-20 rounded-2xl overflow-hidden shadow-sm transition-all duration-200",
        color
      )}
    >
      <div className="relative h-full flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
            <Icon className="text-white" size={20} />
          </div>
          <span className="text-white text-lg font-bold tracking-tight">{label}</span>
        </div>
        {extra ? extra : <ChevronRight className="text-white/50" size={18} />}
      </div>
    </motion.button>
  );
}
