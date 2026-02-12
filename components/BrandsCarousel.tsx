'use client';

interface BrandItem {
  logo: string;
}

interface BrandsCarouselProps {
  title?: string;
  brands?: BrandItem[];
}

const BrandsCarousel = ({ title, brands }: BrandsCarouselProps) => {
  
  const defaultBrands: BrandItem[] = [    
    { logo: 'brands/lenovo.png' },    
    { logo: 'brands/dell.png' },
    { logo: 'brands/apple.png' },
    { logo: 'brands/compaq.png' },
    { logo: 'brands/hp.png' },
    { logo: 'brands/asus.png' },
    { logo: 'brands/acer.png' },
    { logo: 'brands/avell.png' },
    { logo: 'brands/gateway.png' },
    { logo: 'brands/lg.png' },
    { logo: 'brands/positivo.png' },
    { logo: 'brands/razer.png' },
    { logo: 'brands/samsung.png' },
    { logo: 'brands/toshiba.png' },    
    { logo: 'brands/sony.png' },
    { logo: 'brands/epson.png' },
    { logo: 'brands/xiaomi.png' },
    { logo: 'brands/philips.png' },    
  ];

  const displayTitle = title || "Atendemos Todas as Marcas";
  const displayBrands = brands && brands.length > 0 ? brands : defaultBrands;

  // Para imagens locais (fallback), adicionar basePath
  const getImageSrc = (logo: string | number) => {
    const src = String(logo);
    if (src.startsWith('http')) return src;
    return `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/${src}`;
  };

  return (
    <section id="brands" className="py-12 bg-background">
      <div className="mx-auto px-4">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-foreground mb-2">
            {displayTitle}
          </h3>        
        </div>

        {/* Infinite Scroll Carousel */}
        <div className="overflow-hidden">
          <div 
            className="flex animate-infinite-scroll"
            style={{
              width: 'max-content',
            }}
          >            
            {displayBrands.map((brand, index) => (
              <div
                key={`first-${index}`}
                className="flex-[0_0_auto] w-[150px] md:w-[180px] mr-8"
              >
                <div className="bg-card hover:border-accent hover:shadow-md transition-all duration-300 flex items-center justify-center h-24">
                  <div className="relative w-full h-full flex items-center justify-center">                                        
                    <img 
                      src={getImageSrc(brand.logo)}
                      alt="Logo marca"
                      width={150}
                      height={77}
                      className="object-contain filter hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                </div>
              </div>
            ))}
            
            {/* Segundo conjunto duplicado para loop infinito */}
            {displayBrands.map((brand, index) => (
              <div
                key={`second-${index}`}
                className="flex-[0_0_auto] w-[150px] md:w-[180px] mr-8"
              >
                <div className="bg-card hover:border-accent hover:shadow-md transition-all duration-300 flex items-center justify-center h-24">
                  <div className="relative w-full h-full flex items-center justify-center">                    
                    <img
                      src={getImageSrc(brand.logo)}
                      alt="Logo marca"
                      width={150}
                      height={77}
                      className="object-contain filter hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandsCarousel;
