import { ChevronLeft, CreditCard, Train, Car, Navigation, Sparkles } from 'lucide-react';
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
        返回首頁
      </button>

      {/* Header Description */}
      <div className="space-y-2">
        <h2 className="text-3xl font-extrabold text-primary tracking-tight">寧波地鐵指南</h2>
        <p className="text-xs font-bold text-outline tracking-wider uppercase">寧波地鐵指引</p>
        <p className="text-sm text-on-surface-variant leading-relaxed font-medium">
          寧波地鐵線路密布、便捷環保，能完美覆蓋本行程中市區內的所有核心景點。支付寶或微信均可直接掃碼乘車，無需購買實體票卡。
        </p>
      </div>

      {/* Airport to Hotel Route Highlight */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-primary">
          <Train size={24} />
          <h3 className="font-extrabold text-xl">機場 ➔ 漫心府 地鐵乘車方案</h3>
        </div>
        
        <div className="bg-primary/5 rounded-2xl p-6 space-y-4 border border-primary/10">
          <div className="flex justify-between items-center border-b border-primary/10 pb-3">
            <div>
              <p className="text-xs text-outline font-bold">推薦乘車路線</p>
              <h4 className="font-extrabold text-base text-primary">地鐵 2 號線直達（無需換乘）</h4>
            </div>
            <div className="bg-primary text-white font-extrabold px-3 py-1 rounded-full text-xs">
              票價 ¥4 / 人
            </div>
          </div>

          <div className="space-y-4">
            <div className="relative pl-6 border-l-2 border-dashed border-primary/30 space-y-4">
              {/* Start Station */}
              <div className="relative">
                <span className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-primary border-4 border-white shadow-sm flex items-center justify-center"></span>
                <p className="font-bold text-sm text-on-surface">起點：櫟社國際機場站 (地鐵站)</p>
                <p className="text-xs text-on-surface-variant">櫟社國際機場 T2 航站樓 B2 層直接連通地鐵口</p>
              </div>

              {/* Transit */}
              <div className="relative py-1">
                <span className="absolute -left-[31px] top-2.5 w-4 h-4 rounded-full bg-[#c2410c] border-4 border-white shadow-sm flex items-center justify-center"></span>
                <p className="font-bold text-xs text-[#c2410c]">搭乘地鐵 2 號線（往 紅聯 方向）</p>
                <p className="text-xs text-on-surface-variant">乘坐 9 站 | 乘車時間約 27 分鐘</p>
              </div>

              {/* End Station */}
              <div className="relative">
                <span className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-primary border-4 border-white shadow-sm flex items-center justify-center"></span>
                <p className="font-bold text-sm text-on-surface">終點：城隍廟站（C 出口）</p>
                <p className="text-xs text-on-surface-variant">從 C 出口出站，步行僅約 200 米 (3 分鐘) 即可抵達「寧波天一城隍廟漫心府」</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hotel to Hotel Route Highlight */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-primary">
          <Car size={24} />
          <h3 className="font-extrabold text-xl">漫心府 ➔ 花間堂韓嶺 交通方案</h3>
        </div>
        
        {/* Recommended Taxi Card */}
        <div className="bg-primary/5 rounded-2xl p-6 space-y-4 border border-primary/10">
          <div className="flex justify-between items-center border-b border-primary/10 pb-3">
            <div>
              <p className="text-xs text-outline font-bold flex items-center gap-1">
                <Sparkles size={11} className="text-amber-500 animate-pulse" /> 推薦最省心方案
              </p>
              <h4 className="font-extrabold text-base text-primary">網約車 / 計程車直達 (打車就好)</h4>
            </div>
            <div className="bg-primary text-white font-extrabold px-3 py-1 rounded-full text-xs">
              約 ¥50-60
            </div>
          </div>

          <div className="space-y-2 text-xs text-on-surface-variant leading-relaxed font-medium">
            <p className="text-sm font-semibold text-on-surface">
              跨區攜帶行李，直接打車最方便、最優雅！
            </p>
            <p>
              ● <b>行車路程：</b>全程約 20 公里，不塞車約 35-40 分鐘。
            </p>
            <p>
              ● <b>乘車位置：</b>直接在「寧波天一城隍廟漫心府」門口或酒店大廳呼叫滴滴出行、高德或美團。
            </p>
            <p>
              ● <b>乘車定位：</b>寧波花間堂·韓嶺酒店。
            </p>
            <p className="bg-white/60 rounded-xl p-3 border border-outline-variant/10 text-primary font-bold italic">
              💡 溫馨提醒：拖拉大件行李跨市區與東錢湖度假區時，中途換乘多、折騰多。打車直達免去上下車轉乘，省下精力和時間用來享受東錢湖的美麗風光！
            </p>
          </div>
        </div>

        {/* Alternative Metro Card */}
        <div className="bg-surface-container-low rounded-2xl p-6 space-y-4 border border-outline-variant/10">
          <div className="flex justify-between items-center border-b border-outline-variant/10 pb-3">
            <div>
              <p className="text-xs text-on-surface-variant font-bold">備用綠色環保方案</p>
              <h4 className="font-extrabold text-sm text-on-surface">地鐵 2 號線 ➔ 4 號線 ➔ 接駁</h4>
            </div>
            <div className="bg-surface-variant text-on-surface-variant font-extrabold px-3 py-1 rounded-full text-xs">
              票價 ¥7 / 人
            </div>
          </div>

          <div className="space-y-4">
            <div className="relative pl-6 border-l-2 border-dashed border-outline-variant/30 space-y-4">
              {/* Start Station */}
              <div className="relative">
                <span className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-outline-variant border-4 border-white shadow-sm"></span>
                <p className="font-bold text-xs text-on-surface">起點：城隍廟站 (地鐵 2 號線)</p>
                <p className="text-[11px] text-on-surface-variant">由酒店步行約 200 米至地鐵站。</p>
              </div>

              {/* Metro Line 4 */}
              <div className="relative">
                <span className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-[#0e7490] border-4 border-white shadow-sm"></span>
                <p className="font-bold text-xs text-[#0e7490]">轉乘地鐵 4 號線 (東錢湖方向)</p>
                <p className="text-[11px] text-on-surface-variant">於「寧波火車站」轉乘，乘坐 11 站直達終點「東錢湖站」。</p>
              </div>

              {/* Bus/Taxi Connection */}
              <div className="relative">
                <span className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-outline-variant border-4 border-white shadow-sm"></span>
                <p className="font-bold text-xs text-on-surface">終點接駁：東錢湖站 ➔ 花間堂</p>
                <p className="text-[11px] text-on-surface-variant">出站後轉乘公車 960/966/968/906 路至「韓嶺古村站」或直接打車接駁 (約 ¥15)。</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Metro Guide Section */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-[#00677d]">
          <Train size={24} />
          <h3 className="font-extrabold text-xl">寧波地鐵</h3>
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
