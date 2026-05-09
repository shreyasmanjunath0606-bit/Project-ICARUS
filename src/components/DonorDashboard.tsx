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

const dailyData = [
  { name: '08:00', impact: 120 },
  { name: '10:00', impact: 450 },
  { name: '12:00', impact: 380 },
  { name: '14:00', impact: 890 },
  { name: '16:00', impact: 720 },
  { name: '18:00', impact: 1100 },
];

const weeklyData = [
  { name: 'Mon', impact: 400 },
  { name: 'Tue', impact: 1200 },
  { name: 'Wed', impact: 900 },
  { name: 'Thu', impact: 2100 },
  { name: 'Fri', impact: 1800 },
  { name: 'Sat', impact: 2450 },
  { name: 'Sun', impact: 2100 },
];

const monthlyData = [
  { name: 'Week 1', impact: 1400 },
  { name: 'Week 2', impact: 3200 },
  { name: 'Week 3', impact: 2900 },
  { name: 'Week 4', impact: 5100 },
  { name: 'Week 5', impact: 4800 },
  { name: 'Week 6', impact: 6450 },
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
  const [isDonating, setIsDonating] = useState(false);
  const [donationSuccess, setDonationSuccess] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [timeRange, setTimeRange] = useState<'daily' | 'weekly' | 'monthly'>('weekly');

  const chartData = timeRange === 'daily' ? dailyData : timeRange === 'monthly' ? monthlyData : weeklyData;

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDonateAction = () => {
    setIsDonating(true);
    setDonationSuccess(false);
    setSelectedAmount(null);
  };

  const processDonation = () => {
    // Simulate cryptographic commitment
    setDonationSuccess(true);
    setTimeout(() => {
      setIsDonating(false);
      setDonationSuccess(false);
    }, 3000);
  };

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
                {donationSuccess && selectedAmount ? `₹${(1245000 + selectedAmount).toLocaleString()}` : '₹1,245,000'}
              </span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-[9px] text-slate-500 font-mono uppercase tracking-widest">Global Impact</span>
              <span className="text-[10px] font-bold text-white font-mono uppercase tracking-wider">Top 5% Donor</span>
            </div>
          </div>

          <div className="h-8 w-[1px] bg-white/5"></div>
          
          <button 
            onClick={handleDonateAction}
            className="px-5 py-2 bg-gradient-to-r from-cyan-600 to-indigo-600 rounded-xl text-[10px] font-black text-white transition-all flex items-center gap-2 tracking-[0.1em] uppercase shadow-lg shadow-cyan-900/10 active:scale-95"
          >
             Contribute to Vault
          </button>
        </div>
      </nav>

      {/* Donation Modal */}
      <AnimatePresence>
        {isDonating && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-md p-8"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-slate-950 border border-white/10 w-full max-w-lg rounded-[48px] overflow-hidden shadow-2xl relative"
            >
              {!donationSuccess ? (
                <div className="p-12">
                  <div className="flex justify-between items-start mb-12">
                    <div>
                      <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Vault Contribution</h2>
                      <p className="text-xs text-slate-500 font-mono uppercase tracking-[0.2em] mt-2">Secure Micro-Grant Protocol</p>
                    </div>
                    <button 
                      onClick={() => setIsDonating(false)}
                      className="p-3 bg-white/5 rounded-2xl text-slate-400 hover:text-white transition-colors"
                    >
                      <Zap size={20} />
                    </button>
                  </div>

                  <div className="space-y-8">
                    <div>
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4 block">Select Amount (INR)</label>
                      <div className="grid grid-cols-3 gap-4">
                        {[1000, 5000, 10000].map(amt => (
                          <button 
                            key={amt}
                            onClick={() => setSelectedAmount(amt)}
                            className={`px-4 py-6 rounded-[24px] border transition-all text-sm font-bold font-mono ${
                              selectedAmount === amt 
                                ? 'bg-cyan-500 border-cyan-400 text-black shadow-lg shadow-cyan-500/20' 
                                : 'bg-white/5 border-white/10 text-slate-300 hover:border-white/20'
                            }`}
                          >
                            ₹{amt.toLocaleString()}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="bg-black/50 border border-white/5 rounded-[32px] p-6 space-y-4">
                      <div className="flex justify-between items-center text-[10px] uppercase tracking-widest font-mono">
                        <span className="text-slate-500">Protocol Fee</span>
                        <span className="text-slate-300">₹0.00</span>
                      </div>
                      <div className="flex justify-between items-center text-[10px] uppercase tracking-widest font-mono">
                        <span className="text-slate-500">Icarus Commitment</span>
                        <span className="text-cyan-400">Verified</span>
                      </div>
                      <div className="h-[1px] bg-white/5"></div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-black text-white uppercase tracking-widest">Total Proof-of-Effort</span>
                        <span className="text-xl font-black text-white">₹{selectedAmount?.toLocaleString() || '0'}</span>
                      </div>
                    </div>

                    <button 
                      disabled={!selectedAmount}
                      onClick={processDonation}
                      className="w-full py-6 bg-white text-black rounded-[24px] font-black uppercase tracking-[0.2em] text-xs hover:bg-cyan-400 transition-colors disabled:opacity-20 disabled:cursor-not-allowed group flex items-center justify-center gap-3"
                    >
                      Process Secure Transfer
                      <Shield size={16} className="group-hover:animate-pulse" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-12 text-center flex flex-col items-center gap-8">
                  <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center shadow-2xl shadow-green-500/20">
                    <CheckCircle2 size={48} className="text-black" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-2">Vault Committed</h2>
                    <p className="text-slate-400 text-sm leading-relaxed max-w-sm mx-auto">
                      Your contribution has been successfully hashed and committed to the performance vault. Release signals will follow student milestone completion.
                    </p>
                  </div>
                  <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 2.5 }}
                      className="h-full bg-green-500"
                    />
                  </div>
                  <p className="text-[10px] text-slate-600 font-mono uppercase tracking-[0.2em]">Transaction ID: ICARUS-{Math.random().toString(36).substring(7).toUpperCase()}</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-grow flex overflow-hidden p-8 gap-8">
        {/* Left Side: Overview & Charts */}
        <div className="flex-grow flex flex-col gap-8 overflow-hidden">
          {/* Key Stats Cards */}
          <div className="grid grid-cols-3 gap-6">
            {[
              { label: "Active Vanguards", val: "142", icon: <Users size={20} />, color: "text-cyan-400" },
              { 
                label: "Scholarships Paid", 
                val: donationSuccess && selectedAmount 
                  ? `₹${840 + (selectedAmount / 1000)}k` 
                  : "₹840k", 
                icon: <Award size={20} />, 
                color: "text-green-400" 
              },
              { label: "Learning Hours", val: "12,450", icon: <Clock size={20} />, color: "text-indigo-400" }
            ].map((stat, i) => (
              <div key={i} className="bg-black border border-white/10 p-6 rounded-[32px] flex items-center gap-5">
                <div className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center ${stat.color}`}>
                  {stat.icon}
                </div>
                <div>
                  <p className="text-[9px] text-slate-500 uppercase font-mono tracking-wider mb-1">{stat.label}</p>
                  <p className="text-xl font-black text-white font-mono leading-none tracking-tight">{stat.val}</p>
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
              <div className="flex gap-2 bg-white/5 p-1 rounded-full border border-white/5">
                <button 
                  onClick={() => setTimeRange('daily')}
                  className={`px-4 py-1.5 rounded-full text-[10px] font-bold transition-all ${
                    timeRange === 'daily' 
                      ? 'bg-cyan-500/10 border border-cyan-500/20 text-cyan-400' 
                      : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  DAILY
                </button>
                <button 
                  onClick={() => setTimeRange('weekly')}
                  className={`px-4 py-1.5 rounded-full text-[10px] font-bold transition-all ${
                    timeRange === 'weekly' 
                      ? 'bg-cyan-500/10 border border-cyan-500/20 text-cyan-400' 
                      : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  WEEKLY
                </button>
                <button 
                  onClick={() => setTimeRange('monthly')}
                  className={`px-4 py-1.5 rounded-full text-[10px] font-bold transition-all ${
                    timeRange === 'monthly' 
                      ? 'bg-cyan-500/10 border border-cyan-500/20 text-cyan-400' 
                      : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  MONTHLY
                </button>
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
