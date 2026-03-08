
import React from 'react';
import { Helmet } from 'react-helmet';
import AuditForm from '@/components/AuditForm.jsx';
import AuditHistory from '@/components/AuditHistory.jsx';
import { TrendingUp, Zap, Award } from 'lucide-react';

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Audit Marketing Digital Gratuit | Digital Agence Web&SEO</title>
        <meta name="description" content="Obtenez un audit marketing digital complet et gratuit de votre site web par Digital Agence Web&SEO. Analysez la performance, le SEO, les réseaux sociaux et plus encore." />
      </Helmet>
      
      <div className="bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1625296276703-3fbc924f07b5"
              alt="Audit marketing digital - Analyse de données et stratégie digitale"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#001a4d]/90 via-[#001a4d]/80 to-[#00d4ff]/40"></div>
          </div>
          
          {/* Hero Content */}
          <div className="relative z-10 container mx-auto px-4 py-20">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <div className="flex flex-col items-center justify-center mb-8">
                <img 
                  src="https://horizons-cdn.hostinger.com/c0045f6c-51c7-4cc1-9b54-fd342ec9cd51/65277f65a696e3d1477adf828ac31c64.png" 
                  alt="Digital Agence Web&SEO" 
                  className="h-20 md:h-24 w-auto object-contain mb-6 bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/20"
                />
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                  Audit Marketing Digital <span className="text-[#00d4ff]">Gratuit</span>
                </h1>
              </div>
              
              <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
                Analysez la performance de votre site web en quelques minutes. 
                Obtenez des recommandations personnalisées pour améliorer votre présence en ligne.
              </p>
              
              {/* Feature Pills */}
              <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
                <div className="flex items-center gap-2 bg-[#001a4d]/60 backdrop-blur-md px-5 py-2.5 rounded-full border border-[#00d4ff]/30 shadow-[0_0_15px_rgba(0,212,255,0.2)]">
                  <Zap className="w-5 h-5 text-[#00d4ff]" />
                  <span className="text-white font-medium">Analyse en 2 minutes</span>
                </div>
                <div className="flex items-center gap-2 bg-[#001a4d]/60 backdrop-blur-md px-5 py-2.5 rounded-full border border-[#00d4ff]/30 shadow-[0_0_15px_rgba(0,212,255,0.2)]">
                  <Award className="w-5 h-5 text-[#00d4ff]" />
                  <span className="text-white font-medium">100% Gratuit</span>
                </div>
                <div className="flex items-center gap-2 bg-[#001a4d]/60 backdrop-blur-md px-5 py-2.5 rounded-full border border-[#00d4ff]/30 shadow-[0_0_15px_rgba(0,212,255,0.2)]">
                  <TrendingUp className="w-5 h-5 text-[#00d4ff]" />
                  <span className="text-white font-medium">Recommandations actionnables</span>
                </div>
              </div>
            </div>
            
            {/* Audit Form */}
            <AuditForm />
            
            {/* Trust Indicators */}
            <div className="mt-12 text-center">
              <p className="text-gray-300 text-sm mb-4 font-medium tracking-wider uppercase">Analyse complète incluant :</p>
              <div className="flex flex-wrap items-center justify-center gap-6 text-gray-200">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#00d4ff] rounded-full shadow-[0_0_8px_#00d4ff]"></span>
                  Performance
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#00d4ff] rounded-full shadow-[0_0_8px_#00d4ff]"></span>
                  SEO
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#00d4ff] rounded-full shadow-[0_0_8px_#00d4ff]"></span>
                  Réseaux Sociaux
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#00d4ff] rounded-full shadow-[0_0_8px_#00d4ff]"></span>
                  Réputation
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#00d4ff] rounded-full shadow-[0_0_8px_#00d4ff]"></span>
                  Concurrence
                </span>
              </div>
            </div>
          </div>
        </section>
        
        {/* Audit History Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <AuditHistory />
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-[#001a4d] to-[#002b80] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00d4ff] to-transparent opacity-50"></div>
          <div className="container mx-auto max-w-4xl text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Besoin d'aide pour améliorer vos résultats ?
            </h2>
            <p className="text-xl text-gray-300 mb-10">
              Notre équipe d'experts Digital Agence Web&SEO peut vous accompagner dans l'optimisation de votre stratégie digitale.
            </p>
            <a
              href="https://digitalagence.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#00d4ff] text-[#001a4d] px-8 py-4 rounded-lg font-bold text-lg hover:bg-white transition-all duration-300 shadow-[0_0_20px_rgba(0,212,255,0.4)] hover:shadow-[0_0_30px_rgba(0,212,255,0.6)] hover:-translate-y-1"
            >
              Découvrir nos solutions
              <TrendingUp className="w-6 h-6" />
            </a>
          </div>
        </section>
      </div>
    </>
  );
};

export default HomePage;
