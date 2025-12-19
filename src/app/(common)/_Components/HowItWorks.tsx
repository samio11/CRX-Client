import { Search, Calendar, Car, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "SELECT",
    description:
      "Browse our premium collection and choose your perfect vehicle from hundreds of options",
    number: "01",
  },
  {
    icon: Calendar,
    title: "SCHEDULE",
    description:
      "Pick your rental period and pickup location that works best for you",
    number: "02",
  },
  {
    icon: CheckCircle,
    title: "CONFIRM",
    description:
      "Complete your reservation with our secure payment system in just a few clicks",
    number: "03",
  },
  {
    icon: Car,
    title: "DRIVE",
    description:
      "Pick up your car and enjoy a premium driving experience with 24/7 support",
    number: "04",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white px-6 py-3 rounded mb-6">
            <CheckCircle className="size-4" />
            <span className="text-xs tracking-widest uppercase">
              Simple Process
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl mb-4 tracking-tighter">
            HOW IT WORKS
          </h2>
          <div className="w-24 h-px bg-white mx-auto mb-6" />
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Get on the road in four straightforward steps
          </p>
        </div>

        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-px bg-white/10 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={index}
                  className="group relative"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="bg-white text-black p-8 transition-all duration-500 border-2 border-white hover:bg-black hover:text-white hover:-translate-y-2">
                    {/* Step Number */}
                    <div className="text-8xl tracking-tighter opacity-10 absolute top-4 right-4 group-hover:opacity-20 transition-opacity">
                      {step.number}
                    </div>

                    {/* Icon */}
                    <div className="w-16 h-16 bg-black text-white group-hover:bg-white group-hover:text-black flex items-center justify-center mb-6 transition-all duration-300 relative z-10">
                      <Icon className="size-8" />
                    </div>

                    {/* Content */}
                    <h3 className="text-2xl mb-4 tracking-tight">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 group-hover:text-gray-300 leading-relaxed transition-colors">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
