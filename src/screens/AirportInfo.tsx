import { Home, ChevronLeft, MapPin, Phone, Clock, Plane, Info, Users, Train, ShieldCheck, CreditCard, Compass } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

export function AirportInfo() {
  const navigate = useNavigate();

  return (
    <div className="pt-24 px-6 pb-44 max-w-md mx-auto space-y-8">
      <button 
        onClick={() => navigate('/')}
        className="w-full py-5 bg-primary/5 text-primary border border-primary/20 rounded-xl font-bold text-lg shadow-sm flex items-center justify-center gap-2 active:scale-95 transition-transform"
      >
        <ChevronLeft size={20} />
        返回首頁 Dashboard
      </button>

      {/* Airport Hub Section */}
      <section className="space-y-4">
        <div className="flex items-end justify-between px-1">
          <h2 className="text-2xl font-extrabold tracking-tight text-primary">寧波櫟社國際機場 (NGB)</h2>
          <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Lishe Airport</span>
        </div>
        <div className="relative bg-surface-container-lowest rounded-2xl p-6 shadow-sm overflow-hidden border border-outline-variant/10">
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#0077b6]"></div>
          <div className="space-y-5">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] font-bold text-outline uppercase tracking-tighter">Airport Code</p>
                <p className="text-2xl font-extrabold text-on-surface">NGB / 櫟社 T2 航站樓</p>
              </div>
              <div className="bg-[#0077b6]/10 px-3 py-1 rounded-full border border-[#0077b6]/20">
                <span className="text-[10px] font-bold text-[#0077b6] flex items-center gap-1">
                  <Plane size={10} fill="currentColor" /> 地鐵直達
                </span>
              </div>
            </div>
            
            <div className="space-y-1.5">
              <p className="text-[10px] font-bold text-outline uppercase">航站樓資訊 Terminal Info</p>
              <p className="font-semibold text-sm text-on-surface leading-relaxed">
                寧波機場目前所有國內、國際航班均在全新的 <span className="text-primary font-bold">Terminal 2 (T2)</span> 航站樓運行。
              </p>
            </div>

            <div className="bg-primary/5 p-4 rounded-xl border border-primary/10 space-y-3">
              <div className="flex items-center gap-2 text-[#0077b6] font-bold text-xs uppercase tracking-wider">
                <Compass size={14} />
                地鐵接駁 (Metro Connection)
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed font-medium">
                航站樓 B2 層直通 <span className="font-bold text-on-surface">寧波地鐵 2 號線（櫟社機場站）</span>。搭乘地鐵前往寧波高鐵站只需 25 分鐘，前往鼓樓、城隍廟等市中心熱門區域約 30 分鐘，是避開路面擁堵的最優選擇。
              </p>
              <div className="text-[10px] font-bold text-outline">首班車 06:00 / 末班車 22:20</div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-surface-variant/30">
              <div className="flex items-center gap-2.5">
                <Users className="text-[#0077b6]" size={16} />
                <span className="text-xs font-bold text-on-surface-variant">計程車/打車定位點</span>
              </div>
              <span className="text-xs font-bold text-primary">T2 航站樓到達層一樓外</span>
            </div>
          </div>
        </div>
      </section>

      {/* Railway Station Section */}
      <section className="space-y-4">
        <div className="flex items-end justify-between px-1">
          <h2 className="text-2xl font-extrabold tracking-tight text-[#0e7490]">高鐵寧波站 (Ningbo Station)</h2>
          <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Railway Station</span>
        </div>
        <div className="bg-surface-container-low rounded-2xl p-6 space-y-4 border border-outline-variant/10">
          <h3 className="text-xl font-bold text-on-surface flex items-center gap-2">
            <Train className="text-[#0e7490]" size={20} />
            寧波高鐵南站
          </h3>
          <p className="text-sm text-on-surface-variant leading-relaxed">
            位於寧波市中心，是連接上海、杭州、溫州、福州等高鐵大動脈的核心樞紐站。
          </p>
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="bg-white p-3.5 rounded-xl border border-outline-variant/10 shadow-sm">
              <p className="text-[10px] font-bold text-outline uppercase mb-1">地鐵換乘 Metro</p>
              <p className="text-xs font-bold text-on-surface">地鐵 2 號線、4 號線</p>
            </div>
            <div className="bg-white p-3.5 rounded-xl border border-outline-variant/10 shadow-sm">
              <p className="text-[10px] font-bold text-outline uppercase mb-1">出站打車 Taxi</p>
              <p className="text-xs font-bold text-on-surface">南、北廣場地下出租車候車區</p>
            </div>
          </div>
          
          <div className="bg-[#0e7490]/5 rounded-xl p-4 border border-[#0e7490]/10 flex items-start gap-3">
            <Info className="text-[#0e7490] shrink-0 mt-0.5" size={16} />
            <p className="text-xs text-on-surface-variant leading-relaxed">
              <span className="font-bold text-on-surface">高鐵購票提示：</span>中國大陸高鐵全面實行電子客票，憑預訂證件（如台胞證、回鄉证、身份證或護照）直接刷證件進站乘車，無需兌換紙質車票。建議使用「鐵路12306」官方App購票最為安全快捷。
            </p>
          </div>
        </div>
      </section>

      {/* Payment and Transit tips */}
      <section className="bg-white px-6 py-6 rounded-2xl border border-outline-variant/10 shadow-sm space-y-4">
        <h3 className="text-lg font-bold text-on-surface flex items-center gap-2 text-primary">
          <ShieldCheck size={20} />
          快捷支付與乘車碼 (Mobile Transit)
        </h3>
        <p className="text-xs text-on-surface-variant leading-relaxed">
          寧波市公共交通極其發達，完全無需購買實體票卡。推薦以下兩種最方便的出行方案：
        </p>
        <div className="space-y-3">
          <div className="flex gap-3 items-start">
            <div className="bg-emerald-50 text-emerald-600 p-2 rounded-lg text-xs font-bold shrink-0 mt-0.5">支付寶</div>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              打開 <span className="font-bold text-on-surface">支付寶 (Alipay)</span> App ➜ 點擊首頁「出行」➜ 選擇「寧波地鐵乘車碼 / 公交乘車碼」➜ 刷碼即可秒速進站乘車，非常便捷。
            </p>
          </div>
          <div className="flex gap-3 items-start">
            <div className="bg-[#0077b6]/5 text-primary p-2 rounded-lg text-xs font-bold shrink-0 mt-0.5">微信</div>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              打開 <span className="font-bold text-on-surface">微信 (WeChat)</span> App ➜ 搜索小程序「騰訊出行碼」➜ 領取「寧波地鐵/公交乘車碼」即可。
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
