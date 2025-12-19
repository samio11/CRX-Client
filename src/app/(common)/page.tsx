"use client";
import { useState, useEffect } from "react";

import { ArrowUp } from "lucide-react";
import { Car } from "./_Components/types/car";
import { toast, Toaster } from "sonner";
import { Filters, FilterValues } from "./_Components/Filters";
import { Header } from "./_Components/Header";
import { HeroSection } from "./_Components/HeroSection";
import { FeaturedCars } from "./_Components/FeaturedCars";
import { HowItWorks } from "./_Components/HowItWorks";
import { Skeleton } from "@/components/ui/skeleton";
import { CarCard } from "./_Components/CarCard";
import { Button } from "@/components/ui/button";
import { Testimonials } from "./_Components/Testimonials";
import { Footer } from "./_Components/Footer";

// Sample data from the API response
const sampleCars: Car[] = [
  {
    _id: "6944503606062a206341f663",
    name: "Tesla Model 3",
    brand: "Tesla",
    model: "Model 3",
    year: 2023,
    color: "White",
    category: "sports",
    fuelType: "electric",
    seats: 5,
    features: ["Autopilot", "Touch Display", "Fast Charging"],
    image:
      "https://res.cloudinary.com/dzrsna1zx/image/upload/v1766084661/sjs9gapl2w-1766084660888-car7.jfif.jpg",
    mileage: 0,
    isAvailable: true,
    location: "Gulshan",
    isDeleted: false,
    createdAt: "2025-12-18T19:04:22.112Z",
    updatedAt: "2025-12-18T19:04:22.112Z",
  },
  {
    _id: "69444fc506062a206341f660",
    name: "BMW 5 Series",
    brand: "BMW",
    model: "530i",
    year: 2023,
    color: "Black",
    category: "luxury",
    fuelType: "petrol",
    seats: 5,
    features: ["Leather Seats", "Sunroof", "Navigation"],
    image:
      "https://res.cloudinary.com/dzrsna1zx/image/upload/v1766084549/vjcy3toyt6-1766084548085-images.jfif.jpg",
    mileage: 12,
    isAvailable: true,
    location: "Banani",
    isDeleted: false,
    createdAt: "2025-12-18T19:02:29.485Z",
    updatedAt: "2025-12-18T19:02:29.485Z",
  },
  {
    _id: "69444fc506062a206341f661",
    name: "Mercedes-Benz S-Class",
    brand: "Mercedes-Benz",
    model: "S500",
    year: 2024,
    color: "Silver",
    category: "luxury",
    fuelType: "hybrid",
    seats: 5,
    features: ["Massage Seats", "Panoramic Roof", "Ambient Lighting"],
    image: "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800",
    mileage: 5,
    isAvailable: true,
    location: "Gulshan",
    isDeleted: false,
    createdAt: "2025-12-18T19:02:29.485Z",
    updatedAt: "2025-12-18T19:02:29.485Z",
  },
  {
    _id: "69444fc506062a206341f662",
    name: "Porsche 911",
    brand: "Porsche",
    model: "911 Carrera",
    year: 2024,
    color: "Red",
    category: "sports",
    fuelType: "petrol",
    seats: 4,
    features: ["Sport Exhaust", "Sport Chrono", "PASM"],
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800",
    mileage: 8,
    isAvailable: true,
    location: "Banani",
    isDeleted: false,
    createdAt: "2025-12-18T19:02:29.485Z",
    updatedAt: "2025-12-18T19:02:29.485Z",
  },
  {
    _id: "69444fc506062a206341f663",
    name: "Audi e-tron GT",
    brand: "Audi",
    model: "e-tron GT",
    year: 2024,
    color: "Blue",
    category: "electric",
    fuelType: "electric",
    seats: 5,
    features: ["Matrix LED", "Virtual Cockpit", "Air Suspension"],
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800",
    mileage: 0,
    isAvailable: true,
    location: "Dhanmondi",
    isDeleted: false,
    createdAt: "2025-12-18T19:02:29.485Z",
    updatedAt: "2025-12-18T19:02:29.485Z",
  },
  {
    _id: "69444fc506062a206341f664",
    name: "Range Rover Sport",
    brand: "Land Rover",
    model: "Sport",
    year: 2023,
    color: "Gray",
    category: "suv",
    fuelType: "diesel",
    seats: 7,
    features: ["Terrain Response", "Meridian Audio", "Adaptive Cruise"],
    image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800",
    mileage: 15,
    isAvailable: false,
    location: "Uttara",
    isDeleted: false,
    createdAt: "2025-12-18T19:02:29.485Z",
    updatedAt: "2025-12-18T19:02:29.485Z",
  },
];

export default function App() {
  const [cars, setCars] = useState<Car[]>(sampleCars);
  const [filteredCars, setFilteredCars] = useState<Car[]>(sampleCars);
  const [isLoading, setIsLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    // Scroll to top button
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchClick = () => {
    toast.success("Searching for available cars...", {
      description: "Showing you the best matches",
    });
    document.getElementById("cars")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleFilterChange = (filters: FilterValues) => {
    let filtered = [...cars];

    // Search filter
    if (filters.search) {
      filtered = filtered.filter(
        (car) =>
          car.name.toLowerCase().includes(filters.search.toLowerCase()) ||
          car.brand.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Category filter
    if (filters.category && filters.category !== "all") {
      filtered = filtered.filter((car) => car.category === filters.category);
    }

    // Fuel type filter
    if (filters.fuelType && filters.fuelType !== "all") {
      filtered = filtered.filter((car) => car.fuelType === filters.fuelType);
    }

    // Location filter
    if (filters.location && filters.location !== "all") {
      filtered = filtered.filter((car) => car.location === filters.location);
    }

    setFilteredCars(filtered);

    toast.success(`Found ${filtered.length} cars matching your criteria`, {
      description: "Browse the results below",
    });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <HeroSection onSearchClick={handleSearchClick} />

      {/* Featured Cars */}
      <FeaturedCars cars={cars} />

      {/* How It Works */}
      <HowItWorks />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-20 space-y-16">
        {/* Filters Section */}
        <div className="animate-fade-in">
          <Filters onFilterChange={handleFilterChange} />
        </div>

        {/* Cars Section */}
        <section id="cars" className="scroll-mt-20">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-5xl mb-3 tracking-tighter">
                AVAILABLE FLEET
              </h2>
              <div className="w-24 h-px bg-black mb-4" />
              <p className="text-gray-600 text-lg uppercase tracking-widest">
                {filteredCars.length} Vehicles
              </p>
            </div>
            <div className="hidden md:block">
              <div className="bg-black text-white px-8 py-4 border-2 border-black">
                <div className="text-xs uppercase tracking-widest text-gray-400 mb-1">
                  Available Now
                </div>
                <div className="text-3xl tracking-tighter">
                  {filteredCars.filter((car) => car.isAvailable).length}
                </div>
              </div>
            </div>
          </div>

          {/* Loading State */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-72 w-full" />
                  <Skeleton className="h-8 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : filteredCars.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCars.map((car, index) => (
                <div
                  key={car._id}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <CarCard car={car} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 border-2 border-gray-200">
              <div className="text-6xl mb-4">🚗</div>
              <h3 className="text-3xl mb-3 tracking-tight">
                NO VEHICLES FOUND
              </h3>
              <p className="text-gray-600 mb-8 uppercase tracking-widest text-sm">
                Adjust your filters to see more results
              </p>
              <Button
                onClick={() => {
                  setFilteredCars(cars);
                  toast.info("Filters cleared");
                }}
                className="bg-black hover:bg-gray-800 uppercase tracking-widest text-xs"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </section>

        {/* Why Choose Us Section */}
        <section className="py-20 border-t-2 border-gray-200">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded mb-6">
              <span className="text-xs tracking-widest uppercase">
                Premium Service
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl mb-4 tracking-tighter">
              WHY CHOOSE US
            </h2>
            <div className="w-24 h-px bg-black mx-auto mb-6" />
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Experience the difference with our premium car rental service
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-10 border-2 border-gray-200 hover:border-black transition-all duration-500 hover:-translate-y-2 group">
              <div className="bg-black w-16 h-16 flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-all">
                <svg
                  className="size-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-2xl mb-4 text-center tracking-tight">
                BEST PRICE
              </h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Competitive pricing on premium cars with no hidden fees and
                transparent pricing
              </p>
            </div>

            <div className="bg-white p-10 border-2 border-gray-200 hover:border-black transition-all duration-500 hover:-translate-y-2 group">
              <div className="bg-black w-16 h-16 flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-all">
                <svg
                  className="size-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl mb-4 text-center tracking-tight">
                24/7 SUPPORT
              </h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Round-the-clock customer support for your peace of mind, anytime
                you need us
              </p>
            </div>

            <div className="bg-white p-10 border-2 border-gray-200 hover:border-black transition-all duration-500 hover:-translate-y-2 group">
              <div className="bg-black w-16 h-16 flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-all">
                <svg
                  className="size-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl mb-4 text-center tracking-tight">
                EASY BOOKING
              </h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Quick and hassle-free booking process in just a few clicks with
                instant confirmation
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Testimonials */}
      <Testimonials />

      <Footer />

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-black hover:bg-gray-800 shadow-2xl hover:scale-110 transition-all duration-300 p-0 border-2 border-black"
          size="icon"
        >
          <ArrowUp className="size-6" />
        </Button>
      )}

      {/* <Toaster position="top-right" richColors /> */}
    </div>
  );
}
