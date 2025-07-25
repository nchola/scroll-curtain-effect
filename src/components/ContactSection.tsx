import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const ContactSection = () => {
  const contactMethods = [
    {
      icon: "📧",
      title: "Email",
      value: "hello@itagency.co.id",
      description: "Kirim pesan detail project Anda"
    },
    {
      icon: "📞",
      title: "Phone",
      value: "+62 811-2345-6789",
      description: "Konsultasi langsung dengan expert"
    },
    {
      icon: "📍",
      title: "Office",
      value: "Jakarta, Indonesia",
      description: "Kunjungi kantor kami untuk meeting"
    }
  ];

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-background via-card/30 to-background flex items-center justify-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,hsl(var(--primary))_0%,transparent_50%)]" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,hsl(var(--accent))_0%,transparent_50%)]" />
      </div>

      {/* Animated Background Shapes */}
      <div className="absolute top-20 right-20 w-20 h-20 border-2 border-primary/20 rounded-full animate-float" />
      <div className="absolute bottom-32 left-20 w-16 h-16 border-2 border-accent/20 rounded-full animate-float" style={{ animationDelay: '3s' }} />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-16">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/20 bg-accent/10 text-accent text-sm font-medium mb-6">
            Mari Berkolaborasi
          </div>
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            <span className="text-foreground">Wujudkan Ide</span>
            <br />
            <span className="bg-gradient-to-r from-accent via-primary to-primary-glow bg-clip-text text-transparent">
              Menjadi Kenyataan
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Siap mentransformasi bisnis Anda? Tim expert kami menunggu untuk 
            berdiskusi tentang project impian Anda.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50 shadow-card">
            <h3 className="text-2xl font-bold mb-6 text-foreground">Mulai Project Bersama</h3>
            
            <form className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Nama Lengkap
                  </label>
                  <Input 
                    placeholder="John Doe"
                    className="bg-background/50 border-border/50 focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email
                  </label>
                  <Input 
                    type="email"
                    placeholder="john@company.com"
                    className="bg-background/50 border-border/50 focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Perusahaan
                </label>
                <Input 
                  placeholder="PT. Your Company"
                  className="bg-background/50 border-border/50 focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Jenis Project
                </label>
                <select className="w-full px-3 py-2 rounded-md bg-background/50 border border-border/50 focus:border-primary focus:outline-none text-foreground">
                  <option>Web Development</option>
                  <option>Mobile App</option>
                  <option>Cloud Solution</option>
                  <option>AI Integration</option>
                  <option>Konsultasi IT</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Detail Project
                </label>
                <Textarea 
                  placeholder="Ceritakan tentang project yang ingin Anda kembangkan..."
                  rows={4}
                  className="bg-background/50 border-border/50 focus:border-primary"
                />
              </div>

              <Button 
                type="submit"
                size="lg"
                className="w-full py-4 text-lg font-semibold shadow-primary hover:shadow-glow transition-smooth"
              >
                Kirim Pesan
              </Button>
            </form>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-foreground">Hubungi Kami</h3>
              <p className="text-muted-foreground mb-8">
                Tim kami siap membantu mewujudkan visi digital Anda. 
                Konsultasi gratis untuk project pertama!
              </p>
            </div>

            {/* Contact Methods */}
            <div className="space-y-4">
              {contactMethods.map((method, index) => (
                <Card 
                  key={index}
                  className="p-6 bg-card/30 backdrop-blur-sm border-border/30 hover:border-primary/30 transition-smooth shadow-card hover:shadow-primary group cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    <div className="text-2xl group-hover:scale-110 transition-transform duration-300">
                      {method.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {method.title}
                      </h4>
                      <p className="text-primary font-medium">{method.value}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {method.description}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Response Time */}
            <div className="p-6 rounded-lg bg-primary/10 border border-primary/20">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-3 h-3 bg-accent rounded-full animate-pulse-glow" />
                <span className="font-semibold text-foreground">Response Time</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Kami merespon dalam <span className="text-primary font-medium">24 jam</span> untuk 
                semua inquiry project. Tim standby untuk emergency support.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;