
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#001a4d] text-white pt-16 pb-8 border-t-4 border-[#00d4ff]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <a href="https://digitalagence.fr" target="_blank" rel="noopener noreferrer" className="inline-block bg-white p-2 rounded-lg">
              <img 
                src="https://horizons-cdn.hostinger.com/c0045f6c-51c7-4cc1-9b54-fd342ec9cd51/65277f65a696e3d1477adf828ac31c64.png" 
                alt="Digital Agence Web&SEO Logo" 
                className="h-12 w-auto object-contain" 
              />
            </a>
            <p className="text-gray-300 leading-relaxed">
              Votre partenaire expert en stratégie digitale, création de sites web performants et optimisation SEO pour propulser votre croissance en ligne.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold text-[#00d4ff] mb-6">Liens Rapides</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#00d4ff] rounded-full"></span>
                  Audit Gratuit
                </Link>
              </li>
              <li>
                <a href="https://digitalagence.fr" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#00d4ff] rounded-full"></span>
                  Site Officiel
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </li>
              <li>
                <a href="https://digitalagence.fr" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#00d4ff] rounded-full"></span>
                  Nos Services
                </a>
              </li>
              <li>
                <a href="https://digitalagence.fr/contact-et-demande-de-devis" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#00d4ff] rounded-full"></span>
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold text-[#00d4ff] mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-300">
                <MapPin className="w-5 h-5 text-[#00d4ff] flex-shrink-0 mt-1" />
                <span>France</span>
              </li>
              <li className="flex items-center gap-3 text-gray-300">
                <Mail className="w-5 h-5 text-[#00d4ff] flex-shrink-0" />
                <a href="mailto:digitalagence28@gmail.com" className="hover:text-white transition-colors">
                  digitalagence28@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3 text-gray-300">
                <Phone className="w-5 h-5 text-[#00d4ff] flex-shrink-0" />
                <a href="tel:0603703509" className="hover:text-white transition-colors">
                  0603703509
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 text-center text-gray-400 text-sm">
          <p>&copy; {currentYear} Digital Agence Web&SEO. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
