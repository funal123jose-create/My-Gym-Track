import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, BarChart3, Award, Scale, 
  Dumbbell, Target, Zap,  
} from 'lucide-react';

export const Progreso = () => {
  // Simulación de datos de progreso (Kilos levantados por semana)
  const [volumenData] = useState([4500, 5200, 4900, 6100, 5800, 7200]);
  
  // Función para generar el gráfico de barras neón
  const maxVol = Math.max(...volumenData);

  return (
    <div className="p-8 space-y-10 max-w-7xl mx-auto text-white min-h-screen">
      
      {/* HEADER DE PROGRESO */}
      <header className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-white/10 pb-10">
        <div>
          <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/20 border border-emerald-500/40 rounded-full w-fit mb-4">
            <TrendingUp size={12} className="text-emerald-400 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-300">Evolution Tracking</span>
          </div>
          <h1 className="text-7xl font-black tracking-tighter italic uppercase leading-none">
            REGISTRO DE <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-600">EVOLUCIÓN</span>
          </h1>
        </div>
        
        <div className="flex gap-4">
          <div className="text-right">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic">Total Levantado</p>
            <p className="text-4xl font-black italic text-emerald-400">33.7 Tons</p>
          </div>
        </div>
      </header>

      {/* STAT CARDS - TU DISEÑO ORIGINAL RESTAURADO */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={<Scale size={28} />} title="Peso Actual" value="78.5 KG" progress={70} color="emerald" />
        <StatCard icon={<Target size={28} />} title="Grasa Corporal" value="12.4%" progress={45} color="blue" />
        <StatCard icon={<Award size={28} />} title="Puntos de Poder" value="2,450" progress={80} color="yellow" />
        <StatCard icon={<Dumbbell size={28} />} title="Max Bench" value="110 KG" progress={90} color="rose" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* GRÁFICO DE VOLUMEN DE CARGA (BARRAS NEÓN) */}
        <div className="lg:col-span-2 bg-[#0f172a]/80 backdrop-blur-xl border border-white/5 rounded-[3rem] p-10 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
          
          <h3 className="text-xl font-black italic uppercase flex items-center gap-3 mb-12 relative z-10">
            <BarChart3 className="text-emerald-400" /> Volumen de Carga Semanal
          </h3>

          <div className="relative h-64 flex items-end justify-between gap-4 z-10 px-4">
            {volumenData.map((val, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-4 group">
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: `${(val / maxVol) * 100}%` }}
                  transition={{ delay: i * 0.1, duration: 1, ease: "circOut" }}
                  className="w-full max-w-[40px] bg-emerald-500 rounded-t-xl relative shadow-[0_0_20px_rgba(16,185,129,0.4)] group-hover:bg-emerald-400 group-hover:shadow-[0_0_30px_rgba(16,185,129,0.6)] transition-all"
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] font-black opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {val} KG
                  </div>
                </motion.div>
                <span className="text-[10px] font-black text-slate-500 uppercase italic">Sem {i + 1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* LOG DE LOGROS (DERECHA) */}
        <div className="space-y-6">
          <h3 className="text-sm font-black italic uppercase text-slate-500 tracking-[0.3em] mb-4">Últimos Hitos</h3>
          
          <Indicator icon={<Zap className="text-yellow-400" />} title="Nuevo Récord" val="Sentadilla" sub="+10kg esta semana" color="blue" />
          <Indicator icon={<Award className="text-rose-400" />} title="Consistencia" val="Nivel 15" sub="14 días seguidos" color="emerald" />
          
          {/* TARJETA DE ANÁLISIS IA */}
          <motion.div whileHover={{ scale: 1.02 }} className="relative p-8 rounded-[2.5rem] bg-gradient-to-br from-emerald-900/40 via-slate-900 to-black border border-emerald-500/30 overflow-hidden shadow-2xl">
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2.5 bg-emerald-500 rounded-xl shadow-[0_0_15px_rgba(16,185,129,0.5)]"><BarChart3 size={20} className="text-white" /></div>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400">Análisis Predictivo</span>
              </div>
              <p className="text-[14px] font-medium italic text-slate-300 leading-relaxed italic">
                "Basado en tu volumen actual, proyectamos un aumento del 5% en tu fuerza máxima para finales de mes. Mantén el ratio de recuperación."
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// --- COMPONENTES AUXILIARES (TU DISEÑO EXACTO REINSTALADO) ---
const StatCard = ({ icon, title, value, progress, color }: any) => {
  const schemes: any = {
    blue: "bg-blue-600 shadow-blue-500/40 border-blue-400/50",
    yellow: "bg-amber-500 shadow-yellow-500/40 border-yellow-300/50",
    emerald: "bg-emerald-500 shadow-emerald-500/40 border-emerald-300/50",
    rose: "bg-rose-500 shadow-rose-500/40 border-rose-300/50",
  };

  return (
    <motion.div 
      whileHover={{ y: -8, scale: 1.02 }}
      className={`relative rounded-[2.5rem] p-8 overflow-hidden shadow-2xl border-t-2 ${schemes[color]} transition-all duration-300 group`}
    >
      <div className={`absolute inset-0 opacity-90 bg-gradient-to-br ${
        color === 'blue' ? 'from-blue-700 to-cyan-900' :
        color === 'yellow' ? 'from-amber-600 to-orange-900' :
        color === 'emerald' ? 'from-emerald-700 to-teal-900' :
        'from-rose-700 to-pink-900'
      }`} />
      <div className="relative z-10 flex flex-col h-full justify-between text-white">
        <div className="flex justify-between items-start">
          <div className="p-4 bg-black/20 backdrop-blur-md rounded-2xl border border-white/20">{icon}</div>
          <div className="text-right">
            <p className="text-[9px] font-black text-white/60 uppercase tracking-widest italic">{title}</p>
            <p className="text-4xl font-black italic tracking-tighter drop-shadow-md">{value}</p>
          </div>
        </div>
        <div className="mt-10 space-y-3">
          <div className="h-2 w-full bg-black/30 rounded-full overflow-hidden border border-white/10">
            <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 1.5, ease: "circOut" }} className="h-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)]" />
          </div>
          <div className="flex justify-between text-[10px] font-black text-white/70 uppercase italic tracking-tighter">
            <span>Progress Bio-Sync</span>
            <span>{progress}%</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Indicator = ({ icon, title, val, sub, color }: any) => {
  const borders: any = {
    emerald: "border-emerald-500/40 hover:bg-emerald-500/5",
    blue: "border-blue-500/40 hover:bg-blue-500/5"
  };
  return (
    <motion.div whileHover={{ x: 10 }} className={`bg-slate-900/60 backdrop-blur-xl p-6 rounded-[2.2rem] border-l-4 ${borders[color]} flex items-center gap-6 transition-all shadow-xl`}>
      <div className="p-4 bg-slate-950 rounded-2xl border border-white/10 shadow-lg text-white">{icon}</div>
      <div>
        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1 italic">{title}</p>
        <h4 className="text-2xl font-black italic text-white uppercase leading-none tracking-tighter">{val}</h4>
        <p className="text-[10px] text-slate-500 font-bold uppercase mt-1 italic">{sub}</p>
      </div>
    </motion.div>
  );
};