'use client';

import Image from 'next/image';

const BrandsCarousel = () => {
  
  const brands = [    
    { name: 'Lenovo', image: '/brands/lenovo.png' },    
    { name: 'Dell', image: '/brands/dell.png' },
    { name: 'Apple', image: '/brands/apple.png' },
    { name: 'Compaq', image: '/brands/compaq.png' },
    { name: 'HP', image: '/brands/hp.png' },
    { name: 'Asus', image: '/brands/asus.png' },
    { name: 'Acer', image: '/brands/acer.png' },
    { name: 'Avell', image: '/brands/avell.png' },
    { name: 'Gateway', image: '/brands/gateway.png' },
    { name: 'LG', image: '/brands/lg.png' },
    { name: 'Positivo', image: '/brands/positivo.png' },
    { name: 'Razer', image: '/brands/razer.png' },
    { name: 'Samsung', image: '/brands/samsung.png' },
    { name: 'Toshiba', image: '/brands/toshiba.png' },    
    { name: 'Sony', image: '/brands/sony.png' },
    { name: 'Epson', image: '/brands/epson.png' },
    { name: 'Xiaomi', image: '/brands/xiaomi.png' },
    { name: 'Phillips', image: '/brands/philips.png' },    
  ];



  return (
    <section id="brands" className="py-12 bg-background">
      <div className="mx-auto px-4">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-foreground mb-2">
            Atendemos Todas as Marcas
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
            {brands.map((brand, index) => (
              <div
                key={`first-${index}`}
                className="flex-[0_0_auto] w-[150px] md:w-[180px] mr-8"
              >
                <div className="bg-card hover:border-accent hover:shadow-md transition-all duration-300 flex items-center justify-center h-24">
                  <div className="relative w-full h-full flex items-center justify-center">                                        
                    <img 
                      src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/${brand.image}`}
                      alt={`Logo ${brand.name}`} 
                      width={150}
                      height={77}
                      className="object-contain filter hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                </div>
              </div>
            ))}
            
            {/* Segundo conjunto duplicado para loop infinito */}
            {brands.map((brand, index) => (
              <div
                key={`first-${index}`}
                className="flex-[0_0_auto] w-[150px] md:w-[180px] mr-8"
              >
                <div className="bg-card hover:border-accent hover:shadow-md transition-all duration-300 flex items-center justify-center h-24">
                  <div className="relative w-full h-full flex items-center justify-center">                    
                    <Image
                      src={brand.image}
                      alt={`Logo ${brand.name}`}
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

