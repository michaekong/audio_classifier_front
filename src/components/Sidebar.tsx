import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Home, Briefcase, Mic, Database, BarChart2, User, LogOut, ChevronLeft, ChevronRight, X, Radio, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarProps {
  collapsed: boolean; setCollapsed: (c: boolean) => void;
  mobileOpen?: boolean; onCloseMobile?: () => void;
}
const NAV = [
  { icon: Home,      label: 'Tableau de bord', path: '/dashboard' },
  { icon: Database,  label: 'Datasets',        path: '/datasets'  },
  { icon: Briefcase, label: 'Portefeuilles',   path: '/portfolios'},
  { icon: Mic,       label: 'Prédire',         path: '/predict'   },
  { icon: Radio,     label: 'Studio Train',    path: '/train'     },
  { icon: BarChart2, label: 'Analytics',       path: '/analytics' },
  { icon: User,      label: 'Profil',          path: '/profile'   },
];
export const Sidebar: React.FC<SidebarProps> = ({ collapsed, setCollapsed, mobileOpen, onCloseMobile }) => {
  const navigate = useNavigate();
  return (
    <>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onCloseMobile} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden" />
        )}
      </AnimatePresence>
      <aside style={{ background: 'var(--sidebar-bg)' }}
        className={`h-screen flex flex-col fixed lg:sticky top-0 z-[70] border-r border-white/5 transition-all duration-300
          ${collapsed ? 'w-[68px]' : 'w-56'}
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        {/* Logo */}
        <div className="h-14 flex items-center px-3 gap-2.5 shrink-0 border-b border-white/5">
          <div className="w-8 h-8 rounded-lg bg-electric flex items-center justify-center shadow-lg shadow-electric/30 shrink-0">
            <Zap size={16} className="text-white" />
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <p className="text-white font-display font-bold text-sm leading-tight">AudioClass</p>
              <p className="text-[9px] text-white/25 font-mono uppercase tracking-widest">AI Platform</p>
            </div>
          )}
          {mobileOpen && <button onClick={onCloseMobile} className="ml-auto text-white/30 hover:text-white lg:hidden p-1"><X size={16} /></button>}
        </div>
        {/* Nav */}
        <nav className="flex-1 py-3 px-2 space-y-0.5 overflow-y-auto no-scrollbar">
          {!collapsed && <p className="text-[9px] font-mono text-white/15 uppercase tracking-[.18em] px-2 py-2">Menu</p>}
          {NAV.map(item => (
            <NavLink key={item.path} to={item.path} title={collapsed ? item.label : undefined}
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-sm font-medium transition-all relative
                 ${isActive ? 'nav-active' : 'text-white/35 hover:text-white/70 hover:bg-white/5 border-l-2 border-transparent'}
                 ${collapsed ? 'justify-center' : ''}`}>
              {({ isActive }) => (
                <>
                  <item.icon size={17} className={isActive ? 'text-electric-light' : ''} />
                  {!collapsed && <span>{item.label}</span>}
                </>
              )}
            </NavLink>
          ))}
        </nav>
        {/* Footer */}
        <div className="shrink-0 p-2 border-t border-white/5 space-y-0.5">
          <button onClick={() => setCollapsed(!collapsed)}
            className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-white/25 hover:text-white/60 hover:bg-white/5 transition-all text-sm ${collapsed ? 'justify-center' : ''}`}>
            {collapsed ? <ChevronRight size={17} /> : <><ChevronLeft size={17} /><span>Réduire</span></>}
          </button>
          <button onClick={() => navigate('/auth')}
            className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-red-400/50 hover:text-red-400 hover:bg-red-400/8 transition-all text-sm ${collapsed ? 'justify-center' : ''}`}>
            <LogOut size={17} />{!collapsed && <span>Déconnexion</span>}
          </button>
        </div>
      </aside>
    </>
  );
};
