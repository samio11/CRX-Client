"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const createBooking = async (payload: FieldValues) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/booking`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: (await cookies()).get("accessToken")!.value,
      },
      body: JSON.stringify(payload),
    });
    revalidateTag("booking", "max");
    const result = await res.json();
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
export const getBookingByUser = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/booking/user`, {
      method: "GET",
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
      },
      next: {
        tags: ["booking"],
      },
    });

    const result = await res.json();
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
export const completeBooking = async (bookingId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/booking/complete/${bookingId}`,
      {
        method: "POST",
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
        },
      }
    );
    revalidateTag("booking", "max");
    const result = await res.json();
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
export const cancelBooking = async (bookingId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/booking/${bookingId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
        },
      }
    );
    revalidateTag("booking", "max");
    const result = await res.json();
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
