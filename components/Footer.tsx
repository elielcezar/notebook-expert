import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-[var(--darkblue)] text-white">      
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3602.952673487012!2d-49.27563722359901!3d-25.439845727555564!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94dce46fc56256a1%3A0xe0af021b7a876101!2sNotebook%20Expert%20-%20Assist%C3%AAncia%20de%20Notebook!5e0!3m2!1spt-BR!2sbr!4v1756656752760!5m2!1spt-BR!2sbr" width="100%" height="450" style={{border:0}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            
        <div className="max-w-7xl mx-auto mt-12 px-4 sm:px-6 lg:px-8 portrait:text-center">
            <div className="flex justify-between">
                <div>
                    <div className="relative w-full max-w-[210px] mb-4 portrait:mx-auto">
                      <Image src="/n.png" 
                        alt="NotebookExpert" 
                        width={120} height={120} 
                        className="rounded-full object-contain" />
                    </div>                                        
                </div>
                <div>
                    <h4 className="font-semibold mb-4 text-xl pb-4 border-b border-white">Contato</h4>
                    <ul className="space-y-2 text-sm text-white">
                        <li>(41) 3029.8746</li>
                        <li>(41) 99887.0606</li>
                        <li><a href="mailto:atendimento@notebookexpert.com.br" className="text-white hover:text-white transition-colors">atendimento@notebookexpert.com.br</a></li>                        
                    </ul>
                </div>   
                <div>
                    <h4 className="font-semibold mb-4 text-xl pb-4 border-b border-white">Atendimento</h4>
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
