import { motion } from "framer-motion";
import { Clock, MapPin } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";
import { useSchedule } from "@/contexts/ScheduleContext";

const dayOrder = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

const Schedule = () => {
  const { events } = useSchedule();

  const grouped = dayOrder
    .map((day) => ({
      day,
      events: events.filter((e) => e.day === day).sort((a, b) => a.time.localeCompare(b.time)),
    }))
    .filter((g) => g.events.length > 0);

  return (
    <div className="min-h-screen pt-24">
      <section className="py-20">
        <div className="container max-w-3xl">
          <SectionTitle title="Agenda Semanal" subtitle="Programação de cultos e eventos" gold />
          <div className="flex flex-col gap-4">
            {grouped.map((day, i) => (
              <motion.div
                key={day.day}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="glass rounded-xl p-5 md:p-6"
              >
                <h3 className="font-heading font-bold text-accent mb-3">{day.day}</h3>
                <div className="flex flex-col gap-2">
                  {day.events.map((e) => (
                    <div key={e.id} className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1.5 text-muted-foreground shrink-0">
                        <Clock size={14} className="text-primary" /> {e.time}
                      </span>
                      <span className="font-medium">{e.title}</span>
                      <span className="hidden sm:flex items-center gap-1 text-muted-foreground ml-auto">
                        <MapPin size={12} /> {e.location}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Schedule;
