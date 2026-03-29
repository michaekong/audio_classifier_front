import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { motion, AnimatePresence } from 'framer-motion';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-navy dark:bg-slate-950 transition-colors duration-300 relative overflow-hidden">
      {/* Global Audio-related Background Animation */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20 dark:opacity-10">
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-1/4 -right-1/4 w-[800px] h-[800px] bg-electric/20 rounded-full blur-[120px]"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, -10, 0],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-navy/20 dark:bg-blue-900/20 rounded-full blur-[100px]"
        />
        
        {/* Subtle Waveform Lines */}
        <div className="absolute bottom-0 left-0 right-0 h-32 flex items-end justify-around gap-1 px-4 opacity-10">
          {[...Array(40)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ height: [20, Math.random() * 100 + 20, 20] }}
              transition={{ duration: 1.5 + Math.random(), repeat: Infinity, ease: "easeInOut" }}
              className="w-1 bg-electric rounded-t-full"
            />
          ))}
        </div>
      </div>

      <Sidebar 
        collapsed={collapsed} 
        setCollapsed={setCollapsed} 
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />
      <div className="flex-1 flex flex-col relative z-10 w-full min-w-0">
        <Header onMenuClick={() => setMobileOpen(true)} />
        <main className="p-4 md:p-8 flex-1 max-w-7xl mx-auto w-full overflow-x-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={window.location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};
