'use client';

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel";

interface SeminovoGalleryProps {
  images: string[];
  title: string;
}

const SeminovoGallery = ({ images, title }: SeminovoGalleryProps) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  if (!images || images.length === 0) return null;

  return (
    <div className="w-full">
      {/* Carrossel Principal */}
      <Carousel
        setApi={setApi}
        opts={{ loop: true }}
        className="w-full"
      >
        <CarouselContent>
          {images.map((img, index) => (
            <CarouselItem key={index}>
              <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-muted">
                <img
                  src={String(img)}
                  alt={`${title} - Imagem ${index + 1}`}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-3 h-10 w-10 bg-white/80 hover:bg-white border-0 shadow-md" />
        <CarouselNext className="right-3 h-10 w-10 bg-white/80 hover:bg-white border-0 shadow-md" />
      </Carousel>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                current === index
                  ? 'border-accent shadow-md'
                  : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <img
                src={String(img)}
                alt={`${title} - Miniatura ${index + 1}`}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Indicador */}
      {count > 1 && (
        <p className="text-center text-sm text-muted-foreground mt-3">
          {current + 1} / {count}
        </p>
      )}
    </div>
  );
};

export default SeminovoGallery;
