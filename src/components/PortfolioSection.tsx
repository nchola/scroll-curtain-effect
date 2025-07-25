import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const PortfolioSection = () => {
  const projects = [
    {
      title: "E-Commerce Platform",
      category: "Web Development",
      description: "Platform e-commerce B2B dengan fitur inventory management dan analytics dashboard.",
      tech: ["React", "Node.js", "PostgreSQL"],
      image: "🛒",
      stats: { users: "10K+", conversion: "25%" }
    },
    {
      title: "FinTech Mobile App",
      category: "Mobile Development",
      description: "Aplikasi financial technology dengan fitur payment gateway dan wallet digital.",
      tech: ["React Native", "Blockchain", "AWS"],
      image: "💳",
      stats: { downloads: "50K+", rating: "4.8/5" }
    },
    {
      title: "Healthcare Management",
      category: "Enterprise Solution",
      description: "Sistem manajemen rumah sakit dengan integrasi AI untuk diagnosis support.",
      tech: ["Vue.js", "Python", "TensorFlow"],
      image: "🏥",
      stats: { hospitals: "15+", efficiency: "+40%" }
    }
  ];

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-card to-muted/20 flex items-center justify-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, hsl(var(--primary) / 0.2) 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, hsl(var(--accent) / 0.2) 0%, transparent 50%)
            `
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-16">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/10 text-primary text-sm font-medium mb-6">
            Portfolio Terpilih
          </div>
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            <span className="text-foreground">Karya Yang</span>
            <br />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Membanggakan
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Setiap project adalah cerminan dedikasi kami dalam menghadirkan solusi 
            teknologi yang tidak hanya fungsional, tetapi juga revolusioner.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {projects.map((project, index) => (
            <Card 
              key={index}
              className="relative overflow-hidden bg-card/70 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-smooth shadow-card hover:shadow-glow group"
            >
              {/* Project Image/Icon */}
              <div className="relative h-48 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                <div className="text-6xl group-hover:scale-110 transition-transform duration-500">
                  {project.image}
                </div>
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-primary/20 backdrop-blur-sm text-primary text-xs font-medium">
                  {project.category}
                </div>
              </div>

              <div className="p-6">
                {/* Project Title */}
                <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, idx) => (
                    <span 
                      key={idx}
                      className="px-2 py-1 rounded-md bg-muted/50 text-muted-foreground text-xs border border-border/50"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Project Stats */}
                <div className="flex justify-between items-center pt-4 border-t border-border/30">
                  {Object.entries(project.stats).map(([key, value], idx) => (
                    <div key={idx} className="text-center">
                      <div className="text-sm font-bold text-primary">{value}</div>
                      <div className="text-xs text-muted-foreground capitalize">{key}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Card>
          ))}
        </div>

        {/* Portfolio CTA */}
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">
            Ingin melihat lebih banyak project dan case study?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="px-8 py-4 text-lg font-semibold shadow-primary hover:shadow-glow transition-smooth"
            >
              Lihat Semua Portfolio
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="px-8 py-4 text-lg font-semibold border-primary/30 hover:border-primary hover:bg-primary/10 transition-smooth"
            >
              Download Case Study
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioSection;