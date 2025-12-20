"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getBookingByAdmin } from "@/services/booking";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import { IBooking } from "./_types/booking";
import { statusColor } from "./_bookingUtils";

export default function ManageBooking() {
  const [bookings, setBookings] = useState<IBooking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await getBookingByAdmin();
        setBookings(res?.data?.data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Manage Bookings</h1>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Car</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Booked At</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking._id}>
                {/* User */}
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Image
                      src={booking.user.profileImage}
                      alt="user"
                      width={36}
                      height={36}
                      className="rounded-full object-cover"
                    />
                    <div className="text-sm">
                      <p className="font-medium">{booking.user.name}</p>
                      <p className="text-muted-foreground">
                        {booking.user.email}
                      </p>
                    </div>
                  </div>
                </TableCell>

                {/* Car */}
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Image
                      src={booking.car.image}
                      alt="car"
                      width={60}
                      height={40}
                      className="rounded-md object-cover"
                    />
                    <div className="text-sm">
                      <p className="font-medium">
                        {booking.car.brand} {booking.car.name}
                      </p>
                      <p className="text-muted-foreground">
                        {booking.car.model}
                      </p>
                    </div>
                  </div>
                </TableCell>

                {/* Duration */}
                <TableCell className="text-sm">
                  <p>{new Date(booking.startDate).toLocaleDateString()}</p>
                  <p className="text-muted-foreground">
                    → {new Date(booking.endDate).toLocaleDateString()}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {booking.totalDays} days
                  </p>
                </TableCell>

                {/* Price */}
                <TableCell className="font-semibold text-green-600">
                  ৳ {booking.totalPrice}
                </TableCell>

                {/* Status */}
                <TableCell>
                  <Badge
                    className={`${statusColor(booking.status)} capitalize`}
                  >
                    {booking.status}
                  </Badge>
                </TableCell>

                {/* Booked At */}
                <TableCell className="text-sm text-muted-foreground">
                  {new Date(booking.createdAt).toDateString()}
                </TableCell>
              </TableRow>
            ))}

            {bookings.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center text-muted-foreground py-10"
                >
                  No bookings found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
