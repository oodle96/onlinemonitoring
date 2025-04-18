import { useState, useEffect } from 'react';
import { 
  ClockIcon, 
  Cog6ToothIcon,
  PowerIcon,
  WrenchScrewdriverIcon
} from '@heroicons/react/24/solid';

type MachineStatus = 'on' | 'off' | 'maintenance';

export default function Taskbar() {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [machineStatus, setMachineStatus] = useState<MachineStatus>('on');
  
  // Update time every second
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Simulate machine status changes
  useEffect(() => {
    const interval = setInterval(() => {
      // 5% chance of changing status
      if (Math.random() < 0.05) {
        setMachineStatus(prevStatus => {
          if (prevStatus === 'on') return 'maintenance';
          if (prevStatus === 'maintenance') return 'off';
          return 'on';
        });
      }
    }, 30000); // Check every 30 seconds
    
    return () => clearInterval(interval);
  }, []);
  
  const getStatusColor = (status: MachineStatus) => {
    switch (status) {
      case 'on':
        return 'bg-green-500';
      case 'off':
        return 'bg-red-500';
      case 'maintenance':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };
  
  const getStatusText = (status: MachineStatus) => {
    switch (status) {
      case 'on':
        return 'Beroperasi';
      case 'off':
        return 'Mati';
      case 'maintenance':
        return 'Pemeliharaan';
      default:
        return status;
    }
  };
  
  const getStatusIcon = (status: MachineStatus) => {
    switch (status) {
      case 'on':
        return <PowerIcon className="h-4 w-4" />;
      case 'off':
        return <PowerIcon className="h-4 w-4" />;
      case 'maintenance':
        return <WrenchScrewdriverIcon className="h-4 w-4" />;
      default:
        return null;
    }
  };
  
  return (
    <div className="fixed bottom-0 left-0 right-0 h-12 backdrop-blur-md bg-gray-900/80 border-t border-gray-700/50 flex items-center justify-between px-4 z-50">
      {/* Left side - Time */}
      <div className="flex items-center text-gray-300">
        <ClockIcon className="h-4 w-4 mr-1" />
        <span className="text-sm">{currentTime}</span>
      </div>
      
      {/* Center - Machine name and status */}
      <div className="flex items-center">
        <div className="flex items-center bg-gray-800/50 rounded-md px-3 py-1.5 border border-gray-700/50">
          <span className="text-white font-medium mr-2">Mesin Kompresor #IDS-2023</span>
          <div className="flex items-center">
            <div className={`${getStatusColor(machineStatus)} w-2 h-2 rounded-full mr-1.5`}></div>
            <span className="text-xs text-gray-300">{getStatusText(machineStatus)}</span>
            <div className="ml-1.5 text-gray-400">
              {getStatusIcon(machineStatus)}
            </div>
          </div>
        </div>
      </div>
      
      {/* Right side - Settings */}
      <div className="flex items-center text-gray-300">
        <button className="p-1 hover:bg-gray-700/50 rounded-md transition-colors duration-200">
          <Cog6ToothIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
} 