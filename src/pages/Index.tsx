import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Calendar, Play, HandHeart, Users, ArrowRight } from "lucide-react";
import { useState } from "react";
import SectionTitle from "@/components/SectionTitle";
import { useVideos } from "@/contexts/VideoContext";
import heroBg from "@/assets/hero-bg.jpg";

const getYouTubeId = (url: string) => {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([^&?]+)/);
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
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 bg-background/70" />
        <div className="container relative z-10 text-center py-32">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="text-accent font-semibold tracking-widest uppercase text-sm mb-4">
              Sede Mundial
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold leading-tight mb-6">
              Igreja Evangélica de<br />
              <span className="text-gradient-gold">Missões Unidas na Fé</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              "Ide por todo o mundo, pregai o evangelho a toda criatura." — Marcos 16:15
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/oracao" className="bg-gradient-purple text-primary-foreground px-8 py-4 rounded-xl font-semibold text-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                <Heart size={20} /> Pedir Oração
              </Link>
              <Link to="/eventos" className="glass text-foreground px-8 py-4 rounded-xl font-semibold text-lg hover:bg-muted/80 transition-colors flex items-center justify-center gap-2">
                <Calendar size={20} /> Ver Eventos
              </Link>
              <Link to="/doacoes" className="bg-gradient-gold text-gold-foreground px-8 py-4 rounded-xl font-semibold text-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                <HandHeart size={20} /> Fazer Doação
              </Link>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
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
