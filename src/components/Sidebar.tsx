import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Home, Briefcase, Mic, Database, BarChart2, User, LogOut, ChevronLeft, ChevronRight, X, Radio, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV = [
  { icon: Home,      label: 'Tableau de bord', path: '/dashboard' },
  { icon: Database,  label: 'Datasets',        path: '/datasets'  },
  { icon: Briefcase, label: 'Portefeuilles',   path: '/portfolios'},
  { icon: Mic,       label: 'Prédire',         path: '/predict'   },
  { icon: Radio,     label: 'Studio Train',    path: '/train'     },
  { icon: BarChart2, label: 'Analytics',       path: '/analytics' },
  { icon: User,      label: 'Profil',          path: '/profile'   },
];

interface Props { collapsed: boolean; setCollapsed:(v:boolean)=>void; mobileOpen?:boolean; onCloseMobile?:()=>void; }

const SB: React.FC<{ collapsed:boolean; setCollapsed:(v:boolean)=>void; onClose?:()=>void; closeable?:boolean }> = ({ collapsed, setCollapsed, onClose, closeable }) => {
  const navigate = useNavigate();
  const W = collapsed ? 64 : 224;
  return (
    <div style={{ width: W, height: '100vh', background: 'var(--sb-bg)', display: 'flex', flexDirection: 'column', transition: 'width .25s', overflow: 'hidden', borderRight: '1px solid var(--sb-bdr)', flexShrink: 0 }}>
      {/* Logo */}
      <div style={{ height: 60, display: 'flex', alignItems: 'center', padding: '0 16px', gap: 10, borderBottom: '1px solid var(--sb-bdr)', flexShrink: 0 }}>
        <div style={{ width: 34, height: 34, borderRadius: 10, background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 3px 12px rgba(59,111,232,.45)' }}>
          <Zap size={17} color="#fff" />
        </div>
        {!collapsed && (
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: "'Outfit',system-ui", fontWeight: 700, fontSize: 15, color: '#fff', lineHeight: 1.2 }}>AudioClass</div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: 'rgba(255,255,255,.2)', textTransform: 'uppercase', letterSpacing: '.15em' }}>AI Platform</div>
          </div>
        )}
        {closeable && <button onClick={onClose} style={{ marginLeft: 'auto', background: 'none', border: 'none', color: 'rgba(255,255,255,.3)', cursor: 'pointer', display: 'flex', padding: 4 }}><X size={16} /></button>}
      </div>
      {/* Nav */}
      <nav style={{ flex: 1, padding: '12px 8px', display: 'flex', flexDirection: 'column', gap: 2, overflow: 'hidden' }} className="no-scroll">
        {!collapsed && <div style={{ fontSize: 9, fontFamily: "'JetBrains Mono',monospace", color: 'rgba(255,255,255,.15)', textTransform: 'uppercase', letterSpacing: '.18em', padding: '2px 8px 8px', marginBottom: 2 }}>Menu</div>}
        {NAV.map(item => (
          <NavLink key={item.path} to={item.path} title={collapsed ? item.label : undefined} onClick={onClose}
            className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
            style={{ justifyContent: collapsed ? 'center' : undefined, padding: collapsed ? '9px 0' : undefined }}>
            {({ isActive }) => (
              <>
                <item.icon size={18} style={{ flexShrink: 0, color: isActive ? '#93b4ff' : undefined }} />
                {!collapsed && <span>{item.label}</span>}
              </>
            )}
          </NavLink>
        ))}
      </nav>
      {/* Footer */}
      <div style={{ padding: 8, borderTop: '1px solid var(--sb-bdr)', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <button onClick={() => setCollapsed(!collapsed)} className="nav-link" style={{ justifyContent: collapsed ? 'center' : undefined, width: '100%', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
          {collapsed ? <ChevronRight size={18} /> : <><ChevronLeft size={18} /><span>Réduire</span></>}
        </button>
        <button onClick={() => navigate('/auth')} className="nav-link" style={{ justifyContent: collapsed ? 'center' : undefined, color: 'rgba(239,68,68,.5)', width: '100%', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
          <LogOut size={18} />{!collapsed && <span>Déconnexion</span>}
        </button>
      </div>
    </div>
  );
};

export const Sidebar: React.FC<Props> = ({ collapsed, setCollapsed, mobileOpen, onCloseMobile }) => (
  <>
    {/* Desktop */}
    <div style={{ position: 'sticky', top: 0, height: '100vh', flexShrink: 0 }} className="hidden lg:block">
      <SB collapsed={collapsed} setCollapsed={setCollapsed} />
    </div>
    {/* Mobile */}
    <AnimatePresence>
      {mobileOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onCloseMobile}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.6)', backdropFilter: 'blur(4px)', zIndex: 60 }}
            className="lg:hidden" />
          <motion.div initial={{ x: -240 }} animate={{ x: 0 }} exit={{ x: -240 }}
            transition={{ type: 'spring', stiffness: 280, damping: 28 }}
            style={{ position: 'fixed', top: 0, left: 0, height: '100vh', zIndex: 70 }}
            className="lg:hidden">
            <SB collapsed={false} setCollapsed={setCollapsed} onClose={onCloseMobile} closeable />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  </>
);
