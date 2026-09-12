import React, { useState, useEffect } from 'react';
import { TabType, StickerReward } from './types';
import { INITIAL_STICKERS } from './data/learningData';
import { soundEffects } from './utils/audio';
import { Header } from './components/Header';
import { NumberLearningView } from './components/NumberLearningView';
import { ComparisonView } from './components/ComparisonView';
import { AdditionView } from './components/AdditionView';
import { SubtractionView } from './components/SubtractionView';
import { ShapesPatternsView } from './components/ShapesPatternsView';
import { QuizView } from './components/QuizView';
import { ScratchpadModal } from './components/ScratchpadModal';
import { StickerAlbumModal } from './components/StickerAlbumModal';

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabType>('bilangan');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [totalStars, setTotalStars] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sd1_math_stars');
      return saved ? parseInt(saved, 10) : 3;
    }
    return 3;
  });

  const [stickers, setStickers] = useState<StickerReward[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sd1_math_stickers');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // fallback
        }
      }
    }
    return INITIAL_STICKERS;
  });

  const [isScratchpadOpen, setIsScratchpadOpen] = useState<boolean>(false);
  const [isStickersOpen, setIsStickersOpen] = useState<boolean>(false);

  // Sync sound settings
  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    soundEffects.enabled = next;
  };

  // Earn stars callback
  const handleEarnStar = () => {
    setTotalStars((prev) => {
      const next = prev + 1;
      if (typeof window !== 'undefined') {
        localStorage.setItem('sd1_math_stars', next.toString());
      }
      // Check for unlocking achievements
      setStickers((currStickers) => {
        const updated = currStickers.map((s) => {
          if (s.id === 'stk-2' && next >= 5) return { ...s, unlocked: true };
          if (s.id === 'stk-3' && currentTab === 'tambah') return { ...s, unlocked: true };
          if (s.id === 'stk-4' && currentTab === 'kurang') return { ...s, unlocked: true };
          if (s.id === 'stk-5' && currentTab === 'bentuk') return { ...s, unlocked: true };
          return s;
        });
        if (typeof window !== 'undefined') {
          localStorage.setItem('sd1_math_stickers', JSON.stringify(updated));
        }
        return updated;
      });
      return next;
    });
  };

  const handleUnlockSpecialSticker = () => {
    setStickers((currStickers) => {
      const updated = currStickers.map((s) => {
        if (s.id === 'stk-6') return { ...s, unlocked: true };
        return s;
      });
      if (typeof window !== 'undefined') {
        localStorage.setItem('sd1_math_stickers', JSON.stringify(updated));
      }
      return updated;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/70 via-orange-50/40 to-yellow-50/60 flex flex-col font-sans">
      {/* Header with Navigation and Quick Tools */}
      <Header
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        totalStars={totalStars}
        onOpenStickers={() => setIsStickersOpen(true)}
        onOpenScratchpad={() => setIsScratchpadOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-3 sm:p-5">
        {currentTab === 'bilangan' && (
          <NumberLearningView onEarnStar={handleEarnStar} />
        )}
        {currentTab === 'banding' && (
          <ComparisonView onEarnStar={handleEarnStar} />
        )}
        {currentTab === 'tambah' && (
          <AdditionView onEarnStar={handleEarnStar} />
        )}
        {currentTab === 'kurang' && (
          <SubtractionView onEarnStar={handleEarnStar} />
        )}
        {currentTab === 'bentuk' && (
          <ShapesPatternsView onEarnStar={handleEarnStar} />
        )}
        {currentTab === 'kuis' && (
          <QuizView
            onEarnStar={handleEarnStar}
            onUnlockSpecialSticker={handleUnlockSpecialSticker}
          />
        )}
      </main>

      {/* Child-friendly Footer */}
      <footer className="bg-amber-100/60 border-t border-amber-200 py-4 px-4 text-center text-xs text-amber-900 mt-6">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xl">🎒</span>
            <span className="font-bold">
              Media Pembelajaran Interaktif Matematika SD Kelas 1 • Fase A
            </span>
          </div>
          <p className="text-amber-800 font-medium">
            Belajar Mengenal Angka, Berhitung, Penjumlahan, Pengurangan & Bangun Datar
          </p>
        </div>
      </footer>

      {/* Scratchpad Modal */}
      <ScratchpadModal
        isOpen={isScratchpadOpen}
        onClose={() => setIsScratchpadOpen(false)}
      />

      {/* Sticker Album Modal */}
      <StickerAlbumModal
        isOpen={isStickersOpen}
        onClose={() => setIsStickersOpen(false)}
        stickers={stickers}
        totalStars={totalStars}
      />
    </div>
  );
}
