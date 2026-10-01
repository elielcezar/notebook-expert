import { Phone, Clock } from "lucide-react";
import { FacebookIcon, InstagramIcon, WhatsAppIcon } from "@/components/icons";

const Footer = () => {
    return (
        <footer className="bg-[var(--darkblue)] text-white pt-4">

            <div className="max-w-7xl mx-auto mt-12 px-4 sm:px-6 lg:px-8 portrait:text-center">
                <div className="flex justify-between portrait:flex-col portrait:items-center portrait:gap-4">
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
                        <h2 className="font-semibold mb-4 text-xl pb-4 border-b border-white flex items-center gap-2 portrait:mb-2 portrait:pb-2 portrait:justify-center">
                            <Phone className="w-5 h-5" />
                            Contato
                        </h2>
                        <ul className="space-y-2 text-sm text-white">
                            <li>(41) 3029.8746</li>
                            <li>(41) 99887.0606</li>
                            <li><a href="mailto:atendimento@notebookexpert.com.br" className="text-white hover:text-white transition-colors">atendimento@notebookexpert.com.br</a></li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="font-semibold mb-4 text-xl pb-4 border-b border-white flex items-center gap-2 portrait:mb-2 portrait:pb-2 portrait:justify-center">
                            <Clock className="w-5 h-5" />
                            Atendimento
                        </h2>
                        <p><strong>Segunda a Sexta-feira</strong> das 9h às 18h </p>
                        <p><strong>Sábados</strong> das 9h às 13h</p>
                        <p>Rua 24 de Maio, 280 - Centro</p>
                        <p>Curitiba/PR</p>
                        <p>CEP 80230-080</p>
                    </div>

                    <div>
                        <div className="flex space-x-4 portrait:justify-center">
                            <a href="https://www.facebook.com/NotebookExpert/" aria-label="Facebook da Notebook Expert" className="text-white hover:text-white transition-colors text-2xl">
                                <FacebookIcon />
                            </a>
                            <a href="https://www.instagram.com/notebookexpert/" aria-label="Instagram da Notebook Expert" className="text-white hover:text-white transition-colors text-2xl mr-9">
                                <InstagramIcon />
                            </a>
                            <a href="https://wa.me/5541998870606" aria-label="Conversar no WhatsApp" className="text-white hover:text-white transition-colors text-2xl">
                                <WhatsAppIcon />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-400 mt-12 py-4 text-center text-sm text-gray-400">
                    <p>&copy; 2026 NotebookExpert. Todos os direitos reservados.</p>
                </div>
            </div>

            <div className="btn-circle">
                <a href="https://wa.me/5541998870606" target="_blank" rel="noopener noreferrer" aria-label="Conversar no WhatsApp">
                    <WhatsAppIcon className="text-3xl" />
                </a>
            </div>
        </footer>
    );
};

export default Footer;
