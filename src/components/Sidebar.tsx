import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Briefcase, 
  Mic, 
  Settings, 
  Database, 
  BarChart2, 
  User, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  X,
  AudioWaveform as Waveform,
  Radio
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ collapsed, setCollapsed, mobileOpen, onCloseMobile }) => {
  const navItems = [
    { icon: Home, label: 'Tableau de bord', path: '/dashboard' },
    { icon: Database, label: 'Datasets', path: '/datasets' },
    { icon: Briefcase, label: 'Portefeuilles', path: '/portfolios' },
    { icon: Mic, label: 'Prédire', path: '/predict' },
    { icon: Radio, label: 'Studio', path: '/train' },
    { icon: BarChart2, label: 'Analytics', path: '/analytics' },
    { icon: User, label: 'Profil', path: '/profile' },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCloseMobile}
            className="fixed inset-0 bg-black/50 z-[60] lg:hidden backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      <aside 
        className={cn(
          "bg-navy dark:bg-slate-950 text-white h-screen transition-all duration-300 flex flex-col fixed lg:sticky top-0 z-[70] border-r border-white/10 dark:border-slate-800",
          collapsed ? "w-20" : "w-64",
          "lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
      <div className="p-6 flex items-center justify-between">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="bg-electric p-2 rounded-lg text-white shrink-0">
            <Waveform size={24} />
          </div>
          {!collapsed && <span className="font-bold text-xl whitespace-nowrap text-white">AudioClass AI</span>}
        </div>
        {mobileOpen && (
          <button 
            onClick={onCloseMobile}
            className="lg:hidden p-2 text-white/70 hover:bg-white/10 dark:hover:bg-slate-800 rounded-xl transition-all"
          >
            <X size={20} />
          </button>
        )}
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => cn(
              "flex items-center gap-4 p-3 rounded-xl transition-all hover:bg-white/10",
              isActive ? "bg-electric text-white shadow-lg shadow-electric/20" : "text-white/70",
              collapsed && "justify-center px-0"
            )}
            title={collapsed ? item.label : undefined}
          >
            <item.icon size={20} />
            {!collapsed && <span className="font-medium">{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-white/10">
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center gap-4 p-3 rounded-xl text-white/70 hover:bg-white/10 transition-all"
        >
          {collapsed ? <ChevronRight size={20} className="mx-auto" /> : (
            <>
              <ChevronLeft size={20} />
              <span className="font-medium">Réduire</span>
            </>
          )}
        </button>
        <button className="w-full flex items-center gap-4 p-3 rounded-xl text-alert hover:bg-alert/10 transition-all mt-2">
          <LogOut size={20} className={collapsed ? "mx-auto" : ""} />
          {!collapsed && <span className="font-medium">Déconnexion</span>}
        </button>
      </div>
    </aside>
    </>
  );
};
