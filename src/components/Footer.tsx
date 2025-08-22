import { Instagram, Youtube, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'Tentang', href: '#about' },
    { label: 'Sorotan Karir', href: '#highlights' },
    { label: 'Berita & Update', href: '#news' },
    { label: 'Kontak', href: '#contact' },
    { label: 'Kebijakan Privasi', href: '#privacy' },
    { label: 'Syarat Layanan', href: '#terms' }
  ];

  const socialLinks = [
    { label: 'Instagram', icon: Instagram, href: 'https://instagram.com/dustintiffany' },
    { label: 'YouTube', icon: Youtube, href: 'https://youtube.com/dustintiffany' },
    { label: 'Twitter', icon: Twitter, href: 'https://twitter.com/dustintiffany' },
    { label: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/in/dustintiffany' }
  ];

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* About Column */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-black text-foreground tracking-tight mb-4">
                DUSTIN TIFFANY
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Kreator digital, entrepreneur, dan figur publik yang dikenal karena visi kreatif yang berani 
                dan pendekatan inovatif terhadap pembuatan konten. Membangun masa depan pengalaman digital.
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-muted-foreground">
                <Mail size={18} />
                <span>dustintiffani24@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3 text-muted-foreground">
                <Phone size={18} />
                <span>+62 812-3456-7890</span>
              </div>
              <div className="flex items-center space-x-3 text-muted-foreground">
                <MapPin size={18} />
                <span>Jakarta, Indonesia</span>
              </div>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="text-lg font-bold text-foreground mb-6 tracking-wide">
              TAUTAN CEPAT
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {quickLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-muted-foreground hover:text-gold transition-colors duration-300 nav-underline inline-block"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Social & Newsletter Column */}
          <div>
            <h4 className="text-lg font-bold text-foreground mb-6 tracking-wide">
              TERHUBUNG DENGAN DUSTIN
            </h4>
            
            <div className="flex space-x-4 mb-8">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-muted hover:bg-gold rounded-full flex items-center justify-center text-muted-foreground hover:text-gold-foreground transition-all duration-300 hover-lift"
                    aria-label={social.label}
                  >
                    <IconComponent size={20} />
                  </a>
                );
              })}
            </div>

            <div className="space-y-4">
              <h5 className="font-semibold text-foreground">Tetap Update</h5>
              <p className="text-sm text-muted-foreground">
                Subscribe untuk mendapatkan berita terbaru dan konten eksklusif.
              </p>
              <div className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Masukkan email Anda"
                  className="flex-1 px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent text-foreground"
                />
                <button className="px-6 py-2 bg-gold text-gold-foreground rounded-lg hover:bg-gold/90 transition-colors duration-300 font-semibold">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-muted-foreground text-sm">
            © {currentYear} Dustin Tiffany. Seluruh hak cipta dilindungi.
          </p>
          <div className="flex space-x-6 text-sm">
            <a href="#privacy" className="text-muted-foreground hover:text-gold transition-colors duration-300">
              Kebijakan Privasi
            </a>
            <a href="#terms" className="text-muted-foreground hover:text-gold transition-colors duration-300">
              Syarat Layanan
            </a>
            <a href="#cookies" className="text-muted-foreground hover:text-gold transition-colors duration-300">
              Kebijakan Cookie
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;