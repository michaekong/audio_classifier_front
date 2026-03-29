import React, { useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import { motion } from 'framer-motion';
import { Sliders, Activity, Zap } from 'lucide-react';

export const EncodingNode = ({ data }: any) => {
  const [gain, setGain] = useState(data.initialGain || 50);

  return (
    <div className="relative group">
      <Handle 
        type="target" 
        position={Position.Left} 
        className="w-4 h-4 bg-electric border-2 border-navy !left-[-8px]" 
      />
      
      <motion.div 
        whileHover={{ scale: 1.05 }}
        className="w-44 h-72 bg-cream dark:bg-slate-900 rounded-[3rem] border-2 border-white/10 shadow-2xl p-8 flex flex-col items-center justify-between relative overflow-hidden"
      >
        <div className="text-center">
          <p className="text-[10px] font-black text-electric uppercase tracking-[0.2em] mb-1">Encoding</p>
          <h3 className="text-navy dark:text-white font-black text-sm tracking-tight uppercase italic">{data.label || 'MFCC'}</h3>
        </div>

        {/* Fader Track */}
        <div className="w-14 h-36 bg-navy/10 dark:bg-black/50 rounded-full relative p-1.5 border border-navy/5 shadow-inner">
          <motion.div 
            className="w-full bg-electric/20 rounded-full absolute bottom-0 left-0"
            style={{ height: `${gain}%` }}
          />
          <motion.div 
            drag="y"
            dragConstraints={{ top: 0, bottom: 120 }}
            onDrag={(_, info) => {
              const newGain = Math.max(0, Math.min(100, 100 - (info.point.y / 1.2)));
              setGain(newGain);
            }}
            className="w-11 h-16 bg-cream dark:bg-slate-800 rounded-2xl border-2 border-electric shadow-2xl flex flex-col items-center justify-center gap-1.5 cursor-ns-resize absolute left-1.5"
            style={{ bottom: `calc(${gain}% - 32px)` }}
          >
            <div className="w-6 h-1 bg-electric/50 rounded-full" />
            <div className="w-6 h-1 bg-electric/50 rounded-full" />
            <div className="w-6 h-1 bg-electric/50 rounded-full" />
          </motion.div>
        </div>

        <div className="w-full flex justify-between items-center text-[8px] font-black text-slate-500 uppercase tracking-widest">
          <span>-∞ dB</span>
          <span className="text-electric text-xs">{Math.round(gain)}</span>
          <span>+12 dB</span>
        </div>

        {/* Waveform Preview */}
        <div className="w-full h-10 flex items-center justify-center gap-1">
          {[...Array(15)].map((_, i) => (
            <motion.div 
              key={i}
              animate={{ height: [4, Math.random() * 24 + 4, 4] }}
              transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
              className="w-1 bg-electric/40 rounded-full"
            />
          ))}
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
