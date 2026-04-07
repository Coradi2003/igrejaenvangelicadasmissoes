import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => (
  <a
    href="https://wa.me/5544999780119"
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-6 right-6 z-50 bg-[hsl(142,70%,45%)] hover:bg-[hsl(142,70%,40%)] text-[hsl(0,0%,100%)] p-4 rounded-full shadow-2xl transition-all hover:scale-110 animate-glow-pulse"
    aria-label="WhatsApp"
    style={{ "--tw-shadow-color": "hsl(142 70% 45% / 0.4)" } as React.CSSProperties}
  >
    <MessageCircle size={28} />
  </a>
);

export default WhatsAppButton;
