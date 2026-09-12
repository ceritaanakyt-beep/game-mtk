import React, { useState } from 'react';
import { soundEffects, speakIndonesian } from '../utils/audio';
import { RotateCcw, ArrowRight } from 'lucide-react';
import { MascotBanner } from './MascotBanner';

interface SubtractionViewProps {
  onEarnStar: () => void;
}

export const SubtractionView: React.FC<SubtractionViewProps> = ({ onEarnStar }) => {
  const [subMode, setSubMode] = useState<'balloon' | 'frog' | 'practice'>('balloon');

  // Balloon mode state
  const [totalBalloons, setTotalBalloons] = useState<number>(7);
  const [toSubtract, setToSubtract] = useState<number>(3);
  const [poppedIndices, setPoppedIndices] = useState<number[]>([]);

  // Frog backward jump state
  const [frogStart, setFrogStart] = useState<number>(9);
  const [frogBackSteps, setFrogBackSteps] = useState<number>(4);
  const [currentFrogPos, setCurrentFrogPos] = useState<number>(9);
  const [isJumping, setIsJumping] = useState<boolean>(false);

  // Practice state
  const [subQuizTotal, setSubQuizTotal] = useState<number>(6);
  const [subQuizMinus, setSubQuizMinus] = useState<number>(2);
  const [quizAnswered, setQuizAnswered] = useState<boolean>(false);
  const [quizFeedback, setQuizFeedback] = useState<string | null>(null);

  const colors = [
    'text-rose-500', 'text-sky-500', 'text-amber-500', 
    'text-emerald-500', 'text-purple-500', 'text-pink-500', 
    'text-blue-500', 'text-teal-500', 'text-orange-500'
  ];

  const handlePopBalloon = (idx: number) => {
    if (poppedIndices.includes(idx)) return;
    if (poppedIndices.length >= toSubtract) return; // already popped enough

    soundEffects.playPop();
    const nextPopped = [...poppedIndices, idx];
    setPoppedIndices(nextPopped);

    speakIndonesian(`Dor! ${nextPopped.length} balon meletus`);

    if (nextPopped.length === toSubtract) {
      setTimeout(() => {
        soundEffects.playSuccess();
        const remaining = totalBalloons - toSubtract;
        speakIndonesian(`Luar biasa! Dari ${totalBalloons} balon, ${toSubtract} meletus, sekarang sisa ${remaining} balon!`);
        onEarnStar();
      }, 400);
    }
  };

  const handleResetBalloons = () => {
    soundEffects.playClick();
    setPoppedIndices([]);
  };

  const handleFrogBack = () => {
    if (isJumping) return;
    setIsJumping(true);
    setCurrentFrogPos(frogStart);

    let current = frogStart;
    const target = frogStart - frogBackSteps;

    const interval = setInterval(() => {
      if (current > target) {
        current -= 1;
        setCurrentFrogPos(current);
        soundEffects.playJump();
        speakIndonesian(`${current}`);
      } else {
        clearInterval(interval);
        setIsJumping(false);
        soundEffects.playSuccess();
        speakIndonesian(`Hore! Katak melompat mundur dan mendarat di angka ${target}! ${frogStart} dikurang ${frogBackSteps} sama dengan ${target}`);
        onEarnStar();
      }
    }, 600);
  };

  const generatePractice = () => {
    const tot = Math.floor(Math.random() * 6) + 4; // 4 to 9
    const min = Math.floor(Math.random() * (tot - 1)) + 1; // 1 to tot - 1
    setSubQuizTotal(tot);
    setSubQuizMinus(min);
    setQuizAnswered(false);
    setQuizFeedback(null);
  };

  const handlePracticeChoice = (choice: number) => {
    if (quizAnswered) return;
    const diff = subQuizTotal - subQuizMinus;
    if (choice === diff) {
      soundEffects.playSuccess();
      setQuizFeedback(`Hebat sekali! ${subQuizTotal} - ${subQuizMinus} = ${diff}! 🎈`);
      speakIndonesian(`Hebat sekali! ${subQuizTotal} dikurang ${subQuizMinus} sama dengan ${diff}`);
      setQuizAnswered(true);
      onEarnStar();
    } else {
      soundEffects.playGentleOops();
      setQuizFeedback('Coba hitung lagi sisa bendanya yaa 😊');
      speakIndonesian('Coba hitung lagi sisa bendanya yaa');
    }
  };

  return (
    <div className="space-y-4">
      {/* Submode buttons */}
      <div className="flex flex-wrap items-center gap-1.5 bg-rose-100/80 p-1 rounded-xl w-fit">
        <button
          onClick={() => {
            soundEffects.playClick();
            setSubMode('balloon');
            setPoppedIndices([]);
          }}
          className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            subMode === 'balloon' ? 'bg-rose-600 text-white shadow-xs' : 'text-rose-950 hover:bg-rose-200/60'
          }`}
        >
          🎈 Letuskan Balon
        </button>
        <button
          onClick={() => {
            soundEffects.playClick();
            setSubMode('frog');
            setCurrentFrogPos(frogStart);
          }}
          className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            subMode === 'frog' ? 'bg-rose-600 text-white shadow-xs' : 'text-rose-950 hover:bg-rose-200/60'
          }`}
        >
          🐸 Katak Melompat Mundur
        </button>
        <button
          onClick={() => {
            soundEffects.playClick();
            setSubMode('practice');
            if (!quizAnswered) generatePractice();
          }}
          className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            subMode === 'practice' ? 'bg-rose-600 text-white shadow-xs' : 'text-rose-950 hover:bg-rose-200/60'
          }`}
        >
          🎯 Latihan Pengurangan
        </button>
      </div>

      {/* 1. Balloon Pop Subtraction Mode */}
      {subMode === 'balloon' && (
        <div className="bg-white rounded-3xl p-5 sm:p-7 border-2 border-rose-200 shadow-md">
          <MascotBanner
            message={`Ada ${totalBalloons} balon. Sentuh dan letuskan ${toSubtract} balon! Lalu hitung sisa balon yang masih ada!`}
            mascotEmoji="🎈"
            mascotName="Kiki si Kancil"
          />

          {/* Equation Header */}
          <div className="flex items-center justify-center gap-3 my-4">
            <span className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-900 border-2 border-rose-300 font-black text-2xl flex items-center justify-center">
              {totalBalloons}
            </span>
            <span className="text-3xl font-black text-rose-600">-</span>
            <span className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-900 border-2 border-amber-300 font-black text-2xl flex items-center justify-center">
              {toSubtract}
            </span>
            <span className="text-3xl font-black text-rose-600">=</span>
            <span className={`w-12 h-12 rounded-2xl font-black text-2xl flex items-center justify-center transition-all ${
              poppedIndices.length === toSubtract
                ? 'bg-emerald-500 text-white border-2 border-emerald-600 scale-110 shadow-md'
                : 'bg-slate-100 text-slate-400 border-2 border-dashed border-slate-300'
            }`}>
              {poppedIndices.length === toSubtract ? totalBalloons - toSubtract : '?'}
            </span>
          </div>

          <div className="text-center text-xs font-bold text-rose-800 mb-2">
            Balon yang sudah diletuskan: {poppedIndices.length} dari {toSubtract}
          </div>

          {/* Interactive Balloons Arena */}
          <div className="relative min-h-[170px] bg-gradient-to-b from-sky-50 to-rose-50/40 border-2 border-rose-200 rounded-2xl p-4 flex flex-wrap items-center justify-center gap-4 max-w-xl mx-auto shadow-inner">
            {Array.from({ length: totalBalloons }).map((_, idx) => {
              const isPopped = poppedIndices.includes(idx);
              const color = colors[idx % colors.length];
              return (
                <button
                  key={idx}
                  id={`balloon-${idx}`}
                  disabled={isPopped}
                  onClick={() => handlePopBalloon(idx)}
                  className={`relative p-2 rounded-2xl transition-all select-none cursor-pointer ${
                    isPopped
                      ? 'scale-75 opacity-40 grayscale rotate-45 cursor-not-allowed'
                      : 'hover:scale-125 active:scale-95 animate-soft-bounce'
                  }`}
                  title={isPopped ? 'Balon sudah meletus' : 'Klik untuk meletuskan balon!'}
                >
                  <span className={`text-4xl sm:text-5xl ${color}`}>
                    {isPopped ? '💥' : '🎈'}
                  </span>
                  {isPopped && (
                    <span className="absolute inset-0 flex items-center justify-center font-black text-rose-700 text-2xl">
                      ✕
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Outcome banner */}
          {poppedIndices.length === toSubtract && (
            <div className="mt-4 p-3 bg-emerald-50 border-2 border-emerald-300 rounded-2xl text-center max-w-md mx-auto animate-soft-bounce">
              <span className="text-emerald-950 font-black text-base sm:text-lg">
                Hore! {totalBalloons} - {toSubtract} = {totalBalloons - toSubtract}!
              </span>
              <p className="text-xs text-emerald-800 font-semibold mt-0.5">
                Ada {totalBalloons - toSubtract} balon yang masih terbang!
              </p>
            </div>
          )}

          {/* Controls to reset and adjust */}
          <div className="flex justify-center items-center gap-3 mt-4">
            <button
              onClick={handleResetBalloons}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Tiup Ulang Balon</span>
            </button>
            <button
              onClick={() => {
                soundEffects.playClick();
                const newTotal = Math.floor(Math.random() * 4) + 6; // 6 to 9
                const newMinus = Math.floor(Math.random() * 3) + 2; // 2 to 4
                setTotalBalloons(newTotal);
                setToSubtract(newMinus);
                setPoppedIndices([]);
              }}
              className="px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs sm:text-sm shadow-xs cursor-pointer"
            >
              Ganti Soal Balon Baru 🎲
            </button>
          </div>
        </div>
      )}

      {/* 2. Frog Jump Backward Mode */}
      {subMode === 'frog' && (
        <div className="bg-white rounded-3xl p-5 sm:p-7 border-2 border-rose-200 shadow-md">
          <MascotBanner
            message="Pengurangan sama seperti katak melompat mundur! Mulai dari angka besar lalu bergerak ke arah kiri."
            mascotEmoji="🐸"
            mascotName="Katak Melompat Mundur"
          />

          <div className="text-center my-4">
            <div className="inline-block bg-rose-50 border-2 border-rose-300 px-4 py-2 rounded-2xl text-lg font-black text-rose-950">
              {frogStart} - {frogBackSteps} = {frogStart - frogBackSteps}
            </div>
            <p className="text-xs sm:text-sm text-rose-800 font-medium mt-1">
              Katak di posisi <strong>{frogStart}</strong> melompat mundur <strong>{frogBackSteps} langkah</strong>!
            </p>
          </div>

          {/* Number line */}
          <div className="overflow-x-auto pb-6 pt-10 px-2 scrollbar-thin my-4">
            <div className="relative min-w-[700px] flex items-center justify-between border-b-4 border-rose-400 pb-2">
              {Array.from({ length: 12 }).map((_, i) => {
                const num = i + 1;
                const isFrogHere = num === currentFrogPos;
                const isStart = num === frogStart;
                const isTarget = num === frogStart - frogBackSteps;
                return (
                  <div key={num} className="flex flex-col items-center relative">
                    {isFrogHere && (
                      <div className="absolute -top-10 text-3xl animate-bounce">
                        🐸
                      </div>
                    )}
                    <div
                      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full font-bold text-sm sm:text-base flex items-center justify-center transition-all ${
                        isFrogHere
                          ? 'bg-rose-500 text-white ring-4 ring-rose-300 scale-125 z-10 shadow-md'
                          : isTarget
                          ? 'bg-emerald-100 border-2 border-dashed border-emerald-400 text-emerald-900 font-black'
                          : isStart
                          ? 'bg-rose-100 border-2 border-rose-400 text-rose-900 font-black'
                          : 'bg-white text-slate-700 border-2 border-rose-200'
                      }`}
                    >
                      {num}
                    </div>
                    <div className="w-0.5 h-3 bg-rose-400 mt-1"></div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action */}
          <div className="flex justify-center gap-3 mt-4">
            <button
              disabled={isJumping}
              onClick={handleFrogBack}
              className="px-6 py-2.5 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-black text-base shadow-md hover:scale-105 active:scale-95 transition-all disabled:opacity-50 cursor-pointer"
            >
              ⬅️ Melompat Mundur Sekarang!
            </button>
            <button
              disabled={isJumping}
              onClick={() => {
                soundEffects.playClick();
                setCurrentFrogPos(frogStart);
              }}
              className="px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Ulang</span>
            </button>
          </div>
        </div>
      )}

      {/* 3. Practice Mode */}
      {subMode === 'practice' && (
        <div className="bg-white rounded-3xl p-5 sm:p-7 border-2 border-rose-200 shadow-md">
          <MascotBanner
            message="Hitung sisa donat lezat di bawah ini setelah dimakan!"
            mascotEmoji="🍩"
            mascotName="Boni si Kelinci"
          />

          <div className="text-center my-4 max-w-md mx-auto">
            {/* Visual donuts */}
            <div className="p-4 bg-rose-50 rounded-2xl border border-rose-200 mb-4">
              <div className="text-xs font-bold text-rose-900 mb-2">
                Mula-mula ada {subQuizTotal} donat, dimakan {subQuizMinus} donat:
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {Array.from({ length: subQuizTotal }).map((_, i) => {
                  const isEaten = i < subQuizMinus;
                  return (
                    <span
                      key={i}
                      className={`text-3xl transition-transform ${isEaten ? 'opacity-30 line-through scale-75' : 'hover:scale-125'}`}
                      title={isEaten ? 'Sudah dimakan' : 'Donat utuh'}
                    >
                      🍩
                    </span>
                  );
                })}
              </div>
            </div>

            <div className="text-xl font-black text-rose-950 mb-4">
              {subQuizTotal} - {subQuizMinus} = ?
            </div>

            {/* Answer choices */}
            <div className="flex justify-center gap-3">
              {[
                subQuizTotal - subQuizMinus,
                subQuizTotal - subQuizMinus > 1 ? subQuizTotal - subQuizMinus - 1 : subQuizTotal - subQuizMinus + 2,
                subQuizTotal - subQuizMinus + 1,
                subQuizTotal - subQuizMinus > 2 ? subQuizTotal - subQuizMinus - 2 : subQuizTotal - subQuizMinus + 3,
              ]
                .filter((v, i, a) => a.indexOf(v) === i)
                .sort((a, b) => a - b)
                .map((ans) => (
                  <button
                    key={ans}
                    id={`opt-sub-${ans}`}
                    disabled={quizAnswered}
                    onClick={() => handlePracticeChoice(ans)}
                    className={`w-14 h-14 rounded-2xl font-black text-xl transition-all cursor-pointer ${
                      quizAnswered && ans === subQuizTotal - subQuizMinus
                        ? 'bg-emerald-500 text-white scale-110 ring-4 ring-emerald-300'
                        : 'bg-rose-100 hover:bg-rose-200 text-rose-900 border-2 border-rose-300 active:scale-95'
                    }`}
                  >
                    {ans}
                  </button>
                ))}
            </div>

            {/* Feedback */}
            {quizFeedback && (
              <div className="mt-4 p-3 rounded-2xl bg-rose-100 text-rose-950 font-bold text-sm border border-rose-300">
                {quizFeedback}
              </div>
            )}

            {quizAnswered && (
              <div className="mt-4">
                <button
                  id="btn-next-sub"
                  onClick={() => {
                    soundEffects.playClick();
                    generatePractice();
                  }}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-base shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  <span>Soal Kurang Berikutnya</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
