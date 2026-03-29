import React, { useState, useRef, useCallback } from 'react';
import {
  Upload, Mic, Play, Pause, X, CheckCircle2, Brain, BarChart, Info,
  ChevronDown, Zap, Activity, Star, MessageSquare, Check,
  ThumbsUp, ThumbsDown, AlertTriangle, Volume2, Layers, Target,
  TrendingUp, Eye, Maximize2, Download
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/* ─── Data ──────────────────────────────────────────────────────────── */

const PORTFOLIOS_DATA = [
  {
    id: 'baby', name: 'BabyCry-AI', category: 'Pédiatrie',
    color: '#7c3aed', colorLight: 'rgba(124,58,237,0.12)',
    models: [
      { id: 'cry-net', name: 'CryNet', latency: '12ms', size: '18MB' }
    ],
    classes: ['Faim', 'Sommeil', 'Couche sale', 'Coliques', 'Câlin'],
    results: [
      { label: 'Faim', prob: 78, explanation: 'Signature rythmique répétitive avec montée en fréquence caractéristique du besoin nutritionnel.', emoji: '🍼' },
      { label: 'Sommeil', prob: 15, explanation: 'Bâillements audibles et pleurs moins intenses.', emoji: '😴' },
      { label: 'Coliques', prob: 5, explanation: 'Absence de pics d\'intensité soudains typiques de la douleur aiguë.', emoji: '😣' },
      { label: 'Câlin', prob: 2, explanation: 'Faible corrélation avec la recherche de contact.', emoji: '🤗' },
    ]
  },
  {
    id: 'respi', name: 'RespiDiag-Pro', category: 'Médical',
    color: '#10b981', colorLight: 'rgba(16,185,129,0.12)',
    models: [
      { id: 'respi-xl', name: 'RespiNet-XL', latency: '45ms', size: '64MB' },
      { id: 'cough-bert', name: 'CoughBERT', latency: '95ms', size: '128MB' },
      { id: 'respi-lite', name: 'RespiNet-Lite', latency: '9ms', size: '6MB' },
    ],
    classes: ['Sain', 'COVID-19', 'Asthme', 'Pneumonie', 'Bronchite', 'BPCO'],
    results: [
      { label: 'COVID-19', prob: 87, explanation: 'Anomalies spectrales dans les hautes fréquences (3-6kHz). Pattern de toux sèche caractéristique.', emoji: '🦠' },
      { label: 'Bronchite', prob: 8, explanation: 'Sifflements partiels détectés, mais niveau insuffisant pour diagnostic.', emoji: '🫁' },
      { label: 'Asthme', prob: 4, explanation: 'Absence du pattern expiratoire prolongé typique.', emoji: '💨' },
      { label: 'Sain', prob: 1, explanation: 'Faible corrélation avec les patterns respiratoires sains.', emoji: '✅' },
    ]
  },
  {
    id: 'vibra', name: 'VibraPredict', category: 'Industrie',
    color: '#0d7fea', colorLight: 'rgba(13,127,234,0.12)',
    models: [
      { id: 'vib-trans', name: 'VibTransformer', latency: '22ms', size: '48MB' },
      { id: 'vib-lite', name: 'VibCNN-Lite', latency: '8ms', size: '8MB' },
    ],
    classes: ['Roulement OK', 'Roulement défaut', 'Surcharge', 'Cavitation', 'Déséquilibre', 'Résonance'],
    results: [
      { label: 'Roulement défaut', prob: 91, explanation: 'Fréquences caractéristiques de BPFO détectées à 87Hz. Usure externe avancée.', emoji: '⚙️' },
      { label: 'Résonance', prob: 6, explanation: 'Légère amplification des harmoniques mais non dominante.', emoji: '📳' },
      { label: 'Déséquilibre', prob: 2, explanation: 'Vibrations à 1× la fréquence de rotation, amplitude normale.', emoji: '⚖️' },
      { label: 'Roulement OK', prob: 1, explanation: 'Le profil de vibration ne correspond pas au fonctionnement normal.', emoji: '🟢' },
    ]
  },
  {
    id: 'afro', name: 'AfroBeatsID', category: 'Musique',
    color: '#f59e0b', colorLight: 'rgba(245,158,11,0.12)',
    models: [
      { id: 'genre-net', name: 'GenreNet-CNN', latency: '18ms', size: '24MB' },
      { id: 'rhythm-lstm', name: 'RhythmLSTM', latency: '32ms', size: '12MB' },
    ],
    classes: ['Makossa', 'Afrobeats', 'Amapiano', 'Zoblazo', 'Ndombolo', 'Highlife', 'Afro-jazz', 'Bongo Flava'],
    results: [
      { label: 'Afrobeats', prob: 82, explanation: 'Structure rythmique 4/4 avec kick off-beat et percussion clave distinctifs. BPM: 104.', emoji: '🎵' },
      { label: 'Highlife', prob: 11, explanation: 'Influences mélodiques partagées, mais pattern rythmique diverge.', emoji: '🎸' },
      { label: 'Makossa', prob: 5, explanation: 'Quelques similitudes dans la ligne de basse mais signature rythmique différente.', emoji: '🥁' },
      { label: 'Amapiano', prob: 2, explanation: 'Log drum absent, tempo trop élevé pour ce genre.', emoji: '🎹' },
    ]
  },
  {
    id: 'agri', name: 'AgriSound-X', category: 'Agriculture',
    color: '#06b6d4', colorLight: 'rgba(6,182,212,0.12)',
    models: [
      { id: 'bug-field', name: 'BugNet-Field', latency: '28ms', size: '22MB' },
      { id: 'bug-edge', name: 'BugNet-Edge', latency: '6ms', size: '4MB' },
    ],
    classes: ['Sain', 'Criquet', 'Chenille', 'Doryphore', 'Puceron', 'Cochenille', 'Thrips'],
    results: [
      { label: 'Chenille', prob: 73, explanation: 'Pattern de mastication cyclique détecté (fréquence: 340Hz). Présence massive estimée.', emoji: '🐛' },
      { label: 'Criquet', prob: 18, explanation: 'Stridulation intermittente, mais mastication absente.', emoji: '🦗' },
      { label: 'Sain', prob: 7, explanation: 'Niveau sonore supérieur au seuil d\'alerte.', emoji: '🌱' },
      { label: 'Thrips', prob: 2, explanation: 'Fréquences parasites non corrélées au profil Thrips.', emoji: '🔬' },
    ]
  },
];

/* ─── Sub-components ─────────────────────────────────────────────────── */

function WaveformBar({ active, color }: { active: boolean; color: string }) {
  return (
    <div className="flex items-end gap-[2px] h-16 w-full">
      {[...Array(60)].map((_, i) => (
        <motion.div key={i}
          animate={active ? { scaleY: [0.1, 0.4 + Math.random() * 0.9, 0.15], opacity: 1 } : { scaleY: 0.08, opacity: 0.3 }}
          transition={{ duration: 0.3 + i * 0.01, repeat: active ? Infinity : 0, ease: 'easeInOut' }}
          className="flex-1 rounded-full origin-bottom"
          style={{ background: color, height: '100%' }}
        />
      ))}
    </div>
  );
}

function ProbabilityBar({ label, prob, rank, color, explanation, emoji, modelName }: any) {
  const isTop = rank === 0;
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: rank * 0.12 }}
      className={`rounded-2xl border overflow-hidden ${isTop ? 'shadow-lg' : ''}`}
      style={{
        background: isTop ? color + '18' : 'var(--bg-1)',
        borderColor: isTop ? color + '60' : 'var(--border)',
        boxShadow: isTop ? `0 4px 20px ${color}30` : undefined,
      }}>
      <div className="p-4">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{emoji}</span>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-sm" style={{ color: 'var(--text)' }}>{label}</span>
                {isTop && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white"
                  style={{ background: color }}>Dominant</span>}
                <span className="text-[10px] font-mono" style={{ color: 'var(--text-3)' }}>{modelName}</span>
              </div>
              {isTop && <p className="text-xs mt-0.5" style={{ color: 'var(--text-3)' }}>{explanation}</p>}
            </div>
          </div>
          <span className="text-2xl font-display font-bold shrink-0" style={{ color: isTop ? color : 'var(--text-2)' }}>
            {prob}%
          </span>
        </div>
        <div className="h-2.5 rounded-full overflow-hidden" style={{ background: 'var(--bg-2)' }}>
          <motion.div className="h-full rounded-full"
            initial={{ width: 0 }}
            animate={{ width: prob + '%' }}
            transition={{ duration: 1, ease: 'easeOut', delay: rank * 0.1 }}
            style={{ background: isTop ? `linear-gradient(90deg, ${color}, ${color}99)` : 'var(--border)' }} />
        </div>
      </div>
    </motion.div>
  );
}

function RadarChart({ results, color }: { results: any[]; color: string }) {
  const max = 100;
  const cx = 120, cy = 120, r = 80;
  const n = results.length;
  const points = results.map((res, i) => {
    const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
    const len = (res.prob / max) * r;
    return { x: cx + len * Math.cos(angle), y: cy + len * Math.sin(angle) };
  });
  const gridPoints = (scale: number) => results.map((_, i) => {
    const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
    return `${cx + scale * r * Math.cos(angle)},${cy + scale * r * Math.sin(angle)}`;
  }).join(' ');
  const dataPath = points.map((p, i) => (i === 0 ? `M${p.x},${p.y}` : `L${p.x},${p.y}`)).join(' ') + 'Z';

  return (
    <svg width={240} height={240} viewBox="0 0 240 240" className="mx-auto">
      {[0.25, 0.5, 0.75, 1].map(scale => (
        <polygon key={scale} points={gridPoints(scale)} fill="none"
          stroke="var(--border)" strokeWidth="1" />
      ))}
      {results.map((_, i) => {
        const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
        return <line key={i} x1={cx} y1={cy} x2={cx + r * Math.cos(angle)} y2={cy + r * Math.sin(angle)}
          stroke="var(--border)" strokeWidth="1" />;
      })}
      <motion.path d={dataPath} fill={color + '30'} stroke={color} strokeWidth="2.5"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} />
      {points.map((p, i) => (
        <motion.circle key={i} cx={p.x} cy={p.y} r="4" fill={color}
          initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.1 + 0.5 }} />
      ))}
      {results.map((res, i) => {
        const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
        const lx = cx + (r + 20) * Math.cos(angle);
        const ly = cy + (r + 20) * Math.sin(angle);
        return (
          <text key={i} x={lx} y={ly} textAnchor="middle" dominantBaseline="middle"
            fontSize="9" fill="var(--text-3)" fontFamily="Space Grotesk">
            {res.label.slice(0,8)}{res.label.length > 8 ? '…' : ''}
          </text>
        );
      })}
    </svg>
  );
}

/* ─── Main ──────────────────────────────────────────────────────────── */

export const Predictor: React.FC = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isPredicting, setIsPredicting] = useState(false);
  const [results, setResults] = useState<any[] | null>(null);
  const [isLive, setIsLive] = useState(false);
  const [activePortId, setActivePortId] = useState('respi');
  const [selectedModels, setSelectedModels] = useState<Record<string, boolean>>({});
  const [resultView, setResultView] = useState<'bars' | 'radar'>('bars');
  const [modelFeedback, setModelFeedback] = useState<Record<string, 'up' | 'down' | null>>({});
  const [modelComment, setModelComment] = useState<string>('');
  const [commentSaved, setCommentSaved] = useState(false);
  const [modelRatings, setModelRatings] = useState<Record<string, number>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const portfolio = PORTFOLIOS_DATA.find(p => p.id === activePortId)!;

  // Init selected models when portfolio changes
  React.useEffect(() => {
    const init: Record<string, boolean> = {};
    portfolio.models.forEach(m => { init[m.id] = true; });
    setSelectedModels(init);
    setResults(null);
  }, [activePortId]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault(); e.stopPropagation();
    setIsDragging(e.type !== 'dragleave');
  };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); setIsDragging(false);
    if (e.dataTransfer.files[0]) setFile(e.dataTransfer.files[0]);
  };

  const handlePredict = () => {
    setIsPredicting(true);
    setResults(null);
    setTimeout(() => {
      setIsPredicting(false);
      setResults(portfolio.results);
    }, 2200);
  };

  const saveComment = () => {
    if (!modelComment.trim()) return;
    setCommentSaved(true);
    setTimeout(() => { setCommentSaved(false); setModelComment(''); }, 2000);
  };

  const topResult = results?.[0];

  return (
    <div className="animate-fade-in space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Brain size={18} style={{ color: '#0d7fea' }} />
          <span className="text-xs font-mono uppercase tracking-widest" style={{ color: 'var(--text-3)' }}>Prédicteur</span>
        </div>
        <h1 className="font-display text-3xl font-bold" style={{ color: 'var(--text)' }}>
          Analyse <span style={{ color: '#0d7fea' }}>Audio</span> en Temps Réel
        </h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-3)' }}>Choisissez un portefeuille et analysez vos audios avec tous ses modèles simultanément.</p>
      </div>

      {/* Portfolio selector */}
      <div className="flex gap-2 flex-wrap">
        {PORTFOLIOS_DATA.map(p => (
          <button key={p.id} onClick={() => setActivePortId(p.id)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold border transition-all"
            style={activePortId === p.id
              ? { background: p.colorLight, borderColor: p.color, color: 'var(--text)', boxShadow: `0 2px 12px ${p.color}30` }
              : { background: 'var(--bg-card)', borderColor: 'var(--border)', color: 'var(--text-3)' }}>
            <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
            {p.name}
            <span className="text-[10px] px-1.5 py-0.5 rounded-md" style={{ background: 'var(--bg-2)', color: 'var(--text-3)' }}>
              {p.models.length} modèle{p.models.length > 1 ? 's' : ''}
            </span>
          </button>
        ))}
      </div>

      {/* Main layout */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-5">

        {/* Left — Upload + Models config */}
        <div className="xl:col-span-2 space-y-4">
          {/* Upload zone */}
          <div
            onDragEnter={handleDrag} onDragOver={handleDrag} onDragLeave={handleDrag} onDrop={handleDrop}
            onClick={() => !file && fileInputRef.current?.click()}
            className="relative rounded-2xl border-2 border-dashed transition-all overflow-hidden"
            style={{
              borderColor: isDragging ? portfolio.color : file ? '#10b981' : 'var(--border)',
              background: isDragging ? portfolio.colorLight : file ? 'rgba(16,185,129,0.06)' : 'var(--bg-card)',
              cursor: file ? 'default' : 'pointer', minHeight: 200,
            }}>
            <input ref={fileInputRef} type="file" accept="audio/*" className="hidden"
              onChange={e => e.target.files && setFile(e.target.files[0])} />

            <AnimatePresence mode="wait">
              {!file ? (
                <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center gap-3 p-8 text-center">
                  <motion.div className="w-16 h-16 rounded-2xl flex items-center justify-center transition-colors"
                    style={{ background: isDragging ? portfolio.color : 'var(--bg-1)' }}
                    animate={{ scale: isDragging ? 1.1 : 1 }}>
                    <Upload size={28} style={{ color: isDragging ? '#fff' : 'var(--text-3)' }} />
                  </motion.div>
                  <div>
                    <p className="font-bold text-sm" style={{ color: 'var(--text)' }}>Glissez un fichier audio</p>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--text-3)' }}>WAV, MP3, FLAC, OGG acceptés</p>
                  </div>
                  <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-3)' }}>
                    <span className="w-10 h-px" style={{ background: 'var(--border)' }} />OU<span className="w-10 h-px" style={{ background: 'var(--border)' }} />
                  </div>
                  <button onClick={e => { e.stopPropagation(); setIsLive(v => !v); }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${isLive ? 'text-white border-transparent' : 'border-[var(--border)]'}`}
                    style={isLive ? { background: '#ef4444' } : { background: 'var(--bg-1)', color: 'var(--text-2)' }}>
                    <Mic size={15} className={isLive ? 'animate-pulse' : ''} />
                    {isLive ? 'Arrêter le live' : 'Micro live'}
                  </button>
                </motion.div>
              ) : (
                <motion.div key="file" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-success/15 flex items-center justify-center">
                      <CheckCircle2 size={20} className="text-success" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm truncate" style={{ color: 'var(--text)' }}>{file.name}</p>
                      <p className="text-xs" style={{ color: 'var(--text-3)' }}>{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                    <button onClick={e => { e.stopPropagation(); setFile(null); setResults(null); }}
                      className="p-1.5 rounded-lg transition-all hover:bg-red-50" style={{ color: 'var(--text-3)' }}>
                      <X size={16} />
                    </button>
                  </div>
                  {/* Waveform */}
                  <WaveformBar active={isPredicting || isLive} color={portfolio.color} />
                  <button onClick={e => { e.stopPropagation(); handlePredict(); }} disabled={isPredicting}
                    className="btn-primary w-full py-3 gap-2 text-sm disabled:opacity-70">
                    {isPredicting
                      ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Analyse en cours…</>
                      : <><Zap size={16} />Lancer la prédiction sur {Object.values(selectedModels).filter(Boolean).length} modèle(s)</>}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Live indicator */}
            {isLive && (
              <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2 py-1 rounded-full bg-red-500 text-white text-[10px] font-bold">
                <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />LIVE
              </div>
            )}
          </div>

          {/* Model selector */}
          <div className="rounded-2xl border p-4 space-y-3" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold" style={{ color: 'var(--text)' }}>
                <Layers size={14} className="inline mr-1.5" style={{ color: portfolio.color }} />
                Modèles actifs — <span style={{ color: 'var(--text-3)' }}>{portfolio.name}</span>
              </p>
              <span className="text-xs font-mono px-2 py-0.5 rounded-full" style={{ background: 'var(--bg-2)', color: 'var(--text-3)' }}>
                {Object.values(selectedModels).filter(Boolean).length}/{portfolio.models.length}
              </span>
            </div>
            {portfolio.models.map(m => (
              <label key={m.id} className="flex items-center gap-3 cursor-pointer group">
                <div className="relative">
                  <input type="checkbox"
                    checked={selectedModels[m.id] ?? true}
                    onChange={e => setSelectedModels(prev => ({ ...prev, [m.id]: e.target.checked }))}
                    className="sr-only" />
                  <div className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all`}
                    style={selectedModels[m.id]
                      ? { background: portfolio.color, borderColor: portfolio.color }
                      : { borderColor: 'var(--border)', background: 'var(--bg-1)' }}>
                    {selectedModels[m.id] && <Check size={11} className="text-white" />}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-semibold" style={{ color: 'var(--text)' }}>{m.name}</span>
                  <span className="text-xs ml-2" style={{ color: 'var(--text-3)' }}>{m.latency} · {m.size}</span>
                </div>
              </label>
            ))}

            {/* Classes preview */}
            <div className="pt-2 border-t" style={{ borderColor: 'var(--border)' }}>
              <p className="text-xs font-semibold mb-2" style={{ color: 'var(--text-3)' }}>Classes de sortie ({portfolio.classes.length})</p>
              <div className="flex flex-wrap gap-1">
                {portfolio.classes.map(cls => (
                  <span key={cls} className="text-[10px] font-medium px-2 py-0.5 rounded-full border"
                    style={{ borderColor: portfolio.color + '40', color: portfolio.color, background: portfolio.colorLight }}>
                    {cls}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right — Results */}
        <div className="xl:col-span-3 space-y-4">
          <AnimatePresence mode="wait">
            {!results && !isPredicting ? (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="rounded-2xl border flex flex-col items-center justify-center text-center p-12"
                style={{ background: 'var(--bg-card)', borderColor: 'var(--border)', minHeight: 400 }}>
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-4 float"
                  style={{ background: portfolio.colorLight }}>
                  <Brain size={36} style={{ color: portfolio.color }} />
                </div>
                <p className="font-display font-bold text-lg" style={{ color: 'var(--text)' }}>Prêt à analyser</p>
                <p className="text-sm mt-2 max-w-xs" style={{ color: 'var(--text-3)' }}>
                  Uploadez un audio et lancez la prédiction pour voir les résultats des {portfolio.models.length} modèle(s) de <strong>{portfolio.name}</strong>.
                </p>
                {/* Waveform idle anim */}
                <div className="mt-8 w-full max-w-xs">
                  <WaveformBar active={false} color={portfolio.color} />
                </div>
              </motion.div>
            ) : isPredicting ? (
              <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="rounded-2xl border flex flex-col items-center justify-center p-12 text-center"
                style={{ background: 'var(--bg-card)', borderColor: 'var(--border)', minHeight: 400 }}>
                <div className="relative w-24 h-24 mb-6">
                  <div className="absolute inset-0 rounded-full border-4 border-dashed"
                    style={{ borderColor: portfolio.color + '30' }} />
                  <motion.div className="absolute inset-0 rounded-full border-4 border-transparent border-t-current"
                    style={{ color: portfolio.color }}
                    animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Activity size={28} style={{ color: portfolio.color }} />
                  </div>
                </div>
                <p className="font-display font-bold text-lg" style={{ color: 'var(--text)' }}>Analyse en cours…</p>
                <p className="text-sm mt-2" style={{ color: 'var(--text-3)' }}>
                  {Object.values(selectedModels).filter(Boolean).length} modèle(s) en train d'inférer
                </p>
                <div className="w-full max-w-xs mt-6">
                  <WaveformBar active={true} color={portfolio.color} />
                </div>
                {/* Fake progress steps */}
                <div className="mt-6 space-y-2 text-left w-full max-w-xs">
                  {['Chargement de l\'audio…', 'Extraction des features…', 'Inférence des modèles…'].map((step, i) => (
                    <motion.div key={step} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.6 }}
                      className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-3)' }}>
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.6 + 0.2 }}
                        className="w-4 h-4 rounded-full flex items-center justify-center text-white"
                        style={{ background: portfolio.color }}>
                        <Check size={10} />
                      </motion.div>
                      {step}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ) : results ? (
              <motion.div key="results" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                className="space-y-4">

                {/* Top result hero */}
                <div className="rounded-2xl p-5 relative overflow-hidden"
                  style={{ background: portfolio.colorLight, border: `2px solid ${portfolio.color}40` }}>
                  <div className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl opacity-20"
                    style={{ background: portfolio.color, transform: 'translate(25%,-25%)' }} />
                  <div className="relative flex items-center justify-between gap-4 flex-wrap">
                    <div className="flex items-center gap-4">
                      <span className="text-5xl">{topResult?.emoji}</span>
                      <div>
                        <p className="text-xs font-mono uppercase tracking-widest" style={{ color: portfolio.color }}>Résultat dominant</p>
                        <h3 className="font-display text-2xl font-bold" style={{ color: 'var(--text)' }}>{topResult?.label}</h3>
                        <p className="text-sm mt-0.5" style={{ color: 'var(--text-2)' }}>{topResult?.explanation}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-5xl font-display font-bold" style={{ color: portfolio.color }}>{topResult?.prob}%</div>
                      <div className="text-xs" style={{ color: 'var(--text-3)' }}>confiance</div>
                    </div>
                  </div>
                </div>

                {/* View toggle + results */}
                <div className="rounded-2xl border overflow-hidden" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
                  <div className="flex items-center justify-between px-5 py-3 border-b" style={{ borderColor: 'var(--border)' }}>
                    <p className="text-sm font-bold" style={{ color: 'var(--text)' }}>
                      Distribution des probabilités
                      <span className="ml-2 text-xs font-normal" style={{ color: 'var(--text-3)' }}>· {portfolio.models.length} modèle(s)</span>
                    </p>
                    <div className="flex items-center gap-1 p-1 rounded-lg" style={{ background: 'var(--bg-1)' }}>
                      {([['bars', BarChart], ['radar', Target]] as const).map(([view, Icon]) => (
                        <button key={view} onClick={() => setResultView(view as any)}
                          className="p-1.5 rounded-md transition-all"
                          style={resultView === view ? { background: portfolio.color, color: '#fff' } : { color: 'var(--text-3)' }}>
                          <Icon size={14} />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="p-5">
                    <AnimatePresence mode="wait">
                      {resultView === 'bars' ? (
                        <motion.div key="bars" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                          className="space-y-3">
                          {results.map((res, i) => (
                            <ProbabilityBar key={res.label} {...res} rank={i} color={portfolio.color}
                              modelName={portfolio.models[0]?.name} />
                          ))}
                        </motion.div>
                      ) : (
                        <motion.div key="radar" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                          <RadarChart results={results} color={portfolio.color} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Model feedback */}
                <div className="rounded-2xl border p-4 space-y-4" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
                  <p className="text-sm font-bold" style={{ color: 'var(--text)' }}>
                    <MessageSquare size={14} className="inline mr-1.5" style={{ color: portfolio.color }} />
                    Évaluer les modèles
                  </p>
                  {portfolio.models.filter(m => selectedModels[m.id]).map(m => (
                    <div key={m.id} className="rounded-xl p-3 border space-y-3" style={{ background: 'var(--bg-1)', borderColor: 'var(--border)' }}>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold" style={{ color: 'var(--text)' }}>{m.name}</span>
                        <div className="flex items-center gap-2">
                          {/* Star rating */}
                          <div className="flex gap-0.5">
                            {[1,2,3,4,5].map(n => (
                              <button key={n} onClick={() => setModelRatings(prev => ({ ...prev, [m.id]: n }))}>
                                <Star size={14}
                                  className={n <= (modelRatings[m.id] ?? 0) ? 'fill-current' : ''}
                                  style={{ color: n <= (modelRatings[m.id] ?? 0) ? '#f59e0b' : 'var(--border)' }} />
                              </button>
                            ))}
                          </div>
                          <div className="w-px h-4" style={{ background: 'var(--border)' }} />
                          <button onClick={() => setModelFeedback(prev => ({ ...prev, [m.id]: 'up' }))}
                            className={`p-1.5 rounded-lg transition-all ${modelFeedback[m.id] === 'up' ? 'text-success bg-success/15' : 'text-[var(--text-3)] hover:bg-[var(--bg-2)]'}`}>
                            <ThumbsUp size={14} />
                          </button>
                          <button onClick={() => setModelFeedback(prev => ({ ...prev, [m.id]: 'down' }))}
                            className={`p-1.5 rounded-lg transition-all ${modelFeedback[m.id] === 'down' ? 'text-alert bg-alert/15' : 'text-[var(--text-3)] hover:bg-[var(--bg-2)]'}`}>
                            <ThumbsDown size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Comment */}
                  <div className="space-y-2">
                    <textarea
                      className="w-full rounded-xl p-3 text-sm border outline-none resize-none"
                      style={{ background: 'var(--bg-1)', borderColor: 'var(--border)', color: 'var(--text)', minHeight: 72 }}
                      placeholder="Commentaire sur la prédiction ou les modèles…"
                      value={modelComment} onChange={e => setModelComment(e.target.value)}
                    />
                    <div className="flex justify-end">
                      <button onClick={saveComment} className="btn-ghost text-xs py-2 px-3 gap-1.5">
                        {commentSaved ? <><Check size={12} /> Sauvegardé</> : <><MessageSquare size={12} /> Enregistrer</>}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Export */}
                <button className="btn-ghost w-full text-sm py-2.5 gap-2">
                  <Download size={15} /> Exporter les résultats (JSON / PDF)
                </button>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
