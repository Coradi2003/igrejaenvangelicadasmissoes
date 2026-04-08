import { useState } from "react";
import { motion } from "framer-motion";
import {
  Flame, Clock, MapPin, Calendar, CheckCircle2, Send,
  Loader2, Star, Zap, BookOpen, Users, ArrowRight
} from "lucide-react";
import SectionTitle from "@/components/SectionTitle";
import { supabase } from "@/lib/supabase";

const highlights = [
  { icon: Flame, title: "Encontro de Fogo", desc: "Momentos intensos de adoração, profecia e presença de Deus durante toda a imersão." },
  { icon: BookOpen, title: "Ensino Aprofundado", desc: "Palestras e workshops com pastores e ministros convidados de todo o Brasil." },
  { icon: Users, title: "Comunidade", desc: "Três dias imergido com irmãos de fé comprometidos com o crescimento espiritual." },
  { icon: Zap, title: "Ativação", desc: "Ativação dos dons espirituais e comissionamento para a missão de cada participante." },
];

const schedule = [
  { day: "Dia 1 — Sexta", items: ["19h – Abertura e Adoração", "20h – Mensagem: O Chamado", "21h30 – Solenidade de Boas-vindas"] },
  { day: "Dia 2 — Sábado", items: ["8h – Devocional Matinal", "9h – Workshop: Vida no Espírito", "13h – Intervalo", "15h – Ministério dos Dons", "19h – Culto de Fogo", "21h – Momento de Intercessão"] },
  { day: "Dia 3 — Domingo", items: ["9h – Escola Bíblica Especial", "11h – Culto de Encerramento", "13h – Comissionamento e Oração Final"] },
];

const Imersao = () => {
  const [form, setForm] = useState({ name: "", phone: "", email: "", birthdate: "", city: "", people: "1" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) return;
    setLoading(true);
    setError("");

    const { error: dbError } = await supabase.from("mentoria_inscricoes").insert([{
      name: form.name,
      phone: form.phone,
      email: form.email || null,
      ministry: `Cidade: ${form.city} | Pessoas: ${form.people} | Nascimento: ${form.birthdate}`,
      motivation: "Inscrição para Imersão Espiritual",
      type: "imersao",
    }]);

    if (dbError) {
      setError("Ocorreu um erro. Tente novamente ou entre em contato via WhatsApp.");
      setLoading(false);
      return;
    }

    const msg = `*Nova inscrição — Imersão Espiritual*\n\n👤 Nome: ${form.name}\n📱 WhatsApp: ${form.phone}\n📧 Email: ${form.email || "—"}\n🎂 Nascimento: ${form.birthdate || "—"}\n🏙️ Cidade: ${form.city || "—"}\n👥 Nº de pessoas: ${form.people}`;
    window.open(`https://wa.me/5544999780119?text=${encodeURIComponent(msg)}`, "_blank");
    setSuccess(true);
    setLoading(false);
  };

  return (
    <div className="min-h-screen pt-24">
      {/* Hero */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_0%,_hsl(42_80%_55%/0.12),_transparent_70%)]" />
        <div className="container max-w-4xl relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-flex items-center gap-2 bg-accent/10 border border-accent/30 text-accent px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-6">
              <Flame size={12} className="fill-accent" /> Evento Especial
            </span>
            <h1 className="font-heading text-4xl md:text-6xl font-bold mb-4 leading-tight">
              Imersão{" "}
              <span className="text-gradient-gold">Espiritual</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-4 font-heading font-semibold italic">
              "Três dias de encontro com Deus que vão transformar sua vida"
            </p>
            <p className="text-base text-muted-foreground max-w-xl mx-auto mb-8">
              Uma experiência intensa de adoração, ensino, ativação espiritual e comunidade para quem busca crescer e ser enviado pela fé.
            </p>

            {/* Event info pills */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
              {[
                { icon: Calendar, text: "Em breve — aguarde a data" },
                { icon: MapPin, text: "Sede Mundial · Maringá – PR" },
                { icon: Clock, text: "Sex–Dom | 3 dias" },
              ].map(({ icon: Icon, text }, i) => (
                <span key={i} className="inline-flex items-center gap-2 glass border-accent/20 px-4 py-2 rounded-full text-sm text-muted-foreground">
                  <Icon size={14} className="text-accent" /> {text}
                </span>
              ))}
            </div>

            <a href="#inscricao" className="inline-flex items-center gap-2 bg-gradient-gold text-gold-foreground px-8 py-4 rounded-xl font-bold text-lg hover:opacity-95 hover:scale-105 transition-all shadow-[0_0_30px_hsl(42_80%_55%/0.4)]">
              <Star size={20} /> Garantir Minha Vaga
            </a>
          </motion.div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-16 bg-muted/20">
        <div className="container">
          <SectionTitle title="O que esperar" subtitle="Uma imersão que vai além do comum" gold />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((h, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass rounded-xl p-6 text-center hover:border-accent/40 transition-colors group"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-gold flex items-center justify-center group-hover:scale-110 transition-transform">
                  <h.icon size={24} className="text-gold-foreground" />
                </div>
                <h3 className="font-heading font-semibold mb-2">{h.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{h.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule */}
      <section className="py-16">
        <div className="container max-w-3xl">
          <SectionTitle title="Programação" subtitle="O que acontece em cada dia da imersão" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {schedule.map((day, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-xl overflow-hidden"
              >
                <div className="bg-gradient-purple px-5 py-3">
                  <h3 className="font-heading font-bold text-primary-foreground text-sm">{day.day}</h3>
                </div>
                <ul className="p-5 flex flex-col gap-3">
                  {day.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <ArrowRight size={14} className="text-accent mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-xs text-muted-foreground mt-6 italic">* Programação sujeita a alterações. Confirmações serão enviadas aos inscritos.</p>
        </div>
      </section>

      {/* Form */}
      <section id="inscricao" className="py-20 bg-muted/20">
        <div className="container max-w-2xl">
          <SectionTitle title="Inscrição para a Imersão" subtitle="Vagas limitadas — garanta a sua agora mesmo" gold />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-8 md:p-12"
          >
            {success ? (
              <div className="text-center py-8">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-gold flex items-center justify-center">
                  <CheckCircle2 size={40} className="text-gold-foreground" />
                </div>
                <h3 className="font-heading text-2xl font-bold mb-3">Vaga Garantida! 🔥</h3>
                <p className="text-muted-foreground">
                  Sua inscrição foi registrada com sucesso! Nossa equipe entrará em contato pelo WhatsApp com todas as informações sobre a Imersão Espiritual. Que Deus prepare seu coração!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Nome completo *</label>
                    <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Seu nome" required className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-foreground placeholder:text-muted-foreground" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">WhatsApp *</label>
                    <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="(44) 99999-9999" required className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-foreground placeholder:text-muted-foreground" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">E-mail</label>
                    <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="seu@email.com (opcional)" className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-foreground placeholder:text-muted-foreground" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Data de nascimento</label>
                    <input type="date" value={form.birthdate} onChange={(e) => setForm({ ...form, birthdate: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-foreground" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Cidade / Estado</label>
                    <input type="text" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} placeholder="Ex: Maringá – PR" className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-foreground placeholder:text-muted-foreground" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Nº de inscrições</label>
                    <select value={form.people} onChange={(e) => setForm({ ...form, people: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-foreground">
                      {["1", "2", "3", "4", "5+"].map((n) => (
                        <option key={n} value={n}>{n} {n === "1" ? "pessoa" : "pessoas"}</option>
                      ))}
                    </select>
                  </div>
                </div>
                {error && <p className="text-destructive text-sm">{error}</p>}
                <button type="submit" disabled={loading} className="w-full bg-gradient-gold text-gold-foreground py-4 rounded-xl font-bold text-lg hover:opacity-95 transition-all hover:scale-[1.02] flex items-center justify-center gap-2 disabled:opacity-60 shadow-[0_0_25px_hsl(42_80%_55%/0.3)]">
                  {loading ? <><Loader2 size={22} className="animate-spin" /> Enviando...</> : <><Send size={22} /> Confirmar Inscrição</>}
                </button>
                <p className="text-xs text-center text-muted-foreground">Ao se inscrever, você receberá uma mensagem de confirmação via WhatsApp com todos os detalhes.</p>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Imersao;
