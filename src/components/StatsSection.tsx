import { useEffect, useRef, useState } from 'react';

const StatsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const stats = [
    {
      number: 2.5,
      suffix: 'M+',
      label: 'FOLLOWERS',
      description: 'Across all platforms'
    },
    {
      number: 150,
      suffix: '+',
      label: 'PROJECTS',
      description: 'Successfully completed'
    },
    {
      number: 8,
      suffix: '+',
      label: 'YEARS',
      description: 'Industry experience'
    },
    {
      number: 50,
      suffix: '+',
      label: 'AWARDS',
      description: 'Recognition received'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  const AnimatedNumber = ({ target, suffix }: { target: number; suffix: string }) => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
      if (!isVisible) return;

      const increment = target / 50;
      const timer = setInterval(() => {
        setCurrent((prev) => {
          if (prev < target) {
            return Math.min(prev + increment, target);
          }
          clearInterval(timer);
          return target;
        });
      }, 40);

      return () => clearInterval(timer);
    }, [isVisible, target]);

    return (
      <span className="text-stats text-gold font-black">
        {current < 1 ? current.toFixed(1) : Math.floor(current)}
        {suffix}
      </span>
    );
  };

  return (
    <section 
      ref={sectionRef}
      className="py-24 bg-card relative overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-r from-gold/20 to-transparent"></div>
      </div>

      <div className="container mx-auto px-6 relative">
        <div className="text-center mb-16">
          <h2 className="text-section-title text-foreground">
            CAREER
            <span className="block text-gold">ACHIEVEMENTS</span>
          </h2>
          <p className="text-xl text-muted-foreground mt-6 max-w-2xl mx-auto">
            Cristiano Ronaldo's highlights and achievements.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="text-center group hover-lift"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mb-4">
                <AnimatedNumber target={stat.number} suffix={stat.suffix} />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2 tracking-wide">
                {stat.label}
              </h3>
              <p className="text-sm text-muted-foreground">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;