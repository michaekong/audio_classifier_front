import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AudioWaveform as Waveform, 
  Play, 
  Info, 
  Download, 
  Star, 
  Tag, 
  ChevronRight,
  Volume2,
  Activity,
  Layers,
  Briefcase
} from 'lucide-react';
import { ModelPortfolio } from '../types';
import { useTheme } from '../context/ThemeContext';

const portfolios: ModelPortfolio[] = [
  {
    id: '1',
    name: 'AfroBeatsID',
    description: 'Classification de genres musicaux africains (Makossa, Afrobeats, Amapiano). Analyse rythmique et spectrale haute fidélité.',
    accuracy: 91.2,
    f1Score: 89.5,
    price: 0,
    tags: ['Musique', 'Culture', 'Afrique'],
    rating: 4.8,
    reviews: 512,
    author: 'KultureAI',
    category: 'music'
  },
  {
    id: '2',
    name: 'VibraPredict',
    description: 'Maintenance prédictive industrielle. Détecte les anomalies de roulements et de moteurs avant la panne.',
    accuracy: 95.4,
    f1Score: 94.1,
    price: 50,
    tags: ['Industrie', 'IoT', 'Maintenance'],
    rating: 4.5,
    reviews: 128,
    author: 'IndusTech',
    category: 'industrial'
  },
  {
    id: '3',
    name: 'RespiDiag-Pro',
    description: 'Diagnostic assisté des pathologies respiratoires par analyse de toux. Détection COVID, Asthme, Pneumonie.',
    accuracy: 92.8,
    f1Score: 92.0,
    price: 0,
    tags: ['Santé', 'Médical', 'IA'],
    rating: 4.9,
    reviews: 342,
    author: 'HealthSound',
    category: 'medical'
  },
  {
    id: '7',
    name: 'BabyCry-AI',
    description: 'Traducteur de pleurs de bébé. Identifie : Faim, Sommeil, Couche sale, Coliques ou Besoin de câlin.',
    accuracy: 89.7,
    f1Score: 88.4,
    price: 0,
    tags: ['Pédiatrie', 'Parentalité', 'Santé'],
    rating: 4.7,
    reviews: 890,
    author: 'BabyCare Tech',
    category: 'medical'
  },
  {
    id: '4',
    name: 'AgriSound-X',
    description: 'Détection précoce de parasites dans les cultures. Analyse le bruit de mastication des insectes.',
    accuracy: 88.5,
    f1Score: 87.2,
    price: 25,
    tags: ['Agriculture', 'SmartFarming'],
    rating: 4.2,
    reviews: 96,
    author: 'AgriAI',
    category: 'agriculture'
  }
];

export const Portfolios: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string | null>(portfolios[0].id);
  const { isDark } = useTheme();

  const selectedPortfolio = portfolios.find(p => p.id === selectedId);

  return (
    <div className="p-6 space-y-10 animate-fade-in pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight flex items-center gap-4">
            <Briefcase className="w-10 h-10 text-electric" />
            Console de <span className="text-electric">Portefeuilles</span>
          </h1>
          <p className="text-slate-400 mt-2 max-w-xl font-medium">
            Explorez nos collections thématiques de modèles audio comme une console de mixage professionnelle.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-slate-900/50 p-1.5 rounded-2xl border border-slate-800">
          <button className="px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest bg-electric text-white shadow-lg shadow-electric/20 transition-all">Console</button>
          <button className="px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest text-slate-500 hover:text-white transition-all">Grille</button>
        </div>
      </div>

      {/* Sound Console Layout */}
      <div className="flex flex-col lg:flex-row gap-8 min-h-[600px]">
        {/* Channel Strips */}
        <div className="flex-1 flex gap-5 overflow-x-auto pb-8 no-scrollbar snap-x snap-mandatory">
          {portfolios.map((p, index) => (
            <motion.div
              key={p.id}
              layoutId={p.id}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedId(p.id)}
              className={`relative flex-shrink-0 w-36 md:w-44 h-[500px] md:h-[650px] rounded-[3rem] cursor-pointer transition-all duration-500 overflow-hidden border-2 snap-center ${
                selectedId === p.id 
                  ? 'border-electric bg-cream dark:bg-slate-900 shadow-2xl shadow-electric/20 ring-4 ring-electric/5' 
                  : 'border-slate-800 bg-slate-900/40 hover:bg-slate-900/60 shadow-sm'
              }`}
            >
              {/* Channel Label */}
              <div className="absolute top-10 left-1/2 -translate-x-1/2 -rotate-90 origin-center whitespace-nowrap">
                <span className={`text-[10px] font-black uppercase tracking-[0.4em] transition-colors ${selectedId === p.id ? 'text-electric' : 'text-slate-600'}`}>
                  CH-{String(index + 1).padStart(2, '0')}
                </span>
              </div>

              {/* Fader Track */}
              <div className="absolute inset-y-24 left-1/2 -translate-x-1/2 w-2 bg-slate-800 rounded-full shadow-inner">
                {/* Fader Knob */}
                <motion.div 
                  animate={{ top: selectedId === p.id ? '25%' : '75%' }}
                  className={`absolute left-1/2 -translate-x-1/2 w-14 h-24 rounded-2xl shadow-2xl border-2 flex flex-col items-center justify-center gap-2 transition-colors ${
                    selectedId === p.id 
                      ? 'bg-electric border-electric text-white' 
                      : 'bg-slate-800 border-slate-700 text-slate-500'
                  }`}
                >
                  <div className={`w-8 h-1 rounded-full ${selectedId === p.id ? 'bg-white/50' : 'bg-slate-600'}`} />
                  <div className={`w-8 h-1 rounded-full ${selectedId === p.id ? 'bg-white/50' : 'bg-slate-600'}`} />
                  <div className={`w-8 h-1 rounded-full ${selectedId === p.id ? 'bg-white/50' : 'bg-slate-600'}`} />
                </motion.div>
              </div>

              {/* Level Meter */}
              <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col gap-1.5">
                {[...Array(16)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ 
                      opacity: selectedId === p.id ? (i < 12 ? 1 : 0.4) : (i < 4 ? 0.8 : 0.1),
                      backgroundColor: i > 13 ? '#EF4444' : i > 11 ? '#F59E0B' : '#10B981',
                      scale: selectedId === p.id && i < 12 ? [1, 1.2, 1] : 1
                    }}
                    transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.05 }}
                    className="w-8 h-2 rounded-full shadow-sm"
                  />
                ))}
              </div>

              {/* Vertical Title */}
              <div className="absolute bottom-44 left-1/2 -translate-x-1/2 -rotate-90 origin-center whitespace-nowrap">
                <span className={`text-sm font-black uppercase tracking-[0.2em] transition-colors ${selectedId === p.id ? 'text-electric' : 'text-white'}`}>
                  {p.name}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Details Panel */}
        <AnimatePresence mode="wait">
          {selectedPortfolio ? (
            <motion.div
              key={selectedPortfolio.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full lg:w-[550px] studio-card p-12 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-96 h-96 bg-electric/5 rounded-full blur-[100px] -mr-48 -mt-48" />
              
              <div className="relative z-10 space-y-10">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-electric font-black text-xs uppercase tracking-[0.3em] mb-2">
                      <Volume2 size={16} />
                      {selectedPortfolio.category}
                    </div>
                    <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">{selectedPortfolio.name}</h2>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mt-1">Propulsé par {selectedPortfolio.author}</p>
                  </div>
                  <div className="flex items-center gap-1.5 bg-warning/10 text-warning px-4 py-2 rounded-2xl text-sm font-black">
                    <Star size={16} fill="currentColor" />
                    {selectedPortfolio.rating}
                  </div>
                </div>

                <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                  {selectedPortfolio.description}
                </p>

                {/* Performance Metrics */}
                <div className="p-8 bg-slate-50 dark:bg-slate-800/50 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 space-y-8">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Analyse de Performance</span>
                    <Activity size={20} className="text-electric animate-pulse" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <p className="text-4xl font-black text-success tracking-tighter">{selectedPortfolio.accuracy}%</p>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Précision</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-4xl font-black text-electric tracking-tighter">{selectedPortfolio.f1Score}%</p>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">F1 Score</p>
                    </div>
                  </div>

                  {/* Waveform Visualization */}
                  <div className="h-24 flex items-center justify-between gap-1.5 px-2">
                    {[...Array(35)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{ height: [15, Math.random() * 60 + 15, 15] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.04 }}
                        className="flex-1 bg-electric/20 rounded-full"
                      />
                    ))}
                  </div>
                </div>

                <div className="space-y-5">
                  <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                    <Layers size={16} />
                    Composants du Portefeuille
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {selectedPortfolio.tags.map(tag => (
                      <span key={tag} className="px-4 py-2 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-slate-100 dark:border-slate-700 shadow-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-10 border-t border-slate-100 dark:border-slate-800">
                  <div className="font-black text-4xl text-slate-900 dark:text-white tracking-tighter">
                    {selectedPortfolio.price === 0 ? 'FREE' : `${selectedPortfolio.price}€`}
                  </div>
                  <div className="flex gap-4">
                    <button className="p-5 text-slate-400 hover:text-electric hover:bg-electric/10 rounded-2xl transition-all">
                      <Info size={24} />
                    </button>
                    <button className="btn-primary py-5 px-12 text-sm font-black uppercase tracking-widest flex items-center gap-4 shadow-2xl shadow-electric/30 rounded-2xl">
                      <Download size={24} />
                      DÉPLOYER
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="w-full lg:w-[550px] flex flex-col items-center justify-center text-center p-16 bg-slate-900/40 rounded-[3.5rem] border-4 border-dashed border-slate-800">
              <div className="w-28 h-28 bg-slate-800 rounded-[2.5rem] flex items-center justify-center text-slate-600 mb-10 shadow-inner">
                <Waveform size={56} />
              </div>
              <h3 className="text-3xl font-black text-white uppercase tracking-wider">Sélectionnez un canal</h3>
              <p className="text-base text-slate-500 mt-4 font-medium max-w-[280px] leading-relaxed">Cliquez sur une tranche de console pour voir les détails du portefeuille.</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
