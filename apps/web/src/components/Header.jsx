
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <a 
          href="https://digitalagence.fr" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 transition-transform hover:scale-105"
        >
          <img 
            src="https://horizons-cdn.hostinger.com/c0045f6c-51c7-4cc1-9b54-fd342ec9cd51/65277f65a696e3d1477adf828ac31c64.png" 
            alt="Digital Agence Web&SEO Logo" 
            className="h-12 w-auto object-contain"
          />
        </a>
        
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-gray-700 hover:text-[#00d4ff] font-medium transition-colors">
            Accueil
          </Link>
          <a href="https://digitalagence.fr/contact-et-demande-de-devis" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-[#00d4ff] font-medium transition-colors">
            Contact
          </a>
          <Link 
            to="/" 
            className="bg-[#001a4d] text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-[#002b80] transition-colors shadow-md hover:shadow-lg"
          >
            Audit Gratuit
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
