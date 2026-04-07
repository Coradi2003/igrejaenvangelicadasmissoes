import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export interface ScheduleEvent {
  id: string;
  day: string;
  time: string;
  title: string;
  location: string;
}

interface ScheduleContextType {
  events: ScheduleEvent[];
  loading: boolean;
  addEvent: (event: Omit<ScheduleEvent, "id">) => Promise<void>;
  removeEvent: (id: string) => Promise<void>;
}

const ScheduleContext = createContext<ScheduleContextType | undefined>(undefined);

export const useSchedule = () => {
  const ctx = useContext(ScheduleContext);
  if (!ctx) throw new Error("useSchedule must be used within ScheduleProvider");
  return ctx;
};

const DAY_ORDER = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

export const ScheduleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<ScheduleEvent[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("schedule_events")
      .select("*");

    if (!error && data) {
      const sorted = [...data].sort((a, b) => {
        const dayDiff = DAY_ORDER.indexOf(a.day) - DAY_ORDER.indexOf(b.day);
        if (dayDiff !== 0) return dayDiff;
        return a.time.localeCompare(b.time);
      });
      setEvents(
        sorted.map((e) => ({
          id: e.id,
          day: e.day,
          time: e.time,
          title: e.title,
          location: e.location,
        }))
      );
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const addEvent = async (event: Omit<ScheduleEvent, "id">) => {
    const { error } = await supabase.from("schedule_events").insert([
      {
        day: event.day,
        time: event.time,
        title: event.title,
        location: event.location,
      },
    ]);
    if (!error) await fetchEvents();
  };

  const removeEvent = async (id: string) => {
    const { error } = await supabase.from("schedule_events").delete().eq("id", id);
    if (!error) await fetchEvents();
  };

  return (
    <ScheduleContext.Provider value={{ events, loading, addEvent, removeEvent }}>
      {children}
    </ScheduleContext.Provider>
  );
};
