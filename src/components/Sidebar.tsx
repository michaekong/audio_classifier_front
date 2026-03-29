import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Home, Briefcase, Mic, Database, BarChart2, User,
  LogOut, ChevronLeft, ChevronRight, X, Radio, Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (c: boolean) => void;
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

const navItems = [
  { icon: Home,      label: 'Tableau de bord', path: '/dashboard' },
  { icon: Database,  label: 'Datasets',        path: '/datasets' },
  { icon: Briefcase, label: 'Portefeuilles',   path: '/portfolios' },
  { icon: Mic,       label: 'Prédire',         path: '/predict' },
  { icon: Radio,     label: 'Studio Train',    path: '/train' },
  { icon: BarChart2, label: 'Analytics',       path: '/analytics' },
  { icon: User,      label: 'Profil',          path: '/profile' },
];

export const Sidebar: React.FC<SidebarProps> = ({ collapsed, setCollapsed, mobileOpen, onCloseMobile }) => {
  const navigate = useNavigate();

  return (
    <>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onCloseMobile}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden"
          />
        )}
      </AnimatePresence>

      <aside
        style={{ background: 'var(--sidebar-bg)' }}
        className={`h-screen flex flex-col fixed lg:sticky top-0 z-[70] border-r transition-all duration-300
          ${collapsed ? 'w-[72px]' : 'w-60'}
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
        // border color via inline style to use CSS var
      >
        {/* Subtle noise texture overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />

        {/* Logo */}
        <div className="h-16 flex items-center px-4 gap-3 shrink-0 border-b border-white/5">
          <div className="w-9 h-9 rounded-xl bg-electric flex items-center justify-center shadow-lg shadow-electric/40 shrink-0">
            <Zap size={18} className="text-white" />
          </div>
          {!collapsed && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-w-0">
              <p className="text-white font-display font-bold text-sm leading-tight tracking-wide">AudioClass</p>
              <p className="text-[10px] text-white/30 font-mono uppercase tracking-widest">v2.4.0</p>
            </motion.div>
          )}
          {mobileOpen && (
            <button onClick={onCloseMobile} className="ml-auto text-white/40 hover:text-white lg:hidden">
              <X size={18} />
            </button>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-2 space-y-0.5 overflow-y-auto no-scrollbar">
          {!collapsed && (
            <p className="text-[9px] font-mono text-white/20 uppercase tracking-[0.2em] px-3 py-2">Navigation</p>
          )}
          {navItems.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all relative
                ${isActive
                  ? 'bg-electric/15 text-white border-l-2 border-electric pl-[10px]'
                  : 'text-white/40 hover:text-white/80 hover:bg-white/5 border-l-2 border-transparent'
                }
                ${collapsed ? 'justify-center px-0' : ''}`
              }
              title={collapsed ? item.label : undefined}
            >
              {({ isActive }) => (
                <>
                  <item.icon size={18} className={isActive ? 'text-electric' : ''} />
                  {!collapsed && <span>{item.label}</span>}
                  {isActive && !collapsed && (
                    <motion.div layoutId="nav-pill"
                      className="absolute right-3 w-1.5 h-1.5 rounded-full bg-electric"
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Bottom */}
        <div className="shrink-0 p-2 border-t border-white/5 space-y-0.5">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/30 hover:text-white/70 hover:bg-white/5 transition-all text-sm font-semibold ${collapsed ? 'justify-center' : ''}`}
          >
            {collapsed ? <ChevronRight size={18} /> : <><ChevronLeft size={18} /><span>Réduire</span></>}
          </button>
          <button
            onClick={() => navigate('/auth')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-400/60 hover:text-red-400 hover:bg-red-400/10 transition-all text-sm font-semibold ${collapsed ? 'justify-center' : ''}`}
          >
            <LogOut size={18} />
            {!collapsed && <span>Déconnexion</span>}
          </button>
        </div>
      </aside>
    </>
  );
};
