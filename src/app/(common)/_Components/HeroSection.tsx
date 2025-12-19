"use client";
import { useState } from "react";

import { Search, Calendar, MapPin, ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { AnimatedCounter } from "./AnimatedCounter";

interface HeroSectionProps {
  onSearchClick: () => void;
}

export function HeroSection({ onSearchClick }: HeroSectionProps) {
  const [pickupLocation, setPickupLocation] = useState("");
  const [rentalDate, setRentalDate] = useState("");

  return (
    <div className="relative h-[700px] w-full overflow-hidden bg-black">
      {/* Background Image */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1653464138788-621777596fe0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBibGFjayUyMGNhciUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NjYxNDQ0MTB8MA&ixlib=rb-4.1.0&q=80&w=1080')`,
          }}
        />
        <div className="absolute inset-0 bg-black/70" />

        {/* Grid Overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Diagonal Lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/4 w-1/2 h-full border-r border-white/5 rotate-12 animate-float" />
        <div className="absolute -top-1/2 -left-1/4 w-1/2 h-full border-l border-white/5 -rotate-12 animate-float-delayed" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 rounded px-6 py-3 text-white animate-fade-in">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              <span className="text-sm tracking-widest uppercase">
                Available Now
              </span>
            </div>

            {/* Main Heading */}
            <div className="space-y-6 animate-slide-up">
              <h1 className="text-6xl md:text-7xl lg:text-8xl text-white leading-tight tracking-tighter">
                LUXURY
                <span className="block text-gray-400">REDEFINED</span>
              </h1>
              <div className="w-24 h-px bg-white" />
              <p className="text-xl md:text-2xl text-gray-300 max-w-2xl leading-relaxed">
                Experience unparalleled excellence with our curated collection
                of premium vehicles
              </p>
            </div>

            {/* Enhanced Search Bar */}
            <div className="mt-12 bg-white/10 backdrop-blur-xl p-8 rounded border border-white/20 animate-slide-up-delayed">
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1 group">
                  <label className="block text-xs text-gray-400 mb-3 uppercase tracking-widest">
                    Location
                  </label>
                  <div className="flex items-center gap-3 px-4 py-4 bg-white/5 border border-white/10 rounded group-hover:bg-white/10 group-hover:border-white/20 transition-all">
                    <MapPin className="size-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Enter your location"
                      value={pickupLocation}
                      onChange={(e) => setPickupLocation(e.target.value)}
                      className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-gray-500"
                    />
                  </div>
                </div>

                <div className="flex-1 group">
                  <label className="block text-xs text-gray-400 mb-3 uppercase tracking-widest">
                    Rental Period
                  </label>
                  <div className="flex items-center gap-3 px-4 py-4 bg-white/5 border border-white/10 rounded group-hover:bg-white/10 group-hover:border-white/20 transition-all">
                    <Calendar className="size-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Select dates"
                      value={rentalDate}
                      onChange={(e) => setRentalDate(e.target.value)}
                      className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-gray-500"
                    />
                  </div>
                </div>

                <div className="lg:self-end">
                  <Button
                    size="lg"
                    className="w-full lg:w-auto bg-white text-black hover:bg-gray-200 transition-all duration-300 px-10 py-7 rounded uppercase tracking-widest text-sm"
                    onClick={onSearchClick}
                  >
                    <Search className="size-5 mr-2" />
                    Search
                  </Button>
                </div>
              </div>
            </div>

            {/* Enhanced Stats */}
            <div className="flex flex-wrap gap-12 pt-6 animate-fade-in-up">
              <div className="group cursor-default">
                <div className="text-5xl md:text-6xl text-white mb-2 group-hover:scale-110 transition-transform tracking-tighter">
                  <AnimatedCounter end={500} suffix="+" />
                </div>
                <div className="text-gray-400 uppercase tracking-widest text-xs">
                  Vehicles
                </div>
              </div>
              <div className="group cursor-default">
                <div className="text-5xl md:text-6xl text-white mb-2 group-hover:scale-110 transition-transform tracking-tighter">
                  <AnimatedCounter end={50} suffix="K+" />
                </div>
                <div className="text-gray-400 uppercase tracking-widest text-xs">
                  Clients
                </div>
              </div>
              <div className="group cursor-default">
                <div className="text-5xl md:text-6xl text-white mb-2 group-hover:scale-110 transition-transform tracking-tighter">
                  <AnimatedCounter end={24} suffix="/7" />
                </div>
                <div className="text-gray-400 uppercase tracking-widest text-xs">
                  Support
                </div>
              </div>
              <div className="group cursor-default">
                <div className="text-5xl md:text-6xl text-white mb-2 group-hover:scale-110 transition-transform tracking-tighter">
                  <AnimatedCounter end={98} suffix="%" />
                </div>
                <div className="text-gray-400 uppercase tracking-widest text-xs">
                  Satisfaction
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center gap-2 text-white/60">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ChevronDown className="size-6" />
        </div>
      </div>
    </div>
  );
}
