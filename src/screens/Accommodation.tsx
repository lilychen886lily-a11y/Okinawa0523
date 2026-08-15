import { Home, ChevronLeft, MapPin, Phone, Star, Coffee, Wifi, ShieldAlert, Navigation, Wine } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

export function Accommodation() {
  const navigate = useNavigate();

  const accommodationsData = [
    {
      dates: '09/27 - 09/30 (3晚)',
      location: '🇮🇹 義大利 · 羅馬老城區',
      name: 'NH Collection Roma Fori Imperiali',
      style: '帝國廣場古蹟景觀奢華酒店',
      price: '3晚約 €1,280',
      rating: 5,
      desc: '坐落於羅馬帝國廣場旁，飯店頂樓露台能直接飽覽古羅馬廣場與古蹟全景。步行即可抵達威尼斯廣場、萬神殿與特萊維許願池。',
      features: ['帝國廣場景', '頂樓酒吧', '頂級早餐', '老城核心'],
      address: 'Via IV Novembre, 102, 00187 Roma RM, Italy',
      phone: '+39 06 697641',
      mapUrl: 'https://maps.google.com/?q=NH+Collection+Roma+Fori+Imperiali'
    },
    {
      dates: '09/30 - 10/02 (2晚)',
      location: '🇮🇹 義大利 · 佛羅倫斯歷史中心',
      name: 'Brunelleschi Hotel Florence',
      style: '中世紀古塔精品飯店',
      price: '2晚約 €920',
      rating: 5,
      desc: '由拜占庭古塔與中世紀教堂改建而成，緊鄰聖母百花大教堂。部分房型窗外即能凝視美麗的大教堂穹頂，極具文化底蘊。',
      features: ['古塔建築', '百花大教堂景', '米其林餐廳', '精品衛浴'],
      address: 'Piazza Santa Elisabetta, 3, 50122 Firenze FI, Italy',
      phone: '+39 055 27370',
      mapUrl: 'https://maps.google.com/?q=Brunelleschi+Hotel+Florence'
    },
    {
      dates: '10/02 - 10/04 (2晚)',
      location: '🇮🇹 義大利 · 威尼斯聖馬可區',
      name: 'Hotel Danieli, Venice',
      style: '大運河奢華宮殿酒店',
      price: '2晚約 €1,450',
      rating: 5,
      desc: '14 世紀威尼斯總督奢華宅邸改建，坐落於總督宮與聖馬可廣場旁。頂樓 Terrazza Danieli 餐廳可擁抱威尼斯潟湖蔚藍景色。',
      features: ['大運河第一排', '總督宮旁', '宮殿雕飾', '水上計程車碼頭'],
      address: 'Riva degli Schiavoni, 4196, 30122 Venezia VE, Italy',
      phone: '+39 041 5226480',
      mapUrl: 'https://maps.google.com/?q=Hotel+Danieli+Venice'
    },
    {
      dates: '10/04 - 10/06 (2晚)',
      location: '🇭🇷 克羅埃西亞 · 羅維尼 (Rovinj)',
      name: 'Grand Park Hotel Rovinj',
      style: '亞德里亞海懸崖五星奢華度假村',
      price: '2晚約 €860',
      rating: 5,
      desc: '層疊設計鑲嵌於懸崖旁，房內設有無邊際無敵海景大窗，可直接飽覽羅維尼舊城天際線與亞德里亞海浪漫落日。',
      features: ['無邊際泳池', '懸崖夕陽', '米其林餐飲', 'SPA 水療'],
      address: 'Smaregliina ul. 1A, 52210, Rovinj, Croatia',
      phone: '+385 52 800 250',
      mapUrl: 'https://maps.google.com/?q=Grand+Park+Hotel+Rovinj'
    },
    {
      dates: '10/06 - 10/08 (2晚)',
      location: '🇭🇷 克羅埃西亞 · 十六湖國家公園區',
      name: 'Fenomen Plitvice Resort',
      style: '國家公園獨棟森林木屋奢華渡假村',
      price: '2晚約 €580',
      rating: 5,
      desc: '獨家位於十六湖國家公園園區深處，由獨棟北歐風格原木別墅組成。四周被芬多精森林圍繞，夜晚仰望無耿星空。',
      features: ['園區內獨棟', '原木奢華', '靜謐森林', '園區快速入場'],
      address: 'Plitvica 84, 53231, Plitvička Jezera, Croatia',
      phone: '+385 53 758 000',
      mapUrl: 'https://maps.google.com/?q=Fenomen+Plitvice+Resort'
    },
    {
      dates: '10/08 - 10/11 (3晚)',
      location: '🇭🇷 克羅埃西亞 · 斯普利特 (Split)',
      name: 'Heritage Hotel Antique Split',
      style: '戴克里先皇宮內歷史精品飯店',
      price: '3晚約 €790',
      rating: 5,
      desc: '直接坐落於三世紀羅馬皇帝戴克里先宮牆內部！保留古老石牆與木質樑柱，出門即是千古宮殿中庭與濱海大道。',
      features: ['皇宮牆內', '古蹟文化', '現作早餐', '老城中心'],
      address: 'Poljana Grgura Ninskog 1, 21000, Split, Croatia',
      phone: '+385 21 785 200',
      mapUrl: 'https://maps.google.com/?q=Heritage+Hotel+Antique+Split'
    },
    {
      dates: '10/11 - 10/13 (2晚)',
      location: '🇭🇷 克羅埃西亞 · 赫瓦爾島 (Hvar)',
      name: 'Palace Elisabeth, hvar heritage hotel',
      style: '奧匈帝國皇室古蹟奢華酒店',
      price: '2晚約 €980',
      rating: 5,
      desc: '位於赫瓦爾舊城主廣場心臟地帶，俯瞰港灣遊艇碼頭與聖斯蒂芬大教堂，奢華威尼斯哥德式建築美不勝收。',
      features: ['碼頭第一排', '無敵海景', '陽光露台', '奢華SPA'],
      address: 'Trg Svetog Stjepana 5, 21450, Hvar, Croatia',
      phone: '+385 21 750 200',
      mapUrl: 'https://maps.google.com/?q=Palace+Elisabeth+Hvar'
    },
    {
      dates: '10/13 - 10/17 (4晚)',
      location: '🇭🇷 克羅埃西亞 · 杜布羅夫尼克 (Dubrovnik)',
      name: 'Hotel Excelsior Dubrovnik',
      style: '君臨城海景懸崖五星奢華飯店',
      price: '4晚約 €1,960',
      rating: 5,
      desc: '杜布羅夫尼克最傳奇奢華酒店，英國伊莉莎白女王與無數明星指名入住。陽台可直視古城牆與蔚藍海面。',
      features: ['古城牆海景', '私人海灘', '懸崖餐廳', '奢華服務'],
      address: 'Frana Supila 12, 20000, Dubrovnik, Croatia',
      phone: '+385 20 353 000',
      mapUrl: 'https://maps.google.com/?q=Hotel+Excelsior+Dubrovnik'
    },
    {
      dates: '10/17 - 10/18 (1晚)',
      location: '🇭🇷 克羅埃西亞 · 薩格勒布 (Zagreb)',
      name: 'Esplanade Zagreb Hotel',
      style: '東方快車古典傳奇飯店',
      price: '1晚約 €260',
      rating: 5,
      desc: '1925 年為東方快車貴賓打造的裝飾藝術 (Art Deco) 傳奇飯店，充滿新古典主義貴族氣息，位於火車站與老城之間。',
      features: ['東方快車歷史', '裝飾藝術風', '黑松露精緻餐飲', '禮賓管家'],
      address: 'Mihanovićeva ul. 1, 10000, Zagreb, Croatia',
      phone: '+385 1 4566 666',
      mapUrl: 'https://maps.google.com/?q=Esplanade+Zagreb+Hotel'
    },
    {
      dates: '10/18 - 10/22 (4晚)',
      location: '🇮🇹 義大利 · 米蘭時尚中心',
      name: 'Galleria Vik Milano',
      style: '艾曼紐二世迴廊藝術奢華酒店',
      price: '4晚約 €1,820',
      rating: 5,
      desc: '直接建在米蘭艾曼紐二世迴廊內部！每間客房皆由當代著名藝術家親自手繪設計，推開窗戶即可俯瞰迴廊玻璃穹頂。',
      features: ['迴廊建築內', '藝術原創房', '米蘭大教堂旁', '頂級購物專櫃'],
      address: 'Via Silvio Pellico, 8, 20121 Milano MI, Italy',
      phone: '+39 02 89058297',
      mapUrl: 'https://maps.google.com/?q=Galleria+Vik+Milano'
    }
  ];

  return (
    <div className="mt-20 px-4 pb-44 max-w-3xl mx-auto space-y-6">
      {/* Top Title Bar */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-primary font-black text-xs uppercase tracking-widest block">🇮🇹🇭🇷 奢華旅宿總覽</span>
          <h1 className="text-2xl font-black text-on-surface tracking-tight">義大利 & 克羅埃西亞精選飯店</h1>
        </div>
        <button 
          onClick={() => navigate('/')}
          className="p-2.5 rounded-2xl bg-surface-container-lowest border border-outline-variant/10 shadow-sm hover:bg-surface-container-low transition-colors"
        >
          <Home size={18} className="text-on-surface" />
        </button>
      </div>

      {/* Accommodations List */}
      <div className="space-y-6">
        {accommodationsData.map((item, idx) => (
          <section key={idx} className="space-y-2">
            <div className="flex justify-between items-center px-1">
              <span className="text-xs font-bold text-outline uppercase tracking-wider">{item.dates}</span>
              <span className="text-xs font-extrabold text-primary px-2.5 py-0.5 bg-primary/10 rounded-full">{item.location}</span>
            </div>

            <div className="bg-surface-container-lowest rounded-3xl p-5 border border-outline-variant/10 shadow-sm space-y-3 relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary"></div>
              
              <div className="space-y-1">
                <div className="flex justify-between items-center text-amber-500">
                  <div className="flex items-center gap-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} size={14} fill="currentColor" />
                    ))}
                  </div>
                  <span className="text-xs font-black text-primary bg-primary/5 px-2.5 py-1 rounded-full">{item.price}</span>
                </div>
                <h3 className="text-xl font-black text-on-surface leading-tight">{item.name}</h3>
                <p className="text-xs font-bold text-outline">{item.style}</p>
              </div>

              <p className="text-xs text-on-surface-variant leading-relaxed">
                {item.desc}
              </p>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {item.features.map((f, i) => (
                  <span key={i} className="text-[10px] font-bold bg-surface-container-high text-on-surface-variant px-2 py-0.5 rounded-md">
                    {f}
                  </span>
                ))}
              </div>

              <div className="pt-3 border-t border-outline-variant/10 space-y-1 text-xs text-on-surface-variant">
                <div className="flex items-start gap-1.5">
                  <MapPin size={13} className="shrink-0 mt-0.5 text-primary" />
                  <span>{item.address}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Phone size={13} className="shrink-0 text-emerald-600" />
                  <span>{item.phone}</span>
                </div>
              </div>

              <button 
                onClick={() => window.open(item.mapUrl, '_blank')}
                className="flex items-center justify-center gap-2 w-full py-2.5 bg-primary text-white rounded-xl font-bold text-xs transition-transform active:scale-95 shadow-sm mt-2"
              >
                <Navigation size={15} />
                Google 地圖導航與查看
              </button>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
