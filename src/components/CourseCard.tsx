import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink, BookOpen, GraduationCap, PlayCircle, Layers } from 'lucide-react';
import { Course } from '../data/courses';

interface CourseCardProps {
  course: Course;
  onStartQuiz: (course: Course) => void;
}

export function CourseCard({ course, onStartQuiz }: CourseCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      id={`course-card-${course.id}`}
      className="bg-black border border-white/5 rounded-[40px] flex flex-col group transition-all hover:border-cyan-500/30 hover:shadow-[0_0_50px_rgba(34,211,238,0.1)] overflow-hidden h-full min-h-[440px]"
    >
      <div className="p-8 pb-10 flex flex-col gap-7 flex-grow">
        <div className="flex justify-between items-start">
          <div className="px-3 py-1.5 rounded-lg bg-slate-900 border border-white/5 flex items-center gap-2">
            {course.category === 'Coding' && <BookOpen size={12} className="text-cyan-400" />}
            {course.category === 'Blockchain' && <Layers size={12} className="text-indigo-400" />}
            {course.category === 'AI' && <PlayCircle size={12} className="text-yellow-400" />}
            <span className="text-[9px] uppercase tracking-[0.15em] font-bold font-mono text-slate-400">{course.category}</span>
          </div>
          
          <a 
            href={course.link} 
            target="_blank" 
            rel="noreferrer" 
            className="flex flex-col items-end group/link hover:text-cyan-400 transition-colors"
          >
            <span className="text-[10px] text-slate-600 font-mono uppercase tracking-widest flex items-center gap-1 group-hover/link:text-cyan-400">
              Platform <ExternalLink size={10} />
            </span>
            <span className="text-[10px] font-bold text-white font-mono group-hover/link:text-cyan-400">{course.platform}</span>
          </a>
        </div>

        <div>
          <a 
            href={course.link} 
            target="_blank" 
            rel="noreferrer" 
            className="block group/title"
          >
            <h3 className="text-base font-bold text-white mb-2 group-hover/title:text-cyan-400 transition-colors leading-snug">
              {course.title}
            </h3>
          </a>
          <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
            {course.description}
          </p>
        </div>

        <div className="mt-auto grid grid-cols-2 border-t border-white/5 pt-4 gap-4">
          <div className="flex flex-col">
            <span className="text-[9px] text-slate-500 font-mono uppercase tracking-[0.2em] mb-1">Scholarship Grant</span>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-black text-green-400 font-mono leading-none">₹{course.rewardValue.toLocaleString()}</span>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[9px] text-slate-500 font-mono uppercase tracking-[0.2em] mb-1">Proof Type</span>
            <span className="text-[10px] font-bold text-slate-300 uppercase font-mono">Verify Knowledge</span>
          </div>
        </div>
      </div>

      <button 
        id={`verify-btn-${course.id}`}
        onClick={() => onStartQuiz(course)}
        className="w-full bg-slate-900/50 hover:bg-cyan-500 hover:text-black border-t border-white/5 text-white font-bold py-4 text-[10px] uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 group-hover:bg-cyan-500/10 group-hover:text-cyan-400 group-hover:border-cyan-500/30 shrink-0"
      >
        <GraduationCap size={14} />
        Initiate Verification Loop
      </button>
    </motion.div>
  );
}
