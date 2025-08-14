import { useEffect, useRef } from 'react';
import aboutImage from '@/assets/dustin-about.jpg';
import { Button } from '@/components/ui/button';

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      },
      { threshold: 0.2 }
    );

    const elements = sectionRef.current?.querySelectorAll('.slide-in-bottom, .fade-in-stagger');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-24 md:py-32 bg-background relative overflow-hidden"
    >
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <div className="slide-in-bottom">
            <div className="relative group">
              <img
                src={aboutImage}
                alt="Dustin Tiffani Portrait"
                className="w-full aspect-[4/5] object-cover rounded-lg image-zoom"
              />
              <div className="absolute inset-0 bg-hero-overlay opacity-0 group-hover:opacity-30 transition-opacity duration-500 rounded-lg"></div>
            </div>
          </div>

          {/* Content Side */}
          <div className="space-y-8">
            <div className="fade-in-stagger" style={{ transitionDelay: '0.2s' }}>
              <h2 className="text-section-title text-foreground mb-6">
                ABOUT
                <span className="block text-gold">DUSTIN TIFFANI</span>
              </h2>
            </div>

            <div className="space-y-6 fade-in-stagger" style={{ transitionDelay: '0.4s' }}>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Dustin Tiffani is a multifaceted digital creator, entrepreneur, and public figure 
                recognized for his bold creative vision and innovative approach to content. Over 
                the years, Dustin has built a loyal audience by merging storytelling, technology, 
                and cultural insight into engaging, high-quality productions.
              </p>

              <p className="text-lg text-muted-foreground leading-relaxed">
                His journey spans collaborations with major brands, speaking engagements, and an 
                ever-growing digital presence. With a passion for pushing boundaries and inspiring 
                others, Dustin continues to shape the future of digital content creation.
              </p>

              <p className="text-lg text-muted-foreground leading-relaxed">
                From innovative campaigns to thought leadership, Dustin's work reflects a commitment 
                to excellence and a vision for what's possible when creativity meets technology.
              </p>
            </div>

            <div className="fade-in-stagger" style={{ transitionDelay: '0.6s' }}>
              <Button 
                size="lg" 
                className="bg-gold text-gold-foreground hover:bg-gold/90 font-semibold tracking-wide px-8 py-6 text-lg"
              >
                READ MORE
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;