import { Home, ChevronLeft, MapPin, Phone, Star, Coffee, Wifi, ShieldAlert, Navigation, Wine } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

export function Accommodation() {
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



      {/* Accommodation Card 1 */}
      <section className="space-y-4">
        <div className="flex justify-between items-center px-1">
          <span className="text-xs font-bold text-outline uppercase tracking-wider">第一、二天 入住（老城中心）</span>
          <span className="text-xs font-semibold text-primary px-2.5 py-1 bg-primary/10 rounded-full">中式府邸美學</span>
        </div>

        <div className="bg-surface-container-lowest rounded-3xl p-6 border border-outline-variant/10 shadow-md space-y-4 relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary"></div>
          
          <div className="space-y-1">
            <div className="flex gap-1 items-center text-amber-500">
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <span className="text-xs font-bold text-on-surface-variant ml-1">待入住 | 2晚共 ¥953.70</span>
            </div>
            <h3 className="text-2xl font-black text-on-surface leading-tight">寧波天一城隍廟漫心府</h3>
            <p className="text-xs font-bold text-outline uppercase tracking-wider">寧波天一城隍廟漫心府</p>
          </div>

          <p className="text-xs text-on-surface-variant leading-relaxed">
            坐落於海曙區核心地段，緊鄰城隍廟與天一廣場商圈。漫心府巧妙融合了江南復古宅邸意境與現代國潮時尚設計，極具中式庭院美學與精緻格調。入住其「高級雙床房」，出行與探索老城美食極其便利，是體驗甬城繁華與人文底蘊的最佳起點。
          </p>

          <div className="grid grid-cols-3 gap-2.5 pt-2">
            <FeatureIcon icon={Wifi} text="高級雙床房" />
            <FeatureIcon icon={Coffee} text="城隍廟商圈" />
            <FeatureIcon icon={MapPin} text="老城核心" />
          </div>

          <div className="pt-4 border-t border-surface-variant/30 space-y-2">
            <div className="flex items-start gap-2 text-xs text-on-surface-variant">
              <MapPin size={14} className="shrink-0 mt-0.5" />
              <span>寧波市海曙區（天一廣場/城隍廟地鐵站旁）</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-on-surface-variant">
              <Phone size={14} />
              <span>0574-87366666</span>
            </div>
          </div>

          <button 
            onClick={() => window.open('https://uri.amap.com/marker?position=121.551221,29.871145&name=宁波天一城隍庙漫心府', '_blank')}
            className="flex items-center justify-center gap-2 w-full py-3.5 bg-primary text-white rounded-2xl font-bold transition-transform active:scale-95 shadow-md"
          >
            <Navigation size={18} />
            高德地圖導航
          </button>
        </div>
      </section>

      {/* Accommodation Card 2 */}
      <section className="space-y-4">
        <div className="flex justify-between items-center px-1">
          <span className="text-xs font-bold text-outline uppercase tracking-wider">第三天 入住（東錢湖度假區）</span>
          <span className="text-xs font-semibold text-[#00677d] px-2.5 py-1 bg-[#00677d]/10 rounded-full">水鄉文藝避世</span>
        </div>

        <div className="bg-surface-container-lowest rounded-3xl p-6 border border-outline-variant/10 shadow-md space-y-4 relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#00677d]"></div>
          
          <div className="space-y-1">
            <div className="flex gap-1 items-center text-amber-500">
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <span className="text-xs font-bold text-on-surface-variant ml-1">待入住 | 1晚 ¥399.50</span>
            </div>
            <h3 className="text-2xl font-black text-[#00677d] leading-tight">寧波花間堂·韓嶺</h3>
            <p className="text-xs font-bold text-outline uppercase tracking-wider">寧波花間堂·韓嶺</p>
          </div>

          <p className="text-xs text-on-surface-variant leading-relaxed">
            坐落於歷史悠久的東錢湖韓嶺老街。花間堂將獨特的江南古村落瓦舍與時尚精品民宿設計完美契合。入住其「閭巷人家雙床房」，推窗即能欣賞小橋流水、老竹搖曳，極具文藝與悠閒氣息。漫步即可達韓嶺美術館，是夜宿東錢湖的首選。
          </p>

          <div className="grid grid-cols-3 gap-2.5 pt-2">
            <FeatureIcon icon={Wifi} text="閭巷人家雙床" />
            <FeatureIcon icon={Coffee} text="韓嶺老街內" />
            <FeatureIcon icon={MapPin} text="東錢湖畔" />
          </div>

          <div className="pt-4 border-t border-surface-variant/30 space-y-2">
            <div className="flex items-start gap-2 text-xs text-on-surface-variant">
              <MapPin size={14} className="shrink-0 mt-0.5" />
              <span>寧波市東錢湖旅遊度假區韓嶺老街內</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-on-surface-variant">
              <Phone size={14} />
              <span>0574-88301111</span>
            </div>
          </div>

          <button 
            onClick={() => window.open('https://uri.amap.com/marker?position=121.642918,29.774581&name=宁波花间堂·韩岭', '_blank')}
            className="flex items-center justify-center gap-2 w-full py-3.5 bg-[#00677d] text-white rounded-2xl font-bold transition-transform active:scale-95 shadow-md"
          >
            <Navigation size={18} />
            高德地圖導航
          </button>
        </div>
      </section>

      {/* Accommodation Card 3 */}
      <section className="space-y-4">
        <div className="flex justify-between items-center px-1">
          <span className="text-xs font-bold text-outline uppercase tracking-wider">第四天 入住（東部新城）</span>
          <span className="text-xs font-semibold text-[#8a2be2] px-2.5 py-1 bg-[#8a2be2]/10 rounded-full">奢華航海風情</span>
        </div>

        <div className="bg-surface-container-lowest rounded-3xl p-6 border border-outline-variant/10 shadow-md space-y-4 relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#8a2be2]"></div>
          
          <div className="space-y-1">
            <div className="flex gap-1 items-center text-amber-500">
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <span className="text-xs font-bold text-on-surface-variant ml-1">已預訂 | 1晚 ¥888.00 (小芲付錢)</span>
            </div>
            <h3 className="text-2xl font-black text-[#8a2be2] leading-tight">寧波英迪格酒店</h3>
            <p className="text-xs font-bold text-outline uppercase tracking-wider">寧波英迪格酒店</p>
          </div>

          <p className="text-xs text-on-surface-variant leading-relaxed">
            隸屬洲際酒店集團（IHG），坐落於鄞州區金融中心地段。酒店以寧波傳奇的「航海歷史與甬商傳奇」為設計靈感，完美交織現代前衛科技感與鄰里人文藝術。客房環境寬敞奢華，配備極佳，是為最後一晚旅途提供極致舒適修整的鄰里精品酒店。
          </p>

          <div className="grid grid-cols-3 gap-2.5 pt-2">
            <FeatureIcon icon={Wifi} text="精品雙床房" />
            <FeatureIcon icon={Coffee} text="附二客早餐" />
            <FeatureIcon icon={MapPin} text="東部新城" />
          </div>

          <div className="pt-4 border-t border-surface-variant/30 space-y-2">
            <div className="flex items-start gap-2 text-xs text-on-surface-variant">
              <MapPin size={14} className="shrink-0 mt-0.5" />
              <span>寧波市鄞州區寧東路 545 號</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-on-surface-variant">
              <Phone size={14} />
              <span>0574-89089999</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#8a2be2] font-semibold">
              <Wine size={14} />
              <span>貴賓室酒水任飲</span>
            </div>
          </div>

          <button 
            onClick={() => window.open('https://uri.amap.com/marker?position=121.618641,29.863112&name=宁波英迪格酒店', '_blank')}
            className="flex items-center justify-center gap-2 w-full py-3.5 bg-[#8a2be2] text-white rounded-2xl font-bold transition-transform active:scale-95 shadow-md"
          >
            <Navigation size={18} />
            高德地圖導航
          </button>
        </div>
      </section>

      {/* Booking Tips */}
      <section className="bg-amber-50 p-5 rounded-2xl border border-amber-200 flex items-start gap-3">
        <ShieldAlert className="text-amber-600 shrink-0 mt-0.5" size={18} />
        <p className="text-xs text-amber-900 leading-relaxed font-semibold">
          <span className="font-bold">訂房溫馨提示：</span>暑假及出行高峰期間屬於寧波旅遊旺季，以上精選熱門酒店房源極其搶手。建議務必提前 2-4 週完成預訂，以確保出行順利並獲得更優的價格。
        </p>
      </section>
    </div>
  );
}

function FeatureIcon({ icon: Icon, text }: { icon: any; text: string }) {
  return (
    <div className="bg-surface-container-high/50 rounded-xl p-2.5 flex flex-col items-center justify-center text-center gap-1 border border-outline-variant/10">
      <Icon className="text-primary" size={16} />
      <span className="text-[10px] font-bold text-on-surface-variant">{text}</span>
    </div>
  );
}
