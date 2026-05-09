/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import DonorDashboard from './components/DonorDashboard';
import { motion, AnimatePresence } from 'motion/react';
import { Users, GraduationCap } from 'lucide-react';
import { GeminiAssistant } from './components/GeminiAssistant';
import CareCompanion from './components/CareCompanion';

export default function App() {
  const [view, setView] = useState<'student' | 'donor'>('student');
  const [treasuryBalance, setTreasuryBalance] = useState(102450);

  const handleDonationTriggered = (amount: number) => {
    setTreasuryBalance(prev => prev + amount);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        {view === 'student' ? (
          <motion.div
            key="student-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full"
          >
            <Dashboard treasuryBalance={treasuryBalance} setTreasuryBalance={setTreasuryBalance} />
          </motion.div>
        ) : (
          <motion.div
            key="donor-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full"
          >
            <DonorDashboard onDonation={handleDonationTriggered} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Persistent Controls Area */}
      <div className="fixed bottom-8 left-8 z-[100] flex items-end gap-3">
        <div className="bg-black/80 backdrop-blur-xl border border-white/10 p-1.5 rounded-2xl flex gap-1 shadow-2xl shadow-black/50 h-fit">
          <button
            onClick={() => setView('student')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
              view === 'student' 
                ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20' 
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <GraduationCap size={14} />
            Student
          </button>
          <button
            onClick={() => setView('donor')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
              view === 'donor' 
                ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20' 
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <Users size={14} />
            Donor
          </button>
        </div>

        {/* AI Assistant Cluster - Only visible in Student mode */}
        {view === 'student' && (
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex items-end gap-3 h-fit"
          >
            <div className="w-80">
              <GeminiAssistant />
            </div>
            <CareCompanion />
          </motion.div>
        )}
      </div>
    </div>
  );
}
