"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const createCar = async (payload: FormData) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/car`, {
      method: "POST",
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
      },
      body: payload,
    });
    revalidateTag("cars", "max");
    const result = await res.json();
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getAllCar = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/car`, {
      method: "GET",
      next: {
        tags: ["cars"],
      },
    }).then((x) => x.json());
    return res;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
export const getACar = async (carId: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/car/${carId}`, {
      method: "GET",
    }).then((x) => x.json());
    return res;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const updateCarStatus = async (carId: string, isAvailable: boolean) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/car/update-available/${carId}`,
      {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          Authorization: (await cookies()).get("accessToken")!.value,
        },
        body: JSON.stringify(isAvailable),
      }
    ).then((x) => x.json());
    revalidateTag("cars", "max");
    return res;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
export const deleteCar = async (carId: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/car/${carId}`, {
      method: "DELETE",
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
      },
    }).then((x) => x.json());
    revalidateTag("cars", "max");
    return res;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
