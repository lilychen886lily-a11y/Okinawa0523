import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, Plus, Trash2, Check, X, 
  CheckSquare, Filter, Calendar, Tag, User, AlertCircle, RefreshCw, ClipboardList, CheckCircle2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { db, auth } from '../lib/firebase';
import { 
  collection, onSnapshot, query, 
  addDoc, deleteDoc, doc, updateDoc 
} from 'firebase/firestore';
import { cn } from '@/lib/utils';

// Core Types
interface TodoItem {
  id: string;
  title: string;
  completed: boolean;
  assignee: string;
  category: string;
  date: string;
  addedBy: string;
}

const MEMBERS = ['昱惠', '小驊', '小花'];

const CATEGORIES = [
  { label: '準備物品', value: 'Packing', color: 'bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/30' },
  { label: '證件機票', value: 'Docs', color: 'bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-950/20 dark:text-blue-400 dark:border-blue-900/30' },
  { label: '生活日常', value: 'Life', color: 'bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900/30' },
  { label: '其他雜項', value: 'Others', color: 'bg-gray-50 text-gray-700 border-gray-100 dark:bg-gray-800/50 dark:text-gray-400 dark:border-gray-700/50' },
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

export function Todos() {
  const navigate = useNavigate();
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Form State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [title, setTitle] = useState('');
  const [assignee, setAssignee] = useState('未分配');
  const [category, setCategory] = useState('Packing');
  const [date, setDate] = useState('');

  // Filtering / Search State
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'completed'>('all');
  const [filterAssignee, setFilterAssignee] = useState<string>('全部');
  const [searchQuery, setSearchQuery] = useState('');

  // Realtime subscription
  useEffect(() => {
    const q = query(collection(db, 'todos'));
    
    const unsubscribe = onSnapshot(
      q, 
      (snapshot) => {
        const list: TodoItem[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          list.push({
            id: doc.id,
            title: data.title || '',
            completed: !!data.completed,
            assignee: data.assignee || '未分配',
            category: data.category || 'Packing',
            date: data.date || '',
            addedBy: data.addedBy || '',
          });
        });
        setTodos(list);
        setLoading(false);
      },
      (error) => {
        handleFirestoreError(error, OperationType.LIST, 'todos');
        setErrorMessage('載入待辦事項失敗');
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    const payload = {
      title: title.trim(),
      completed: false,
      assignee,
      category,
      date: date || '無期限',
      addedBy: auth.currentUser?.email || 'Anonymous',
    };

    try {
      await addDoc(collection(db, 'todos'), payload);
      setTitle('');
      setAssignee('未分配');
      setCategory('Packing');
      setDate('');
    } catch (err) {
      setErrorMessage('新增待辦事項失敗，請重試');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleTodo = async (id: string, currentStatus: boolean) => {
    setErrorMessage(null);
    try {
      const todoRef = doc(db, 'todos', id);
      await updateDoc(todoRef, { completed: !currentStatus });
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `todos/${id}`);
      setErrorMessage('更新狀態失敗');
    }
  };

  const handleDeleteTodo = async (id: string) => {
    if (!window.confirm('確定要刪除此待辦事項嗎？')) return;
    setErrorMessage(null);
    try {
      await deleteDoc(doc(db, 'todos', id));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `todos/${id}`);
      setErrorMessage('刪除待辦事項失敗');
    }
  };

  // Filtering logic
  const filteredTodos = todos.filter(todo => {
    const matchesStatus = 
      filterStatus === 'all' ? true :
      filterStatus === 'active' ? !todo.completed :
      todo.completed;

    const matchesAssignee = 
      filterAssignee === '全部' ? true : 
      todo.assignee === filterAssignee;

    const matchesSearch = 
      todo.title.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesAssignee && matchesSearch;
  });

  // Stats
  const totalCount = todos.length;
  const completedCount = todos.filter(t => t.completed).length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="mt-20 px-4 pb-44 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button 
          onClick={() => navigate('/')}
          className="p-2.5 rounded-xl bg-surface-container-lowest border border-outline-variant/10 shadow-sm hover:bg-surface-container-low transition-colors"
        >
          <ChevronLeft size={20} className="text-on-surface" />
        </button>
        <div>
          <h1 className="text-2xl font-black text-[#0d9488] tracking-tight">行前待辦事項</h1>
          <p className="text-[11px] text-on-surface-variant font-medium">群組成員協同準備清單</p>
        </div>
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div className="mb-6 p-4 rounded-2xl bg-error-container/20 border border-error/20 flex items-start gap-3">
          <AlertCircle className="text-error mt-0.5 shrink-0" size={18} />
          <p className="text-xs text-error font-medium">{errorMessage}</p>
        </div>
      )}

      {/* Progress Card */}
      <div className="bg-gradient-to-br from-[#0d9488] to-[#0f766e] text-white p-6 rounded-3xl shadow-md mb-8 relative overflow-hidden">
        <div className="absolute right-[-20px] bottom-[-20px] opacity-10">
          <ClipboardList size={180} />
        </div>
        <div className="relative z-10">
          <span className="text-[10px] font-bold uppercase tracking-widest bg-white/20 px-2.5 py-1 rounded-full">
            準備進度
          </span>
          <div className="flex justify-between items-end mt-4 mb-2">
            <div>
              <span className="text-4xl font-extrabold tracking-tight">{progressPercent}%</span>
              <span className="text-xs font-semibold ml-2 opacity-90">已完成</span>
            </div>
            <div className="text-xs font-bold opacity-80">
              {completedCount} / {totalCount} 項任務
            </div>
          </div>
          
          {/* Custom Sleek Progress Bar */}
          <div className="w-full h-2.5 bg-white/20 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="h-full bg-white rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Create Todo Form */}
      <form onSubmit={handleAddTodo} className="bg-white rounded-2xl border border-outline-variant/10 shadow-sm p-5 mb-8">
        <h3 className="text-sm font-extrabold text-on-surface mb-4 flex items-center gap-2">
          <Plus size={16} className="text-[#0d9488]" />
          新增待辦事項
        </h3>

        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-[11px] font-bold text-on-surface-variant mb-1.5">
              任務名稱 <span className="text-red-500">*</span>
            </label>
            <input 
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="例如：準備雨傘、列印機票存根..."
              className="w-full text-sm px-4 py-3 bg-surface-container-lowest border border-outline-variant/10 rounded-xl focus:outline-none focus:border-[#0d9488] transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-on-surface-variant mb-1.5">
                分配給
              </label>
              <select
                value={assignee}
                onChange={(e) => setAssignee(e.target.value)}
                className="w-full text-sm px-3 py-2.5 bg-surface-container-lowest border border-outline-variant/10 rounded-xl focus:outline-none focus:border-[#0d9488] transition-colors"
              >
                <option value="未分配">未分配</option>
                {MEMBERS.map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-on-surface-variant mb-1.5">
                任務類別
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full text-sm px-3 py-2.5 bg-surface-container-lowest border border-outline-variant/10 rounded-xl focus:outline-none focus:border-[#0d9488] transition-colors"
              >
                <option value="Packing">準備物品</option>
                <option value="Docs">證件機票</option>
                <option value="Life">生活日常</option>
                <option value="Others">其他雜項</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-on-surface-variant mb-1.5">
                目標日期 (選填)
              </label>
              <input 
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="例如：7/25 前"
                className="w-full text-sm px-3 py-2 bg-surface-container-lowest border border-outline-variant/10 rounded-xl focus:outline-none focus:border-[#0d9488] transition-colors"
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={isSubmitting || !title.trim()}
            className="w-full mt-2 py-3 rounded-xl bg-[#0d9488] text-white font-bold text-sm shadow-sm hover:bg-[#0f766e] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <RefreshCw className="animate-spin" size={16} />
                正在新增...
              </>
            ) : (
              <>
                <Plus size={16} />
                加到待辦清單
              </>
            )}
          </button>
        </div>
      </form>

      {/* Filtering Toolbar */}
      <div className="mb-6 space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Status Tabs */}
          <div className="flex bg-surface-container-low p-1 rounded-xl border border-outline-variant/5">
            <button
              onClick={() => setFilterStatus('all')}
              className={cn(
                "px-4 py-1.5 rounded-lg text-xs font-bold transition-all",
                filterStatus === 'all' ? "bg-white text-[#0d9488] shadow-sm" : "text-outline hover:text-on-surface"
              )}
            >
              全部
            </button>
            <button
              onClick={() => setFilterStatus('active')}
              className={cn(
                "px-4 py-1.5 rounded-lg text-xs font-bold transition-all",
                filterStatus === 'active' ? "bg-white text-[#0d9488] shadow-sm" : "text-outline hover:text-on-surface"
              )}
            >
              未完成
            </button>
            <button
              onClick={() => setFilterStatus('completed')}
              className={cn(
                "px-4 py-1.5 rounded-lg text-xs font-bold transition-all",
                filterStatus === 'completed' ? "bg-white text-[#0d9488] shadow-sm" : "text-outline hover:text-on-surface"
              )}
            >
              已完成
            </button>
          </div>

          {/* Search bar */}
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="搜尋待辦事項..."
            className="text-xs px-4 py-2 bg-white border border-outline-variant/15 rounded-xl focus:outline-none focus:border-[#0d9488] w-full md:w-48"
          />
        </div>

        {/* Assignee selection */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
            <Filter size={10} />
            負責人:
          </span>
          {['全部', '未分配', ...MEMBERS].map((m) => (
            <button
              key={m}
              onClick={() => setFilterAssignee(m)}
              className={cn(
                "px-3 py-1 rounded-full text-xs font-bold transition-all border shrink-0",
                filterAssignee === m 
                  ? "bg-primary/10 text-primary border-primary/20" 
                  : "bg-white text-outline border-outline-variant/15 hover:border-outline"
              )}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Todo List Container */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <RefreshCw className="animate-spin text-primary mb-3" size={24} />
          <span className="text-xs font-semibold text-outline">正在載入待辦事項...</span>
        </div>
      ) : filteredTodos.length === 0 ? (
        <div className="bg-white border border-outline-variant/10 rounded-2xl p-12 text-center flex flex-col items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
            <CheckSquare size={22} />
          </div>
          <h4 className="text-sm font-bold text-on-surface mb-1">無待辦事項</h4>
          <p className="text-xs text-outline">沒有符合當前篩選條件的任務</p>
        </div>
      ) : (
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {filteredTodos.map((todo) => {
              const catConfig = CATEGORIES.find(c => c.value === todo.category) || CATEGORIES[3];
              return (
                <motion.div
                  key={todo.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className={cn(
                    "bg-white border rounded-2xl p-4 flex items-center justify-between gap-4 transition-all duration-300",
                    todo.completed ? "border-emerald-100 opacity-70" : "border-outline-variant/10 shadow-sm"
                  )}
                >
                  <div className="flex items-center gap-3.5 flex-1 min-w-0">
                    {/* Checkbox button */}
                    <button
                      onClick={() => handleToggleTodo(todo.id, todo.completed)}
                      className={cn(
                        "w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all shrink-0",
                        todo.completed 
                          ? "bg-emerald-600 border-emerald-600 text-white" 
                          : "border-outline-variant hover:border-[#0d9488]"
                      )}
                    >
                      {todo.completed && <Check size={14} strokeWidth={3} />}
                    </button>

                    <div className="min-w-0 flex-1">
                      <p className={cn(
                        "text-sm font-bold leading-tight break-words",
                        todo.completed ? "line-through text-outline" : "text-on-surface"
                      )}>
                        {todo.title}
                      </p>

                      {/* Meta information tags */}
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {/* Category tag */}
                        <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full border", catConfig.color)}>
                          {catConfig.label}
                        </span>

                        {/* Assignee tag */}
                        <span className="text-[10px] font-bold text-on-surface-variant bg-surface-container-low px-2 py-0.5 rounded-full border border-outline-variant/5 inline-flex items-center gap-1">
                          <User size={9} />
                          {todo.assignee}
                        </span>

                        {/* Date tag */}
                        {todo.date && todo.date !== '無期限' && (
                          <span className="text-[10px] font-bold text-[#b45309] bg-amber-50 px-2 py-0.5 rounded-full border border-amber-100 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900/30 inline-flex items-center gap-1">
                            <Calendar size={9} />
                            {todo.date}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Delete button */}
                  <button
                    onClick={() => handleDeleteTodo(todo.id)}
                    className="p-2 text-outline-variant hover:text-error hover:bg-error/5 rounded-xl transition-colors shrink-0"
                  >
                    <Trash2 size={16} />
                  </button>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
