import { motion } from "framer-motion";
import { Play } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";
import { useVideos } from "@/contexts/VideoContext";
import { useState } from "react";

const getYouTubeId = (url: string) => {
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([^&?/\s]+)/
  );
  return match ? match[1] : null;
};

const Videos = () => {
  const { videos } = useVideos();
  const [playing, setPlaying] = useState<string | null>(null);

  return (
    <div className="min-h-screen pt-24">
      <section className="py-20">
        <div className="container">
          <SectionTitle title="Pregações e Mensagens" subtitle="Assista e fortaleça sua fé com a Palavra de Deus" gold />
          {videos.length === 0 ? (
            <p className="text-center text-muted-foreground">Nenhum vídeo disponível no momento.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video) => {
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
                          ) : null}
                          <div className="absolute inset-0 bg-background/30 flex items-center justify-center">
                            <div className="w-16 h-16 rounded-full bg-primary/80 flex items-center justify-center group-hover:scale-110 transition-transform">
                              <Play size={28} className="text-primary-foreground ml-1" />
                            </div>
                          </div>
                        </button>
                      )}
                    </div>
                    <div className="p-5">
                      <h3 className="font-heading font-semibold mb-2">{video.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{video.description}</p>
                      <span className="text-xs text-muted-foreground mt-2 block">
                        {new Date(video.createdAt).toLocaleDateString("pt-BR")}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Videos;
