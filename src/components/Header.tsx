import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Laptop, Menu, X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Laptop className="w-8 h-8 text-accent" />
            <span className="text-xl font-bold text-foreground">TechRepair Pro</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#sobre" className="text-foreground hover:text-accent transition-colors font-medium">
              Quem Somos
            </a>
            <a href="#servicos" className="text-foreground hover:text-accent transition-colors font-medium">
              Serviços
            </a>
            <a href="#" className="text-foreground hover:text-accent transition-colors font-medium">
              Empresas
            </a>
            <a href="#" className="text-foreground hover:text-accent transition-colors font-medium">
              Contato
            </a>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button className="bg-accent hover:bg-accent/90 text-primary-foreground">
              Orçamento Grátis
            </Button>
          </div>

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
