import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Upload, Mic, Play, X, CheckCircle2, Brain, Zap, Activity,
  Star, MessageSquare, Check, ThumbsUp, ThumbsDown, Download,
  Layers, Target, Music, ChevronRight, BarChart2
} from 'lucide-react';

const PORTFOLIOS = [
  {
    id: 'camer', name: 'CamerMusic-ID', category: 'Musique Camerounaise',
    color: '#f59e0b', colorLight: 'rgba(245,158,11,.1)',
    desc: 'Reconnaissance des styles musicaux camerounais : Makossa, Bikutsi, Ambasse Bey, Mangambeu, Bend Skin.',
    models: [
      { id: 'm1', name: 'CNN-ResNet18', acc: '94.2%', lat: '18ms', size: '24MB' },
      { id: 'm2', name: 'LSTM-Rhythm', acc: '91.8%', lat: '32ms', size: '12MB' },
    ],
    classes: ['Makossa', 'Bikutsi', 'Ambasse Bey', 'Mangambeu', 'Bend Skin'],
    results: [
      { label: 'Makossa', prob: 87, emoji: '🎵', explanation: 'Pattern rythmique caractéristique à 4/4 avec la guitare basse et la kora. BPM 110–130 détecté.' },
      { label: 'Ambasse Bey', prob: 8, emoji: '🥁', explanation: 'Quelques similitudes dans la structure harmonique mais tempo différent.' },
      { label: 'Bikutsi', prob: 3, emoji: '🎸', explanation: 'Signature de percussions légèrement présente mais non dominante.' },
      { label: 'Mangambeu', prob: 2, emoji: '🎶', explanation: 'Faible corrélation.' },
    ]
  },
  {
    id: 'baby', name: 'BabyCry-AI', category: 'Pédiatrie',
    color: '#8b5cf6', colorLight: 'rgba(139,92,246,.1)',
    desc: 'Traducteur de pleurs de nourrissons. Identifie Faim, Sommeil, Coliques, Câlin.',
    models: [{ id: 'cry', name: 'CryNet', acc: '89.7%', lat: '12ms', size: '18MB' }],
    classes: ['Faim', 'Sommeil', 'Couche sale', 'Coliques', 'Câlin'],
    results: [
      { label: 'Faim', prob: 78, emoji: '🍼', explanation: 'Signature rythmique répétitive avec montée en fréquence.' },
      { label: 'Sommeil', prob: 15, emoji: '😴', explanation: 'Pleurs moins intenses, bâillements audibles.' },
      { label: 'Coliques', prob: 5, emoji: '😣', explanation: 'Absence de pics d\'intensité soudains.' },
      { label: 'Câlin', prob: 2, emoji: '🤗', explanation: 'Faible corrélation.' },
    ]
  },
  {
    id: 'respi', name: 'RespiDiag-Pro', category: 'Médical',
    color: '#22c55e', colorLight: 'rgba(34,197,94,.1)',
    desc: 'Diagnostic respiratoire par analyse de toux. COVID-19, Asthme, Pneumonie.',
    models: [
      { id: 'rx', name: 'RespiNet-XL', acc: '92.8%', lat: '45ms', size: '64MB' },
      { id: 'rl', name: 'RespiNet-Lite', acc: '87.3%', lat: '9ms', size: '6MB' },
    ],
    classes: ['Sain', 'COVID-19', 'Asthme', 'Pneumonie', 'Bronchite'],
    results: [
      { label: 'COVID-19', prob: 87, emoji: '🦠', explanation: 'Anomalies spectrales détectées à 3–6 kHz.' },
      { label: 'Bronchite', prob: 8, emoji: '🫁', explanation: 'Sifflements partiels détectés.' },
      { label: 'Asthme', prob: 4, emoji: '💨', explanation: 'Pattern expiratoire non prolongé.' },
      { label: 'Sain', prob: 1, emoji: '✅', explanation: 'Faible corrélation.' },
    ]
  },
  {
    id: 'vibra', name: 'VibraPredict', category: 'Industrie',
    color: '#3b6fe8', colorLight: 'rgba(59,111,232,.1)',
    desc: 'Maintenance prédictive. Détection des anomalies de roulements et moteurs.',
    models: [
      { id: 'vt', name: 'VibTransformer', acc: '95.4%', lat: '22ms', size: '48MB' },
      { id: 'vl', name: 'VibCNN-Lite', acc: '91.2%', lat: '8ms', size: '8MB' },
    ],
    classes: ['Roulement OK', 'Roulement défaut', 'Surcharge', 'Cavitation', 'Déséquilibre'],
    results: [
      { label: 'Roulement défaut', prob: 91, emoji: '⚙️', explanation: 'Fréquences BPFO détectées à 87Hz.' },
      { label: 'Résonance', prob: 6, emoji: '📳', explanation: 'Légère amplification harmonique.' },
      { label: 'Déséquilibre', prob: 2, emoji: '⚖️', explanation: 'Amplitude normale.' },
      { label: 'Roulement OK', prob: 1, emoji: '🟢', explanation: 'Non corrélé.' },
    ]
  },
];

// Simulated Cameroon audio files
const CAMER_SAMPLES = [
  { name: 'Makossa_Manu_Dibango.wav', label: 'Makossa', duration: '0:30', size: '2.6 MB' },
  { name: 'Bikutsi_Charlotte_Dipanda.wav', label: 'Bikutsi', duration: '0:30', size: '2.6 MB' },
  { name: 'Bend_Skin_Lapiro.wav', label: 'Bend Skin', duration: '0:28', size: '2.4 MB' },
];

export const Predictor: React.FC = () => {
  const [portId, setPortId] = useState('camer');
  const [file, setFile] = useState<File | null>(null);
  const [sampleFile, setSampleFile] = useState<typeof CAMER_SAMPLES[0] | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isPredicting, setIsPredicting] = useState(false);
  const [results, setResults] = useState<any[] | null>(null);
  const [resultView, setResultView] = useState<'bars' | 'radar'>('bars');
  const [feedback, setFeedback] = useState<Record<string, 'up' | 'down' | null>>({});
  const [rating, setRating] = useState<Record<string, number>>({});
  const [comment, setComment] = useState('');
  const [commentSaved, setCommentSaved] = useState(false);
  const [selectedModels, setSelectedModels] = useState<Record<string, boolean>>({});
  const fileRef = useRef<HTMLInputElement>(null);
  const progressRef = useRef<number>(0);
  const [progress, setProgress] = useState(0);

  const port = PORTFOLIOS.find(p => p.id === portId)!;

  useEffect(() => {
    const init: Record<string, boolean> = {};
    port.models.forEach(m => { init[m.id] = true; });
    setSelectedModels(init);
    setResults(null); setFile(null); setSampleFile(null); setProgress(0);
  }, [portId]);

  const runPrediction = () => {
    setIsPredicting(true); setResults(null); setProgress(0);
    progressRef.current = 0;
    const t = setInterval(() => {
      progressRef.current += 2;
      setProgress(progressRef.current);
      if (progressRef.current >= 100) { clearInterval(t); setIsPredicting(false); setResults(port.results); }
    }, 44);
  };

  const top = results?.[0];

  return (
    <div className="page-wrap fade-in">
      {/* ── Header ── */}
      <div className="row-between">
        <div>
          <div className="eyebrow" style={{ marginBottom: 4 }}><Brain size={13} color="var(--accent)" />Prédicteur</div>
          <h1 className="h1 font-heading">Analyse <span style={{ color: 'var(--accent)' }}>Audio</span></h1>
          <p className="sub" style={{ marginTop: 4 }}>Choisissez un portefeuille et analysez vos audios avec tous ses modèles.</p>
        </div>
      </div>

      {/* ── Portfolio selector ── */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {PORTFOLIOS.map(p => (
          <button key={p.id} onClick={() => setPortId(p.id)}
            style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 16px', borderRadius: 12, border: `1px solid ${portId === p.id ? p.color : 'var(--bdr)'}`, background: portId === p.id ? p.colorLight : 'var(--card)', cursor: 'pointer', transition: 'all .18s', boxShadow: portId === p.id ? `0 0 0 2px ${p.color}20` : 'none', fontFamily: 'inherit', fontWeight: 600, fontSize: 13, color: 'var(--t1)' }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: p.color, flexShrink: 0 }} />
            {p.name}
            <span style={{ fontSize: 10, padding: '2px 7px', borderRadius: 99, background: 'var(--s1)', color: 'var(--t3)', fontWeight: 500 }}>{p.models.length} modèle{p.models.length > 1 ? 's' : ''}</span>
          </button>
        ))}
      </div>

      {/* ── Main layout ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>

        {/* LEFT — Upload + config */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* Scenario samples for CamerMusic */}
          {portId === 'camer' && !file && !sampleFile && (
            <div style={{ background: port.colorLight, border: `1px solid ${port.color}40`, borderRadius: 14, padding: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--t1)', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
                <Music size={15} color={port.color} />Échantillons de démonstration — Musique camerounaise
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {CAMER_SAMPLES.map((s, i) => (
                  <button key={i} onClick={() => setSampleFile(s)}
                    style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', borderRadius: 10, background: 'var(--card)', border: '1px solid var(--bdr)', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left', transition: 'all .15s' }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = port.color)} onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--bdr)')}>
                    <Play size={14} color={port.color} style={{ flexShrink: 0 }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--t1)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.name}</div>
                      <div style={{ fontSize: 10, color: 'var(--t3)', fontFamily: "'JetBrains Mono',monospace" }}>{s.label} · {s.duration} · {s.size}</div>
                    </div>
                    <ChevronRight size={14} color="var(--t3)" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Upload zone */}
          {!sampleFile ? (
            <div
              onDragEnter={() => setIsDragging(true)} onDragLeave={() => setIsDragging(false)}
              onDragOver={e => e.preventDefault()} onDrop={e => { e.preventDefault(); setIsDragging(false); if (e.dataTransfer.files[0]) setFile(e.dataTransfer.files[0]); }}
              onClick={() => !file && fileRef.current?.click()}
              style={{ borderRadius: 14, border: `2px dashed ${isDragging ? port.color : file ? 'var(--ok)' : 'var(--bdr)'}`, padding: file ? 20 : 36, textAlign: 'center', cursor: file ? 'default' : 'pointer', transition: 'all .2s', background: isDragging ? port.colorLight : file ? 'rgba(34,197,94,.05)' : 'transparent', minHeight: 160, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
              <input ref={fileRef} type="file" accept="audio/*" style={{ display: 'none' }} onChange={e => e.target.files && setFile(e.target.files[0])} />
              <AnimatePresence mode="wait">
                {!file ? (
                  <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                    <Upload size={28} color="var(--t3)" />
                    <div>
                      <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--t1)', margin: '0 0 4px' }}>Glissez un fichier audio</p>
                      <p style={{ fontSize: 12, color: 'var(--t3)', margin: 0 }}>WAV, MP3, FLAC, OGG · Max 50 MB</p>
                    </div>
                    <button onClick={e => { e.stopPropagation(); }} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 16px', borderRadius: 9, border: '1px solid var(--bdr)', background: 'var(--card)', fontSize: 13, fontWeight: 600, color: 'var(--t2)', cursor: 'pointer', fontFamily: 'inherit' }}>
                      <Mic size={14} />Micro live
                    </button>
                  </motion.div>
                ) : (
                  <motion.div key="file" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ width: '100%' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                      <CheckCircle2 size={20} color="var(--ok)" style={{ flexShrink: 0 }} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--t1)', margin: '0 0 2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{file.name}</p>
                        <p style={{ fontSize: 11, color: 'var(--t3)', margin: 0 }}>{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                      <button onClick={e => { e.stopPropagation(); setFile(null); setResults(null); }} style={{ background: 'none', border: 'none', color: 'var(--t3)', cursor: 'pointer', padding: 4 }}><X size={16} /></button>
                    </div>
                    {/* Waveform */}
                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 40 }}>
                      {[...Array(48)].map((_, i) => (
                        <motion.div key={i} animate={{ scaleY: [.08, .2 + Math.sin(i * .5) * .8 + Math.random() * .4, .08] }}
                          transition={{ duration: .7 + i * .03, repeat: Infinity }} style={{ flex: 1, borderRadius: 2, background: port.color, height: '100%', transformOrigin: 'bottom' }} />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div style={{ background: port.colorLight, border: `1px solid ${port.color}50`, borderRadius: 14, padding: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <CheckCircle2 size={18} color={port.color} style={{ flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--t1)', margin: '0 0 2px' }}>{sampleFile.name}</p>
                  <p style={{ fontSize: 11, color: 'var(--t3)', margin: 0, fontFamily: "'JetBrains Mono',monospace" }}>{sampleFile.label} · {sampleFile.duration} · {sampleFile.size}</p>
                </div>
                <button onClick={() => { setSampleFile(null); setResults(null); }} style={{ background: 'none', border: 'none', color: 'var(--t3)', cursor: 'pointer' }}><X size={16} /></button>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 36 }}>
                {[...Array(40)].map((_, i) => (
                  <motion.div key={i} animate={{ scaleY: [.08, .2 + Math.sin(i * .5) * .8, .08] }}
                    transition={{ duration: .75 + i * .03, repeat: Infinity }} style={{ flex: 1, borderRadius: 2, background: port.color, height: '100%', transformOrigin: 'bottom' }} />
                ))}
              </div>
            </div>
          )}

          {/* Launch button */}
          {(file || sampleFile) && (
            <button onClick={runPrediction} disabled={isPredicting} className="btn btn-primary"
              style={{ width: '100%', padding: '12px', fontSize: 14, justifyContent: 'center', gap: 8 }}>
              {isPredicting
                ? <><div style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />Analyse en cours…</>
                : <><Zap size={16} />Lancer la prédiction · {Object.values(selectedModels).filter(Boolean).length} modèle(s)</>}
            </button>
          )}

          {/* Progress */}
          {isPredicting && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--t3)', marginBottom: 6 }}>
                <span>Analyse en cours…</span><span style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, color: port.color }}>{progress}%</span>
              </div>
              <div style={{ height: 6, borderRadius: 99, background: 'var(--bdr2)', overflow: 'hidden' }}>
                <motion.div animate={{ width: progress + '%' }} style={{ height: '100%', borderRadius: 99, background: `linear-gradient(90deg, ${port.color}, ${port.color}bb)` }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5, marginTop: 12 }}>
                {['Chargement de l\'audio…', 'Extraction des features (MFCC + Mel)…', 'Inférence des modèles…'].map((s, i) => (
                  <motion.div key={s} initial={{ opacity: 0 }} animate={{ opacity: progress > i * 33 ? 1 : 0.3 }}
                    style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 12, color: progress > i * 33 ? 'var(--t1)' : 'var(--t3)' }}>
                    <div style={{ width: 16, height: 16, borderRadius: '50%', background: progress > i * 33 ? port.color : 'var(--bdr2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {progress > i * 33 && <Check size={9} color="#fff" />}
                    </div>
                    {s}
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Model selector */}
          <div className="card card-p" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div className="h3"><Layers size={14} color="var(--accent)" style={{ marginRight: 6 }} />Modèles actifs</div>
              <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 99, background: 'var(--s1)', color: 'var(--t3)', fontFamily: "'JetBrains Mono',monospace" }}>{Object.values(selectedModels).filter(Boolean).length}/{port.models.length}</span>
            </div>
            {port.models.map(m => (
              <label key={m.id} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
                <div style={{ position: 'relative' }}>
                  <input type="checkbox" checked={selectedModels[m.id] ?? true} onChange={e => setSelectedModels(p => ({ ...p, [m.id]: e.target.checked }))} style={{ position: 'absolute', opacity: 0 }} />
                  <div style={{ width: 18, height: 18, borderRadius: 5, border: `1.5px solid ${selectedModels[m.id] ? port.color : 'var(--bdr)'}`, background: selectedModels[m.id] ? port.color : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .15s' }}>
                    {selectedModels[m.id] && <Check size={11} color="#fff" />}
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--t1)' }}>{m.name}</span>
                  <span style={{ fontSize: 11, color: 'var(--t3)', marginLeft: 8, fontFamily: "'JetBrains Mono',monospace" }}>{m.acc} · {m.lat}</span>
                </div>
              </label>
            ))}
            <div style={{ paddingTop: 10, borderTop: '1px solid var(--bdr2)' }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--t3)', textTransform: 'uppercase', letterSpacing: '.07em', marginBottom: 7 }}>Classes de sortie</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                {port.classes.map(c => <span key={c} style={{ fontSize: 11, padding: '2px 8px', borderRadius: 99, background: port.colorLight, color: port.color, border: `1px solid ${port.color}30`, fontWeight: 500 }}>{c}</span>)}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT — Results */}
        <div>
          <AnimatePresence mode="wait">
            {!results && !isPredicting && (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="card card-p" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', minHeight: 400, gap: 14 }}>
                <div style={{ width: 72, height: 72, borderRadius: 20, background: port.colorLight, display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="float-anim">
                  <Brain size={32} color={port.color} />
                </div>
                <div>
                  <p style={{ fontSize: 16, fontWeight: 700, color: 'var(--t1)', margin: '0 0 6px', fontFamily: "'Outfit',system-ui" }}>Prêt à analyser</p>
                  <p className="sub" style={{ maxWidth: 280, margin: '0 auto' }}>Uploadez un audio ou choisissez un échantillon de démonstration, puis lancez la prédiction.</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 40, width: '80%', opacity: .4 }}>
                  {[...Array(32)].map((_, i) => <motion.div key={i} animate={{ scaleY: [.1, .3 + Math.sin(i * .5) * .7, .1] }} transition={{ duration: .8 + i * .04, repeat: Infinity }} style={{ flex: 1, borderRadius: 2, background: port.color, height: '100%', transformOrigin: 'bottom' }} />)}
                </div>
              </motion.div>
            )}

            {isPredicting && (
              <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="card card-p" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', minHeight: 400, gap: 16 }}>
                <div style={{ position: 'relative', width: 80, height: 80 }}>
                  <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: `3px solid ${port.color}25` }} />
                  <motion.div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: `3px solid ${port.color}`, borderTopColor: 'transparent' }} animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} />
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Activity size={26} color={port.color} /></div>
                </div>
                <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--t1)', margin: 0 }}>Analyse en cours…</p>
                <p className="sub">{Object.values(selectedModels).filter(Boolean).length} modèle(s) en inférence</p>
              </motion.div>
            )}

            {results && top && (
              <motion.div key="results" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {/* Top result hero */}
                <div style={{ padding: '20px 22px', borderRadius: 16, background: port.colorLight, border: `1.5px solid ${port.color}40`, position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: 0, right: 0, width: 160, height: 160, borderRadius: '50%', background: port.color, opacity: .08, transform: 'translate(40px,-40px)' }} />
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span style={{ fontSize: 40 }}>{top.emoji}</span>
                      <div>
                        <p style={{ fontSize: 11, color: port.color, fontFamily: "'JetBrains Mono',monospace", textTransform: 'uppercase', letterSpacing: '.08em', margin: '0 0 4px' }}>Résultat dominant</p>
                        <h3 className="h2 font-heading" style={{ margin: '0 0 4px' }}>{top.label}</h3>
                        <p style={{ fontSize: 12, color: 'var(--t2)', margin: 0, lineHeight: 1.5 }}>{top.explanation}</p>
                      </div>
                    </div>
                    <div className="font-heading" style={{ fontSize: 48, fontWeight: 800, color: port.color, lineHeight: 1 }}>{top.prob}%</div>
                  </div>
                </div>

                {/* Distribution */}
                <div className="card" style={{ overflow: 'hidden' }}>
                  <div style={{ padding: '14px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--bdr)' }}>
                    <span className="h3">Distribution des probabilités</span>
                    <div style={{ display: 'flex', gap: 4, padding: 3, borderRadius: 8, background: 'var(--s1)' }}>
                      {([['bars', BarChart2], ['radar', Target]] as const).map(([v, Ic]) => (
                        <button key={v} onClick={() => setResultView(v)}
                          style={{ padding: '4px 8px', borderRadius: 6, border: 'none', cursor: 'pointer', background: resultView === v ? port.color : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .15s' }}>
                          <Ic size={14} color={resultView === v ? '#fff' : 'var(--t3)'} />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {results.map((r, i) => (
                      <motion.div key={r.label} initial={{ opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * .1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 5 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <span style={{ fontSize: 16 }}>{r.emoji}</span>
                            <span style={{ fontSize: 13, fontWeight: i === 0 ? 700 : 500, color: 'var(--t1)' }}>{r.label}</span>
                            {i === 0 && <span className="badge" style={{ background: port.colorLight, color: port.color, fontSize: 10 }}>Dominant</span>}
                          </div>
                          <span style={{ fontSize: 14, fontWeight: 700, color: i === 0 ? port.color : 'var(--t2)', fontFamily: "'JetBrains Mono',monospace" }}>{r.prob}%</span>
                        </div>
                        <div style={{ height: 7, borderRadius: 99, background: 'var(--bdr2)', overflow: 'hidden' }}>
                          <motion.div initial={{ width: 0 }} animate={{ width: r.prob + '%' }} transition={{ duration: .9, ease: 'easeOut', delay: i * .1 }}
                            style={{ height: '100%', borderRadius: 99, background: i === 0 ? `linear-gradient(90deg,${port.color},${port.color}bb)` : 'var(--bdr)' }} />
                        </div>
                        {i === 0 && <p style={{ fontSize: 11, color: 'var(--t3)', marginTop: 4 }}>{r.explanation}</p>}
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Feedback */}
                <div className="card card-p" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div className="h3"><MessageSquare size={14} color="var(--accent)" style={{ marginRight: 6 }} />Évaluer les modèles</div>
                  {port.models.filter(m => selectedModels[m.id]).map(m => (
                    <div key={m.id} style={{ background: 'var(--s1)', border: '1px solid var(--bdr2)', borderRadius: 10, padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                      <span style={{ flex: 1, fontSize: 13, fontWeight: 600, color: 'var(--t1)' }}>{m.name}</span>
                      <div style={{ display: 'flex', gap: 2 }}>
                        {[1, 2, 3, 4, 5].map(n => (
                          <button key={n} onClick={() => setRating(r => ({ ...r, [m.id]: n }))} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 1 }}>
                            <Star size={14} fill={n <= (rating[m.id] ?? 0) ? '#f59e0b' : 'none'} color={n <= (rating[m.id] ?? 0) ? '#f59e0b' : 'var(--bdr)'} />
                          </button>
                        ))}
                      </div>
                      <div style={{ display: 'flex', gap: 4 }}>
                        <button onClick={() => setFeedback(f => ({ ...f, [m.id]: 'up' }))} style={{ padding: '5px 8px', borderRadius: 7, border: '1px solid var(--bdr)', background: feedback[m.id] === 'up' ? 'rgba(34,197,94,.15)' : 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                          <ThumbsUp size={13} color={feedback[m.id] === 'up' ? 'var(--ok)' : 'var(--t3)'} />
                        </button>
                        <button onClick={() => setFeedback(f => ({ ...f, [m.id]: 'down' }))} style={{ padding: '5px 8px', borderRadius: 7, border: '1px solid var(--bdr)', background: feedback[m.id] === 'down' ? 'rgba(239,68,68,.1)' : 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                          <ThumbsDown size={13} color={feedback[m.id] === 'down' ? 'var(--danger)' : 'var(--t3)'} />
                        </button>
                      </div>
                    </div>
                  ))}
                  <textarea className="input" value={comment} onChange={e => setComment(e.target.value)} placeholder="Commentaire sur la prédiction ou les modèles…" style={{ minHeight: 64 }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <button className="btn btn-ghost btn-sm"><Download size={13} />Exporter (JSON)</button>
                    <button onClick={() => { setCommentSaved(true); setTimeout(() => setCommentSaved(false), 2000); }} className="btn btn-primary btn-sm">
                      {commentSaved ? <><Check size={13} />Sauvegardé</> : <><MessageSquare size={13} />Enregistrer</>}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
