import { useState } from "react";
import { motion } from "framer-motion";
import {
  Users, BookOpen, Star, CheckCircle2, Send, Loader2,
  Trophy, Lightbulb, Target, Heart, ChevronDown
} from "lucide-react";
import SectionTitle from "@/components/SectionTitle";
import { supabase } from "@/lib/supabase";

const benefits = [
  { icon: BookOpen, title: "Ensino Bíblico Profundo", desc: "Fundamentos sólidos da liderança servil baseada em Cristo e na Palavra de Deus." },
  { icon: Lightbulb, title: "Desenvolvimento Prático", desc: "Ferramentas reais para liderar células, ministérios e comunidades com excelência." },
  { icon: Trophy, title: "Mentoria Personalizada", desc: "Acompanhamento direto com pastores e líderes experientes da Sede Mundial." },
  { icon: Target, title: "Visão Missionária", desc: "Expanda sua visão além das fronteiras locais e seja instrumento de transformação." },
  { icon: Users, title: "Rede de Líderes", desc: "Conecte-se com outros líderes em formação e cresça em comunidade." },
  { icon: Heart, title: "Cuidado Pastoral", desc: "Suporte espiritual e emocional durante toda a jornada de formação." },
];

const faqs = [
  { q: "Quem pode participar?", a: "Qualquer membro da igreja comprometido com sua fé e com desejo de servir em liderança, independente da experiência prévia." },
  { q: "Qual é a duração do programa?", a: "O programa tem duração de 6 meses, com encontros quinzenais e atividades práticas no ministério." },
  { q: "Há algum custo?", a: "O programa é gratuito para membros da nossa igreja. Basta se inscrever e aguardar o contato da nossa equipe." },
  { q: "Como funciona a mentoria?", a: "Cada participante é acompanhado por um mentor pastor ou líder sênior, com reuniões individuais mensais e acompanhamento contínuo." },
];

const Mentoria = () => {
  const [form, setForm] = useState({ name: "", phone: "", email: "", ministry: "", motivation: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.motivation) return;
    setLoading(true);
    setError("");

    const { error: dbError } = await supabase.from("mentoria_inscricoes").insert([{
      name: form.name,
      phone: form.phone,
      email: form.email || null,
      ministry: form.ministry || null,
      motivation: form.motivation,
      type: "mentoria",
    }]);

    if (dbError) {
      setError("Ocorreu um erro. Tente novamente ou entre em contato via WhatsApp.");
      setLoading(false);
      return;
    }

    // Also send to WhatsApp
    const msg = `*Nova inscrição — Mentoria para Liderança*\n\n👤 Nome: ${form.name}\n📱 Telefone: ${form.phone}\n📧 Email: ${form.email || "—"}\n⛪ Ministério de interesse: ${form.ministry || "—"}\n💬 Motivação: ${form.motivation}`;
    window.open(`https://wa.me/5544999780119?text=${encodeURIComponent(msg)}`, "_blank");
    setSuccess(true);
    setLoading(false);
  };

  return (
    <div className="min-h-screen pt-24">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_0%,_hsl(270_60%_50%/0.15),_transparent_70%)]" />
        <div className="container max-w-4xl relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 text-primary px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-6">
              <Star size={12} /> Formação de Líderes
            </span>
            <h1 className="font-heading text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Mentoria para{" "}
              <span className="text-gradient-gold">Liderança</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Um programa de formação espiritual e prática para quem é chamado a liderar com o coração de Cristo. Seja equipado, mentoreado e lançado para a sua missão.
            </p>
            <a href="#inscricao" className="inline-flex items-center gap-2 bg-gradient-purple text-primary-foreground px-8 py-4 rounded-xl font-semibold text-lg hover:opacity-90 hover:scale-105 transition-all shadow-[0_0_30px_hsl(270_60%_50%/0.3)]">
              <Users size={20} /> Quero me Inscrever
            </a>
          </motion.div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-16 bg-muted/20">
        <div className="container">
          <SectionTitle title="O que você vai receber" subtitle="Um programa completo de formação para líderes do Reino" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass rounded-xl p-6 hover:border-primary/40 transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-purple flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <b.icon size={22} className="text-primary-foreground" />
                </div>
                <h3 className="font-heading font-semibold text-base mb-2">{b.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16">
        <div className="container max-w-3xl">
          <SectionTitle title="Como funciona" subtitle="Sua jornada de 6 meses rumo à liderança" gold />
          <div className="flex flex-col gap-0 relative">
            <div className="absolute left-6 top-6 bottom-6 w-px bg-gradient-to-b from-primary via-accent to-transparent" />
            {[
              { step: "01", title: "Inscrição e Entrevista", desc: "Preencha o formulário e nossa equipe entrará em contato para uma conversa inicial." },
              { step: "02", title: "Formação Bíblica", desc: "Módulos de ensino sobre liderança, ministério, caráter e visão missionária." },
              { step: "03", title: "Mentoria Individual", desc: "Sessões mensais com seu mentor designado para acompanhamento pessoal." },
              { step: "04", title: "Prática no Ministério", desc: "Aplicação real dos ensinamentos no contexto do seu ministério ou célula." },
              { step: "05", title: "Comissionamento", desc: "Cerimônia especial de comissionamento para os líderes formados ao fim do programa." },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-6 pb-10 last:pb-0"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-purple flex items-center justify-center shrink-0 font-bold text-primary-foreground text-sm z-10">
                  {item.step}
                </div>
                <div className="glass rounded-xl p-5 flex-1">
                  <h3 className="font-heading font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-muted/20">
        <div className="container max-w-2xl">
          <SectionTitle title="Perguntas Frequentes" subtitle="Tudo que você precisa saber antes de se inscrever" />
          <div className="flex flex-col gap-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="glass rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left font-semibold text-sm hover:bg-muted/40 transition-colors"
                >
                  {faq.q}
                  <ChevronDown
                    size={18}
                    className={`shrink-0 text-muted-foreground transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-sm text-muted-foreground leading-relaxed border-t border-border/40 pt-4">
                    {faq.a}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enrollment Form */}
      <section id="inscricao" className="py-20">
        <div className="container max-w-2xl">
          <SectionTitle title="Faça sua Inscrição" subtitle="Dê o primeiro passo. Deus tem um propósito para a sua liderança." gold />
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
                <h3 className="font-heading text-2xl font-bold mb-3">Inscrição Enviada! 🎉</h3>
                <p className="text-muted-foreground">
                  Recebemos sua inscrição para a Mentoria para Liderança. Nossa equipe entrará em contato em breve pelo WhatsApp ou e-mail. Que Deus abençoe sua jornada!
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
                <div>
                  <label className="block text-sm font-medium mb-2">E-mail</label>
                  <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="seu@email.com (opcional)" className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-foreground placeholder:text-muted-foreground" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Área de ministério de interesse</label>
                  <select value={form.ministry} onChange={(e) => setForm({ ...form, ministry: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-foreground">
                    <option value="">Selecione uma área...</option>
                    <option>Células e Grupos</option>
                    <option>Louvor e Adoração</option>
                    <option>Evangelismo e Missões</option>
                    <option>Ministério Infantil</option>
                    <option>Ministério de Jovens</option>
                    <option>Diaconia e Assistência Social</option>
                    <option>Aconselhamento Pastoral</option>
                    <option>Liderança Geral</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Por que deseja participar? *</label>
                  <textarea value={form.motivation} onChange={(e) => setForm({ ...form, motivation: e.target.value })} placeholder="Conte um pouco sobre seu chamado e motivação para liderar..." rows={4} required className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-foreground placeholder:text-muted-foreground resize-none" />
                </div>
                {error && <p className="text-destructive text-sm">{error}</p>}
                <button type="submit" disabled={loading} className="w-full bg-gradient-purple text-primary-foreground py-4 rounded-xl font-bold text-lg hover:opacity-90 transition-all hover:scale-[1.02] flex items-center justify-center gap-2 disabled:opacity-60 shadow-[0_0_25px_hsl(270_60%_50%/0.3)]">
                  {loading ? <><Loader2 size={22} className="animate-spin" /> Enviando...</> : <><Send size={22} /> Enviar Inscrição</>}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Mentoria;
