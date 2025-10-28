import { Laptop, Facebook, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Laptop className="w-8 h-8 text-accent" />
              <span className="text-2xl font-bold">TechRepair Pro</span>
            </div>
            <p className="text-primary-foreground/80 mb-4">
              16 anos de experiência em manutenção e reparo de notebooks e MacBooks. 
              Qualidade, agilidade e transparência em cada atendimento.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-accent transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-accent transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-accent transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li><a href="#sobre" className="text-primary-foreground/80 hover:text-accent transition-colors">Quem Somos</a></li>
              <li><a href="#servicos" className="text-primary-foreground/80 hover:text-accent transition-colors">Serviços</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">Empresas</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">Contato</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Serviços</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">Troca de Tela</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">Upgrade SSD</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">Limpeza</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">Reparo Placa-Mãe</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-primary-foreground/60 text-sm">
              © 2025 TechRepair Pro. Todos os direitos reservados.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-primary-foreground/60 hover:text-accent transition-colors">
                Política de Privacidade
              </a>
              <a href="#" className="text-primary-foreground/60 hover:text-accent transition-colors">
                Termos de Uso
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
