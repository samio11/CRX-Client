import { ArrowRight, Star } from "lucide-react";
import { Car } from "./types/car";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface FeaturedCarsProps {
  cars: Car[];
}

export function FeaturedCars({ cars }: FeaturedCarsProps) {
  const featuredCars = cars.filter((car) => car.isAvailable).slice(0, 3);

  return (
    <section className="py-24 bg-white border-y border-gray-200">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded mb-6">
            <Star className="size-4 fill-current" />
            <span className="text-xs tracking-widest uppercase">
              Featured Collection
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl mb-4 tracking-tighter">
            MOST POPULAR
          </h2>
          <div className="w-24 h-px bg-black mx-auto mb-6" />
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Handpicked premium vehicles loved by our clients
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {featuredCars.map((car, index) => (
            <div
              key={car._id}
              className="group relative bg-white border-2 border-gray-200 overflow-hidden hover:border-black transition-all duration-500 hover:-translate-y-2"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image */}
              <div className="relative h-72 overflow-hidden">
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-sm text-black px-4 py-2 rounded text-xs uppercase tracking-widest">
                    {car.category}
                  </span>
                </div>

                {/* Rating */}
                <div className="absolute top-4 right-4">
                  <div className="flex items-center gap-1 bg-white px-3 py-2 rounded">
                    <Star className="size-4 fill-black text-black" />
                    <span className="text-sm">4.9</span>
                  </div>
                </div>

                {/* Overlay Content */}
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <h3 className="text-3xl mb-2 tracking-tight">{car.name}</h3>
                  <p className="text-gray-300 text-sm uppercase tracking-widest">
                    {car.brand} • {car.year}
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 border-t border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">
                      Starting from
                    </div>
                    <div className="text-3xl tracking-tighter">
                      $99<span className="text-lg text-gray-500">/day</span>
                    </div>
                  </div>
                  <Button className="bg-black hover:bg-gray-800 group-hover:scale-110 transition-all uppercase tracking-widest text-xs">
                    <Link href={`/cars/${car._id}`}> Reserve</Link>
                    <ArrowRight className="size-4 ml-2" />
                  </Button>
                </div>

                <div className="flex gap-4 text-xs text-gray-600 uppercase tracking-widest">
                  <span>{car.location}</span>
                  <span>•</span>
                  <span>{car.seats} Seats</span>
                  <span>•</span>
                  <span>{car.fuelType}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
