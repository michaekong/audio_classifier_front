import React, { useState, useCallback, useMemo } from 'react';
import { 
  ReactFlow, 
  addEdge, 
  Background, 
  Controls, 
  Connection, 
  Edge, 
  Node, 
  useNodesState, 
  useEdgesState,
  Panel,
  MarkerType
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Play, Pause, RotateCcw, Save, Music, Zap, Activity, Radio, Info, ChevronRight, HelpCircle, ArrowLeft } from 'lucide-react';

import { DatasetNode } from './nodes/DatasetNode';
import { EncodingNode } from './nodes/EncodingNode';
import { AugmentNode } from './nodes/AugmentNode';
import { ModelNode } from './nodes/ModelNode';
import { TrainNode } from './nodes/TrainNode';
import { SaveNode } from './nodes/SaveNode';

const nodeTypes = {
  dataset: DatasetNode,
  encoding: EncodingNode,
  augment: AugmentNode,
  model: ModelNode,
  train: TrainNode,
  save: SaveNode,
};

const initialNodes: Node[] = [
  { 
    id: 'dataset-1', 
    type: 'dataset', 
    position: { x: 100, y: 200 }, 
    data: { label: '245 sons' } 
  },
  { 
    id: 'encoding-1', 
    type: 'encoding', 
    position: { x: 400, y: 100 }, 
    data: { label: 'MFCC', initialGain: 60 } 
  },
  { 
    id: 'augment-1', 
    type: 'augment', 
    position: { x: 700, y: 200 }, 
    data: { label: 'Noise Pedal' } 
  },
  { 
    id: 'model-1', 
    type: 'model', 
    position: { x: 1000, y: 200 }, 
    data: { label: 'CNN Architecture' } 
  },
  { 
    id: 'train-1', 
    type: 'train', 
    position: { x: 1400, y: 150 }, 
    data: { label: 'Tape Recorder' } 
  },
  { 
    id: 'save-1', 
    type: 'save', 
    position: { x: 1800, y: 250 }, 
    data: { label: 'Publish Hit' } 
  },
];

const initialEdges: Edge[] = [
  { 
    id: 'e1-2', 
    source: 'dataset-1', 
    target: 'encoding-1', 
    animated: true, 
    style: { stroke: '#00FFFF', strokeWidth: 4 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#00FFFF' }
  },
  { 
    id: 'e2-3', 
    source: 'encoding-1', 
    target: 'augment-1', 
    animated: true, 
    style: { stroke: '#00FFFF', strokeWidth: 4 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#00FFFF' }
  },
  { 
    id: 'e3-4', 
    source: 'augment-1', 
    target: 'model-1', 
    animated: true, 
    style: { stroke: '#00FFFF', strokeWidth: 4 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#00FFFF' }
  },
  { 
    id: 'e4-5', 
    source: 'model-1', 
    target: 'train-1', 
    animated: true, 
    style: { stroke: '#00FFFF', strokeWidth: 4 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#00FFFF' }
  },
  { 
    id: 'e5-6', 
    source: 'train-1', 
    target: 'save-1', 
    animated: true, 
    style: { stroke: '#00FFFF', strokeWidth: 4 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#00FFFF' }
  },
];

export default function StudioAudioForge() {
  const navigate = useNavigate();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [isTilted, setIsTilted] = useState(true);
  const [showTutorial, setShowTutorial] = useState(true);
  const [showTemplates, setShowTemplates] = useState(false);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge({ 
      ...params, 
      animated: true, 
      style: { stroke: '#3B82F6', strokeWidth: 4 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#3B82F6' }
    }, eds)),
    [setEdges]
  );

  return (
    <div className="w-full h-screen bg-navy overflow-hidden relative">
      {/* Studio Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#1E3A8A_0%,#0f172a_100%)]" />
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '100px 100px' }} />

      {/* Header / Tempo Bar */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-navy/80 backdrop-blur-xl border-b border-white/10 z-50 flex items-center justify-between px-8">
        <div className="flex items-center gap-6">
          <button 
            onClick={() => navigate('/dashboard')}
            className="p-2 rounded-lg bg-white/10 text-white/60 hover:text-white transition-all flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            <span className="text-[10px] font-black uppercase tracking-widest">Quitter</span>
          </button>
          <div className="h-8 w-px bg-white/10" />
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-electric flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.3)]">
              <Radio size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-white font-black text-lg tracking-tight uppercase italic">Studio AudioForge</h1>
              <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest">Workflow Immersif ML</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-8">
           <div className="flex flex-col items-end">
              <span className="text-[8px] font-black text-white/50 uppercase tracking-widest">Tempo Dataset</span>
              <div className="flex items-center gap-2">
                 <span className="text-xl font-black text-electric tracking-tighter italic">120 BPM</span>
                 <div className="w-2 h-2 rounded-full bg-electric animate-pulse" />
              </div>
           </div>
           
           <div className="h-8 w-px bg-white/10" />

           <div className="flex items-center gap-2">
              <button 
                onClick={() => setIsTilted(!isTilted)}
                className={`p-2 rounded-lg transition-all ${isTilted ? 'bg-electric text-white' : 'bg-white/10 text-white/60'}`}
              >
                <RotateCcw size={16} className={isTilted ? 'rotate-45' : ''} />
              </button>
              <button 
                onClick={() => setShowTemplates(!showTemplates)}
                className={`p-2 rounded-lg transition-all ${showTemplates ? 'bg-electric text-white' : 'bg-white/10 text-white/60'}`}
              >
                <Zap size={16} />
              </button>
              <button 
                onClick={() => setShowTutorial(true)}
                className="p-2 rounded-lg bg-white/10 text-white/60 hover:text-white transition-all"
              >
                <HelpCircle size={16} />
              </button>
           </div>
        </div>
      </div>

      {/* Templates Panel */}
      <AnimatePresence>
        {showTemplates && (
          <motion.div 
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            className="absolute top-24 left-8 w-64 bg-navy/90 backdrop-blur-xl border border-white/10 p-6 rounded-[2rem] z-40 shadow-2xl"
          >
            <h2 className="text-white font-black text-xs uppercase tracking-widest mb-4">Templates Prêts</h2>
            <div className="space-y-3">
               {['Makossa Starter', 'Urban Beat', 'Medical Scan'].map(t => (
                 <button 
                   key={t}
                   className="w-full p-4 bg-white/5 rounded-2xl border border-white/5 text-left hover:bg-white/10 transition-all group"
                 >
                    <p className="text-[10px] font-black text-electric uppercase tracking-widest mb-1 group-hover:translate-x-1 transition-transform">{t}</p>
                    <p className="text-[8px] font-bold text-white/40 uppercase tracking-tighter">Blocks pré-connectés</p>
                 </button>
               ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Canvas */}
      <div 
        className={`w-full h-full transition-all duration-1000 ease-in-out ${isTilted ? 'perspective-3d' : ''}`}
        style={{ 
          transform: isTilted ? 'rotateX(20deg) rotateY(-5deg) scale(0.95)' : 'none',
          transformStyle: 'preserve-3d'
        }}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          className="bg-transparent"
          minZoom={0.2}
          maxZoom={2}
        >
          <Background color="#3B82F6" gap={50} size={1} />
          <Controls className="bg-navy border-white/10 !shadow-2xl" />
          
          <Panel position="bottom-right" className="bg-navy/80 backdrop-blur-xl border border-white/10 p-4 rounded-2xl m-8 shadow-2xl">
             <div className="flex items-center gap-4">
                <div className="flex flex-col">
                   <span className="text-[8px] font-black text-white/40 uppercase tracking-widest">Global Loss</span>
                   <span className="text-lg font-black text-alert italic">0.23 ↓</span>
                </div>
                <div className="w-px h-8 bg-white/10" />
                <div className="flex flex-col">
                   <span className="text-[8px] font-black text-white/40 uppercase tracking-widest">Global Acc</span>
                   <span className="text-lg font-black text-success italic">92% ↑</span>
                </div>
             </div>
          </Panel>
        </ReactFlow>
      </div>

      {/* Tutorial Overlay */}
      <AnimatePresence>
        {showTutorial && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-[100] bg-navy/80 backdrop-blur-xl flex items-center justify-center p-8"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              className="max-w-lg bg-cream dark:bg-slate-900 border-2 border-electric/30 rounded-[4rem] p-16 shadow-[0_0_100px_rgba(59,130,246,0.3)] text-center relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-3 bg-electric" />
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-electric/10 rounded-full blur-3xl" />
              
              <div className="w-24 h-24 rounded-[2rem] bg-electric/10 border-2 border-electric/20 flex items-center justify-center mx-auto mb-10 shadow-inner">
                 <Zap size={48} className="text-electric" />
              </div>

              <h2 className="text-4xl font-black text-navy dark:text-white tracking-tighter uppercase italic mb-6">Bienvenue au Studio</h2>
              <p className="text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-10">
                Connectez vos pistes audio, réglez vos faders d'encodage et lancez l'enregistrement de votre modèle ML.
              </p>

              <div className="space-y-5 mb-12">
                 <div className="flex items-center gap-5 text-left p-6 bg-navy/5 rounded-[2rem] border border-navy/5 shadow-sm">
                    <div className="w-10 h-10 rounded-xl bg-electric/20 flex items-center justify-center shrink-0">
                       <ChevronRight size={20} className="text-electric" />
                    </div>
                    <p className="text-xs font-black text-navy dark:text-white uppercase tracking-[0.2em]">Glissez le Dataset pour commencer</p>
                 </div>
                 <div className="flex items-center gap-5 text-left p-6 bg-navy/5 rounded-[2rem] border border-navy/5 shadow-sm">
                    <div className="w-10 h-10 rounded-xl bg-electric/20 flex items-center justify-center shrink-0">
                       <ChevronRight size={20} className="text-electric" />
                    </div>
                    <p className="text-xs font-black text-navy dark:text-white uppercase tracking-[0.2em]">Connectez les câbles XLR (Edges)</p>
                 </div>
              </div>

              <button 
                onClick={() => setShowTutorial(false)}
                className="w-full btn-primary py-5 rounded-[2rem] font-black uppercase tracking-[0.3em] text-sm shadow-2xl shadow-electric/30 hover:scale-[1.02] transition-transform"
              >
                C'est parti !
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .perspective-3d {
          perspective: 2000px;
        }
        .react-flow__handle {
          width: 12px;
          height: 12px;
          border-radius: 4px;
        }
        .react-flow__edge-path {
          stroke-dasharray: 10;
          animation: dash 1s linear infinite;
        }
        @keyframes dash {
          from {
            stroke-dashoffset: 20;
          }
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </div>
  );
}
