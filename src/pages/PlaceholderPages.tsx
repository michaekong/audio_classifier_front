import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart2, User, FileText, HelpCircle, CreditCard, ShieldCheck, MessageSquare, Rocket,
  TrendingUp, Activity, Zap, Target, Clock, ArrowUpRight, Download, Bell, Key, Globe,
  Shield, Mail, Camera, Edit3, Check, Star, Cpu, Database, Layers, ThumbsUp, Hash,
  Calendar, Award, GitBranch, Eye, ChevronRight, Code, BookOpen, Play
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { useTheme } from '../context/ThemeContext';

/* ── Analytics ───────────────────────────────────────────────────────── */
const weekData = [
  { day: 'Lun', predictions: 420, latency: 18, acc: 91 },
  { day: 'Mar', predictions: 380, latency: 22, acc: 89 },
  { day: 'Mer', predictions: 610, latency: 16, acc: 93 },
  { day: 'Jeu', predictions: 820, latency: 14, acc: 94 },
  { day: 'Ven', predictions: 540, latency: 19, acc: 92 },
  { day: 'Sam', predictions: 920, latency: 12, acc: 95 },
  { day: 'Dim', predictions: 710, latency: 15, acc: 94 },
];
const modelUsage = [
  { name: 'RespiDiag', value: 32, color: '#10b981' },
  { name: 'BabyCry-AI', value: 28, color: '#7c3aed' },
  { name: 'VibraPredict', value: 20, color: '#2563eb' },
  { name: 'AfroBeatsID', value: 13, color: '#f59e0b' },
  { name: 'AgriSound', value: 7, color: '#06b6d4' },
];

function StatCard({ label, value, sub, icon: Icon, color, trend }: any) {
  return (
    <div className="card p-5 space-y-3 card-glow">
      <div className="flex items-center justify-between">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: color + '18' }}>
          <Icon size={18} style={{ color }} />
        </div>
        {trend && <span className="badge badge-green"><ArrowUpRight size={10} />{trend}</span>}
      </div>
      <div>
        <div className="font-display text-2xl font-bold" style={{ color: 'var(--text)' }}>{value}</div>
        <div className="text-xs mt-0.5" style={{ color: 'var(--text-3)' }}>{label}</div>
        {sub && <div className="text-xs font-mono" style={{ color: 'var(--text-3)' }}>{sub}</div>}
      </div>
    </div>
  );
}

export const Analytics = () => {
  const { isDark } = useTheme();
  const [period, setPeriod] = useState('week');
  const gridColor = isDark ? '#1a2a4a' : '#e0e8f5';
  const textColor = isDark ? '#4a6080' : '#8090b0';
  return (
    <div className="animate-fade-in space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="section-label flex items-center gap-2 mb-1"><BarChart2 size={14} style={{ color: '#2563eb' }} />Analytics</span>
          <h1 className="font-display text-2xl sm:text-3xl font-bold" style={{ color: 'var(--text)' }}>Tableau d'<span style={{ color: '#2563eb' }}>Analyse</span></h1>
        </div>
        <div className="flex gap-1 p-1 rounded-xl border" style={{ background: 'var(--bg-1)', borderColor: 'var(--border)' }}>
          {['week','month','year'].map(p => (
            <button key={p} onClick={() => setPeriod(p)} className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
              style={period === p ? { background: '#2563eb', color: '#fff' } : { color: 'var(--text-3)' }}>
              {p === 'week' ? 'Semaine' : p === 'month' ? 'Mois' : 'Année'}
            </button>
          ))}
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Prédictions totales" value="42.8K" trend="+18%" icon={Activity} color="#2563eb" />
        <StatCard label="Précision moyenne" value="92.4%" trend="+1.2%" icon={Target} color="#10b981" />
        <StatCard label="Latence médiane" value="16ms" trend="-3ms" icon={Zap} color="#f59e0b" />
        <StatCard label="Modèles actifs" value="8" sub="3 en cours d'entraînement" icon={Cpu} color="#7c3aed" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 card p-5">
          <div className="flex items-center justify-between mb-4">
            <p className="font-bold text-sm" style={{ color: 'var(--text)' }}>Prédictions par jour</p>
            <span className="section-label">Cette semaine</span>
          </div>
          <div style={{ height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weekData}>
                <defs>
                  <linearGradient id="grad1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: textColor, fontSize: 11 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: textColor, fontSize: 11 }} />
                <Tooltip contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, color: 'var(--text)' }} />
                <Area type="monotone" dataKey="predictions" stroke="#2563eb" strokeWidth={2.5} fill="url(#grad1)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="card p-5">
          <p className="font-bold text-sm mb-4" style={{ color: 'var(--text)' }}>Usage par modèle</p>
          <div style={{ height: 180 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={modelUsage} cx="50%" cy="50%" innerRadius={48} outerRadius={72} paddingAngle={3} dataKey="value">
                  {modelUsage.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, color: 'var(--text)' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-2">
            {modelUsage.map(m => (
              <div key={m.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: m.color }} />
                  <span style={{ color: 'var(--text-2)' }}>{m.name}</span>
                </div>
                <span className="font-mono font-bold" style={{ color: 'var(--text)' }}>{m.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Latency + Accuracy bars */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {[{ key: 'latency', label: 'Latence (ms)', color: '#f59e0b' }, { key: 'acc', label: 'Précision (%)', color: '#10b981' }].map(({ key, label, color }) => (
          <div key={key} className="card p-5">
            <p className="font-bold text-sm mb-4" style={{ color: 'var(--text)' }}>{label}</p>
            <div style={{ height: 160 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weekData} barSize={24}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: textColor, fontSize: 11 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: textColor, fontSize: 11 }} />
                  <Tooltip contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, color: 'var(--text)' }} />
                  <Bar dataKey={key} fill={color} radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ── Profile ─────────────────────────────────────────────────────────── */
export const Profile = () => {
  const [tab, setTab] = useState<'profile'|'api'|'notifications'|'security'>('profile');
  const [saved, setSaved] = useState(false);
  const [name, setName] = useState('Michael Nzuzi');
  const [bio, setBio] = useState('Ingénieur ML spécialisé en traitement du signal audio et classification. Passionné par l\'IA africaine.');
  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <div className="animate-fade-in space-y-5 max-w-4xl">
      <div>
        <span className="section-label flex items-center gap-2 mb-1"><User size={14} style={{ color: '#2563eb' }} />Profil</span>
        <h1 className="font-display text-2xl sm:text-3xl font-bold" style={{ color: 'var(--text)' }}>Mon <span style={{ color: '#2563eb' }}>Compte</span></h1>
      </div>

      {/* Avatar card */}
      <div className="card p-5 flex flex-col sm:flex-row items-center gap-5">
        <div className="relative shrink-0">
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-white text-3xl font-bold" style={{ background: 'linear-gradient(135deg,#2563eb,#7c3aed)' }}>M</div>
          <button className="absolute -bottom-1.5 -right-1.5 w-7 h-7 rounded-lg bg-electric flex items-center justify-center text-white shadow-lg">
            <Camera size={13} />
          </button>
        </div>
        <div className="flex-1 text-center sm:text-left">
          <p className="font-display font-bold text-xl" style={{ color: 'var(--text)' }}>{name}</p>
          <p className="text-sm" style={{ color: 'var(--text-3)' }}>michael.nzuzi@audioclass.ai</p>
          <div className="flex flex-wrap gap-2 mt-2 justify-center sm:justify-start">
            <span className="badge badge-blue"><Star size={9} />Pro Plan</span>
            <span className="badge badge-purple"><Award size={9} />ML Engineer</span>
            <span className="badge badge-green"><Check size={9} />Vérifié</span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 text-center">
          {[['8', 'Modèles'], ['23', 'Datasets'], ['47K', 'Prédictions']].map(([v, l]) => (
            <div key={l}><div className="font-display font-bold text-xl" style={{ color: '#2563eb' }}>{v}</div><div className="text-[10px]" style={{ color: 'var(--text-3)' }}>{l}</div></div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-0 border-b" style={{ borderColor: 'var(--border)' }}>
        {[['profile','Profil'],['api','Clés API'],['notifications','Notifications'],['security','Sécurité']].map(([k, l]) => (
          <button key={k} onClick={() => setTab(k as any)}
            className={`px-4 py-2.5 text-xs font-semibold transition-all border-b-2 ${tab === k ? 'tab-active' : 'border-transparent'}`}
            style={{ color: tab === k ? '#2563eb' : 'var(--text-3)' }}>{l}</button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={tab} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
          {tab === 'profile' && (
            <div className="card p-5 space-y-4">
              <p className="font-bold text-sm" style={{ color: 'var(--text)' }}>Informations personnelles</p>
              {[['Nom complet', name, setName],['Email','michael.nzuzi@audioclass.ai',undefined],['Organisation','AudioClass Labs',undefined]].map(([lbl, val, fn]) => (
                <div key={lbl as string} className="space-y-1">
                  <label className="text-xs font-semibold" style={{ color: 'var(--text-2)' }}>{lbl as string}</label>
                  <input className="input-base" value={val as string} onChange={fn ? (e: any) => (fn as any)(e.target.value) : undefined} readOnly={!fn} />
                </div>
              ))}
              <div className="space-y-1">
                <label className="text-xs font-semibold" style={{ color: 'var(--text-2)' }}>Bio</label>
                <textarea className="input-base resize-none" style={{ minHeight: 80 }} value={bio} onChange={e => setBio(e.target.value)} />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold" style={{ color: 'var(--text-2)' }}>Spécialité ML</label>
                <select className="input-base"><option>Audio & Signal Processing</option><option>Computer Vision</option><option>NLP</option></select>
              </div>
              <button onClick={save} className="btn-primary text-sm py-2 px-4 gap-2">
                {saved ? <><Check size={14} />Sauvegardé</> : <><Edit3 size={14} />Sauvegarder</>}
              </button>
            </div>
          )}
          {tab === 'api' && (
            <div className="card p-5 space-y-4">
              <p className="font-bold text-sm" style={{ color: 'var(--text)' }}>Clés API</p>
              {[['Production','sk-prod-••••••••••••••••••••abc123','2025-12-31'],['Development','sk-dev-••••••••••••••••••••xyz789','2025-06-30']].map(([env, key, exp]) => (
                <div key={env as string} className="rounded-xl p-4 border space-y-2" style={{ background: 'var(--bg-1)', borderColor: 'var(--border)' }}>
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className="font-semibold text-sm" style={{ color: 'var(--text)' }}>{env as string}</span>
                    <div className="flex gap-2">
                      <span className="badge badge-green">Active</span>
                      <button className="text-xs text-electric hover:underline">Renouveler</button>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg px-3 py-2 font-mono text-xs" style={{ background: 'var(--bg-2)', color: 'var(--text-3)' }}>
                    <Key size={12} />
                    <span className="flex-1 truncate">{key as string}</span>
                    <button className="text-electric hover:opacity-70">Copier</button>
                  </div>
                  <p className="text-[10px]" style={{ color: 'var(--text-3)' }}>Expire le {exp as string} · 4 200 appels restants</p>
                </div>
              ))}
              <button className="btn-ghost text-sm py-2 px-4 gap-2"><Key size={14} />Générer une nouvelle clé</button>
            </div>
          )}
          {tab === 'notifications' && (
            <div className="card p-5 space-y-4">
              <p className="font-bold text-sm" style={{ color: 'var(--text)' }}>Préférences de notification</p>
              {[['Fin d\'entraînement','Notifier quand un modèle termine',true],['Erreurs de prédiction','Alertes si précision < seuil',true],['Newsletter','Nouveautés et mises à jour',false],['Digest hebdo','Résumé des performances',true]].map(([lbl, desc, def]) => (
                <div key={lbl as string} className="flex items-center justify-between gap-4 p-3 rounded-xl border" style={{ background: 'var(--bg-1)', borderColor: 'var(--border)' }}>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: 'var(--text)' }}>{lbl as string}</p>
                    <p className="text-xs" style={{ color: 'var(--text-3)' }}>{desc as string}</p>
                  </div>
                  <ToggleSwitch defaultOn={def as boolean} />
                </div>
              ))}
            </div>
          )}
          {tab === 'security' && (
            <div className="card p-5 space-y-4">
              <p className="font-bold text-sm" style={{ color: 'var(--text)' }}>Sécurité du compte</p>
              {[['Mot de passe actuel',''],['Nouveau mot de passe',''],['Confirmer','']].map(([lbl]) => (
                <div key={lbl as string} className="space-y-1">
                  <label className="text-xs font-semibold" style={{ color: 'var(--text-2)' }}>{lbl as string}</label>
                  <input type="password" className="input-base" placeholder="••••••••" />
                </div>
              ))}
              <div className="flex items-center justify-between p-3 rounded-xl border" style={{ background: 'var(--bg-1)', borderColor: 'var(--border)' }}>
                <div>
                  <p className="text-sm font-semibold" style={{ color: 'var(--text)' }}>Authentification 2FA</p>
                  <p className="text-xs" style={{ color: 'var(--text-3)' }}>Sécurité renforcée via Google Authenticator</p>
                </div>
                <ToggleSwitch defaultOn={false} />
              </div>
              <button className="btn-primary text-sm py-2 px-4 gap-2"><Shield size={14} />Mettre à jour</button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

function ToggleSwitch({ defaultOn }: { defaultOn: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <button onClick={() => setOn(v => !v)} className={`w-10 h-6 rounded-full relative transition-all shrink-0 ${on ? 'bg-electric' : 'bg-[var(--border)]'}`}>
      <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all ${on ? 'left-5' : 'left-1'}`} />
    </button>
  );
}

/* ── Stubs ── */
const Stub = ({ title, icon: Icon, desc }: any) => (
  <div className="animate-fade-in flex items-center justify-center min-h-[50vh]">
    <div className="card p-10 text-center max-w-sm w-full space-y-4">
      <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto" style={{ background: 'rgba(37,99,235,.1)' }}>
        <Icon size={28} style={{ color: '#2563eb' }} />
      </div>
      <h2 className="font-display text-xl font-bold" style={{ color: 'var(--text)' }}>{title}</h2>
      <p className="text-sm" style={{ color: 'var(--text-3)' }}>{desc}</p>
      <button className="btn-primary w-full text-sm py-2.5">Accéder</button>
    </div>
  </div>
);

export const APIDocs   = () => <Stub title="Documentation API" icon={Code} desc="Explorez notre API REST avec Swagger. Intégrez AudioClass AI dans vos applications." />;
export const HelpCenter= () => <Stub title="Centre d'Aide" icon={BookOpen} desc="Tutoriels et guides pour tirer le meilleur parti de la plateforme." />;
export const Billing   = () => <Stub title="Facturation" icon={CreditCard} desc="Gérez vos abonnements et méthodes de paiement." />;
export const Admin     = () => <Stub title="Administration" icon={ShieldCheck} desc="Modération et statistiques (réservé aux administrateurs)." />;
export const Forum     = () => <Stub title="Communauté" icon={MessageSquare} desc="Échangez avec d'autres ingénieurs et partagez vos modèles." />;
export const Onboarding= () => <Stub title="Bienvenue !" icon={Rocket} desc="Suivez notre guide rapide pour configurer votre premier modèle." />;
