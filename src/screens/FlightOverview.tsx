import { Home, ChevronLeft, ChevronRight, PlaneTakeoff, PlaneLanding, Lightbulb, Train } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

export function FlightOverview() {
  const navigate = useNavigate();

  const transitGroups = [
    {
      date: '7月28日',
      day: '（週二） - 去程',
      transits: [
        { carrier: '春秋航空', code: '9C8686', from: '高雄小港', to: '寧波櫟社', dep: '18:35', arr: '20:45', type: 'flight' }
      ]
    },
    {
      date: '8月1日',
      day: '（週六） - 回程',
      transits: [
        { carrier: '春秋航空', code: '9C8685', from: '寧波櫟社', to: '高雄小港', dep: '15:30', arr: '17:40', type: 'flight' }
      ]
    }
  ];

  return (
    <div className="pt-20 px-6 pb-44 max-w-4xl mx-auto">
      <div className="mb-8">
        <button 
          onClick={() => navigate('/')}
          className="w-full md:w-auto flex items-center justify-center gap-3 bg-primary text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg active:scale-95 transition-transform"
        >
          <Home size={20} fill="currentColor" />
          返回首頁
        </button>
      </div>

      <div className="space-y-12">
        {transitGroups.map((group, idx) => (
          <section key={idx}>
            <div className="flex items-baseline gap-4 mb-6">
              <h2 className="text-4xl font-extrabold tracking-tighter text-on-surface">{group.date}</h2>
              <span className="text-on-surface-variant font-medium text-sm">{group.day}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {group.transits.map((item, fIdx) => (
                <div 
                  key={fIdx}
                  onClick={() => navigate(`/flights/${item.code}`)}
                  className="relative group cursor-pointer bg-surface-container-lowest p-6 rounded-2xl shadow-sm border-l-4 border-primary hover:shadow-md transition-shadow border border-outline-variant/10"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-primary font-bold text-sm flex items-center gap-1.5">
                        {item.type === 'flight' ? <PlaneTakeoff size={14} /> : <Train size={14} />}
                        {item.carrier} {item.code}
                      </p>
                      <div className="flex items-center gap-3 mt-3">
                        <span className="text-2xl font-bold text-on-surface">{item.dep}</span>
                        <span className="text-outline-variant text-sm">➜</span>
                        <span className="text-2xl font-bold text-on-surface">{item.arr}</span>
                      </div>
                      <p className="text-xs text-on-surface-variant font-medium mt-1.5">{item.from} → {item.to}</p>
                    </div>
                    <ChevronRight className="text-primary group-hover:translate-x-1 transition-transform mt-1" size={20} />
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <section className="mt-16 bg-surface-container-low rounded-2xl p-8 border border-outline-variant/10">
        <div className="flex items-center gap-3 mb-6">
          <Lightbulb className="text-amber-500 fill-amber-500/20" size={22} />
          <h3 className="text-xl font-bold text-on-surface">交通與出入境指南</h3>
        </div>
        <ul className="space-y-4">
          <li className="flex gap-4 items-start">
            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0"></div>
            <p className="text-on-surface-variant leading-relaxed text-sm">
              <span className="font-bold text-on-surface">出入境證件：</span>港澳台旅客請務必確認 <span className="font-bold text-primary">台胞證 / 回鄉證</span> 在有效期限內；外籍遊客請持有效護照和中國簽證（或適用免簽政策）。
            </p>
          </li>
          <li className="flex gap-4 items-start">
            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0"></div>
            <p className="text-on-surface-variant leading-relaxed text-sm">
              <span className="font-bold text-on-surface">高鐵實名制：</span>高鐵動車票全部為電子客票。出站、進站時直接刷預訂時填寫的 <span className="font-bold text-primary">身份證件原件</span>（如台胞證、身份證、回鄉證），無需換取紙質票。
            </p>
          </li>
          <li className="flex gap-4 items-start">
            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0"></div>
            <p className="text-on-surface-variant leading-relaxed text-sm">
              <span className="font-bold text-on-surface">航班值機時間：</span>國際航班建議提前 <span className="font-bold text-primary">2.5 - 3 小時</span> 到達機場辦理值機；高鐵提早 <span className="font-bold text-primary">45 分鐘</span> 到達車站候車即可。
            </p>
          </li>
        </ul>
      </section>
    </div>
  );
}
