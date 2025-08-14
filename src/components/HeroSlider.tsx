import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import heroImage1 from '@/assets/dustin-hero-1.jpg';
import heroImage2 from '@/assets/dustin-hero-2.jpg';
import heroImage3 from '@/assets/dustin-hero-3.jpg';

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: heroImage1,
      title: "DIGITAL",
      subtitle: "CREATOR",
      description: "Crafting the future of content"
    },
    {
      image: heroImage2,
      title: "INNOVATIVE",
      subtitle: "ENTREPRENEUR",
      description: "Building tomorrow's experiences today"
    },
    {
      image: heroImage3,
      title: "VISIONARY",
      subtitle: "LEADER",
      description: "Inspiring global audiences"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section id="home" className="relative h-screen overflow-hidden">
      {/* Background Images */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={slide.image}
            alt={`${slide.title} ${slide.subtitle}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-hero-overlay" />
        </div>
      ))}

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-hero-text px-6">
          <div className="animate-hero-text">
            <h1 className="text-hero mb-4">
              {slides[currentSlide].title}
              <br />
              <span className="text-gold">{slides[currentSlide].subtitle}</span>
            </h1>
            <p className="text-xl md:text-2xl font-light tracking-wide opacity-90 max-w-2xl mx-auto">
              {slides[currentSlide].description}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 text-hero-text hover:text-gold transition-colors duration-300 group"
        aria-label="Previous slide"
      >
        <ChevronLeft size={48} className="group-hover:scale-110 transition-transform duration-300" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 text-hero-text hover:text-gold transition-colors duration-300 group"
        aria-label="Next slide"
      >
        <ChevronRight size={48} className="group-hover:scale-110 transition-transform duration-300" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-gold scale-125' 
                : 'bg-hero-text/50 hover:bg-hero-text/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 text-hero-text/70">
        <div className="flex flex-col items-center space-y-2">
          <span className="text-sm tracking-wider">SCROLL</span>
          <div className="w-px h-12 bg-hero-text/30"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;