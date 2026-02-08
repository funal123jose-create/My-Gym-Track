export interface Goal {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

export interface WorkoutLog {
  id: string;
  date: string;
  type: 'Fuerza A' | 'Fuerza B' | 'Fuerza C' | 'Cardio' | 'Descanso';
  exercises: { name: string; sets: number; reps: string; weight?: string; rpe?: number }[];
  duration: number;
  notes: string;
}

export interface NutritionLog {
  date: string;
  protein: number;
  calories: number;
  water: number;
  sleep: number;
}