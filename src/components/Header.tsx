import React, { useState } from 'react';
import { Search, Bell, Sun, Moon, User, Menu, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

interface HeaderProps { onMenuClick?: () => void; }

export const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { isDark, toggleTheme } = useTheme();
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <header className="h-16 px-4 md:px-6 flex items-center justify-between sticky top-0 z-50 border-b transition-all duration-300"
      style={{ background: 'var(--bg-card)', borderColor: 'var(--border)', backdropFilter: 'blur(12px)' }}>

      <div className="flex items-center gap-3">
        <button onClick={onMenuClick}
          className="lg:hidden p-2 rounded-xl transition-all hover:bg-[var(--bg-1)] text-[var(--text-3)]">
          <Menu size={20} />
        </button>

        <motion.div animate={{ width: searchFocused ? 280 : 200 }} transition={{ duration: 0.2 }}
          className="hidden sm:flex items-center gap-2 rounded-xl px-3 py-2 border transition-all"
          style={{ background: 'var(--bg-1)', borderColor: searchFocused ? '#0d7fea' : 'var(--border)',
            boxShadow: searchFocused ? '0 0 0 3px rgba(13,127,234,.12)' : 'none' }}>
          <Search size={15} style={{ color: searchFocused ? '#0d7fea' : 'var(--text-3)' }} className="shrink-0 transition-colors" />
          <input
            placeholder="Rechercher..."
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            className="bg-transparent text-sm outline-none w-full"
            style={{ color: 'var(--text)', fontFamily: "'Space Grotesk',sans-serif" }}
          />
          <kbd className="hidden lg:block text-[10px] px-1.5 py-0.5 rounded font-mono border" style={{ color: 'var(--text-3)', borderColor: 'var(--border)' }}>⌘K</kbd>
        </motion.div>
      </div>

      <div className="flex items-center gap-2 md:gap-3">
        {/* Theme toggle */}
        <div className="flex items-center p-1 rounded-xl border gap-0.5" style={{ background: 'var(--bg-1)', borderColor: 'var(--border)' }}>
          <button onClick={() => isDark && toggleTheme()}
            className={`p-1.5 rounded-lg transition-all ${!isDark ? 'bg-[var(--bg-card)] shadow-sm text-[var(--color-warm)]' : 'text-[var(--text-3)] hover:text-[var(--text)]'}`}>
            <Sun size={15} />
          </button>
          <button onClick={() => !isDark && toggleTheme()}
            className={`p-1.5 rounded-lg transition-all ${isDark ? 'bg-[var(--bg-card)] shadow-sm text-[var(--color-electric)]' : 'text-[var(--text-3)] hover:text-[var(--text)]'}`}>
            <Moon size={15} />
          </button>
        </div>

        {/* Notifications */}
        <button className="relative p-2 rounded-xl transition-all hover:bg-[var(--bg-1)]" style={{ color: 'var(--text-3)' }}>
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-alert rounded-full border-2"
            style={{ borderColor: 'var(--bg-card)' }} />
        </button>

        <div className="w-px h-6" style={{ background: 'var(--border)' }} />

        {/* Avatar */}
        <button className="flex items-center gap-2.5 rounded-xl p-1 pr-3 transition-all hover:bg-[var(--bg-1)]">
          <div className="relative">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold"
              style={{ background: 'linear-gradient(135deg,#0d7fea,#7c3aed)' }}>M</div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-success rounded-full border-2"
              style={{ borderColor: 'var(--bg-card)' }} />
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-bold leading-none" style={{ color: 'var(--text)' }}>Michael N.</p>
            <p className="text-[10px] leading-none mt-0.5" style={{ color: 'var(--text-3)' }}>Ingénieur ML</p>
          </div>
          <ChevronDown size={14} style={{ color: 'var(--text-3)' }} className="hidden sm:block" />
        </button>
      </div>
    </header>
  );
};
