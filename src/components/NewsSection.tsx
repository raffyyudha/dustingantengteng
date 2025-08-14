import { useEffect, useRef } from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NewsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const news = [
    {
      date: '2024-03-15',
      category: 'ANNOUNCEMENT',
      title: 'New Digital Innovation Lab Launched',
      excerpt: 'Dustin Tiffani announces the opening of a cutting-edge digital innovation lab focused on next-generation content creation technologies.',
      image: '/api/placeholder/600/400',
      readTime: '3 min read'
    },
    {
      date: '2024-03-10',
      category: 'COLLABORATION',
      title: 'Strategic Partnership with Global Tech Giants',
      excerpt: 'Major collaboration announcement with leading technology companies to revolutionize digital content distribution and engagement.',
      image: '/api/placeholder/600/400',
      readTime: '5 min read'
    },
    {
      date: '2024-03-05',
      category: 'AWARD',
      title: 'Digital Creator of the Year 2024',
      excerpt: 'Recognition for outstanding contribution to digital content creation and innovative approach to audience engagement across multiple platforms.',
      image: '/api/placeholder/600/400',
      readTime: '4 min read'
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <section 
      ref={sectionRef}
      className="py-24 md:py-32 bg-card"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 slide-in-bottom">
          <h2 className="text-section-title text-foreground mb-6">
            NEWS &
            <span className="block text-gold">UPDATES</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Stay updated with the latest news, announcements, and insights from Dustin Tiffani.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {news.map((article, index) => (
            <article 
              key={index}
              className="slide-in-bottom group hover-lift bg-background rounded-lg overflow-hidden"
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <div className="relative overflow-hidden aspect-[16/10]">
                <div className="w-full h-full bg-muted/20 flex items-center justify-center">
                  <span className="text-muted-foreground text-lg">Coming Soon</span>
                </div>
                <div className="absolute top-4 left-4">
                  <span className="bg-gold text-gold-foreground px-3 py-1 text-xs font-bold tracking-wide rounded-full">
                    {article.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center text-sm text-muted-foreground mb-4 space-x-4">
                  <div className="flex items-center space-x-2">
                    <Calendar size={16} />
                    <time dateTime={article.date}>
                      {formatDate(article.date)}
                    </time>
                  </div>
                  <span>{article.readTime}</span>
                </div>

                <h3 className="text-xl font-bold text-foreground mb-3 line-clamp-2 group-hover:text-gold transition-colors duration-300">
                  {article.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed mb-6 line-clamp-3">
                  {article.excerpt}
                </p>

                <Button
                  variant="ghost"
                  className="text-gold hover:text-gold hover:bg-gold/10 p-0 h-auto font-semibold"
                >
                  Read More
                  <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center slide-in-bottom">
          <Button 
            size="lg"
            variant="outline"
            className="border-gold text-gold hover:bg-gold hover:text-gold-foreground font-semibold tracking-wide px-8 py-6 text-lg"
          >
            VIEW ALL NEWS
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;