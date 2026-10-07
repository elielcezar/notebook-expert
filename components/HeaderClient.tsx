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
  Database,
  ChevronDown, CircleUser
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
import { SECAO_PATH, SECAO_TITULO, categoriaHref } from "@/lib/reparo";
import { FacebookIcon, InstagramIcon, WhatsAppIcon } from "@/components/icons";

interface HeaderClientProps {
  categorias: { name: string; slug: string }[];
}

const HeaderClient = ({ categorias }: HeaderClientProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isReparoOpen, setIsReparoOpen] = useState(false);

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
    <header className="fixed top-0 left-0 right-0 z-[100] bg-background backdrop-blur-sm border-b border-border">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between portrait:flex-col portrait:items-center portrait:gap-4">
          {/* Logo */}          
          <div className="flex items-center gap-2 shrink-0">
            <Link href={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/`}>      
            <img 
              src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/logo.webp`}
              alt="Logo" 
              width="192" 
              height="60" 
              className="w-60 lg:w-44 xl:w-60"
            />
            </Link>
          </div>

          {/* Desktop Navigation Menu */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>           

                <NavigationMenuItem>
                  <NavigationMenuLink href={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/servicos`} className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 lg:px-2.5 xl:px-4 py-2 text-sm font-medium transition-colors hover:bg-[var(--blue)] hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none">
                    Serviços
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink href={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/para-empresas`} className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 lg:px-2.5 xl:px-4 py-2 text-sm font-medium transition-colors hover:bg-[var(--blue)] hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none">
                    Para Empresas
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink href={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/franquia`} className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 lg:px-2.5 xl:px-4 py-2 text-sm font-medium transition-colors hover:bg-[var(--blue)] hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none">
                    Franquia
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink href={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/compra-venda`} className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 lg:px-2.5 xl:px-4 py-2 text-sm font-medium transition-colors hover:bg-[var(--blue)] hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none">
                    Compra & Venda
                  </NavigationMenuLink>
                </NavigationMenuItem>

                {/* Dropdown próprio em vez de NavigationMenuTrigger: o viewport do
                    shadcn abre alinhado à esquerda do menu inteiro, e o trigger
                    do Radix não pode ser link para a listagem geral */}
                <NavigationMenuItem className="relative group/reparo">
                  <Link href={SECAO_PATH} className="group inline-flex h-10 w-max items-center justify-center gap-1 rounded-md bg-background px-4 lg:px-2.5 xl:px-4 py-2 text-sm font-medium transition-colors hover:bg-[var(--blue)] hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none group-hover/reparo:bg-[var(--blue)] group-hover/reparo:text-accent-foreground">
                    {SECAO_TITULO}
                    <ChevronDown className="h-3 w-3 transition-transform duration-200 group-hover/reparo:rotate-180" />
                  </Link>
                  {categorias.length > 0 && (
                    <div className="invisible opacity-0 group-hover/reparo:visible group-hover/reparo:opacity-100 group-focus-within/reparo:visible group-focus-within/reparo:opacity-100 transition-opacity absolute left-1/2 -translate-x-1/2 top-full pt-2">
                      <ul className="grid grid-cols-2 gap-1 w-[22rem] rounded-md border border-border bg-background p-2 shadow-lg">
                        {categorias.map((c) => (
                          <li key={c.slug}>
                            <Link href={categoriaHref(c.slug)} className="block rounded-md px-3 py-2 text-sm text-foreground hover:bg-[var(--blue)] hover:text-white focus:bg-[var(--blue)] focus:text-white focus:outline-none transition-colors">
                              {c.name}
                            </Link>
                          </li>
                        ))}
                        <li className="col-span-2 border-t border-border mt-1 pt-1">
                          <Link href={SECAO_PATH} className="block rounded-md px-3 py-2 text-sm font-semibold text-[var(--blue)] hover:bg-[var(--blue)] hover:text-white focus:bg-[var(--blue)] focus:text-white focus:outline-none transition-colors">
                            Ver todos os serviços de reparo
                          </Link>
                        </li>
                      </ul>
                    </div>
                  )}
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink href={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/dicas`} className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 lg:px-2.5 xl:px-4 py-2 text-sm font-medium transition-colors hover:bg-[var(--blue)] hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none">
                    Dicas
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink href={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/sobre`} className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 lg:px-2.5 xl:px-4 py-2 text-sm font-medium transition-colors hover:bg-[var(--blue)] hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none">
                    Sobre
                  </NavigationMenuLink>
                </NavigationMenuItem>
              
            </NavigationMenuList>
          </NavigationMenu>

          {/* Client Area Button */}
          {/*<a href="#contact" className="btn-primary text-sm px-4 portrait:hidden hidden lg:flex">
              <CircleUser aria-hidden="true" className="inline-block w-[1em] h-[1em] align-[-0.125em] text-xl" />
              <span className="ml-2 ">Área do Cliente</span>
          </a>*/}

          {/* Entre 1024 e 1279 px não cabe junto do menu: o botão flutuante do
              WhatsApp cobre essa faixa. "Ligue Agora:" só a partir de 1366 px. */}
          <div className="flex lg:hidden xl:flex items-center gap-1 whitespace-nowrap shrink-0">
            <WhatsAppIcon className="text-xl" />
            <strong className="text-md lg:hidden min-[1366px]:inline">Ligue Agora:</strong>
            <span>(41) 99887-0606</span>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden absolute right-4 top-6"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isMenuOpen}
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
                <a href={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/servicos`} className="text-foreground hover:text-accent font-medium py-2 px-4 rounded-md hover:bg-accent/10 transition-colors">
                  Serviços
                </a>
                <a href={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/para-empresas`} className="text-foreground hover:text-accent font-medium py-2 px-4 rounded-md hover:bg-accent/10 transition-colors">
                  Para Empresas
                </a>
                <a href={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/franquia`} className="text-foreground hover:text-accent font-medium py-2 px-4 rounded-md hover:bg-accent/10 transition-colors">
                  Franquia
                </a>
                <a href={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/compra-venda`} className="text-foreground hover:text-accent font-medium py-2 px-4 rounded-md hover:bg-accent/10 transition-colors">
                  Compra & Venda
                </a>
                <div>
                  <div className="flex items-center">
                    <a href={SECAO_PATH} className="flex-1 text-foreground hover:text-accent font-medium py-2 px-4 rounded-md hover:bg-accent/10 transition-colors">
                      {SECAO_TITULO}
                    </a>
                    {categorias.length > 0 && (
                      <button
                        type="button"
                        onClick={() => setIsReparoOpen(!isReparoOpen)}
                        aria-expanded={isReparoOpen}
                        aria-label="Ver marcas"
                        className="p-2 rounded-md hover:bg-accent/10"
                      >
                        <ChevronDown className={`w-5 h-5 transition-transform ${isReparoOpen ? "rotate-180" : ""}`} />
                      </button>
                    )}
                  </div>
                  {isReparoOpen && (
                    <div className="grid grid-cols-2 gap-1 pl-4 mt-1">
                      {categorias.map((c) => (
                        <a key={c.slug} href={categoriaHref(c.slug)} className="text-sm text-muted-foreground hover:text-accent py-2 px-4 rounded-md hover:bg-accent/10 transition-colors">
                          {c.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
                <a href={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/dicas`} className="text-foreground hover:text-accent font-medium py-2 px-4 rounded-md hover:bg-accent/10 transition-colors">
                  Dicas
                </a>
                <a href={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/sobre`} className="text-foreground hover:text-accent font-medium py-2 px-4 rounded-md hover:bg-accent/10 transition-colors">
                  Sobre
                </a>
                
              </div>

              <a href="#contact" className="btn-primary text-[17px] px-4 text-center">
                  <CircleUser aria-hidden="true" className="inline-block w-[1em] h-[1em] align-[-0.125em]" />
                  <span className="ml-2 ">Área do Cliente</span>
              </a>  

              <div className="flex space-x-4 portrait:justify-center">
                  <a href="https://www.facebook.com/NotebookExpert/" target="_blank" rel="noopener noreferrer" aria-label="Facebook da Notebook Expert" className="text-[var(--blue)] hover:text-white transition-colors text-2xl">
                      <FacebookIcon />
                  </a>
                  <a href="https://www.instagram.com/notebookexpert/" target="_blank" rel="noopener noreferrer" aria-label="Instagram da Notebook Expert" className="text-[var(--blue)] hover:text-white transition-colors text-2xl mr-9">
                      <InstagramIcon />
                  </a>
                  <a href="https://wa.me/5541998870606" target="_blank" rel="noopener noreferrer" aria-label="Conversar no WhatsApp" className="text-[var(--blue)] hover:text-white transition-colors text-2xl">
                      <WhatsAppIcon />
                  </a>
              </div>           
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default HeaderClient;
