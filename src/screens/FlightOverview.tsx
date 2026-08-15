import { Home, ChevronLeft, ChevronRight, PlaneTakeoff, Lightbulb, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function FlightOverview() {
  const navigate = useNavigate();

  const transitGroups = [
    {
      category: '🛫 出發國際航班 (分批啟程)',
      date: '09月27日 (日) - 第一批出發 (長榮航空直飛米蘭)',
      transits: [
        { 
          carrier: '長榮航空 EVA AIRWAYS', 
          code: 'BR95', 
          from: '台北桃園 TPE (T2)', 
          to: '米蘭馬爾彭薩 MXP (T1)', 
          dep: '23:45 (9/27)', 
          arr: '07:35 (9/28)', 
          type: 'flight',
          passengers: '第一批：小許、春香 (CHANG/CHUNHSIANG MS)、麗安 (共3人)',
          badge: 'ANA 開票 / 訂位代號: FRJML3'
        }
      ]
    },
    {
      category: '🛫 出發國際航班 (分批啟程)',
      date: '10月05日 (一) ~ 10月06日 (二) - 第二批出發 (卡達聯程 / 高雄出發)',
      transits: [
        { 
          carrier: '國泰航空 CATHAY PACIFIC', 
          code: 'CX423', 
          from: '高雄小港 KHH (航廈 I)', 
          to: '香港國際機場 HKG (T1)', 
          dep: '13:40 (10/05)', 
          arr: '15:25 (10/05)', 
          type: 'flight',
          passengers: '第二批：頭家娘 (WU HSIUPI)、小花 (共2人)',
          badge: '已開票 (訂位: DFDT27 / 9BS2DV)'
        },
        { 
          carrier: '卡達航空 QATAR AIRWAYS', 
          code: 'QR817', 
          from: '香港國際機場 HKG (T1)', 
          to: '杜哈哈馬德 DOH', 
          dep: '19:40 (10/05)', 
          arr: '23:05 (10/05)', 
          type: 'flight',
          passengers: '第二批：小花、頭家娘',
          badge: '中轉 3h05m'
        },
        { 
          carrier: '卡達航空 QATAR AIRWAYS', 
          code: 'QR215', 
          from: '杜哈哈馬德 DOH', 
          to: '薩格勒布 ZAG (克羅埃西亞)', 
          dep: '02:10 (10/06)', 
          arr: '06:55 (10/06)', 
          type: 'flight',
          passengers: '第二批：小花、頭家娘',
          badge: '🇭🇷 抵達克國 5 人大會合'
        }
      ]
    },
    {
      category: '✈️ 歐洲區域航班 (克國直飛義大利)',
      date: '10月21日 (三) - 瑞安航空直飛米蘭 (全員 5 人同行)',
      transits: [
        { 
          carrier: '瑞安航空 RYANAIR (直飛)', 
          code: 'FR5935', 
          from: '杜布羅夫尼克 DBV', 
          to: '米蘭貝爾加莫 BGY', 
          dep: '14:25 (10/21)', 
          arr: '16:00 (10/21)', 
          type: 'flight',
          passengers: '團隊全員 5 人 (小花、春香、小許、麗安、頭家娘)',
          badge: 'CONFIRMED (訂位: V64LYT / XYCEMH)'
        }
      ]
    },
    {
      category: '🛬 返程國際航班 (回國航段)',
      date: '10月23日 (五) ~ 10月24日 (六) - 阿提哈德航空 (米蘭 ✈ 阿布達比 ✈ 台北)',
      transits: [
        { 
          carrier: '阿提哈德航空 ETIHAD AIRWAYS', 
          code: 'EY82', 
          from: '米蘭馬爾彭薩 MXP (T1)', 
          to: '阿布達比扎耶德 AUH (航廈 A)', 
          dep: '11:40 (10/23)', 
          arr: '19:40 (10/23)', 
          type: 'flight',
          passengers: '頭家娘 (商務艙 06A)；小許、春香、麗安 (經濟艙)',
          badge: '已開票 (訂位: 9C3DNV / EHYP25 / EICOKU / EI6U7S)'
        },
        { 
          carrier: '阿提哈德航空 ETIHAD AIRWAYS', 
          code: 'EY898', 
          from: '阿布達比扎耶德 AUH (航廈 A)', 
          to: '台北桃園 TPE (T2)', 
          dep: '21:20 (10/23)', 
          arr: '10:00 (10/24 次日)', 
          type: 'flight',
          passengers: '頭家娘 (商務艙 06D)；小許、春香、麗安 (經濟艙)',
          badge: '10/24 10:00 圓滿返抵台北'
        }
      ]
    }
  ];

  return (
    <div className="mt-20 px-4 pb-44 max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-primary font-black text-xs uppercase tracking-widest block">🇮🇹🇭🇷 航班機票資訊</span>
          <h1 className="text-2xl font-black text-on-surface tracking-tight">國際與歐洲區域航班</h1>
        </div>
        <button 
          onClick={() => navigate('/')}
          className="p-2.5 rounded-2xl bg-surface-container-lowest border border-outline-variant/10 shadow-sm hover:bg-surface-container-low transition-colors"
        >
          <Home size={18} className="text-on-surface" />
        </button>
      </div>

      <div className="space-y-6">
        {transitGroups.map((group, idx) => (
          <section key={idx} className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-black px-2.5 py-1 rounded-lg bg-primary/10 text-primary">
                {group.category}
              </span>
              <h2 className="text-xs font-extrabold tracking-tight text-on-surface-variant">
                {group.date}
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {group.transits.map((item, fIdx) => (
                <div 
                  key={fIdx}
                  onClick={() => navigate(`/flights/${item.code}`)}
                  className="relative group cursor-pointer bg-surface-container-lowest p-5 rounded-2xl shadow-sm border border-outline-variant/10 hover:border-primary/30 transition-all border-l-4 border-l-primary"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-primary font-black text-xs flex items-center gap-1.5 uppercase tracking-wider">
                        <PlaneTakeoff size={14} />
                        {item.carrier} {item.code}
                      </p>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-2xl font-black text-on-surface">{item.dep}</span>
                        <span className="text-outline text-xs font-bold">➜</span>
                        <span className="text-2xl font-black text-on-surface">{item.arr}</span>
                      </div>
                      <p className="text-xs text-on-surface-variant font-bold mt-1">{item.from} → {item.to}</p>
                      {item.passengers && (
                        <div className="mt-2.5 flex items-center gap-1.5 text-[11px] font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-lg w-fit">
                          <span>搭乘成員：{item.passengers}</span>
                        </div>
                      )}
                    </div>
                    <ChevronRight className="text-primary group-hover:translate-x-1 transition-transform mt-1" size={20} />
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <section className="bg-surface-container-lowest rounded-3xl p-5 border border-outline-variant/10 shadow-sm space-y-3">
        <div className="flex items-center gap-2">
          <Lightbulb className="text-amber-500" size={20} />
          <h3 className="text-base font-extrabold text-on-surface">搭機與行李通關須知</h3>
        </div>
        <ul className="space-y-2 text-xs text-on-surface-variant leading-relaxed font-medium">
          <li className="flex gap-2 items-start">
            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0"></span>
            <span><strong className="text-on-surface">申根區域免簽：</strong>持台灣護照享 90 天申根免簽。護照需有 6 個月以上效期。</span>
          </li>
          <li className="flex gap-2 items-start">
            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0"></span>
            <span><strong className="text-on-surface">托運行李限額：</strong>國際長程線通常含 2 件 23kg 托運行李；歐洲區域線請確認機票是否含託運。</span>
          </li>
          <li className="flex gap-2 items-start">
            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0"></span>
            <span><strong className="text-on-surface">退稅蓋章 (Tax Free)：</strong>米蘭馬爾彭薩機場 (MXP) 辦理退稅時，託運行李退稅單需在 Check-in 前向海關出示退稅商品！</span>
          </li>
        </ul>
      </section>
    </div>
  );
}
