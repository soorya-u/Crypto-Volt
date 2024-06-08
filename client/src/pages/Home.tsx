import { Card, CardContent } from "@/components/primitives/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/primitives/carousel";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center gap-8 mt-10 w-full md-lg:w-[46%]">
      <h1 className="text-[#406be9] text-6xl font-major font-extrabold text-center text-wrap leading-tight">
        crypto volt
      </h1>
      <p className=" font-epilogue text-lg text-center md-lg:text-left">
        "Crypto’s Grace, Changing Every Place!"
      </p>
      <Carousel className="w-full max-w-xs">
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-4xl font-semibold">{index + 1}</span>
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
