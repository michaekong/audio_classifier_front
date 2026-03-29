import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Zap, Target, ArrowUpRight, Activity, Cpu, Database, BarChart2, Clock, ChevronRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';

const chartData = [
  { day: 'Lun', val: 420 }, { day: 'Mar', val: 310 }, { day: 'Mer', val: 580 },
  { day: 'Jeu', val: 820 }, { day: 'Ven', val: 540 }, { day: 'Sam', val: 920 }, { day: 'Dim', val: 710 },
];

const KPIS = [
  { label: 'Modèles actifs', value: '8', icon: Cpu, color: '#2563eb', bg: 'rgba(37,99,235,.12)', trend: '+12%' },
  { label: 'Prédictions/jour', value: '1 472', icon: Activity, color: '#10b981', bg: 'rgba(16,185,129,.12)', trend: '+15%' },
  { label: 'Précision moy.', value: '92.4%', icon: Target, color: '#f59e0b', bg: 'rgba(245,158,11,.12)', trend: '+0.8%' },
  { label: 'Utilisateurs', value: '28.6K', icon: Users, color: '#7c3aed', bg: 'rgba(124,58,237,.12)', trend: '+24%' },
];

const MODELS = [
  { name: 'BabyCry-AI', status: 'En ligne', acc: '89.7%', dot: '#10b981' },
  { name: 'RespiDiag-Pro', status: 'En ligne', acc: '92.8%', dot: '#10b981' },
  { name: 'VibraPredict', status: 'Entraînement', acc: '88.5%', dot: '#f59e0b' },
  { name: 'AfroBeatsID', status: 'En ligne', acc: '91.0%', dot: '#10b981' },
  { name: 'AgriSound-X', status: 'Erreur', acc: '72.1%', dot: '#ef4444' },
];

const ACTIVITY = [
  { label: 'RespiDiag-Pro · Prédiction COVID-19', time: 'Il y a 2 min', acc: '91%', color: '#10b981' },
  { label: 'BabyCry-AI · Faim détectée (78%)', time: 'Il y a 5 min', acc: '89%', color: '#7c3aed' },
  { label: 'VibraPredict · Roulement défaut', time: 'Il y a 12 min', acc: '95%', color: '#2563eb' },
  { label: 'AfroBeatsID · Genre : Afrobeats', time: 'Il y a 18 min', acc: '82%', color: '#f59e0b' },
];

export const Dashboard: React.FC = () => {
  const { isDark } = useTheme();
  const gridColor = isDark ? '#1a2a4a' : '#e0e8f5';
  const tickColor = isDark ? '#4a6080' : '#8090b0';

  return (
    <div className="animate-fade-in space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="section-label">Bienvenue, Michael 👋</span>
          <h1 className="font-display text-2xl sm:text-3xl font-bold mt-1" style={{ color: 'var(--text)' }}>
            Tableau de <span style={{ color: '#2563eb' }}>Bord</span>
          </h1>
        </div>
        <div className="flex gap-2 flex-wrap">
          <button className="btn-ghost text-sm py-2 px-4 gap-2"><Activity size={14} style={{ color: '#2563eb' }} />Logs live</button>
          <button className="btn-primary text-sm py-2 px-4 gap-2"><TrendingUp size={14} />Rapport</button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {KPIS.map((k, i) => (
          <motion.div key={i} whileHover={{ y: -3, scale: 1.01 }}
            className="card card-glow p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: k.bg }}>
                <k.icon size={18} style={{ color: k.color }} />
              </div>
              <span className="badge badge-green text-[10px]"><ArrowUpRight size={9} />{k.trend}</span>
            </div>
            <div>
              <div className="font-display font-bold text-2xl" style={{ color: 'var(--text)' }}>{k.value}</div>
              <div className="text-xs mt-0.5" style={{ color: 'var(--text-3)' }}>{k.label}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Area chart */}
        <div className="lg:col-span-2 card p-5">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(37,99,235,.12)' }}>
                <Activity size={16} style={{ color: '#2563eb' }} />
              </div>
              <div>
                <p className="font-bold text-sm" style={{ color: 'var(--text)' }}>Activité des prédictions</p>
                <p className="section-label">Cette semaine</p>
              </div>
            </div>
            <select className="input-base text-xs py-1.5 w-auto pr-8">
              <option>Cette semaine</option><option>Ce mois</option><option>Cette année</option>
            </select>
          </div>
          <div style={{ height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="cg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: tickColor, fontSize: 11 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: tickColor, fontSize: 11 }} />
                <Tooltip contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, color: 'var(--text)', fontSize: 12 }} />
                <Area type="monotone" dataKey="val" stroke="#2563eb" strokeWidth={2.5} fill="url(#cg)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Models status */}
        <div className="card p-5 flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(16,185,129,.12)' }}>
              <Cpu size={16} style={{ color: '#10b981' }} />
            </div>
            <div>
              <p className="font-bold text-sm" style={{ color: 'var(--text)' }}>Modèles</p>
              <p className="section-label">Statut en direct</p>
            </div>
          </div>
          <div className="flex-1 space-y-2">
            {MODELS.map((m, i) => (
              <div key={i} className="flex items-center justify-between px-3 py-2.5 rounded-xl border transition-all hover:border-electric/30 cursor-pointer"
                style={{ background: 'var(--bg-1)', borderColor: 'var(--border)' }}>
                <div className="flex items-center gap-2.5">
                  <div className="w-2 h-2 rounded-full shrink-0" style={{ background: m.dot, boxShadow: `0 0 6px ${m.dot}80` }} />
                  <div>
                    <p className="text-xs font-semibold" style={{ color: 'var(--text)' }}>{m.name}</p>
                    <p className="text-[10px] font-mono" style={{ color: 'var(--text-3)' }}>{m.status}</p>
                  </div>
                </div>
                <span className="text-xs font-bold font-mono" style={{ color: 'var(--text-2)' }}>{m.acc}</span>
              </div>
            ))}
          </div>
          <Link to="/portfolios" className="btn-ghost text-xs py-2 mt-4 gap-1.5 w-full justify-center">Voir tous <ChevronRight size={13} /></Link>
        </div>
      </div>

      {/* Recent activity + quick actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="card p-5">
          <div className="flex items-center gap-2 mb-4">
            <Clock size={16} style={{ color: '#2563eb' }} />
            <p className="font-bold text-sm" style={{ color: 'var(--text)' }}>Activité récente</p>
          </div>
          <div className="space-y-3">
            {ACTIVITY.map((a, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: a.color }} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium truncate" style={{ color: 'var(--text)' }}>{a.label}</p>
                  <p className="text-[10px]" style={{ color: 'var(--text-3)' }}>{a.time}</p>
                </div>
                <span className="text-[10px] font-mono font-bold shrink-0" style={{ color: a.color }}>{a.acc}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="card p-5">
          <p className="font-bold text-sm mb-4" style={{ color: 'var(--text)' }}>Accès rapide</p>
          <div className="grid grid-cols-2 gap-2">
            {[
              { icon: Zap, label: 'Nouvelle prédiction', to: '/predict', color: '#2563eb' },
              { icon: Database, label: 'Ajouter un dataset', to: '/datasets', color: '#10b981' },
              { icon: BarChart2, label: 'Analytics', to: '/analytics', color: '#f59e0b' },
              { icon: TrendingUp, label: 'Studio Train', to: '/train', color: '#7c3aed' },
            ].map((item, i) => (
              <Link key={i} to={item.to}
                className="flex items-center gap-2.5 px-3 py-3 rounded-xl border transition-all hover:shadow-md card-glow"
                style={{ borderColor: 'var(--border)', textDecoration: 'none' }}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: item.color + '18' }}>
                  <item.icon size={16} style={{ color: item.color }} />
                </div>
                <span className="text-xs font-semibold" style={{ color: 'var(--text)' }}>{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
