import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';

const slides = [
  {
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8",
    title: "Shop Local, Shop Smart",
    description: "Discover amazing deals in your neighborhood"
  },
  {
    image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc",
    title: "Sell Your Items",
    description: "Turn your unused items into cash"
  },
  {
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85",
    title: "Safe & Secure",
    description: "Trade with confidence in your community"
  }
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[400px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === current ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent">
            <div className="max-w-7xl mx-auto px-4 h-full flex items-center">
              <div className="text-white max-w-xl">
                <h2 className="text-4xl font-bold mb-4">{slide.title}</h2>
                <p className="text-xl">{slide.description}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      <button 
        onClick={() => setCurrent((prev) => (prev - 1 + slides.length) % slides.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      
      <button 
        onClick={() => setCurrent((prev) => (prev + 1) % slides.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </div>
  );
}

