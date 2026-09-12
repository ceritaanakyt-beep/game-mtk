import React, { useRef, useState, useEffect } from 'react';
import { soundEffects } from '../utils/audio';
import { X, Trash2, Eraser, PenTool } from 'lucide-react';

interface ScratchpadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ScratchpadModal: React.FC<ScratchpadModalProps> = ({ isOpen, onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [color, setColor] = useState<string>('#1e3a8a'); // dark blue default
  const [lineWidth, setLineWidth] = useState<number>(4);
  const [isEraser, setIsEraser] = useState<boolean>(false);

  useEffect(() => {
    if (!isOpen) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Adjust canvas resolution to bounding rect
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // White background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, rect.width, rect.height);
  }, [isOpen]);

  if (!isOpen) return null;

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    ctx.beginPath();
    ctx.moveTo(clientX - rect.left, clientY - rect.top);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    ctx.strokeStyle = isEraser ? '#ffffff' : color;
    ctx.lineWidth = isEraser ? lineWidth * 3 : lineWidth;
    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const handleClear = () => {
    soundEffects.playClick();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, rect.width, rect.height);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-3">
      <div className="bg-white rounded-3xl border-2 border-sky-300 shadow-2xl w-full max-w-2xl flex flex-col overflow-hidden max-h-[90vh]">
        {/* Header */}
        <div className="bg-sky-500 text-white px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">📝</span>
            <div>
              <h3 className="font-bold text-base leading-none">Papan Coret & Bantuan Hitung</h3>
              <p className="text-xs text-sky-100 font-medium mt-0.5">
                Gambar lidi, lingkaran, atau tulis angka untuk membantumu berhitung!
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              soundEffects.playClick();
              onClose();
            }}
            className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toolbar */}
        <div className="bg-sky-50 border-b border-sky-200 px-3 py-2 flex flex-wrap items-center justify-between gap-2">
          {/* Colors */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-sky-900 mr-1">Warna:</span>
            {['#1e3a8a', '#dc2626', '#16a34a', '#d97706', '#9333ea'].map((c) => (
              <button
                key={c}
                onClick={() => {
                  setColor(c);
                  setIsEraser(false);
                }}
                className={`w-6 h-6 rounded-full border-2 transition-transform cursor-pointer ${
                  !isEraser && color === c ? 'scale-125 border-sky-600 ring-2 ring-sky-300' : 'border-white'
                }`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>

          {/* Tools */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsEraser(false)}
              className={`p-1.5 rounded-lg border text-xs font-bold flex items-center gap-1 cursor-pointer ${
                !isEraser ? 'bg-sky-600 text-white border-sky-700' : 'bg-white text-slate-700 border-slate-200'
              }`}
            >
              <PenTool className="w-3.5 h-3.5" />
              <span>Pensil</span>
            </button>
            <button
              onClick={() => setIsEraser(true)}
              className={`p-1.5 rounded-lg border text-xs font-bold flex items-center gap-1 cursor-pointer ${
                isEraser ? 'bg-sky-600 text-white border-sky-700' : 'bg-white text-slate-700 border-slate-200'
              }`}
            >
              <Eraser className="w-3.5 h-3.5" />
              <span>Penghapus</span>
            </button>
            <button
              onClick={handleClear}
              className="p-1.5 rounded-lg border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold flex items-center gap-1 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Bersihkan</span>
            </button>
          </div>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 min-h-[300px] sm:min-h-[380px] bg-white relative touch-none">
          <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
            className="w-full h-full cursor-crosshair block"
          />
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex justify-between items-center text-xs text-slate-600">
          <span>Sentuh layar atau gunakan mouse untuk mencoret</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-xl cursor-pointer"
          >
            Tutup Papan
          </button>
        </div>
      </div>
    </div>
  );
};
