
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getAudits, deleteAudit, getScoreStatus } from '@/services/AuditService.js';
import { Eye, Trash2, Calendar, Globe } from 'lucide-react';
import { useToast } from '@/hooks/use-toast.js';

const AuditHistory = () => {
  const [audits, setAudits] = useState([]);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    loadAudits();
  }, []);
  
  const loadAudits = () => {
    const allAudits = getAudits();
    setAudits(allAudits.filter(audit => audit.status === 'completed'));
  };
  
  const handleDelete = (id, domain) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer l'audit de ${domain} ?`)) {
      const success = deleteAudit(id);
      if (success) {
        loadAudits();
        toast({
          title: 'Audit supprimé',
          description: `L'audit de ${domain} a été supprimé avec succès.`,
        });
      } else {
        toast({
          title: 'Erreur',
          description: 'Impossible de supprimer l\'audit.',
          variant: 'destructive',
        });
      }
    }
  };
  
  const handleView = (id) => {
    navigate(`/report/${id}`);
  };
  
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
  
  if (audits.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
          <Globe className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Aucun audit pour le moment
        </h3>
        <p className="text-gray-600">
          Lancez votre premier audit pour commencer à analyser votre site web.
        </p>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Historique des audits</h2>
      
      {/* Desktop view - Table */}
      <div className="hidden md:block overflow-hidden rounded-lg border border-gray-200 shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Domaine
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Score Global
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {audits.map((audit) => {
              const status = getScoreStatus(audit.overallScore);
              return (
                <tr key={audit.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-gray-400" />
                      <span className="font-medium text-gray-900">{audit.domain}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      {formatDate(audit.date)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <Badge className={`${status.bgColor} ${status.color} border-0 text-base font-bold px-4 py-1`}>
                      {audit.overallScore}/100
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        onClick={() => handleView(audit.id)}
                        variant="outline"
                        size="sm"
                        className="hover:bg-teal-50 hover:text-teal-700 hover:border-teal-300"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Voir
                      </Button>
                      <Button
                        onClick={() => handleDelete(audit.id, audit.domain)}
                        variant="outline"
                        size="sm"
                        className="hover:bg-red-50 hover:text-red-700 hover:border-red-300"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      {/* Mobile view - Cards */}
      <div className="md:hidden space-y-4">
        {audits.map((audit) => {
          const status = getScoreStatus(audit.overallScore);
          return (
            <Card key={audit.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <Globe className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <CardTitle className="text-base truncate">{audit.domain}</CardTitle>
                  </div>
                  <Badge className={`${status.bgColor} ${status.color} border-0 font-bold flex-shrink-0`}>
                    {audit.overallScore}/100
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                  <Calendar className="w-4 h-4" />
                  {formatDate(audit.date)}
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleView(audit.id)}
                    variant="outline"
                    size="sm"
                    className="flex-1 hover:bg-teal-50 hover:text-teal-700 hover:border-teal-300"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    Voir
                  </Button>
                  <Button
                    onClick={() => handleDelete(audit.id, audit.domain)}
                    variant="outline"
                    size="sm"
                    className="hover:bg-red-50 hover:text-red-700 hover:border-red-300"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default AuditHistory;
