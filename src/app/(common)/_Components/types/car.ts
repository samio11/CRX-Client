export interface Car {
  _id: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  color: string;
  category: "sports" | "luxury" | "suv" | "sedan" | "electric";
  fuelType: "electric" | "petrol" | "diesel" | "hybrid";
  seats: number;
  features: string[];
  image: string;
  mileage: number;
  isAvailable: boolean;
  location: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CarsResponse {
  success: boolean;
  message: string;
  data: {
    result: Car[];
    meta: {
      totalData: number;
      page: number;
      limit: number;
      totalPage: number;
    };
  };
}
