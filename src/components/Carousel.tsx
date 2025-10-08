"use client"

import Autoplay from "embla-carousel-autoplay"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"

const logos = [
    "/companies/google.png",
    "/companies/amazon.png",
    "/companies/mckinsey.png",
    "/companies/nhs.png",
    "/companies/jpmg.png",
    "/companies/amex.png",
    "/companies/bdo.svg",
    "/companies/citi.png",
    "/companies/cma.png",
    "/companies/dxc.png",
    "/companies/ey.png",
    "/companies/h&s.png",
    "/companies/hcl.png",
    "/companies/meta.png",
    "/companies/ot.png",
    "/companies/pepsico.png",
    "/companies/persistent.png",
    "/companies/pictory.png",
    "/companies/revolut.png",
    "/companies/tfl.png",
    "/companies/vmware.png",
    "/companies/wayfair.png",
]

export function LogoCarousel() {
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
                {logos.map((src, index) => (
                    <CarouselItem
                        key={index}
                        className="basis-1/4 -p-0 flex justify-center"
                    >
                        <img
                            src={src}
                            alt={`Company logo ${index}`}
                            className="h-10 md:h-14 object-contain"
                        />
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    )
}