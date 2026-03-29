import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Briefcase, Star, Download, Play, ChevronRight, Database,
  Cpu, BarChart2, Tag, Users, Calendar, Shield, Zap,
  Music, Activity, Heart, Sprout, Globe, ArrowUpRight,
  Check, X, Info, MessageSquare, ThumbsUp, Eye
} from 'lucide-react';

/* ─── Data ──────────────────────────────────────────────────────────── */

const CATEGORIES = [
  { id: 'all',         label: 'Tous',        icon: Globe },
  { id: 'music',       label: 'Musique',     icon: Music },
  { id: 'medical',     label: 'Médical',     icon: Heart },
  { id: 'industrial',  label: 'Industrie',   icon: Activity },
  { id: 'agriculture', label: 'Agriculture', icon: Sprout },
];

const PORTFOLIOS = [
  {
    id: 'p1',
    name: 'AfroBeatsID',
    tagline: 'Identifiez chaque genre en 200ms',
    description: 'Classification haute fidélité de genres musicaux africains (Makossa, Afrobeats, Amapiano, Zoblazo, Ndombolo). Analyse rythmique et spectrale de pointe.',
    category: 'music',
    accuracy: 91.2, f1: 89.5, precision: 90.1, recall: 89.0,
    dataset: 'AfricoSound-8K', datasetSize: '8 732 samples', classes: 10,
    embedding: 'MFCC + Mel Spectrogram', model: 'CNN ResNet-18',
    author: 'KultureAI', authorAvatar: 'K', rating: 4.8, reviews: 512,
    price: 0, deployments: 3240, lastUpdate: 'Mars 2025',
    tags: ['Musique', 'Culture', 'Afrique', 'Temps réel'],
    color: '#f59e0b', colorLight: 'rgba(245,158,11,0.12)',
    outputClasses: ['Makossa','Afrobeats','Amapiano','Zoblazo','Ndombolo','Highlife','Afro-jazz','Bongo Flava','Coupé-décalé','Fuji'],
    models: [
      { name: 'GenreNet-CNN', accuracy: 91.2, f1: 89.5, size: '24 MB', latency: '18ms' },
      { name: 'RhythmLSTM', accuracy: 88.7, f1: 86.9, size: '12 MB', latency: '32ms' },
    ]
  },
  {
    id: 'p2',
    name: 'VibraPredict',
    tagline: 'Maintenance prédictive avant la panne',
    description: 'Détection précoce des anomalies de roulements et moteurs industriels. Réduit les pannes non planifiées de 78% en production réelle.',
    category: 'industrial',
    accuracy: 95.4, f1: 94.1, precision: 95.8, recall: 93.5,
    dataset: 'InduSound-Pro', datasetSize: '42 000 samples', classes: 8,
    embedding: 'PANNs + Mel Spectrogram', model: 'Transformer',
    author: 'IndusTech', authorAvatar: 'I', rating: 4.5, reviews: 128,
    price: 50, deployments: 890, lastUpdate: 'Fév. 2025',
    tags: ['Industrie', 'IoT', 'Maintenance', 'Edge'],
    color: '#0d7fea', colorLight: 'rgba(13,127,234,0.12)',
    outputClasses: ['Roulement OK','Roulement défaut','Moteur OK','Surcharge','Cavitation','Déséquilibre','Résonance','Lubrification'],
    models: [
      { name: 'VibTransformer', accuracy: 95.4, f1: 94.1, size: '48 MB', latency: '22ms' },
      { name: 'VibCNN-Lite', accuracy: 91.2, f1: 90.0, size: '8 MB', latency: '8ms' },
    ]
  },
  {
    id: 'p3',
    name: 'RespiDiag-Pro',
    tagline: 'Détection respiratoire certifiée CE',
    description: 'Diagnostic assisté des pathologies respiratoires par analyse de toux. Détection de COVID-19, Asthme, Pneumonie et Bronchite avec une précision clinique.',
    category: 'medical',
    accuracy: 92.8, f1: 92.0, precision: 93.2, recall: 91.8,
    dataset: 'MedCough-Global', datasetSize: '18 500 samples', classes: 6,
    embedding: 'Wav2Vec 2.0', model: 'CNN + Attention',
    author: 'HealthSound', authorAvatar: 'H', rating: 4.9, reviews: 342,
    price: 0, deployments: 12400, lastUpdate: 'Jan. 2025',
    tags: ['Santé', 'Médical', 'IA', 'CE Certifié'],
    color: '#10b981', colorLight: 'rgba(16,185,129,0.12)',
    outputClasses: ['Sain','COVID-19','Asthme','Pneumonie','Bronchite','BPCO'],
    models: [
      { name: 'RespiNet-XL', accuracy: 92.8, f1: 92.0, size: '64 MB', latency: '45ms' },
      { name: 'CoughBERT', accuracy: 90.1, f1: 89.5, size: '128 MB', latency: '95ms' },
      { name: 'RespiNet-Lite', accuracy: 87.3, f1: 86.0, size: '6 MB', latency: '9ms' },
    ]
  },
  {
    id: 'p4',
    name: 'BabyCry-AI',
    tagline: 'Comprenez chaque pleur de votre bébé',
    description: "Traducteur de pleurs de nourrissons. Identifie avec précision : Faim, Sommeil, Couche sale, Coliques ou Besoin de câlin. Validé par 890 parents.",
    category: 'medical',
    accuracy: 89.7, f1: 88.4, precision: 89.0, recall: 87.8,
    dataset: 'CryCorpus-5K', datasetSize: '5 200 samples', classes: 5,
    embedding: 'MFCC + VGGish', model: 'LSTM + CNN',
    author: 'BabyCare Tech', authorAvatar: 'B', rating: 4.7, reviews: 890,
    price: 0, deployments: 15600, lastUpdate: 'Mars 2025',
    tags: ['Pédiatrie', 'Parentalité', 'Mobile', 'Offline'],
    color: '#7c3aed', colorLight: 'rgba(124,58,237,0.12)',
    outputClasses: ['Faim','Sommeil','Couche sale','Coliques','Câlin'],
    models: [
      { name: 'CryNet', accuracy: 89.7, f1: 88.4, size: '18 MB', latency: '12ms' },
    ]
  },
  {
    id: 'p5',
    name: 'AgriSound-X',
    tagline: 'Détectez les parasites avant quils détruisent',
    description: "Détection précoce de parasites dans les cultures par analyse sonore. Identifie le bruit de mastication des insectes ravageurs avec une précision de terrain.",
    category: 'agriculture',
    accuracy: 88.5, f1: 87.2, precision: 88.9, recall: 86.5,
    dataset: 'BugSound-Agri', datasetSize: '6 100 samples', classes: 7,
    embedding: 'CLAP', model: 'CNN + RNN',
    author: 'AgriAI', authorAvatar: 'A', rating: 4.2, reviews: 96,
    price: 25, deployments: 420, lastUpdate: 'Fév. 2025',
    tags: ['Agriculture', 'SmartFarming', 'IoT', 'Edge'],
    color: '#06b6d4', colorLight: 'rgba(6,182,212,0.12)',
    outputClasses: ['Sain','Criquet','Chenille','Doryphore','Puceron','Cochenille','Thrips'],
    models: [
      { name: 'BugNet-Field', accuracy: 88.5, f1: 87.2, size: '22 MB', latency: '28ms' },
      { name: 'BugNet-Edge', accuracy: 84.1, f1: 82.8, size: '4 MB', latency: '6ms' },
    ]
  },
];

/* ─── Subcomponents ─────────────────────────────────────────────────── */

function WaveformDecor({ color }: { color: string }) {
  return (
    <div className="flex items-end gap-[3px] h-8">
      {[...Array(20)].map((_, i) => (
        <motion.div key={i}
          animate={{ scaleY: [0.2, 0.6 + Math.random() * 0.8, 0.2] }}
          transition={{ duration: 0.8 + i * 0.06, repeat: Infinity, ease: 'easeInOut' }}
          className="w-1 rounded-full origin-bottom"
          style={{ background: color, height: '100%' }}
        />
      ))}
    </div>
  );
}

function AccuracyRing({ value, color }: { value: number; color: string }) {
  const r = 36, c = 2 * Math.PI * r;
  return (
    <div className="relative w-24 h-24">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 96 96">
        <circle cx="48" cy="48" r={r} fill="none" stroke="var(--bg-2)" strokeWidth="8" />
        <motion.circle cx="48" cy="48" r={r} fill="none" stroke={color} strokeWidth="8"
          strokeLinecap="round" strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: c - (value / 100) * c }}
          transition={{ duration: 1.5, ease: 'easeOut' }} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xl font-display font-bold" style={{ color }}>{value}%</span>
        <span className="text-[9px] font-mono" style={{ color: 'var(--text-3)' }}>ACC</span>
      </div>
    </div>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1,2,3,4,5].map(i => (
        <Star key={i} size={12} className={i <= Math.floor(rating) ? 'fill-current text-warm' : 'text-[var(--border)]'} />
      ))}
      <span className="text-xs font-bold ml-1" style={{ color: 'var(--text-2)' }}>{rating}</span>
    </div>
  );
}

function ReviewCard({ author, text, stars, date }: any) {
  return (
    <div className="rounded-xl p-4 border" style={{ background: 'var(--bg-1)', borderColor: 'var(--border)' }}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold"
            style={{ background: 'linear-gradient(135deg,#0d7fea,#7c3aed)' }}>{author[0]}</div>
          <span className="text-sm font-semibold" style={{ color: 'var(--text)' }}>{author}</span>
        </div>
        <div className="flex gap-0.5">
          {[...Array(5)].map((_,i) => <Star key={i} size={10} className={i < stars ? 'fill-current text-warm' : 'text-[var(--border)]'} />)}
        </div>
      </div>
      <p className="text-sm leading-relaxed" style={{ color: 'var(--text-3)' }}>{text}</p>
      <p className="text-xs mt-2 font-mono" style={{ color: 'var(--text-3)' }}>{date}</p>
    </div>
  );
}

const MOCK_REVIEWS: Record<string, any[]> = {
  p1: [
    { author: 'Yannick T.', text: 'Précision bluffante sur le Makossa. Intégré en production depuis 3 mois, aucune dérive.', stars: 5, date: 'Jan 2025' },
    { author: 'Amara K.', text: 'Très bon modèle, quelques erreurs sur le Fuji mais globalement excellent.', stars: 4, date: 'Fév 2025' },
  ],
  p2: [
    { author: 'Jean-Marc D.', text: 'Réduit nos alertes de maintenance de 68%. ROI en 2 mois.', stars: 5, date: 'Mars 2025' },
  ],
  p3: [
    { author: 'Dr. Ngo S.', text: 'Utilisé en screening initial. Très bon rappel sur COVID. Certifié CE est un plus.', stars: 5, date: 'Fév 2025' },
    { author: 'Claire M.', text: 'Intégration API simple. Latence acceptable pour notre workflow clinique.', stars: 4, date: 'Jan 2025' },
  ],
  p4: [
    { author: 'Sophie R.', text: 'Miracle ! Mon bébé de 3 mois, l\'app distingue faim vs coliques avec 85% de précision.', stars: 5, date: 'Mars 2025' },
    { author: 'Thomas B.', text: 'Utile la nuit. Parfois confond sommeil et câlin mais toujours pertinent.', stars: 4, date: 'Fév 2025' },
  ],
  p5: [
    { author: 'Diallo F.', text: 'Détecte les criquets 48h avant visible à l\'oeil nu. Économisé 2 récoltes.', stars: 5, date: 'Jan 2025' },
  ],
};

/* ─── Main Page ──────────────────────────────────────────────────────── */

export const Portfolios: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedId, setSelectedId] = useState<string | null>('p1');
  const [detailTab, setDetailTab] = useState<'overview' | 'models' | 'classes' | 'reviews'>('overview');
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const filtered = PORTFOLIOS.filter(p => activeCategory === 'all' || p.category === activeCategory);
  const selected = PORTFOLIOS.find(p => p.id === selectedId);

  const handleSubmitReview = () => {
    if (!userRating || !reviewText.trim()) return;
    setReviewSubmitted(true);
    setTimeout(() => setReviewSubmitted(false), 3000);
    setUserRating(0); setReviewText('');
  };

  return (
    <div className="animate-fade-in space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Briefcase size={18} style={{ color: '#0d7fea' }} />
            <span className="text-xs font-mono uppercase tracking-widest" style={{ color: 'var(--text-3)' }}>Portefeuilles</span>
          </div>
          <h1 className="font-display text-3xl font-bold" style={{ color: 'var(--text)' }}>
            Galerie de Modèles <span style={{ color: '#0d7fea' }}>Audio</span>
          </h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-3)' }}>
            {PORTFOLIOS.length} portefeuilles · {PORTFOLIOS.reduce((a,p)=>a+p.models.length,0)} modèles entraînés
          </p>
        </div>
        <div className="flex items-center gap-2 p-1 rounded-xl border" style={{ background: 'var(--bg-1)', borderColor: 'var(--border)' }}>
          {CATEGORIES.map(cat => (
            <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
              style={activeCategory === cat.id
                ? { background: '#0d7fea', color: '#fff', boxShadow: '0 2px 8px rgba(13,127,234,.4)' }
                : { color: 'var(--text-3)' }}>
              <cat.icon size={12} />
              <span className="hidden sm:inline">{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main grid */}
      <div className="flex flex-col xl:flex-row gap-5">

        {/* Cards list */}
        <div className="xl:w-80 shrink-0 space-y-3">
          <AnimatePresence>
            {filtered.map((p, i) => (
              <motion.button key={p.id}
                initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                onClick={() => { setSelectedId(p.id); setDetailTab('overview'); }}
                className={`w-full text-left rounded-2xl p-4 border transition-all ${selectedId === p.id ? 'shadow-lg' : 'hover:shadow-md'}`}
                style={{
                  background: selectedId === p.id ? p.colorLight : 'var(--bg-card)',
                  borderColor: selectedId === p.id ? p.color : 'var(--border)',
                  boxShadow: selectedId === p.id ? `0 0 0 2px ${p.color}33, 0 8px 24px rgba(0,0,0,.08)` : undefined,
                }}>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-bold shrink-0"
                    style={{ background: p.color }}>{p.authorAvatar}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-display font-bold text-sm" style={{ color: 'var(--text)' }}>{p.name}</span>
                      {p.price === 0
                        ? <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: 'rgba(16,185,129,0.15)', color: '#10b981' }}>Gratuit</span>
                        : <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: 'rgba(13,127,234,0.15)', color: '#0d7fea' }}>{p.price}€/mois</span>}
                    </div>
                    <p className="text-xs mt-0.5 truncate" style={{ color: 'var(--text-3)' }}>{p.tagline}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center gap-1">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#10b981' }} />
                        <span className="text-[10px] font-mono font-bold" style={{ color: '#10b981' }}>{p.accuracy}%</span>
                      </div>
                      <span className="text-[10px]" style={{ color: 'var(--text-3)' }}>{p.models.length} modèle{p.models.length > 1 ? 's' : ''}</span>
                      <div className="flex items-center gap-0.5">
                        <Star size={10} className="fill-current" style={{ color: '#f59e0b' }} />
                        <span className="text-[10px]" style={{ color: 'var(--text-3)' }}>{p.rating}</span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight size={14} style={{ color: selectedId === p.id ? p.color : 'var(--text-3)' }}
                    className={`shrink-0 mt-1 transition-transform ${selectedId === p.id ? 'rotate-0' : ''}`} />
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>

        {/* Detail panel */}
        <AnimatePresence mode="wait">
          {selected ? (
            <motion.div key={selected.id}
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              className="flex-1 min-w-0 rounded-2xl border overflow-hidden"
              style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>

              {/* Hero */}
              <div className="relative p-6 overflow-hidden" style={{ background: selected.colorLight }}>
                <div className="absolute inset-0 opacity-30"
                  style={{ background: `radial-gradient(ellipse at 80% 50%, ${selected.color}40, transparent 70%)` }} />
                <div className="relative flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold"
                        style={{ background: selected.color }}>{selected.authorAvatar}</div>
                      <span className="text-xs font-mono" style={{ color: 'var(--text-3)' }}>par {selected.author}</span>
                      {selected.price === 0 &&
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-success/15 text-success">Gratuit</span>}
                    </div>
                    <h2 className="font-display text-2xl sm:text-3xl font-bold" style={{ color: 'var(--text)' }}>{selected.name}</h2>
                    <p className="text-sm mt-1" style={{ color: 'var(--text-2)' }}>{selected.tagline}</p>
                    <div className="flex items-center gap-3 mt-3 flex-wrap">
                      <StarRating rating={selected.rating} />
                      <span className="text-xs" style={{ color: 'var(--text-3)' }}>{selected.reviews} avis</span>
                      <span className="text-xs" style={{ color: 'var(--text-3)' }}>·</span>
                      <div className="flex items-center gap-1 text-xs" style={{ color: 'var(--text-3)' }}>
                        <Eye size={11} /> {selected.deployments.toLocaleString()} déploiements
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <AccuracyRing value={selected.accuracy} color={selected.color} />
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {selected.tags.map(t => (
                    <span key={t} className="text-[10px] font-semibold px-2 py-1 rounded-lg border"
                      style={{ borderColor: selected.color + '40', color: selected.color, background: selected.color + '15' }}>
                      {t}
                    </span>
                  ))}
                </div>

                {/* Waveform decor */}
                <div className="mt-4 opacity-60">
                  <WaveformDecor color={selected.color} />
                </div>
              </div>

              {/* Tabs */}
              <div className="flex border-b" style={{ borderColor: 'var(--border)' }}>
                {(['overview','models','classes','reviews'] as const).map(tab => (
                  <button key={tab} onClick={() => setDetailTab(tab)}
                    className={`flex-1 py-3 text-xs font-semibold uppercase tracking-wide transition-all border-b-2 ${detailTab === tab ? 'border-electric text-electric' : 'border-transparent'}`}
                    style={detailTab === tab ? { color: '#0d7fea', borderColor: '#0d7fea' } : { color: 'var(--text-3)' }}>
                    {tab === 'overview' ? 'Vue d\'ensemble' : tab === 'models' ? 'Modèles' : tab === 'classes' ? 'Classes' : 'Avis'}
                  </button>
                ))}
              </div>

              {/* Tab content */}
              <div className="p-6 overflow-y-auto" style={{ maxHeight: 520 }}>
                <AnimatePresence mode="wait">
                  <motion.div key={detailTab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>

                    {detailTab === 'overview' && (
                      <div className="space-y-6">
                        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>{selected.description}</p>

                        {/* Metrics grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          {[
                            { label: 'Précision', value: selected.accuracy + '%', color: '#10b981' },
                            { label: 'F1 Score', value: selected.f1 + '%', color: '#0d7fea' },
                            { label: 'Précision', value: selected.precision + '%', color: '#7c3aed' },
                            { label: 'Rappel', value: selected.recall + '%', color: '#f59e0b' },
                          ].map(m => (
                            <div key={m.label} className="rounded-xl p-3 text-center border"
                              style={{ background: 'var(--bg-1)', borderColor: 'var(--border)' }}>
                              <div className="text-xl font-display font-bold" style={{ color: m.color }}>{m.value}</div>
                              <div className="text-[10px] font-mono mt-0.5" style={{ color: 'var(--text-3)' }}>{m.label}</div>
                            </div>
                          ))}
                        </div>

                        {/* Technique */}
                        <div className="rounded-xl p-4 border space-y-3" style={{ background: 'var(--bg-1)', borderColor: 'var(--border)' }}>
                          <p className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--text-3)' }}>Fiche Technique</p>
                          {[
                            { icon: Database, label: 'Dataset', value: `${selected.dataset} · ${selected.datasetSize}` },
                            { icon: Zap, label: 'Embedding', value: selected.embedding },
                            { icon: Cpu, label: 'Architecture', value: selected.model },
                            { icon: BarChart2, label: 'Classes de sortie', value: `${selected.classes} classes` },
                            { icon: Calendar, label: 'Mise à jour', value: selected.lastUpdate },
                          ].map(row => (
                            <div key={row.label} className="flex items-center gap-3">
                              <row.icon size={14} style={{ color: 'var(--text-3)' }} className="shrink-0" />
                              <span className="text-xs w-28 shrink-0" style={{ color: 'var(--text-3)' }}>{row.label}</span>
                              <span className="text-xs font-semibold" style={{ color: 'var(--text)' }}>{row.value}</span>
                            </div>
                          ))}
                        </div>

                        {/* CTA */}
                        <div className="flex items-center gap-3 flex-wrap">
                          <button className="btn-primary px-5 py-2.5 text-sm gap-2">
                            <Download size={15} /> Déployer {selected.price > 0 ? `— ${selected.price}€/mois` : '— Gratuit'}
                          </button>
                          <button className="btn-ghost px-4 py-2.5 text-sm gap-2">
                            <Play size={14} /> Tester dans le Prédicteur
                          </button>
                          <button className="btn-ghost px-4 py-2.5 text-sm gap-2">
                            <ArrowUpRight size={14} /> Docs API
                          </button>
                        </div>
                      </div>
                    )}

                    {detailTab === 'models' && (
                      <div className="space-y-4">
                        <p className="text-xs" style={{ color: 'var(--text-3)' }}>
                          Ce portefeuille contient <strong style={{ color: 'var(--text)' }}>{selected.models.length} modèle{selected.models.length > 1 ? 's' : ''}</strong> entraîné{selected.models.length > 1 ? 's' : ''} sur le même dataset.
                        </p>
                        {selected.models.map((m, i) => (
                          <div key={i} className="rounded-xl border overflow-hidden" style={{ borderColor: 'var(--border)' }}>
                            <div className="flex items-center justify-between p-4"
                              style={{ background: i === 0 ? selected.colorLight : 'var(--bg-1)' }}>
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold"
                                  style={{ background: i === 0 ? selected.color : 'var(--border)' }}>
                                  {i === 0 ? <Shield size={14} /> : <Cpu size={14} />}
                                </div>
                                <div>
                                  <p className="text-sm font-bold" style={{ color: 'var(--text)' }}>{m.name}</p>
                                  {i === 0 && <span className="text-[10px] font-bold" style={{ color: selected.color }}>Recommandé</span>}
                                </div>
                              </div>
                              <button className="btn-primary text-xs py-1.5 px-3">Utiliser</button>
                            </div>
                            <div className="grid grid-cols-4 divide-x p-3" style={{ divideColor: 'var(--border)' }}>
                              {[
                                { l: 'Accuracy', v: m.accuracy + '%', c: '#10b981' },
                                { l: 'F1 Score', v: m.f1 + '%', c: '#0d7fea' },
                                { l: 'Taille', v: m.size, c: 'var(--text-2)' },
                                { l: 'Latence', v: m.latency, c: '#7c3aed' },
                              ].map(s => (
                                <div key={s.l} className="text-center px-2">
                                  <div className="text-sm font-bold font-mono" style={{ color: s.c }}>{s.v}</div>
                                  <div className="text-[10px]" style={{ color: 'var(--text-3)' }}>{s.l}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {detailTab === 'classes' && (
                      <div className="space-y-4">
                        <p className="text-xs" style={{ color: 'var(--text-3)' }}>
                          {selected.classes} classes de sortie disponibles dans ce portefeuille.
                        </p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {selected.outputClasses.map((cls, i) => (
                            <motion.div key={cls}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: i * 0.04 }}
                              className="flex items-center gap-2 rounded-xl p-3 border"
                              style={{ background: 'var(--bg-1)', borderColor: 'var(--border)' }}>
                              <div className="w-6 h-6 rounded-lg flex items-center justify-center text-white text-[10px] font-bold shrink-0"
                                style={{ background: selected.color }}>
                                {String(i + 1).padStart(2, '0')}
                              </div>
                              <span className="text-xs font-semibold" style={{ color: 'var(--text)' }}>{cls}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}

                    {detailTab === 'reviews' && (
                      <div className="space-y-5">
                        {/* Rating summary */}
                        <div className="rounded-xl p-4 flex items-center gap-6 border" style={{ background: 'var(--bg-1)', borderColor: 'var(--border)' }}>
                          <div className="text-center">
                            <div className="text-5xl font-display font-bold" style={{ color: 'var(--text)' }}>{selected.rating}</div>
                            <StarRating rating={selected.rating} />
                            <div className="text-xs mt-1" style={{ color: 'var(--text-3)' }}>{selected.reviews} avis</div>
                          </div>
                          <div className="flex-1 space-y-1.5">
                            {[5,4,3,2,1].map(n => (
                              <div key={n} className="flex items-center gap-2">
                                <span className="text-xs w-4 text-right" style={{ color: 'var(--text-3)' }}>{n}</span>
                                <Star size={10} className="fill-current text-warm shrink-0" />
                                <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: 'var(--bg-2)' }}>
                                  <div className="h-full rounded-full" style={{ background: '#f59e0b', width: n === 5 ? '65%' : n === 4 ? '22%' : n === 3 ? '8%' : '3%' }} />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Existing reviews */}
                        <div className="space-y-3">
                          {(MOCK_REVIEWS[selected.id] || []).map((r, i) => (
                            <ReviewCard key={i} {...r} />
                          ))}
                        </div>

                        {/* Add review */}
                        <div className="rounded-xl p-4 border space-y-3" style={{ background: 'var(--bg-1)', borderColor: 'var(--border)' }}>
                          <p className="text-sm font-bold" style={{ color: 'var(--text)' }}>Laisser un avis</p>
                          {/* Star picker */}
                          <div className="flex gap-1">
                            {[1,2,3,4,5].map(n => (
                              <button key={n}
                                onMouseEnter={() => setHoverRating(n)}
                                onMouseLeave={() => setHoverRating(0)}
                                onClick={() => setUserRating(n)}
                                className="transition-transform hover:scale-110">
                                <Star size={20}
                                  className={n <= (hoverRating || userRating) ? 'fill-current text-warm' : 'text-[var(--border)]'}
                                />
                              </button>
                            ))}
                            {userRating > 0 && <span className="text-xs ml-2 self-center" style={{ color: 'var(--text-3)' }}>
                              {['','Mauvais','Médiocre','Correct','Bien','Excellent'][userRating]}
                            </span>}
                          </div>
                          <textarea
                            className="w-full rounded-xl p-3 text-sm border outline-none resize-none"
                            style={{ background: 'var(--bg-card)', borderColor: 'var(--border)', color: 'var(--text)', minHeight: 80 }}
                            placeholder="Partagez votre expérience avec ce portefeuille..."
                            value={reviewText} onChange={e => setReviewText(e.target.value)}
                          />
                          <div className="flex items-center justify-between">
                            <span className="text-xs" style={{ color: 'var(--text-3)' }}>{reviewText.length}/500</span>
                            <button onClick={handleSubmitReview} className="btn-primary text-sm py-2 px-4 gap-2">
                              {reviewSubmitted ? <><Check size={14} /> Publié !</> : <><MessageSquare size={14} /> Publier</>}
                            </button>
                          </div>
                          {reviewSubmitted && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                              className="flex items-center gap-2 text-success text-sm">
                              <Check size={14} /> Merci pour votre avis !
                            </motion.div>
                          )}
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          ) : (
            <div className="flex-1 flex items-center justify-center rounded-2xl border"
              style={{ background: 'var(--bg-1)', borderColor: 'var(--border)', minHeight: 400 }}>
              <div className="text-center">
                <Briefcase size={40} style={{ color: 'var(--text-3)' }} className="mx-auto mb-4 opacity-50" />
                <p className="font-semibold" style={{ color: 'var(--text-2)' }}>Sélectionnez un portefeuille</p>
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
