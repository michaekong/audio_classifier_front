import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Star, Download, ChevronRight, Database, Cpu, Zap, Music, Activity, Heart, Sprout, Globe, Check, MessageSquare, ThumbsUp, Eye, Calendar, Shield } from 'lucide-react';

const CATS = [{ id:'all',label:'Tous',icon:Globe },{ id:'music',label:'Musique',icon:Music },{ id:'medical',label:'Médical',icon:Heart },{ id:'industrial',label:'Industrie',icon:Activity },{ id:'agriculture',label:'Agriculture',icon:Sprout }];
const PORTS = [
  { id:'p1', name:'AfroBeatsID', tagline:'Identifiez chaque genre en 200ms', desc:'Classification de genres musicaux africains (Makossa, Afrobeats, Amapiano…). Analyse rythmique et spectrale.', cat:'music', acc:91.2, f1:89.5, prec:90.1, rec:89.0, ds:'AfricoSound-8K', dsSize:'8 732 samples', classes:10, emb:'MFCC + Mel Spectrogram', arch:'CNN ResNet-18', author:'KultureAI', av:'K', rating:4.8, reviews:512, price:0, deploys:3240, updated:'Mars 2025', tags:['Musique','Culture','Afrique'], color:'#f59e0b', cL:'rgba(245,158,11,.1)', outClasses:['Makossa','Afrobeats','Amapiano','Zoblazo','Ndombolo','Highlife','Afro-jazz','Bongo Flava','Coupé-décalé','Fuji'], models:[{ name:'GenreNet-CNN', acc:91.2, f1:89.5, size:'24 MB', lat:'18ms' },{ name:'RhythmLSTM', acc:88.7, f1:86.9, size:'12 MB', lat:'32ms' }], revs:[{ a:'Yannick T.', t:'Précision bluffante sur le Makossa. Intégré en prod depuis 3 mois.', s:5, d:'Jan 2025' }] },
  { id:'p2', name:'VibraPredict', tagline:'Maintenance prédictive avant la panne', desc:'Détection précoce des anomalies de roulements et moteurs. Réduit les pannes de 78%.', cat:'industrial', acc:95.4, f1:94.1, prec:95.8, rec:93.5, ds:'InduSound-Pro', dsSize:'42 000 samples', classes:8, emb:'PANNs + Mel Spectrogram', arch:'Transformer', author:'IndusTech', av:'I', rating:4.5, reviews:128, price:50, deploys:890, updated:'Fév. 2025', tags:['Industrie','IoT','Edge'], color:'#3b6fe8', cL:'rgba(59,111,232,.1)', outClasses:['Roulement OK','Roulement défaut','Moteur OK','Surcharge','Cavitation','Déséquilibre','Résonance','Lubrification'], models:[{ name:'VibTransformer', acc:95.4, f1:94.1, size:'48 MB', lat:'22ms' },{ name:'VibCNN-Lite', acc:91.2, f1:90.0, size:'8 MB', lat:'8ms' }], revs:[{ a:'Jean-Marc D.', t:'ROI en 2 mois. Réduit nos alertes de maintenance de 68%.', s:5, d:'Mars 2025' }] },
  { id:'p3', name:'RespiDiag-Pro', tagline:'Détection respiratoire certifiée CE', desc:'Diagnostic des pathologies respiratoires par analyse de toux. COVID-19, Asthme, Pneumonie, Bronchite.', cat:'medical', acc:92.8, f1:92.0, prec:93.2, rec:91.8, ds:'MedCough-Global', dsSize:'18 500 samples', classes:6, emb:'Wav2Vec 2.0', arch:'CNN + Attention', author:'HealthSound', av:'H', rating:4.9, reviews:342, price:0, deploys:12400, updated:'Jan. 2025', tags:['Santé','Médical','CE Certifié'], color:'#22c55e', cL:'rgba(34,197,94,.1)', outClasses:['Sain','COVID-19','Asthme','Pneumonie','Bronchite','BPCO'], models:[{ name:'RespiNet-XL', acc:92.8, f1:92.0, size:'64 MB', lat:'45ms' },{ name:'CoughBERT', acc:90.1, f1:89.5, size:'128 MB', lat:'95ms' },{ name:'RespiNet-Lite', acc:87.3, f1:86.0, size:'6 MB', lat:'9ms' }], revs:[{ a:'Dr. Ngo S.', t:'Utilisé en screening initial. Très bon rappel COVID. CE est un vrai plus.', s:5, d:'Fév 2025' }] },
  { id:'p4', name:'BabyCry-AI', tagline:'Comprenez chaque pleur', desc:"Traducteur de pleurs de nourrissons. Identifie : Faim, Sommeil, Couche sale, Coliques ou Câlin.", cat:'medical', acc:89.7, f1:88.4, prec:89.0, rec:87.8, ds:'CryCorpus-5K', dsSize:'5 200 samples', classes:5, emb:'MFCC + VGGish', arch:'LSTM + CNN', author:'BabyCare Tech', av:'B', rating:4.7, reviews:890, price:0, deploys:15600, updated:'Mars 2025', tags:['Pédiatrie','Mobile','Offline'], color:'#8b5cf6', cL:'rgba(139,92,246,.1)', outClasses:['Faim','Sommeil','Couche sale','Coliques','Câlin'], models:[{ name:'CryNet', acc:89.7, f1:88.4, size:'18 MB', lat:'12ms' }], revs:[{ a:'Sophie R.', t:'Mon bébé de 3 mois — distingue faim vs coliques avec ~85% de précision.', s:5, d:'Mars 2025' }] },
  { id:'p5', name:'AgriSound-X', tagline:'Détectez les parasites avant la panne', desc:"Détection précoce de parasites dans les cultures par analyse sonore. Identifie le bruit de mastication.", cat:'agriculture', acc:88.5, f1:87.2, prec:88.9, rec:86.5, ds:'BugSound-Agri', dsSize:'6 100 samples', classes:7, emb:'CLAP', arch:'CNN + RNN', author:'AgriAI', av:'A', rating:4.2, reviews:96, price:25, deploys:420, updated:'Fév. 2025', tags:['Agriculture','SmartFarming','Edge'], color:'#06b6d4', cL:'rgba(6,182,212,.1)', outClasses:['Sain','Criquet','Chenille','Doryphore','Puceron','Cochenille','Thrips'], models:[{ name:'BugNet-Field', acc:88.5, f1:87.2, size:'22 MB', lat:'28ms' },{ name:'BugNet-Edge', acc:84.1, f1:82.8, size:'4 MB', lat:'6ms' }], revs:[{ a:'Diallo F.', t:'Détecte les criquets 48h avant visible à l\'œil nu. 2 récoltes sauvées.', s:5, d:'Jan 2025' }] },
];

function Stars({ v }: { v:number }) {
  return <span style={{ display:'flex', gap:2 }}>
    {[1,2,3,4,5].map(n => <Star key={n} size={12} fill={n<=v?'#f59e0b':'none'} color={n<=v?'#f59e0b':'var(--bdr)'}/>)}
  </span>;
}

export const Portfolios: React.FC = () => {
  const [cat, setCat] = useState('all');
  const [selId, setSelId] = useState('p1');
  const [tab, setTab] = useState<'overview'|'models'|'classes'|'reviews'>('overview');
  const [rstars, setRstars] = useState(0);
  const [rtxt, setRtxt] = useState('');
  const [rsent, setRsent] = useState(false);

  const filtered = PORTS.filter(p => cat==='all' || p.cat===cat);
  const sel = PORTS.find(p => p.id===selId) || PORTS[0];

  return (
    <div className="page-wrap fade-in">
      {/* Header */}
      <div className="row-between">
        <div className="col" style={{ gap:4 }}>
          <div className="eyebrow"><Briefcase size={13} color="var(--accent)"/>Portefeuilles</div>
          <h1 className="h1 font-heading">Galerie de <span className="text-accent">Modèles</span></h1>
          <p className="sub">{PORTS.length} portefeuilles · {PORTS.reduce((a,p)=>a+p.models.length,0)} modèles entraînés</p>
        </div>
        {/* Cat filter */}
        <div style={{ display:'flex', gap:4, padding:4, borderRadius:12, border:'1px solid var(--bdr)', background:'var(--s1)', flexWrap:'wrap' }}>
          {CATS.map(c => (
            <button key={c.id} onClick={() => setCat(c.id)}
              className="btn btn-sm" style={{ display:'flex', alignItems:'center', gap:5, transition:'all .15s', background: cat===c.id?'var(--accent)':'transparent', color: cat===c.id?'#fff':'var(--t3)', boxShadow: cat===c.id?'0 2px 8px rgba(59,111,232,.38)':'none', border:'none' }}>
              <c.icon size={12}/><span className="hidden sm:inline">{c.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main */}
      <div style={{ display:'flex', gap:16, alignItems:'flex-start', flexWrap:'wrap' }}>
        {/* List */}
        <div style={{ width:280, flexShrink:0, display:'flex', flexDirection:'column', gap:8 }}>
          {filtered.map((p,i) => (
            <motion.button key={p.id} initial={{ opacity:0, x:-10 }} animate={{ opacity:1, x:0 }} transition={{ delay:i*.04 }}
              onClick={() => { setSelId(p.id); setTab('overview'); }}
              style={{ width:'100%', textAlign:'left', padding:'14px', borderRadius:14, cursor:'pointer', transition:'all .2s', background: sel.id===p.id?p.cL:'var(--card)', border:`1px solid ${sel.id===p.id?p.color:'var(--bdr)'}`, boxShadow: sel.id===p.id?`0 0 0 2px ${p.color}20, var(--sh-sm)`:'var(--sh-sm)' }}>
              <div style={{ display:'flex', alignItems:'flex-start', gap:10 }}>
                <div style={{ width:36, height:36, borderRadius:10, background:p.color, display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontWeight:700, fontSize:14, flexShrink:0, fontFamily:"'Outfit',system-ui" }}>{p.av}</div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:6, flexWrap:'wrap' }}>
                    <span style={{ fontSize:13, fontWeight:700, color:'var(--t1)', fontFamily:"'Outfit',system-ui" }}>{p.name}</span>
                    {p.price===0 ? <span className="badge bd-green" style={{ fontSize:10 }}>Gratuit</span> : <span className="badge bd-blue" style={{ fontSize:10 }}>{p.price}€/mois</span>}
                  </div>
                  <p style={{ fontSize:11, color:'var(--t3)', marginTop:3, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{p.tagline}</p>
                  <div style={{ display:'flex', alignItems:'center', gap:8, marginTop:5 }}>
                    <span style={{ fontSize:11, fontWeight:700, color:p.color, fontFamily:"'JetBrains Mono',monospace" }}>{p.acc}%</span>
                    <span style={{ fontSize:10, color:'var(--t4)' }}>·</span>
                    <Stars v={Math.round(p.rating)}/>
                    <span style={{ fontSize:10, color:'var(--t3)' }}>{p.rating}</span>
                  </div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Detail */}
        <AnimatePresence mode="wait">
          <motion.div key={sel.id} initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}
            className="card" style={{ flex:1, minWidth:0, minHeight:500 }}>
            {/* Hero */}
            <div style={{ padding:'22px 24px', background:sel.cL, borderBottom:'1px solid var(--bdr)', position:'relative', overflow:'hidden' }}>
              <div style={{ position:'absolute', inset:0, background:`radial-gradient(ellipse at 80% 0%, ${sel.color}25, transparent 65%)`, pointerEvents:'none' }}/>
              <div style={{ display:'flex', flexWrap:'wrap', gap:16, justifyContent:'space-between', position:'relative' }}>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:10, flexWrap:'wrap' }}>
                    <div style={{ width:30, height:30, borderRadius:9, background:sel.color, display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontWeight:700, fontSize:12, fontFamily:"'Outfit',system-ui" }}>{sel.av}</div>
                    <span style={{ fontSize:11, color:'var(--t3)', fontFamily:"'JetBrains Mono',monospace" }}>{sel.author}</span>
                    {sel.price===0 ? <span className="badge bd-green">Gratuit</span> : <span className="badge bd-blue">{sel.price}€/mois</span>}
                    {sel.tags.includes('CE Certifié') && <span className="badge bd-purple"><Shield size={9}/>CE</span>}
                  </div>
                  <h2 className="h2 font-heading">{sel.name}</h2>
                  <p style={{ fontSize:13, color:'var(--t2)', marginTop:5, lineHeight:1.55, maxWidth:480 }}>{sel.desc}</p>
                  <div style={{ display:'flex', flexWrap:'wrap', gap:5, marginTop:10 }}>
                    {sel.tags.map(t => <span key={t} style={{ fontSize:10, fontWeight:600, padding:'2px 8px', borderRadius:99, border:`1px solid ${sel.color}40`, color:sel.color, background:sel.color+'14' }}>{t}</span>)}
                  </div>
                </div>
                <div style={{ display:'flex', flexDirection:'column', gap:4, alignItems:'flex-end', flexShrink:0 }}>
                  <div style={{ fontFamily:"'Outfit',system-ui", fontSize:36, fontWeight:800, color:sel.color, lineHeight:1 }}>{sel.acc}%</div>
                  <div style={{ fontSize:10, color:'var(--t3)', fontFamily:"'JetBrains Mono',monospace", textTransform:'uppercase' }}>Accuracy</div>
                  <div style={{ display:'flex', alignItems:'center', gap:5, marginTop:6 }}>
                    <Stars v={Math.round(sel.rating)}/>
                    <span style={{ fontSize:11, color:'var(--t3)' }}>{sel.rating} ({sel.reviews})</span>
                  </div>
                  <div style={{ display:'flex', alignItems:'center', gap:4, fontSize:11, color:'var(--t3)', marginTop:2 }}>
                    <Eye size={11}/>{sel.deploys.toLocaleString()} déploiements
                  </div>
                </div>
              </div>
              {/* Waveform */}
              <div style={{ display:'flex', alignItems:'flex-end', gap:2, height:28, marginTop:14, opacity:.45 }}>
                {[...Array(44)].map((_,i) => <motion.div key={i} animate={{ scaleY:[.08,.25+Math.sin(i*.45)*.75+Math.random()*.5,.08] }} transition={{ duration:.75+i*.04, repeat:Infinity, ease:'easeInOut' }} style={{ flex:1, borderRadius:2, background:sel.color, height:'100%', transformOrigin:'bottom' }}/>)}
              </div>
            </div>

            {/* Tabs */}
            <div className="tabs">
              {(['overview','models','classes','reviews'] as const).map(t => (
                <button key={t} className={`tab${tab===t?' on':''}`} onClick={() => setTab(t)}>
                  {t==='overview'?'Aperçu':t==='models'?`Modèles (${sel.models.length})`:t==='classes'?`Classes (${sel.classes})`:`Avis (${sel.reviews})`}
                </button>
              ))}
            </div>

            <div style={{ padding:'22px 24px', overflowY:'auto', maxHeight:440 }}>
              <AnimatePresence mode="wait">
                <motion.div key={tab} initial={{ opacity:0, y:6 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}>
                  {tab==='overview' && (
                    <div className="section" style={{ gap:18 }}>
                      <div className="grid-4">
                        {[['Accuracy',sel.acc+'%'],['F1 Score',sel.f1+'%'],['Précision',sel.prec+'%'],['Rappel',sel.rec+'%']].map(([l,v]) => <div key={l} className="metric"><div className="metric-val" style={{ color:sel.color }}>{v}</div><div className="metric-lbl">{l}</div></div>)}
                      </div>
                      <div className="card-s" style={{ padding:'16px' }}>
                        <div className="eyebrow" style={{ marginBottom:12 }}>Fiche Technique</div>
                        <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                          {[['Dataset',`${sel.ds} · ${sel.dsSize}`],['Embedding',sel.emb],['Architecture',sel.arch],['Classes',`${sel.classes} classes de sortie`],['Mise à jour',sel.updated]].map(([l,v]) => (
                            <div key={l} style={{ display:'flex', gap:10, alignItems:'flex-start' }}>
                              <span style={{ fontSize:12, color:'var(--t3)', width:100, flexShrink:0 }}>{l}</span>
                              <span style={{ fontSize:13, fontWeight:600, color:'var(--t1)' }}>{v}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="row" style={{ gap:8, flexWrap:'wrap' }}>
                        <button className="btn btn-primary btn-sm"><Download size={13}/>Déployer{sel.price>0?` — ${sel.price}€/mois`:' — Gratuit'}</button>
                        <button className="btn btn-ghost btn-sm">Tester dans le Prédicteur</button>
                        <button className="btn btn-ghost btn-sm">Docs API</button>
                      </div>
                    </div>
                  )}
                  {tab==='models' && (
                    <div className="section" style={{ gap:12 }}>
                      {sel.models.map((m,i) => (
                        <div key={i} className="card" style={{ border:`1px solid ${i===0?sel.color:'var(--bdr)'}`, overflow:'hidden' }}>
                          <div style={{ padding:'14px 16px', background: i===0?sel.cL:'var(--s1)', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                            <div className="row" style={{ gap:10 }}>
                              <div style={{ width:32, height:32, borderRadius:9, background: i===0?sel.color:'var(--bdr)', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff' }}>
                                {i===0 ? <Shield size={14}/> : <Cpu size={14}/>}
                              </div>
                              <div>
                                <div style={{ fontSize:14, fontWeight:700, color:'var(--t1)' }}>{m.name}</div>
                                {i===0 && <div style={{ fontSize:10, fontWeight:700, color:sel.color }}>Recommandé</div>}
                              </div>
                            </div>
                            <button className="btn btn-primary btn-xs">Utiliser</button>
                          </div>
                          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr 1fr', padding:'12px 16px', gap:8 }}>
                            {[['Accuracy',m.acc+'%','#22c55e'],['F1',m.f1+'%','#3b6fe8'],['Taille',m.size,'var(--t2)'],['Latence',m.lat,'#8b5cf6']].map(([l,v,c]) => (
                              <div key={l} style={{ textAlign:'center' }}>
                                <div style={{ fontSize:15, fontWeight:700, color:c, fontFamily:"'JetBrains Mono',monospace" }}>{v}</div>
                                <div style={{ fontSize:10, color:'var(--t3)', textTransform:'uppercase', letterSpacing:'.06em', marginTop:2 }}>{l}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {tab==='classes' && (
                    <div className="section" style={{ gap:12 }}>
                      <p className="sub">{sel.classes} classes de sortie disponibles.</p>
                      <div className="grid-3">
                        {sel.outClasses.map((cls,i) => (
                          <motion.div key={cls} initial={{ opacity:0, scale:.9 }} animate={{ opacity:1, scale:1 }} transition={{ delay:i*.02 }}
                            className="card-s" style={{ padding:'10px 12px', display:'flex', alignItems:'center', gap:8 }}>
                            <div style={{ width:22, height:22, borderRadius:7, background:sel.color, display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontSize:9, fontWeight:700, flexShrink:0 }}>{i+1}</div>
                            <span style={{ fontSize:12, fontWeight:600, color:'var(--t1)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{cls}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                  {tab==='reviews' && (
                    <div className="section" style={{ gap:14 }}>
                      {/* Summary */}
                      <div className="card-s" style={{ padding:'16px', display:'flex', alignItems:'center', gap:20, flexWrap:'wrap' }}>
                        <div style={{ textAlign:'center' }}>
                          <div className="font-heading" style={{ fontSize:44, fontWeight:800, color:'var(--t1)', lineHeight:1 }}>{sel.rating}</div>
                          <Stars v={Math.round(sel.rating)}/><div style={{ fontSize:11, color:'var(--t3)', marginTop:4 }}>{sel.reviews} avis</div>
                        </div>
                        <div style={{ flex:1, display:'flex', flexDirection:'column', gap:5 }}>
                          {[5,4,3,2,1].map(n => <div key={n} style={{ display:'flex', alignItems:'center', gap:7 }}>
                            <span style={{ fontSize:11, color:'var(--t3)', width:10 }}>{n}</span>
                            <Star size={10} fill="#f59e0b" color="#f59e0b"/>
                            <div style={{ flex:1, height:5, borderRadius:99, background:'var(--bdr2)', overflow:'hidden' }}>
                              <div style={{ height:'100%', background:'#f59e0b', borderRadius:99, width:n===5?'62%':n===4?'24%':n===3?'9%':'5%' }}/>
                            </div>
                          </div>)}
                        </div>
                      </div>
                      {/* Reviews */}
                      {sel.revs.map((r,i) => (
                        <div key={i} className="card-s" style={{ padding:'14px 16px' }}>
                          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:8, flexWrap:'wrap', gap:6 }}>
                            <div className="row" style={{ gap:8 }}>
                              <div style={{ width:28, height:28, borderRadius:8, background:`linear-gradient(135deg,var(--accent),#8b5cf6)`, display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontSize:11, fontWeight:700 }}>{r.a[0]}</div>
                              <span style={{ fontSize:13, fontWeight:600, color:'var(--t1)' }}>{r.a}</span>
                            </div>
                            <Stars v={r.s}/>
                          </div>
                          <p style={{ fontSize:13, color:'var(--t3)', lineHeight:1.55, margin:0 }}>{r.t}</p>
                          <div style={{ display:'flex', justifyContent:'space-between', marginTop:8 }}>
                            <span style={{ fontSize:11, color:'var(--t4)', fontFamily:"'JetBrains Mono',monospace" }}>{r.d}</span>
                            <button style={{ display:'flex', alignItems:'center', gap:4, fontSize:11, color:'var(--t3)', background:'none', border:'none', cursor:'pointer' }}><ThumbsUp size={11}/>Utile</button>
                          </div>
                        </div>
                      ))}
                      {/* Add review */}
                      <div className="card-s" style={{ padding:'16px' }}>
                        <div className="h3" style={{ marginBottom:12 }}>Laisser un avis</div>
                        <div style={{ display:'flex', gap:3, marginBottom:10 }}>
                          {[1,2,3,4,5].map(n => <button key={n} onClick={() => setRstars(n)} style={{ background:'none', border:'none', cursor:'pointer', display:'flex', padding:0 }}><Star size={20} fill={n<=rstars?'#f59e0b':'none'} color={n<=rstars?'#f59e0b':'var(--bdr)'}/></button>)}
                        </div>
                        <textarea className="input" value={rtxt} onChange={e => setRtxt(e.target.value)} placeholder="Votre expérience…" style={{ marginBottom:10 }}/>
                        <div style={{ display:'flex', justifyContent:'flex-end' }}>
                          <button onClick={() => { if(!rstars||!rtxt.trim())return; setRsent(true); setTimeout(()=>{setRsent(false);setRstars(0);setRtxt('');},2000); }} className="btn btn-primary btn-sm">
                            {rsent ? <><Check size={13}/>Publié !</> : <><MessageSquare size={13}/>Publier</>}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
