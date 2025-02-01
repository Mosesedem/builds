"use client"
import { PlanCard } from "@/components/PlanCard"
import { useRef, useState, useEffect } from "react"
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid"
import { plans } from '@/lib/constants'

function HorizontalScrollSection({
  title,
  planType,
}: {
  title: string;
  planType: string;
}) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);

  // Filter plans by type
  const filteredPlans = plans.filter(plan => plan.type === planType);

  const updateScrollButtonsVisibility = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftButton(scrollLeft > 0);
      setShowRightButton(scrollLeft + clientWidth < scrollWidth);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth;
      scrollContainerRef.current.scrollBy({
        left: direction === "right" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Update visibility on scroll
  useEffect(() => {
    const container = scrollContainerRef.current;
    container?.addEventListener("scroll", updateScrollButtonsVisibility);
    updateScrollButtonsVisibility(); // Initial check
    return () => container?.removeEventListener("scroll", updateScrollButtonsVisibility);
  }, []);

  return (
    <section className="relative">
      <h2 className="text-3xl font-bold mb-6">{title}</h2>

      {/* Left Scroll Button */}
      {showLeftButton && (
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-gray-100 rounded-full p-2 shadow-lg transition"
        >
          <ChevronLeftIcon className="h-8 w-8 text-gray-600" />
        </button>
      )}

      {/* Right Scroll Button */}
      {showRightButton && (
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-gray-100 rounded-full p-2 shadow-lg transition"
        >
          <ChevronRightIcon className="h-8 w-8 text-gray-600" />
        </button>
      )}

      <div className="relative overflow-hidden">
        <div
          ref={scrollContainerRef}
          className="py-4 flex space-x-4 overflow-x-scroll scrollbar-hide scroll-smooth"
        >
          {filteredPlans.map((plan) => (
            <div key={plan.id} className="flex-shrink-0">
              <PlanCard 
                name={plan.name}
                description={plan.description}
                price={`$${plan.basePrice}`}
                features={plan.features}
                additionalBenefits={plan.additionalBenefits}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function PlansPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-teal-700 to-teal-200">
      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold text-white">
              Find care providers by plan
            </h1>
            <p className="text-xl text-blue-100">
              Select your Proton Medicare plan to view available healthcare providers in your network.
            </p>
          </div>
          <div className="hidden lg:block">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500/20 rounded-xl blur-2xl" />
              <img
                src="https://v2.protonmedicare.com/api/html/rrrrr.png"
                alt="Medical facility illustration"
                className="relative rounded-xl h-300 w-500"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container bg-background mx-auto px-4 py-8 space-y-12">
        <HorizontalScrollSection title="Medicare Plans" planType="medicarePlans" />
        <HorizontalScrollSection title="Maternity Plans" planType="maternityPlans" />
        <HorizontalScrollSection title="Standard Health Plans" planType="standardPlans" />
      </div>
    </main>
  );
}