import React, { useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import { motion } from 'framer-motion';
import { Disc, Music, Database } from 'lucide-react';

export const DatasetNode = ({ data }: any) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div 
        whileHover={{ scale: 1.05 }}
        className="w-52 h-52 bg-cream dark:bg-slate-900 rounded-[3rem] border-2 border-white/10 shadow-2xl flex flex-col items-center justify-center p-6 relative overflow-hidden"
      >
        {/* Vinyl Record */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="w-36 h-36 rounded-full bg-navy border-8 border-navy/20 flex items-center justify-center relative shadow-2xl"
        >
          <div className="w-full h-full absolute rounded-full border border-white/5" style={{ transform: 'scale(0.8)' }} />
          <div className="w-full h-full absolute rounded-full border border-white/5" style={{ transform: 'scale(0.6)' }} />
          {/* Pie Chart Overlay */}
          <div className="absolute inset-0 rounded-full border-[16px] border-transparent border-t-electric/30 border-r-electric/15" />
          <div className="w-14 h-14 rounded-full bg-electric flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.6)] z-10">
            <Music size={24} className="text-white" />
          </div>
        </motion.div>

        <div className="mt-5 text-center">
          <p className="text-[10px] font-black text-electric uppercase tracking-[0.2em] mb-1">Dataset</p>
          <h3 className="text-navy dark:text-white font-black text-sm uppercase tracking-tight italic">{data.label || '245 sons'}</h3>
        </div>

        {/* Status Glow */}
        <div className="absolute inset-0 bg-electric/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      </motion.div>

      <Handle 
        type="source" 
        position={Position.Right} 
        className="w-4 h-4 bg-electric border-2 border-navy !right-[-8px]" 
      />
      
      {/* Tooltip/Stats */}
      {isHovered && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -bottom-16 left-0 right-0 bg-navy/90 backdrop-blur-xl border border-white/10 p-2 rounded-xl text-[8px] font-bold text-white uppercase tracking-tighter flex justify-between"
        >
          <span>80% Train</span>
          <span>20% Val</span>
          <span className="text-electric">44.1kHz</span>
        </motion.div>
      )}
    </div>
  );
};
