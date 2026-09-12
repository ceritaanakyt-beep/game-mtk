import React, { useState } from 'react';
import { soundEffects, speakIndonesian } from '../utils/audio';
import { Plus, Minus, ArrowRight, RotateCcw } from 'lucide-react';
import { MascotBanner } from './MascotBanner';

interface AdditionViewProps {
  onEarnStar: () => void;
}

export const AdditionView: React.FC<AdditionViewProps> = ({ onEarnStar }) => {
  const [subTab, setSubTab] = useState<'combine' | 'frog' | 'bonds' | 'practice'>('combine');

  // Combine mode state
  const [numA, setNumA] = useState<number>(3);
  const [numB, setNumB] = useState<number>(2);
  const [isCombined, setIsCombined] = useState<boolean>(false);

  // Frog jump state
  const [frogStart, setFrogStart] = useState<number>(4);
  const [frogSteps, setFrogSteps] = useState<number>(3);
  const [frogCurrentPos, setFrogCurrentPos] = useState<number>(4);
  const [isJumping, setIsJumping] = useState<boolean>(false);

  // Practice state
  const [quizA, setQuizA] = useState<number>(4);
  const [quizB, setQuizB] = useState<number>(3);
  const [quizAnswered, setQuizAnswered] = useState<boolean>(false);
  const [quizFeedback, setQuizFeedback] = useState<string | null>(null);

  const generateQuiz = () => {
    const a = Math.floor(Math.random() * 6) + 1; // 1 - 6
    const b = Math.floor(Math.random() * 5) + 1; // 1 - 5
    setQuizA(a);
    setQuizB(b);
    setQuizAnswered(false);
    setQuizFeedback(null);
  };

  const handleCombine = () => {
    soundEffects.playSuccess();
    setIsCombined(true);
    const sum = numA + numB;
    speakIndonesian(`${numA} ditambah ${numB} sama dengan ${sum}`);
    onEarnStar();
  };

  const handleFrogJump = () => {
    if (isJumping) return;
    setIsJumping(true);
    setFrogCurrentPos(frogStart);

    let current = frogStart;
    const target = frogStart + frogSteps;

    const interval = setInterval(() => {
      if (current < target) {
        current += 1;
        setFrogCurrentPos(current);
        soundEffects.playJump();
        speakIndonesian(`${current}`);
      } else {
        clearInterval(interval);
        setIsJumping(false);
        soundEffects.playSuccess();
        speakIndonesian(`Hore! Katak mendarat di angka ${target}! ${frogStart} ditambah ${frogSteps} sama dengan ${target}`);
        onEarnStar();
      }
    }, 600);
  };

  const handleQuizAnswer = (choice: number) => {
    if (quizAnswered) return;
    const sum = quizA + quizB;
    if (choice === sum) {
      soundEffects.playSuccess();
      setQuizFeedback(`Hebat sekali! ${quizA} + ${quizB} = ${sum}! 🌟`);
      speakIndonesian(`Hebat sekali! ${quizA} ditambah ${quizB} sama dengan ${sum}`);
      setQuizAnswered(true);
      onEarnStar();
    } else {
      soundEffects.playGentleOops();
      setQuizFeedback(`Hampir benar! Ayo coba hitung lagi yaa 😊`);
      speakIndonesian(`Hampir benar! Ayo coba hitung lagi yaa`);
    }
  };

  return (
    <div className="space-y-4">
      {/* Subtab selection */}
      <div className="flex flex-wrap items-center gap-1.5 bg-sky-100/80 p-1 rounded-xl w-fit">
        <button
          onClick={() => {
            soundEffects.playClick();
            setSubTab('combine');
            setIsCombined(false);
          }}
          className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            subTab === 'combine' ? 'bg-sky-600 text-white shadow-xs' : 'text-sky-950 hover:bg-sky-200/60'
          }`}
        >
          🧺 Gabung Benda
        </button>
        <button
          onClick={() => {
            soundEffects.playClick();
            setSubTab('frog');
            setFrogCurrentPos(frogStart);
          }}
          className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            subTab === 'frog' ? 'bg-sky-600 text-white shadow-xs' : 'text-sky-950 hover:bg-sky-200/60'
          }`}
        >
          🐸 Katak Melompat
        </button>
        <button
          onClick={() => {
            soundEffects.playClick();
            setSubTab('bonds');
          }}
          className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            subTab === 'bonds' ? 'bg-sky-600 text-white shadow-xs' : 'text-sky-950 hover:bg-sky-200/60'
          }`}
        >
          ⚪ Pasangan Bilangan
        </button>
        <button
          onClick={() => {
            soundEffects.playClick();
            setSubTab('practice');
            if (!quizAnswered) generateQuiz();
          }}
          className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            subTab === 'practice' ? 'bg-sky-600 text-white shadow-xs' : 'text-sky-950 hover:bg-sky-200/60'
          }`}
        >
          🎯 Latihan Ceria
        </button>
      </div>

      {/* 1. Combine Objects Mode */}
      {subTab === 'combine' && (
        <div className="bg-white rounded-3xl p-5 sm:p-7 border-2 border-sky-200 shadow-md">
          <MascotBanner
            message="Penjumlahan artinya menggabungkan dua kelompok benda menjadi satu kelompok yang lebih banyak!"
            mascotEmoji="🧺"
            mascotName="Kiki si Kancil"
          />

          {/* Operation formula display */}
          <div className="flex items-center justify-center gap-3 my-4">
            <span className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-900 border-2 border-sky-300 font-black text-2xl flex items-center justify-center">
              {numA}
            </span>
            <span className="text-3xl font-black text-sky-600">+</span>
            <span className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-900 border-2 border-amber-300 font-black text-2xl flex items-center justify-center">
              {numB}
            </span>
            <span className="text-3xl font-black text-sky-600">=</span>
            <span className={`w-12 h-12 rounded-2xl font-black text-2xl flex items-center justify-center transition-all ${
              isCombined
                ? 'bg-emerald-500 text-white border-2 border-emerald-600 scale-110 shadow-md'
                : 'bg-slate-100 text-slate-400 border-2 border-dashed border-slate-300'
            }`}>
              {isCombined ? numA + numB : '?'}
            </span>
          </div>

          {/* Visual boxes */}
          <div className="grid grid-cols-1 md:grid-cols-11 gap-3 items-center max-w-2xl mx-auto my-5">
            {/* Box A */}
            <div className="md:col-span-5 bg-sky-50 border-2 border-sky-200 rounded-2xl p-3 text-center">
              <span className="text-xs font-bold text-sky-800">Kelompok 1 ({numA} Apel)</span>
              <div className="min-h-[90px] flex flex-wrap items-center justify-center gap-2 p-2 mt-1 bg-white rounded-xl">
                {Array.from({ length: numA }).map((_, i) => (
                  <span key={i} className="text-3xl hover:scale-125 transition-transform cursor-pointer" onClick={() => soundEffects.playPop()}>
                    🍎
                  </span>
                ))}
              </div>
            </div>

            {/* Plus sign */}
            <div className="md:col-span-1 text-center font-black text-2xl text-sky-500">
              +
            </div>

            {/* Box B */}
            <div className="md:col-span-5 bg-amber-50 border-2 border-amber-200 rounded-2xl p-3 text-center">
              <span className="text-xs font-bold text-amber-800">Kelompok 2 ({numB} Jeruk)</span>
              <div className="min-h-[90px] flex flex-wrap items-center justify-center gap-2 p-2 mt-1 bg-white rounded-xl">
                {Array.from({ length: numB }).map((_, i) => (
                  <span key={i} className="text-3xl hover:scale-125 transition-transform cursor-pointer" onClick={() => soundEffects.playPop()}>
                    🍊
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action button: Gabungkan! */}
          <div className="text-center my-4">
            <button
              id="btn-combine-action"
              onClick={handleCombine}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-sky-500 to-emerald-500 hover:from-sky-600 hover:to-emerald-600 text-white font-black text-base shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              ✨ Gabungkan Semua Buah!
            </button>
          </div>

          {/* Combined Basket Display */}
          {isCombined && (
            <div className="max-w-md mx-auto bg-gradient-to-b from-emerald-50 to-teal-50 border-2 border-emerald-300 rounded-3xl p-4 text-center mt-4 shadow-sm animate-soft-bounce">
              <div className="text-xs font-black uppercase text-emerald-800 mb-1">
                Keranjang Hasil Gabungan
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2 p-3 bg-white rounded-2xl border border-emerald-200 min-h-[90px]">
                {Array.from({ length: numA }).map((_, i) => (
                  <span key={`a-${i}`} className="text-3xl" title="Apel">🍎</span>
                ))}
                {Array.from({ length: numB }).map((_, i) => (
                  <span key={`b-${i}`} className="text-3xl" title="Jeruk">🍊</span>
                ))}
              </div>
              <div className="mt-3 text-emerald-900 font-bold text-base">
                Total semua buah adalah <span className="text-emerald-700 font-black text-xl">{numA + numB}</span> buah!
              </div>
            </div>
          )}

          {/* Number Selectors */}
          <div className="mt-6 pt-4 border-t border-sky-100 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto">
            <div className="flex items-center justify-between bg-sky-50 p-2.5 rounded-xl border border-sky-200">
              <span className="text-xs font-bold text-sky-900">Ubah Apel:</span>
              <div className="flex items-center gap-2">
                <button
                  disabled={numA <= 1}
                  onClick={() => {
                    soundEffects.playClick();
                    setNumA((n) => Math.max(1, n - 1));
                    setIsCombined(false);
                  }}
                  className="w-8 h-8 rounded-lg bg-white border text-sky-900 font-bold flex items-center justify-center disabled:opacity-30 cursor-pointer"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="font-black text-base text-sky-950 w-6 text-center">{numA}</span>
                <button
                  disabled={numA >= 10}
                  onClick={() => {
                    soundEffects.playClick();
                    setNumA((n) => Math.min(10, n + 1));
                    setIsCombined(false);
                  }}
                  className="w-8 h-8 rounded-lg bg-sky-600 text-white font-bold flex items-center justify-center disabled:opacity-30 cursor-pointer shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between bg-amber-50 p-2.5 rounded-xl border border-amber-200">
              <span className="text-xs font-bold text-amber-900">Ubah Jeruk:</span>
              <div className="flex items-center gap-2">
                <button
                  disabled={numB <= 1}
                  onClick={() => {
                    soundEffects.playClick();
                    setNumB((n) => Math.max(1, n - 1));
                    setIsCombined(false);
                  }}
                  className="w-8 h-8 rounded-lg bg-white border text-amber-900 font-bold flex items-center justify-center disabled:opacity-30 cursor-pointer"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="font-black text-base text-amber-950 w-6 text-center">{numB}</span>
                <button
                  disabled={numB >= 10}
                  onClick={() => {
                    soundEffects.playClick();
                    setNumB((n) => Math.min(10, n + 1));
                    setIsCombined(false);
                  }}
                  className="w-8 h-8 rounded-lg bg-amber-500 text-white font-bold flex items-center justify-center disabled:opacity-30 cursor-pointer shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. Frog Jump Number Line Mode */}
      {subTab === 'frog' && (
        <div className="bg-white rounded-3xl p-5 sm:p-7 border-2 border-sky-200 shadow-md">
          <MascotBanner
            message="Katak melompat maju di garis bilangan! Contoh: mulai di 4, melompat 3 langkah maju, mendarat di 7!"
            mascotEmoji="🐸"
            mascotName="Katak Melompat"
          />

          <div className="text-center my-4">
            <div className="inline-block bg-sky-50 border-2 border-sky-300 px-4 py-2 rounded-2xl text-lg font-black text-sky-950">
              {frogStart} + {frogSteps} = {frogStart + frogSteps}
            </div>
            <p className="text-xs sm:text-sm text-sky-800 font-medium mt-1">
              Mulai dari angka <strong>{frogStart}</strong>, melompat <strong>{frogSteps} langkah</strong> ke depan!
            </p>
          </div>

          {/* Number line with moving frog */}
          <div className="overflow-x-auto pb-6 pt-10 px-2 scrollbar-thin my-4">
            <div className="relative min-w-[750px] flex items-center justify-between border-b-4 border-sky-400 pb-2">
              {Array.from({ length: 15 }).map((_, i) => {
                const num = i + 1;
                const isStart = num === frogStart;
                const isTarget = num === frogStart + frogSteps;
                const isFrogHere = num === frogCurrentPos;
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
                          ? 'bg-emerald-500 text-white ring-4 ring-emerald-300 scale-125 z-10 shadow-md'
                          : isTarget
                          ? 'bg-amber-100 border-2 border-dashed border-amber-400 text-amber-900 font-black'
                          : isStart
                          ? 'bg-sky-200 border-2 border-sky-400 text-sky-900 font-black'
                          : 'bg-white text-slate-700 border-2 border-sky-200'
                      }`}
                    >
                      {num}
                    </div>
                    <div className="w-0.5 h-3 bg-sky-400 mt-1"></div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Jump action button */}
          <div className="flex justify-center gap-3 mt-4">
            <button
              disabled={isJumping}
              onClick={handleFrogJump}
              className="px-6 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-base shadow-md hover:scale-105 active:scale-95 transition-all disabled:opacity-50 cursor-pointer"
            >
              🐸 Ayo Melompat Sekarang!
            </button>
            <button
              disabled={isJumping}
              onClick={() => {
                soundEffects.playClick();
                setFrogCurrentPos(frogStart);
              }}
              className="px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Ulang</span>
            </button>
          </div>
        </div>
      )}

      {/* 3. Number Bonds (Pasangan Bilangan) */}
      {subTab === 'bonds' && (
        <div className="bg-white rounded-3xl p-5 sm:p-7 border-2 border-sky-200 shadow-md">
          <MascotBanner
            message="Pasangan bilangan (Number Bonds) menunjukkan bahwa suatu angka tersusun dari dua bagian angka yang digabungkan!"
            mascotEmoji="⚪"
            mascotName="Kiki si Kancil"
          />

          <div className="max-w-md mx-auto my-6 p-4 bg-sky-50/60 rounded-3xl border-2 border-sky-200 text-center">
            {/* Whole Circle */}
            <div className="inline-block relative">
              <div className="w-20 h-20 rounded-full bg-sky-500 text-white flex flex-col items-center justify-center shadow-md mx-auto border-4 border-white">
                <span className="text-xs font-bold text-sky-100">Semua</span>
                <span className="text-3xl font-black">{numA + numB}</span>
              </div>

              {/* Connecting lines */}
              <div className="w-32 h-12 border-t-4 border-l-4 border-r-4 border-sky-300 rounded-t-3xl mx-auto -mt-2"></div>
            </div>

            {/* Two Part Circles */}
            <div className="flex justify-around items-center -mt-2">
              <div className="w-16 h-16 rounded-full bg-amber-400 text-amber-950 flex flex-col items-center justify-center shadow-md border-3 border-white">
                <span className="text-[10px] font-bold">Bagian 1</span>
                <span className="text-2xl font-black">{numA}</span>
              </div>

              <div className="text-xl font-bold text-sky-600">+</div>

              <div className="w-16 h-16 rounded-full bg-rose-400 text-white flex flex-col items-center justify-center shadow-md border-3 border-white">
                <span className="text-[10px] font-bold">Bagian 2</span>
                <span className="text-2xl font-black">{numB}</span>
              </div>
            </div>

            <div className="mt-4 p-3 bg-white rounded-xl border border-sky-200 text-sm font-bold text-sky-950">
              Angka <strong>{numA + numB}</strong> dapat dibentuk dari <strong>{numA}</strong> dan <strong>{numB}</strong>!
            </div>
          </div>
        </div>
      )}

      {/* 4. Interactive Practice Mode */}
      {subTab === 'practice' && (
        <div className="bg-white rounded-3xl p-5 sm:p-7 border-2 border-sky-200 shadow-md">
          <MascotBanner
            message="Hitung gambar bintang di bawah ini, lalu pilih jawaban penjumlahan yang tepat!"
            mascotEmoji="⭐"
            mascotName="Boni si Kelinci"
          />

          <div className="text-center my-4 max-w-md mx-auto">
            {/* Visual Equation */}
            <div className="flex items-center justify-center gap-3 p-4 bg-sky-50 rounded-2xl border border-sky-200 mb-4">
              <div className="text-center">
                <div className="flex flex-wrap max-w-[100px] justify-center gap-1">
                  {Array.from({ length: quizA }).map((_, i) => (
                    <span key={i} className="text-2xl">⭐</span>
                  ))}
                </div>
                <span className="text-sm font-black text-sky-900 mt-1 block">{quizA}</span>
              </div>

              <span className="text-3xl font-black text-sky-600">+</span>

              <div className="text-center">
                <div className="flex flex-wrap max-w-[100px] justify-center gap-1">
                  {Array.from({ length: quizB }).map((_, i) => (
                    <span key={i} className="text-2xl">⭐</span>
                  ))}
                </div>
                <span className="text-sm font-black text-sky-900 mt-1 block">{quizB}</span>
              </div>

              <span className="text-3xl font-black text-sky-600">=</span>

              <span className="w-10 h-10 rounded-xl bg-white border-2 border-sky-400 text-sky-900 font-black text-xl flex items-center justify-center shadow-inner">
                ?
              </span>
            </div>

            {/* Choices */}
            <div className="flex justify-center gap-3">
              {[
                quizA + quizB,
                quizA + quizB > 2 ? quizA + quizB - 1 : quizA + quizB + 2,
                quizA + quizB + 1,
                quizA + quizB > 3 ? quizA + quizB - 2 : quizA + quizB + 3,
              ]
                .filter((v, i, a) => a.indexOf(v) === i)
                .sort((a, b) => a - b)
                .map((ans) => (
                  <button
                    key={ans}
                    id={`opt-add-${ans}`}
                    disabled={quizAnswered}
                    onClick={() => handleQuizAnswer(ans)}
                    className={`w-14 h-14 rounded-2xl font-black text-xl transition-all cursor-pointer ${
                      quizAnswered && ans === quizA + quizB
                        ? 'bg-emerald-500 text-white scale-110 ring-4 ring-emerald-300'
                        : 'bg-sky-100 hover:bg-sky-200 text-sky-900 border-2 border-sky-300 active:scale-95'
                    }`}
                  >
                    {ans}
                  </button>
                ))}
            </div>

            {/* Feedback */}
            {quizFeedback && (
              <div className="mt-4 p-3 rounded-2xl bg-sky-100 text-sky-950 font-bold text-sm border border-sky-300">
                {quizFeedback}
              </div>
            )}

            {quizAnswered && (
              <div className="mt-4">
                <button
                  id="btn-next-add"
                  onClick={() => {
                    soundEffects.playClick();
                    generateQuiz();
                  }}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-base shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  <span>Soal Tambah Berikutnya</span>
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
