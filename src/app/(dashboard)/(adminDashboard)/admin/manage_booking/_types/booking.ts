export type BookingStatus = "active" | "completed" | "cancelled";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
  profileImage: string;
}

export interface ICar {
  _id: string;
  name: string;
  brand: string;
  model: string;
  image: string;
  location: string;
}

export interface IBooking {
  _id: string;
  user: IUser;
  car: ICar;
  startDate: string;
  endDate: string;
  totalDays: number;
  totalPrice: number;
  status: BookingStatus;
  createdAt: string;
}
