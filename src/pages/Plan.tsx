import { useMemo } from 'react'; // Importamos useMemo para la lógica de tiempo
import { motion } from 'framer-motion';
import { 
  Dumbbell, Info, ChevronRight, 
  Heart, Coffee, Timer,  
} from 'lucide-react';

const routines = [
  {
    id: 'A',
    dayIdx: 1, // Lunes
    day: 'Lunes',
    name: 'Fuerza A',
    focus: 'Empuje + Pierna + Core',
    color: 'cyan',
    accent: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    headerBg: 'bg-cyan-500/20',
    border: 'border-cyan-500/20',
    scanline: 'via-cyan-400/30',
    exercises: [
      { name: 'Sentadilla Goblet', sem1_2: '3x10-12', sem3_4: '4x8-12', sem5_6: '4x8-10', sem7_8: '5x6-10' },
      { name: 'Flexiones', sem1_2: '4x6-10', sem3_4: '4x7-12', sem5_6: '4x8-15', sem7_8: '5x6-12' },
      { name: 'Split Squat / Zancada fija', sem1_2: '3x8-10 c/p', sem3_4: '4x8-12', sem5_6: '4x10-12', sem7_8: '4x8-12' },
      { name: 'Press Militar', sem1_2: '3x8-12', sem3_4: '4x8-12', sem5_6: '4x6-10', sem7_8: '5x6-10' },
      { name: 'Plancha', sem1_2: '3x30-45s', sem3_4: '3x45-60s', sem5_6: '4x45-60s', sem7_8: '4x60s' },
    ]
  },
  {
    id: 'B',
    dayIdx: 3, // Miércoles
    day: 'Miércoles',
    name: 'Fuerza B',
    focus: 'Tirón + Glúteo + Core',
    color: 'emerald',
    accent: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    headerBg: 'bg-emerald-500/20',
    border: 'border-emerald-500/20',
    scanline: 'via-emerald-400/30',
    exercises: [
      { name: 'Peso Muerto Rumano', sem1_2: '3x10-12', sem3_4: '4x8-12', sem5_6: '4x8-10', sem7_8: '5x6-10' },
      { name: 'Remo (1 mano o mochila)', sem1_2: '4x10-12', sem3_4: '4x8-12', sem5_6: '5x8-12', sem7_8: '5x6-10' },
      { name: 'Hip Thrust / Puente', sem1_2: '3x12-15', sem3_4: '4x10-15', sem5_6: '4x12-20', sem7_8: '5x10-15' },
      { name: 'Curl Bíceps', sem1_2: '3x10-15', sem3_4: '3x8-12', sem5_6: '4x8-12', sem7_8: '4x8-12' },
      { name: 'Dead Bug / Elev. Piernas', sem1_2: '3x8-12', sem3_4: '3x10-15', sem5_6: '4x10-15', sem7_8: '4x12-15' },
    ]
  },
  {
    id: 'C',
    dayIdx: 5, // Viernes
    day: 'Viernes',
    name: 'Fuerza C',
    focus: 'Full Body + Finisher',
    color: 'violet',
    accent: 'text-violet-400',
    bg: 'bg-violet-500/10',
    headerBg: 'bg-violet-500/20',
    border: 'border-violet-500/20',
    scanline: 'via-violet-400/30',
    exercises: [
      { name: 'Sentadilla Búlgara', sem1_2: '3x8-10 c/p', sem3_4: '4x8-12', sem5_6: '4x8-12', sem7_8: '3-4x8-12' },
      { name: 'Floor Press', sem1_2: '3x8-12', sem3_4: '4x8-12', sem5_6: '4x6-10', sem7_8: '4x6-10' },
      { name: 'Remo Inclinado', sem1_2: '3x10-12', sem3_4: '4x8-12', sem5_6: '4x8-10', sem7_8: '4x6-10' },
      { name: 'Elevaciones Laterales', sem1_2: '2x12-20', sem3_4: '3x12-20', sem5_6: '3x12-20', sem7_8: '3x12-20' },
      { name: 'Finisher (EMOM 10\')', sem1_2: '6-10 min', sem3_4: '6-10 min', sem5_6: '6-10 min', sem7_8: '6-10 min' },
    ]
  }
];

export const Plan = () => {
  // --- LÓGICA DINÁMICA DE HOY ---
  const hoyIdx = useMemo(() => new Date().getDay(), []);
  const esDiaDeCardio = hoyIdx === 2 || hoyIdx === 4;
  const esDiaDeDescanso = hoyIdx === 6 || hoyIdx === 0;

  return (
    <div className="p-8 space-y-10 max-w-7xl mx-auto text-white">
      
      {/* 1. CALENTAMIENTO */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative overflow-hidden bg-slate-900/40 border border-orange-500/30 rounded-[2.5rem] p-8 shadow-2xl"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-transparent pointer-events-none" />
        <div className="flex flex-col lg:flex-row items-center gap-8 relative z-10">
          <div className="flex items-center gap-5">
            <div className="p-5 bg-orange-500 rounded-[2rem] shadow-[0_0_30px_rgba(249,115,22,0.4)]">
              <Timer className="text-slate-950" size={32} />
            </div>
            <div>
              <h3 className="text-2xl font-black italic tracking-tighter uppercase leading-none">Calentamiento</h3>
              <p className="text-orange-400 text-[10px] font-black uppercase tracking-[0.3em] mt-2">Protocolo Estándar (8 Min)</p>
            </div>
          </div>
          <div className="flex-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {['Jumping Jacks', 'Mov. Hombros', 'Sentadillas', 'Bisagra', 'Plancha Alta', 'Estiramiento'].map((item, i) => (
              <div key={i} className="bg-slate-950/50 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/5 text-[9px] font-black text-center group hover:border-orange-500/50 transition-all cursor-default">
                <span className="text-orange-500 block mb-1">60 SEG</span> {item.toUpperCase()}
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* 2. RUTINAS DINÁMICAS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {routines.map((routine) => {
          const esHoy = hoyIdx === routine.dayIdx;
          
          return (
            <motion.div 
              key={routine.id}
              whileHover={{ y: -10 }}
              initial={esHoy ? { scale: 1.02 } : { opacity: 0.7 }}
              animate={esHoy ? { scale: 1.02, opacity: 1, borderColor: 'rgba(255,255,255,0.2)' } : { scale: 1, opacity: 0.6 }}
              className={`bg-[#0f172a] rounded-[3rem] border ${esHoy ? 'border-white/30 shadow-[0_0_50px_rgba(255,255,255,0.1)]' : 'border-white/5'} overflow-hidden group shadow-2xl relative flex flex-col transition-all duration-500`}
            >
              {/* EFECTO SCAN-LINE SÓLO EN LA RUTINA DE HOY */}
              {esHoy && (
                <motion.div 
                  animate={{ top: ["-10%", "110%"] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                  className={`absolute left-0 w-full h-[2px] bg-gradient-to-r from-transparent ${routine.scanline} to-transparent z-20 pointer-events-none`}
                />
              )}

              {/* CABECERA */}
              <div className={`p-8 ${routine.headerBg} relative transition-colors duration-500`}>
                <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
                <div className="flex justify-between items-start relative z-10">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[9px] font-black uppercase tracking-[0.4em] px-4 py-1.5 rounded-full bg-slate-950/80 border ${routine.border} ${routine.accent} shadow-lg`}>
                        {routine.day}
                      </span>
                      {esHoy && (
                        <span className="flex h-2 w-2 rounded-full bg-red-500 animate-ping" />
                      )}
                    </div>
                    <h2 className="text-4xl font-black tracking-tighter italic mt-6 drop-shadow-md">
                      {routine.name}
                      {esHoy && <span className="block text-[10px] text-white not-italic tracking-widest mt-1 opacity-50">SESIÓN ACTIVA</span>}
                    </h2>
                    <p className="text-white/60 text-[10px] font-bold uppercase tracking-[0.2em] mt-1">{routine.focus}</p>
                  </div>
                  <div className={`p-3 rounded-2xl bg-slate-950/40 backdrop-blur-sm border ${routine.border}`}>
                      <Dumbbell className={`${routine.accent}`} size={28} />
                  </div>
                </div>
              </div>

              {/* LISTA DE EJERCICIOS */}
              <div className="p-8 space-y-4 flex-1 bg-gradient-to-b from-transparent to-slate-950/50">
                {routine.exercises.map((ex, idx) => (
                  <motion.div 
                    key={idx} 
                    whileHover={{ x: 5 }}
                    className={`p-4 rounded-2xl border transition-all group/ex ${esHoy ? 'bg-white/[0.04] border-white/10' : 'bg-white/[0.02] border-white/5'}`}
                  >
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-[11px] font-black text-slate-100 uppercase tracking-tight group-hover/ex:text-white transition-colors">{ex.name}</span>
                      <Info size={12} className="text-slate-700 hover:text-white cursor-pointer transition-colors" />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-slate-950/60 p-2 rounded-xl border border-white/5 group-hover/ex:border-white/10 transition-all">
                        <p className="text-[7px] text-slate-500 font-black uppercase mb-1">Semana 1-4</p>
                        <p className={`text-[10px] font-mono font-bold ${routine.accent}`}>{ex.sem1_2} / {ex.sem3_4}</p>
                      </div>
                      <div className="bg-white/5 p-2 rounded-xl border border-white/5 group-hover/ex:border-white/10 transition-all">
                        <p className="text-[7px] text-slate-400 font-black uppercase mb-1 tracking-widest">Semana 5-8</p>
                        <p className="text-[10px] font-mono font-bold text-white">{ex.sem5_6} / {ex.sem7_8}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <button className={`w-full py-6 transition-all font-black text-[10px] uppercase tracking-[0.4em] flex items-center justify-center gap-3 border-t border-white/5 ${esHoy ? 'bg-white text-slate-950 hover:bg-cyan-400' : 'bg-slate-950/50 hover:bg-white hover:text-slate-950 opacity-50'}`}>
                {esHoy ? 'Iniciar Entrenamiento' : 'Ver Rutina'} <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* 3. CARDIO & DESCANSO DINÁMICOS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-10">
        <div className={`p-8 rounded-[2.5rem] border transition-all duration-500 group relative overflow-hidden shadow-xl ${esDiaDeCardio ? 'bg-sky-500/10 border-sky-500 shadow-[0_0_30px_rgba(14,165,233,0.2)] scale-[1.02]' : 'bg-[#0f172a]/40 border-sky-500/20 opacity-60'}`}>
          <div className="flex items-center gap-5 mb-8">
            <div className={`p-4 rounded-[1.5rem] transition-transform ${esDiaDeCardio ? 'bg-sky-500 text-slate-950 rotate-12' : 'bg-sky-900/50 text-sky-400'}`}>
              <Heart size={24} />
            </div>
            <div>
              <h4 className="text-xl font-black italic tracking-tighter uppercase leading-none">Cardio Martes/Jueves</h4>
              <p className="text-sky-400 text-[10px] font-black uppercase tracking-widest mt-2">{esDiaDeCardio ? '• SESIÓN ACTIVA HOY •' : 'Protocolo Quema-Grasa'}</p>
            </div>
          </div>
          <div className="space-y-4 relative z-10">
            {[ {s: 'Sem 1-4', v: '25-35 MIN LISS'}, {s: 'Sem 5-8', v: '35-45 MIN LISS'} ].map((item, i) => (
              <div key={i} className={`flex justify-between items-center p-4 rounded-2xl border transition-colors ${esDiaDeCardio ? 'bg-white/10 border-white/20' : 'bg-white/5 border-white/5'}`}>
                <span className="text-[10px] font-black uppercase text-slate-400 italic">{item.s}</span>
                <span className={`text-xs font-mono font-black ${esDiaDeCardio ? 'text-white' : 'text-sky-400'}`}>{item.v}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={`p-8 rounded-[2.5rem] border transition-all duration-500 group shadow-xl ${esDiaDeDescanso ? 'bg-emerald-500/10 border-emerald-500/50 scale-[1.02]' : 'bg-[#0f172a]/40 border-slate-700/50 opacity-60'}`}>
          <div className="flex items-center gap-5 mb-8">
            <div className={`p-4 rounded-[1.5rem] transition-transform ${esDiaDeDescanso ? 'bg-emerald-500 text-slate-950 scale-110' : 'bg-slate-700 text-white'}`}>
              <Coffee size={24} />
            </div>
            <div>
              <h4 className="text-xl font-black italic tracking-tighter uppercase leading-none">Recuperación Sab/Dom</h4>
              <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mt-2">{esDiaDeDescanso ? '• TIEMPO DE REPARACIÓN •' : 'Protocolo de Descanso'}</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className={`p-4 rounded-2xl border flex items-center gap-4 transition-all ${hoyIdx === 6 ? 'bg-emerald-500/20 border-emerald-500/40' : 'bg-slate-950/40 border-white/5'}`}>
              <div className={`w-2 h-2 rounded-full ${hoyIdx === 6 ? 'bg-emerald-400 animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.5)]' : 'bg-slate-600'}`} />
              <p className={`text-[11px] font-bold tracking-tight ${hoyIdx === 6 ? 'text-white' : 'text-slate-400'}`}>SÁBADO: Caminata 45-60 min (Opcional).</p>
            </div>
            <div className={`p-4 rounded-2xl border flex items-center gap-4 transition-all ${hoyIdx === 0 ? 'bg-emerald-500/20 border-emerald-500/40' : 'bg-emerald-500/5 border-emerald-500/20'}`}>
              <div className={`w-2 h-2 rounded-full ${hoyIdx === 0 ? 'bg-red-500 animate-ping' : 'bg-emerald-500'}`} />
              <p className={`text-[11px] font-black tracking-tight uppercase italic ${hoyIdx === 0 ? 'text-white' : 'text-emerald-100'}`}>Domingo: Shutdown Completo.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};