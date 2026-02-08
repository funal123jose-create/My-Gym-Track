import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Dumbbell, Zap, Footprints, Flame, 
  Target, Droplets, Activity, Bot, Sparkles, BatteryCharging
} from 'lucide-react';

export const Dashboard = () => {
  const [fuel, setFuel] = useState({ glycogen: 85, atp: 70, amino: 90 });

  // --- LÓGICA DE PASOS CON MEMORIA ---
  const [dailySteps, setDailySteps] = useState(8500); // Pasos de hoy
  const [weeklySteps, setWeeklySteps] = useState(() => {
    // Intenta leer la memoria al cargar
    const saved = localStorage.getItem('recomp_weekly_steps');
    return saved ? parseInt(saved) : 42500; // Valor base si es la primera vez
  });

  // Cada vez que cambian los pasos semanales, los guardamos en la "memoria"
  useEffect(() => {
    localStorage.setItem('recomp_weekly_steps', weeklySteps.toString());
  }, [weeklySteps]);

  // --- LÓGICA DE REGENERACIÓN AUTOMÁTICA ---
  useEffect(() => {
    const recoveryInterval = setInterval(() => {
      setFuel(prev => ({
        atp: Math.min(prev.atp + 2, 100),
        glycogen: Math.min(prev.glycogen + 0.5, 100),
        amino: Math.min(prev.amino + 0.2, 100)
      }));
    }, 3000);

    return () => clearInterval(recoveryInterval);
  }, []);

  // --- IA REAL: SINCRONIZACIÓN CON CALENDARIO Y NUTRICIÓN ---
  const config = useMemo(() => {
    const hoy = new Date();
    const hoyIdx = hoy.getDay(); 
    const dias = ["DOMINGO", "LUNES", "MARTES", "MIÉRCOLES", "JUEVES", "VIERNES", "SÁBADO"];
    
    let tipo = "DESCANSO";
    let subFase = "REPARACIÓN TOTAL";
    let metaProteina = "160g";
    let subObjetivo = "RESET METABÓLICO";
    
    if (hoyIdx === 1) { 
      tipo = "FUERZA A"; subFase = "PECHO / HOMBROS"; metaProteina = "200g"; subObjetivo = "HIPERTROFIA + CARGA"; 
    } else if (hoyIdx === 3) { 
      tipo = "FUERZA B"; subFase = "ESPALDA / CORE"; metaProteina = "200g"; subObjetivo = "HIPERTROFIA + TRACCIÓN";
    } else if (hoyIdx === 5) { 
      tipo = "FUERZA C"; subFase = "PIERNA COMPLETA"; metaProteina = "200g"; subObjetivo = "POTENCIA ESTRUCTURAL";
    } else if ([2, 4, 6].includes(hoyIdx)) {
      tipo = "CARDIO"; 
      subFase = "OXIDAC. LISS"; 
      metaProteina = "180g"; 
      subObjetivo = "DÉFICIT DINÁMICO";
    }

    let coachMsg = "";
    if (fuel.glycogen < 40) {
      coachMsg = `Alerta: Glucógeno bajo para ${tipo}. El sistema requiere carga inmediata.`;
    } else if (tipo.includes("FUERZA") && fuel.atp > 85) {
      coachMsg = `Sistemas al 100% para ${subFase}. Es el momento óptimo para alta intensidad.`;
    } else if (tipo === "CARDIO") {
      coachMsg = `Día de oxidación activa. Mantén zona 2 para maximizar uso de grasas.`;
    } else {
      coachMsg = "Sustratos en fase de regeneración. Mantén ingesta proteica.";
    }

    return { nombreDia: dias[hoyIdx], tipo, subFase, metaProteina, subObjetivo, coachMsg };
  }, [fuel]);

  const handleBurnFuel = () => {
    setFuel({
      glycogen: Math.max(fuel.glycogen - 15, 5),
      atp: Math.max(fuel.atp - 25, 10),
      amino: Math.max(fuel.amino - 12, 15)
    });
    // Simulación: Al quemar fuel, también sumamos unos pasos al contador
    setDailySteps(prev => prev + 50);
    setWeeklySteps(prev => prev + 50);
  };

  const titleLetter = {
    initial: { y: 40, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <div className="p-8 space-y-10 max-w-7xl mx-auto text-white min-h-screen">
      
      {/* HEADER */}
      <header className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-white/10 pb-10">
        <div className="overflow-hidden">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-2 px-3 py-1 bg-cyan-500/20 border border-cyan-500/40 rounded-full backdrop-blur-md">
                <BatteryCharging size={12} className="text-cyan-400 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-300">Bio-Fuel System: {config.nombreDia}</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-x-4">
              {["RESERVA", "DE", "ENERGÍA"].map((word, i) => (
                <motion.span key={i} variants={titleLetter} initial="initial" animate="animate"
                  transition={{ delay: i * 0.1, duration: 0.8, ease: [0.6, 0.01, 0.05, 0.95] }}
                  className={`text-7xl font-black tracking-tighter italic uppercase leading-none ${i === 2 ? 'text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-600' : 'text-white'}`}>
                  {word}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
        
        <motion.button 
          onClick={handleBurnFuel}
          whileHover={{ scale: 1.05, boxShadow: "0px 0px 30px rgba(234, 179, 8, 0.5)" }}
          whileTap={{ scale: 0.95 }}
          className="bg-white text-slate-950 px-12 py-5 rounded-2xl font-black italic uppercase tracking-tighter flex items-center gap-3 shadow-[0_10px_20px_rgba(255,255,255,0.1)] transition-all"
        >
          CONSUMIR COMBUSTIBLE <Zap size={20} strokeWidth={3} />
        </motion.button>
      </header>

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={<Dumbbell size={28} />} title="Modo de Hoy" value={config.tipo} progress={100} color="blue" />
        <StatCard icon={<Zap size={28} />} title="Meta Proteína" value={config.metaProteina} progress={85} color="yellow" />
        {/* PASOS: Ahora muestra los pasos de hoy y la memoria semanal en el texto de abajo */}
        <StatCard 
          icon={<Footprints size={28} />} 
          title="Pasos Hoy" 
          value={`${(dailySteps / 1000).toFixed(1)}k / 10k`} 
          progress={(dailySteps / 10000) * 100} 
          color="emerald" 
          subText={`SEMANA: ${(weeklySteps / 1000).toFixed(1)}K`}
        />
        <StatCard icon={<Flame size={28} />} title="Enfoque" value={config.subFase.split(' ')[0]} progress={100} color="rose" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-[#0f172a]/80 backdrop-blur-xl border border-white/5 rounded-[3rem] p-10 relative overflow-hidden group">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
          <div className="flex justify-between items-center mb-10 relative z-10">
             <h3 className="text-xl font-black italic uppercase flex items-center gap-3">
              <Activity className="text-yellow-400 animate-pulse" /> Estado de Sustratos Vitales
            </h3>
            <span className="text-[10px] font-black text-cyan-400 border border-cyan-400/30 px-3 py-1 rounded-full animate-pulse">
              REGENERACIÓN {config.tipo.includes("FUERZA") ? "POST-CARGA" : "PASIVA"}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-8 relative z-10 h-64 mb-4">
            <FuelCell label="Glucógeno" value={Math.floor(fuel.glycogen)} color="#eab308" sub="Carbohidratos" />
            <FuelCell label="ATP Sync" value={Math.floor(fuel.atp)} color="#22d3ee" sub="Fuerza Expl." />
            <FuelCell label="Aminoácidos" value={Math.floor(fuel.amino)} color="#f43f5e" sub="Construcción" />
          </div>
        </div>

        <div className="space-y-6">
            <Indicator icon={<Target className="text-emerald-400" />} title="Objetivo Actual" val={config.tipo} sub={config.subObjetivo} color="emerald" />
            <Indicator icon={<Droplets className="text-blue-400" />} title="Hidratación" val="1.5 / 3L" sub="Plan Bio-Fuel Activo" color="blue" />
            <motion.div whileHover={{ scale: 1.02 }} className="relative p-8 rounded-[2.5rem] bg-gradient-to-br from-indigo-900/40 via-slate-900 to-black border border-indigo-500/30 overflow-hidden shadow-2xl group">
               <div className="absolute -right-6 -bottom-6 text-indigo-500/5 group-hover:text-indigo-500/10 transition-all duration-500"><Bot size={180} /></div>
               <div className="relative z-10">
                 <div className="flex items-center gap-3 mb-5">
                   <div className="p-2.5 bg-indigo-500 rounded-xl shadow-[0_0_15px_rgba(99,102,241,0.5)]"><Bot size={20} className="text-white" /></div>
                   <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400">Gemini IA Coach</span>
                 </div>
                 <p className="text-[15px] font-medium italic text-slate-300 leading-relaxed italic">"{config.coachMsg}"</p>
                 <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2 text-indigo-400/80 font-black text-[9px] uppercase tracking-widest italic"><Sparkles size={14} className="animate-spin-slow" /> Optimización en tiempo real</div>
               </div>
            </motion.div>
        </div>
      </div>
    </div>
  );
};

// --- COMPONENTES AUXILIARES ---

const FuelCell = ({ label, value, color, sub }: any) => (
  <div className="flex flex-col items-center gap-4 h-full">
    <div className="flex-1 w-full bg-black/40 rounded-3xl border border-white/5 relative overflow-hidden flex flex-col justify-end p-1.5">
      <motion.div animate={{ height: `${value}%` }} transition={{ type: "tween", ease: "linear" }}
        style={{ backgroundColor: color, boxShadow: `0 0 30px ${color}44` }}
        className="w-full rounded-2xl relative" />
    </div>
    <div className="text-center">
      <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest italic leading-none">{label}</p>
      <p className="text-2xl font-black italic text-white my-1">{value}%</p>
      <p className="text-[8px] font-bold text-slate-600 uppercase italic">{sub}</p>
    </div>
  </div>
);

const StatCard = ({ icon, title, value, progress, color, subText }: any) => {
  const schemes: any = {
    blue: "bg-blue-600 shadow-blue-500/40 border-blue-400/50",
    yellow: "bg-amber-500 shadow-yellow-500/40 border-yellow-300/50",
    emerald: "bg-emerald-500 shadow-emerald-500/40 border-emerald-300/50",
    rose: "bg-rose-500 shadow-rose-500/40 border-rose-300/50",
  };
  return (
    <motion.div whileHover={{ y: -8, scale: 1.02 }} className={`relative rounded-[2.5rem] p-7 overflow-hidden shadow-2xl border-t-2 ${schemes[color]} transition-all duration-300 group`}>
      <div className={`absolute inset-0 opacity-90 bg-gradient-to-br ${color === 'blue' ? 'from-blue-700 to-cyan-900' : color === 'yellow' ? 'from-amber-600 to-orange-900' : color === 'emerald' ? 'from-emerald-700 to-teal-900' : 'from-rose-700 to-pink-900'}`} />
      <div className="relative z-10 flex flex-col h-full justify-between text-white">
        <div className="flex justify-between items-start gap-3">
          <div className="p-3 bg-black/20 backdrop-blur-md rounded-xl border border-white/20 shrink-0">{icon}</div>
          <div className="text-right min-w-0">
            <p className="text-[9px] font-black text-white/60 uppercase tracking-widest italic">{title}</p>
            <p className="text-4xl font-black italic tracking-tighter drop-shadow-md leading-none uppercase break-words">{value}</p>
          </div>
        </div>
        <div className="mt-8 space-y-3">
          <div className="h-2 w-full bg-black/30 rounded-full overflow-hidden border border-white/10">
            <motion.div animate={{ width: `${Math.min(progress, 100)}%` }} className="h-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)]" />
          </div>
          <div className="flex justify-between text-[10px] font-black text-white/70 uppercase italic tracking-tighter">
            <span>{subText ? subText : "Sincronizado"}</span>
            <span>{Math.floor(progress)}%</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Indicator = ({ icon, title, val, sub, color }: any) => {
  const borders: any = { emerald: "border-emerald-500/40 hover:bg-emerald-500/5", blue: "border-blue-500/40 hover:bg-blue-500/5" };
  return (
    <motion.div whileHover={{ x: 10 }} className={`bg-slate-900/60 backdrop-blur-xl p-6 rounded-[2.2rem] border-l-4 ${borders[color]} flex items-center gap-6 transition-all shadow-xl`}>
      <div className="p-4 bg-slate-950 rounded-2xl border border-white/10 shadow-lg text-white">{icon}</div>
      <div>
        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1 italic">{title}</p>
        <h4 className="text-2xl font-black italic text-white uppercase leading-none tracking-tighter">{val}</h4>
        <p className="text-[10px] text-slate-500 font-bold uppercase mt-1 italic leading-tight">{sub}</p>
      </div>
    </motion.div>
  );
};