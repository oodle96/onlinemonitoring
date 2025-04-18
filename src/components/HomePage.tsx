import { useState, useEffect } from 'react';
import { CogIcon, ChartBarIcon, ExclamationTriangleIcon, CheckCircleIcon } from '@heroicons/react/24/solid';
import { machines } from '@/data/machines';
import MachineCard from './MachineCard';

export default function HomePage() {
  const [currentTime, setCurrentTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  // Calculate summary statistics
  const totalMachines = machines.length;
  const operationalMachines = machines.filter(m => m.status === 'on').length;
  const maintenanceMachines = machines.filter(m => m.status === 'maintenance').length;
  const offlineMachines = machines.filter(m => m.status === 'off').length;
  
  return (
    <div className="h-screen w-screen overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900/20 to-gray-900 text-white relative">
      {/* Background grid effect */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
      
      {/* Header */}
      <header className="h-16 backdrop-blur-md bg-gray-800/30 border-b border-gray-700/50 flex items-center justify-between px-6 relative z-10">
        <div className="flex items-center">
          <CogIcon className="h-8 w-8 text-blue-400 mr-3" />
          <h1 className="text-xl font-bold">Online Monitoring</h1>
        </div>
        
        <div className="text-sm text-gray-300">
          Last updated: {currentTime.toLocaleTimeString()}
        </div>
      </header>
      
      {/* Main Content */}
      <main className="h-[calc(100vh-4rem)] p-6 relative z-10 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <h2 className="text-2xl font-bold mb-4 md:mb-0">Machine Overview</h2>
            
            {/* Summary statistics */}
            <div className="grid grid-cols-4 gap-4">
              <div className="backdrop-blur-md bg-gray-800/40 rounded-lg p-3 border border-gray-700/50">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Total</span>
                  <ChartBarIcon className="h-4 w-4 text-blue-400" />
                </div>
                <div className="text-xl font-bold mt-1">{totalMachines}</div>
              </div>
              
              <div className="backdrop-blur-md bg-gray-800/40 rounded-lg p-3 border border-gray-700/50">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Operational</span>
                  <CheckCircleIcon className="h-4 w-4 text-green-400" />
                </div>
                <div className="text-xl font-bold mt-1">{operationalMachines}</div>
              </div>
              
              <div className="backdrop-blur-md bg-gray-800/40 rounded-lg p-3 border border-gray-700/50">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Maintenance</span>
                  <CogIcon className="h-4 w-4 text-yellow-400" />
                </div>
                <div className="text-xl font-bold mt-1">{maintenanceMachines}</div>
              </div>
              
              <div className="backdrop-blur-md bg-gray-800/40 rounded-lg p-3 border border-gray-700/50">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Offline</span>
                  <ExclamationTriangleIcon className="h-4 w-4 text-red-400" />
                </div>
                <div className="text-xl font-bold mt-1">{offlineMachines}</div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {machines.map(machine => (
              <MachineCard key={machine.id} machine={machine} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
} 