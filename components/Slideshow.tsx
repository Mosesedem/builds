import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Users, Briefcase, Sparkles } from 'lucide-react'

const images = [
  "https://skydd.ng/assets/Onboarding/1.svg",
  "https://skydd.ng/assets/Onboarding/2.svg",
  "https://skydd.ng/assets/Onboarding/3.svg",
  "https://skydd.ng/assets/Onboarding/5.svg",
  "https://skydd.ng/assets/Onboarding/4.svg"
]

export function Slideshow() {
  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % images.length)
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + images.length) % images.length)

  return (
    <div className="relative h-full w-full">
      <Image
        src={images[currentImage] || "../assets/family.png"}
        alt="Slideshow"
        layout="fill"
        objectFit="cover"
        className="transition-opacity duration-500"
        priority={false} 
      />
      <div className="absolute inset-0 bg-black bg-opacity-30" />
      <button onClick={prevImage} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white">
        <ChevronLeft size={40} />
      </button>
      <button onClick={nextImage} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white">
        <ChevronRight size={40} />
      </button>

    </div>
  )
}
