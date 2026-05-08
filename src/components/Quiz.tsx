import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, XCircle, ChevronRight, Award, Trophy } from 'lucide-react';
import { Course, Question } from '../data/courses';

interface QuizProps {
  course: Course;
  onComplete: (scorePercentage: number) => void;
  onClose: () => void;
}

export function Quiz({ course, onComplete, onClose }: QuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = course.questions[currentQuestionIndex];

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...answers, optionIndex];
    setAnswers(newAnswers);

    if (currentQuestionIndex < course.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsFinished(true);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    answers.forEach((answer, index) => {
      if (answer === course.questions[index].correctAnswer) {
        correct++;
      }
    });
    return Math.round((correct / course.questions.length) * 100);
  };

  if (isFinished) {
    const score = calculateScore();
    const passed = score >= 80;

    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-slate-900/80 backdrop-blur-2xl p-10 rounded-3xl border border-cyan-500/30 text-center max-w-lg mx-auto"
      >
        <div className="flex justify-center mb-6">
          {passed ? (
            <div className="w-20 h-20 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(34,197,94,0.3)]">
              <Trophy size={40} />
            </div>
          ) : (
            <div className="w-20 h-20 bg-red-500/20 text-red-400 rounded-full flex items-center justify-center">
              <Award size={40} />
            </div>
          )}
        </div>

        <h2 className="text-3xl font-bold text-white mb-2">Quiz Complete!</h2>
        <p className="text-slate-400 mb-6">Course: {course.title}</p>

        <div className="bg-slate-950 p-6 rounded-2xl border border-white/5 mb-8">
          <p className="text-xs text-slate-500 uppercase tracking-widest font-mono mb-2">Final Proof-of-Effort Score</p>
          <p className={`text-5xl font-black ${passed ? 'text-cyan-400' : 'text-yellow-500'}`}>
            {score}%
          </p>
          <div className="mt-4 flex gap-1 justify-center">
            {course.questions.map((_, i) => (
              <div 
                key={i} 
                className={`w-2 h-2 rounded-full ${answers[i] === course.questions[i].correctAnswer ? 'bg-green-500' : 'bg-red-500'}`} 
              />
            ))}
          </div>
        </div>

        {passed ? (
          <div className="space-y-4">
            <p className="text-green-400 font-medium">Gravity Shift Threshold Exceeded! Proof of Effort Validated.</p>
            <button 
              onClick={() => onComplete(score)}
              className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-4 rounded-xl shadow-lg transition-all"
            >
              Initiate On-Chain Release
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-yellow-400 font-medium">Effort insufficient for fund release (Min 80%). Try again?</p>
            <button 
              onClick={onClose}
              className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-4 rounded-xl transition-all"
            >
              Back to Courses
            </button>
          </div>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-900/80 backdrop-blur-2xl p-8 rounded-3xl border border-white/10 max-w-2xl mx-auto shadow-2xl"
    >
      <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
        <div>
          <p className="text-xs text-cyan-400 font-mono uppercase tracking-widest">Question {currentQuestionIndex + 1} of {course.questions.length}</p>
          <h3 className="text-lg font-semibold text-white">{course.title} Verification</h3>
        </div>
        <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
          <XCircle size={20} />
        </button>
      </div>

      <div className="mb-10">
        <h4 className="text-xl text-slate-100 font-medium leading-relaxed">{currentQuestion.text}</h4>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {currentQuestion.options.map((option, i) => (
          <motion.button
            key={i}
            whileHover={{ x: 5, backgroundColor: "rgba(255,255,255,0.05)" }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleAnswer(i)}
            className="flex items-center justify-between p-5 bg-slate-950 border border-white/10 rounded-2xl text-left text-slate-300 hover:text-cyan-400 hover:border-cyan-500/30 transition-all group"
          >
            <span className="font-medium">{option}</span>
            <ChevronRight size={18} className="text-slate-600 group-hover:text-cyan-400" />
          </motion.button>
        ))}
      </div>

      <div className="mt-10 h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-cyan-500 shadow-[0_0_10px_rgba(34,211,238,0.5)]"
          initial={{ width: 0 }}
          animate={{ width: `${(currentQuestionIndex / course.questions.length) * 100}%` }}
        />
      </div>
    </motion.div>
  );
}
