import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  Zap, ArrowRight, Play, Check, Shield, Globe, Cpu, Star,
  Mic, BarChart2, Brain, Database, ChevronLeft, ChevronRight,
  Upload, Activity, Target, Users, TrendingUp, Layers
} from 'lucide-react';

/* ── Waveform hero animation ── */
function HeroWave({ color = '#2563eb' }: { color?: string }) {
  return (
    <div className="flex items-end gap-[3px] h-20">
      {[...Array(48)].map((_, i) => (
        <motion.div key={i}
          animate={{ scaleY: [0.1, 0.3 + Math.sin(i * 0.4) * 0.7 + Math.random() * 0.5, 0.1] }}
          transition={{ duration: 0.8 + i * 0.03, repeat: Infinity, ease: 'easeInOut', delay: i * 0.04 }}
          className="flex-1 rounded-full origin-bottom"
          style={{ background: color, height: '100%', opacity: 0.7 + i / 100 }}
        />
      ))}
    </div>
  );
}

/* ── Counter ── */
function Counter({ to, duration = 1.5, suffix = '' }: { to: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = to / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= to) { setCount(to); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [inView, to, duration]);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

/* ── Carousel ── */
const TESTIMONIALS = [
  { name: 'Dr. Sophie Eboa', role: 'Chercheure en Santé IA', org: 'Univ. Yaoundé', text: 'RespiDiag-Pro a transformé notre screening COVID dans les zones rurales. 92% de précision avec un simple micro de téléphone.', stars: 5, avatar: 'S' },
  { name: 'Jean-Marc Diallo', role: 'Responsable Maintenance', org: 'Sonara Cameroun', text: 'VibraPredict détecte les défauts de roulements 72h avant la panne. Nos coûts de maintenance ont chuté de 40%.', stars: 5, avatar: 'J' },
  { name: 'Amara Keïta', role: 'Musicologue & Développeur', org: 'Mali Music Lab', text: 'AfroBeatsID classifie parfaitement Makossa, Zoblazo et Ndombolo. Enfin un modèle formé sur nos musiques !', stars: 5, avatar: 'A' },
  { name: 'Fatou Sarr', role: 'Agronome', org: 'AgriTech Sénégal', text: 'AgriSound détecte les criquets 2 jours avant qu\'ils ne soient visibles. Ma récolte de sorgho est sauvée cette saison.', stars: 5, avatar: 'F' },
];

const FEATURES = [
  { icon: Mic, title: 'Mode Prédicateur', desc: 'Uploadez un audio, choisissez un portefeuille, obtenez des prédictions instantanées. Pas de code requis.', color: '#2563eb', badge: 'Accessible à tous' },
  { icon: Brain, title: 'Studio d\'Entraînement', desc: 'Interface visuelle type n8n pour créer vos workflows ML : dataset → embedding → modèle → train. Pour les experts.', color: '#7c3aed', badge: 'Pour les ingénieurs ML' },
  { icon: Database, title: 'Bibliothèque de Datasets', desc: '5+ datasets prêts à l\'emploi (UrbanSound8K, ESC-50…) avec métriques, classes et système d\'avis communautaire.', color: '#10b981', badge: 'Open & Custom' },
  { icon: Layers, title: 'Portefeuilles de Modèles', desc: 'Collections thématiques de modèles entraînés : médical, musique, industrie, agriculture. Déployez en 1 clic.', color: '#f59e0b', badge: 'Prêt en production' },
  { icon: BarChart2, title: 'Analytics Avancés', desc: 'Suivez précision, latence, dérive de distribution et utilisation de vos modèles en temps réel.', color: '#06b6d4', badge: 'Monitoring continu' },
  { icon: Shield, title: 'Sécurité Entreprise', desc: 'Authentification 2FA, clés API, isolation des données, audit logs. Certifié RGPD et HIPAA.', color: '#ef4444', badge: 'Niveau entreprise' },
];

const STEPS_PREDICTOR = [
  { icon: Upload, title: 'Uploadez', desc: 'Glissez votre fichier audio (WAV, MP3, FLAC) ou activez votre micro' },
  { icon: Layers, title: 'Choisissez', desc: 'Sélectionnez un portefeuille de modèles adapté à votre besoin' },
  { icon: Zap, title: 'Prédisez', desc: 'Tous les modèles du portefeuille analysent simultanément' },
  { icon: Target, title: 'Interprétez', desc: 'Résultats visuels avec probabilités, radar chart et explications SHAP' },
];

const STEPS_ENGINEER = [
  { icon: Database, title: 'Dataset', desc: 'Importez ou choisissez un dataset parmi notre bibliothèque' },
  { icon: Layers, title: 'Embedding', desc: 'MFCC, Mel Spectrogram, Wav2Vec, CLAP, PANNs…' },
  { icon: Brain, title: 'Architecture', desc: 'CNN, ResNet, Transformer, LSTM ou hybride' },
  { icon: Activity, title: 'Entraînez', desc: 'Suivi live des métriques : loss, accuracy, F1 par epoch' },
];

export const LandingPage: React.FC = () => {
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [activeView, setActiveView] = useState<'predictor'|'engineer'>('predictor');

  const next = () => setTestimonialIdx(i => (i + 1) % TESTIMONIALS.length);
  const prev = () => setTestimonialIdx(i => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  useEffect(() => {
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="min-h-screen" style={{ background: '#050d1f', color: '#e4eeff', fontFamily: "'Space Grotesk',sans-serif" }}>
      {/* Nav */}
      <nav className="h-14 px-5 md:px-10 flex items-center justify-between sticky top-0 z-50 border-b border-white/5" style={{ background: 'rgba(5,13,31,0.85)', backdropFilter: 'blur(16px)' }}>
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-electric flex items-center justify-center shadow-lg shadow-electric/30">
            <Zap size={16} className="text-white" />
          </div>
          <span style={{ fontFamily: "'Syne',sans-serif" }} className="font-bold text-base text-white">AudioClass <span style={{ color: '#60a5fa' }}>AI</span></span>
        </div>
        <div className="hidden md:flex items-center gap-7 text-xs font-semibold text-white/40">
          {['Fonctionnalités','Solutions','Tarifs','API'].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} className="hover:text-white transition-colors">{l}</a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <Link to="/auth" className="text-xs font-semibold text-white/40 hover:text-white transition-colors hidden sm:block">Connexion</Link>
          <Link to="/auth" className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white transition-all"
            style={{ background: '#2563eb', boxShadow: '0 3px 12px rgba(37,99,235,.4)' }}>
            Démarrer <ArrowRight size={14} />
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative px-5 md:px-10 pt-20 pb-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <motion.div animate={{ scale: [1, 1.15, 1], opacity: [.15, .25, .15] }} transition={{ duration: 10, repeat: Infinity }}
            className="absolute -top-1/3 -right-1/3 w-[700px] h-[700px] rounded-full blur-[120px]" style={{ background: '#2563eb' }} />
          <motion.div animate={{ scale: [1, 1.2, 1], opacity: [.1, .18, .1] }} transition={{ duration: 14, repeat: Infinity }}
            className="absolute -bottom-1/4 -left-1/4 w-[500px] h-[500px] rounded-full blur-[100px]" style={{ background: '#7c3aed' }} />
        </div>

        <div className="max-w-6xl mx-auto relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }} className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6 border border-white/10" style={{ background: 'rgba(37,99,235,.15)', color: '#60a5fa' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-electric animate-pulse" />
              Plateforme ML Audio · Cameroun × Afrique
            </div>
            <h1 style={{ fontFamily: "'Syne',sans-serif", lineHeight: 1.05 }} className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-5">
              Classifiez vos sons avec une <span style={{ color: '#60a5fa' }}>précision</span> chirurgicale.
            </h1>
            <p className="text-base sm:text-lg text-white/50 max-w-xl mb-8 leading-relaxed">
              La seule plateforme avec <strong className="text-white/80">deux modes</strong> : un pour prédire sans code, un autre pour entraîner vos propres modèles. Audio classifié en millisecondes.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/auth" className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-navy transition-all" style={{ background: '#ffffff' }}>
                Commencer gratuitement <ArrowRight size={16} />
              </Link>
              <Link to="/predict" className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm border border-white/15 text-white hover:bg-white/5 transition-all">
                <Play size={15} fill="currentColor" /> Voir la démo live
              </Link>
            </div>
            <div className="flex items-center gap-6 mt-8">
              {[['42K+','Prédictions/jour'], ['95%','Précision max'], ['8','Portefeuilles']].map(([v, l]) => (
                <div key={l}>
                  <div className="font-display font-bold text-lg" style={{ color: '#60a5fa' }}>{v}</div>
                  <div className="text-[10px] text-white/30 uppercase tracking-wide">{l}</div>
                </div>
              ))}
            </div>
          </motion.div>
          {/* Waveform display */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .4, duration: .7 }}
            className="mt-12 rounded-2xl p-6 border" style={{ background: 'rgba(255,255,255,.04)', borderColor: 'rgba(255,255,255,.08)' }}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                <span className="text-xs font-mono text-white/40">LIVE · RespiDiag-Pro · Analyse en cours…</span>
              </div>
              <span className="text-xs font-mono text-white/20">16ms latency</span>
            </div>
            <HeroWave />
            <div className="flex items-center gap-3 mt-4 flex-wrap">
              {[['COVID-19','87%','#ef4444'],['Bronchite','8%','#f59e0b'],['Sain','5%','#10b981']].map(([l,p,c]) => (
                <div key={l as string} className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs" style={{ background: (c as string) + '20', border: `1px solid ${(c as string)}30` }}>
                  <span className="font-bold" style={{ color: c as string }}>{p}</span>
                  <span className="text-white/40">{l}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-y border-white/5" style={{ background: 'rgba(255,255,255,.02)' }}>
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 px-5">
          {[
            { to: 42800, suffix: '+', label: 'Prédictions aujourd\'hui' },
            { to: 95,    suffix: '%', label: 'Précision max atteinte' },
            { to: 5,     suffix: '',  label: 'Portefeuilles disponibles' },
            { to: 28600, suffix: '+', label: 'Utilisateurs actifs' },
          ].map(({ to, suffix, label }) => (
            <div key={label} className="text-center">
              <div style={{ fontFamily: "'Syne',sans-serif", color: '#60a5fa' }} className="text-3xl sm:text-4xl font-bold">
                <Counter to={to} suffix={suffix} />
              </div>
              <div className="text-xs text-white/30 mt-1 uppercase tracking-wide">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Two modes */}
      <section id="fonctionnalités" className="py-20 px-5 md:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-4 border border-white/10" style={{ color: '#60a5fa', background: 'rgba(37,99,235,.1)' }}>
              <Layers size={12} />Deux vues, une plateforme
            </div>
            <h2 style={{ fontFamily: "'Syne',sans-serif" }} className="text-3xl sm:text-4xl font-bold text-white mb-3">
              Conçu pour <span style={{ color: '#60a5fa' }}>tous les niveaux</span>
            </h2>
            <p className="text-white/40 max-w-lg mx-auto text-sm">Que vous soyez chercheur, clinicien ou ingénieur ML, AudioClass AI s'adapte à votre expertise.</p>
          </div>
          {/* Mode switcher */}
          <div className="flex justify-center mb-10">
            <div className="flex p-1 rounded-2xl border border-white/10" style={{ background: 'rgba(255,255,255,.04)' }}>
              {[['predictor','🎯 Mode Prédicteur'],['engineer','⚙️ Mode Studio ML']].map(([k, l]) => (
                <button key={k} onClick={() => setActiveView(k as any)}
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
                  style={activeView === k ? { background: '#2563eb', color: '#fff', boxShadow: '0 3px 12px rgba(37,99,235,.5)' } : { color: 'rgba(255,255,255,.4)' }}>
                  {l}
                </button>
              ))}
            </div>
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={activeView} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {(activeView === 'predictor' ? STEPS_PREDICTOR : STEPS_ENGINEER).map((step, i) => (
                  <div key={i} className="relative rounded-2xl p-5 border" style={{ background: 'rgba(255,255,255,.04)', borderColor: 'rgba(255,255,255,.08)' }}>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: activeView === 'predictor' ? 'rgba(37,99,235,.2)' : 'rgba(124,58,237,.2)' }}>
                        <step.icon size={16} style={{ color: activeView === 'predictor' ? '#60a5fa' : '#a78bfa' }} />
                      </div>
                      <span className="text-xs font-mono text-white/20">0{i+1}</span>
                    </div>
                    <h3 className="font-bold text-sm text-white mb-1">{step.title}</h3>
                    <p className="text-xs text-white/40 leading-relaxed">{step.desc}</p>
                    {i < 3 && <ChevronRight size={14} className="absolute top-5 right-3 text-white/15" />}
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <Link to={activeView === 'predictor' ? '/predict' : '/train'}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all"
                  style={{ background: activeView === 'predictor' ? '#2563eb' : '#7c3aed', boxShadow: `0 4px 16px ${activeView === 'predictor' ? 'rgba(37,99,235,.4)' : 'rgba(124,58,237,.4)'}` }}>
                  Essayer le {activeView === 'predictor' ? 'Prédicteur' : 'Studio ML'} <ArrowRight size={15} />
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Features grid */}
      <section className="py-16 px-5 md:px-10 border-t border-white/5" style={{ background: 'rgba(255,255,255,.02)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 style={{ fontFamily: "'Syne',sans-serif" }} className="text-3xl font-bold text-white mb-2">Tout ce dont vous avez besoin</h2>
            <p className="text-white/40 text-sm">Une suite complète pour le traitement audio par IA</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * .08 }} viewport={{ once: true }}
                whileHover={{ y: -4 }}
                className="rounded-2xl p-5 border" style={{ background: 'rgba(255,255,255,.04)', borderColor: 'rgba(255,255,255,.08)' }}>
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: f.color + '20' }}>
                    <f.icon size={20} style={{ color: f.color }} />
                  </div>
                  <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full" style={{ background: f.color + '18', color: f.color }}>{f.badge}</span>
                </div>
                <h3 className="font-bold text-sm text-white mb-1.5">{f.title}</h3>
                <p className="text-xs text-white/40 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials carousel */}
      <section className="py-16 px-5 md:px-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 style={{ fontFamily: "'Syne',sans-serif" }} className="text-3xl font-bold text-white mb-2">Ce qu'ils disent</h2>
            <p className="text-white/40 text-sm">Des professionnels de tout le continent</p>
          </div>
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div key={testimonialIdx} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
                className="rounded-2xl p-7 border" style={{ background: 'rgba(255,255,255,.05)', borderColor: 'rgba(255,255,255,.1)' }}>
                <div className="flex gap-0.5 mb-4">
                  {[...Array(TESTIMONIALS[testimonialIdx].stars)].map((_, i) => <Star key={i} size={14} className="fill-current" style={{ color: '#f59e0b' }} />)}
                </div>
                <p className="text-white/70 text-sm leading-relaxed mb-5 italic">"{TESTIMONIALS[testimonialIdx].text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold" style={{ background: 'linear-gradient(135deg,#2563eb,#7c3aed)' }}>
                    {TESTIMONIALS[testimonialIdx].avatar}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{TESTIMONIALS[testimonialIdx].name}</p>
                    <p className="text-xs text-white/40">{TESTIMONIALS[testimonialIdx].role} · {TESTIMONIALS[testimonialIdx].org}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="flex items-center justify-between mt-4">
              <button onClick={prev} className="p-2 rounded-xl border border-white/10 text-white/40 hover:text-white hover:border-white/30 transition-all"><ChevronLeft size={18} /></button>
              <div className="flex gap-1.5">
                {TESTIMONIALS.map((_, i) => (
                  <button key={i} onClick={() => setTestimonialIdx(i)} className="w-1.5 h-1.5 rounded-full transition-all"
                    style={{ background: i === testimonialIdx ? '#2563eb' : 'rgba(255,255,255,.2)' }} />
                ))}
              </div>
              <button onClick={next} className="p-2 rounded-xl border border-white/10 text-white/40 hover:text-white hover:border-white/30 transition-all"><ChevronRight size={18} /></button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-5 md:px-10">
        <div className="max-w-2xl mx-auto text-center rounded-2xl p-10 border" style={{ background: 'rgba(37,99,235,.12)', borderColor: 'rgba(37,99,235,.3)' }}>
          <h2 style={{ fontFamily: "'Syne',sans-serif" }} className="text-3xl font-bold text-white mb-3">Prêt à commencer ?</h2>
          <p className="text-white/50 text-sm mb-7">Gratuit, sans carte de crédit. Accessible depuis n'importe quel navigateur.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/auth" className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white" style={{ background: '#2563eb', boxShadow: '0 4px 16px rgba(37,99,235,.5)' }}>
              Créer un compte gratuit <ArrowRight size={15} />
            </Link>
            <Link to="/predict" className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm border border-white/15 text-white hover:bg-white/5 transition-all">
              <Play size={14} fill="currentColor" /> Tester sans inscription
            </Link>
          </div>
          <div className="flex items-center justify-center gap-6 mt-7">
            {[['✓ Gratuit pour commencer'],['✓ Aucun code requis'],['✓ 5 portefeuilles inclus']].map(([t]) => (
              <span key={t as string} className="text-xs text-white/40">{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 px-5 md:px-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-electric flex items-center justify-center"><Zap size={12} className="text-white" /></div>
            <span className="text-sm text-white/40">AudioClass AI · © 2025</span>
          </div>
          <div className="flex gap-6 text-xs text-white/25">
            {['Confidentialité','CGU','API Docs','Contact'].map(l => <a key={l} href="#" className="hover:text-white/50 transition-colors">{l}</a>)}
          </div>
        </div>
      </footer>
    </div>
  );
};
