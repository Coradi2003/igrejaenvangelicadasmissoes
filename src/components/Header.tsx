import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Instagram, Facebook, Youtube } from "lucide-react";
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
            href="https://www.instagram.com/cesarpastorjunior"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            title="Instagram"
            className="hidden sm:inline-flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white hover:opacity-90 hover:scale-105 transition-all"
          >
            <Instagram size={17} />
          </a>
          <a
            href="https://www.facebook.com/junior.cesar.432130"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook – Pastor César"
            title="Facebook – Pastor César"
            className="hidden sm:inline-flex items-center justify-center w-9 h-9 rounded-lg bg-[#1877F2] text-white hover:opacity-90 hover:scale-105 transition-all"
          >
            <Facebook size={17} />
          </a>
          <a
            href="https://www.facebook.com/people/pastor-J%C3%BAnior-c%C3%A9sar-projeto-%C3%81frica/61587150028683/?rdid=uUuo4L8dW9qYoCzD&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1EX51ctf6w%2F"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook – Projeto África"
            title="Facebook – Projeto África"
            className="hidden sm:inline-flex items-center justify-center w-9 h-9 rounded-lg bg-[#0a5c36] text-white hover:opacity-90 hover:scale-105 transition-all relative"
          >
            <Facebook size={17} />
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-accent border border-background flex items-center justify-center text-[7px] font-black text-background leading-none">
              🌍
            </span>
          </a>
          <a
            href="https://www.youtube.com/@pastorjuniorcesar903"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            title="YouTube"
            className="hidden sm:inline-flex items-center justify-center w-9 h-9 rounded-lg bg-[#FF0000] text-white hover:opacity-90 hover:scale-105 transition-all"
          >
            <Youtube size={17} />
          </a>
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
              <div className="mt-2 flex flex-col gap-2">
                <a
                  href="https://www.instagram.com/cesarpastorjunior"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-gradient-to-br from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white px-4 py-3 rounded-lg text-sm font-semibold"
                >
                  <Instagram size={16} /> @cesarpastorjunior
                </a>
                <a
                  href="https://www.facebook.com/junior.cesar.432130"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#1877F2] text-white px-4 py-3 rounded-lg text-sm font-semibold"
                >
                  <Facebook size={16} /> Facebook – Pastor César
                </a>
                <a
                  href="https://www.facebook.com/people/pastor-J%C3%BAnior-c%C3%A9sar-projeto-%C3%81frica/61587150028683/?rdid=uUuo4L8dW9qYoCzD&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1EX51ctf6w%2F"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#0a5c36] text-white px-4 py-3 rounded-lg text-sm font-semibold"
                >
                  <Facebook size={16} /> 🌍 Projeto África
                </a>
                <a
                  href="https://www.youtube.com/@pastorjuniorcesar903"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#FF0000] text-white px-4 py-3 rounded-lg text-sm font-semibold"
                >
                  <Youtube size={16} /> YouTube
                </a>
                <a
                  href="https://wa.me/5544999780119"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-center bg-gradient-gold text-gold-foreground px-4 py-3 rounded-lg text-sm font-semibold"
                >
                  Fale Conosco via WhatsApp
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
