export type TabType = 
  | 'bilangan' 
  | 'banding' 
  | 'tambah' 
  | 'kurang' 
  | 'bentuk' 
  | 'kuis';

export interface StickerReward {
  id: string;
  name: string;
  emoji: string;
  desc: string;
  unlocked: boolean;
}

export interface QuizQuestion {
  id: string;
  type: 'count' | 'addition' | 'subtraction' | 'compare' | 'shape' | 'pattern';
  question: string;
  visualType?: 'emojis' | 'balloons' | 'number-bond' | 'shapes';
  visualData?: {
    leftItems?: string[];
    rightItems?: string[];
    operator?: string;
    items?: string[];
    burstCount?: number;
    shapes?: { type: string; color: string }[];
  };
  options: {
    label: string;
    value: string | number;
    icon?: string;
  }[];
  correctAnswer: string | number;
  explanation: string;
}

export interface ShapeItem {
  id: string;
  name: string;
  sides: number;
  corners: number;
  color: string;
  description: string;
  examples: { name: string; emoji: string }[];
}
