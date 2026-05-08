import { motion } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface GravityProgressBarProps {
  progress?: number; // 0 to 100
  impactScore?: number;
  label?: string;
  step?: number; // 0-4 for verification flow
}

export function GravityProgressBar({ progress: p, impactScore = 0, label = "", step }: GravityProgressBarProps) {
  const isStepMode = typeof step === 'number';
  const progress = isStepMode ? (step / 4) * 100 : (p || 0);

  const stepLabels = [
    "Awaiting Verification",
    "Verifier Agent Scoring",
    "Calculating Gravity Shift",
    "Minting Soulbound Reward",
    "Flow Complete"
  ];

  return (
    <div className={cn(
      "w-full h-40 flex flex-col justify-end relative group select-none",
      isStepMode ? "max-w-lg mx-auto" : "max-w-md"
    )}>
      {/* Floating Shadow Effect underneath the bar */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-4/5 h-4 bg-cyan-500/20 blur-xl opacity-50 shrink-0"></div>
      
      {/* The Sub-Labels at the top, closer to header */}
      {!isStepMode && (
        <div className="absolute top-0 left-0 w-full flex justify-between items-start">
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">Module</span>
            <span className="text-sm font-semibold text-white truncate max-w-[180px]">{label}</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">Unlocked Impact</span>
            <span className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-indigo-500 bg-clip-text text-transparent italic">
              ₹{impactScore.toLocaleString()}
            </span>
          </div>
        </div>
      )}

      {/* The Actual Bar (Styled for 'float' look) */}
      <motion.div 
        className="w-full h-12 bg-slate-950 rounded-2xl border border-slate-800 relative overflow-hidden shadow-2xl z-10"
        whileHover={{ y: -5 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <motion.div 
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-600 to-indigo-500 shadow-[0_0_20px_rgba(34,211,238,0.4)]"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          {/* Animated Stripes Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.05)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.05)_50%,rgba(255,255,255,0.05)_75%,transparent_75%,transparent)] bg-[length:20px_20px] animate-[pulse_2s_infinite]" />
        </motion.div>
        
        <div className="absolute inset-0 flex items-center justify-center mix-blend-overlay">
          <span className="text-[10px] font-black text-white tracking-[0.3em] uppercase drop-shadow-md">
            {isStepMode ? stepLabels[step] : `${progress}% Gravity Shift`}
          </span>
        </div>
      </motion.div>

      {/* Gravity Indicator Text underneath */}
      <div className="mt-4 text-center">
        <motion.span 
          className="text-[10px] text-cyan-400 uppercase tracking-widest font-mono bg-cyan-950/30 px-3 py-1 rounded-full border border-cyan-500/20"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {progress >= 100 ? "Escape Velocity Reached" : "Status: Defying Resistance"}
        </motion.span>
      </div>

      {/* Floating Effect for completed bits */}
      {progress > 80 && (
        <motion.div 
          className="absolute -top-12 -right-4 z-20 text-[10px] bg-cyan-500 text-black px-3 py-1 rounded-full font-black shadow-lg uppercase tracking-wider"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: -5, opacity: 1 }}
          transition={{ repeat: Infinity, duration: 2, repeatType: "reverse" }}
        >
          Ascending
        </motion.div>
      )}
    </div>
  );
}
