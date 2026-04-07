import { motion } from "framer-motion";

interface Props {
  title: string;
  subtitle?: string;
  gold?: boolean;
}

const SectionTitle = ({ title, subtitle, gold }: Props) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="text-center mb-12"
  >
    <h2 className={`text-3xl md:text-4xl font-heading font-bold mb-3 ${gold ? "text-gradient-gold" : ""}`}>
      {title}
    </h2>
    {subtitle && <p className="text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>}
    <div className="mt-4 mx-auto w-20 h-1 bg-gradient-gold rounded-full" />
  </motion.div>
);

export default SectionTitle;
