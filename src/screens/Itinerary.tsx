import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Compass, MapPin, Calendar, Clock, Phone, AlertCircle, Sparkles, Navigation, 
  MapIcon, Utensils, Hotel, ArrowLeft, ArrowRight, Share2, Printer, Check, Info,
  ChevronRight, ExternalLink, Moon, Sun, Cloud, Train, MessageSquare, Compass as CompassIcon,
  ShoppingBag, Camera, Home, ArrowRightLeft, BookOpen, Coffee, Flame, Car, Bike, ShieldAlert
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
                <span><strong className="text-on-surface">地點：</strong>{address}</span>
              </div>
            )}
            {hours && (
              <div className="flex items-center gap-1.5">
                <Clock size={13} className="text-amber-600 shrink-0" />
                <span><strong className="text-on-surface">開放/營運：</strong>{hours}</span>
              </div>
            )}
            {phone && (
              <div className="flex items-center gap-1.5">
                <Phone size={13} className="text-emerald-600 shrink-0" />
                <span><strong className="text-on-surface">聯絡：</strong>{phone}</span>
              </div>
            )}
          </div>
        )}

        {actionLabel && onClickAction && (
          <button 
            onClick={onClickAction}
            className="inline-flex items-center gap-2 text-xs font-bold text-primary bg-primary/10 hover:bg-primary/20 px-3.5 py-2 rounded-xl transition-all active:scale-95"
          >
            {ActionIcon && <ActionIcon size={14} />}
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
};

export function Itinerary() {
  const navigate = useNavigate();
  const [selectedDay, setSelectedDay] = useState<number>(0); // 0-indexed (Day 1 = index 0)
  const [selectedRegionFilter, setSelectedRegionFilter] = useState<'all' | 'italy' | 'croatia'>('all');

  // Days list definition for 27 days
  const daysData = [
    // Day 1: 9/27
    {
      date: '09/27 (日)',
      dayNum: 1,
      title: '第一批啟程：台北 (TPE T2) ✈ 米蘭 (MXP T1)',
      region: 'italy',
      subtitle: '長榮航空 BR95 直飛米蘭 (第一批成員：小許、春香、麗安)',
      highlights: ['第一批 3 人啟程', '長榮航空 BR95 直飛', '米蘭馬爾彭薩 MXP 抵達'],
      timeline: [
        {
          time: '23:45',
          type: 'transport' as const,
          title: '桃園國際機場 (TPE T2) 啟程登機',
          badge: '第一批 (小許、春香、麗安)',
          description: '第一批成員搭乘長榮航空 BR95（23:45 起飛，訂位代號: FRJML3）。提前 3 小時（約 20:45 前）抵達桃園第二航廈辦理行李託運（每人 2 件免費託運 23kg）、安檢與通關。',
          address: '桃園市大園區航站南路9號 (第二航廈)'
        },
        {
          time: '次日 07:35',
          type: 'transport' as const,
          title: '抵達米蘭馬爾彭薩機場 (MXP T1)',
          badge: '入境通關 & 機場快線',
          description: '順利抵達米蘭第一航廈，通過申根入境海關並提取行李。搭乘 Malpensa Express 機場直達快線 (約 50 分鐘) 直達米蘭中央車站 (Milano Centrale)。',
          actionLabel: '查看長榮航班機票詳情',
          onClickAction: () => navigate('/flights/BR95')
        },
        {
          time: '12:00',
          type: 'accommodation' as const,
          title: '入住 / 寄放行李：米蘭精選旅宿',
          badge: '寄放行李 / Check-in',
          description: '前往旅宿寄放行李，稍微整頓後開始漫步米蘭主教座堂大廣場與艾曼紐二世迴廊。',
          address: 'Milano, Italy'
        }
      ]
    },
    // Day 2: 9/28
    {
      date: '09/28 (一)',
      dayNum: 2,
      title: '羅馬：永恆之城與千古競技場',
      region: 'italy',
      subtitle: '探訪古羅馬競技場、萬神殿與特萊維許願池',
      highlights: ['羅馬競技場 Colosseum', '萬神殿 Pantheon', '特萊維許願池 Trevi Fountain'],
      timeline: [
        {
          time: '09:00',
          type: 'activity' as const,
          title: '古羅馬競技場 (Colosseum) & 古羅馬廣場',
          badge: '已預約門票',
          description: '參觀世界七大奇景之一的古羅馬競技場與地下角鬥士通道，隨後漫步於帝國廣場遺跡與帕拉蒂諾山丘。',
          address: 'Piazza del Colosseo, 1, 00184 Roma RM, Italy',
          hours: '08:30 - 19:15',
          actionLabel: '地圖導航',
          onClickAction: () => window.open('https://maps.google.com/?q=Colosseum+Rome', '_blank')
        },
        {
          time: '12:30',
          type: 'food' as const,
          title: '午餐：Armando al Pantheon 經典羅馬培根蛋汁麵',
          badge: '羅馬地道美食',
          description: '享用正宗羅馬 Carbonara（培根蛋汁粗麵）與 Cacio e Pepe（黑胡椒起司麵），搭配奇揚地紅酒。',
          address: 'Salita dei Crescenzi, 31, 00186 Roma RM, Italy'
        },
        {
          time: '15:00',
          type: 'activity' as const,
          title: '萬神殿 (Pantheon) & 特萊維許願池 (Trevi Fountain)',
          badge: '地標景點',
          description: '驚嘆於萬神殿千古未倒的無筋混凝土圓頂與頂部採光圓孔；隨後前往特萊維許願池投擲硬幣，許下再次重返羅馬的誓言。',
          address: 'Piazza della Rotonda, 00186 Roma RM, Italy'
        },
        {
          time: '17:30',
          type: 'food' as const,
          title: 'Giolitti 百年義式冰淇淋 Gelato 享用',
          badge: '經典 Gelato',
          description: '羅馬最古老、最著名的冰淇淋店，推薦開心果 (Pistachio) 與榛果 (Nocciola) 口味！'
        }
      ]
    },
    // Day 3: 9/29
    {
      date: '09/29 (二)',
      dayNum: 3,
      title: '梵蒂岡：聖彼得大教堂與西斯汀禮拜堂',
      region: 'italy',
      subtitle: '朝聖天主教聖地與米開朗基羅《創世紀》絕世壁畫',
      highlights: ['梵蒂岡美術館', '西斯汀禮拜堂', '聖彼得大教堂登頂'],
      timeline: [
        {
          time: '08:30',
          type: 'activity' as const,
          title: '梵蒂岡美術館 (Vatican Museums) & 西斯汀禮拜堂',
          badge: '快速通關門票',
          description: '欣賞拉斐爾畫室《雅典學院》與米開朗基羅在西斯汀禮拜堂天花板繪製的《創世紀》與《最後的審判》。',
          address: 'Viale Vaticano, 00165 Roma, Vatican City',
          actionLabel: '地圖導航',
          onClickAction: () => window.open('https://maps.google.com/?q=Vatican+Museums', '_blank')
        },
        {
          time: '13:00',
          type: 'food' as const,
          title: '午餐：Alice Pizza 梵蒂岡切片披薩',
          badge: '平民美味',
          description: '秤重切片地道義式披薩，外皮酥脆、餡料香濃多元。'
        },
        {
          time: '14:30',
          type: 'activity' as const,
          title: '聖彼得大教堂 (St. Peter\'s Basilica) 登頂俯瞰廣場',
          badge: '世界最大教堂',
          description: '登上穹頂俯瞰梵蒂岡與羅馬全景鑰匙形廣場，參觀教堂內米開朗基羅名作《聖母憐子》。',
          address: 'Piazza San Pietro, 00120 Città del Vaticano'
        }
      ]
    },
    // Day 4: 9/30
    {
      date: '09/30 (三)',
      dayNum: 4,
      title: '羅馬 🚄 佛羅倫斯：文藝復興之都',
      region: 'italy',
      subtitle: '搭乘意鐵 Frecciarossa 高鐵抵達佛羅倫斯，品嚐丁骨大牛排',
      highlights: ['聖母百花大教堂', '烏菲茲美術館', 'Trattoria ZàZà 丁骨牛排'],
      timeline: [
        {
          time: '09:15',
          type: 'transport' as const,
          title: '意鐵 Frecciarossa 高鐵 (Roma Termini 🚄 Firenze S.M.N.)',
          badge: '高鐵 1.5小時',
          description: '搭乘義大利國鐵高鐵，輕鬆高速前往文藝復興誕生地佛羅倫斯 (Firenze)。',
          actionLabel: '查看意鐵車次',
          onClickAction: () => window.open('https://www.trenitalia.com', '_blank')
        },
        {
          time: '11:30',
          type: 'activity' as const,
          title: '聖母百花大教堂 (Duomo di Milano / Firenze)',
          badge: '佛羅倫斯地標',
          description: '欣賞布魯內萊斯基建造的大圓頂，紅磚與綠白大理石外牆在陽光下熠熠生輝。',
          address: 'Piazza del Duomo, 50122 Firenze FI, Italy'
        },
        {
          time: '18:30',
          type: 'food' as const,
          title: '晚餐：Trattoria Zà Zà 1.2kg 經典佛羅倫斯丁骨大牛排 (Bistecca alla Fiorentina)',
          badge: '頂級必吃',
          description: '炭火慢烤外酥內嫩的托斯卡尼丁骨大牛排，搭配橄欖油蔬菜與奇揚地紅酒。',
          address: 'Piazza del Mercato Centrale, 26r, 50123 Firenze FI, Italy'
        }
      ]
    },
    // Day 5: 10/01
    {
      date: '10/01 (四)',
      dayNum: 5,
      title: '佛羅倫斯：托斯卡尼莊園與西恩納古城',
      region: 'italy',
      subtitle: '漫遊西恩納扇形廣場與聖吉米尼亞諾酒莊品酒',
      highlights: ['西恩納 Siena', '聖吉米尼亞諾 San Gimignano', 'Chianti 酒莊品酒'],
      timeline: [
        {
          time: '09:00',
          type: 'activity' as const,
          title: '西恩納 (Siena) 中世紀古城與扇形康波廣場 (Piazza del Campo)',
          badge: 'UNESCO 世界遺產',
          description: '漫步於這座保留完美中世紀風貌的紅磚小鎮，欣賞主教座堂與歡喜噴泉。',
          address: 'Piazza del Campo, 53100 Siena SI, Italy'
        },
        {
          time: '13:00',
          type: 'food' as const,
          title: 'Chianti 托斯卡尼有機酒莊午餐與品酒體驗',
          badge: '葡萄酒之旅',
          description: '在綿延的葡萄園與橄欖樹丘陵間，品嚐莊園現作義大利麵與 DOCG 級紅酒。'
        },
        {
          time: '16:00',
          type: 'activity' as const,
          title: '塔樓之城 聖吉米尼亞諾 (San Gimignano)',
          badge: '千塔之城',
          description: '登上古老石塔俯瞰綠色丘陵，並品嚐連續多年榮獲世界冠軍的 Gelateria Dondoli 冰淇淋。'
        }
      ]
    },
    // Day 6: 10/02
    {
      date: '10/02 (五)',
      dayNum: 6,
      title: '佛羅倫斯 🚄 威尼斯：水都水上傳奇',
      region: 'italy',
      subtitle: '進入浪漫水都威尼斯，搭乘貢多拉穿梭運河巷弄',
      highlights: ['聖馬可廣場', '總督宮', '貢多拉 Gondola 搖槳'],
      timeline: [
        {
          time: '10:00',
          type: 'transport' as const,
          title: '意鐵高鐵前往威尼斯 (Firenze S.M.N. 🚄 Venezia S. Lucia)',
          badge: '車程 2.2小時',
          description: '火車直接駛入跨海大橋抵達威尼斯聖路西亞車站，踏出車站即見蔚藍大運河！'
        },
        {
          time: '14:00',
          type: 'activity' as const,
          title: '聖馬可廣場 (Piazza San Marco) & 總督宮 (Doge\'s Palace)',
          badge: '威尼斯核心',
          description: '參觀拜占庭風格的聖馬可大教堂、歎息橋 (Bridge of Sighs) 與壯麗總督宮。',
          address: 'Piazza San Marco, 1, 30124 Venezia VE, Italy'
        },
        {
          time: '17:00',
          type: 'activity' as const,
          title: '威尼斯經典貢多拉 (Gondola) 水上遊船',
          badge: '浪漫遊船',
          description: '船夫身穿條紋衫、唱著義大利民謠，帶領穿梭於古老水巷與石橋之間。'
        }
      ]
    },
    // Day 7: 10/03
    {
      date: '10/03 (六)',
      dayNum: 7,
      title: '威尼斯：彩色島 (Burano) 與玻璃島 (Murano)',
      region: 'italy',
      subtitle: '搭乘水上巴士 Vaporetto 探索夢幻繽紛彩色小屋與水上玻璃工藝',
      highlights: ['彩色島 Burano', '玻璃島 Murano', '墨魚汁麵晚餐'],
      timeline: [
        {
          time: '09:30',
          type: 'transport' as const,
          title: '搭乘水上巴士 Vaporetto 12號線前往彩色島 (Burano)',
          badge: '水上巴士一日券',
          description: '從 Fondamente Nove 碼頭出發，航行於威尼斯潟湖之上，前往夢幻彩色島。'
        },
        {
          time: '11:00',
          type: 'activity' as const,
          title: '彩色島 (Burano) 童話色塊巷弄漫步',
          badge: '攝影天堂',
          description: '每棟房子塗著明亮活潑色彩，河道兩旁停泊著小船，手工蕾絲織品極具特色。'
        },
        {
          time: '18:30',
          type: 'food' as const,
          title: '晚餐：Trattoria Al Gatto Nero 經典威尼斯墨魚汁義大利麵',
          badge: '海鮮饗宴',
          description: '品嚐新鮮墨魚醬汁搭配彈牙海鮮麵與炭烤海鮮拼盤。'
        }
      ]
    },
    // Day 8: 10/04
    {
      date: '10/04 (日)',
      dayNum: 8,
      title: '跨越國境：威尼斯/的里雅斯特 🚘 克羅埃西亞 羅維尼 (Rovinj)',
      region: 'croatia',
      subtitle: '取車展開跨國自駕，跨越斯洛維尼亞邊境進入伊斯特拉半島',
      highlights: ['跨國自駕綠卡', '斯洛維尼亞 Vignette 通行證', '羅維尼 Rovinj 懸崖夕陽'],
      timeline: [
        {
          time: '09:00',
          type: 'transport' as const,
          title: '取車自駕 (Sixt/Hertz) & 準備跨國文件',
          badge: '自駕開啟',
          description: '確認國際駕照、護照正本、租車合約包含「Cross Border Green Card 跨過綠卡保險」，並購買斯洛維尼亞公路電子 Vignette。',
          actionLabel: '查看租車須知',
          onClickAction: () => window.open('https://www.dars.si/vignette', '_blank')
        },
        {
          time: '14:30',
          type: 'transport' as const,
          title: '抵達克羅埃西亞 羅維尼 (Rovinj)',
          badge: '進入克羅埃西亞 🇭🇷',
          description: '進入亞德里亞海最浪漫的懸崖小鎮羅維尼，舊城區矗立在圓形半島上，充滿威尼斯文藝復興餘韻。'
        },
        {
          time: '18:00',
          type: 'accommodation' as const,
          title: '入住 Grand Park Hotel Rovinj 五星懸崖海景酒店',
          badge: '亞德里亞奢華飯店',
          description: '房內可直接飽覽羅維尼老城與聖歐菲米亞教堂的天際線落日。',
          address: 'Smaregliina ul. 1A, 52210, Rovinj, Croatia'
        }
      ]
    },
    // Day 9: 10/05
    {
      date: '10/05 (一)',
      dayNum: 9,
      title: '羅維尼：伊斯特拉半島陽光與海岸落日',
      region: 'croatia',
      subtitle: '漫步老城光滑石板路、聖歐菲米亞大教堂 (★ 第二批：小花與頭家娘 今日自高雄啟程)',
      highlights: ['聖歐菲米亞大教堂', 'Valentino 懸崖酒吧', '第二批 (小花/頭家娘) 高雄出發'],
      timeline: [
        {
          time: '10:00',
          type: 'activity' as const,
          title: '羅維尼老城石板巷弄 & 聖歐菲米亞大教堂 (St. Euphemia)',
          badge: '俯瞰亞德里亞海',
          description: '登上帝國時代留下的60公尺高鐘樓，俯瞰紅屋頂與蔚藍亞德里亞海島嶼群。',
          address: 'Grisisia ul., 52210, Rovinj, Croatia'
        },
        {
          time: '13:40',
          type: 'transport' as const,
          title: '【第二批啟程】小花與頭家娘 高雄小港 ✈ 香港 ✈ 杜哈 (CX423 / QR817)',
          badge: '第二批出發 (訂位: DFDT27 / 9BS2DV)',
          description: '第二批成員（頭家娘、小花）13:40 從高雄小港機場航廈 I 搭乘國泰航空 CX423 飛抵香港 (15:25)，接續 19:40 卡達航空 QR817 直飛杜哈轉機，前往克羅埃西亞會合！',
          actionLabel: '查看第二批聯程機票詳情',
          onClickAction: () => navigate('/flights/KHH-ZAG')
        },
        {
          time: '17:30',
          type: 'food' as const,
          title: 'Valentino Cocktail & Wine Bar 懸崖日落雞尾酒',
          badge: '絕美夕陽酒吧',
          description: '坐在鋪著海藍色墊子的岩石海岸旁，聽著浪濤聲品嚐伊斯特拉白葡萄酒 Malvazija，享受浪漫夕陽。'
        }
      ]
    },
    // Day 10: 10/06
    {
      date: '10/06 (二)',
      dayNum: 10,
      title: '普拉競技場 🚘 莫托文松露鎮 🚘 普列提維切 (十六湖)',
      region: 'croatia',
      subtitle: '參觀羅馬圓形競技場，山城黑松露午餐 (★ 06:55 第二批飛抵薩格勒布 全員5人大會合)',
      highlights: ['第二批 06:55 抵達 ZAG', '全員 5 人大會合', '普拉競技場 Pula Arena', '莫托文黑松露'],
      timeline: [
        {
          time: '06:55',
          type: 'transport' as const,
          title: '【團隊全員大會合】第二批（小花、頭家娘）飛抵薩格勒布機場 (QR215)',
          badge: '🇭🇷 全員 5 人正式到齊',
          description: '卡達航空 QR215 於 06:55 順利降落薩格勒布機場 (ZAG)。第二批（小花、頭家娘）完成入境通關與行李提取後，與第一批成員（小許、春香、麗安）5 人大會合，展開克羅埃西亞仙境之旅！',
          actionLabel: '查看聯程航班詳情',
          onClickAction: () => navigate('/flights/KHH-ZAG')
        },
        {
          time: '09:30',
          type: 'activity' as const,
          title: '普拉圓形競技場 (Pula Arena)',
          badge: '羅馬古典奇蹟',
          description: '建於西元一世紀，是世界六大完整保留圓形競技場之一，氣勢磅礡。',
          address: 'Flavijevska ul., 52100, Pula, Croatia'
        },
        {
          time: '13:00',
          type: 'food' as const,
          title: '莫托文 (Motovun) 山城黑松露義大利麵午餐',
          badge: '松露天堂',
          description: '伊斯特拉山區是頂級黑白松露產地，品嚐現刮香濃松露手工寬麵 (Fuži)。'
        },
        {
          time: '18:00',
          type: 'accommodation' as const,
          title: '入住 Fenomen Plitvice Resort 十六湖國家公園森林木屋度假村',
          badge: '湖區木屋奢華渡假',
          description: '靜謐地位於國家公園內部，環境幽靜，夜間能仰望繁星閃爍。',
          address: 'Plitvica 84, 53231, Plitvička Jezera, Croatia'
        }
      ]
    },
    // Day 11: 10/07
    {
      date: '10/07 (三)',
      dayNum: 11,
      title: '普列提維切：十六湖國家公園全天芬多精健行',
      region: 'croatia',
      subtitle: '漫步綠松石色湖泊、木棧道與大瀑布 (Veliki Slap)',
      highlights: ['十六湖國家公園', '大瀑布 Veliki Slap', '湖區電瓶船 P3-P2'],
      timeline: [
        {
          time: '08:30',
          type: 'activity' as const,
          title: '十六湖國家公園 (Plitvice Lakes) 下湖區大瀑布 (Veliki Slap)',
          badge: '預約一號入口 Entrance 1',
          description: '踏上環湖木棧道，近距離感受 78 公尺高的 Veliki Slap 大瀑布磅礡水氣與綠松石色清澈湖水。',
          address: '53231, Rastovača, Croatia',
          actionLabel: '公園地圖與路線',
          onClickAction: () => window.open('https://np-plitvicka-jezera.hr/en/', '_blank')
        },
        {
          time: '12:30',
          type: 'food' as const,
          title: 'Lička Kuća 傳統克羅埃西亞柴燒烤羔羊肉午餐',
          badge: '山區特色餐',
          description: '品嚐柴火慢烤羔羊肉與手工馬鈴薯、傳統酸奶白乾酪。'
        },
        {
          time: '14:00',
          type: 'activity' as const,
          title: '上湖區 (Upper Lakes) 電瓶船與階梯瀑布巡禮',
          badge: '絕美自然生態',
          description: '搭乘無污染電瓶船穿越 Kozjak 湖，探訪層層疊疊的奇幻湖泊與茂密原始森林。'
        }
      ]
    },
    // Day 12: 10/08
    {
      date: '10/08 (四)',
      dayNum: 12,
      title: '十六湖 🚘 扎達爾 (Zadar)：聽海風琴與最美落日',
      region: 'croatia',
      subtitle: '走訪希區考克大讚「世界最美夕陽」與海風琴樂章',
      highlights: ['海風琴 Sea Organ', '太陽致敬 Greeting to the Sun', '聖多納圖斯教堂'],
      timeline: [
        {
          time: '11:00',
          type: 'transport' as const,
          title: '驅車抵達海岸古城 扎達爾 (Zadar)',
          badge: '車程約 1.5小時',
          description: '沿著風景優美的山海公路下山，抵達佇立在亞德里亞海岸邊的扎達爾。'
        },
        {
          time: '16:00',
          type: 'activity' as const,
          title: '海風琴 (Sea Organ / Morske Orgulje) 聽海聲樂章',
          badge: '建築大獎作品',
          description: '坐在大理石海堤台階上，海浪推擠管風琴管，發出低沉悠揚自然海聲樂章。',
          address: 'Obala kralja Petra Krešimira IV, 23000, Zadar, Croatia'
        },
        {
          time: '18:15',
          type: 'activity' as const,
          title: '太陽致敬 (Greeting to the Sun) 絕美落日光影秀',
          badge: '希區考克大推夕陽',
          description: '太陽能玻璃板在夕陽餘暉下亮起彩虹光芒，伴隨著亞德里亞海金黃落日。'
        }
      ]
    },
    // Day 13: 10/09
    {
      date: '10/09 (五)',
      dayNum: 13,
      title: '扎達爾 🚘 希貝尼克 🚘 斯普利特 (Split)',
      region: 'croatia',
      subtitle: '參觀聖雅各大教堂無釘石構奇蹟，抵達達爾馬提亞古都斯普利特',
      highlights: ['希貝尼克 Šibenik', '聖雅各大教堂', '斯普利特老城'],
      timeline: [
        {
          time: '10:00',
          type: 'activity' as const,
          title: '希貝尼克 (Šibenik) 聖雅各大教堂 (St. James Cathedral)',
          badge: 'UNESCO 世界遺產',
          description: '完全由石材榫接建造、未用任何一根木頭或水泥的全石構教堂，外牆更有71尊逼真雕刻人頭。',
          address: 'Trg Republike Hrvatske 1, 22000, Šibenik, Croatia'
        },
        {
          time: '15:00',
          type: 'accommodation' as const,
          title: '入住 Heritage Hotel Antique Split 皇宮內古蹟精品飯店',
          badge: '戴克里先宮內',
          description: '飯店直接坐落在羅馬皇帝戴克里先宮殿的古老石牆之內，歷史感十足。',
          address: 'Poljana Grgura Ninskog 1, 21000, Split, Croatia'
        }
      ]
    },
    // Day 14: 10/10
    {
      date: '10/10 (六)',
      dayNum: 14,
      title: '斯普利特：戴克里先宮與濱海大道',
      region: 'croatia',
      subtitle: '穿梭西元三世紀古羅馬宮殿，登上聖杜金教堂鐘樓',
      highlights: ['戴克里先宮 Diocletian\'s Palace', '金門與寧斯基雕像', '瑪麗安山觀景台'],
      timeline: [
        {
          time: '09:30',
          type: 'activity' as const,
          title: '戴克里先宮 (Diocletian\'s Palace) 中庭與地下宮殿',
          badge: '權力遊戲取景地',
          description: '參觀拱廊中庭 (Peristyle)、列柱中庭與地下神殿，摸摸寧斯基雕像大拇趾祈求好運！',
          address: 'Dioklecijanova ul. 1, 21000, Split, Croatia'
        },
        {
          time: '17:00',
          type: 'activity' as const,
          title: '瑪麗安山觀景台 (Marjan Hill Lookout) 俯瞰紅屋頂港灣',
          badge: '黃金落日',
          description: '沿著綠意盎然步道登高，將斯普利特港灣、郵輪與整座舊城盡收眼底。'
        }
      ]
    },
    // Day 15: 10/11
    {
      date: '10/11 (日)',
      dayNum: 15,
      title: '斯普利特 🛥 赫瓦爾島 (Hvar)：亞德里亞海陽光島嶼',
      region: 'croatia',
      subtitle: '搭乘 Jadrolinija 快艇登上薰衣草之島，登上西班牙堡壘',
      highlights: ['Jadrolinija 快艇', '赫瓦爾廣場', '西班牙堡壘 Fortica'],
      timeline: [
        {
          time: '10:00',
          type: 'transport' as const,
          title: '搭乘 Jadrolinija / Krilo 高速快艇 (Split 🛥 Hvar)',
          badge: '船程約 1 小時',
          description: '航行於蔚藍海面上，直達陽光照射時數全歐洲最長的奢華島嶼赫瓦爾島。',
          actionLabel: '查看船班時刻表',
          onClickAction: () => window.open('https://www.jadrolinija.hr', '_blank')
        },
        {
          time: '15:30',
          type: 'activity' as const,
          title: '登上西班牙堡壘 (Fortica Fortress) 俯瞰紅頂小鎮與群島',
          badge: '無敵藍海大景',
          description: '俯瞰赫瓦爾港灣與跳島群島 (Pakleni Islands) 構成的極致蔚藍景致。',
          address: '21450, Hvar, Croatia'
        }
      ]
    },
    // Day 16: 10/12
    {
      date: '10/12 (一)',
      dayNum: 16,
      title: '赫瓦爾島：畢舍沃藍洞 (Blue Cave) 奇幻藍光巡航',
      region: 'croatia',
      subtitle: '搭乘快艇深入 Biševo 藍洞，感受日光折射生成的迷幻藍光',
      highlights: ['Biševo 藍洞', '綠洞 Green Cave', 'Pakleni 群島陽光沙灘'],
      timeline: [
        {
          time: '08:30',
          type: 'activity' as const,
          title: '快艇出海：畢舍沃島藍洞 (Blue Cave / Modra Špilja)',
          badge: '世界自然奇觀',
          description: '換乘小木船進入岩洞，陽光從底層海床折射，整座洞穴散發著閃耀翡翠藍光！',
          address: 'Mežuporat, 21485, Biševo, Croatia'
        },
        {
          time: '13:00',
          type: 'food' as const,
          title: 'Pakleni 群島海邊野生烤魚餐廳午餐',
          badge: '現捕達爾馬提亞海鮮',
          description: '在大自然海風吹拂下，享用現烤龍蝦、海膽與橄欖油烤魚。'
        }
      ]
    },
    // Day 17: 10/13
    {
      date: '10/17 (二)',
      dayNum: 17,
      title: '赫瓦爾 🛥 斯普利特 🚘 史東生蠔 🚘 杜布羅夫尼克 (Dubrovnik)',
      region: 'croatia',
      subtitle: '品嚐史東鮮採生蠔，登上歐洲最長石城牆，抵達君臨城',
      highlights: ['史東生蠔 Ston Oysters', '史東萬里長城', '杜布羅夫尼克五星飯店'],
      timeline: [
        {
          time: '13:00',
          type: 'food' as const,
          title: '史東 (Ston) 鮮採生蠔與淡菜大餐',
          badge: '頂級野生生蠔',
          description: '史東亞德里亞海灣鹽度適中，這裡培養出全歐洲公認最鮮甜彈牙的野生生蠔！',
          address: 'Obala dr. Ante Starčevića 1, 20230, Ston, Croatia'
        },
        {
          time: '17:30',
          type: 'accommodation' as const,
          title: '入住 Hotel Excelsior Dubrovnik 五星海景懸崖奢華酒店',
          badge: '君臨城海景第一排',
          description: '陽台直接對著古城牆與洛克魯姆島，無數名流皇室指名入住。',
          address: 'Frana Supila 12, 20000, Dubrovnik, Croatia'
        }
      ]
    },
    // Day 18: 10/14
    {
      date: '10/14 (三)',
      dayNum: 18,
      title: '杜布羅夫尼克：冰與火之歌「君臨城」古城牆巡禮',
      region: 'croatia',
      subtitle: '漫步 2 公里環城古城牆，探索派勒門與史特拉頓大道',
      highlights: ['古城牆 City Walls', '派勒門 Pile Gate', '史特拉頓大道 Stradun'],
      timeline: [
        {
          time: '08:30',
          type: 'activity' as const,
          title: '杜布羅夫尼克古城牆 (Dubrovnik City Walls) 環城健行',
          badge: 'UNESCO 世界遺產',
          description: '趁早晨陽光柔和登城，走完 1.94 公里堡壘城牆，右手邊是紅瓦屋頂，左手邊是晶瑩蔚藍大海。',
          address: '20000, Dubrovnik, Croatia',
          actionLabel: '地圖導航',
          onClickAction: () => window.open('https://maps.google.com/?q=Dubrovnik+City+Walls', '_blank')
        },
        {
          time: '14:00',
          type: 'activity' as const,
          title: '派勒門 (Pile Gate) & 羅夫里耶奈克要塞 (Fort Lovrijenac)',
          badge: '《權力遊戲》紅堡',
          description: '踏上《冰與火之歌》君臨城的紅堡要塞，俯瞰古城天然防禦海灣。'
        }
      ]
    },
    // Day 19: 10/15
    {
      date: '10/15 (四)',
      dayNum: 19,
      title: '杜布羅夫尼克：瑟爾德山纜車與洛克魯姆島',
      region: 'croatia',
      subtitle: '搭乘全景纜車登高俯瞰亞德里亞海明珠全景',
      highlights: ['瑟爾德山纜車 Mount Srđ', 'Panorama 景觀餐廳', '洛克魯姆島 Lokrum'],
      timeline: [
        {
          time: '10:00',
          type: 'activity' as const,
          title: '瑟爾德山纜車 (Dubrovnik Cable Car) 登上 Mount Srđ',
          badge: '絕美高空全景',
          description: '短短 3 分鐘登頂 415 公尺高山，整座亞德里亞海明珠紅瓦古城在腳下開展開來！',
          address: 'Ulica kralja Petra Krešimira IV, 20000, Dubrovnik, Croatia'
        },
        {
          time: '12:30',
          type: 'food' as const,
          title: 'Panorama Restaurant 山頂奢華景觀午餐',
          badge: '頂級懸崖餐廳',
          description: '一邊享用達爾馬提亞香料牛排與特調調酒，一邊飽覽壯麗海天一色景致。'
        }
      ]
    },
    // Day 20: 10/16
    {
      date: '10/16 (五)',
      dayNum: 20,
      title: '鄰國一日遊：蒙特內哥羅 (黑山 Kotor 科托爾灣)',
      region: 'croatia',
      subtitle: '過境進入黑山，探索南歐最深峽灣與科托爾古城',
      highlights: ['科托爾古城 Kotor', '岩石聖母島 Our Lady of the Rocks', '科托爾雙道峽灣'],
      timeline: [
        {
          time: '08:00',
          type: 'transport' as const,
          title: '包車/自駕過境進入蒙特內哥羅 (Montenegro)',
          badge: '過境黑山 🇲🇪',
          description: '出示護照過境進入蒙特內哥羅，沿著科托爾灣 (Bay of Kotor) 壯麗峽灣公路前行。'
        },
        {
          time: '11:00',
          type: 'activity' as const,
          title: '科托爾古城 (Kotor) 與聖特芬大教堂',
          badge: 'UNESCO 峽灣古城',
          description: '探索被巍峨山脈包圍的古老城池，挑戰登頂 1350 階聖約翰堡壘。',
          address: 'Kotor, Montenegro'
        }
      ]
    },
    // Day 21: 10/17
    {
      date: '10/17 (六)',
      dayNum: 21,
      title: '佩列沙茨半島 (Pelješac) 葡萄酒莊 & 斯通生蠔 (Ston)',
      region: 'croatia',
      subtitle: '探訪克羅埃西亞最長長城與頂級 Plavac Mali 紅酒產區',
      highlights: ['斯通古城石牆', '現剖生蠔品嚐', '佩列沙茨頂級酒莊'],
      timeline: [
        {
          time: '09:30',
          type: 'transport' as const,
          title: '驅車前往斯通 (Ston) 與佩列沙茨半島',
          badge: '沿海美景車程',
          description: '沿著風景秀麗的亞德里亞海濱公路北上，前往歷史悠久的產鹽與養殖生蠔古鎮斯通。'
        },
        {
          time: '11:00',
          type: 'food' as const,
          title: '斯通生蠔農場：搭船出海現剖現吃頂級生蠔',
          badge: '亞德里亞海鮮極品',
          description: '搭乘小木船出海參觀生蠔養殖架，現場開殼滴上檸檬汁品嚐最甘甜鮮美生蠔，搭配冰鎮白葡萄酒。'
        },
        {
          time: '14:30',
          type: 'activity' as const,
          title: '登斯通萬里長城 (Walls of Ston) & 參觀古老鹽田',
          badge: '歐洲最長防禦石牆',
          description: '全長 5.5 公里的中世紀防禦石牆蜿蜒於山丘上，見證杜布羅夫尼克共和國守護白金鹽田的輝煌歷史。'
        }
      ]
    },
    // Day 22: 10/18
    {
      date: '10/18 (日)',
      dayNum: 22,
      title: '柯楚拉島 (Korčula)：馬可波羅故鄉與蔚藍海灣',
      region: 'croatia',
      subtitle: '搭乘雙體渡輪探訪魚骨狀老城與達爾馬提亞葡萄酒產地',
      highlights: ['柯楚拉老城', '馬可波羅故居', 'Grk 白葡萄酒'],
      timeline: [
        {
          time: '08:30',
          type: 'transport' as const,
          title: '搭乘雙體高速渡輪前往柯楚拉島 (Korčula Town)',
          badge: '跳島渡輪',
          description: '航行於湛藍海灣間，登上被喻為「小杜布羅夫尼克」的防禦性島嶼古城。'
        },
        {
          time: '10:30',
          type: 'activity' as const,
          title: '柯楚拉老城魚骨巷弄漫步 & 登聖馬可大教堂鐘樓',
          badge: '文藝復興古城',
          description: '巧妙依風向設計的魚骨狀石板巷道冬暖夏涼，登鐘樓 360 度眺望亞德里亞海峽群島。'
        },
        {
          time: '13:00',
          type: 'food' as const,
          title: '品嚐島上特有品種 Grk / Pošip 白葡萄酒與海鮮燉飯',
          badge: '達爾馬提亞風味',
          description: '在海邊藤架露天餐廳品嚐柯楚拉島限定的黃金白葡萄酒與鮮嫩烤魚。'
        }
      ]
    },
    // Day 23: 10/19
    {
      date: '10/19 (一)',
      dayNum: 23,
      title: '埃拉菲蒂群島 (Elaphiti Islands) 帆船海灣跳島一日遊',
      region: 'croatia',
      subtitle: '巡航於洛普德島 (Lopud) 與希潘島 (Šipan)，享受日光浴與海泳',
      highlights: ['洛普德島 Lopud', '希潘島 Šipan', '群島帆船巡弋'],
      timeline: [
        {
          time: '10:00',
          type: 'transport' as const,
          title: '杜布羅夫尼克舊港出航：群島遊船之旅',
          badge: '跳島遊船',
          description: '自古城舊港口登船，迎著清爽海風航向杜布羅夫尼克貴族昔日的避暑群島。'
        },
        {
          time: '11:30',
          type: 'activity' as const,
          title: '洛普德島 (Lopud) 陽光沙灘散策與橄欖林海景',
          badge: '無車度假島嶼',
          description: '島上禁止汽車通行，保有寧靜淳樸地中海風情，擁有達爾馬提亞罕見的迷人沙灘。'
        }
      ]
    },
    // Day 24: 10/20
    {
      date: '10/20 (二)',
      dayNum: 24,
      title: '杜布羅夫尼克：老城慢活漫步與伴手禮採購',
      region: 'croatia',
      subtitle: '普拉卡大道最後巡禮、聖方濟各藥房古法保養品採購',
      highlights: ['普拉卡大道 Stradun', '聖方濟各古藥局', '克國伴手禮採購'],
      timeline: [
        {
          time: '10:00',
          type: 'activity' as const,
          title: '歐洲第三古老「聖方濟各修道院藥局」採購玫瑰水',
          badge: '自西元1317年',
          description: '購買傳承自中世紀配方的純天然玫瑰水 (Rose Water) 與草本面霜，是杜布羅夫尼克最經典伴手禮。'
        },
        {
          time: '14:30',
          type: 'activity' as const,
          title: '漫步普拉卡大道 (Stradun) 購買無花果乾、薰衣草與橄欖油',
          badge: '紀念品巡禮',
          description: '選購克羅埃西亞特產薰衣草精油、松露醬與無花果果醬，整理行李準備明日搭機直飛米蘭。'
        },
        {
          time: '18:00',
          type: 'food' as const,
          title: '古城懸崖景觀餐廳告別克羅埃西亞豐盛海鮮晚宴',
          badge: '克國告別晚宴',
          description: '在懸崖邊聽著海浪聲品嚐炭烤章魚與香煎鱸魚，回味 15 天克羅埃西亞的碧海藍天。'
        }
      ]
    },
    // Day 25: 10/21
    {
      date: '10/21 (三)',
      dayNum: 25,
      title: '杜布羅夫尼克 (DBV) ✈ 米蘭貝爾加莫 (BGY)：直飛返回義大利',
      region: 'italy',
      subtitle: '搭乘瑞安航空 FR5935 直飛米蘭 (14:25 - 16:00 全員5人同行)',
      highlights: ['瑞安直飛 FR5935', '杜布羅夫尼克 DBV', '米蘭貝爾加莫 BGY', '重返時尚之都米蘭'],
      timeline: [
        {
          time: '11:30',
          type: 'transport' as const,
          title: '前往杜布羅夫尼克機場 (DBV) 辦理報到託運',
          badge: '提前 3 小時',
          description: '全員 5 人抵達杜布羅夫尼克機場辦理瑞安航空行李託運（每人均含 20kg Plus 託運行李額度，小花 2 件）與安全檢查。'
        },
        {
          time: '14:25',
          type: 'transport' as const,
          title: '【直飛義大利】瑞安航空 FR5935 (DBV ✈ BGY)',
          badge: 'FR5935 (訂位: V64LYT / XYCEMH)',
          description: '14:25 起飛直飛義大利米蘭貝爾加莫機場 (BGY)，飛行時間僅 1 小時 35 分，於 16:00 準時降落。',
          actionLabel: '查看 FR5935 機票詳情',
          onClickAction: () => navigate('/flights/FR5935')
        },
        {
          time: '16:45',
          type: 'transport' as const,
          title: '搭乘 Orio Shuttle 機場快線直達米蘭中央車站',
          badge: '機場接駁巴士',
          description: '自 BGY 機場搭乘直達接駁巴士抵達米蘭中央車站 (Milano Centrale)，入住米蘭市區飯店。'
        },
        {
          time: '19:00',
          type: 'food' as const,
          title: 'Navigli 運河區義式 Aperitivo 餐前酒慶祝重返義大利',
          badge: '米蘭夜生活',
          description: '點一杯 Aperol Spritz 即可享用豐富自助點心，感受運河兩岸歡樂時尚氛圍。'
        }
      ]
    },
    // Day 26: 10/22
    {
      date: '10/22 (四)',
      dayNum: 26,
      title: '米蘭：米蘭大教堂登頂、黃金四角區購物與整理退稅行李',
      region: 'italy',
      subtitle: '參觀哥德式米蘭大教堂、蒙特拿破崙大道精品購物與退稅打包',
      highlights: ['米蘭大教堂 Duomo', '艾曼紐二世迴廊', '黃金四角區精品', '退稅單整理'],
      timeline: [
        {
          time: '09:30',
          type: 'activity' as const,
          title: '米蘭大教堂 (Duomo di Milano) 登頂與艾曼紐二世迴廊',
          badge: '米蘭核心地標',
          description: '搭乘電梯登上米蘭大教堂屋頂平台，近距離欣賞 135 座大理石尖塔；隨後漫步於艾曼紐二世迴廊。',
          address: 'Piazza del Duomo, 20122 Milano MI, Italy',
          actionLabel: '地圖導航',
          onClickAction: () => window.open('https://maps.google.com/?q=Duomo+di+Milano', '_blank')
        },
        {
          time: '14:30',
          type: 'activity' as const,
          title: '米蘭黃金四角區 (Via Montenapoleone) 精品購物 & 核對退稅單',
          badge: '退稅準備',
          description: '在米蘭精品大道採購，索取退稅單 (Tax Free Form)，將欲退稅商品集中於特定行李箱，準備明日於機場海關查驗蓋章。'
        },
        {
          time: '18:30',
          type: 'food' as const,
          title: '告別晚宴：經典米蘭煎小牛排 (Cotoletta alla Milanese)',
          badge: '米蘭告別晚宴',
          description: '品嚐金黃酥脆的經典米蘭炸小牛肉排，搭配香醇紅酒，回味 27 天旅程精彩點滴。'
        }
      ]
    },
    // Day 27: 10/23
    {
      date: '10/23 (五)',
      dayNum: 27,
      title: '米蘭 (MXP T1) 機場退稅 ✈ 阿布達比 ✈ 台北 (TPE T2)',
      region: 'italy',
      subtitle: '搭乘阿提哈德航空商務艙 EY82 / EY898 返台 (次日 10/24 10:00 抵台)',
      highlights: ['MXP T1 海關退稅', '阿提哈德商務艙 EY82', '次日 10:00 抵達桃園 T2'],
      timeline: [
        {
          time: '08:30',
          type: 'transport' as const,
          title: '抵達米蘭馬爾彭薩機場第一航廈 (MXP T1)',
          badge: '辦理退稅 & 報到',
          description: '前往機場海關退稅櫃檯 (Customs Tax Free) 掃描電子退稅單完成蓋章手續；隨後至阿提哈德航空商務艙專屬櫃檯辦理行李託運（每人 40kg 額度）並領取登機證。'
        },
        {
          time: '11:40',
          type: 'transport' as const,
          title: '【洲際商務第一段】米蘭 ✈ 阿布達比 (EY 82 商務艙)',
          badge: 'EY 82 (座位: 06A / A350-1000)',
          description: '搭乘阿提哈德航空空中巴士 A350-1000 豪華商務艙（旅客: Ms Hsiupi Wu，訂位代號: 9C3DNV），直飛阿布達比扎耶德機場 (AUH 航廈 A)，於 19:40 抵達。',
          actionLabel: '查看返程商務艙機票',
          onClickAction: () => navigate('/flights/EY82')
        },
        {
          time: '21:20',
          type: 'transport' as const,
          title: '【洲際商務第二段】阿布達比 ✈ 台北桃園 (EY 898 商務艙)',
          badge: 'EY 898 (座位: 06D / 787-9)',
          description: '中轉 1 小時 40 分後，搭乘波音 787-9 夢幻客機商務艙直飛台北，於次日 10/24 (六) 早上 10:00 順利降落桃園機場第二航廈 (T2)。',
          actionLabel: '查看航班詳情',
          onClickAction: () => navigate('/flights/EY898')
        },
        {
          time: '10/24 10:00',
          type: 'transport' as const,
          title: '【圓滿返抵】抵達台北桃園國際機場 (TPE T2)',
          badge: '滿載回憶圓滿完成 🇮🇹🇭🇷',
          description: '班機準時降落桃園機場第二航廈，順利提取行李、通關返家，為 27 天義大利與克羅埃西亞夢幻之旅畫下完美句點！'
        }
      ]
    }
  ];

  const filteredDays = daysData.filter(day => {
    if (selectedRegionFilter === 'italy') return day.region === 'italy';
    if (selectedRegionFilter === 'croatia') return day.region === 'croatia';
    return true;
  });

  const activeDay = daysData[selectedDay] || daysData[0];

  return (
    <div className="mt-20 px-4 pb-44 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 text-primary text-xs font-black uppercase tracking-widest">
            <Compass size={14} />
            <span>2026/09/27 - 10/23 (27 天)</span>
          </div>
          <h1 className="text-2xl font-black text-on-surface tracking-tight mt-0.5">
            義大利 & 克羅埃西亞每日行程
          </h1>
        </div>

        <button 
          onClick={() => navigate('/')}
          className="p-2.5 rounded-2xl bg-surface-container-lowest border border-outline-variant/10 shadow-sm hover:bg-surface-container-low transition-colors"
        >
          <Home size={18} className="text-on-surface" />
        </button>
      </div>

      {/* Region Filter Pills */}
      <div className="flex items-center gap-2 mb-4">
        {[
          { id: 'all', label: '全部 27 天' },
          { id: 'italy', label: '🇮🇹 義大利段' },
          { id: 'croatia', label: '🇭🇷 克羅埃西亞段' },
        ].map((filter) => (
          <button
            key={filter.id}
            onClick={() => setSelectedRegionFilter(filter.id as any)}
            className={cn(
              "px-3.5 py-1.5 rounded-full text-xs font-extrabold transition-all",
              selectedRegionFilter === filter.id 
                ? "bg-primary text-white shadow-sm" 
                : "bg-surface-container-lowest text-on-surface-variant border border-outline-variant/10 hover:bg-surface-container-low"
            )}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Day Selector Horizontal Scrollbar */}
      <div className="mb-6 overflow-x-auto pb-2 flex gap-2 no-scrollbar">
        {filteredDays.map((day) => {
          const actualIndex = daysData.findIndex(d => d.dayNum === day.dayNum);
          const isSelected = selectedDay === actualIndex;
          return (
            <button
              key={day.dayNum}
              onClick={() => setSelectedDay(actualIndex)}
              className={cn(
                "px-3.5 py-2 rounded-2xl shrink-0 flex flex-col items-center justify-center transition-all min-w-[72px] border text-center",
                isSelected
                  ? "bg-primary text-white border-primary shadow-md scale-105"
                  : "bg-surface-container-lowest border-outline-variant/10 text-on-surface hover:bg-surface-container-low"
              )}
            >
              <span className={cn("text-[10px] font-bold uppercase tracking-wider", isSelected ? "text-white/80" : "text-outline")}>
                Day {day.dayNum}
              </span>
              <span className="text-xs font-black mt-0.5 whitespace-nowrap">
                {day.date.split(' ')[0]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Day Info Banner */}
      <motion.div 
        key={activeDay.dayNum}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-surface-container-lowest p-5 rounded-3xl border border-outline-variant/10 shadow-sm mb-6 space-y-3 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 bottom-0 w-2 bg-primary"></div>
        <div className="flex items-center justify-between">
          <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">
            第 {activeDay.dayNum} 天 | {activeDay.date}
          </span>
          <span className="text-xs font-bold text-outline">
            {activeDay.region === 'italy' ? '🇮🇹 義大利' : '🇭🇷 克羅埃西亞'}
          </span>
        </div>

        <h2 className="text-xl font-black text-on-surface leading-snug">
          {activeDay.title}
        </h2>
        <p className="text-xs font-medium text-on-surface-variant leading-relaxed">
          {activeDay.subtitle}
        </p>

        {/* Highlights Pills */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {activeDay.highlights.map((h, i) => (
            <span key={i} className="text-[11px] font-bold bg-surface-container-high text-on-surface-variant px-2.5 py-1 rounded-lg flex items-center gap-1">
              <Sparkles size={11} className="text-amber-500" />
              {h}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Day Timeline */}
      <div className="relative pl-3">
        {/* Continuous timeline line */}
        <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-outline-variant/20 z-0"></div>

        <div className="space-y-2">
          {activeDay.timeline.map((item, idx) => (
            <TimelineItem
              key={idx}
              time={item.time}
              title={item.title}
              description={item.description}
              type={item.type}
              badge={item.badge}
              address={item.address}
              hours={item.hours}
              phone={item.phone}
              actionLabel={item.actionLabel}
              onClickAction={item.onClickAction}
            />
          ))}
        </div>
      </div>

      {/* Prev / Next Day Navigation Footer */}
      <div className="flex items-center justify-between mt-8 pt-4 border-t border-outline-variant/10">
        <button
          disabled={selectedDay === 0}
          onClick={() => setSelectedDay(prev => Math.max(0, prev - 1))}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-surface-container-lowest border border-outline-variant/10 text-xs font-bold text-on-surface disabled:opacity-30 active:scale-95 transition-all"
        >
          <ArrowLeft size={16} />
          前一天 (Day {selectedDay})
        </button>

        <span className="text-xs font-black text-outline">
          {selectedDay + 1} / {daysData.length}
        </span>

        <button
          disabled={selectedDay === daysData.length - 1}
          onClick={() => setSelectedDay(prev => Math.min(daysData.length - 1, prev + 1))}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-primary text-white text-xs font-bold disabled:opacity-30 active:scale-95 transition-all shadow-sm"
        >
          後一天 (Day {selectedDay + 2})
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
