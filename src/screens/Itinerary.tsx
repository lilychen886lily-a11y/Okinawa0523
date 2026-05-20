import { Home, Map as MapIcon, Phone, Clock, ShoppingBag, Utensils, Train, CalendarDays, Globe, Camera, Palmtree, Car, ArrowLeft, MapPin, Plane } from 'lucide-react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

export function Itinerary() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeDay = parseInt(searchParams.get('day') || '0');

  const days = ['Day 01', 'Day 02', 'Day 03', 'Day 04', 'Day 05', 'Day 06'];

  const handleDayChange = (index: number) => {
    setSearchParams({ day: index.toString() });
  };

  return (
    <div className="pb-44">
      <div className="sticky top-16 z-40 bg-surface/95 backdrop-blur shadow-sm border-b border-outline-variant/20">
        <div className="flex overflow-x-auto no-scrollbar py-3 px-4 gap-3">
          {days.map((day, i) => (
            <button
              key={day}
              onClick={() => handleDayChange(i)}
              className={cn(
                "flex-shrink-0 px-5 py-2 rounded-full text-sm font-bold transition-all",
                activeDay === i ? "bg-primary text-white shadow-sm" : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest"
              )}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      <main className="px-4 max-w-md mx-auto pt-4">
        {activeDay === 0 && (
          <>
            <section className="mb-8 mt-2">
              <h2 className="text-[#005d90] text-3xl font-extrabold tracking-tighter mb-4 px-2">5/23 第一天</h2>
              <button 
                onClick={() => navigate('/')}
                className="w-full py-4 bg-primary text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-md hover:opacity-90 active:scale-95 transition-all"
              >
                <Home size={20} />
                返回首頁
              </button>
            </section>

            <div className="space-y-6 relative">
              <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-surface-variant/40"></div>
              
              <TimelineItem 
                time="07:00 - 09:30" 
                title="開車前往台中機場" 
                description="停車資訊：文昌/大漁停車場"
                actionLabel="查看地圖"
                actionIcon={MapIcon}
                onClickAction={() => navigate('/parking')}
              />

              <DrivingInfo distance="140 km" duration="約 1 小時 30 分鐘" />

              <TimelineItem 
                time="09:30" 
                title="機場接送" 
                description="7人座接駁專車前往桃園機場第一航廈 (T1)"
              />

              <TimelineItem 
                time="14:50 / 14:55" 
                title="飛往那霸機場 (OKA)" 
                description={
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-surface-container-high rounded-lg text-xs font-medium">樂桃航空 MM924 (14:50)</span>
                    <span className="px-3 py-1 bg-surface-container-high rounded-lg text-xs font-medium">越捷航空 VZ568 (14:55)</span>
                  </div>
                }
              />

              <TimelineItem 
                type="accommodation"
                time="18:00" 
                title="辦理入住：那霸小祿站前 Y's Inn" 
                description={
                  <div className="space-y-2">
                    <p>抵達小祿站後直接前往飯店辦理 Check-in，放妥大件行李、稍作休息整理，用最輕便的狀態展開沖繩第一晚的探索！飯店就在小祿單軌電車站旁邊，交通和機能都極其便利。</p>
                    <div className="mt-3 space-y-1 text-xs text-on-surface-variant">
                      <p className="flex items-start gap-2"><MapIcon size={14} className="mt-1" />1 Chome-1-10 Kanagusuku, Naha, Okinawa 901-0155</p>
                      <p className="flex items-center gap-2"><Phone size={14} />+81 98-857-1110</p>
                    </div>
                  </div>
                }
                actionLabel="在 Google 地圖上查看飯店"
                onClickAction={() => window.open('https://maps.google.com/?q=Y\'s+Inn+Naha+Oroku+Ekimae', '_blank')}
              />

              <TimelineItem 
                time="18:45" 
                title="小祿站周邊活動 & 自由晚餐" 
                description="行李放好後直接步行出發！小祿站周邊極為熱鬧，可自由漫步、逛 AEON Mall Naha、採買大國藥妝，或前往極具人氣的「琉球新麵 通堂」小祿本店，品嚐經典的沖繩男人麵（厚實豬骨）或女人麵（清淡鹽味）拉麵當晚餐！"
              />

              <TimelineItem 
                time="20:30" 
                title="搭乘電車前往安里站 (榮町市場)" 
                description="晚上若還有體力，推薦從小祿站搭乘單軌電車 (Yui Rail) 前往安里站的「榮町市場」居酒屋街！在溫馨、復古且充滿昭和風情的隱密市場小巷中吃章魚燒、串燒，感受日本在地庶民的夜生活（想要提早休息的人也可留在小祿站周邊，或回飯店舒舒服服泡個澡）。"
              />
              
              <TimelineSection 
                icon={ShoppingBag} 
                title="購物行程" 
                items={[
                  { name: 'AEON Mall Naha', info: '營業至 22:00', mapUrl: 'https://www.google.com/maps/search/?api=1&query=AEON+Mall+Naha' },
                  { name: 'Daikoku Drug 大國藥妝', info: '營業至 23:00', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Daikoku+Drug+Naha+Oroku' }
                ]} 
              />

              <TimelineSection 
                icon={Utensils} 
                title="美食推薦" 
                isFood
                items={[
                  { 
                    name: '琉球新麵 通堂 (小祿本店)', 
                    tag: '招牌男人麵/女人麵', 
                    time: '11:00 - 01:00',
                    sub: '沖繩縣那霸市金城 5-4-6',
                    info: '小祿站步行 2 分鐘，那霸必吃拉麵',
                    mapUrl: 'https://www.google.com/maps/search/?api=1&query=琉球新麵+通堂+小祿',
                    phone: '098-857-5577'
                  },
                  { 
                    name: '焼肉ホルモン きたや (KITAYA)', 
                    tag: '和牛燒肉、內臟', 
                    time: '17:00 - 00:00 (L.O. 23:00)',
                    sub: '沖繩縣那霸市安里 388-1 (榮町市場內)',
                    info: '榮町市場內超人氣燒肉店，推薦黑毛和牛',
                    mapUrl: 'https://www.google.com/maps/search/?api=1&query=焼肉ホルモン+きたや',
                    phone: '098-886-3006'
                  },
                  { 
                    name: '燒肉天國大統領', 
                    tag: '炭火燒肉、居酒屋', 
                    time: '17:00 - 00:00 (不定休)',
                    sub: '沖繩縣那霸市安里 386 (榮町市場內)',
                    info: '充滿懷舊氛圍的燒肉店，CP 值高',
                    mapUrl: 'https://www.google.com/maps/search/?api=1&query=燒肉天國大統領',
                    phone: '098-884-2577'
                  },
                  { 
                    name: 'たこ焼き・居酒屋 仁ぐゎー', 
                    tag: '章魚燒、小聚居酒屋', 
                    time: '18:00 - 00:00',
                    sub: '沖繩縣那霸市安里 388-10 (榮町市場內)',
                    info: '榮町市場小酌首選，酥脆章魚燒必點',
                    mapUrl: 'https://www.google.com/maps/search/?api=1&query=たこ焼き・居酒屋+仁ぐゎー',
                    phone: '098-887-1473'
                  }
                ]} 
              />
            </div>
          </>
        )}

        {activeDay === 1 && (
          <>
            <section className="mb-8 mt-2">
              <h2 className="text-[#005d90] text-3xl font-extrabold tracking-tighter mb-4 px-2">5/24 第二天</h2>
              <button 
                onClick={() => navigate('/')}
                className="w-full py-4 bg-primary text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-md hover:opacity-90 active:scale-95 transition-all"
              >
                <Home size={20} />
                返回首頁
              </button>
            </section>

            <div className="space-y-6 relative">
              <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-surface-variant/40"></div>
              
              <TimelineItem 
                time="08:30" 
                title="晨間出發" 
                description="從小祿站搭乘單軌電車前往 牧志站 (Makishi Station)"
                actionIcon={Train}
                actionLabel="查詢電車時刻"
                onClickAction={() => window.open('https://www.yui-rail.co.jp/tc/', '_blank')}
              />

              <TimelineItem 
                time="09:00" 
                title="第一牧志公設市場" 
                description={
                  <div className="space-y-2">
                    <p>體驗沖繩廚房，探索新鮮海產與在地特色食材。近期剛翻新完成，非常整潔舒適。</p>
                    <div className="text-[11px] text-on-surface-variant font-medium space-y-0.5">
                      <p>地址：那霸市松尾 2-10-1</p>
                      <p>時間：08:00 - 21:00 (視店家而定)</p>
                      <p className="flex items-center gap-1"><Phone size={10} /> 098-867-6560</p>
                    </div>
                  </div>
                }
                actionLabel="查看地圖"
                actionIcon={MapIcon}
                onClickAction={() => window.open('https://www.google.com/maps/search/?api=1&query=第一牧志公設市場', '_blank')}
              />

              <TimelineSection 
                icon={ShoppingBag} 
                title="市場探險與商店" 
                items={[
                  { 
                    name: '仲本商店 (Nakamoto)', 
                    tag: '在地雜貨',
                    time: '09:00 - 18:00',
                    sub: '牧志公設市場周邊',
                    info: '販售各式沖繩特色漬物、蒟蒻與醃漬生鮮', 
                    mapUrl: 'https://www.google.com/maps/search/?api=1&query=仲本商店+牧志市場',
                    phone: '098-866-5123'
                  },
                  { 
                    name: '市場本通 (Ichiba-hondori)', 
                    tag: '商店街',
                    info: '熱鬧的拱廊商店街，適合購買伴手禮與小物', 
                    mapUrl: 'https://www.google.com/maps/search/?api=1&query=市場本通' 
                  }
                ]} 
              />

              <TimelineItem 
                time="11:30" 
                title="國際通巡禮" 
                description="從市場本通走入熱鬧的國際通 (Kokusai Dori)。地址：那覇市国際通り。"
              />

              <TimelineItem 
                time="12:00" 
                title="ABC 租車領車 (機場店)" 
                description={
                  <div className="space-y-2">
                    <p>辦理領車手續。租車公司提供機場接駁服務。</p>
                    <div className="text-[11px] text-on-surface-variant font-medium space-y-0.5">
                      <p>地址：那霸市田原 1-17-9</p>
                      <p>時間：08:00 - 20:00</p>
                      <p className="flex items-center gap-1"><Phone size={10} /> 098-859-5555</p>
                    </div>
                  </div>
                }
                actionLabel="查看租車詳情"
                onClickAction={() => navigate('/car-rental')}
              />

              <DrivingInfo distance="10.2 km" duration="約 22 分鐘" />

              <TimelineSection 
                icon={ShoppingBag} 
                title="港川外人住宅區 (Minatogawa)" 
                items={[
                  { 
                    name: '第 3 港川ステイツサイドコインパーキング', 
                    tag: '建議停車場',
                    info: 'Dai 3 Minatogawa Parking | 步行前往店家非常近', 
                    mapUrl: 'https://www.google.com/maps/search/?api=1&query=第3港川ステイツサイドコインパーキング',
                    phone: '098-875-0105'
                  },
                  { 
                    name: 'ippe-coppe (イッペコッペ)', 
                    tag: '天然酵母麵包',
                    time: '12:30 - 18:30 (週二三四休)',
                    sub: 'No.26 | 浦添市港川 2-16-1',
                    info: '知名天然酵母麵包、司康，每日限量販售', 
                    mapUrl: 'https://www.google.com/maps/search/?api=1&query=ippe-coppe+沖繩',
                    phone: '098-877-6189'
                  },
                  { 
                    name: 'oHacorte (オハコルテ) 港川店', 
                    tag: '人氣水果塔',
                    time: '11:30 - 19:00',
                    sub: 'No.18 | 浦添市港川 2-17-1',
                    info: '必吃人氣水果塔，適合悠閒午茶', 
                    mapUrl: 'https://www.google.com/maps/search/?api=1&query=oHacorte+Minatogawa',
                    phone: '098-875-2129'
                  }
                ]} 
              />

              <DrivingInfo distance="27.8 km" duration="約 50 分鐘" />

              <TimelineItem 
                time="13:30 - 14:45" 
                title="沿著西海岸開車前往讀谷村" 
                description="行經國道 58 號線，欣賞沖繩西海岸海景。預計行車時間約 1 小時 15 分鐘。"
              />

              <TimelineItem 
                type="accommodation"
                time="15:00" 
                title="沖繩殘波岬美爵度假酒店" 
                description={
                  <div className="mt-3 space-y-1 text-sm text-on-surface-variant">
                    <p className="font-bold text-primary">Grand Mercure Okinawa Cape Zanpa Resort</p>
                    <p className="flex items-start gap-2"><MapIcon size={14} className="mt-1" />1575 Uza, Yomitan, Nakagami District, Okinawa 904-0328</p>
                    <p className="flex items-center gap-2 font-bold text-tertiary"><Globe size={14} />All-inclusive 全包式體驗</p>
                  </div>
                }
                actionLabel="在 Google 地圖上查看"
                onClickAction={() => window.open('https://www.google.com/maps/search/?api=1&query=Grand+Mercure+Okinawa+Cape+Zanpa+Resort', '_blank')}
              />

              <TimelineSection 
                icon={Utensils} 
                title="午餐選擇" 
                isFood
                items={[
                  { 
                    name: '焼肉きんぐ 那覇新都心店', 
                    tag: '燒肉吃到飽', 
                    time: '11:00 - 23:00',
                    sub: '沖繩縣那霸市上之屋 1-1-1',
                    info: '超人氣平價燒肉，推薦先線上預約',
                    mapUrl: 'https://www.google.com/maps/search/?api=1&query=焼肉きんぐ+那覇新都心店',
                    phone: '098-941-1129'
                  },
                  { 
                    name: 'なかざ家 (Nakaza-ya)', 
                    tag: '沖繩麵、豬腳', 
                    time: '11:00 - 15:30',
                    sub: '沖繩縣那霸市金城 3-7-1',
                    info: '在地人大推的沖繩麵與極嫩豬腳，內行才知道',
                    mapUrl: 'https://www.google.com/maps/search/?api=1&query=なかざ家+那覇',
                    phone: '098-859-0214'
                  },
                  { 
                    name: '泊港漁市場 (Tomari Iyumachi)', 
                    tag: '新鮮海產', 
                    time: '06:00 - 18:00',
                    sub: '沖繩縣那霸市港町 1-1-18',
                    info: '當日現撈海產，立食生魚片與生蠔首選',
                    mapUrl: 'https://maps.app.goo.gl/nZrW6mGYGhULNAZv5',
                    phone: '098-868-1096'
                  }
                ]} 
              />
            </div>
          </>
        )}

        {activeDay === 2 && (
          <>
            <section className="mb-8 mt-2">
              <h2 className="text-[#005d90] text-3xl font-extrabold tracking-tighter mb-4 px-2">5/25 第三天</h2>
              <button 
                onClick={() => navigate('/')}
                className="w-full py-4 bg-primary text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-md hover:opacity-90 active:scale-95 transition-all"
              >
                <Home size={20} />
                返回首頁
              </button>
            </section>

            <div className="space-y-6 relative">
              <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-surface-variant/40"></div>
              
              <TimelineItem 
                time="09:00" 
                title="晨間悠閒早餐" 
                description="在飯店享用全包式早餐，準備開始一天的文化體驗。"
                actionIcon={Clock}
              />

              <DrivingInfo distance="7.5 km" duration="約 15 分鐘" />

              <TimelineItem 
                time="10:30" 
                title="琉球村 (Ryukyu Mura)" 
                description={
                  <div className="space-y-2">
                    <p>體驗沖繩傳統文化，欣賞民家建築、傳統工藝演出及大鼓舞 (Eisa)。</p>
                    <div className="text-[11px] text-on-surface-variant font-medium space-y-0.5">
                      <p>地址：沖繩縣恩納村山田 1130</p>
                      <p>時間：09:00 - 17:30 (17:00 最後入場)</p>
                      <p className="flex items-center gap-1"><Phone size={10} /> 098-965-1234</p>
                    </div>
                  </div>
                }
                actionIcon={Camera}
                actionLabel="查看官網訊息"
                onClickAction={() => window.open('https://www.ryukyumura.co.jp/official/', '_blank')}
              />

              <DrivingInfo distance="9.2 km" duration="約 18 分鐘" />

              <TimelineSection 
                icon={Utensils} 
                title="午餐選擇 (恩納村區域)" 
                isFood
                items={[
                  { 
                    name: '崎濱製麺所 (Sakihama)', 
                    tag: '手打沖繩麵', 
                    time: '11:00 - 15:00 (週日休)',
                    sub: '恩納村恩納 2418-1',
                    info: '每日限量的手作麵條，Q 彈有勁非常有咬勁',
                    mapUrl: 'https://www.google.com/maps/search/?api=1&query=崎濱製麺所',
                    phone: '098-966-2418'
                  },
                  { 
                    name: '海鮮料理 浜の家 (Hamanoya)', 
                    tag: '海鮮老店', 
                    time: '11:00 - 21:00',
                    sub: '恩納村仲泊 2097',
                    info: '這家必點奶油烤魚！是在地老字號的海鮮食堂',
                    mapUrl: 'https://www.google.com/maps/search/?api=1&query=海鮮料理+浜の家',
                    phone: '098-965-0870'
                  }
                ]} 
              />

              <TimelineSection 
                icon={MapIcon} 
                title="下午行程 (Flex Options)" 
                items={[
                  { 
                    name: '萬座毛 (Manzamo)', 
                    tag: '觀光景觀',
                    time: '08:00 - 20:00',
                    sub: '恩納村恩納 2871',
                    info: '壯觀象鼻懸崖海景。備有寬敞停車場與遊客中心', 
                    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Manzamo',
                    phone: '098-966-1210'
                  }
                ]} 
              />

              <DrivingInfo distance="11.5 km" duration="約 22 分鐘" />

              <TimelineItem 
                time="16:30" 
                title="MaxValu 座喜味店 (Supermarket)" 
                description={
                  <div className="space-y-2">
                    <p>大型連鎖超市，可以補給水果、零食、飲料或在地特產。24 小時營業，非常方便。</p>
                    <div className="text-[11px] text-on-surface-variant font-medium space-y-0.5">
                      <p className="flex items-center gap-1.5 px-2 py-1 bg-secondary/10 text-secondary rounded text-xs font-bold">
                        <Phone size={12} /> TEL: 098-958-4500
                      </p>
                    </div>
                  </div>
                }
                actionIcon={ShoppingBag}
                actionLabel="查看地圖"
                onClickAction={() => window.open('https://www.google.com/maps/search/?api=1&query=MaxValu+Zakimi+Okinawa', '_blank')}
              />

              <TimelineItem 
                time="17:30" 
                title="返回飯店休息" 
                description="回到 Grand Mercure 稍微梳洗休息，或在行政酒廊小憩。"
              />

              <DrivingInfo distance="3.2 km" duration="約 8 分鐘" />

              <TimelineItem 
                time="18:30" 
                title="漫步至殘波岬 (Zanpa Cape)" 
                description="從飯店出發「走路」即可抵達殘波岬。欣賞壯麗的懸崖海景與白色燈塔，是觀賞夕陽的絕佳地點。"
                actionIcon={Palmtree}
                actionLabel="導航至殘波岬"
                onClickAction={() => window.open('https://www.google.com/maps/search/?api=1&query=Cape+Zanpa+Lighthouse', '_blank')}
              />

              <TimelineSection 
                icon={Utensils} 
                title="晚餐選擇" 
                isFood
                items={[
                  { 
                    name: '全包式晚餐 (Grand Mercure)', 
                    info: '飯店內享用豐盛的 Buffet 晚餐與無限暢飲。', 
                    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Grand+Mercure+Okinawa+Cape+Zanpa+Resort' 
                  },
                  { 
                    name: '石窯ピザ酒場まるき (Maruki) 読谷店', 
                    tag: '義式披薩、居酒屋', 
                    time: '17:00 - 00:00 (週三公休)',
                    sub: '沖繩縣讀谷村喜名 458-3',
                    info: '人氣石窯披薩與在地特色小菜，適合放鬆晚餐',
                    mapUrl: 'https://www.google.com/maps/search/?api=1&query=石窯ピザ酒場まるき+讀谷店',
                    phone: '098-958-5400'
                  },
                  { 
                    name: '合掌食堂 (Gassho Shokudo)', 
                    tag: '傳統定食、家庭料理', 
                    time: '11:00 - 15:00, 17:00 - 21:00',
                    sub: '沖繩縣讀谷村曾邊 117-1',
                    info: '像日本合掌造建築的特色外觀，餐點精采且價格平實',
                    mapUrl: 'https://www.google.com/maps/search/?api=1&query=合掌食堂+讀谷村',
                    phone: '098-957-1234'
                  },
                  { 
                    name: '琉球料理 琉花 (Ryuka)', 
                    tag: '傳統定食、琉球料理', 
                    time: '11:00 - 15:30, 18:00 - 21:00',
                    sub: '沖繩縣讀谷村宇座 1575',
                    info: '離飯店極近，在地人大推、分量十足的人氣食堂',
                    mapUrl: 'https://www.google.com/maps/search/?api=1&query=琉球料理+琉花',
                    phone: '098-958-4479'
                  }
                ]} 
              />
            </div>
          </>
        )}

        {activeDay === 3 && (
          <>
            <section className="mb-8 mt-2">
              <h2 className="text-[#005d90] text-3xl font-extrabold tracking-tighter mb-4 px-2">5/26 第四天</h2>
              <button 
                onClick={() => navigate('/')}
                className="w-full py-4 bg-primary text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-md hover:opacity-90 active:scale-95 transition-all"
              >
                <Home size={20} />
                返回首頁
              </button>
            </section>

            <div className="space-y-6 relative">
              <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-surface-variant/40"></div>
              
              <TimelineItem 
                time="10:00" 
                title="買麵包：ぱん工房おとなりや" 
                description="快速採買天然酵母麵包，帶著路上當點心。"
                actionIcon={ShoppingBag}
                onClickAction={() => window.open('https://www.google.com/maps/search/?api=1&query=ぱん工房おとなりや', '_blank')}
              />

              <TimelineItem 
                time="10:20" 
                title="星野リゾート バンタカフェ (Banta Cafe)" 
                description={
                  <div className="space-y-2">
                    <p>準時抵達星野咖啡！坐在壯麗的海景露台享受早晨，是這天的重頭戲。</p>
                    <div className="text-[11px] text-on-surface-variant">
                      <p>地址：讀谷村儀間 560</p>
                    </div>
                  </div>
                }
                actionIcon={Clock}
                actionLabel="查看地圖"
                onClickAction={() => window.open('https://www.google.com/maps/search/?api=1&query=星野リゾート+バンタカフェ', '_blank')}
              />

              <DrivingInfo distance="45 km" duration="約 50 分鐘" />

              <TimelineItem 
                time="12:20" 
                title="沖繩世界文化王國・玉泉洞" 
                description={
                  <div className="space-y-2">
                    <p>首站抵達玉泉洞！欣賞歷經三十萬年歲月形成的雄偉鐘乳石洞（日本三大鐘乳石洞之一），全長約 5 公里（開放 890 公尺），奇幻無比。步出洞穴後可順道漫步充滿古樸風情的王國村。</p>
                    <div className="text-[11px] text-on-surface-variant">
                      <p>地址：南城市玉城前川 1336</p>
                      <p>營業時間：09:00 - 17:30 (最晚 16:30 前入場)</p>
                    </div>
                  </div>
                }
                actionIcon={MapIcon}
                actionLabel="查看玉泉洞地圖"
                onClickAction={() => window.open('https://www.google.com/maps/search/?api=1&query=Okinawa+World+Gyokusendo', '_blank')}
              />

              <DrivingInfo distance="5.5 km" duration="約 10 分鐘" />

              <TimelineItem 
                time="14:00" 
                title="點心：中本鮮魚店 (中本天婦羅店)" 
                description={
                  <div className="space-y-2">
                    <p>直接開往奧武島！先去島上排隊人潮不絕、最著名的中本鮮魚店享用沖繩風味天婦羅（海鮮、花枝、蔬菜，外皮厚實蓬鬆、現炸起鍋超香甜美味）。</p>
                    <div className="text-[11px] text-on-surface-variant">
                      <p>地址：南城市玉城字奧武 9</p>
                    </div>
                  </div>
                }
                actionIcon={ShoppingBag}
                actionLabel="查看中本天婦羅地圖"
                onClickAction={() => window.open('https://www.google.com/maps/search/?api=1&query=中本鮮魚店', '_blank')}
              />

              <TimelineItem 
                time="14:35" 
                title="午餐：大福食堂 (奧武島)" 
                description={
                  <div className="space-y-2">
                    <p>同樣位於奧武島上的熱門海鮮定食屋。推薦品嚐超高 CP 值的鮮魚定食、沖繩麵、或現切生魚片，分量驚人又美味，是完美的沖繩在地午餐！</p>
                    <div className="text-[11px] text-on-surface-variant">
                      <p>地址：南城市玉城字奧武 26</p>
                    </div>
                  </div>
                }
                actionIcon={Utensils}
                actionLabel="查看大福食堂地圖"
                onClickAction={() => window.open('https://www.google.com/maps/search/?api=1&query=大福食堂+奧武島', '_blank')}
              />

              <DrivingInfo distance="6.5 km" duration="約 12 分鐘" />

              <TimelineItem 
                time="15:40" 
                title="好市多沖繩南城店 (Costco Wholesale)" 
                description={
                  <div className="space-y-2">
                    <p>下午來到全新開幕的沖繩南城好市多大採購！瘋狂採買晚上別墅 Party 的 BBQ 烤肉食材、高檔美牛、冰鎮啤酒、零食飲料、以及水果和壽司熟食拼盤！</p>
                    <div className="text-[11px] text-on-surface-variant">
                      <p>地址：南城市つきしろIC南1街区1</p>
                    </div>
                  </div>
                }
                actionIcon={ShoppingBag}
                actionLabel="查看好市多地圖"
                onClickAction={() => window.open('https://www.google.com/maps/search/?api=1&query=Costco+Wholesale+Okinawa+Nanjo', '_blank')}
              />

              <DrivingInfo distance="4 km" duration="約 8 分鐘" />

              <TimelineItem 
                time="16:50" 
                title="次郎鮮魚店 (南城市佐敷)" 
                description={
                  <div className="space-y-2">
                    <p>進入別墅前的最後一站！前往次郎鮮魚店帶走一盒新鮮肥美的綜合生魚片。直接打包到車上，作為今晚 BBQ 派對的最頂級開胃前菜！</p>
                    <div className="text-[11px] text-on-surface-variant">
                      <p>地址：日本 〒901-1404 Okinawa, Nanjo, Sashiki, Fusozaki-229-1</p>
                    </div>
                  </div>
                }
                actionIcon={ShoppingBag}
                actionLabel="查看次郎鮮魚店地圖"
                onClickAction={() => window.open('https://www.google.com/maps/search/?api=1&query=次郎鮮魚店+南城市', '_blank')}
              />

              <DrivingInfo distance="4.5 km" duration="約 10 分鐘" />

              <TimelineItem 
                type="accommodation"
                time="17:30" 
                title="南城市水晶別墅 (入住 & BBQ 派對)" 
                description={
                  <div className="mt-3 space-y-1 text-sm text-on-surface-variant font-bold text-primary">
                    <p>Crystal Villa Nanjo</p>
                    <p className="text-xs font-normal">傍晚辦理入住包棟海景別墅。趕緊放生魚片到冰箱、洗手生火，開啟我們沖繩南城好市多 BBQ 海景狂歡派對，一邊看海一邊享受沖繩盛夏聚會！</p>
                  </div>
                }
                actionLabel="在 Google 地圖上查看"
                onClickAction={() => window.open('https://www.google.com/maps/search/?api=1&query=Crystal+Villa+Nanjo', '_blank')}
              />
            </div>
          </>
        )}

        {activeDay === 4 && (
          <>
            <section className="mb-8 mt-2">
              <h2 className="text-[#005d90] text-3xl font-extrabold tracking-tighter mb-4 px-2">5/27 第五天</h2>
              <button 
                onClick={() => navigate('/')}
                className="w-full py-4 bg-primary text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-md hover:opacity-90 active:scale-95 transition-all"
              >
                <Home size={20} />
                返回首頁
              </button>
            </section>

            <div className="space-y-6 relative">
              <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-surface-variant/40"></div>
              
              <TimelineItem 
                time="09:00" 
                title="知念岬公園 (全員一起行動)" 
                description={
                  <div className="space-y-2">
                    <p>退房後全員先前往南城市著名的知念岬公園。欣賞 270 度的無敵海景，感受海天一色的開闊感，最後全體合影留念。</p>
                    <div className="text-[11px] text-on-surface-variant font-medium">
                      <p>地址：南城市知念久手堅 523</p>
                    </div>
                  </div>
                }
                actionIcon={MapIcon}
                actionLabel="查看地圖"
                onClickAction={() => window.open('https://www.google.com/maps/search/?api=1&query=知念岬公園', '_blank')}
              />

              <DrivingInfo distance="25 km" duration="約 45 分鐘" />

              <TimelineItem 
                time="10:30" 
                title="全員共同前往還車" 
                description={
                  <div className="space-y-3">
                    <p>從知念岬公園出發，所有人一起前往那霸機場附近的 ABC 租車公司，先行歸還其中一台車 (車輛 A)。</p>
                    <div className="p-3 bg-secondary/5 rounded-lg border border-secondary/20">
                      <p className="text-xs font-bold text-secondary">✈️ 返台組 (搭接駁車往機場)</p>
                      <p className="text-[11px] text-on-surface-variant">趕搭 14:00 起飛的航班。建議 12:00 前抵達機場辦理登機。</p>
                    </div>
                    <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
                      <p className="text-xs font-bold text-primary">🚗 續玩組 (駕駛車輛 B)</p>
                      <p className="text-[11px] text-on-surface-variant">告別返台組後，駕駛另一台車準備前往美國村吃午餐。</p>
                    </div>
                  </div>
                }
                actionIcon={MapIcon}
                actionLabel="查看還車地圖"
                onClickAction={() => window.open('https://www.google.com/maps/search/?api=1&query=ABC+Rent+a+Car+Okinawa+Airport', '_blank')}
              />

              <div className="border-l-2 border-dashed border-outline-variant/30 ml-4 pl-6 py-2">
                <TimelineItem 
                  time="12:30" 
                  title="續玩組：北谷美國村 (午餐 & 逛街)" 
                  description={
                    <div className="space-y-2">
                      <p>美國村午餐與慢遊。感受充滿異國風情的街道，最後採買後再往北開。</p>
                      <div className="text-[11px] text-on-surface-variant">
                        <p>地址：北谷町美濱 15-69</p>
                      </div>
                    </div>
                  }
                  actionIcon={ShoppingBag}
                  actionLabel="查看美國村地圖"
                  onClickAction={() => window.open('https://www.google.com/maps/search/?api=1&query=American+Village+Okinawa', '_blank')}
                />

                <DrivingInfo distance="70 km" duration="約 1 小時 30 分鐘" />

                <TimelineItem 
                  time="15:30" 
                  title="古宇利大橋 (Kouri Bridge)" 
                  description="在前往民宿前，先去古宇利大橋欣賞Tiffany藍的清澈海色！這裡是著名的拍照打卡點，海風徐徐非常舒爽。"
                  actionIcon={MapIcon}
                  actionLabel="查看地圖"
                  onClickAction={() => window.open('https://www.google.com/maps/search/?api=1&query=Kouri+Bridge', '_blank')}
                />

                <TimelineItem 
                  type="accommodation"
                  time="16:30" 
                  title="古宇利島 Coldio 度假公寓 (入住)" 
                  description={
                    <div className="mt-3 space-y-1 text-sm text-on-surface-variant font-bold text-primary">
                      <p>Coldio Smart Resort Kouri Island</p>
                      <p className="text-[11px] font-normal">抵達古宇利島別墅入住，開始北部寧靜的海島生活。</p>
                    </div>
                  }
                  actionLabel="在 Google 地圖上查看"
                  onClickAction={() => window.open('https://www.google.com/maps/search/?api=1&query=Coldio+Smart+Resort+Kouri+Island', '_blank')}
                />

                <DrivingInfo distance="18 km" duration="約 25 分鐘" />

                <TimelineItem 
                  time="18:00" 
                  title="晚餐：百年古家 大家 (阿古豬極致饗宴)" 
                  description={
                    <div className="space-y-2">
                      <p>晚餐造訪沖繩北部超高人氣的景觀古民家餐廳「百年古家 大家」。在具備百年歷史的傳統琉球古建筑中，伴隨著清幽的日式庭園與流水瀑布，品嚐頂級奢華的『阿古豬 (Agu Pork) 涮涮鍋』或燒肉。肉質Q彈甘甜、油脂香醇，極具沖繩在地特色！</p>
                      <div className="text-[11px] text-on-surface-variant">
                        <p>地址：日本 〒905-0004 沖縄県名護市中山 90</p>
                        <p className="font-semibold text-secondary">⚠️ 提醒：餐廳極其熱門，需提前預約訂位喔！</p>
                      </div>
                    </div>
                  }
                  actionIcon={Utensils}
                  actionLabel="查看大家阿古豬地圖"
                  onClickAction={() => window.open('https://www.google.com/maps/search/?api=1&query=百年古家+大家+沖繩', '_blank')}
                />
              </div>
            </div>
          </>
        )}


        {activeDay === 5 && (
          <>
            <section className="mb-8 mt-2">
              <h2 className="text-[#005d90] text-3xl font-extrabold tracking-tighter mb-4 px-2">5/28 第六天</h2>
              <div className="flex gap-2">
                <button 
                  onClick={() => handleDayChange(4)}
                  className="flex-1 py-3 bg-surface-container-highest text-on-surface rounded-xl font-bold flex items-center justify-center gap-2 shadow-sm"
                >
                  <ArrowLeft size={18} />
                  上一天
                </button>
              </div>
            </section>

            <div className="space-y-6 relative">
              <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-surface-variant/40"></div>
              
              <TimelineItem 
                time="10:00" 
                title="辦理退房手續" 
                description="向美麗的古宇利島道別，收拾行李準備啟程。最後回顧絕美的高處海景，開車南下返程。"
                actionIcon={MapPin}
                actionLabel="周邊景點：古宇利海灘"
                onClickAction={() => window.open('https://www.google.com/maps/search/?api=1&query=Kouri+Beach', '_blank')}
              />

              <DrivingInfo distance="62 km" duration="約 55 分鐘" />

              <TimelineItem 
                time="11:00" 
                title="永旺夢樂城沖繩來客夢 (AEON MALL Okinawa Rycom) & 自由午餐" 
                description={
                  <div className="space-y-2">
                    <p>抵達沖繩最大型的旗艦購物中心！共計有五層樓、超過220家店鋪，內部更有高達100噸的巨大水族箱。大家可以在這裡盡情做最後的大採購、購買免稅藥妝、伴手禮、日系服飾。</p>
                    <p>午餐在極多選擇的美食街或美食廣場自由享用，享受豐富多樣的沖繩、日式與各國料理！</p>
                    <div className="text-[11px] text-on-surface-variant">
                      <p>地址：〒901-2306 沖縄県中頭郡北中城村ライカム 1</p>
                      <p className="font-semibold text-secondary">🛍️ 提示：可以先至諮詢櫃檯或官網領取外國遊客專屬優惠券喔！</p>
                    </div>
                  </div>
                }
                actionIcon={ShoppingBag}
                actionLabel="查看永旺夢樂城地圖"
                onClickAction={() => window.open('https://www.google.com/maps/search/?api=1&query=AEON+MALL+Okinawa+Rycom', '_blank')}
              />

              <DrivingInfo distance="23 km" duration="約 35 分鐘" />

              <TimelineItem 
                time="15:30" 
                title="ABC 租車公司 (最後還車)" 
                description={
                  <div className="space-y-2">
                    <p>將續玩組的車開至 ABC 租車公司歸還。還車前請記得先將加油站加滿油（通常建議加滿並保留收據以備查驗）。</p>
                    <div className="p-3 bg-secondary/5 rounded-lg border border-secondary/20 mt-2">
                      <p className="text-xs font-bold text-secondary">🚗 還車點：ABC 租車公司 (空港店)</p>
                      <p className="text-[11px] text-on-surface-variant">辦妥還車與驗車手續後，搭乘租車公司的免費接駁巴士前往那霸機場國際航廈。</p>
                    </div>
                  </div>
                }
                actionIcon={MapIcon}
                actionLabel="查看還車地圖"
                onClickAction={() => window.open('https://www.google.com/maps/search/?api=1&query=ABC+Rent+a+Car+Okinawa+Airport', '_blank')}
              />

              <TimelineItem 
                time="16:30" 
                title="抵達那霸機場 (搭機準備)" 
                description="辦理行李託運、領取登機證並進行出境安檢。可在免稅店進行最後的採購，隨後前往登機門準備返台（預計搭乘 19:30 起飛的虎航 IT793 班機返回台中）。"
                actionIcon={Plane}
                actionLabel="查看機場資訊"
                onClickAction={() => window.open('https://www.naha-airport.co.jp/zh-hant/', '_blank')}
              />
            </div>
            
            <div className="mt-8">
              <button 
                onClick={() => navigate('/')}
                className="w-full py-4 bg-primary text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-md hover:opacity-90 active:scale-95 transition-all"
              >
                <Home size={20} />
                返回首頁結束行程
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

function TimelineItem({ time, title, description, actionLabel, actionIcon: ActionIcon, onClickAction, type }: any) {
  const isAcc = type === 'accommodation';
  return (
    <div className="relative pl-10">
      <div className={cn(
        "absolute left-[13px] top-2 w-2.5 h-2.5 rounded-full ring-4 ring-surface",
        isAcc ? "bg-tertiary" : "bg-primary"
      )}></div>
      <div className={cn(
        "bg-surface-container-lowest rounded-xl p-4 shadow-sm border-l-4",
        isAcc ? "border-tertiary" : "border-secondary"
      )}>
        <span className={cn("font-bold text-sm", isAcc ? "text-tertiary" : "text-primary")}>{time}</span>
        <h3 className="text-xl font-bold mt-1 text-on-surface">{title}</h3>
        {typeof description === 'string' ? <p className="text-on-surface-variant text-sm mt-2">{description}</p> : description}
        {actionLabel && (
          <button 
            onClick={onClickAction}
            className="mt-4 flex items-center justify-center gap-2 w-full py-2 border border-outline-variant/30 rounded-lg text-sm font-semibold text-primary"
          >
            {ActionIcon && <ActionIcon size={16} />}
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
}

function DrivingInfo({ distance, duration }: { distance: string; duration: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="ml-14 my-4 flex items-center gap-3"
    >
      <div className="h-8 w-[2px] bg-gradient-to-b from-primary/30 to-transparent absolute left-[17px] -top-6" />
      <div className="bg-primary/5 border border-primary/10 rounded-2xl px-4 py-2 flex items-center gap-4">
        <div className="flex items-center gap-2 text-primary">
          <Car size={14} className="animate-pulse" />
          <span className="text-[11px] font-black tracking-tighter uppercase">{distance}</span>
        </div>
        <div className="w-[1px] h-3 bg-primary/20" />
        <div className="flex items-center gap-2 text-on-surface-variant">
          <Clock size={14} />
          <span className="text-[11px] font-bold">預計 {duration}</span>
        </div>
      </div>
    </motion.div>
  );
}

function TimelineSection({ icon: Icon, title, items, isFood }: any) {
  return (
    <div className="relative pl-10">
      <div className="absolute left-[13px] top-2 w-2.5 h-2.5 rounded-full bg-primary ring-4 ring-surface"></div>
      <div className="bg-surface-container-low rounded-xl p-4">
        <h3 className="text-lg font-bold text-on-surface mb-3 flex items-center gap-2">
          <Icon className={isFood ? "text-tertiary" : "text-secondary"} size={20} />
          {title}
        </h3>
        <div className="space-y-4">
          {items.map((item: any, i: number) => (
            <div key={i} className="bg-surface-container-lowest p-4 rounded-xl shadow-sm">
              <div className="flex justify-between items-start">
                <h4 className="font-bold text-primary">{item.name}</h4>
                {item.tag && <span className="bg-secondary-container/30 text-secondary text-[10px] font-bold px-2 py-0.5 rounded">{item.tag}</span>}
              </div>
              {item.sub && <p className="text-[11px] text-tertiary font-semibold">{item.sub}</p>}
              <div className="mt-3 flex justify-between items-end">
                <div className="space-y-1">
                  {item.time && (
                    <div className="flex items-center gap-1 text-[11px] font-bold text-on-surface-variant">
                      <Clock size={12} />
                      {item.time}
                    </div>
                  )}
                  {item.info && (
                    <div className="text-[10px] text-primary font-medium">
                      {item.info}
                    </div>
                  )}
                  {item.phone && (
                    <div className="flex items-center gap-1 text-[11px] font-bold text-secondary">
                      <Phone size={12} />
                      TEL: {item.phone}
                    </div>
                  )}
                </div>
                <button 
                  onClick={() => window.open(item.mapUrl, '_blank')}
                  className="text-xs font-bold text-secondary px-3 py-1 bg-secondary-fixed/20 rounded-full"
                >
                  查看地圖
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
