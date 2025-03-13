import { useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

const Home = () => {
  const [autoplay, setAutoplay] = useState(null);

  useEffect(() => {
    const autoplayInstance = Autoplay({ delay: 3000, stopOnInteraction: false });
    setAutoplay(autoplayInstance);
  }, []);

  const images = [
    { image: "/images/banner1.webp" },
    { image: "/images/banner2.webp" },
    { image: "/images/banner3.webp" },
  ];

  return (
    <div className="flex flex-col items-center">
      <div className="w-full">
        <Carousel plugins={autoplay ? [autoplay] : []} className="w-full">
          <CarouselContent className="h-full">
            {images.map(({ image }, index) => (
              <CarouselItem key={index} className="h-full w-full">
                <img
                  src={image}
                  alt={`Banner ${index + 1}`}
                  className="w-full max-w-full h-40 sm:h-80 md:h-96 lg:h-[300px] xl:h-[500px] object-cover"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
};

export default Home;
