import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Compass, MapPin, Calendar, Clock, Phone, AlertCircle, Sparkles, Navigation, 
  MapIcon, Utensils, Hotel, ArrowLeft, ArrowRight, Share2, Printer, Check, Info,
  ChevronRight, ExternalLink, Moon, Sun, Cloud, Train, MessageSquare, Compass as CompassIcon,
  ShoppingBag, Camera, Home, ArrowRightLeft, BookOpen, Coffee, Flame, Car, Bike
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

interface TimelineItemProps {
  time: string;
  title: string;
  description: React.ReactNode;
  actionIcon?: React.ComponentType<any>;
  actionLabel?: string;
  onClickAction?: () => void;
  type?: 'activity' | 'food' | 'accommodation' | 'transport';
  badge?: string;
  address?: string;
  hours?: string;
  phone?: string;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ 
  time, 
  title, 
  description, 
  actionIcon: ActionIcon, 
  actionLabel, 
  onClickAction,
  type = 'activity',
  badge,
  address,
  hours,
  phone
}) => {
  return (
    <div className="relative pl-8 pb-8 last:pb-0 group">
      {/* Icon node wrapper */}
      <div className={cn(
        "absolute left-0 top-1.5 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all z-10",
        type === 'accommodation' ? "bg-[#e8f5e9] border-[#2e7d32] text-[#2e7d32]" :
        type === 'food' ? "bg-[#fff3e0] border-[#ef6c00] text-[#ef6c00]" :
        type === 'transport' ? "bg-[#e3f2fd] border-[#1565c0] text-[#1565c0]" :
        "bg-primary-container/15 border-primary text-primary"
      )}>
        {type === 'accommodation' ? <Hotel size={14} /> :
         type === 'food' ? <Utensils size={14} /> :
         type === 'transport' ? <Train size={14} /> :
         <Compass size={14} />}
      </div>
      
      <div className="bg-surface-container-low border border-outline-variant/15 hover:border-primary/20 rounded-2xl p-4 transition-all shadow-sm hover:shadow-md">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black text-primary font-mono tracking-wider flex items-center gap-1.5 bg-primary/5 px-2.5 py-1 rounded-full">
              <Clock size={12} />
              {time}
            </span>
            {badge && (
              <span className="text-[10px] font-bold bg-[#efebe9] text-[#4e342e] px-2 py-0.5 rounded-full uppercase tracking-wider">
                {badge}
              </span>
            )}
          </div>
        </div>
        
        <h4 className="text-base font-extrabold text-on-surface tracking-tight mb-2 flex items-center gap-2">
          {title}
        </h4>
        
        <div className="text-on-surface-variant text-sm leading-relaxed mb-3 font-medium">
          {description}
        </div>

        {/* Optional Metadata Grid */}
        {(address || hours || phone) && (
          <div className="mt-3 pt-3 border-t border-outline-variant/10 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-medium text-on-surface-variant bg-surface-container-highest/20 p-2.5 rounded-xl mb-3">
            {address && (
              <div className="flex items-start gap-1.5 col-span-1 sm:col-span-2">
                <MapPin size={13} className="text-primary shrink-0 mt-0.5" />
                <span><strong className="text-on-surface">地址：</strong>{address}</span>
              </div>
            )}
            {hours && (
              <div className="flex items-center gap-1.5">
                <Clock size={13} className="text-amber-600 shrink-0" />
                <span><strong className="text-on-surface">營業時間：</strong>{hours}</span>
              </div>
            )}
            {phone && (
              <div className="flex items-center gap-1.5">
                <Phone size={13} className="text-emerald-600 shrink-0" />
                <span><strong className="text-on-surface">電話：</strong>{phone}</span>
              </div>
            )}
          </div>
        )}
        
        {ActionIcon && actionLabel && onClickAction && (
          <button 
            onClick={onClickAction}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-surface-container-highest hover:bg-primary hover:text-white transition-all text-on-surface rounded-xl text-xs font-bold border border-outline-variant/10 shadow-sm"
          >
            <ActionIcon size={14} />
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
};

export function Itinerary() {
  const navigate = useNavigate();
  const [activeDay, setActiveDay] = useState(0);
  const [day2Dinner, setDay2Dinner] = useState<'yongshang' | 'ninghai' | 'amao'>('yongshang');

  const days = [
    { num: 1, date: "7/28", title: "機場抵達 & 鼓樓夜漫遊" },
    { num: 2, date: "7/29", title: "老城核心 & 江畔璀璨夜" },
    { num: 3, date: "7/30", title: "東錢湖風光 & 韓嶺文藝" },
    { num: 4, date: "7/31", title: "湖畔單車環遊 & 阪急奢華購物" },
    { num: 5, date: "8/01", title: "三江購物 & 阿拉好菜場" }
  ];

  return (
    <div className="min-h-screen bg-surface text-on-surface py-8 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <header className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate('/')}
              className="p-2.5 bg-surface-container hover:bg-surface-container-high text-on-surface rounded-2xl transition-all"
            >
              <ArrowLeft size={18} />
            </button>
            <div>
              <h1 className="text-2xl font-black text-on-surface tracking-tight flex items-center gap-1.5">
                宁波五日游
              </h1>
              <p className="text-xs text-on-surface-variant font-medium mt-0.5">宁静高雅 · 甬上名灶與山海名勝之旅</p>
            </div>
          </div>
          <button 
            onClick={() => window.print()}
            className="p-2.5 bg-surface-container hover:bg-surface-container-high text-on-surface rounded-2xl transition-all flex items-center gap-1.5 text-xs font-bold"
          >
            <Printer size={16} />
            <span>列印行程</span>
          </button>
        </header>

        {/* Day Selector */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
          {days.map((day, idx) => (
            <button
              key={day.num}
              onClick={() => setActiveDay(idx)}
              className={cn(
                "flex-shrink-0 flex flex-col items-center justify-center p-3 rounded-2xl w-24 border transition-all",
                activeDay === idx 
                  ? "bg-[#005d90] text-white border-transparent shadow-lg scale-105" 
                  : "bg-surface-container/50 text-on-surface-variant border-outline-variant/10 hover:bg-surface-container-high"
              )}
            >
              <span className="text-[10px] uppercase font-black tracking-widest opacity-85">第 {day.num} 天</span>
              <span className="text-lg font-black mt-0.5">{day.date}</span>
            </button>
          ))}
        </div>

        {/* Day 1 */}
        {activeDay === 0 && (
          <>
            <section className="mb-8 mt-2">
              <span className="text-[10px] bg-primary/10 text-primary px-3 py-1 rounded-full font-bold uppercase tracking-wider">抵達與老城初探</span>
              <h2 className="text-[#005d90] text-3xl font-extrabold tracking-tighter mt-2 mb-4 px-2">7/28 第一天：抵達明州、機場接駁與鼓樓夜未眠</h2>
              <button 
                onClick={() => navigate('/')}
                className="w-full py-4 bg-primary text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-md hover:opacity-90 active:scale-95 transition-all"
              >
                <Home size={20} />
                返回主面板
              </button>
            </section>

            <div className="space-y-6 relative">
              <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-surface-variant/40"></div>

              <TimelineItem 
                type="transport"
                time="20:45" 
                title="飛機抵達寧波櫟社國際機場 (9C8686)" 
                description="搭乘春秋航空 9C8686 班機順利抵達寧波櫟社國際機場 (T2 航站樓)。辦妥入境手續並提取行李後，準備前往寧波市中心。"
                address="浙江省寧波市海曙區機場路"
                hours="24 小時開放"
                phone="0574-89006888"
                actionIcon={MapIcon}
                actionLabel="查看櫟社機場地圖"
                onClickAction={() => window.open('https://uri.amap.com/marker?position=121.461944,29.825833&name=宁波栎社国际机场', '_blank')}
              />

              <TimelineItem 
                type="transport"
                time="21:15 - 21:45" 
                title="機場接駁：地鐵 2 號線前往酒店（或私家專車）" 
                description={(
                  <div className="space-y-2">
                    <p>推薦搭乘便捷的寧波地鐵 2 號線或安排私家專車接送前往「寧波天一城隍廟漫心府」：</p>
                    <div className="bg-primary/5 rounded-xl p-3 border border-primary/10 space-y-1.5 text-xs text-on-surface">
                      <div className="flex justify-between items-center pb-1 border-b border-primary/10">
                        <span className="font-extrabold text-[#005d90]">地鐵 2 號線乘車指南</span>
                        <span className="bg-[#005d90] text-white px-1.5 py-0.5 rounded text-[10px] font-black">單程 ¥4 人民幣</span>
                      </div>
                      <p><span className="font-bold text-primary">● 乘車站點：</span>櫟社國際機場站（地鐵站，與 T2 航站樓 B2 層直接連通，免出站）</p>
                      <p><span className="font-bold text-primary">● 下車站點：</span>城隍廟站（C 出口出站，步行僅約 200 公尺、3 分鐘即可抵達漫心府酒店）</p>
                      <p><span className="font-bold text-primary">● 乘車路線：</span>搭乘地鐵 2 號線（往 紅聯 方向），全程共 9 站，乘車時間約 27 分鐘，無需轉乘。</p>
                    </div>
                  </div>
                )}
                actionIcon={MapIcon}
                actionLabel="查看導航路線"
                onClickAction={() => window.open('https://uri.amap.com/navigation?from=121.461944,29.825833,机场&to=121.551221,29.871145,酒店&mode=car', '_blank')}
              />

              <TimelineItem 
                type="accommodation"
                time="21:45 - 22:15" 
                title="入住辦理：寧波天一城隍廟漫心府 (漫心酒店)" 
                description="抵達漫心府辦理入住。酒店設計巧妙融入了江南傳統美學與現代潮流元素。辦妥手續後安頓行李，稍事休息，洗去旅途疲憊。"
                address="浙江省寧波市海曙區藥行街 136 號"
                hours="24 小時營業"
                phone="0574-87175555"
                actionIcon={MapIcon}
                actionLabel="查看酒店地圖位置"
                onClickAction={() => window.open('https://uri.amap.com/marker?position=121.551221,29.871145&name=宁波天一城隍庙漫心府', '_blank')}
              />

              <TimelineItem 
                type="food"
                time="22:15 - 23:30" 
                title="夜尋「鼓樓沿」或「城隍廟」深夜宵夜" 
                description="安頓好後，若肚子餓了，可漫步前往鄰近的老城區或鼓樓沿歷史街區。雖然大部分商場已打烊，但深夜的小吃店與老字號依然散發著煙火氣。推薦品嚐一碗熱氣騰騰、甜糯可口的「寧波芝麻湯糰」，洗去飛行的勞頓。"
                address="浙江省寧波市海曙區公園路 (鼓樓沿歷史街區)"
                hours="全天開放 (店鋪通常 10:00 - 22:00)"
                phone="0574-87259021"
                actionIcon={Utensils}
                actionLabel="尋找周邊深夜美食"
                onClickAction={() => window.open('https://uri.amap.com/search?keyword=美食&center=121.551221,29.871145', '_blank')}
              />

              <TimelineItem 
                type="accommodation"
                time="23:30" 
                title="返回酒店休息 (第 1 晚)" 
                description="返回漫心府精緻客房，享受舒適床品，為明天的精彩老城人文探索之旅補充滿滿能量。"
                address="浙江省寧波市海曙區藥行街 136 號"
                hours="24 小時營業"
                phone="0574-87175555"
                actionIcon={MapIcon}
                actionLabel="查看酒店地圖位置"
                onClickAction={() => window.open('https://uri.amap.com/marker?position=121.551221,29.871145&name=宁波天一城隍庙漫心府', '_blank')}
              />
            </div>
          </>
        )}

        {/* Day 2 */}
        {activeDay === 1 && (
          <>
            <section className="mb-8 mt-2">
              <span className="text-[10px] bg-primary/10 text-primary px-3 py-1 rounded-full font-bold uppercase tracking-wider">老城核心與江畔璀璨夜</span>
              <h2 className="text-[#005d90] text-3xl font-extrabold tracking-tighter mt-2 mb-4 px-2">7/29 第二天：老城漫步、天一閣、老外灘與甬幫饗宴</h2>
              <button 
                onClick={() => navigate('/')}
                className="w-full py-4 bg-primary text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-md hover:opacity-90 active:scale-95 transition-all"
              >
                <Home size={20} />
                返回主面板
              </button>
            </section>

            <div className="space-y-6 relative">
              <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-surface-variant/40"></div>

              <TimelineItem 
                time="09:00 - 11:00" 
                title="月湖公園" 
                description="清晨前往歷史悠久的月湖公園。這裡湖光瀲灩、古橋垂柳、微風拂面，是古人寄情山水、文人吟詩作畫的絕佳修閒景緻。漫步湖畔十洲，欣賞沿岸的名人故居與文脈古建，享受無比安逸的老城晨光。在月湖畔還座落著必訪的網紅烘焙「麥田工坊」，不妨到下方的『老城美食大特輯』查看推薦，買份芋泥冰麵包帶去湖畔野餐！"
                address="浙江省寧波市海曙區縣學街與柳汀街交叉口"
                hours="全天開放 (00:00 - 24:00)"
                phone="0574-87321557"
                actionIcon={Compass}
                actionLabel="查看月湖公園導航"
                onClickAction={() => window.open('https://uri.amap.com/marker?position=121.541242,29.871212&name=月湖公园', '_blank')}
              />

              <TimelineItem 
                time="11:00 - 12:30" 
                title="天一閣藏書樓" 
                description="參觀中國現存最古老的私家藏書樓、也是亞洲現存最古老的圖書館——天一閣。漫步在古木參天、假山水榭、清幽雅致的園林中，欣賞精美的磚雕、石刻與宏大藏書底蘊，感受浙東千年文脈的無比厚重。"
                address="浙江省寧波市海曙區天一街 10 號"
                hours="08:30 - 17:30 (17:00 停止入園，週一下午閉館)"
                phone="0574-87293856"
                actionIcon={BookOpen}
                actionLabel="查看天一閣導航"
                onClickAction={() => window.open('https://uri.amap.com/marker?position=121.535891,29.872321&name=天一阁博物馆', '_blank')}
              />

              <TimelineItem 
                time="12:30 - 13:30" 
                title="寧波府城隍廟" 
                description="參觀這座全中國現存規模最大、極富浙東木雕工藝特色的城隍廟。漫步於宏偉的宮殿式大殿，了解寧波歷史悠久的民間信仰與神明文化，品味江南古建的雕梁畫棟之美。中午可至下方美食特輯，挑選百年非遺「缸鴨狗」或人氣手作「固海糕團店」品嚐地道點心！"
                address="浙江省寧波市海曙區縣學街 22 號"
                hours="08:30 - 17:00"
                phone="0574-87293774"
                actionIcon={Camera}
                actionLabel="查看城隍廟導航"
                onClickAction={() => window.open('https://uri.amap.com/marker?position=121.551221,29.870123&name=宁波府城隍庙', '_blank')}
              />

              <TimelineItem 
                time="13:30 - 15:30" 
                title="天一廣場 漫遊 & 愜意採購" 
                description="隨後前往比鄰的繁華商業核心天一廣場。這裡融合了宏偉的天主教堂、巨大音樂噴泉與豐富的現代品牌。您可一邊享受悠閒的午後購物，一邊在咖啡店 or 網紅茶飲店小坐，為晚上的江畔行程做好充足準備。"
                address="浙江省寧波市海曙區中山東路 188 號"
                hours="10:00 - 22:00"
                phone="0574-87251111"
                actionIcon={ShoppingBag}
                actionLabel="查看天一廣場導航"
                onClickAction={() => window.open('https://uri.amap.com/marker?position=121.554315,29.873523&name=天一广场', '_blank')}
              />

              <TimelineItem 
                time="15:30 - 18:00" 
                title="漫步「鼓樓沿歷史街區」" 
                description="前往寧波唯一的古城樓遺蹟「鼓樓沿歷史文化街區」。這裡白牆黛瓦、馬頭牆高聳，交織著古老甬城風情與朝氣蓬勃的文創活力。在這裡可以一邊觀賞傳統與現代融合的文玩市集，一邊排隊朝聖神級街頭小吃「辣哭餅」（詳細美味推薦已收錄在下方美食特輯中）。"
                address="浙江省寧波市海曙區公園路 2 號"
                hours="全天開放 (店鋪通常 09:30 - 21:30)"
                phone="0574-87259021"
                actionIcon={Compass}
                actionLabel="查看鼓樓導航"
                onClickAction={() => window.open('https://uri.amap.com/marker?position=121.551815,29.879512&name=鼓楼沿历史文化街区', '_blank')}
              />

              <TimelineItem 
                time="18:00 - 20:30" 
                title="老城精選晚餐與漫談時間" 
                description="今天的晚餐我們為您挑選了三家天一廣場周邊口碑最好、人氣最高的特色甬幫餐館：『甬上名灶』、『寧海食堂』或『阿毛名灶』。我們已將詳細的招牌菜推薦與一鍵地圖導航功能整合在下方的『老城美食大特輯』中，您可以自由切換並選擇今晚最想吃的一餐！"
                address="浙江省寧波市海曙區中山東路 188 號 (天一廣場商圈)"
                hours="11:00 - 14:00, 17:00 - 21:30 (各店不同)"
                phone="0574-87251111 (商圈客服)"
                actionIcon={Utensils}
                actionLabel="查看下方晚餐精選"
                onClickAction={() => {
                  const element = document.getElementById('food-section');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              />

              <TimelineItem 
                time="20:30 - 22:30" 
                title="璀璨夜遊：老外灘江畔夜色 & 酒吧街風情" 
                description="夜幕降臨，漫步或打車前往融合歷史與時尚的老外灘。這裡比上海黃浦江外灘開埠還早20年，英法風格的古老歐式建築群在霓虹照耀下風情萬種。伴隨三江口的愜意江風，在江畔散步或挑選一家精緻酒吧小酌，享受極具情調 of 江畔夜生活。"
                address="浙江省寧波市江北區外灘大橋旁 (中馬路)"
                hours="全天開放 (酒吧多為 18:00 - 次日 02:00)"
                phone="0574-87356268"
                actionIcon={MapIcon}
                actionLabel="查看老外灘導航"
                onClickAction={() => window.open('https://uri.amap.com/marker?position=121.568114,29.880479&name=宁波老外滩', '_blank')}
              />

              <TimelineItem 
                time="23:15" 
                title="續住：寧波天一城隍廟漫心府 (第 2 晚)" 
                description="結束了一整天精彩飽滿的寧波老城核心與老外灘璀璨漫遊，返回酒店舒適洗漱與休息。為明天一早東錢湖畔風光與韓嶺老街文藝漫遊補充滿滿元氣。"
                address="浙江省寧波市海曙區藥行街 136 號"
                hours="24 小時營業"
                phone="0574-87175555"
                actionIcon={MapIcon}
                actionLabel="查看酒店地圖位置"
                onClickAction={() => window.open('https://uri.amap.com/marker?position=121.551221,29.871145&name=宁波天一城隍庙漫心府', '_blank')}
              />
            </div>

            {/* Food Section (老城美食大特輯) */}
            <div id="food-section" className="mt-8 p-4 bg-surface-container-high rounded-3xl border border-outline-variant/10 space-y-4">
              <div className="flex items-center gap-2 mb-1">
                <Utensils className="text-secondary" size={20} />
                <h3 className="text-lg font-extrabold text-[#8a2be2]">老城美食大特輯</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Food Card 1 - 缸鴨狗 */}
                <div className="bg-surface-container-lowest border border-outline-variant/10 rounded-2xl p-4 shadow-sm flex flex-col gap-3">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary px-2 py-0.5 rounded-full">午餐精選 / 百年非遺</span>
                      <h4 className="text-base font-bold text-on-surface mt-1">百年老店「缸鴨狗」 (南塘老街店)</h4>
                    </div>
                  </div>
                  <p className="text-on-surface-variant text-sm leading-relaxed">
                    創立於1926年的中華老字號。必點招牌「桂花芝麻湯糰」（糯米香甜軟糯、黑芝麻餡油潤香濃，帶有淡淡桂花香）、「漿板圓子」以及極具特色的「鴨狗醬鴨」，是感受經典寧波傳統點心的最佳首選！
                  </p>
                  <div className="pt-2 border-t border-outline-variant/5 grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs font-medium text-on-surface-variant bg-surface-container-highest/10 p-2 rounded-xl">
                    <div className="flex items-start gap-1 col-span-1 sm:col-span-2">
                      <MapPin size={12} className="text-primary shrink-0 mt-0.5" />
                      <span><strong>地址：</strong>浙江省寧波市海曙區南塘河街 243 號 (南塘老街一期)</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={12} className="text-amber-600 shrink-0" />
                      <span><strong>營業時間：</strong>10:30 - 21:00</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Phone size={12} className="text-emerald-600 shrink-0" />
                      <span><strong>電話：</strong>0574-87118671</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => window.open('https://uri.amap.com/marker?position=121.545891,29.858912&name=缸鸭狗(南塘老街店)', '_blank')}
                    className="flex items-center justify-center gap-1.5 w-full py-2 bg-secondary/5 hover:bg-secondary/10 active:scale-95 transition-all text-secondary rounded-xl text-xs font-bold border border-secondary/10"
                  >
                    <MapIcon size={14} />
                    查看缸鴨狗導航
                  </button>
                </div>

                {/* Food Card 2 - 麥田工坊 */}
                <div className="bg-surface-container-lowest border border-outline-variant/10 rounded-2xl p-4 shadow-sm flex flex-col gap-3">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary px-2 py-0.5 rounded-full">網紅手作 / 月湖畔午後甜點</span>
                      <h4 className="text-base font-bold text-on-surface mt-1">麥田工坊 (月湖店)</h4>
                    </div>
                  </div>
                  <p className="text-on-surface-variant text-sm leading-relaxed">
                    座落在月湖畔、人氣爆棚的法式與日式手工烘焙名店。店內裝潢溫馨文藝，特別推薦招牌「芋泥奶乎乎」（細緻軟綿的現做芋泥與濃郁鮮奶油完美融合）、「芋泥冰麵包」以及外皮金黃、內裡濕潤的現烤「鹽可頌」與原味可頌。強烈推薦買幾份帶到月湖畔一邊看湖景一邊享用，文藝感十足！
                  </p>
                  <div className="pt-2 border-t border-outline-variant/5 grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs font-medium text-on-surface-variant bg-surface-container-highest/10 p-2 rounded-xl">
                    <div className="flex items-start gap-1 col-span-1 sm:col-span-2">
                      <MapPin size={12} className="text-primary shrink-0 mt-0.5" />
                      <span><strong>地址：</strong>浙江省寧波市海曙區共青路 99 號 (月湖景區旁)</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={12} className="text-amber-600 shrink-0" />
                      <span><strong>營業時間：</strong>08:30 - 21:30</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Phone size={12} className="text-emerald-600 shrink-0" />
                      <span><strong>電話：</strong>0574-83861212</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => window.open('https://uri.amap.com/marker?position=121.543512,29.868211&name=麦田工坊(月湖店)', '_blank')}
                    className="flex items-center justify-center gap-1.5 w-full py-2 bg-secondary/5 hover:bg-secondary/10 active:scale-95 transition-all text-secondary rounded-xl text-xs font-bold border border-secondary/10"
                  >
                    <MapIcon size={14} />
                    查看麥田工坊導航
                  </button>
                </div>



                {/* Food Card 3 - 固海糕團店 */}
                <div className="bg-surface-container-lowest border border-outline-variant/10 rounded-2xl p-4 shadow-sm flex flex-col gap-3">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary px-2 py-0.5 rounded-full">手工糕點 / 城隍廟經典</span>
                      <h4 className="text-base font-bold text-on-surface mt-1">手工傳統「固海糕團店」 (縣學街店)</h4>
                    </div>
                  </div>
                  <p className="text-on-surface-variant text-sm leading-relaxed">
                    城隍廟旁極具人氣的傳統手作糕點店。推薦品嚐招牌手工黑米糕、經典「龍鳳金團」（黃豆粉或椰蓉裹著軟糯外皮）、高顏值「水蜜桃團」，以及帶有淡雅草本清香的艾青團。糕團口感Q彈、甜而不膩，是極具江南風味的經典下午茶點！
                  </p>
                  <button 
                    onClick={() => window.open('https://uri.amap.com/marker?position=121.551842,29.870531&name=固海糕团店(县学街店)', '_blank')}
                    className="flex items-center justify-center gap-1.5 w-full py-2 bg-secondary/5 hover:bg-secondary/10 active:scale-95 transition-all text-secondary rounded-xl text-xs font-bold border border-secondary/10"
                  >
                    <MapIcon size={14} />
                    查看固海糕團店導航
                  </button>
                </div>

                {/* Food Card 4 - 辣哭餅 */}
                <div className="bg-surface-container-lowest border border-outline-variant/10 rounded-2xl p-4 shadow-sm flex flex-col gap-3">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary px-2 py-0.5 rounded-full">街頭小吃 / 鼓樓沿排隊王</span>
                      <h4 className="text-base font-bold text-on-surface mt-1">辣哭餅 (鼓樓沿店)</h4>
                    </div>
                  </div>
                  <p className="text-on-surface-variant text-sm leading-relaxed">
                    鼓樓歷史街區人氣第一的神級街頭小吃。金黃焦脆的現烤餅皮包裹著特製的香辣醬汁、大份鮮美鹹菜與荷包蛋，咬下一口，辣香、肉香與鹹菜的鮮美多層次爆發，好吃到「讓人一邊流淚一邊吃完」也欲罷不能！
                  </p>
                  <button 
                    onClick={() => window.open('https://uri.amap.com/marker?position=121.551815,29.879512&name=辣哭饼(鼓楼沿历史文化街区店)', '_blank')}
                    className="flex items-center justify-center gap-1.5 w-full py-2 bg-secondary/5 hover:bg-secondary/10 active:scale-95 transition-all text-secondary rounded-xl text-xs font-bold border border-secondary/10"
                  >
                    <MapIcon size={14} />
                    查看辣哭餅導航
                  </button>
                </div>
              </div>

              {/* Dinner Section Selector */}
              <div className="mt-6 pt-6 border-t border-outline-variant/15 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h4 className="text-base font-black text-on-surface flex items-center gap-1.5">
                      <Sparkles className="text-amber-500 animate-pulse" size={16} />
                      老城晚餐精選 (三選一)
                    </h4>
                    <p className="text-xs text-on-surface-variant font-medium mt-0.5">
                      天一廣場周邊極具人氣的特色甬幫菜餐館，支持一鍵切換查看詳情與導航。
                    </p>
                  </div>
                  
                  {/* Tabs Selector */}
                  <div className="flex bg-surface-container rounded-xl p-1 border border-outline-variant/10 self-start sm:self-auto shadow-sm">
                    <button
                      onClick={() => setDay2Dinner('yongshang')}
                      className={cn(
                        "px-3 py-1.5 rounded-lg text-xs font-black transition-all",
                        day2Dinner === 'yongshang' 
                          ? "bg-[#005d90] text-white shadow-sm" 
                          : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high"
                      )}
                    >
                      甬上名灶
                    </button>
                    <button
                      onClick={() => setDay2Dinner('ninghai')}
                      className={cn(
                        "px-3 py-1.5 rounded-lg text-xs font-black transition-all",
                        day2Dinner === 'ninghai' 
                          ? "bg-[#005d90] text-white shadow-sm" 
                          : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high"
                      )}
                    >
                      寧海食堂
                    </button>
                    <button
                      onClick={() => setDay2Dinner('amao')}
                      className={cn(
                        "px-3 py-1.5 rounded-lg text-xs font-black transition-all",
                        day2Dinner === 'amao' 
                          ? "bg-[#005d90] text-white shadow-sm" 
                          : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high"
                      )}
                    >
                      阿毛名灶
                    </button>
                  </div>
                </div>

                {/* Animated Display of selected Dinner option */}
                <div className="bg-surface-container-lowest border border-outline-variant/15 rounded-2xl p-5 shadow-sm space-y-4 transition-all">
                  {day2Dinner === 'yongshang' && (
                    <div className="space-y-3 transition-opacity duration-300">
                      <div className="flex flex-wrap justify-between items-start gap-2">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 px-2.5 py-1 rounded-full">
                            經典甬幫菜 / 天一廣場排隊王
                          </span>
                          <h4 className="text-lg font-black text-on-surface mt-1.5">甬上名灶 (天一店)</h4>
                        </div>
                      </div>
                      <p className="text-on-surface-variant text-sm leading-relaxed">
                        寧波最具代表性的超人氣甬幫菜館之一。餐廳以<b>高性價比、食材鮮美、口味地道</b>著稱，每日排隊人潮絡繹不絕。
                      </p>
                      <div className="bg-primary/5 rounded-xl p-3 border border-primary/10">
                        <p className="text-xs font-bold text-primary flex items-center gap-1">
                          <Sparkles size={12} /> 招牌菜必點推薦：
                        </p>
                        <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                          <b>● 招牌腐皮黃魚：</b>外層腐皮金黃酥脆，內裹鮮嫩黃魚肉，入口即化，靈魂必點。<br/>
                          <b>● 蔥油海瓜子：</b>海瓜子顆顆飽滿鮮甜，搭配濃郁蔥油香，是下飯與佐酒的神器。<br/>
                          <b>● 手撕麵結：</b>傳統老寧波手工麵結，外皮勁道、肉餡鮮美，配以清甜的高湯。<br/>
                          <b>● 紅燒雜魚：</b>精選當日小海鮮，用老底子紅燒做法，醬香濃郁，極其鮮美。
                        </p>
                      </div>
                      <div className="pt-2 border-t border-outline-variant/5 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-medium text-on-surface-variant bg-surface-container-highest/10 p-2.5 rounded-xl">
                        <div className="flex items-start gap-1.5 col-span-1 sm:col-span-2">
                          <MapPin size={13} className="text-primary shrink-0 mt-0.5" />
                          <span><strong>地址：</strong>浙江省寧波市海曙區中山東路 137 號 (天一廣場旁)</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock size={13} className="text-amber-600 shrink-0" />
                          <span><strong>營業時間：</strong>11:00 - 13:30, 17:00 - 20:30</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Phone size={13} className="text-emerald-600 shrink-0" />
                          <span><strong>電話：</strong>0574-87328777</span>
                        </div>
                      </div>
                      <button 
                        onClick={() => window.open('https://uri.amap.com/marker?position=121.554315,29.873523&name=甬上名灶', '_blank')}
                        className="flex items-center justify-center gap-1.5 w-full py-2.5 bg-[#005d90] hover:opacity-90 active:scale-95 transition-all text-white rounded-xl text-xs font-bold shadow-sm"
                      >
                        <MapIcon size={14} />
                        一鍵地圖導航直達「甬上名灶」
                      </button>
                    </div>
                  )}

                  {day2Dinner === 'ninghai' && (
                    <div className="space-y-3 transition-opacity duration-300">
                      <div className="flex flex-wrap justify-between items-start gap-2">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300 px-2.5 py-1 rounded-full">
                            海鮮甬幫菜 / 在地口碑老店
                          </span>
                          <h4 className="text-lg font-black text-on-surface mt-1.5">寧海食堂 (藥行街店)</h4>
                        </div>
                      </div>
                      <p className="text-on-surface-variant text-sm leading-relaxed">
                        以<b>直航鮮活海鮮與正宗寧海土菜</b>聞名。這家店深受寧波本地人的喜愛，食材不落地，現點現秤現做，鑊氣十足！
                      </p>
                      <div className="bg-primary/5 rounded-xl p-3 border border-primary/10">
                        <p className="text-xs font-bold text-primary flex items-center gap-1">
                          <Sparkles size={12} /> 招牌菜必點推薦：
                        </p>
                        <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                          <b>● 寧海燒土豆：</b>本地小土豆燜得綿軟入味，表皮微焦，醬香中帶著鮮甜。<br/>
                          <b>● 家常燉雜魚：</b>小黃魚、鯧魚等當季海鮮一鍋慢火精燉，鮮美的湯汁簡置是靈魂。<br/>
                          <b>● 鹽水白蝦：</b>選用野生東海白蝦，只用最簡單的鹽水做法，極致襯托蝦肉的清甜與脆嫩。<br/>
                          <b>● 油炸小黃魚：</b>外層裹上薄粉，炸得香脆可口，連骨頭都可以一起吃下去。
                        </p>
                      </div>
                      <div className="pt-2 border-t border-outline-variant/5 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-medium text-on-surface-variant bg-surface-container-highest/10 p-2.5 rounded-xl">
                        <div className="flex items-start gap-1.5 col-span-1 sm:col-span-2">
                          <MapPin size={13} className="text-primary shrink-0 mt-0.5" />
                          <span><strong>地址：</strong>浙江省寧波市海曙區藥行街 169 號 (天一廣場商圈)</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock size={13} className="text-amber-600 shrink-0" />
                          <span><strong>營業時間：</strong>11:00 - 14:00, 16:30 - 21:00</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Phone size={13} className="text-emerald-600 shrink-0" />
                          <span><strong>電話：</strong>0574-87291118</span>
                        </div>
                      </div>
                      <button 
                        onClick={() => window.open('https://uri.amap.com/marker?position=121.551842,29.870531&name=宁海食堂', '_blank')}
                        className="flex items-center justify-center gap-1.5 w-full py-2.5 bg-[#005d90] hover:opacity-90 active:scale-95 transition-all text-white rounded-xl text-xs font-bold shadow-sm"
                      >
                        <MapIcon size={14} />
                        一鍵地圖導航直達「寧海食堂」
                      </button>
                    </div>
                  )}

                  {day2Dinner === 'amao' && (
                    <div className="space-y-3 transition-opacity duration-300">
                      <div className="flex flex-wrap justify-between items-start gap-2">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300 px-2.5 py-1 rounded-full">
                            傳統老寧波味 / 精緻市井餐廳
                          </span>
                          <h4 className="text-lg font-black text-on-surface mt-1.5">阿毛名灶 (天一豪景店)</h4>
                        </div>
                      </div>
                      <p className="text-on-surface-variant text-sm leading-relaxed">
                        深耕寧波多年的老字號甬幫菜代表。餐廳裝修兼具市井煙火氣與復古風情，致力於傳承<b>「老寧波家常菜」的極致味道</b>。
                      </p>
                      <div className="bg-primary/5 rounded-xl p-3 border border-primary/10">
                        <p className="text-xs font-bold text-primary flex items-center gap-1">
                          <Sparkles size={12} /> 招牌菜必點推薦：
                        </p>
                        <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                          <b>● 阿毛招牌醬鴨：</b>老字號祕製醬汁精燉，鴨肉酥爛入味，鹹甜適中，色澤紅潤誘人。<br/>
                          <b>● 雪菜大黃魚：</b>以經典咸菜 and 新鮮大黃魚大火奶湯燉煮，湯汁雪白、魚肉細嫩、雪菜鮮鹹。<br/>
                          <b>● 紅糖麻糍：</b>現打手工麻糍，外焦裡糯，裹上滿滿的紅糖黃豆粉，是飯後絕佳甜點。<br/>
                          <b>● 老寧波三鮮湯：</b>蛋餃、肉丸、熏魚、粉絲、白菜等一鍋燉，湯清味鮮，暖胃舒心。
                        </p>
                      </div>
                      <div className="pt-2 border-t border-outline-variant/5 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-medium text-on-surface-variant bg-surface-container-highest/10 p-2.5 rounded-xl">
                        <div className="flex items-start gap-1.5 col-span-1 sm:col-span-2">
                          <MapPin size={13} className="text-primary shrink-0 mt-0.5" />
                          <span><strong>地址：</strong>浙江省寧波市海曙區中山東路 166 號 (天一豪景 2 樓)</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock size={13} className="text-amber-600 shrink-0" />
                          <span><strong>營業時間：</strong>11:00 - 14:00, 17:00 - 21:00</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Phone size={13} className="text-emerald-600 shrink-0" />
                          <span><strong>電話：</strong>0574-87116777</span>
                        </div>
                      </div>
                      <button 
                        onClick={() => window.open('https://uri.amap.com/marker?position=121.553512,29.874512&name=阿毛名灶', '_blank')}
                        className="flex items-center justify-center gap-1.5 w-full py-2.5 bg-[#005d90] hover:opacity-90 active:scale-95 transition-all text-white rounded-xl text-xs font-bold shadow-sm"
                      >
                        <MapIcon size={14} />
                        一鍵地圖導航直達「阿毛名灶」
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Day 3 */}
        {activeDay === 2 && (
          <>
            <section className="mb-8 mt-2">
              <span className="text-[10px] bg-primary/10 text-primary px-3 py-1 rounded-full font-bold uppercase tracking-wider">湖畔風光、藝術與度假體驗</span>
              <h2 className="text-[#005d90] text-3xl font-extrabold tracking-tighter mt-2 mb-4 px-2">7/30 第三天：東錢湖畔風光與韓嶺老街文藝漫遊</h2>
              <button 
                onClick={() => navigate('/')}
                className="w-full py-4 bg-primary text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-md hover:opacity-90 active:scale-95 transition-all"
              >
                <Home size={20} />
                返回主面板
              </button>
            </section>

            <div className="space-y-6 relative">
              <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-surface-variant/40"></div>

              <TimelineItem 
                type="transport"
                time="10:00 - 11:00" 
                title="漫心府 ➔ 花間堂韓嶺 (東錢湖) 交通指引 (打車直達)" 
                description={(
                  <div className="space-y-2.5">
                    <p>從老城核心「漫心府 (城隍廟)」前往東錢湖畔的「花間堂·韓嶺」度假酒店，路程約 20 公里。<b>由於攜帶行李且跨越市區與度假區，強烈建議直接打車/呼叫網約車前往，打車就好！</b></p>
                    
                    <div className="bg-primary/5 rounded-xl p-4 border border-primary/10 space-y-3 text-xs text-on-surface">
                      <div className="flex justify-between items-center pb-1.5 border-b border-primary/10">
                        <span className="font-extrabold text-[#005d90] flex items-center gap-1.5">
                          <Car size={14} className="text-primary" /> 推薦方式：網約車 / 計程車直達
                        </span>
                        <span className="bg-[#005d90] text-white px-2 py-0.5 rounded text-[10px] font-black">約 ¥50-60 | 35-40分鐘</span>
                      </div>
                      <div className="space-y-1.5">
                        <p><b>● 車程時間：</b>約 35 - 40 分鐘（視路況而定）。</p>
                        <p><b>● 乘車建議：</b>直接在漫心府酒店大廳或大門口，使用高德地圖、滴滴出行或美團叫車，目的地設置為「寧波花間堂·韓嶺酒店」。</p>
                        <p><b>● 優勢：</b>無需經歷地鐵與公車的擁擠與繁瑣轉乘，一站直達，最為省心、舒適，攜帶行李時的完美選擇！</p>
                      </div>
                    </div>
                  </div>
                )}
                actionIcon={Navigation}
                actionLabel="查看東錢湖及韓嶺地圖"
                onClickAction={() => window.open('https://uri.amap.com/marker?position=121.662142,29.754121&name=韩岭老街', '_blank')}
              />

              <TimelineItem 
                time="11:00 - 12:30" 
                title="參觀「南宋石刻公園」" 
                description="漫步於林木蔥郁的石刻公園，欣賞南宋時期規模宏大、雕刻無比精湛的石雕群。了解南宋顯赫家族的墓葬規制與石刻藝術，感受浙東豐厚而深邃的歷史文化底蘊。"
                address="浙江省寧波市東錢湖旅遊度假區東錢湖畔"
                hours="08:30 - 17:00"
                phone="0574-88371300"
                actionIcon={Camera}
                actionLabel="查看南宋石刻公園導航"
                onClickAction={() => window.open('https://uri.amap.com/marker?position=121.684121,29.754321&name=南宋石刻公园', '_blank')}
              />

              <TimelineItem 
                time="12:30 - 14:00" 
                title="湖畔精選午餐：錢湖漁港 or 特色湖鮮" 
                description="中午在東錢湖畔的知名餐館（如柏悅酒店·錢湖漁港）品嚐極具地方特色的「東錢湖砂鍋魚頭」、「醬爆螺螄」及「錢湖朋魚」，享受湖鮮在舌尖綻放的無比鮮甜。"
                address="浙江省寧波市東錢湖旅遊度假區大堰路 188 號寧波柏悅酒店內"
                hours="11:30 - 14:00, 17:30 - 21:00"
                phone="0574-28881234"
                actionIcon={Utensils}
                actionLabel="查看錢湖漁港導航"
                onClickAction={() => window.open('https://uri.amap.com/marker?position=121.661211,29.771234&name=钱湖渔港', '_blank')}
              />

              <TimelineItem 
                time="14:00 - 15:30" 
                title="參觀「東錢湖教育論壇/寧波院士中心」" 
                description="參觀由普利茲克建築獎大師隈研吾設計的傑作──寧波院士中心。建築巧妙利用木結構與周邊青翠茶山相得益彰，站在院士中心觀景平台，可180度俯瞰浩瀚煙波的東錢湖，是必打卡的高顏值地標。"
                address="浙江省寧波市東錢湖旅遊度假區陶公山"
                hours="09:00 - 17:00 (公共區域全天)"
                phone="0574-88371000"
                actionIcon={Camera}
                actionLabel="查看院士中心導航"
                onClickAction={() => window.open('https://uri.amap.com/marker?position=121.649512,29.782114&name=宁波院士中心', '_blank')}
              />

              <TimelineItem 
                time="15:30 - 18:30" 
                title="漫遊「韓嶺老街」 & 藝術美術館" 
                description="隨後前往極富水鄉文藝氣息的百年古街「韓嶺老街」。這裡保留了粉牆黛瓦的江南民居風貌，小橋流水貫穿其中。特別推薦您入內參觀由大師隈研吾設計的「韓嶺美術館」（如開放），漫步於時尚文創市集、精緻手作店與網紅茶鋪，品味傳統與當代藝術完美碰撞的優雅氣息。"
                address="浙江省寧波市東錢湖旅遊度假區韓嶺村"
                hours="古村全天開放 (韓嶺美術館通常 09:30 - 16:30，週一閉館)"
                phone="0574-88127000"
                actionIcon={Compass}
                actionLabel="查看韓嶺老街導航"
                onClickAction={() => window.open('https://uri.amap.com/marker?position=121.662142,29.754121&name=韩岭老街', '_blank')}
              />

              <TimelineItem 
                time="18:30 - 20:30" 
                title="老街晚餐：韓嶺精緻浙東風味" 
                description="在韓嶺老街挑選一家精緻的浙東餐館，品嚐地道湖鮮與寧波家常風味。一邊欣賞古村夜色，一邊享受溫馨怡人的晚餐時光。"
                address="浙江省寧波市東錢湖旅遊度假區韓嶺老街"
                hours="11:00 - 21:00"
                actionIcon={Utensils}
                actionLabel="尋找老街美食"
                onClickAction={() => window.open('https://uri.amap.com/search?keyword=美食&center=121.662142,29.754121', '_blank')}
              />

              <TimelineItem 
                type="accommodation"
                time="20:30" 
                title="入住：寧波花間堂·韓嶺酒店 (Hanjiantang)" 
                description="抵達花間堂辦理入住，享受極具江南韻味的庭院式客房。溫馨、優雅的住宿環境讓您在東錢湖畔享受靜謐舒適的夜晚。"
                address="浙江省寧波市東錢湖旅遊度假區韓嶺村"
                hours="24 小時營業"
                phone="0574-88127777"
                actionIcon={MapIcon}
                actionLabel="查看酒店地圖位置"
                onClickAction={() => window.open('https://uri.amap.com/marker?position=121.662142,29.754121&name=宁波花间堂韩岭酒店', '_blank')}
              />
            </div>
          </>
        )}

        {/* Day 4 */}
        {activeDay === 3 && (
          <>
            <section className="mb-8 mt-2">
              <span className="text-[10px] bg-primary/10 text-primary px-3 py-1 rounded-full font-bold uppercase tracking-wider">湖畔單車環遊 & 阪急奢華購物</span>
              <h2 className="text-[#005d90] text-3xl font-extrabold tracking-tighter mt-2 mb-4 px-2">7/31 第四天：東錢湖單車騎行、漫遊阪急與入住英迪格</h2>
              <button 
                onClick={() => navigate('/')}
                className="w-full py-4 bg-primary text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-md hover:opacity-90 active:scale-95 transition-all"
              >
                <Home size={20} />
                返回主面板
              </button>
            </section>

            <div className="space-y-6 relative">
              <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-surface-variant/40"></div>

              <TimelineItem 
                time="09:00 - 12:00" 
                title="晨間活力：東錢湖綠道單車騎行環遊" 
                description="早晨租用一輛公共自行車 or 專業單車，沿著平坦秀美的東錢湖環湖綠道騎行。微風拂面、湖光瀲灩，沿途欣賞十里四香、小普陀等經典湖景，在運動與自然山水中釋放活力。"
                address="浙江省寧波市東錢湖環湖東路"
                hours="全天開放"
                actionIcon={Bike}
                actionLabel="查看綠道騎行指引"
                onClickAction={() => window.open('https://uri.amap.com/search?keyword=自行车租赁&center=121.662142,29.754121', '_blank')}
              />

              <TimelineItem 
                time="12:00 - 13:30" 
                title="午餐：特色湖鮮料理或韓嶺精緻午宴" 
                description="結束充實的騎行後，在湖畔餐廳享用一頓豐盛午餐。品嚐東錢湖三寶（湖蝦、青魚、螺螄），品味舌尖上的天然甘甜與水鄉鑊氣。"
                address="浙江省寧波市東錢湖旅遊度假區韓嶺老街或湖畔餐廳"
                hours="11:00 - 14:00"
                actionIcon={Utensils}
                actionLabel="尋找湖畔美食"
                onClickAction={() => window.open('https://uri.amap.com/search?keyword=美食&center=121.662142,29.754121', '_blank')}
              />

              <TimelineItem 
                type="transport"
                time="13:30 - 14:15" 
                title="東錢湖 ➔ 寧波東部新城 (打車直達)" 
                description="告別美麗的東錢湖，直接呼叫網約車 or 計程車前往寧波最具活力的現代都市核心區──東部新城。車程約 15 公里，大約 25-30 分鐘，輕鬆免去轉乘繁瑣。"
                actionIcon={Navigation}
                actionLabel="導航至寧波阪急"
                onClickAction={() => window.open('https://uri.amap.com/marker?position=121.624512,29.864512&name=宁波阪急', '_blank')}
              />

              <TimelineItem 
                time="14:15 - 18:30" 
                title="極致奢華：寧波阪急百貨 (Ningbo Hankyu) 時尚探索" 
                description={(
                  <div className="space-y-2 text-sm text-on-surface-variant leading-relaxed">
                    <p>下午開啟<b>寧波阪急百貨 (Hankyu)</b> 奢華體驗。這是日本阪急在中國大陸的首家旗艦項目，匯聚了全球頂奢品牌、潮流時尚與最地道的日式生活美學。</p>
                    <p>漫步在極具震撼感的現代空間中，逛一逛精緻的國際美妝、潮牌與奢品概念店。特別推薦前往<b>B1層的日式超級食品街</b>，這裡有正宗的宇治抹茶甜品、精緻和菓子、日式手作烘焙與各式各樣空運鮮活美食，讓您足不出戶感受極致日系風味與頂奢時尚氣息。</p>
                  </div>
                )}
                address="浙江省寧波市鄞州區海晏北路 189 號 (地鐵 1 號線/5 號線海晏北路站直達)"
                hours="10:00 - 22:00"
                phone="0574-89018888"
                actionIcon={ShoppingBag}
                actionLabel="查看寧波阪急位置"
                onClickAction={() => window.open('https://uri.amap.com/marker?position=121.624512,29.864512&name=宁波阪急', '_blank')}
              />

              <TimelineItem 
                time="18:30 - 20:30" 
                title="晚餐：阪急精緻美饌 or 新城頂級日式料理" 
                description="晚餐就在阪急百貨內挑選一家極受歡迎的口碑名店（如高端日式燒肉、精緻粵式點心或西式現代餐酒館），在時尚與精緻中享受極具儀式感的舌尖盛宴。"
                address="寧波阪急百貨 4F-5F 餐飲區"
                hours="10:00 - 22:00"
                actionIcon={Utensils}
                actionLabel="查看阪急餐飲指南"
                onClickAction={() => window.open('https://uri.amap.com/search?keyword=美食&center=121.624512,29.864512', '_blank')}
              />

              <TimelineItem 
                type="accommodation"
                time="20:45" 
                title="入住：寧波英迪格酒店 (Hotel Indigo Ningbo)" 
                description={(
                  <div className="space-y-3">
                    <p>結束今日充實的奢華漫遊，乘車或步行5分鐘即可輕鬆抵達位於東部新城核心的精品設計酒店──<b>「寧波英迪格酒店 (Hotel Indigo Ningbo)」</b>辦理入住：</p>
                    
                    {/* Booking Card */}
                    <div className="bg-primary/5 rounded-xl p-3.5 border border-primary/10 space-y-2 text-xs text-on-surface">
                      <div className="flex justify-between items-center pb-1.5 border-b border-primary/10">
                        <span className="font-extrabold text-[#005d90] flex items-center gap-1">
                          <Hotel size={13} /> 攜程預訂確認 · 精品雙床房
                        </span>
                        <span className="bg-[#2e7d32] text-white px-2 py-0.5 rounded text-[10px] font-black">已支付 ¥888 (線上付)</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-1.5 gap-x-4">
                        <p><span className="font-bold text-primary">● 入住日期：</span>2026年7月31日 (五) 15:00後</p>
                        <p><span className="font-bold text-primary">● 退房日期：</span>2026年8月1日 (六) 12:00前</p>
                        <p><span className="font-bold text-primary">● 入住旅客：</span>陳瓊花 (Chen Qionghua)</p>
                        <p><span className="font-bold text-primary">● 客房類型：</span>精品房 1間 1晚 (2張1.35米雙人床)</p>
                        <p className="col-span-1 sm:col-span-2"><span className="font-bold text-primary">● 餐食安排：</span>8月1日提供雙人自助早餐 (2份/間)</p>
                      </div>
                    </div>

                    {/* Perks Card */}
                    <div className="bg-[#fff3e0] rounded-xl p-3.5 border border-[#ffe0b2] space-y-1.5 text-xs text-[#5d4037]">
                      <p className="font-extrabold text-[#ef6c00] flex items-center gap-1 pb-1 border-b border-[#ffe0b2]">
                        <Sparkles size={13} /> 尊享「鄰聚」特惠套餐禮遇：
                      </p>
                      <p className="flex items-start gap-1">
                        <span className="text-[#ef6c00] mt-0.5">✔</span>
                        <span><b>Neighbor Night 鄰聚：</b>含 1 份小食套餐及酒水暢飲，享受愜意放鬆的微醺時光。</span>
                      </p>
                      <p className="flex items-start gap-1">
                        <span className="text-[#ef6c00] mt-0.5">✔</span>
                        <span><b>精選迎賓水果：</b>入住尊享 1 份精美迎賓水果。</span>
                      </p>
                      <p className="flex items-start gap-1">
                        <span className="text-[#ef6c00] mt-0.5">✔</span>
                        <span><b>房內迷你吧：</b>首晚客房內 mini bar 飲品與零食免費享用 1 份。</span>
                      </p>
                      <p className="flex items-start gap-1">
                        <span className="text-[#ef6c00] mt-0.5">✔</span>
                        <span><b>開啟「財富寶箱」：</b>特惠贈送趣味「財富寶箱」探秘體驗 1 份。</span>
                      </p>
                    </div>

                    <p className="text-[11px] text-on-surface-variant leading-tight">
                      <b>地址：</b>浙江省寧波市鄞州區寧東路 545 號 | <b>電話：</b>0574-28806666
                    </p>
                  </div>
                )}
                actionIcon={MapIcon}
                actionLabel="查看酒店地圖位置"
                onClickAction={() => window.open('https://uri.amap.com/marker?position=121.625345,29.863112&name=宁波英迪格酒店', '_blank')}
              />
            </div>
          </>
        )}

        {/* Day 5 */}
        {activeDay === 4 && (
          <>
            <section className="mb-8 mt-2">
              <span className="text-[10px] bg-primary/10 text-primary px-3 py-1 rounded-full font-bold uppercase tracking-wider">在地市井與特產採購</span>
              <h2 className="text-[#005d90] text-3xl font-extrabold tracking-tighter mt-2 mb-4 px-2">8/01 第五天：走進市井煙火、採購在地特產與愉快返程</h2>
              <button 
                onClick={() => navigate('/')}
                className="w-full py-4 bg-primary text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-md hover:opacity-90 active:scale-95 transition-all"
              >
                <Home size={20} />
                返回主面板
              </button>
            </section>

            <div className="space-y-6 relative">
              <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-surface-variant/40"></div>

              <TimelineItem 
                type="food"
                time="08:00 - 09:15" 
                title="享用「寧波英迪格」精緻自助早餐 & 辦理退房" 
                description="在英迪格酒店享用融入地方鄰里特色的手工早餐（如現做湯糰、醬油餛飩），隨後辦理退房手續，將行李妥善安置於預約的專車中，開啟極富老明州市井煙火氣的半日悠閒探索。"
              />

              <TimelineItem 
                time="09:15 - 10:45" 
                title="老寧波的熱情與鮮美：漫遊「阿拉好菜場」" 
                description="「阿拉好菜場」是寧波極具口碑的高規格精品農貿市場，更是觀察東海海鮮、感受市井美學的首選地。在這裡您能親眼見到琳琅滿目的活鮮（如帶魚、梭子蟹、淡菜），亦可在此自費品嚐最道地的炸油條、生煎包、粢飯糕等傳統早點點心，飽覽最原汁原味的百姓生活風景。"
                address="浙江省寧波市鄞州區精品社區菜市場"
                hours="06:00 - 18:30"
                actionIcon={Compass}
                actionLabel="導航至阿拉好菜場"
                onClickAction={() => window.open('https://uri.amap.com/search?keyword=菜市场&center=121.625345,29.863112', '_blank')}
              />

              <TimelineItem 
                time="10:45 - 12:15" 
                title="在地手信大採購：首選「三江購物（華駿中心店）」" 
                description="前往寧波零售巨頭「三江購物（華駿中心店）」，這是明州最資深、最具情懷的連鎖超市。此店商品品類極其豐富、價格親民，是您一站式淘手信的絕佳去處！您可以安心選購到正宗「寧波手打年糕」、優質「黑芝麻湯糰」、古法釀造的黃酒/老酒、海蜇、苔條餅等寧波特色特產，把明州最鮮美的滋味打包帶回家。"
                address="浙江省寧波市鄞州區滄海路1936號（華駿中心一樓）"
                hours="08:00 - 21:30"
                actionIcon={ShoppingBag}
                actionLabel="導航至三江購物華駿店"
                onClickAction={() => window.open('https://uri.amap.com/marker?position=121.597652,29.864312&name=三江购物华骏中心店', '_blank')}
              />

              <TimelineItem 
                type="food"
                time="12:15 - 13:30" 
                title="老味道午餐：品嚐鮮美熱騰的「寧波海鮮麵」" 
                description="在菜場或華駿中心周邊享用一碗湯頭無比鮮美、現煮熱騰的寧波海鮮麵（自選配料如黃魚、蛤蜊、肉絲、雪菜），鮮甜可口，為整趟精彩的五天行程畫上極致圓滿的休止符。"
                address="華駿中心及菜場周邊人氣海鮮麵館"
                hours="10:30 - 21:00"
                actionIcon={Utensils}
                actionLabel="尋找周邊特色美食"
                onClickAction={() => window.open('https://uri.amap.com/search?keyword=海鲜面&center=121.597652,29.864312', '_blank')}
              />

              <TimelineItem 
                type="transport"
                time="13:30 - 14:30" 
                title="專車送往寧波櫟社國際機場 / 寧波高鐵站" 
                description="司機在約定地點接駁您，搭乘專車前往機場或高鐵站，約 25-30 分鐘車程。沿途可再次回顧東部新城、江東區與鄞州新城的璀璨街景。"
                actionIcon={Navigation}
                actionLabel="查看交通樞紐導航"
                onClickAction={() => window.open('https://uri.amap.com/marker?position=121.461234,29.821123&name=宁波栎社机场', '_blank')}
              />

              <TimelineItem 
                type="transport"
                time="15:00" 
                title="辦理乘機 / 進站，平安歡喜返回溫馨家園" 
                description="辦理好行李託運或車票檢票手續，踏上歸途。帶著大包小包裝滿特產的名產與美好回憶，平安返回溫馨舒適的家，期待下一次的精彩相聚！"
                badge="返程平安"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
