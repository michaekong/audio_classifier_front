import React, { useState } from 'react';
import { Search, Bell, Sun, Moon, User, Menu, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

interface HeaderProps { onMenuClick?: () => void; }
export const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { isDark, toggleTheme } = useTheme();
  const [focused, setFocused] = useState(false);
  return (
    <header style={{ background: 'var(--header-bg)', borderColor: 'var(--border)', backdropFilter: 'blur(16px)' }}
      className="h-14 px-4 md:px-5 flex items-center justify-between sticky top-0 z-50 border-b transition-colors duration-300">
      <div className="flex items-center gap-3">
        <button onClick={onMenuClick} className="lg:hidden p-1.5 rounded-lg hover:bg-[var(--bg-1)] transition-all" style={{ color: 'var(--text-3)' }}>
          <Menu size={19} />
        </button>
        <motion.div animate={{ width: focused ? 260 : 180 }} transition={{ duration: .2 }}
          className="hidden sm:flex items-center gap-2 rounded-xl px-3 py-1.5 border transition-all"
          style={{ background: 'var(--bg-1)', borderColor: focused ? '#2563eb' : 'var(--border)', boxShadow: focused ? '0 0 0 3px rgba(37,99,235,.12)' : 'none' }}>
          <Search size={14} style={{ color: focused ? '#2563eb' : 'var(--text-3)' }} className="shrink-0 transition-colors" />
          <input placeholder="Rechercher…" onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
            className="bg-transparent text-sm outline-none w-full" style={{ color: 'var(--text)', fontFamily: "'Space Grotesk',sans-serif" }} />
        </motion.div>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center p-0.5 rounded-lg border gap-0.5" style={{ background: 'var(--bg-1)', borderColor: 'var(--border)' }}>
          <button onClick={() => isDark && toggleTheme()}
            className={`p-1.5 rounded-md transition-all ${!isDark ? 'bg-[var(--bg-card)] shadow-sm text-yellow-500' : 'text-[var(--text-3)] hover:text-[var(--text)]'}`}>
            <Sun size={14} />
          </button>
          <button onClick={() => !isDark && toggleTheme()}
            className={`p-1.5 rounded-md transition-all ${isDark ? 'bg-[var(--bg-card)] shadow-sm text-electric' : 'text-[var(--text-3)] hover:text-[var(--text)]'}`}>
            <Moon size={14} />
          </button>
        </div>
        <button className="relative p-1.5 rounded-lg hover:bg-[var(--bg-1)] transition-all" style={{ color: 'var(--text-3)' }}>
          <Bell size={17} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-alert rounded-full border-[1.5px]" style={{ borderColor: 'var(--bg-card)' }} />
        </button>
        <div className="w-px h-5 mx-1" style={{ background: 'var(--border)' }} />
        <button className="flex items-center gap-2 rounded-xl p-1 pr-2.5 hover:bg-[var(--bg-1)] transition-all">
          <div className="relative">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold" style={{ background: 'linear-gradient(135deg,#2563eb,#7c3aed)' }}>M</div>
            <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-success rounded-full border-2" style={{ borderColor: 'var(--bg-card)' }} />
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-bold leading-none" style={{ color: 'var(--text)' }}>Michael N.</p>
            <p className="text-[9px] leading-none mt-0.5 font-mono" style={{ color: 'var(--text-3)' }}>ML Engineer</p>
          </div>
          <ChevronDown size={12} style={{ color: 'var(--text-3)' }} className="hidden sm:block" />
        </button>
      </div>
    </header>
  );
};
