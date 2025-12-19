export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  profileImage: string;
}

export interface Car {
  _id: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  color: string;
  image: string;
  location: string;
}

export interface Booking {
  _id: string;
  user: User;
  car: Car;
  startDate: string;
  endDate: string;
  totalDays: number;
  totalPrice: number;
  status: "active" | "cancelled" | "completed";
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  data: Booking[];
}
