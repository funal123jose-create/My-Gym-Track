import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Goal, WorkoutLog, NutritionLog } from '../types';

const AppContext = createContext<any>(null);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState(() => {
    const saved = localStorage.getItem('recomp_data');
    return saved ? JSON.parse(saved) : {
      goals: [{ id: '1', name: 'Recomposición', startDate: '2026-02-09', endDate: '2026-04-06', isActive: true }],
      logs: [],
      nutrition: [],
      theme: 'dark'
    };
  });

  useEffect(() => {
    localStorage.setItem('recomp_data', JSON.stringify(state));
  }, [state]);

  const toggleTheme = () => setState((s: any) => ({ ...s, theme: s.theme === 'dark' ? 'light' : 'dark' }));

  return (
    <AppContext.Provider value={{ ...state, setState, toggleTheme }}>
      <div className={state.theme === 'dark' ? 'dark' : ''}>
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
          {children}
        </div>
      </div>
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);