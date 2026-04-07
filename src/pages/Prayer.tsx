import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Send, Loader2 } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";

const Prayer = () => {
  const [name, setName] = useState("");
  const [prayer, setPrayer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !prayer.trim()) return;
    setLoading(true);
    const message = `Olá, me chamo ${name}. Gostaria de pedir oração:\n\n${prayer}`;
    const url = `https://wa.me/5544999780119?text=${encodeURIComponent(message)}`;
    setTimeout(() => {
      window.open(url, "_blank");
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen pt-24">
      <section className="py-20">
        <div className="container max-w-2xl">
          <SectionTitle title="Pedido de Oração" subtitle="Compartilhe seu coração conosco. Estamos aqui por você." gold />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-2xl p-8 md:p-12"
          >
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-purple flex items-center justify-center">
                <Heart size={28} className="text-primary-foreground" />
              </div>
              <p className="text-muted-foreground">
                "Lançando sobre Ele toda a vossa ansiedade, porque Ele tem cuidado de vós." — 1 Pedro 5:7
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <label className="block text-sm font-medium mb-2">Seu Nome</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Como você se chama?"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-foreground placeholder:text-muted-foreground"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Seu Pedido de Oração</label>
                <textarea
                  value={prayer}
                  onChange={(e) => setPrayer(e.target.value)}
                  placeholder="Compartilhe seu pedido de oração..."
                  rows={5}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-foreground placeholder:text-muted-foreground resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-gold text-gold-foreground py-4 rounded-xl font-bold text-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {loading ? (
                  <><Loader2 size={22} className="animate-spin" /> Enviando...</>
                ) : (
                  <><Send size={22} /> Enviar Pedido de Oração</>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Prayer;
