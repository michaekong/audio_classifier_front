import React, { useState, useCallback, useMemo, useEffect } from 'react';
import ReactFlow, { 
  addEdge, 
  Background, 
  Controls, 
  Connection, 
  Edge, 
  Node, 
  Handle, 
  Position,
  MarkerType,
  useNodesState,
  useEdgesState,
  Panel
} from 'reactflow';
import 'reactflow/dist/style.css';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Save, 
  Database, 
  Settings2, 
  Zap, 
  Cpu, 
  Music,
  Activity,
  Volume2,
  Share2,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  X
} from 'lucide-react';
import { Howl } from 'howler';
import confetti from 'canvas-confetti';
import { cn } from '@/src/lib/utils';
import { useTheme } from '../context/ThemeContext';

// --- Custom Node Components ---

const DatasetNode = ({ data }: any) => (
  <div className="relative group">
    <div className="w-32 h-32 md:w-40 md:h-40 bg-cream dark:bg-slate-900 rounded-full border-4 border-navy/20 dark:border-slate-800 flex items-center justify-center shadow-2xl relative overflow-hidden group-hover:border-electric/50 transition-all">
      {/* Vinyl Grooves */}
      <div className="absolute inset-0 opacity-20" style={{ background: 'repeating-radial-gradient(circle, transparent, transparent 2px, #1E3A8A 3px)' }} />
      
      {/* Label */}
      <motion.div 
        animate={data.isPlaying ? { rotate: 360 } : {}}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="w-12 h-12 md:w-16 md:h-16 bg-electric rounded-full flex flex-col items-center justify-center text-[8px] font-black text-white uppercase tracking-tighter text-center p-1 z-10"
      >
        <Database size={12} className="mb-0.5" />
        <span>{data.label || 'Dataset'}</span>
        <span className="opacity-70 mt-0.5">245 sons</span>
      </motion.div>

      {/* Spindle hole */}
      <div className="w-2 h-2 bg-navy/40 dark:bg-slate-800 rounded-full z-20" />
    </div>
    
    <Handle type="source" position={Position.Right} className="w-3 h-3 bg-electric border-2 border-navy" />
    
    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-black uppercase tracking-widest text-navy/40 dark:text-slate-400">
      Source Audio
    </div>
  </div>
);

const EncodingNode = ({ data }: any) => (
  <div className="bg-cream dark:bg-slate-900/90 backdrop-blur-xl border-2 border-white/10 dark:border-slate-800 p-4 rounded-2xl w-48 shadow-2xl group hover:border-electric/50 transition-all">
    <div className="flex items-center gap-3 mb-4">
      <div className="w-8 h-8 bg-electric/10 rounded-lg flex items-center justify-center text-electric">
        <Settings2 size={16} />
      </div>
      <div className="text-left">
        <div className="text-[10px] font-black text-electric uppercase tracking-widest">Encodage</div>
        <div className="text-xs font-bold text-navy dark:text-white">{data.label}</div>
      </div>
    </div>

    {/* Fader Track */}
    <div className="h-32 bg-navy/5 dark:bg-slate-950 rounded-lg relative flex justify-center py-2">
      <div className="w-1 h-full bg-navy/10 dark:bg-slate-800 rounded-full" />
      <motion.div 
        drag="y"
        dragConstraints={{ top: 0, bottom: 100 }}
        className="absolute w-8 h-4 bg-cream dark:bg-electric rounded shadow-lg shadow-navy/10 dark:shadow-electric/20 cursor-ns-resize flex flex-col justify-between p-0.5 border border-navy/10 dark:border-white/20"
        style={{ top: '40%' }}
      >
        <div className="h-px bg-navy/20 dark:bg-white/50" />
        <div className="h-px bg-navy/20 dark:bg-white/50" />
      </motion.div>
    </div>

    <div className="mt-4 flex justify-between text-[8px] font-mono text-navy/40 dark:text-slate-500">
      <span>-∞</span>
      <span>0dB</span>
      <span>+12dB</span>
    </div>

    <Handle type="target" position={Position.Left} className="w-3 h-3 bg-navy/20 dark:bg-slate-700 border-2 border-navy" />
    <Handle type="source" position={Position.Right} className="w-3 h-3 bg-electric border-2 border-navy" />
  </div>
);

const AugmentNode = ({ data }: any) => (
  <div className="bg-alert/5 dark:bg-red-900/20 backdrop-blur-xl border-2 border-alert/20 dark:border-red-500/30 p-4 rounded-2xl w-40 shadow-2xl group hover:border-alert transition-all">
    <div className="text-center mb-4">
      <div className="text-[10px] font-black text-alert uppercase tracking-widest mb-1">Augment</div>
      <div className="text-xs font-bold text-navy dark:text-white">{data.label}</div>
    </div>

    {/* Pedal Knobs */}
    <div className="grid grid-cols-2 gap-4 mb-6">
      {[1, 2].map(i => (
        <div key={i} className="flex flex-col items-center gap-1">
          <div className="w-8 h-8 rounded-full bg-navy/10 dark:bg-slate-800 border-2 border-navy/5 dark:border-slate-700 relative flex items-center justify-center">
            <div className="w-1 h-3 bg-alert rounded-full absolute top-0" style={{ transform: `rotate(${i * 45}deg)`, transformOrigin: 'bottom center' }} />
          </div>
          <span className="text-[8px] text-navy/40 dark:text-slate-500 uppercase">Param {i}</span>
        </div>
      ))}
    </div>

    {/* Pedal Switch */}
    <button className="w-full h-8 bg-alert rounded-lg shadow-inner flex items-center justify-center text-white active:translate-y-0.5 transition-all">
      <Zap size={14} />
    </button>

    <Handle type="target" position={Position.Left} className="w-3 h-3 bg-navy/20 dark:bg-slate-700 border-2 border-navy" />
    <Handle type="source" position={Position.Right} className="w-3 h-3 bg-alert border-2 border-navy" />
  </div>
);

const ModelNode = ({ data }: any) => (
  <div className="bg-cream dark:bg-slate-900 border-4 border-navy/5 dark:border-slate-800 p-6 rounded-3xl w-56 shadow-2xl relative overflow-hidden group hover:border-electric/50 transition-all">
    {/* Amp Mesh */}
    <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#1E3A8A 1px, transparent 1px)', backgroundSize: '4px 4px' }} />
    
    <div className="relative z-10">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-electric/10 rounded-xl flex items-center justify-center text-electric">
          <Cpu size={20} />
        </div>
        <div>
          <div className="text-[10px] font-black text-electric uppercase tracking-widest">Architecture</div>
          <div className="text-sm font-black text-navy dark:text-white">{data.label}</div>
        </div>
      </div>

      <div className="space-y-3">
        {[1, 2, 3].map(i => (
          <div key={i} className="space-y-1">
            <div className="flex justify-between text-[8px] text-navy/40 dark:text-slate-500 uppercase">
              <span>Layer {i}</span>
              <span>{Math.floor(Math.random() * 100)}%</span>
            </div>
            <div className="h-1 bg-navy/10 dark:bg-slate-800 rounded-full overflow-hidden">
              <motion.div 
                animate={{ width: ['20%', '80%', '40%'] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                className="h-full bg-electric/50" 
              />
            </div>
          </div>
        ))}
      </div>
    </div>

    <Handle type="target" position={Position.Left} className="w-3 h-3 bg-navy/20 dark:bg-slate-700 border-2 border-navy" />
    <Handle type="source" position={Position.Right} className="w-3 h-3 bg-electric border-2 border-navy" />
  </div>
);

const TrainNode = ({ data }: any) => (
  <div className="bg-cream dark:bg-slate-900 border-2 border-navy/5 dark:border-slate-800 p-4 rounded-2xl w-64 shadow-2xl relative overflow-hidden group hover:border-success/50 transition-all">
    <div className="flex items-center justify-between mb-4">
      <div className="text-[10px] font-black text-success uppercase tracking-widest">Entraînement</div>
      <div className="flex gap-1">
        <div className={cn("w-2 h-2 rounded-full", data.isTraining ? "bg-alert animate-pulse" : "bg-navy/10 dark:bg-slate-700")} />
        <div className={cn("w-2 h-2 rounded-full", data.isTraining ? "bg-success" : "bg-navy/10 dark:bg-slate-700")} />
      </div>
    </div>

    {/* Tape Reels */}
    <div className="flex justify-around mb-6">
      {[1, 2].map(i => (
        <motion.div 
          key={i}
          animate={data.isTraining ? { rotate: 360 } : {}}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 rounded-full border-4 border-navy/10 dark:border-slate-800 flex items-center justify-center relative"
        >
          <div className="w-1 h-12 bg-navy/10 dark:bg-slate-800 absolute" />
          <div className="w-12 h-1 bg-navy/10 dark:bg-slate-800 absolute" />
          <div className="w-4 h-4 bg-navy/20 dark:bg-slate-700 rounded-full z-10" />
        </motion.div>
      ))}
    </div>

    {/* VU Meters */}
    <div className="space-y-3">
      <div className="space-y-1">
        <div className="flex justify-between text-[8px] font-mono text-navy/40 dark:text-slate-500">
          <span>LOSS</span>
          <span className="text-alert">{data.loss || '0.00'}</span>
        </div>
        <div className="h-2 bg-navy/5 dark:bg-slate-950 rounded flex gap-0.5 p-0.5">
          {[...Array(10)].map((_, i) => (
            <div 
              key={i} 
              className={cn(
                "flex-1 rounded-sm transition-all",
                i < (data.lossValue || 0) ? (i > 7 ? "bg-alert" : "bg-success") : "bg-navy/10 dark:bg-slate-800"
              )} 
            />
          ))}
        </div>
      </div>
      <div className="space-y-1">
        <div className="flex justify-between text-[8px] font-mono text-navy/40 dark:text-slate-500">
          <span>ACC</span>
          <span className="text-success">{data.acc || '0.00'}%</span>
        </div>
        <div className="h-2 bg-navy/5 dark:bg-slate-950 rounded flex gap-0.5 p-0.5">
          {[...Array(10)].map((_, i) => (
            <div 
              key={i} 
              className={cn(
                "flex-1 rounded-sm transition-all",
                i < (data.accValue || 0) ? "bg-success" : "bg-navy/10 dark:bg-slate-800"
              )} 
            />
          ))}
        </div>
      </div>
    </div>

    <Handle type="target" position={Position.Left} className="w-3 h-3 bg-navy/20 dark:bg-slate-700 border-2 border-navy" />
    <Handle type="source" position={Position.Right} className="w-3 h-3 bg-success border-2 border-navy" />
  </div>
);

const SaveNode = ({ data }: any) => (
  <div className="bg-cream dark:bg-slate-900 border-2 border-navy/5 dark:border-slate-800 p-4 rounded-2xl w-48 shadow-2xl group hover:border-electric transition-all">
    <div className="text-center mb-4">
      <div className="text-[10px] font-black text-electric uppercase tracking-widest mb-1">Export</div>
      <div className="text-xs font-bold text-navy dark:text-white">Hit Maker</div>
    </div>

    {/* Cassette Design */}
    <div className="bg-navy/5 dark:bg-slate-800 rounded-lg p-2 border-b-4 border-navy/20 dark:border-slate-950">
      <div className="h-12 bg-navy/10 dark:bg-slate-700 rounded flex items-center justify-center gap-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(90deg, #1E3A8A 1px, transparent 1px)', backgroundSize: '10px 100%' }} />
        <div className="w-6 h-6 rounded-full bg-navy/20 dark:bg-slate-900 border-2 border-navy/30 dark:border-slate-600" />
        <div className="w-12 h-4 bg-navy/20 dark:bg-slate-900 rounded-full" />
        <div className="w-6 h-6 rounded-full bg-navy/20 dark:bg-slate-900 border-2 border-navy/30 dark:border-slate-600" />
      </div>
      <div className="mt-2 text-[8px] font-mono text-navy/40 dark:text-slate-400 text-center">TDK-90 PRO</div>
    </div>

    <button className="w-full mt-4 py-2 bg-electric text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-electric/20 hover:scale-105 transition-all">
      Publier Hit
    </button>

    <Handle type="target" position={Position.Left} className="w-3 h-3 bg-navy/20 dark:bg-slate-700 border-2 border-navy" />
  </div>
);

const nodeTypes = {
  dataset: DatasetNode,
  encoding: EncodingNode,
  augment: AugmentNode,
  model: ModelNode,
  train: TrainNode,
  save: SaveNode,
};

// --- Main Component ---

export const Engineer: React.FC = () => {
  const { isDark } = useTheme();
  const [isTraining, setIsTraining] = useState(false);
  const [progress, setProgress] = useState(0);
  const [bpm, setBpm] = useState(120);
  const [showTutorial, setShowTutorial] = useState(true);

  // Sound Effects
  const sounds = useMemo(() => ({
    start: new Howl({ src: ['https://assets.mixkit.co/sfx/preview/mixkit-start-match-2820.mp3'], volume: 0.5 }),
    success: new Howl({ src: ['https://assets.mixkit.co/sfx/preview/mixkit-winning-chimes-2015.mp3'], volume: 0.5 }),
    click: new Howl({ src: ['https://assets.mixkit.co/sfx/preview/mixkit-modern-click-box-check-1120.mp3'], volume: 0.3 }),
  }), []);

  const initialNodes: Node[] = [
    { 
      id: '1', 
      type: 'dataset', 
      position: { x: 50, y: 150 }, 
      data: { label: 'Bébé Dataset', isPlaying: false } 
    },
    { 
      id: '2', 
      type: 'encoding', 
      position: { x: 300, y: 50 }, 
      data: { label: 'MFCC' } 
    },
    { 
      id: '3', 
      type: 'encoding', 
      position: { x: 300, y: 250 }, 
      data: { label: 'Mel Spec' } 
    },
    { 
      id: '4', 
      type: 'augment', 
      position: { x: 550, y: 150 }, 
      data: { label: 'Noise Injection' } 
    },
    { 
      id: '5', 
      type: 'model', 
      position: { x: 800, y: 150 }, 
      data: { label: 'CNN-Audio-v4' } 
    },
    { 
      id: '6', 
      type: 'train', 
      position: { x: 1100, y: 150 }, 
      data: { isTraining: false, loss: '0.00', acc: '0.00', lossValue: 0, accValue: 0 } 
    },
    { 
      id: '7', 
      type: 'save', 
      position: { x: 1400, y: 150 }, 
      data: { label: 'Export' } 
    },
  ];

  const initialEdges: Edge[] = [
    { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: '#3B82F6', strokeWidth: 3 }, markerEnd: { type: MarkerType.ArrowClosed, color: '#3B82F6' } },
    { id: 'e1-3', source: '1', target: '3', animated: true, style: { stroke: '#3B82F6', strokeWidth: 3 }, markerEnd: { type: MarkerType.ArrowClosed, color: '#3B82F6' } },
    { id: 'e2-4', source: '2', target: '4', animated: true, style: { stroke: '#3B82F6', strokeWidth: 3 }, markerEnd: { type: MarkerType.ArrowClosed, color: '#3B82F6' } },
    { id: 'e3-4', source: '3', target: '4', animated: true, style: { stroke: '#3B82F6', strokeWidth: 3 }, markerEnd: { type: MarkerType.ArrowClosed, color: '#3B82F6' } },
    { id: 'e4-5', source: '4', target: '5', animated: true, style: { stroke: '#EF4444', strokeWidth: 3 }, markerEnd: { type: MarkerType.ArrowClosed, color: '#EF4444' } },
    { id: 'e5-6', source: '5', target: '6', animated: true, style: { stroke: '#8B5CF6', strokeWidth: 3 }, markerEnd: { type: MarkerType.ArrowClosed, color: '#8B5CF6' } },
    { id: 'e6-7', source: '6', target: '7', animated: true, style: { stroke: '#10B981', strokeWidth: 3 }, markerEnd: { type: MarkerType.ArrowClosed, color: '#10B981' } },
  ];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((params: Connection) => {
    sounds.click.play();
    setEdges((eds) => addEdge({ ...params, animated: true, style: { stroke: '#3B82F6', strokeWidth: 3 }, markerEnd: { type: MarkerType.ArrowClosed, color: '#3B82F6' } }, eds));
  }, [setEdges, sounds.click]);

  const startTraining = () => {
    sounds.start.play();
    setIsTraining(true);
    setNodes(nds => nds.map(node => {
      if (node.type === 'dataset') return { ...node, data: { ...node.data, isPlaying: true } };
      if (node.type === 'train') return { ...node, data: { ...node.data, isTraining: true } };
      return node;
    }));

    let p = 0;
    const interval = setInterval(() => {
      p += 1;
      setProgress(p);
      
      // Update training stats
      setNodes(nds => nds.map(node => {
        if (node.type === 'train') {
          const acc = Math.min(98, p * 0.98 + (Math.random() * 2)).toFixed(2);
          const loss = Math.max(0.01, (1 - p/100) * 0.8 + (Math.random() * 0.1)).toFixed(3);
          return { 
            ...node, 
            data: { 
              ...node.data, 
              acc, 
              loss,
              accValue: Math.floor(parseFloat(acc) / 10),
              lossValue: Math.floor((1 - parseFloat(loss)) * 10)
            } 
          };
        }
        return node;
      }));

      if (p >= 100) {
        clearInterval(interval);
        setIsTraining(false);
        sounds.success.play();
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#3B82F6', '#10B981', '#EF4444', '#F59E0B']
        });
        setNodes(nds => nds.map(node => {
          if (node.type === 'dataset') return { ...node, data: { ...node.data, isPlaying: false } };
          if (node.type === 'train') return { ...node, data: { ...node.data, isTraining: false } };
          return node;
        }));
      }
    }, 200);
  };

  return (
    <div className="h-[calc(100vh-120px)] w-full bg-navy rounded-[2rem] overflow-hidden border border-white/10 relative shadow-2xl">
      {/* Studio Header */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-navy/80 backdrop-blur-md border-b border-white/10 z-10 flex items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-3 md:gap-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-alert animate-pulse" />
            <span className="text-[10px] md:text-xs font-black text-white uppercase tracking-widest truncate max-w-[80px] md:max-w-none">Studio AudioForge</span>
          </div>
          <div className="h-8 w-px bg-white/10 hidden sm:block" />
          <div className="hidden sm:flex items-center gap-4">
            <div className="text-[10px] font-black text-white/40 uppercase tracking-widest">BPM</div>
            <div className="text-xl font-black text-electric font-mono">{bpm}</div>
            <input 
              type="range" 
              min="60" 
              max="200" 
              value={bpm} 
              onChange={(e) => setBpm(parseInt(e.target.value))}
              className="w-16 md:w-24 accent-electric"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <button 
            onClick={startTraining}
            disabled={isTraining}
            className={cn(
              "px-3 md:px-6 py-2 rounded-xl font-black uppercase tracking-widest text-[10px] md:text-xs flex items-center gap-2 transition-all",
              isTraining ? "bg-alert text-white" : "bg-electric text-white shadow-lg shadow-electric/20 hover:scale-105"
            )}
          >
            {isTraining ? <Pause size={14} /> : <Play size={14} />}
            <span className="hidden xs:inline">{isTraining ? "Recording..." : "Start Training"}</span>
            <span className="xs:hidden">{isTraining ? "REC" : "START"}</span>
          </button>
          <button 
            onClick={() => setShowTutorial(true)}
            className="p-2 bg-white/10 text-white/40 rounded-xl hover:text-white transition-all"
          >
            <HelpCircle size={18} />
          </button>
        </div>
      </div>

      {/* React Flow Canvas */}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        className="bg-navy"
      >
        <Background color="#3B82F6" gap={20} />
        <Controls className="bg-navy border-white/10 fill-white" />
        
        <Panel position="bottom-right" className="bg-navy/80 backdrop-blur-md p-4 rounded-2xl border border-white/10 m-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-8">
              <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Global Progress</span>
              <span className="text-xs font-black text-white">{progress}%</span>
            </div>
            <div className="w-48 h-1.5 bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                animate={{ width: `${progress}%` }}
                className="h-full bg-electric" 
              />
            </div>
          </div>
        </Panel>

        <Panel position="top-left" className="m-4 pointer-events-none">
          <div className="space-y-2">
            <div className="flex items-center gap-2 bg-navy/50 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/5">
              <Activity size={14} className="text-electric" />
              <span className="text-[10px] font-bold text-white/70 uppercase tracking-tighter">GPU: NVIDIA T4 (Active)</span>
            </div>
            <div className="flex items-center gap-2 bg-navy/50 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/5">
              <Volume2 size={14} className="text-electric" />
              <span className="text-[10px] font-bold text-white/70 uppercase tracking-tighter">Audio Engine: WebAudio v2</span>
            </div>
          </div>
        </Panel>
      </ReactFlow>

      {/* Neon Glow Effects */}
      <div className="absolute top-1/4 -left-20 w-64 h-64 bg-electric/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-64 h-64 bg-electric/10 blur-[120px] pointer-events-none" />

      {/* Tutorial Overlay */}
      <AnimatePresence>
        {showTutorial && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-[100] bg-navy/60 backdrop-blur-md flex items-center justify-center p-8"
          >
            <div className="max-w-2xl w-full bg-cream dark:bg-slate-900 border border-white/10 rounded-[3rem] p-8 md:p-12 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-electric" />
              <button 
                onClick={() => setShowTutorial(false)}
                className="absolute top-8 right-8 p-2 text-navy/40 dark:text-slate-500 hover:text-navy dark:hover:text-white transition-all"
              >
                <X size={24} />
              </button>

              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-electric/10 rounded-2xl flex items-center justify-center text-electric">
                    <Music size={32} />
                  </div>
                  <div>
                    <h2 className="text-3xl font-black text-navy dark:text-white tracking-tight">Bienvenue au Studio AudioForge</h2>
                    <p className="text-navy/40 dark:text-slate-400 font-bold uppercase tracking-widest text-[10px]">Workflow ML Immersif</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4 p-6 bg-navy/5 dark:bg-slate-800/50 rounded-2xl border border-navy/5 dark:border-white/5">
                    <div className="w-10 h-10 bg-electric/20 rounded-xl flex items-center justify-center text-electric">
                      <Database size={20} />
                    </div>
                    <h3 className="font-bold text-navy dark:text-white">1. Connectez vos pistes</h3>
                    <p className="text-xs text-navy/60 dark:text-slate-400 leading-relaxed">Reliez votre Dataset aux blocs d'Encodage et d'Augmentation pour préparer vos données.</p>
                  </div>
                  <div className="space-y-4 p-6 bg-navy/5 dark:bg-slate-800/50 rounded-2xl border border-navy/5 dark:border-white/5">
                    <div className="w-10 h-10 bg-success/20 rounded-xl flex items-center justify-center text-success">
                      <Play size={20} />
                    </div>
                    <h3 className="font-bold text-navy dark:text-white">2. Lancez le Mix</h3>
                    <p className="text-xs text-navy/60 dark:text-slate-400 leading-relaxed">Appuyez sur PLAY pour démarrer l'entraînement. Surveillez les VU-mètres en temps réel.</p>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-4 pt-4">
                  <button 
                    onClick={() => setShowTutorial(false)}
                    className="w-full py-4 bg-electric text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-electric/20 hover:scale-[1.02] transition-all"
                  >
                    C'est parti !
                  </button>
                  <p className="text-[10px] text-navy/40 dark:text-slate-500 font-bold uppercase tracking-widest">Astuce : Utilisez la molette pour zoomer dans le studio</p>
                </div>
              </div>

              {/* Ghost Hand Animation */}
              <motion.div 
                animate={{ 
                  x: [100, 0, 100], 
                  y: [100, 0, 100],
                  scale: [1, 0.9, 1]
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute bottom-12 right-12 opacity-20 pointer-events-none"
              >
                <div className="w-12 h-12 border-4 border-navy dark:border-white rounded-full" />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
