import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { MdDraw } from 'react-icons/md';
import { FaCheckCircle, FaPen, FaRedo } from 'react-icons/fa';

const spring = { type: 'spring', stiffness: 400, damping: 30 } as const;

interface DrawSignatureComponentProps {
  startLabel?: string;
  finishLabel?: string;
  doneLabel?: string;
  defaultStep?: 'idle' | 'drawing' | 'done';
  onFinish?: (canvas: HTMLCanvasElement | null) => void;
  onClear?: () => void;
  onStepChange?: (step: 'idle' | 'drawing' | 'done') => void;
}

export const DrawSignatureComponent: React.FC<DrawSignatureComponentProps> = ({
  startLabel = 'Start Signing',
  finishLabel = 'Finish Signing',
  doneLabel = 'Signing Done',
  defaultStep = 'idle',
  onFinish,
  onClear,
  onStepChange,
}) => {
  const [step, setStep] = useState<'idle' | 'drawing' | 'done'>(defaultStep);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    onStepChange?.(step);
  }, [step]);

  useEffect(() => {
    if (step === 'drawing' && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.strokeStyle = '#1c1c1c';
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
      }
    }
  }, [step]);

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const ctx = canvasRef.current?.getContext('2d');
    ctx?.beginPath();
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = ('touches' in e ? e.touches[0].clientX : e.clientX) - rect.left;
    const y = ('touches' in e ? e.touches[0].clientY : e.clientY) - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (canvas && ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    onClear?.();
  };

  const finishSigning = () => {
    setStep('done');
    onFinish?.(canvasRef.current);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#fefefe] p-4">
      <AnimatePresence mode="popLayout">
        {step === 'idle' && (
          <motion.button
            key="start"
            layoutId="container"
            onClick={() => setStep('drawing')}
            className="flex items-center gap-2 px-6 py-4 bg-[#F4F4F9] rounded-full text-[#2A2A2C] font-bold text-lg hover:bg-[#efeff4] transition-colors duration-200"
            transition={spring}
          >
            <MdDraw size={24} />
            <span>{startLabel}</span>
          </motion.button>
        )}

        {step === 'drawing' && (
          <motion.div
            key="pad"
            layoutId="container"
            className="w-full max-w-[320px] bg-white border-4 border-dashed border-[#E6E6ED] rounded-[34px] p-6 pb-4  relative overflow-hidden"
            transition={spring}
          >
            <div className="flex justify-between items-center mb-6">
              <button title="redo" onClick={clearCanvas} className=" text-[#AFAEB8] hover:text-[#bcbbc5] transition-colors">
                <FaRedo size={22} strokeWidth={2.5} />
              </button>
              <span className="text-[#87878C] font-bold text-[18px]">Sign</span>
              <button title="close" onClick={() => setStep('idle')} className="w-7 h-7 flex items-center justify-center bg-[#B0B0B7] hover:bg-[#a6a6ac] rounded-full text-[#fefefe]">
                <X size={20} strokeWidth={2.5} />
              </button>
            </div>

            <canvas
              ref={canvasRef}
              width={290}
              height={200}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
              className="w-full h-[200px] touch-none"
              style={{
                cursor: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" fill="black" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>') 0 22, auto`
              }}
            />

            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={finishSigning}
              className="w-full mt-6 bg-[#F4F4F9] flex items-center justify-center gap-2 py-4 rounded-3xl font-bold text-[#2A2A2C] text-lg hover:bg-[#efeff4] shadow-sm transition-colors duration-200"
            >
              <MdDraw size={28} />
              {finishLabel}
            </motion.button>
          </motion.div>
        )}

        {step === 'done' && (
          <motion.div key="done" className="flex items-center gap-3">
            <motion.div
              layoutId="container"
              className="flex items-center gap-2 px-6 py-4 bg-[#262629] rounded-full text-white font-bold text-lg"
              transition={spring}
            >
              <FaCheckCircle size={24} fill="white" className="text-[#262629]" />
              <span>{doneLabel}</span>
            </motion.div>

            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={() => setStep('drawing')}
              className="p-4 bg-gray-100 rounded-full text-[#2A2A2C] hover:bg-gray-200 transition-colors"
            >
              <FaPen size={22} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
