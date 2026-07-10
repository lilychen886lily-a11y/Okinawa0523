import { Home, ChevronLeft, Plane, Luggage, User, Info, MoreVertical, Train } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

export function FlightDetails() {
  const navigate = useNavigate();
  const { code } = useParams();

  const is9C8686 = code === '9C8686';
  const is9C8685 = code === '9C8685';
  const isMU5482 = code === 'MU5482';
  const isMU5481 = code === 'MU5481';
  const isG7501 = code === 'G7501';
  const isG7516 = code === 'G7516';

  let carrierName = '';
  let subText = '';
  let depTime = '';
  let arrTime = '';
  let dateText = '7月28日';
  let daySub = 'TUESDAY, JULY 2026';
  let fromCode = 'KHH';
  let fromName = '高雄小港';
  let toCode = 'NGB';
  let toName = '寧波櫟社';
  let duration = '2h 10m';
  let isTrain = false;

  if (is9C8686) {
    carrierName = '春秋航空 9C8686';
    subText = 'Spring Airlines';
    depTime = '18:35';
    arrTime = '20:45';
  } else if (is9C8685) {
    carrierName = '春秋航空 9C8685';
    subText = 'Spring Airlines';
    dateText = '8月1日';
    daySub = 'SATURDAY, AUGUST 2026';
    depTime = '15:30';
    arrTime = '17:40';
    fromCode = 'NGB';
    fromName = '寧波櫟社';
    toCode = 'KHH';
    toName = '高雄小港';
    duration = '2h 10m';
  } else if (isMU5482) {
    carrierName = '中國東方航空 MU5482';
    subText = 'China Eastern Airlines';
    depTime = '12:05';
    arrTime = '14:15';
    fromCode = 'HKG';
    fromName = '香港國際';
    duration = '2h 10m';
  } else if (isMU5481) {
    carrierName = '中國東方航空 MU5481';
    subText = 'China Eastern Airlines';
    dateText = '8月1日';
    daySub = 'SATURDAY, AUGUST 2026';
    depTime = '15:20';
    arrTime = '17:35';
    fromCode = 'NGB';
    fromName = '寧波櫟社';
    toCode = 'HKG';
    toName = '香港國際';
    duration = '2h 15m';
  } else if (isG7501) {
    carrierName = '高鐵動車 G7501';
    subText = 'China Railway High-speed';
    depTime = '08:35';
    arrTime = '10:20';
    fromCode = 'SHA';
    fromName = '上海虹橋';
    toCode = 'NGQ';
    toName = '寧波高鐵站';
    duration = '1h 45m';
    isTrain = true;
  } else if (isG7516) {
    carrierName = '高鐵動車 G7516';
    subText = 'China Railway High-speed';
    dateText = '8月1日';
    daySub = 'SATURDAY, AUGUST 2026';
    depTime = '16:30';
    arrTime = '18:15';
    fromCode = 'NGQ';
    fromName = '寧波高鐵站';
    toCode = 'SHA';
    toName = '上海虹橋';
    duration = '1h 45m';
    isTrain = true;
  } else {
    // Fallback default
    carrierName = '春秋航空 9C8686';
    subText = 'Spring Airlines';
    depTime = '18:35';
    arrTime = '20:45';
  }

  // PNR or Ticket Info Mapping
  let bookingData = {
    refType: isTrain ? 'TICKET NO. 票務編號' : 'PNR 訂位代號',
    refValue: isTrain ? 'E293810239' : 'NQ7Z2Y',
    pax: [
      { name: '王小明 (WANG XIAOMING)', seat: isTrain ? '03車廂 08A' : '15A', bag: isTrain ? '車內行李架' : '託運 20kg + 手提 7kg' }
    ]
  };

  return (
    <div className="pb-44 pt-24 px-6 max-w-md mx-auto space-y-8">
      <div className="w-full">
        <button 
          onClick={() => navigate('/flights')}
          className="flex items-center justify-center gap-3 w-full bg-primary hover:bg-primary-container text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 shadow-md active:scale-[0.98]"
        >
          <ChevronLeft size={20} />
          <span className="text-lg">返回交通票務</span>
        </button>
      </div>

      <div className="space-y-1">
        <h2 className="text-4xl font-extrabold text-primary tracking-tight">{dateText}</h2>
        <p className="text-xs font-bold text-outline tracking-widest uppercase">{daySub}</p>
      </div>

      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center">
            {isTrain ? <Train className="text-primary" size={20} /> : <Plane className="text-primary" size={20} />}
          </div>
          <div>
            <h3 className="font-bold text-lg text-on-surface">{carrierName}</h3>
            <p className="text-sm text-on-surface-variant font-medium">{subText}</p>
          </div>
        </div>

        {/* Route Card */}
        <div className="bg-surface-container-low rounded-2xl px-6 py-5 flex justify-between items-center border border-outline-variant/10">
          <div className="flex flex-col items-center">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-on-surface">{depTime}</span>
              <span className="text-[10px] font-bold text-primary">{fromCode}</span>
            </div>
            <p className="text-xs text-on-surface-variant mt-1">{fromName}</p>
          </div>
          
          <div className="flex flex-col items-center flex-1 px-4">
            <div className="w-full h-[1.5px] bg-outline-variant relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-surface-container-low px-2">
                {isTrain ? <Train className="text-primary" size={14} /> : <Plane className="text-primary rotate-90" size={14} fill="currentColor" />}
              </div>
            </div>
            <span className="text-[9px] font-bold text-on-surface-variant uppercase tracking-wider mt-1">{duration}</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-on-surface">{arrTime}</span>
              <span className="text-[10px] font-bold text-primary">{toCode}</span>
            </div>
            <p className="text-xs text-on-surface-variant mt-1">{toName}</p>
          </div>
        </div>

        {/* Ticket Details */}
        <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-outline-variant/10 relative overflow-hidden border-l-4 border-primary">
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] font-bold text-outline uppercase tracking-wider">{bookingData.refType}</p>
                <p className="text-xl font-black text-primary tracking-wider">{bookingData.refValue}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold text-outline uppercase tracking-wider">Passenger 乘車人</p>
                {bookingData.pax.map((p, idx) => (
                  <div key={idx} className="mt-1">
                    <p className="font-bold text-on-surface text-sm">{p.name}</p>
                    <p className="text-[10px] font-bold text-secondary-container bg-secondary-container/10 px-1.5 py-0.5 rounded inline-block mt-1">座位: {p.seat}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-surface-container-low rounded-xl p-4 flex items-start gap-3">
              <Luggage className="text-primary shrink-0 mt-0.5" size={16} />
              <div className="space-y-1">
                <p className="text-xs text-on-surface font-bold">行李與攜帶品須知：</p>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  {isTrain ? '高鐵可攜帶大件行李置於車廂接駁處行李架，總重量不超過 20 公斤。' : 
                   (isMU5482 || isMU5481) ? '東方航空票價包含 1 件 23kg 免費託運行李及 1 件 7kg 手提行李。' : 
                   '春秋航空屬於低成本航空，請注意手提行李 7kg 尺寸限制，超重需在官網提前加購額度。'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Info Alerts */}
        <div className="p-4 rounded-xl border border-dashed border-outline-variant flex items-start gap-3 bg-surface/50">
          <Info className="text-amber-600 shrink-0 mt-0.5" size={16} />
          <p className="text-xs text-on-surface-variant font-medium leading-relaxed">
             {isTrain ? '請憑台胞證、護照等購票身份證明原件直接刷證件過閘進站。大廳大螢幕將在開車前 15 分鐘顯示檢票口，開車前 3 分鐘停止檢票。' : 
              '搭乘飛機需在起飛前 45 分鐘完成行李託運與值機，暑假與出行高峰期間過海關及安全檢查排隊時間較長，請提早至航站樓。'}
          </p>
        </div>
      </section>
    </div>
  );
}
