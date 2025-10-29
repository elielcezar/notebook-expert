import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Laptop, Menu, X } from "lucide-react";
import logo from "../assets/logo-normal.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Laptop className="w-8 h-8 text-accent" />
            <img src={logo} alt="Logo" className="w-48" />
          </div>         

          <p className="text-xl tracking-tight text-[var(--blue)]"><strong>Suporte 24h</strong> (41) 3029-8746</p>

          <a href="#contact" className="btn-primary text-[17px] px-4">
              <i className="fa-regular fa-circle-user"></i>
              <span className="ml-2">Área do Cliente</span>
          </a>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <a
                href="#sobre"
                className="text-foreground hover:text-accent transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Quem Somos
              </a>
              <a
                href="#servicos"
                className="text-foreground hover:text-accent transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Serviços
              </a>
              <a
                href="#"
                className="text-foreground hover:text-accent transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Empresas
              </a>
              <a
                href="#"
                className="text-foreground hover:text-accent transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Contato
              </a>
              <Button className="bg-accent hover:bg-accent/90 text-primary-foreground w-full">
                Orçamento Grátis
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
