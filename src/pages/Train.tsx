import React, { useState, useCallback, useEffect, useRef } from 'react';
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
  MarkerType,
  MiniMap,
  Handle,
  Position,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play, Pause, StopCircle, Save, Database, Layers, Cpu,
  Activity, ChevronDown, ChevronRight, X, Plus, Settings,
  Zap, BarChart2, RefreshCw, Check, AlertCircle, Info,
  GitBranch, Terminal, Eye, Maximize2, ArrowLeft, Search,
  TrendingDown, TrendingUp, Clock, CheckCircle, Radio,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// ─── Types ───────────────────────────────────────────────────────────────────

interface TrainingMetric {
  epoch: number;
  loss: number;
  valLoss: number;
  accuracy: number;
  valAccuracy: number;
  lr: number;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const DATASETS = [
  { id: 'ds1', name: 'UrbanSound8K', samples: 8732, classes: 10, duration: '~8.75h', size: '5.6 GB' },
  { id: 'ds2', name: 'ESC-50', samples: 2000, classes: 50, duration: '~2.8h', size: '600 MB' },
  { id: 'ds3', name: 'AudioSet', samples: 2084320, classes: 527, duration: '~5800h', size: '2.1 TB' },
  { id: 'ds4', name: 'FreeSound (Custom)', samples: 1200, classes: 12, duration: '~1.2h', size: '320 MB' },
  { id: 'ds5', name: 'GTZAN Genre', samples: 1000, classes: 10, duration: '~8.3h', size: '1.2 GB' },
];

const EMBEDDINGS = [
  { id: 'mfcc', name: 'MFCC', description: 'Mel-Frequency Cepstral Coefficients — classique, rapide', params: { n_mfcc: 13, n_fft: 2048, hop_length: 512 } },
  { id: 'melspec', name: 'Mel Spectrogram', description: 'Spectrogramme Mel — riche en information temporelle', params: { n_mels: 128, fmax: 8000 } },
  { id: 'vggish', name: 'VGGish', description: 'Embedding pré-entraîné Google — 128 dims', params: { frame_length: 0.96 } },
  { id: 'wav2vec', name: 'Wav2Vec 2.0', description: 'Transformer auto-supervisé — SOTA', params: { model: 'facebook/wav2vec2-base' } },
  { id: 'clap', name: 'CLAP', description: 'Contrastive Language-Audio Pretraining', params: { version: 'laion/clap-htsat-fused' } },
  { id: 'panns', name: 'PANNs', description: 'Pretrained Audio Neural Networks CNN14', params: { sample_rate: 32000 } },
];

const MODELS = [
  { id: 'cnn', name: 'CNN', description: '2D Convolutions sur spectrogramme' },
  { id: 'resnet', name: 'ResNet-18', description: 'Skip connections, robust' },
  { id: 'transformer', name: 'Transformer', description: 'Attention multi-têtes' },
  { id: 'rnn', name: 'LSTM', description: 'Séquences temporelles' },
  { id: 'hybrid', name: 'CNN+RNN', description: 'Hybride convolutif-récurrent' },
];

// ─── Inline Node Components ───────────────────────────────────────────────────

const DatasetNodeInner = ({ data, selected }: any) => {
  const [open, setOpen] = useState(false);
  const [chosen, setChosen] = useState(data.dataset || DATASETS[0]);

  return (
    <div className={`w-72 rounded-2xl border-2 transition-all shadow-xl ${selected ? 'border-blue-500 shadow-blue-500/20' : 'border-slate-700'} bg-slate-900`}>
      <Handle type="source" position={Position.Right} className="!w-3 !h-3 !bg-blue-500 !border-slate-900" />
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-800">
        <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
          <Database size={16} className="text-blue-400" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold text-blue-400 uppercase tracking-widest">Dataset</p>
          <p className="text-sm font-semibold text-white truncate">{chosen.name}</p>
        </div>
        <button onClick={() => setOpen(!open)} className="text-slate-500 hover:text-white transition-colors">
          <ChevronDown size={16} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>
      </div>
      {/* Compact stats */}
      <div className="px-4 py-3 grid grid-cols-3 gap-2">
        <Stat label="Samples" value={chosen.samples.toLocaleString()} />
        <Stat label="Classes" value={chosen.classes} />
        <Stat label="Taille" value={chosen.size} />
      </div>
      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden border-t border-slate-800">
            <div className="p-3 space-y-1">
              {DATASETS.map(ds => (
                <button key={ds.id} onClick={() => { setChosen(ds); setOpen(false); data.onChange?.(ds); }}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all ${chosen.id === ds.id ? 'bg-blue-500/20 text-blue-300' : 'hover:bg-slate-800 text-slate-300'}`}>
                  <Database size={14} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold truncate">{ds.name}</p>
                    <p className="text-xs text-slate-500">{ds.samples.toLocaleString()} samples · {ds.classes} classes</p>
                  </div>
                  {chosen.id === ds.id && <Check size={12} className="text-blue-400 shrink-0" />}
                </button>
              ))}
            </div>
            {/* Split config */}
            <div className="px-4 pb-3 border-t border-slate-800 pt-3">
              <p className="text-xs text-slate-500 font-semibold uppercase tracking-widest mb-2">Split</p>
              <div className="flex gap-2">
                {[['Train', '80%', 'blue'], ['Val', '10%', 'yellow'], ['Test', '10%', 'emerald']].map(([l, v, c]) => (
                  <div key={l} className="flex-1 text-center">
                    <div className={`h-1 rounded-full bg-${c}-500 mb-1`} />
                    <p className="text-xs text-slate-400">{l}</p>
                    <p className={`text-xs font-bold text-${c}-400`}>{v}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const EmbeddingNodeInner = ({ data, selected }: any) => {
  const [open, setOpen] = useState(false);
  const [chosen, setChosen] = useState(data.embedding || EMBEDDINGS[0]);
  const [params, setParams] = useState(chosen.params);

  const choose = (e: typeof EMBEDDINGS[0]) => {
    setChosen(e);
    setParams(e.params);
    setOpen(false);
    data.onChange?.(e);
  };

  return (
    <div className={`w-72 rounded-2xl border-2 transition-all shadow-xl ${selected ? 'border-purple-500 shadow-purple-500/20' : 'border-slate-700'} bg-slate-900`}>
      <Handle type="target" position={Position.Left} className="!w-3 !h-3 !bg-purple-500 !border-slate-900" />
      <Handle type="source" position={Position.Right} className="!w-3 !h-3 !bg-purple-500 !border-slate-900" />
      <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-800">
        <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
          <Layers size={16} className="text-purple-400" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold text-purple-400 uppercase tracking-widest">Embedding</p>
          <p className="text-sm font-semibold text-white truncate">{chosen.name}</p>
        </div>
        <button onClick={() => setOpen(!open)} className="text-slate-500 hover:text-white transition-colors">
          <ChevronDown size={16} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>
      </div>
      <div className="px-4 py-3">
        <p className="text-xs text-slate-400">{chosen.description}</p>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden border-t border-slate-800">
            <div className="p-3 space-y-1">
              {EMBEDDINGS.map(e => (
                <button key={e.id} onClick={() => choose(e)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all ${chosen.id === e.id ? 'bg-purple-500/20 text-purple-300' : 'hover:bg-slate-800 text-slate-300'}`}>
                  <Layers size={14} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold">{e.name}</p>
                    <p className="text-xs text-slate-500 truncate">{e.description}</p>
                  </div>
                  {chosen.id === e.id && <Check size={12} className="text-purple-400 shrink-0" />}
                </button>
              ))}
            </div>
            {/* Params */}
            <div className="px-4 pb-3 border-t border-slate-800 pt-3 space-y-2">
              <p className="text-xs text-slate-500 font-semibold uppercase tracking-widest">Paramètres</p>
              {Object.entries(params).map(([k, v]) => (
                <div key={k} className="flex items-center gap-2">
                  <label className="text-xs text-slate-400 w-28 shrink-0">{k}</label>
                  <input
                    className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-2 py-1 text-xs text-white focus:outline-none focus:border-purple-500"
                    defaultValue={String(v)}
                    onChange={ev => setParams(p => ({ ...p, [k]: ev.target.value }))}
                  />
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ModelNodeInner = ({ data, selected }: any) => {
  const [open, setOpen] = useState(false);
  const [chosen, setChosen] = useState(data.model || MODELS[0]);
  const [lr, setLr] = useState('0.001');
  const [epochs, setEpochs] = useState('50');
  const [batchSize, setBatchSize] = useState('32');
  const [optimizer, setOptimizer] = useState('Adam');
  const [dropout, setDropout] = useState('0.3');
  const [scheduler, setScheduler] = useState('CosineAnnealing');

  return (
    <div className={`w-72 rounded-2xl border-2 transition-all shadow-xl ${selected ? 'border-emerald-500 shadow-emerald-500/20' : 'border-slate-700'} bg-slate-900`}>
      <Handle type="target" position={Position.Left} className="!w-3 !h-3 !bg-emerald-500 !border-slate-900" />
      <Handle type="source" position={Position.Right} className="!w-3 !h-3 !bg-emerald-500 !border-slate-900" />
      <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-800">
        <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
          <Cpu size={16} className="text-emerald-400" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Modèle</p>
          <p className="text-sm font-semibold text-white truncate">{chosen.name}</p>
        </div>
        <button onClick={() => setOpen(!open)} className="text-slate-500 hover:text-white transition-colors">
          <Settings size={16} />
        </button>
      </div>
      {/* Model picker pills */}
      <div className="px-4 py-3 flex flex-wrap gap-1.5">
        {MODELS.map(m => (
          <button key={m.id} onClick={() => setChosen(m)}
            className={`px-2 py-1 rounded-lg text-xs font-semibold transition-all ${chosen.id === m.id ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}>
            {m.name}
          </button>
        ))}
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden border-t border-slate-800">
            <div className="px-4 py-3 space-y-2">
              <p className="text-xs text-slate-500 font-semibold uppercase tracking-widest mb-3">Hyperparamètres</p>
              {[
                ['Learning Rate', lr, setLr],
                ['Epochs', epochs, setEpochs],
                ['Batch Size', batchSize, setBatchSize],
                ['Dropout', dropout, setDropout],
              ].map(([label, val, set]) => (
                <div key={label as string} className="flex items-center gap-2">
                  <label className="text-xs text-slate-400 w-28 shrink-0">{label as string}</label>
                  <input
                    className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-2 py-1 text-xs text-white focus:outline-none focus:border-emerald-500"
                    value={val as string}
                    onChange={e => (set as any)(e.target.value)}
                  />
                </div>
              ))}
              <div className="flex items-center gap-2">
                <label className="text-xs text-slate-400 w-28 shrink-0">Optimizer</label>
                <select
                  className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-2 py-1 text-xs text-white focus:outline-none focus:border-emerald-500"
                  value={optimizer} onChange={e => setOptimizer(e.target.value)}>
                  {['Adam', 'AdamW', 'SGD', 'RMSprop'].map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
              <div className="flex items-center gap-2">
                <label className="text-xs text-slate-400 w-28 shrink-0">Scheduler</label>
                <select
                  className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-2 py-1 text-xs text-white focus:outline-none focus:border-emerald-500"
                  value={scheduler} onChange={e => setScheduler(e.target.value)}>
                  {['CosineAnnealing', 'StepLR', 'ReduceLROnPlateau', 'OneCycleLR'].map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const TrainNodeInner = ({ data, selected }: any) => {
  const [status, setStatus] = useState<'idle' | 'running' | 'paused' | 'done'>('idle');
  const [progress, setProgress] = useState(0);
  const [currentEpoch, setCurrentEpoch] = useState(0);
  const totalEpochs = 50;
  const intervalRef = useRef<any>(null);

  const start = () => {
    setStatus('running');
    data.onTrainingStart?.();
    intervalRef.current = setInterval(() => {
      setCurrentEpoch(e => {
        if (e >= totalEpochs - 1) {
          clearInterval(intervalRef.current);
          setStatus('done');
          data.onTrainingEnd?.();
          return totalEpochs;
        }
        const next = e + 1;
        setProgress(Math.round((next / totalEpochs) * 100));
        data.onEpoch?.(next);
        return next;
      });
    }, 300);
  };

  const pause = () => {
    clearInterval(intervalRef.current);
    setStatus('paused');
  };

  const reset = () => {
    clearInterval(intervalRef.current);
    setStatus('idle');
    setProgress(0);
    setCurrentEpoch(0);
    data.onReset?.();
  };

  useEffect(() => () => clearInterval(intervalRef.current), []);

  const statusColor = { idle: 'slate', running: 'blue', paused: 'yellow', done: 'emerald' }[status];

  return (
    <div className={`w-72 rounded-2xl border-2 transition-all shadow-xl ${selected ? `border-${statusColor}-500 shadow-${statusColor}-500/20` : 'border-slate-700'} bg-slate-900`}>
      <Handle type="target" position={Position.Left} className="!w-3 !h-3 !bg-orange-500 !border-slate-900" />
      <Handle type="source" position={Position.Right} className="!w-3 !h-3 !bg-orange-500 !border-slate-900" />
      <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-800">
        <div className={`w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center`}>
          <Activity size={16} className="text-orange-400" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold text-orange-400 uppercase tracking-widest">Entraînement</p>
          <p className="text-sm font-semibold text-white">
            {status === 'running' ? `Epoch ${currentEpoch}/${totalEpochs}` : status === 'done' ? 'Terminé ✓' : 'En attente'}
          </p>
        </div>
        <div className={`w-2 h-2 rounded-full ${status === 'running' ? 'bg-blue-500 animate-pulse' : status === 'done' ? 'bg-emerald-500' : status === 'paused' ? 'bg-yellow-500' : 'bg-slate-600'}`} />
      </div>
      {/* Progress */}
      <div className="px-4 py-3 space-y-3">
        <div>
          <div className="flex justify-between text-xs text-slate-400 mb-1.5">
            <span>Progression</span>
            <span className="font-mono font-bold text-white">{progress}%</span>
          </div>
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <motion.div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
              animate={{ width: `${progress}%` }} transition={{ duration: 0.3 }} />
          </div>
        </div>
        {/* Controls */}
        <div className="flex gap-2">
          {status === 'idle' || status === 'paused' ? (
            <button onClick={start} className="flex-1 flex items-center justify-center gap-2 py-2 bg-blue-500 hover:bg-blue-600 rounded-xl text-xs font-bold text-white transition-all">
              <Play size={14} /> {status === 'paused' ? 'Reprendre' : 'Lancer'}
            </button>
          ) : status === 'running' ? (
            <button onClick={pause} className="flex-1 flex items-center justify-center gap-2 py-2 bg-yellow-500 hover:bg-yellow-600 rounded-xl text-xs font-bold text-white transition-all">
              <Pause size={14} /> Pause
            </button>
          ) : (
            <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-emerald-500 rounded-xl text-xs font-bold text-white">
              <Check size={14} /> Succès !
            </button>
          )}
          <button onClick={reset} className="px-3 py-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-400 hover:text-white transition-all">
            <RefreshCw size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

const SaveNodeInner = ({ data, selected }: any) => {
  const [format, setFormat] = useState('ONNX');
  const [saved, setSaved] = useState(false);

  const save = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className={`w-64 rounded-2xl border-2 transition-all shadow-xl ${selected ? 'border-rose-500 shadow-rose-500/20' : 'border-slate-700'} bg-slate-900`}>
      <Handle type="target" position={Position.Left} className="!w-3 !h-3 !bg-rose-500 !border-slate-900" />
      <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-800">
        <div className="w-8 h-8 rounded-lg bg-rose-500/20 flex items-center justify-center">
          <Save size={16} className="text-rose-400" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold text-rose-400 uppercase tracking-widest">Export</p>
          <p className="text-sm font-semibold text-white">{format}</p>
        </div>
      </div>
      <div className="px-4 py-3 space-y-3">
        <div className="flex gap-1">
          {['ONNX', 'TorchScript', 'TFLite', 'CoreML'].map(f => (
            <button key={f} onClick={() => setFormat(f)}
              className={`flex-1 py-1 rounded-lg text-[10px] font-bold transition-all ${format === f ? 'bg-rose-500 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}>
              {f}
            </button>
          ))}
        </div>
        <button onClick={save}
          className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all ${saved ? 'bg-emerald-500 text-white' : 'bg-rose-500 hover:bg-rose-600 text-white'}`}>
          {saved ? <><Check size={14} /> Sauvegardé !</> : <><Save size={14} /> Sauvegarder</>}
        </button>
      </div>
    </div>
  );
};

// ─── Helper ───────────────────────────────────────────────────────────────────
const Stat = ({ label, value }: { label: string; value: any }) => (
  <div className="text-center">
    <p className="text-xs font-bold text-white">{value}</p>
    <p className="text-[10px] text-slate-500 uppercase tracking-wide">{label}</p>
  </div>
);

// ─── Node types map ───────────────────────────────────────────────────────────
const nodeTypes = {
  dataset: DatasetNodeInner,
  embedding: EmbeddingNodeInner,
  model: ModelNodeInner,
  train: TrainNodeInner,
  save: SaveNodeInner,
};

// ─── Initial graph ────────────────────────────────────────────────────────────
const mkEdge = (id: string, source: string, target: string): Edge => ({
  id, source, target, animated: true,
  style: { stroke: '#3B82F6', strokeWidth: 2 },
  markerEnd: { type: MarkerType.ArrowClosed, color: '#3B82F6' },
});

const initialNodes: Node[] = [
  { id: 'ds', type: 'dataset', position: { x: 60, y: 200 }, data: {} },
  { id: 'emb', type: 'embedding', position: { x: 420, y: 200 }, data: {} },
  { id: 'mdl', type: 'model', position: { x: 780, y: 200 }, data: {} },
  { id: 'trn', type: 'train', position: { x: 1140, y: 200 }, data: {} },
  { id: 'sv', type: 'save', position: { x: 1500, y: 200 }, data: {} },
];

const initialEdges: Edge[] = [
  mkEdge('e1', 'ds', 'emb'),
  mkEdge('e2', 'emb', 'mdl'),
  mkEdge('e3', 'mdl', 'trn'),
  mkEdge('e4', 'trn', 'sv'),
];

// ─── Metrics panel ────────────────────────────────────────────────────────────
function generateMetric(epoch: number): TrainingMetric {
  const t = epoch / 50;
  return {
    epoch,
    loss: Math.max(0.04, 0.8 * Math.exp(-3 * t) + (Math.random() - 0.5) * 0.02),
    valLoss: Math.max(0.06, 0.85 * Math.exp(-2.5 * t) + (Math.random() - 0.5) * 0.03),
    accuracy: Math.min(0.99, 0.4 + 0.55 * (1 - Math.exp(-4 * t)) + (Math.random() - 0.5) * 0.01),
    valAccuracy: Math.min(0.97, 0.38 + 0.52 * (1 - Math.exp(-3.5 * t)) + (Math.random() - 0.5) * 0.015),
    lr: 0.001 * Math.exp(-0.5 * t),
  };
}

function MetricCard({ label, value, prev, unit = '', color = 'blue', icon }: any) {
  const up = value > prev;
  const neutral = prev === undefined;
  return (
    <div className="bg-slate-800/60 rounded-xl p-3 border border-slate-700/50">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-slate-400 uppercase tracking-wide font-semibold">{label}</span>
        {icon}
      </div>
      <div className="flex items-end gap-2">
        <span className={`text-xl font-black font-mono text-${color}-400`}>
          {typeof value === 'number' ? value.toFixed(4) : value}{unit}
        </span>
        {!neutral && (
          <span className={`text-xs font-bold mb-0.5 ${up ? 'text-emerald-400' : 'text-red-400'}`}>
            {up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          </span>
        )}
      </div>
    </div>
  );
}

function MiniLineChart({ data, dataKey, color }: { data: TrainingMetric[]; dataKey: keyof TrainingMetric; color: string }) {
  if (data.length < 2) return <div className="h-16 flex items-center justify-center text-slate-600 text-xs">En attente...</div>;
  const vals = data.map(d => d[dataKey] as number);
  const min = Math.min(...vals);
  const max = Math.max(...vals);
  const range = max - min || 1;
  const W = 220, H = 56;
  const pts = vals.map((v, i) => {
    const x = (i / (vals.length - 1)) * W;
    const y = H - ((v - min) / range) * H;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg width={W} height={H} className="w-full">
      <polyline fill="none" stroke={color} strokeWidth="2" points={pts} strokeLinejoin="round" strokeLinecap="round" />
      <circle cx={(vals.length - 1) / (vals.length - 1) * W} cy={H - ((vals[vals.length - 1] - min) / range) * H} r="3" fill={color} />
    </svg>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Train() {
  const navigate = useNavigate();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [metrics, setMetrics] = useState<TrainingMetric[]>([]);
  const [isTraining, setIsTraining] = useState(false);
  const [activeTab, setActiveTab] = useState<'metrics' | 'logs' | 'config'>('metrics');
  const [logs, setLogs] = useState<string[]>(['[INFO] Workflow prêt. Cliquez sur "Lancer" dans le nœud Train.']);
  const [panelOpen, setPanelOpen] = useState(true);
  const epochRef = useRef(0);

  const addLog = (msg: string) => setLogs(l => [...l.slice(-100), `[${new Date().toLocaleTimeString()}] ${msg}`]);

  // Wire up train node callbacks
  const wiredNodes = nodes.map(n => {
    if (n.id !== 'trn') return n;
    return {
      ...n,
      data: {
        ...n.data,
        onTrainingStart: () => {
          setIsTraining(true);
          setMetrics([]);
          epochRef.current = 0;
          addLog('[RUN] Démarrage de l\'entraînement...');
          addLog('[INFO] Chargement du dataset...');
          addLog('[INFO] Initialisation du modèle...');
        },
        onEpoch: (epoch: number) => {
          const m = generateMetric(epoch);
          setMetrics(prev => [...prev, m]);
          if (epoch % 5 === 0) addLog(`[EPOCH ${epoch}/50] loss=${m.loss.toFixed(4)} val_loss=${m.valLoss.toFixed(4)} acc=${(m.accuracy * 100).toFixed(1)}% val_acc=${(m.valAccuracy * 100).toFixed(1)}%`);
        },
        onTrainingEnd: () => {
          setIsTraining(false);
          addLog('[DONE] Entraînement terminé ! Modèle prêt pour l\'export.');
        },
        onReset: () => {
          setIsTraining(false);
          setMetrics([]);
          addLog('[RESET] Réinitialisation du workflow.');
        },
      },
    };
  });

  const onConnect = useCallback(
    (params: Connection) => setEdges(eds => addEdge({
      ...params, animated: true,
      style: { stroke: '#3B82F6', strokeWidth: 2 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#3B82F6' },
    }, eds)),
    [setEdges]
  );

  const addNode = (type: string) => {
    const id = `${type}-${Date.now()}`;
    setNodes(ns => [...ns, {
      id, type: type as any,
      position: { x: 300 + Math.random() * 400, y: 100 + Math.random() * 200 },
      data: {},
    }]);
    addLog(`[INFO] Nœud "${type}" ajouté au workflow.`);
  };

  const lastM = metrics[metrics.length - 1];
  const prevM = metrics[metrics.length - 2];

  return (
    <div className="flex flex-col h-screen bg-[#0D1117] text-white overflow-hidden">

      {/* ── Top bar ── */}
      <div className="shrink-0 h-14 bg-slate-900 border-b border-slate-800 flex items-center gap-4 px-4 z-50">
        <button onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all text-xs font-semibold">
          <ArrowLeft size={14} /> Dashboard
        </button>
        <div className="h-5 w-px bg-slate-700" />
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-blue-500/20 flex items-center justify-center">
            <Radio size={14} className="text-blue-400" />
          </div>
          <span className="font-bold text-sm">AudioClass — <span className="text-slate-400 font-normal">Workflow d'Entraînement</span></span>
        </div>

        {/* Status badge */}
        <div className={`ml-2 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${isTraining ? 'border-blue-500/50 bg-blue-500/10 text-blue-400' : metrics.length && !isTraining && metrics.length >= 50 ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400' : 'border-slate-700 bg-slate-800 text-slate-500'}`}>
          <div className={`w-1.5 h-1.5 rounded-full ${isTraining ? 'bg-blue-500 animate-pulse' : metrics.length >= 50 ? 'bg-emerald-500' : 'bg-slate-600'}`} />
          {isTraining ? 'Entraînement en cours' : metrics.length >= 50 ? 'Terminé' : 'Prêt'}
        </div>

        <div className="flex-1" />

        {/* Add node buttons */}
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-slate-500 mr-1">Ajouter :</span>
          {[
            { type: 'dataset', label: 'Dataset', color: 'blue' },
            { type: 'embedding', label: 'Embedding', color: 'purple' },
            { type: 'model', label: 'Modèle', color: 'emerald' },
          ].map(({ type, label, color }) => (
            <button key={type} onClick={() => addNode(type)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-${color}-500/10 border border-${color}-500/20 text-${color}-400 hover:bg-${color}-500/20 transition-all text-xs font-semibold`}>
              <Plus size={12} /> {label}
            </button>
          ))}
        </div>

        <button onClick={() => setPanelOpen(p => !p)}
          className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all">
          <BarChart2 size={16} />
        </button>
      </div>

      {/* ── Main area ── */}
      <div className="flex flex-1 min-h-0">

        {/* ── Canvas ── */}
        <div className="flex-1 min-w-0 relative">
          <ReactFlow
            nodes={wiredNodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            fitView
            fitViewOptions={{ padding: 0.3 }}
            minZoom={0.2}
            maxZoom={2}
            style={{ background: '#0D1117' }}
          >
            <Background color="#1e293b" gap={24} size={1} />
            <Controls className="!bg-slate-900 !border-slate-700 !shadow-xl" />
            <MiniMap
              style={{ background: '#0D1117', border: '1px solid #1e293b' }}
              nodeColor="#3B82F6"
              maskColor="rgba(0,0,0,0.5)"
            />
            {/* Canvas hint */}
            {nodes.length === 0 && (
              <Panel position="top-center">
                <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-8 text-center max-w-sm">
                  <GitBranch size={32} className="text-slate-500 mx-auto mb-3" />
                  <p className="text-slate-300 font-semibold mb-1">Canvas vide</p>
                  <p className="text-slate-500 text-sm">Ajoutez des nœuds depuis la barre du haut</p>
                </div>
              </Panel>
            )}
          </ReactFlow>
        </div>

        {/* ── Right panel ── */}
        <AnimatePresence>
          {panelOpen && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 360, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="shrink-0 border-l border-slate-800 bg-slate-900 flex flex-col overflow-hidden"
              style={{ width: 360 }}
            >
              {/* Panel tabs */}
              <div className="shrink-0 flex border-b border-slate-800">
                {[
                  { key: 'metrics', label: 'Métriques', icon: <Activity size={14} /> },
                  { key: 'logs', label: 'Logs', icon: <Terminal size={14} /> },
                  { key: 'config', label: 'Config', icon: <Settings size={14} /> },
                ].map(({ key, label, icon }) => (
                  <button key={key} onClick={() => setActiveTab(key as any)}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-3 text-xs font-semibold transition-all border-b-2 ${activeTab === key ? 'border-blue-500 text-blue-400' : 'border-transparent text-slate-500 hover:text-slate-300'}`}>
                    {icon} {label}
                  </button>
                ))}
              </div>

              {/* Metrics tab */}
              {activeTab === 'metrics' && (
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {/* KPI grid */}
                  <div className="grid grid-cols-2 gap-2">
                    <MetricCard label="Loss" value={lastM?.loss ?? 0} prev={prevM?.loss}
                      color="red" icon={<TrendingDown size={12} className="text-red-400" />} />
                    <MetricCard label="Val Loss" value={lastM?.valLoss ?? 0} prev={prevM?.valLoss}
                      color="orange" icon={<TrendingDown size={12} className="text-orange-400" />} />
                    <MetricCard label="Accuracy" value={lastM ? (lastM.accuracy * 100).toFixed(2) : '0.00'} prev={prevM?.accuracy}
                      unit="%" color="emerald" icon={<TrendingUp size={12} className="text-emerald-400" />} />
                    <MetricCard label="Val Acc" value={lastM ? (lastM.valAccuracy * 100).toFixed(2) : '0.00'} prev={prevM?.valAccuracy}
                      unit="%" color="blue" icon={<TrendingUp size={12} className="text-blue-400" />} />
                  </div>

                  {/* Epoch info */}
                  {lastM && (
                    <div className="flex items-center gap-3 bg-slate-800/40 rounded-xl p-3 border border-slate-700/50">
                      <Clock size={14} className="text-slate-400 shrink-0" />
                      <div className="flex-1">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-slate-400">Epoch {lastM.epoch} / 50</span>
                          <span className="text-blue-400 font-mono">LR: {lastM.lr.toExponential(2)}</span>
                        </div>
                        <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500 rounded-full transition-all" style={{ width: `${(lastM.epoch / 50) * 100}%` }} />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Charts */}
                  <div className="space-y-3">
                    {[
                      { label: 'Loss', key: 'loss' as const, color: '#F87171' },
                      { label: 'Val Loss', key: 'valLoss' as const, color: '#FB923C' },
                      { label: 'Accuracy', key: 'accuracy' as const, color: '#34D399' },
                      { label: 'Val Accuracy', key: 'valAccuracy' as const, color: '#60A5FA' },
                    ].map(({ label, key, color }) => (
                      <div key={key} className="bg-slate-800/40 rounded-xl p-3 border border-slate-700/50">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-semibold text-slate-300">{label}</span>
                          <span className="text-xs font-mono" style={{ color }}>
                            {lastM ? (key.includes('accuracy') || key.includes('Accuracy') ? (((lastM[key] as number) * 100).toFixed(2) + '%') : (lastM[key] as number).toFixed(4)) : '—'}
                          </span>
                        </div>
                        <MiniLineChart data={metrics} dataKey={key} color={color} />
                      </div>
                    ))}
                  </div>

                  {/* Best model */}
                  {metrics.length > 5 && (
                    <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3 flex items-start gap-2">
                      <CheckCircle size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-bold text-emerald-300">Meilleur modèle</p>
                        <p className="text-xs text-emerald-400/70">
                          Epoch {Math.floor(metrics.length * 0.9)} — val_acc={((Math.max(...metrics.map(m => m.valAccuracy))) * 100).toFixed(2)}%
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Logs tab */}
              {activeTab === 'logs' && (
                <div className="flex-1 overflow-y-auto p-3 font-mono text-xs space-y-0.5 bg-[#0D1117]">
                  {logs.map((log, i) => (
                    <div key={i} className={`py-0.5 ${log.includes('[DONE]') ? 'text-emerald-400' : log.includes('[RUN]') ? 'text-blue-400' : log.includes('[RESET]') ? 'text-yellow-400' : log.includes('[EPOCH') ? 'text-slate-300' : 'text-slate-500'}`}>
                      {log}
                    </div>
                  ))}
                </div>
              )}

              {/* Config tab */}
              {activeTab === 'config' && (
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  <Section title="Pipeline" icon={<GitBranch size={14} className="text-slate-400" />}>
                    <div className="space-y-1">
                      {[
                        { label: 'Nœuds', value: nodes.length },
                        { label: 'Connexions', value: edges.length },
                        { label: 'GPU', value: 'NVIDIA A100' },
                        { label: 'Précision', value: 'float32' },
                      ].map(({ label, value }) => (
                        <div key={label} className="flex justify-between py-1.5 text-xs border-b border-slate-800">
                          <span className="text-slate-500">{label}</span>
                          <span className="text-white font-mono">{value}</span>
                        </div>
                      ))}
                    </div>
                  </Section>
                  <Section title="Early Stopping" icon={<AlertCircle size={14} className="text-slate-400" />}>
                    <ConfigRow label="Patience" defaultValue="10" />
                    <ConfigRow label="Min delta" defaultValue="0.001" />
                    <ConfigRow label="Monitor" select={['val_loss', 'val_accuracy']} />
                  </Section>
                  <Section title="Checkpoints" icon={<Save size={14} className="text-slate-400" />}>
                    <ConfigRow label="Fréquence" select={['Every epoch', 'Best only', 'Every 5 epochs']} />
                    <ConfigRow label="Répertoire" defaultValue="./checkpoints/" />
                  </Section>
                  <Section title="Data Augmentation" icon={<Zap size={14} className="text-slate-400" />}>
                    {[['Noise', true], ['Time Shift', true], ['Pitch Shift', false], ['Speed Change', false]].map(([label, def]) => (
                      <div key={label as string} className="flex items-center justify-between py-1.5 text-xs">
                        <span className="text-slate-400">{label as string}</span>
                        <Toggle defaultOn={def as boolean} />
                      </div>
                    ))}
                  </Section>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─── Small helpers ────────────────────────────────────────────────────────────
function Section({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="bg-slate-800/40 rounded-xl border border-slate-700/50 overflow-hidden">
      <div className="flex items-center gap-2 px-3 py-2 border-b border-slate-700/50">
        {icon}
        <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">{title}</span>
      </div>
      <div className="p-3">{children}</div>
    </div>
  );
}

function ConfigRow({ label, defaultValue, select }: { label: string; defaultValue?: string; select?: string[] }) {
  return (
    <div className="flex items-center gap-2 py-1.5">
      <label className="text-xs text-slate-400 w-24 shrink-0">{label}</label>
      {select ? (
        <select className="flex-1 bg-slate-700 border border-slate-600 rounded-lg px-2 py-1 text-xs text-white focus:outline-none focus:border-blue-500">
          {select.map(s => <option key={s}>{s}</option>)}
        </select>
      ) : (
        <input defaultValue={defaultValue} className="flex-1 bg-slate-700 border border-slate-600 rounded-lg px-2 py-1 text-xs text-white focus:outline-none focus:border-blue-500" />
      )}
    </div>
  );
}

function Toggle({ defaultOn }: { defaultOn: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <button onClick={() => setOn(v => !v)}
      className={`w-9 h-5 rounded-full transition-all relative ${on ? 'bg-blue-500' : 'bg-slate-600'}`}>
      <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all ${on ? 'left-4' : 'left-0.5'}`} />
    </button>
  );
}
