import { motion } from "framer-motion";
import { Heart, Copy, CheckCircle } from "lucide-react";
import { useState } from "react";
import SectionTitle from "@/components/SectionTitle";
import pixQrCode from "@/assets/pix-qrcode.jpeg";

const Donations = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen pt-24">
      <section className="py-20">
        <div className="container max-w-3xl">
          <SectionTitle title="Doações e Dízimos" subtitle="Sua contribuição faz a diferença na obra de Deus" gold />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-2xl p-8 md:p-12 mb-8"
          >
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-gold flex items-center justify-center">
                <Heart size={28} className="text-gold-foreground" />
              </div>
              <p className="text-muted-foreground text-lg">
                "Cada um contribua segundo propôs no seu coração; não com tristeza, ou por necessidade; porque Deus ama ao que dá com alegria." — 2 Coríntios 9:7
              </p>
            </div>

            <div className="space-y-6">
              {/* QR Code PIX */}
              <div className="bg-muted rounded-xl p-6 flex flex-col items-center">
                <h3 className="font-heading font-semibold text-xl mb-2 text-accent">PIX – Dízimos e Ofertas</h3>
                <p className="text-sm text-muted-foreground mb-5">Escaneie o QR Code abaixo para contribuir</p>
                <div className="bg-foreground rounded-2xl p-4 mb-6">
                  <img
                    src={pixQrCode}
                    alt="QR Code PIX para dízimos e ofertas"
                    className="w-64 h-64 object-contain rounded-lg"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Chave PIX */}
              <div className="bg-muted rounded-xl p-6">
                <h3 className="font-heading font-semibold text-lg mb-2 text-accent">Chave PIX Numérica (CNPJ)</h3>
                <p className="text-sm text-muted-foreground mb-4">Se preferir, use a chave PIX abaixo:</p>
                <div className="flex items-center gap-3">
                  <code className="flex-1 bg-background px-4 py-3 rounded-lg text-sm md:text-base font-semibold break-all text-center">
                    09.309.322/0001-91
                  </code>
                  <button
                    onClick={() => handleCopy("09309322000191")}
                    className="p-3 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
                  >
                    {copied ? <CheckCircle size={18} /> : <Copy size={18} />}
                  </button>
                </div>
              </div>

              {/* Mensagem de agradecimento */}
              <div className="bg-muted/50 rounded-xl p-6 text-center">
                <p className="text-muted-foreground font-medium">
                  Obrigado pela vossa contribuição. Deus abençoe e multiplique essa semente com abundância. O Reino de Deus agradece! 🙏
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-8 text-center"
          >
            <h3 className="font-heading text-xl font-semibold mb-4">Por que contribuir?</h3>
            <p className="text-muted-foreground mb-6">
              Sua doação sustenta projetos missionários, assistência social, evangelização e a manutenção do ministério. 
              Cada contribuição, por menor que seja, faz parte de uma grande obra que transforma vidas.
            </p>
            <a
              href="https://wa.me/5544999780119?text=Olá! Gostaria de informações sobre como contribuir com a igreja."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-gold text-gold-foreground px-8 py-3 rounded-xl font-bold hover:opacity-90 transition-opacity"
            >
              Falar sobre Doação via WhatsApp
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Donations;
