import React, { createContext, useContext, useState, useEffect } from "react";

export interface ScheduleEvent {
  id: string;
  day: string;
  time: string;
  title: string;
  location: string;
}

interface ScheduleContextType {
  events: ScheduleEvent[];
  addEvent: (event: Omit<ScheduleEvent, "id">) => void;
  removeEvent: (id: string) => void;
}

const ScheduleContext = createContext<ScheduleContextType | undefined>(undefined);

export const useSchedule = () => {
  const ctx = useContext(ScheduleContext);
  if (!ctx) throw new Error("useSchedule must be used within ScheduleProvider");
  return ctx;
};

const STORAGE_KEY = "church_schedule";

const defaultEvents: ScheduleEvent[] = [
  { id: "1", day: "Domingo", time: "09:00", title: "Escola Bíblica Dominical", location: "Sede Mundial" },
  { id: "2", day: "Domingo", time: "18:00", title: "Culto de Celebração", location: "Sede Mundial" },
  { id: "3", day: "Segunda", time: "19:30", title: "Oração dos Intercessores", location: "Sede Mundial" },
  { id: "4", day: "Terça", time: "19:30", title: "Culto de Ensino", location: "Sede Mundial" },
  { id: "5", day: "Quarta", time: "19:30", title: "Estudo Bíblico", location: "Sede Mundial" },
  { id: "6", day: "Quinta", time: "19:30", title: "Culto da Família", location: "Sede Mundial" },
  { id: "7", day: "Sexta", time: "20:00", title: "Culto de Libertação", location: "Sede Mundial" },
  { id: "8", day: "Sábado", time: "16:00", title: "Encontro de Jovens", location: "Sede Mundial" },
  { id: "9", day: "Sábado", time: "19:00", title: "Ensaio do Louvor", location: "Sede Mundial" },
];

export const ScheduleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<ScheduleEvent[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : defaultEvents;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  }, [events]);

  const addEvent = (event: Omit<ScheduleEvent, "id">) => {
    setEvents((prev) => [...prev, { ...event, id: crypto.randomUUID() }]);
  };

  const removeEvent = (id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <ScheduleContext.Provider value={{ events, addEvent, removeEvent }}>
      {children}
    </ScheduleContext.Provider>
  );
};
