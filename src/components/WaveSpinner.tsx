import React from 'react';
import { motion } from 'framer-motion';

interface WaveSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  label?: string;
}

export const WaveSpinner: React.FC<WaveSpinnerProps> = ({ 
  size = 'md', 
  color = 'bg-electric',
  label 
}) => {
  const sizes = {
    sm: { height: 'h-8', width: 'w-1', gap: 'gap-0.5', count: 5 },
    md: { height: 'h-16', width: 'w-1.5', gap: 'gap-1', count: 8 },
    lg: { height: 'h-32', width: 'w-2.5', gap: 'gap-2', count: 12 },
  };

  const currentSize = sizes[size];

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className={`flex items-center justify-center ${currentSize.gap} ${currentSize.height}`}>
        {[...Array(currentSize.count)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              height: ['20%', '100%', '20%'],
              opacity: [0.3, 1, 0.3]
            }}
            transition={{ 
              duration: 0.8, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: i * 0.1 
            }}
            className={`${currentSize.width} ${color} rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)]`}
          />
        ))}
      </div>
      {label && (
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] animate-pulse"
        >
          {label}
        </motion.p>
      )}
    </div>
  );
};
