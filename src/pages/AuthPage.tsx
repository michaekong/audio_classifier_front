import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, Mail, Lock, ArrowRight, Eye, EyeOff, Music } from 'lucide-react';

export const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPwd, setShowPwd] = useState(false);
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  const BG = '#060f1f';

  return (
    <div style={{ minHeight: '100vh', background: BG, display: 'flex', fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>
      {/* Left — Branding */}
      <div style={{ flex: 1, display: 'none', flexDirection: 'column', justifyContent: 'space-between', padding: '48px 56px', position: 'relative', overflow: 'hidden' }} className="hidden lg:flex">
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(59,111,232,.25) 0%, rgba(139,92,246,.15) 100%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -100, left: -100, width: 400, height: 400, borderRadius: '50%', background: 'rgba(59,111,232,.15)', filter: 'blur(80px)' }} />
        <div style={{ position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 64 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: '#3b6fe8', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 3px 12px rgba(59,111,232,.5)' }}>
              <Zap size={18} color="#fff" />
            </div>
            <span style={{ fontFamily: "'Outfit',system-ui", fontWeight: 700, fontSize: 18, color: '#fff' }}>AudioClass AI</span>
          </div>
          <h1 style={{ fontFamily: "'Outfit',system-ui", fontSize: 38, fontWeight: 800, color: '#fff', lineHeight: 1.1, marginBottom: 20 }}>
            De l'audio brut<br />à l'intelligence<br /><span style={{ color: '#93b4ff' }}>en quelques clics.</span>
          </h1>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,.5)', lineHeight: 1.7, maxWidth: 360 }}>
            Plateforme ML audio pour la reconnaissance des styles musicaux camerounais et bien plus encore.
          </p>
        </div>
        {/* Scenario steps */}
        <div style={{ position: 'relative' }}>
          <p style={{ fontSize: 11, fontFamily: "'JetBrains Mono',monospace", color: 'rgba(255,255,255,.3)', textTransform: 'uppercase', letterSpacing: '.12em', marginBottom: 16 }}>Scénario · CamerMusic-ID</p>
          {[
            { n: '01', t: 'Importer CamerMusic-500', d: '5 styles camerounais, 500 extraits studio' },
            { n: '02', t: 'Entraîner le modèle', d: 'CNN-ResNet18 + Mel Spectrogram, 50 epochs' },
            { n: '03', t: 'Prédire un extrait', d: 'Makossa · 87% confiance · 18ms latence' },
          ].map((s, i) => (
            <div key={i} style={{ display: 'flex', gap: 14, marginBottom: 14, opacity: 1 }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: 'rgba(59,111,232,.25)', border: '1px solid rgba(59,111,232,.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: '#93b4ff', fontFamily: "'JetBrains Mono',monospace" }}>{s.n}</span>
              </div>
              <div>
                <p style={{ fontSize: 13, fontWeight: 700, color: '#dde8ff', margin: '2px 0 2px' }}>{s.t}</p>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,.35)', margin: 0 }}>{s.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right — Form */}
      <div style={{ width: '100%', maxWidth: 440, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px 24px' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ width: '100%' }}>
          {/* Mobile logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 36 }} className="lg:hidden">
            <div style={{ width: 32, height: 32, borderRadius: 9, background: '#3b6fe8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Zap size={16} color="#fff" />
            </div>
            <span style={{ fontFamily: "'Outfit',system-ui", fontWeight: 700, fontSize: 16, color: '#fff' }}>AudioClass AI</span>
          </div>

          <div style={{ background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.1)', borderRadius: 20, padding: '36px 32px' }}>
            <h2 style={{ fontFamily: "'Outfit',system-ui", fontSize: 24, fontWeight: 700, color: '#fff', margin: '0 0 6px' }}>
              {isLogin ? 'Connexion' : 'Créer un compte'}
            </h2>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,.4)', margin: '0 0 28px' }}>
              {isLogin ? 'Accédez à votre espace AudioClass AI' : 'Rejoignez la plateforme ML audio africaine'}
            </p>

            {/* Demo quick login */}
            <button onClick={handleSubmit} style={{ width: '100%', padding: '11px', borderRadius: 11, background: 'rgba(245,158,11,.15)', border: '1px solid rgba(245,158,11,.3)', color: '#fbbf24', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 20, transition: 'all .15s' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(245,158,11,.25)')} onMouseLeave={e => (e.currentTarget.style.background = 'rgba(245,158,11,.15)')}>
              <Music size={15} />Démo · Scénario CamerMusic (accès direct)
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,.08)' }} />
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,.25)', fontFamily: "'JetBrains Mono',monospace" }}>ou avec un compte</span>
              <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,.08)' }} />
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,.5)', display: 'block', marginBottom: 6 }}>Email</label>
                <div style={{ position: 'relative' }}>
                  <Mail size={15} color="rgba(255,255,255,.3)" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="votre@email.com"
                    style={{ width: '100%', padding: '10px 12px 10px 36px', borderRadius: 10, background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.12)', color: '#fff', fontSize: 14, fontFamily: 'inherit', outline: 'none' }} />
                </div>
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,.5)', display: 'block', marginBottom: 6 }}>Mot de passe</label>
                <div style={{ position: 'relative' }}>
                  <Lock size={15} color="rgba(255,255,255,.3)" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
                  <input type={showPwd ? 'text' : 'password'} value={pwd} onChange={e => setPwd(e.target.value)} placeholder="••••••••"
                    style={{ width: '100%', padding: '10px 40px 10px 36px', borderRadius: 10, background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.12)', color: '#fff', fontSize: 14, fontFamily: 'inherit', outline: 'none' }} />
                  <button type="button" onClick={() => setShowPwd(!showPwd)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'rgba(255,255,255,.3)', cursor: 'pointer', display: 'flex' }}>
                    {showPwd ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>
              <button type="submit" style={{ width: '100%', padding: '11px', borderRadius: 11, background: '#3b6fe8', border: 'none', color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: '0 4px 16px rgba(59,111,232,.4)', marginTop: 4, transition: 'all .15s' }}>
                {isLogin ? 'Se connecter' : 'Créer mon compte'} <ArrowRight size={16} />
              </button>
            </form>

            <p style={{ textAlign: 'center', fontSize: 13, color: 'rgba(255,255,255,.35)', marginTop: 20 }}>
              {isLogin ? 'Pas encore de compte ?' : 'Déjà un compte ?'}{' '}
              <button onClick={() => setIsLogin(!isLogin)} style={{ background: 'none', border: 'none', color: '#93b4ff', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
                {isLogin ? 'S\'inscrire' : 'Se connecter'}
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
