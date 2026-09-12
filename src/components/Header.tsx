import React from 'react';
import { TabType } from '../types';
import { Volume2, VolumeX, Sparkles, Award, Edit3 } from 'lucide-react';
import { soundEffects } from '../utils/audio';

interface HeaderProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  totalStars: number;
  onOpenStickers: () => void;
  onOpenScratchpad: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  soundEnabled,
  onToggleSound,
  totalStars,
  onOpenStickers,
  onOpenScratchpad
}) => {
  const tabs: { id: TabType; label: string; icon: string; color: string }[] = [
    { id: 'bilangan', label: 'Angka 1-20', icon: '🔢', color: 'hover:bg-amber-100 text-amber-950' },
    { id: 'banding', label: 'Bandingkan', icon: '⚖️', color: 'hover:bg-teal-100 text-teal-950' },
    { id: 'tambah', label: 'Penjumlahan', icon: '➕', color: 'hover:bg-sky-100 text-sky-950' },
    { id: 'kurang', label: 'Pengurangan', icon: '➖', color: 'hover:bg-rose-100 text-rose-950' },
    { id: 'bentuk', label: 'Bentuk & Pola', icon: '🔷', color: 'hover:bg-purple-100 text-purple-950' },
    { id: 'kuis', label: 'Kuis Bintang', icon: '⭐', color: 'hover:bg-yellow-100 text-yellow-950' },
  ];

  return (
    <header className="bg-white/90 backdrop-blur-md border-b-2 border-amber-200 sticky top-0 z-30 shadow-xs">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 py-2.5">
        {/* Top bar: Title & Quick Utilities */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-400 flex items-center justify-center text-2xl shadow-inner border border-amber-300">
              🦊
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-amber-900 leading-none">
                  Matematika SD Kelas 1
                </h1>
                <span className="hidden sm:inline-block px-2 py-0.5 text-xs font-bold bg-amber-100 text-amber-800 rounded-full border border-amber-200">
                  Kurikulum Merdeka
                </span>
              </div>
              <p className="text-xs text-amber-700 font-medium hidden sm:block">
                Belajar berhitung seru, visual, dan menyenangkan!
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Stars counter button */}
            <button
              id="btn-sticker-album"
              onClick={() => {
                soundEffects.playClick();
                onOpenStickers();
              }}
              className="flex items-center gap-1.5 bg-amber-50 hover:bg-amber-100 border border-amber-300 px-3 py-1.5 rounded-full text-amber-900 font-bold text-sm shadow-xs transition-transform active:scale-95 cursor-pointer"
              title="Koleksi Stiker & Bintang"
            >
              <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400" />
              <span>{totalStars}</span>
              <Award className="w-4 h-4 text-amber-600 hidden sm:inline" />
            </button>

            {/* Papan Coret button */}
            <button
              id="btn-scratchpad"
              onClick={() => {
                soundEffects.playClick();
                onOpenScratchpad();
              }}
              className="flex items-center gap-1 bg-sky-50 hover:bg-sky-100 border border-sky-300 px-2.5 sm:px-3 py-1.5 rounded-full text-sky-800 font-bold text-xs sm:text-sm shadow-xs transition-transform active:scale-95 cursor-pointer"
              title="Buka Papan Coret untuk Bantuan Berhitung"
            >
              <Edit3 className="w-4 h-4 text-sky-600" />
              <span className="hidden xs:inline">Papan Hitung</span>
            </button>

            {/* Audio Toggle */}
            <button
              id="btn-toggle-sound"
              onClick={() => {
                soundEffects.playClick();
                onToggleSound();
              }}
              className={`p-2 rounded-full border transition-all cursor-pointer ${
                soundEnabled
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-700 hover:bg-emerald-100'
                  : 'bg-slate-100 border-slate-300 text-slate-400 hover:bg-slate-200'
              }`}
              title={soundEnabled ? 'Suara Aktif (Klik untuk Matikan)' : 'Suara Bisu (Klik untuk Hidupkan)'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Navigation Tabs (Scrollable on small mobile) */}
        <nav className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 scrollbar-none">
          {tabs.map((tab) => {
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`tab-${tab.id}`}
                onClick={() => {
                  soundEffects.playClick();
                  onSelectTab(tab.id);
                }}
                className={`whitespace-nowrap px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-amber-500 text-white shadow-md scale-105 ring-2 ring-amber-400 ring-offset-1'
                    : 'bg-amber-100/70 hover:bg-amber-200/80 text-amber-900'
                }`}
              >
                <span className="text-base sm:text-lg">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
