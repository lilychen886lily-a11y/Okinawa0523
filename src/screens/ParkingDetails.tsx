import { ShieldAlert, Car, MapPin, AlertCircle, Home, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function ParkingDetails() {
  const navigate = useNavigate();

  return (
    <div className="mt-20 px-4 pb-44 max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-amber-800 font-black text-xs uppercase tracking-widest block">🇮🇹🇭🇷 駕駛安全警示</span>
          <h1 className="text-2xl font-black text-on-surface tracking-tight">ZTL 禁行區與克國停車規範</h1>
        </div>
        <button 
          onClick={() => navigate('/')}
          className="p-2.5 rounded-2xl bg-surface-container-lowest border border-outline-variant/10 shadow-sm hover:bg-surface-container-low transition-colors"
        >
          <Home size={18} className="text-on-surface" />
        </button>
      </div>

      {/* ZTL Italy Warning */}
      <section className="bg-amber-50 p-5 rounded-3xl border border-amber-200 space-y-4 relative overflow-hidden">
        <div className="flex items-center gap-2 text-amber-900 font-black text-xs uppercase tracking-wider">
          <ShieldAlert size={18} className="text-amber-600" />
          <span>🇮🇹 義大利 ZTL (Zona a Traffico Limitato) 限行區</span>
        </div>

        <h3 className="text-xl font-black text-amber-950">千萬不要開入紅圈 ZTL 告示牌區內！</h3>
        <p className="text-xs text-amber-900 leading-relaxed font-medium">
          義大利歷史古城（羅馬、佛羅倫斯、米蘭）中心區域皆為 ZTL 限行區。未具許可開入每次罰款 €110 - €350 歐元！
        </p>

        <div className="space-y-2 text-xs text-amber-950 font-medium">
          <div className="p-3 bg-white/80 rounded-2xl border border-amber-200">
            <strong>規避原則 1：</strong> 選擇將車停在 ZTL 區域外的付費地下停車場（如佛羅倫斯 Villa Costanza 或車站地下停車場）。
          </div>
          <div className="p-3 bg-white/80 rounded-2xl border border-amber-200">
            <strong>規避原則 2：</strong> 若住宿飯店位於 ZTL 區內，入住時務必請飯店協助向當地交警白名單系統報備車牌號碼。
          </div>
        </div>
      </section>

      {/* Croatia Parking Rules */}
      <section className="bg-surface-container-lowest p-5 rounded-3xl border border-outline-variant/10 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-primary font-black text-xs uppercase tracking-wider">
          <Car size={16} />
          <span>🇭🇷 克羅埃西亞 停車格顏色與簡訊繳費</span>
        </div>

        <h3 className="text-xl font-black text-on-surface">克羅埃西亞三大 Zone 停車費標示</h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3.5 bg-red-50 rounded-2xl border border-red-200 space-y-1">
            <span className="font-extrabold text-red-900 block">Zone 1 (紅區)</span>
            <p className="text-red-800">最靠近古城核心區。費率較高（約 €2-€4/小時），通常限制最長停 2 小時。</p>
          </div>

          <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200 space-y-1">
            <span className="font-extrabold text-amber-900 block">Zone 2 (黃區)</span>
            <p className="text-amber-800">次核心商業區。費率中等（約 €1.5-€2.5/小時），無停車時間限制。</p>
          </div>

          <div className="p-3.5 bg-blue-50 rounded-2xl border border-blue-200 space-y-1">
            <span className="font-extrabold text-blue-900 block">Zone 3 (綠/藍區)</span>
            <p className="text-blue-800">距離古城步行 10-15 分鐘。費率最便宜（約 €1/小時或全天 €8）。</p>
          </div>
        </div>

        <div className="p-4 bg-surface-container-high/40 rounded-2xl text-xs space-y-1">
          <span className="font-black text-on-surface block">Plitvice 十六湖國家公園停車：</span>
          <p className="text-on-surface-variant leading-relaxed">
             Entrance 1 (一號入口) 與 Entrance 2 (二號入口) 皆備有大型林蔭停車場 P1 & P2，每小時約 €1.50 歐元，駛離時於自動繳費機刷卡付費即可。
          </p>
        </div>
      </section>
    </div>
  );
}
