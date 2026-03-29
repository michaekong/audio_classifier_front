import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Users, 
  Zap, 
  Target,
  ArrowUpRight,
  ArrowDownRight,
  Activity
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { useTheme } from '../context/ThemeContext';

const data = [
  { name: 'Lun', value: 400 },
  { name: 'Mar', value: 300 },
  { name: 'Mer', value: 600 },
  { name: 'Jeu', value: 800 },
  { name: 'Ven', value: 500 },
  { name: 'Sam', value: 900 },
  { name: 'Dim', value: 700 },
];

export const Dashboard: React.FC = () => {
  const { isDark } = useTheme();
  const kpis = [
    { label: 'Modèles actifs', value: '23', icon: Zap, color: 'text-electric', bg: 'bg-electric/10', trend: '+12%', up: true },
    { label: 'Prédictions / jour', value: '1,472', icon: Activity, color: 'text-success', bg: 'bg-success/10', trend: '+15.4%', up: true },
    { label: 'Précision moyenne', value: '94.2%', icon: Target, color: 'text-warning', bg: 'bg-warning/10', trend: '+0.8%', up: true },
    { label: 'Utilisateurs', value: '12.5k', icon: Users, color: 'text-navy dark:text-blue-300', bg: 'bg-navy/10 dark:bg-blue-900/20', trend: '+24%', up: true },
  ];

  return (
    <div className="space-y-10 animate-fade-in pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight">Tableau de <span className="text-electric">Bord</span></h1>
          <p className="text-white/60 mt-1 font-medium">Bienvenue, Michael. Voici l'analyse spectrale de vos performances IA.</p>
        </div>
        <div className="flex gap-4">
          <button className="btn-secondary py-3.5 px-8 rounded-2xl text-xs font-black uppercase tracking-widest shadow-sm hover:shadow-md active:scale-95 transition-all flex items-center gap-2">
            <Activity size={18} className="text-electric" />
            Logs temps réel
          </button>
          <button className="btn-primary py-3.5 px-8 rounded-2xl text-xs font-black uppercase tracking-widest shadow-2xl shadow-electric/30 hover:shadow-electric/40 active:scale-95 transition-all flex items-center gap-2">
            <TrendingUp size={18} />
            Exporter le rapport
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, i) => (
          <motion.div 
            key={i} 
            whileHover={{ y: -8, scale: 1.02 }}
            className="studio-card-interactive p-8 flex flex-col gap-6 relative group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-electric/5 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150 blur-2xl" />
            
            <div className="flex items-center justify-between relative z-10">
              <div className={`p-4 rounded-2xl ${kpi.bg} ${kpi.color} shadow-lg`}>
                <kpi.icon size={28} />
              </div>
              <div className={`flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest px-3 py-2 rounded-xl shadow-sm ${kpi.up ? 'bg-success/10 text-success' : 'bg-alert/10 text-alert'}`}>
                {kpi.up ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                {kpi.trend}
              </div>
            </div>
            <div className="relative z-10">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{kpi.label}</p>
              <h3 className="text-4xl font-black text-navy dark:text-white tracking-tighter italic">{kpi.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 studio-card p-10 relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-electric/5 rounded-full blur-[100px] -mr-32 -mt-32" />
          
          <div className="flex items-center justify-between mb-12 relative z-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-electric/10 text-electric rounded-2xl flex items-center justify-center shadow-inner">
                <Activity size={28} />
              </div>
              <div>
                <h3 className="text-2xl font-black text-navy dark:text-white uppercase tracking-tighter italic">Activité des prédictions</h3>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Flux de données en temps réel</p>
              </div>
            </div>
            <select className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl px-6 py-3 text-xs font-black uppercase tracking-widest focus:outline-none focus:ring-4 focus:ring-electric/10 text-navy dark:text-white cursor-pointer transition-all shadow-sm">
              <option>Cette semaine</option>
              <option>Ce mois</option>
            </select>
          </div>
          <div className="h-[350px] w-full relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.5}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? '#1E293B' : '#E2E8F0'} opacity={0.5} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: isDark ? '#94A3B8' : '#64748B', fontSize: 10, fontWeight: 900 }}
                  dy={15}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: isDark ? '#94A3B8' : '#64748B', fontSize: 10, fontWeight: 900 }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: isDark ? '#0F172A' : '#FFFFFF', 
                    borderRadius: '24px', 
                    border: 'none',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.2)',
                    padding: '16px'
                  }}
                  itemStyle={{ color: '#3B82F6', fontWeight: '900', textTransform: 'uppercase', fontSize: '10px' }}
                  labelStyle={{ color: isDark ? '#F8FAFC' : '#0F172A', fontWeight: '900', marginBottom: '8px', textTransform: 'uppercase', fontSize: '12px' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#3B82F6" 
                  strokeWidth={6}
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                  animationDuration={2500}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="studio-card p-10 flex flex-col relative">
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-electric/5 rounded-full blur-[80px] -ml-24 -mb-24" />
          
          <div className="flex items-center gap-4 mb-10 relative z-10">
            <div className="w-12 h-12 bg-success/10 text-success rounded-2xl flex items-center justify-center shadow-inner">
              <Zap size={28} />
            </div>
            <div>
              <h3 className="text-2xl font-black text-navy dark:text-white uppercase tracking-tighter italic">Modèles récents</h3>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Statut du déploiement</p>
            </div>
          </div>
          <div className="space-y-5 flex-1 relative z-10">
            {[
              { name: 'BabyCry-AI', status: 'En ligne', acc: '89.7%', color: 'bg-success' },
              { name: 'RespiDiag-Pro', status: 'En ligne', acc: '94.2%', color: 'bg-success' },
              { name: 'VibraPredict', status: 'Entraînement', acc: '88.5%', color: 'bg-warning' },
              { name: 'AfroBeatsID', status: 'En ligne', acc: '91.0%', color: 'bg-success' },
              { name: 'AgriSound-X', status: 'Erreur', acc: '72.1%', color: 'bg-alert' },
            ].map((model, i) => (
              <div key={i} className="flex items-center justify-between p-5 bg-white dark:bg-slate-800/50 rounded-[2rem] border border-slate-50 dark:border-transparent hover:border-electric/30 hover:shadow-lg transition-all cursor-pointer group">
                <div className="flex items-center gap-5">
                  <div className={`w-3 h-3 rounded-full ${model.color} shadow-[0_0_10px_rgba(0,0,0,0.1)] group-hover:scale-150 transition-transform`}></div>
                  <div>
                    <p className="text-sm font-black text-navy dark:text-white uppercase tracking-tight">{model.name}</p>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mt-0.5">{model.status}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-navy dark:text-white italic">{model.acc}</p>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Acc</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full btn-secondary py-5 rounded-[2rem] mt-10 text-xs font-black uppercase tracking-[0.3em] shadow-sm hover:shadow-xl hover:bg-navy hover:text-white transition-all relative z-10">
            Voir tous les modèles
          </button>
        </div>
      </div>
    </div>
  );
};
