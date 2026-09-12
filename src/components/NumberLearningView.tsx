import React, { useState, useEffect } from 'react';
import { NUMBERS_DATA } from '../data/learningData';
import { soundEffects, speakIndonesian } from '../utils/audio';
import { Volume2, ChevronLeft, ChevronRight, CheckCircle2, RotateCcw, ArrowRight } from 'lucide-react';
import { MascotBanner } from './MascotBanner';

interface NumberLearningViewProps {
  onEarnStar: () => void;
}

export const NumberLearningView: React.FC<NumberLearningViewProps> = ({ onEarnStar }) => {
  const [selectedNumber, setSelectedNumber] = useState<number>(1);
  const [countedIndices, setCountedIndices] = useState<number[]>([]);
  const [mode, setMode] = useState<'explore' | 'practice' | 'line'>('explore');

  // Practice state
  const [practiceTarget, setPracticeTarget] = useState<{ number: number; emoji: string; name: string }>({
    number: 4,
    emoji: '⭐',
    name: 'Bintang'
  });
  const [practiceFeedback, setPracticeFeedback] = useState<string | null>(null);
  const [practiceAnswered, setPracticeAnswered] = useState<boolean>(false);

  const activeData = NUMBERS_DATA.find((n) => n.number === selectedNumber) || NUMBERS_DATA[0];

  // Reset count state when number changes
  useEffect(() => {
    setCountedIndices([]);
    speakIndonesian(`${activeData.number}. ${activeData.word}`);
  }, [selectedNumber]);

  const handleTouchItem = (index: number) => {
    if (!countedIndices.includes(index)) {
      soundEffects.playPop();
      const nextCounted = [...countedIndices, index];
      setCountedIndices(nextCounted);

      // Speak running count
      speakIndonesian(`${nextCounted.length}`);

      if (nextCounted.length === activeData.number) {
        setTimeout(() => {
          soundEffects.playSuccess();
          speakIndonesian(`Hebat! Ada ${activeData.number} ${activeData.itemName}!`);
          onEarnStar();
        }, 300);
      }
    }
  };

  const handleResetCount = () => {
    soundEffects.playClick();
    setCountedIndices([]);
  };

  const generateNewPractice = () => {
    const emojis = [
      { emoji: '🍎', name: 'Apel' },
      { emoji: '🦆', name: 'Bebek' },
      { emoji: '🎈', name: 'Balon' },
      { emoji: '🍓', name: 'Stroberi' },
      { emoji: '🚗', name: 'Mobil' },
      { emoji: '🐟', name: 'Ikan' },
      { emoji: '⭐', name: 'Bintang' },
      { emoji: '🧁', name: 'Kue' }
    ];
    const randObj = emojis[Math.floor(Math.random() * emojis.length)];
    const randNum = Math.floor(Math.random() * 10) + 1; // 1 to 10 for grade 1 practice
    setPracticeTarget({
      number: randNum,
      emoji: randObj.emoji,
      name: randObj.name
    });
    setPracticeFeedback(null);
    setPracticeAnswered(false);
  };

  const handlePracticeChoice = (choice: number) => {
    if (practiceAnswered) return;
    if (choice === practiceTarget.number) {
      soundEffects.playSuccess();
      setPracticeFeedback(`Hore! Benar sekali! Ada ${practiceTarget.number} ${practiceTarget.name}! 🎉`);
      speakIndonesian(`Hore! Benar sekali! Ada ${practiceTarget.number} ${practiceTarget.name}!`);
      setPracticeAnswered(true);
      onEarnStar();
    } else {
      soundEffects.playGentleOops();
      setPracticeFeedback(`Coba hitung lagi dengan teliti yaa 😊`);
      speakIndonesian(`Coba hitung lagi dengan teliti yaa`);
    }
  };

  return (
    <div className="space-y-4">
      {/* Sub-mode Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 bg-amber-100/80 p-1 rounded-xl">
          <button
            id="mode-explore-btn"
            onClick={() => {
              soundEffects.playClick();
              setMode('explore');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              mode === 'explore'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'text-amber-900 hover:bg-amber-200/60'
            }`}
          >
            🔍 Jelajahi Angka
          </button>
          <button
            id="mode-practice-btn"
            onClick={() => {
              soundEffects.playClick();
              setMode('practice');
              if (!practiceAnswered) generateNewPractice();
            }}
            className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              mode === 'practice'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'text-amber-900 hover:bg-amber-200/60'
            }`}
          >
            🎯 Latihan Hitung Benda
          </button>
          <button
            id="mode-line-btn"
            onClick={() => {
              soundEffects.playClick();
              setMode('line');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              mode === 'line'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'text-amber-900 hover:bg-amber-200/60'
            }`}
          >
            📏 Garis Bilangan
          </button>
        </div>
      </div>

      {mode === 'explore' && (
        <>
          <MascotBanner
            message={`Ayo sentuh benda satu per satu untuk menghitung angka ${activeData.number} (${activeData.word})!`}
            submessage={activeData.rhyme}
          />

          {/* Number Selector Pills (1 - 20) */}
          <div className="bg-white rounded-2xl p-3 border-2 border-amber-200 shadow-xs">
            <div className="text-xs font-bold text-amber-900 mb-2 flex items-center justify-between">
              <span>Pilih Angka (1 - 20):</span>
              <span className="text-amber-600 font-semibold">Sentuh angka untuk belajar</span>
            </div>
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5 sm:gap-2">
              {NUMBERS_DATA.map((item) => {
                const isSelected = item.number === selectedNumber;
                return (
                  <button
                    key={item.number}
                    id={`num-select-${item.number}`}
                    onClick={() => {
                      soundEffects.playClick();
                      setSelectedNumber(item.number);
                    }}
                    className={`h-11 sm:h-12 rounded-xl font-bold text-base sm:text-lg flex flex-col items-center justify-center transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-amber-500 text-white ring-4 ring-amber-300 scale-105 shadow-md font-black'
                        : 'bg-amber-50 text-amber-900 hover:bg-amber-100 border border-amber-200'
                    }`}
                  >
                    <span>{item.number}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Number Showcase Card */}
          <div className="bg-white rounded-3xl p-4 sm:p-6 border-2 border-amber-200 shadow-md">
            {/* Top header with Big Number & Word */}
            <div className="flex items-center justify-between border-b-2 border-amber-100 pb-4 mb-4">
              <button
                id="btn-prev-number"
                disabled={selectedNumber <= 1}
                onClick={() => {
                  soundEffects.playClick();
                  setSelectedNumber((prev) => Math.max(1, prev - 1));
                }}
                className={`flex items-center gap-1 px-3 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                  selectedNumber <= 1
                    ? 'opacity-30 cursor-not-allowed bg-slate-100 text-slate-400'
                    : 'bg-amber-100 hover:bg-amber-200 text-amber-900'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Sebelumnya</span>
              </button>

              <div className="flex items-center gap-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-amber-500 text-white flex items-center justify-center text-4xl sm:text-5xl font-black shadow-inner border-2 border-amber-400">
                  {activeData.number}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl sm:text-3xl font-black text-amber-950 uppercase tracking-wide">
                      {activeData.word}
                    </h2>
                    <button
                      id="btn-speak-number"
                      onClick={() => {
                        soundEffects.playClick();
                        speakIndonesian(`${activeData.number}, ${activeData.word}`);
                      }}
                      className="p-1.5 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-800 transition-transform active:scale-90 cursor-pointer"
                      title="Dengarkan pengucapan"
                    >
                      <Volume2 className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="text-sm font-medium text-amber-700">
                    {activeData.itemName}
                  </p>
                </div>
              </div>

              <button
                id="btn-next-number"
                disabled={selectedNumber >= 20}
                onClick={() => {
                  soundEffects.playClick();
                  setSelectedNumber((prev) => Math.min(20, prev + 1));
                }}
                className={`flex items-center gap-1 px-3 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                  selectedNumber >= 20
                    ? 'opacity-30 cursor-not-allowed bg-slate-100 text-slate-400'
                    : 'bg-amber-100 hover:bg-amber-200 text-amber-900'
                }`}
              >
                <span className="hidden sm:inline">Berikutnya</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Interactive Touch-to-Count Area */}
            <div className="bg-amber-50/70 rounded-2xl p-4 border border-amber-200 mb-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs sm:text-sm font-bold text-amber-900">
                    Sentuh benda untuk menghitung ({countedIndices.length} / {activeData.number}):
                  </span>
                  {countedIndices.length === activeData.number && (
                    <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 text-xs font-black px-2.5 py-0.5 rounded-full border border-emerald-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Selesai Dihitung!
                    </span>
                  )}
                </div>
                <button
                  id="btn-reset-count"
                  onClick={handleResetCount}
                  className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 hover:text-amber-900 bg-white border border-amber-200 px-2.5 py-1 rounded-lg hover:bg-amber-100 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Hitung Ulang</span>
                </button>
              </div>

              {/* Items Grid */}
              <div className="flex flex-wrap gap-2.5 sm:gap-3 justify-center min-h-[110px] items-center p-3 bg-white rounded-xl border border-amber-100">
                {Array.from({ length: activeData.number }).map((_, idx) => {
                  const isCounted = countedIndices.includes(idx);
                  const countOrder = countedIndices.indexOf(idx) + 1;
                  return (
                    <button
                      key={idx}
                      id={`count-item-${idx}`}
                      onClick={() => handleTouchItem(idx)}
                      className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl transition-all select-none cursor-pointer ${
                        isCounted
                          ? 'bg-emerald-100 border-2 border-emerald-400 scale-105 shadow-xs'
                          : 'bg-amber-50 hover:bg-amber-100 border-2 border-dashed border-amber-300 hover:scale-110 active:scale-95'
                      }`}
                    >
                      <span>{activeData.emoji}</span>
                      {isCounted && (
                        <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-black flex items-center justify-center shadow-md">
                          {countOrder}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bingkai Sepuluh (Ten-Frame) & Konsep Puluhan/Satuan */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Ten-frame container */}
              <div className="bg-amber-50/50 rounded-2xl p-4 border border-amber-200">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xs sm:text-sm font-bold text-amber-950 flex items-center gap-1.5">
                    <span>🔲 Bingkai Sepuluh (Ten-Frame)</span>
                  </h3>
                  <span className="text-[11px] text-amber-700 font-semibold">
                    {selectedNumber <= 10 ? '1 Kotak Sepuluh' : '2 Kotak (Puluhan & Satuan)'}
                  </span>
                </div>

                <div className="space-y-2">
                  {/* First 10-frame (1 - 10) */}
                  <div>
                    <div className="grid grid-cols-5 gap-1.5 p-2 bg-white rounded-xl border border-amber-200 max-w-xs mx-auto">
                      {Array.from({ length: 10 }).map((_, i) => {
                        const isFilled = i < Math.min(selectedNumber, 10);
                        return (
                          <div
                            key={i}
                            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center text-lg border transition-colors ${
                              isFilled
                                ? 'bg-amber-500 border-amber-600 text-white font-black'
                                : 'bg-amber-50/40 border-amber-200 text-transparent'
                            }`}
                          >
                            {isFilled ? '●' : ''}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Second 10-frame if number > 10 */}
                  {selectedNumber > 10 && (
                    <div>
                      <div className="text-[11px] font-bold text-amber-800 text-center mb-1">
                        Kotak Kedua (Satuan: {selectedNumber - 10})
                      </div>
                      <div className="grid grid-cols-5 gap-1.5 p-2 bg-white rounded-xl border border-amber-200 max-w-xs mx-auto">
                        {Array.from({ length: 10 }).map((_, i) => {
                          const isFilled = i < selectedNumber - 10;
                          return (
                            <div
                              key={i}
                              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center text-lg border transition-colors ${
                                isFilled
                                  ? 'bg-rose-500 border-rose-600 text-white font-black'
                                  : 'bg-slate-50 border-slate-200 text-transparent'
                              }`}
                            >
                              {isFilled ? '●' : ''}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Konsep Nilai Tempat (Puluhan dan Satuan) */}
              <div className="bg-amber-50/50 rounded-2xl p-4 border border-amber-200 flex flex-col justify-between">
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-amber-950 mb-2">
                    💡 Mengenal Nilai Tempat
                  </h3>
                  {selectedNumber < 10 ? (
                    <div className="bg-white p-3 rounded-xl border border-amber-200 space-y-2">
                      <p className="text-xs sm:text-sm text-slate-700">
                        Angka <strong>{selectedNumber}</strong> terdiri dari <strong>{selectedNumber} satuan</strong>.
                      </p>
                      <div className="flex items-center justify-center gap-2 p-2 bg-amber-50 rounded-lg text-amber-900 font-bold text-sm">
                        <span>0 Puluhan</span>
                        <span>+</span>
                        <span className="text-amber-600">{selectedNumber} Satuan</span>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white p-3 rounded-xl border border-amber-200 space-y-2">
                      <p className="text-xs sm:text-sm text-slate-700">
                        Angka <strong>{selectedNumber}</strong> terdiri dari <strong>1 puluhan</strong> (10) dan <strong>{selectedNumber - 10} satuan</strong>.
                      </p>
                      <div className="flex items-center justify-center gap-2 p-2 bg-amber-50 rounded-lg text-amber-900 font-bold text-sm">
                        <span className="text-amber-700">1 Puluhan (10)</span>
                        <span>+</span>
                        <span className="text-rose-600">{selectedNumber - 10} Satuan</span>
                        <span>=</span>
                        <span className="text-amber-900 font-black">{selectedNumber}</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-3 p-2.5 bg-yellow-100/60 rounded-xl border border-yellow-300 text-xs text-amber-900 font-medium">
                  {activeData.rhyme}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Mode Practice: Tebak Banyak Benda */}
      {mode === 'practice' && (
        <div className="bg-white rounded-3xl p-5 sm:p-7 border-2 border-amber-200 shadow-md">
          <MascotBanner
            message="Hitung benda di bawah ini dengan jarimu, lalu pilih angka yang benar!"
            mascotEmoji="🐰"
            mascotName="Boni si Kelinci"
          />

          <div className="text-center my-4">
            <h3 className="text-base sm:text-lg font-bold text-amber-950 mb-3">
              Berapa banyak {practiceTarget.name} ({practiceTarget.emoji}) di dalam kotak?
            </h3>

            {/* Visual Box with objects */}
            <div className="max-w-md mx-auto min-h-[140px] bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 flex flex-wrap items-center justify-center gap-3 shadow-inner">
              {Array.from({ length: practiceTarget.number }).map((_, i) => (
                <div
                  key={i}
                  className="text-3xl sm:text-4xl hover:scale-125 transition-transform cursor-pointer p-1"
                  onClick={() => soundEffects.playPop()}
                  title="Sentuh untuk menghitung"
                >
                  {practiceTarget.emoji}
                </div>
              ))}
            </div>

            {/* Multiple Choice Options */}
            <div className="mt-6 flex flex-wrap justify-center gap-3 max-w-sm mx-auto">
              {[
                practiceTarget.number,
                practiceTarget.number > 2 ? practiceTarget.number - 1 : practiceTarget.number + 2,
                practiceTarget.number < 9 ? practiceTarget.number + 1 : practiceTarget.number - 2,
                practiceTarget.number < 8 ? practiceTarget.number + 2 : practiceTarget.number - 1
              ]
                .filter((v, i, arr) => arr.indexOf(v) === i)
                .sort((a, b) => a - b)
                .map((val) => (
                  <button
                    key={val}
                    id={`opt-practice-${val}`}
                    onClick={() => handlePracticeChoice(val)}
                    disabled={practiceAnswered}
                    className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl font-black text-xl sm:text-2xl shadow-xs transition-all cursor-pointer ${
                      practiceAnswered && val === practiceTarget.number
                        ? 'bg-emerald-500 text-white scale-110 ring-4 ring-emerald-300'
                        : 'bg-amber-100 hover:bg-amber-200 text-amber-900 border-2 border-amber-300 active:scale-95'
                    }`}
                  >
                    {val}
                  </button>
                ))}
            </div>

            {/* Feedback & Next Question */}
            {practiceFeedback && (
              <div className="mt-5 p-3 rounded-2xl bg-amber-100 text-amber-950 font-bold text-sm sm:text-base border border-amber-300 max-w-md mx-auto">
                {practiceFeedback}
              </div>
            )}

            {practiceAnswered && (
              <div className="mt-4">
                <button
                  id="btn-next-practice"
                  onClick={() => {
                    soundEffects.playClick();
                    generateNewPractice();
                  }}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-base shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  <span>Soal Berikutnya</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mode Garis Bilangan (Number Line) */}
      {mode === 'line' && (
        <div className="bg-white rounded-3xl p-5 sm:p-7 border-2 border-amber-200 shadow-md">
          <MascotBanner
            message="Garis bilangan membantu kita melihat urutan angka dari 1 sampai 20! Geser atau klik angka untuk melompat!"
            mascotEmoji="🐸"
            mascotName="Katak Melompat"
          />

          <div className="my-6">
            <div className="text-center mb-4">
              <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">Posisi Katak Sekarang:</span>
              <div className="text-4xl font-black text-amber-950 mt-1">
                Angka {selectedNumber}
              </div>
              <p className="text-sm font-medium text-amber-700">
                Sebelum {selectedNumber} adalah {selectedNumber > 1 ? selectedNumber - 1 : '-'} • Sesudah {selectedNumber} adalah {selectedNumber < 20 ? selectedNumber + 1 : '-'}
              </p>
            </div>

            {/* Scrollable Number Line */}
            <div className="overflow-x-auto pb-6 pt-8 px-2 scrollbar-thin">
              <div className="relative min-w-[700px] flex items-center justify-between border-b-4 border-amber-400 pb-2">
                {Array.from({ length: 20 }).map((_, i) => {
                  const num = i + 1;
                  const isCurrent = num === selectedNumber;
                  return (
                    <div key={num} className="flex flex-col items-center relative">
                      {isCurrent && (
                        <div className="absolute -top-10 text-3xl animate-bounce">
                          🐸
                        </div>
                      )}
                      <button
                        onClick={() => {
                          soundEffects.playJump();
                          setSelectedNumber(num);
                        }}
                        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full font-bold text-sm sm:text-base flex items-center justify-center transition-all cursor-pointer ${
                          isCurrent
                            ? 'bg-emerald-500 text-white ring-4 ring-emerald-300 scale-125 z-10 shadow-md'
                            : 'bg-white text-slate-700 border-2 border-amber-300 hover:bg-amber-100'
                        }`}
                      >
                        {num}
                      </button>
                      <div className="w-0.5 h-3 bg-amber-400 mt-1"></div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step buttons */}
            <div className="flex justify-center gap-3 mt-4">
              <button
                disabled={selectedNumber <= 1}
                onClick={() => {
                  soundEffects.playJump();
                  setSelectedNumber((p) => Math.max(1, p - 1));
                }}
                className="px-4 py-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-sm disabled:opacity-30 cursor-pointer"
              >
                ⬅️ Lompat Mundur 1 Langkah
              </button>
              <button
                disabled={selectedNumber >= 20}
                onClick={() => {
                  soundEffects.playJump();
                  setSelectedNumber((p) => Math.min(20, p + 1));
                }}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm disabled:opacity-30 cursor-pointer shadow-xs"
              >
                Lompat Maju 1 Langkah ➡️
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
