import React, { useState } from 'react';
import { Search, Bell, Sun, Moon, Menu, ChevronDown } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const Header: React.FC<{ onMenuClick?: () => void }> = ({ onMenuClick }) => {
  const { isDark, toggleTheme } = useTheme();
  const [focused, setFocused] = useState(false);

  return (
    <header style={{ height: 60, padding: '0 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50, background: 'var(--card)', borderBottom: '1px solid var(--bdr)', backdropFilter: 'blur(16px)', flexShrink: 0 }}>
      {/* Left */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={onMenuClick} style={{ display: 'none', padding: 7, borderRadius: 9, background: 'none', border: 'none', color: 'var(--t3)', cursor: 'pointer' }} className="lg:hidden"><Menu size={20} /></button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 12px', borderRadius: 10, border: `1px solid ${focused ? 'var(--accent)' : 'var(--bdr)'}`, background: 'var(--s1)', transition: 'all .2s', boxShadow: focused ? 'var(--sh-glow)' : 'none', minWidth: focused ? 240 : 180, maxWidth: 280 }}>
          <Search size={14} style={{ color: focused ? 'var(--accent)' : 'var(--t3)', flexShrink: 0, transition: 'color .15s' }} />
          <input placeholder="Rechercher…" onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
            style={{ background: 'transparent', border: 'none', outline: 'none', fontSize: 13, color: 'var(--t1)', fontFamily: 'inherit', width: '100%' }} />
        </div>
      </div>
      {/* Right */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ display: 'flex', padding: 3, borderRadius: 9, border: '1px solid var(--bdr)', background: 'var(--s1)', gap: 2 }}>
          <button onClick={() => isDark && toggleTheme()} title="Mode jour"
            style={{ padding: 6, borderRadius: 7, border: 'none', cursor: 'pointer', background: !isDark ? 'var(--card)' : 'transparent', color: !isDark ? '#d97706' : 'var(--t3)', display: 'flex', alignItems: 'center', boxShadow: !isDark ? 'var(--sh-sm)' : 'none', transition: 'all .15s' }}>
            <Sun size={15} />
          </button>
          <button onClick={() => !isDark && toggleTheme()} title="Mode nuit"
            style={{ padding: 6, borderRadius: 7, border: 'none', cursor: 'pointer', background: isDark ? 'var(--card)' : 'transparent', color: isDark ? '#93b4ff' : 'var(--t3)', display: 'flex', alignItems: 'center', boxShadow: isDark ? 'var(--sh-sm)' : 'none', transition: 'all .15s' }}>
            <Moon size={15} />
          </button>
        </div>
        <button style={{ padding: 7, borderRadius: 9, background: 'none', border: 'none', color: 'var(--t3)', cursor: 'pointer', position: 'relative', display: 'flex' }}>
          <Bell size={18} />
          <span style={{ position: 'absolute', top: 6, right: 6, width: 7, height: 7, borderRadius: '50%', background: '#ef4444', border: '2px solid var(--card)' }} />
        </button>
        <div style={{ width: 1, height: 20, background: 'var(--bdr)' }} />
        <button style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '5px 10px 5px 5px', borderRadius: 11, background: 'none', border: 'none', cursor: 'pointer', transition: 'background .15s' }}
          onMouseEnter={e => (e.currentTarget.style.background = 'var(--s1)')} onMouseLeave={e => (e.currentTarget.style.background = 'none')}>
          <div style={{ position: 'relative' }}>
            <div style={{ width: 32, height: 32, borderRadius: 9, background: 'linear-gradient(135deg,#3b6fe8,#8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 700, fontFamily: "'Outfit',system-ui" }}>M</div>
            <div style={{ position: 'absolute', bottom: -1, right: -1, width: 9, height: 9, borderRadius: '50%', background: 'var(--ok)', border: '2px solid var(--card)' }} />
          </div>
          <div className="hidden sm:block" style={{ textAlign: 'left' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--t1)', lineHeight: 1.2 }}>Michael N.</div>
            <div style={{ fontSize: 10, color: 'var(--t3)', fontFamily: "'JetBrains Mono',monospace" }}>ML Engineer</div>
          </div>
          <ChevronDown size={13} style={{ color: 'var(--t3)' }} className="hidden sm:block" />
        </button>
      </div>
    </header>
  );
};
