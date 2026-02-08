import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dashboard } from './pages/Dashboard';
import { Plan } from './pages/Plan';
import { Nutricion } from './pages/Nutricion';
import { Progreso } from './pages/Progreso'; // ✅ Importado
import { Calendario } from './pages/Calendario'; // ✅ Importado
import { Ajustes } from './pages/Ajustes'; // ✅ Importado
import { 
  Trophy, Calendar, ClipboardList, 
  Utensils, BarChart3, Settings, 
  Moon, Sun, ChevronRight, LayoutDashboard 
} from 'lucide-react';
import { useApp } from './context/AppContext';

export default function App() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const { theme, toggleTheme } = useApp();

  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Plan', icon: <ClipboardList size={20} /> },
    { name: 'Calendario', icon: <Calendar size={20} /> },
    { name: 'Nutrición', icon: <Utensils size={20} /> },
    { name: 'Progreso', icon: <BarChart3 size={20} /> },
    { name: 'Ajustes', icon: <Settings size={20} /> },
  ];

  return (
    <div className={`flex h-screen bg-[#020617] overflow-hidden font-sans selection:bg-cyan-500/30 ${theme === 'dark' ? 'dark' : ''}`}>
      
      {/* 1. SIDEBAR ULTRA-MODERNA */}
      <aside className="w-72 bg-[#020617] border-r border-white/[0.03] flex flex-col relative z-30">
        {/* LOGO CON GLOW */}
        <div className="p-10 mb-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 bg-cyan-500 blur-xl opacity-20 animate-pulse" />
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center relative border border-white/10 shadow-2xl">
                <Trophy className="text-slate-950" size={24} />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-black italic tracking-tighter text-white leading-none">RECOMP</h2>
              <span className="text-[9px] font-black text-cyan-500 tracking-[0.4em] uppercase opacity-70">Engine v1.0</span>
            </div>
          </motion.div>
        </div>
        
        {/* NAVEGACIÓN ESTILO PREMIUM */}
        <nav className="flex-1 px-6 space-y-2">
          {menuItems.map((item) => (
            <button key={item.name} onClick={() => setActiveTab(item.name)} className="relative w-full group outline-none">
              {activeTab === item.name && (
                <motion.div 
                  layoutId="activeGlow"
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500/[0.08] to-transparent rounded-2xl border-l-[3px] border-cyan-400"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <div className={`flex items-center gap-4 px-6 py-4 transition-all duration-500 relative z-10 ${
                activeTab === item.name ? 'text-white' : 'text-slate-500 hover:text-slate-300 hover:translate-x-1'
              }`}>
                <span className={`${activeTab === item.name ? 'drop-shadow-[0_0_10px_rgba(34,211,238,0.6)] text-cyan-400' : ''}`}>
                  {item.icon}
                </span>
                <span className="font-black text-xs tracking-[0.15em] uppercase italic">{item.name}</span>
                {activeTab === item.name && (
                   <motion.div layoutId="arrow" className="ml-auto text-cyan-400">
                     <ChevronRight size={14} />
                   </motion.div>
                )}
              </div>
            </button>
          ))}
        </nav>

        {/* TEMA SWITCHER */}
        <div className="p-8">
          <button onClick={toggleTheme} className="w-full flex items-center justify-between p-5 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all group">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-slate-900 text-slate-500 group-hover:text-yellow-400 transition-colors">
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </div>
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Atmosphere</span>
            </div>
            <div className={`w-10 h-5 rounded-full relative transition-colors ${theme === 'dark' ? 'bg-cyan-500/20' : 'bg-slate-800'}`}>
               <motion.div animate={{ x: theme === 'dark' ? 22 : 4 }} className="absolute top-1 w-3 h-3 bg-white rounded-full shadow-lg" />
            </div>
          </button>
        </div>
      </aside>

      {/* 2. CONTENIDO PRINCIPAL */}
      <main className="flex-1 overflow-y-auto bg-[#020617] relative scroll-smooth">
        {/* LUCES AMBIENTALES DINÁMICAS */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.12, 0.08] }} transition={{ duration: 8, repeat: Infinity }} className="absolute -top-[10%] -left-[5%] w-[60%] h-[60%] bg-cyan-500 rounded-full blur-[140px]" />
          <motion.div animate={{ scale: [1.2, 1, 1.2], opacity: [0.03, 0.06, 0.03] }} transition={{ duration: 10, repeat: Infinity }} className="absolute -bottom-[10%] -right-[5%] w-[50%] h-[50%] bg-blue-600 rounded-full blur-[120px]" />
        </div>

        {/* CONTENEDOR DE PANTALLAS CON ANIMACIÓN */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
            transition={{ duration: 0.4, ease: "circOut" }}
            className="relative z-10"
          >
            {/* RENDERIZADO DINÁMICO ✅ */}
            {activeTab === 'Dashboard' && <Dashboard />}
            {activeTab === 'Plan' && <Plan />}
            {activeTab === 'Nutrición' && <Nutricion />}
            {activeTab === 'Calendario' && <Calendario />}
            {activeTab === 'Progreso' && <Progreso />}
            {activeTab === 'Ajustes' && <Ajustes />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}