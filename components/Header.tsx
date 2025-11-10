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
import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";



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
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">            
            <Image src="/logo.webp" alt="Logo" width={192} height={60} className="w-48" priority />
          </div>

          {/* Desktop Navigation Menu */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger>Serviços</NavigationMenuTrigger>
                  <NavigationMenuContent className="right-0 left-auto">
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                      {services.map((service, index) => {
                        const Icon = service.icon;
                        return (
                          <li key={index}>
                            <NavigationMenuLink href="#" className="group flex items-center gap-2 select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[var(--blue)] hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                              <Icon className="w-8 h-8 flex-shrink-0 text-[var(--blue)] group-hover:text-white" />
                              <div className="text-sm font-medium leading-none">{service.text}</div>
                            </NavigationMenuLink>
                          </li>
                        );
                      })}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink href="#" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-[var(--blue)] hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none">
                    Para Empresas
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink href="#" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-[var(--blue)] hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none">
                    Antes & Depois
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink href="#" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-[var(--blue)] hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none">
                    Compra & Venda
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink href="#" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-[var(--blue)] hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none">
                    Dicas
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink href="#" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-[var(--blue)] hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none">
                    Sobre
                  </NavigationMenuLink>
                </NavigationMenuItem>
              
            </NavigationMenuList>
          </NavigationMenu>

          {/* Client Area Button */}
          <a href="#contact" className="btn-primary text-sm px-4 portrait:hidden hidden lg:flex">
              <i className="fa-regular fa-circle-user text-xl"></i>
              <span className="ml-2 ">Área do Cliente</span>
          </a>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden"
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
                <a href="#" className="text-foreground hover:text-accent font-medium py-2 px-4 rounded-md hover:bg-accent/10 transition-colors">
                  Sobre
                </a>
                <a href="#" className="text-foreground hover:text-accent font-medium py-2 px-4 rounded-md hover:bg-accent/10 transition-colors">
                  Atendimento Empresarial
                </a>
                <a href="#" className="text-foreground hover:text-accent font-medium py-2 px-4 rounded-md hover:bg-accent/10 transition-colors">
                  Antes & Depois
                </a>
                <a href="#" className="text-foreground hover:text-accent font-medium py-2 px-4 rounded-md hover:bg-accent/10 transition-colors">
                  Compra & Venda
                </a>
                <a href="#" className="text-foreground hover:text-accent font-medium py-2 px-4 rounded-md hover:bg-accent/10 transition-colors">
                  Dicas
                </a>
                
                {/* Serviços Submenu */}
                <div className="border-t border-border pt-2 mt-2">
                  <p className="text-sm font-semibold text-muted-foreground px-4 mb-2">Serviços</p>
                  {services.map((service, index) => {
                    const Icon = service.icon;
                    return (
                      <a 
                        key={index}
                        href="#" 
                        className="text-sm text-foreground hover:text-accent py-2 px-6 flex items-center gap-2 hover:bg-accent/10 rounded-md transition-colors"
                      >
                        <Icon className="w-4 h-4 flex-shrink-0" />
                        {service.text}
                      </a>
                    );
                  })}
                </div>
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
