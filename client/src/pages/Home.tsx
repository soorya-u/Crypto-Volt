import Autoplay from "embla-carousel-autoplay";
import metamask from "@/assets/metamask.png";

import { Card, CardContent } from "@/components/ui/card
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel

const CarouselContents: {
  title: string;
  image: string;
  description: string;
}[] = [
  {
    title: "MetaMask Integration",
    image: metamask,
    description:
      "The platform integrates with MetaMask for secure transactions.",
  },
];

export default function Home() {
  return (
    <div className="mt-10 flex w-full flex-col items-center justify-center gap-8 md-lg:w-[46%]">
      <h1 className="text-wrap text-center font-major text-6xl font-extrabold leading-tight text-[#406be9]">
        Crypto Volt
      </h1>
      <p className="text-center font-epilogue text-lg md-lg:text-left">
        "Crypto’s Grace, Changing Every Place!"
      </p>
      <Carousel
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
        opts={{
          loop: true,
          align: "center",
        }}
        className="w-full max-w-xs"
      >
        <CarouselContent>
          {CarouselContents.map((c, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card className="border border-white/40 bg-transparent">
                  <CardContent className="flex aspect-square flex-col items-center justify-center gap-3 p-6">
                    <h1 className="text-center font-major text-lg font-extrabold">
                      {c.title}
                    </h1>
                    <img className="size-24" src={c.image} />
                    <p className="text-center font-epilogue text-base">
                      {c.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
