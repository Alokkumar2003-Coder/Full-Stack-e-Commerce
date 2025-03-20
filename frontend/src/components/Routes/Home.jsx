import { useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import {
  Airplay,
  BabyIcon,
  CloudLightning,
  Heater,
  Images,
  Shirt,
  ShirtIcon,
  ShoppingBasket,
  UmbrellaIcon,
  WashingMachine,
  WatchIcon,
} from "lucide-react";
import Compo from "../../pages/Shopping/Card";
import { Card, CardContent } from "@/components/ui/card";

const Home = () => {
  const [autoplay, setAutoplay] = useState(null);

  useEffect(() => {
    const autoplayInstance = Autoplay({
      delay: 3000,
      stopOnInteraction: false,
    });
    setAutoplay(autoplayInstance);
  }, []);

  const images = [
    { image: "/images/banner1.webp" },
    { image: "/images/banner2.webp" },
    { image: "/images/banner3.webp" },
  ];

  const categoriesWithIcon = [
    { id: "men", label: "Men", icon: ShirtIcon },
    { id: "women", label: "Women", icon: CloudLightning },
    { id: "kids", label: "Kids", icon: BabyIcon },
    { id: "accessories", label: "Accessories", icon: WatchIcon },
    { id: "footwear", label: "Footwear", icon: UmbrellaIcon },
  ];

  const brandsWithIcon = [
    { id: "nike", label: "Nike", icon: Shirt },
    { id: "adidas", label: "Adidas", icon: WashingMachine },
    { id: "puma", label: "Puma", icon: ShoppingBasket },
    { id: "levi", label: "Levi's", icon: Airplay },
    { id: "zara", label: "Zara", icon: Images },
    { id: "h&m", label: "H&M", icon: Heater },
  ];

  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full">
        <Carousel plugins={autoplay ? [autoplay] : []} className="w-full">
          <CarouselContent className="h-full">
            {images.map(({ image }, index) => (
              <CarouselItem key={index} className="h-full w-full">
                <img
                  src={image}
                  alt={`Banner ${index + 1}`}
                  className="w-full max-w-full h-40 sm:h-80 md:h-96 lg:h-[350px] xl:h-[500px] object-cover"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
      <section className="mt-12 w-full">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Shop by category</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {categoriesWithIcon.map((categoryItem) => (
              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="flex flex-col items-center justify-center p-4 sm:p-6">
                  <categoryItem.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold text-sm sm:text-base">{categoryItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="mt-12 w-full">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Shop by Brand</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {brandsWithIcon.map((brandItem) => (
              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="flex flex-col items-center justify-center p-4 sm:p-6">
                  <brandItem.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold text-sm sm:text-base">{brandItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="mt-10 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-2 sm:p-6 gap-2">
        <Compo />
      </section>
    </div>
  );
};

export default Home;
