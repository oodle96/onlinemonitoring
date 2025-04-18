import { useState, useEffect } from 'react';
import { 
  BoltIcon
} from '@heroicons/react/24/solid';
import GaugeMeter from './GaugeMeter';

interface MachineMetric {
  name: string;
  value: number;
  unit: string;
  status: 'normal' | 'warning' | 'critical' | 'optimal';
  min: number;
  max: number;
  type: 'circular' | 'linear';
}

interface StatusPanelProps {
  machineId?: number;
}

export default function StatusPanel({ machineId = 1 }: StatusPanelProps) {
  const [metrics, setMetrics] = useState<MachineMetric[]>([
    { 
      name: 'Temperature', 
      value: 72, 
      unit: '°C', 
      status: 'normal',
      min: 60,
      max: 90,
      type: 'linear'
    },
    { 
      name: 'Pressure', 
      value: 2.4, 
      unit: 'bar', 
      status: 'warning',
      min: 1.5,
      max: 3.5,
      type: 'linear'
    },
    { 
      name: 'Power', 
      value: 85, 
      unit: '%', 
      status: 'optimal',
      min: 0,
      max: 100,
      type: 'linear'
    },
    { 
      name: 'Vibration', 
      value: 0.8, 
      unit: 'g', 
      status: 'normal',
      min: 0,
      max: 1.5,
      type: 'linear'
    },
    { 
      name: 'Oil Level', 
      value: 65, 
      unit: '%', 
      status: 'warning',
      min: 0,
      max: 100,
      type: 'linear'
    },
    { 
      name: 'Efficiency', 
      value: 92, 
      unit: '%', 
      status: 'optimal',
      min: 0,
      max: 100,
      type: 'linear'
    },
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prevMetrics => 
        prevMetrics.map(metric => {
          // Add small random variations to simulate real-time data
          const variation = (Math.random() - 0.5) * 5;
          let newValue = metric.value + variation;
          
          // Keep values within reasonable ranges
          if (metric.name === 'Temperature') {
            newValue = Math.max(60, Math.min(90, newValue));
          } else if (metric.name === 'Pressure') {
            newValue = Math.max(1.5, Math.min(3.5, newValue));
          } else if (metric.name === 'Power') {
            newValue = Math.max(70, Math.min(100, newValue));
          } else if (metric.name === 'Vibration') {
            newValue = Math.max(0.1, Math.min(1.5, newValue));
          } else if (metric.name === 'Oil Level') {
            newValue = Math.max(30, Math.min(100, newValue));
          } else if (metric.name === 'Efficiency') {
            newValue = Math.max(80, Math.min(100, newValue));
          }
          
          // Update status based on new value
          let status = metric.status;
          if (metric.name === 'Temperature') {
            status = newValue > 85 ? 'critical' : newValue > 75 ? 'warning' : 'normal';
          } else if (metric.name === 'Pressure') {
            status = newValue > 3.0 ? 'critical' : newValue > 2.5 ? 'warning' : 'normal';
          } else if (metric.name === 'Power') {
            status = newValue > 95 ? 'warning' : newValue > 80 ? 'optimal' : 'normal';
          } else if (metric.name === 'Vibration') {
            status = newValue > 1.2 ? 'critical' : newValue > 0.9 ? 'warning' : 'normal';
          } else if (metric.name === 'Oil Level') {
            status = newValue < 40 ? 'critical' : newValue < 60 ? 'warning' : 'normal';
          } else if (metric.name === 'Efficiency') {
            status = newValue > 90 ? 'optimal' : newValue > 80 ? 'normal' : 'warning';
          }
          
          return {
            ...metric,
            value: parseFloat(newValue.toFixed(1)),
            status
          };
        })
      );
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="backdrop-blur-md bg-gray-800/40 rounded-lg p-2 shadow-lg border border-gray-700/50 h-full flex flex-col overflow-hidden">
      <h2 className="text-base font-bold text-white mb-2 flex items-center">
        <BoltIcon className="h-4 w-4 mr-1 text-yellow-400" />
        Machine Status
      </h2>
      <div className="grid grid-cols-2 gap-2 overflow-y-auto">
        {metrics.map((metric, index) => (
          <GaugeMeter
            key={index}
            name={metric.name}
            value={metric.value}
            unit={metric.unit}
            status={metric.status}
            min={metric.min}
            max={metric.max}
            type="linear"
          />
        ))}
      </div>
    </div>
  );
} 