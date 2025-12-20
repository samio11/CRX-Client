"use client";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Fuel,
  Users,
  Gauge,
  MapPin,
  Zap,
  Heart,
  ArrowRight,
  Star,
} from "lucide-react";
import { useState } from "react";
import { Car } from "./types/car";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface CarCardProps {
  car: Car;
}

export function CarCard({ car }: CarCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const getFuelIcon = (fuelType: string) => {
    if (fuelType === "electric") {
      return <Zap className="size-4" />;
    }
    return <Fuel className="size-4" />;
  };

  return (
    <Card
      className="overflow-hidden hover:shadow-2xl transition-all duration-500 group bg-white border border-gray-200 hover:border-black relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-black transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

      {/* Image Section */}
      <div className="relative h-72 overflow-hidden bg-gray-100">
        <img
          src={car.image}
          alt={car.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 grayscale group-hover:grayscale-0"
        />

        {/* Gradient Overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-60"
          }`}
        />

        {/* Badges */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
          <Badge className="bg-black/80 backdrop-blur-sm text-white border-0 uppercase tracking-widest text-xs">
            {car.category}
          </Badge>
        </div>

        {/* Availability Badge */}
        <div className="absolute top-4 right-16">
          {car.isAvailable ? (
            <Badge className="bg-white text-black border-0 uppercase tracking-widest text-xs">
              <span className="relative flex h-2 w-2 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-black"></span>
              </span>
              Available
            </Badge>
          ) : (
            <Badge className="bg-black/90 text-white border-0 uppercase tracking-widest text-xs">
              Rented
            </Badge>
          )}
        </div>

        {/* Bottom Info - Appears on Hover */}
        <div
          className={`absolute bottom-4 left-4 right-4 transition-all duration-300 ${
            isHovered ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <div className="flex items-end justify-between">
            <div className="text-white">
              <div className="text-xs uppercase tracking-widest text-gray-400 mb-1">
                Starting from
              </div>
              <div className="text-3xl tracking-tighter">
                $99<span className="text-sm text-gray-400">/day</span>
              </div>
            </div>
            <div className="flex items-center gap-1 bg-white px-3 py-1 rounded">
              <Star className="size-4 fill-black text-black" />
              <span className="text-sm">4.8</span>
            </div>
          </div>
        </div>
      </div>

      <CardContent className="p-6 space-y-5">
        {/* Title */}
        <div>
          <h3 className="text-2xl mb-1 tracking-tight group-hover:text-gray-700 transition-colors">
            {car.name}
          </h3>
          <p className="text-gray-500 text-sm uppercase tracking-widest">
            {car.brand} {car.model} • {car.year}
          </p>
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-3 p-3 border border-gray-200 rounded group/item hover:border-black transition-colors">
            {getFuelIcon(car.fuelType)}
            <div>
              <div className="text-xs text-gray-500 uppercase tracking-widest">
                Fuel
              </div>
              <div className="text-sm capitalize">{car.fuelType}</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 border border-gray-200 rounded group/item hover:border-black transition-colors">
            <Users className="size-4" />
            <div>
              <div className="text-xs text-gray-500 uppercase tracking-widest">
                Seats
              </div>
              <div className="text-sm">{car.seats}</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 border border-gray-200 rounded group/item hover:border-black transition-colors">
            <Gauge className="size-4" />
            <div>
              <div className="text-xs text-gray-500 uppercase tracking-widest">
                Mileage
              </div>
              <div className="text-sm">{car.mileage} km</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 border border-gray-200 rounded group/item hover:border-black transition-colors">
            <MapPin className="size-4" />
            <div>
              <div className="text-xs text-gray-500 uppercase tracking-widest">
                Location
              </div>
              <div className="text-sm">{car.location}</div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div>
          <div className="text-xs text-gray-500 mb-2 uppercase tracking-widest">
            Features
          </div>
          <div className="flex flex-wrap gap-2">
            {car.features.slice(0, 3).map((feature: any, index: any) => (
              <Badge
                key={index}
                variant="secondary"
                className="text-xs bg-gray-100 hover:bg-black hover:text-white transition-colors border border-gray-200 uppercase tracking-wider"
              >
                {feature}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0 flex gap-3">
        <Button
          className="flex-1 bg-black hover:bg-gray-800 text-white transition-all duration-300 group/btn uppercase tracking-widest text-xs"
          disabled={!car.isAvailable}
        >
          <Link href={`/cars/${car._id}`}>Details</Link>
          {/* {car.isAvailable ? "Reserve" : "Unavailable"}
          {car.isAvailable && (
            <ArrowRight className="size-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
          )} */}
        </Button>
      </CardFooter>
    </Card>
  );
}
