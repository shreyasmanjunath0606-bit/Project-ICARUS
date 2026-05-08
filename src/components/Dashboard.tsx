import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GravityProgressBar } from './GravityProgressBar';
import { Shield, Zap, Target, Database, Loader2, CheckCircle2, GraduationCap, X, Trophy, Plus, Globe, Search, Sparkles, ChevronRight, User } from 'lucide-react';
import { courses as initialCourses, Course } from '../data/courses';
import { CourseCard } from './CourseCard';
import { Quiz } from './Quiz';
import { GeminiAssistant } from './GeminiAssistant';
import { extractCourseFromWeb, suggestCurriculumByBudget } from '../services/geminiService';

type AgeRange = "4-7" | "8-12" | "13-18";

export default function Dashboard() {
  const [selectedAgeRange, setSelectedAgeRange] = useState<AgeRange>("8-12");
  const [activeCourses, setActiveCourses] = useState<Course[]>(initialCourses);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [importUrl, setImportUrl] = useState('');
  const [importStatus, setImportStatus] = useState<'idle' | 'fetching' | 'extracting' | 'done' | 'error'>('idle');
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [step, setStep] = useState(0); 
  const [logs, setLogs] = useState<string[]>([]);
  const [activeCourse, setActiveCourse] = useState<Course | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [impactScore, setImpactScore] = useState(2450);
  const [treasuryBalance, setTreasuryBalance] = useState(102450);

  const filteredCourses = activeCourses.filter(c => c.ageRange === selectedAgeRange);

  const addLog = (msg: string) => setLogs(prev => [...prev, `${msg}`].slice(-10));

  const handleSelectAge = (range: AgeRange) => {
    setSelectedAgeRange(range);
    addLog(`Filter Applied: Vanguard Age Group ${range}.`);
  };

  const handleSuggestAICourse = async () => {
    if (!selectedAgeRange) return;
    setIsSuggesting(true);
    addLog(`AI Agent: Analyzing Treasury (₹${treasuryBalance.toLocaleString()}) for optimization...`);

    try {
      const suggestedData = await suggestCurriculumByBudget(treasuryBalance, selectedAgeRange);
      const newCourse: Course = {
        ...suggestedData,
        id: `ai-${Date.now()}`,
        link: "#",
        ageRange: selectedAgeRange
      };

      setActiveCourses(prev => [newCourse, ...prev]);
      addLog(`AI Allocation: Generated module "${newCourse.title}" @ ₹${newCourse.rewardValue.toLocaleString()}`);
    } catch (error) {
      addLog("AI Allocation: Analysis failed. Check connection.");
    } finally {
      setIsSuggesting(false);
    }
  };

  const handleStartQuiz = (course: Course) => {
    setActiveCourse(course);
    setShowQuiz(true);
  };

  const handleQuizComplete = async (score: number) => {
    setShowQuiz(false);
    if (score < 80) {
      addLog(`Validation Failed: Quality score ${score}% below 80% threshold.`);
      return;
    }

    setIsVerifying(true);
    setStep(1);
    addLog("Initiating Verifier Agent: Scoring submission...");

    // Simulate blockchain verification
    await new Promise(r => setTimeout(r, 1500));
    setStep(2);
    addLog("Integrity Check: Quality verified. Calculating Gravity Shift...");

    const response = await fetch('/api/verify-milestone', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        learnerId: "L-9402", 
        moduleId: activeCourse?.id, 
        qualityScore: score,
        rewardValue: activeCourse?.rewardValue 
      })
    });
    const data = await response.json();
    addLog(`Vault Release TXID: ${data.txHash.slice(0, 16)}...`);
    
    await new Promise(r => setTimeout(r, 1500));
    setStep(3);
    addLog("Proof-of-Effort verified. Minting Achievement SBT...");

    await new Promise(r => setTimeout(r, 1500));

    setStep(4);
    setIsVerifying(false);
    const reward = activeCourse?.rewardValue || 0;
    setImpactScore(prev => prev + 50);
    setTreasuryBalance(prev => prev - reward);
    addLog(`Gravity Shift Complete. ₹${reward.toLocaleString()} released from Vault.`);
    
    setTimeout(() => {
      setStep(0);
      setActiveCourse(null);
    }, 5000);
  };

  const handleConnectDID = async () => {
    setIsConnecting(true);
    addLog("Initiating Secure DID Handshake...");
    
    await new Promise(r => setTimeout(r, 800));
    addLog("Requesting Proof-of-Key signature from Antigravity L1...");
    
    await new Promise(r => setTimeout(r, 1200));
    setIsConnected(true);
    setIsConnecting(false);
    setShowConnectModal(false);
    addLog("Identity Linked: Vanguard Learner #9402. Permissions escalated.");
  };

  const handleImportCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!importUrl || !selectedAgeRange) return;

    setImportStatus('fetching');
    setErrorMessage('');
    addLog(`Initiating web retrieval for: ${importUrl}`);

    try {
      const fetchResponse = await fetch(`/api/fetch-url?url=${encodeURIComponent(importUrl)}`);
      if (!fetchResponse.ok) throw new Error("Could not access the provided URL.");
      const { content } = await fetchResponse.json();

      setImportStatus('extracting');
      addLog("Agentic Extraction: Analyzing curriculum structure...");

      const newCourseData = await extractCourseFromWeb(importUrl, content);
      
      const newCourse: Course = {
        ...newCourseData,
        id: `custom-${Date.now()}`,
        link: importUrl,
        ageRange: selectedAgeRange
      };

      setActiveCourses(prev => [newCourse, ...prev]);
      setImportStatus('done');
      addLog(`Course Secured: ${newCourse.title}. ${newCourse.questions.length} validation checkpoints active.`);
      
      setTimeout(() => {
        setIsImporting(false);
        setImportStatus('idle');
        setImportUrl('');
      }, 2000);

    } catch (error) {
      console.error(error);
      setImportStatus('error');
      setErrorMessage(error instanceof Error ? error.message : "Failed to import course.");
      addLog("Critical Failure: Course extraction aborted.");
    }
  };

  return (
    <div className="h-screen bg-[#020617] text-slate-200 flex flex-col font-sans overflow-hidden border border-slate-800">
      {/* DID Connection Modal */}
      <AnimatePresence>
        {showConnectModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-full max-w-sm bg-slate-900 border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-indigo-600"></div>
              
              <div className="flex flex-col items-center text-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 flex items-center justify-center p-3">
                  <Shield size={40} className="text-cyan-400" />
                </div>
                
                <div>
                  <h2 className="text-xl font-bold text-white mb-2">Connect Your Identity</h2>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Link your Antigravity Decentralized Identifier (DID) to unlock <span className="text-cyan-400">Proof-of-Effort</span> verification and Soulbound Token rewards.
                  </p>
                </div>

                <div className="w-full space-y-3">
                  <button 
                    onClick={handleConnectDID}
                    className="w-full py-3 bg-gradient-to-r from-cyan-600 to-indigo-600 rounded-xl font-bold text-white shadow-lg hover:shadow-cyan-500/20 transition-all active:scale-95"
                  >
                    Authorize Icarus Vault
                  </button>
                  <button 
                    onClick={() => setShowConnectModal(false)}
                    className="w-full py-3 bg-slate-800 rounded-xl text-xs font-semibold text-slate-400 hover:bg-slate-750 transition-colors"
                  >
                    Stay Anonymous
                  </button>
                </div>

                <div className="flex items-center gap-2 text-[10px] text-slate-600 font-mono">
                  <Zap size={10} />
                  ZERO-KNOWLEDGE PROOF ENABLED
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <nav className="h-16 border-b border-white/5 bg-slate-950/80 backdrop-blur-xl flex items-center justify-between px-8 flex-shrink-0 relative z-20">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-black border border-white/10 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.1)]">
            <Zap size={20} className="text-cyan-400" />
          </div>
          <div>
            <h1 className="text-sm font-black tracking-[0.2em] text-white uppercase leading-none">Project <span className="text-cyan-400">Icarus</span></h1>
            <p className="text-[9px] text-slate-500 font-mono tracking-widest mt-1 uppercase">Decentralized Vault v2.0</p>
          </div>
        </div>
        
        <div className="flex items-center gap-10">
          <div className="flex gap-8">
            <div className="flex flex-col items-end">
              <span className="text-[9px] text-slate-500 font-mono uppercase tracking-widest">Protocol Status</span>
              <span className="text-[10px] font-bold text-green-500 flex items-center gap-1.5 uppercase tracking-wider">
                <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse"></div>
                Active Sync
              </span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-[9px] text-slate-500 font-mono uppercase tracking-widest">Shard ID</span>
              <span className="text-[10px] font-bold text-white font-mono uppercase tracking-wider">AG-9402-DELTA</span>
            </div>
          </div>

          <div className="h-8 w-[px] bg-white/5"></div>
          
          <button 
            onClick={() => isConnected ? null : setShowConnectModal(true)}
            disabled={isConnecting}
            className={`px-5 py-2 border rounded-xl text-[10px] font-black transition-all flex items-center gap-2 tracking-[0.1em] uppercase ${
              isConnected 
                ? "bg-green-500/10 border-green-500/30 text-green-400" 
                : "bg-cyan-500/10 border-cyan-500/30 text-cyan-400 hover:bg-cyan-500 hover:text-black shadow-lg shadow-cyan-900/10"
            }`}
          >
            {isConnecting ? (
              <>
                <Loader2 size={12} className="animate-spin" />
                VERIFYING...
              </>
            ) : isConnected ? (
              <>
                <Shield size={12} />
                SECURE IDENTITY
              </>
            ) : (
              "Connect DID"
            )}
          </button>
        </div>
      </nav>

      <main className="flex-grow flex overflow-hidden">
        {/* Core Dashboard Area */}
        <div className="flex-grow flex flex-col overflow-hidden relative">
          
          {/* Subheader: Filtering & Actions */}
          <div className="px-8 py-5 border-b border-white/5 bg-slate-900/10 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-6">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-500 tracking-[0.2em] uppercase mb-2">Vanguard Target</span>
                <div className="flex p-1 bg-black border border-white/10 rounded-xl">
                  {(["4-7", "8-12", "13-18"] as AgeRange[]).map((range) => (
                    <button
                      key={range}
                      onClick={() => handleSelectAge(range)}
                      className={`px-6 py-1.5 rounded-lg text-[10px] font-bold transition-all ${
                        selectedAgeRange === range 
                          ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(34,211,238,0.3)]' 
                          : 'text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      AGES {range}
                    </button>
                  ))}
                </div>
              </div>

              <div className="h-10 w-[1px] bg-white/5"></div>

              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-500 tracking-[0.2em] uppercase mb-2">Registry Stats</span>
                <div className="flex gap-4 items-baseline">
                  <span className="text-xl font-bold text-white font-mono">{filteredCourses.length}</span>
                  <span className="text-[10px] text-slate-500 uppercase">Available Modules</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button 
                onClick={handleSuggestAICourse}
                disabled={isSuggesting}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-500/10 text-indigo-400 text-xs font-bold rounded-xl border border-indigo-500/20 hover:bg-indigo-500/20 transition-all disabled:opacity-50"
              >
                {isSuggesting ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}
                {isSuggesting ? "AI ALLOCATING..." : "AI SUGGEST"}
              </button>
              <button 
                onClick={() => setIsImporting(true)}
                className="flex items-center gap-2 px-4 py-2 bg-cyan-500/10 text-cyan-400 text-xs font-bold rounded-xl border border-cyan-500/20 hover:bg-cyan-500/20 transition-all group"
              >
                <Plus size={14} className="group-hover:rotate-90 transition-transform" />
                IMPORT WEB
              </button>
            </div>
          </div>

          <div className="flex-grow flex flex-col p-8 overflow-hidden">
            {/* Import Course Overlay */}
            <AnimatePresence>
              {isImporting && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.98, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98, y: -10 }}
                  className="mb-8 p-6 bg-slate-900 border border-cyan-500/30 rounded-3xl backdrop-blur-xl shadow-2xl relative overflow-hidden shrink-0"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500/50 to-transparent"></div>
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                        <Globe size={20} className="text-cyan-400" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-white">Import Learning Module</h3>
                        <p className="text-[10px] text-slate-500 uppercase font-mono tracking-widest mt-0.5">Automated Neural Extraction</p>
                      </div>
                    </div>
                    <button onClick={() => setIsImporting(false)} className="text-slate-500 hover:text-white transition-colors">
                      <X size={20} />
                    </button>
                  </div>

                  <form onSubmit={handleImportCourse} className="space-y-4">
                    <div className="relative">
                      <Globe size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                      <input 
                        type="url" 
                        placeholder="Neural endpoint URL (YouTube, Edube, Khan Academy...)" 
                        className="w-full bg-black border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:border-cyan-500 outline-none transition-colors font-mono placeholder:text-slate-700"
                        value={importUrl}
                        onChange={(e) => setImportUrl(e.target.value)}
                        required
                        disabled={importStatus !== 'idle' && importStatus !== 'error'}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {importStatus === 'fetching' && (
                          <div className="flex items-center gap-2 text-[10px] text-cyan-400 font-mono">
                            <Loader2 size={14} className="animate-spin" />
                            [1/2] PROXYING DATA STREAM...
                          </div>
                        )}
                        {importStatus === 'extracting' && (
                          <div className="flex items-center gap-2 text-[10px] text-indigo-400 font-mono">
                            <Zap size={14} className="animate-pulse" />
                            [2/2] AGENTIC NEURAL MAPPING...
                          </div>
                        )}
                        {importStatus === 'done' && (
                          <div className="flex items-center gap-2 text-[10px] text-green-400 font-mono uppercase bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20">
                            <CheckCircle2 size={12} />
                            Success: Hash Committed to Registry
                          </div>
                        )}
                        {importStatus === 'error' && (
                          <div className="flex items-center gap-2 text-[10px] text-red-400 font-mono">
                            <X size={14} />
                            ERROR: {errorMessage}
                          </div>
                        )}
                      </div>

                      <button 
                        type="submit"
                        disabled={importStatus !== 'idle' && importStatus !== 'error'}
                        className="px-8 py-3 bg-gradient-to-r from-cyan-600 to-indigo-600 rounded-xl text-xs font-bold text-white shadow-xl shadow-cyan-900/20 disabled:opacity-50 flex items-center gap-3 active:scale-95 transition-all"
                      >
                        {importStatus === 'idle' || importStatus === 'error' ? (
                          <>
                            <Search size={16} />
                            EXTRACT BRAIN DATA
                          </>
                        ) : (
                          <>
                            <Loader2 size={16} className="animate-spin" />
                            NEURAL SYNC
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Course Grid with Scroll */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 overflow-y-auto pr-2 pb-32 custom-scrollbar flex-grow content-start">
              {filteredCourses.map(course => (
                <CourseCard 
                  key={course.id} 
                  course={course} 
                  onStartQuiz={handleStartQuiz}
                />
              ))}
              {filteredCourses.length === 0 && (
                <div className="col-span-full py-32 text-center border-2 border-dashed border-white/5 rounded-[40px] flex flex-col items-center justify-center bg-slate-900/10">
                  <div className="w-20 h-20 rounded-full bg-slate-800/50 flex items-center justify-center mb-6">
                    <User size={32} className="text-slate-600" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">No Modules Identified</h3>
                  <p className="text-slate-500 text-sm max-w-sm mx-auto mb-8">The registry is currently empty for this age range. Use the AI Allocator to generate optimized learning paths.</p>
                  <button 
                    onClick={handleSuggestAICourse}
                    className="px-6 py-3 bg-cyan-500/10 text-cyan-400 text-xs font-bold rounded-xl border border-cyan-500/20 hover:bg-cyan-500/20 transition-all flex items-center gap-2"
                  >
                    <Sparkles size={16} />
                    INITIALIZE AI SUGGEST
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Sidebar: Real-time Stats & Audit Logs */}
        <aside className="w-80 border-l border-white/5 bg-slate-900/10 backdrop-blur-sm flex flex-col relative z-10 shrink-0">
          
          <div className="p-6 space-y-8 flex-grow">
            {/* Treasury Module */}
            <div className="space-y-4">
              <h3 className="text-[10px] font-black text-slate-500 tracking-[0.2em] uppercase">Core Vault</h3>
              <div className="bg-black border border-white/10 rounded-2xl p-5 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2 opacity-10">
                  <Database size={40} className="text-cyan-500" />
                </div>
                <p className="text-[9px] text-slate-500 uppercase font-mono tracking-widest mb-1">Treasury Balance</p>
                <p className="text-2xl font-bold font-mono text-green-400 tracking-tighter">
                  ₹{treasuryBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </p>
                <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[9px] text-slate-600 font-mono uppercase tracking-widest">Status</span>
                  <span className="text-[9px] font-bold text-cyan-500 font-mono uppercase">LOCKED SECURE</span>
                </div>
              </div>
            </div>

            {/* Impact Module */}
            <div className="space-y-4">
              <h3 className="text-[10px] font-black text-slate-500 tracking-[0.2em] uppercase">Meta Progression</h3>
              <div className="bg-black border border-white/10 rounded-2xl p-5 shadow-2xl relative overflow-hidden group">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                    <Target size={20} className="text-cyan-400" />
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[9px] text-slate-500 uppercase font-mono tracking-widest">Global Rank</span>
                    <span className="text-xl font-bold font-mono text-white tracking-tighter italic">VANGUARD #4</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-end text-[10px] font-mono uppercase">
                    <span className="text-slate-500">Cumulative Impact</span>
                    <span className="text-white font-bold">{impactScore.toLocaleString()} XP</span>
                  </div>
                  <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "65%" }}
                      className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Audit Chain Module */}
            <div className="flex flex-col h-[300px]">
              <h3 className="text-[10px] font-black text-slate-500 tracking-[0.2em] uppercase mb-4 flex justify-between items-center">
                <span>Audit Chain</span>
                <span className="text-[9px] font-mono text-green-500 lowercase opacity-50">live streaming</span>
              </h3>
              <div className="flex-grow bg-black rounded-2xl border border-white/10 p-5 font-mono text-[10px] text-slate-400 overflow-y-auto custom-scrollbar flex flex-col gap-3 bg-[radial-gradient(circle_at_bottom_right,rgba(34,211,238,0.03),transparent)]">
                {[...logs].reverse().map((log, i) => (
                  <motion.div 
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    key={i} 
                    className={`flex gap-3 leading-relaxed ${i === 0 ? 'text-cyan-200' : 'text-slate-500'}`}
                  >
                    <span className="text-slate-700 shrink-0 select-none">[{new Date().toLocaleTimeString([], { hour12: false })}]</span>
                    <span>{log}</span>
                  </motion.div>
                ))}
                {logs.length === 0 && <div className="italic text-slate-700 font-mono text-center mt-20">[ CONNECTION_IDLE ]</div>}
              </div>
            </div>
          </div>

          {/* Social Proof SBTs - Fixed Bottom */}
          <div className="p-6 border-t border-white/5 bg-black/20 shrink-0">
            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-5">Authenticated SBTs</h4>
            <div className="flex gap-3">
              {[
                { title: "Python Foundations", icon: <Shield size={18} />, color: "text-indigo-400", bg: "bg-indigo-500/10" },
                { title: "Web Mastery", icon: <Zap size={18} />, color: "text-cyan-400", bg: "bg-cyan-500/10" },
                { title: "Blockchain Expert", icon: <Database size={18} />, color: "text-slate-600", bg: "bg-slate-800/30" }
              ].map((sbt, i) => (
                <div 
                  key={i}
                  className={`w-12 h-12 rounded-xl ${sbt.bg} border border-white/5 flex items-center justify-center grayscale hover:grayscale-0 hover:border-cyan-500/30 transition-all cursor-help relative group/sbt`}
                >
                  <div className={`${sbt.color}`}>
                    {sbt.icon}
                  </div>
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black border border-white/20 rounded text-[9px] text-white uppercase font-black whitespace-nowrap opacity-0 group-hover/sbt:opacity-100 transition-opacity pointer-events-none z-50">
                    {sbt.title}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </main>

      {/* Verification Overlay */}
      <AnimatePresence>
        {isVerifying && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#020617]/90 backdrop-blur-sm p-4"
          >
            <div className="w-full max-w-lg">
              <div className="text-center mb-12">
                <p className="text-cyan-400 font-mono text-sm mb-2 tracking-widest uppercase">Verification Active</p>
                <h2 className="text-4xl font-bold italic text-white">Gravity Shift Processing</h2>
              </div>
              
              <GravityProgressBar step={step} />
              
              <div className="mt-12 text-center">
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5">
                  <Loader2 size={16} className="animate-spin text-cyan-400" />
                  <span className="text-[10px] font-mono text-slate-300">SECURE BLOCKCHAIN COMMIT IN PROGRESS...</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quiz Modal */}
      {showQuiz && activeCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
          <Quiz 
            course={activeCourse} 
            onClose={() => setShowQuiz(false)} 
            onComplete={handleQuizComplete} 
          />
        </div>
      )}

    </div>
  );
}
