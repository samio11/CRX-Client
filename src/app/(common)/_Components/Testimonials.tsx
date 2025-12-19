import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Business Executive",
    image:
      "https://images.unsplash.com/photo-1753161023962-665967602405?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGN1c3RvbWVyJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzY2MDkyNDExfDA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 5,
    text: "Absolutely phenomenal service! The BMW I rented was in pristine condition and the booking process was seamless. Will definitely use DriveElite again for my next business trip.",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Travel Blogger",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    rating: 5,
    text: "The Tesla Model 3 exceeded all my expectations. Great customer support, transparent pricing, and the car was delivered right to my hotel. Premium service all the way!",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Wedding Planner",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    rating: 5,
    text: "Rented a luxury Mercedes for a wedding event. The car was spotless, and the team went above and beyond to accommodate our schedule. Highly recommended!",
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded mb-6">
            <Star className="size-4 fill-current" />
            <span className="text-xs tracking-widest uppercase">
              Testimonials
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl mb-4 tracking-tighter">
            CLIENT FEEDBACK
          </h2>
          <div className="w-24 h-px bg-black mx-auto mb-6" />
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            What our clients say about their experience with us
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="bg-white p-8 border-2 border-gray-200 hover:border-black transition-all duration-500 hover:-translate-y-2 group"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Quote Icon */}
              <div className="mb-8">
                <div className="bg-black w-14 h-14 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Quote className="size-7 text-white" />
                </div>
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="size-5 fill-black text-black" />
                ))}
              </div>

              {/* Text */}
              <p className="text-gray-700 mb-8 leading-relaxed">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 pt-6 border-t border-gray-200">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 object-cover border-2 border-black grayscale"
                />
                <div>
                  <div className="tracking-tight">{testimonial.name}</div>
                  <div className="text-sm text-gray-500 uppercase tracking-widest">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="p-8 bg-white border-2 border-gray-200">
            <div className="text-5xl mb-2 tracking-tighter">4.9</div>
            <div className="text-gray-600 uppercase tracking-widest text-xs">
              Average Rating
            </div>
          </div>
          <div className="p-8 bg-white border-2 border-gray-200">
            <div className="text-5xl mb-2 tracking-tighter">50K+</div>
            <div className="text-gray-600 uppercase tracking-widest text-xs">
              Clients
            </div>
          </div>
          <div className="p-8 bg-white border-2 border-gray-200">
            <div className="text-5xl mb-2 tracking-tighter">98%</div>
            <div className="text-gray-600 uppercase tracking-widest text-xs">
              Satisfaction
            </div>
          </div>
          <div className="p-8 bg-white border-2 border-gray-200">
            <div className="text-5xl mb-2 tracking-tighter">24/7</div>
            <div className="text-gray-600 uppercase tracking-widest text-xs">
              Support
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
