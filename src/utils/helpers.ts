// Declarações de tipos globais
declare global {
    interface Window {
        swiper: {
            destroy: (deleteInstance?: boolean, cleanStyles?: boolean) => void;
        } | null;
    }
}

declare const Swiper: {
    new (selector: string, options: Record<string, unknown>): {
        destroy: (deleteInstance?: boolean, cleanStyles?: boolean) => void;
    };
};

// Interfaces para tipagem
interface Review {
    author_name: string;
    rating: number;
    text: string;
    time: number;
    profile_photo_url: string | null;
}

interface ReviewsData {
    rating: number;
    reviewsCount: number;
    reviews: Review[];
}

// Configuração da Google Places API
const GOOGLE_PLACES_CONFIG = {
    apiKey: 'SUA_API_KEY_AQUI', // Substitua pela sua API Key
    placeId: 'SUA_PLACE_ID_AQUI', // Substitua pelo Place ID da sua empresa
    // Fallback para dados locais se a API não estiver disponível
    fallbackData: {
        rating: 4.8,
        reviewsCount: 150,
        reviews: [
            {
                author_name: "Ana Clara Silva",
                rating: 5,
                text: "Excelente atendimento! Meu notebook Dell estava com problemas na tela e eles consertaram rapidamente. Preço justo e muita qualidade no serviço.",
                time: Date.now() - (14 * 24 * 60 * 60 * 1000), // 2 semanas atrás
                profile_photo_url: null
            },
            {
                author_name: "Ricardo Ferreira",
                rating: 5,
                text: "Precisei de um conserto urgente para trabalho e eles me atenderam no mesmo dia. Profissionais competentes e honestos. Super recomendo!",
                time: Date.now() - (30 * 24 * 60 * 60 * 1000), // 1 mês atrás
                profile_photo_url: null
            },
            {
                author_name: "Marina Santos",
                rating: 5,
                text: "Melhor assistência técnica de Curitiba! Recuperaram todos os meus arquivos que pensei ter perdido. Equipe muito atenciosa e preços honestos.",
                time: Date.now() - (21 * 24 * 60 * 60 * 1000), // 3 semanas atrás
                profile_photo_url: null
            },
            {
                author_name: "João Mendes",
                rating: 5,
                text: "Serviço impecável! Meu MacBook Pro estava com problema no HD e eles fizeram um trabalho perfeito. Já é a segunda vez que uso os serviços deles.",
                time: Date.now() - (7 * 24 * 60 * 60 * 1000), // 1 semana atrás
                profile_photo_url: null
            },
            {
                author_name: "Luiza Costa",
                rating: 5,
                text: "Atendimento nota 10! Meu notebook estava lento e com vírus, eles limparam tudo e ainda instalaram um antivírus. Ficou voando!",
                time: Date.now() - (4 * 24 * 60 * 60 * 1000), // 4 dias atrás
                profile_photo_url: null
            },
            {
                author_name: "Pedro Silva",
                rating: 5,
                text: "Precisava trocar a tela do meu notebook e achei que seria caro. Eles fizeram um orçamento justo e o serviço ficou perfeito. Muito satisfeito!",
                time: Date.now() - (5 * 24 * 60 * 60 * 1000), // 5 dias atrás
                profile_photo_url: null
            }
        ]
    }
};

// Função para buscar avaliações do Google Places API
async function fetchGoogleReviews() {
    try {
        // Verificar se temos API key e Place ID configurados
        if (!GOOGLE_PLACES_CONFIG.apiKey || GOOGLE_PLACES_CONFIG.apiKey === 'SUA_API_KEY_AQUI' ||
            !GOOGLE_PLACES_CONFIG.placeId || GOOGLE_PLACES_CONFIG.placeId === 'SUA_PLACE_ID_AQUI') {
            console.log('API Key ou Place ID não configurados, usando dados fallback');
            return GOOGLE_PLACES_CONFIG.fallbackData;
        }

        const response = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${GOOGLE_PLACES_CONFIG.placeId}&fields=name,rating,user_ratings_total,reviews&key=${GOOGLE_PLACES_CONFIG.apiKey}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.status === 'OK' && data.result) {
            return {
                rating: data.result.rating || 4.8,
                reviewsCount: data.result.user_ratings_total || 150,
                reviews: data.result.reviews || GOOGLE_PLACES_CONFIG.fallbackData.reviews
            };
        } else {
            throw new Error('API response error: ' + data.status);
        }
    } catch (error) {
        console.error('Erro ao buscar avaliações do Google:', error);
        // Usar dados fallback em caso de erro
        return GOOGLE_PLACES_CONFIG.fallbackData;
    }
}

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

// Função para gerar iniciais do nome
function getInitials(name: string): string {
    return name.split(' ').map(word => word.charAt(0).toUpperCase()).join('').substring(0, 2);
}

// Função para gerar cor de fundo baseada no nome
function getBackgroundColor(name: string): string {
    const colors = [
        'bg-blue-600', 'bg-green-600', 'bg-purple-600', 'bg-red-600', 
        'bg-indigo-600', 'bg-yellow-600', 'bg-pink-600', 'bg-teal-600'
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
}

// Função para renderizar estrelas
function renderStars(rating: number): string {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        stars += `<i class="fas fa-star${i <= rating ? '' : ' text-gray-300'}"></i>`;
    }
    return stars;
}

// Função para determinar badge da avaliação
function getReviewBadge(timestamp: number): string {
    const now = new Date();
    const reviewDate = new Date(timestamp);
    const diffInDays = Math.floor((now.getTime() - reviewDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays <= 7) {
        return '<span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Novo</span>';
    } else if (diffInDays <= 14) {
        return '<span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Recente</span>';
    } else if (diffInDays <= 30) {
        return '<span class="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">Último mês</span>';
    }
    return '';
}

// Função para popular o carrossel de avaliações
function populateReviewsCarousel(reviewsData: ReviewsData): void {
    const container = document.getElementById('reviews-container');
    const averageRatingElement = document.getElementById('average-rating');
    const reviewsCountElement = document.getElementById('reviews-count');
    
    // Verificar se os elementos existem antes de usar
    if (!container) {
        console.error('Elemento reviews-container não encontrado');
        return;
    }
    
    if (!averageRatingElement || !reviewsCountElement) {
        console.error('Elementos de estatísticas não encontrados');
        return;
    }
    
    // Atualizar estatísticas
    averageRatingElement.textContent = reviewsData.rating.toFixed(1);
    reviewsCountElement.textContent = `Baseado em mais de ${reviewsData.reviewsCount} avaliações no Google`;
    
    // Limpar container
    container.innerHTML = '';
    
    // Criar slides das avaliações
    reviewsData.reviews.forEach((review) => {
        const initials = getInitials(review.author_name);
        const bgColor = getBackgroundColor(review.author_name);
        const relativeTime = formatRelativeTime(review.time);
        const stars = renderStars(review.rating);
        const badge = getReviewBadge(review.time);
        
        const slide = document.createElement('div');
        slide.className = 'swiper-slide flex-shrink-0 carousel-item px-3';
        slide.innerHTML = `
            <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow h-full">
                <div class="flex items-center mb-4">
                    <div class="w-12 h-12 ${bgColor} rounded-full flex items-center justify-center text-white font-bold mr-4">
                        ${initials}
                    </div>
                    <div>
                        <h4 class="font-semibold text-gray-800">${review.author_name}</h4>
                        <div class="flex text-yellow-500 text-sm">
                            ${stars}
                        </div>
                    </div>
                </div>
                <p class="text-gray-600 italic">"${review.text}"</p>
                <div class="flex items-center justify-between mt-3">
                    <div class="text-xs text-gray-400">${relativeTime}</div>
                    ${badge}
                </div>
            </div>
        `;
        container.appendChild(slide);
    });
    
    // Reinicializar o Swiper
    if (window.swiper) {
        window.swiper.destroy(true, true);
    }
    
    window.swiper = new Swiper(".mySwiper", {
        slidesPerView: 1,
        spaceBetween: 20,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 30,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 30,
            },
        },
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
    });
}

// Função para mostrar erro
function showError(message: string): void {
    const errorElement = document.getElementById('reviews-error');
    const loadingElement = document.querySelector('.reviews-loading') as HTMLElement;
    
    if (loadingElement) {
        loadingElement.style.display = 'none';
    }
    
    if (!errorElement) {
        console.error('Elemento reviews-error não encontrado');
        return;
    }
    
    errorElement.style.display = 'block';
    errorElement.innerHTML = `
        <p><strong>Erro ao carregar avaliações</strong></p>
        <p>${message}</p>
    `;
}

// Função principal para carregar avaliações
export async function loadReviews() {
    try {
        const reviewsData = await fetchGoogleReviews();
        populateReviewsCarousel(reviewsData);
    } catch (error) {
        console.error('Erro ao carregar avaliações:', error);
        showError('Não foi possível carregar as avaliações do Google. Usando dados locais.');
        // Usar dados fallback em caso de erro
        populateReviewsCarousel(GOOGLE_PLACES_CONFIG.fallbackData);
    }
}

// Função para scroll suave que pode ser usada no React
export function scrollToSection(sectionId: string) {
    const target = document.querySelector(sectionId);
    if (target) {
        target.scrollIntoView({
            behavior: 'smooth'
        });
    }
}

// Função para abrir WhatsApp
export function openWhatsApp(message: string = 'Olá! Gostaria de solicitar um orçamento para assistência técnica.') {
    window.open(`https://wa.me/5541999999999?text=${encodeURIComponent(message)}`, '_blank');
}

// Smooth scrolling para links do menu (Vanilla JS)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (this: HTMLAnchorElement, e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href')!);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Efeito de hover nos cards de serviço
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function(this: HTMLElement) {
        this.style.transform = 'translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', function(this: HTMLElement) {
        this.style.transform = 'translateY(0)';
    });
});

// Botão do WhatsApp
document.querySelectorAll('button').forEach(button => {
    const buttonText = button.textContent;
    if (buttonText && (buttonText.includes('WhatsApp') || buttonText.includes('Ligue agora'))) {
        button.addEventListener('click', function() {
            window.open('https://wa.me/5541999999999?text=Olá! Gostaria de solicitar um orçamento para assistência técnica.', '_blank');
        });
    }
});

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    loadReviews();
});