import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AudioWaveform as Waveform, Github, Mail, Lock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-navy flex items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 10, 0],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-1/4 -right-1/4 w-[800px] h-[800px] bg-electric/20 rounded-full blur-[120px]"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [0, -15, 0],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-blue-900/40 rounded-full blur-[100px]"
        />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[420px] bg-cream rounded-[2rem] shadow-2xl overflow-hidden border border-white/20 relative z-10"
      >
        <div className="p-10 text-center bg-navy/5 border-b border-navy/5">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-electric rounded-3xl text-white mb-6 shadow-xl shadow-electric/30 rotate-3 hover:rotate-0 transition-transform duration-500">
            <Waveform size={40} />
          </div>
          <h1 className="text-3xl font-bold text-navy tracking-tight">AudioClass AI</h1>
          <p className="text-slate-500 font-medium mt-2">Studio de classification audio</p>
        </div>

        <div className="p-10">
          <div className="flex bg-navy/5 p-1.5 rounded-2xl mb-10">
            <button 
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all duration-300 ${isLogin ? 'bg-white text-navy shadow-lg' : 'text-slate-500 hover:text-navy'}`}
            >
              CONNEXION
            </button>
            <button 
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all duration-300 ${!isLogin ? 'bg-white text-navy shadow-lg' : 'text-slate-500 hover:text-navy'}`}
            >
              INSCRIPTION
            </button>
          </div>

          <form onSubmit={handleAuth} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-electric transition-colors" size={20} />
                <input 
                  type="email" 
                  placeholder="nom@exemple.com"
                  className="w-full bg-white border border-navy/5 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-4 focus:ring-electric/10 focus:border-electric transition-all text-navy font-medium placeholder:text-slate-300"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Password</label>
                {isLogin && <button type="button" className="text-[10px] font-bold text-electric hover:underline uppercase tracking-wider">Oublié ?</button>}
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-electric transition-colors" size={20} />
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full bg-white border border-navy/5 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-4 focus:ring-electric/10 focus:border-electric transition-all text-navy font-medium placeholder:text-slate-300"
                  required
                />
              </div>
            </div>

            <button type="submit" className="w-full bg-electric text-white py-5 rounded-2xl font-black text-sm tracking-[0.1em] flex items-center justify-center gap-3 hover:bg-blue-600 shadow-xl shadow-electric/30 transition-all active:scale-[0.98] group">
              {isLogin ? 'ENTRER DANS LE STUDIO' : 'CRÉER MON COMPTE'}
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="relative my-10">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-navy/5"></div>
            </div>
            <div className="relative flex justify-center text-[10px] uppercase tracking-[0.2em] font-bold">
              <span className="bg-cream px-4 text-slate-400">Ou continuer avec</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-3 py-4 bg-white border border-navy/5 rounded-2xl hover:bg-slate-50 transition-all font-bold text-sm text-navy shadow-sm">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              GOOGLE
            </button>
            <button className="flex items-center justify-center gap-3 py-4 bg-white border border-navy/5 rounded-2xl hover:bg-slate-50 transition-all font-bold text-sm text-navy shadow-sm">
              <Github size={20} />
              GITHUB
            </button>
          </div>

          <p className="text-center text-xs font-bold text-slate-400 mt-10">
            {isLogin ? "PAS ENCORE DE COMPTE ? " : "DÉJÀ UN COMPTE ? "}
            <button onClick={() => setIsLogin(!isLogin)} className="text-electric hover:underline uppercase tracking-wider">
              {isLogin ? "S'inscrire" : "Se connecter"}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};
