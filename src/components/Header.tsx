import React from 'react';
import { Search, Bell, Sun, Moon, User, Menu } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

interface HeaderProps {
  onMenuClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="h-20 bg-navy/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-white/10 dark:border-slate-800 px-4 md:px-8 flex items-center justify-between sticky top-0 z-50 transition-all duration-300">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 text-white/70 hover:bg-white/10 dark:hover:bg-slate-800 rounded-xl transition-all"
        >
          <Menu size={24} />
        </button>
        
        <div className="hidden md:flex items-center gap-4 bg-white/10 dark:bg-slate-900/50 px-4 py-2.5 rounded-2xl border border-white/10 dark:border-slate-800 w-48 lg:w-96 group focus-within:ring-2 focus-within:ring-electric/20 transition-all">
          <Search size={18} className="text-white/40 group-focus-within:text-electric transition-colors shrink-0" />
          <input 
            type="text" 
            placeholder="Rechercher..." 
            className="bg-transparent border-none focus:outline-none text-sm w-full text-white placeholder:text-white/40"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-6">
        <div className="flex items-center gap-1 p-1 bg-white/10 dark:bg-slate-900 rounded-xl border border-white/10 dark:border-slate-800">
          <button 
            onClick={() => isDark && toggleTheme()}
            className={`p-1.5 md:p-2 rounded-lg transition-all ${!isDark ? 'bg-white shadow-sm text-electric' : 'text-white/50 hover:text-white'}`}
          >
            <Sun size={16} className="md:w-[18px] md:h-[18px]" />
          </button>
          <button 
            onClick={() => !isDark && toggleTheme()}
            className={`p-1.5 md:p-2 rounded-lg transition-all ${isDark ? 'bg-slate-800 shadow-sm text-electric' : 'text-white/50 hover:text-white'}`}
          >
            <Moon size={16} className="md:w-[18px] md:h-[18px]" />
          </button>
        </div>

        <button className="relative p-2.5 text-white/70 hover:bg-white/10 dark:hover:bg-slate-800 rounded-xl transition-all">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-alert rounded-full border-2 border-navy dark:border-slate-950"></span>
        </button>

        <div className="h-8 w-px bg-white/10 dark:bg-slate-800"></div>

        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-white group-hover:text-electric transition-colors">Michael N.</p>
            <p className="text-[10px] font-black uppercase tracking-widest text-white/40">Ingénieur ML</p>
          </div>
          <div className="relative">
            <div className="w-11 h-11 rounded-2xl bg-electric/10 flex items-center justify-center text-electric border border-electric/20 overflow-hidden group-hover:border-electric/40 transition-all">
              <User size={22} />
            </div>
            {/* Audio Pulse Animation around avatar */}
            <motion.div 
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 rounded-2xl border border-electric pointer-events-none"
            />
          </div>
        </div>
      </div>
    </header>
  );
};
