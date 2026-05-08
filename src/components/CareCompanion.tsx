import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mic, MicOff, Heart, X, Sparkles, Volume2, VolumeX, MessageSquareText } from 'lucide-react';
import { getComfortingResponse } from '../services/geminiService';
import { speak } from '../services/elevenlabsService';

interface Message {
  role: 'user' | 'assistant';
  text: string;
}

export default function CareCompanion() {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentText, setCurrentText] = useState('');
  const [audioEnabled, setAudioEnabled] = useState(true);

  const recognitionRef = useRef<any>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0])
          .map((result: any) => result.transcript)
          .join('');
        
        setCurrentText(transcript);
        
        if (event.results[0].isFinal) {
          handleUserMessage(transcript);
        }
      };

      recognitionRef.current.onstart = () => {
        // Unlock audio on start of interaction
        if (audioRef.current) {
          audioRef.current.load();
        }
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
      };
    }
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, currentText]);

  const toggleListening = () => {
    // Prime the audio on first interaction to unlock browser audio
    if (!audioRef.current) {
      const silentAudio = new Audio();
      silentAudio.play().catch(() => {}); // Play and catch to unlock
      audioRef.current = silentAudio;
    }

    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
        setIsSpeaking(false);
      }
      setIsListening(true);
      setCurrentText('');
      recognitionRef.current?.start();
    }
  };

  const handleUserMessage = async (text: string) => {
    if (!text.trim()) return;
    
    const userMsg: Message = { role: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setIsProcessing(true);
    setCurrentText('');

    try {
      const response = await getComfortingResponse(text);
      const assistantMsg: Message = { role: 'assistant', text: response || "I'm here for you." };
      setMessages(prev => [...prev, assistantMsg]);
      
      if (audioEnabled && response) {
        setIsSpeaking(true);
        try {
          const audio = await speak(response);
          audioRef.current = audio;
          audio.onended = () => setIsSpeaking(false);
          await audio.play();
        } catch (playError) {
          console.error('Audio playback failed:', playError);
          setIsSpeaking(false);
        }
      }
    } catch (error: any) {
      console.error('Companion processing error', error);
      const errorMessage = error.message?.includes('not configured') 
        ? "I need a special key to talk! Please ask the grown-up to check my settings."
        : "I'm having a little trouble connecting right now, but I still care about you.";
      
      setMessages(prev => [...prev, { role: 'assistant', text: errorMessage }]);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="relative w-14 h-14 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center shadow-xl shadow-pink-500/20 z-[110] border-2 border-white/20 shrink-0"
      >
        <span className="absolute -top-2 -right-2 bg-white text-pink-500 text-[8px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-tighter animate-bounce shadow-sm">
          Safe
        </span>
        <Heart className="text-white fill-white/20" size={24} />
      </motion.button>

      {/* Main Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-28 left-8 w-[400px] h-[550px] bg-[#0f172a]/95 backdrop-blur-2xl border border-white/10 rounded-[48px] shadow-2xl z-[120] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-8 pb-4 flex justify-between items-center bg-gradient-to-b from-pink-500/10 to-transparent">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-pink-500 rounded-2xl flex items-center justify-center shadow-lg shadow-pink-500/30">
                  <Heart className="text-white fill-white/20" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white tracking-widest uppercase">Aura</h3>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-[10px] text-slate-400 font-mono uppercase tracking-[0.2em]">Emotional Guardian</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setAudioEnabled(!audioEnabled)}
                  className="p-3 bg-white/5 rounded-2xl text-slate-400 hover:text-white transition-colors"
                >
                  {audioEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-3 bg-white/5 rounded-2xl text-slate-400 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Chat Area */}
            <div 
              ref={scrollRef}
              className="flex-grow overflow-y-auto px-8 py-4 space-y-6 custom-scrollbar"
            >
              {messages.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-center px-4 gap-6">
                  <div className="w-20 h-20 bg-pink-500/10 rounded-full flex items-center justify-center relative">
                    <Sparkles className="text-pink-400 animate-pulse" size={40} />
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1] }} 
                      transition={{ repeat: Infinity, duration: 3 }}
                      className="absolute inset-0 border-2 border-pink-500/20 rounded-full"
                    />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-2">"Hi there! I'm Aura."</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      I'm your safe place to talk about anything. Whether you're happy, sad, or just want to tell a story, I'm here to listen.
                    </p>
                  </div>
                  <div className="flex flex-wrap justify-center gap-2">
                    {['I feel a bit sad', "I'm happy today!", "Tell me a joke"].map((hint) => (
                      <button 
                        key={hint}
                        onClick={() => handleUserMessage(hint)}
                        className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs text-slate-300 hover:bg-pink-500/20 hover:border-pink-500/30 transition-all"
                      >
                        {hint}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] p-5 rounded-3xl text-sm leading-relaxed ${
                    m.role === 'user' 
                      ? 'bg-slate-800 text-slate-200 rounded-tr-none' 
                      : 'bg-pink-500/10 border border-pink-500/20 text-slate-100 rounded-tl-none font-medium'
                  }`}>
                    {m.text}
                  </div>
                </motion.div>
              ))}

              {isProcessing && (
                <div className="flex justify-start">
                  <div className="bg-white/5 rounded-3xl rounded-tl-none p-5 flex items-center gap-3">
                    <div className="flex gap-1">
                      {[0, 1, 2].map(d => (
                        <motion.div 
                          key={d}
                          animate={{ y: [0, -5, 0] }}
                          transition={{ repeat: Infinity, duration: 0.6, delay: d * 0.1 }}
                          className="w-1.5 h-1.5 bg-pink-500 rounded-full" 
                        />
                      ))}
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono uppercase tracking-[0.2em]">Listening...</span>
                  </div>
                </div>
              )}

              {currentText && isListening && (
                <div className="flex justify-end opacity-50 italic">
                  <div className="bg-slate-800 text-slate-400 p-4 rounded-3xl rounded-tr-none text-xs">
                    {currentText}
                  </div>
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="p-8 pt-4 flex flex-col items-center gap-4">
              <div className="flex items-center gap-6">
                <button 
                  onClick={toggleListening}
                  className={`w-20 h-20 rounded-full flex items-center justify-center transition-all relative z-10 ${
                    isListening 
                      ? 'bg-pink-500 shadow-lg shadow-pink-500/40 ring-4 ring-pink-500/20' 
                      : 'bg-slate-800 border border-white/10 hover:border-pink-500/50'
                  }`}
                >
                  {isListening ? (
                    <MicOff className="text-white" size={32} />
                  ) : (
                    <Mic className={isProcessing ? 'text-slate-600' : 'text-pink-500'} size={32} />
                  )}
                  
                  {isListening && (
                    <motion.div 
                      animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.1, 0.3] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="absolute inset-0 bg-pink-500 rounded-full -z-10"
                    />
                  )}
                </button>
              </div>
              <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em]">
                {isListening ? 'Aura is listening...' : isSpeaking ? 'Aura is talking...' : 'Tap heart helper to talk'}
              </p>
            </div>

            {/* Voice Waveform Visualization (Mock) */}
            {(isListening || isSpeaking) && (
              <div className="absolute bottom-0 left-0 right-0 h-2 flex items-end gap-1 px-1">
                {Array.from({ length: 40 }).map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ height: [4, Math.random() * 20 + 4, 4] }}
                    transition={{ repeat: Infinity, duration: 0.3 + Math.random() * 0.5 }}
                    className="flex-grow bg-pink-500/30 rounded-t-full"
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
