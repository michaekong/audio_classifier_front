import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Database, 
  Search, 
  Filter, 
  Plus, 
  FileAudio, 
  BarChart3, 
  Clock, 
  CheckCircle2,
  ChevronRight,
  Download,
  Share2,
  MoreVertical,
  Activity
} from 'lucide-react';
import { WaveSpinner } from '../components/WaveSpinner';
import { useTheme } from '../context/ThemeContext';
import { cn } from '@/src/lib/utils';

interface Dataset {
  id: string;
  name: string;
  size: string;
  samples: number;
  type: string;
  status: 'Ready' | 'Processing' | 'Error';
  lastUpdated: string;
  description: string;
}

const mockDatasets: Dataset[] = [
  {
    id: '1',
    name: 'Ambient Soundscapes Vol. 1',
    size: '1.2 GB',
    samples: 450,
    type: 'WAV / 48kHz',
    status: 'Ready',
    lastUpdated: '2 hours ago',
    description: 'A collection of high-fidelity ambient recordings from urban and natural environments.'
  },
  {
    id: '2',
    name: 'Drum Machine Patterns',
    size: '450 MB',
    samples: 1200,
    type: 'AIFF / 44.1kHz',
    status: 'Ready',
    lastUpdated: '1 day ago',
    description: 'Clean drum hits and rhythmic patterns synthesized using vintage hardware models.'
  },
  {
    id: '3',
    name: 'Vocal Harmonics Dataset',
    size: '2.8 GB',
    samples: 890,
    type: 'WAV / 96kHz',
    status: 'Processing',
    lastUpdated: 'Just now',
    description: 'Multi-layered vocal harmonies and choral textures for granular synthesis.'
  }
];

export const Datasets: React.FC = () => {
  const { isDark } = useTheme();
  const [selectedDataset, setSelectedDataset] = useState<Dataset | null>(mockDatasets[0]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => setIsAnalyzing(false), 3000);
  };

  return (
    <div className="p-4 md:p-8 space-y-10 animate-fade-in pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight flex items-center gap-4">
            <div className="w-12 h-12 bg-electric/10 text-electric rounded-2xl flex items-center justify-center shadow-inner">
              <Database size={32} />
            </div>
            Audio <span className="text-electric">Datasets</span>
          </h1>
          <p className="text-white/60 mt-1 font-medium">Gérez et visualisez vos données d'entraînement pour AudioForge.</p>
        </div>
        <div className="flex gap-4">
           <button className="btn-secondary py-3.5 px-8 rounded-2xl text-xs font-black uppercase tracking-widest shadow-sm hover:shadow-md active:scale-95 transition-all flex items-center gap-2">
            <Filter size={18} className="text-electric" />
            Filtres avancés
          </button>
          <button className="btn-primary py-3.5 px-8 rounded-2xl text-xs font-black uppercase tracking-widest shadow-2xl shadow-electric/30 hover:shadow-electric/40 active:scale-95 transition-all flex items-center gap-2">
            <Plus size={18} />
            Importer un Dataset
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Dataset List */}
        <div className="lg:col-span-4 space-y-6">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-electric transition-colors" />
            <input 
              type="text" 
              placeholder="Rechercher un dataset..." 
              className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:ring-4 focus:ring-electric/10 focus:border-electric transition-all placeholder:text-slate-500 font-medium"
            />
          </div>

          <div className="space-y-4">
            {mockDatasets.map((ds) => (
              <motion.div
                key={ds.id}
                whileHover={{ x: 8, scale: 1.02 }}
                onClick={() => setSelectedDataset(ds)}
                className={cn(
                  "p-6 rounded-[2rem] border cursor-pointer transition-all relative group overflow-hidden",
                  selectedDataset?.id === ds.id 
                    ? 'bg-electric/10 border-electric shadow-xl shadow-electric/5' 
                    : 'bg-white/5 border-white/5 hover:border-white/10 hover:bg-white/10'
                )}
              >
                {selectedDataset?.id === ds.id && (
                  <div className="absolute top-0 right-0 w-24 h-24 bg-electric/10 rounded-full -mr-12 -mt-12 blur-2xl" />
                )}
                
                <div className="flex items-start justify-between relative z-10">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "p-3 rounded-xl transition-colors",
                      selectedDataset?.id === ds.id ? 'bg-electric text-white' : 'bg-white/10 text-slate-400'
                    )}>
                      <FileAudio size={24} />
                    </div>
                    <div>
                      <h3 className="font-black text-white uppercase tracking-tight">{ds.name}</h3>
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">{ds.samples} samples • {ds.size}</p>
                    </div>
                  </div>
                  <ChevronRight className={cn(
                    "w-5 h-5 transition-all",
                    selectedDataset?.id === ds.id ? 'text-electric rotate-90 scale-125' : 'text-slate-600'
                  )} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Dataset Details & Visualization */}
        <div className="lg:col-span-8 space-y-8">
          {selectedDataset ? (
            <div className="studio-card p-10 space-y-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-electric/5 rounded-full blur-[120px] -mr-48 -mt-48" />
              
              <div className="flex flex-col md:flex-row items-start justify-between gap-6 relative z-10">
                <div>
                  <div className="flex items-center gap-4 mb-3">
                    <h2 className="text-3xl font-black text-navy dark:text-white uppercase tracking-tighter italic">{selectedDataset.name}</h2>
                    <span className={cn(
                      "px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm",
                      selectedDataset.status === 'Ready' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
                    )}>
                      {selectedDataset.status}
                    </span>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 max-w-2xl font-medium leading-relaxed">
                    {selectedDataset.description}
                  </p>
                </div>
                <div className="flex gap-3">
                  <button className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all text-slate-400 hover:text-electric">
                    <Download size={20} />
                  </button>
                  <button className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all text-slate-400 hover:text-electric">
                    <Share2 size={20} />
                  </button>
                  <button className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all text-slate-400 hover:text-electric">
                    <MoreVertical size={20} />
                  </button>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 relative z-10">
                {[
                  { label: 'Total Samples', value: selectedDataset.samples, icon: FileAudio },
                  { label: 'Storage Size', value: selectedDataset.size, icon: Database },
                  { label: 'Format', value: selectedDataset.type, icon: BarChart3 },
                  { label: 'Last Updated', value: selectedDataset.lastUpdated, icon: Clock },
                ].map((stat, i) => (
                  <div key={i} className="p-6 bg-white/5 dark:bg-slate-800/30 rounded-[2rem] border border-white/5 hover:border-white/10 transition-all group">
                    <stat.icon size={20} className="text-electric mb-3 group-hover:scale-110 transition-transform" />
                    <p className="text-[9px] text-slate-500 uppercase tracking-[0.2em] font-black mb-1">{stat.label}</p>
                    <p className="text-lg font-black text-navy dark:text-white italic">{stat.value}</p>
                  </div>
                ))}
              </div>

              {/* Visualization Section */}
              <div className="space-y-6 relative z-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-black text-navy dark:text-white uppercase tracking-wider flex items-center gap-3">
                    <div className="w-10 h-10 bg-electric/10 text-electric rounded-xl flex items-center justify-center">
                      <Activity size={24} />
                    </div>
                    Analyse Spectrale
                  </h3>
                  <button 
                    onClick={handleAnalyze}
                    className="text-[10px] font-black text-electric uppercase tracking-widest hover:underline"
                  >
                    Relancer l'analyse
                  </button>
                </div>
                
                <div className="aspect-video bg-navy dark:bg-slate-950 rounded-[3rem] border border-white/10 flex items-center justify-center relative overflow-hidden shadow-inner group">
                  {isAnalyzing ? (
                    <WaveSpinner size="lg" label="Analyse en cours..." />
                  ) : (
                    <>
                      {/* Waveform Visualization Simulation */}
                      <div className="absolute inset-0 flex items-center justify-center gap-1.5 px-12 opacity-40 group-hover:opacity-100 transition-opacity duration-700">
                        {Array.from({ length: 80 }).map((_, i) => (
                          <motion.div
                            key={i}
                            animate={{ 
                              height: [
                                Math.random() * 30 + 10 + '%', 
                                Math.random() * 90 + 10 + '%', 
                                Math.random() * 30 + 10 + '%'
                              ] 
                            }}
                            transition={{ 
                              duration: 1 + Math.random(), 
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                            className="w-1.5 bg-electric rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                          />
                        ))}
                      </div>
                      <div className="z-10 text-center bg-navy/60 backdrop-blur-md p-8 rounded-[2rem] border border-white/10 shadow-2xl">
                        <p className="text-electric font-black text-sm uppercase tracking-[0.3em] italic">Densité Spectrale Optimale</p>
                        <p className="text-white/40 text-[10px] font-bold mt-2 uppercase tracking-widest">Visualisation des harmoniques en temps réel</p>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Sample Preview */}
              <div className="space-y-6 relative z-10">
                <h3 className="text-xl font-black text-navy dark:text-white uppercase tracking-wider">Aperçu des échantillons</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-center justify-between p-5 bg-white/5 dark:bg-slate-800/30 rounded-[2rem] border border-white/5 hover:border-electric/30 transition-all cursor-pointer group">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-electric/10 flex items-center justify-center text-electric group-hover:bg-electric group-hover:text-white transition-all shadow-inner">
                          <FileAudio size={20} />
                        </div>
                        <div>
                          <p className="text-sm font-black text-navy dark:text-white uppercase tracking-tight">Sample_{i.toString().padStart(3, '0')}.wav</p>
                          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">2.4s • 48kHz • Mono</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-20 h-2 bg-navy/10 dark:bg-white/5 rounded-full overflow-hidden hidden sm:block">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.random() * 60 + 40}%` }}
                            className="h-full bg-electric/50" 
                          />
                        </div>
                        <CheckCircle2 size={18} className="text-success" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-20 border-2 border-dashed border-white/10 rounded-[4rem] bg-white/[0.02]">
              <div className="w-32 h-32 bg-white/5 rounded-[3rem] flex items-center justify-center text-slate-700 mb-8 shadow-inner">
                <Database size={64} />
              </div>
              <h2 className="text-3xl font-black text-white uppercase tracking-tighter italic">Aucun Dataset Sélectionné</h2>
              <p className="text-slate-500 mt-4 max-w-sm font-medium leading-relaxed">Choisissez un dataset dans la liste pour explorer ses caractéristiques et sa structure spectrale.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
