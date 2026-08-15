import React, { useState } from 'react';
import { 
  ChevronLeft, Plane, Luggage, Users, CheckCircle2, Copy, Eye, EyeOff, 
  ChevronDown, ChevronUp, Clock, Ticket
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

export interface FlightSegment {
  flight: string;
  carrier: string;
  fromCode: string;
  fromName?: string;
  toCode: string;
  toName?: string;
  depTime: string;
  arrTime: string;
  isNextDay?: boolean;
  duration: string;
  transferAfter?: {
    location: string;
    duration: string;
    note?: string;
  };
}

export interface TravelerSegmentDetail {
  segment: string;
  cabin: string;
  bookingClass?: string;
  baggage: string;
  cabinBaggage?: string;
  seat?: string;
  pnr?: string;
  ticketNumber?: string;
  badge?: string;
}

export interface Traveler {
  name: string;
  englishName: string;
  nickname?: string;
  cabin: 'BUSINESS' | 'ECONOMY' | 'PLUS' | string;
  badge?: string;
  seat?: string;
  baggage: string;
  cabinBaggage?: string;
  extraBaggage?: boolean;
  bookingClass?: string;
  pnr?: string;
  ticketNumber?: string;
  orderNumber?: string;
  summaryLines?: { text: string; highlight?: boolean }[];
  segmentsDetails?: TravelerSegmentDetail[];
}

export interface FlightInfo {
  code: string;
  dateText: string;
  routeTitle: string;
  flightNumbers: string;
  depTime: string;
  arrTime: string;
  isNextDay?: boolean;
  fromCode: string;
  toCode: string;
  routeDesc: string;
  transferSummary?: string;
  type: '直飛' | '聯程';
  duration?: string;
  segments?: FlightSegment[];
  travelers: Traveler[];
  pnrList?: { code: string; label: string }[];
  reminderLines: string[];
  issuingInfo?: string;
  totalFare?: string;
}

interface PassengerCardProps {
  traveler: Traveler;
  index: number;
  flightCode: string;
  isFullTicketVisible: Record<string, boolean>;
  copied: string | null;
  onToggleTicket: (id: string) => void;
  onCopy: (text: string, label: string) => void;
  maskTicketNumber: (num?: string) => string;
}

const PassengerCard: React.FC<PassengerCardProps> = ({
  traveler: t,
  index: tIdx,
  flightCode,
  isFullTicketVisible,
  copied,
  onToggleTicket,
  onCopy,
  maskTicketNumber
}) => {
  const [showTicketing, setShowTicketing] = useState(false);
  const [showSegmentBaggage, setShowSegmentBaggage] = useState(false);
  const isBusiness = t.cabin === 'BUSINESS';
  const mainTicketId = `${flightCode}-${tIdx}`;

  return (
    <div 
      className={`rounded-2xl p-4 border transition-all space-y-3 ${
        isBusiness 
          ? 'bg-amber-500/5 border-amber-400/40 ring-1 ring-amber-400/20' 
          : 'bg-surface-container-lowest border-outline-variant/15 shadow-xs'
      }`}
    >
      {/* Passenger Header: Name & Cabin */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="flex items-baseline gap-1.5">
            <h4 className="font-black text-base text-on-surface">{t.name}</h4>
            {t.nickname && t.nickname !== t.name && (
              <span className="text-xs text-on-surface-variant font-medium">
                ({t.nickname})
              </span>
            )}
          </div>
          <p className="text-xs text-on-surface-variant font-mono mt-0.5">{t.englishName}</p>
        </div>

        {/* Max 1 Main Cabin Badge */}
        {isBusiness ? (
          <span className="text-xs font-black text-amber-900 bg-amber-100 border border-amber-300 px-2.5 py-1 rounded-full shrink-0">
            {t.badge || '⭐ BUSINESS'}
          </span>
        ) : (
          <span className="text-xs font-bold text-on-surface-variant bg-surface-container px-2 py-0.5 rounded-full border border-outline-variant/30 shrink-0">
            {t.badge || 'ECONOMY'}
          </span>
        )}
      </div>

      {/* Seat if present */}
      {t.seat && (
        <div className="text-xs font-bold text-primary bg-primary/5 border border-primary/15 px-2.5 py-1 rounded-lg w-fit">
          座位：<span className="font-mono font-black">{t.seat}</span>
        </div>
      )}

      {/* Baggage Display */}
      <div className="space-y-1.5 pt-0.5">
        {/* Multi-segment customized lines (e.g. WU HSIUPI KHH-ZAG) */}
        {t.summaryLines ? (
          <div className="space-y-1 text-xs">
            <div className="flex items-start gap-1.5 font-bold text-on-surface">
              <Luggage size={16} className="text-primary shrink-0 mt-0.5" />
              <div className="space-y-1 w-full">
                {t.summaryLines.map((line, lIdx) => (
                  <p 
                    key={lIdx} 
                    className={`text-xs ${
                      line.highlight 
                        ? 'font-black text-amber-950 bg-amber-100/70 border border-amber-300/60 px-2 py-0.5 rounded-md w-fit' 
                        : 'font-bold text-on-surface'
                    }`}
                  >
                    {line.text}
                  </p>
                ))}
              </div>
            </div>

            {t.cabinBaggage && (
              <p className="text-xs text-on-surface-variant font-medium pl-5">
                🎒 隨身：{t.cabinBaggage}
              </p>
            )}

            {t.segmentsDetails && t.segmentsDetails.length > 0 && (
              <button 
                onClick={() => setShowSegmentBaggage(!showSegmentBaggage)}
                className="flex items-center gap-1 text-xs font-bold text-primary hover:underline pl-5 py-1 min-h-[44px]"
              >
                <span>{showSegmentBaggage ? '收合各航段明細' : '查看各航段行李'}</span>
                {showSegmentBaggage ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>
            )}
          </div>
        ) : (
          /* Standard Flight Baggage */
          <div className="space-y-1 text-xs">
            <div className="flex items-center gap-1.5">
              <Luggage size={16} className="text-primary shrink-0" />
              <span className="text-xs text-on-surface-variant font-medium">託運：</span>
              <span className={`text-sm font-black ${t.extraBaggage ? 'text-on-surface' : 'text-on-surface'}`}>
                {t.baggage}
              </span>
            </div>
            {t.cabinBaggage && (
              <p className="text-xs text-on-surface-variant font-medium pl-5">
                🎒 隨身：{t.cabinBaggage}
              </p>
            )}
          </div>
        )}

        {/* Expanded Segment Details */}
        {showSegmentBaggage && t.segmentsDetails && (
          <div className="space-y-1.5 mt-2 pt-2 border-t border-outline-variant/15">
            {t.segmentsDetails.map((seg, sIdx) => (
              <div key={sIdx} className="bg-white rounded-xl p-2.5 text-xs border border-outline-variant/20 flex items-center justify-between">
                <span className="font-bold text-on-surface">{seg.segment}</span>
                <span className="font-black text-primary">{seg.baggage}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Collapsible Ticketing Data (PNR, E-Ticket, Order ID) */}
      {(t.pnr || t.ticketNumber || t.orderNumber || (t.segmentsDetails && t.segmentsDetails.some(s => s.pnr || s.ticketNumber))) && (
        <div className="pt-1 border-t border-outline-variant/10">
          <button 
            onClick={() => setShowTicketing(!showTicketing)}
            className="w-full flex items-center justify-between text-xs font-bold text-on-surface-variant hover:text-primary transition-colors py-2.5 min-h-[44px]"
          >
            <span className="flex items-center gap-1.5">
              <Ticket size={14} className="text-primary" />
              <span>票務資料 (PNR / 電子機票)</span>
            </span>
            {showTicketing ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
          </button>

          {showTicketing && (
            <div className="mt-2 p-3 bg-surface-container-high/30 rounded-xl space-y-2 text-xs border border-outline-variant/10">
              {/* Main PNR */}
              {t.pnr && (
                <div className="flex items-center justify-between min-h-[40px]">
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-medium text-on-surface-variant">訂位代號:</span>
                    <span className="font-mono font-black text-primary text-sm">{t.pnr}</span>
                  </div>
                  {t.pnr !== '待確認' && (
                    <button 
                      onClick={() => onCopy(t.pnr!, `pnr-${tIdx}`)}
                      className="flex items-center gap-1 text-xs font-bold text-primary hover:bg-primary/5 px-2.5 py-1.5 rounded-lg border border-primary/20 min-h-[36px] transition-colors"
                    >
                      {copied === `pnr-${tIdx}` ? <CheckCircle2 size={12} className="text-emerald-600" /> : <Copy size={12} />}
                      {copied === `pnr-${tIdx}` ? '已複製' : '複製'}
                    </button>
                  )}
                </div>
              )}

              {/* Main Ticket Number */}
              {t.ticketNumber && (
                <div className="flex items-center justify-between pt-1.5 border-t border-outline-variant/10 min-h-[40px]">
                  <div className="flex items-center gap-1 min-w-0 pr-1">
                    <span className="text-xs font-medium text-on-surface-variant">電子機票:</span>
                    <span className="font-mono text-xs text-on-surface truncate">
                      {isFullTicketVisible[mainTicketId] ? t.ticketNumber : maskTicketNumber(t.ticketNumber)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button 
                      onClick={() => onToggleTicket(mainTicketId)}
                      className="p-2 text-on-surface-variant hover:text-primary transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center"
                      title={isFullTicketVisible[mainTicketId] ? '隱藏號碼' : '顯示完整號碼'}
                    >
                      {isFullTicketVisible[mainTicketId] ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                    <button 
                      onClick={() => onCopy(t.ticketNumber!, `tkt-${tIdx}`)}
                      className="flex items-center gap-1 text-xs font-bold text-primary hover:bg-primary/5 px-2 py-1.5 rounded-lg border border-primary/20 min-h-[36px] transition-colors"
                    >
                      {copied === `tkt-${tIdx}` ? <CheckCircle2 size={12} className="text-emerald-600" /> : <Copy size={12} />}
                      {copied === `tkt-${tIdx}` ? '已複製' : '複製'}
                    </button>
                  </div>
                </div>
              )}

              {/* Segment specific ticketing if different */}
              {t.segmentsDetails && t.segmentsDetails.map((s, sIdx) => {
                if (!s.pnr && !s.ticketNumber) return null;
                const segTicketKey = `${flightCode}-${tIdx}-seg-${sIdx}`;
                return (
                  <div key={sIdx} className="pt-2 border-t border-outline-variant/10 space-y-1">
                    <span className="text-xs font-bold text-primary block">{s.segment}</span>
                    {s.pnr && (
                      <div className="flex items-center justify-between min-h-[36px]">
                        <span className="text-xs text-on-surface-variant">PNR: <strong className="font-mono text-primary">{s.pnr}</strong></span>
                        <button 
                          onClick={() => onCopy(s.pnr!, `pnr-${tIdx}-${sIdx}`)}
                          className="text-xs font-bold text-primary px-2 py-1 border border-primary/20 rounded-lg"
                        >
                          {copied === `pnr-${tIdx}-${sIdx}` ? '已複製' : '複製'}
                        </button>
                      </div>
                    )}
                    {s.ticketNumber && (
                      <div className="flex items-center justify-between min-h-[36px]">
                        <span className="text-xs text-on-surface-variant font-mono">
                          票號: {isFullTicketVisible[segTicketKey] ? s.ticketNumber : maskTicketNumber(s.ticketNumber)}
                        </span>
                        <div className="flex items-center gap-1">
                          <button onClick={() => onToggleTicket(segTicketKey)} className="p-1 text-on-surface-variant">
                            {isFullTicketVisible[segTicketKey] ? <EyeOff size={13} /> : <Eye size={13} />}
                          </button>
                          <button onClick={() => onCopy(s.ticketNumber!, `tkt-${tIdx}-${sIdx}`)} className="text-xs font-bold text-primary px-2 py-1 border border-primary/20 rounded-lg">
                            {copied === `tkt-${tIdx}-${sIdx}` ? '已複製' : '複製'}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Order Number */}
              {t.orderNumber && (
                <div className="pt-1.5 border-t border-outline-variant/10 flex items-center justify-between text-xs min-h-[36px]">
                  <span className="text-on-surface-variant truncate">{t.orderNumber}</span>
                  <button 
                    onClick={() => onCopy(t.orderNumber!, `ord-${tIdx}`)}
                    className="text-xs font-bold text-primary shrink-0 px-2 py-1 border border-primary/20 rounded-lg"
                  >
                    {copied === `ord-${tIdx}` ? '已複製' : '複製'}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export function FlightDetails() {
  const navigate = useNavigate();
  const { code } = useParams();
  const [copied, setCopied] = useState<string | null>(null);
  const [showFullTickets, setShowFullTickets] = useState<Record<string, boolean>>({});
  const [showSegments, setShowSegments] = useState(false);
  const [showPnrGroup, setShowPnrGroup] = useState(false);
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
      code: 'BR95',
      dateText: '09/27 (日)',
      routeTitle: 'TPE → MXP',
      flightNumbers: '長榮航空 BR95',
      depTime: '23:45',
      arrTime: '07:35',
      isNextDay: true,
      fromCode: 'TPE',
      toCode: 'MXP',
      routeDesc: '台北桃園 (T2) → 米蘭馬爾彭薩 (T1)',
      type: '直飛',
      duration: '13h 50m',
      travelers: [
        {
          name: '春香',
          englishName: 'CHANG CHUN HSIANG',
          cabin: 'ECONOMY',
          bookingClass: 'X (YBP00ST)',
          baggage: '2PC (每件 23kg)',
          cabinBaggage: '7kg',
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
          cabin: 'ECONOMY',
          baggage: '待確認',
          pnr: '待確認'
        }
      ],
      reminderLines: [
        '建議 20:45 前抵達桃園機場 T2 辦理報到與託運。',
        '次日 07:35 抵達米蘭馬爾彭薩機場 T1。'
      ],
      issuingInfo: 'ANA Sky Web Taiwan (開票日: 2026/05/04, 代碼: 34393516 / 春香機票)'
    },
    'KHH-ZAG': {
      code: 'KHH-ZAG',
      dateText: '10/05－10/06',
      routeTitle: 'KHH → ZAG',
      flightNumbers: 'CX423 → QR817 → QR215',
      depTime: '13:40',
      arrTime: '06:55',
      isNextDay: true,
      fromCode: 'KHH',
      toCode: 'ZAG',
      routeDesc: '高雄 → 香港 → 杜哈 → Zagreb',
      transferSummary: 'HKG 4h15m ・ DOH 3h05m',
      type: '聯程',
      duration: '23h 15m',
      segments: [
        {
          flight: 'CX423',
          carrier: 'Cathay Pacific',
          fromCode: 'KHH',
          toCode: 'HKG',
          depTime: '13:40',
          arrTime: '15:25',
          duration: '1h 45m',
          transferAfter: {
            location: 'HKG',
            duration: '4h 15m',
            note: '轉機 HKG｜4h 15m'
          }
        },
        {
          flight: 'QR817',
          carrier: 'Qatar Airways',
          fromCode: 'HKG',
          toCode: 'DOH',
          depTime: '19:40',
          arrTime: '23:05',
          duration: '8h 25m',
          transferAfter: {
            location: 'DOH',
            duration: '3h 05m',
            note: '轉機 DOH｜3h 05m'
          }
        },
        {
          flight: 'QR215',
          carrier: 'Qatar Airways',
          fromCode: 'DOH',
          toCode: 'ZAG',
          depTime: '02:10 (10/06)',
          arrTime: '06:55 (10/06)',
          duration: '5h 45m'
        }
      ],
      travelers: [
        {
          name: 'WU HSIUPI',
          englishName: 'WU HSIUPI',
          nickname: '頭家娘',
          cabin: 'BUSINESS',
          badge: '⭐ BUSINESS AFTER HKG',
          baggage: '',
          summaryLines: [
            { text: 'CX423｜經濟艙・23kg' },
            { text: 'QR817 / QR215｜商務艙・40kg', highlight: true }
          ],
          pnr: '73NNQQ',
          segmentsDetails: [
            {
              segment: 'CX423 (KHH → HKG)',
              cabin: 'ECONOMY',
              baggage: '託運 1件 × 23kg',
              cabinBaggage: '手提 7kg',
              pnr: 'DFDT27',
              ticketNumber: '160-3928678592'
            },
            {
              segment: 'QR817 (HKG → DOH)',
              cabin: 'BUSINESS',
              badge: '⭐ Business Comfort',
              baggage: '託運 40kg',
              pnr: '73NNQQ',
              ticketNumber: '157 2139384124'
            },
            {
              segment: 'QR215 (DOH → ZAG)',
              cabin: 'BUSINESS',
              badge: '⭐ Business Comfort',
              baggage: '託運 40kg',
              pnr: '73NNQQ',
              ticketNumber: '157 2139384124'
            }
          ]
        },
        {
          name: '陳瓊花',
          englishName: 'CHEN CHIUNG HUA',
          nickname: '小花',
          cabin: 'ECONOMY',
          badge: 'ECONOMY',
          baggage: '全程 25kg',
          cabinBaggage: '7kg',
          pnr: '9BS2DV',
          ticketNumber: '157 2320166448'
        }
      ],
      reminderLines: [
        'HKG 轉機 4h15m，DOH 轉機 3h05m。',
        '10/06 06:55 抵達 Zagreb，與第一批成員會合。'
      ],
      issuingInfo: 'Trip.com (WU HSIUPI 國泰段) / Qatar Airways Digital (卡達聯程)'
    },
    'FR5935': {
      code: 'FR5935',
      dateText: '10/21 (三)',
      routeTitle: 'DBV → BGY',
      flightNumbers: '瑞安航空 FR5935',
      depTime: '14:25',
      arrTime: '16:00',
      isNextDay: false,
      fromCode: 'DBV',
      toCode: 'BGY',
      routeDesc: '杜布羅夫尼克 → 米蘭貝爾加莫',
      type: '直飛',
      duration: '1h 35m',
      pnrList: [
        { code: 'V64LYT', label: '陳瓊花・春香・麗安・許振宏' },
        { code: 'XYCEMH', label: 'WU HSIUPI' }
      ],
      travelers: [
        {
          name: '陳瓊花',
          englishName: 'CHEN CHIUNG HUA',
          nickname: '小花',
          cabin: 'ECONOMY',
          baggage: '20kg × 2',
          extraBaggage: true,
          cabinBaggage: 'Small Bag (40×30×20cm)',
          pnr: 'V64LYT'
        },
        {
          name: 'WU HSIUPI',
          englishName: 'WU HSIUPI',
          nickname: '頭家娘',
          cabin: 'ECONOMY',
          baggage: '20kg × 1',
          cabinBaggage: 'Small Bag (40×30×20cm)',
          pnr: 'XYCEMH'
        },
        {
          name: '春香',
          englishName: 'CHANG CHUN HSIANG',
          cabin: 'ECONOMY',
          baggage: '20kg × 1',
          cabinBaggage: 'Small Bag (40×30×20cm)',
          pnr: 'V64LYT'
        },
        {
          name: '麗安',
          englishName: 'LAI LI AN',
          cabin: 'ECONOMY',
          baggage: '20kg × 1',
          cabinBaggage: 'Small Bag (40×30×20cm)',
          pnr: 'V64LYT'
        },
        {
          name: '許振宏',
          englishName: 'HSU CHEN HUNG',
          cabin: 'ECONOMY',
          baggage: '20kg × 1',
          cabinBaggage: 'Small Bag (40×30×20cm)',
          pnr: 'V64LYT'
        }
      ],
      totalFare: 'USD $659.15 (MasterCard 結清)',
      issuingInfo: 'Ryanair Web / App (2026/08/15)',
      reminderLines: [
        '14:25 DBV 起飛，16:00 抵達 BGY。',
        '抵達後搭乘機場接駁巴士直達米蘭市中心。'
      ]
    },
    'EY82': {
      code: 'EY82',
      dateText: '10/23 ~ 10/24',
      routeTitle: 'MXP → TPE',
      flightNumbers: 'EY82 → EY898',
      depTime: '11:40',
      arrTime: '10:00',
      isNextDay: true,
      fromCode: 'MXP',
      toCode: 'TPE',
      routeDesc: '米蘭 → 阿布達比 → 台北',
      transferSummary: 'AUH 1h40m',
      type: '聯程',
      duration: '16h 20m',
      segments: [
        {
          flight: 'EY82',
          carrier: 'Etihad Airways',
          fromCode: 'MXP',
          toCode: 'AUH',
          depTime: '11:40 (10/23)',
          arrTime: '19:40 (10/23)',
          duration: '6h 00m',
          transferAfter: {
            location: 'AUH',
            duration: '1h 40m',
            note: '轉機 AUH｜1h 40m'
          }
        },
        {
          flight: 'EY898',
          carrier: 'Etihad Airways',
          fromCode: 'AUH',
          toCode: 'TPE',
          depTime: '21:20 (10/23)',
          arrTime: '10:00 (10/24)',
          isNextDay: true,
          duration: '8h 40m'
        }
      ],
      travelers: [
        {
          name: 'WU HSIUPI',
          englishName: 'WU HSIUPI',
          nickname: '頭家娘',
          cabin: 'BUSINESS',
          seat: '06A / 06D',
          badge: '⭐ BUSINESS',
          baggage: '40kg (限重32kg/件)',
          cabinBaggage: '12kg / 2件',
          pnr: '9C3DNV',
          ticketNumber: '607 2417756874'
        },
        {
          name: '春香',
          englishName: 'CHANG CHUN HSIANG',
          cabin: 'ECONOMY',
          baggage: '25kg',
          cabinBaggage: '7kg',
          pnr: 'EICOKU',
          ticketNumber: '607-9448197095',
          orderNumber: 'Trip.com: 1616331048207839'
        },
        {
          name: '麗安',
          englishName: 'LAI LI AN',
          cabin: 'ECONOMY',
          baggage: '25kg',
          cabinBaggage: '7kg',
          pnr: 'EI6U7S',
          ticketNumber: '607-9448197094',
          orderNumber: 'Trip.com: 1616331047852639'
        },
        {
          name: '許振宏',
          englishName: 'HSU CHEN HUNG',
          cabin: 'ECONOMY',
          baggage: '25kg',
          cabinBaggage: '7kg',
          pnr: 'EHYP25',
          ticketNumber: '607-9448197096',
          orderNumber: 'Trip.com: 1616331047925087'
        }
      ],
      issuingInfo: 'Etihad Airways (WU HSIUPI: EUR 2,240.75) / Trip.com (團員經濟艙)',
      reminderLines: [
        '米蘭馬爾彭薩 T1 出發，阿布達比 AUH 轉機 1h40m。',
        '10/24 10:00 抵達台北桃園 T2。'
      ]
    }
  };

  const routeAliasMap: Record<string, string> = {
    'CX423': 'KHH-ZAG',
    'QR817': 'KHH-ZAG',
    'QR215': 'KHH-ZAG',
    'KHH-ZAG': 'KHH-ZAG',
    'EY898': 'EY82',
    'MXP-TPE': 'EY82'
  };

  const resolvedCode = routeAliasMap[code || ''] || code || 'BR95';
  const f: FlightInfo = flightMap[resolvedCode] || flightMap['BR95'];

  return (
    <div className="mt-20 px-4 pb-44 max-w-xl mx-auto space-y-4">
      {/* 1. Top Navigation */}
      <button 
        onClick={() => navigate('/flights')}
        className="flex items-center justify-center gap-2 w-full bg-primary text-white font-bold py-3 px-4 rounded-2xl shadow-xs active:scale-[0.99] transition-all text-sm min-h-[44px]"
      >
        <ChevronLeft size={16} />
        <span>返回航班總覽</span>
      </button>

      {/* 2. Header: Date + Status, Big Route, Sub-flight code */}
      <div className="space-y-1 pt-1">
        <div className="flex items-center justify-between">
          <span className="text-base font-black text-on-surface font-mono">{f.dateText}</span>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2.5 py-0.5 rounded-full flex items-center gap-1">
            <CheckCircle2 size={12} />
            <span>已確認</span>
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-primary tracking-tight font-mono">
          {f.routeTitle}
        </h1>
        <p className="text-xs font-bold text-on-surface-variant font-mono">
          {f.flightNumbers}
        </p>
      </div>

      {/* 3. Main Route Time Card */}
      <section className="bg-surface-container-lowest rounded-2xl p-4 border border-outline-variant/15 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          {/* Departure */}
          <div className="text-left">
            <div className="text-3xl font-black text-on-surface tracking-tight font-mono leading-none">
              {f.depTime}
            </div>
            <div className="text-sm font-black text-primary mt-1 font-mono">
              {f.fromCode}
            </div>
          </div>

          {/* Middle Plane & Flight Path */}
          <div className="flex flex-col items-center flex-1 px-4 max-w-[130px]">
            {f.duration && (
              <span className="text-xs font-bold text-outline font-mono mb-0.5">
                {f.duration}
              </span>
            )}
            <div className="w-full h-[1.5px] bg-primary/25 relative my-1">
              <Plane className="text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-90" size={13} fill="currentColor" />
            </div>
            <span className="text-xs font-bold text-on-surface-variant">
              {f.type}
            </span>
          </div>

          {/* Arrival */}
          <div className="text-right">
            <div className="flex items-center justify-end gap-1 leading-none">
              <span className="text-3xl font-black text-on-surface tracking-tight font-mono">
                {f.arrTime}
              </span>
              {f.isNextDay && (
                <span className="text-[10px] font-black bg-amber-100 text-amber-900 border border-amber-300 px-1 py-0.5 rounded leading-none">
                  +1
                </span>
              )}
            </div>
            <div className="text-sm font-black text-primary mt-1 font-mono">
              {f.toCode}
            </div>
          </div>
        </div>

        {/* Route Desc & Transfer Summary */}
        <div className="pt-2 border-t border-outline-variant/10 space-y-1.5">
          <p className="text-xs font-bold text-on-surface">
            {f.routeDesc}
          </p>

          {f.transferSummary && (
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 bg-amber-500/10 px-2.5 py-1 rounded-lg w-fit">
              <Clock size={13} className="text-amber-700 shrink-0" />
              <span>{f.transferSummary}</span>
            </div>
          )}
        </div>
      </section>

      {/* 4. 搭乘旅客與行李 (Passenger Cards: Moved directly below Main Route Card) */}
      <section className="space-y-2.5 pt-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 font-black text-on-surface text-sm">
            <Users size={16} className="text-primary" />
            <span>搭乘旅客與行李</span>
          </div>
          <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
            共 {f.travelers.length} 人
          </span>
        </div>

        <div className="space-y-3">
          {f.travelers.map((t, tIdx) => (
            <PassengerCard
              key={tIdx}
              traveler={t}
              index={tIdx}
              flightCode={resolvedCode}
              isFullTicketVisible={showFullTickets}
              copied={copied}
              onToggleTicket={toggleShowTicket}
              onCopy={copyToClipboard}
              maskTicketNumber={maskTicketNumber}
            />
          ))}
        </div>
      </section>

      {/* 5. 查看完整航段 (Collapsible Detailed Segments: Moved below Passengers) */}
      {f.segments && f.segments.length > 0 && (
        <section className="bg-surface-container-lowest rounded-2xl border border-outline-variant/15 overflow-hidden shadow-xs">
          <button 
            onClick={() => setShowSegments(!showSegments)}
            className="w-full flex items-center justify-between p-3.5 bg-surface-container-low hover:bg-surface-container text-xs font-black text-on-surface transition-colors min-h-[44px]"
          >
            <span className="flex items-center gap-1.5">
              <Plane size={14} className="text-primary" />
              <span>查看 {f.segments.length} 個航段明細</span>
            </span>
            {showSegments ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
          </button>

          {showSegments && (
            <div className="p-3.5 space-y-2.5 bg-surface-container-lowest border-t border-outline-variant/10">
              {f.segments.map((seg, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="bg-white rounded-xl p-3 border border-outline-variant/15 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-primary">
                        {seg.flight} ({seg.carrier})
                      </span>
                      <span className="text-xs font-mono font-bold text-outline">
                        {seg.duration}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs pt-0.5">
                      <div>
                        <span className="font-mono font-black text-sm text-on-surface">{seg.depTime}</span>
                        <span className="font-bold text-primary ml-1">{seg.fromCode}</span>
                      </div>
                      <span className="text-outline text-xs">→</span>
                      <div>
                        <span className="font-mono font-black text-sm text-on-surface">{seg.arrTime}</span>
                        <span className="font-bold text-primary ml-1">{seg.toCode}</span>
                      </div>
                    </div>
                  </div>

                  {seg.transferAfter && (
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/10 rounded-lg text-xs font-bold text-amber-900">
                      <Clock size={12} className="text-amber-700 shrink-0" />
                      <span>{seg.transferAfter.note || `轉機 ${seg.transferAfter.location}｜${seg.transferAfter.duration}`}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* 6. 搭機提醒 (Max 2 lines) */}
      {f.reminderLines && f.reminderLines.length > 0 && (
        <section className="p-3.5 bg-amber-500/10 rounded-2xl border border-amber-300/50 text-xs text-amber-950 font-medium space-y-1">
          <p className="font-black text-amber-900 flex items-center gap-1">
            <span>💡 搭機提醒：</span>
          </p>
          {f.reminderLines.map((line, lIdx) => (
            <p key={lIdx} className="leading-snug">{line}</p>
          ))}
        </section>
      )}

      {/* 7. FR5935 Compact PNR Group Collapsible */}
      {f.pnrList && f.pnrList.length > 0 && (
        <section className="bg-surface-container-lowest rounded-2xl border border-outline-variant/15 overflow-hidden shadow-xs">
          <button 
            onClick={() => setShowPnrGroup(!showPnrGroup)}
            className="w-full flex items-center justify-between p-3.5 bg-surface-container-low hover:bg-surface-container text-xs font-bold text-on-surface transition-colors min-h-[44px]"
          >
            <span className="flex items-center gap-1.5">
              <Ticket size={14} className="text-primary" />
              <span>訂位分組 PNR</span>
            </span>
            {showPnrGroup ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
          </button>

          {showPnrGroup && (
            <div className="p-3 space-y-2 bg-surface-container-lowest border-t border-outline-variant/10">
              {f.pnrList.map((p, pIdx) => (
                <div key={pIdx} className="flex items-center justify-between bg-white rounded-xl p-2.5 border border-outline-variant/20 text-xs min-h-[44px]">
                  <div className="min-w-0 pr-2">
                    <span className="font-mono font-black text-primary text-sm">{p.code}</span>
                    <span className="text-xs text-on-surface-variant block truncate">{p.label}</span>
                  </div>
                  <button 
                    onClick={() => copyToClipboard(p.code, `group-pnr-${p.code}`)}
                    className="flex items-center gap-1 text-xs font-bold bg-primary/5 hover:bg-primary/10 text-primary border border-primary/20 px-2.5 py-1.5 rounded-lg shrink-0 min-h-[36px] transition-colors"
                  >
                    {copied === `group-pnr-${p.code}` ? <CheckCircle2 size={12} className="text-emerald-600" /> : <Copy size={12} />}
                    {copied === `group-pnr-${p.code}` ? '已複製' : '複製'}
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* 8. 更多開票與機票資料 (Bottom Accordion) */}
      {(f.issuingInfo || f.totalFare) && (
        <section className="bg-surface-container-lowest border border-outline-variant/15 rounded-2xl overflow-hidden shadow-xs">
          <button 
            onClick={() => setShowMoreDetails(!showMoreDetails)}
            className="w-full flex items-center justify-between p-3.5 bg-surface-container-low hover:bg-surface-container text-xs font-bold text-on-surface-variant transition-colors min-h-[44px]"
          >
            <span>更多開票與機票資料</span>
            {showMoreDetails ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>

          {showMoreDetails && (
            <div className="p-3.5 space-y-2 text-xs border-t border-outline-variant/10 bg-surface-container-lowest">
              {f.issuingInfo && (
                <div>
                  <span className="text-xs font-bold text-outline block">開票來源</span>
                  <span className="text-on-surface">{f.issuingInfo}</span>
                </div>
              )}
              {f.totalFare && (
                <div className="pt-1">
                  <span className="text-xs font-bold text-outline block">購票總額</span>
                  <span className="text-emerald-700 font-black font-mono text-sm">{f.totalFare}</span>
                </div>
              )}
            </div>
          )}
        </section>
      )}
    </div>
  );
}
