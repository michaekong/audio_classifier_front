import React, { useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import { motion } from 'framer-motion';
import { Save, Music, Share2, Radio } from 'lucide-react';

export const SaveNode = ({ data }: any) => {
  const [isSaved, setIsSaved] = useState(false);

  return (
    <div className="relative group">
      <Handle 
        type="target" 
        position={Position.Left} 
        className="w-4 h-4 bg-electric border-2 border-navy !left-[-8px]" 
      />
      
      <motion.div 
        whileHover={{ scale: 1.05 }}
        className="w-48 h-64 bg-cream dark:bg-slate-900 rounded-[2rem] border-2 border-white/10 shadow-2xl p-6 flex flex-col items-center justify-between relative overflow-hidden"
      >
        <div className="text-center">
          <p className="text-[10px] font-black text-electric uppercase tracking-widest mb-1">Save</p>
          <h3 className="text-navy dark:text-white font-bold text-sm tracking-tight">{data.label || 'Publish Hit'}</h3>
        </div>

        {/* Cassette Tape */}
        <motion.div 
          animate={{ y: isSaved ? 0 : 50, opacity: isSaved ? 1 : 0.5 }}
          className="w-32 h-24 bg-navy/10 dark:bg-slate-800 rounded-xl border-2 border-navy/20 dark:border-slate-700 p-2 flex flex-col justify-between relative"
        >
          <div className="w-full h-8 bg-navy/20 dark:bg-black/50 rounded-lg flex items-center justify-center gap-2">
             <div className="w-4 h-4 rounded-full bg-navy/30 dark:bg-slate-700 border border-white/10" />
             <div className="w-12 h-1 bg-navy/30 dark:bg-slate-700 rounded-full" />
             <div className="w-4 h-4 rounded-full bg-navy/30 dark:bg-slate-700 border border-white/10" />
          </div>
          <div className="w-full h-8 bg-electric/20 rounded-lg border border-electric/10 flex items-center justify-center">
             <span className="text-[8px] font-black text-electric uppercase tracking-widest italic">AudioForge v1.0</span>
          </div>
        </motion.div>

        <motion.button 
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsSaved(!isSaved)}
          className={`w-full py-3 rounded-xl flex items-center justify-center gap-2 transition-all ${
            isSaved 
              ? 'bg-success text-white shadow-[0_0_20px_rgba(16,185,129,0.5)]' 
              : 'bg-electric text-white shadow-[0_0_20px_rgba(59,130,246,0.5)]'
          }`}
        >
          {isSaved ? <Share2 size={16} /> : <Save size={16} />}
          <span className="text-[10px] font-black uppercase tracking-widest">
            {isSaved ? 'Partager' : 'Enregistrer'}
          </span>
        </motion.button>

        {/* Status Glow */}
        <div className="absolute inset-0 bg-electric/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      </motion.div>
    </div>
  );
};
