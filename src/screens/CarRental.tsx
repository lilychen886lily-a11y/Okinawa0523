import { useState } from 'react';
import { 
  Navigation, Copy, CheckCircle2, ChevronDown, ChevronUp, Bus
} from 'lucide-react';

export function CarRental() {
  const [copied, setCopied] = useState<string | null>(null);
  const [showHertzMore, setShowHertzMore] = useState(false);
  const [showFlixbusMore, setShowFlixbusMore] = useState(false);
  const [showNovaMore, setShowNovaMore] = useState(false);

  const copyToClipboard = (text: string, label: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  const openGoogleMaps = (query: string) => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`, '_blank');
  };

  return (
    <div className="mt-20 px-4 pb-44 max-w-xl mx-auto space-y-6">
      {/* 頁面標題 */}
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-black text-on-surface tracking-tight font-mono">
          租車與接駁交通
        </h1>
        <p className="text-xs font-bold text-on-surface-variant font-mono">
          HERTZ → FLIXBUS → NOVA
        </p>
      </div>

      {/* ======================= ① HERTZ · 義大利租車 ======================= */}
      <div className="space-y-2.5">
        <section className="bg-surface-container-lowest rounded-3xl p-5 border border-outline-variant/15 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-primary font-mono tracking-wide">
              HERTZ · 義大利租車
            </span>
            <span className="text-[11px] font-bold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full font-mono">
              09/28 → 10/06
            </span>
          </div>

          {/* 垂直 Timeline */}
          <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-3 before:bottom-3 before:w-0.5 before:bg-outline-variant/30">
            {/* 取車 */}
            <div className="relative flex items-start justify-between">
              <div className="absolute -left-6 top-1.5 w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-primary" />
              </div>
              <div>
                <div className="text-xs font-bold text-on-surface-variant font-mono">09/28</div>
                <div className="text-2xl sm:text-3xl font-black text-on-surface font-mono leading-none my-0.5">
                  09:30
                </div>
                <div className="text-xs font-bold text-on-surface-variant">取車</div>
              </div>
              <div className="text-right">
                <div className="text-lg font-black text-primary font-mono leading-tight">
                  MXP T1
                </div>
                <div className="text-xs font-bold text-on-surface-variant mt-0.5">
                  米蘭機場第一航廈
                </div>
              </div>
            </div>

            {/* 還車 */}
            <div className="relative flex items-start justify-between">
              <div className="absolute -left-6 top-1.5 w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-primary" />
              </div>
              <div>
                <div className="text-xs font-bold text-on-surface-variant font-mono">10/06</div>
                <div className="text-2xl sm:text-3xl font-black text-on-surface font-mono leading-none my-0.5">
                  17:30
                </div>
                <div className="text-xs font-bold text-on-surface-variant">還車</div>
              </div>
              <div className="text-right">
                <div className="text-lg font-black text-primary font-mono leading-tight">
                  TRIESTE
                </div>
                <div className="text-xs font-bold text-on-surface-variant mt-0.5">
                  的里雅斯特市區
                </div>
              </div>
            </div>
          </div>

          {/* 下方車型與價格 */}
          <div className="pt-3 border-t border-outline-variant/10 flex items-baseline justify-between">
            <div className="text-sm font-black text-on-surface">
              Opel Corsa 或同級 · 自排
            </div>
            <div className="text-xl font-black text-on-surface font-mono">
              €883.37
            </div>
          </div>

          {/* 按鈕組 */}
          <div className="flex items-center gap-2 pt-1">
            <button 
              onClick={() => openGoogleMaps('Malpensa Airport Terminal 1, FERNO Milan, IT 21010')}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-primary text-white text-xs font-bold active:scale-[0.98] transition-all min-h-[44px]"
            >
              <Navigation size={13} />
              <span>取車導航</span>
            </button>
            <button 
              onClick={() => openGoogleMaps('Piazza della Liberta 9, Trieste, IT 34135')}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface text-xs font-bold border border-outline-variant/20 active:scale-[0.98] transition-all min-h-[44px]"
            >
              <Navigation size={13} />
              <span>還車導航</span>
            </button>
            <button 
              onClick={() => setShowHertzMore(!showHertzMore)}
              className="flex items-center justify-center gap-1 py-2.5 px-3.5 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface text-xs font-bold border border-outline-variant/20 active:scale-[0.98] transition-all min-h-[44px]"
            >
              <span>更多</span>
              {showHertzMore ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
            </button>
          </div>
        </section>

        {/* HERTZ 更多資訊展開卡片 */}
        {showHertzMore && (
          <section className="p-4.5 space-y-3.5 text-xs border border-outline-variant/15 rounded-3xl bg-surface-container-lowest shadow-xs animate-in fade-in duration-150">
            <div className="flex items-center justify-between">
              <span className="font-mono font-black text-sm text-primary">HERTZ · 赫茲租車</span>
              <span className="text-[11px] font-bold text-on-surface-variant bg-surface-container px-2 py-0.5 rounded-md">
                義大利段自駕
              </span>
            </div>

            <div className="flex items-center justify-between min-h-[40px] bg-surface-container-low/60 p-3 rounded-2xl border border-outline-variant/10">
              <div>
                <span className="text-on-surface-variant text-[11px] block">預訂確認號 (Confirmation)</span>
                <span className="font-mono font-black text-base text-primary">L661E7E0321</span>
              </div>
              <button 
                onClick={() => copyToClipboard('L661E7E0321', 'hertz-code')}
                className="flex items-center gap-1 text-xs font-bold text-primary hover:bg-primary/10 px-3 py-1.5 rounded-xl border border-primary/20 transition-colors bg-white shadow-2xs"
              >
                {copied === 'hertz-code' ? <CheckCircle2 size={12} className="text-emerald-600" /> : <Copy size={12} />}
                <span>{copied === 'hertz-code' ? '已複製' : '複製'}</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <div>
                <span className="text-on-surface-variant text-[11px] block">主駕駛人</span>
                <span className="font-bold text-on-surface text-xs sm:text-sm">春香 (CHANG CHUN HSIANG)</span>
              </div>
              <div>
                <span className="text-on-surface-variant text-[11px] block">費用支付</span>
                <span className="font-mono font-bold text-on-surface text-xs sm:text-sm">€883.37 (到店付款)</span>
              </div>
            </div>

            <div>
              <span className="text-on-surface-variant text-[11px] block">預訂車型</span>
              <span className="text-on-surface font-medium">Opel Corsa 或同級 · 自排 5 人座</span>
            </div>

            <div className="pt-2.5 border-t border-outline-variant/10 space-y-2">
              <div className="bg-surface-container-low/40 p-2.5 rounded-xl space-y-0.5">
                <span className="text-primary font-bold block">📍 取車：米蘭馬爾彭薩機場第一航廈 (MXP T1)</span>
                <p className="text-on-surface-variant">09/28 (日) 09:30 · 地下一樓 (Floor -1) 租車專區</p>
                <p className="text-[11px] text-outline">Malpensa Airport Terminal 1, FERNO Milan, IT 21010</p>
              </div>

              <div className="bg-surface-container-low/40 p-2.5 rounded-xl space-y-0.5">
                <span className="text-primary font-bold block">📍 還車：的里雅斯特市區 (Trieste Downtown)</span>
                <p className="text-on-surface-variant">10/06 (二) 17:30 · 火車站旁 Silos 專用車道</p>
                <p className="text-[11px] text-outline">Piazza della Liberta 9, Trieste, IT 34135</p>
              </div>
            </div>

            <div className="pt-2 border-t border-outline-variant/10 space-y-1">
              <span className="font-bold text-on-surface block">取車必備證件：</span>
              <p className="text-on-surface-variant">護照正本 · 台灣駕照正本 · 國際駕照 (IDP) · 主駕駛實體信用卡</p>
            </div>

            <div className="p-3 bg-amber-500/10 rounded-2xl border border-amber-300/40 text-amber-950 font-bold text-xs">
              💡 重要：取車請攜帶預訂時登記的主駕駛信用卡。
            </div>
          </section>
        )}
      </div>

      {/* ======================= ② FLIXBUS · 接駁巴士 ======================= */}
      <div className="space-y-2.5">
        <section className="bg-surface-container-lowest rounded-3xl p-5 border border-outline-variant/15 shadow-xs space-y-4">
          {/* 卡片上方標籤 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-on-surface-variant font-mono">10/06 (二)</span>
              <span className="text-xs font-black text-[#58a01a] font-mono tracking-wide">
                FLIXBUS · N544
              </span>
            </div>
            <span className="text-[11px] font-bold text-slate-800 bg-[#70c922]/20 px-2.5 py-0.5 rounded-full font-mono">
              3人搭乘
            </span>
          </div>

          {/* 橫向交通路線 */}
          <div className="py-1">
            <div className="flex items-center justify-between">
              {/* Trieste */}
              <div>
                <div className="text-2xl sm:text-3xl font-black text-on-surface font-mono leading-none">
                  12:20
                </div>
                <div className="text-base sm:text-lg font-black text-on-surface mt-1">
                  TRIESTE
                </div>
                <div className="text-[11px] font-bold text-on-surface-variant">
                  的里雅斯特 巴士總站
                </div>
              </div>

              {/* 橫向路線指示線 */}
              <div className="flex-1 px-3 flex flex-col items-center">
                <div className="w-full flex items-center gap-1.5 my-1">
                  <div className="flex-1 h-0.5 bg-outline-variant/30" />
                  <div className="w-7 h-7 rounded-full bg-[#70c922]/15 flex items-center justify-center text-[#58a01a] shrink-0 shadow-2xs">
                    <Bus size={14} />
                  </div>
                  <div className="flex-1 h-0.5 bg-outline-variant/30" />
                </div>
              </div>

              {/* Zagreb */}
              <div className="text-right">
                <div className="text-2xl sm:text-3xl font-black text-on-surface font-mono leading-none">
                  15:50
                </div>
                <div className="text-base sm:text-lg font-black text-on-surface mt-1">
                  ZAGREB
                </div>
                <div className="text-[11px] font-bold text-on-surface-variant">
                  薩格勒布 巴士總站
                </div>
              </div>
            </div>
          </div>

          {/* 旅客與行李 */}
          <div className="pt-3 border-t border-outline-variant/10 space-y-1.5 text-xs">
            <div className="text-on-surface font-medium">
              許振宏 <strong className="font-mono font-bold text-primary">4B</strong> · 春香 <strong className="font-mono font-bold text-primary">4D</strong> · 麗安 <strong className="font-mono font-bold text-primary">4C</strong>
            </div>
            <div className="text-on-surface-variant">
              🧳 每人 20kg 託運 ＋ 🎒 7kg 隨身
            </div>
          </div>

          {/* 按鈕組 */}
          <div className="flex items-center gap-2 pt-1">
            <button 
              onClick={() => openGoogleMaps('Piazza della Libertà 9, 34135 Trieste, Italy')}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#58a01a] text-white text-xs font-bold active:scale-[0.98] transition-all min-h-[44px]"
            >
              <Navigation size={13} />
              <span>上車導航</span>
            </button>
            <button 
              onClick={() => setShowFlixbusMore(!showFlixbusMore)}
              className="flex items-center justify-center gap-1 py-2.5 px-4 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface text-xs font-bold border border-outline-variant/20 active:scale-[0.98] transition-all min-h-[44px]"
            >
              <span>更多</span>
              {showFlixbusMore ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
            </button>
          </div>
        </section>

        {/* FLIXBUS 更多資訊展開卡片 */}
        {showFlixbusMore && (
          <section className="p-4.5 space-y-3.5 text-xs border border-outline-variant/15 rounded-3xl bg-surface-container-lowest shadow-xs animate-in fade-in duration-150">
            <div className="flex items-center justify-between">
              <span className="font-mono font-black text-sm text-[#58a01a]">FlixBus N544 · 跨國接駁</span>
              <span className="text-[11px] font-bold text-on-surface-variant bg-surface-container px-2 py-0.5 rounded-md">
                義大利 ➜ 克羅埃西亞
              </span>
            </div>

            <div className="flex items-center justify-between min-h-[40px] bg-surface-container-low/60 p-3 rounded-2xl border border-outline-variant/10">
              <div>
                <span className="text-on-surface-variant text-[11px] block">訂位代號 (Booking Number)</span>
                <span className="font-mono font-black text-base text-primary">3384947118</span>
              </div>
              <button 
                onClick={() => copyToClipboard('3384947118', 'flixbus-code')}
                className="flex items-center gap-1 text-xs font-bold text-primary hover:bg-primary/10 px-3 py-1.5 rounded-xl border border-primary/20 transition-colors bg-white shadow-2xs"
              >
                {copied === 'flixbus-code' ? <CheckCircle2 size={12} className="text-emerald-600" /> : <Copy size={12} />}
                <span>{copied === 'flixbus-code' ? '已複製' : '複製'}</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <div>
                <span className="text-on-surface-variant text-[11px] block">乘車日期</span>
                <span className="font-mono font-bold text-on-surface text-xs sm:text-sm">2026/10/06 (二)</span>
              </div>
              <div>
                <span className="text-on-surface-variant text-[11px] block">票價總計</span>
                <span className="font-mono font-bold text-on-surface text-xs sm:text-sm">€62.13 (3人)</span>
              </div>
            </div>

            <div className="pt-2.5 border-t border-outline-variant/10 space-y-2">
              <div className="bg-surface-container-low/40 p-2.5 rounded-xl space-y-0.5">
                <span className="text-[#58a01a] font-bold block">📍 上車：的里雅斯特巴士總站 Trieste (Autostazione)</span>
                <p className="text-on-surface font-medium">12:20 發車 · 上車位置：FlixBus 月台 2</p>
                <p className="text-on-surface-variant text-[11px]">Piazza della Libertà 9 (Autostazione Silos), 34135 Trieste</p>
              </div>

              <div className="bg-surface-container-low/40 p-2.5 rounded-xl space-y-0.5">
                <span className="text-[#58a01a] font-bold block">📍 下車：薩格勒布巴士總站 Zagreb Bus Station</span>
                <p className="text-on-surface font-medium">15:50 預計抵達</p>
                <p className="text-on-surface-variant text-[11px]">Avenija Marina Držića 4, 10000 Zagreb</p>
              </div>
            </div>

            <div className="pt-2 border-t border-outline-variant/10 space-y-1">
              <span className="font-bold text-on-surface block">座位與旅客名單：</span>
              <div className="grid grid-cols-3 gap-2 pt-0.5">
                <div className="bg-white p-2 rounded-xl border border-outline-variant/15 text-center">
                  <span className="text-[10px] text-on-surface-variant block">Seat 4B</span>
                  <span className="font-bold text-on-surface">許振宏</span>
                </div>
                <div className="bg-white p-2 rounded-xl border border-outline-variant/15 text-center">
                  <span className="text-[10px] text-on-surface-variant block">Seat 4D</span>
                  <span className="font-bold text-on-surface">春香</span>
                </div>
                <div className="bg-white p-2 rounded-xl border border-outline-variant/15 text-center">
                  <span className="text-[10px] text-on-surface-variant block">Seat 4C</span>
                  <span className="font-bold text-on-surface">麗安</span>
                </div>
              </div>
            </div>

            <div className="p-3 bg-amber-500/10 rounded-2xl border border-amber-300/40 text-amber-950 font-bold text-xs">
              💡 提醒：跨國巴士建議至少提前 15-20 分鐘抵達月台核對護照上車。
            </div>
          </section>
        )}
      </div>

      {/* ======================= ③ NOVA · 克羅埃西亞租車 ======================= */}
      <div className="space-y-2.5">
        <section className="bg-surface-container-lowest rounded-3xl p-5 border border-outline-variant/15 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-primary font-mono tracking-wide">
              NOVA · 克羅埃西亞租車
            </span>
            <span className="text-[11px] font-bold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full font-mono">
              10/07 → 10/21
            </span>
          </div>

          {/* 垂直 Timeline */}
          <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-3 before:bottom-3 before:w-0.5 before:bg-outline-variant/30">
            {/* 取車 */}
            <div className="relative flex items-start justify-between">
              <div className="absolute -left-6 top-1.5 w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-primary" />
              </div>
              <div>
                <div className="text-xs font-bold text-on-surface-variant font-mono">10/07</div>
                <div className="text-2xl sm:text-3xl font-black text-on-surface font-mono leading-none my-0.5">
                  12:30
                </div>
                <div className="text-xs font-bold text-on-surface-variant">取車</div>
              </div>
              <div className="text-right">
                <div className="text-lg font-black text-primary font-mono leading-tight">
                  ZAGREB
                </div>
                <div className="text-xs font-bold text-on-surface-variant mt-0.5">
                  薩格勒布市中心
                </div>
              </div>
            </div>

            {/* 還車 */}
            <div className="relative flex items-start justify-between">
              <div className="absolute -left-6 top-1.5 w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-primary" />
              </div>
              <div>
                <div className="text-xs font-bold text-on-surface-variant font-mono">10/21</div>
                <div className="text-2xl sm:text-3xl font-black text-on-surface font-mono leading-none my-0.5">
                  12:30
                </div>
                <div className="text-xs font-bold text-on-surface-variant">還車</div>
              </div>
              <div className="text-right">
                <div className="text-lg font-black text-primary font-mono leading-tight">
                  DUBROVNIK · DBV
                </div>
                <div className="text-xs font-bold text-on-surface-variant mt-0.5">
                  杜布羅夫尼克機場
                </div>
              </div>
            </div>
          </div>

          {/* 下方車型與價格 */}
          <div className="pt-3 border-t border-outline-variant/10 flex items-baseline justify-between">
            <div>
              <div className="text-sm font-black text-on-surface">
                VW Tiguan 或同級 · 自排
              </div>
              <div className="text-[11px] font-bold text-primary mt-0.5">
                Premium Coverage · 自負額 €0
              </div>
            </div>
            <div className="text-xl font-black text-on-surface font-mono">
              €1,346.20
            </div>
          </div>

          {/* 按鈕組 */}
          <div className="flex items-center gap-2 pt-1">
            <button 
              onClick={() => openGoogleMaps('Avenija Marina Držića 21, Zagreb, 10000')}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-primary text-white text-xs font-bold active:scale-[0.98] transition-all min-h-[44px]"
            >
              <Navigation size={13} />
              <span>取車導航</span>
            </button>
            <button 
              onClick={() => openGoogleMaps('Cilipi, Zracna Luka Dubrovnik, Dubrovnik, 20213')}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface text-xs font-bold border border-outline-variant/20 active:scale-[0.98] transition-all min-h-[44px]"
            >
              <Navigation size={13} />
              <span>還車導航</span>
            </button>
            <button 
              onClick={() => setShowNovaMore(!showNovaMore)}
              className="flex items-center justify-center gap-1 py-2.5 px-3.5 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface text-xs font-bold border border-outline-variant/20 active:scale-[0.98] transition-all min-h-[44px]"
            >
              <span>更多</span>
              {showNovaMore ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
            </button>
          </div>
        </section>

        {/* NOVA 更多資訊展開卡片 */}
        {showNovaMore && (
          <section className="p-4.5 space-y-3.5 text-xs border border-outline-variant/15 rounded-3xl bg-surface-container-lowest shadow-xs animate-in fade-in duration-150">
            <div className="flex items-center justify-between">
              <span className="font-mono font-black text-sm text-primary">NOVA · 克羅埃西亞租車</span>
              <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md">
                克國全境自駕
              </span>
            </div>

            <div className="flex items-center justify-between min-h-[40px] bg-surface-container-low/60 p-3 rounded-2xl border border-outline-variant/10">
              <div>
                <span className="text-on-surface-variant text-[11px] block">預訂編號 (Reservation ID)</span>
                <span className="font-mono font-black text-base text-primary">1508202647769</span>
              </div>
              <button 
                onClick={() => copyToClipboard('1508202647769', 'nova-code')}
                className="flex items-center gap-1 text-xs font-bold text-primary hover:bg-primary/10 px-3 py-1.5 rounded-xl border border-primary/20 transition-colors bg-white shadow-2xs"
              >
                {copied === 'nova-code' ? <CheckCircle2 size={12} className="text-emerald-600" /> : <Copy size={12} />}
                <span>{copied === 'nova-code' ? '已複製' : '複製'}</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <div>
                <span className="text-on-surface-variant text-[11px] block">主駕駛人</span>
                <span className="font-bold text-on-surface text-xs sm:text-sm">許振宏</span>
              </div>
              <div>
                <span className="text-on-surface-variant text-[11px] block">費用支付</span>
                <span className="font-mono font-bold text-on-surface text-xs sm:text-sm">€1,346.20 (到店付款)</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <span className="text-on-surface-variant text-[11px] block">預訂車型</span>
                <span className="text-on-surface font-medium">VW Tiguan 或同級 · 自排 · 5人座</span>
              </div>
              <div>
                <span className="text-on-surface-variant text-[11px] block">保險方案</span>
                <span className="text-primary font-bold">Premium Coverage · 自負額 €0</span>
              </div>
            </div>

            <div className="pt-2.5 border-t border-outline-variant/10 space-y-2">
              <div className="bg-surface-container-low/40 p-2.5 rounded-xl space-y-0.5">
                <span className="text-primary font-bold block">📍 取車：薩格勒布市中心 Zagreb Downtown</span>
                <p className="text-on-surface-variant">10/07 (三) 12:30</p>
                <p className="text-[11px] text-outline">Avenija Marina Držića 21, Zagreb, 10000</p>
              </div>

              <div className="bg-surface-container-low/40 p-2.5 rounded-xl space-y-0.5">
                <span className="text-primary font-bold block">📍 還車：杜布羅夫尼克機場 Dubrovnik Airport (DBV)</span>
                <p className="text-on-surface-variant">10/21 (三) 12:30</p>
                <p className="text-[11px] text-outline">Cilipi, Zracna Luka Dubrovnik, Dubrovnik, 20213</p>
              </div>
            </div>

            <div className="pt-2 border-t border-outline-variant/10 space-y-1">
              <span className="font-bold text-on-surface block">取車必備證件：</span>
              <p className="text-on-surface-variant">護照正本 · 台灣駕照正本 · 國際駕照 (IDP) · 主駕駛實體信用卡</p>
            </div>

            <div className="space-y-2 pt-1">
              <div className="p-3 bg-amber-500/10 rounded-2xl border border-amber-300/40 text-amber-950 font-bold text-xs">
                💡 重要：如遇擦撞或事故，務必報警並取得 Police Report 以便保險理賠。
              </div>
              <div className="p-3 bg-surface-container-high/60 rounded-2xl text-on-surface font-medium text-xs">
                🏢 還車說明：NOVA 於 DBV 機場與 Sicily by Car 共用櫃檯，<strong className="text-primary font-bold">請認明 NOVA 標誌</strong>。
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

