import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Calendar, Play, HandHeart, Users, ArrowRight, MapPin, ChevronDown, Flame, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import SectionTitle from "@/components/SectionTitle";
import { useVideos } from "@/contexts/VideoContext";
import heroBg from "@/assets/hero-bg-new.png";
import logo from "@/assets/logo.jpeg";

const getYouTubeId = (url: string) => {
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([^&?/\s]+)/
  );
  return match ? match[1] : null;
};

// Componente separado para ter seu próprio estado de "playing"
const VideoSection = ({ videos }: { videos: ReturnType<typeof useVideos>["videos"] }) => {
  const [playing, setPlaying] = useState<string | null>(null);

  return (
    <section className="py-20">
      <div className="container">
        <SectionTitle title="Pregações e Mensagens" subtitle="Assista às últimas mensagens e fortaleça sua fé" gold />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.slice(0, 3).map((video) => {
            const ytId = getYouTubeId(video.url);
            return (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass rounded-xl overflow-hidden group hover:border-primary/50 transition-colors"
              >
                <div className="aspect-video bg-muted relative overflow-hidden">
                  {playing === video.id && ytId ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${ytId}?autoplay=1`}
                      className="w-full h-full"
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                    />
                  ) : (
                    <button onClick={() => setPlaying(video.id)} className="w-full h-full relative">
                      {ytId ? (
                        <img
                          src={`https://img.youtube.com/vi/${ytId}/hqdefault.jpg`}
                          alt={video.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-muted">
                          <Play size={48} className="text-primary" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-background/30 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-primary/80 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Play size={28} className="text-primary-foreground ml-1" />
                        </div>
                      </div>
                    </button>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-heading font-semibold mb-2 line-clamp-2">{video.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{video.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
        {videos.length > 3 && (
          <div className="text-center mt-8">
            <Link to="/videos" className="inline-flex items-center gap-2 text-accent hover:underline font-semibold">
              Ver todas as pregações <ArrowRight size={18} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

const Index = () => {
  const { videos } = useVideos();

  return (
    <div className="min-h-screen">
      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

        {/* Background image */}
        <img
          src={heroBg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center scale-105"
          style={{ filter: "brightness(0.45) saturate(1.2)" }}
        />

        {/* Layered overlays for drama */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/50 via-transparent to-background/50" />
        {/* Gold light burst from center */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,_hsl(42_80%_55%/0.12),_transparent_70%)]" />

        {/* Content */}
        <div className="container relative z-10 text-center px-4 py-32">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mb-6"
            >
              <img
                src={logo}
                alt="Logo Igreja Missões Unidas Na Fé"
                className="w-28 h-28 md:w-36 md:h-36 rounded-full object-cover ring-4 ring-accent/60 shadow-[0_0_60px_hsl(42_80%_55%/0.4)]"
              />
            </motion.div>

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="inline-flex items-center gap-2 bg-accent/15 border border-accent/30 text-accent px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-6 backdrop-blur-sm"
            >
              <MapPin size={12} />
              Sede Mundial · Maringá – PR
            </motion.div>

            {/* Main title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.8 }}
              className="font-heading font-bold leading-tight mb-6"
              style={{ fontSize: "clamp(2.2rem, 6vw, 5rem)" }}
            >
              Igreja Missões{" "}
              <span className="text-gradient-gold block sm:inline">Unidas Na Fé</span>
              <span className="block text-2xl md:text-3xl font-semibold text-foreground/70 mt-2 tracking-widest uppercase" style={{ fontSize: "clamp(1rem, 2.5vw, 1.75rem)" }}>
                Sede Mundial
              </span>
            </motion.h1>

            {/* Divider line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.55, duration: 0.7 }}
              className="w-24 h-px bg-gradient-to-r from-transparent via-accent to-transparent mb-6"
            />

            {/* Verse */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.65 }}
              className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto mb-10 italic"
            >
              "Ide por todo o mundo, pregai o evangelho a toda criatura."
              <span className="block text-sm not-italic text-accent/80 mt-1 font-semibold">— Marcos 16:15</span>
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                to="/oracao"
                className="group relative overflow-hidden bg-gradient-purple text-primary-foreground px-8 py-4 rounded-xl font-semibold text-base hover:opacity-95 transition-all hover:scale-105 hover:shadow-[0_0_30px_hsl(270_60%_50%/0.5)] flex items-center justify-center gap-2"
              >
                <Heart size={20} /> Pedir Oração
              </Link>
              <Link
                to="/eventos"
                className="glass text-foreground px-8 py-4 rounded-xl font-semibold text-base hover:bg-muted/80 hover:scale-105 transition-all flex items-center justify-center gap-2"
              >
                <Calendar size={20} /> Ver Eventos
              </Link>
              <Link
                to="/doacoes"
                className="bg-gradient-gold text-gold-foreground px-8 py-4 rounded-xl font-semibold text-base hover:opacity-95 hover:scale-105 hover:shadow-[0_0_30px_hsl(42_80%_55%/0.5)] transition-all flex items-center justify-center gap-2"
              >
                <HandHeart size={20} /> Fazer Doação
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted-foreground/60"
        >
          <span className="text-xs uppercase tracking-widest">Rolar</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
          >
            <ChevronDown size={20} />
          </motion.div>
        </motion.div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Videos */}
      {videos.length > 0 && <VideoSection videos={videos} />}

      {/* Projects */}
      <section className="py-20 bg-muted/20">
        <div className="container">
          <SectionTitle title="Projetos Sociais" subtitle="Transformando vidas e comunidades com o amor de Cristo" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Users, title: "Assistência a Famílias", desc: "Apoio a famílias em situação de vulnerabilidade com cestas básicas e acompanhamento pastoral." },
              { icon: Heart, title: "Evangelização Missionária", desc: "Levando a Palavra de Deus a comunidades carentes em todo o Brasil." },
              { icon: HandHeart, title: "Acolhimento Social", desc: "Programas de acolhimento e reintegração social para pessoas em situação de rua." },
            ].map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-xl p-8 text-center hover:border-primary/50 transition-colors"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-purple flex items-center justify-center">
                  <p.icon size={28} className="text-primary-foreground" />
                </div>
                <h3 className="font-heading font-semibold text-lg mb-3">{p.title}</h3>
                <p className="text-sm text-muted-foreground">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Events */}
      <section className="py-20">
        <div className="container">
          <SectionTitle title="Próximos Eventos" subtitle="Participe e fortaleça sua caminhada com Deus" gold />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              { date: "Dom, 10h", title: "Culto de Celebração", desc: "Louvor, adoração e ministração da Palavra." },
              { date: "Qua, 19h30", title: "Estudo Bíblico", desc: "Aprofunde-se na Palavra de Deus." },
              { date: "Sex, 20h", title: "Culto de Libertação", desc: "Noite especial de oração e intercessão." },
              { date: "Sáb, 16h", title: "Encontro de Jovens", desc: "Momento especial para a juventude." },
            ].map((e, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="glass rounded-xl p-6 flex gap-5 items-start hover:border-accent/50 transition-colors"
              >
                <div className="bg-gradient-gold text-gold-foreground px-4 py-2 rounded-lg font-bold text-sm shrink-0">
                  {e.date}
                </div>
                <div>
                  <h3 className="font-heading font-semibold mb-1">{e.title}</h3>
                  <p className="text-sm text-muted-foreground">{e.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/agenda" className="inline-flex items-center gap-2 text-accent hover:underline font-semibold">
              Ver agenda completa <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Mentoria + Imersão */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,_hsl(270_60%_50%/0.07),_transparent_70%)]" />
        <div className="container relative z-10">
          <SectionTitle title="Cresça em Fé e Liderança" subtitle="Programas especiais para quem quer ir além nos propósitos de Deus" gold />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Mentoria Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass rounded-2xl p-8 flex flex-col gap-5 hover:border-primary/50 transition-colors group"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-purple flex items-center justify-center group-hover:scale-110 transition-transform">
                <Users size={26} className="text-primary-foreground" />
              </div>
              <div>
                <span className="text-xs text-primary font-semibold uppercase tracking-widest">Formação</span>
                <h3 className="font-heading text-2xl font-bold mt-1 mb-3">Mentoria para Liderança</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Programa de 6 meses com ensino bíblico aprofundado, mentoria personalizada com pastores seniores e formação prática no ministério.
                </p>
              </div>
              <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
                {["Ensino bíblico sobre liderança servil", "Mentoria individual mensal", "Ativação no seu ministério", "Comissionamento ao final"].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-primary shrink-0" /> {item}
                  </li>
                ))}
              </ul>
              <Link to="/mentoria" className="mt-auto inline-flex items-center gap-2 bg-gradient-purple text-primary-foreground px-6 py-3 rounded-xl font-semibold text-sm hover:opacity-90 hover:scale-105 transition-all shadow-[0_0_20px_hsl(270_60%_50%/0.3)]">
                Saber mais e se inscrever <ArrowRight size={16} />
              </Link>
            </motion.div>

            {/* Imersão Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass rounded-2xl p-8 flex flex-col gap-5 hover:border-accent/50 transition-colors group"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-gold flex items-center justify-center group-hover:scale-110 transition-transform">
                <Flame size={26} className="text-gold-foreground" />
              </div>
              <div>
                <span className="text-xs text-accent font-semibold uppercase tracking-widest">Evento Especial</span>
                <h3 className="font-heading text-2xl font-bold mt-1 mb-3">Imersão Espiritual</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Três dias intensos de adoração, ensino e ativação espiritual para quem busca um encontro profundo com Deus e quer ser lançado para a sua missão.
                </p>
              </div>
              <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
                {["3 dias de imersão total", "Adoração e momentos proféticos", "Ministério dos dons espirituais", "Vagas limitadas"].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-accent shrink-0" /> {item}
                  </li>
                ))}
              </ul>
              <Link to="/imersao" className="mt-auto inline-flex items-center gap-2 bg-gradient-gold text-gold-foreground px-6 py-3 rounded-xl font-semibold text-sm hover:opacity-90 hover:scale-105 transition-all shadow-[0_0_20px_hsl(42_80%_55%/0.3)]">
                Garantir minha vaga <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-purple relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_hsl(270_60%_60%/0.3),_transparent_60%)]" />
        <div className="container relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6 text-primary-foreground">
              Precisa de Oração?
            </h2>
            <p className="text-lg text-primary-foreground/80 max-w-xl mx-auto mb-8">
              Nossa equipe pastoral está pronta para interceder por você. Envie seu pedido agora.
            </p>
            <Link
              to="/oracao"
              className="inline-flex items-center gap-2 bg-gradient-gold text-gold-foreground px-10 py-4 rounded-xl font-bold text-lg hover:opacity-90 transition-opacity"
            >
              <Heart size={22} /> Enviar Pedido de Oração
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;
