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
                time="18:00" 
                title="小祿站周邊活動" 
                description="逛 AEON Mall Naha、大國藥妝或品嚐通堂拉麵"
              />

              <TimelineItem 
                time="19:30" 
                title="搭乘電車前往安里站" 
                description="從小祿站搭乘單軌電車 (Yui Rail) 前往榮町市場探險"
              />

              <TimelineItem 
                type="accommodation"
                time="辦理入住" 
                title="Y's Inn Naha Oroku Ekimae" 
                description={
                  <div className="mt-3 space-y-1 text-sm text-on-surface-variant">
                    <p className="flex items-start gap-2"><MapIcon size={14} className="mt-1" />1 Chome-1-10 Kanagusuku, Naha, Okinawa 901-0155</p>
                    <p className="flex items-center gap-2"><Phone size={14} />+81 98-857-1110</p>
                  </div>
                }
                actionLabel="在 Google 地圖上查看"
                onClickAction={() => window.open('https://maps.google.com/?q=Y\'s+Inn+Naha+Oroku+Ekimae', '_blank')}
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

              <DrivingInfo distance="17.5 km" duration="約 35 分鐘" />

              <TimelineItem 
                time="12:30" 
                title="AEON MALL Okinawa Rycom (逛街 & 午餐)" 
                description="享受沖繩最大商場的冷氣、美食街與購物，可以在這裡舒舒服服待上幾個小時。"
                actionIcon={ShoppingBag}
                actionLabel="查看地圖"
                onClickAction={() => window.open('https://www.google.com/maps/search/?api=1&query=AEON+Mall+Okinawa+Rycom', '_blank')}
              />

              <TimelineItem 
                time="15:30" 
                title="次郎鮮魚店 (Jiro Fish Market) - 買炸物" 
                description={
                  <div className="space-y-2">
                    <p>依照您的順序，從商場離開後前來購買熱騰騰的天婦羅。備註：需往北稍微回頭開回讀谷村漁港區域。</p>
                    <div className="text-[11px] text-on-surface-variant">
                      <p>地址：讀谷村都屋 33</p>
                    </div>
                  </div>
                }
                actionIcon={Utensils}
                actionLabel="查看地圖"
                onClickAction={() => window.open('https://www.google.com/maps/search/?api=1&query=次郎鮮魚店+読谷村', '_blank')}
              />

              <DrivingInfo distance="45 km" duration="約 1 小時 10 分鐘" />

              <TimelineItem 
                type="accommodation"
                time="18:30" 
                title="南城市水晶別墅 (入住)" 
                description={
                  <div className="mt-3 space-y-1 text-sm text-on-surface-variant font-bold text-primary">
                    <p>Crystal Villa Nanjo</p>
                    <p className="text-xs font-normal">結束一天的採買，回別墅放鬆聚會！</p>
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
                description="向美麗的古宇利島道別，收拾行李準備啟程。可以在附近吃夏威夷蝦蝦飯或稍作停留。"
                actionIcon={MapPin}
                actionLabel="周邊景點：古宇利海灘"
                onClickAction={() => window.open('https://www.google.com/maps/search/?api=1&query=Kouri+Beach', '_blank')}
              />

              <DrivingInfo distance="85 km" duration="約 1 小時 30 分鐘" />

              <TimelineItem 
                time="11:30" 
                title="返回那霸與午餐" 
                description="駕車返回那霸市區，可在機場附近或市區享用沖繩最後的午餐。"
              />

              <DrivingInfo distance="10 km" duration="約 20 分鐘" />

              <TimelineItem 
                time="13:30" 
                title="ABC 租車公司 (最後還車)" 
                description={
                  <div className="space-y-2">
                    <p>將續玩組的車開至 ABC 租車公司歸還。還車前請記得先將油箱加滿。</p>
                    <div className="p-3 bg-secondary/5 rounded-lg border border-secondary/20 mt-2">
                      <p className="text-xs font-bold text-secondary">🚗 還車點：ABC 租車公司 (空港店)</p>
                      <p className="text-[11px] text-on-surface-variant">還車後搭乘免費接駁車前往那霸機場準備搭機。</p>
                    </div>
                  </div>
                }
                actionIcon={MapIcon}
                actionLabel="查看還車地圖"
                onClickAction={() => window.open('https://www.google.com/maps/search/?api=1&query=ABC+Rent+a+Car+Okinawa+Airport', '_blank')}
              />

              <TimelineItem 
                time="14:30" 
                title="抵達那霸機場 (踏上歸途)" 
                description="辦理登機與行李託運手續，在免稅店做最後採買，帶著滿滿的回憶準備登機返台。"
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
