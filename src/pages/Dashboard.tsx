import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Zap, Target, ArrowUpRight, Activity, Cpu, Database, BarChart2, Clock, ChevronRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';

const chartData = [
  { day:'Lun', val:420 },{ day:'Mar', val:310 },{ day:'Mer', val:580 },
  { day:'Jeu', val:820 },{ day:'Ven', val:540 },{ day:'Sam', val:920 },{ day:'Dim', val:710 },
];
const KPIS = [
  { label:'Modèles actifs',    value:'8',      icon:Cpu,      color:'#3b6fe8', bg:'rgba(59,111,232,.1)', trend:'+12%' },
  { label:'Prédictions/jour',  value:'1 472',  icon:Activity, color:'#22c55e', bg:'rgba(34,197,94,.1)',  trend:'+15%' },
  { label:'Précision moy.',    value:'92.4%',  icon:Target,   color:'#f59e0b', bg:'rgba(245,158,11,.1)', trend:'+0.8%' },
  { label:'Utilisateurs',      value:'28.6K',  icon:Users,    color:'#8b5cf6', bg:'rgba(139,92,246,.1)', trend:'+24%' },
];
const MODELS = [
  { name:'BabyCry-AI',     status:'En ligne',      acc:'89.7%', dot:'#22c55e' },
  { name:'RespiDiag-Pro',  status:'En ligne',      acc:'92.8%', dot:'#22c55e' },
  { name:'VibraPredict',   status:'Entraînement',  acc:'88.5%', dot:'#f59e0b' },
  { name:'AfroBeatsID',    status:'En ligne',      acc:'91.0%', dot:'#22c55e' },
  { name:'AgriSound-X',    status:'Erreur',        acc:'72.1%', dot:'#ef4444' },
];
const ACTIVITY = [
  { label:'RespiDiag-Pro · COVID-19 détecté',    time:'2 min',  color:'#22c55e', val:'91%' },
  { label:'BabyCry-AI · Faim (78%)',              time:'5 min',  color:'#8b5cf6', val:'89%' },
  { label:'VibraPredict · Roulement défaut',      time:'12 min', color:'#3b6fe8', val:'95%' },
  { label:'AfroBeatsID · Genre : Afrobeats',      time:'18 min', color:'#f59e0b', val:'82%' },
];

export const Dashboard: React.FC = () => {
  const { isDark } = useTheme();
  const gc = isDark ? '#1e3050' : '#dde6f5';
  const tc = isDark ? '#506080' : '#8090b0';

  return (
    <div className="page-wrap fade-in">
      {/* Header */}
      <div className="row-between">
        <div className="col" style={{ gap: 4 }}>
          <div className="eyebrow">Bienvenue, Michael 👋</div>
          <h1 className="h1 font-heading">Tableau de <span className="text-accent">Bord</span></h1>
        </div>
        <div className="row" style={{ gap: 8 }}>
          <button className="btn btn-ghost btn-sm"><Activity size={14} style={{ color:'var(--accent)' }} /> Logs</button>
          <button className="btn btn-primary btn-sm"><TrendingUp size={14} /> Rapport</button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid-4">
        {KPIS.map((k,i) => (
          <motion.div key={i} whileHover={{ y:-3 }} className="card card-p card-hover" style={{ display:'flex', flexDirection:'column', gap:16 }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <div style={{ width:38, height:38, borderRadius:11, background:k.bg, display:'flex', alignItems:'center', justifyContent:'center' }}>
                <k.icon size={19} color={k.color} />
              </div>
              <span className="badge bd-green" style={{ fontSize:10 }}><ArrowUpRight size={9} />{k.trend}</span>
            </div>
            <div>
              <div className="font-heading" style={{ fontSize:26, fontWeight:700, color:'var(--t1)' }}>{k.value}</div>
              <div style={{ fontSize:12, color:'var(--t3)', marginTop:3 }}>{k.label}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Chart + Models */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 340px', gap:16 }} className="responsive-2col">
        <div className="card card-p2">
          <div className="row-between" style={{ marginBottom:20 }}>
            <div className="row" style={{ gap:10 }}>
              <div style={{ width:36, height:36, borderRadius:10, background:'rgba(59,111,232,.1)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <Activity size={17} color="var(--accent)" />
              </div>
              <div>
                <div className="h3">Activité des prédictions</div>
                <div className="eyebrow" style={{ fontSize:10 }}>Cette semaine</div>
              </div>
            </div>
            <select className="input" style={{ width:'auto', padding:'6px 10px', fontSize:12 }}>
              <option>Cette semaine</option><option>Ce mois</option>
            </select>
          </div>
          <div style={{ height:220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="gd" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--accent)" stopOpacity={.22}/>
                    <stop offset="95%" stopColor="var(--accent)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gc}/>
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill:tc, fontSize:11 }}/>
                <YAxis axisLine={false} tickLine={false} tick={{ fill:tc, fontSize:11 }}/>
                <Tooltip contentStyle={{ background:'var(--card)', border:'1px solid var(--bdr)', borderRadius:12, color:'var(--t1)', fontSize:12 }}/>
                <Area type="monotone" dataKey="val" stroke="var(--accent)" strokeWidth={2.5} fill="url(#gd)"/>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card card-p" style={{ display:'flex', flexDirection:'column', gap:0 }}>
          <div className="row" style={{ gap:10, marginBottom:14 }}>
            <div style={{ width:36, height:36, borderRadius:10, background:'rgba(34,197,94,.1)', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <Cpu size={17} color="var(--ok)" />
            </div>
            <div>
              <div className="h3">Modèles</div>
              <div className="eyebrow" style={{ fontSize:10 }}>Statut en direct</div>
            </div>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:6, flex:1 }}>
            {MODELS.map((m,i) => (
              <div key={i} className="card-s" style={{ padding:'10px 12px', display:'flex', alignItems:'center', justifyContent:'space-between', cursor:'pointer', transition:'border-color .15s' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor='rgba(59,111,232,.4)') } onMouseLeave={e => (e.currentTarget.style.borderColor='var(--bdr2)')}>
                <div className="row" style={{ gap:8 }}>
                  <div style={{ width:8, height:8, borderRadius:'50%', background:m.dot, boxShadow:`0 0 6px ${m.dot}80`, flexShrink:0 }}/>
                  <div>
                    <div style={{ fontSize:13, fontWeight:600, color:'var(--t1)' }}>{m.name}</div>
                    <div style={{ fontSize:10, color:'var(--t3)', fontFamily:"'JetBrains Mono',monospace" }}>{m.status}</div>
                  </div>
                </div>
                <div style={{ fontSize:12, fontWeight:700, color:'var(--t2)', fontFamily:"'JetBrains Mono',monospace" }}>{m.acc}</div>
              </div>
            ))}
          </div>
          <Link to="/portfolios" className="btn btn-ghost btn-sm" style={{ marginTop:14, textDecoration:'none', justifyContent:'center' }}>
            Voir tous <ChevronRight size={13}/>
          </Link>
        </div>
      </div>

      {/* Activity + Quick links */}
      <div className="grid-2">
        <div className="card card-p">
          <div className="row" style={{ gap:8, marginBottom:16 }}>
            <Clock size={16} color="var(--accent)"/>
            <div className="h3">Activité récente</div>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
            {ACTIVITY.map((a,i) => (
              <div key={i} style={{ display:'flex', alignItems:'center', gap:10 }}>
                <div style={{ width:7, height:7, borderRadius:'50%', background:a.color, flexShrink:0 }}/>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:13, fontWeight:500, color:'var(--t1)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{a.label}</div>
                  <div style={{ fontSize:11, color:'var(--t3)' }}>Il y a {a.time}</div>
                </div>
                <div style={{ fontSize:11, fontWeight:700, color:a.color, fontFamily:"'JetBrains Mono',monospace", flexShrink:0 }}>{a.val}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="card card-p">
          <div className="h3" style={{ marginBottom:16 }}>Accès rapide</div>
          <div className="grid-2" style={{ gap:10 }}>
            {[
              { icon:Zap,       label:'Prédire',      to:'/predict',    color:'#3b6fe8' },
              { icon:Database,  label:'Datasets',     to:'/datasets',   color:'#22c55e' },
              { icon:BarChart2, label:'Analytics',    to:'/analytics',  color:'#f59e0b' },
              { icon:TrendingUp,label:'Studio Train', to:'/train',      color:'#8b5cf6' },
            ].map((item,i) => (
              <Link key={i} to={item.to} style={{ display:'flex', alignItems:'center', gap:10, padding:'14px 12px', borderRadius:12, background:'var(--s1)', border:'1px solid var(--bdr2)', textDecoration:'none', transition:'all .15s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor=`${item.color}50`; (e.currentTarget as HTMLElement).style.boxShadow='var(--sh-md)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor='var(--bdr2)'; (e.currentTarget as HTMLElement).style.boxShadow='none'; }}>
                <div style={{ width:34, height:34, borderRadius:10, background:item.color+'18', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  <item.icon size={17} color={item.color}/>
                </div>
                <span style={{ fontSize:13, fontWeight:600, color:'var(--t1)', lineHeight:1.3 }}>{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
