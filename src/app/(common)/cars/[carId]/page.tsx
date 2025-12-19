import { getACar } from "@/services/cars";
import React from "react";

export default async function CarDetails({
  params,
}: {
  params: Promise<{ carId: string }>;
}) {
  const { carId } = await params;
  const { data } = await getACar(carId);
  console.log(data);
  return <div>CarDetails:- {carId}</div>;
}
