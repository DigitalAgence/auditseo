
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { getScoreStatus } from '@/services/AuditService.js';

const ScoreCard = ({ score, category, size = 'default' }) => {
  const status = getScoreStatus(score);
  const isLarge = size === 'large';
  
  // Calculate circle properties
  const radius = isLarge ? 70 : 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;
  
  // Determine stroke color based on score
  const getStrokeColor = () => {
    if (score >= 90) return '#16a34a'; // green-600
    if (score >= 70) return '#2563eb'; // blue-600
    if (score >= 50) return '#ca8a04'; // yellow-600
    return '#dc2626'; // red-600
  };
  
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <CardContent className={`flex flex-col items-center justify-center ${isLarge ? 'p-8' : 'p-6'}`}>
        {/* Circular Progress Indicator */}
        <div className="relative mb-4">
          <svg
            className="transform -rotate-90"
            width={isLarge ? 160 : 110}
            height={isLarge ? 160 : 110}
          >
            {/* Background circle */}
            <circle
              cx={isLarge ? 80 : 55}
              cy={isLarge ? 80 : 55}
              r={radius}
              stroke="#e5e7eb"
              strokeWidth={isLarge ? 12 : 8}
              fill="none"
            />
            {/* Progress circle */}
            <circle
              cx={isLarge ? 80 : 55}
              cy={isLarge ? 80 : 55}
              r={radius}
              stroke={getStrokeColor()}
              strokeWidth={isLarge ? 12 : 8}
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          {/* Score number */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`font-bold ${isLarge ? 'text-4xl' : 'text-2xl'} ${status.color}`}>
              {score}
            </span>
          </div>
        </div>
        
        {/* Category name */}
        {category && (
          <h3 className={`font-semibold text-center mb-2 ${isLarge ? 'text-xl' : 'text-base'}`}>
            {category}
          </h3>
        )}
        
        {/* Status badge */}
        <div className={`px-3 py-1 rounded-full ${status.bgColor} ${status.color} text-sm font-medium`}>
          {status.label}
        </div>
      </CardContent>
    </Card>
  );
};

export default ScoreCard;
