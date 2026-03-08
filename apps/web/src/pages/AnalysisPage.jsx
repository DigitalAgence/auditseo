
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { performAudit, getCategoryName, getCategoryIcon } from '@/services/AuditService.js';
import { 
  Loader2, 
  CheckCircle2, 
  AlertCircle, 
  Circle, 
  Activity, 
  Search, 
  Share2, 
  Shield, 
  TrendingUp, 
  Zap, 
  Globe, 
  Users, 
  Award, 
  BarChart 
} from 'lucide-react';

const iconMap = {
  Activity, Search, Share2, Shield, TrendingUp, Circle, Zap, Globe, Users, Award, BarChart
};

const AnalysisPage = () => {
  const { auditId } = useParams();
  const navigate = useNavigate();
  const [url, setUrl] = useState('');
  const [progress, setProgress] = useState({});
  const [error, setError] = useState(null);
  const [overallProgress, setOverallProgress] = useState(0);
  
  const categories = ['performance', 'seo', 'socialMedia', 'reputation', 'competition'];
  
  useEffect(() => {
    // Get URL from session storage
    const pendingUrl = sessionStorage.getItem('pending_audit_url');
    const pendingId = sessionStorage.getItem('pending_audit_id');
    
    if (!pendingUrl || pendingId !== auditId) {
      navigate('/');
      return;
    }
    
    setUrl(pendingUrl);
    
    // Initialize progress
    const initialProgress = {};
    categories.forEach(cat => {
      initialProgress[cat] = { status: 'pending', progress: 0 };
    });
    setProgress(initialProgress);
    
    // Start audit
    startAudit(pendingUrl);
    
    // Cleanup session storage when component unmounts
    return () => {
      sessionStorage.removeItem('pending_audit_url');
      sessionStorage.removeItem('pending_audit_id');
    };
  }, [auditId]);
  
  const startAudit = async (auditUrl) => {
    try {
      await performAudit(auditUrl, (category, status) => {
        setProgress(prev => ({
          ...prev,
          [category]: {
            status,
            progress: status === 'analyzing' ? 50 : status === 'completed' ? 100 : 0,
          },
        }));
        
        // Update overall progress
        setOverallProgress(prev => {
          const completed = Object.values(progress).filter(p => p.status === 'completed').length;
          return Math.round((completed / categories.length) * 100);
        });
      });
      
      // Navigate to report page after completion
      setTimeout(() => {
        navigate(`/report/${auditId}`);
      }, 1500);
    } catch (err) {
      setError('Une erreur est survenue lors de l\'audit. Veuillez réessayer.');
      console.error('Audit error:', err);
    }
  };
  
  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-6 h-6 text-green-600" />;
      case 'analyzing':
        return <Loader2 className="w-6 h-6 text-[#00d4ff] animate-spin" />;
      case 'error':
        return <AlertCircle className="w-6 h-6 text-red-600" />;
      default:
        return <div className="w-6 h-6 rounded-full border-2 border-gray-300"></div>;
    }
  };
  
  const getStatusText = (status) => {
    switch (status) {
      case 'completed':
        return 'Terminé';
      case 'analyzing':
        return 'Analyse en cours...';
      case 'error':
        return 'Erreur';
      default:
        return 'En attente';
    }
  };
  
  if (error) {
    return (
      <div className="min-h-[80vh] bg-gray-50 flex items-center justify-center px-4">
        <Card className="max-w-md w-full border-t-4 border-red-500">
          <CardContent className="pt-6 text-center">
            <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Erreur</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-2 bg-[#001a4d] text-white rounded-lg hover:bg-[#002b80] transition-colors"
            >
              Retour à l'accueil
            </button>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  return (
    <>
      <Helmet>
        <title>{`Analyse en cours... | Digital Agence Web&SEO`}</title>
        <meta name="description" content="Analyse de votre site web en cours. Veuillez patienter pendant que nous évaluons votre performance digitale." />
      </Helmet>
      
      <div className="min-h-[80vh] bg-gradient-to-b from-gray-50 to-white py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-[#001a4d] rounded-full mb-6 shadow-[0_0_20px_rgba(0,212,255,0.3)]">
              <Loader2 className="w-10 h-10 text-[#00d4ff] animate-spin" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#001a4d] mb-3">
              Analyse en cours
            </h1>
            <p className="text-lg text-gray-600">
              Nous analysons <span className="font-semibold text-[#00d4ff]">{url}</span>
            </p>
          </div>
          
          {/* Overall Progress */}
          <Card className="mb-8 shadow-lg border-[#001a4d]/10">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-700">Progression globale</span>
                <span className="text-sm font-bold text-[#001a4d]">{overallProgress}%</span>
              </div>
              <Progress value={overallProgress} className="h-3 bg-gray-100" />
            </CardContent>
          </Card>
          
          {/* Category Progress */}
          <div className="space-y-4">
            {categories.map((category) => {
              const categoryProgress = progress[category] || { status: 'pending', progress: 0 };
              const IconComponent = iconMap[getCategoryIcon(category)] || Circle;
              
              return (
                <Card
                  key={category}
                  className={`transition-all duration-500 ${
                    categoryProgress.status === 'analyzing'
                      ? 'shadow-md border-[#00d4ff] bg-[#00d4ff]/5'
                      : categoryProgress.status === 'completed'
                      ? 'shadow-sm border-green-300 bg-green-50/30'
                      : 'shadow-sm border-gray-200'
                  }`}
                >
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex-shrink-0">
                        {getStatusIcon(categoryProgress.status)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <IconComponent className={`w-5 h-5 ${categoryProgress.status === 'analyzing' ? 'text-[#001a4d]' : 'text-gray-600'}`} />
                            <h3 className={`font-semibold ${categoryProgress.status === 'analyzing' ? 'text-[#001a4d]' : 'text-gray-900'}`}>
                              {getCategoryName(category)}
                            </h3>
                          </div>
                          <span className={`text-sm font-medium ${
                            categoryProgress.status === 'completed'
                              ? 'text-green-600'
                              : categoryProgress.status === 'analyzing'
                              ? 'text-[#00d4ff]'
                              : 'text-gray-500'
                          }`}>
                            {getStatusText(categoryProgress.status)}
                          </span>
                        </div>
                        <Progress
                          value={categoryProgress.progress}
                          className={`h-2 ${
                            categoryProgress.status === 'analyzing' ? 'animate-pulse bg-gray-200' : 'bg-gray-100'
                          }`}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          
          {/* Info Message */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-[#00d4ff]" />
              L'analyse prend généralement entre 30 secondes et 2 minutes
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AnalysisPage;
