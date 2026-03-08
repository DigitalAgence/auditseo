
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import ScoreCard from '@/components/ScoreCard.jsx';
import RecommendationCard from '@/components/RecommendationCard.jsx';
import PDFExport from '@/components/PDFExport.jsx';
import { getAuditById, getCategoryName, getCategoryIcon, getScoreStatus } from '@/services/AuditService.js';
import { 
  ArrowLeft, 
  ExternalLink, 
  Calendar, 
  Globe, 
  Circle, 
  Activity, 
  Search, 
  Share2, 
  Shield, 
  TrendingUp, 
  Zap, 
  Users, 
  Award, 
  BarChart 
} from 'lucide-react';

const iconMap = {
  Activity, Search, Share2, Shield, TrendingUp, Circle, Zap, Globe, Users, Award, BarChart
};

const ReportPage = () => {
  const { auditId } = useParams();
  const navigate = useNavigate();
  const [audit, setAudit] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  
  useEffect(() => {
    const auditData = getAuditById(auditId);
    if (!auditData) {
      navigate('/');
      return;
    }
    setAudit(auditData);
  }, [auditId]);
  
  if (!audit) {
    return (
      <div className="min-h-[80vh] bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00d4ff] mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement du rapport...</p>
        </div>
      </div>
    );
  }
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };
  
  const overallStatus = getScoreStatus(audit.overallScore);
  const categories = ['performance', 'seo', 'socialMedia', 'reputation', 'competition'];
  
  return (
    <>
      <Helmet>
        <title>{`Rapport d'audit - ${audit.domain} | Digital Agence Web&SEO`}</title>
        <meta name="description" content={`Rapport d'audit marketing digital complet pour ${audit.domain}. Score global: ${audit.overallScore}/100. Découvrez vos recommandations personnalisées.`} />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-12">
        {/* Header Actions */}
        <div className="bg-white border-b border-gray-200 shadow-sm sticky top-20 z-40">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-4">
                <Button
                  onClick={() => navigate('/')}
                  variant="outline"
                  size="sm"
                  className="flex-shrink-0 border-gray-300 hover:bg-gray-50"
                >
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Retour
                </Button>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Globe className="w-5 h-5 text-[#00d4ff] flex-shrink-0" />
                    <h1 className="text-xl font-bold text-[#001a4d] truncate">
                      {audit.domain}
                    </h1>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    {formatDate(audit.date)}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <PDFExport audit={audit} />
                <a
                  href="https://digitalagence.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#00d4ff] text-[#001a4d] rounded-lg hover:bg-[#00b8e6] transition-colors text-sm font-bold shadow-sm"
                >
                  Obtenir de l'aide
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="container mx-auto px-4 py-8">
          
          {/* Branding Header inside report */}
          <div className="flex justify-center mb-8">
            <img 
              src="https://horizons-cdn.hostinger.com/c0045f6c-51c7-4cc1-9b54-fd342ec9cd51/65277f65a696e3d1477adf828ac31c64.png" 
              alt="Digital Agence Web&SEO" 
              className="h-16 w-auto object-contain opacity-90"
            />
          </div>

          {/* Overall Score Section */}
          <div className="mb-8">
            <Card className="overflow-hidden shadow-xl border-0 ring-1 ring-gray-200">
              <CardHeader className="bg-gradient-to-r from-[#001a4d] to-[#002b80] text-white border-b-4 border-[#00d4ff]">
                <CardTitle className="text-2xl">Score Global</CardTitle>
                <CardDescription className="text-gray-300">
                  Évaluation globale de votre présence digitale
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-8 pb-6 bg-white">
                <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                  <div className="flex-shrink-0">
                    <ScoreCard score={audit.overallScore} size="large" />
                  </div>
                  <div className="flex-1 max-w-md">
                    <h3 className="text-lg font-semibold text-[#001a4d] mb-3">
                      Interprétation du score
                    </h3>
                    <div className="space-y-2 text-sm text-gray-700 bg-gray-50 p-4 rounded-lg border border-gray-100">
                      {audit.overallScore >= 90 && (
                        <p>🎉 <strong className="text-green-600">Excellent !</strong> Votre site web présente une très bonne performance digitale. Continuez à maintenir ces standards élevés.</p>
                      )}
                      {audit.overallScore >= 70 && audit.overallScore < 90 && (
                        <p>👍 <strong className="text-blue-600">Bon travail !</strong> Votre site web est bien optimisé, mais il existe encore des opportunités d'amélioration.</p>
                      )}
                      {audit.overallScore >= 50 && audit.overallScore < 70 && (
                        <p>⚠️ <strong className="text-yellow-600">Attention !</strong> Votre site web nécessite des améliorations dans plusieurs domaines pour être compétitif.</p>
                      )}
                      {audit.overallScore < 50 && (
                        <p>🚨 <strong className="text-red-600">Action requise !</strong> Votre site web présente des lacunes importantes qui nécessitent une attention immédiate.</p>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Tabs Section */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6 h-auto gap-2 bg-gray-100 p-1 rounded-xl">
              <TabsTrigger
                value="overview"
                className="data-[state=active]:bg-[#001a4d] data-[state=active]:text-white rounded-lg py-2.5"
              >
                Vue d'ensemble
              </TabsTrigger>
              {categories.map(category => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="data-[state=active]:bg-[#001a4d] data-[state=active]:text-white rounded-lg py-2.5"
                >
                  {getCategoryName(category)}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6 animate-in fade-in duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map(category => {
                  const categoryData = audit.categories[category];
                  return (
                    <div key={category} onClick={() => setActiveTab(category)} className="cursor-pointer transform transition-transform hover:scale-[1.02]">
                      <ScoreCard
                        score={categoryData?.score || 0}
                        category={getCategoryName(category)}
                      />
                    </div>
                  );
                })}
              </div>
              
              {/* Quick Recommendations */}
              <Card className="border-t-4 border-[#001a4d] shadow-md">
                <CardHeader className="bg-gray-50/50">
                  <CardTitle className="text-[#001a4d]">Recommandations Prioritaires</CardTitle>
                  <CardDescription>
                    Actions à entreprendre en priorité pour améliorer votre score
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {categories.map(category => {
                      const categoryData = audit.categories[category];
                      const highPriorityRec = categoryData?.recommendations?.find(
                        rec => rec.priority === 'high'
                      );
                      
                      if (!highPriorityRec) return null;
                      
                      const IconComponent = iconMap[getCategoryIcon(category)] || Circle;
                      
                      return (
                        <RecommendationCard
                          key={category}
                          recommendation={highPriorityRec}
                          categoryIcon={IconComponent}
                        />
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Category Tabs */}
            {categories.map(category => {
              const categoryData = audit.categories[category];
              const IconComponent = iconMap[getCategoryIcon(category)] || Circle;
              
              return (
                <TabsContent key={category} value={category} className="space-y-6 animate-in fade-in duration-500">
                  {/* Category Score */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-1">
                      <ScoreCard
                        score={categoryData?.score || 0}
                        category={getCategoryName(category)}
                        size="large"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Card className="h-full border-l-4 border-[#00d4ff] shadow-md">
                        <CardHeader className="bg-gray-50/50">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-[#001a4d]/10 rounded-lg">
                              <IconComponent className="w-6 h-6 text-[#001a4d]" />
                            </div>
                            <CardTitle className="text-[#001a4d]">À propos de {getCategoryName(category)}</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-6">
                          <p className="text-gray-700 leading-relaxed text-lg">
                            {category === 'performance' && "La performance de votre site web affecte directement l'expérience utilisateur et votre classement dans les moteurs de recherche. Un site rapide améliore la satisfaction des visiteurs et augmente les conversions."}
                            {category === 'seo' && "Le référencement naturel (SEO) détermine la visibilité de votre site dans les résultats de recherche. Une bonne optimisation SEO attire plus de trafic organique qualifié vers votre site."}
                            {category === 'socialMedia' && "L'optimisation pour les réseaux sociaux améliore l'apparence de vos liens partagés et augmente l'engagement. Des balises Open Graph bien configurées génèrent plus de clics et de partages."}
                            {category === 'reputation' && "Votre reputation en ligne influence la confiance des visiteurs et des moteurs de recherche. Un site sécurisé avec une bonne réputation convertit mieux et se classe plus haut."}
                            {category === 'competition' && "Comprendre votre positionnement concurrentiel vous aide à identifier les opportunités et à développer une stratégie digitale efficace pour vous démarquer."}
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                  
                  {/* Recommendations */}
                  <Card className="shadow-md">
                    <CardHeader className="bg-gray-50/50 border-b border-gray-100">
                      <CardTitle className="text-[#001a4d]">Recommandations pour {getCategoryName(category)}</CardTitle>
                      <CardDescription>
                        Actions concrètes pour améliorer votre score dans cette catégorie
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        {categoryData?.recommendations?.map((rec, index) => (
                          <RecommendationCard
                            key={index}
                            recommendation={rec}
                            categoryIcon={IconComponent}
                          />
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              );
            })}
          </Tabs>
          
          {/* CTA Section */}
          <Card className="mt-12 bg-gradient-to-r from-[#001a4d] to-[#002b80] text-white border-0 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#00d4ff] rounded-full mix-blend-multiply filter blur-3xl opacity-20 translate-x-1/2 -translate-y-1/2"></div>
            <CardContent className="pt-10 pb-10 text-center relative z-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Besoin d'aide pour mettre en œuvre ces recommandations ?
              </h2>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto text-lg">
                Notre équipe d'experts en marketing digital peut vous accompagner dans l'optimisation 
                de votre présence en ligne et la mise en place d'une stratégie efficace.
              </p>
              <a
                href="https://digitalagence.fr/contact-et-demande-de-devis"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#00d4ff] text-[#001a4d] px-8 py-3.5 rounded-lg font-bold hover:bg-white transition-all duration-300 shadow-[0_0_15px_rgba(0,212,255,0.3)] hover:shadow-[0_0_25px_rgba(0,212,255,0.5)] hover:-translate-y-1"
              >
                Contactez-nous
                <ExternalLink className="w-5 h-5" />
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default ReportPage;
