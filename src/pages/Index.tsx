import ScrollTriggerCurtain from '@/components/ScrollTriggerCurtain';
import HeroSection from '@/components/HeroSection';
import ServiceSection from '@/components/ServiceSection';
import PortfolioSection from '@/components/PortfolioSection';
import ContactSection from '@/components/ContactSection';

const Index = () => {
  // Define sections with different heights and content
  const sections = [
    {
      id: 'services',
      height: '150vh', // Taller section for services
      background: 'linear-gradient(180deg, hsl(215 25% 6%) 0%, hsl(215 25% 10%) 100%)',
      content: <ServiceSection />
    },
    {
      id: 'portfolio',
      height: '100vh', // Standard height
      background: 'linear-gradient(180deg, hsl(215 25% 8%) 0%, hsl(215 25% 12%) 100%)',
      content: <PortfolioSection />
    },
    {
      id: 'about',
      height: '80vh', // Shorter section
      background: 'linear-gradient(180deg, hsl(215 25% 10%) 0%, hsl(215 25% 14%) 100%)',
      content: (
        <div className="flex items-center justify-center h-full">
          <div className="text-center max-w-4xl mx-auto px-6">
            <h2 className="text-4xl md:text-6xl font-black mb-6 text-foreground">
              Tentang <span className="text-primary">Kami</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Tim passionate developer dan designer yang berkomitmen menghadirkan 
              solusi teknologi terdepan untuk mengakselerasi bisnis Anda.
            </p>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="text-3xl mb-2">🚀</div>
                <h3 className="font-bold text-lg text-foreground mb-2">Innovation First</h3>
                <p className="text-sm text-muted-foreground">Selalu menggunakan teknologi terdepan</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">🎯</div>
                <h3 className="font-bold text-lg text-foreground mb-2">Quality Focus</h3>
                <p className="text-sm text-muted-foreground">Kualitas adalah prioritas utama kami</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">⚡</div>
                <h3 className="font-bold text-lg text-foreground mb-2">Fast Delivery</h3>
                <p className="text-sm text-muted-foreground">Timeline yang efisien dan tepat waktu</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'contact',
      height: '120vh', // Taller for contact form
      background: 'linear-gradient(180deg, hsl(215 25% 12%) 0%, hsl(222.2 84% 4.9%) 100%)',
      content: <ContactSection />
    }
  ];

  return (
    <div className="overflow-x-hidden">
      <ScrollTriggerCurtain 
        heroContent={<HeroSection />}
        sections={sections}
      />
    </div>
  );
};

export default Index;
