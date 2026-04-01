import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Database, Search, Plus, FileAudio, Clock, Download, Share2,
  Star, MessageSquare, Check, Upload, Globe, Lock, Zap, X,
  ThumbsUp, Music, ChevronRight, Play, Mic
} from 'lucide-react';

const DATASETS = [
  {
    id: 'camer', name: 'CamerMusic-500', owner: 'AudioClass Lab', license: 'CC BY 4.0', pub: true,
    size: '2.1 GB', samples: 500, classes: 5, sr: '44.1 kHz', format: 'WAV', duration: '8.3h',
    status: 'Ready', created: 'Avril 2025', updated: 'Il y a 2h',
    desc: 'Dataset de référence pour les styles musicaux camerounais. 100 extraits par genre, 30 secondes, enregistrements studio haute qualité.',
    tags: ['Musique', 'Cameroun', 'Afrique', 'Studio'], color: '#f59e0b', colorLight: 'rgba(245,158,11,.1)',
    rating: 4.9, reviews: 42, downloads: 380,
    classNames: ['Makossa', 'Bikutsi', 'Ambasse Bey', 'Mangambeu', 'Bend Skin'],
    metrics: { minDur: '30s', maxDur: '30s', avgDur: '30s', snr: '42 dB', balance: 100 },
    revs: [
      { a: 'Dr. Eboa Nguema', t: 'Qualité sonore exceptionnelle. Parfait pour un premier modèle.', s: 5, d: 'Avril 2025' },
      { a: 'Claude Beti', t: 'Les classes Makossa et Bikutsi sont parfaitement équilibrées.', s: 5, d: 'Avril 2025' },
    ]
  },
  {
    id: 'd1', name: 'UrbanSound8K', owner: 'Salamon et al.', license: 'CC BY 4.0', pub: true,
    size: '5.6 GB', samples: 8732, classes: 10, sr: '22 kHz', format: 'WAV', duration: '8.75h',
    status: 'Ready', created: 'Jan 2024', updated: 'Il y a 1 jour',
    desc: 'Sons urbains classifiés en 10 catégories. Référence internationale pour la classification audio.',
    tags: ['Urbain', 'Environnement', 'Référence'], color: '#3b6fe8', colorLight: 'rgba(59,111,232,.1)',
    rating: 4.8, reviews: 234, downloads: 12400,
    classNames: ['Air Conditioner', 'Car Horn', 'Children Playing', 'Dog Bark', 'Drilling', 'Engine Idling', 'Gun Shot', 'Jackhammer', 'Siren', 'Street Music'],
    metrics: { minDur: '0.1s', maxDur: '4.0s', avgDur: '3.8s', snr: '28 dB', balance: 87 },
    revs: [{ a: 'Yannick T.', t: 'Dataset de référence absolue. Très bien équilibré et propre.', s: 5, d: 'Fév 2025' }]
  },
  {
    id: 'd2', name: 'GTZAN Genre', owner: 'Tzanetakis', license: 'Academic', pub: true,
    size: '1.2 GB', samples: 1000, classes: 10, sr: '22 kHz', format: 'WAV', duration: '8.3h',
    status: 'Ready', created: 'Oct 2023', updated: 'Il y a 3 jours',
    desc: '10 genres musicaux, 100 pistes de 30s chacune. Standard en classification musicale mondiale.',
    tags: ['Musique', 'Genre', 'Référence'], color: '#8b5cf6', colorLight: 'rgba(139,92,246,.1)',
    rating: 4.3, reviews: 89, downloads: 5600,
    classNames: ['Blues', 'Classical', 'Country', 'Disco', 'HipHop', 'Jazz', 'Metal', 'Pop', 'Reggae', 'Rock'],
    metrics: { minDur: '30s', maxDur: '30s', avgDur: '30s', snr: '35 dB', balance: 100 },
    revs: [{ a: 'Thomas B.', t: 'Dataset historique, toujours valide pour le benchmark.', s: 4, d: 'Fév 2025' }]
  },
  {
    id: 'd3', name: 'Mon Dataset Custom', owner: 'Moi', license: 'Privé', pub: false,
    size: '0 MB', samples: 0, classes: 0, sr: '—', format: '—', duration: '—',
    status: 'Empty', created: 'Maintenant', updated: 'Maintenant',
    desc: 'Importez vos propres fichiers audio pour créer un dataset personnalisé.',
    tags: ['Custom', 'Privé'], color: '#22c55e', colorLight: 'rgba(34,197,94,.1)',
    rating: 0, reviews: 0, downloads: 0, classNames: [],
    metrics: { minDur: '—', maxDur: '—', avgDur: '—', snr: '—', balance: 0 }, revs: []
  },
];

function Stars({ v, onChange }: { v: number; onChange?: (n: number) => void }) {
  const [hov, setHov] = useState(0);
  return (
    <span style={{ display: 'flex', gap: 2 }}>
      {[1, 2, 3, 4, 5].map(n => (
        <button key={n} onMouseEnter={() => setHov(n)} onMouseLeave={() => setHov(0)} onClick={() => onChange?.(n)}
          style={{ background: 'none', border: 'none', padding: 0, cursor: onChange ? 'pointer' : 'default', display: 'flex' }}>
          <Star size={13} fill={n <= (hov || v) ? '#f59e0b' : 'none'} color={n <= (hov || v) ? '#f59e0b' : 'var(--bdr)'} />
        </button>
      ))}
    </span>
  );
}

function StatusDot({ s }: { s: string }) {
  const c = { Ready: '#22c55e', Processing: '#f59e0b', Error: '#ef4444', Empty: '#8b5cf6' }[s] || '#8b8';
  const cl = { Ready: 'bd-green', Processing: 'bd-yellow', Error: 'bd-red', Empty: 'bd-purple' }[s] || 'bd-blue';
  return <span className={`badge ${cl}`}><span style={{ width: 6, height: 6, borderRadius: '50%', background: c, display: 'inline-block' }} />{s}</span>;
}

export const Datasets: React.FC = () => {
  const [sel, setSel] = useState(DATASETS[0]);
  const [tab, setTab] = useState<'overview' | 'classes' | 'reviews' | 'import'>('overview');
  const [search, setSearch] = useState('');
  const [rstars, setRstars] = useState(0);
  const [rtxt, setRtxt] = useState('');
  const [rsent, setRsent] = useState(false);
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const filtered = DATASETS.filter(d => d.name.toLowerCase().includes(search.toLowerCase()));
  const submit = () => {
    if (!rstars || !rtxt.trim()) return;
    setRsent(true); setTimeout(() => { setRsent(false); setRstars(0); setRtxt(''); }, 2500);
  };

  return (
    <div className="page-wrap fade-in">
      {/* ── Header ── */}
      <div className="row-between">
        <div>
          <div className="eyebrow" style={{ marginBottom: 4 }}><Database size={13} color="var(--accent)" />Datasets Audio</div>
          <h1 className="h1 font-heading">Bibliothèque de <span style={{ color: 'var(--accent)' }}>Données</span></h1>
          <p className="sub" style={{ marginTop: 4 }}>{DATASETS.length} datasets · {DATASETS.reduce((a, d) => a + d.samples, 0).toLocaleString()} échantillons</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-ghost btn-sm" onClick={() => { setSel(DATASETS[3]); setTab('import'); }}>
            <Upload size={14} />Importer
          </button>
          <button className="btn btn-primary btn-sm">
            <Plus size={14} />Nouveau
          </button>
        </div>
      </div>

      {/* ── CamerMusic featured banner ── */}
      <div style={{ padding: '20px 24px', borderRadius: 16, background: 'linear-gradient(135deg, rgba(245,158,11,.15) 0%, rgba(245,158,11,.05) 100%)', border: '1px solid rgba(245,158,11,.3)', display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
        <div style={{ width: 48, height: 48, borderRadius: 14, background: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Music size={24} color="#fff" />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--t1)', fontFamily: "'Outfit',system-ui" }}>CamerMusic-500</span>
            <span className="badge" style={{ background: 'rgba(245,158,11,.2)', color: '#b45309' }}>★ Recommandé</span>
            <span className="badge bd-green">Prêt</span>
          </div>
          <p style={{ fontSize: 13, color: 'var(--t2)', margin: 0 }}>500 extraits · 5 styles camerounais · 44.1 kHz studio · Parfait pour ce scénario</p>
        </div>
        <button className="btn btn-primary btn-sm" onClick={() => { setSel(DATASETS[0]); setTab('overview'); }}>
          Voir le dataset <ChevronRight size={14} />
        </button>
      </div>

      {/* ── Main layout ── */}
      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
        {/* List */}
        <div style={{ width: 272, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', background: 'var(--card)', border: '1px solid var(--bdr)', borderRadius: 10 }}>
            <Search size={14} color="var(--t3)" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Rechercher…"
              style={{ background: 'transparent', border: 'none', outline: 'none', fontSize: 13, color: 'var(--t1)', fontFamily: 'inherit', width: '100%' }} />
          </div>
          {filtered.map((ds, i) => (
            <motion.button key={ds.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * .05 }}
              onClick={() => { setSel(ds); setTab(ds.id === 'd3' ? 'import' : 'overview'); }}
              style={{ width: '100%', textAlign: 'left', padding: '14px', borderRadius: 14, cursor: 'pointer', transition: 'all .18s', background: sel.id === ds.id ? ds.colorLight : 'var(--card)', border: `1px solid ${sel.id === ds.id ? ds.color : 'var(--bdr)'}`, boxShadow: sel.id === ds.id ? `0 0 0 2px ${ds.color}20, var(--sh-sm)` : 'var(--sh-sm)' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: ds.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <FileAudio size={17} color="#fff" />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 6, flexWrap: 'wrap', marginBottom: 3 }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--t1)', fontFamily: "'Outfit',system-ui" }}>{ds.name}</span>
                    <StatusDot s={ds.status} />
                  </div>
                  <p style={{ fontSize: 11, color: 'var(--t3)', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {ds.samples > 0 ? `${ds.samples.toLocaleString()} samples · ${ds.classes} classes` : 'Vide — importer des fichiers'}
                  </p>
                  {ds.rating > 0 && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 5 }}>
                      <Stars v={ds.rating} />
                      <span style={{ fontSize: 10, color: 'var(--t3)' }}>{ds.rating} ({ds.reviews})</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Detail panel */}
        <AnimatePresence mode="wait">
          <motion.div key={sel.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="card" style={{ flex: 1, minWidth: 0, minHeight: 520 }}>

            {/* Hero */}
            <div style={{ padding: '22px 26px', background: sel.colorLight, borderBottom: '1px solid var(--bdr)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 85% 0%, ${sel.color}28, transparent 60%)`, pointerEvents: 'none' }} />
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'space-between', position: 'relative' }}>
                <div style={{ flex: 1, minWidth: 220 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, flexWrap: 'wrap' }}>
                    <div style={{ width: 32, height: 32, borderRadius: 9, background: sel.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FileAudio size={15} color="#fff" /></div>
                    <span style={{ fontSize: 11, color: 'var(--t3)', fontFamily: "'JetBrains Mono',monospace" }}>{sel.owner}</span>
                    <StatusDot s={sel.status} />
                    {sel.pub ? <span className="badge bd-blue"><Globe size={9} />Public</span> : <span className="badge bd-yellow"><Lock size={9} />Privé</span>}
                  </div>
                  <h2 className="h2 font-heading" style={{ marginBottom: 6 }}>{sel.name}</h2>
                  <p style={{ fontSize: 13, color: 'var(--t2)', lineHeight: 1.6, maxWidth: 460, margin: 0 }}>{sel.desc}</p>
                  <div style={{ display: 'flex', gap: 5, marginTop: 10, flexWrap: 'wrap' }}>
                    {sel.tags.map(t => <span key={t} style={{ fontSize: 10, fontWeight: 600, padding: '2px 8px', borderRadius: 99, border: `1px solid ${sel.color}40`, color: sel.color, background: sel.color + '14' }}>{t}</span>)}
                  </div>
                </div>
                {sel.samples > 0 && (
                  <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start', flexShrink: 0 }}>
                    {[{ v: sel.samples.toLocaleString(), l: 'Samples' }, { v: sel.classes, l: 'Classes' }, { v: sel.size, l: 'Taille' }].map(s => (
                      <div key={s.l} style={{ textAlign: 'right' }}>
                        <div className="font-heading" style={{ fontSize: 24, fontWeight: 700, color: sel.color, lineHeight: 1.1 }}>{s.v}</div>
                        <div style={{ fontSize: 10, color: 'var(--t3)', fontFamily: "'JetBrains Mono',monospace", textTransform: 'uppercase', letterSpacing: '.08em', marginTop: 2 }}>{s.l}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {/* Mini waveform */}
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 28, marginTop: 16, opacity: .4 }}>
                {[...Array(50)].map((_, i) => (
                  <motion.div key={i} animate={{ scaleY: [.1, .25 + Math.sin(i * .45) * .75, .1] }}
                    transition={{ duration: .8 + i * .03, repeat: Infinity, ease: 'easeInOut' }}
                    style={{ flex: 1, borderRadius: 2, background: sel.color, height: '100%', transformOrigin: 'bottom' }} />
                ))}
              </div>
            </div>

            {/* Tabs */}
            <div className="tabs">
              {(['overview', 'classes', 'reviews', 'import'] as const).map(t => (
                <button key={t} className={`tab${tab === t ? ' on' : ''}`} onClick={() => setTab(t)}>
                  {t === 'overview' ? 'Aperçu' : t === 'classes' ? `Classes (${sel.classNames.length})` : t === 'reviews' ? `Avis (${sel.reviews})` : 'Importer'}
                </button>
              ))}
            </div>

            <div style={{ padding: '22px 26px', overflowY: 'auto', maxHeight: 480 }}>
              <AnimatePresence mode="wait">
                <motion.div key={tab} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>

                  {tab === 'overview' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px,1fr))', gap: 10 }}>
                        {[['Samples', sel.samples > 0 ? sel.samples.toLocaleString() : '—'], ['Classes', sel.classes || '—'], ['Durée totale', sel.duration], ['Taille', sel.size], ['Sample Rate', sel.sr], ['Format', sel.format], ['Durée min', sel.metrics.minDur], ['SNR moyen', sel.metrics.snr], ['Licence', sel.license], ['Mis à jour', sel.updated], ['Créé', sel.created], ['Téléchargements', sel.downloads.toLocaleString()]].map(([l, v]) => (
                          <div key={l} className="metric"><div className="metric-val">{v}</div><div className="metric-lbl">{l}</div></div>
                        ))}
                      </div>
                      {sel.metrics.balance > 0 && (
                        <div style={{ background: 'var(--s1)', border: '1px solid var(--bdr2)', borderRadius: 12, padding: 16 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                            <span className="h3">Équilibre des classes</span>
                            <span style={{ fontSize: 14, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace", color: sel.metrics.balance >= 90 ? 'var(--ok)' : sel.metrics.balance >= 70 ? 'var(--warn)' : 'var(--danger)' }}>{sel.metrics.balance}%</span>
                          </div>
                          <div style={{ height: 8, borderRadius: 99, background: 'var(--bdr2)', overflow: 'hidden' }}>
                            <motion.div initial={{ width: 0 }} animate={{ width: sel.metrics.balance + '%' }} transition={{ duration: 1 }}
                              style={{ height: '100%', borderRadius: 99, background: sel.metrics.balance >= 90 ? 'var(--ok)' : sel.metrics.balance >= 70 ? 'var(--warn)' : 'var(--danger)' }} />
                          </div>
                          <p style={{ fontSize: 12, color: 'var(--t3)', marginTop: 6 }}>{sel.metrics.balance === 100 ? '✓ Parfaitement équilibré — idéal pour l\'entraînement' : sel.metrics.balance >= 90 ? '✓ Très bien équilibré' : '⚠ Déséquilibre — data augmentation conseillée'}</p>
                        </div>
                      )}
                      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                        <button className="btn btn-primary btn-sm"><Download size={13} />Télécharger</button>
                        <button className="btn btn-ghost btn-sm"><Share2 size={13} />Partager</button>
                        <button className="btn btn-ghost btn-sm"><Zap size={13} />Utiliser pour l'entraînement</button>
                      </div>
                    </div>
                  )}

                  {tab === 'classes' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                      {sel.classNames.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--t3)' }}>
                          <FileAudio size={32} style={{ margin: '0 auto 12px', opacity: .3 }} />
                          <p>Aucune classe — importez d'abord vos données</p>
                        </div>
                      ) : (
                        <>
                          <p className="sub">{sel.classNames.length} classes disponibles dans ce dataset.</p>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px,1fr))', gap: 8 }}>
                            {sel.classNames.map((cls, i) => {
                              const pct = sel.metrics.balance === 100 ? Math.floor(sel.samples / sel.classNames.length) : Math.floor(sel.samples / sel.classNames.length * (0.8 + Math.random() * 0.4));
                              return (
                                <motion.div key={cls} initial={{ opacity: 0, scale: .9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * .04 }}
                                  style={{ background: 'var(--s1)', border: '1px solid var(--bdr2)', borderRadius: 12, padding: '12px 14px' }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                                    <div style={{ width: 24, height: 24, borderRadius: 7, background: sel.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 10, fontWeight: 700, flexShrink: 0 }}>{i + 1}</div>
                                    <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--t1)' }}>{cls}</span>
                                  </div>
                                  <div style={{ height: 4, borderRadius: 99, background: 'var(--bdr2)' }}>
                                    <div style={{ height: '100%', borderRadius: 99, background: sel.color, width: (100 / sel.classNames.length) + '%' }} />
                                  </div>
                                  <div style={{ fontSize: 10, color: 'var(--t3)', marginTop: 5, fontFamily: "'JetBrains Mono',monospace" }}>{pct} samples</div>
                                </motion.div>
                              );
                            })}
                          </div>
                        </>
                      )}
                    </div>
                  )}

                  {tab === 'reviews' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                      {sel.rating > 0 && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 24, background: 'var(--s1)', border: '1px solid var(--bdr2)', borderRadius: 12, padding: 16, flexWrap: 'wrap' }}>
                          <div style={{ textAlign: 'center' }}>
                            <div className="font-heading" style={{ fontSize: 42, fontWeight: 800, color: 'var(--t1)', lineHeight: 1 }}>{sel.rating}</div>
                            <Stars v={sel.rating} />
                            <div style={{ fontSize: 11, color: 'var(--t3)', marginTop: 4 }}>{sel.reviews} avis</div>
                          </div>
                          <div style={{ flex: 1, minWidth: 120 }}>
                            {[5, 4, 3, 2, 1].map(n => (
                              <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 4 }}>
                                <span style={{ fontSize: 11, color: 'var(--t3)', width: 10 }}>{n}</span>
                                <Star size={9} fill="#f59e0b" color="#f59e0b" />
                                <div style={{ flex: 1, height: 5, borderRadius: 99, background: 'var(--bdr2)', overflow: 'hidden' }}>
                                  <div style={{ height: '100%', background: '#f59e0b', borderRadius: 99, width: n === 5 ? '80%' : n === 4 ? '15%' : '5%' }} />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {sel.revs.map((r, i) => (
                        <div key={i} style={{ background: 'var(--s1)', border: '1px solid var(--bdr2)', borderRadius: 12, padding: '14px 16px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                              <div style={{ width: 28, height: 28, borderRadius: 8, background: 'linear-gradient(135deg,var(--accent),#8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 11, fontWeight: 700 }}>{r.a[0]}</div>
                              <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--t1)' }}>{r.a}</span>
                            </div>
                            <Stars v={r.s} />
                          </div>
                          <p style={{ fontSize: 13, color: 'var(--t2)', lineHeight: 1.55, margin: '0 0 8px' }}>{r.t}</p>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: 10, color: 'var(--t4)', fontFamily: "'JetBrains Mono',monospace" }}>{r.d}</span>
                            <button style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: 'var(--t3)', background: 'none', border: 'none', cursor: 'pointer' }}><ThumbsUp size={11} />Utile</button>
                          </div>
                        </div>
                      ))}
                      {sel.revs.length === 0 && <p style={{ fontSize: 13, color: 'var(--t3)', textAlign: 'center', padding: '20px 0' }}>Aucun avis pour ce dataset.</p>}
                      <div style={{ background: 'var(--s1)', border: '1px solid var(--bdr2)', borderRadius: 12, padding: 16 }}>
                        <div className="h3" style={{ marginBottom: 12 }}>Laisser un avis</div>
                        <Stars v={rstars} onChange={setRstars} />
                        <textarea className="input" value={rtxt} onChange={e => setRtxt(e.target.value)} placeholder="Votre expérience avec ce dataset…" style={{ marginTop: 10 }} />
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10 }}>
                          <button onClick={submit} className="btn btn-primary btn-sm">{rsent ? <><Check size={12} />Publié !</> : <><MessageSquare size={12} />Publier</>}</button>
                        </div>
                      </div>
                    </div>
                  )}

                  {tab === 'import' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                      <div>
                        <div className="h3" style={{ marginBottom: 4 }}>Importer des fichiers audio</div>
                        <p className="sub">WAV, MP3, FLAC, OGG acceptés. Max 10 GB par upload.</p>
                      </div>
                      <div
                        onDragEnter={() => setDragging(true)} onDragLeave={() => setDragging(false)}
                        onDragOver={e => e.preventDefault()} onDrop={() => setDragging(false)}
                        onClick={() => fileRef.current?.click()}
                        style={{ border: `2px dashed ${dragging ? 'var(--accent)' : 'var(--bdr)'}`, borderRadius: 14, padding: '40px 24px', textAlign: 'center', cursor: 'pointer', transition: 'all .2s', background: dragging ? 'rgba(59,111,232,.04)' : 'transparent' }}>
                        <input ref={fileRef} type="file" accept="audio/*" multiple style={{ display: 'none' }} />
                        <Upload size={32} color="var(--t3)" style={{ margin: '0 auto 12px' }} />
                        <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--t1)', margin: '0 0 4px' }}>Glissez vos fichiers ici</p>
                        <p style={{ fontSize: 13, color: 'var(--t3)', margin: 0 }}>ou cliquez pour parcourir</p>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                        {[['Nom du dataset', 'CamerMusic-Custom'], ['Licence', 'CC BY 4.0'], ['Visibilité', 'Public'], ['Description', '']].map(([l, ph]) => (
                          <div key={l} style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                            <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--t2)' }}>{l}</label>
                            {l === 'Visibilité' ? (
                              <select className="input"><option>Public</option><option>Privé</option></select>
                            ) : l === 'Description' ? (
                              <textarea className="input" placeholder="Description optionnelle…" style={{ minHeight: 60, gridColumn: 'span 2' }} />
                            ) : (
                              <input className="input" defaultValue={ph} />
                            )}
                          </div>
                        ))}
                      </div>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button className="btn btn-primary btn-sm"><Upload size={13} />Importer le dataset</button>
                        <button className="btn btn-ghost btn-sm"><Mic size={13} />Enregistrer en direct</button>
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
