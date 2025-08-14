import { useEffect, useRef } from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NewsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const news = [
    {
      date: '2024-03-15',
      category: 'PENGUMUMAN',
      title: 'Lab Inovasi Digital Baru Diluncurkan',
      excerpt: 'Dustin Tiffany mengumumkan pembukaan lab inovasi digital yang berfokus pada teknologi kreasi konten generasi terbaru.',
      image: '/api/placeholder/600/400',
      readTime: '3 menit baca'
    },
    {
      date: '2024-03-10',
      category: 'KOLABORASI',
      title: 'Kemitraan Strategis dengan Raksasa Teknologi Global',
      excerpt: 'Pengumuman kolaborasi besar dengan perusahaan teknologi terkemuka untuk merevolusi distribusi dan engagement konten digital.',
      image: '/api/placeholder/600/400',
      readTime: '5 menit baca'
    },
    {
      date: '2024-03-05',
      category: 'PENGHARGAAN',
      title: 'Kreator Digital Terbaik 2024',
      excerpt: 'Pengakuan atas kontribusi luar biasa dalam kreasi konten digital dan pendekatan inovatif terhadap engagement audiens di berbagai platform.',
      image: '/api/placeholder/600/400',
      readTime: '4 menit baca'
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
            BERITA &
            <span className="block text-gold">UPDATE</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Tetap update dengan berita terbaru, pengumuman, dan insight dari Dustin Tiffany.
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
                  <span className="text-muted-foreground text-lg">Segera Hadir</span>
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
                  Baca Selengkapnya
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
            LIHAT SEMUA BERITA
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;