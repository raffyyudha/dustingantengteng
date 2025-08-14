import Header from '@/components/Header';
import HeroSlider from '@/components/HeroSlider';
import AboutSection from '@/components/AboutSection';
import StatsSection from '@/components/StatsSection';
import HighlightsSection from '@/components/HighlightsSection';
import NewsSection from '@/components/NewsSection';
import SocialSection from '@/components/SocialSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSlider />
        <AboutSection />
        <StatsSection />
        <HighlightsSection />
        <NewsSection />
        <SocialSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
