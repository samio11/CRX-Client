"use client";
import { useState } from "react";
import { Car, Menu, User, Heart, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-black/95 backdrop-blur-lg border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="bg-white p-2.5 rounded-sm group-hover:bg-gray-200 transition-all duration-300">
              <Car className="size-6 text-black" />
            </div>
            <div>
              <span className="text-2xl text-white tracking-tight">CARX</span>
              <div className="text-xs text-gray-400 tracking-widest uppercase">
                Premium Rentals
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <a
              href="#"
              className="relative text-gray-300 hover:text-white transition-colors group"
            >
              <span className="text-sm tracking-wide uppercase">Home</span>
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-300" />
            </a>
            <a
              href="#cars"
              className="relative text-gray-300 hover:text-white transition-colors group"
            >
              <span className="text-sm tracking-wide uppercase">Fleet</span>
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-300" />
            </a>
            <a
              href="#how-it-works"
              className="relative text-gray-300 hover:text-white transition-colors group"
            >
              <span className="text-sm tracking-wide uppercase">Services</span>
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-300" />
            </a>
            <a
              href="#testimonials"
              className="relative text-gray-300 hover:text-white transition-colors group"
            >
              <span className="text-sm tracking-wide uppercase">
                Testimonials
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-300" />
            </a>
            <a
              href="#contact"
              className="relative text-gray-300 hover:text-white transition-colors group"
            >
              <span className="text-sm tracking-wide uppercase">Contact</span>
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-300" />
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="hidden sm:flex relative text-white hover:bg-white/10 transition-colors"
            >
              <Heart className="size-5" />
              <span className="absolute -top-1 -right-1 bg-white text-black text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="hidden sm:flex text-white hover:bg-white/10 transition-colors"
            >
              <Phone className="size-5" />
            </Button>

            <Button
              variant="outline"
              className="hidden md:flex border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300"
            >
              <User className="size-4 mr-2" />
              <span className="text-sm tracking-wide uppercase">Sign In</span>
            </Button>

            <Button className="bg-white text-black hover:bg-gray-200 transition-all duration-300">
              <span className="text-sm tracking-wide uppercase">
                Get Started
              </span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="size-6" />
              ) : (
                <Menu className="size-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 animate-slide-down border-t border-white/10">
            <nav className="flex flex-col gap-4">
              <a
                href="#"
                className="px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded transition-colors uppercase text-sm tracking-wide"
              >
                Home
              </a>
              <a
                href="#cars"
                className="px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded transition-colors uppercase text-sm tracking-wide"
              >
                Fleet
              </a>
              <a
                href="#how-it-works"
                className="px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded transition-colors uppercase text-sm tracking-wide"
              >
                Services
              </a>
              <a
                href="#testimonials"
                className="px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded transition-colors uppercase text-sm tracking-wide"
              >
                Testimonials
              </a>
              <a
                href="#contact"
                className="px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded transition-colors uppercase text-sm tracking-wide"
              >
                Contact
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
