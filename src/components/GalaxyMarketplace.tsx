import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  OrbitControls, 
  PerspectiveCamera, 
  Float, 
  Text, 
  MeshDistortMaterial, 
  Sphere, 
  Stars,
  Html,
  useCursor
} from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Download, Play, ShoppingCart, Info, AudioWaveform as Waveform, X, Heart, Share2 } from 'lucide-react';
import { ModelPortfolio } from '../types';

// --- Shaders ---
const WaveformShader = {
  uniforms: {
    uTime: { value: 0 },
    uColor: { value: new THREE.Color('#3B82F6') },
    uSpeed: { value: 1.0 },
    uAmplitude: { value: 0.5 },
  },
  vertexShader: `
    varying vec2 vUv;
    varying float vDisplacement;
    uniform float uTime;
    uniform float uSpeed;
    uniform float uAmplitude;

    void main() {
      vUv = uv;
      vec3 pos = position;
      float d = sin(pos.x * 10.0 + uTime * uSpeed) * cos(pos.y * 10.0 + uTime * uSpeed) * uAmplitude;
      vDisplacement = d;
      pos.z += d;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  fragmentShader: `
    varying vec2 vUv;
    varying float vDisplacement;
    uniform vec3 uColor;

    void main() {
      float intensity = vDisplacement * 2.0 + 0.5;
      gl_FragColor = vec4(uColor * intensity, 0.8);
    }
  `,
};

// --- Components ---

const Planet = ({ 
  portfolio, 
  index, 
  activeFilter, 
  onSelect 
}: { 
  portfolio: ModelPortfolio, 
  index: number, 
  activeFilter: string,
  onSelect: (p: ModelPortfolio) => void
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);

  // Orbit logic
  const orbitRadius = 8 + index * 3.5;
  const orbitSpeed = 0.1 + (1 / (index + 2)) * 0.2;
  const initialAngle = (index / 6) * Math.PI * 2;

  // Magnetic attraction logic
  const isTarget = activeFilter === 'Tous' || 
    (activeFilter.includes('Médical') && portfolio.category === 'medical') ||
    (activeFilter.includes('Industrie') && portfolio.category === 'industrial') ||
    (activeFilter.includes('Musique') && portfolio.category === 'music') ||
    (activeFilter.includes('Agriculture') && portfolio.category === 'agriculture') ||
    (activeFilter.includes('Sécurité') && portfolio.category === 'general');

  const targetScale = isTarget ? (hovered ? 1.5 : 1.2) : 0.6;
  const targetColor = portfolio.category === 'medical' ? '#3B82F6' : 
                      portfolio.category === 'music' ? '#F59E0B' : 
                      portfolio.category === 'industrial' ? '#EF4444' : 
                      portfolio.category === 'agriculture' ? '#10B981' : '#8B5CF6';

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    
    // Orbit position
    const angle = initialAngle + t * orbitSpeed;
    const x = Math.cos(angle) * orbitRadius;
    const z = Math.sin(angle) * orbitRadius;
    const y = Math.sin(t * 0.5 + index) * 2; // Floating effect

    // Smooth transition to target position/scale
    meshRef.current.position.lerp(new THREE.Vector3(x, y, z), 0.05);
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    
    // Rotation
    meshRef.current.rotation.y += 0.01;
    meshRef.current.rotation.x += 0.005;
  });

  return (
    <group>
      {/* Orbit Line */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[orbitRadius - 0.02, orbitRadius + 0.02, 64]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.1} side={THREE.DoubleSide} />
      </mesh>

      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <mesh 
          ref={meshRef} 
          onClick={() => onSelect(portfolio)}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <sphereGeometry args={[1, 32, 32]} />
          <MeshDistortMaterial 
            color={targetColor} 
            speed={hovered ? 4 : 2} 
            distort={hovered ? 0.4 : 0.2} 
            radius={1} 
          />
          
          {/* Planet Label */}
          <Html distanceFactor={15} position={[0, 1.5, 0]}>
            <div className={`pointer-events-none transition-all duration-500 flex flex-col items-center ${hovered ? 'scale-110 opacity-100' : 'scale-90 opacity-60'}`}>
              <div className="px-3 py-1 bg-black/80 backdrop-blur-md border border-white/20 rounded-full text-white text-[10px] font-bold whitespace-nowrap shadow-xl">
                {portfolio.name}
              </div>
              <div className="mt-1 flex items-center gap-1 text-[8px] font-bold text-white/80">
                <Star size={8} className="text-yellow-400" fill="currentColor" />
                {portfolio.accuracy}%
              </div>
            </div>
          </Html>
        </mesh>
      </Float>
    </group>
  );
};

const CentralStar = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      const s = 1 + Math.sin(state.clock.getElapsedTime() * 2) * 0.05;
      meshRef.current.scale.set(s, s, s);
    }
  });

  return (
    <group>
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <mesh ref={meshRef}>
        <sphereGeometry args={[3, 64, 64]} />
        <meshStandardMaterial 
          color="#3B82F6" 
          emissive="#3B82F6" 
          emissiveIntensity={2} 
          toneMapped={false} 
        />
        <pointLight intensity={5} distance={50} color="#3B82F6" />
      </mesh>
      <Text
        position={[0, 4.5, 0]}
        fontSize={0.8}
        color="white"
        font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
      >
        GALAXIE SONORE
      </Text>
    </group>
  );
};

const GalaxyScene = ({ portfolios, activeFilter, onSelect }: { 
  portfolios: ModelPortfolio[], 
  activeFilter: string,
  onSelect: (p: ModelPortfolio) => void
}) => {
  return (
    <>
      <CentralStar />
      {portfolios.map((p, i) => (
        <Planet 
          key={p.id} 
          portfolio={p} 
          index={i} 
          activeFilter={activeFilter} 
          onSelect={onSelect}
        />
      ))}
      <OrbitControls 
        enablePan={false} 
        minDistance={10} 
        maxDistance={50} 
        autoRotate 
        autoRotateSpeed={0.5} 
      />
      <PerspectiveCamera makeDefault position={[0, 20, 35]} fov={50} />
      <ambientLight intensity={0.5} />
    </>
  );
};

// --- Modal Component ---

const PortfolioModal = ({ 
  portfolio, 
  onClose 
}: { 
  portfolio: ModelPortfolio, 
  onClose: () => void 
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-xl"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="w-full max-w-5xl bg-white dark:bg-slate-950 rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10 relative flex flex-col md:flex-row h-[90vh] md:h-auto"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-50 p-3 bg-black/20 hover:bg-black/40 rounded-full text-white transition-all"
        >
          <X size={24} />
        </button>

        {/* Left Side: 3D Preview */}
        <div className="w-full md:w-1/2 h-64 md:h-auto bg-navy relative overflow-hidden">
          <Canvas>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <Float speed={4} rotationIntensity={1} floatIntensity={2}>
              <mesh>
                <sphereGeometry args={[2, 64, 64]} />
                <shaderMaterial 
                  args={[WaveformShader]} 
                  transparent 
                  uniforms={{
                    ...WaveformShader.uniforms,
                    uColor: { value: new THREE.Color(
                      portfolio.category === 'medical' ? '#3B82F6' : 
                      portfolio.category === 'music' ? '#F59E0B' : 
                      portfolio.category === 'industrial' ? '#EF4444' : 
                      portfolio.category === 'agriculture' ? '#10B981' : '#8B5CF6'
                    )}
                  }}
                />
              </mesh>
            </Float>
            <OrbitControls enableZoom={false} autoRotate />
          </Canvas>
          <div className="absolute bottom-8 left-8 right-8 z-20">
            <div className="flex items-center justify-between text-white/60 text-xs font-bold uppercase tracking-widest mb-4">
              <span>Waveform 3D Real-time</span>
              <span>Librosa Engine</span>
            </div>
            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="w-1/2 h-full bg-electric"
              />
            </div>
          </div>
        </div>

        {/* Right Side: Details */}
        <div className="flex-1 p-8 md:p-12 overflow-y-auto custom-scrollbar">
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-electric/10 text-electric text-[10px] font-bold rounded-full border border-electric/20 uppercase tracking-widest">
                  {portfolio.category}
                </span>
                <div className="flex items-center gap-1 text-yellow-500">
                  <Star size={14} fill="currentColor" />
                  <span className="text-sm font-bold">{portfolio.rating}</span>
                </div>
              </div>
              <h2 className="text-4xl font-black text-navy dark:text-white mb-2">{portfolio.name}</h2>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                {portfolio.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Précision Moyenne</p>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-black text-success">{portfolio.accuracy}%</span>
                  <div className="h-8 w-1 bg-success/20 rounded-full overflow-hidden mb-1">
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: `${portfolio.accuracy}%` }}
                      className="w-full bg-success"
                    />
                  </div>
                </div>
              </div>
              <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">F1 Score</p>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-black text-electric">{portfolio.f1Score}%</span>
                  <div className="h-8 w-1 bg-electric/20 rounded-full overflow-hidden mb-1">
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: `${portfolio.f1Score}%` }}
                      className="w-full bg-electric"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-bold text-navy dark:text-white uppercase tracking-widest">Modèles Satellites</h4>
              <div className="space-y-3">
                {['MFCC_Encoder_v2', 'CREPE_Pitch_Estimator', 'ResNet50_Audio_Classifier'].map((model, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 group hover:border-electric/30 transition-all cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center text-electric shadow-sm">
                        <Waveform size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-navy dark:text-white">{model}</p>
                        <p className="text-[10px] text-slate-500 uppercase">Dataset: 1.2GB • ONNX</p>
                      </div>
                    </div>
                    <Play size={16} className="text-slate-300 group-hover:text-electric transition-colors" />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="flex-1 btn-primary py-4 rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-electric/20 text-lg">
                {portfolio.price === 0 ? <Download size={20} /> : <ShoppingCart size={20} />}
                {portfolio.price === 0 ? 'FORK GRATUIT' : `ACHETER PRO ${portfolio.price}€`}
              </button>
              <button className="btn-outline py-4 px-8 rounded-2xl flex items-center justify-center gap-3">
                <Play size={20} />
                TEST LIVE 🎤
              </button>
            </div>

            <div className="flex items-center justify-between text-slate-400 text-xs font-medium pt-4 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-1.5 hover:text-alert transition-colors">
                  <Heart size={14} />
                  Wishlist
                </button>
                <button className="flex items-center gap-1.5 hover:text-electric transition-colors">
                  <Share2 size={14} />
                  Partager
                </button>
              </div>
              <span>87 Forks • 312 Avis</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- Main Component ---

export const GalaxyMarketplace = ({ 
  portfolios, 
  activeFilter 
}: { 
  portfolios: ModelPortfolio[], 
  activeFilter: string 
}) => {
  const [selectedPortfolio, setSelectedPortfolio] = useState<ModelPortfolio | null>(null);
  const [viewMode, setViewMode] = useState<'3d' | '2d'>('3d');

  // Handle responsive view mode
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setViewMode('2d');
      else setViewMode('3d');
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="relative w-full h-[700px] rounded-[3rem] overflow-hidden bg-navy shadow-2xl border border-white/5">
      {/* View Toggle */}
      <div className="absolute top-8 left-8 z-50 flex bg-black/40 backdrop-blur-md p-1 rounded-2xl border border-white/10">
        <button 
          onClick={() => setViewMode('3d')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${viewMode === '3d' ? 'bg-electric text-white shadow-lg' : 'text-white/60 hover:text-white'}`}
        >
          GALAXY 3D
        </button>
        <button 
          onClick={() => setViewMode('2d')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${viewMode === '2d' ? 'bg-electric text-white shadow-lg' : 'text-white/60 hover:text-white'}`}
        >
          GRID 2D
        </button>
      </div>

      {/* Galaxy View */}
      {viewMode === '3d' ? (
        <div className="w-full h-full cursor-grab active:cursor-grabbing">
          <Canvas shadows>
            <GalaxyScene 
              portfolios={portfolios} 
              activeFilter={activeFilter} 
              onSelect={setSelectedPortfolio} 
            />
          </Canvas>
          
          {/* Legend */}
          <div className="absolute bottom-8 right-8 z-50 flex flex-col gap-2 bg-black/40 backdrop-blur-md p-4 rounded-3xl border border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-[#3B82F6]" />
              <span className="text-[10px] font-bold text-white/80 uppercase tracking-widest">Médical</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-[#F59E0B]" />
              <span className="text-[10px] font-bold text-white/80 uppercase tracking-widest">Musique</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-[#EF4444]" />
              <span className="text-[10px] font-bold text-white/80 uppercase tracking-widest">Industrie</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-full bg-white dark:bg-slate-950 p-8 overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolios.map((item) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => setSelectedPortfolio(item)}
                className="bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 hover:border-electric/30 transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-electric/10 rounded-2xl flex items-center justify-center text-electric">
                    <Waveform size={24} />
                  </div>
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star size={14} fill="currentColor" />
                    <span className="text-sm font-bold">{item.rating}</span>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-navy dark:text-white group-hover:text-electric transition-colors">{item.name}</h3>
                <p className="text-xs text-slate-500 mt-1 mb-4 line-clamp-2">{item.description}</p>
                <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
                  <span className="text-lg font-black text-navy dark:text-white">{item.price === 0 ? 'Gratuit' : `${item.price}€`}</span>
                  <button className="btn-primary py-2 px-4 text-xs">Détails</button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Portfolio Modal */}
      <AnimatePresence>
        {selectedPortfolio && (
          <PortfolioModal 
            portfolio={selectedPortfolio} 
            onClose={() => setSelectedPortfolio(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};
