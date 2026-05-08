import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Send, Sparkles, User, Bot, Loader2, X } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { askGemini } from '../services/geminiService';
import { Course } from '../data/courses';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface GeminiAssistantProps {
  activeCourse?: Course | null;
  onAddLog?: (msg: string) => void;
}

export function GeminiAssistant({ activeCourse = null, onAddLog }: GeminiAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const onAddLogRef = useRef(onAddLog);
  useEffect(() => {
    onAddLogRef.current = onAddLog;
  }, [onAddLog]);

  useEffect(() => {
    if (scrollRef.current && !isMinimized) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading, isMinimized]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    if (onAddLogRef.current) {
      onAddLogRef.current(`AI Query: ${input.slice(0, 30)}${input.length > 30 ? '...' : ''}`);
    }

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const context = activeCourse 
        ? `The student is currently working on the module: "${activeCourse.title}". Description: ${activeCourse.description}` 
        : "The student has not selected a specific module yet.";
      
      const response = await askGemini(input, context);
      
      const assistantMessage: Message = { 
        role: 'assistant', 
        content: response || "I'm sorry, I couldn't generate a response." 
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Error connecting to Icarus AI. Please check your connection." }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (isMinimized) {
    return (
      <motion.button
        layoutId="assistant"
        onClick={() => setIsMinimized(false)}
        className="w-full bg-slate-900/90 border border-cyan-500/30 rounded-2xl p-4 flex items-center justify-between shadow-2xl backdrop-blur-xl group hover:border-cyan-400 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-cyan-500/20 rounded-lg">
            <Sparkles size={16} className="text-cyan-400 group-hover:animate-pulse" />
          </div>
          <span className="text-xs font-black uppercase tracking-widest text-white">AI Neural Link</span>
        </div>
        <div className="text-[9px] font-mono text-cyan-500 uppercase animate-pulse">Ready</div>
      </motion.button>
    );
  }

  return (
    <motion.section 
      layoutId="assistant"
      className="bg-slate-900/95 border border-cyan-900/40 rounded-3xl p-5 relative overflow-hidden flex flex-col h-[400px] shadow-2xl backdrop-blur-xl"
    >
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-indigo-600/10 rounded-full blur-2xl"></div>
      
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-indigo-500/20 rounded-lg border border-indigo-500/30">
            <Sparkles size={14} className="text-indigo-400" />
          </div>
          <h3 className="text-sm font-black uppercase tracking-widest text-white">Icarus AI Assistant</h3>
        </div>
        <button 
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsMinimized(true);
          }}
          className="p-1.5 bg-white/5 rounded-md hover:bg-white/10 transition-colors relative z-50 group/close"
        >
          <X size={14} className="text-slate-500 group-hover/close:text-white" />
        </button>
      </div>

      <div 
        ref={scrollRef}
        className="flex-grow overflow-y-auto mb-4 space-y-4 pr-2 custom-scrollbar"
      >
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-4">
            <Bot size={40} className="text-slate-700 mb-3" />
            <p className="text-xs text-slate-500 italic max-w-[250px]">
              "Stuck on a concept? Ask me to explain it like you're five. I'm here to clear your doubts."
            </p>
          </div>
        ) : (
          messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`p-1.5 rounded-lg h-fit ${m.role === 'user' ? 'bg-cyan-500' : 'bg-slate-800 border border-white/5'}`}>
                {m.role === 'user' ? <User size={14} className="text-black" /> : <Bot size={14} className="text-cyan-400" />}
              </div>
              <div className={`max-w-[80%] rounded-2xl p-3 text-[12px] leading-relaxed ${
                m.role === 'user' 
                  ? 'bg-cyan-500/10 text-cyan-100 rounded-tr-none border border-cyan-500/20' 
                  : 'bg-slate-950/50 text-slate-300 rounded-tl-none border border-white/5'
              }`}>
                <div className="markdown-body text-white">
                  <ReactMarkdown>{m.content}</ReactMarkdown>
                </div>
              </div>
            </motion.div>
          ))
        )}
        {isLoading && (
          <div className="flex gap-3">
            <div className="p-1.5 bg-slate-800 border border-white/5 rounded-lg h-fit">
              <Bot size={14} className="text-cyan-400" />
            </div>
            <div className="bg-slate-950/50 border border-white/5 rounded-2xl rounded-tl-none p-3 flex items-center gap-2">
              <Loader2 size={12} className="animate-spin text-slate-500" />
              <span className="text-[10px] text-slate-500 font-mono">Thinking...</span>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSend} className="relative">
        <input 
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={activeCourse ? `Ask about ${activeCourse.title}...` : "Ask a question..." }
          className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 pr-12 text-[12px] focus:outline-none focus:border-cyan-500/50 transition-colors placeholder:text-slate-600 text-white"
        />
        <button 
          type="submit"
          disabled={!input.trim() || isLoading}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-slate-800 rounded-lg text-cyan-500 disabled:text-slate-700 disabled:hover:bg-transparent transition-all"
        >
          <Send size={18} />
        </button>
      </form>
    </motion.section>
  );
}
