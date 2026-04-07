import { motion } from "framer-motion";
import SectionTitle from "@/components/SectionTitle";
import pastor1 from "@/assets/fotopastor1.jpg";
import pastor2 from "@/assets/fotopastor2.jpg";

const About = () => (
  <div className="min-h-screen pt-24">
    <section className="py-20">
      <div className="container">
        <SectionTitle title="Sobre o Ministério" subtitle="Conheça nossa história e liderança" gold />

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-8 md:p-12 mb-12"
          >
            <h3 className="font-heading text-2xl font-bold text-gradient-gold mb-6">Nossa História</h3>
            <p className="text-muted-foreground leading-relaxed text-lg">
              A Igreja Evangélica de Missões Unidas na Fé – Sede Mundial nasceu da vontade de Deus. Sua existência surgiu a partir do nada e, hoje, com 19 anos de história, vem fazendo a diferença no Brasil. Sua sede está localizada em Maringá, Paraná.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-8 md:p-12"
          >
            <h3 className="font-heading text-2xl font-bold text-gradient-gold mb-8">Nosso Pastor</h3>
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="grid grid-cols-2 gap-4 shrink-0">
                <img src={pastor1} alt="Pastor Júnior César" className="w-40 h-48 object-cover rounded-xl" />
                <img src={pastor2} alt="Pastor Júnior César" className="w-40 h-48 object-cover rounded-xl" />
              </div>
              <div>
                <h4 className="font-heading text-xl font-semibold mb-2">Pastor Júnior César</h4>
                <p className="text-accent text-sm font-medium mb-4">Presidente Mundial</p>
                <p className="text-muted-foreground leading-relaxed">
                  Pastor Júnior César é presidente mundial da Igreja Evangélica de Missões Unidas na Fé. É casado há 24 anos com a pastora Neide Jonas. Bacharel em Teologia pela Faculdade FAERP, é palestrante, CEO e empresário da Radadch School.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  </div>
);

export default About;
