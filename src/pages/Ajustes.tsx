import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Settings, Cpu, ShieldCheck, Bell, 
  User, Database, Smartphone, LogOut,
  Zap, ChevronRight, RefreshCw, Trash2, CheckCircle2, Lock, Activity
} from 'lucide-react';

// --- CREDENCIALES ---
const MASTER_USER = "ALFA-01";
const MASTER_KEY = "RECOMP-2026";

export const Ajustes = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('recomp_session') === 'active');
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  // Estado con Persistencia
  const [config, setConfig] = useState(() => {
    const saved = localStorage.getItem('recomp_config');
    return saved ? JSON.parse(saved) : {
      motorNeuronal: true,
      sincronizacion: true,
      notificaciones: false,
      privacidad: true,
      storage: 1.2
    };
  });

  useEffect(() => {
    localStorage.setItem('recomp_config', JSON.stringify(config));
  }, [config]);

  const showStatus = (msg: string) => {
    setStatusMsg(msg);
    setTimeout(() => setStatusMsg(null), 3000);
  };

  if (!isLoggedIn) return <LoginScreen onLogin={(id, key) => {
    if (id.toUpperCase() === MASTER_USER && key === MASTER_KEY) {
      setIsLoggedIn(true);
      localStorage.setItem('recomp_session', 'active');
    } else {
      alert("BIO-KEY INCORRECTA");
    }
  }} />;

  return (
    <div className="flex min-h-screen bg-[#020617] text-white font-sans overflow-x-hidden">
      {/* Notificación Flotante */}
      <AnimatePresence>
        {statusMsg && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="fixed top-10 left-1/2 -translate-x-1/2 z-[100] bg-indigo-600 border border-indigo-400 px-6 py-3 rounded-2xl shadow-lg flex items-center gap-3">
            <CheckCircle2 size={16} />
            <span className="text-[10px] font-black uppercase tracking-widest">{statusMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-1 p-8 md:p-12 space-y-10">
        {/* TITULO E INDICE DE VERSION */}
        <header className="flex justify-between items-end border-b border-white/10 pb-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
               <Settings size={14} className="text-indigo-400 animate-spin-slow" />
               <span className="text-[10px] font-black text-indigo-300 uppercase tracking-[0.3em]">System Configuration</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter leading-none">
              NÚCLEO DEL <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-600">SISTEMA</span>
            </h1>
          </div>
          <div className="text-right hidden md:block">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic">Versión de Engine</p>
            <p className="text-2xl font-black italic text-indigo-400">v1.0.4-STABLE</p>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* SECCION IZQUIERDA: PERFIL Y TOGGLES */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* CARD DE PERFIL */}
            <div className="bg-[#0f172a]/60 border border-white/5 rounded-[3.5rem] p-10 backdrop-blur-3xl flex flex-col md:flex-row items-center gap-10 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative">
                <div className="w-36 h-36 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-600 p-1">
                  <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center border-4 border-slate-950 overflow-hidden">
                    <User size={70} className="text-cyan-500" />
                  </div>
                </div>
                <div className="absolute bottom-1 right-1 w-10 h-10 bg-emerald-500 rounded-full border-4 border-slate-950 flex items-center justify-center">
                  <Zap size={18} className="text-white fill-current" />
                </div>
              </div>
              <div className="relative z-10 text-center md:text-left">
                <h2 className="text-5xl font-black italic uppercase tracking-tighter">Usuario Alfa 01</h2>
                <p className="text-slate-500 font-black text-[10px] tracking-[0.4em] uppercase mt-2">Nivel de Optimización: <span className="text-indigo-400">85%</span></p>
                <div className="flex gap-4 mt-8">
                  <button className="px-10 py-3 bg-white text-black text-[10px] font-black uppercase rounded-2xl hover:bg-indigo-400 transition-all hover:scale-105 active:scale-95">Editar Perfil</button>
                  <button className="px-10 py-3 bg-white/5 border border-white/10 text-[10px] font-black uppercase rounded-2xl hover:bg-white/10 transition-all">Exportar Bio-Data</button>
                </div>
              </div>
            </div>

            {/* TOGGLES */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ToggleCard icon={<Cpu />} title="Motor Neuronal" sub="IA COACH ACTIVA EN TIEMPO REAL" active={config.motorNeuronal} onClick={() => setConfig({...config, motorNeuronal: !config.motorNeuronal})} />
              <ToggleCard icon={<Smartphone />} title="Sincronización" sub="APPLE HEALTH / GOOGLE FIT" active={config.sincronizacion} onClick={() => setConfig({...config, sincronizacion: !config.sincronizacion})} />
              <ToggleCard icon={<Bell />} title="Notificaciones" sub="ALERTAS DE SUSTRATOS BAJOS" active={config.notificaciones} onClick={() => setConfig({...config, notificaciones: !config.notificaciones})} />
              <ToggleCard icon={<ShieldCheck />} title="Privacidad" sub="CIFRADO DE DATOS BIOMÉTRICOS" active={config.privacidad} onClick={() => setConfig({...config, privacidad: !config.privacidad})} />
            </div>
          </div>

          {/* COLUMNA DERECHA */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-slate-900/40 border border-white/5 p-8 rounded-[3rem] backdrop-blur-xl space-y-8">
               <div className="flex items-center gap-6">
                 <div className="p-4 bg-indigo-500/10 rounded-2xl border border-indigo-500/20 text-indigo-400"><Database /></div>
                 <div>
                   <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Almacenamiento</p>
                   <h3 className="text-3xl font-black italic uppercase">1.2 GB</h3>
                   <p className="text-[9px] text-indigo-400 font-bold uppercase">Nube Sincronizada</p>
                 </div>
               </div>
               
               <div className="space-y-4 pt-4 border-t border-white/5">
                 <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-4">Acciones de Sistema</h4>
                 <ActionButton label="Actualizar Engine" icon={<ChevronRight size={14}/>} onClick={() => showStatus("Buscando actualizaciones...")} />
                 <ActionButton label="Limpiar Cache Bio" icon={<ChevronRight size={14}/>} onClick={() => showStatus("Cache optimizada")} />
                 <button 
                  onClick={() => { localStorage.removeItem('recomp_session'); setIsLoggedIn(false); }}
                  className="w-full flex items-center justify-between p-5 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-500 hover:bg-rose-500 hover:text-white transition-all text-[10px] font-black uppercase tracking-widest italic"
                 >
                   Cerrar Sesión <LogOut size={16} />
                 </button>
               </div>
            </div>

            <div className="p-8 bg-gradient-to-br from-indigo-900/30 to-black border border-indigo-500/20 rounded-[3rem]">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Estado del Servidor</span>
              </div>
              <p className="text-xs font-bold text-slate-300 italic uppercase">Operativo - Latencia 12ms</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- SUBCOMPONENTES ---

const LoginScreen = ({ onLogin }: { onLogin: (id: string, key: string) => void }) => {
  const [id, setId] = useState('');
  const [key, setKey] = useState('');

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Fondo con efectos de luz dinámicos */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-[440px] relative z-10"
      >
        {/* Contenedor Principal Glassmorphism */}
        <div className="bg-slate-900/40 border border-white/10 backdrop-blur-2xl p-12 rounded-[4rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden group">
          
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-3xl group-hover:bg-indigo-500/20 transition-all duration-700" />

          {/* Icono de Candado Estilizado */}
          <div className="flex justify-center mb-10">
            <div className="relative">
              <div className="absolute inset-0 bg-indigo-500/20 blur-xl rounded-full animate-ping" style={{ animationDuration: '3s' }} />
              <div className="p-6 bg-gradient-to-b from-slate-800 to-slate-900 rounded-[2rem] border border-white/10 shadow-inner relative z-10 text-indigo-400">
                <Lock size={38} strokeWidth={1.5} />
              </div>
            </div>
          </div>

          {/* Textos */}
          <div className="text-center mb-10">
            <h2 className="text-4xl font-black text-white italic uppercase tracking-tighter leading-none mb-3">
              ACCESO AL <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">NÚCLEO</span>
            </h2>
            <div className="flex items-center justify-center gap-2">
              <div className="h-[1px] w-8 bg-indigo-500/30" />
              <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.3em]">Protocolo Bio-Key</p>
              <div className="h-[1px] w-8 bg-indigo-500/30" />
            </div>
          </div>

          {/* Formulario */}
          <div className="space-y-5">
            <div className="relative group/input">
              <div className="absolute inset-y-0 left-5 flex items-center text-slate-500 group-focus-within/input:text-indigo-400 transition-colors">
                <User size={16} />
              </div>
              <input 
                value={id} 
                onChange={e => setId(e.target.value)} 
                placeholder="ID DE USUARIO" 
                className="w-full bg-black/40 border border-white/5 p-5 pl-14 rounded-2xl text-white text-[11px] font-bold uppercase tracking-[0.2em] focus:border-indigo-500/50 focus:bg-black/60 transition-all outline-none placeholder:text-slate-700" 
              />
            </div>

            <div className="relative group/input">
              <div className="absolute inset-y-0 left-5 flex items-center text-slate-500 group-focus-within/input:text-indigo-400 transition-colors">
                <ShieldCheck size={16} />
              </div>
              <input 
                type="password" 
                value={key} 
                onChange={e => setKey(e.target.value)} 
                placeholder="BIO-KEY" 
                className="w-full bg-black/40 border border-white/5 p-5 pl-14 rounded-2xl text-white text-[11px] font-bold uppercase tracking-[0.2em] focus:border-indigo-500/50 focus:bg-black/60 transition-all outline-none placeholder:text-slate-700" 
              />
            </div>

            <button 
              onClick={() => onLogin(id, key)} 
              className="w-full py-5 bg-white text-black rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] hover:bg-indigo-500 hover:text-white transition-all duration-300 shadow-[0_10px_20px_rgba(255,255,255,0.05)] active:scale-95 mt-4 overflow-hidden relative group/btn"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Sincronizar Bio-Data <ChevronRight size={14} />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
            </button>
          </div>

          {/* Footer del login */}
          <div className="mt-10 pt-8 border-t border-white/5 flex justify-center">
            <div className="flex items-center gap-2 text-emerald-500/60">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[9px] font-black uppercase tracking-widest">Servidor Local Operativo</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const ToggleCard = ({ icon, title, sub, active, onClick }: any) => (
  <button onClick={onClick} className="w-full p-8 bg-slate-900/40 border border-white/5 rounded-[2.5rem] flex items-center justify-between group hover:border-white/10 transition-all text-left">
    <div className="flex items-center gap-6">
      <div className={`p-4 rounded-2xl border transition-all ${active ? 'bg-indigo-500/20 border-indigo-500/40 text-indigo-400 shadow-[0_0_20px_rgba(79,70,229,0.2)]' : 'bg-slate-800 border-white/5 text-slate-600'}`}>{icon}</div>
      <div>
        <h4 className="text-sm font-black uppercase italic text-white tracking-tighter leading-none mb-1">{title}</h4>
        <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">{sub}</p>
      </div>
    </div>
    <div className={`w-12 h-6 rounded-full relative transition-all duration-500 ${active ? 'bg-indigo-500 shadow-[0_0_15px_rgba(79,102,241,0.5)]' : 'bg-slate-800'}`}>
      <motion.div animate={{ x: active ? 26 : 4 }} className="absolute top-1 w-4 h-4 bg-white rounded-full" />
    </div>
  </button>
);

const ActionButton = ({ label, icon, onClick }: any) => (
  <button onClick={onClick} className="w-full flex items-center justify-between p-5 rounded-2xl bg-white/5 border border-white/10 text-slate-400 hover:bg-white hover:text-black transition-all text-[10px] font-black uppercase tracking-widest italic">
    {label} {icon}
  </button>
);