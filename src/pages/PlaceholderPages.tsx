import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart2, User, CreditCard, ShieldCheck, MessageSquare, Rocket, Activity, Zap, Target, ArrowUpRight, Key, Shield, Camera, Edit3, Check, Star, Cpu, Award, Code, BookOpen } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { useTheme } from '../context/ThemeContext';

const weekData = [
  { day:'Lun', pred:420, lat:18, acc:91 },{ day:'Mar', pred:380, lat:22, acc:89 },
  { day:'Mer', pred:610, lat:16, acc:93 },{ day:'Jeu', pred:820, lat:14, acc:94 },
  { day:'Ven', pred:540, lat:19, acc:92 },{ day:'Sam', pred:920, lat:12, acc:95 },
  { day:'Dim', pred:710, lat:15, acc:94 },
];
const pieData = [
  { name:'RespiDiag', value:32, color:'#22c55e' },{ name:'BabyCry-AI', value:28, color:'#8b5cf6' },
  { name:'VibraPredict', value:20, color:'#3b6fe8' },{ name:'AfroBeatsID', value:13, color:'#f59e0b' },
  { name:'AgriSound', value:7, color:'#06b6d4' },
];

export const Analytics = () => {
  const { isDark } = useTheme();
  const gc = isDark ? '#1e3050' : '#dde6f5'; const tc = isDark ? '#506080' : '#8090b0';
  const [period, setPeriod] = useState('week');
  return (
    <div className="page-wrap fade-in">
      <div className="row-between">
        <div className="col" style={{ gap:4 }}>
          <div className="eyebrow"><BarChart2 size={13} color="var(--accent)"/>Analytics</div>
          <h1 className="h1 font-heading">Tableau d'<span className="text-accent">Analyse</span></h1>
        </div>
        <div style={{ display:'flex', gap:4, padding:4, borderRadius:12, border:'1px solid var(--bdr)', background:'var(--s1)' }}>
          {['week','month','year'].map(p => (
            <button key={p} onClick={() => setPeriod(p)} className="btn btn-sm"
              style={{ background: p===period?'var(--accent)':'transparent', color: p===period?'#fff':'var(--t3)', border:'none', boxShadow: p===period?'0 2px 8px rgba(59,111,232,.38)':'none' }}>
              {p==='week'?'Semaine':p==='month'?'Mois':'Année'}
            </button>
          ))}
        </div>
      </div>
      <div className="grid-4">
        {[
          { l:'Prédictions totales', v:'42.8K', t:'+18%', i:Activity,  c:'#3b6fe8', bg:'rgba(59,111,232,.1)' },
          { l:'Précision moyenne',   v:'92.4%', t:'+1.2%',i:Target,    c:'#22c55e', bg:'rgba(34,197,94,.1)' },
          { l:'Latence médiane',     v:'16ms',  t:'-3ms', i:Zap,       c:'#f59e0b', bg:'rgba(245,158,11,.1)' },
          { l:'Modèles actifs',      v:'8',     t:'+3',   i:Cpu,       c:'#8b5cf6', bg:'rgba(139,92,246,.1)' },
        ].map((k,i) => (
          <motion.div key={i} whileHover={{ y:-3 }} className="card card-p card-hover" style={{ display:'flex', flexDirection:'column', gap:14 }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <div style={{ width:38, height:38, borderRadius:11, background:k.bg, display:'flex', alignItems:'center', justifyContent:'center' }}><k.i size={19} color={k.c}/></div>
              <span className="badge bd-green" style={{ fontSize:10 }}><ArrowUpRight size={9}/>{k.t}</span>
            </div>
            <div>
              <div className="font-heading" style={{ fontSize:26, fontWeight:700, color:'var(--t1)' }}>{k.v}</div>
              <div style={{ fontSize:12, color:'var(--t3)', marginTop:3 }}>{k.l}</div>
            </div>
          </motion.div>
        ))}
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr', gap:16 }}>
        <div className="card card-p2">
          <div className="h3" style={{ marginBottom:16 }}>Prédictions par jour</div>
          <div style={{ height:200 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weekData}>
                <defs><linearGradient id="ag" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="var(--accent)" stopOpacity={.2}/><stop offset="95%" stopColor="var(--accent)" stopOpacity={0}/></linearGradient></defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gc}/>
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill:tc, fontSize:11 }}/>
                <YAxis axisLine={false} tickLine={false} tick={{ fill:tc, fontSize:11 }}/>
                <Tooltip contentStyle={{ background:'var(--card)', border:'1px solid var(--bdr)', borderRadius:12, color:'var(--t1)', fontSize:12 }}/>
                <Area type="monotone" dataKey="pred" stroke="var(--accent)" strokeWidth={2.5} fill="url(#ag)"/>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="card card-p">
          <div className="h3" style={{ marginBottom:14 }}>Usage par modèle</div>
          <div style={{ height:160 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart><Pie data={pieData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3} dataKey="value">{pieData.map((e,i) => <Cell key={i} fill={e.color}/>)}</Pie><Tooltip contentStyle={{ background:'var(--card)', border:'1px solid var(--bdr)', borderRadius:10, color:'var(--t1)', fontSize:11 }}/></PieChart>
            </ResponsiveContainer>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:6, marginTop:8 }}>
            {pieData.map(m => <div key={m.name} style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}><div style={{ display:'flex', alignItems:'center', gap:7 }}><div style={{ width:7, height:7, borderRadius:'50%', background:m.color }}/><span style={{ fontSize:12, color:'var(--t2)' }}>{m.name}</span></div><span style={{ fontSize:12, fontWeight:700, color:'var(--t1)', fontFamily:"'JetBrains Mono',monospace" }}>{m.value}%</span></div>)}
          </div>
        </div>
      </div>
      <div className="grid-2">
        {[{ key:'lat', label:'Latence (ms)', color:'#f59e0b' },{ key:'acc', label:'Précision (%)', color:'#22c55e' }].map(({ key, label, color }) => (
          <div key={key} className="card card-p">
            <div className="h3" style={{ marginBottom:14 }}>{label}</div>
            <div style={{ height:150 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weekData} barSize={22}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gc}/>
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill:tc, fontSize:11 }}/>
                  <YAxis axisLine={false} tickLine={false} tick={{ fill:tc, fontSize:11 }}/>
                  <Tooltip contentStyle={{ background:'var(--card)', border:'1px solid var(--bdr)', borderRadius:10, color:'var(--t1)', fontSize:11 }}/>
                  <Bar dataKey={key} fill={color} radius={[6,6,0,0]}/>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

function Toggle({ on, setOn }: { on:boolean; setOn:(v:boolean)=>void }) {
  return (
    <label className="toggle">
      <input type="checkbox" checked={on} onChange={e => setOn(e.target.checked)}/>
      <span className="toggle-track"/>
    </label>
  );
}

export const Profile = () => {
  const [tab, setTab] = useState<'profile'|'api'|'notifs'|'security'>('profile');
  const [saved, setSaved] = useState(false);
  const [name, setName] = useState('Michael Nzuzi');
  const [bio, setBio] = useState("Ingénieur ML spécialisé en traitement du signal audio. Passionné par l'IA africaine.");
  const [n1,setN1]=useState(true);const [n2,setN2]=useState(true);const [n3,setN3]=useState(false);const [n4,setN4]=useState(true);
  const [fa,setFa]=useState(false);
  return (
    <div className="page-wrap fade-in" style={{ maxWidth:820 }}>
      <div className="col" style={{ gap:4 }}>
        <div className="eyebrow"><User size={13} color="var(--accent)"/>Profil</div>
        <h1 className="h1 font-heading">Mon <span className="text-accent">Compte</span></h1>
      </div>
      {/* Avatar card */}
      <div className="card card-p" style={{ display:'flex', flexWrap:'wrap', alignItems:'center', gap:20 }}>
        <div style={{ position:'relative', flexShrink:0 }}>
          <div style={{ width:70, height:70, borderRadius:16, background:'linear-gradient(135deg,#3b6fe8,#8b5cf6)', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontSize:28, fontWeight:800, fontFamily:"'Outfit',system-ui" }}>M</div>
          <button style={{ position:'absolute', bottom:-3, right:-3, width:24, height:24, borderRadius:8, background:'var(--accent)', border:'2px solid var(--card)', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}><Camera size={11} color="#fff"/></button>
        </div>
        <div style={{ flex:1, minWidth:0 }}>
          <div className="font-heading" style={{ fontSize:20, fontWeight:700, color:'var(--t1)' }}>{name}</div>
          <div style={{ fontSize:13, color:'var(--t3)', marginTop:2 }}>michael.nzuzi@audioclass.ai</div>
          <div style={{ display:'flex', flexWrap:'wrap', gap:6, marginTop:8 }}>
            <span className="badge bd-blue"><Star size={9}/>Pro Plan</span>
            <span className="badge bd-purple"><Award size={9}/>ML Engineer</span>
            <span className="badge bd-green"><Check size={9}/>Vérifié</span>
          </div>
        </div>
        <div style={{ display:'flex', gap:24, flexShrink:0 }}>
          {[['8','Modèles'],['23','Datasets'],['47K','Prédictions']].map(([v,l]) => (
            <div key={l} style={{ textAlign:'center' }}>
              <div className="font-heading" style={{ fontSize:22, fontWeight:700, color:'var(--accent)' }}>{v}</div>
              <div style={{ fontSize:11, color:'var(--t3)', marginTop:2 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="tabs">
        {[['profile','Profil'],['api','Clés API'],['notifs','Notifications'],['security','Sécurité']].map(([k,l]) => (
          <button key={k} className={`tab${tab===k?' on':''}`} onClick={() => setTab(k as any)}>{l}</button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={tab} initial={{ opacity:0, y:6 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}>
          <div className="card card-p2">
            {tab==='profile' && (
              <div className="section" style={{ gap:14 }}>
                <div className="h3">Informations personnelles</div>
                {[['Nom complet',name,(v:string)=>setName(v)],['Email','michael.nzuzi@audioclass.ai',null],['Organisation','AudioClass Labs',null]].map(([lbl,val,fn]:[string,string,any]) => (
                  <div key={lbl} className="col" style={{ gap:5 }}>
                    <label style={{ fontSize:12, fontWeight:600, color:'var(--t2)' }}>{lbl}</label>
                    <input className="input" value={val} readOnly={!fn} onChange={fn?e=>fn(e.target.value):undefined}/>
                  </div>
                ))}
                <div className="col" style={{ gap:5 }}>
                  <label style={{ fontSize:12, fontWeight:600, color:'var(--t2)' }}>Bio</label>
                  <textarea className="input" value={bio} onChange={e=>setBio(e.target.value)}/>
                </div>
                <div className="col" style={{ gap:5 }}>
                  <label style={{ fontSize:12, fontWeight:600, color:'var(--t2)' }}>Spécialité ML</label>
                  <select className="input"><option>Audio & Signal Processing</option><option>Computer Vision</option><option>NLP</option></select>
                </div>
                <button onClick={() => { setSaved(true); setTimeout(()=>setSaved(false),2000); }} className="btn btn-primary btn-sm" style={{ alignSelf:'flex-start' }}>
                  {saved?<><Check size={13}/>Sauvegardé</>:<><Edit3 size={13}/>Sauvegarder</>}
                </button>
              </div>
            )}
            {tab==='api' && (
              <div className="section" style={{ gap:14 }}>
                <div className="h3">Clés API</div>
                {[['Production','sk-prod-••••••••••••abc123','2025-12-31','4 200'],['Development','sk-dev-••••••••••••xyz789','2025-06-30','1 800']].map(([env,key,exp,calls]) => (
                  <div key={env} className="card-s" style={{ padding:'14px 16px' }}>
                    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:8, marginBottom:10 }}>
                      <span style={{ fontSize:13, fontWeight:700, color:'var(--t1)' }}>{env}</span>
                      <div className="row" style={{ gap:8 }}><span className="badge bd-green">Active</span><button style={{ fontSize:12, color:'var(--accent)', background:'none', border:'none', cursor:'pointer', fontFamily:'inherit' }}>Renouveler</button></div>
                    </div>
                    <div style={{ display:'flex', alignItems:'center', gap:8, background:'var(--bg)', borderRadius:8, padding:'7px 10px' }}>
                      <Key size={12} color="var(--t3)"/><span style={{ flex:1, fontSize:12, color:'var(--t3)', fontFamily:"'JetBrains Mono',monospace", overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{key}</span>
                      <button style={{ fontSize:11, color:'var(--accent)', background:'none', border:'none', cursor:'pointer', flexShrink:0, fontFamily:'inherit' }}>Copier</button>
                    </div>
                    <div style={{ fontSize:11, color:'var(--t3)', marginTop:7, fontFamily:"'JetBrains Mono',monospace" }}>Expire le {exp} · {calls} appels restants</div>
                  </div>
                ))}
                <button className="btn btn-ghost btn-sm" style={{ alignSelf:'flex-start' }}><Key size={13}/>Générer une nouvelle clé</button>
              </div>
            )}
            {tab==='notifs' && (
              <div className="section" style={{ gap:10 }}>
                <div className="h3">Préférences de notification</div>
                {[["Fin d'entraînement","Notifier quand un modèle termine",n1,setN1],["Erreurs","Alertes si précision < seuil",n2,setN2],["Newsletter","Nouveautés et mises à jour",n3,setN3],["Digest hebdo","Résumé des performances",n4,setN4]].map(([lbl,desc,val,set]:[string,string,boolean,(v:boolean)=>void]) => (
                  <div key={lbl} className="card-s" style={{ padding:'12px 14px', display:'flex', alignItems:'center', justifyContent:'space-between', gap:12 }}>
                    <div><div style={{ fontSize:13, fontWeight:600, color:'var(--t1)' }}>{lbl}</div><div style={{ fontSize:12, color:'var(--t3)', marginTop:2 }}>{desc}</div></div>
                    <Toggle on={val} setOn={set}/>
                  </div>
                ))}
              </div>
            )}
            {tab==='security' && (
              <div className="section" style={{ gap:14 }}>
                <div className="h3">Sécurité du compte</div>
                {['Mot de passe actuel','Nouveau mot de passe','Confirmer'].map(lbl => (
                  <div key={lbl} className="col" style={{ gap:5 }}>
                    <label style={{ fontSize:12, fontWeight:600, color:'var(--t2)' }}>{lbl}</label>
                    <input type="password" className="input" placeholder="••••••••"/>
                  </div>
                ))}
                <div className="card-s" style={{ padding:'12px 14px', display:'flex', alignItems:'center', justifyContent:'space-between', gap:12 }}>
                  <div><div style={{ fontSize:13, fontWeight:600, color:'var(--t1)' }}>Authentification 2FA</div><div style={{ fontSize:12, color:'var(--t3)', marginTop:2 }}>Sécurité renforcée via Google Authenticator</div></div>
                  <Toggle on={fa} setOn={setFa}/>
                </div>
                <button className="btn btn-primary btn-sm" style={{ alignSelf:'flex-start' }}><Shield size={13}/>Mettre à jour</button>
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const Stub = ({ title, icon:Icon, desc }: { title:string; icon:any; desc:string }) => (
  <div style={{ display:'flex', alignItems:'center', justifyContent:'center', minHeight:'60vh' }}>
    <div className="card card-p2" style={{ maxWidth:360, width:'100%', textAlign:'center', display:'flex', flexDirection:'column', alignItems:'center', gap:16 }}>
      <div style={{ width:60, height:60, borderRadius:16, background:'rgba(59,111,232,.1)', display:'flex', alignItems:'center', justifyContent:'center' }}><Icon size={28} color="var(--accent)"/></div>
      <div><h2 className="h2 font-heading" style={{ marginBottom:6 }}>{title}</h2><p className="sub">{desc}</p></div>
      <button className="btn btn-primary" style={{ width:'100%', justifyContent:'center' }}>Accéder</button>
    </div>
  </div>
);
export const APIDocs    = () => <Stub title="Documentation API" icon={Code} desc="Explorez notre API REST. Intégrez AudioClass AI dans vos applications."/>;
export const HelpCenter = () => <Stub title="Centre d'Aide" icon={BookOpen} desc="Tutoriels et guides pour tirer le meilleur parti de la plateforme."/>;
export const Billing    = () => <Stub title="Facturation" icon={CreditCard} desc="Gérez vos abonnements et méthodes de paiement."/>;
export const Admin      = () => <Stub title="Administration" icon={ShieldCheck} desc="Modération et statistiques réservées aux administrateurs."/>;
export const Forum      = () => <Stub title="Communauté" icon={MessageSquare} desc="Échangez avec d'autres ingénieurs et partagez vos modèles."/>;
export const Onboarding = () => <Stub title="Bienvenue !" icon={Rocket} desc="Suivez notre guide rapide pour configurer votre premier modèle."/>;
