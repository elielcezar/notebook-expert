import { Phone, Clock } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[var(--darkblue)] text-white pt-4">              
            
        <div className="max-w-7xl mx-auto mt-12 px-4 sm:px-6 lg:px-8 portrait:text-center">
            <div className="flex justify-between">
                <div>
                    <div className="relative w-full max-w-[210px] mb-4 portrait:mx-auto">
                      <img 
                        src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/n.png`}
                        alt="NotebookExpert" 
                        width="120" 
                        height="120" 
                        className="rounded-full object-contain" 
                      />
                    </div>                                        
                </div>
                <div>
                    <h4 className="font-semibold mb-4 text-xl pb-4 border-b border-white flex items-center gap-2">
                        <Phone className="w-5 h-5" />
                        Contato
                    </h4>
                    <ul className="space-y-2 text-sm text-white">
                        <li>(41) 3029.8746</li>
                        <li>(41) 99887.0606</li>
                        <li><a href="mailto:atendimento@notebookexpert.com.br" className="text-white hover:text-white transition-colors">atendimento@notebookexpert.com.br</a></li>                        
                    </ul>
                </div>   
                <div>
                    <h4 className="font-semibold mb-4 text-xl pb-4 border-b border-white flex items-center gap-2">
                        <Clock className="w-5 h-5" />
                        Atendimento
                    </h4>
                    <p><strong>Segunda a sexta feira</strong> das 9h às 18h </p>                    
                    <p><strong>Sábados</strong> das 9h às 13h</p>
                    <p>Rua 24 de Maio, 280 - Centro</p>
                    <p>Curitiba - PR, 80230-080</p>
                </div>               
                
                <div>
                <div className="flex space-x-4 portrait:justify-center">
                        <a href="#" className="text-white hover:text-white transition-colors text-2xl">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="#" className="text-white hover:text-white transition-colors text-2xl mr-9">
                            <i className="fab fa-instagram"></i>
                        </a>
                        <a href="#" className="text-white hover:text-white transition-colors text-2xl">
                            <i className="fab fa-whatsapp"></i>
                        </a>
                    </div>
                </div>            
            </div>
            <div className="border-t border-gray-400 mt-12 py-4 text-center text-sm text-gray-400">
                <p>&copy; 2024 NotebookExpert. Todos os direitos reservados.</p>
            </div>
        </div>

        <div className="btn-circle">
            <a href="https://wa.me/5541998870606" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-whatsapp text-3xl"></i>
            </a>
        </div>
    </footer>
  );
};

export default Footer;
