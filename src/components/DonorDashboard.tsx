import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  Zap, 
  Shield, 
  Target, 
  Database, 
  CheckCircle2, 
  Clock, 
  Search, 
  Filter,
  ArrowUpRight,
  Award,
  BookOpen
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const chartData = [
  { name: 'Week 1', impact: 400 },
  { name: 'Week 2', impact: 1200 },
  { name: 'Week 3', impact: 900 },
  { name: 'Week 4', impact: 2100 },
  { name: 'Week 5', impact: 1800 },
  { name: 'Week 6', impact: 2450 },
];

const students = [
  { id: 'S-01', name: 'Aarav M.', age: 14, modules: 12, impact: 450, status: 'Active', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aarav' },
  { id: 'S-02', name: 'Ishita K.', age: 10, modules: 8, impact: 320, status: 'Learning', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ishita' },
  { id: 'S-03', name: 'Vihaan S.', age: 7, modules: 15, impact: 580, status: 'Active', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Vihaan' },
  { id: 'S-04', name: 'Ananya P.', age: 16, modules: 6, impact: 210, status: 'On Break', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ananya' },
  { id: 'S-05', name: 'Advait R.', age: 12, modules: 10, impact: 390, status: 'Learning', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Advait' },
];

const logs = [
  "Verifier Agent: Vihaan S. completed 'Robotics 101' with 94% accuracy.",
  "Vault Release: ₹2,500 transferred for Aarav M.'s Python milestone.",
  "Impact Alert: Global foundation reach expanded by 5% this month.",
  "Protocol Sync: 4 new curriculum modules committed to Icarus registry.",
  "SBT Minted: Ishita K. earned 'Data Explorer' Soulbound Token.",
];

export default function DonorDashboard() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-screen bg-[#020617] text-slate-200 flex flex-col font-sans overflow-hidden border border-slate-800">
      <nav className="h-16 border-b border-white/5 bg-slate-950/80 backdrop-blur-xl flex items-center justify-between px-8 flex-shrink-0 relative z-20">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-black border border-white/10 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.1)]">
            <BarChart3 size={20} className="text-cyan-400" />
          </div>
          <div>
            <h1 className="text-sm font-black tracking-[0.2em] text-white uppercase leading-none">Donor <span className="text-cyan-400">Insight</span></h1>
            <p className="text-[9px] text-slate-500 font-mono tracking-widest mt-1 uppercase">Transparency Protocol v2.4</p>
          </div>
        </div>
        
        <div className="flex items-center gap-10">
          <div className="flex gap-8">
            <div className="flex flex-col items-end">
              <span className="text-[9px] text-slate-500 font-mono uppercase tracking-widest">Total Donated</span>
              <span className="text-[10px] font-bold text-green-500 flex items-center gap-1.5 uppercase tracking-wider">
                ₹1,245,000
              </span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-[9px] text-slate-500 font-mono uppercase tracking-widest">Global Impact</span>
              <span className="text-[10px] font-bold text-white font-mono uppercase tracking-wider">Top 5% Donor</span>
            </div>
          </div>

          <div className="h-8 w-[1px] bg-white/5"></div>
          
          <button className="px-5 py-2 bg-gradient-to-r from-cyan-600 to-indigo-600 rounded-xl text-[10px] font-black text-white transition-all flex items-center gap-2 tracking-[0.1em] uppercase shadow-lg shadow-cyan-900/10">
             Contribute to Vault
          </button>
        </div>
      </nav>

      <main className="flex-grow flex overflow-hidden p-8 gap-8">
        {/* Left Side: Overview & Charts */}
        <div className="flex-grow flex flex-col gap-8 overflow-hidden">
          {/* Key Stats Cards */}
          <div className="grid grid-cols-3 gap-6">
            {[
              { label: "Active Vanguards", val: "142", icon: <Users size={20} />, color: "text-cyan-400" },
              { label: "Scholarships Paid", val: "₹840k", icon: <Award size={20} />, color: "text-green-400" },
              { label: "Learning Hours", val: "12,450", icon: <Clock size={20} />, color: "text-indigo-400" }
            ].map((stat, i) => (
              <div key={i} className="bg-black border border-white/10 p-6 rounded-[32px] flex items-center gap-5">
                <div className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center ${stat.color}`}>
                  {stat.icon}
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 uppercase font-mono tracking-widest mb-1">{stat.label}</p>
                  <p className="text-2xl font-black text-white font-mono">{stat.val}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Impact Progression Chart */}
          <div className="flex-grow bg-black border border-white/10 rounded-[40px] p-8 flex flex-col">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="text-lg font-black text-white uppercase tracking-wider">Impact Velocity</h3>
                <p className="text-xs text-slate-500 mt-1 uppercase font-mono tracking-widest">Real-time learning progression vs budget release</p>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-bold">DAILY</button>
                <button className="px-4 py-1.5 rounded-full text-slate-500 text-[10px] font-bold">WEEKLY</button>
              </div>
            </div>
            
            <div className="flex-grow">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorImpact" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#475569', fontSize: 10, fontFamily: 'monospace'}}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#475569', fontSize: 10, fontFamily: 'monospace'}}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#000', border: '1px solid #ffffff10', borderRadius: '12px' }}
                    itemStyle={{ color: '#22d3ee' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="impact" 
                    stroke="#22d3ee" 
                    strokeWidth={4}
                    fillOpacity={1} 
                    fill="url(#colorImpact)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right Side: Student Progress List */}
        <div className="w-[450px] flex flex-col gap-8 shrink-0">
          <div className="flex-grow bg-black border border-white/10 rounded-[40px] p-8 flex flex-col overflow-hidden">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-sm font-black text-white uppercase tracking-widest">Active Vanguards</h3>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" />
                  <input 
                    type="text" 
                    placeholder="Search by ID..."
                    className="bg-white/5 border border-white/10 rounded-xl py-2 pl-9 pr-4 text-[10px] focus:border-cyan-500 outline-none transition-all w-40 font-mono"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <button className="w-9 h-9 flex items-center justify-center bg-white/5 rounded-xl text-slate-500 hover:text-white transition-colors">
                  <Filter size={16} />
                </button>
              </div>
            </div>

            <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar space-y-4">
              {filteredStudents.map((student) => (
                <motion.div 
                  layout
                  key={student.id}
                  className="p-5 rounded-3xl bg-slate-900/40 border border-white/5 hover:border-cyan-500/20 transition-all flex flex-col gap-4 group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-black border border-white/10 overflow-hidden">
                        <img src={student.avatar} alt={student.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors">{student.name}</h4>
                        <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">{student.id} • AGE {student.age}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className={`text-[9px] font-black uppercase px-2 py-1 rounded-md ${
                        student.status === 'Active' ? 'bg-green-500/10 text-green-500 border border-green-500/20' :
                        student.status === 'Learning' ? 'bg-cyan-500/10 text-cyan-500 border border-cyan-500/20' :
                        'bg-slate-800 text-slate-500'
                      }`}>
                        {student.status}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-mono tracking-widest uppercase text-slate-500">
                      <span>Curriculum Progression</span>
                      <span className="text-white font-bold">{student.modules}/30 Modules</span>
                    </div>
                    <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 transition-all duration-1000"
                        style={{ width: `${(student.modules / 30) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center bg-black/40 rounded-xl p-3 border border-white/5">
                    <div className="flex items-center gap-2">
                      <Zap size={12} className="text-cyan-400" />
                      <span className="text-[10px] font-bold text-white font-mono">{student.impact} Impact XP</span>
                    </div>
                    <button className="text-[9px] font-black text-cyan-400 uppercase tracking-widest hover:underline flex items-center gap-1">
                      View Profile <ArrowUpRight size={10} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="bg-black border border-white/10 rounded-[32px] p-6 flex flex-col h-48">
            <h3 className="text-[10px] font-black text-slate-500 tracking-[0.2em] uppercase mb-4">Integrity Logs</h3>
            <div className="flex-grow flex flex-col gap-3 font-mono text-[9px] overflow-hide pr-2 custom-scrollbar">
              {logs.map((log, i) => (
                <div key={i} className="flex gap-3 leading-relaxed border-l-2 border-white/5 pl-3">
                  <span className="text-slate-700 shrink-0">[{new Date().toLocaleTimeString([], { hour12: false, minute: '2-digit', hour: '2-digit' })}]</span>
                  <span className="text-slate-500">{log}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
