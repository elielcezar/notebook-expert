'use client';

import { useState } from "react";
import { 
  Menu, 
  X, 
  Cpu, 
  Monitor, 
  Keyboard, 
  Battery, 
  Wrench, 
  HardDrive, 
  Thermometer, 
  Droplet, 
  Settings, 
  Database 
} from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import Link from "next/link";



const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const services = [
    { icon: Cpu, text: "Reparo de placa-mãe" },
    { icon: Monitor, text: "Troca de tela / display" },
    { icon: Keyboard, text: "Troca de teclado" },
    { icon: Battery, text: "Troca de bateria" },
    { icon: Wrench, text: "Troca de carcaça / dobradiça" },
    { icon: HardDrive, text: "Upgrade SSD e memória" },
    { icon: Thermometer, text: "Limpeza e pasta térmica" },
    { icon: Droplet, text: "Reparo após líquido derramado" },
    { icon: Settings, text: "Formatação e otimização" },
    { icon: Database, text: "Recuperação de dados" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] bg-background/95 backdrop-blur-sm border-b border-border">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between portrait:flex-col portrait:items-center portrait:gap-4">
          {/* Logo */}          
          <div className="flex items-center gap-2">      
            <Link href={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/`}>      
            <img 
              src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/logo.webp`}
              alt="Logo" 
              width="192" 
              height="60" 
              className="w-48"
            />
            </Link>
          </div>

          {/* Desktop Navigation Menu */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>           

                <NavigationMenuItem>
                  <NavigationMenuLink href={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/servicos`} className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-[var(--blue)] hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none">
                    Serviços
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink href={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/para-empresas`} className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-[var(--blue)] hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none">
                    Para Empresas
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink href={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/franquia`} className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-[var(--blue)] hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none">
                    Franquia
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink href={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/compra-venda`} className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-[var(--blue)] hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none">
                    Compra & Venda
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink href={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/dicas`} className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-[var(--blue)] hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none">
                    Dicas
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink href={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/sobre`} className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-[var(--blue)] hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none">
                    Sobre
                  </NavigationMenuLink>
                </NavigationMenuItem>
              
            </NavigationMenuList>
          </NavigationMenu>

          {/* Client Area Button */}
          {/*<a href="#contact" className="btn-primary text-sm px-4 portrait:hidden hidden lg:flex">
              <i className="fa-regular fa-circle-user text-xl"></i>
              <span className="ml-2 ">Área do Cliente</span>
          </a>*/}

          <div className="flex items-center gap-1">
            <i className="fab fa-whatsapp text-xl"></i>
            <strong className="text-md">Ligue Agora:</strong>
            <span>(41) 99887-0606</span>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden absolute right-4 top-6"
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
          <div className="lg:hidden mt-4 py-8 border-t border-border">
            <div className="flex flex-col gap-4">
              {/* Menu Links */}
              <div className="flex flex-col gap-2 mb-4">
                <a href={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/sobre`} className="text-foreground hover:text-accent font-medium py-2 px-4 rounded-md hover:bg-accent/10 transition-colors">
                  Sobre
                </a>
                <a href="#" className="text-foreground hover:text-accent font-medium py-2 px-4 rounded-md hover:bg-accent/10 transition-colors">
                  Atendimento Empresarial
                </a>
                <a href={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/franquia`} className="text-foreground hover:text-accent font-medium py-2 px-4 rounded-md hover:bg-accent/10 transition-colors">
                  Franquia
                </a>
                <a href={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/compra-venda`} className="text-foreground hover:text-accent font-medium py-2 px-4 rounded-md hover:bg-accent/10 transition-colors">
                  Compra & Venda
                </a>
                <a href={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/dicas`} className="text-foreground hover:text-accent font-medium py-2 px-4 rounded-md hover:bg-accent/10 transition-colors">
                  Dicas
                </a>
                
              </div>

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
