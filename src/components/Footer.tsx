import { Link } from "react-router-dom";
import { Heart, MapPin, Phone, Mail } from "lucide-react";
import logo from "@/assets/logo.jpeg";

const Footer = () => (
  <footer className="bg-muted/30 border-t border-border/50 pt-16 pb-8">
    <div className="container">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Logo" className="h-14 w-14 rounded-full object-cover" />
            <span className="font-heading text-sm font-bold text-gradient-gold leading-tight max-w-[180px]">
              Missões Unidas na Fé
            </span>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Levando a Palavra de Deus a todas as nações com amor, fé e dedicação.
          </p>
        </div>

        <div>
          <h4 className="font-heading text-accent font-semibold mb-4">Navegação</h4>
          <div className="flex flex-col gap-2">
            {[
              { label: "Início", path: "/" },
              { label: "Sobre", path: "/sobre" },
              { label: "Eventos", path: "/eventos" },
              { label: "Pregações", path: "/videos" },
              { label: "Mentoria para Liderança", path: "/mentoria" },
              { label: "Imersão Espiritual", path: "/imersao" },
              { label: "Doações", path: "/doacoes" },
            ].map((i) => (
              <Link key={i.path} to={i.path} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {i.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-heading text-accent font-semibold mb-4">Contato</h4>
          <div className="flex flex-col gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-2"><MapPin size={16} className="text-primary" /> Maringá, Paraná - Brasil</span>
            <span className="flex items-center gap-2"><Phone size={16} className="text-primary" /> (44) 99978-0119</span>
            <span className="flex items-center gap-2"><Mail size={16} className="text-primary" /> contato@iemuf.com.br</span>
          </div>
        </div>

        <div>
          <h4 className="font-heading text-accent font-semibold mb-4">Horários</h4>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <span>Domingo: 9h e 18h</span>
            <span>Quarta: 19h30</span>
            <span>Sexta: 20h</span>
          </div>
        </div>
      </div>

      <div className="border-t border-border/50 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
        <span>© {new Date().getFullYear()} Igreja Evangélica de Missões Unidas na Fé. Todos os direitos reservados.</span>
        <span className="flex items-center gap-1">Feito com <Heart size={12} className="text-primary" /> para a glória de Deus</span>
      </div>
    </div>
  </footer>
);

export default Footer;
