import { motion } from "framer-motion";
import { Calendar, MapPin, Clock } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";

const events = [
  { title: "Conferência de Missões 2026", date: "15-17 Mai 2026", time: "19h", location: "Sede Mundial - Maringá/PR", desc: "Três dias de imersão na presença de Deus com pregadores nacionais e internacionais." },
  { title: "Culto de Celebração Especial", date: "Todos os Domingos", time: "10h e 18h", location: "Sede Mundial", desc: "Culto dominical com louvor, adoração e ministração da Palavra." },
  { title: "Encontro de Casais", date: "28 Jun 2026", time: "15h", location: "Sede Mundial", desc: "Fortalecendo famílias e casamentos através da Palavra de Deus." },
  { title: "Vigília de Oração", date: "Última sexta do mês", time: "22h", location: "Sede Mundial", desc: "Noite de busca intensa pela presença de Deus." },
];

const Events = () => (
  <div className="min-h-screen pt-24">
    <section className="py-20">
      <div className="container">
        <SectionTitle title="Eventos" subtitle="Participe dos nossos encontros e fortaleça sua fé" gold />
        <div className="max-w-3xl mx-auto flex flex-col gap-6">
          {events.map((e, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-xl p-6 md:p-8 hover:border-primary/50 transition-colors"
            >
              <h3 className="font-heading text-xl font-bold mb-3">{e.title}</h3>
              <div className="flex flex-wrap gap-4 mb-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5"><Calendar size={14} className="text-accent" />{e.date}</span>
                <span className="flex items-center gap-1.5"><Clock size={14} className="text-accent" />{e.time}</span>
                <span className="flex items-center gap-1.5"><MapPin size={14} className="text-accent" />{e.location}</span>
              </div>
              <p className="text-muted-foreground mb-4">{e.desc}</p>
              <a
                href="https://wa.me/5544999780119?text=Olá! Gostaria de me inscrever no evento: " 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex bg-gradient-purple text-primary-foreground px-6 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                Inscrever-se via WhatsApp
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default Events;
