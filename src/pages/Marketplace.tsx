import React, { useState, useEffect } from 'react';
import { Search, Mic, Filter, Sparkles, TrendingUp, Award, Anchor, Wind, Droplets, Volume2 } from 'lucide-react';
import { ModelPortfolio } from '@/src/types';
import { motion, AnimatePresence } from 'framer-motion';
import { SoundscapeMarketplace } from '../components/SoundscapeMarketplace';
import { WaveSpinner } from '../components/WaveSpinner';

const portfolios: ModelPortfolio[] = [
  {
    id: '1',
    name: 'AfroBeatsID',
    description: 'Classification de genres musicaux africains (Makossa, Afrobeats, Amapiano). Analyse rythmique et spectrale haute fidélité.',
    accuracy: 94.2,
    f1Score: 91.5,
    price: 0,
    tags: ['Musique', 'Culture', 'Afrique'],
    rating: 4.9,
    reviews: 312,
    author: 'Ethnomusicologue CM',
    category: 'music'
  },
  {
    id: '2',
    name: 'VibraPredict',
    description: 'Maintenance prédictive industrielle. Détecte les anomalies de roulements et de moteurs avant la panne.',
    accuracy: 96.4,
    f1Score: 95.1,
    price: 50,
    tags: ['Industrie', 'IoT', 'Maintenance'],
    rating: 4.6,
    reviews: 128,
    author: 'IndusTech',
    category: 'industrial'
  },
  {
    id: '3',
    name: 'RespiDiag-Pro',
    description: 'Diagnostic assisté des pathologies respiratoires par analyse de toux. Détection COVID, Asthme, Pneumonie.',
    accuracy: 93.8,
    f1Score: 92.5,
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
    accuracy: 91.7,
    f1Score: 90.4,
    price: 0,
    tags: ['Pédiatrie', 'Parentalité', 'Santé'],
    rating: 4.8,
    reviews: 890,
    author: 'BabyCare Tech',
    category: 'medical'
  },
  {
    id: '4',
    name: 'AgriSound-X',
    description: 'Détection précoce de parasites dans les cultures. Analyse le bruit de mastication des insectes.',
    accuracy: 89.5,
    f1Score: 88.2,
    price: 25,
    tags: ['Agriculture', 'SmartFarming'],
    rating: 4.4,
    reviews: 96,
    author: 'AgriAI',
    category: 'agriculture'
  }
];

import { useTheme } from '../context/ThemeContext';

export const Marketplace: React.FC = () => {
  const { isDark } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading of 3D assets
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleVoiceSearch = () => {
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      setSearchQuery('Makossa');
    }, 2000);
  };

  return (
    <div className="space-y-12 animate-fade-in pb-20">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <div className="max-w-2xl">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-electric font-black text-sm uppercase tracking-[0.3em] mb-4"
          >
            <Sparkles size={16} />
            Paysage Sonore Infini
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tighter">
            Océan de <span className="text-electric">Sons</span> Vivants
          </h1>
          <p className="text-white/60 mt-6 text-xl leading-relaxed font-medium max-w-xl">
            Naviguez dans un archipel de modèles IA où chaque île est une signature sonore unique. 
            Explorez, écoutez et forkez les meilleures innovations audio.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="relative group w-full sm:w-80">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-electric transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Rechercher une île..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/10 dark:bg-slate-900/50 border border-white/10 text-white rounded-2xl py-5 pl-14 pr-14 focus:outline-none focus:ring-4 focus:ring-electric/20 transition-all shadow-sm font-bold placeholder:text-white/30"
            />
            <button 
              onClick={handleVoiceSearch}
              className={`absolute right-5 top-1/2 -translate-y-1/2 p-2 rounded-xl transition-all ${isListening ? 'bg-alert text-white animate-pulse' : 'text-white/40 hover:text-electric hover:bg-electric/10'}`}
            >
              <Mic size={20} />
            </button>
          </div>
          <button className="w-full sm:w-auto btn-secondary py-5 px-10 rounded-2xl flex items-center justify-center gap-3 shadow-sm font-black uppercase tracking-widest text-xs">
            <Anchor size={20} />
            Journal de Bord
          </button>
        </div>
      </div>

      {/* Main Soundscape View */}
      <div className="relative min-h-[650px] rounded-[4rem] overflow-hidden border-8 border-white/5 shadow-2xl">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div 
              key="loader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-50 bg-navy flex flex-col items-center justify-center gap-8"
            >
              <WaveSpinner size={140} color="#3B82F6" />
              <div className="text-center space-y-3">
                <p className="text-electric font-black uppercase tracking-[0.5em] text-sm animate-pulse">Initialisation de l'Océan</p>
                <p className="text-white/30 text-[10px] font-black uppercase tracking-[0.3em]">Chargement des Waveforms 3D...</p>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
        <SoundscapeMarketplace />
      </div>

      {/* Secondary Info Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 bg-cream dark:bg-slate-900 rounded-[3.5rem] p-12 border border-white/10 shadow-sm">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 bg-warning/10 text-warning rounded-2xl flex items-center justify-center shadow-inner">
                <Award size={32} />
              </div>
              <h3 className="text-3xl font-black text-navy dark:text-white uppercase tracking-wider">Archipel des Leaders</h3>
            </div>
            <button className="text-xs font-black text-electric uppercase tracking-[0.2em] hover:underline">Voir tous les phares</button>
          </div>

          <div className="space-y-8">
            {portfolios.slice(0, 3).map((p, i) => (
              <div key={p.id} className="flex items-center justify-between p-8 bg-navy/5 dark:bg-slate-800/50 rounded-[2.5rem] group hover:bg-electric/5 transition-all cursor-pointer border border-transparent hover:border-electric/20">
                <div className="flex items-center gap-10">
                  <span className="text-4xl font-black text-navy/5 dark:text-slate-700 italic">0{i + 1}</span>
                  <div className="flex items-center gap-6">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-2xl transition-transform group-hover:scale-110 ${
                      p.category === 'medical' ? 'bg-blue-500' : 
                      p.category === 'music' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}>
                      <Wind size={32} />
                    </div>
                    <div>
                      <p className="font-black text-2xl text-navy dark:text-white group-hover:text-electric transition-colors tracking-tighter">{p.name}</p>
                      <p className="text-[10px] text-slate-400 uppercase font-black tracking-[0.3em] mt-1">{p.author}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-16">
                  <div className="text-right">
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Partages</p>
                    <p className="font-black text-2xl text-navy dark:text-white">{p.reviews + 120}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Précision</p>
                    <p className="font-black text-2xl text-success">{p.accuracy}%</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-cream dark:bg-slate-900 rounded-[3.5rem] p-12 border border-white/10 shadow-sm flex flex-col">
          <div className="flex items-center gap-5 mb-12">
            <div className="w-14 h-14 bg-electric/10 text-electric rounded-2xl flex items-center justify-center shadow-inner">
              <TrendingUp size={32} />
            </div>
            <h3 className="text-3xl font-black text-navy dark:text-white uppercase tracking-wider">Courants IA</h3>
          </div>
          
          <div className="space-y-12 flex-1">
            <div className="p-8 bg-navy/5 dark:bg-slate-800 rounded-[2.5rem] border border-white/10">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Expansion de l'Océan</p>
              <div className="flex items-end gap-3">
                <span className="text-6xl font-black text-navy dark:text-white tracking-tighter">+12.4%</span>
                <span className="text-lg font-bold text-success mb-3">↑</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              <div className="p-8 bg-navy/5 dark:bg-slate-800 rounded-[2.5rem] border border-white/10 flex items-center justify-between group hover:border-electric/30 transition-all">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Nouveaux Forks</p>
                  <p className="text-4xl font-black text-navy dark:text-white">2,481</p>
                </div>
                <Droplets className="text-electric opacity-20 group-hover:opacity-100 transition-opacity" size={48} />
              </div>
              <div className="p-8 bg-navy/5 dark:bg-slate-800 rounded-[2.5rem] border border-white/10 flex items-center justify-between group hover:border-electric/30 transition-all">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Îles Actives</p>
                  <p className="text-4xl font-black text-navy dark:text-white">156</p>
                </div>
                <Anchor className="text-electric opacity-20 group-hover:opacity-100 transition-opacity" size={48} />
              </div>
            </div>
          </div>

          <button className="w-full py-6 bg-electric text-white font-black rounded-[1.5rem] shadow-2xl shadow-electric/30 hover:scale-[1.02] active:scale-95 transition-all mt-12 uppercase tracking-[0.3em] text-sm">
            Lancer une Expédition
          </button>
        </div>
      </div>
    </div>
  );
};
