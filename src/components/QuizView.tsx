import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { QUIZ_QUESTIONS } from '../data/learningData';
import { QuizQuestion } from '../types';
import { soundEffects, speakIndonesian } from '../utils/audio';
import { Volume2, Trophy, RotateCcw, CheckCircle2, XCircle, ArrowRight, Sparkles } from 'lucide-react';
import { MascotBanner } from './MascotBanner';

interface QuizViewProps {
  onEarnStar: () => void;
  onUnlockSpecialSticker?: () => void;
}

export const QuizView: React.FC<QuizViewProps> = ({ onEarnStar, onUnlockSpecialSticker }) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>(QUIZ_QUESTIONS);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  const currentQ = questions[currentIndex];

  useEffect(() => {
    if (!quizFinished && currentQ) {
      speakIndonesian(currentQ.question);
    }
  }, [currentIndex, quizFinished]);

  const handleSelectOption = (value: string | number) => {
    if (isAnswered) return;
    setSelectedAnswer(value);
    setIsAnswered(true);

    const isCorrect = value === currentQ.correctAnswer;
    if (isCorrect) {
      soundEffects.playSuccess();
      setScore((s) => s + 1);
      speakIndonesian('Hebat! Jawabanmu benar sekali!');
      onEarnStar();
    } else {
      soundEffects.playGentleOops();
      speakIndonesian('Belum tepat. Tidak apa-apa, ayo belajar bersama lagi!');
    }
  };

  const handleNextQuestion = () => {
    soundEffects.playClick();
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      // Finished!
      setQuizFinished(true);
      soundEffects.playFanfare();
      try {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // Confetti fallback
      }
      if (onUnlockSpecialSticker) {
        onUnlockSpecialSticker();
      }
    }
  };

  const handleRestartQuiz = () => {
    soundEffects.playClick();
    // Shuffle slightly
    setQuestions([...QUIZ_QUESTIONS].sort(() => Math.random() - 0.5));
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setQuizFinished(false);
  };

  if (quizFinished) {
    const starCount = score >= 8 ? 3 : score >= 5 ? 2 : 1;
    return (
      <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-yellow-300 shadow-xl text-center max-w-xl mx-auto my-4 animate-soft-bounce">
        <div className="w-24 h-24 rounded-full bg-yellow-100 border-4 border-yellow-400 mx-auto flex items-center justify-center text-5xl mb-4 shadow-md">
          🏆
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-amber-950 mb-2">
          Hore! Kamu Hebat Sekali!
        </h2>
        <p className="text-amber-800 font-semibold text-sm sm:text-base mb-4">
          Kamu telah menyelesaikan Tantangan Kuis Bintang Matematika Kelas 1 SD!
        </p>

        {/* Stars display */}
        <div className="flex justify-center gap-2 text-4xl sm:text-5xl my-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <span
              key={i}
              className={`transition-all ${
                i < starCount ? 'scale-110 drop-shadow-md text-amber-400' : 'opacity-25 grayscale'
              }`}
            >
              ⭐
            </span>
          ))}
        </div>

        {/* Score pill */}
        <div className="inline-block bg-amber-50 border-2 border-amber-300 px-6 py-3 rounded-2xl my-3">
          <span className="text-xs uppercase font-bold text-amber-800 block">Nilai Kamu:</span>
          <span className="text-4xl font-black text-amber-950">
            {score * 10} <span className="text-xl font-bold text-amber-700">/ 100</span>
          </span>
          <div className="text-xs font-bold text-amber-700 mt-1">
            ({score} dari {questions.length} soal dijawab dengan benar)
          </div>
        </div>

        {/* Action button */}
        <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
          <button
            id="btn-quiz-retry"
            onClick={handleRestartQuiz}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-black text-base shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Main Lagi & Raih Nilai 100!</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-7 border-2 border-yellow-300 shadow-md">
      {/* Quiz Progress header */}
      <div className="flex items-center justify-between pb-4 border-b-2 border-amber-100 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-yellow-400 text-amber-950 flex items-center justify-center font-black text-sm shadow-xs">
            {currentIndex + 1}
          </div>
          <span className="text-xs sm:text-sm font-bold text-amber-900">
            Soal {currentIndex + 1} dari {questions.length}
          </span>
        </div>

        {/* Score stars */}
        <div className="flex items-center gap-1 bg-yellow-50 border border-yellow-300 px-3 py-1 rounded-full text-xs font-bold text-amber-900">
          <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
          <span>Skor Benar: {score}</span>
        </div>
      </div>

      {/* Mascot bubble reading question */}
      <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 flex items-center gap-3 mb-5">
        <span className="text-4xl shrink-0">🦊</span>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black text-amber-800 uppercase">Pertanyaan:</span>
            <button
              onClick={() => {
                soundEffects.playClick();
                speakIndonesian(currentQ.question);
              }}
              className="p-1 rounded-full bg-amber-200 hover:bg-amber-300 text-amber-900 cursor-pointer"
              title="Baca ulang soal"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>
          <h3 className="text-base sm:text-lg font-black text-amber-950 leading-snug mt-1">
            {currentQ.question}
          </h3>
        </div>
      </div>

      {/* Visual representation if applicable */}
      {currentQ.visualData && (
        <div className="p-4 bg-amber-50/40 rounded-2xl border border-amber-100 mb-5 flex flex-wrap items-center justify-center gap-2">
          {currentQ.visualData.items && (
            <div className="flex flex-wrap items-center justify-center gap-2">
              {currentQ.visualData.items.map((emoji, idx) => (
                <span
                  key={idx}
                  onClick={() => soundEffects.playPop()}
                  className="text-3xl sm:text-4xl cursor-pointer hover:scale-125 transition-transform"
                >
                  {emoji}
                </span>
              ))}
            </div>
          )}

          {currentQ.visualData.leftItems && (
            <div className="flex items-center gap-3">
              <div className="flex flex-wrap gap-1 p-2 bg-white rounded-xl border border-amber-200">
                {currentQ.visualData.leftItems.map((e, i) => (
                  <span key={i} className="text-2xl">{e}</span>
                ))}
              </div>

              {currentQ.visualData.operator && (
                <span className="text-2xl font-black text-amber-700">
                  {currentQ.visualData.operator}
                </span>
              )}

              {currentQ.visualData.rightItems && (
                <div className="flex flex-wrap gap-1 p-2 bg-white rounded-xl border border-amber-200">
                  {currentQ.visualData.rightItems.map((e, i) => (
                    <span key={i} className="text-2xl">{e}</span>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Options List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl mx-auto my-4">
        {currentQ.options.map((opt, i) => {
          const isSelected = selectedAnswer === opt.value;
          const isCorrect = opt.value === currentQ.correctAnswer;
          let btnStyle = 'bg-amber-50 hover:bg-amber-100 text-amber-950 border-2 border-amber-300';

          if (isAnswered) {
            if (isCorrect) {
              btnStyle = 'bg-emerald-500 text-white border-emerald-600 shadow-md ring-2 ring-emerald-300';
            } else if (isSelected && !isCorrect) {
              btnStyle = 'bg-rose-500 text-white border-rose-600';
            } else {
              btnStyle = 'opacity-40 bg-slate-100 text-slate-500 border-slate-200';
            }
          }

          return (
            <button
              key={i}
              id={`quiz-opt-${i}`}
              disabled={isAnswered}
              onClick={() => handleSelectOption(opt.value)}
              className={`p-3.5 sm:p-4 rounded-2xl font-black text-base sm:text-lg flex items-center justify-between transition-all cursor-pointer ${btnStyle} active:scale-95`}
            >
              <div className="flex items-center gap-2">
                {opt.icon && <span className="text-2xl">{opt.icon}</span>}
                <span>{opt.label}</span>
              </div>
              {isAnswered && isCorrect && <CheckCircle2 className="w-6 h-6 text-white" />}
              {isAnswered && isSelected && !isCorrect && <XCircle className="w-6 h-6 text-white" />}
            </button>
          );
        })}
      </div>

      {/* Explanation Banner */}
      {isAnswered && (
        <div className="mt-5 p-4 rounded-2xl bg-amber-50 border border-amber-300 max-w-xl mx-auto">
          <div className="text-xs font-black uppercase text-amber-800 mb-1">
            Penjelasan Guru Cilik:
          </div>
          <p className="text-sm font-bold text-amber-950">
            {currentQ.explanation}
          </p>

          <div className="mt-4 text-right">
            <button
              id="btn-quiz-next"
              onClick={handleNextQuestion}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-black text-sm sm:text-base shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <span>{currentIndex === questions.length - 1 ? 'Lihat Hasil Akhir 🏆' : 'Soal Berikutnya'}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
