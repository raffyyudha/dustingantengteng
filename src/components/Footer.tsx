import { Instagram, Youtube, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'About', href: '#about' },
    { label: 'Career Highlights', href: '#highlights' },
    { label: 'News & Updates', href: '#news' },
    { label: 'Contact', href: '#contact' },
    { label: 'Privacy Policy', href: '#privacy' },
    { label: 'Terms of Service', href: '#terms' }
  ];

  const socialLinks = [
    { label: 'Instagram', icon: Instagram, href: 'https://instagram.com/dustintiffani' },
    { label: 'YouTube', icon: Youtube, href: 'https://youtube.com/dustintiffani' },
    { label: 'Twitter', icon: Twitter, href: 'https://twitter.com/dustintiffani' },
    { label: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/in/dustintiffani' }
  ];

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* About Column */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-black text-foreground tracking-tight mb-4">
                DUSTIN TIFFANI
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Digital creator, entrepreneur, and public figure recognized for bold creative vision 
                and innovative approach to content creation. Building the future of digital experiences.
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-muted-foreground">
                <Mail size={18} />
                <span>hello@dustintiffani.com</span>
              </div>
              <div className="flex items-center space-x-3 text-muted-foreground">
                <Phone size={18} />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-muted-foreground">
                <MapPin size={18} />
                <span>Los Angeles, California</span>
              </div>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="text-lg font-bold text-foreground mb-6 tracking-wide">
              QUICK LINKS
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
              CONNECT WITH DUSTIN
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
              <h5 className="font-semibold text-foreground">Stay Updated</h5>
              <p className="text-sm text-muted-foreground">
                Subscribe to get the latest news and exclusive content.
              </p>
              <div className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Enter your email"
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
            © {currentYear} Dustin Tiffani. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <a href="#privacy" className="text-muted-foreground hover:text-gold transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="#terms" className="text-muted-foreground hover:text-gold transition-colors duration-300">
              Terms of Service
            </a>
            <a href="#cookies" className="text-muted-foreground hover:text-gold transition-colors duration-300">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;