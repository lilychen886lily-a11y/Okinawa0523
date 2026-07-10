import { CalendarDays, ChevronRight, Navigation, Clock, MapPin, Phone, Info, CheckSquare, Heart, Lightbulb } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

export function ParkingDetails() {
  const navigate = useNavigate();

  return (
    <div className="pb-44 pt-24 px-6 space-y-6 max-w-md mx-auto">
      <button 
        onClick={() => navigate('/itinerary')}
        className="w-full py-4 px-6 bg-surface-container-lowest rounded-2xl flex items-center justify-between group active:scale-95 transition-all duration-200 shadow-sm border border-outline-variant/10"
      >
        <div className="flex items-center gap-3">
          <CalendarDays className="text-primary" size={20} />
          <span className="font-bold text-on-surface tracking-tight">返回每日行程 (Itinerary)</span>
        </div>
        <ChevronRight className="text-outline-variant group-hover:translate-x-1 transition-transform" size={18} />
      </button>

      {/* Header Description */}
      <div className="space-y-1">
        <h2 className="text-3xl font-extrabold text-primary tracking-tight">寧波旅遊實用小貼士</h2>
        <p className="text-xs font-bold text-outline tracking-wider uppercase">Travel Tips & Packing List</p>
      </div>

      {/* Weather Reminder */}
      <section className="bg-primary/5 p-5 rounded-2xl flex items-start gap-4 border border-primary/10">
        <div className="bg-primary p-2.5 rounded-xl shrink-0 text-white">
          <Clock size={20} />
        </div>
        <div className="space-y-1">
          <h3 className="text-primary font-bold text-base">氣候與穿衣 Climate & Outfit</h3>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            10月是寧波最美、最舒適的秋季，氣溫平均在 <span className="font-bold text-primary">16°C - 24°C</span> 之間，秋高氣爽。白天適合穿輕便襯衫或長袖 T 恤，晚上三江口或東錢湖畔風大，建議攜帶一件 <span className="font-bold text-primary">薄外套或風衣</span> 防風禦寒。
          </p>
        </div>
      </section>

      {/* Checklist Section */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-on-surface flex items-center gap-2 px-1">
          <CheckSquare className="text-primary" size={20} />
          行前準備清單 Checklist
        </h3>
        
        <div className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/10 shadow-sm space-y-4">
          <CheckItem title="必備証件" desc="台胞證、回鄉證、護照等購票身份證明原件，需隨身攜帶，高鐵及飛機全部實名制查驗。" />
          <CheckItem title="電子錢包" desc="下載支付寶或微信 App，綁定境外信用卡或大陸銀行卡，市區內商戶全部使用電子支付。" />
          <CheckItem title="地圖導航" desc="在大陸旅遊首選「高德地圖」或「百度地圖」App，景點定位精準，且能查看實時公交、地鐵換乘與網約車軌跡。" />
          <CheckItem title="預約門票" desc="部分熱門景點（如天一閣、寧波博物館、保國寺等）在國慶假期人流多，建議提前 1-3 天在微信小程序或微信公眾號進行預訂。" />
        </div>
      </section>

      {/* Food Specialties */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-on-surface flex items-center gap-2 px-1">
          <Heart className="text-rose-500 fill-rose-500/10" size={20} />
          寧波本幫美食推薦 Food Guide
        </h3>

        <div className="bg-surface-container-low rounded-2xl p-6 border border-outline-variant/10 space-y-4">
          <p className="text-xs text-on-surface-variant leading-relaxed font-semibold">
            寧波菜又稱「甬幫菜」，以「鮮鹹合一」、注重原汁原味和鮮嫩軟滑著稱。以下美食千萬不要錯過：
          </p>
          <div className="grid grid-cols-1 gap-3">
            <FoodCard name="紅膏熗蟹" desc="選用頂級紅膏梭子蟹，經鹽水醃製而成，果凍般的口感，鮮美無比！" />
            <FoodCard name="雪菜大黃魚" desc="寧波傳統名菜，野生黃魚與精選雪菜同煮，魚肉細嫩，湯頭濃白極鮮。" />
            <FoodCard name="慈城手工年糕" desc="稻米清香、口感極其軟糯有韌性。薺菜肉絲炒年糕是經典中的經典。" />
            <FoodCard name="缸鴨狗黑芝麻湯糰" desc="香濃的豬油芝麻內餡配上水磨糯米皮，桂花香氣四溢，象徵團團圓圓。" />
          </div>
        </div>
      </section>
    </div>
  );
}

function CheckItem({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="flex gap-3 items-start border-b border-surface-variant/30 pb-3 last:border-b-0 last:pb-0">
      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0"></div>
      <div>
        <p className="font-bold text-sm text-on-surface">{title}</p>
        <p className="text-xs text-on-surface-variant leading-relaxed mt-1">{desc}</p>
      </div>
    </div>
  );
}

function FoodCard({ name, desc }: { name: string; desc: string }) {
  return (
    <div className="bg-white rounded-xl p-3.5 border border-outline-variant/10 shadow-sm">
      <p className="font-bold text-sm text-primary">{name}</p>
      <p className="text-xs text-on-surface-variant leading-relaxed mt-1 font-medium">{desc}</p>
    </div>
  );
}
