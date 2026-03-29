import React from 'react';
import { Link } from 'react-router-dom';
import { 
  AudioWaveform as Waveform, 
  ArrowRight, 
  Zap, 
  Shield, 
  Globe, 
  Cpu, 
  CheckCircle2,
  Play
} from 'lucide-react';
import { motion } from 'framer-motion';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-navy text-white font-sans overflow-hidden relative">
      {/* Immersive Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 5, 0],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-1/4 -right-1/4 w-[1000px] h-[1000px] bg-electric/20 rounded-full blur-[150px]"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [0, -8, 0],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-1/4 -left-1/4 w-[800px] h-[800px] bg-blue-900/30 rounded-full blur-[120px]"
        />
      </div>

      {/* Navigation */}
      <nav className="h-24 px-6 md:px-12 flex items-center justify-between sticky top-0 bg-navy/80 backdrop-blur-xl z-50 border-b border-white/5">
        <div className="flex items-center gap-4">
          <div className="bg-electric p-2.5 rounded-2xl text-white shadow-lg shadow-electric/20 rotate-3">
            <Waveform size={28} />
          </div>
          <span className="font-black text-2xl tracking-tighter uppercase">AudioClass <span className="text-electric">AI</span></span>
        </div>
        
        <div className="hidden lg:flex items-center gap-10 text-[11px] font-black uppercase tracking-[0.2em] text-white/60">
          <a href="#features" className="hover:text-electric transition-colors">Fonctionnalités</a>
          <a href="#solutions" className="hover:text-electric transition-colors">Solutions</a>
          <a href="#pricing" className="hover:text-electric transition-colors">Tarifs</a>
          <Link to="/api-docs" className="hover:text-electric transition-colors">API</Link>
        </div>

        <div className="flex items-center gap-6">
          <Link to="/auth" className="text-[11px] font-black text-white/60 hover:text-white transition-colors hidden sm:block uppercase tracking-[0.2em]">Connexion</Link>
          <Link to="/auth" className="bg-electric hover:bg-blue-600 text-white px-8 py-3.5 rounded-2xl font-black text-xs tracking-[0.1em] shadow-xl shadow-electric/20 transition-all active:scale-95 flex items-center gap-3">
            DÉMARRER
            <ArrowRight size={18} />
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 pb-40 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-10"
          >
            <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-electric/10 border border-electric/20 text-electric rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
              <Zap size={16} />
              L'IA au service de l'audio
            </div>
            <h1 className="text-6xl lg:text-8xl font-black leading-[0.9] tracking-tighter uppercase">
              Classifiez vos sons avec une <span className="text-electric italic">précision</span> chirurgicale.
            </h1>
            <p className="text-xl text-white/60 max-w-xl leading-relaxed font-medium">
              La plateforme tout-en-un pour les ingénieurs ML et les professionnels de l'audio. Entraînez, déployez et prédisez en quelques clics.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
              <Link to="/auth" className="w-full sm:w-auto bg-white text-navy px-10 py-5 rounded-2xl text-sm font-black tracking-[0.1em] flex items-center justify-center gap-3 shadow-2xl shadow-white/10 hover:bg-slate-100 transition-all">
                DÉMARRER MAINTENANT
                <ArrowRight size={22} />
              </Link>
              <button className="w-full sm:w-auto border-2 border-white/10 hover:bg-white/5 px-10 py-5 rounded-2xl text-sm font-black tracking-[0.1em] flex items-center justify-center gap-3 transition-all">
                <Play size={22} fill="currentColor" />
                VOIR LA DÉMO
              </button>
            </div>
            <div className="flex items-center gap-10 pt-10">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-12 h-12 rounded-2xl border-4 border-navy bg-slate-800 overflow-hidden shadow-xl">
                    <img src={`https://picsum.photos/seed/${i+20}/100/100`} alt="User" referrerPolicy="no-referrer" />
                  </div>
                ))}
              </div>
              <p className="text-xs font-bold text-white/40 uppercase tracking-widest">
                Rejoint par <span className="text-white">+1,200</span> ingénieurs
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10 p-2 bg-white/5 rounded-[2.5rem] border border-white/10 shadow-2xl backdrop-blur-3xl overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-electric/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <img 
                src="https://picsum.photos/seed/audio-studio/1200/800" 
                alt="Dashboard Preview" 
                className="rounded-[2rem] shadow-2xl relative z-10"
                referrerPolicy="no-referrer"
              />
              
              {/* Floating UI Elements */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-10 -right-6 bg-cream p-4 rounded-2xl shadow-2xl z-20 border border-white/20 hidden md:block"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-electric/10 rounded-xl flex items-center justify-center text-electric">
                    <Zap size={20} />
                  </div>
                  <div>
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Précision</div>
                    <div className="text-lg font-black text-navy leading-none">99.8%</div>
                  </div>
                </div>
              </motion.div>
            </div>
            
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-electric/20 rounded-full blur-[100px] animate-pulse"></div>
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-900/30 rounded-full blur-[100px]"></div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-40 bg-white/[0.02] border-y border-white/5 px-6 md:px-12 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-24 space-y-6">
            <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-none">
              Une suite d'outils <span className="text-electric">professionnelle</span>
            </h2>
            <p className="text-lg text-white/50 font-medium">Tout ce dont vous avez besoin pour passer de l'idée à la production.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { icon: Cpu, title: 'Entraînement GPU', desc: 'Entraînez vos modèles sur nos clusters NVIDIA T4 pour des performances optimales.' },
              { icon: Globe, title: 'Marketplace Mondiale', desc: 'Vendez vos portefeuilles de modèles ou utilisez ceux de la communauté.' },
              { icon: Shield, title: 'API Sécurisée', desc: 'Intégrez vos prédictions n\'importe où avec notre API REST documentée.' },
              { icon: Zap, title: 'Temps Réel', desc: 'Analyse audio en direct avec une latence ultra-faible pour les applications critiques.' },
              { icon: CheckCircle2, title: 'Explicabilité', desc: 'Comprenez pourquoi votre modèle a pris une décision grâce à l\'analyse SHAP.' },
              { icon: Waveform, title: 'Multi-Format', desc: 'Support complet des MFCC, Mel Spectrograms et CREPE pour l\'encodage.' },
            ].map((feature, i) => (
              <div key={i} className="bg-white/[0.03] border border-white/5 rounded-[2rem] p-10 hover:bg-white/[0.06] hover:border-white/10 transition-all duration-500 group">
                <div className="w-16 h-16 bg-electric/10 rounded-2xl flex items-center justify-center text-electric mb-8 group-hover:scale-110 transition-transform duration-500">
                  <feature.icon size={32} />
                </div>
                <h3 className="text-2xl font-black mb-4 uppercase tracking-tight">{feature.title}</h3>
                <p className="text-white/50 leading-relaxed font-medium">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy text-white py-32 px-6 md:px-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-20">
          <div className="col-span-1 md:col-span-1 space-y-8">
            <div className="flex items-center gap-4">
              <div className="bg-electric p-2.5 rounded-2xl text-white shadow-lg shadow-electric/20">
                <Waveform size={28} />
              </div>
              <span className="font-black text-2xl tracking-tighter uppercase">AudioClass <span className="text-electric">AI</span></span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed font-medium">
              La plateforme de référence pour la classification audio intelligente. Conçue pour les experts, accessible à tous.
            </p>
          </div>
          
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 mb-8">Produit</h4>
            <ul className="space-y-5 text-sm font-bold text-white/60">
              <li><Link to="/datasets" className="hover:text-electric transition-colors">Datasets</Link></li>
              <li><Link to="/train" className="hover:text-electric transition-colors">Entraînement</Link></li>
              <li><Link to="/predict" className="hover:text-electric transition-colors">Prédiction</Link></li>
              <li><Link to="/api-docs" className="hover:text-electric transition-colors">API REST</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 mb-8">Ressources</h4>
            <ul className="space-y-5 text-sm font-bold text-white/60">
              <li><Link to="/help" className="hover:text-electric transition-colors">Centre d'aide</Link></li>
              <li><Link to="/forum" className="hover:text-electric transition-colors">Communauté</Link></li>
              <li><Link to="/blog" className="hover:text-electric transition-colors">Blog</Link></li>
              <li><Link to="/tutorials" className="hover:text-electric transition-colors">Tutoriels</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 mb-8">Légal</h4>
            <ul className="space-y-5 text-sm font-bold text-white/60">
              <li><a href="#" className="hover:text-electric transition-colors">Confidentialité</a></li>
              <li><a href="#" className="hover:text-electric transition-colors">CGU</a></li>
              <li><a href="#" className="hover:text-electric transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-electric transition-colors">Mentions légales</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-32 pt-10 border-t border-white/5 text-center text-[10px] font-black uppercase tracking-[0.3em] text-white/20">
          © 2026 AudioClass AI. Propulsé par l'innovation.
        </div>
      </footer>
    </div>
  );
};
