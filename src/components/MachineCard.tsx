import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Machine, getStatusColor, getStatusText } from '@/data/machines';
import { ExclamationTriangleIcon, BoltIcon, WrenchScrewdriverIcon, ClockIcon } from '@heroicons/react/24/solid';

interface Alert {
  id: number;
  message: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: Date;
  details: string;
  affectedPart: string;
  status: 'new' | 'acknowledged' | 'in-progress' | 'resolved';
}

interface MachineMetric {
  name: string;
  value: number;
  unit: string;
  status: 'normal' | 'warning' | 'critical' | 'optimal';
}

interface MachineCardProps {
  machine: Machine;
}

export default function MachineCard({ machine }: MachineCardProps) {
  const [topAlert, setTopAlert] = useState<Alert | null>(null);
  const [metrics, setMetrics] = useState<MachineMetric[]>([]);
  
  // Generate a random alert for this machine
  useEffect(() => {
    const alerts: Alert[] = [
      {
        id: 1,
        message: 'Tekanan mendekati ambang batas kritis',
        severity: 'high',
        timestamp: new Date(Date.now() - 1000 * 60 * 5),
        details: 'Sistem mendeteksi tekanan udara yang mendekati batas maksimum yang diizinkan.',
        affectedPart: 'Sistem tekanan udara',
        status: 'new'
      },
      {
        id: 2,
        message: 'Level oli di bawah tingkat yang direkomendasikan',
        severity: 'medium',
        timestamp: new Date(Date.now() - 1000 * 60 * 15),
        details: 'Level oli pada sistem pelumasan telah turun di bawah tingkat yang direkomendasikan.',
        affectedPart: 'Sistem pelumasan',
        status: 'acknowledged'
      },
      {
        id: 3,
        message: 'Pemeliharaan terjadwal dalam 3 hari',
        severity: 'low',
        timestamp: new Date(Date.now() - 1000 * 60 * 60),
        details: 'Pemeliharaan rutin terjadwal akan dilakukan dalam 3 hari.',
        affectedPart: 'Semua sistem',
        status: 'acknowledged'
      }
    ];
    
    // Select a random alert for this machine
    const randomIndex = Math.floor(Math.random() * alerts.length);
    setTopAlert(alerts[randomIndex]);
    
    // Generate random metrics for this machine
    const randomMetrics: MachineMetric[] = [
      { 
        name: 'Temperature', 
        value: 70 + Math.floor(Math.random() * 20), 
        unit: '°C', 
        status: Math.random() > 0.7 ? 'warning' : 'normal'
      },
      { 
        name: 'Pressure', 
        value: 2 + Math.floor(Math.random() * 10) / 10, 
        unit: 'bar', 
        status: Math.random() > 0.8 ? 'warning' : 'normal'
      },
      { 
        name: 'Power', 
        value: 80 + Math.floor(Math.random() * 20), 
        unit: '%', 
        status: Math.random() > 0.9 ? 'optimal' : 'normal'
      }
    ];
    
    setMetrics(randomMetrics);
  }, []);
  
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-500';
      case 'high':
        return 'bg-orange-500';
      case 'medium':
        return 'bg-yellow-500';
      default:
        return 'bg-blue-500';
    }
  };
  
  const getMetricStatusColor = (status: string) => {
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
  
  const formatTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    
    if (seconds < 60) {
      return `${seconds} detik yang lalu`;
    } else if (seconds < 3600) {
      const minutes = Math.floor(seconds / 60);
      return `${minutes} menit yang lalu`;
    } else if (seconds < 86400) {
      const hours = Math.floor(seconds / 3600);
      return `${hours} jam yang lalu`;
    } else {
      const days = Math.floor(seconds / 86400);
      return `${days} hari yang lalu`;
    }
  };
  
  return (
    <Link href={`/machine${machine.id}`} className="block">
      <div className="backdrop-blur-md bg-gray-800/40 rounded-lg p-4 shadow-lg border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 h-full flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold text-white">{machine.name}</h3>
          <div className="flex items-center">
            <div className={`${getStatusColor(machine.status)} w-2 h-2 rounded-full mr-1.5`}></div>
            <span className="text-xs text-gray-300">{getStatusText(machine.status)}</span>
          </div>
        </div>
        
        <div className="mb-4 h-40 bg-gray-900/50 rounded-md flex items-center justify-center overflow-hidden">
          <div className={`w-32 h-32 rounded-full ${getStatusColor(machine.status)} bg-opacity-20 flex items-center justify-center`}>
            <div className={`w-24 h-24 rounded-full ${getStatusColor(machine.status)} bg-opacity-30 flex items-center justify-center`}>
              <div className={`w-16 h-16 rounded-full ${getStatusColor(machine.status)} bg-opacity-40 flex items-center justify-center`}>
                <div className={`w-8 h-8 rounded-full ${getStatusColor(machine.status)}`}></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-3">
          <p className="text-sm text-gray-300">{machine.description}</p>
        </div>
        
        {/* Machine metrics */}
        <div className="mb-3 grid grid-cols-3 gap-2">
          {metrics.map((metric, index) => (
            <div key={index} className="bg-gray-900/30 rounded-md p-2 text-center">
              <div className="flex items-center justify-center mb-1">
                <div className={`${getMetricStatusColor(metric.status)} w-2 h-2 rounded-full mr-1`}></div>
                <span className="text-xs text-gray-400">{metric.name}</span>
              </div>
              <div className="text-white font-medium">
                {metric.value}{metric.unit}
              </div>
            </div>
          ))}
        </div>
        
        {/* Maintenance info */}
        <div className="mb-3 flex items-center text-xs text-gray-400">
          <WrenchScrewdriverIcon className="h-3 w-3 mr-1" />
          <span>Next maintenance: {machine.nextMaintenance}</span>
        </div>
        
        {topAlert && (
          <div className={`${getSeverityColor(topAlert.severity)} bg-opacity-10 backdrop-blur-sm rounded-md p-2 border border-${getSeverityColor(topAlert.severity).replace('bg-', '')}/30`}>
            <div className="flex items-start">
              <ExclamationTriangleIcon className={`h-4 w-4 mr-1 ${getSeverityColor(topAlert.severity)}`} />
              <div>
                <p className="text-white font-medium text-xs">{topAlert.message}</p>
                <span className="text-gray-400 text-xs">{formatTimeAgo(topAlert.timestamp)}</span>
              </div>
            </div>
          </div>
        )}
        
        <div className="mt-auto pt-3 text-right">
          <span className="text-blue-400 text-sm">Lihat detail →</span>
        </div>
      </div>
    </Link>
  );
} 