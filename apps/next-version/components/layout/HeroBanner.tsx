//auto-playing hero carousel
"use client";
import { banners } from "@/temporary/banners";
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import Image from "next/image";
import Link from "next/link";

export default function HeroBanner() {
  //autoplay plugij instance - kept in a ref so it persists across re-renders
  //delay: 4000 means each slide stays for 4 seconds
  const autoplay = Autoplay({ delay: 4000, stopOnInteraction: true });
  return (
    <div className="px-6 pt-4">
      <Carousel
        plugins={[autoplay]}
        onMouseEnter={() => autoplay.stop()}
        onMouseLeave={() => autoplay.reset()}
        className="w-full rounded-xl overflow-hidden"
      >
        <CarouselContent>
          {banners.map((banner) => (
            <CarouselItem key={banner.id}>
              <Link
                href={banner.href}
                className="relative block h-48 sm:h-64 w-full overflow-hidden rounded-xl"
              >
                {/* Banner image fills the slide */}
                <Image
                  src={banner.image}
                  alt={banner.title}
                  className=" object-cover"
                  fill
                />
              </Link>

              {/* Gradient overlay so text stays readable on any image */}
              <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />

              {/* Banner title */}
              <span className="absolute bottom-4 left-4 text-white text-[20px] font-semibold">
                {banner.title}
              </span>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Prev/next arrows — shadcn pre-styled, positioned inside the carousel */}
        <CarouselPrevious className="left-3" />
        <CarouselNext className="right-3" />
      </Carousel>
    </div>
  );
}
