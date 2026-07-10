import { Home, Map as MapIcon, Phone, Clock, ShoppingBag, Utensils, Train, CalendarDays, Globe, Camera, Compass, Car, ArrowLeft, MapPin, Plane, Heart, AlertCircle } from 'lucide-react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

export function Itinerary() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeDay = parseInt(searchParams.get('day') || '0');

  const days = ['Day 01', 'Day 02', 'Day 03', 'Day 04', 'Day 05'];

  const handleDayChange = (index: number) => {
    setSearchParams({ day: index.toString() });
  };

  return (
    <div className="pb-44">
      <div className="sticky top-16 z-40 bg-surface/95 backdrop-blur shadow-sm border-b border-outline-variant/20">
        <div className="flex overflow-x-auto no-scrollbar py-3 px-4 gap-3 justify-center">
          {days.map((day, i) => (
            <button
              key={day}
              onClick={() => handleDayChange(i)}
              className={cn(
                "flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-bold transition-all",
                activeDay === i ? "bg-primary text-white shadow-sm" : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest"
              )}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      <main className="px-4 max-w-md mx-auto pt-4">
        {/* Day 1 */}
        {activeDay === 0 && (
          <>
            <section className="mb-8 mt-2">
              <span className="text-[10px] bg-primary/10 text-primary px-3 py-1 rounded-full font-bold uppercase tracking-wider">Historical & Cultural</span>
              <h2 className="text-[#005d90] text-3xl font-extrabold tracking-tighter mt-2 mb-4 px-2">7/28 第一天：老城文脈與三江風情</h2>
              <button 
                onClick={() => navigate('/')}
                className="w-full py-4 bg-primary text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-md hover:opacity-90 active:scale-95 transition-all"
              >
                <Home size={20} />
                返回首頁 Dashboard
              </button>
            </section>

            <div className="space-y-6 relative">
              <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-surface-variant/40"></div>
              
              <TimelineItem 
                time="18:35 - 20:45" 
                title="抵達寧波 (搭乘春秋航空 9C8686)" 
                description="由高雄直飛寧波，順利抵達寧波櫟社國際機場！下機後建議搭乘快捷的寧波地鐵 2 號線直達市中心三江口，避開高架擁堵，安全又環保。"
                actionLabel="查看交通票務"
                actionIcon={Plane}
                onClickAction={() => navigate('/flights')}
              />

              <DrivingInfo distance="15 km" duration="約 25 分鐘 (地鐵 Line 2)" />

              <TimelineItem 
                type="accommodation"
                time="21:30" 
                title="辦理入住：寧波天一城隍廟漫心府" 
                description={
                  <div className="space-y-2">
                    <p>辦理 Check-in 並放妥行李。酒店緊鄰城隍廟與天一廣場，充滿極具韻味的中式府邸設計，地理位置優越，周邊美食林立，非常便利。</p>
                    <div className="mt-3 space-y-1 text-xs text-on-surface-variant">
                      <p className="flex items-start gap-2"><MapPin size={14} className="mt-1 shrink-0" />寧波市海曙區（城隍廟/天一廣場商圈）</p>
                      <p className="flex items-center gap-2"><Phone size={14} />0574-87366666</p>
                    </div>
                  </div>
                }
                actionLabel="查看酒店地圖位置"
                actionIcon={MapIcon}
                onClickAction={() => window.open('https://uri.amap.com/marker?position=121.551221,29.871145&name=宁波天一城隍庙漫心府', '_blank')}
              />

              <TimelineItem 
                time="21:45 - 23:00" 
                title="夜遊老外灘 & 江畔宵夜美食" 
                description="老外灘開埠比上海早20年，保存了英法風格的歐式老建築。下機辦理入住後，散步至江邊吹著晚風，小酌一杯或來碗熱騰騰的本地海鮮麵，感受開埠古港的歷史底蘊與時尚活力！"
                actionIcon={Globe}
              />
            </div>
          </>
        )}

        {/* Day 2 */}
        {activeDay === 1 && (
          <>
            <section className="mb-8 mt-2">
              <span className="text-[10px] bg-primary/10 text-primary px-3 py-1 rounded-full font-bold uppercase tracking-wider">Nature & Modern Art</span>
              <h2 className="text-[#005d90] text-3xl font-extrabold tracking-tighter mt-2 mb-4 px-2">7/29 第二天：東錢湖畔與韓嶺藝術</h2>
              <button 
                onClick={() => navigate('/')}
                className="w-full py-4 bg-primary text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-md hover:opacity-90 active:scale-95 transition-all"
              >
                <Home size={20} />
                返回首頁 Dashboard
              </button>
            </section>

            <div className="space-y-6 relative">
              <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-surface-variant/40"></div>

              <TimelineItem 
                time="09:30 - 11:30" 
                title="寧波博物館 (Ningbo Museum)" 
                description="由建築大師王澍設計，榮獲普利茲克建築獎。建築外牆由瓦爿牆（舊青磚舊瓦片）建成，充分展示了江南拆遷歷史的建築美感，是了解寧波海洋民俗的絕佳窗口。"
                actionIcon={Camera}
                actionLabel="查看寧波博物館導航"
                onClickAction={() => window.open('https://uri.amap.com/marker?position=121.543419,29.807891&name=宁波博物馆', '_blank')}
              />

              <DrivingInfo distance="16 km" duration="約 30 分鐘 (打車/租車前往東錢湖)" />

              <TimelineItem 
                time="12:00 - 13:30" 
                title="午餐：錢湖漁港「特色湖鮮」" 
                description="東錢湖特產「錢湖之吻」（鮮美小螺螄）、清蒸湖蝦、砂鍋燉魚頭。一邊欣賞湖景，一邊大快朵頤，體驗絕妙美味。"
                actionIcon={Utensils}
              />

              <TimelineItem 
                time="13:30 - 15:30" 
                title="東錢湖風景區 (Dongqian Lake) 騎行" 
                description="面積為西湖的四倍，是浙江最大的天然淡水湖。群山合抱，湖水瀲灩，沿著湖心景區彩色自行車道騎行，看水天一色，無比心曠神怡。"
                actionIcon={Compass}
              />

              <TimelineItem 
                time="15:30 - 18:00" 
                title="韓嶺老街 (Hanling) & 美術館" 
                description="千年歷史的古老漁村，完整保留了水鄉河街格局。小橋流水、老街瓦舍，隈研吾大師設計的「韓嶺美術館」矗立於此，文藝範十足。"
                actionIcon={Camera}
                actionLabel="查看韓嶺老街地圖"
                onClickAction={() => window.open('https://uri.amap.com/marker?position=121.642918,29.774581&name=韩岭老街', '_blank')}
              />

              <TimelineItem 
                type="accommodation"
                time="18:30" 
                title="返回市中心：續住寧波天一城隍廟漫心府" 
                description="結束東錢湖的精彩活動後，乘車返回市中心。今晚繼續入住漫心府，您可以漫步天一廣場、吃一碗傳統熱呼呼的寧波湯糰，享受寧靜而富有煙火氣的老城之夜。"
                actionIcon={MapIcon}
                actionLabel="查看酒店地圖"
                onClickAction={() => window.open('https://uri.amap.com/marker?position=121.551221,29.871145&name=宁波天一城隍庙漫心府', '_blank')}
              />
            </div>
          </>
        )}

        {/* Day 3 */}
        {activeDay === 2 && (
          <>
            <section className="mb-8 mt-2">
              <span className="text-[10px] bg-primary/10 text-primary px-3 py-1 rounded-full font-bold uppercase tracking-wider">Mountains & Zen Forest</span>
              <h2 className="text-[#005d90] text-3xl font-extrabold tracking-tighter mt-2 mb-4 px-2">7/30 第三天：奉化溪口與雪竇仙境</h2>
              <button 
                onClick={() => navigate('/')}
                className="w-full py-4 bg-primary text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-md hover:opacity-90 active:scale-95 transition-all"
              >
                <Home size={20} />
                返回首頁 Dashboard
              </button>
            </section>

            <div className="space-y-6 relative">
              <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-surface-variant/40"></div>

              <TimelineItem 
                time="08:30 - 11:30" 
                title="溪口蔣氏故居 (Xikou Town)" 
                description="奉化溪口是蔣介石與蔣經國父子的故鄉，保留了豐鎬房、玉泰鹽鋪、武嶺門等民國風情老街與宅邸。剡溪水清，群山疊翠，民國風雲的歷史在此沉澱。"
                actionIcon={Compass}
                actionLabel="查看溪口鎮導航"
                onClickAction={() => window.open('https://uri.amap.com/marker?position=121.272189,29.684281&name=溪口风景区', '_blank')}
              />

              <TimelineItem 
                time="11:30 - 13:00" 
                title="午餐：溪口農家菜 & 千層餅" 
                description="品嚐奉化溪口非遺「千層餅」，口感香酥，帶有獨特海苔香。午餐享用經典的奉化雷筍燒肉、溪口土雞煲等淳樸美味的農家菜。"
                actionIcon={Utensils}
              />

              <TimelineItem 
                time="13:00 - 16:30" 
                title="雪竇山景區 (Xuedou Mountain)" 
                description="中國佛教五大名山之一，彌勒菩薩道場。遊覽極其震撼的「雪竇大佛」、巍峨的千丈岩瀑布，以及蔣公曾下榻的「妙高台」，俯瞰亭下湖的萬頃碧波，洗滌心靈。"
                actionIcon={Camera}
              />

              <DrivingInfo distance="52 km" duration="約 1 小時 (前往東錢湖度假區)" />

              <TimelineItem 
                type="accommodation"
                time="17:45 - 18:30" 
                title="辦理入住：寧波花間堂·韓嶺" 
                description={
                  <div className="space-y-2">
                    <p>辦理 Check-in 並入住「閭巷人家雙床房」，將行李安放妥當。客房將江南古村落韻味與精緻度假美學完美結合，推窗即看小橋流水，充滿悠閒與文藝氣息。</p>
                    <div className="mt-3 space-y-1 text-xs text-on-surface-variant">
                      <p className="flex items-start gap-2"><MapPin size={14} className="mt-1 shrink-0" />寧波市東錢湖旅遊度假區韓嶺老街內</p>
                      <p className="flex items-center gap-2"><Phone size={14} />0574-88301111</p>
                    </div>
                  </div>
                }
                actionIcon={MapIcon}
                actionLabel="查看酒店地圖位置"
                onClickAction={() => window.open('https://uri.amap.com/marker?position=121.642918,29.774581&name=宁波花间堂·韩岭', '_blank')}
              />

              <TimelineItem 
                time="18:30 - 21:00" 
                title="晚餐：韓嶺水鄉湖鮮宴 & 漫步古街" 
                description="在古樸的韓嶺老街內散步賞夜景，在臨水餐廳品嚐東錢湖特產「錢湖之吻」（鮮美螺螄）與清蒸湖蝦、雪菜燉豆腐。伴著水鄉晚風，小酌一杯，享受無比安逸的避世假期。"
                actionIcon={Utensils}
              />
            </div>
          </>
        )}

        {/* Day 4 */}
        {activeDay === 3 && (
          <>
            <section className="mb-8 mt-2">
              <span className="text-[10px] bg-primary/10 text-primary px-3 py-1 rounded-full font-bold uppercase tracking-wider">Zen & Historic Ancient Town</span>
              <h2 className="text-[#005d90] text-3xl font-extrabold tracking-tighter mt-2 mb-4 px-2">7/31 第四天：宋代木構古建與古縣印記</h2>
              <button 
                onClick={() => navigate('/')}
                className="w-full py-4 bg-primary text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-md hover:opacity-90 active:scale-95 transition-all"
              >
                <Home size={20} />
                返回首頁 Dashboard
              </button>
            </section>

            <div className="space-y-6 relative">
              <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-surface-variant/40"></div>

              <TimelineItem 
                time="09:30 - 11:30" 
                title="保國寺古建築博物館 (Baoguo Temple)" 
                description="重建於北宋大中祥符六年（1013年）的大殿，是中國南方最古老的木結構傑作。殿宇不用一釘，全靠斗拱榫卯相扣。奇妙的是大殿常年「無樑、無塵、無鳥鵲築巢、無蜘蛛結網」，堪稱神蹟。"
                actionIcon={Camera}
                actionLabel="查看保國寺位置"
                onClickAction={() => window.open('https://uri.amap.com/marker?position=121.528345,29.981298&name=保国寺古建筑博物馆', '_blank')}
              />

              <DrivingInfo distance="12 km" duration="約 20 分鐘" />

              <TimelineItem 
                time="11:45 - 14:30" 
                title="慈城古縣城 & 手工年糕宴" 
                description="慈城是江南保存最完美的古縣城，保留了唐代「雙棋盤」城市格局。午餐品嚐慈城非遺「手工水磨年糕」，軟糯香滑、無比Q彈，可甜可鹹，是來寧波絕對不可錯過的美味！"
                actionIcon={Utensils}
                actionLabel="查看慈城古縣城導航"
                onClickAction={() => window.open('https://uri.amap.com/marker?position=121.442918,29.978512&name=慈城古县城', '_blank')}
              />

              <DrivingInfo distance="18 km" duration="約 25 分鐘 (返回寧波市中心)" />

              <TimelineItem 
                time="14:30 - 16:30" 
                title="天一閣古籍藏書樓 (Tianyi Pavilion)" 
                description="亞洲現存最古老的私家藏書樓。閣內園林極具典型的浙東風情，白牆黛瓦、老竹影動、碑廊幽深，更能在此探索麻將文化的趣味起源。"
                actionIcon={Camera}
                actionLabel="查看天一閣導航"
                onClickAction={() => window.open('https://uri.amap.com/marker?position=121.536128,29.873289&name=天一阁博物馆', '_blank')}
              />

              <TimelineItem 
                time="16:30 - 18:00" 
                title="漫步月湖公園 (Moon Lake)" 
                description="與天一閣一街之隔。湖光瀲狩，古橋垂柳，微風拂面，是古人寄情山水、文人吟詩作畫的絕佳休閒景緻，非常適合午後漫步。"
                actionIcon={Compass}
              />

              <TimelineItem 
                type="accommodation"
                time="18:30 - 19:15" 
                title="辦理入住：寧波英迪格酒店 (Ningbo Hotel Indigo)" 
                description={
                  <div className="space-y-2">
                    <p>辦理 Check-in 並入住使用 IHG 積分兌換的「2 Double Standard (雙床標準客房)」，放妥行李。酒店位於東部新城，設計融入了鄰里航海風情與甬商文化，充滿前衛的科技感與精妙時尚美學。</p>
                    <div className="mt-3 space-y-1 text-xs text-on-surface-variant">
                      <p className="flex items-start gap-2"><MapPin size={14} className="mt-1 shrink-0" />寧波市鄞州區寧東路 545 號</p>
                      <p className="flex items-center gap-2"><Phone size={14} />0574-89089999</p>
                    </div>
                  </div>
                }
                actionIcon={MapIcon}
                actionLabel="查看酒店地圖位置"
                onClickAction={() => window.open('https://uri.amap.com/marker?position=121.618641,29.863112&name=宁波英迪格酒店', '_blank')}
              />

              <TimelineItem 
                time="19:30 - 21:30" 
                title="精緻晚餐：東部新城時尚美食或老字號「狀元樓」本幫菜" 
                description="在臨近的阪急百貨或東部新城商圈享用精緻晚餐。或前往老字號「狀元樓」本幫菜，品嚐招牌冰糖甲魚、腐皮包黃魚，為這趟富有人文古建、水鄉湖景的寧波假期，畫上最完美舒適的句點！"
                actionIcon={Utensils}
              />
            </div>
          </>
        )}

        {/* Day 5 */}
        {activeDay === 4 && (
          <>
            <section className="mb-8 mt-2">
              <span className="text-[10px] bg-primary/10 text-primary px-3 py-1 rounded-full font-bold uppercase tracking-wider">Local Food & Souvenirs</span>
              <h2 className="text-[#005d90] text-3xl font-extrabold tracking-tighter mt-2 mb-4 px-2">8/1 第五天：老街採買、精緻湯糰與愉快歸途</h2>
              <button 
                onClick={() => navigate('/')}
                className="w-full py-4 bg-primary text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-md hover:opacity-90 active:scale-95 transition-all"
              >
                <Home size={20} />
                返回首頁 Dashboard
              </button>
            </section>

            <div className="space-y-6 relative">
              <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-surface-variant/40"></div>

              <TimelineItem 
                time="09:30 - 11:30" 
                title="漫步「南塘老街」歷史街區" 
                description="最後一天睡到自然醒，辦理退房寄放行李後直奔南塘老街。這裡是採買寧波特產伴手禮的好去處：慈城水磨年糕、趙大有綠豆糕、千層餅，送禮自用兩相宜！"
                actionIcon={ShoppingBag}
                actionLabel="查看南塘老街導航"
                onClickAction={() => window.open('https://uri.amap.com/marker?position=121.545891,29.858912&name=南塘老街', '_blank')}
              />

              <TimelineItem 
                time="11:30 - 13:00" 
                title="非遺午餐：百年老店「缸鴨狗」" 
                description="在缸鴨狗品嚐正宗桂花芝麻湯糰、漿板圓子與特色鴨狗醬鴨。糯米香甜軟糯、芝麻油潤，完美體現了「寧波湯糰」傳世百年的溫潤與甜美。"
                actionIcon={Utensils}
                actionLabel="查看缸鴨狗介紹"
                onClickAction={() => window.open('https://maps.google.com/?q=宁波缸鸭狗', '_blank')}
              />

              <DrivingInfo distance="14 km" duration="約 25 分鐘 (搭乘地鐵 2 號線直達機場)" />

              <TimelineItem 
                time="15:30 - 17:40" 
                title="啟程返程：春秋航空 9C8685 回高雄" 
                description="抵達寧波櫟社國際機場，辦理值機託運與出境手續。搭乘 9C8685 航班返回高雄小港國際機場，滿載著豐富的江南木構古建、天一閣墨香與美味海鮮回憶，踏上溫馨的歸途！"
                actionIcon={Plane}
                actionLabel="查看回程票務詳情"
                onClickAction={() => navigate('/flights')}
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
        <h3 className="text-xl font-bold mt-1 text-on-surface leading-tight">{title}</h3>
        {typeof description === 'string' ? <p className="text-on-surface-variant text-sm mt-2 leading-relaxed">{description}</p> : description}
        {actionLabel && (
          <button 
            onClick={onClickAction}
            className="mt-4 flex items-center justify-center gap-2 w-full py-2.5 border border-outline-variant/30 rounded-lg text-sm font-bold text-primary hover:bg-primary/5 active:scale-95 transition-all"
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
      className="ml-14 my-4 flex items-center gap-3 relative"
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
