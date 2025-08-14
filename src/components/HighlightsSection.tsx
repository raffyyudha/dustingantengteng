import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import highlight1 from '@/assets/highlight-1.jpg';
import highlight2 from '@/assets/highlight-2.jpg';
import highlight3 from '@/assets/highlight-3.jpg';
import highlight4 from '@/assets/highlight-4.jpg';
import highlight5 from '@/assets/highlight-5.jpg';
import highlight6 from '@/assets/highlight-6.jpg';

const HighlightsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const highlights = [
    {
      image: highlight1,
      title: 'Tech Conference 2024',
      category: 'SPEAKING',
      description: 'Keynote presentation on the future of digital content creation'
    },
    {
      image: highlight2,
      title: 'Brand Partnership',
      category: 'COLLABORATION',
      description: 'Strategic collaboration with leading luxury brands'
    },
    {
      image: highlight3,
      title: 'Content Studio',
      category: 'PRODUCTION',
      description: 'Behind the scenes of award-winning content creation'
    },
    {
      image: highlight4,
      title: 'Industry Awards',
      category: 'RECOGNITION',
      description: 'Creator of the Year award for innovation in digital media'
    },
    {
      image: highlight5,
      title: 'Team Leadership',
      category: 'INNOVATION',
      description: 'Leading creative teams to breakthrough achievements'
    },
    {
      image: highlight6,
      title: 'Product Launch',
      category: 'ENTREPRENEURSHIP',
      description: 'Unveiling next-generation digital experiences'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll('.slide-in-bottom');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="highlights"
      ref={sectionRef}
      className="py-24 md:py-32 bg-background"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 slide-in-bottom">
          <h2 className="text-section-title text-foreground mb-6">
            CAREER
            <span className="block text-gold">HIGHLIGHTS</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Dustin Tiffani's highlights and achievements in digital content creation and entrepreneurship.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {highlights.map((highlight, index) => (
            <div 
              key={index}
              className="slide-in-bottom group hover-lift bg-card rounded-lg overflow-hidden"
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <div className="relative overflow-hidden aspect-[4/3]">
                <img
                  src={highlight.image}
                  alt={highlight.title}
                  className="w-full h-full object-cover image-zoom"
                />
                <div className="absolute inset-0 bg-hero-overlay opacity-0 group-hover:opacity-60 transition-opacity duration-500"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="text-hero-text font-semibold tracking-wide text-lg">
                    VIEW DETAILS
                  </span>
                </div>
                <div className="absolute top-4 left-4">
                  <span className="bg-gold text-gold-foreground px-3 py-1 text-xs font-bold tracking-wide rounded-full">
                    {highlight.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {highlight.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {highlight.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center slide-in-bottom">
          <Button 
            size="lg"
            className="bg-gold text-gold-foreground hover:bg-gold/90 font-semibold tracking-wide px-8 py-6 text-lg"
          >
            VIEW HIGHLIGHTS →
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HighlightsSection;