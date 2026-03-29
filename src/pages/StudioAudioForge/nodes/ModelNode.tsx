import React, { useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import { motion } from 'framer-motion';
import { Cpu, Activity, Zap, Radio } from 'lucide-react';

export const ModelNode = ({ data }: any) => {
  const [architecture, setArchitecture] = useState(data.initialArchitecture || 'CNN');

  return (
    <div className="relative group">
      <Handle 
        type="target" 
        position={Position.Left} 
        className="w-4 h-4 bg-electric border-2 border-navy !left-[-8px]" 
      />
      
      <motion.div 
        whileHover={{ scale: 1.05 }}
        className="w-64 h-80 bg-cream dark:bg-slate-900 rounded-[2rem] border-2 border-white/10 shadow-2xl p-8 flex flex-col items-center justify-between relative overflow-hidden"
      >
        {/* Amp Front Panel */}
        <div className="w-full h-full bg-navy/5 dark:bg-black/40 rounded-2xl border border-navy/5 dark:border-white/5 p-4 flex flex-col items-center justify-between">
          <div className="text-center">
            <p className="text-[10px] font-black text-electric uppercase tracking-widest mb-1">Model</p>
            <h3 className="text-navy dark:text-white font-black text-xl tracking-tight uppercase italic">{architecture}</h3>
          </div>

          {/* Amp Grill */}
          <div className="w-full h-24 bg-navy/10 dark:bg-slate-800 rounded-lg border border-navy/5 dark:border-white/10 relative overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #1E3A8A 1px, transparent 1px)', backgroundSize: '4px 4px' }} />
            <motion.div 
              animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-16 h-16 rounded-full bg-electric/20 blur-xl"
            />
            <Cpu size={40} className="text-electric relative z-10" />
          </div>

          {/* Controls */}
          <div className="w-full grid grid-cols-3 gap-2">
            {['Layers', 'Dropout', 'Learning'].map(label => (
              <div key={label} className="flex flex-col items-center gap-1">
                <div className="w-8 h-8 rounded-full bg-navy/10 dark:bg-slate-700 border border-navy/5 dark:border-white/10 relative">
                  <div className="w-0.5 h-4 bg-navy/40 dark:bg-white/40 absolute top-0 left-1/2 -translate-x-1/2 origin-bottom" style={{ transform: `rotate(${Math.random() * 360}deg)` }} />
                </div>
                <span className="text-[6px] font-black text-slate-500 uppercase">{label}</span>
              </div>
            ))}
          </div>

          {/* Orbital Stats (Mock) */}
          <div className="absolute -top-4 -right-4 w-16 h-16">
             <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="w-full h-full border border-electric/20 rounded-full flex items-center justify-center"
             >
                <div className="w-2 h-2 rounded-full bg-electric absolute top-0" />
                <span className="text-[6px] font-black text-electric absolute -top-4">F1: 0.92</span>
             </motion.div>
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
