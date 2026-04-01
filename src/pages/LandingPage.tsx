import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Zap, ArrowRight, Play, Star, Mic, BarChart2, Brain, Database, ChevronLeft, ChevronRight, Upload, Activity, Target, Layers, Shield, Check } from 'lucide-react';

function Counter({ to, suffix='' }: { to:number; suffix?:string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once:true });
  useEffect(() => {
    if (!inView) return;
    let s=0; const step=to/(1.4*60);
    const t = setInterval(() => { s+=step; if(s>=to){setN(to);clearInterval(t);}else setN(Math.floor(s)); },1000/60);
    return ()=>clearInterval(t);
  },[inView,to]);
  return <span ref={ref}>{n.toLocaleString()}{suffix}</span>;
}

const TESTS = [
  { name:'Dr. Sophie Eboa', role:'Chercheure IA, Univ. Yaoundé', text:'RespiDiag-Pro a transformé notre screening COVID dans les zones rurales. 92% de précision avec un simple micro.', avatar:'S', color:'#3b6fe8' },
  { name:'Jean-Marc Diallo', role:'Maintenance, Sonara Cameroun', text:'VibraPredict détecte les défauts de roulements 72h avant la panne. Coûts de maintenance réduits de 40%.', avatar:'J', color:'#22c55e' },
  { name:'Amara Keïta', role:'Musicologue, Mali Music Lab', text:'AfroBeatsID classifie Makossa, Zoblazo et Ndombolo parfaitement. Enfin un modèle formé sur nos musiques.', avatar:'A', color:'#f59e0b' },
  { name:'Fatou Sarr', role:'Agronome, AgriTech Sénégal', text:'AgriSound détecte les criquets 2 jours avant qu\'ils soient visibles. Ma récolte de sorgho est sauvée.', avatar:'F', color:'#8b5cf6' },
];
const FEATURES = [
  { icon:Mic,      title:'Mode Prédicteur',          desc:'Uploadez un audio, choisissez un portefeuille, obtenez des prédictions. Aucun code requis.', color:'#3b6fe8', tag:'Pour tous' },
  { icon:Brain,    title:'Studio d\'Entraînement',    desc:'Interface visuelle n8n pour créer vos workflows ML. Pour les ingénieurs et chercheurs.', color:'#8b5cf6', tag:'Pour les experts' },
  { icon:Database, title:'Bibliothèque Datasets',     desc:'5 datasets référence (UrbanSound8K, ESC-50…) avec métriques, classes et avis communautaires.', color:'#22c55e', tag:'Open & Custom' },
  { icon:Layers,   title:'Portefeuilles de Modèles',  desc:'Collections thématiques prêtes à déployer : médical, musique, industrie, agriculture.', color:'#f59e0b', tag:'Prêt en production' },
  { icon:BarChart2,'title':'Analytics Avancés',       desc:'Suivi en temps réel : précision, latence, dérive de distribution et usage par modèle.', color:'#06b6d4', tag:'Monitoring' },
  { icon:Shield,   title:'Sécurité Entreprise',       desc:'2FA, clés API, isolation des données, audit logs. Certifié RGPD.', color:'#ef4444', tag:'Entreprise' },
];

export const LandingPage: React.FC = () => {
  const [testIdx, setTestIdx] = useState(0);
  const [mode, setMode] = useState<'pred'|'eng'>('pred');
  useEffect(() => { const t=setInterval(()=>setTestIdx(i=>(i+1)%TESTS.length),5000); return()=>clearInterval(t); },[]);

  const BG = '#07101f';
  const S  = 'rgba(255,255,255,.06)';
  const T1 = '#dde8ff';
  const T2 = 'rgba(255,255,255,.45)';
  const T3 = 'rgba(255,255,255,.22)';

  return (
    <div style={{ background:BG, color:T1, fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif", minHeight:'100vh' }}>

      {/* Nav */}
      <nav style={{ height:58, padding:'0 24px', display:'flex', alignItems:'center', justifyContent:'space-between', position:'sticky', top:0, zIndex:50, background:'rgba(7,16,31,.88)', backdropFilter:'blur(14px)', borderBottom:'1px solid rgba(255,255,255,.07)' }}>
        <div style={{ display:'flex', alignItems:'center', gap:9 }}>
          <div style={{ width:32, height:32, borderRadius:9, background:'#3b6fe8', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 3px 12px rgba(59,111,232,.45)' }}>
            <Zap size={16} color="#fff"/>
          </div>
          <span style={{ fontFamily:"'Outfit',system-ui", fontWeight:700, fontSize:16, color:'#fff' }}>AudioClass <span style={{ color:'#93b4ff' }}>AI</span></span>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:6 }}>
          <Link to="/auth" style={{ fontSize:13, fontWeight:600, color:T2, textDecoration:'none', padding:'6px 14px' }} className="hidden sm:block">Connexion</Link>
          <Link to="/auth" style={{ display:'flex', alignItems:'center', gap:6, padding:'8px 16px', borderRadius:10, background:'#3b6fe8', color:'#fff', fontSize:13, fontWeight:700, textDecoration:'none', boxShadow:'0 3px 10px rgba(59,111,232,.42)' }}>
            Démarrer <ArrowRight size={14}/>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ padding:'80px 24px 72px', maxWidth:1100, margin:'0 auto' }}>
        <motion.div initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ duration:.65 }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:7, padding:'5px 14px', borderRadius:99, border:'1px solid rgba(59,111,232,.35)', background:'rgba(59,111,232,.12)', marginBottom:28 }}>
            <span style={{ width:7, height:7, borderRadius:'50%', background:'#93b4ff', display:'inline-block' }}/>
            <span style={{ fontSize:12, fontWeight:600, color:'#93b4ff', letterSpacing:'.05em' }}>Plateforme ML Audio · Afrique & Monde</span>
          </div>
          <h1 style={{ fontFamily:"'Outfit',system-ui", fontSize:'clamp(36px,5.5vw,62px)', fontWeight:800, lineHeight:1.08, marginBottom:22, maxWidth:780 }}>
            Classifiez vos sons avec une <span style={{ color:'#93b4ff' }}>précision</span> chirurgicale.
          </h1>
          <p style={{ fontSize:'clamp(15px,1.8vw,18px)', color:T2, maxWidth:580, lineHeight:1.65, marginBottom:36 }}>
            La seule plateforme avec <strong style={{ color:T1 }}>deux modes</strong> : prédire sans code, ou entraîner vos propres modèles. Pour tous les niveaux.
          </p>
          <div style={{ display:'flex', gap:12, flexWrap:'wrap', marginBottom:52 }}>
            <Link to="/auth" style={{ display:'flex', alignItems:'center', gap:8, padding:'12px 24px', borderRadius:12, background:'#fff', color:'#07101f', fontSize:14, fontWeight:700, textDecoration:'none', boxShadow:'0 4px 20px rgba(255,255,255,.15)' }}>
              Commencer gratuitement <ArrowRight size={16}/>
            </Link>
            <Link to="/predict" style={{ display:'flex', alignItems:'center', gap:8, padding:'12px 22px', borderRadius:12, border:'1px solid rgba(255,255,255,.15)', color:T1, fontSize:14, fontWeight:600, textDecoration:'none', background:'transparent' }}>
              <Play size={15} fill="currentColor"/> Tester la démo
            </Link>
          </div>
          {/* Stats */}
          <div style={{ display:'flex', gap:36, flexWrap:'wrap' }}>
            {[{ to:42800, s:'+', l:'Prédictions/jour' },{ to:95, s:'%', l:'Précision max' },{ to:5, s:'', l:'Portefeuilles' },{ to:28600, s:'+', l:'Utilisateurs' }].map(({ to,s,l }) => (
              <div key={l}>
                <div style={{ fontFamily:"'Outfit',system-ui", fontSize:28, fontWeight:800, color:'#93b4ff' }}><Counter to={to} suffix={s}/></div>
                <div style={{ fontSize:11, color:T3, textTransform:'uppercase', letterSpacing:'.09em', marginTop:2 }}>{l}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Hero visual */}
        <motion.div initial={{ opacity:0, y:32 }} animate={{ opacity:1, y:0 }} transition={{ delay:.4, duration:.65 }}
          style={{ marginTop:56, padding:'20px 24px', borderRadius:18, border:'1px solid rgba(255,255,255,.09)', background:'rgba(255,255,255,.04)' }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:14, flexWrap:'wrap', gap:8 }}>
            <div style={{ display:'flex', alignItems:'center', gap:8 }}>
              <div style={{ width:8, height:8, borderRadius:'50%', background:'#22c55e', animation:'pulse 2s infinite' }}/>
              <span style={{ fontSize:12, color:T3, fontFamily:"'JetBrains Mono',monospace" }}>LIVE · RespiDiag-Pro · Analyse...</span>
            </div>
            <span style={{ fontSize:11, color:T3, fontFamily:"'JetBrains Mono',monospace" }}>16ms latency</span>
          </div>
          <div style={{ display:'flex', alignItems:'flex-end', gap:2, height:56 }}>
            {[...Array(56)].map((_,i) => (
              <motion.div key={i} animate={{ scaleY:[.08,.2+Math.sin(i*.45)*.7+Math.random()*.5,.08] }}
                transition={{ duration:.8+i*.03, repeat:Infinity, ease:'easeInOut', delay:i*.04 }}
                style={{ flex:1, borderRadius:2, background:'#3b6fe8', height:'100%', transformOrigin:'bottom', opacity:.6+i/200 }}/>
            ))}
          </div>
          <div style={{ display:'flex', gap:8, marginTop:14, flexWrap:'wrap' }}>
            {[['COVID-19','87%','#ef4444'],['Bronchite','8%','#f59e0b'],['Sain','5%','#22c55e']].map(([l,p,c]) => (
              <div key={l as string} style={{ display:'flex', alignItems:'center', gap:6, padding:'5px 12px', borderRadius:8, background:`${c}18`, border:`1px solid ${c}30` }}>
                <span style={{ fontSize:13, fontWeight:700, color:c as string }}>{p}</span>
                <span style={{ fontSize:12, color:T3 }}>{l}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Two modes */}
      <section style={{ padding:'72px 24px', maxWidth:1100, margin:'0 auto' }}>
        <div style={{ textAlign:'center', marginBottom:44 }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'4px 14px', borderRadius:99, background:'rgba(139,92,246,.15)', border:'1px solid rgba(139,92,246,.3)', marginBottom:16 }}>
            <Layers size={12} color="#a78bfa"/><span style={{ fontSize:12, color:'#a78bfa', fontWeight:600 }}>Deux vues, une plateforme</span>
          </div>
          <h2 style={{ fontFamily:"'Outfit',system-ui", fontSize:'clamp(26px,3.5vw,38px)', fontWeight:800, marginBottom:12 }}>
            Conçu pour <span style={{ color:'#93b4ff' }}>tous les niveaux</span>
          </h2>
          <p style={{ fontSize:15, color:T2, maxWidth:500, margin:'0 auto' }}>Chercheur, clinicien ou ingénieur ML — AudioClass AI s'adapte à votre expertise.</p>
        </div>

        {/* Mode toggle */}
        <div style={{ display:'flex', justifyContent:'center', marginBottom:36 }}>
          <div style={{ display:'flex', padding:4, borderRadius:14, border:'1px solid rgba(255,255,255,.1)', background:'rgba(255,255,255,.04)', gap:4 }}>
            {[['pred','🎯 Mode Prédicteur'],['eng','⚙️ Studio ML']].map(([k,l]) => (
              <button key={k} onClick={() => setMode(k as any)}
                style={{ padding:'9px 20px', borderRadius:10, border:'none', fontSize:13, fontWeight:700, cursor:'pointer', fontFamily:'inherit', transition:'all .2s',
                  background: mode===k ? '#3b6fe8' : 'transparent', color: mode===k ? '#fff' : T2,
                  boxShadow: mode===k ? '0 3px 12px rgba(59,111,232,.45)' : 'none' }}>
                {l}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={mode} initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:14 }}>
              {(mode==='pred'
                ? [{ icon:Upload, n:'01', t:'Uploadez', d:"Glissez votre fichier audio ou activez le micro en direct" },{ icon:Layers, n:'02', t:'Choisissez', d:"Sélectionnez un portefeuille adapté à votre besoin" },{ icon:Zap, n:'03', t:'Prédisez', d:"Tous les modèles analysent simultanément" },{ icon:Target, n:'04', t:'Interprétez', d:"Probabilités, radar chart et explications SHAP" }]
                : [{ icon:Database, n:'01', t:'Dataset', d:"Importez ou choisissez parmi notre bibliothèque" },{ icon:Layers, n:'02', t:'Embedding', d:"MFCC, Mel Spectrogram, Wav2Vec, CLAP, PANNs…" },{ icon:Brain, n:'03', t:'Architecture', d:"CNN, ResNet, Transformer, LSTM ou hybride" },{ icon:Activity, n:'04', t:'Entraînez', d:"Suivi live : loss, accuracy, F1 par epoch" }]
              ).map((s,i) => (
                <div key={i} style={{ padding:'20px', borderRadius:14, border:'1px solid rgba(255,255,255,.08)', background:S, position:'relative' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:12 }}>
                    <div style={{ width:34, height:34, borderRadius:9, background:`rgba(${mode==='pred'?'59,111,232':'139,92,246'},.2)`, display:'flex', alignItems:'center', justifyContent:'center' }}>
                      <s.icon size={17} color={mode==='pred'?'#93b4ff':'#c4b5fd'}/>
                    </div>
                    <span style={{ fontSize:10, color:T3, fontFamily:"'JetBrains Mono',monospace" }}>{s.n}</span>
                  </div>
                  <div style={{ fontSize:15, fontWeight:700, color:T1, marginBottom:6 }}>{s.t}</div>
                  <div style={{ fontSize:13, color:T2, lineHeight:1.55 }}>{s.d}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign:'center', marginTop:28 }}>
              <Link to={mode==='pred'?'/predict':'/train'}
                style={{ display:'inline-flex', alignItems:'center', gap:7, padding:'11px 24px', borderRadius:11, background:mode==='pred'?'#3b6fe8':'#7c3aed', color:'#fff', fontSize:14, fontWeight:700, textDecoration:'none', boxShadow:`0 4px 16px ${mode==='pred'?'rgba(59,111,232,.45)':'rgba(124,58,237,.45)'}` }}>
                Essayer le {mode==='pred'?'Prédicteur':'Studio ML'} <ArrowRight size={15}/>
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Features */}
      <section style={{ padding:'72px 24px', borderTop:'1px solid rgba(255,255,255,.06)', maxWidth:1100, margin:'0 auto' }}>
        <div style={{ textAlign:'center', marginBottom:44 }}>
          <h2 style={{ fontFamily:"'Outfit',system-ui", fontSize:'clamp(24px,3vw,34px)', fontWeight:800, marginBottom:10 }}>Tout ce dont vous avez besoin</h2>
          <p style={{ fontSize:15, color:T2 }}>Une suite complète pour le traitement audio par IA</p>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:14 }}>
          {FEATURES.map((f,i) => (
            <motion.div key={i} initial={{ opacity:0, y:18 }} whileInView={{ opacity:1, y:0 }} transition={{ delay:i*.07 }} viewport={{ once:true }}
              whileHover={{ y:-4 }}
              style={{ padding:'22px', borderRadius:14, border:'1px solid rgba(255,255,255,.08)', background:S, cursor:'default' }}>
              <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:14 }}>
                <div style={{ width:40, height:40, borderRadius:11, background:`${f.color}20`, display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <f.icon size={20} color={f.color}/>
                </div>
                <span style={{ fontSize:10, fontWeight:600, padding:'3px 9px', borderRadius:99, background:`${f.color}18`, color:f.color }}>{f.tag}</span>
              </div>
              <div style={{ fontSize:15, fontWeight:700, color:T1, marginBottom:8 }}>{f.title}</div>
              <div style={{ fontSize:13, color:T2, lineHeight:1.6 }}>{f.desc}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding:'72px 24px', maxWidth:700, margin:'0 auto' }}>
        <div style={{ textAlign:'center', marginBottom:36 }}>
          <h2 style={{ fontFamily:"'Outfit',system-ui", fontSize:'clamp(24px,3vw,32px)', fontWeight:800, marginBottom:8 }}>Ce qu'ils disent</h2>
          <p style={{ fontSize:14, color:T2 }}>Des professionnels de tout le continent</p>
        </div>
        <div style={{ position:'relative' }}>
          <AnimatePresence mode="wait">
            <motion.div key={testIdx} initial={{ opacity:0, x:24 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-24 }}
              style={{ padding:'28px 32px', borderRadius:18, border:'1px solid rgba(255,255,255,.10)', background:S }}>
              <div style={{ display:'flex', gap:3, marginBottom:14 }}>
                {[...Array(TESTS[testIdx].stars??5)].map((_,i) => <Star key={i} size={14} fill="#f59e0b" color="#f59e0b"/>)}
              </div>
              <p style={{ fontSize:16, color:T1, lineHeight:1.65, marginBottom:20 }}>"{TESTS[testIdx].text}"</p>
              <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                <div style={{ width:42, height:42, borderRadius:11, background:`linear-gradient(135deg,${TESTS[testIdx].color},#8b5cf6)`, display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontSize:15, fontWeight:700, fontFamily:"'Outfit',system-ui" }}>{TESTS[testIdx].avatar}</div>
                <div>
                  <div style={{ fontSize:14, fontWeight:700, color:T1 }}>{TESTS[testIdx].name}</div>
                  <div style={{ fontSize:12, color:T3 }}>{TESTS[testIdx].role}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:18 }}>
            <button onClick={() => setTestIdx(i=>(i-1+TESTS.length)%TESTS.length)} style={{ padding:8, borderRadius:9, border:'1px solid rgba(255,255,255,.12)', background:'transparent', color:T2, cursor:'pointer', display:'flex' }}><ChevronLeft size={18}/></button>
            <div style={{ display:'flex', gap:6 }}>
              {TESTS.map((_,i) => <button key={i} onClick={() => setTestIdx(i)} style={{ width:7, height:7, borderRadius:'50%', background: i===testIdx?'#3b6fe8':'rgba(255,255,255,.2)', border:'none', cursor:'pointer', padding:0, transition:'background .2s' }}/> )}
            </div>
            <button onClick={() => setTestIdx(i=>(i+1)%TESTS.length)} style={{ padding:8, borderRadius:9, border:'1px solid rgba(255,255,255,.12)', background:'transparent', color:T2, cursor:'pointer', display:'flex' }}><ChevronRight size={18}/></button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding:'60px 24px 80px', maxWidth:680, margin:'0 auto', textAlign:'center' }}>
        <div style={{ padding:'44px 36px', borderRadius:20, border:'1px solid rgba(59,111,232,.3)', background:'rgba(59,111,232,.10)' }}>
          <h2 style={{ fontFamily:"'Outfit',system-ui", fontSize:'clamp(22px,3vw,32px)', fontWeight:800, marginBottom:10 }}>Prêt à commencer ?</h2>
          <p style={{ fontSize:14, color:T2, marginBottom:28 }}>Gratuit, sans carte de crédit. Accessible depuis n'importe quel navigateur.</p>
          <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap' }}>
            <Link to="/auth" style={{ display:'flex', alignItems:'center', gap:7, padding:'12px 24px', borderRadius:11, background:'#3b6fe8', color:'#fff', fontSize:14, fontWeight:700, textDecoration:'none', boxShadow:'0 4px 16px rgba(59,111,232,.5)' }}>
              Créer un compte gratuit <ArrowRight size={15}/>
            </Link>
            <Link to="/predict" style={{ display:'flex', alignItems:'center', gap:7, padding:'12px 20px', borderRadius:11, border:'1px solid rgba(255,255,255,.15)', color:T1, fontSize:14, fontWeight:600, textDecoration:'none' }}>
              <Play size={14} fill="currentColor"/> Tester sans inscription
            </Link>
          </div>
          <div style={{ display:'flex', justifyContent:'center', gap:24, marginTop:22, flexWrap:'wrap' }}>
            {['✓ Gratuit pour commencer','✓ Aucun code requis','✓ 5 portefeuilles inclus'].map(t => (
              <span key={t} style={{ fontSize:12, color:T3 }}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop:'1px solid rgba(255,255,255,.06)', padding:'20px 24px', display:'flex', flexWrap:'wrap', alignItems:'center', justifyContent:'space-between', gap:12 }}>
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          <div style={{ width:24, height:24, borderRadius:7, background:'#3b6fe8', display:'flex', alignItems:'center', justifyContent:'center' }}><Zap size={12} color="#fff"/></div>
          <span style={{ fontSize:13, color:T3 }}>AudioClass AI · © 2025</span>
        </div>
        <div style={{ display:'flex', gap:20 }}>
          {['Confidentialité','CGU','API','Contact'].map(l => <a key={l} href="#" style={{ fontSize:12, color:T3, textDecoration:'none' }}>{l}</a>)}
        </div>
      </footer>
    </div>
  );
};
