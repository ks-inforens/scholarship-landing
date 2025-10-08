"use client"

import Autoplay from "embla-carousel-autoplay"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"

export function ImgCarousel({ items }: { items: string[] }) {
    return (
        <Carousel
            opts={{
                align: "start",
                loop: true,
            }}
            plugins={[
                Autoplay({
                    delay: 2000,
                    stopOnInteraction: false,
                }),
            ]}
            className="w-full max-w-6xl mx-auto"
        >
            <CarouselContent className="-ml-4">
                {items.map((src, index) => (
                    <CarouselItem
                        key={index}
                        className="basis-1/4 -p-0 flex justify-center"
                    >
                        <img
                            src={src}
                            alt={`Logo ${index}`}
                            className="h-10 md:h-14 object-contain"
                        />
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    )
}