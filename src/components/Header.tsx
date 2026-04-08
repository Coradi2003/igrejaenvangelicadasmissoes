import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.jpeg";

const navItems = [
  { label: "Início", path: "/" },
  { label: "Sobre", path: "/sobre" },
  { label: "Eventos", path: "/eventos" },
  { label: "Pregações", path: "/videos" },
  { label: "Mentoria", path: "/mentoria" },
  { label: "Imersão", path: "/imersao" },
  { label: "Oração", path: "/oracao" },
  { label: "Doações", path: "/doacoes" },
  { label: "Projetos", path: "/projetos" },
  { label: "Agenda", path: "/agenda" },
];

const Header = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container flex items-center justify-between py-3">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="Logo IEMUF" className="h-12 w-12 rounded-full object-cover" />
          <span className="hidden md:block font-heading text-sm font-bold text-gradient-gold leading-tight max-w-[200px]">
            Missões Unidas na Fé
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === item.path
                  ? "text-accent"
                  : "text-foreground/70 hover:text-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="https://wa.me/5544999780119"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex bg-gradient-gold text-gold-foreground px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Fale Conosco
          </a>
          <button onClick={() => setOpen(!open)} className="lg:hidden p-2 text-foreground">
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden glass border-t border-border/50"
          >
            <nav className="container py-4 flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setOpen(false)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === item.path
                      ? "text-accent bg-muted"
                      : "text-foreground/70 hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <a
                href="https://wa.me/5544999780119"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 text-center bg-gradient-gold text-gold-foreground px-4 py-3 rounded-lg text-sm font-semibold"
              >
                Fale Conosco via WhatsApp
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
