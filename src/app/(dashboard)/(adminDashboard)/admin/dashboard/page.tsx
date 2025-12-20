"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Users,
  Car,
  Calendar,
  DollarSign,
  TrendingUp,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";
import { AdminAnalysis } from "@/services/analysis";
import { getUserByToken } from "@/services/user";
import Loading from "@/app/loading";

interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  role: string;
  isVerified: boolean;
  profileImage: string;
  createdAt: string;
}

interface Car {
  _id: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  color: string;
  category: string;
  image: string;
  location: string;
}

interface BookingStatus {
  _id: string;
  count: number;
}

interface MostRentedCar {
  _id: string;
  totalBookings: number;
  car: Car;
}

interface MonthlyRevenue {
  _id: {
    year: number;
    month: number;
  };
  revenue: number;
}

interface CarAvailability {
  _id: boolean;
  count: number;
}

interface AnalysisData {
  totalUsers: number;
  totalCars: number;
  totalBookings: number;
  bookingStatus: BookingStatus[];
  mostRentedCar: MostRentedCar;
  monthlyRevenue: MonthlyRevenue[];
  carAvailability: CarAvailability[];
}

export default function AdminDashboard() {
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: adminData } = await AdminAnalysis();
        const mockAnalysis: AnalysisData = adminData;

        const { data: userData } = await getUserByToken();

        const mockUser: User = userData;

        setAnalysisData(mockAnalysis);
        setUserData(mockUser);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Loading></Loading>;
  }

  if (!analysisData || !userData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">Failed to load dashboard data</p>
      </div>
    );
  }

  const getBookingStatusCount = (status: string) => {
    return analysisData.bookingStatus.find((s) => s._id === status)?.count || 0;
  };

  const availableCars =
    analysisData.carAvailability.find((a) => a._id === true)?.count || 0;
  const unavailableCars =
    analysisData.carAvailability.find((a) => a._id === false)?.count || 0;
  const currentRevenue = analysisData.monthlyRevenue[0]?.revenue || 0;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Admin Dashboard
            </h1>
            <p className="text-gray-500 mt-1">Welcome back, {userData.name}</p>
          </div>
          <Avatar className="h-12 w-12">
            <AvatarImage src={userData.profileImage} alt={userData.name} />
            <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Users
              </CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {analysisData.totalUsers}
              </div>
              <p className="text-xs text-gray-500 mt-1">Registered users</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Cars
              </CardTitle>
              <Car className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analysisData.totalCars}</div>
              <p className="text-xs text-gray-500 mt-1">
                {availableCars} available
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Bookings
              </CardTitle>
              <Calendar className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {analysisData.totalBookings}
              </div>
              <p className="text-xs text-gray-500 mt-1">All time bookings</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Monthly Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ৳{currentRevenue.toLocaleString()}
              </div>
              <p className="text-xs text-gray-500 mt-1">December 2025</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Booking Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-sm font-medium">Completed</span>
                </div>
                <span className="text-xl font-bold">
                  {getBookingStatusCount("completed")}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <span className="text-sm font-medium">Active</span>
                </div>
                <span className="text-xl font-bold">
                  {getBookingStatusCount("active")}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <XCircle className="h-5 w-5 text-red-600" />
                  <span className="text-sm font-medium">Cancelled</span>
                </div>
                <span className="text-xl font-bold">
                  {getBookingStatusCount("cancelled")}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Car Availability</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Available</span>
                  <span className="font-semibold">
                    {availableCars}/{analysisData.totalCars}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full transition-all"
                    style={{
                      width: `${
                        (availableCars / analysisData.totalCars) * 100
                      }%`,
                    }}
                  ></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Unavailable</span>
                  <span className="font-semibold">
                    {unavailableCars}/{analysisData.totalCars}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-red-600 h-2 rounded-full transition-all"
                    style={{
                      width: `${
                        (unavailableCars / analysisData.totalCars) * 100
                      }%`,
                    }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                Most Rented Car
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <img
                  src={analysisData.mostRentedCar.car.image}
                  alt={analysisData.mostRentedCar.car.name}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <div>
                  <h3 className="font-semibold text-lg">
                    {analysisData.mostRentedCar.car.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {analysisData.mostRentedCar.car.brand} •{" "}
                    {analysisData.mostRentedCar.car.year}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {analysisData.mostRentedCar.totalBookings} bookings
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Admin Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-6">
              <Avatar className="h-20 w-20">
                <AvatarImage src={userData.profileImage} alt={userData.name} />
                <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Name</p>
                  <p className="font-semibold">{userData.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-semibold">{userData.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="font-semibold">{userData.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Address</p>
                  <p className="font-semibold">{userData.address}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Role</p>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {userData.role}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      userData.isVerified
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {userData.isVerified ? "Verified" : "Not Verified"}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
