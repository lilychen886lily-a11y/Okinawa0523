import { useState } from 'react';
import { 
  Plane, CreditCard, ShieldAlert, Car, 
  ClipboardList, AlertCircle, CheckCircle2, ChevronRight,
  Sparkles, ExternalLink, MapPin
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function AirportInfo() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'airport' | 'tax' | 'ztl' | 'parking' | 'todos'>('airport');

  const openGoogleMaps = (query: string) => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`, '_blank');
  };

  return (
    <div className="mt-20 px-4 pb-44 max-w-xl mx-auto space-y-4">
      {/* 頂部標題 */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-on-surface tracking-tight font-mono">
          注意事項
        </h1>
        <p className="text-xs font-bold text-on-surface-variant font-mono mt-0.5">
          重要須知 · 機場 · 退稅 · ZTL · 停車 · 清單
        </p>
      </div>

      {/* 5 大分類 Tab（可橫向滾動，手機友善） */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar -mx-1 px-1">
        <button
          onClick={() => setActiveTab('airport')}
          className={`px-3 py-2 rounded-2xl text-xs font-black shrink-0 transition-all ${
            activeTab === 'airport'
              ? 'bg-primary text-white shadow-xs'
              : 'bg-surface-container-lowest text-on-surface-variant hover:text-on-surface border border-outline-variant/15'
          }`}
        >
          機場資訊
        </button>
        <button
          onClick={() => setActiveTab('tax')}
          className={`px-3 py-2 rounded-2xl text-xs font-black shrink-0 transition-all ${
            activeTab === 'tax'
              ? 'bg-emerald-700 text-white shadow-xs'
              : 'bg-surface-container-lowest text-on-surface-variant hover:text-on-surface border border-outline-variant/15'
          }`}
        >
          退稅指南
        </button>
        <button
          onClick={() => setActiveTab('ztl')}
          className={`px-3 py-2 rounded-2xl text-xs font-black shrink-0 transition-all ${
            activeTab === 'ztl'
              ? 'bg-amber-700 text-white shadow-xs'
              : 'bg-surface-container-lowest text-on-surface-variant hover:text-on-surface border border-outline-variant/15'
          }`}
        >
          ZTL 禁行區
        </button>
        <button
          onClick={() => setActiveTab('parking')}
          className={`px-3 py-2 rounded-2xl text-xs font-black shrink-0 transition-all ${
            activeTab === 'parking'
              ? 'bg-blue-700 text-white shadow-xs'
              : 'bg-surface-container-lowest text-on-surface-variant hover:text-on-surface border border-outline-variant/15'
          }`}
        >
          停車規範
        </button>
        <button
          onClick={() => setActiveTab('todos')}
          className={`px-3 py-2 rounded-2xl text-xs font-black shrink-0 transition-all ${
            activeTab === 'todos'
              ? 'bg-slate-800 text-white shadow-xs'
              : 'bg-surface-container-lowest text-on-surface-variant hover:text-on-surface border border-outline-variant/15'
          }`}
        >
          行前提醒
        </button>
      </div>

      {/* ======================= 1. 機場資訊 ======================= */}
      {activeTab === 'airport' && (
        <div className="space-y-3 animate-in fade-in duration-150">
          {/* 米蘭馬爾彭薩機場 */}
          <section className="bg-surface-container-lowest rounded-3xl p-5 border border-outline-variant/15 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-primary font-mono">
                MILAN · MXP
              </span>
              <span className="text-[11px] font-bold text-on-surface-variant bg-surface-container px-2 py-0.5 rounded-md">
                第一組抵達/出發
              </span>
            </div>
            <div>
              <h3 className="text-base font-black text-on-surface">米蘭馬爾彭薩機場 (MXP T1)</h3>
              <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                長榮 BR95 直飛抵達航廈為 <strong>Terminal 1</strong>。取車租車櫃檯位於 T1 地下一樓 (Floor -1)。
              </p>
            </div>
            <div className="p-3 bg-surface-container-low rounded-2xl text-xs space-y-1">
              <span className="font-bold text-on-surface block">往返市區快線：</span>
              <p className="text-on-surface-variant">
                <strong>Malpensa Express</strong> 約 50 分鐘直達 Milano Centrale 中央車站（單程 €13）。
              </p>
            </div>
          </section>

          {/* 薩格勒布機場 */}
          <section className="bg-surface-container-lowest rounded-3xl p-5 border border-outline-variant/15 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-primary font-mono">
                ZAGREB · ZAG
              </span>
              <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md">
                10/06 全員會合
              </span>
            </div>
            <div>
              <h3 className="text-base font-black text-on-surface">薩格勒布弗拉尼奧·圖季曼機場 (ZAG)</h3>
              <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                第二組（小花、頭家娘）搭乘卡達 QR215 於 10/06 12:45 抵達 ZAG。出境大廳設有接駁巴士與計程車招呼站。
              </p>
            </div>
            <div className="p-3 bg-surface-container-low rounded-2xl text-xs space-y-1">
              <span className="font-bold text-on-surface block">往返市區巴士：</span>
              <p className="text-on-surface-variant">
                <strong>Pleso Prijevoz</strong> 機場接駁巴士每 30 分鐘一班，直達薩格勒布巴士總站 (Autobusni Kolodvor)（車程約 30 分鐘，約 €8）。
              </p>
            </div>
          </section>

          {/* 杜布羅夫尼克機場 */}
          <section className="bg-surface-container-lowest rounded-3xl p-5 border border-outline-variant/15 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-primary font-mono">
                DUBROVNIK · DBV
              </span>
              <span className="text-[11px] font-bold text-on-surface-variant bg-surface-container px-2 py-0.5 rounded-md">
                克國還車與離境
              </span>
            </div>
            <div>
              <h3 className="text-base font-black text-on-surface">杜布羅夫尼克機場 (DBV)</h3>
              <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                NOVA 還車櫃檯位於機場航廈租車專區（與 Sicily by Car 共用櫃檯，認明 NOVA 標誌）。
              </p>
            </div>
            <div className="p-3 bg-surface-container-low rounded-2xl text-xs space-y-1">
              <span className="font-bold text-on-surface block">古城往返接駁：</span>
              <p className="text-on-surface-variant">
                <strong>Platanus 接駁巴士</strong> 直達古城派勒門 (Pile Gate) 與中央巴士總站（單程約 €10，車程 35 分鐘）。
              </p>
            </div>
          </section>
        </div>
      )}

      {/* ======================= 2. 退稅指南 ======================= */}
      {activeTab === 'tax' && (
        <div className="space-y-3 animate-in fade-in duration-150">
          <section className="bg-surface-container-lowest rounded-3xl p-5 border border-outline-variant/15 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-emerald-700 font-mono font-black text-xs">
              <CreditCard size={16} />
              <span>歐洲退稅流程 (TAX FREE)</span>
            </div>

            <div>
              <h3 className="text-base font-black text-on-surface">義大利消費滿 €70 即可退稅</h3>
              <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                離開歐盟最後一站機場時辦理。主要退稅系統為 Global Blue 與 Planet Tax Free。
              </p>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200/60 space-y-1">
                <span className="font-bold text-emerald-950 block">Step 1：購物索取 Tax Free 單據</span>
                <p className="text-emerald-900 leading-relaxed">
                  結帳時出示護照正本，向店家索取退稅單（確認英文姓名、護照號碼無誤）。
                </p>
              </div>

              <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200/60 space-y-1">
                <span className="font-bold text-emerald-950 block">Step 2：機場海關電子審核 (Otello 機台)</span>
                <p className="text-emerald-900 leading-relaxed">
                  託運行李前，至機場 Customs / Tax Free 自助機台掃描護照與退稅單 QRCode，綠燈即代表電子審核成功（不需人工海關蓋章）。
                </p>
              </div>

              <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200/60 space-y-1">
                <span className="font-bold text-emerald-950 block">Step 3：領取退稅款</span>
                <p className="text-emerald-900 leading-relaxed">
                  最推薦退回原信用卡（通常 5-10 工作天入帳），亦可至退稅公司櫃檯領取現金歐元。
                </p>
              </div>
            </div>

            <div className="p-3 bg-amber-500/10 rounded-2xl border border-amber-300/40 text-amber-950 text-xs font-bold">
              重要：退稅商品請保持全新完整包裝，若遇海關抽查需出示備查。
            </div>
          </section>
        </div>
      )}

      {/* ======================= 3. ZTL 禁行區 ======================= */}
      {activeTab === 'ztl' && (
        <div className="space-y-3 animate-in fade-in duration-150">
          <section className="bg-surface-container-lowest rounded-3xl p-5 border border-outline-variant/15 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-amber-700 font-mono font-black text-xs">
              <ShieldAlert size={16} />
              <span>義大利 ZTL (Zona a Traffico Limitato)</span>
            </div>

            <div>
              <h3 className="text-base font-black text-amber-950">千萬不要開入紅圈 ZTL 告示牌區內！</h3>
              <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                義大利歷史古城（米蘭、羅馬、佛羅倫斯、威尼斯外圍等）核心區皆設有攝影機抓拍。無通行許可誤闖，每通過一次攝影機罰款 <strong>€110 - €350 歐元</strong>！
              </p>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-3.5 bg-surface-container-low rounded-2xl space-y-1">
                <span className="font-bold text-on-surface block">規避原則 1：停車於 ZTL 區外大型停車場</span>
                <p className="text-on-surface-variant leading-relaxed">
                  將車輛停放在外圍地下停車場或轉乘大眾運輸，步行進古城區。
                </p>
              </div>

              <div className="p-3.5 bg-surface-container-low rounded-2xl space-y-1">
                <span className="font-bold text-on-surface block">規避原則 2：飯店白名單申報</span>
                <p className="text-on-surface-variant leading-relaxed">
                  若住宿飯店位於 ZTL 區內，入住時務必主動提供車牌號碼給櫃檯，請飯店向交警白名單系統申報銷單。
                </p>
              </div>
            </div>

            <div className="p-3 bg-red-500/10 rounded-2xl border border-red-300/40 text-red-950 text-xs font-bold">
              辨識標誌：白底圓形帶紅圈，寫有「Zona Traffico Limitato」及通行時間，下方有監視器符號。
            </div>
          </section>
        </div>
      )}

      {/* ======================= 4. 停車規範 ======================= */}
      {activeTab === 'parking' && (
        <div className="space-y-3 animate-in fade-in duration-150">
          <section className="bg-surface-container-lowest rounded-3xl p-5 border border-outline-variant/15 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-blue-700 font-mono font-black text-xs">
              <Car size={16} />
              <span>克羅埃西亞 停車分區與計費</span>
            </div>

            <div>
              <h3 className="text-base font-black text-on-surface">克國三大 Zone 停車標示</h3>
              <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                街邊停車格旁設有自動繳費機（支援刷卡或歐元硬幣），亦可使用簡訊繳費。
              </p>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-3.5 bg-red-50 rounded-2xl border border-red-200/60 space-y-1">
                <span className="font-bold text-red-950 block">Zone 1 (紅區 · 最貴)</span>
                <p className="text-red-900 leading-relaxed">
                  靠近古城與市中心核心。費率約 €2 - €4 / 小時，通常限制最長停 2 小時。
                </p>
              </div>

              <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200/60 space-y-1">
                <span className="font-bold text-amber-950 block">Zone 2 (黃區 · 中等)</span>
                <p className="text-amber-900 leading-relaxed">
                  次核心商圈。費率約 €1.5 - €2.5 / 小時，無嚴格時間限制。
                </p>
              </div>

              <div className="p-3.5 bg-blue-50 rounded-2xl border border-blue-200/60 space-y-1">
                <span className="font-bold text-blue-950 block">Zone 3 (綠/藍區 · 經濟)</span>
                <p className="text-blue-900 leading-relaxed">
                  離古城步行約 10-15 分鐘。費率最實惠（約 €1 / 小時或單日 €8）。
                </p>
              </div>
            </div>

            <div className="p-3.5 bg-surface-container-low rounded-2xl text-xs space-y-1">
              <span className="font-bold text-on-surface block">十六湖國家公園 (Plitvice) 停車：</span>
              <p className="text-on-surface-variant leading-relaxed">
                入口 1 (Entrance 1) 與入口 2 (Entrance 2) 均設有大型停車場，約 €1.50 / 小時，駛離時自動繳費機繳費即可。
              </p>
            </div>
          </section>
        </div>
      )}

      {/* ======================= 5. 行前提醒 ======================= */}
      {activeTab === 'todos' && (
        <div className="space-y-3 animate-in fade-in duration-150">
          <section className="bg-surface-container-lowest rounded-3xl p-5 border border-outline-variant/15 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-800 font-mono font-black text-xs">
                <ClipboardList size={16} />
                <span>行前必備清單與提醒</span>
              </div>
              <button 
                onClick={() => navigate('/todos')}
                className="flex items-center gap-1 text-[11px] font-bold text-primary hover:underline"
              >
                <span>完整清單管理</span>
                <ExternalLink size={12} />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-3.5 bg-surface-container-low rounded-2xl space-y-1">
                <span className="font-bold text-on-surface block">🪪 證件與機票</span>
                <p className="text-on-surface-variant leading-relaxed">
                  護照正本（效期 6 個月以上）、台灣駕照正本、國際駕照 (IDP) 正本、電子機票截圖與保險單。
                </p>
              </div>

              <div className="p-3.5 bg-surface-container-low rounded-2xl space-y-1">
                <span className="font-bold text-on-surface block">💳 支付與網卡</span>
                <p className="text-on-surface-variant leading-relaxed">
                  實體雙幣信用卡（租車押金必備，不收虛擬卡/AMEX）、少許歐元現鈔備用、歐洲 eSIM / 漫遊已開通。
                </p>
              </div>

              <div className="p-3.5 bg-surface-container-low rounded-2xl space-y-1">
                <span className="font-bold text-on-surface block">🔌 電器與轉接頭</span>
                <p className="text-on-surface-variant leading-relaxed">
                  歐洲雙圓孔轉接頭（Type C / F 規）、行動電源（需隨身攜帶，不可託運）、車用手機架與車充線。
                </p>
              </div>

              <div className="p-3.5 bg-surface-container-low rounded-2xl space-y-1">
                <span className="font-bold text-on-surface block">💊 常備藥品與保暖</span>
                <p className="text-on-surface-variant leading-relaxed">
                  個人常備藥、腸胃藥、防蚊液、防曬用品、洋蔥式穿搭薄外套（歐洲早晚溫差大）。
                </p>
              </div>
            </div>

            <div className="p-3 bg-primary/10 rounded-2xl border border-primary/20 text-primary text-xs font-bold flex items-center justify-between">
              <span>有待辦事項需要分工？</span>
              <button 
                onClick={() => navigate('/todos')}
                className="px-3 py-1.5 bg-primary text-white rounded-xl text-xs font-bold shadow-xs active:scale-95 transition-all"
              >
                前往待辦事項 ➜
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
