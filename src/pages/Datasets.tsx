import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Database, Search, Plus, FileAudio, BarChart3, Clock, CheckCircle2,
  ChevronRight, Download, Share2, Activity, Star, MessageSquare,
  Check, Filter, Upload, Layers, Tag, Users, Globe, Lock,
  TrendingUp, BarChart2, Cpu, Zap, Info, X, ThumbsUp
} from 'lucide-react';

const DATASETS = [
  {
    id: 'd1', name: 'UrbanSound8K', owner: 'Salamon et al.', license: 'CC BY 4.0', public: true,
    size: '5.6 GB', samples: 8732, classes: 10, sr: '22 kHz', format: 'WAV', duration: '8.75h',
    status: 'Ready', created: 'Jan 2024', updated: '2h ago',
    description: 'Jeu de données de sons urbains classifiés en 10 catégories. Référence pour la classification audio en milieu urbain.',
    tags: ['Urbain', 'Environnement', 'Multi-classe'],
    color: '#2563eb', colorLight: 'rgba(37,99,235,0.1)',
    rating: 4.8, reviews: 234, downloads: 12400,
    classNames: ['Air Conditioner','Car Horn','Children Playing','Dog Bark','Drilling','Engine Idling','Gun Shot','Jackhammer','Siren','Street Music'],
    metrics: { minDur: '0.1s', maxDur: '4.0s', avgDur: '3.8s', snr: '28dB', balance: 87 },
    reviews_data: [
      { author: 'Yannick T.', text: 'Dataset de référence absolue. Très bien équilibré et propre.', stars: 5, date: 'Fév 2025' },
      { author: 'Amara K.', text: 'Quelques artefacts dans les fichiers CAR_HORN mais globalement excellent.', stars: 4, date: 'Jan 2025' },
    ]
  },
  {
    id: 'd2', name: 'ESC-50', owner: 'Piczak', license: 'CC BY-NC 3.0', public: true,
    size: '600 MB', samples: 2000, classes: 50, sr: '44.1 kHz', format: 'WAV', duration: '2.8h',
    status: 'Ready', created: 'Nov 2023', updated: '1 day ago',
    description: '50 classes de sons environnementaux organisées en 5 macrocatégories : animaux, nature, humains, intérieur, extérieur.',
    tags: ['Environnement', 'Multi-classe', 'Référence'],
    color: '#10b981', colorLight: 'rgba(16,185,129,0.1)',
    rating: 4.6, reviews: 156, downloads: 8900,
    classNames: ['Chien','Coq','Pluie','Mer','Feu','Bébé','Voiture','Hélicoptère','Sonnette','Pas','Toux','Rire','Brosse à dent','Horloge','Clavier','Cafetière','Chat','Oiseaux','Grenouilles','Insectes','Moutons','Vache','Ruisseau','Feu de camp','Cricket','Robinet','Scie','Tondeuse','Aspirateur','Montre','Radio','Téléphone','Église','Train','Moteur','Klaxon','Chainsaw','Avion','Feux d\'artifice','Hélicoptère 2','Pétard','Vent','Orage','Vagues','Ruisseau 2','Grillon 2','Brochet','Coq 2','Chien 2','Baleine'].slice(0,50),
    metrics: { minDur: '5.0s', maxDur: '5.0s', avgDur: '5.0s', snr: '32dB', balance: 100 },
    reviews_data: [
      { author: 'Claire M.', text: 'Parfait équilibre entre classes. Idéal pour le benchmark.', stars: 5, date: 'Mars 2025' },
    ]
  },
  {
    id: 'd3', name: 'FreeSound Custom', owner: 'Moi', license: 'Privé', public: false,
    size: '320 MB', samples: 1200, classes: 12, sr: '44.1 kHz', format: 'MP3', duration: '1.2h',
    status: 'Processing', created: 'Mars 2025', updated: 'Just now',
    description: 'Dataset personnalisé constitué d\'enregistrements de terrain. Sons industriels et mécaniques annotés manuellement.',
    tags: ['Industrie', 'Custom', 'Privé'],
    color: '#f59e0b', colorLight: 'rgba(245,158,11,0.1)',
    rating: 0, reviews: 0, downloads: 0,
    classNames: ['Moteur OK','Roulement défaut','Cavitation','Vibration','Pompe OK','Compresseur','Engrenage','Bruit fond','Sifflement','Cliquetis','Grincement','Anomalie'],
    metrics: { minDur: '1.0s', maxDur: '10.0s', avgDur: '3.6s', snr: '22dB', balance: 72 },
    reviews_data: []
  },
  {
    id: 'd4', name: 'GTZAN Genre', owner: 'Tzanetakis', license: 'Academic', public: true,
    size: '1.2 GB', samples: 1000, classes: 10, sr: '22.05 kHz', format: 'WAV', duration: '8.3h',
    status: 'Ready', created: 'Oct 2023', updated: '3 days ago',
    description: 'Collection de 10 genres musicaux, 100 pistes de 30 secondes chacune. Standard en classification musicale.',
    tags: ['Musique', 'Genre', 'Référence'],
    color: '#7c3aed', colorLight: 'rgba(124,58,237,0.1)',
    rating: 4.3, reviews: 89, downloads: 5600,
    classNames: ['Blues','Classical','Country','Disco','HipHop','Jazz','Metal','Pop','Reggae','Rock'],
    metrics: { minDur: '30s', maxDur: '30s', avgDur: '30s', snr: '35dB', balance: 100 },
    reviews_data: [
      { author: 'Thomas B.', text: 'Dataset historique mais toujours valide pour le benchmark.', stars: 4, date: 'Fév 2025' },
    ]
  },
];

function StatusBadge({ status }: { status: string }) {
  const map: Record<string,string> = { Ready: 'badge-green', Processing: 'badge-yellow', Error: 'badge-red' };
  const dot: Record<string,string> = { Ready: '#10b981', Processing: '#f59e0b', Error: '#ef4444' };
  return (
    <span className={`badge ${map[status] ?? 'badge-blue'}`}>
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: dot[status] }} />
      {status}
    </span>
  );
}

function MetricBox({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div className="rounded-xl p-3 text-center border" style={{ background: 'var(--bg-1)', borderColor: 'var(--border)' }}>
      <div className="font-display font-bold text-lg" style={{ color: 'var(--text)' }}>{value}</div>
      <div className="text-[10px] font-mono uppercase tracking-wide mt-0.5" style={{ color: 'var(--text-3)' }}>{label}</div>
      {sub && <div className="text-[10px]" style={{ color: 'var(--text-3)' }}>{sub}</div>}
    </div>
  );
}

function StarRating({ v, onChange }: { v: number; onChange?: (n: number) => void }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(n => (
        <button key={n} onMouseEnter={() => setHover(n)} onMouseLeave={() => setHover(0)} onClick={() => onChange?.(n)} className={onChange ? 'cursor-pointer' : 'cursor-default'}>
          <Star size={14} className={n <= (hover || v) ? 'fill-current text-warm' : ''} style={{ color: n <= (hover || v) ? '#f59e0b' : 'var(--border)' }} />
        </button>
      ))}
    </div>
  );
}

export const Datasets: React.FC = () => {
  const [selected, setSelected] = useState(DATASETS[0]);
  const [tab, setTab] = useState<'overview'|'classes'|'reviews'>('overview');
  const [search, setSearch] = useState('');
  const [reviewStars, setReviewStars] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [reviewSent, setReviewSent] = useState(false);
  const [showUpload, setShowUpload] = useState(false);

  const filtered = DATASETS.filter(d => d.name.toLowerCase().includes(search.toLowerCase()));

  const submitReview = () => {
    if (!reviewStars || !reviewText.trim()) return;
    setReviewSent(true);
    setTimeout(() => { setReviewSent(false); setReviewStars(0); setReviewText(''); }, 2500);
  };

  return (
    <div className="animate-fade-in space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Database size={16} style={{ color: '#2563eb' }} />
            <span className="section-label">Datasets Audio</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold" style={{ color: 'var(--text)' }}>
            Bibliothèque de <span style={{ color: '#2563eb' }}>Données</span>
          </h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-3)' }}>{DATASETS.length} datasets · {DATASETS.reduce((a,d)=>a+d.samples,0).toLocaleString()} échantillons au total</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <button onClick={() => setShowUpload(true)} className="btn-ghost text-sm py-2 px-4 gap-2"><Filter size={14} />Filtrer</button>
          <button className="btn-primary text-sm py-2 px-4 gap-2"><Plus size={14} />Importer</button>
        </div>
      </div>

      {/* Upload modal */}
      <AnimatePresence>
        {showUpload && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[80] flex items-center justify-center p-4"
            onClick={() => setShowUpload(false)}>
            <motion.div initial={{ scale: .9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: .9, y: 20 }}
              onClick={e => e.stopPropagation()}
              className="w-full max-w-md rounded-2xl p-6 space-y-4 border" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
              <div className="flex items-center justify-between">
                <p className="font-display font-bold text-lg" style={{ color: 'var(--text)' }}>Importer un Dataset</p>
                <button onClick={() => setShowUpload(false)} className="p-1 rounded-lg hover:bg-[var(--bg-1)]" style={{ color: 'var(--text-3)' }}><X size={16} /></button>
              </div>
              <div className="border-2 border-dashed rounded-xl p-8 text-center cursor-pointer hover:border-electric transition-colors" style={{ borderColor: 'var(--border)' }}>
                <Upload size={28} className="mx-auto mb-3" style={{ color: 'var(--text-3)' }} />
                <p className="text-sm font-semibold" style={{ color: 'var(--text)' }}>Glissez vos fichiers ici</p>
                <p className="text-xs mt-1" style={{ color: 'var(--text-3)' }}>WAV, MP3, FLAC, ZIP acceptés · Max 10 GB</p>
              </div>
              {[['Nom du dataset','Mon dataset'],['Licence','CC BY 4.0'],['Visibilité','Public']].map(([lbl, ph]) => (
                <div key={lbl} className="space-y-1">
                  <label className="text-xs font-semibold" style={{ color: 'var(--text-2)' }}>{lbl}</label>
                  <input className="input-base" placeholder={ph} />
                </div>
              ))}
              <button className="btn-primary w-full py-2.5 text-sm gap-2"><Upload size={14} />Importer</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main layout */}
      <div className="flex flex-col xl:flex-row gap-4">
        {/* List */}
        <div className="xl:w-72 shrink-0 space-y-3">
          <div className="flex items-center gap-2 rounded-xl px-3 py-2 border" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
            <Search size={14} style={{ color: 'var(--text-3)' }} />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Rechercher…"
              className="bg-transparent text-sm outline-none w-full" style={{ color: 'var(--text)', fontFamily: "'Space Grotesk',sans-serif" }} />
          </div>
          {filtered.map((ds, i) => (
            <motion.button key={ds.id} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * .05 }}
              onClick={() => { setSelected(ds); setTab('overview'); }}
              className="w-full text-left rounded-2xl p-4 border transition-all"
              style={{
                background: selected.id === ds.id ? ds.colorLight : 'var(--bg-card)',
                borderColor: selected.id === ds.id ? ds.color : 'var(--border)',
                boxShadow: selected.id === ds.id ? `0 0 0 2px ${ds.color}25, 0 4px 16px rgba(0,0,0,.08)` : undefined,
              }}>
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs font-bold shrink-0" style={{ background: ds.color }}>
                  <FileAudio size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 flex-wrap">
                    <span className="font-display font-bold text-sm truncate" style={{ color: 'var(--text)' }}>{ds.name}</span>
                    <StatusBadge status={ds.status} />
                  </div>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <span className="text-[10px] font-mono" style={{ color: 'var(--text-3)' }}>{ds.samples.toLocaleString()} samples</span>
                    <span className="text-[10px]" style={{ color: 'var(--border)' }}>·</span>
                    <span className="text-[10px] font-mono" style={{ color: 'var(--text-3)' }}>{ds.classes} classes</span>
                    {!ds.public && <Lock size={10} style={{ color: 'var(--text-3)' }} />}
                  </div>
                  {ds.rating > 0 && (
                    <div className="flex items-center gap-1 mt-1">
                      <Star size={10} className="fill-current" style={{ color: '#f59e0b' }} />
                      <span className="text-[10px]" style={{ color: 'var(--text-3)' }}>{ds.rating} ({ds.reviews})</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Detail */}
        <AnimatePresence mode="wait">
          <motion.div key={selected.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="flex-1 min-w-0 rounded-2xl border overflow-hidden" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>

            {/* Hero */}
            <div className="relative p-5 sm:p-6 overflow-hidden" style={{ background: selected.colorLight }}>
              <div className="absolute inset-0 opacity-20" style={{ background: `radial-gradient(ellipse at 80% 0%, ${selected.color}, transparent 70%)` }} />
              <div className="relative flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white shrink-0" style={{ background: selected.color }}>
                      <FileAudio size={16} />
                    </div>
                    <span className="section-label">{selected.owner}</span>
                    <StatusBadge status={selected.status} />
                    {selected.public ? <span className="badge badge-blue"><Globe size={9} />Public</span> : <span className="badge badge-yellow"><Lock size={9} />Privé</span>}
                  </div>
                  <h2 className="font-display text-2xl font-bold" style={{ color: 'var(--text)' }}>{selected.name}</h2>
                  <p className="text-sm mt-1 max-w-xl" style={{ color: 'var(--text-2)' }}>{selected.description}</p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {selected.tags.map(t => (
                      <span key={t} className="text-[10px] font-semibold px-2 py-0.5 rounded-full border"
                        style={{ borderColor: selected.color + '50', color: selected.color, background: selected.color + '15' }}>{t}</span>
                    ))}
                  </div>
                </div>
                {/* Quick stats */}
                <div className="grid grid-cols-3 sm:grid-cols-1 gap-2 shrink-0 sm:text-right">
                  {[
                    { v: selected.samples.toLocaleString(), l: 'Samples' },
                    { v: selected.classes, l: 'Classes' },
                    { v: selected.size, l: 'Taille' },
                  ].map(s => (
                    <div key={s.l}>
                      <div className="font-display font-bold text-xl" style={{ color: selected.color }}>{s.v}</div>
                      <div className="section-label">{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Waveform deco */}
              <div className="flex items-end gap-[2px] h-10 mt-4 opacity-50">
                {[...Array(40)].map((_, i) => (
                  <motion.div key={i} animate={{ scaleY: [0.1, 0.3 + Math.random() * 0.9, 0.1] }}
                    transition={{ duration: .7 + i * .04, repeat: Infinity, ease: 'easeInOut' }}
                    className="flex-1 rounded-full origin-bottom" style={{ background: selected.color, height: '100%' }} />
                ))}
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b" style={{ borderColor: 'var(--border)' }}>
              {(['overview','classes','reviews'] as const).map(t => (
                <button key={t} onClick={() => setTab(t)}
                  className={`flex-1 py-3 text-xs font-semibold uppercase tracking-wide transition-all border-b-2 ${tab === t ? 'tab-active' : 'border-transparent'}`}
                  style={{ color: tab === t ? '#2563eb' : 'var(--text-3)' }}>
                  {t === 'overview' ? 'Aperçu' : t === 'classes' ? `Classes (${selected.classes})` : `Avis (${selected.reviews})`}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="p-5 sm:p-6 overflow-y-auto" style={{ maxHeight: 580 }}>
              <AnimatePresence mode="wait">
                <motion.div key={tab} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>

                  {tab === 'overview' && (
                    <div className="space-y-5">
                      {/* Metric grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                        <MetricBox label="Samples" value={selected.samples.toLocaleString()} />
                        <MetricBox label="Classes" value={selected.classes} />
                        <MetricBox label="Durée totale" value={selected.duration} />
                        <MetricBox label="Taille" value={selected.size} />
                        <MetricBox label="Sample Rate" value={selected.sr} />
                        <MetricBox label="Format" value={selected.format} />
                        <MetricBox label="Durée min" value={selected.metrics.minDur} />
                        <MetricBox label="Durée max" value={selected.metrics.maxDur} />
                        <MetricBox label="Durée moy." value={selected.metrics.avgDur} />
                        <MetricBox label="SNR moyen" value={selected.metrics.snr} />
                        <MetricBox label="Téléchargements" value={selected.downloads.toLocaleString()} />
                        <MetricBox label="Licence" value={selected.license} />
                      </div>

                      {/* Balance bar */}
                      <div className="rounded-xl p-4 border space-y-2" style={{ background: 'var(--bg-1)', borderColor: 'var(--border)' }}>
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-semibold" style={{ color: 'var(--text)' }}>Équilibre des classes</span>
                          <span className="font-mono font-bold" style={{ color: selected.metrics.balance >= 90 ? '#10b981' : selected.metrics.balance >= 70 ? '#f59e0b' : '#ef4444' }}>
                            {selected.metrics.balance}%
                          </span>
                        </div>
                        <div className="h-2 rounded-full overflow-hidden" style={{ background: 'var(--bg-2)' }}>
                          <motion.div className="h-full rounded-full"
                            initial={{ width: 0 }} animate={{ width: selected.metrics.balance + '%' }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                            style={{ background: selected.metrics.balance >= 90 ? '#10b981' : selected.metrics.balance >= 70 ? '#f59e0b' : '#ef4444' }} />
                        </div>
                        <p className="text-[10px]" style={{ color: 'var(--text-3)' }}>
                          {selected.metrics.balance >= 90 ? '✓ Très bien équilibré' : selected.metrics.balance >= 70 ? '⚠ Léger déséquilibre — envisager du data augmentation' : '✗ Déséquilibre significatif — data augmentation recommandée'}
                        </p>
                      </div>

                      {/* Timeline */}
                      <div className="flex items-center gap-4 text-sm" style={{ color: 'var(--text-3)' }}>
                        <Clock size={14} />
                        <span>Créé le <strong style={{ color: 'var(--text)' }}>{selected.created}</strong></span>
                        <span>·</span>
                        <span>Mis à jour <strong style={{ color: 'var(--text)' }}>{selected.updated}</strong></span>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 flex-wrap pt-1">
                        <button className="btn-primary text-sm py-2 px-4 gap-2"><Download size={14} />Télécharger</button>
                        <button className="btn-ghost text-sm py-2 px-4 gap-2"><Share2 size={14} />Partager</button>
                        <button className="btn-ghost text-sm py-2 px-4 gap-2"><Zap size={14} />Utiliser pour l'entraînement</button>
                      </div>
                    </div>
                  )}

                  {tab === 'classes' && (
                    <div className="space-y-4">
                      <p className="text-sm" style={{ color: 'var(--text-3)' }}>{selected.classes} classes de sortie disponibles.</p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {selected.classNames.map((cls, i) => {
                          const count = Math.floor(selected.samples / selected.classes * (0.8 + Math.random() * 0.4));
                          const pct = Math.round(count / selected.samples * 100);
                          return (
                            <motion.div key={cls} initial={{ opacity: 0, scale: .9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * .02 }}
                              className="rounded-xl p-3 border space-y-2" style={{ background: 'var(--bg-1)', borderColor: 'var(--border)' }}>
                              <div className="flex items-center justify-between gap-1">
                                <div className="flex items-center gap-2">
                                  <div className="w-5 h-5 rounded-lg flex items-center justify-center text-white text-[9px] font-bold shrink-0" style={{ background: selected.color }}>
                                    {i + 1}
                                  </div>
                                  <span className="text-xs font-semibold truncate" style={{ color: 'var(--text)' }}>{cls}</span>
                                </div>
                                <span className="text-[10px] font-mono shrink-0" style={{ color: 'var(--text-3)' }}>{pct}%</span>
                              </div>
                              <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--bg-2)' }}>
                                <div className="h-full rounded-full" style={{ background: selected.color, width: pct + '%' }} />
                              </div>
                              <p className="text-[9px] font-mono" style={{ color: 'var(--text-3)' }}>{count} samples</p>
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {tab === 'reviews' && (
                    <div className="space-y-5">
                      {/* Summary */}
                      {selected.rating > 0 && (
                        <div className="flex items-center gap-5 p-4 rounded-xl border" style={{ background: 'var(--bg-1)', borderColor: 'var(--border)' }}>
                          <div className="text-center">
                            <div className="font-display text-4xl font-bold" style={{ color: 'var(--text)' }}>{selected.rating}</div>
                            <StarRating v={selected.rating} />
                            <div className="text-xs mt-1" style={{ color: 'var(--text-3)' }}>{selected.reviews} avis</div>
                          </div>
                          <div className="flex-1 space-y-1.5">
                            {[5,4,3,2,1].map(n => (
                              <div key={n} className="flex items-center gap-2">
                                <span className="text-[10px] w-3" style={{ color: 'var(--text-3)' }}>{n}</span>
                                <Star size={9} className="fill-current" style={{ color: '#f59e0b' }} />
                                <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--bg-2)' }}>
                                  <div className="h-full rounded-full bg-warm" style={{ width: n === 5 ? '60%' : n === 4 ? '25%' : n === 3 ? '10%' : '5%' }} />
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="flex items-center gap-2">
                            <Download size={14} style={{ color: 'var(--text-3)' }} />
                            <span className="text-sm font-bold" style={{ color: 'var(--text)' }}>{selected.downloads.toLocaleString()}</span>
                            <span className="text-xs" style={{ color: 'var(--text-3)' }}>téléchargements</span>
                          </div>
                        </div>
                      )}

                      {/* Reviews list */}
                      {selected.reviews_data.length > 0 ? (
                        <div className="space-y-3">
                          {selected.reviews_data.map((r, i) => (
                            <div key={i} className="rounded-xl p-4 border space-y-2" style={{ background: 'var(--bg-1)', borderColor: 'var(--border)' }}>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold" style={{ background: 'linear-gradient(135deg,#2563eb,#7c3aed)' }}>{r.author[0]}</div>
                                  <span className="text-sm font-semibold" style={{ color: 'var(--text)' }}>{r.author}</span>
                                </div>
                                <StarRating v={r.stars} />
                              </div>
                              <p className="text-sm" style={{ color: 'var(--text-3)' }}>{r.text}</p>
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] font-mono" style={{ color: 'var(--text-3)' }}>{r.date}</span>
                                <button className="flex items-center gap-1 text-[10px] hover:text-electric transition-colors" style={{ color: 'var(--text-3)' }}>
                                  <ThumbsUp size={11} /> Utile
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8" style={{ color: 'var(--text-3)' }}>
                          <MessageSquare size={28} className="mx-auto mb-2 opacity-40" />
                          <p className="text-sm">Aucun avis pour l'instant. Soyez le premier !</p>
                        </div>
                      )}

                      {/* Add review */}
                      <div className="rounded-xl p-4 border space-y-3" style={{ background: 'var(--bg-1)', borderColor: 'var(--border)' }}>
                        <p className="text-sm font-bold" style={{ color: 'var(--text)' }}>Laisser un avis</p>
                        <StarRating v={reviewStars} onChange={setReviewStars} />
                        <textarea className="w-full rounded-xl p-3 text-sm border outline-none resize-none"
                          style={{ background: 'var(--bg-card)', borderColor: 'var(--border)', color: 'var(--text)', minHeight: 72, fontFamily: "'Space Grotesk',sans-serif" }}
                          placeholder="Votre expérience avec ce dataset…"
                          value={reviewText} onChange={e => setReviewText(e.target.value)} />
                        <div className="flex justify-end">
                          <button onClick={submitReview} className="btn-primary text-sm py-2 px-4 gap-2">
                            {reviewSent ? <><Check size={14} />Publié !</> : <><MessageSquare size={14} />Publier</>}
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
