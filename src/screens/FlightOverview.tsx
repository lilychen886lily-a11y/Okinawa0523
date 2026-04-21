import { Home, ChevronLeft, ChevronRight, PlaneTakeoff, PlaneLanding, Lightbulb } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

export function FlightOverview() {
  const navigate = useNavigate();

  const flightGroups = [
    {
      date: 'May 23',
      day: '(Sat) - Outbound 去程',
      flights: [
        { airline: 'Peach 樂桃航空', code: 'MM924', from: 'TPE 台北', to: 'OKA 沖繩', dep: '14:50', arr: '17:35', type: 'dep' },
        { airline: 'Thai Vietjet 泰越捷', code: 'VZ568', from: 'TPE 台北', to: 'OKA 沖繩', dep: '14:55', arr: '17:20', type: 'dep' }
      ]
    },
    {
      date: 'May 27',
      day: '(Wed) - Inbound 回程',
      flights: [
        { airline: 'Tigerair 台灣虎航', code: 'IT289', from: 'OKA 沖繩', to: 'KHH 高雄', dep: '14:00', arr: '14:55', type: 'arr' },
        { airline: 'Thai Vietjet 泰越捷', code: 'VZ569', from: 'OKA 沖繩', to: 'TPE 台北', dep: '18:20', arr: '18:55', type: 'arr' }
      ]
    },
    {
      date: 'May 28',
      day: '(Thu) - Inbound 回程',
      flights: [
        { airline: 'Tigerair 台灣虎航', code: 'IT793', from: 'OKA 沖繩', to: 'RMQ 台中', dep: '19:30', arr: '20:00', type: 'arr' }
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
        {flightGroups.map((group, idx) => (
          <section key={idx}>
            <div className="flex items-baseline gap-4 mb-6">
              <h2 className="text-4xl font-extrabold tracking-tighter text-on-surface">{group.date}</h2>
              <span className="text-on-surface-variant font-medium">{group.day}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {group.flights.map((flight, fIdx) => (
                <div 
                  key={fIdx}
                  onClick={() => navigate(`/flights/${flight.code}`)}
                  className="relative group cursor-pointer bg-surface-container-lowest p-6 rounded-lg shadow-sm border-l-4 border-secondary-container hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-primary font-bold text-sm">{flight.airline} {flight.code}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-2xl font-bold">{flight.dep}</span>
                        {flight.type === 'dep' ? <PlaneTakeoff className="text-outline-variant" size={20} /> : <PlaneLanding className="text-outline-variant" size={20} />}
                        <span className="text-2xl font-bold">{flight.arr}</span>
                      </div>
                      <p className="text-xs text-on-surface-variant mt-1">{flight.from} → {flight.to}</p>
                    </div>
                    <ChevronRight className="text-primary group-hover:translate-x-1 transition-transform" size={20} />
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <section className="mt-16 bg-surface-container-low rounded-xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <Lightbulb className="text-tertiary fill-tertiary" size={20} />
          <h3 className="text-xl font-bold text-on-surface">旅遊提示 Travel Tips</h3>
        </div>
        <ul className="space-y-4">
          <li className="flex gap-4 items-start">
            <div className="w-1.5 h-1.5 rounded-full bg-tertiary mt-2 shrink-0"></div>
            <p className="text-on-surface-variant leading-relaxed text-sm">
              搭乘 <span className="font-bold text-on-surface">Thai Vietjet (泰越捷)</span> 的旅客，請務必於起飛前 <span className="font-bold text-tertiary">3 小時</span> 到達機場辦理登機手續。
            </p>
          </li>
          <li className="flex gap-4 items-start">
            <div className="w-1.5 h-1.5 rounded-full bg-tertiary mt-2 shrink-0"></div>
            <p className="text-on-surface-variant leading-relaxed text-sm">
              請確認您的護照效期在回程當日仍有 <span className="font-bold text-on-surface">6 個月以上</span> 的有效期。
            </p>
          </li>
        </ul>
      </section>
    </div>
  );
}
