import React, { useState, useRef } from 'react';
import { 
  Upload, 
  Mic, 
  Play, 
  Pause, 
  X, 
  CheckCircle2, 
  Brain, 
  BarChart, 
  Info,
  ChevronDown,
  AudioWaveform as Waveform
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/src/lib/utils';
import { useTheme } from '../context/ThemeContext';

export const Predictor: React.FC = () => {
  const { isDark } = useTheme();
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isPredicting, setIsPredicting] = useState(false);
  const [results, setResults] = useState<any[] | null>(null);
  const [isLive, setIsLive] = useState(false);
  const [activePortfolio, setActivePortfolio] = useState('BabyCry-AI');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const portfolios = [
    { id: 'BabyCry-AI', name: 'BabyCry-AI', category: 'Pédiatrie' },
    { id: 'RespiDiag-Pro', name: 'RespiDiag-Pro', category: 'Médical' },
    { id: 'VibraPredict', name: 'VibraPredict', category: 'Industrie' },
    { id: 'AfroBeatsID', name: 'AfroBeatsID', category: 'Musique' },
  ];

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setIsDragging(true);
    else if (e.type === 'dragleave') setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handlePredict = () => {
    setIsPredicting(true);
    setTimeout(() => {
      setIsPredicting(false);
      if (activePortfolio === 'BabyCry-AI') {
        setResults([
          { label: 'Faim (Hunger)', probability: 78, color: 'bg-electric', explanation: 'Signature rythmique répétitive avec une montée en fréquence caractéristique du besoin nutritionnel.' },
          { label: 'Sommeil (Sleepy)', probability: 15, color: 'bg-warning', explanation: 'Bâillements audibles et pleurs plus lents.' },
          { label: 'Coliques (Pain)', probability: 5, color: 'bg-alert', explanation: 'Absence de pics d\'intensité soudains typiques de la douleur aiguë.' },
          { label: 'Inconfort (Discomfort)', probability: 2, color: 'bg-success', explanation: 'Faible probabilité d\'irritation cutanée ou thermique.' },
        ]);
      } else {
        setResults([
          { label: 'COVID-19 Positive', probability: 87, color: 'bg-alert', explanation: 'Anomalies spectrales détectées dans les hautes fréquences de la toux.' },
          { label: 'Bronchite', probability: 12, color: 'bg-warning', explanation: 'Présence de sifflements caractéristiques.' },
          { label: 'Sain', probability: 1, color: 'bg-success', explanation: 'Faible corrélation avec les signatures pathologiques.' },
        ]);
      }
    }, 2000);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight">Prédi<span className="text-electric">cteur</span></h1>
          <p className="text-white/60 mt-1 font-medium">Analysez vos fichiers audio ou streamez en direct avec une précision chirurgicale.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative group">
            <div className="flex items-center gap-3 px-5 py-3 bg-cream dark:bg-slate-900 border border-white/10 dark:border-slate-800 rounded-2xl shadow-sm cursor-pointer hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-xl bg-electric/10 flex items-center justify-center text-electric">
                <Brain size={22} />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Portefeuille actif</p>
                <select 
                  value={activePortfolio}
                  onChange={(e) => { setActivePortfolio(e.target.value); setResults(null); setFile(null); }}
                  className="bg-transparent text-sm font-black text-navy dark:text-white focus:outline-none cursor-pointer"
                >
                  {portfolios.map(p => (
                    <option key={p.id} value={p.id} className="bg-cream dark:bg-slate-900">{p.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div 
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={cn(
              "relative h-[450px] bg-cream dark:bg-slate-900 rounded-[3rem] border-2 border-dashed flex flex-col items-center justify-center gap-6 transition-all cursor-pointer group overflow-hidden shadow-sm",
              isDragging ? "border-electric bg-electric/5 scale-[1.01]" : "border-white/20 dark:border-slate-800 hover:border-electric/50 hover:shadow-xl",
              file && "border-success/50 bg-success/5"
            )}
          >
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="audio/*"
              onChange={(e) => e.target.files && setFile(e.target.files[0])}
            />
            
            <AnimatePresence mode="wait">
              {!file ? (
                <motion.div 
                  key="empty"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="text-center relative z-10"
                >
                  <div className="w-28 h-28 bg-navy/5 dark:bg-slate-800 rounded-[2rem] flex items-center justify-center text-slate-400 mb-8 mx-auto group-hover:bg-electric group-hover:text-white transition-all duration-500 shadow-inner group-hover:shadow-electric/30">
                    <Upload size={48} />
                  </div>
                  <h3 className="text-2xl font-black text-navy dark:text-white mb-2 tracking-tight">Glissez votre fichier audio ici</h3>
                  <p className="text-slate-500 dark:text-slate-400 font-medium">Ou cliquez pour parcourir vos dossiers</p>
                  
                  <div className="flex items-center justify-center gap-4 mt-10">
                    <div className="flex items-center gap-3 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
                      <span className="w-12 h-px bg-slate-200 dark:bg-slate-800"></span>
                      OU
                      <span className="w-12 h-px bg-slate-200 dark:bg-slate-800"></span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={(e) => { e.stopPropagation(); setIsLive(!isLive); }}
                    className={cn(
                      "mt-8 flex items-center gap-3 px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-lg active:scale-95",
                      isLive ? "bg-alert text-white shadow-alert/30" : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-navy dark:text-white hover:bg-slate-50 dark:hover:bg-slate-700"
                    )}
                  >
                    <Mic size={20} className={isLive ? "animate-pulse" : ""} />
                    {isLive ? "ARRÊTER LE LIVE" : "DÉMARRER LE LIVE"}
                  </button>
                </motion.div>
              ) : (
                <motion.div 
                  key="file"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="w-full px-12 text-center relative z-10"
                >
                  <div className="w-24 h-24 bg-success rounded-[2rem] flex items-center justify-center text-white mb-8 mx-auto shadow-xl shadow-success/20">
                    <CheckCircle2 size={48} />
                  </div>
                  <h3 className="text-2xl font-black text-navy dark:text-white mb-2 truncate max-w-md mx-auto tracking-tight">{file.name}</h3>
                  <p className="text-slate-500 dark:text-slate-400 font-bold mb-10 uppercase tracking-widest text-xs">{(file.size / (1024 * 1024)).toFixed(2)} MB • Prêt pour l'analyse</p>
                  
                  <div className="flex items-center justify-center gap-6">
                    <button 
                      onClick={(e) => { e.stopPropagation(); setFile(null); setResults(null); }}
                      className="p-4 text-slate-400 hover:text-alert hover:bg-alert/10 rounded-2xl transition-all"
                    >
                      <X size={28} />
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); handlePredict(); }}
                      disabled={isPredicting}
                      className="btn-primary px-16 py-5 text-xl flex items-center gap-4 shadow-2xl shadow-electric/30 rounded-2xl"
                    >
                      {isPredicting ? (
                        <>
                          <div className="w-7 h-7 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                          ANALYSE...
                        </>
                      ) : (
                        <>
                          <Play size={28} fill="currentColor" />
                          PRÉDIRE
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Background decorative elements */}
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-electric/5 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute -left-20 -top-20 w-80 h-80 bg-electric/5 rounded-full blur-[100px] pointer-events-none"></div>
          </div>

          <div className="bg-cream dark:bg-slate-900 p-8 rounded-[2.5rem] border border-white/10 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-black text-navy dark:text-white uppercase tracking-wider flex items-center gap-3">
                <div className="w-10 h-10 bg-electric/10 text-electric rounded-xl flex items-center justify-center">
                  <Waveform size={24} />
                </div>
                Visualisation temporelle
              </h3>
              <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <span className="w-3 h-3 rounded-full bg-electric animate-pulse"></span>
                Amplitude en direct
              </div>
            </div>
            <div className="h-32 flex items-end gap-1.5 px-4">
              {Array.from({ length: 70 }).map((_, i) => (
                <motion.div 
                  key={i} 
                  animate={{ 
                    height: isLive || isPredicting ? `${Math.random() * 80 + 20}%` : '8px' 
                  }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className={cn(
                    "flex-1 rounded-full transition-colors duration-500",
                    isLive || isPredicting ? "bg-electric" : "bg-navy/5 dark:bg-slate-800"
                  )}
                ></motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-cream dark:bg-slate-900 p-8 rounded-[2.5rem] border border-white/10 dark:border-slate-800 shadow-sm">
            <h3 className="text-xl font-black text-navy dark:text-white uppercase tracking-wider mb-8 flex items-center gap-3">
              <div className="w-10 h-10 bg-electric/10 text-electric rounded-xl flex items-center justify-center">
                <BarChart size={24} />
              </div>
              Résultats
            </h3>
            
            <AnimatePresence mode="wait">
              {results ? (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-8"
                >
                  {results.map((res, i) => (
                    <div key={i} className="space-y-3 group">
                      <div className="flex items-center justify-between text-sm font-black uppercase tracking-tight">
                        <span className="text-navy dark:text-white">{res.label}</span>
                        <span className="text-slate-400">{res.probability}%</span>
                      </div>
                      <div className="h-4 bg-navy/5 dark:bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${res.probability}%` }}
                          transition={{ duration: 1, ease: "easeOut", delay: i * 0.1 }}
                          className={cn("h-full rounded-full shadow-sm", res.color)}
                        ></motion.div>
                      </div>
                      {res.probability > 50 && (
                        <p className="text-[10px] text-electric font-black uppercase tracking-[0.2em]">Probabilité dominante</p>
                      )}
                    </div>
                  ))}

                  <div className="mt-10 p-6 bg-navy/5 dark:bg-slate-800/50 rounded-3xl border border-white/10">
                    <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">
                      <Info size={16} className="text-electric" />
                      Explication (SHAP)
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed italic font-medium">
                      {results[0].explanation}
                    </p>
                  </div>
                </motion.div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="w-24 h-24 bg-navy/5 dark:bg-slate-800 rounded-[2rem] flex items-center justify-center text-slate-300 dark:text-slate-700 mb-8 shadow-inner">
                    <BarChart size={48} />
                  </div>
                  <h4 className="text-xl font-black text-navy dark:text-white mb-2 tracking-tight">Aucune donnée</h4>
                  <p className="text-slate-400 text-sm max-w-[220px] font-medium leading-relaxed">Uploadez un fichier pour voir les probabilités s'afficher ici.</p>
                </div>
              )}
            </AnimatePresence>
          </div>

          <div className="bg-electric p-10 rounded-[3rem] text-white overflow-hidden relative border-none shadow-2xl shadow-electric/30">
            <div className="relative z-10">
              <h3 className="text-2xl font-black mb-4 tracking-tight leading-tight">Besoin de plus de précision ?</h3>
              <p className="text-white/80 text-sm mb-10 leading-relaxed font-medium">Passez à la version Pro pour accéder à des modèles entraînés sur des datasets 10x plus larges et une latence réduite.</p>
              <button className="w-full bg-white text-electric py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-slate-50 active:scale-95 transition-all shadow-xl">
                DÉCOUVRIR LES OFFRES PRO
              </button>
            </div>
            <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-white/10 rounded-full blur-[80px]"></div>
            <div className="absolute -left-16 -top-16 w-64 h-64 bg-white/5 rounded-full blur-[80px]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
