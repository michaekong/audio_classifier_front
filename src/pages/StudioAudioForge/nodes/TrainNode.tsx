import React, { useState, useEffect } from 'react';
import { Handle, Position } from '@xyflow/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, StopCircle, Activity, Zap, Radio } from 'lucide-react';
import confetti from 'canvas-confetti';

export const TrainNode = ({ data }: any) => {
  const [isTraining, setIsTraining] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loss, setLoss] = useState(0.5);
  const [acc, setAcc] = useState(0.5);

  useEffect(() => {
    let interval: any;
    if (isTraining) {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setIsTraining(false);
            confetti({
              particleCount: 150,
              spread: 70,
              origin: { y: 0.6 },
              colors: ['#00FFFF', '#FF4444', '#FFFFFF']
            });
            return 100;
          }
          return prev + 1;
        });
        setLoss(prev => Math.max(0.05, prev - 0.005));
        setAcc(prev => Math.min(0.98, prev + 0.005));
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isTraining]);

  return (
    <div className="relative group">
      <Handle 
        type="target" 
        position={Position.Left} 
        className="w-4 h-4 bg-electric border-2 border-navy !left-[-8px]" 
      />
      
      <motion.div 
        whileHover={{ scale: 1.05 }}
        className="w-80 h-96 bg-cream dark:bg-slate-900 rounded-[2rem] border-2 border-white/10 shadow-2xl p-8 flex flex-col items-center justify-between relative overflow-hidden"
      >
        {/* Reel-to-Reel Tape Recorder */}
        <div className="w-full h-full bg-navy/5 dark:bg-black/40 rounded-2xl border border-navy/5 dark:border-white/5 p-6 flex flex-col items-center justify-between">
          <div className="text-center">
            <p className="text-[10px] font-black text-electric uppercase tracking-widest mb-1">Training</p>
            <h3 className="text-navy dark:text-white font-black text-xl tracking-tight uppercase italic">Studio Tape</h3>
          </div>

          {/* Reels */}
          <div className="w-full flex justify-between items-center gap-4">
            {[1, 2].map(i => (
              <motion.div 
                key={i}
                animate={{ rotate: isTraining ? 360 : 0 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-24 h-24 rounded-full bg-navy/10 dark:bg-slate-800 border-4 border-navy/20 dark:border-slate-700 flex items-center justify-center relative"
              >
                <div className="w-full h-full absolute rounded-full border border-white/5" style={{ transform: 'scale(0.8)' }} />
                <div className="w-full h-full absolute rounded-full border border-white/5" style={{ transform: 'scale(0.6)' }} />
                <div className="w-4 h-4 rounded-full bg-navy/30 dark:bg-slate-600 border border-white/10" />
              </motion.div>
            ))}
          </div>

          {/* VU Meters */}
          <div className="w-full grid grid-cols-2 gap-4">
            <div className="space-y-2">
               <div className="flex justify-between text-[8px] font-black text-slate-500 uppercase tracking-widest">
                  <span>Loss</span>
                  <span className="text-alert">{loss.toFixed(2)}</span>
               </div>
               <div className="h-2 bg-navy/10 dark:bg-black rounded-full overflow-hidden border border-navy/5 dark:border-white/5">
                  <motion.div 
                    animate={{ width: `${loss * 100}%` }}
                    className="h-full bg-alert shadow-[0_0_10px_rgba(239,68,68,0.5)]"
                  />
               </div>
            </div>
            <div className="space-y-2">
               <div className="flex justify-between text-[8px] font-black text-slate-500 uppercase tracking-widest">
                  <span>Accuracy</span>
                  <span className="text-success">{Math.round(acc * 100)}%</span>
               </div>
               <div className="h-2 bg-navy/10 dark:bg-black rounded-full overflow-hidden border border-navy/5 dark:border-white/5">
                  <motion.div 
                    animate={{ width: `${acc * 100}%` }}
                    className="h-full bg-success shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                  />
               </div>
            </div>
          </div>

          {/* Controls */}
          <div className="w-full flex justify-center gap-4">
            <motion.button 
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsTraining(!isTraining)}
              className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                isTraining 
                  ? 'bg-alert text-white shadow-[0_0_20px_rgba(239,68,68,0.5)]' 
                  : 'bg-success text-white shadow-[0_0_20px_rgba(16,185,129,0.5)]'
              }`}
            >
              {isTraining ? <Pause size={20} /> : <Play size={20} />}
            </motion.button>
            <motion.button 
              whileTap={{ scale: 0.9 }}
              onClick={() => { setIsTraining(false); setProgress(0); setLoss(0.5); setAcc(0.5); }}
              className="w-12 h-12 rounded-xl bg-navy/10 dark:bg-slate-800 text-navy/40 dark:text-slate-400 flex items-center justify-center hover:text-navy dark:hover:text-white transition-all"
            >
              <StopCircle size={20} />
            </motion.button>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-1 bg-navy/10 dark:bg-black rounded-full overflow-hidden border border-navy/5 dark:border-white/5">
            <motion.div 
              animate={{ width: `${progress}%` }}
              className="h-full bg-electric"
            />
          </div>
        </div>
      </motion.div>

      <Handle 
        type="source" 
        position={Position.Right} 
        className="w-4 h-4 bg-electric border-2 border-navy !right-[-8px]" 
      />
    </div>
  );
};
