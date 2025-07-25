import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const ServiceSection = () => {
  const services = [
    {
      title: "Web Development",
      description: "Aplikasi web modern dan responsif dengan teknologi terkini",
      icon: "🌐",
      features: ["React/Next.js", "Node.js", "Cloud Deployment"]
    },
    {
      title: "Mobile Apps",
      description: "Aplikasi mobile native dan cross-platform yang powerful",
      icon: "📱",
      features: ["React Native", "Flutter", "Native iOS/Android"]
    },
    {
      title: "Cloud Solutions",
      description: "Infrastruktur cloud yang scalable dan secure",
      icon: "☁️",
      features: ["AWS/Azure", "DevOps", "Microservices"]
    },
    {
      title: "AI Integration",
      description: "Implementasi kecerdasan buatan untuk otomasi bisnis",
      icon: "🤖",
      features: ["Machine Learning", "Data Analytics", "Automation"]
    }
  ];

  return (
    <div className="relative w-full h-full section-gradient flex items-center justify-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 border border-primary rounded-full" />
        <div className="absolute bottom-20 right-20 w-48 h-48 border border-accent rounded-full" />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 border border-primary/50 rounded-full" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-16">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/20 bg-accent/10 text-accent text-sm font-medium mb-6">
            Layanan Kami
          </div>
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            <span className="text-foreground">Solusi IT</span>
            <br />
            <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
              Terintegrasi
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Dari konsep hingga deployment, kami menyediakan solusi teknologi end-to-end 
            yang mengakselerasi transformasi digital bisnis Anda.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {services.map((service, index) => (
            <Card 
              key={index}
              className="relative p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-smooth shadow-card hover:shadow-primary group"
            >
              {/* Service Icon */}
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>

              {/* Service Content */}
              <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              
              <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                {service.description}
              </p>

              {/* Features */}
              <div className="space-y-2">
                {service.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                    {feature}
                  </div>
                ))}
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button 
            size="lg"
            className="px-8 py-4 text-lg font-semibold shadow-primary hover:shadow-glow transition-smooth"
          >
            Konsultasi Gratis
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ServiceSection;