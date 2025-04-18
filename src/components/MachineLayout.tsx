"use client"

import { CogIcon, PowerIcon, WrenchScrewdriverIcon, ChevronLeftIcon, ChevronRightIcon, HomeIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Machine, getStatusColor, getStatusText } from '@/data/machines';

interface MachineLayoutProps {
  children: React.ReactNode;
  currentMachine: Machine;
}

export default function MachineLayout({ children, currentMachine }: MachineLayoutProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const pathname = usePathname();
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getStatusIcon = (status: string) => {
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

  const getMachinePath = (machineId: number) => {
    return `/machine${machineId}`;
  };

  const getPrevMachinePath = () => {
    const currentId = currentMachine.id;
    const prevId = currentId === 1 ? 3 : currentId - 1;
    return getMachinePath(prevId);
  };

  const getNextMachinePath = () => {
    const currentId = currentMachine.id;
    const nextId = currentId === 3 ? 1 : currentId + 1;
    return getMachinePath(nextId);
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900/20 to-gray-900 text-white relative">
      {/* Background grid effect */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
      
      {/* Header */}
      <header className="h-16 backdrop-blur-md bg-gray-800/30 border-b border-gray-700/50 flex items-center justify-between px-6 relative z-10">
        <div className="flex items-center">
          <Link href="/" className="mr-4 p-1 rounded-full hover:bg-gray-700/50 transition-colors duration-200" aria-label="Home">
            <HomeIcon className="h-5 w-5 text-blue-400 hover:text-white" />
          </Link>
          <CogIcon className="h-8 w-8 text-blue-400 mr-3" />
          <h1 className="text-xl font-bold">Machine Monitor Dashboard</h1>
        </div>
        
        {/* Center - Machine name and status with navigation arrows */}
        <div className="flex items-center">
          <Link 
            href={getPrevMachinePath()}
            className="p-1 rounded-full hover:bg-gray-700/50 transition-colors duration-200 mr-2"
            aria-label="Previous machine"
          >
            <ChevronLeftIcon className="h-5 w-5 text-gray-400 hover:text-white" />
          </Link>
          
          <div className="flex items-center bg-gray-800/50 rounded-md px-3 py-1.5 border border-gray-700/50">
            <span className="text-white font-medium mr-2">{currentMachine.name}</span>
            <div className="flex items-center">
              <div className={`${getStatusColor(currentMachine.status)} w-2 h-2 rounded-full mr-1.5`}></div>
              <span className="text-xs text-gray-300">{getStatusText(currentMachine.status)}</span>
              <div className="ml-1.5 text-gray-400">
                {getStatusIcon(currentMachine.status)}
              </div>
            </div>
          </div>
          
          <Link 
            href={getNextMachinePath()}
            className="p-1 rounded-full hover:bg-gray-700/50 transition-colors duration-200 ml-2"
            aria-label="Next machine"
          >
            <ChevronRightIcon className="h-5 w-5 text-gray-400 hover:text-white" />
          </Link>
        </div>
        
        <div className="text-sm text-gray-300">
          Last updated: {currentTime.toLocaleTimeString()}
        </div>
      </header>
      
      {/* Main Content */}
      <main className="h-[calc(100vh-4rem)] p-6 relative z-10 overflow-y-auto">
        {children}
      </main>
    </div>
  );
} 