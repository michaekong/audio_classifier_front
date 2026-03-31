import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Search, Plus, FileAudio, Clock, Download, Share2, Star, MessageSquare, Check, Filter, Upload, Globe, Lock, Zap, X, ThumbsUp } from 'lucide-react';

const DATASETS = [
  { id:'d1', name:'UrbanSound8K', owner:'Salamon et al.', license:'CC BY 4.0', public:true, size:'5.6 GB', samples:8732, classes:10, sr:'22 kHz', format:'WAV', duration:'8.75h', status:'Ready', created:'Jan 2024', updated:'2h ago', description:'Jeu de données de sons urbains classifiés en 10 catégories. Référence pour la classification audio en milieu urbain.', tags:['Urbain','Environnement','Multi-classe'], color:'#2563eb', colorLight:'rgba(37,99,235,0.1)', rating:4.8, reviews:234, downloads:12400, classNames:['Air Conditioner','Car Horn','Children Playing','Dog Bark','Drilling','Engine Idling','Gun Shot','Jackhammer','Siren','Street Music'], metrics:{ minDur:'0.1s', maxDur:'4.0s', avgDur:'3.8s', snr:'28dB', balance:87 }, reviews_data:[{ author:'Yannick T.', text:'Dataset de référence absolue. Très bien équilibré et propre.', stars:5, date:'Fév 2025' },{ author:'Amara K.', text:'Quelques artefacts dans les fichiers CAR_HORN mais globalement excellent.', stars:4, date:'Jan 2025' }] },
  { id:'d2', name:'ESC-50', owner:'Piczak', license:'CC BY-NC 3.0', public:true, size:'600 MB', samples:2000, classes:50, sr:'44.1 kHz', format:'WAV', duration:'2.8h', status:'Ready', created:'Nov 2023', updated:'1 day ago', description:'50 classes de sons environnementaux organisées en 5 macrocatégories : animaux, nature, humains, intérieur, extérieur.', tags:['Environnement','Multi-classe','Référence'], color:'#10b981', colorLight:'rgba(16,185,129,0.1)', rating:4.6, reviews:156, downloads:8900, classNames:['Chien','Coq','Pluie','Mer','Feu','Bébé','Voiture','Hélicoptère','Sonnette','Pas','Toux','Rire','Brosse à dent','Horloge','Clavier','Cafetière','Chat','Oiseaux','Grenouilles','Insectes','Moutons','Vache','Ruisseau','Feu de camp','Cricket','Robinet','Scie','Tondeuse','Aspirateur','Montre'], metrics:{ minDur:'5.0s', maxDur:'5.0s', avgDur:'5.0s', snr:'32dB', balance:100 }, reviews_data:[{ author:'Claire M.', text:'Parfait équilibre entre classes. Idéal pour le benchmark.', stars:5, date:'Mars 2025' }] },
  { id:'d3', name:'FreeSound Custom', owner:'Moi', license:'Privé', public:false, size:'320 MB', samples:1200, classes:12, sr:'44.1 kHz', format:'MP3', duration:'1.2h', status:'Processing', created:'Mars 2025', updated:'Just now', description:"Dataset personnalisé d'enregistrements de terrain. Sons industriels et mécaniques annotés manuellement.", tags:['Industrie','Custom','Privé'], color:'#f59e0b', colorLight:'rgba(245,158,11,0.1)', rating:0, reviews:0, downloads:0, classNames:['Moteur OK','Roulement défaut','Cavitation','Vibration','Pompe OK','Compresseur','Engrenage','Bruit fond','Sifflement','Cliquetis','Grincement','Anomalie'], metrics:{ minDur:'1.0s', maxDur:'10.0s', avgDur:'3.6s', snr:'22dB', balance:72 }, reviews_data:[] },
  { id:'d4', name:'GTZAN Genre', owner:'Tzanetakis', license:'Academic', public:true, size:'1.2 GB', samples:1000, classes:10, sr:'22.05 kHz', format:'WAV', duration:'8.3h', status:'Ready', created:'Oct 2023', updated:'3 days ago', description:'Collection de 10 genres musicaux, 100 pistes de 30 secondes chacune. Standard en classification musicale.', tags:['Musique','Genre','Référence'], color:'#7c3aed', colorLight:'rgba(124,58,237,0.1)', rating:4.3, reviews:89, downloads:5600, classNames:['Blues','Classical','Country','Disco','HipHop','Jazz','Metal','Pop','Reggae','Rock'], metrics:{ minDur:'30s', maxDur:'30s', avgDur:'30s', snr:'35dB', balance:100 }, reviews_data:[{ author:'Thomas B.', text:'Dataset historique mais toujours valide pour le benchmark.', stars:4, date:'Fév 2025' }] },
];

function Stars({ v, onChange }: { v:number; onChange?:(n:number)=>void }) {
  const [hov, setHov] = useState(0);
  return (
    <div style={{ display:'flex', gap:2 }}>
      {[1,2,3,4,5].map(n => (
        <button key={n} onMouseEnter={() => setHov(n)} onMouseLeave={() => setHov(0)} onClick={() => onChange?.(n)}
          style={{ background:'none', border:'none', padding:0, cursor: onChange ? 'pointer' : 'default', display:'flex' }}>
          <Star size={13} fill={n <= (hov||v) ? '#f59e0b' : 'none'} color={n <= (hov||v) ? '#f59e0b' : 'var(--bdr)'} />
        </button>
      ))}
    </div>
  );
}

function Badge({ status }: { status: string }) {
  const map: Record<string, string> = { Ready:'badge-green', Processing:'badge-yellow', Error:'badge-red' };
  const dot: Record<string, string> = { Ready:'#10b981', Processing:'#f59e0b', Error:'#ef4444' };
  return (
    <span className={`ac-badge ${map[status]||'badge-blue'}`}>
      <span style={{ width:6, height:6, borderRadius:'50%', background:dot[status], display:'inline-block' }} />
      {status}
    </span>
  );
}

export const Datasets: React.FC = () => {
  const [sel, setSel] = useState(DATASETS[0]);
  const [tab, setTab] = useState<'overview'|'classes'|'reviews'>('overview');
  const [search, setSearch] = useState('');
  const [rstars, setRstars] = useState(0);
  const [rtxt, setRtxt] = useState('');
  const [rsent, setRsent] = useState(false);

  const filtered = DATASETS.filter(d => d.name.toLowerCase().includes(search.toLowerCase()));
  const submit = () => { if (!rstars || !rtxt.trim()) return; setRsent(true); setTimeout(() => { setRsent(false); setRstars(0); setRtxt(''); }, 2500); };

  return (
    <div className="fade-in" style={{ display:'flex', flexDirection:'column', gap:20 }}>
      {/* Header */}
      <div style={{ display:'flex', flexWrap:'wrap', alignItems:'flex-end', justifyContent:'space-between', gap:12 }}>
        <div>
          <div className="page-eyebrow"><Database size={14} color="#2563eb" />Datasets Audio</div>
          <h1 className="page-title f-display" style={{ marginTop:4 }}>Bibliothèque de <span style={{ color:'#2563eb' }}>Données</span></h1>
          <p className="page-sub">{DATASETS.length} datasets · {DATASETS.reduce((a,d)=>a+d.samples,0).toLocaleString()} échantillons</p>
        </div>
        <div style={{ display:'flex', gap:8 }}>
          <button className="ac-btn ac-btn-ghost ac-btn-sm" style={{ display:'flex', alignItems:'center', gap:6 }}><Filter size={14} />Filtrer</button>
          <button className="ac-btn ac-btn-primary ac-btn-sm" style={{ display:'flex', alignItems:'center', gap:6 }}><Plus size={14} />Importer</button>
        </div>
      </div>

      {/* Main layout */}
      <div style={{ display:'flex', gap:16, alignItems:'flex-start', flexWrap:'wrap' }}>
        {/* List */}
        <div style={{ width:280, flexShrink:0, display:'flex', flexDirection:'column', gap:10 }}>
          <div style={{ display:'flex', alignItems:'center', gap:8, padding:'8px 12px', background:'var(--card)', border:'1px solid var(--bdr)', borderRadius:10 }}>
            <Search size={14} color="var(--tx3)" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Rechercher…"
              style={{ background:'transparent', border:'none', outline:'none', fontSize:13, color:'var(--tx)', fontFamily:"'Space Grotesk',system-ui,sans-serif", width:'100%' }} />
          </div>
          {filtered.map((ds, i) => (
            <motion.button key={ds.id} initial={{ opacity:0, x:-10 }} animate={{ opacity:1, x:0 }} transition={{ delay:i*.05 }}
              onClick={() => { setSel(ds); setTab('overview'); }}
              style={{
                width:'100%', textAlign:'left', padding:'14px', borderRadius:14,
                background: sel.id===ds.id ? ds.colorLight : 'var(--card)',
                border: `1px solid ${sel.id===ds.id ? ds.color : 'var(--bdr)'}`,
                cursor:'pointer', transition:'all .2s',
                boxShadow: sel.id===ds.id ? `0 0 0 2px ${ds.color}22, var(--sh)` : 'none',
              }}>
              <div style={{ display:'flex', alignItems:'flex-start', gap:10 }}>
                <div style={{ width:36, height:36, borderRadius:10, background:ds.color, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  <FileAudio size={16} color="#fff" />
                </div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:6, flexWrap:'wrap', justifyContent:'space-between' }}>
                    <span style={{ fontSize:13, fontWeight:700, color:'var(--tx)', fontFamily:"'Syne',system-ui,sans-serif" }}>{ds.name}</span>
                    <Badge status={ds.status} />
                  </div>
                  <div style={{ display:'flex', gap:6, marginTop:4, flexWrap:'wrap' }}>
                    <span style={{ fontSize:11, color:'var(--tx3)', fontFamily:"'JetBrains Mono',monospace" }}>{ds.samples.toLocaleString()} samples</span>
                    <span style={{ fontSize:11, color:'var(--bdr)' }}>·</span>
                    <span style={{ fontSize:11, color:'var(--tx3)', fontFamily:"'JetBrains Mono',monospace" }}>{ds.classes} classes</span>
                    {!ds.public && <Lock size={10} color="var(--tx3)" />}
                  </div>
                  {ds.rating > 0 && (
                    <div style={{ display:'flex', alignItems:'center', gap:4, marginTop:4 }}>
                      <Star size={10} fill="#f59e0b" color="#f59e0b" />
                      <span style={{ fontSize:11, color:'var(--tx3)' }}>{ds.rating} ({ds.reviews})</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Detail panel */}
        <AnimatePresence mode="wait">
          <motion.div key={sel.id} initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}
            className="ac-card" style={{ flex:1, minWidth:0, overflow:'hidden', minHeight:500 }}>
            {/* Hero */}
            <div style={{ background:sel.colorLight, padding:'20px 24px', position:'relative', overflow:'hidden' }}>
              <div style={{ position:'absolute', inset:0, background:`radial-gradient(ellipse at 80% 0%, ${sel.color}30, transparent 65%)`, pointerEvents:'none' }} />
              <div style={{ display:'flex', flexWrap:'wrap', gap:16, justifyContent:'space-between', position:'relative' }}>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:8, flexWrap:'wrap', marginBottom:8 }}>
                    <div style={{ width:32, height:32, borderRadius:9, background:sel.color, display:'flex', alignItems:'center', justifyContent:'center' }}>
                      <FileAudio size={15} color="#fff" />
                    </div>
                    <span style={{ fontSize:11, color:'var(--tx3)', fontFamily:"'JetBrains Mono',monospace", textTransform:'uppercase', letterSpacing:'.08em' }}>{sel.owner}</span>
                    <Badge status={sel.status} />
                    {sel.public ? <span className="ac-badge badge-blue"><Globe size={9} />Public</span> : <span className="ac-badge badge-yellow"><Lock size={9} />Privé</span>}
                  </div>
                  <h2 className="f-display" style={{ fontSize:24, fontWeight:700, color:'var(--tx)', margin:'0 0 4px' }}>{sel.name}</h2>
                  <p style={{ fontSize:13, color:'var(--tx2)', margin:'0 0 10px', lineHeight:1.5, maxWidth:480 }}>{sel.description}</p>
                  <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
                    {sel.tags.map(t => (
                      <span key={t} style={{ fontSize:10, fontWeight:600, padding:'2px 8px', borderRadius:99, border:`1px solid ${sel.color}45`, color:sel.color, background:sel.color+'15' }}>{t}</span>
                    ))}
                  </div>
                </div>
                <div style={{ display:'flex', gap:16 }}>
                  {[{v:sel.samples.toLocaleString(),l:'Samples'},{v:sel.classes,l:'Classes'},{v:sel.size,l:'Taille'}].map(s => (
                    <div key={s.l} style={{ textAlign:'right' }}>
                      <div className="f-display" style={{ fontSize:22, fontWeight:700, color:sel.color }}>{s.v}</div>
                      <div style={{ fontSize:10, color:'var(--tx3)', fontFamily:"'JetBrains Mono',monospace", textTransform:'uppercase', letterSpacing:'.08em' }}>{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Mini waveform */}
              <div style={{ display:'flex', alignItems:'flex-end', gap:2, height:32, marginTop:14, opacity:.5 }}>
                {[...Array(48)].map((_,i) => (
                  <motion.div key={i} animate={{ scaleY:[.1,.3+Math.random()*.9,.1] }} transition={{ duration:.7+i*.04, repeat:Infinity, ease:'easeInOut' }}
                    style={{ flex:1, borderRadius:2, background:sel.color, height:'100%', transformOrigin:'bottom' }} />
                ))}
              </div>
            </div>

            {/* Tabs */}
            <div className="ac-tabs">
              {(['overview','classes','reviews'] as const).map(t => (
                <button key={t} className={`ac-tab${tab===t?' active':''}`} onClick={() => setTab(t)}>
                  {t==='overview' ? 'Aperçu' : t==='classes' ? `Classes (${sel.classes})` : `Avis (${sel.reviews})`}
                </button>
              ))}
            </div>

            <div style={{ padding:'20px 24px', overflowY:'auto', maxHeight:420 }}>
              <AnimatePresence mode="wait">
                <motion.div key={tab} initial={{ opacity:0, y:6 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}>
                  {tab==='overview' && (
                    <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
                      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(120px,1fr))', gap:10 }}>
                        {[['Samples',sel.samples.toLocaleString()],['Classes',sel.classes],['Durée totale',sel.duration],['Taille',sel.size],['Sample Rate',sel.sr],['Format',sel.format],['Durée min',sel.metrics.minDur],['Durée max',sel.metrics.maxDur],['Durée moy.',sel.metrics.avgDur],['SNR moyen',sel.metrics.snr],['Téléchargements',sel.downloads.toLocaleString()],['Licence',sel.license]].map(([l,v]) => (
                          <div key={l} className="metric-box">
                            <div className="metric-val">{v}</div>
                            <div className="metric-lbl">{l}</div>
                          </div>
                        ))}
                      </div>
                      <div style={{ background:'var(--bg1)', border:'1px solid var(--bdr2)', borderRadius:12, padding:'14px' }}>
                        <div style={{ display:'flex', justifyContent:'space-between', marginBottom:8 }}>
                          <span style={{ fontSize:13, fontWeight:600, color:'var(--tx)' }}>Équilibre des classes</span>
                          <span style={{ fontSize:13, fontWeight:700, fontFamily:"'JetBrains Mono',monospace", color: sel.metrics.balance>=90?'#10b981':sel.metrics.balance>=70?'#f59e0b':'#ef4444' }}>{sel.metrics.balance}%</span>
                        </div>
                        <div style={{ height:8, borderRadius:99, background:'var(--bg2)', overflow:'hidden' }}>
                          <motion.div initial={{ width:0 }} animate={{ width:sel.metrics.balance+'%' }} transition={{ duration:1, ease:'easeOut' }}
                            style={{ height:'100%', borderRadius:99, background: sel.metrics.balance>=90?'#10b981':sel.metrics.balance>=70?'#f59e0b':'#ef4444' }} />
                        </div>
                        <p style={{ fontSize:11, color:'var(--tx3)', marginTop:6 }}>
                          {sel.metrics.balance>=90?'✓ Très bien équilibré':sel.metrics.balance>=70?'⚠ Léger déséquilibre — data augmentation conseillée':'✗ Déséquilibre significatif — data augmentation requise'}
                        </p>
                      </div>
                      <div style={{ display:'flex', alignItems:'center', gap:10, fontSize:13, color:'var(--tx3)' }}>
                        <Clock size={13} /> Créé le <strong style={{ color:'var(--tx)' }}>{sel.created}</strong> · Mis à jour <strong style={{ color:'var(--tx)' }}>{sel.updated}</strong>
                      </div>
                      <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                        <button className="ac-btn ac-btn-primary ac-btn-sm" style={{ display:'flex', alignItems:'center', gap:6 }}><Download size={13} />Télécharger</button>
                        <button className="ac-btn ac-btn-ghost ac-btn-sm" style={{ display:'flex', alignItems:'center', gap:6 }}><Share2 size={13} />Partager</button>
                        <button className="ac-btn ac-btn-ghost ac-btn-sm" style={{ display:'flex', alignItems:'center', gap:6 }}><Zap size={13} />Utiliser pour l'entraînement</button>
                      </div>
                    </div>
                  )}

                  {tab==='classes' && (
                    <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
                      <p style={{ fontSize:13, color:'var(--tx3)' }}>{sel.classes} classes de sortie disponibles.</p>
                      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(140px,1fr))', gap:8 }}>
                        {sel.classNames.map((cls, i) => {
                          const pct = Math.round(70+Math.random()*30);
                          return (
                            <motion.div key={cls} initial={{ opacity:0, scale:.92 }} animate={{ opacity:1, scale:1 }} transition={{ delay:i*.02 }}
                              style={{ background:'var(--bg1)', border:'1px solid var(--bdr2)', borderRadius:12, padding:'10px 12px' }}>
                              <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:6 }}>
                                <div style={{ width:22, height:22, borderRadius:7, background:sel.color, display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontSize:9, fontWeight:700, flexShrink:0 }}>{i+1}</div>
                                <span style={{ fontSize:12, fontWeight:600, color:'var(--tx)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{cls}</span>
                              </div>
                              <div style={{ height:4, borderRadius:99, background:'var(--bg2)' }}>
                                <div style={{ height:'100%', borderRadius:99, background:sel.color, width:pct+'%' }} />
                              </div>
                              <div style={{ fontSize:10, color:'var(--tx3)', marginTop:4, fontFamily:"'JetBrains Mono',monospace" }}>{pct}% · {Math.floor(sel.samples/sel.classes*pct/100)} samples</div>
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {tab==='reviews' && (
                    <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
                      {sel.rating > 0 && (
                        <div style={{ display:'flex', alignItems:'center', gap:20, background:'var(--bg1)', border:'1px solid var(--bdr2)', borderRadius:12, padding:'14px 16px' }}>
                          <div style={{ textAlign:'center' }}>
                            <div className="f-display" style={{ fontSize:40, fontWeight:700, color:'var(--tx)', lineHeight:1 }}>{sel.rating}</div>
                            <Stars v={sel.rating} />
                            <div style={{ fontSize:11, color:'var(--tx3)', marginTop:4 }}>{sel.reviews} avis</div>
                          </div>
                          <div style={{ flex:1, display:'flex', flexDirection:'column', gap:6 }}>
                            {[5,4,3,2,1].map(n => (
                              <div key={n} style={{ display:'flex', alignItems:'center', gap:8 }}>
                                <span style={{ fontSize:11, color:'var(--tx3)', width:10, textAlign:'right' }}>{n}</span>
                                <Star size={9} fill="#f59e0b" color="#f59e0b" />
                                <div style={{ flex:1, height:6, borderRadius:99, background:'var(--bg2)', overflow:'hidden' }}>
                                  <div style={{ height:'100%', background:'#f59e0b', borderRadius:99, width: n===5?'62%':n===4?'24%':n===3?'9%':'5%' }} />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {sel.reviews_data.map((r, i) => (
                        <div key={i} style={{ background:'var(--bg1)', border:'1px solid var(--bdr2)', borderRadius:12, padding:'14px 16px' }}>
                          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:8 }}>
                            <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                              <div style={{ width:28, height:28, borderRadius:8, background:'linear-gradient(135deg,#2563eb,#7c3aed)', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontSize:11, fontWeight:700 }}>{r.author[0]}</div>
                              <span style={{ fontSize:13, fontWeight:600, color:'var(--tx)' }}>{r.author}</span>
                            </div>
                            <Stars v={r.stars} />
                          </div>
                          <p style={{ fontSize:13, color:'var(--tx3)', lineHeight:1.5, margin:0 }}>{r.text}</p>
                          <div style={{ display:'flex', justifyContent:'space-between', marginTop:8 }}>
                            <span style={{ fontSize:11, color:'var(--tx3)', fontFamily:"'JetBrains Mono',monospace" }}>{r.date}</span>
                            <button style={{ display:'flex', alignItems:'center', gap:4, fontSize:11, color:'var(--tx3)', background:'none', border:'none', cursor:'pointer' }}>
                              <ThumbsUp size={11} /> Utile
                            </button>
                          </div>
                        </div>
                      ))}
                      {sel.reviews_data.length===0 && <p style={{ fontSize:13, color:'var(--tx3)', textAlign:'center', padding:'20px 0' }}>Aucun avis. Soyez le premier !</p>}
                      <div style={{ background:'var(--bg1)', border:'1px solid var(--bdr2)', borderRadius:12, padding:'16px' }}>
                        <div style={{ fontSize:13, fontWeight:700, color:'var(--tx)', marginBottom:10 }}>Laisser un avis</div>
                        <Stars v={rstars} onChange={setRstars} />
                        <textarea className="ac-input" value={rtxt} onChange={e => setRtxt(e.target.value)} placeholder="Votre expérience…"
                          style={{ marginTop:10, minHeight:72, resize:'vertical' }} />
                        <div style={{ display:'flex', justifyContent:'flex-end', marginTop:10 }}>
                          <button onClick={submit} className="ac-btn ac-btn-primary ac-btn-sm" style={{ display:'flex', alignItems:'center', gap:6 }}>
                            {rsent ? <><Check size={12} />Publié !</> : <><MessageSquare size={12} />Publier</>}
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
