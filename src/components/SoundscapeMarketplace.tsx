import React, { useState, useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  Float, 
  Text, 
  MeshDistortMaterial, 
  PerspectiveCamera, 
  OrbitControls, 
  Html,
  Environment,
  MeshWobbleMaterial,
  Sparkles,
  ScrollControls,
  Scroll
} from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Download, 
  Zap, 
  Star, 
  Activity, 
  Volume2, 
  Search, 
  Anchor, 
  Wind, 
  Droplets,
  ArrowRight,
  X,
  Mic,
  Share2
} from 'lucide-react';
import { ModelPortfolio } from '../types';
import { WaveSpinner } from './WaveSpinner';
import { useTheme } from '../context/ThemeContext';

// --- SHADERS ---
const OceanShader = {
  uniforms: {
    uTime: { value: 0 },
    uColor: { value: new THREE.Color('#0ea5e9') },
    uDeepColor: { value: new THREE.Color('#0369a1') },
    uWaveSpeed: { value: 0.5 },
    uWaveHeight: { value: 0.2 },
    uWaveFrequency: { value: 1.0 },
    uIsDark: { value: 0.0 }
  },
  vertexShader: `
    uniform float uTime;
    uniform float uWaveSpeed;
    uniform float uWaveHeight;
    uniform float uWaveFrequency;
    varying vec2 vUv;
    varying float vElevation;

    void main() {
      vUv = uv;
      vec4 modelPosition = modelMatrix * vec4(position, 1.0);
      
      float elevation = sin(modelPosition.x * uWaveFrequency + uTime * uWaveSpeed) * 
                        cos(modelPosition.z * uWaveFrequency * 0.5 + uTime * uWaveSpeed * 0.8) * 
                        uWaveHeight;
      
      modelPosition.y += elevation;
      vElevation = elevation;
      
      gl_Position = projectionMatrix * viewMatrix * modelPosition;
    }
  `,
  fragmentShader: `
    uniform vec3 uColor;
    uniform vec3 uDeepColor;
    uniform float uIsDark;
    varying vec2 vUv;
    varying float vElevation;

    void main() {
      float mixStrength = (vElevation + 0.2) * 2.0;
      vec3 color = mix(uDeepColor, uColor, mixStrength);
      
      if (uIsDark > 0.5) {
        color *= 0.4;
      }
      
      gl_FragColor = vec4(color, 0.85);
    }
  `
};

// --- COMPONENTS ---

const Ocean = ({ isDark }: { isDark: boolean }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const uniforms = useMemo(() => ({
    ...OceanShader.uniforms,
    uIsDark: { value: isDark ? 1.0 : 0.0 }
  }), [isDark]);

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = state.clock.getElapsedTime();
    }
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
      <planeGeometry args={[100, 100, 128, 128]} />
      <shaderMaterial 
        vertexShader={OceanShader.vertexShader}
        fragmentShader={OceanShader.fragmentShader}
        uniforms={uniforms}
        transparent
      />
    </mesh>
  );
};

const WaveformIsland = ({ 
  portfolio, 
  position, 
  onSelect, 
  isSelected,
  isDark
}: { 
  portfolio: ModelPortfolio; 
  position: [number, number, number];
  onSelect: (p: ModelPortfolio) => void;
  isSelected: boolean;
  isDark: boolean;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() + position[0]) * 0.1;
      meshRef.current.rotation.y += 0.005;
    }
  });

  const islandColor = useMemo(() => {
    switch(portfolio.category) {
      case 'medical': return isDark ? '#38bdf8' : '#0ea5e9';
      case 'music': return isDark ? '#fbbf24' : '#f59e0b';
      case 'industrial': return isDark ? '#f87171' : '#ef4444';
      default: return '#3b82f6';
    }
  }, [portfolio.category, isDark]);

  return (
    <group position={position}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh 
          ref={meshRef}
          onClick={(e) => {
            e.stopPropagation();
            onSelect(portfolio);
          }}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          castShadow
        >
          <sphereGeometry args={[1.2, 64, 64]} />
          <MeshDistortMaterial 
            color={islandColor}
            speed={hovered ? 5 : 2} 
            distort={0.4} 
            radius={1}
            emissive={islandColor}
            emissiveIntensity={hovered ? 0.5 : 0.2}
          />
          
          <Html position={[0, 2, 0]} center distanceFactor={10}>
            <div className={`flex flex-col items-center pointer-events-none transition-all duration-500 ${hovered || isSelected ? 'scale-110 opacity-100' : 'scale-90 opacity-60'}`}>
              <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20 shadow-2xl flex flex-col items-center gap-1">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{portfolio.category}</span>
                <span className="text-sm font-black text-navy dark:text-white whitespace-nowrap">{portfolio.name}</span>
                <div className="flex items-center gap-1">
                  <Star size={10} className="text-yellow-400 fill-yellow-400" />
                  <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300">{portfolio.rating}</span>
                </div>
              </div>
              {/* Waveform visualizer below island */}
              <div className="flex gap-0.5 mt-2 h-4 items-end">
                {[...Array(8)].map((_, i) => (
                  <motion.div 
                    key={i}
                    animate={{ height: [4, Math.random() * 16 + 4, 4] }}
                    transition={{ duration: 0.5 + Math.random(), repeat: Infinity }}
                    className="w-1 bg-white/40 rounded-full"
                  />
                ))}
              </div>
            </div>
          </Html>
        </mesh>
      </Float>
      
      {/* Underwater reflection/glow */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.6, 0]}>
        <circleGeometry args={[2, 32]} />
        <meshBasicMaterial color={islandColor} transparent opacity={0.1} />
      </mesh>
    </group>
  );
};

const Boat = () => {
  const meshRef = useRef<THREE.Group>(null);
  const { mouse, viewport } = useThree();

  useFrame((state) => {
    if (meshRef.current) {
      const targetX = (mouse.x * viewport.width) / 2;
      const targetZ = -(mouse.y * viewport.height) / 2;
      
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.05);
      meshRef.current.position.z = THREE.MathUtils.lerp(meshRef.current.position.z, targetZ, 0.05);
      
      meshRef.current.rotation.y = Math.atan2(
        targetX - meshRef.current.position.x,
        targetZ - meshRef.current.position.z
      );
      
      meshRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 2) * 0.05;
    }
  });

  return (
    <group ref={meshRef}>
      <mesh castShadow>
        <boxGeometry args={[0.5, 0.2, 1]} />
        <meshStandardMaterial color="#fbbf24" />
      </mesh>
      <mesh position={[0, 0.3, 0]}>
        <coneGeometry args={[0.1, 0.6, 4]} />
        <meshStandardMaterial color="white" />
      </mesh>
      <Html center position={[0, 1, 0]}>
        <div className="bg-navy text-white text-[8px] font-black px-2 py-1 rounded-full uppercase tracking-widest whitespace-nowrap">
          Votre Bateau
        </div>
      </Html>
    </group>
  );
};

const portfolios: ModelPortfolio[] = [
  {
    id: '1',
    name: 'AfroBeatsID',
    description: 'Classification de genres musicaux africains (Makossa, Afrobeats, Amapiano). Analyse rythmique et spectrale haute fidélité.',
    accuracy: 91.2,
    f1Score: 89.5,
    price: 0,
    tags: ['Musique', 'Culture', 'Afrique'],
    rating: 4.8,
    reviews: 512,
    author: 'KultureAI',
    category: 'music'
  },
  {
    id: '2',
    name: 'VibraPredict',
    description: 'Maintenance prédictive industrielle. Détecte les anomalies de roulements et de moteurs avant la panne.',
    accuracy: 95.4,
    f1Score: 94.1,
    price: 50,
    tags: ['Industrie', 'IoT', 'Maintenance'],
    rating: 4.5,
    reviews: 128,
    author: 'IndusTech',
    category: 'industrial'
  },
  {
    id: '3',
    name: 'RespiDiag-Pro',
    description: 'Diagnostic assisté des pathologies respiratoires par analyse de toux. Détection COVID, Asthme, Pneumonie.',
    accuracy: 92.8,
    f1Score: 92.0,
    price: 0,
    tags: ['Santé', 'Médical', 'IA'],
    rating: 4.9,
    reviews: 342,
    author: 'HealthSound',
    category: 'medical'
  },
  {
    id: '7',
    name: 'BabyCry-AI',
    description: 'Traducteur de pleurs de bébé. Identifie : Faim, Sommeil, Couche sale, Coliques ou Besoin de câlin.',
    accuracy: 89.7,
    f1Score: 88.4,
    price: 0,
    tags: ['Pédiatrie', 'Parentalité', 'Santé'],
    rating: 4.7,
    reviews: 890,
    author: 'BabyCare Tech',
    category: 'medical'
  },
  {
    id: '4',
    name: 'AgriSound-X',
    description: 'Détection précoce de parasites dans les cultures. Analyse le bruit de mastication des insectes.',
    accuracy: 88.5,
    f1Score: 87.2,
    price: 25,
    tags: ['Agriculture', 'SmartFarming'],
    rating: 4.2,
    reviews: 96,
    author: 'AgriAI',
    category: 'agriculture'
  }
];

export const SoundscapeMarketplace: React.FC = () => {
  const [selectedPortfolio, setSelectedPortfolio] = useState<ModelPortfolio | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const [isVoiceSearching, setIsVoiceSearching] = useState(false);
  const { isDark } = useTheme();

  const filteredPortfolios = useMemo(() => {
    if (filter === 'all') return portfolios;
    return portfolios.filter(p => p.category === filter);
  }, [filter]);

  const handleVoiceSearch = () => {
    setIsVoiceSearching(true);
    setTimeout(() => setIsVoiceSearching(false), 3000);
  };

  return (
    <div className="relative w-full h-[calc(100vh-120px)] overflow-hidden rounded-[3rem] bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-2xl">
      {/* 3D Scene */}
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 10, 15]} fov={50} />
        <OrbitControls 
          enablePan={false} 
          maxPolarAngle={Math.PI / 2.2} 
          minDistance={10} 
          maxDistance={30} 
        />
        
        <ambientLight intensity={isDark ? 0.2 : 0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} castShadow />
        <spotLight position={[-10, 10, -10]} intensity={0.5} />
        
        <Suspense fallback={null}>
          <Ocean isDark={isDark} />
          <Boat />
          
          {filteredPortfolios.map((p, i) => {
            const angle = (i / filteredPortfolios.length) * Math.PI * 2;
            const radius = 8 + Math.sin(i) * 2;
            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * radius;
            return (
              <WaveformIsland 
                key={p.id} 
                portfolio={p} 
                position={[x, 0, z]} 
                onSelect={setSelectedPortfolio}
                isSelected={selectedPortfolio?.id === p.id}
                isDark={isDark}
              />
            );
          })}
          
          <Sparkles count={50} scale={20} size={2} speed={0.5} color={isDark ? '#38bdf8' : '#0ea5e9'} />
          <Environment preset="city" />
        </Suspense>
      </Canvas>

      {/* UI Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Header UI */}
        <div className="absolute top-4 md:top-8 left-4 md:left-8 right-4 md:right-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pointer-events-auto">
          <div className="flex flex-col">
            <h2 className="text-xl md:text-2xl font-black text-navy dark:text-white tracking-tighter uppercase">Océan Sonore</h2>
            <div className="flex items-center gap-2 text-[8px] md:text-[10px] font-black text-electric uppercase tracking-widest">
              <Anchor size={12} />
              Navigation ML Immersive
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4 w-full md:w-auto overflow-x-auto no-scrollbar pb-2 md:pb-0">
            <div className="flex bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-1 rounded-xl md:p-1.5 md:rounded-2xl border border-white/20 shadow-xl shrink-0">
              {['all', 'medical', 'music', 'industrial'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-2 md:px-4 py-1.5 md:py-2 rounded-lg md:rounded-xl text-[8px] md:text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                    filter === cat 
                      ? 'bg-electric text-white shadow-lg' 
                      : 'text-slate-400 hover:text-navy dark:hover:text-white'
                  }`}
                >
                  {cat === 'all' ? 'Tout' : cat}
                </button>
              ))}
            </div>

            <button 
              onClick={handleVoiceSearch}
              className={`p-3 md:p-4 rounded-xl md:rounded-2xl transition-all pointer-events-auto shrink-0 ${
                isVoiceSearching 
                  ? 'bg-alert text-white animate-pulse' 
                  : 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl text-navy dark:text-white border border-white/20 shadow-xl hover:scale-110'
              }`}
            >
              <Mic className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>
        </div>

        {/* Bottom UI - Legend */}
        <div className="absolute bottom-8 left-8 flex flex-col gap-2">
          <div className="flex items-center gap-4 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <span className="text-[10px] font-black text-navy dark:text-white uppercase tracking-widest">Médical</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <span className="text-[10px] font-black text-navy dark:text-white uppercase tracking-widest">Musique</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <span className="text-[10px] font-black text-navy dark:text-white uppercase tracking-widest">Industrie</span>
            </div>
          </div>
        </div>
      </div>

      {/* Detail Modal (The "Underwater" View) */}
      <AnimatePresence>
        {selectedPortfolio && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-navy/60 backdrop-blur-2xl overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.9, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 50, opacity: 0 }}
              className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl border border-white/10 my-auto"
            >
              <button 
                onClick={() => setSelectedPortfolio(null)}
                className="absolute top-4 right-4 md:top-8 md:right-8 p-2 md:p-3 bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-alert rounded-xl md:rounded-2xl transition-all z-10"
              >
                <X className="w-4 h-4 md:w-6 md:h-6" />
              </button>

              <div className="flex flex-col lg:flex-row h-full max-h-[90vh] overflow-y-auto lg:overflow-visible">
                {/* Left Side: Visualizer */}
                <div className="lg:w-1/2 bg-slate-50 dark:bg-slate-800/50 p-6 md:p-12 flex flex-col justify-center items-center relative overflow-hidden shrink-0">
                  <div className="absolute inset-0 opacity-10">
                    <WaveSpinner size={100} />
                  </div>
                  
                  <motion.div 
                    animate={{ scale: [1, 1.05, 1], rotate: [0, 5, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="w-32 h-32 md:w-48 md:h-48 bg-electric/10 rounded-[2rem] md:rounded-[3rem] flex items-center justify-center border-4 border-electric/20 relative z-10"
                  >
                    <Volume2 className="w-12 h-12 md:w-20 md:h-20 text-electric" />
                  </motion.div>
                  
                  <div className="mt-8 md:mt-12 w-full space-y-4 relative z-10">
                    <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                      <span>Analyse Spectrale</span>
                      <Activity size={14} className="text-electric" />
                    </div>
                    <div className="h-16 md:h-24 flex items-end justify-between gap-0.5 md:gap-1">
                      {[...Array(20)].map((_, i) => (
                        <motion.div
                          key={i}
                          animate={{ height: [10, Math.random() * 60 + 10, 10] }}
                          transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.05 }}
                          className="flex-1 bg-electric/40 rounded-full"
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Side: Info */}
                <div className="lg:w-1/2 p-6 md:p-12 space-y-6 md:space-y-8">
                  <div>
                    <div className="flex items-center gap-2 text-electric font-black text-[10px] md:text-xs uppercase tracking-widest mb-2">
                      <Zap size={14} />
                      {selectedPortfolio.category}
                    </div>
                    <h2 className="text-2xl md:text-4xl font-black text-navy dark:text-white tracking-tight">{selectedPortfolio.name}</h2>
                    <p className="text-[10px] md:text-sm text-slate-400 font-bold mt-1">Par {selectedPortfolio.author}</p>
                  </div>

                  <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                    {selectedPortfolio.description}
                  </p>

                  <div className="grid grid-cols-2 gap-3 md:gap-4">
                    <div className="p-3 md:p-4 bg-slate-50 dark:bg-slate-800 rounded-xl md:rounded-2xl border border-slate-100 dark:border-slate-700">
                      <p className="text-xl md:text-2xl font-black text-success">{selectedPortfolio.accuracy}%</p>
                      <p className="text-[8px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest">Précision</p>
                    </div>
                    <div className="p-3 md:p-4 bg-slate-50 dark:bg-slate-800 rounded-xl md:rounded-2xl border border-slate-100 dark:border-slate-700">
                      <p className="text-xl md:text-2xl font-black text-electric">{selectedPortfolio.f1Score}%</p>
                      <p className="text-[8px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest">F1 Score</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {selectedPortfolio.tags.map(tag => (
                      <span key={tag} className="px-2 md:px-3 py-1 md:py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg md:rounded-xl text-[8px] md:text-[10px] font-black uppercase tracking-widest border border-slate-200 dark:border-slate-700">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-4">
                    <button className="flex-1 btn-primary py-3 md:py-4 rounded-xl md:rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-electric/20 hover:scale-[1.02] transition-all">
                      <Download className="w-4 h-4 md:w-5 md:h-5" />
                      <span className="font-black uppercase tracking-widest text-xs md:text-sm">Forker le Modèle</span>
                    </button>
                    <button className="p-3 md:p-4 bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-electric rounded-xl md:rounded-2xl transition-all flex items-center justify-center">
                      <Share2 className="w-4 h-4 md:w-5 md:h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Voice Search Tsunami Effect */}
      <AnimatePresence>
        {isVoiceSearching && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-[60] flex items-center justify-center bg-electric/20 backdrop-blur-sm pointer-events-none"
          >
            <div className="flex flex-col items-center gap-6">
              <div className="relative">
                <motion.div 
                  animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="absolute inset-0 bg-white rounded-full"
                />
                <div className="relative w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-2xl">
                  <Mic size={40} className="text-electric" />
                </div>
              </div>
              <p className="text-2xl font-black text-white uppercase tracking-[0.5em] drop-shadow-lg">Écoute en cours...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
