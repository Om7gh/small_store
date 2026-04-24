"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ProductType } from "@/type/ProductType";
import Image from "next/image";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

function HomeBanner({ product }: { product: ProductType; error?: any }) {
  return (
    <div className="grid min-h-130 w-full grid-cols-1 items-center gap-8 px-2 py-6 sm:px-4 md:min-h-150 md:grid-cols-2 md:gap-12 md:px-6 md:py-10">
      <div className="order-2 flex h-full max-w-xl flex-col justify-center gap-5 md:order-1">
        <span className="text-sm font-medium uppercase tracking-wide text-accent">
          {product?.name}
        </span>
        <h2 className="text-3xl font-bold leading-tight text-text sm:text-4xl md:text-5xl lg:text-5xl">
          {product?.description}
        </h2>

        <Link
          href={`/product/${product?.id}`}
          className="px-6 py-3 bg-accent text-white  font-medium hover:bg-accent/90 duration-150 w-fit"
        >
          Shop Now
        </Link>
      </div>
      <div className="order-1 grid h-full w-full md:place-items-center md:order-2 overflow-hidden px-8  bg-accent/5">
        <Image
          width={1000}
          height={1000}
          src={product?.image_url}
          alt={product?.name}
          className="h-65 w-full max-w-140  object-cover object-center shadow-md sm:h-85 md:h-105"
        />
      </div>
    </div>
  );
}

export default function Home({ products }: { products: ProductType[] }) {
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));
  return (
    <Carousel className="w-full" plugins={[plugin.current]}>
      <CarouselContent>
        <CarouselItem>
          <HomeBanner product={products[0]} />
        </CarouselItem>
        <CarouselItem>
          <HomeBanner product={products[1]} />
        </CarouselItem>
        <CarouselItem>
          <HomeBanner product={products[2]} />
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious
        className=" z-10 border-none bg-accent text-white hover:bg-accent/90  -left-4 md:-left-8 sm:-left-6 hidden md:grid"
        size="icon"
      />
      <CarouselNext
        className=" z-10 border-none bg-accent text-white hover:bg-accent/90 -right-4 md:-right-8 sm:-right-6 hidden md:grid"
        size="icon"
      />
    </Carousel>
  );
}
