"use client";

import { getACar } from "@/services/cars";
import { createBooking } from "@/services/booking";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import {
  Calendar,
  User,
  Fuel,
  Calendar as CalendarIcon,
  MapPin,
  Clock,
  CheckCircle,
} from "lucide-react";

interface CarDetailsProps {
  params: Promise<{ carId: string }>;
}

export default function CarDetails({ params }: CarDetailsProps) {
  const [car, setCar] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [carId, setCarId] = useState<string>("");
  const { user } = useUser();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  useEffect(() => {
    const loadCarData = async () => {
      const resolvedParams = await params;
      setCarId(resolvedParams.carId);
      try {
        const { data } = await getACar(resolvedParams.carId);
        setCar(data);
      } catch (error) {
        console.error("Error loading car:", error);
        toast.error("Failed to load car details");
      } finally {
        setLoading(false);
      }
    };
    loadCarData();
  }, [params]);

  const onSubmit = async (data: FieldValues) => {
    if (!user) {
      toast.error("Please login to book this car");
      router.push("/login");
      return;
    }

    if (user.role !== "user") {
      toast.error("Only users can book cars");
      return;
    }

    if (!car || !carId) {
      toast.error("Car information is not available");
      return;
    }

    const payload = {
      car: carId,
      startDate: data.startDate,
      endDate: data.endDate,
    };

    setBookingLoading(true);
    try {
      const result = await createBooking(payload);
      if (result.success) {
        toast.success("Booking created successfully!");
        reset();
        // Optionally redirect to bookings page
        // router.push("/bookings");
      } else {
        toast.error(result.message || "Failed to create booking");
      }
    } catch (error: any) {
      console.error("Booking error:", error);
      toast.error(error.message || "An error occurred while booking");
    } finally {
      setBookingLoading(false);
    }
  };

  const startDate = watch("startDate");
  const endDate = watch("endDate");

  const calculateDays = () => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
    return 0;
  };

  const days = calculateDays();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Car Not Found</h1>
          <button
            onClick={() => router.back()}
            className="px-6 py-3 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-4 md:p-8">
      <Toaster position="top-right" toastOptions={{ duration: 4000 }} />

      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="mb-8 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center gap-2 transition-colors"
      >
        ← Back to Previous Page
      </button>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Car Image and Basic Info */}
          <div className="space-y-6">
            {/* Car Image */}
            <div className="relative rounded-2xl overflow-hidden bg-gray-800">
              <img
                src={car.image || "/placeholder-car.jpg"}
                alt={car.name}
                className="w-full h-96 object-cover"
              />
              <div className="absolute top-4 left-4 bg-gray-900/80 backdrop-blur-sm px-3 py-1 rounded-full">
                <span className="text-sm font-medium">
                  {car.category.toUpperCase()}
                </span>
              </div>
              {car.isAvailable ? (
                <div className="absolute top-4 right-4 bg-green-500/90 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="text-sm font-medium flex items-center gap-1">
                    <CheckCircle size={14} /> Available
                  </span>
                </div>
              ) : (
                <div className="absolute top-4 right-4 bg-red-500/90 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="text-sm font-medium">Not Available</span>
                </div>
              )}
            </div>

            {/* Car Specifications */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4">Specifications</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-gray-400">
                    <User size={16} />
                    <span className="text-sm">Seats</span>
                  </div>
                  <p className="font-semibold">{car.seats}</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Fuel size={16} />
                    <span className="text-sm">Fuel</span>
                  </div>
                  <p className="font-semibold capitalize">{car.fuelType}</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Clock size={16} />
                    <span className="text-sm">Year</span>
                  </div>
                  <p className="font-semibold">{car.year}</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-gray-400">
                    <MapPin size={16} />
                    <span className="text-sm">Location</span>
                  </div>
                  <p className="font-semibold">{car.location}</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-gray-400">
                    <CalendarIcon size={16} />
                    <span className="text-sm">Mileage</span>
                  </div>
                  <p className="font-semibold">{car.mileage} km/L</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-gray-400">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: car.color }}
                    />
                    <span className="text-sm">Color</span>
                  </div>
                  <p className="font-semibold capitalize">{car.color}</p>
                </div>
              </div>
            </div>

            {/* Features */}
            {car.features && car.features.length > 0 && (
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-4">Features</h3>
                <div className="flex flex-wrap gap-2">
                  {car.features.map((feature: string, index: number) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-700 rounded-full text-sm"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Car Details and Booking Form */}
          <div className="space-y-6">
            {/* Car Info */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold">{car.name}</h1>
                  <p className="text-gray-400 mt-1">
                    {car.brand} • {car.model}
                  </p>
                </div>
              </div>
              <p className="text-gray-300 mt-4">
                Experience luxury and performance with the {car.year}{" "}
                {car.brand} {car.model}. Perfect for both city drives and long
                journeys with premium comfort features.
              </p>
            </div>

            {/* Booking Form */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6">
              <h2 className="text-2xl font-bold mb-6">Book This Car</h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Date Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Start Date
                    </label>
                    <input
                      type="date"
                      {...register("startDate", {
                        required: "Start date is required",
                      })}
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
                    />
                    {errors.startDate && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.startDate.message as string}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      End Date
                    </label>
                    <input
                      type="date"
                      {...register("endDate", {
                        required: "End date is required",
                      })}
                      min={startDate || new Date().toISOString().split("T")[0]}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
                    />
                    {errors.endDate && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.endDate.message as string}
                      </p>
                    )}
                  </div>
                </div>

                {/* Price Calculation */}
                {startDate && endDate && days > 0 && (
                  <div className="bg-gray-700/50 rounded-xl p-4">
                    <h3 className="font-semibold mb-2">Selected Days</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Days</span>
                        <span>{days} days</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Booking Button */}
                <button
                  type="submit"
                  disabled={user?.role !== "user"}
                  className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                    !user
                      ? "bg-blue-600 hover:bg-blue-700"
                      : user.role === "user" && car.isAvailable
                      ? "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                      : "bg-gray-700 cursor-not-allowed"
                  }`}
                >
                  {bookingLoading ? (
                    <span className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Processing...
                    </span>
                  ) : !user ? (
                    "Login to Book"
                  ) : user.role !== "user" ? (
                    "Only Users Can Book"
                  ) : !car.isAvailable ? (
                    "Currently Unavailable"
                  ) : (
                    "Book Now"
                  )}
                </button>

                {user && user.role === "user" && !car.isAvailable && (
                  <p className="text-center text-gray-400 text-sm">
                    This car is currently unavailable for booking
                  </p>
                )}
              </form>

              {/* User Info */}
              {user && (
                <div className="mt-6 pt-6 border-t border-gray-700">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center">
                      <span className="text-xl font-bold">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold">{user.name}</h4>
                      <p className="text-sm text-gray-400">{user.email}</p>
                      <span className="inline-block mt-1 px-2 py-1 bg-gray-700 text-xs rounded">
                        {user.role.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Additional Info */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4">Important Information</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-green-400">✓</span>
                  <span>Free cancellation up to 24 hours before pickup</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">✓</span>
                  <span>Comprehensive insurance included</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">✓</span>
                  <span>Unlimited mileage for all rentals</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">✓</span>
                  <span>24/7 roadside assistance</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
