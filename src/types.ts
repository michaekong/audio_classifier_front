export type UserRole = 'engineer' | 'predictor';

export interface ModelPortfolio {
  id: string;
  name: string;
  description: string;
  accuracy: number;
  f1Score: number;
  price: number;
  tags: string[];
  rating: number;
  reviews: number;
  author: string;
  category: 'medical' | 'industrial' | 'music' | 'agriculture' | 'general';
}

export interface PredictionResult {
  label: string;
  probability: number;
  explanation?: string;
}

export interface TrainingStep {
  id: number;
  title: string;
  status: 'pending' | 'active' | 'completed';
}
