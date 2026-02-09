import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Utensils, Zap, Info, User, Activity, Scale, ChevronRight,
  Fish, Beef, Flame, Target, Droplets, PieChart, Microscope
} from 'lucide-react';

export const Nutricion = () => {
  const [selectedMeal, setSelectedMeal] = useState<any>(null);
  const [waterCups, setWaterCups] = useState(1);

  const config = useMemo(() => {
    const hoy = new Date();
    const hoyIdx = hoy.getDay(); 
    const dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    
    let tipoEntreno = "DESCANSO";
    let subFase = "RESET";

    if (hoyIdx === 1) { tipoEntreno = "FUERZA"; subFase = "FASE A (PECHO/HOMBROS)"; }
    else if (hoyIdx === 3) { tipoEntreno = "FUERZA"; subFase = "FASE B (ESPALDA/CORE)"; }
    else if (hoyIdx === 5) { tipoEntreno = "FUERZA"; subFase = "FASE C (PIERNA)"; }
    else if (hoyIdx === 2 || hoyIdx === 4) { tipoEntreno = "CARDIO"; subFase = "OXIDACIÓN LISS"; }
    else if (hoyIdx === 6) { tipoEntreno = "CARDIO"; subFase = "MOVIMIENTO LIBRE"; }

    const database = {
      FUERZA: {
        kcal: 2350, prote: "200G", carbs: "210G", grasa: "65G",
        p_ratio: 95, c_ratio: 90, g_ratio: 45,
        estrategia: `Día de Carga Máxima para ${subFase}. Priorizamos superávit controlado para síntesis de tejido y recuperación de glucógeno post-esfuerzo.`,
        meals: [
          { id: 1, time: "08:30", name: "PRE-WORKOUT FUEL", desc: "Avena + Whey + Plátano", kcal: 600, img: "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?q=80&w=500", details: { prote: 40, carbs: 75, grasa: 10, fibra: "12g", micros: "Magnesio, Potasio" }, ratios: { p: 30, c: 55, g: 15 } },
          { id: 2, time: "13:30", name: "RECOVERY LUNCH", desc: "Pollo + Pasta Integral + Brócoli", kcal: 750, img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=500", details: { prote: 55, carbs: 80, grasa: 15, fibra: "10g", micros: "Hierro, B12" }, ratios: { p: 35, c: 45, g: 20 } },
          { id: 3, time: "17:30", name: "POST-WORKOUT REPAIR", desc: "Batido ISO + Galletas de Arroz", kcal: 400, img: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?q=80&w=500", details: { prote: 35, carbs: 50, grasa: 5, fibra: "2g", micros: "BCAA's" }, ratios: { p: 60, c: 35, g: 5 } },
          { id: 4, time: "21:00", name: "ANABOLIC DINNER", desc: "Salmón + Arroz + Espárragos", kcal: 600, img: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=500", details: { prote: 45, carbs: 45, grasa: 25, fibra: "8g", micros: "Omega 3, Zinc" }, ratios: { p: 35, c: 35, g: 30 } },
        ]
      },
      CARDIO: {
        kcal: 1850, prote: "190G", carbs: "110G", grasa: "75G",
        p_ratio: 88, c_ratio: 45, g_ratio: 68,
        estrategia: `Día de Oxidación - ${subFase}. Reducción de carga insulínica para favorecer la lipólisis manteniendo la masa muscular.`,
        meals: [
          { id: 1, time: "09:00", name: "METABOLIC BREAKFAST", desc: "Omelette 3 huevos + Palta", kcal: 500, img: "https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=500", details: { prote: 30, carbs: 8, grasa: 38, fibra: "9g", micros: "Colina, Vit D" }, ratios: { p: 25, c: 10, g: 65 } },
          { id: 2, time: "14:00", name: "LOW-CARB LUNCH", desc: "Atún + Mix Verde + Nueces", kcal: 650, img: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=500", details: { prote: 50, carbs: 12, grasa: 45, fibra: "14g", micros: "Yodo, Selenio" }, ratios: { p: 35, c: 10, g: 55 } },
          { id: 3, time: "18:00", name: "PROTEIN SNACK", desc: "Yogur Griego + Almendras", kcal: 300, img: "https://images.unsplash.com/photo-1596591606975-97ee5cef3a1e?q=80&w=500", details: { prote: 25, carbs: 10, grasa: 18, fibra: "4g", micros: "Calcio" }, ratios: { p: 40, c: 15, g: 45 } },
          { id: 4, time: "20:30", name: "CLEAN DINNER", desc: "Pechuga Grill + Calabacín", kcal: 400, img: "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?q=80&w=500", details: { prote: 45, carbs: 10, grasa: 20, fibra: "10g", micros: "Zinc, Vit C" }, ratios: { p: 50, c: 10, g: 40 } },
        ]
      },
      DESCANSO: {
        kcal: 1600, prote: "170G", carbs: "70G", grasa: "75G",
        p_ratio: 78, c_ratio: 25, g_ratio: 65,
        estrategia: "Reset Metabólico y Reparación Estructural. Enfoque en densidad nutricional y control de inflamación.",
        meals: [
          { id: 1, time: "10:00", name: "RECOVERY BRUNCH", desc: "Huevos Poché + Espinacas", kcal: 450, img: "https://images.unsplash.com/photo-1510629954389-c1e0da47d414?q=80&w=500", details: { prote: 30, carbs: 10, grasa: 30, fibra: "8g", micros: "Vit A, K" }, ratios: { p: 35, c: 10, g: 55 } },
          { id: 2, time: "15:00", name: "VITALITY LUNCH", desc: "Bowl de Pavo y Semillas", kcal: 550, img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=500", details: { prote: 45, carbs: 15, grasa: 35, fibra: "12g", micros: "Hierro" }, ratios: { p: 40, c: 15, g: 45 } },
          { id: 3, time: "20:00", name: "LIGHT DINNER", desc: "Sopa de Huesos + Pollo", kcal: 600, img: "https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=500", details: { prote: 45, carbs: 10, grasa: 40, fibra: "5g", micros: "Colágeno" }, ratios: { p: 35, c: 10, g: 55 } },
        ]
      }
    };

    return {
      dia: dias[hoyIdx],
      tipo: tipoEntreno,
      subFase: subFase,
      data: database[tipoEntreno as keyof typeof database]
    };
  }, []);

  const currentMeals = config.data.meals;
  const dailyCalories = config.data.kcal;

  const getWaterStatus = () => {
    if (waterCups <= 2) return { text: "ESTADO: DESHIDRATACIÓN CRÍTICA - ¡BEBE AGUA!", color: "text-red-500" };
    if (waterCups <= 5) return { text: "ESTADO: NIVEL BAJO - MANTENTE HIDRATADO", color: "text-cyan-400" };
    if (waterCups <= 7) return { text: "ESTADO: ÓPTIMO - BUEN RITMO", color: "text-emerald-400" };
    return { text: "ESTADO: HIDRATACIÓN COMPLETA", color: "text-yellow-400" };
  };

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto text-white bg-[#020617] min-h-screen font-sans">
      
      {/* 1. KPIS SUPERIORES */}
      <section className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {[
          { label: "PESO", val: "79KG", icon: <Scale size={14}/>, color: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
          { label: "DÍA", val: config.dia.toUpperCase(), icon: <User size={14}/>, color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
          { label: "PROGRAMA", val: config.subFase, icon: <Activity size={14}/>, color: "bg-purple-500/10 text-purple-400 border-purple-500/20" },
          { label: "OBJETIVO", val: "RECOMP", icon: <Target size={14}/>, color: "bg-orange-500/10 text-orange-400 border-orange-500/20" },
          { label: "CALORÍAS HOY", val: `${dailyCalories} KCAL`, icon: <Flame size={14}/>, color: "bg-pink-500/10 text-pink-400 border-pink-500/40" },
        ].map((stat, i) => (
          <div key={i} className={`bg-[#0f172a] border ${stat.color.split(' ')[2]} p-4 rounded-xl flex items-center gap-4 shadow-lg`}>
            <div className={`p-2 rounded-lg ${stat.color.split(' ')[0]} ${stat.color.split(' ')[1]}`}>{stat.icon}</div>
            <div>
              <p className="text-[7px] font-black text-slate-500 tracking-widest uppercase">{stat.label}</p>
              <p className="text-[10px] font-black italic uppercase tracking-tighter leading-tight">{stat.val}</p>
            </div>
          </div>
        ))}
      </section>

      {/* TÍTULO */}
      <div className="pt-4 text-center md:text-left">
        <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase leading-[0.8] mb-10">
          BIO <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500 font-black">FUELING</span>
        </h1>
      </div>

      {/* MACRO CARDS CON DISEÑO DEL DASHBOARD */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MacroCard title="CONSTRUCCIÓN" value={config.data.prote} label="PROTEÍNA" color="emerald" progress={config.data.p_ratio} icon={<Beef size={28}/>} sub="REPARACIÓN ACTIVA" />
        <MacroCard title="ENERGÍA" value={config.data.carbs} label="CARBOHIDRATOS" color="cyan" progress={config.data.c_ratio} icon={<Zap size={28}/>} sub="SUMINISTRO GLUCÓGENO" />
        <MacroCard title="SOPORTE" value={config.data.orange} label="GRASAS" color="orange" progress={config.data.g_ratio} icon={<Fish size={28}/>} sub="OPTIMIZACIÓN HORMONAL" macroValue={config.data.grasa} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-6">
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-xl font-black italic uppercase flex items-center gap-3 tracking-tighter">
             <Utensils className="text-emerald-400" size={20} /> Plan de Alimentación Eficiente
          </h3>
          <div className="space-y-4">
            {currentMeals.map((meal) => (
              <motion.div 
                key={meal.id} whileHover={{ x: 10 }} onClick={() => setSelectedMeal(meal)}
                className="flex items-center gap-6 p-4 bg-[#111827]/40 border border-white/5 rounded-[2rem] cursor-pointer hover:bg-white/5 group transition-all"
              >
                <img src={meal.img} className="w-20 h-20 rounded-2xl object-cover border border-white/10 group-hover:border-emerald-500/50 transition-all" />
                <div className="flex-1 text-slate-100">
                  <p className="text-emerald-400 font-black italic text-[9px] mb-1 tracking-widest uppercase">{meal.time} HS</p>
                  <h5 className="font-black italic text-sm uppercase group-hover:text-emerald-400 transition-colors">{meal.name}</h5>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tight">{meal.desc}</p>
                </div>
                <div className="text-right mr-4 text-white">
                  <span className="text-xl font-black italic">{meal.kcal}</span>
                  <span className="text-[8px] block text-slate-600 font-black uppercase tracking-widest">KCAL</span>
                </div>
                <ChevronRight className="text-slate-700 group-hover:text-emerald-400" />
              </motion.div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-[#111827] border-l-4 border-l-emerald-500 p-8 rounded-[2rem] shadow-2xl">
             <div className="flex items-center gap-3 mb-6">
                <Info className="text-emerald-400" size={20} />
                <h4 className="font-black italic uppercase text-[10px] tracking-[0.3em] text-emerald-500">Estrategia del Día</h4>
             </div>
             <p className="text-xl font-medium italic leading-relaxed text-slate-200 tracking-tight">
                "{config.data.estrategia}"
             </p>
          </div>

          <div className="bg-[#0f172a] border border-white/5 rounded-[3rem] p-8 relative overflow-hidden shadow-2xl">
            <div className="relative z-10">
                <div className="flex justify-between items-start mb-6 text-white">
                    <div>
                        <h5 className="font-black uppercase italic text-lg mb-1 tracking-tighter">Hidratación</h5>
                        <p className="text-[9px] text-slate-500 font-black tracking-widest uppercase">Meta: 3.5L / 8 Vasos</p>
                    </div>
                    <Droplets className="text-cyan-400 animate-pulse" size={24} />
                </div>
                <div className="flex flex-wrap gap-2 mb-6">
                    {[...Array(8)].map((_, i) => (
                        <button key={i} onClick={() => setWaterCups(i + 1)} className={`w-10 h-10 rounded-xl border-2 flex items-center justify-center transition-all ${i < waterCups ? 'bg-cyan-500 border-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.5)]' : 'bg-white/5 border-white/10'}`}>
                            <span className={`text-[10px] font-black ${i < waterCups ? 'text-white' : 'text-slate-600'}`}>{i + 1}</span>
                        </button>
                    ))}
                </div>
                <div className="relative h-3 bg-white/5 rounded-full overflow-hidden mb-4">
                    <motion.div 
                      initial={{ width: 0 }} 
                      animate={{ width: `${(waterCups/8)*100}%` }} 
                      transition={{ duration: 1, ease: "circOut" }}
                      className="h-full bg-gradient-to-r from-cyan-600 to-blue-400" 
                    />
                </div>
                <p className={`text-[9px] font-black text-center tracking-[0.15em] uppercase italic ${getWaterStatus().color}`}>
                    {getWaterStatus().text}
                </p>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedMeal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedMeal(null)} className="absolute inset-0 bg-black/95 backdrop-blur-xl" />
            <motion.div initial={{ scale: 0.9, y: 30, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.9, y: 30, opacity: 0 }} className="bg-[#0f172a] border border-white/10 w-full max-w-4xl rounded-[3rem] overflow-hidden relative z-10 shadow-3xl flex flex-col md:flex-row min-h-[500px]">
              <div className="w-full md:w-5/12 relative min-h-[300px] md:min-h-full border-r border-white/5">
                <img src={selectedMeal.img} className="absolute inset-0 w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700" alt={selectedMeal.name} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/20 to-transparent" />
                <div className="absolute top-6 left-6">
                  <div className="bg-black/60 backdrop-blur-md border border-white/10 px-4 py-2 rounded-2xl text-white">
                    <p className="text-[10px] font-black text-emerald-400 tracking-[0.2em] uppercase">Energy Core</p>
                    <p className="text-2xl font-black italic">{selectedMeal.kcal} <span className="text-xs tracking-tighter text-slate-400">KCAL</span></p>
                  </div>
                </div>
                <div className="absolute bottom-8 left-8 right-8">
                    <p className="text-emerald-500 font-black text-[10px] tracking-[0.4em] uppercase mb-2 italic">Protocolo de Ingesta</p>
                    <h4 className="text-5xl font-black italic uppercase tracking-tighter leading-none text-white drop-shadow-2xl">{selectedMeal.name}</h4>
                </div>
              </div>
              <div className="w-full md:w-7/12 p-8 md:p-12 flex flex-col justify-between relative">
                <div>
                  <div className="flex justify-between items-start mb-10">
                      <div>
                        <h5 className="font-black italic uppercase text-white text-xl tracking-tighter">Análisis de Macros</h5>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Distribución Bio-Métrica 100%</p>
                      </div>
                      <div className="p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 text-emerald-500">
                        <PieChart size={24} />
                      </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-10">
                      <div className="relative flex justify-center">
                          <svg width="150" height="150" viewBox="0 0 100 100" className="drop-shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                              <circle cx="50" cy="50" r="42" fill="transparent" stroke="#1e293b" strokeWidth="10" />
                              <motion.circle initial={{ pathLength: 0 }} animate={{ pathLength: selectedMeal.ratios.p / 100 }} transition={{ duration: 1, ease: "easeOut" }} cx="50" cy="50" r="42" fill="transparent" stroke="#10b981" strokeWidth="10" strokeDasharray="264" transform="rotate(-90 50 50)" strokeLinecap="round" />
                              <circle cx="50" cy="50" r="42" fill="transparent" stroke="#06b6d4" strokeWidth="10" strokeDasharray={`${selectedMeal.ratios.c * 2.64} 264`} strokeDashoffset={`-${selectedMeal.ratios.p * 2.64}`} transform="rotate(-90 50 50)" strokeLinecap="round" />
                              <circle cx="50" cy="50" r="42" fill="transparent" stroke="#f97316" strokeWidth="10" strokeDasharray={`${selectedMeal.ratios.g * 2.64} 264`} strokeDashoffset={`-${((selectedMeal.ratios.p + selectedMeal.ratios.c) * 2.64)}`} transform="rotate(-90 50 50)" strokeLinecap="round" />
                              <text x="50" y="55" textAnchor="middle" fill="white" fontSize="14" className="font-black italic uppercase">Bio</text>
                          </svg>
                      </div>
                      <div className="space-y-4">
                          {[{label:"Proteína", color:"text-emerald-400", val:selectedMeal.details.prote}, {label:"Carbos", color:"text-cyan-400", val:selectedMeal.details.carbs}, {label:"Grasas", color:"text-orange-400", val:selectedMeal.details.grasa}].map((m, i) => (
                             <div key={i} className="flex justify-between items-end border-b border-white/5 pb-2">
                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{m.label}</span>
                                <span className={`text-xl font-black italic ${m.color}`}>{m.val}g</span>
                             </div>
                          ))}
                      </div>
                  </div>
                  <div className="bg-white/5 rounded-[2rem] p-6 mb-8 border border-white/5 text-white">
                    <div className="flex gap-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2 text-slate-500">
                          <Microscope size={14} />
                          <span className="text-[8px] font-black uppercase tracking-[0.2em]">Micronutrientes</span>
                        </div>
                        <p className="text-sm font-bold italic text-emerald-400">{selectedMeal.details.micros}</p>
                      </div>
                      <div className="w-px bg-white/10" />
                      <div className="flex-1 text-right">
                        <div className="flex items-center justify-end gap-2 mb-2 text-slate-500">
                          <span className="text-[8px] font-black uppercase tracking-[0.2em]">Fibra</span>
                        </div>
                        <p className="text-xl font-black italic text-white">{selectedMeal.details.fibra}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <button onClick={() => setSelectedMeal(null)} className="group relative w-full py-5 bg-white text-black font-black uppercase italic rounded-2xl transition-all overflow-hidden text-sm">
                    <div className="absolute inset-0 bg-emerald-400 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    <span className="relative z-10 flex items-center justify-center gap-2">CONFIRMAR REGISTRO <ChevronRight size={18} /></span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

// COMPONENTE MACROCARD ACTUALIZADO CON COLORES SÓLIDOS Y ANIMACIÓN
const MacroCard = ({ title, value, label, color, progress, icon, sub, macroValue }: any) => {
    const schemes: any = {
      emerald: "from-emerald-700 to-teal-900 border-emerald-400/50 shadow-emerald-500/40",
      cyan: "from-blue-700 to-cyan-900 border-cyan-400/50 shadow-cyan-500/40",
      orange: "from-orange-700 to-amber-900 border-orange-400/50 shadow-orange-500/40",
    };

    return (
        <motion.div 
          whileHover={{ y: -8, scale: 1.02 }}
          className={`relative rounded-[2.5rem] p-7 overflow-hidden shadow-2xl border-t-2 bg-gradient-to-br ${schemes[color]} transition-all duration-300 group`}
        >
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
            <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <p className="text-[8px] font-black text-white/60 uppercase tracking-widest mb-1 italic">{title}</p>
                        <h4 className="text-5xl font-black italic tracking-tighter leading-none mb-1 text-white drop-shadow-md">
                          {macroValue ? macroValue : value}
                        </h4>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/90">{label}</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-black/20 backdrop-blur-md border border-white/20 text-white">{icon}</div>
                </div>
                <div className="space-y-3">
                    <div className="h-2 w-full bg-black/30 rounded-full overflow-hidden border border-white/10">
                        <motion.div 
                          initial={{ width: 0 }} 
                          animate={{ width: `${progress}%` }} 
                          transition={{ duration: 1.5, ease: "circOut" }}
                          className="h-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)]" 
                        />
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-[8px] font-black text-white/60 uppercase tracking-widest italic">{sub}</p>
                      <span className="text-[10px] font-black text-white italic">{progress}%</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};