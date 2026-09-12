import React from 'react';
import { StickerReward } from '../types';
import { soundEffects } from '../utils/audio';
import { X, Sparkles, Award } from 'lucide-react';

interface StickerAlbumModalProps {
  isOpen: boolean;
  onClose: () => void;
  stickers: StickerReward[];
  totalStars: number;
}

export const StickerAlbumModal: React.FC<StickerAlbumModalProps> = ({
  isOpen,
  onClose,
  stickers,
  totalStars
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl border-2 border-amber-300 shadow-2xl w-full max-w-lg overflow-hidden animate-soft-bounce">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-400 to-orange-400 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-6 h-6" />
            <div>
              <h3 className="text-lg font-black leading-tight">Album Stiker & Prestasi</h3>
              <p className="text-xs text-amber-100 font-bold">Koleksi pencapaian belajarmu!</p>
            </div>
          </div>
          <button
            onClick={() => {
              soundEffects.playClick();
              onClose();
            }}
            className="p-1 rounded-full hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stars summary */}
        <div className="p-4 bg-amber-50 border-b border-amber-200 flex items-center justify-around text-center">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-amber-500 fill-amber-400" />
            <div className="text-left">
              <span className="text-xs font-bold text-amber-800 uppercase block">Total Bintang:</span>
              <span className="text-2xl font-black text-amber-950">{totalStars} Bintang</span>
            </div>
          </div>
          <div className="text-left">
            <span className="text-xs font-bold text-amber-800 uppercase block">Stiker Terbuka:</span>
            <span className="text-2xl font-black text-amber-950">
              {stickers.filter((s) => s.unlocked).length} / {stickers.length}
            </span>
          </div>
        </div>

        {/* Stickers Grid */}
        <div className="p-4 sm:p-6 grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[60vh] overflow-y-auto">
          {stickers.map((stk) => (
            <div
              key={stk.id}
              className={`p-3 rounded-2xl border-2 text-center transition-all ${
                stk.unlocked
                  ? 'bg-amber-50/80 border-amber-300 shadow-xs hover:scale-105'
                  : 'bg-slate-100 border-slate-200 opacity-40 grayscale'
              }`}
            >
              <div className="text-4xl mb-1.5">{stk.unlocked ? stk.emoji : '🔒'}</div>
              <div className="font-black text-xs sm:text-sm text-slate-800 leading-tight mb-1">
                {stk.name}
              </div>
              <p className="text-[10px] text-slate-600 leading-tight">
                {stk.unlocked ? stk.desc : 'Selesaikan latihan untuk membuka'}
              </p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-3 bg-amber-50/50 border-t border-amber-200 text-center">
          <button
            onClick={() => {
              soundEffects.playClick();
              onClose();
            }}
            className="px-6 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-black text-sm shadow-xs transition-colors cursor-pointer"
          >
            Tutup Album
          </button>
        </div>
      </div>
    </div>
  );
};
