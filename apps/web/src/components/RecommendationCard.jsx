
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, CheckCircle2, Info } from 'lucide-react';

const RecommendationCard = ({ recommendation, categoryIcon: CategoryIcon }) => {
  const { title, description, priority, tips } = recommendation;
  
  // Priority styling
  const getPriorityConfig = () => {
    switch (priority) {
      case 'high':
        return {
          icon: AlertCircle,
          color: 'text-red-600',
          bgColor: 'bg-red-100',
          label: 'Priorité Haute',
        };
      case 'medium':
        return {
          icon: Info,
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-100',
          label: 'Priorité Moyenne',
        };
      case 'low':
        return {
          icon: CheckCircle2,
          color: 'text-green-600',
          bgColor: 'bg-green-100',
          label: 'Priorité Basse',
        };
      default:
        return {
          icon: Info,
          color: 'text-gray-600',
          bgColor: 'bg-gray-100',
          label: 'Normal',
        };
    }
  };
  
  const priorityConfig = getPriorityConfig();
  const PriorityIcon = priorityConfig.icon;
  
  return (
    <Card className="transition-all duration-300 hover:shadow-md border-l-4" style={{
      borderLeftColor: priority === 'high' ? '#dc2626' : priority === 'medium' ? '#ca8a04' : '#16a34a'
    }}>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 flex-1">
            {CategoryIcon && (
              <div className="mt-1">
                <CategoryIcon className="w-5 h-5 text-gray-600" />
              </div>
            )}
            <div className="flex-1">
              <CardTitle className="text-lg mb-2">{title}</CardTitle>
              <CardDescription className="text-sm">{description}</CardDescription>
            </div>
          </div>
          <Badge className={`${priorityConfig.bgColor} ${priorityConfig.color} border-0 flex items-center gap-1 whitespace-nowrap`}>
            <PriorityIcon className="w-3 h-3" />
            <span className="text-xs font-medium">{priorityConfig.label}</span>
          </Badge>
        </div>
      </CardHeader>
      
      {tips && (
        <CardContent>
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <p className="text-sm font-medium text-gray-700 mb-1">💡 Conseil d'implémentation</p>
            <p className="text-sm text-gray-600">{tips}</p>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default RecommendationCard;
