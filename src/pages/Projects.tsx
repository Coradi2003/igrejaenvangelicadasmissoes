import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";
import { useProjects } from "@/contexts/ProjectContext";

const Projects = () => {
  const { projects } = useProjects();

  return (
    <div className="min-h-screen pt-24">
      <section className="py-20">
        <div className="container">
          <SectionTitle title="Projetos Sociais" subtitle="Transformando vidas e comunidades com o amor de Cristo" gold />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {projects.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass rounded-xl p-7 hover:border-primary/50 transition-colors"
              >
                <div className="w-14 h-14 mb-4 rounded-xl bg-gradient-purple flex items-center justify-center">
                  <Heart size={24} className="text-primary-foreground" />
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2">{p.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{p.description}</p>
                <span className="inline-block bg-accent/10 text-accent px-3 py-1 rounded-full text-xs font-semibold">
                  {p.impact}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;
