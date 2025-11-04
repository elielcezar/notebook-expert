'use client';

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";



const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">            
            <Image src="/logo.webp" alt="Logo" width={192} height={60} className="w-48" priority />
          </div>         

          <p className="text-xl tracking-tight text-[var(--blue)] portrait:hidden"><strong>Suporte 24h</strong> (41) 3029-8746</p>

          <a href="#contact" className="btn-primary text-[17px] px-4 portrait:hidden">
              <i className="fa-regular fa-circle-user"></i>
              <span className="ml-2 ">Área do Cliente</span>
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
          <div className="md:hidden mt-4 py-8 border-t border-border">
            <div className="flex flex-col gap-4">
              <p className="text-xl tracking-tight text-[var(--blue)] text-center"><strong>Suporte 24h</strong> (41) 3029-8746</p>

              <a href="#contact" className="btn-primary text-[17px] px-4 text-center">
                  <i className="fa-regular fa-circle-user"></i>
                  <span className="ml-2 ">Área do Cliente</span>
              </a>  

              <div className="flex space-x-4 portrait:justify-center">
                  <a href="#" className="text-[var(--blue)] hover:text-white transition-colors text-2xl">
                      <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="#" className="text-[var(--blue)] hover:text-white transition-colors text-2xl mr-9">
                      <i className="fab fa-instagram"></i>
                  </a>
                  <a href="#" className="text-[var(--blue)] hover:text-white transition-colors text-2xl">
                      <i className="fab fa-whatsapp"></i>
                  </a>
              </div>           
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
