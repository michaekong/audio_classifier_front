import React, { useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import { motion } from 'framer-motion';
import { Zap, Volume2, Activity, Radio } from 'lucide-react';

export const AugmentNode = ({ data }: any) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="relative group">
      <Handle 
        type="target" 
        position={Position.Left} 
        className="w-4 h-4 bg-electric border-2 border-navy !left-[-8px]" 
      />
      
      <motion.div 
        whileHover={{ scale: 1.05 }}
        className={`w-52 h-52 rounded-[3rem] border-2 shadow-2xl p-8 flex flex-col items-center justify-between relative overflow-hidden transition-all duration-500 ${
          isActive 
            ? 'bg-alert/10 border-alert shadow-alert/40 ring-4 ring-alert/5' 
            : 'bg-cream dark:bg-slate-900 border-white/10'
        }`}
      >
        <div className="text-center">
          <p className={`text-[10px] font-black uppercase tracking-[0.2em] mb-1 ${isActive ? 'text-alert' : 'text-slate-400'}`}>Augment</p>
          <h3 className="text-navy dark:text-white font-black text-sm tracking-tight uppercase italic">{data.label || 'Noise Pedal'}</h3>
        </div>

        {/* Pedal Switch */}
        <motion.button 
          whileTap={{ scale: 0.9, y: 4 }}
          onClick={() => setIsActive(!isActive)}
          className={`w-20 h-20 rounded-full border-4 flex items-center justify-center transition-all duration-300 ${
            isActive 
              ? 'bg-alert border-alert shadow-[0_0_40px_rgba(239,68,68,0.6)]' 
              : 'bg-navy/10 dark:bg-slate-800 border-navy/20 dark:border-slate-700 shadow-inner'
          }`}
        >
          <Zap size={32} className={isActive ? 'text-white' : 'text-navy/20 dark:text-slate-600'} />
        </motion.button>

        {/* Knobs */}
        <div className="w-full flex justify-around gap-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex flex-col items-center gap-1.5">
              <div className="w-8 h-8 rounded-full bg-navy/10 dark:bg-slate-800 border-2 border-navy/5 dark:border-white/10 relative shadow-inner">
                <div className="w-1 h-4 bg-navy/30 dark:bg-white/30 absolute top-0 left-1/2 -translate-x-1/2 origin-bottom rounded-full" style={{ transform: `rotate(${Math.random() * 360}deg)` }} />
              </div>
              <span className="text-[7px] font-black text-slate-400 uppercase tracking-widest">P-{i}</span>
            </div>
          ))}
        </div>

        {/* LED Indicator */}
        <div className={`absolute top-6 right-6 w-3 h-3 rounded-full transition-all duration-300 ${
          isActive ? 'bg-alert shadow-[0_0_15px_rgba(239,68,68,1)]' : 'bg-navy/20 dark:bg-slate-800'
        }`} />
      </motion.div>

      <Handle 
        type="source" 
        position={Position.Right} 
        className="w-4 h-4 bg-electric border-2 border-navy !right-[-8px]" 
      />
    </div>
  );
};
