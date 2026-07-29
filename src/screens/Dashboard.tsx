import { useState, useEffect } from 'react';
import { Sun, Cloud, CloudRain, CloudSun, CloudLightning, Plane, Hotel, Train, Calendar, ChevronRight, ExternalLink, Wallet, ClipboardList } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

export function Dashboard() {
  const navigate = useNavigate();
  const [weather, setWeather] = useState<{ temp: number; description: string; icon: any } | null>(null);

  useEffect(() => {
    // Fetch Weather (Ningbo, Zhejiang: 29.8683, 121.5440)
    const fetchWeather = async () => {
      try {
        const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=29.8683&longitude=121.5440&current=temperature_2m,weather_code');
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
  }, []);

  const WeatherIcon = weather?.icon || Sun;

  return (
    <div className="mt-20 px-4 pb-44">
      <section className="mb-8 px-2">
        <h2 className="text-on-surface text-3xl font-extrabold tracking-tight mb-2">寧波，我們來啦</h2>
        <div className="flex items-center gap-2 text-on-surface-variant font-medium">
          <Calendar size={14} />
          <span className="text-sm">2026/07/28 - 08/01</span>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-4 mb-6">
        {/* Weather Card */}
        <a 
          href="https://www.accuweather.com/zh/cn/ningbo/105342/weather-forecast/105342" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-surface-container-lowest p-5 rounded-2xl flex flex-col justify-between border border-outline-variant/10 shadow-sm transition-transform active:scale-95"
        >
          <div className="flex justify-between items-start mb-4">
            <span className="text-on-surface-variant font-semibold text-xs uppercase tracking-wider">寧波天氣</span>
            <WeatherIcon className="text-secondary fill-secondary/20" size={20} />
          </div>
          <div>
            <div className="text-3xl font-bold text-on-surface">{weather ? `${weather.temp}°C` : '--°C'}</div>
            <div className="text-[11px] text-on-surface-variant font-medium">寧波 {weather?.description || '載入中...'}</div>
          </div>
        </a>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <NavButton 
          icon={Plane} 
          label="交通票務" 
          color="bg-[#0077b6]" 
          onClick={() => navigate('/flights')} 
          extra={<div className="flex items-center gap-1.5 opacity-70"><span className="text-[10px] font-bold text-white uppercase tracking-widest">前往</span><ExternalLink size={16} /></div>}
        />
        <NavButton 
          icon={Hotel} 
          label="住宿推薦" 
          color="bg-[#00677d]" 
          onClick={() => navigate('/accommodation')} 
          />
        <NavButton 
          icon={Train} 
          label="寧波地鐵指引" 
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
          icon={ClipboardList} 
          label="行前待辦與準備" 
          color="bg-[#0d9488]" 
          onClick={() => navigate('/todos')} 
        />
        <NavButton 
          icon={Wallet} 
          label="旅行記帳與分攤" 
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
