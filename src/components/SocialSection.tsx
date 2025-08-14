import { useEffect, useRef } from 'react';
import { Instagram, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SocialSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  // Mock Instagram feed data
  const socialPosts = [
    { id: 1, image: '/api/placeholder/400/400', likes: '12.5K', comments: '342' },
    { id: 2, image: '/api/placeholder/400/400', likes: '18.2K', comments: '567' },
    { id: 3, image: '/api/placeholder/400/400', likes: '25.7K', comments: '890' },
    { id: 4, image: '/api/placeholder/400/400', likes: '31.4K', comments: '1.2K' },
    { id: 5, image: '/api/placeholder/400/400', likes: '22.1K', comments: '743' },
    { id: 6, image: '/api/placeholder/400/400', likes: '28.9K', comments: '965' },
    { id: 7, image: '/api/placeholder/400/400', likes: '19.3K', comments: '531' },
    { id: 8, image: '/api/placeholder/400/400', likes: '33.7K', comments: '1.5K' },
    { id: 9, image: '/api/placeholder/400/400', likes: '27.2K', comments: '824' }
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

    const elements = sectionRef.current?.querySelectorAll('.slide-in-bottom, .fade-in-stagger');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-24 md:py-32 bg-background"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 slide-in-bottom">
          <h2 className="text-section-title text-foreground mb-6">
            SOCIAL
            <span className="block text-gold">MEDIA WALL</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Follow Dustin's journey through his social media channels and stay connected with his latest content.
          </p>
          
          <Button 
            size="lg"
            className="bg-gold text-gold-foreground hover:bg-gold/90 font-semibold tracking-wide px-8 py-6 text-lg"
          >
            <Instagram className="mr-2" size={20} />
            @dustintiffani
            <ExternalLink className="ml-2" size={16} />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
          {socialPosts.map((post, index) => (
            <div 
              key={post.id}
              className="fade-in-stagger group relative aspect-square bg-muted/20 rounded-lg overflow-hidden hover-lift"
              style={{ transitionDelay: `${index * 0.05}s` }}
            >
              <div className="w-full h-full bg-muted/20 flex items-center justify-center">
                <Instagram size={48} className="text-muted-foreground/50" />
              </div>
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-hero-overlay opacity-0 group-hover:opacity-90 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-center text-hero-text transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="flex items-center justify-center space-x-6 text-lg font-semibold">
                    <span>❤️ {post.likes}</span>
                    <span>💬 {post.comments}</span>
                  </div>
                  <p className="mt-2 text-sm opacity-75">View Post</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center slide-in-bottom">
          <p className="text-lg text-muted-foreground mb-6">
            Join <span className="text-gold font-semibold">2.5M+</span> followers across all platforms
          </p>
          <div className="flex justify-center space-x-4">
            <Button 
              variant="outline"
              size="lg"
              className="border-gold text-gold hover:bg-gold hover:text-gold-foreground"
            >
              Follow on Instagram
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="border-gold text-gold hover:bg-gold hover:text-gold-foreground"
            >
              Subscribe on YouTube
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialSection;