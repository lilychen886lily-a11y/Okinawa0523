import { Menu, ChevronLeft, Home } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, onSnapshot, query } from 'firebase/firestore';

export function TopBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';
  const searchParams = new URLSearchParams(location.search);
  const dayIndex = parseInt(searchParams.get('day') || '0');
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
    if (path.startsWith('/itinerary')) {
      const dates = ['5/23 第一天', '5/24 第二天', '5/25 第三天', '5/26 第四天', '5/27 第五天', '5/28 第六天'];
      return (dates[dayIndex] || '行程') + ' 行程';
    }
    if (path.startsWith('/car-rental')) return '租車資訊';
    if (path.startsWith('/parking')) return '停車詳情';
    if (path.startsWith('/airport-info')) return '機場接送';
    if (path.startsWith('/accommodation')) return '住宿行程表';
    if (path.startsWith('/flights')) return '機票詳情';
    if (path.startsWith('/budget')) return '公積金預算';
    return '詳情';
  };

  return (
    <header className="bg-white/80 backdrop-blur-xl fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-4 w-full border-b border-outline-variant/10">
      <div className="flex items-center gap-3">
        {isHome ? (
          <button className="text-primary hover:bg-surface-container p-2 rounded-full transition-colors active:scale-95">
            <Menu size={24} />
          </button>
        ) : (
          <button onClick={() => navigate(-1)} className="text-primary hover:bg-surface-container p-2 rounded-full transition-colors active:scale-95">
            <ChevronLeft size={24} />
          </button>
        )}
        <h1 className="font-extrabold tracking-tight text-lg text-on-surface">
          {isHome ? '沖繩之旅' : getTitle(location.pathname)}
        </h1>
      </div>
      
      {!isHome && (
        <button onClick={() => navigate('/')} className="text-primary p-2 rounded-full hover:bg-surface-container transition-colors">
          <Home size={20} fill="currentColor" />
        </button>
      )}

      {isHome && (
        <button 
          onClick={() => navigate('/budget')}
          className="flex flex-col items-end px-4 py-2 bg-primary/5 rounded-2xl border border-primary/10 active:scale-95 transition-all shadow-sm"
        >
          <span className="text-[10px] font-bold text-primary uppercase tracking-tighter">公積金餘額</span>
          <span className="text-sm font-black text-primary leading-tight">¥ {balance.toLocaleString()}</span>
        </button>
      )}
    </header>
  );
}
