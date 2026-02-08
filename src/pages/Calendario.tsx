import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar as CalendarIcon, ChevronLeft, ChevronRight, 
  Dumbbell, Flame, Zap, CheckCircle2, Info 
} from 'lucide-react';

export const Calendario = () => {
  // --- ESTADO PARA LA NAVEGACIÓN DE FECHAS ---
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  // --- LÓGICA DE RUTINA SEGÚN TU PLAN ---
  const getRoutineDetail = (date: Date) => {
    const dayOfWeek = date.getDay(); // 0 (Dom) a 6 (Sáb)
    switch (dayOfWeek) {
      case 1: return { tipo: 'FUERZA A', desc: 'Pecho + Tríceps + Hombro', color: 'blue' };
      case 2: return { tipo: 'CARDIO', desc: '30 min LISS + Abdominales', color: 'rose' };
      case 3: return { tipo: 'FUERZA B', desc: 'Espalda + Bíceps + Core', color: 'blue' };
      case 4: return { tipo: 'CARDIO', desc: 'HIIT 20 min + Movilidad', color: 'rose' };
      case 5: return { tipo: 'FUERZA C', desc: 'Pierna Completa + Glúteo', color: 'blue' };
      case 6: return { tipo: 'ELECCIÓN', desc: 'Movimiento libre o Deporte', color: 'yellow' };
      case 0: return { tipo: 'DESCANSO', desc: 'Recuperación Total (Reset)', color: 'emerald' };
      default: return { tipo: 'RECOVERY', desc: 'Fase de descanso', color: 'emerald' };
    }
  };

  // --- CÁLCULOS DINÁMICOS DEL MES ---
  const monthData = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    // Ajustar para que la semana empiece en Lunes (0=Lun, 6=Dom)
    const startingPoint = firstDay === 0 ? 6 : firstDay - 1;
    
    return { year, month, daysInMonth, startingPoint };
  }, [currentDate]);

  const changeMonth = (offset: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1));
  };

  const isToday = (day: number) => {
    const today = new Date();
    return today.getDate() === day && 
           today.getMonth() === currentDate.getMonth() && 
           today.getFullYear() === currentDate.getFullYear();
  };

  const monthName = currentDate.toLocaleString('es-ES', { month: 'long' }).toUpperCase();

  return (
    <div className="p-8 space-y-10 max-w-7xl mx-auto text-white min-h-screen">
      
      {/* HEADER DINÁMICO */}
      <header className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-white/10 pb-10">
        <div>
          <div className="flex items-center gap-2 px-3 py-1 bg-blue-500/20 border border-blue-500/40 rounded-full w-fit mb-4">
            <CalendarIcon size={12} className="text-blue-400 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-300">Bio-Cycle Engine</span>
          </div>
          <h1 className="text-7xl font-black tracking-tighter italic uppercase leading-none">
            CRONOGRAMA <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600">DE CARGA</span>
          </h1>
        </div>
        
        <div className="flex gap-4 items-center bg-slate-900/50 p-4 rounded-2xl border border-white/5 shadow-2xl">
          <button onClick={() => changeMonth(-1)} className="p-2 hover:text-blue-400 transition-colors"><ChevronLeft size={24}/></button>
          <span className="text-xl font-black italic uppercase tracking-tighter min-w-[160px] text-center">
            {monthName} {monthData.year}
          </span>
          <button onClick={() => changeMonth(1)} className="p-2 hover:text-blue-400 transition-colors"><ChevronRight size={24}/></button>
        </div>
      </header>

      {/* GRID DEL CALENDARIO */}
      <div className="bg-[#0f172a]/80 backdrop-blur-xl border border-white/5 rounded-[3rem] p-8 shadow-2xl relative overflow-hidden">
        <div className="grid grid-cols-7 gap-4 mb-8">
          {["LUN", "MAR", "MIÉ", "JUE", "VIE", "SÁB", "DOM"].map(d => (
            <div key={d} className="text-center text-[10px] font-black text-slate-500 tracking-[0.3em] uppercase">{d}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-4">
          {/* Espacios vacíos para el inicio del mes */}
          {Array.from({ length: monthData.startingPoint }).map((_, i) => <div key={`empty-${i}`} />)}
          
          {/* Días del mes */}
          {Array.from({ length: monthData.daysInMonth }).map((_, i) => {
            const dayNum = i + 1;
            const date = new Date(monthData.year, monthData.month, dayNum);
            const routine = getRoutineDetail(date);
            const active = isToday(dayNum);

            return (
              <div key={dayNum} className="relative group">
                <motion.div 
                  onHoverStart={() => setSelectedDay(dayNum)}
                  onHoverEnd={() => setSelectedDay(null)}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className={`aspect-square rounded-[1.5rem] p-4 border-t-2 flex flex-col justify-between transition-all cursor-pointer relative overflow-hidden
                    ${active ? 'border-cyan-400 shadow-[0_0_25px_rgba(34,211,238,0.3)] bg-cyan-500/10' : 'bg-slate-900/40 border-white/5'}
                  `}
                >
                  <span className={`text-xl font-black italic ${active ? 'text-cyan-400' : 'text-slate-400'}`}>
                    {dayNum}
                  </span>
                  
                  <p className={`text-[8px] font-black uppercase tracking-tighter
                    ${routine.color === 'blue' ? 'text-blue-400' : routine.color === 'rose' ? 'text-rose-400' : 'text-emerald-400'}`}>
                    {routine.tipo}
                  </p>

                  {/* MINI POPUP AL PASAR EL MOUSE */}
                  <AnimatePresence>
                    {selectedDay === dayNum && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-slate-950/95 backdrop-blur-md p-4 z-20 flex flex-col justify-center"
                      >
                        <p className="text-[10px] font-black text-cyan-400 mb-1">DETALLE:</p>
                        <p className="text-[11px] font-bold leading-tight uppercase italic">{routine.desc}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>

      {/* RESUMEN INFERIOR DINÁMICO */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Indicator icon={<Dumbbell size={24} />} title="Enfoque de Hoy" val={getRoutineDetail(new Date()).tipo} sub={getRoutineDetail(new Date()).desc} color="blue" />
        <Indicator icon={<Zap size={24} />} title="Estado del Ciclo" val="Optimizado" sub="Rutina en fase estable" color="emerald" />
        <Indicator icon={<Info size={24} />} title="Siguiente" val={getRoutineDetail(new Date(Date.now() + 86400000)).tipo} sub="Mañana toca carga" color="rose" />
      </div>
    </div>
  );
};

// COMPONENTE REUTILIZABLE
const Indicator = ({ icon, title, val, sub, color }: any) => (
  <div className={`bg-slate-900/60 p-6 rounded-[2.2rem] border-l-4 border-${color}-500 flex items-center gap-6 shadow-xl`}>
    <div className="p-4 bg-slate-950 rounded-2xl border border-white/10 text-white">{icon}</div>
    <div>
      <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest italic">{title}</p>
      <h4 className="text-2xl font-black italic text-white leading-none tracking-tighter uppercase">{val}</h4>
      <p className="text-[10px] text-slate-500 font-bold uppercase mt-1 italic">{sub}</p>
    </div>
  </div>
);