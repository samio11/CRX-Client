import {
  Car,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export function Footer() {
  return (
    <footer
      id="contact"
      className="bg-black text-gray-400 border-t border-white/10"
    >
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="bg-white p-2.5 rounded">
                <Car className="size-6 text-black" />
              </div>
              <div>
                <span className="text-2xl text-white tracking-tight">CARX</span>
                <div className="text-xs tracking-widest uppercase">
                  Premium Rentals
                </div>
              </div>
            </div>
            <p className="text-gray-500 leading-relaxed">
              Premium car rental service offering the finest selection of luxury
              and sports vehicles for your journey.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="bg-white/5 border border-white/10 p-3 hover:bg-white hover:text-black transition-all duration-300"
              >
                <Facebook className="size-5" />
              </a>
              <a
                href="#"
                className="bg-white/5 border border-white/10 p-3 hover:bg-white hover:text-black transition-all duration-300"
              >
                <Twitter className="size-5" />
              </a>
              <a
                href="#"
                className="bg-white/5 border border-white/10 p-3 hover:bg-white hover:text-black transition-all duration-300"
              >
                <Instagram className="size-5" />
              </a>
              <a
                href="#"
                className="bg-white/5 border border-white/10 p-3 hover:bg-white hover:text-black transition-all duration-300"
              >
                <Linkedin className="size-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white mb-6 uppercase tracking-widest text-sm">
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors text-sm uppercase tracking-wider"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors text-sm uppercase tracking-wider"
                >
                  Browse Cars
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors text-sm uppercase tracking-wider"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors text-sm uppercase tracking-wider"
                >
                  Special Offers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors text-sm uppercase tracking-wider"
                >
                  Testimonials
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white mb-6 uppercase tracking-widest text-sm">
              Support
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors text-sm uppercase tracking-wider"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors text-sm uppercase tracking-wider"
                >
                  FAQs
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors text-sm uppercase tracking-wider"
                >
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors text-sm uppercase tracking-wider"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors text-sm uppercase tracking-wider"
                >
                  Booking Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white mb-6 uppercase tracking-widest text-sm">
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="size-5 mt-0.5 flex-shrink-0" />
                <span className="text-sm">
                  Nikunja-02, Dhaka 1212, Bangladesh
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="size-5 flex-shrink-0" />
                <span className="text-sm">+880 1709801305</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="size-5 flex-shrink-0" />
                <span className="text-sm">info@carx.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm uppercase tracking-widest">
            &copy; 2025 DriveElite. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm uppercase tracking-widest">
            <a href="#" className="hover:text-white transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
