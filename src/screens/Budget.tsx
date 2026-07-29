import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, Plus, Trash2, Edit2, Check, X, 
  Wallet, PieChart, Users, ArrowUpRight, ArrowDownRight, 
  Calendar, Tag, HelpCircle, AlertCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { db, auth } from '../lib/firebase';
import { 
  collection, onSnapshot, query, orderBy, 
  addDoc, deleteDoc, doc, updateDoc 
} from 'firebase/firestore';
import { cn } from '@/lib/utils';

// Core Types
interface Transaction {
  id: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  description: string;
  date: string;
  addedBy: string;
  payer: string;
  splitWith: string[];
}

const MEMBERS = ['昱惠', '小驊', '小花'];

const CATEGORIES = [
  { label: '餐飲美食', value: 'Food', color: 'bg-orange-100 text-orange-700 border-orange-200' },
  { label: '交通接駁', value: 'Transit', color: 'bg-blue-100 text-blue-700 border-blue-200' },
  { label: '奢華住宿', value: 'Stay', color: 'bg-teal-100 text-teal-700 border-teal-200' },
  { label: '景點玩樂', value: 'Play', color: 'bg-purple-100 text-purple-700 border-purple-200' },
  { label: '購物手信', value: 'Shopping', color: 'bg-pink-100 text-pink-700 border-pink-200' },
  { label: '其他雜項', value: 'Others', color: 'bg-gray-100 text-gray-700 border-gray-200' },
];

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

function cleanAmountInput(val: string): string {
  // Strip currency symbols (¥, ￥, $, NT$, etc.) and common separators (commas, spaces, letters)
  let cleaned = val.replace(/[¥￥$nNtT\s,]/gi, '');
  // Ensure we only allow one decimal point
  const parts = cleaned.split('.');
  if (parts.length > 2) {
    cleaned = parts[0] + '.' + parts.slice(1).join('');
  }
  // Strip any remaining non-numeric characters except the single dot
  cleaned = cleaned.replace(/[^0-9.]/g, '');
  return cleaned;
}

export function Budget() {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isClearing, setIsClearing] = useState(false);

  // Form State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [category, setCategory] = useState('Food');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [payer, setPayer] = useState('昱惠');
  const [splitWith, setSplitWith] = useState<string[]>(MEMBERS);

  // Editing state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editAmount, setEditAmount] = useState('');
  const [editType, setEditType] = useState<'income' | 'expense'>('expense');
  const [editCategory, setEditCategory] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editDate, setEditDate] = useState('');
  const [editPayer, setEditPayer] = useState('');
  const [editSplitWith, setEditSplitWith] = useState<string[]>([]);

  // Realtime subscription
  useEffect(() => {
    const q = query(collection(db, 'transactions'), orderBy('date', 'desc'));
    
    const unsubscribe = onSnapshot(
      q, 
      (snapshot) => {
        const list: Transaction[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          list.push({
            id: doc.id,
            amount: Number(data.amount || 0),
            type: data.type || 'expense',
            category: data.category || 'Others',
            description: data.description || '',
            date: data.date || '',
            addedBy: data.addedBy || '',
            payer: data.payer || '昱惠',
            splitWith: data.splitWith || MEMBERS,
          });
        });
        setTransactions(list);
        setLoading(false);
      },
      (error) => {
        handleFirestoreError(error, OperationType.LIST, 'transactions');
        setErrorMessage('載入帳目數據失敗');
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // Form submit handler
  const handleAddTransaction = async (e: React.FormEvent) => {
    e.preventDefault();
    const sanitizedAmount = cleanAmountInput(amount);
    if (!sanitizedAmount || isNaN(Number(sanitizedAmount)) || Number(sanitizedAmount) <= 0) {
      alert('請輸入有效的金額');
      return;
    }
    if (splitWith.length === 0) {
      alert('請至少選擇一位分攤人');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    const payload = {
      amount: Number(sanitizedAmount),
      type,
      category,
      description: description.trim() || category,
      date,
      addedBy: auth.currentUser?.email || 'Anonymous',
      payer,
      splitWith,
    };

    try {
      await addDoc(collection(db, 'transactions'), payload);
      // Reset form
      setAmount('');
      setDescription('');
      setType('expense');
      setSplitWith(MEMBERS);
    } catch (error) {
      try {
        handleFirestoreError(error, OperationType.CREATE, 'transactions');
      } catch (err: any) {
        setErrorMessage('新增帳目失敗：' + err.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Edit action
  const startEdit = (t: Transaction) => {
    setEditingId(t.id);
    setEditAmount(String(t.amount));
    setEditType(t.type);
    setEditCategory(t.category);
    setEditDescription(t.description);
    setEditDate(t.date);
    setEditPayer(t.payer);
    setEditSplitWith(t.splitWith);
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const handleUpdateTransaction = async (id: string) => {
    const sanitizedAmount = cleanAmountInput(editAmount);
    if (!sanitizedAmount || isNaN(Number(sanitizedAmount)) || Number(sanitizedAmount) <= 0) {
      alert('請輸入有效的金額');
      return;
    }
    if (editSplitWith.length === 0) {
      alert('請至少選擇一位分攤人');
      return;
    }

    const payload = {
      amount: Number(sanitizedAmount),
      type: editType,
      category: editCategory,
      description: editDescription.trim(),
      date: editDate,
      addedBy: auth.currentUser?.email || 'Anonymous',
      payer: editPayer,
      splitWith: editSplitWith,
    };

    try {
      await updateDoc(doc(db, 'transactions', id), payload);
      setEditingId(null);
    } catch (error) {
      try {
        handleFirestoreError(error, OperationType.UPDATE, `transactions/${id}`);
      } catch (err: any) {
        alert('修改帳目失敗：' + err.message);
      }
    }
  };

  // Delete handler
  const handleDeleteTransaction = async (id: string) => {
    if (!confirm('確定要刪除這筆帳目嗎？')) return;

    try {
      await deleteDoc(doc(db, 'transactions', id));
    } catch (error) {
      try {
        handleFirestoreError(error, OperationType.DELETE, `transactions/${id}`);
      } catch (err: any) {
        alert('刪除失敗：' + err.message);
      }
    }
  };

  // Clear all transactions from firestore
  const handleClearAllTransactions = async () => {
    const confirmed = confirm('⚠️ 確定要清空雲端上所有的共同帳目資料嗎？\n此動作將會刪除所有記帳記錄且無法復原。');
    if (!confirmed) return;

    setIsClearing(true);
    setErrorMessage(null);

    try {
      const deletePromises = transactions.map((t) => deleteDoc(doc(db, 'transactions', t.id)));
      await Promise.all(deletePromises);
    } catch (error) {
      try {
        handleFirestoreError(error, OperationType.DELETE, 'transactions/all');
      } catch (err: any) {
        setErrorMessage('清空雲端資料失敗：' + err.message);
      }
    } finally {
      setIsClearing(false);
    }
  };

  // Import single accommodation expense
  const handleImportAccommodation = async (name: string, price: number, defaultPayer: string) => {
    setErrorMessage(null);
    const payload = {
      amount: price,
      type: 'expense' as const,
      category: 'Stay',
      description: name,
      date: new Date().toISOString().split('T')[0],
      addedBy: auth.currentUser?.email || 'Anonymous',
      payer: defaultPayer,
      splitWith: MEMBERS,
    };

    try {
      await addDoc(collection(db, 'transactions'), payload);
    } catch (error) {
      try {
        handleFirestoreError(error, OperationType.CREATE, 'transactions');
      } catch (err: any) {
        setErrorMessage('導入住宿費用失敗：' + err.message);
      }
    }
  };

  // Import custom quick expense (e.g. food, play)
  const handleImportQuickExpense = async (name: string, price: number, category: string, defaultPayer: string) => {
    setErrorMessage(null);
    const payload = {
      amount: price,
      type: 'expense' as const,
      category: category,
      description: name,
      date: new Date().toISOString().split('T')[0],
      addedBy: auth.currentUser?.email || 'Anonymous',
      payer: defaultPayer,
      splitWith: MEMBERS,
    };

    try {
      await addDoc(collection(db, 'transactions'), payload);
    } catch (error) {
      try {
        handleFirestoreError(error, OperationType.CREATE, 'transactions');
      } catch (err: any) {
        setErrorMessage('導入費用失敗：' + err.message);
      }
    }
  };

  // Import all accommodation expenses at once
  const handleImportAllAccommodations = async (defaultPayer: string) => {
    setErrorMessage(null);
    const accommodations = [
      { name: '寧波天一城隍廟漫心府 (2晚)', price: 953.7, payer: defaultPayer },
      { name: '寧波花間堂·韓嶺 (1晚)', price: 399.5, payer: defaultPayer },
      { name: '寧波英迪格酒店 (1晚)', price: 888.0, payer: '小花' }
    ];

    try {
      const promises = accommodations.map((acc) => {
        const payload = {
          amount: acc.price,
          type: 'expense' as const,
          category: 'Stay',
          description: acc.name,
          date: new Date().toISOString().split('T')[0],
          addedBy: auth.currentUser?.email || 'Anonymous',
          payer: acc.payer,
          splitWith: MEMBERS,
        };
        return addDoc(collection(db, 'transactions'), payload);
      });
      await Promise.all(promises);
    } catch (error) {
      try {
        handleFirestoreError(error, OperationType.CREATE, 'transactions');
      } catch (err: any) {
        setErrorMessage('一鍵導入住宿費用失敗：' + err.message);
      }
    }
  };

  // Checkbox toggle handler
  const handleSplitToggle = (member: string, isEdit: boolean = false) => {
    if (isEdit) {
      if (editSplitWith.includes(member)) {
        setEditSplitWith(editSplitWith.filter(m => m !== member));
      } else {
        setEditSplitWith([...editSplitWith, member]);
      }
    } else {
      if (splitWith.includes(member)) {
        setSplitWith(splitWith.filter(m => m !== member));
      } else {
        setSplitWith([...splitWith, member]);
      }
    }
  };

  // Calculations for dashboard
  // Paid: total money paid out of pocket by each member
  const memberPaid = MEMBERS.reduce((acc, m) => {
    acc[m] = 0;
    return acc;
  }, {} as Record<string, number>);

  // Should pay: sum of shares for each member
  const memberShouldPay = MEMBERS.reduce((acc, m) => {
    acc[m] = 0;
    return acc;
  }, {} as Record<string, number>);

  let totalExpenses = 0;

  transactions.forEach((t) => {
    if (t.type === 'expense') {
      // Add to payer's total paid
      if (MEMBERS.includes(t.payer)) {
        memberPaid[t.payer] += t.amount;
      }
      totalExpenses += t.amount;

      // Calculate share
      const sharersCount = t.splitWith.length;
      if (sharersCount > 0) {
        const shareAmount = t.amount / sharersCount;
        t.splitWith.forEach((sharer) => {
          if (MEMBERS.includes(sharer)) {
            memberShouldPay[sharer] += shareAmount;
          }
        });
      }
    }
  });

  // Balance = Paid - ShouldPay
  const memberBalances = MEMBERS.reduce((acc, m) => {
    acc[m] = memberPaid[m] - memberShouldPay[m];
    return acc;
  }, {} as Record<string, number>);

  // Settlement Algorithm (Debts matchmaker)
  const calculateSettlements = () => {
    // Clone balances
    const balances = { ...memberBalances };
    const settlements: { from: string; to: string; amount: number }[] = [];

    // Separate creditors and debtors
    let creditors = MEMBERS.filter(m => balances[m] > 0.01).sort((a, b) => balances[b] - balances[a]);
    let debtors = MEMBERS.filter(m => balances[m] < -0.01).sort((a, b) => balances[a] - balances[b]);

    let safetyCounter = 0;
    while (creditors.length > 0 && debtors.length > 0 && safetyCounter < 100) {
      safetyCounter++;
      const debtor = debtors[0];
      const creditor = creditors[0];

      const debtAmount = Math.abs(balances[debtor]);
      const creditAmount = balances[creditor];

      const settleAmount = Math.min(debtAmount, creditAmount);
      
      settlements.push({
        from: debtor,
        to: creditor,
        amount: Number(settleAmount.toFixed(1)),
      });

      // Update balances
      balances[debtor] += settleAmount;
      balances[creditor] -= settleAmount;

      // Re-filter and sort
      creditors = MEMBERS.filter(m => balances[m] > 0.01).sort((a, b) => balances[b] - balances[a]);
      debtors = MEMBERS.filter(m => balances[m] < -0.01).sort((a, b) => balances[a] - balances[b]);
    }

    return settlements;
  };

  const settlements = calculateSettlements();

  return (
    <div className="space-y-6 pb-24">
      {/* Back Button and Title */}
      <div className="flex items-center justify-between">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-1.5 text-xs font-bold text-on-surface-variant hover:text-primary transition-colors bg-surface-container-low px-3 py-1.5 rounded-xl border border-outline-variant/10 active:scale-95"
        >
          <ChevronLeft size={16} />
          返回首頁
        </button>
      </div>

      {/* Header text */}
      <div className="space-y-2">
        <h2 className="text-3xl font-extrabold text-primary tracking-tight">旅行記帳與分攤</h2>
        <p className="text-xs font-bold text-outline tracking-wider uppercase">旅行預算與分攤</p>
        <p className="text-sm text-on-surface-variant leading-relaxed font-medium">
          專為本行程設計的多人記帳與平分系統。輸入每筆共同花費與付款人，系統將自動精算 <span className="font-semibold text-primary">昱惠、小驊、小花</span> 的已付/應付額，並提供極簡轉帳方案。
        </p>
      </div>

      {errorMessage && (
        <div className="bg-error-container text-on-error-container p-4 rounded-xl border border-error/20 flex gap-2.5 items-start">
          <AlertCircle className="shrink-0 mt-0.5 text-error" size={18} />
          <div className="text-xs font-medium">{errorMessage}</div>
        </div>
      )}

      {/* Dashboard Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Card: Total Expenses */}
        <div className="bg-surface-container-high rounded-2xl p-5 border border-outline-variant/15 flex flex-col justify-between shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-8 -mt-8"></div>
          <div className="flex justify-between items-start z-10">
            <span className="text-[11px] font-bold text-outline uppercase tracking-wider">行程總支出 (CNY)</span>
            <Wallet className="text-primary" size={20} />
          </div>
          <div className="mt-4 z-10">
            <span className="text-3xl font-extrabold text-on-surface">¥ {totalExpenses.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 })}</span>
            <p className="text-[10px] text-on-surface-variant mt-1.5 font-medium">基於所有已錄入的實際支出統計</p>
          </div>
        </div>

        {/* Individual Balances */}
        {MEMBERS.map((m) => {
          const balance = memberBalances[m] || 0;
          const paid = memberPaid[m] || 0;
          const shouldPay = memberShouldPay[m] || 0;
          const isCreditor = balance > 0.05;
          const isDebtor = balance < -0.05;

          return (
            <div 
              key={m} 
              className={cn(
                "bg-surface-container-low rounded-2xl p-5 border transition-all duration-300 relative overflow-hidden",
                isCreditor ? "border-emerald-500/15 bg-emerald-50/10" : "",
                isDebtor ? "border-amber-500/15 bg-amber-50/10" : "border-outline-variant/10"
              )}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-extrabold text-lg text-on-surface flex items-center gap-1.5">
                    <Users size={16} className="text-outline" />
                    {m}
                  </h4>
                </div>
                <span className={cn(
                  "text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider border",
                  isCreditor ? "bg-emerald-100 text-emerald-800 border-emerald-200" : "",
                  isDebtor ? "bg-amber-100 text-amber-800 border-amber-200" : "bg-gray-100 text-gray-700 border-gray-200"
                )}>
                  {isCreditor ? '應收回' : isDebtor ? '應補繳' : '已平分'}
                </span>
              </div>

              <div className="mt-4 space-y-1">
                <div className="flex justify-between text-xs text-on-surface-variant">
                  <span>已付款</span>
                  <span className="font-bold text-on-surface">¥ {paid.toFixed(1)}</span>
                </div>
                <div className="flex justify-between text-xs text-on-surface-variant">
                  <span>應分攤</span>
                  <span className="font-bold text-on-surface">¥ {shouldPay.toFixed(1)}</span>
                </div>
                <div className="border-t border-outline-variant/20 my-2 pt-1.5 flex justify-between items-center">
                  <span className="text-[11px] font-bold text-outline">結算差額</span>
                  <span className={cn(
                    "text-base font-extrabold",
                    isCreditor ? "text-emerald-600" : isDebtor ? "text-amber-600" : "text-on-surface-variant"
                  )}>
                    {balance > 0 ? `+¥ ${balance.toFixed(1)}` : `¥ ${balance.toFixed(1)}`}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Settlement Recommendation Box */}
      <section className="bg-surface-container-high rounded-2xl p-6 border border-outline-variant/20 shadow-sm">
        <div className="flex items-center gap-2.5 text-[#00677d] mb-4">
          <PieChart size={22} />
          <h3 className="font-extrabold text-lg">極簡轉帳結算方案</h3>
        </div>

        {settlements.length === 0 ? (
          <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-xl p-5 text-center text-sm font-medium text-emerald-800">
            🎉 完美！所有帳目已結清，目前無人欠款。
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-xs text-on-surface-variant leading-relaxed">
              系統已採用「最少次數轉帳演算法」，計算出以下最優結算路線。大家僅需按照下方提示相互轉帳，即可一鍵結清所有共同費用：
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {settlements.map((s, idx) => (
                <div 
                  key={idx} 
                  className="bg-white border border-outline-variant/25 rounded-xl p-4 flex items-center justify-between shadow-xs hover:border-[#00677d]/35 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center font-bold text-xs border border-amber-100">
                      給
                    </div>
                    <div>
                      <p className="text-xs text-on-surface-variant font-medium">
                        <span className="font-bold text-on-surface text-sm">{s.from}</span> 應轉帳給
                      </p>
                      <p className="text-xs text-[#00677d] font-bold">向 {s.to} 發起微信/支付寶/現金</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-black text-[#00677d]">¥ {s.amount}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Two Column Layout for Add & List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Column 1: Add Transaction (1 Span) */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Manual Form Card */}
          <div className="bg-surface-container-low rounded-2xl p-6 border border-outline-variant/10 space-y-4 h-fit">
            <h3 className="font-extrabold text-lg text-on-surface flex items-center gap-2">
              <Plus size={20} className="text-primary" />
              新增其他共同花費
            </h3>

            <form onSubmit={handleAddTransaction} className="space-y-4 pt-1">
            {/* Amount */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-outline uppercase">金額 (人民幣 / 新台幣)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant font-bold text-sm">¥</span>
                <input 
                  type="text" 
                  inputMode="decimal"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(cleanAmountInput(e.target.value))}
                  className="w-full bg-white border border-outline-variant/40 rounded-xl py-2.5 pl-8 pr-4 text-sm font-bold text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
                  required
                />
              </div>
            </div>

            {/* Payer (Who paid) */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-outline uppercase">付款人</label>
              <div className="grid grid-cols-3 gap-2">
                {MEMBERS.map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setPayer(m)}
                    className={cn(
                      "py-2 px-3 rounded-xl border text-xs font-bold transition-all",
                      payer === m 
                        ? "bg-primary text-white border-primary shadow-xs" 
                        : "bg-white text-on-surface-variant border-outline-variant/40 hover:bg-surface-container-high"
                    )}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* Split With (Who shares) */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-[11px] font-bold text-outline uppercase">分攤人</label>
                <button 
                  type="button" 
                  onClick={() => setSplitWith(splitWith.length === MEMBERS.length ? [] : MEMBERS)}
                  className="text-[10px] text-primary font-bold hover:underline"
                >
                  {splitWith.length === MEMBERS.length ? '全消' : '全選'}
                </button>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {MEMBERS.map((m) => {
                  const selected = splitWith.includes(m);
                  return (
                    <button
                      key={m}
                      type="button"
                      onClick={() => handleSplitToggle(m, false)}
                      className={cn(
                        "py-2 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1",
                        selected 
                          ? "bg-primary-container text-on-primary-container border-primary/20" 
                          : "bg-white text-on-surface-variant border-outline-variant/40 opacity-60 hover:bg-surface-container-high"
                      )}
                    >
                      <Check size={12} className={cn("shrink-0", selected ? "opacity-100" : "opacity-0")} />
                      {m}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Category selection */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-outline uppercase">消費種類</label>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-white border border-outline-variant/40 rounded-xl py-2.5 px-3.5 text-xs font-bold text-on-surface focus:outline-none focus:border-primary"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
            </div>

            {/* Date */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-outline uppercase">消費日期</label>
              <input 
                type="date" 
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-white border border-outline-variant/40 rounded-xl py-2.5 px-3.5 text-xs font-bold text-on-surface focus:outline-none focus:border-primary"
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-outline uppercase">備註說明 (如: 月湖午餐)</label>
              <input 
                type="text" 
                placeholder="輸入簡短備註..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-white border border-outline-variant/40 rounded-xl py-2.5 px-3.5 text-xs text-on-surface focus:outline-none focus:border-primary"
              />
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary hover:bg-primary/95 text-white py-3 rounded-xl font-bold text-xs shadow-md transition-all active:scale-98 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Plus size={16} />
              {isSubmitting ? '保存中...' : '確認新增共同帳目'}
            </button>
          </form>
        </div>
      </div>

        {/* Column 2 & 3: History List (2 Spans) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-extrabold text-lg text-on-surface flex items-center gap-2">
              <Calendar size={20} className="text-[#00677d]" />
              明細清單 ({transactions.length} 筆)
            </h3>
            {transactions.length > 0 && (
              <button
                onClick={handleClearAllTransactions}
                disabled={isClearing}
                className="flex items-center gap-1.5 text-xs font-bold text-red-600 hover:text-white hover:bg-red-600 transition-all bg-red-50 hover:shadow-xs px-3 py-1.5 rounded-xl border border-red-200/50 active:scale-95 disabled:opacity-50"
              >
                <Trash2 size={14} />
                {isClearing ? '清除中...' : '清空雲端資料'}
              </button>
            )}
          </div>

          {loading ? (
            <div className="bg-surface-container-low border border-outline-variant/10 rounded-2xl p-10 text-center text-xs text-on-surface-variant">
              帳目即時數據加載中...
            </div>
          ) : transactions.length === 0 ? (
            <div className="bg-surface-container-low border border-outline-variant/10 rounded-2xl p-10 text-center text-xs text-on-surface-variant leading-relaxed">
              目前暫無共同帳目。可以使用左側表單，錄入第一筆旅行開支！
            </div>
          ) : (
            <div className="space-y-3.5">
              <AnimatePresence initial={false}>
                {transactions.map((t) => {
                  const catConfig = CATEGORIES.find(c => c.value === t.category) || CATEGORIES[5];
                  const isEditing = editingId === t.id;

                  if (isEditing) {
                    return (
                      <motion.div 
                        key={t.id}
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        className="bg-surface-container-high rounded-xl p-5 border border-primary/20 space-y-4 shadow-sm"
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-black uppercase text-primary">正在修改帳目</span>
                          <button onClick={cancelEdit} className="text-on-surface-variant hover:text-on-surface"><X size={16} /></button>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-outline">金額</label>
                            <input 
                              type="text" 
                              inputMode="decimal"
                              value={editAmount}
                              onChange={(e) => setEditAmount(cleanAmountInput(e.target.value))}
                              className="w-full bg-white border border-outline-variant/40 rounded-lg p-2 text-xs font-bold text-on-surface"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-outline">類別</label>
                            <select 
                              value={editCategory}
                              onChange={(e) => setEditCategory(e.target.value)}
                              className="w-full bg-white border border-outline-variant/40 rounded-lg p-2 text-xs font-bold text-on-surface"
                            >
                              {CATEGORIES.map(cat => (
                                <option key={cat.value} value={cat.value}>{cat.label}</option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-outline">付款人</label>
                            <select 
                              value={editPayer}
                              onChange={(e) => setEditPayer(e.target.value)}
                              className="w-full bg-white border border-outline-variant/40 rounded-lg p-2 text-xs font-bold text-on-surface"
                            >
                              {MEMBERS.map(m => (
                                <option key={m} value={m}>{m}</option>
                              ))}
                            </select>
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-outline">日期</label>
                            <input 
                              type="date" 
                              value={editDate}
                              onChange={(e) => setEditDate(e.target.value)}
                              className="w-full bg-white border border-outline-variant/40 rounded-lg p-2 text-xs text-on-surface"
                            />
                          </div>
                        </div>

                        {/* Edit Split With */}
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-outline block">分攤人</label>
                          <div className="flex gap-2">
                            {MEMBERS.map((m) => {
                              const checked = editSplitWith.includes(m);
                              return (
                                <button
                                  key={m}
                                  type="button"
                                  onClick={() => handleSplitToggle(m, true)}
                                  className={cn(
                                    "px-3 py-1.5 rounded-lg border text-xs font-bold transition-all",
                                    checked 
                                      ? "bg-primary-container text-on-primary-container border-primary/20" 
                                      : "bg-white text-on-surface-variant border-outline-variant/40 opacity-50"
                                  )}
                                >
                                  {m}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-outline">備註說明</label>
                          <input 
                            type="text" 
                            value={editDescription}
                            onChange={(e) => setEditDescription(e.target.value)}
                            className="w-full bg-white border border-outline-variant/40 rounded-lg p-2 text-xs text-on-surface"
                          />
                        </div>

                        <div className="flex justify-end gap-2 pt-2">
                          <button 
                            onClick={cancelEdit} 
                            className="bg-surface-container text-on-surface-variant px-4 py-2 rounded-lg text-xs font-bold hover:bg-surface-container-high transition-colors"
                          >
                            取消
                          </button>
                          <button 
                            onClick={() => handleUpdateTransaction(t.id)} 
                            className="bg-primary text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-primary/95 transition-colors flex items-center gap-1"
                          >
                            <Check size={14} />
                            確認儲存
                          </button>
                        </div>
                      </motion.div>
                    );
                  }

                  return (
                    <motion.div 
                      key={t.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="bg-surface-container-low rounded-xl p-4.5 border border-outline-variant/10 flex items-center justify-between hover:bg-surface-container-high/40 transition-colors shadow-xs"
                    >
                      <div className="flex items-center gap-4">
                        {/* Category badge */}
                        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 border", catConfig.color)}>
                          <Tag size={16} />
                        </div>
                        
                        {/* Info */}
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-extrabold text-sm text-on-surface">{t.description || catConfig.label}</span>
                            <span className="text-[10px] text-on-surface-variant/75 font-bold flex items-center gap-1 bg-surface-container px-2 py-0.5 rounded-md border border-outline-variant/5">
                              <Calendar size={10} />
                              {t.date}
                            </span>
                          </div>
                          
                          <div className="flex items-center flex-wrap gap-x-2.5 gap-y-1 text-[11px] text-on-surface-variant">
                            <span className="font-bold text-[#00677d] bg-[#00677d]/5 px-2 py-0.5 rounded border border-[#00677d]/10">
                              {t.payer} 買單
                            </span>
                            <span className="text-outline">
                              分攤人：<span className="font-semibold text-on-surface">{t.splitWith.join('、')}</span>
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Right Action buttons */}
                      <div className="flex items-center gap-3.5">
                        <div className="text-right">
                          <span className="text-base font-black text-on-surface">¥ {t.amount}</span>
                          <p className="text-[9px] text-on-surface-variant/70 font-semibold mt-0.5">
                            人均 ¥ {(t.amount / (t.splitWith.length || 1)).toFixed(1)}
                          </p>
                        </div>

                        <div className="flex items-center gap-1 border-l border-outline-variant/10 pl-3">
                          <button 
                            onClick={() => startEdit(t)}
                            className="p-1.5 rounded-lg text-on-surface-variant hover:text-primary hover:bg-primary/5 transition-colors active:scale-90"
                            title="修改"
                          >
                            <Edit2 size={14} />
                          </button>
                          <button 
                            onClick={() => handleDeleteTransaction(t.id)}
                            className="p-1.5 rounded-lg text-on-surface-variant hover:text-error hover:bg-error/5 transition-colors active:scale-90"
                            title="刪除"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
