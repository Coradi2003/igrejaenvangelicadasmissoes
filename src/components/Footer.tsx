import { Link } from "react-router-dom";
import { Heart, MapPin, Phone, Mail, Instagram, Facebook, Youtube } from "lucide-react";
import logo from "@/assets/logo.jpeg";

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" width={14} height={14} fill="currentColor" aria-hidden="true">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.75a8.18 8.18 0 0 0 4.78 1.52V6.82a4.85 4.85 0 0 1-1.01-.13z" />
  </svg>
);

const KwaiIcon = () => (
  <svg viewBox="0 0 24 24" width={14} height={14} fill="currentColor" aria-hidden="true">
    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm3.5 13.5-5-3V8l5 3v4.5z" />
  </svg>
);

const socials = [
  {
    href: "https://www.instagram.com/cesarpastorjunior",
    label: "Instagram",
    icon: <Instagram size={14} />,
    className: "bg-gradient-to-br from-[#833ab4] via-[#fd1d1d] to-[#fcb045]",
  },
  {
    href: "https://www.facebook.com/junior.cesar.432130",
    label: "Facebook",
    icon: <Facebook size={14} />,
    className: "bg-[#1877F2]",
  },
  {
    href: "https://www.facebook.com/people/pastor-J%C3%BAnior-c%C3%A9sar-projeto-%C3%81frica/61587150028683/?rdid=uUuo4L8dW9qYoCzD&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1EX51ctf6w%2F",
    label: "Facebook – Projeto África",
    icon: <Facebook size={14} />,
    className: "bg-[#0a5c36]",
    badge: "🌍",
  },
  {
    href: "https://www.youtube.com/@pastorjuniorcesar903",
    label: "YouTube",
    icon: <Youtube size={14} />,
    className: "bg-[#FF0000]",
  },
  {
    href: "https://www.tiktok.com/@pastor.jnior.csar?_r=1&_t=ZS-95M2MsAnstJ",
    label: "TikTok",
    icon: <TikTokIcon />,
    className: "bg-black",
  },
  {
    href: "https://k.kwai.com/u/@juniorcesar460/S2IoCz3e",
    label: "Kwai",
    icon: <KwaiIcon />,
    className: "bg-[#FF6404]",
  },
];

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
          <h4 className="font-heading text-accent font-semibold mb-4">Redes Sociais</h4>
          <div className="flex flex-wrap gap-2">
            {socials.map((s) => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                title={s.label}
                className={`relative flex items-center justify-center w-9 h-9 rounded-lg text-white hover:opacity-90 hover:scale-110 transition-all ${s.className}`}
              >
                {s.icon}
                {s.badge && (
                  <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-accent border border-background flex items-center justify-center text-[7px] leading-none">
                    {s.badge}
                  </span>
                )}
              </a>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-3">Siga o Pastor César Junior nas redes</p>
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
