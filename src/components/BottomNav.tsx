import { motion } from 'motion/react';
import { Home, Compass, Plane, Wallet } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLocation, useNavigate } from 'react-router-dom';

const navItems = [
  { id: 'dashboard', label: '首頁', icon: Home, path: '/' },
  { id: 'itinerary', label: '行程', icon: Compass, path: '/itinerary' },
  { id: 'budget', label: '公積金', icon: Wallet, path: '/budget' },
  { id: 'flights', label: '機票', icon: Plane, path: '/flights' },
];

export function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-8 bg-white/80 backdrop-blur-2xl border-t border-outline-variant/10">
      <div className="w-full max-w-lg mx-auto flex justify-around items-center py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={cn(
                "flex flex-col items-center justify-center transition-all duration-300 relative px-6 py-2 rounded-2xl",
                isActive ? "text-primary bg-primary/5" : "text-on-surface-variant hover:text-primary"
              )}
            >
              <Icon size={22} strokeWidth={isActive ? 2.5 : 2} fill={isActive ? "currentColor" : "none"} className={cn(isActive && "fill-primary/20")} />
              <span className={cn(
                "text-[10px] font-bold tracking-tighter mt-1",
                isActive ? "text-primary" : "text-outline"
              )}>
                {item.label}
              </span>
              {isActive && (
                <motion.div 
                  layoutId="nav-indicator"
                  className="absolute -bottom-1 w-1 h-1 bg-primary rounded-full"
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
