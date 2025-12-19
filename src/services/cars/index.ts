"use server";

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
