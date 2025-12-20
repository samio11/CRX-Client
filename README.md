# 🚗 CRX Client - Car Rental Management System

<div align="center">

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen?style=for-the-badge)](https://crx-client.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)](LICENSE)

**A modern, full-featured car rental management platform built with Next.js 15**

[Features](#-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [API Reference](#-api-reference) • [Contributing](#-contributing)

</div>

---

## 📖 Overview

CRX Client is a comprehensive car rental management system that provides a seamless experience for both customers and administrators. Built with Next.js 15 and TypeScript, it offers robust features for booking management, fleet administration, and user management with role-based access control.

### 🎯 Key Highlights

- **🔐 Secure Authentication** - JWT-based authentication with role-based access control
- **📊 Admin Dashboard** - Comprehensive analytics and management tools
- **🚙 Fleet Management** - Complete CRUD operations for vehicle inventory
- **📅 Booking System** - Intuitive booking creation and management
- **👥 User Management** - User profiles, blocking/unblocking capabilities
- **📱 Responsive Design** - Modern UI optimized for all devices
- **⚡ Server Actions** - Leveraging Next.js 15 server-side capabilities

---

## ✨ Features

### For Users
- 🔑 **User Registration & Login** - Secure account creation with profile image upload
- 🚗 **Browse Cars** - View available vehicles with detailed information
- 📅 **Make Bookings** - Easy booking process with real-time availability
- 📜 **Booking History** - Track current and past bookings
- ❌ **Cancel Bookings** - Flexible cancellation system
- 👤 **Profile Management** - Update personal information and preferences

### For Administrators
- 📊 **Analytics Dashboard** - Overview of bookings, revenue, and fleet status
- 🚙 **Vehicle Management** - Add, update, delete, and manage car availability
- 📋 **Booking Oversight** - View all bookings and mark them as complete
- 👥 **User Administration** - Manage users, block/unblock accounts
- 🔄 **Real-time Updates** - Automatic cache revalidation for instant updates

---

## 🛠 Tech Stack

### Frontend
- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe development
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first styling
- **[React Hook Form](https://react-hook-form.com/)** - Efficient form handling

### Backend Integration
- **Server Actions** - Next.js server-side functions
- **RESTful API** - Communication with backend services
- **JWT Authentication** - Secure token-based auth
- **Cookie Management** - Secure session handling

### State & Data Management
- **Next.js Cache** - Built-in caching with revalidation tags
- **Server Components** - Optimized data fetching
- **Form Data Handling** - Support for file uploads

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm/bun
- Backend API running (configure endpoint)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/samio11/CRX-Client.git
   cd CRX-Client
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Configure environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_BACKEND=your_backend_api_url
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📚 API Reference

### Authentication Service

#### `userLogin(payload)`
Authenticates user and stores JWT tokens in cookies.
```typescript
const result = await userLogin({ email, password });
```

#### `userRegister(formData)`
Registers new user with profile image upload support.
```typescript
const result = await userRegister(formData);
```

#### `logoutUser()`
Clears authentication tokens.
```typescript
await logoutUser();
```

#### `getCurrentUser()`
Decodes JWT token to get current user information.
```typescript
const user: IUser | null = await getCurrentUser();
```

#### `getAllUserAdmin()`
Fetches all users (admin only).
```typescript
const users = await getAllUserAdmin();
```

#### `getUserByToken()`
Gets current user's full profile.
```typescript
const profile = await getUserByToken();
```

#### `updateUserByToken(payload)`
Updates current user's profile.
```typescript
await updateUserByToken({ name, email, ... });
```

#### `blockUser(userId)` / `unBlockUser(userId)`
Admin functions to block/unblock users.
```typescript
await blockUser('user_id');
await unBlockUser('user_id');
```

---

### Car Service

#### `createCar(formData)`
Creates a new car listing (admin only).
```typescript
const result = await createCar(formData);
```

#### `getAllCar()`
Fetches all available cars.
```typescript
const cars = await getAllCar();
```

#### `getACar(carId)`
Retrieves details of a specific car.
```typescript
const car = await getACar('car_id');
```

#### `updateCarStatus(carId, isAvailable)`
Updates car availability status.
```typescript
await updateCarStatus('car_id', true);
```

#### `deleteCar(carId)`
Removes a car from the fleet (admin only).
```typescript
await deleteCar('car_id');
```

---

### Booking Service

#### `createBooking(payload)`
Creates a new booking.
```typescript
const result = await createBooking({
  carId: 'car_id',
  startDate: '2025-01-01',
  endDate: '2025-01-07',
  ...
});
```

#### `getBookingByUser()`
Retrieves current user's bookings.
```typescript
const bookings = await getBookingByUser();
```

#### `getBookingByAdmin()`
Fetches all bookings (admin only).
```typescript
const allBookings = await getBookingByAdmin();
```

#### `completeBooking(bookingId)`
Marks a booking as complete (admin only).
```typescript
await completeBooking('booking_id');
```

#### `cancelBooking(bookingId)`
Cancels a booking.
```typescript
await cancelBooking('booking_id');
```

---

### Analytics Service

#### `AdminAnalysis()`
Retrieves admin dashboard analytics.
```typescript
const analytics = await AdminAnalysis();
```

---

## 🏗 Project Structure

```
CRX-Client/
├── src/
│   ├── app/              # Next.js App Router pages
│   ├── components/       # React components
│   ├── services/         # API service functions
│   │   ├── Admin/        # Admin-specific services
│   │   ├── Booking/      # Booking management
│   │   ├── Car/          # Car management
│   │   └── User/         # User authentication & management
│   ├── lib/              # Utility functions
│   └── types/            # TypeScript type definitions
├── public/               # Static assets
└── ...config files
```

---

## 🔒 Security Features

- **JWT Authentication** - Secure token-based authentication
- **HTTP-only Cookies** - Protection against XSS attacks
- **Role-based Access** - Admin and user role separation
- **Server-side Validation** - All actions validated on server
- **Secure Headers** - Next.js security best practices

---

## 🚀 Deployment

### Deploy on Vercel

The easiest way to deploy your Next.js app:

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com/new)
3. Configure environment variables
4. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/samio11/CRX-Client)

### Environment Variables

Remember to set up these environment variables in your deployment:

```env
NEXT_PUBLIC_BACKEND=your_production_backend_url
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Samio**
- GitHub: [@samio11](https://github.com/samio11)
- Live Demo: [crx-client.vercel.app](https://crx-client.vercel.app)

---

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Vercel for hosting platform
- Open source community

---

<div align="center">

**⭐ Star this repo if you find it helpful!**

Made with ❤️ by [Samio](https://github.com/samio11)

</div>
