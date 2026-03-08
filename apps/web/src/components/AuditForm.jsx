
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { validateUrl } from '@/services/AuditService.js';
import { Loader2, Search } from 'lucide-react';

const AuditForm = () => {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validate URL
    const validation = validateUrl(url);
    if (!validation.valid) {
      setError(validation.error);
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Create a temporary audit ID and navigate to analysis page
      const auditId = `audit_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      // Store the URL temporarily for the analysis page
      sessionStorage.setItem('pending_audit_url', url);
      sessionStorage.setItem('pending_audit_id', auditId);
      
      // Navigate to analysis page
      navigate(`/analysis/${auditId}`);
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer.');
      setIsLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="space-y-4">
          <div>
            <Label htmlFor="url" className="text-base font-medium text-gray-700 mb-2 block">
              URL de votre site web
            </Label>
            <div className="relative">
              <Input
                id="url"
                type="text"
                placeholder="exemple.com ou https://exemple.com"
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                  setError('');
                }}
                className="h-14 text-lg pr-12 border-2 focus:border-teal-500 transition-colors"
                disabled={isLoading}
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
            {error && (
              <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                <span className="font-medium">⚠️</span> {error}
              </p>
            )}
          </div>
          
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Lancement de l'audit...
              </>
            ) : (
              <>
                <Search className="mr-2 h-5 w-5" />
                Lancer l'audit
              </>
            )}
          </Button>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-600 text-center">
            🔒 Analyse 100% gratuite et confidentielle • Résultats en moins de 2 minutes
          </p>
        </div>
      </div>
    </form>
  );
};

export default AuditForm;
