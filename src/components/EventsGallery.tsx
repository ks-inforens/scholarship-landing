'use client'

import Image from "next/image"
import Autoplay from "embla-carousel-autoplay"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselPrevious,
    CarouselNext,
} from "@/components/ui/carousel"
import { events } from "@/data/imagesData"

export function EventsGallery() {
    return (
        <section className="relative flex flex-col gap-8 items-center w-full bg-black/3 py-16 px-4 rounded-4xl">
            <h1 className="text-3xl font-semibold capitalize bg-clip-text text-transparent bg-gradient-to-b from-black/80 to-black/60 text-center py-1">
                A <span className="bg-clip-text text-transparent bg-gradient-to-b from-orange-700 to-orange-500">glimpse</span> of our strong community
            </h1>

            <div className="w-full max-w-6xl relative">
                <Carousel
                    opts={{
                        loop: true,
                        align: "start",
                    }}
                    plugins={[
                        Autoplay({
                            delay: 3000,
                            stopOnInteraction: false,
                        }),
                    ]}
                >
                    <CarouselContent>
                        {events.map((src, index) => (
                            <CarouselItem
                                key={index}
                                className="md:basis-1/3 basis-full px-2"
                            >
                                <div className="aspect-square overflow-hidden w-full relative">
                                    <Image
                                        src={src}
                                        alt={`Event ${index + 1}`}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 300px"
                                        className="object-cover"
                                        priority={index === 0}
                                    />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>

                    {/* Arrows */}
                    <CarouselPrevious className="absolute -left-5 md:-left-16 top-1/2 -translate-y-1/2 z-10 bg-black/80 text-white cursor-pointer" />
                    <CarouselNext className="absolute -right-5 md:-right-16 top-1/2 -translate-y-1/2 z-10 bg-black/80 text-white cursor-pointer" />
                </Carousel>
            </div>
        </section>
    )
}