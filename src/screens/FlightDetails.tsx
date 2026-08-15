import { ChevronLeft, Plane, Luggage, User, Users, CheckCircle2, Copy, Eye, EyeOff, ChevronDown, ChevronUp, Clock, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export interface Traveler {
  name: string;
  englishName: string;
  nickname?: string;
  cabin: 'BUSINESS' | 'ECONOMY' | 'PLUS' | string;
  bookingClass?: string;
  baggage: string;
  cabinBaggage?: string;
  seat?: string;
  pnr?: string;
  ticketNumber?: string;
  badge?: string;
  extraBaggage?: boolean;
  orderNumber?: string;
}

export interface FlightInfo {
  carrier: string;
  subText: string;
  dateText: string;
  daySub: string;
  depTime: string;
  arrTime: string;
  isNextDay?: boolean;
  fromCode: string;
  fromName: string;
  toCode: string;
  toName: string;
  duration: string;
  flightType: string;
  status: string;
  travelers: Traveler[];
  pnrList?: { code: string; label: string }[];
  transferInfo?: {
    location: string;
    duration: string;
    nextFlight: string;
  };
  arrivalNote?: string;
  reminderText?: string;
  issuingInfo?: string;
  totalFare?: string;
}

export function FlightDetails() {
  const navigate = useNavigate();
  const { code } = useParams();
  const [copied, setCopied] = useState<string | null>(null);
  const [showFullTickets, setShowFullTickets] = useState<Record<string, boolean>>({});
  const [showMoreDetails, setShowMoreDetails] = useState(false);

  const copyToClipboard = (text: string, label: string) => {
    if (!text || text === '待確認') return;
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  const toggleShowTicket = (ticketId: string) => {
    setShowFullTickets(prev => ({
      ...prev,
      [ticketId]: !prev[ticketId]
    }));
  };

  const maskTicketNumber = (num?: string) => {
    if (!num || num === '待確認') return num || '待確認';
    if (num.length <= 6) return num;
    const clean = num.trim();
    if (clean.includes('-')) {
      const parts = clean.split('-');
      if (parts.length === 2 && parts[1].length > 4) {
        return `${parts[0]}-••••••${parts[1].slice(-4)}`;
      }
    }
    return `${clean.slice(0, 3)}••••••${clean.slice(-4)}`;
  };

  const flightMap: Record<string, FlightInfo> = {
    'BR95': {
      carrier: '長榮航空 EVA AIRWAYS BR95',
      subText: '台北桃園 → 米蘭馬爾彭薩｜直飛',
      dateText: '09月27日 (日) 第一批啟程',
      daySub: '2026年9月27日 星期日 23:45 起飛',
      depTime: '23:45',
      arrTime: '07:35',
      isNextDay: true,
      fromCode: 'TPE',
      fromName: '台北桃園國際機場 (第二航廈 T2)',
      toCode: 'MXP',
      toName: '米蘭馬爾彭薩機場 (第一航廈 T1)',
      duration: '13小時50分',
      flightType: '直飛',
      status: 'CONFIRMED (已確認)',
      travelers: [
        {
          name: '春香',
          englishName: 'CHANG CHUN HSIANG',
          cabin: 'ECONOMY',
          bookingClass: 'X (YBP00ST)',
          baggage: '2PC 託運行李 (每件 23kg)',
          cabinBaggage: '手提 1 件 (7kg)',
          pnr: 'FRJML3',
          ticketNumber: '2052431769843'
        },
        {
          name: '麗安',
          englishName: 'LAI LI AN',
          cabin: 'ECONOMY',
          baggage: '待確認',
          pnr: '待確認'
        },
        {
          name: '許振宏',
          englishName: 'HSU CHEN HUNG',
          nickname: '小許',
          cabin: 'ECONOMY',
          baggage: '待確認',
          pnr: '待確認'
        }
      ],
      issuingInfo: 'ANA Sky Web Taiwan (開票日: 2026/05/04, 代碼: 34393516 / 春香機票)',
      reminderText: '第一批成員（春香、麗安、許振宏）於 9/27 (日) 23:45 在桃園機場 T2 搭機直飛米蘭，請最晚於 20:45 前抵達機場辦理報到與行李託運。抵達米蘭 T1 為次日 07:35。'
    },
    'CX423': {
      carrier: '國泰航空 CATHAY PACIFIC CX423',
      subText: '高雄小港 → 香港國際機場｜直飛',
      dateText: '10月05日 (一) 第二批啟程 (第一段)',
      daySub: '2026年10月5日 星期一 13:40 起飛',
      depTime: '13:40',
      arrTime: '15:25',
      isNextDay: false,
      fromCode: 'KHH',
      fromName: '高雄小港國際機場 (航廈 I)',
      toCode: 'HKG',
      toName: '香港國際機場 (第一航廈 T1)',
      duration: '1小時45分',
      flightType: '直飛',
      status: 'CONFIRMED (已確認)',
      travelers: [
        {
          name: 'WU HSIUPI',
          englishName: 'WU HSIUPI',
          nickname: '頭家娘',
          cabin: 'ECONOMY',
          baggage: '託運 1件 23kg',
          cabinBaggage: '手提＋個人物品總重 7kg (56x36x23cm + 40x15x30cm)',
          pnr: 'DFDT27',
          ticketNumber: '160-3928678592',
          orderNumber: 'Trip.com 訂單: 1616333255111775'
        },
        {
          name: '陳瓊花',
          englishName: 'CHEN CHIUNG HUA',
          nickname: '小花',
          cabin: 'ECONOMY',
          bookingClass: 'N (ECLASSIC)',
          baggage: '託運 25kg',
          pnr: '9BS2DV',
          ticketNumber: '157 2320166448'
        }
      ],
      issuingInfo: 'Trip.com (WU HSIUPI) / Qatar Airways Digital (陳瓊花)',
      reminderText: '第二批成員（WU HSIUPI、陳瓊花）自高雄小港機場 (航廈 I) 出發，請最晚於起飛前 3 小時（約 10:40）抵達機場辦理報到與行李託運。13:40 起飛，15:25 抵達香港 T1，接續 19:40 起飛之卡達航空 QR817 前往杜哈。'
    },
    'QR817': {
      carrier: '卡達航空 QATAR AIRWAYS QR817',
      subText: '香港國際機場 → 杜哈哈馬德｜直飛',
      dateText: '10月05日 (一) 第二批洲際中轉 (第二段)',
      daySub: '2026年10月5日 星期一 19:40 起飛',
      depTime: '19:40',
      arrTime: '23:05',
      isNextDay: false,
      fromCode: 'HKG',
      fromName: '香港國際機場 (第一航廈 T1)',
      toCode: 'DOH',
      toName: '杜哈哈馬德國際機場 (DOH)',
      duration: '8小時25分',
      flightType: '直飛',
      status: 'CONFIRMED (已確認)',
      travelers: [
        {
          name: 'WU HSIUPI',
          englishName: 'WU HSIUPI',
          nickname: '頭家娘',
          cabin: 'BUSINESS',
          bookingClass: 'I Class (BCOMFORT)',
          baggage: '託運 40kg',
          badge: '⭐ BUSINESS COMFORT',
          pnr: '73NNQQ',
          ticketNumber: '157 2139384124'
        },
        {
          name: '陳瓊花',
          englishName: 'CHEN CHIUNG HUA',
          nickname: '小花',
          cabin: 'ECONOMY',
          bookingClass: 'N Class (ECLASSIC)',
          baggage: '託運 25kg',
          badge: 'ECONOMY CLASSIC',
          pnr: '9BS2DV',
          ticketNumber: '157 2320166448'
        }
      ],
      transferInfo: {
        location: 'DOH 杜哈機場',
        duration: '3h 05m',
        nextFlight: 'QR215 → Zagreb (02:10 起飛)'
      },
      issuingInfo: 'Qatar Airways Digital (HKD 17,216 / TWD 19,727)',
      reminderText: '第二批（WU HSIUPI、陳瓊花）於香港 T1 登機，直飛 8h25m 抵達杜哈 (23:05)。在杜哈機場停留轉機 3 小時 05 分，銜接 10/06 02:10 的 QR215 前往克羅埃西亞薩格勒布。'
    },
    'QR215': {
      carrier: '卡達航空 QATAR AIRWAYS QR215',
      subText: '杜哈哈馬德 → 薩格勒布｜直飛',
      dateText: '10月06日 (二) 抵達克羅埃西亞會合',
      daySub: '2026年10月6日 星期二 02:10 起飛',
      depTime: '02:10',
      arrTime: '06:55',
      isNextDay: false,
      fromCode: 'DOH',
      fromName: '杜哈哈馬德國際機場 (DOH)',
      toCode: 'ZAG',
      toName: '薩格勒布弗拉尼奧·圖季曼機場 (ZAG)',
      duration: '5小時45分',
      flightType: '直飛',
      status: 'CONFIRMED (已確認)',
      travelers: [
        {
          name: 'WU HSIUPI',
          englishName: 'WU HSIUPI',
          nickname: '頭家娘',
          cabin: 'BUSINESS',
          bookingClass: 'I Class (BCOMFORT)',
          baggage: '託運 40kg',
          badge: '⭐ BUSINESS COMFORT',
          pnr: '73NNQQ',
          ticketNumber: '157 2139384124'
        },
        {
          name: '陳瓊花',
          englishName: 'CHEN CHIUNG HUA',
          nickname: '小花',
          cabin: 'ECONOMY',
          bookingClass: 'N Class (ECLASSIC)',
          baggage: '託運 25kg',
          badge: 'ECONOMY CLASSIC',
          pnr: '9BS2DV',
          ticketNumber: '157 2320166448'
        }
      ],
      arrivalNote: '🇭🇷 06:55 抵達 Zagreb：第二組抵達 Zagreb，5位旅客會合。',
      reminderText: '06:55 抵達克羅埃西亞首都薩格勒布 (ZAG)，第二組（WU HSIUPI、陳瓊花）辦理入境申根手續並提取行李，與第一批成員（春香、麗安、許振宏）5 人正式到齊會合。'
    },
    'FR5935': {
      carrier: '瑞安航空 RYANAIR FR5935',
      subText: '杜布羅夫尼克 → 米蘭貝爾加莫｜直飛',
      dateText: '10月21日 (三) 克羅埃西亞直飛義大利',
      daySub: '2026年10月21日 星期三 14:25 起飛',
      depTime: '14:25',
      arrTime: '16:00',
      isNextDay: false,
      fromCode: 'DBV',
      fromName: '杜布羅夫尼克機場 (DBV)',
      toCode: 'BGY',
      toName: '米蘭貝爾加莫機場 (BGY)',
      duration: '1小時35分',
      flightType: '直飛',
      status: 'CONFIRMED (已確認)',
      pnrList: [
        { code: 'V64LYT', label: '4人訂位代號 (陳瓊花、春香、許振宏、麗安)' },
        { code: 'XYCEMH', label: '1人訂位代號 (WU HSIUPI)' }
      ],
      travelers: [
        {
          name: '陳瓊花',
          englishName: 'CHEN CHIUNG HUA',
          nickname: '小花',
          cabin: 'PLUS',
          bookingClass: 'Plus Upgrade',
          baggage: '20kg × 2件 託運',
          extraBaggage: true,
          cabinBaggage: 'Small Bag (40×30×20cm)',
          seat: '預選座位',
          pnr: 'V64LYT'
        },
        {
          name: 'WU HSIUPI',
          englishName: 'WU HSIUPI',
          nickname: '頭家娘',
          cabin: 'PLUS',
          bookingClass: 'Plus Upgrade',
          baggage: '20kg × 1件 託運',
          cabinBaggage: 'Small Bag (40×30×20cm)',
          seat: '預選座位',
          pnr: 'XYCEMH'
        },
        {
          name: '春香',
          englishName: 'CHANG CHUN HSIANG',
          cabin: 'PLUS',
          bookingClass: 'Plus Upgrade',
          baggage: '20kg × 1件 託運',
          cabinBaggage: 'Small Bag (40×30×20cm)',
          seat: '預選座位',
          pnr: 'V64LYT'
        },
        {
          name: '麗安',
          englishName: 'LAI LI AN',
          cabin: 'PLUS',
          bookingClass: 'Plus Upgrade',
          baggage: '20kg × 1件 託運',
          cabinBaggage: 'Small Bag (40×30×20cm)',
          seat: '預選座位',
          pnr: 'V64LYT'
        },
        {
          name: '許振宏',
          englishName: 'HSU CHEN HUNG',
          nickname: '小許',
          cabin: 'PLUS',
          bookingClass: 'Plus Upgrade',
          baggage: '20kg × 1件 託運',
          cabinBaggage: 'Small Bag (40×30×20cm)',
          seat: '預選座位',
          pnr: 'V64LYT'
        }
      ],
      totalFare: 'USD $659.15 (V64LYT: $511.94 / XYCEMH: $147.21 MasterCard 結清)',
      issuingInfo: 'Ryanair Web / App (2026/08/15)',
      reminderText: '10/21 (三) 14:25 自杜布羅夫尼克 (DBV) 起飛直飛米蘭貝爾加莫 (BGY，16:00 抵達)。全員 5 人皆已購票確認 (CONFIRMED)。抵達後搭乘機場接駁巴士直達米蘭市中心。'
    },
    'EY82': {
      carrier: '阿提哈德航空 ETIHAD AIRWAYS EY 82',
      subText: '米蘭馬爾彭薩 → 阿布達比扎耶德｜直飛',
      dateText: '10月23日 (五) 歐洲返程國際航班 (第一段)',
      daySub: '2026年10月23日 星期五 11:40 起飛',
      depTime: '11:40',
      arrTime: '19:40',
      isNextDay: false,
      fromCode: 'MXP',
      fromName: '米蘭馬爾彭薩機場 (第一航廈 T1)',
      toCode: 'AUH',
      toName: '阿布達比扎耶德國際機場 (航廈 A)',
      duration: '6小時00分',
      flightType: '直飛',
      status: 'CONFIRMED (已確認)',
      travelers: [
        {
          name: 'WU HSIUPI',
          englishName: 'WU HSIUPI',
          nickname: '頭家娘',
          cabin: 'BUSINESS',
          bookingClass: 'Comfort Business',
          seat: '06A',
          baggage: '託運 40kg (每件限重32kg)',
          cabinBaggage: '手提 12kg (最多2件)',
          badge: '⭐ BUSINESS COMFORT',
          pnr: '9C3DNV',
          ticketNumber: '607 2417756874'
        },
        {
          name: '春香',
          englishName: 'CHANG CHUN HSIANG',
          cabin: 'ECONOMY',
          bookingClass: 'Economy',
          baggage: '託運 25kg',
          cabinBaggage: '手提 7kg',
          pnr: 'EICOKU',
          ticketNumber: '607-9448197095',
          orderNumber: 'Trip.com: 1616331048207839'
        },
        {
          name: '麗安',
          englishName: 'LAI LI AN',
          cabin: 'ECONOMY',
          bookingClass: 'Economy',
          baggage: '託運 25kg',
          cabinBaggage: '手提 7kg',
          pnr: 'EI6U7S',
          ticketNumber: '607-9448197094',
          orderNumber: 'Trip.com: 1616331047852639'
        },
        {
          name: '許振宏',
          englishName: 'HSU CHEN HUNG',
          nickname: '小許',
          cabin: 'ECONOMY',
          bookingClass: 'Economy',
          baggage: '託運 25kg',
          cabinBaggage: '手提 7kg',
          pnr: 'EHYP25',
          ticketNumber: '607-9448197096',
          orderNumber: 'Trip.com: 1616331047925087'
        }
      ],
      transferInfo: {
        location: 'AUH 阿布達比機場',
        duration: '1h 40m',
        nextFlight: 'EY898 → 台北桃園 (21:20 起飛)'
      },
      issuingInfo: 'Etihad Airways (WU HSIUPI: EUR 2,240.75) / Trip.com (團員經濟艙)',
      reminderText: '米蘭馬爾彭薩 T1 辦理退稅手續與行李託運（行李可直掛台北）。11:40 起飛直飛阿布達比航廈 A (19:40 抵達)，中轉 1 小時 40 分銜接 21:20 之 EY 898 直飛台北。'
    },
    'EY898': {
      carrier: '阿提哈德航空 ETIHAD AIRWAYS EY 898',
      subText: '阿布達比扎耶德 → 台北桃園｜直飛',
      dateText: '10月23日 (五) ~ 10月24日 (六) 返抵台北 (第二段)',
      daySub: '2026年10月23日 星期五 21:20 起飛 (10/24 10:00 抵台)',
      depTime: '21:20',
      arrTime: '10:00',
      isNextDay: true,
      fromCode: 'AUH',
      fromName: '阿布達比扎耶德國際機場 (航廈 A)',
      toCode: 'TPE',
      toName: '台北桃園國際機場 (第二航廈 T2)',
      duration: '8小時40分',
      flightType: '直飛',
      status: 'CONFIRMED (已確認)',
      travelers: [
        {
          name: 'WU HSIUPI',
          englishName: 'WU HSIUPI',
          nickname: '頭家娘',
          cabin: 'BUSINESS',
          bookingClass: 'Comfort Business',
          seat: '06D',
          baggage: '託運 40kg (每件限重32kg)',
          cabinBaggage: '手提 12kg (最多2件)',
          badge: '⭐ BUSINESS COMFORT',
          pnr: '9C3DNV',
          ticketNumber: '607 2417756874'
        },
        {
          name: '春香',
          englishName: 'CHANG CHUN HSIANG',
          cabin: 'ECONOMY',
          bookingClass: 'Economy',
          baggage: '託運 25kg',
          cabinBaggage: '手提 7kg',
          pnr: 'EICOKU',
          ticketNumber: '607-9448197095'
        },
        {
          name: '麗安',
          englishName: 'LAI LI AN',
          cabin: 'ECONOMY',
          bookingClass: 'Economy',
          baggage: '託運 25kg',
          cabinBaggage: '手提 7kg',
          pnr: 'EI6U7S',
          ticketNumber: '607-9448197094'
        },
        {
          name: '許振宏',
          englishName: 'HSU CHEN HUNG',
          nickname: '小許',
          cabin: 'ECONOMY',
          bookingClass: 'Economy',
          baggage: '託運 25kg',
          cabinBaggage: '手提 7kg',
          pnr: 'EHYP25',
          ticketNumber: '607-9448197096'
        }
      ],
      issuingInfo: 'Etihad Airways (WU HSIUPI) / Trip.com (團員經濟艙)',
      reminderText: '21:20 阿布達比航廈 A 起飛，10/24 (六) 早上 10:00 順利抵達台北桃園第二航廈 (T2)，圓滿返抵國門！'
    }
  };

  const f: FlightInfo = flightMap[code || 'BR95'] || flightMap['BR95'];

  return (
    <div className="mt-20 px-4 pb-44 max-w-3xl mx-auto space-y-6">
      {/* Top Back Navigation */}
      <button 
        onClick={() => navigate('/flights')}
        className="flex items-center justify-center gap-2 w-full bg-primary text-white font-bold py-3 px-5 rounded-2xl shadow-sm active:scale-95 transition-all"
      >
        <ChevronLeft size={18} />
        <span>返回航班總覽</span>
      </button>

      {/* Date & Subtitle Header */}
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl sm:text-3xl font-black text-primary tracking-tight">{f.dateText}</h2>
          {f.status && (
            <span className="text-[10px] sm:text-xs font-black text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200 shrink-0">
              {f.status}
            </span>
          )}
        </div>
        <p className="text-xs font-bold text-outline uppercase">{f.daySub}</p>
      </div>

      {/* Main Flight Card */}
      <section className="bg-surface-container-lowest rounded-3xl p-5 sm:p-6 border border-outline-variant/10 shadow-sm space-y-6">
        
        {/* Carrier Header */}
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
            <Plane className="text-primary" size={24} />
          </div>
          <div className="min-w-0">
            <h3 className="font-black text-lg sm:text-xl text-on-surface truncate">{f.carrier}</h3>
            <p className="text-xs text-on-surface-variant font-bold mt-0.5">{f.subText}</p>
          </div>
        </div>

        {/* Route Details Card */}
        <div className="bg-surface-container-low rounded-2xl p-4 sm:p-5 flex justify-between items-center border border-outline-variant/10">
          {/* Departure */}
          <div className="text-center min-w-[75px] sm:min-w-[100px]">
            <div className="text-2xl sm:text-3xl font-black text-on-surface tracking-tight">{f.depTime}</div>
            <div className="text-xs font-black text-primary mt-0.5">{f.fromCode}</div>
            <p className="text-[11px] text-on-surface-variant font-medium mt-0.5 leading-tight">{f.fromName}</p>
          </div>

          {/* Flight Path Line */}
          <div className="flex flex-col items-center flex-1 px-3 sm:px-6">
            <span className="text-[10px] font-bold text-outline uppercase tracking-wider">{f.duration}</span>
            <div className="w-full h-[2px] bg-primary/20 relative my-1.5">
              <Plane className="text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-90" size={14} fill="currentColor" />
            </div>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2.5 py-0.5 rounded-full">
              {f.flightType}
            </span>
          </div>

          {/* Arrival */}
          <div className="text-center min-w-[75px] sm:min-w-[100px]">
            <div className="flex items-center justify-center gap-1.5">
              <span className="text-2xl sm:text-3xl font-black text-on-surface tracking-tight">{f.arrTime}</span>
              {f.isNextDay && (
                <span className="text-[9px] font-black bg-amber-100 text-amber-800 border border-amber-300 px-1.5 py-0.5 rounded-md self-start">
                  +1 DAY
                </span>
              )}
            </div>
            <div className="text-xs font-black text-primary mt-0.5">{f.toCode}</div>
            <p className="text-[11px] text-on-surface-variant font-medium mt-0.5 leading-tight">{f.toName}</p>
          </div>
        </div>

        {/* Dedicated PNR Group Bar (if multiple PNRs like Ryanair) */}
        {f.pnrList && f.pnrList.length > 0 && (
          <div className="bg-surface-container-high/30 rounded-2xl p-4 border border-outline-variant/10 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-black text-outline uppercase tracking-wider">
                📋 訂位分組與代號 (PNR)
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {f.pnrList.map((p, pIdx) => (
                <div key={pIdx} className="flex items-center justify-between bg-white rounded-xl p-3 border border-outline-variant/20 shadow-2xs">
                  <div className="min-w-0 pr-2">
                    <span className="text-xs font-black text-primary font-mono block text-sm">{p.code}</span>
                    <span className="text-[10px] text-on-surface-variant font-medium block truncate">{p.label}</span>
                  </div>
                  <button 
                    onClick={() => copyToClipboard(p.code, `group-pnr-${p.code}`)}
                    className="flex items-center gap-1 text-[11px] font-bold bg-primary/5 hover:bg-primary/10 text-primary border border-primary/20 px-2.5 py-1.5 rounded-lg shrink-0 transition-colors"
                  >
                    {copied === `group-pnr-${p.code}` ? <CheckCircle2 size={12} className="text-emerald-600" /> : <Copy size={12} />}
                    {copied === `group-pnr-${p.code}` ? '已複製' : '複製'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Passenger Information Cards */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 font-extrabold text-on-surface text-sm">
              <Users size={16} className="text-primary" />
              <span>旅客機票與行李資訊</span>
            </div>
            <span className="text-xs font-bold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">
              共 {f.travelers.length} 位旅客
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {f.travelers.map((t, tIdx) => {
              const isBusiness = t.cabin === 'BUSINESS';
              const isPlus = t.cabin === 'PLUS';
              const ticketId = `${code}-${tIdx}`;
              const isFullTicketVisible = showFullTickets[ticketId] || false;

              return (
                <div 
                  key={tIdx}
                  className={`rounded-2xl p-4 border transition-all ${
                    isBusiness 
                      ? 'bg-amber-500/5 border-amber-400/40 shadow-xs ring-1 ring-amber-400/20' 
                      : isPlus
                        ? 'bg-primary/5 border-primary/20 shadow-2xs'
                        : 'bg-surface-container-high/30 border-outline-variant/20'
                  }`}
                >
                  {/* Passenger Card Header */}
                  <div className="flex items-start justify-between gap-2 mb-2.5">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-black text-base text-on-surface">{t.name}</h4>
                        {t.nickname && t.nickname !== t.name && (
                          <span className="text-[10px] font-bold text-on-surface-variant bg-black/5 px-1.5 py-0.5 rounded-md">
                            {t.nickname}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] font-bold text-on-surface-variant font-mono">{t.englishName}</p>
                    </div>

                    {/* Cabin Badge */}
                    {isBusiness ? (
                      <span className="text-[10px] font-black text-amber-900 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded-full shrink-0 flex items-center gap-1">
                        <span>⭐ BUSINESS</span>
                      </span>
                    ) : isPlus ? (
                      <span className="text-[10px] font-black text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-full shrink-0">
                        PLUS
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-on-surface-variant bg-surface-container px-2 py-0.5 rounded-full border border-outline-variant/30 shrink-0">
                        ECONOMY
                      </span>
                    )}
                  </div>

                  {/* Class / Seat / Extra badge */}
                  {(t.bookingClass || t.seat || t.badge) && (
                    <div className="flex flex-wrap items-center gap-1.5 mb-2.5">
                      {t.bookingClass && (
                        <span className="text-[10px] font-bold text-outline bg-white px-2 py-0.5 rounded-md border border-outline-variant/20">
                          {t.bookingClass}
                        </span>
                      )}
                      {t.seat && (
                        <span className="text-[10px] font-black text-primary bg-primary/10 px-2 py-0.5 rounded-md font-mono">
                          座位: {t.seat}
                        </span>
                      )}
                      {t.extraBaggage && (
                        <span className="text-[10px] font-black text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded-md">
                          ⭐ 加購 2 件託運
                        </span>
                      )}
                    </div>
                  )}

                  {/* Baggage Details */}
                  <div className="bg-white/80 rounded-xl p-2.5 border border-outline-variant/15 space-y-1 mb-2.5 text-xs">
                    <div className="flex items-center gap-1.5 text-on-surface font-extrabold">
                      <Luggage size={13} className="text-primary" />
                      <span>託運行李：</span>
                      <span className={`font-black ${t.extraBaggage ? 'text-emerald-700' : 'text-primary'}`}>
                        {t.baggage}
                      </span>
                    </div>
                    {t.cabinBaggage && (
                      <p className="text-[10px] text-on-surface-variant font-medium pl-4">
                        隨身：{t.cabinBaggage}
                      </p>
                    )}
                  </div>

                  {/* PNR & Copy */}
                  {t.pnr && (
                    <div className="flex items-center justify-between pt-1 border-t border-outline-variant/15 text-xs">
                      <div className="flex items-center gap-1">
                        <span className="text-[10px] font-bold text-outline">PNR:</span>
                        <span className="font-black text-primary font-mono text-xs">{t.pnr}</span>
                      </div>
                      {t.pnr !== '待確認' && (
                        <button 
                          onClick={() => copyToClipboard(t.pnr!, `pnr-${tIdx}`)}
                          className="flex items-center gap-1 text-[10px] font-bold text-primary hover:bg-primary/5 px-2 py-1 rounded-md transition-colors"
                        >
                          {copied === `pnr-${tIdx}` ? <CheckCircle2 size={11} className="text-emerald-600" /> : <Copy size={11} />}
                          {copied === `pnr-${tIdx}` ? '已複製' : '複製代號'}
                        </button>
                      )}
                    </div>
                  )}

                  {/* Ticket Number (if present) with mask toggle */}
                  {t.ticketNumber && (
                    <div className="flex items-center justify-between pt-1.5 text-xs">
                      <div className="flex items-center gap-1 min-w-0 pr-1">
                        <span className="text-[10px] font-bold text-outline">機票:</span>
                        <span className="font-mono text-[11px] text-on-surface truncate">
                          {isFullTicketVisible ? t.ticketNumber : maskTicketNumber(t.ticketNumber)}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <button 
                          onClick={() => toggleShowTicket(ticketId)}
                          className="p-1 text-on-surface-variant hover:text-primary transition-colors"
                          title={isFullTicketVisible ? '隱藏號碼' : '顯示完整號碼'}
                        >
                          {isFullTicketVisible ? <EyeOff size={11} /> : <Eye size={11} />}
                        </button>
                        <button 
                          onClick={() => copyToClipboard(t.ticketNumber!, `tkt-${tIdx}`)}
                          className="flex items-center gap-0.5 text-[10px] font-bold text-primary hover:bg-primary/5 px-1.5 py-0.5 rounded-md transition-colors"
                        >
                          {copied === `tkt-${tIdx}` ? <CheckCircle2 size={10} className="text-emerald-600" /> : <Copy size={10} />}
                          {copied === `tkt-${tIdx}` ? '已複製' : '複製'}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Transfer Info Banner (for QR817 & EY82) */}
        {f.transferInfo && (
          <div className="bg-primary/5 rounded-2xl p-4 border border-primary/20 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Clock className="text-primary" size={20} />
              </div>
              <div>
                <span className="text-[10px] font-black text-primary uppercase tracking-wider block">
                  轉機停留資訊
                </span>
                <p className="font-black text-sm text-on-surface mt-0.5">
                  {f.transferInfo.location} 轉機 {f.transferInfo.duration}
                </p>
                <p className="text-xs text-on-surface-variant font-medium mt-0.5">
                  下一班：<strong className="text-primary">{f.transferInfo.nextFlight}</strong>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Arrival Note Banner (for QR215) */}
        {f.arrivalNote && (
          <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200/80 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0">
              <CheckCircle2 className="text-emerald-700" size={20} />
            </div>
            <div>
              <p className="text-xs font-bold text-emerald-950 leading-relaxed">
                {f.arrivalNote}
              </p>
            </div>
          </div>
        )}

        {/* Reminder Text Note */}
        {f.reminderText && (
          <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 leading-relaxed font-medium space-y-1">
            <p className="font-black flex items-center gap-1.5 text-amber-950">
              <span>💡 搭機與報到提醒：</span>
            </p>
            <p>{f.reminderText}</p>
          </div>
        )}

        {/* Expandable Accordion: More Ticket Details */}
        {(f.issuingInfo || f.totalFare) && (
          <div className="border border-outline-variant/20 rounded-2xl overflow-hidden">
            <button 
              onClick={() => setShowMoreDetails(!showMoreDetails)}
              className="w-full flex items-center justify-between p-3.5 bg-surface-container-low hover:bg-surface-container text-xs font-bold text-on-surface transition-colors"
            >
              <span>更多機票與開票資料</span>
              {showMoreDetails ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {showMoreDetails && (
              <div className="p-4 bg-surface-container-lowest border-t border-outline-variant/10 space-y-2 text-xs">
                {f.issuingInfo && (
                  <div>
                    <span className="text-[10px] font-bold text-outline uppercase block">開票來源與資訊</span>
                    <span className="text-on-surface font-medium">{f.issuingInfo}</span>
                  </div>
                )}
                {f.totalFare && (
                  <div className="pt-1">
                    <span className="text-[10px] font-bold text-outline uppercase block">購票總額</span>
                    <span className="text-emerald-700 font-black font-mono">{f.totalFare}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

      </section>
    </div>
  );
}
