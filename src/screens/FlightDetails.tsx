import { Home, ChevronLeft, Plane, Luggage, User, Info, MoreVertical } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

export function FlightDetails() {
  const navigate = useNavigate();
  const { code } = useParams();

  // Mock data mapping
  const isPeach = code === 'MM924';
  const isVZ568 = code === 'VZ568';
  const isIT289 = code === 'IT289';
  const isVZ569 = code === 'VZ569';
  const isIT793 = code === 'IT793';

  let airline = '';
  let sub = '';
  let depTime = '';
  let arrTime = '';
  let dateText = '5月23日';
  let daySub = 'SATURDAY, MAY 2026';
  let fromCode = 'TPE';
  let fromName = '台北桃園';
  let toCode = 'OKA';
  let toName = '沖繩那霸';
  let duration = '55m';

  if (isPeach) {
    airline = '樂桃航空 MM924';
    sub = 'Peach Aviation';
    depTime = '14:50';
    arrTime = '17:35';
  } else if (isVZ568) {
    airline = '泰國越捷航空 VZ 568';
    sub = 'Thai Vietjet Air';
    depTime = '14:55';
    arrTime = '17:20';
  } else if (isIT289) {
    airline = '台灣虎航 IT289';
    sub = 'Tigerair Taiwan';
    dateText = '5月27日';
    daySub = 'WEDNESDAY, MAY 2026';
    depTime = '14:00';
    arrTime = '14:55';
    fromCode = 'OKA';
    fromName = '沖繩那霸';
    toCode = 'KHH';
    toName = '高雄';
    duration = '55m';
  } else if (isVZ569) {
    airline = '泰國越捷航空 VZ 569';
    sub = 'Thai Vietjet Air';
    dateText = '5月27日';
    daySub = 'WEDNESDAY, MAY 2026';
    depTime = '18:20';
    arrTime = '18:55';
    fromCode = 'OKA';
    fromName = '沖繩那霸';
    toCode = 'TPE';
    toName = '台北桃園';
    duration = '35m';
  } else if (isIT793) {
    airline = '台灣虎航 IT793';
    sub = 'Tigerair Taiwan';
    dateText = '5月28日';
    daySub = 'THURSDAY, MAY 2026';
    depTime = '19:30';
    arrTime = '20:00';
    fromCode = 'OKA';
    fromName = '沖繩那霸';
    toCode = 'RMQ';
    toName = '台中';
    duration = '1.5h';
  }
  
  let flightData: any[] = [];
  if (isPeach) {
    flightData = [{ pnr: 'ZK2ERP', pax: [{ name: 'CHEN CHIUNGHUA' }] }];
  } else if (isVZ568) {
    flightData = [
      { pnr: 'ERED7E', pax: [{ name: 'YUYU CHANG' }, { name: 'HSIAOWEN HSIEH' }, { name: 'CHENKAI CHANG' }] },
      { pnr: 'JMFW5M', pax: [{ name: 'PI CHUAN CHAN' }, { name: 'HSIAO CHI HSIEH' }, { name: 'TING YEN HSIEH' }] },
      { pnr: 'KHSBCU', pax: [{ name: 'XUEFENG LENG' }] }
    ];
  } else if (isIT289) {
    flightData = [{ pnr: 'K87T5G', pax: [{ name: 'YUYU CHANG' }, { name: 'CHENKAI CHANG' }, { name: 'HSIAOWEN HSIEH' }] }];
  } else if (isVZ569) {
    flightData = [{ pnr: '22MW7F', pax: [{ name: 'CHEN CHIUNGHUA' }] }];
  } else if (isIT793) {
    flightData = [{ 
      pnr: 'M9YR2D', 
      pax: [
        { name: 'XUEFENG LENG', bag: '40kg' },
        { name: 'PI-CHUAN CHAN' },
        { name: 'HSIAO-CHI HSIEH' },
        { name: 'TING-YEN HSIEH' }
      ] 
    }];
  }

  return (
    <div className="pb-44 pt-20 px-6 max-w-md mx-auto space-y-8">
      <div className="w-full">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center justify-center gap-3 w-full bg-primary hover:bg-primary-container text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 shadow-md active:scale-[0.98]"
        >
          <Home size={20} fill="currentColor" />
          <span className="text-lg">返回首頁</span>
        </button>
      </div>

      <div className="space-y-1">
        <h2 className="text-4xl font-extrabold text-primary tracking-tight">{dateText}</h2>
        <p className="text-xs font-bold text-outline tracking-widest uppercase">{daySub}</p>
      </div>

      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center">
            <Plane className="text-primary" size={20} />
          </div>
          <div>
            <h3 className="font-bold text-lg">{airline}</h3>
            <p className="text-sm text-on-surface-variant font-medium">{sub}</p>
          </div>
        </div>

        {/* Flight Core Info Card */}
        <div className="bg-surface-container-low rounded-xl px-6 py-4 flex justify-between items-center">
          <div className="flex flex-col items-center">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-on-surface">{depTime}</span>
              <span className="text-xs font-bold text-primary">{fromCode}</span>
            </div>
            <p className="text-[10px] text-on-surface-variant">{fromName}</p>
          </div>
          
          <div className="flex flex-col items-center flex-1 px-4">
            <div className="w-full h-[1px] bg-outline-variant relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-surface-container-low px-2">
                <Plane className="text-primary rotate-90" size={16} fill="currentColor" />
              </div>
            </div>
            <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">{duration}</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-on-surface">{arrTime}</span>
              <span className="text-xs font-bold text-primary">{toCode}</span>
            </div>
            <p className="text-[10px] text-on-surface-variant">{toName}</p>
          </div>
        </div>

        {flightData.map((data, idx) => (
          <div key={idx} className="bg-surface-container-lowest rounded-xl p-6 shadow-[0_4px_20px_rgba(0,93,144,0.04)] relative overflow-hidden border-l-4 border-secondary-container">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[11px] font-bold text-outline uppercase tracking-wider">PNR 訂位代號</p>
                  <p className="text-lg font-black text-primary tracking-wider">{data.pnr}</p>
                </div>
                <div className="text-right">
                  <p className="text-[11px] font-bold text-outline uppercase tracking-wider">Passenger 乘客</p>
                  <div className="space-y-1">
                    {data.pax.map((p: any) => (
                      <div key={p.name} className="flex flex-col items-end">
                        <p className="font-bold text-on-surface text-sm">{p.name}</p>
                        {p.bag && (
                          <div className="flex items-center gap-1 text-secondary text-[10px] font-bold">
                            <Luggage size={12} fill="currentColor" />
                            <span>{p.bag}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="bg-surface-container-low rounded-lg p-3 flex items-start gap-3">
                <Luggage className="text-secondary mt-0.5" size={16} />
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  <span className="font-bold text-on-surface">行李事項：</span>
                  {isPeach ? '手提 2 件合計 7kg，無免費託運。' : 
                   (isVZ568 || isVZ569) ? '每位乘客享手提行李 7kg，無免費託運。' : 
                   '請確認您的機票包含之托運行李額度。'}
                </p>
              </div>
            </div>
          </div>
        ))}

        {!isPeach && !isIT289 && !isIT793 && (
          <div className="p-4 rounded-xl border border-dashed border-outline-variant flex items-start gap-3 bg-surface/50">
            <Info className="text-tertiary shrink-0" size={18} />
            <p className="text-xs text-on-surface-variant font-medium leading-relaxed">
              提醒：請務必再次確認行李尺寸符合航空公司最新規範，避免現場超額收費。
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
