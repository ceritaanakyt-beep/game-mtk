import React from 'react';
import { Volume2 } from 'lucide-react';
import { speakIndonesian, soundEffects } from '../utils/audio';

interface MascotBannerProps {
  message: string;
  submessage?: string;
  mascotEmoji?: string;
  mascotName?: string;
}

export const MascotBanner: React.FC<MascotBannerProps> = ({
  message,
  submessage,
  mascotEmoji = '🦊',
  mascotName = 'Kiki si Kancil Pintar'
}) => {
  const handleSpeak = () => {
    soundEffects.playClick();
    const fullText = submessage ? `${message}. ${submessage}` : message;
    speakIndonesian(fullText);
  };

  return (
    <div className="bg-gradient-to-r from-amber-100 via-orange-50 to-yellow-100 border-2 border-amber-300/80 rounded-2xl p-3 sm:p-4 shadow-xs flex items-center gap-3 sm:gap-4 my-3">
      {/* Mascot Avatar with soft pulse */}
      <div 
        className="text-4xl sm:text-5xl shrink-0 cursor-pointer hover:scale-110 transition-transform active:rotate-12 select-none"
        onClick={handleSpeak}
        title="Klik Kiki untuk bicara!"
      >
        <span className="inline-block animate-soft-bounce">{mascotEmoji}</span>
      </div>

      {/* Speech Bubble */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="text-xs font-black uppercase tracking-wider text-amber-800">
            {mascotName}
          </span>
          <button
            onClick={handleSpeak}
            className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 hover:text-amber-900 bg-amber-200/70 hover:bg-amber-300 px-2 py-0.5 rounded-full transition-colors cursor-pointer"
            title="Dengarkan suara instruksi"
          >
            <Volume2 className="w-3 h-3" />
            <span>Dengarkan</span>
          </button>
        </div>
        <p className="text-sm sm:text-base font-bold text-amber-950 leading-snug">
          "{message}"
        </p>
        {submessage && (
          <p className="text-xs sm:text-sm text-amber-800 font-medium mt-0.5">
            {submessage}
          </p>
        )}
      </div>
    </div>
  );
};
