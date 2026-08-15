import { Plane, ShieldCheck, CreditCard, ChevronLeft, Home, Navigation, AlertCircle, FileCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function AirportInfo() {
  const navigate = useNavigate();

  return (
    <div className="mt-20 px-4 pb-44 max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-primary font-black text-xs uppercase tracking-widest block">🇮🇹🇭🇷 機場與海關通關</span>
          <h1 className="text-2xl font-black text-on-surface tracking-tight">歐洲海關退稅與機場指引</h1>
        </div>
        <button 
          onClick={() => navigate('/')}
          className="p-2.5 rounded-2xl bg-surface-container-lowest border border-outline-variant/10 shadow-sm hover:bg-surface-container-low transition-colors"
        >
          <Home size={18} className="text-on-surface" />
        </button>
      </div>

      {/* Tax Refund Section */}
      <section className="bg-surface-container-lowest p-5 rounded-3xl border border-outline-variant/10 shadow-sm space-y-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 bottom-0 w-2 bg-emerald-600"></div>

        <div className="flex items-center gap-2 text-emerald-700 font-black text-xs uppercase tracking-wider">
          <CreditCard size={16} />
          <span>歐洲海關退稅 (Global Blue / Planet Tax Free)</span>
        </div>

        <h3 className="text-xl font-black text-on-surface">米蘭 MXP / 羅馬 FCO 退稅 Step-by-Step</h3>
        <p className="text-xs text-on-surface-variant leading-relaxed">
          義大利退稅門檻為單店消費滿 €70 起即可索取退稅單。在離開歐盟的最後一座機場（米蘭 MXP 或 羅馬 FCO）辦理退稅手續：
        </p>

        <div className="space-y-3 text-xs">
          <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-1">
            <span className="font-extrabold text-emerald-900 block">Step 1: 購物索取單據</span>
            <p className="text-emerald-800">結帳時出示護照，要求開立 Tax Free Form（填妥英文姓名、護照號碼與信用卡號）。</p>
          </div>

          <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-1">
            <span className="font-extrabold text-emerald-900 block">Step 2: 機場海關蓋章 / 電子驗證 (Otello 系統)</span>
            <p className="text-emerald-800">辦理登機手續並託運行李前，至 Customs Tax Free 機器掃描護照與退稅單 QRCode（大部分單據可直接免人工蓋章自動審核通過）。</p>
          </div>

          <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-1">
            <span className="font-extrabold text-emerald-900 block">Step 3: 投遞或領取退稅款</span>
            <p className="text-emerald-800">選擇退回信用卡（約 5-10 個工作天入帳，最推薦）或至 Global Blue / Planet 櫃檯領取現金歐元。</p>
          </div>
        </div>
      </section>

      {/* Major Airports */}
      <section className="bg-surface-container-lowest p-5 rounded-3xl border border-outline-variant/10 shadow-sm space-y-4">
        <h3 className="text-lg font-black text-on-surface flex items-center gap-2">
          <Plane className="text-primary" size={18} />
          主要機場交通接駁
        </h3>

        <div className="space-y-3 text-xs">
          <div className="p-4 bg-surface-container-high/40 rounded-2xl space-y-1">
            <span className="font-black text-on-surface text-sm block">羅馬菲烏米奇諾機場 (FCO) ✈ 市區</span>
            <p className="text-on-surface-variant leading-relaxed">
              搭乘 <strong>Leonardo Express 機場快線</strong>，每 15 分鐘一班，32 分鐘無停靠直達 Roma Termini 中央車站（單程 €14）。
            </p>
          </div>

          <div className="p-4 bg-surface-container-high/40 rounded-2xl space-y-1">
            <span className="font-black text-on-surface text-sm block">米蘭馬爾彭薩機場 (MXP) ✈ 市區</span>
            <p className="text-on-surface-variant leading-relaxed">
              搭乘 <strong>Malpensa Express 機場快線</strong>，約 50 分鐘直達 Milano Centrale 中央車站或 Milano Cadorna 站（單程 €13）。
            </p>
          </div>

          <div className="p-4 bg-surface-container-high/40 rounded-2xl space-y-1">
            <span className="font-black text-on-surface text-sm block">杜布羅夫尼克機場 (DBV) ✈ 古城</span>
            <p className="text-on-surface-variant leading-relaxed">
              搭乘 Platanus 機場接駁巴士，約 35 分鐘到達古城派勒門 (Pile Gate) 或巴士總站（單程約 €10）。
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
