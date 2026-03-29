import React from 'react';
import { motion } from 'framer-motion';

interface WaveSpinnerProps {
  size?: number;
  color?: string;
}

export const WaveSpinner: React.FC<WaveSpinnerProps> = ({ size = 64, color = '#3B82F6' }) => {
  return (
    <div className="flex items-center justify-center h-full w-full bg-transparent">
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ 
              scale: [0.5, 2], 
              opacity: [0.8, 0],
              borderWidth: ['2px', '1px']
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              delay: i * 0.4,
              ease: "easeOut" 
            }}
            style={{ borderColor: color }}
            className="absolute w-full h-full rounded-full border"
          />
        ))}
        <motion.div 
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          style={{ backgroundColor: `${color}33`, borderColor: `${color}66` }}
          className="w-3/4 h-3/4 rounded-full flex items-center justify-center backdrop-blur-sm border"
        >
          <div 
            style={{ backgroundColor: color, boxShadow: `0 0 15px ${color}` }}
            className="w-1/3 h-1/3 rounded-full" 
          />
        </motion.div>
      </div>
    </div>
  );
};
