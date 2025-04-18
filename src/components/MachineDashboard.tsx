"use client"

import Scene3D from '@/components/Scene3D';
import StatusPanel from '@/components/StatusPanel';
import AlertsPanel from '@/components/AlertsPanel';
import HistoryChart from '@/components/HistoryChart';
import InfoCard from '@/components/InfoCard';
import { Machine } from '@/data/machines';
import { useEffect, useState } from 'react';

interface MachineDashboardProps {
  machine: Machine;
}

export default function MachineDashboard({ machine }: MachineDashboardProps) {
  const [machineStatus, setMachineStatus] = useState(machine.status);

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

  return (
    <div className="h-full grid grid-cols-12 gap-4 p-4">
      {/* Left Panel - Status */}
      <div className="col-span-3 h-full">
        <StatusPanel machineId={machine.id} />
      </div>
      
      {/* Center Panel - 3D View */}
      <div className="col-span-6 h-full flex flex-col gap-4">
        <div className="h-1/2">
          <Scene3D machineId={machine.id} />
        </div>
        <div className="h-1/2">
          <HistoryChart machineId={machine.id} />
        </div>
      </div>
      
      {/* Right Panel - Alerts */}
      <div className="col-span-3 h-full flex flex-col gap-4">
        <div className="h-1/2">
          <AlertsPanel machineId={machine.id} />
        </div>
        <div className="h-1/2">
          <InfoCard machineId={machine.id} />
        </div>
      </div>
    </div>
  );
} 