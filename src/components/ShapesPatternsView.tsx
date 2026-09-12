import React, { useState } from 'react';
import { SHAPES_DATA, PATTERNS_DATA } from '../data/learningData';
import { soundEffects, speakIndonesian } from '../utils/audio';
import { Volume2, ArrowRight } from 'lucide-react';
import { MascotBanner } from './MascotBanner';

interface ShapesPatternsViewProps {
  onEarnStar: () => void;
}

export const ShapesPatternsView: React.FC<ShapesPatternsViewProps> = ({ onEarnStar }) => {
  const [tab, setTab] = useState<'shapes' | 'patterns'>('shapes');
  const [selectedShapeId, setSelectedShapeId] = useState<string>('lingkaran');

  // Pattern game state
  const [patternIndex, setPatternIndex] = useState<number>(0);
  const [patternFeedback, setPatternFeedback] = useState<string | null>(null);
  const [patternAnswered, setPatternAnswered] = useState<boolean>(false);

  const activeShape = SHAPES_DATA.find((s) => s.id === selectedShapeId) || SHAPES_DATA[0];
  const currentPattern = PATTERNS_DATA[patternIndex % PATTERNS_DATA.length];

  const handleSpeakShape = (shape: typeof activeShape) => {
    soundEffects.playClick();
    speakIndonesian(`${shape.name}. Memiliki ${shape.sides} sisi dan ${shape.corners} sudut. ${shape.description}`);
  };

  const handlePatternChoice = (choice: string) => {
    if (patternAnswered) return;
    if (choice === currentPattern.correct) {
      soundEffects.playSuccess();
      setPatternFeedback('Hore! Tebakanmu benar sekali! 🎉');
      speakIndonesian('Hore! Tebakanmu benar sekali!');
      setPatternAnswered(true);
      onEarnStar();
    } else {
      soundEffects.playGentleOops();
      setPatternFeedback('Belum tepat. Coba perhatikan urutan gambar sebelumnya yaa 😊');
      speakIndonesian('Belum tepat. Coba perhatikan urutan gambar sebelumnya yaa');
    }
  };

  const renderShapeGraphic = (id: string) => {
    switch (id) {
      case 'lingkaran':
        return (
          <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-rose-400 border-4 border-rose-600 shadow-md flex items-center justify-center text-white text-4xl hover:scale-105 transition-transform">
            ⭕
          </div>
        );
      case 'segitiga':
        return (
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center hover:scale-105 transition-transform">
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
              <polygon points="50,10 90,90 10,90" fill="#f59e0b" stroke="#b45309" strokeWidth="4" />
            </svg>
            <span className="absolute bottom-6 text-3xl">🔺</span>
          </div>
        );
      case 'persegi':
        return (
          <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl bg-emerald-400 border-4 border-emerald-600 shadow-md flex items-center justify-center text-white text-4xl hover:scale-105 transition-transform">
            🟩
          </div>
        );
      case 'persegi_panjang':
        return (
          <div className="w-44 h-28 sm:w-52 sm:h-32 rounded-2xl bg-sky-400 border-4 border-sky-600 shadow-md flex items-center justify-center text-white text-4xl hover:scale-105 transition-transform">
            🟦
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      {/* Tab toggle */}
      <div className="flex items-center gap-2 bg-purple-100/80 p-1 rounded-xl w-fit">
        <button
          onClick={() => {
            soundEffects.playClick();
            setTab('shapes');
          }}
          className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            tab === 'shapes' ? 'bg-purple-600 text-white shadow-xs' : 'text-purple-950 hover:bg-purple-200/60'
          }`}
        >
          🔷 Bangun Datar
        </button>
        <button
          onClick={() => {
            soundEffects.playClick();
            setTab('patterns');
          }}
          className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            tab === 'patterns' ? 'bg-purple-600 text-white shadow-xs' : 'text-purple-950 hover:bg-purple-200/60'
          }`}
        >
          🧩 Tebak Pola Teratur
        </button>
      </div>

      {tab === 'shapes' && (
        <div className="bg-white rounded-3xl p-5 sm:p-7 border-2 border-purple-200 shadow-md">
          <MascotBanner
            message="Ayo mengenal 4 bangun datar sederhana di sekitar kita! Ada Lingkaran, Segitiga, Persegi, dan Persegi Panjang!"
            mascotEmoji="🔍"
            mascotName="Detektif Bentuk"
          />

          {/* 4 Shapes quick buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 my-4">
            {SHAPES_DATA.map((shape) => {
              const isSelected = shape.id === selectedShapeId;
              return (
                <button
                  key={shape.id}
                  id={`shape-btn-${shape.id}`}
                  onClick={() => {
                    soundEffects.playClick();
                    setSelectedShapeId(shape.id);
                    speakIndonesian(shape.name);
                  }}
                  className={`p-3 rounded-2xl border-2 flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-purple-600 text-white border-purple-700 ring-4 ring-purple-300 scale-105 shadow-md'
                      : 'bg-purple-50 hover:bg-purple-100 text-purple-900 border-purple-200'
                  }`}
                >
                  <span className="text-2xl">
                    {shape.id === 'lingkaran' ? '🔴' : shape.id === 'segitiga' ? '🔺' : shape.id === 'persegi' ? '🟩' : '🟦'}
                  </span>
                  <span className="font-black text-xs sm:text-sm text-center">{shape.name}</span>
                </button>
              );
            })}
          </div>

          {/* Detailed shape presentation */}
          <div className="bg-purple-50/50 border-2 border-purple-200 rounded-3xl p-5 my-4">
            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* Visual graphic */}
              <div className="shrink-0 flex items-center justify-center p-4 bg-white rounded-2xl border border-purple-200">
                {renderShapeGraphic(activeShape.id)}
              </div>

              {/* Information */}
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-black text-purple-950">
                    {activeShape.name}
                  </h3>
                  <button
                    onClick={() => handleSpeakShape(activeShape)}
                    className="p-1.5 rounded-full bg-purple-200 hover:bg-purple-300 text-purple-900 cursor-pointer"
                    title="Dengarkan penjelasan"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                </div>

                <p className="text-sm font-medium text-slate-700 leading-relaxed">
                  {activeShape.description}
                </p>

                {/* Sisi & Sudut badges */}
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-white border border-purple-200 rounded-xl text-xs font-bold text-purple-900 shadow-xs">
                    📏 Jumlah Sisi: <strong className="text-base text-purple-700">{activeShape.sides}</strong>
                  </span>
                  <span className="px-3 py-1 bg-white border border-purple-200 rounded-xl text-xs font-bold text-purple-900 shadow-xs">
                    📐 Jumlah Sudut: <strong className="text-base text-purple-700">{activeShape.corners}</strong>
                  </span>
                </div>

                {/* Real life examples in classroom & home */}
                <div>
                  <span className="text-xs font-bold text-purple-900 block mb-1.5">
                    Contoh Benda Nyata Berbentuk {activeShape.name}:
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {activeShape.examples.map((ex, i) => (
                      <div
                        key={i}
                        className="bg-white p-2 rounded-xl border border-purple-100 flex items-center gap-2 shadow-2xs hover:scale-105 transition-transform"
                      >
                        <span className="text-2xl">{ex.emoji}</span>
                        <span className="text-xs font-bold text-slate-800 leading-tight">{ex.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tebak Pola Berulang (Patterns) */}
      {tab === 'patterns' && (
        <div className="bg-white rounded-3xl p-5 sm:p-7 border-2 border-purple-200 shadow-md">
          <MascotBanner
            message="Perhatikan urutan gambar yang berulang ini, lalu tebak gambar apa yang harus diletakkan pada tanda tanya [ ? ]!"
            mascotEmoji="🧩"
            mascotName="Kiki si Kancil"
          />

          <div className="text-center my-6 max-w-xl mx-auto">
            {/* Pattern Display */}
            <div className="p-4 bg-purple-50 border-2 border-purple-200 rounded-3xl mb-6 shadow-inner">
              <span className="text-xs font-bold text-purple-800 uppercase tracking-wider block mb-3">
                Urutan Pola:
              </span>
              <div className="flex flex-wrap items-center justify-center gap-3">
                {currentPattern.sequence.map((item, idx) => (
                  <div
                    key={idx}
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white border-2 border-purple-300 flex items-center justify-center text-3xl shadow-xs"
                  >
                    {item}
                  </div>
                ))}

                {/* Target question slot */}
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-amber-400 text-amber-950 font-black text-2xl flex items-center justify-center shadow-md animate-bounce">
                  ?
                </div>
              </div>
              <p className="text-xs text-purple-700 font-semibold mt-3">
                💡 {currentPattern.hint}
              </p>
            </div>

            {/* Answer Choices */}
            <div className="flex justify-center gap-4">
              {currentPattern.nextOptions.map((opt, i) => (
                <button
                  key={i}
                  id={`opt-pat-${i}`}
                  disabled={patternAnswered}
                  onClick={() => handlePatternChoice(opt)}
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl text-4xl shadow-md border-2 transition-all cursor-pointer flex items-center justify-center ${
                    patternAnswered && opt === currentPattern.correct
                      ? 'bg-emerald-500 border-emerald-600 scale-110 ring-4 ring-emerald-300'
                      : 'bg-white hover:bg-purple-50 border-purple-300 active:scale-95'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>

            {/* Feedback */}
            {patternFeedback && (
              <div className="mt-5 p-3 rounded-2xl bg-purple-100 text-purple-950 font-bold text-sm sm:text-base border border-purple-300">
                {patternFeedback}
              </div>
            )}

            {patternAnswered && (
              <div className="mt-5">
                <button
                  id="btn-next-pattern"
                  onClick={() => {
                    soundEffects.playClick();
                    setPatternIndex((idx) => idx + 1);
                    setPatternAnswered(false);
                    setPatternFeedback(null);
                  }}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-base shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  <span>Pola Selanjutnya</span>
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
