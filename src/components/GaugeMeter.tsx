import React from 'react';
import { 
  ExclamationTriangleIcon, 
  CheckCircleIcon,
  ChartBarIcon
} from '@heroicons/react/24/solid';

interface GaugeMeterProps {
  name: string;
  value: number;
  unit: string;
  status: 'normal' | 'warning' | 'critical' | 'optimal';
  min: number;
  max: number;
  type: 'circular' | 'linear';
}

export default function GaugeMeter({ 
  name, 
  value, 
  unit, 
  status, 
  min, 
  max, 
  type = 'circular' 
}: GaugeMeterProps) {
  // Calculate percentage for the gauge
  const percentage = ((value - min) / (max - min)) * 100;
  
  // Get color based on status
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical':
        return 'text-red-500';
      case 'warning':
        return 'text-yellow-500';
      case 'optimal':
        return 'text-green-500';
      default:
        return 'text-blue-500';
    }
  };
  
  // Get background color based on status
  const getStatusBgColor = (status: string) => {
    switch (status) {
      case 'critical':
        return 'bg-red-500';
      case 'warning':
        return 'bg-yellow-500';
      case 'optimal':
        return 'bg-green-500';
      default:
        return 'bg-blue-500';
    }
  };
  
  // Get icon based on status
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'critical':
        return <ExclamationTriangleIcon className="h-4 w-4 text-red-500" />;
      case 'warning':
        return <ExclamationTriangleIcon className="h-4 w-4 text-yellow-500" />;
      case 'optimal':
        return <CheckCircleIcon className="h-4 w-4 text-green-500" />;
      default:
        return <ChartBarIcon className="h-4 w-4 text-blue-500" />;
    }
  };
  
  // Render circular gauge
  const renderCircularGauge = () => {
    // Calculate the stroke-dasharray and stroke-dashoffset for the gauge
    const radius = 20;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = `${circumference} ${circumference}`;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;
    
    return (
      <div className="relative w-full h-full flex flex-col items-center justify-center">
        <div className="text-gray-300 text-xs mb-1">{name}</div>
        <div className="relative w-16 h-16">
          {/* Background circle */}
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="32"
              cy="32"
              r={radius}
              stroke="rgba(75, 85, 99, 0.3)"
              strokeWidth="4"
              fill="none"
            />
            {/* Gauge circle */}
            <circle
              cx="32"
              cy="32"
              r={radius}
              stroke={getStatusColor(status).replace('text-', '')}
              strokeWidth="4"
              fill="none"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-500 ease-out"
            />
          </svg>
          {/* Center value */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-white text-sm font-bold">{value}</span>
            <span className="text-gray-400 text-xs">{unit}</span>
          </div>
        </div>
        <div className="mt-1">
          {getStatusIcon(status)}
        </div>
      </div>
    );
  };
  
  // Render linear gauge
  const renderLinearGauge = () => {
    return (
      <div className="w-full h-full flex flex-col">
        <div className="flex justify-between items-center mb-1">
          <span className="text-gray-300 text-xs">{name}</span>
          {getStatusIcon(status)}
        </div>
        <div className="flex-grow flex flex-col justify-center">
          <div className="flex items-end mb-1">
            <span className="text-white text-sm font-bold">{value}</span>
            <span className="text-gray-400 ml-1 text-xs">{unit}</span>
          </div>
          <div className="h-2 bg-gray-600/50 rounded-full overflow-hidden">
            <div 
              className={`h-full ${getStatusBgColor(status)} transition-all duration-500 ease-out`}
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-0.5">
            <span className="text-gray-500 text-xs">{min}</span>
            <span className="text-gray-500 text-xs">{max}</span>
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="backdrop-blur-sm bg-gray-700/30 rounded-md p-2 border border-gray-600/30 hover:border-gray-500/50 transition-all duration-300 h-24">
      {type === 'circular' ? renderCircularGauge() : renderLinearGauge()}
    </div>
  );
} 