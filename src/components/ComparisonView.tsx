import React, { useState } from 'react';
import { soundEffects, speakIndonesian } from '../utils/audio';
import { Plus, Minus, RotateCcw, ArrowRight } from 'lucide-react';
import { MascotBanner } from './MascotBanner';

interface ComparisonViewProps {
  onEarnStar: () => void;
}

export const ComparisonView: React.FC<ComparisonViewProps> = ({ onEarnStar }) => {
  const [tab, setTab] = useState<'sandbox' | 'quiz'>('quiz');

  // Sandbox state
  const [leftCount, setLeftCount] = useState<number>(5);
  const [rightCount, setRightCount] = useState<number>(3);
  const [leftEmoji] = useState<string>('🍎');
  const [rightEmoji] = useState<string>('🍊');

  // Quiz state
  const [quizLeft, setQuizLeft] = useState<number>(4);
  const [quizRight, setQuizRight] = useState<number>(6);
  const [quizEmoji] = useState<string>('⭐');
  const [quizFeedback, setQuizFeedback] = useState<string | null>(null);
  const [quizAnswered, setQuizAnswered] = useState<boolean>(false);

  const generateQuiz = () => {
    const l = Math.floor(Math.random() * 8) + 1;
    let r = Math.floor(Math.random() * 8) + 1;
    if (Math.random() > 0.7) r = l; // 30% chance of equal
    setQuizLeft(l);
    setQuizRight(r);
    setQuizFeedback(null);
    setQuizAnswered(false);
  };

  const handleQuizAnswer = (choice: 'lebih_banyak' | 'lebih_sedikit' | 'sama') => {
    if (quizAnswered) return;

    let isCorrect = false;
    if (quizLeft > quizRight && choice === 'lebih_banyak') isCorrect = true;
    else if (quizLeft < quizRight && choice === 'lebih_sedikit') isCorrect = true;
    else if (quizLeft === quizRight && choice === 'sama') isCorrect = true;

    if (isCorrect) {
      soundEffects.playSuccess();
      const symbol = quizLeft > quizRight ? '>' : quizLeft < quizRight ? '<' : '=';
      const label = quizLeft > quizRight ? 'Lebih Banyak' : quizLeft < quizRight ? 'Lebih Sedikit' : 'Sama Banyak';
      const text = `Tepat sekali! ${quizLeft} ${label} dari ${quizRight} (${quizLeft} ${symbol} ${quizRight})! 🎉`;
      setQuizFeedback(text);
      speakIndonesian(text);
      setQuizAnswered(true);
      onEarnStar();
    } else {
      soundEffects.playGentleOops();
      setQuizFeedback('Belum tepat. Coba hitung dan bandingkan lagi dengan teliti yaa 😊');
      speakIndonesian('Belum tepat. Coba hitung dan bandingkan lagi yaa');
    }
  };

  // Determine comparison symbol and label for sandbox
  const getComparisonInfo = (l: number, r: number) => {
    if (l > r) return { symbol: '>', label: 'Lebih Banyak Dari', color: 'text-emerald-700 bg-emerald-100 border-emerald-300' };
    if (l < r) return { symbol: '<', label: 'Lebih Sedikit Dari', color: 'text-rose-700 bg-rose-100 border-rose-300' };
    return { symbol: '=', label: 'Sama Banyak Dengan', color: 'text-amber-700 bg-amber-100 border-amber-300' };
  };

  const currentComp = getComparisonInfo(leftCount, rightCount);

  // Rotation angle for visual balance beam
  const getTiltAngle = (l: number, r: number) => {
    if (l > r) return -8; // Left dips down
    if (l < r) return 8;  // Right dips down
    return 0;             // Balanced
  };

  return (
    <div className="space-y-4">
      {/* Tab switch */}
      <div className="flex items-center gap-2 bg-teal-100/80 p-1 rounded-xl w-fit">
        <button
          onClick={() => {
            soundEffects.playClick();
            setTab('quiz');
            if (!quizAnswered) generateQuiz();
          }}
          className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            tab === 'quiz' ? 'bg-teal-600 text-white shadow-xs' : 'text-teal-900 hover:bg-teal-200/60'
          }`}
        >
          🎯 Tebak Perbandingan
        </button>
        <button
          onClick={() => {
            soundEffects.playClick();
            setTab('sandbox');
          }}
          className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            tab === 'sandbox' ? 'bg-teal-600 text-white shadow-xs' : 'text-teal-900 hover:bg-teal-200/60'
          }`}
        >
          ⚖️ Timbangan Bebas
        </button>
      </div>

      {tab === 'quiz' ? (
        <div className="bg-white rounded-3xl p-5 sm:p-7 border-2 border-teal-200 shadow-md">
          <MascotBanner
            message="Hitung benda di sebelah kiri dan kanan, lalu tentukan apakah Lebih Banyak, Lebih Sedikit, atau Sama Banyak!"
            mascotEmoji="⚖️"
            mascotName="Kiki si Kancil"
          />

          {/* Visual comparison stage */}
          <div className="my-6 grid grid-cols-1 md:grid-cols-11 gap-4 items-center max-w-2xl mx-auto">
            {/* Left box */}
            <div className="md:col-span-5 bg-teal-50 border-2 border-teal-300 rounded-2xl p-4 text-center">
              <span className="text-xs font-bold text-teal-800 uppercase tracking-wider block mb-1">
                Kotak Kiri
              </span>
              <div className="text-3xl font-black text-teal-950 mb-3">{quizLeft}</div>
              <div className="min-h-[110px] flex flex-wrap items-center justify-center gap-2 bg-white rounded-xl p-3 border border-teal-100 shadow-inner">
                {Array.from({ length: quizLeft }).map((_, i) => (
                  <span
                    key={i}
                    onClick={() => soundEffects.playPop()}
                    className="text-3xl cursor-pointer hover:scale-125 transition-transform"
                  >
                    {quizEmoji}
                  </span>
                ))}
              </div>
            </div>

            {/* Middle vs symbol indicator */}
            <div className="md:col-span-1 flex flex-col items-center justify-center">
              <span className="w-10 h-10 rounded-full bg-teal-100 text-teal-900 font-black text-sm flex items-center justify-center border border-teal-300">
                VS
              </span>
            </div>

            {/* Right box */}
            <div className="md:col-span-5 bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 text-center">
              <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block mb-1">
                Kotak Kanan
              </span>
              <div className="text-3xl font-black text-amber-950 mb-3">{quizRight}</div>
              <div className="min-h-[110px] flex flex-wrap items-center justify-center gap-2 bg-white rounded-xl p-3 border border-amber-100 shadow-inner">
                {Array.from({ length: quizRight }).map((_, i) => (
                  <span
                    key={i}
                    onClick={() => soundEffects.playPop()}
                    className="text-3xl cursor-pointer hover:scale-125 transition-transform"
                  >
                    {quizEmoji}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Question text */}
          <div className="text-center my-4">
            <h3 className="text-base sm:text-lg font-bold text-slate-800 mb-4">
              Benda di <strong>Kotak Kiri ({quizLeft})</strong> ... dibanding <strong>Kotak Kanan ({quizRight})</strong>?
            </h3>

            {/* Choice buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-3 max-w-lg mx-auto">
              <button
                id="btn-more"
                onClick={() => handleQuizAnswer('lebih_banyak')}
                disabled={quizAnswered}
                className="flex-1 py-3 px-4 rounded-2xl font-black text-sm sm:text-base bg-emerald-500 hover:bg-emerald-600 text-white shadow-md active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Lebih Banyak</span>
                <span className="bg-emerald-700/60 px-2 py-0.5 rounded-lg text-sm">&gt;</span>
              </button>

              <button
                id="btn-equal"
                onClick={() => handleQuizAnswer('sama')}
                disabled={quizAnswered}
                className="flex-1 py-3 px-4 rounded-2xl font-black text-sm sm:text-base bg-amber-500 hover:bg-amber-600 text-white shadow-md active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Sama Banyak</span>
                <span className="bg-amber-700/60 px-2 py-0.5 rounded-lg text-sm">=</span>
              </button>

              <button
                id="btn-less"
                onClick={() => handleQuizAnswer('lebih_sedikit')}
                disabled={quizAnswered}
                className="flex-1 py-3 px-4 rounded-2xl font-black text-sm sm:text-base bg-rose-500 hover:bg-rose-600 text-white shadow-md active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Lebih Sedikit</span>
                <span className="bg-rose-700/60 px-2 py-0.5 rounded-lg text-sm">&lt;</span>
              </button>
            </div>

            {/* Feedback */}
            {quizFeedback && (
              <div className="mt-5 p-3 rounded-2xl bg-teal-50 text-teal-950 font-bold text-sm sm:text-base border border-teal-300 max-w-md mx-auto">
                {quizFeedback}
              </div>
            )}

            {quizAnswered && (
              <div className="mt-4">
                <button
                  id="btn-next-compare"
                  onClick={() => {
                    soundEffects.playClick();
                    generateQuiz();
                  }}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-base shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  <span>Soal Berikutnya</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Sandbox Interactive Scale Mode */
        <div className="bg-white rounded-3xl p-5 sm:p-7 border-2 border-teal-200 shadow-md">
          <MascotBanner
            message="Kamu bisa bebas menambah atau mengurangi buah di sebelah kiri dan kanan, lalu lihat bagaimana timbangan bergerak!"
            mascotEmoji="⚖️"
          />

          {/* Balance beam illustration */}
          <div className="relative max-w-lg mx-auto my-6 p-4">
            {/* Fulcrum and beam */}
            <div className="relative pt-6 pb-12">
              {/* Tilting bar */}
              <div
                className="h-3 bg-amber-800 rounded-full transition-transform duration-500 origin-center flex items-center justify-between px-6 shadow-md"
                style={{ transform: `rotate(${getTiltAngle(leftCount, rightCount)}deg)` }}
              >
                {/* Left pan */}
                <div className="w-24 -mt-2 bg-teal-100 border-2 border-teal-400 rounded-b-2xl p-2 text-center shadow-sm">
                  <div className="text-xl">{leftEmoji}</div>
                  <div className="text-xs font-black text-teal-900">{leftCount} buah</div>
                </div>

                {/* Right pan */}
                <div className="w-24 -mt-2 bg-amber-100 border-2 border-amber-400 rounded-b-2xl p-2 text-center shadow-sm">
                  <div className="text-xl">{rightEmoji}</div>
                  <div className="text-xs font-black text-amber-900">{rightCount} buah</div>
                </div>
              </div>

              {/* Center triangle stand */}
              <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-b-[36px] border-b-amber-700 mx-auto -mt-1"></div>
              <div className="w-24 h-3 bg-amber-900 mx-auto rounded-full shadow-sm"></div>
            </div>

            {/* Result banner */}
            <div className="text-center mt-2">
              <div className={`inline-block px-4 py-2 rounded-2xl border-2 font-black text-base sm:text-lg ${currentComp.color} shadow-xs`}>
                {leftCount} {currentComp.symbol} {rightCount} ({leftCount} {currentComp.label} {rightCount})
              </div>
            </div>
          </div>

          {/* Controllers for Left and Right */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">
            {/* Left Control */}
            <div className="bg-teal-50 border border-teal-200 rounded-2xl p-3 text-center">
              <span className="text-xs font-bold text-teal-800">Sisi Kiri ({leftEmoji})</span>
              <div className="text-3xl font-black text-teal-950 my-2">{leftCount}</div>
              <div className="flex justify-center gap-2">
                <button
                  disabled={leftCount <= 1}
                  onClick={() => {
                    soundEffects.playClick();
                    setLeftCount((c) => Math.max(1, c - 1));
                  }}
                  className="w-10 h-10 rounded-xl bg-white border border-teal-300 text-teal-900 font-bold flex items-center justify-center hover:bg-teal-100 disabled:opacity-30 cursor-pointer"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <button
                  disabled={leftCount >= 10}
                  onClick={() => {
                    soundEffects.playClick();
                    setLeftCount((c) => Math.min(10, c + 1));
                  }}
                  className="w-10 h-10 rounded-xl bg-teal-600 text-white font-bold flex items-center justify-center hover:bg-teal-700 disabled:opacity-30 cursor-pointer shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Control */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 text-center">
              <span className="text-xs font-bold text-amber-800">Sisi Kanan ({rightEmoji})</span>
              <div className="text-3xl font-black text-amber-950 my-2">{rightCount}</div>
              <div className="flex justify-center gap-2">
                <button
                  disabled={rightCount <= 1}
                  onClick={() => {
                    soundEffects.playClick();
                    setRightCount((c) => Math.max(1, c - 1));
                  }}
                  className="w-10 h-10 rounded-xl bg-white border border-amber-300 text-amber-900 font-bold flex items-center justify-center hover:bg-amber-100 disabled:opacity-30 cursor-pointer"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <button
                  disabled={rightCount >= 10}
                  onClick={() => {
                    soundEffects.playClick();
                    setRightCount((c) => Math.min(10, c + 1));
                  }}
                  className="w-10 h-10 rounded-xl bg-amber-500 text-white font-bold flex items-center justify-center hover:bg-amber-600 disabled:opacity-30 cursor-pointer shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
