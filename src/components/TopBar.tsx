import { Menu, ChevronLeft, Home } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, onSnapshot, query } from 'firebase/firestore';

export function TopBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const q = query(collection(db, 'transactions'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const transactions = snapshot.docs.map(doc => doc.data());
      const totalIncome = transactions
        .filter((t: any) => t.type === 'income')
        .reduce((acc, curr: any) => acc + curr.amount, 0);
      const totalExpense = transactions
        .filter((t: any) => t.type === 'expense')
        .reduce((acc, curr: any) => acc + curr.amount, 0);
      setBalance(totalIncome - totalExpense);
    });

    return () => unsubscribe();
  }, []);

  const getTitle = (path: string) => {
    if (path.startsWith('/itinerary')) return '每日行程';
    if (path.startsWith('/car-rental')) return '租車交通';
    if (path.startsWith('/parking')) return '停車・ZTL';
    if (path.startsWith('/airport-info')) return '注意事項';
    if (path.startsWith('/accommodation')) return '住宿';
    if (path.startsWith('/flights')) return '航班';
    if (path.startsWith('/budget')) return '旅費';
    if (path.startsWith('/todos')) return '行前清單';
    return '詳情';
  };

  return (
    <header className="bg-white/90 backdrop-blur-xl fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-4 py-3 h-14 sm:h-16 w-full border-b border-outline-variant/10">
      <div className="flex items-center gap-2 min-w-0 flex-1 pr-2">
        {isHome ? (
          <button 
            aria-label="開啟選單"
            className="text-primary hover:bg-surface-container w-11 h-11 flex items-center justify-center rounded-2xl transition-colors active:scale-95 shrink-0"
          >
            <Menu size={22} />
          </button>
        ) : (
          <button 
            onClick={() => navigate(-1)} 
            aria-label="返回上一頁"
            className="text-primary hover:bg-surface-container w-11 h-11 flex items-center justify-center rounded-2xl transition-colors active:scale-95 shrink-0"
          >
            <ChevronLeft size={22} />
          </button>
        )}
        <h1 className="font-black tracking-tight text-base text-on-surface truncate min-w-0">
          {isHome ? '義大利 × 克羅埃西亞' : getTitle(location.pathname)}
        </h1>
      </div>
      
      {!isHome && (
        <button 
          onClick={() => navigate('/')} 
          aria-label="回首頁"
          className="text-primary w-11 h-11 flex items-center justify-center rounded-2xl hover:bg-surface-container transition-colors shrink-0 active:scale-95"
        >
          <Home size={20} />
        </button>
      )}

      {isHome && (
        <button 
          onClick={() => navigate('/budget')}
          aria-label="查看旅費"
          className="px-3 py-1.5 rounded-xl bg-primary/5 border border-primary/10 active:scale-95 transition-all shrink-0 text-right"
        >
          <span className="text-[10px] font-bold text-primary block leading-tight">
            旅費
          </span>
          <span className="text-sm font-black text-primary leading-tight font-mono">
            € {balance.toLocaleString()}
          </span>
        </button>
      )}
    </header>
  );
}
