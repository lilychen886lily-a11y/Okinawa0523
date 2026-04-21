import React, { useState, useEffect } from 'react';
import { Wallet, TrendingUp, History, UserCheck, AlertCircle, Plus, Minus, X, Calendar as CalendarIcon, Tag, FileText, Trash2 } from 'lucide-react';
import { db } from '../lib/firebase';
import { collection, addDoc, onSnapshot, query, orderBy, deleteDoc, doc } from 'firebase/firestore';
import { cn } from '@/lib/utils';

interface Transaction {
  id: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  description: string;
  date: string;
  addedBy: string;
}

export function Budget() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const tripDates = [
    '2026-05-23', '2026-05-24', '2026-05-25', '2026-05-26', '2026-05-27', '2026-05-28'
  ];

  // Form state
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(tripDates[0]);
  const [description, setDescription] = useState('');
  const [addedBy, setAddedBy] = useState('');

  useEffect(() => {
    const q = query(collection(db, 'transactions'), orderBy('date', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Transaction[];
      setTransactions(data);
      setLoading(false);
    }, (error) => {
      console.error("Firestore Error:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, curr) => acc + curr.amount, 0);
  
  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const balance = totalIncome - totalExpense;

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'transactions', id));
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !category) return;

    try {
      await addDoc(collection(db, 'transactions'), {
        amount: Number(amount),
        type,
        category,
        description: '', // Simplified
        addedBy: '使用者', // Simplified
        date: new Date(date).toISOString(),
      });
      setIsAddOpen(false);
      resetForm();
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  const resetForm = () => {
    setAmount('');
    setCategory('');
    setDate(tripDates[0]);
    setDescription('');
    setAddedBy('');
  };

  return (
    <div className="pt-20 pb-44 px-4 bg-[#f8fafc] min-h-screen">
      <div className="max-w-md mx-auto">
        {/* Summary Card */}
        <section className="mb-6">
          <div className="bg-gradient-to-br from-[#0077B6] to-[#00B4D8] rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex justify-between items-center mb-4">
                <span className="text-white/80 font-bold text-sm tracking-tight uppercase">公積金餘額</span>
                <Wallet className="text-white/40" size={24} />
              </div>
              <div className="text-5xl font-black tracking-tighter mb-2">
                ¥ {balance.toLocaleString()}
              </div>
              <div className="flex gap-4 mt-6">
                <div className="flex-1 bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/10">
                  <span className="block text-[10px] text-white/60 font-bold uppercase mb-1">總收入</span>
                  <span className="text-lg font-black tracking-tight text-emerald-300">¥ {totalIncome.toLocaleString()}</span>
                </div>
                <div className="flex-1 bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/10">
                  <span className="block text-[10px] text-white/60 font-bold uppercase mb-1">總支出</span>
                  <span className="text-lg font-black tracking-tight text-rose-300">¥ {totalExpense.toLocaleString()}</span>
                </div>
              </div>
            </div>
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
          </div>
        </section>

        {/* Action Button */}
        <button 
          onClick={() => setIsAddOpen(true)}
          className="w-full mb-8 py-5 bg-[#0077B6] text-white rounded-3xl font-black text-xl flex items-center justify-center gap-3 shadow-[0_12px_24px_rgba(0,119,182,0.25)] hover:bg-[#023E8A] active:scale-[0.98] transition-all"
        >
          <div className="bg-white/20 p-1.5 rounded-full">
            <Plus size={24} strokeWidth={4} />
          </div>
          新增收支紀錄
        </button>

        {/* Transactions List */}
        <section>
          <div className="flex items-center justify-between mb-4 px-2">
            <div className="flex items-center gap-2">
              <History size={18} className="text-[#0077B6]" />
              <h2 className="text-lg font-black text-on-surface tracking-tight">最近紀錄</h2>
            </div>
          </div>

          <div className="space-y-4">
            {loading ? (
              <div className="py-12 text-center text-on-surface-variant animate-pulse font-bold">載入中...</div>
            ) : transactions.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-sm border border-outline-variant/10 p-10 text-center">
                <div className="w-16 h-16 bg-surface-container-high rounded-full flex items-center justify-center mx-auto mb-4 text-outline">
                  <AlertCircle size={32} />
                </div>
                <p className="text-on-surface-variant font-bold">尚無紀錄隨時新增</p>
              </div>
            ) : (
              transactions.map((t) => (
                <div key={t.id} className="bg-white rounded-2xl p-5 shadow-sm border border-outline-variant/10 flex items-center justify-between group transition-all">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center",
                      t.type === 'income' ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
                    )}>
                      {t.type === 'income' ? <Plus size={24} /> : <Minus size={24} />}
                    </div>
                    <div>
                      <h4 className="text-xl font-black text-on-surface leading-none">{t.category}</h4>
                      <p className="text-xs text-on-surface-variant font-bold mt-1 opacity-60">
                        {new Date(t.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "text-right font-black text-xl tracking-tight",
                      t.type === 'income' ? "text-emerald-600" : "text-rose-600"
                    )}>
                      {t.type === 'income' ? '+' : '-'} ¥{t.amount.toLocaleString()}
                    </div>
                    <button 
                      onClick={() => handleDelete(t.id)}
                      className="w-10 h-10 rounded-full flex items-center justify-center bg-rose-50 text-rose-500 hover:bg-rose-100 active:scale-90 transition-all ml-2"
                      title="刪除"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>

      {/* Add Form Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4">
          <div className="absolute inset-0 bg-on-surface/40 backdrop-blur-sm" onClick={() => setIsAddOpen(false)}></div>
          <div className="relative bg-white w-full max-w-md rounded-t-[32px] sm:rounded-[32px] p-8 shadow-2xl animate-in slide-in-from-bottom-10 duration-300">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl font-black text-on-surface tracking-tight">新增收支</h3>
                <p className="text-sm text-on-surface-variant font-medium">記錄每一筆旅行開銷</p>
              </div>
              <button onClick={() => setIsAddOpen(false)} className="p-2 hover:bg-surface-container-high rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleAdd} className="space-y-5">
              <div className="flex p-1 bg-surface-container-high rounded-xl">
                <button 
                  type="button"
                  onClick={() => setType('income')}
                  className={cn(
                    "flex-1 py-3 rounded-lg text-sm font-black transition-all flex items-center justify-center gap-2",
                    type === 'income' ? "bg-white text-emerald-600 shadow-sm" : "text-on-surface-variant"
                  )}
                >
                  <Plus size={16} /> 收入
                </button>
                <button 
                  type="button"
                  onClick={() => setType('expense')}
                  className={cn(
                    "flex-1 py-3 rounded-lg text-sm font-black transition-all flex items-center justify-center gap-2",
                    type === 'expense' ? "bg-white text-rose-600 shadow-sm" : "text-on-surface-variant"
                  )}
                >
                  <Minus size={16} /> 支出
                </button>
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <span className="text-xl font-black text-on-surface-variant">¥</span>
                  </div>
                  <input 
                    type="number" 
                    placeholder="金額" 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full pl-10 pr-6 py-5 bg-surface-container-low rounded-2xl text-2xl font-black focus:outline-none focus:ring-2 focus:ring-primary/20 placeholder:text-on-surface-variant/40"
                    required
                  />
                </div>

                <div className="relative">
                  <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/40" size={20} />
                  <input 
                    type="text" 
                    placeholder="項目或姓名 (如：晚飯、小花)" 
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full pl-12 pr-6 py-5 bg-surface-container-low rounded-2xl text-lg font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 placeholder:text-on-surface-variant/40"
                    required
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 mb-1">
                    <CalendarIcon size={16} className="text-on-surface-variant font-bold" />
                    <span className="text-xs font-black text-on-surface-variant uppercase tracking-tighter">選擇行程日期</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {tripDates.map((d) => {
                      const dayLabel = d.split('-').slice(1).join('/'); // Transforms 2026-05-23 to 05/23
                      const isSelected = date === d;
                      return (
                        <button
                          key={d}
                          type="button"
                          onClick={() => setDate(d)}
                          className={cn(
                            "py-3 rounded-xl text-sm font-black transition-all border-2",
                            isSelected 
                              ? "bg-primary/10 border-primary text-primary shadow-sm" 
                              : "bg-surface-container-low border-transparent text-on-surface-variant/60"
                          )}
                        >
                          {dayLabel}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <button 
                type="submit"
                className="w-full py-5 bg-primary text-white rounded-2xl font-black text-lg shadow-lg hover:opacity-90 active:scale-[0.98] transition-all mt-4"
              >
                儲存紀錄
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
