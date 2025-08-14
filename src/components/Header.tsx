import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'DT', href: '#home', isLogo: true },
    { label: 'SOROTAN KARIR', href: '#highlights' },
    { label: 'BRAND', href: '#brands' },
    { label: 'MUSEUM KEHIDUPAN', href: '#museum' },
    { label: 'PARTNER', href: '#partners' }
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-nav-bg backdrop-blur-md border-b border-border' 
          : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a 
            href="#home" 
            className="text-2xl font-black text-nav-text tracking-tight"
          >
            DUSTIN TIFFANY
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.slice(1).map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-nav-text-muted hover:text-nav-text transition-colors duration-300 nav-underline tracking-wide"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-nav-text"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 bg-nav-bg backdrop-blur-md rounded-lg border border-border">
            {navItems.slice(1).map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block px-4 py-3 text-sm font-medium text-nav-text-muted hover:text-nav-text transition-colors duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;