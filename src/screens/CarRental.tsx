import { ChevronLeft, CreditCard, Train } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

export function CarRental() {
  const navigate = useNavigate();

  return (
    <div className="pt-24 px-6 pb-44 max-w-md mx-auto space-y-8">
      <button 
        onClick={() => navigate('/')}
        className="w-full py-5 bg-primary/5 text-primary border border-primary/20 rounded-xl font-bold text-lg shadow-sm flex items-center justify-center gap-2 active:scale-95 transition-transform"
      >
        <ChevronLeft size={20} />
        返回首頁 Dashboard
      </button>

      {/* Header Description */}
      <div className="space-y-2">
        <h2 className="text-3xl font-extrabold text-primary tracking-tight">寧波地鐵指南</h2>
        <p className="text-xs font-bold text-outline tracking-wider uppercase">Ningbo Metro Guide</p>
        <p className="text-sm text-on-surface-variant leading-relaxed font-medium">
          寧波地鐵線路密布、便捷環保，能完美覆蓋本行程中市區內的所有核心景點。支付寶或微信均可直接掃碼乘車，無需購買實體票卡。
        </p>
      </div>

      {/* Metro Guide Section */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-[#00677d]">
          <Train size={24} />
          <h3 className="font-extrabold text-xl">寧波地鐵 (Ningbo Metro)</h3>
        </div>
        
        <div className="bg-surface-container-low rounded-2xl p-6 space-y-4 border border-outline-variant/10">
          <p className="text-xs text-on-surface-variant leading-relaxed">
            目前寧波地鐵共有 5 條線路運營，單程票價 ¥2 - ¥10 不等，為最快且避開路面擁堵的最優選擇。
          </p>
          
          <div className="space-y-3.5 pt-2">
            <LineBadge color="bg-[#4da3ff]" text="地鐵 1 號線" desc="橫貫東西，直達天一廣場、鼓樓、高鐵站周邊、阿育王寺等" />
            <LineBadge color="bg-[#c2410c]" text="地鐵 2 號線" desc="直通【櫟社機場 T2】、【寧波高鐵站】與【寧波美術館/老外灘】" />
            <LineBadge color="bg-[#0e7490]" text="地鐵 4 號線" desc="直達千年古建【保國寺】與千年水鄉【慈城古縣城】" />
          </div>

          <div className="bg-white rounded-xl p-4 border border-outline-variant/10 space-y-2">
            <p className="text-xs font-bold text-primary flex items-center gap-1">
              <CreditCard size={14} /> 乘車方式
            </p>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              無需排隊購買實體單程票，可直接在 <span className="font-bold text-on-surface">支付寶/微信</span> 首頁中搜索並領取「寧波地鐵乘車碼」，進出站時對準閘機掃描即可。
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

function LineBadge({ color, text, desc }: { color: string; text: string; desc: string }) {
  return (
    <div className="flex gap-3 items-start">
      <div className={cn("px-2.5 py-1 rounded text-white text-[10px] font-black shrink-0 mt-0.5 shadow-sm", color)}>
        {text}
      </div>
      <p className="text-xs text-on-surface-variant leading-relaxed font-semibold">
        {desc}
      </p>
    </div>
  );
}
