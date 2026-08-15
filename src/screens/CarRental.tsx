import { Car, Train, Ship, ShieldCheck, ChevronLeft, MapPin, AlertCircle, ExternalLink, Check, FileText, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function CarRental() {
  const navigate = useNavigate();

  return (
    <div className="mt-20 px-4 pb-44 max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-primary font-black text-xs uppercase tracking-widest block">🇮🇹🇭🇷 交通全攻略</span>
          <h1 className="text-2xl font-black text-on-surface tracking-tight">租車自駕、高鐵與渡輪指引</h1>
        </div>
        <button 
          onClick={() => navigate('/')}
          className="p-2.5 rounded-2xl bg-surface-container-lowest border border-outline-variant/10 shadow-sm hover:bg-surface-container-low transition-colors"
        >
          <Home size={18} className="text-on-surface" />
        </button>
      </div>

      {/* Cross-border Driving Card */}
      <section className="bg-surface-container-lowest p-5 rounded-3xl border border-outline-variant/10 shadow-sm space-y-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 bottom-0 w-2 bg-[#0d9488]"></div>
        
        <div className="flex items-center gap-2 text-[#0d9488] font-black text-xs uppercase tracking-wider">
          <Car size={16} />
          <span>義大利 跨國自駕至 克羅埃西亞</span>
        </div>

        <h3 className="text-xl font-black text-on-surface">申根跨境自駕與公路注意事項</h3>
        <p className="text-xs text-on-surface-variant leading-relaxed">
          從威尼斯/的里雅斯特取車，經過斯洛維尼亞進入克羅埃西亞（羅維尼、十六湖、扎達爾、斯普利特、杜布羅夫尼克）。請務必確保具備以下四大必備文件與通行許可：
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div className="p-3 bg-[#0d9488]/5 rounded-2xl border border-[#0d9488]/20 space-y-1">
            <div className="flex items-center gap-2 font-bold text-xs text-[#0d9488]">
              <FileText size={14} />
              <span>1. 國際駕照 (IDP) + 正本</span>
            </div>
            <p className="text-[11px] text-on-surface-variant">台灣國際駕照正本，同時必須隨身攜帶台灣駕照正本與護照以供公路警察查驗。</p>
          </div>

          <div className="p-3 bg-[#0d9488]/5 rounded-2xl border border-[#0d9488]/20 space-y-1">
            <div className="flex items-center gap-2 font-bold text-xs text-[#0d9488]">
              <ShieldCheck size={14} />
              <span>2. 跨國過境保險綠卡 (Green Card)</span>
            </div>
            <p className="text-[11px] text-on-surface-variant">取車時告知櫃檯將開入克羅埃西亞/蒙特內哥羅，支付跨境費並索取綠卡保險單。</p>
          </div>

          <div className="p-3 bg-[#0d9488]/5 rounded-2xl border border-[#0d9488]/20 space-y-1">
            <div className="flex items-center gap-2 font-bold text-xs text-[#0d9488]">
              <ExternalLink size={14} />
              <span>3. 斯洛維尼亞電子通行證 (Vignette)</span>
            </div>
            <p className="text-[11px] text-on-surface-variant">從義大利開往克羅埃西亞會經過斯洛維尼亞高速公路，須線上購買 Vignette 電子通行證。</p>
          </div>

          <div className="p-3 bg-[#0d9488]/5 rounded-2xl border border-[#0d9488]/20 space-y-1">
            <div className="flex items-center gap-2 font-bold text-xs text-[#0d9488]">
              <AlertCircle size={14} />
              <span>4. 零自負額全險 (Full Protection)</span>
            </div>
            <p className="text-[11px] text-on-surface-variant">建議購買包含車窗、輪胎與車底的零自負額車體險，行車更放鬆無憂。</p>
          </div>
        </div>

        <button 
          onClick={() => window.open('https://www.dars.si/vignette', '_blank')}
          className="flex items-center justify-center gap-2 w-full py-2.5 bg-[#0d9488] text-white rounded-xl font-bold text-xs shadow-sm active:scale-95 transition-transform"
        >
          <ExternalLink size={15} />
          線上購買斯洛維尼亞 e-Vignette 通行證
        </button>
      </section>

      {/* High-Speed Rail Italy */}
      <section className="bg-surface-container-lowest p-5 rounded-3xl border border-outline-variant/10 shadow-sm space-y-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 bottom-0 w-2 bg-[#005d90]"></div>

        <div className="flex items-center gap-2 text-[#005d90] font-black text-xs uppercase tracking-wider">
          <Train size={16} />
          <span>義大利高鐵 (Trenitalia Frecciarossa / Italo)</span>
        </div>

        <h3 className="text-xl font-black text-on-surface">義大利高鐵快速移動（羅馬 - 佛羅倫斯 - 威尼斯）</h3>
        <p className="text-xs text-on-surface-variant leading-relaxed">
          義大利三大名城之間搭乘紅箭 (Frecciarossa) 或 Italo 高鐵，時速可達 300 km/h，省時舒適且直達市中心車站。
        </p>

        <div className="space-y-2 text-xs">
          <div className="p-3 bg-surface-container-high/50 rounded-2xl flex justify-between items-center">
            <div>
              <span className="font-extrabold text-on-surface block">羅馬 Termini 🚄 佛羅倫斯 S.M.N.</span>
              <span className="text-[10px] text-outline">車程僅需 1 小時 32 分鐘</span>
            </div>
            <span className="font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full">約 €35 - €65</span>
          </div>

          <div className="p-3 bg-surface-container-high/50 rounded-2xl flex justify-between items-center">
            <div>
              <span className="font-extrabold text-on-surface block">佛羅倫斯 S.M.N. 🚄 威尼斯 S. Lucia</span>
              <span className="text-[10px] text-outline">車程僅需 2 小時 15 分鐘</span>
            </div>
            <span className="font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full">約 €40 - €75</span>
          </div>
        </div>

        <button 
          onClick={() => window.open('https://www.trenitalia.com', '_blank')}
          className="flex items-center justify-center gap-2 w-full py-2.5 bg-[#005d90] text-white rounded-xl font-bold text-xs shadow-sm active:scale-95 transition-transform"
        >
          <ExternalLink size={15} />
          前往義大利國鐵 Trenitalia 官網預訂
        </button>
      </section>

      {/* Ferries Croatia */}
      <section className="bg-surface-container-lowest p-5 rounded-3xl border border-outline-variant/10 shadow-sm space-y-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 bottom-0 w-2 bg-[#0077b6]"></div>

        <div className="flex items-center gap-2 text-[#0077b6] font-black text-xs uppercase tracking-wider">
          <Ship size={16} />
          <span>克羅埃西亞跳島渡輪 (Jadrolinija & Krilo)</span>
        </div>

        <h3 className="text-xl font-black text-on-surface">亞德里亞海跳島與車輛渡輪</h3>
        <p className="text-xs text-on-surface-variant leading-relaxed">
          連結斯普利特 (Split)、赫瓦爾島 (Hvar) 與杜布羅夫尼克 (Dubrovnik)。乘客快艇 Catamaran 速度快；載車渡輪 Ferry 可以直接開車上船。
        </p>

        <div className="space-y-2 text-xs">
          <div className="p-3 bg-surface-container-high/50 rounded-2xl flex justify-between items-center">
            <div>
              <span className="font-extrabold text-on-surface block">斯普利特 Split 🛥 赫瓦爾 Hvar</span>
              <span className="text-[10px] text-outline">Jadrolinija / Krilo 快艇 1 小時</span>
            </div>
            <span className="font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full">約 €20 / 人</span>
          </div>

          <div className="p-3 bg-surface-container-high/50 rounded-2xl flex justify-between items-center">
            <div>
              <span className="font-extrabold text-on-surface block">赫瓦爾 Hvar 🛥 杜布羅夫尼克 Dubrovnik</span>
              <span className="text-[10px] text-outline">絕景海航線約 3.5 小時</span>
            </div>
            <span className="font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full">約 €45 / 人</span>
          </div>
        </div>

        <button 
          onClick={() => window.open('https://www.jadrolinija.hr/en', '_blank')}
          className="flex items-center justify-center gap-2 w-full py-2.5 bg-[#0077b6] text-white rounded-xl font-bold text-xs shadow-sm active:scale-95 transition-transform"
        >
          <ExternalLink size={15} />
          Jadrolinija 渡輪時刻表查詢
        </button>
      </section>
    </div>
  );
}
