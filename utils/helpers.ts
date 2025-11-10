// Função para formatar tempo relativo
export function formatRelativeTime(timestamp: number): string {
    const now = new Date();
    const reviewDate = new Date(timestamp);
    const diffInSeconds = Math.floor((now.getTime() - reviewDate.getTime()) / 1000);
    
    if (diffInSeconds < 86400) { // Menos de 1 dia
        const hours = Math.floor(diffInSeconds / 3600);
        return hours <= 1 ? 'Há 1 hora' : `Há ${hours} horas`;
    } else if (diffInSeconds < 604800) { // Menos de 1 semana
        const days = Math.floor(diffInSeconds / 86400);
        return days === 1 ? 'Há 1 dia' : `Há ${days} dias`;
    } else if (diffInSeconds < 2419200) { // Menos de 1 mês
        const weeks = Math.floor(diffInSeconds / 604800);
        return weeks === 1 ? 'Há 1 semana' : `Há ${weeks} semanas`;
    } else if (diffInSeconds < 31536000) { // Menos de 1 ano
        const months = Math.floor(diffInSeconds / 2419200);
        return months === 1 ? 'Há 1 mês' : `Há ${months} meses`;
    } else {
        const years = Math.floor(diffInSeconds / 31536000);
        return years === 1 ? 'Há 1 ano' : `Há ${years} anos`;
    }
}

// Função para abrir WhatsApp
export function openWhatsApp(message: string = 'Olá! Gostaria de solicitar um orçamento para assistência técnica.') {
    if (typeof window !== 'undefined') {
        window.open(`https://wa.me/5541998870606?text=${encodeURIComponent(message)}`, '_blank');
    }
}

// Função para scroll suave (apenas no cliente)
export function scrollToSection(sectionId: string, offset: number) {
    if (typeof window !== 'undefined') {

        const target = document.querySelector(sectionId);

        if (target) {
            window.scroll({
                top: target.offsetTop - offset,
                behavior: "smooth"
            });
        }else{
            console.error(`Section with ID ${sectionId} not found`);
        }       
        
    }
}


