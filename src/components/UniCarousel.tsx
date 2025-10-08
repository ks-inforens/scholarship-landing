"use client"

import Autoplay from "embla-carousel-autoplay"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"

export function UniCarousel({ items }: { items: string[] }) {
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
            <CarouselContent>
                {items.map((src, index) => (
                    <CarouselItem
                        key={index}
                        className="basis-1/4 md:1/6 flex justify-center"
                    >
                        <div className="h-14 px-2">
                            <img
                                src={src}
                                alt={`Logo ${index}`}
                                className="h-full w-full object-contain"
                            />
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    )
}