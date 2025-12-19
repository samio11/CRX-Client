"use client";

import { useState } from "react";
import { Car, Menu, X } from "lucide-react";
import Link from "next/link";
import { useUser } from "@/context/UserContext";
import { logoutUser } from "@/services/user";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, refetchUser } = useUser();

  const handleLogout = async () => {
    const toastId = toast.loading("Logging out...");
    try {
      await logoutUser();
      await refetchUser();
      toast.success("Logged out successfully", { id: toastId });
    } catch {
      toast.error("Logout failed", { id: toastId });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-black/95 backdrop-blur border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4">
        {/* Top Bar */}
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="bg-white p-2 rounded-md">
              <Car className="h-5 w-5 text-black" />
            </div>
            <div>
              <p className="text-lg font-semibold text-white">CARX</p>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest">
                Premium Rentals
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {["Home"].map((item) => (
              <Link
                key={item}
                href="/"
                className="text-sm uppercase tracking-wide text-gray-300 hover:text-white transition"
              >
                {item}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <>
                {/* User Card */}
                <div className="flex items-center gap-3 bg-white/90 px-4 py-2 rounded-lg">
                  <div className="h-9 w-9 rounded-full bg-emerald-600 flex items-center justify-center text-white font-semibold">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <div className="text-sm">
                    <p className="text-gray-900 font-medium leading-tight">
                      {user.name}
                    </p>
                    <span className="text-xs text-emerald-700 font-semibold">
                      {user.role.toUpperCase()}
                    </span>
                  </div>
                </div>

                <Link
                  href={
                    user.role === "admin"
                      ? "/admin/dashboard"
                      : "/user/dashboard"
                  }
                  className="px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition"
                >
                  Dashboard
                </Link>

                <Button variant="outline" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <Link
                href="/login"
                className="px-5 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden text-white"
            onClick={() => setIsMenuOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-100 bg-black/95 backdrop-blur-lg lg:hidden">
          <div className="flex items-center justify-between px-4 h-16 border-b border-white/10">
            <span className="text-white font-semibold">Menu</span>
            <button onClick={() => setIsMenuOpen(false)}>
              <X className="h-6 w-6 text-white" />
            </button>
          </div>

          <div className="px-4 py-6 space-y-6">
            {/* User Info (Mobile) */}
            {user && (
              <div className="flex items-center gap-3 bg-white/10 p-4 rounded-lg">
                <div className="h-10 w-10 rounded-full bg-emerald-600 flex items-center justify-center text-white font-semibold">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-white font-medium">{user.name}</p>
                  <p className="text-xs text-emerald-400">
                    {user.role.toUpperCase()}
                  </p>
                </div>
              </div>
            )}

            {/* Mobile Links */}
            <nav className="flex flex-col gap-3">
              {["Home"].map((item) => (
                <Link
                  key={item}
                  href="/"
                  onClick={() => setIsMenuOpen(false)}
                  className="px-4 py-3 rounded-lg bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white transition uppercase text-sm"
                >
                  {item}
                </Link>
              ))}
            </nav>

            {/* Mobile Actions */}
            <div className="pt-4 border-t border-white/10 space-y-3">
              {user ? (
                <>
                  <Link
                    href={
                      user.role === "admin"
                        ? "/admin/dashboard"
                        : "/user/dashboard"
                    }
                    className="block text-center py-3 rounded-lg bg-emerald-600 text-white"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full py-3 rounded-lg bg-white text-gray-900"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="block text-center py-3 rounded-lg bg-emerald-600 text-white"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
