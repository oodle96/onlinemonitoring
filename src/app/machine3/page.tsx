"use client"

import { useEffect, useState } from 'react';
import { getMachineById } from '@/data/machines';
import MachineLayout from '@/components/MachineLayout';
import MachineDashboard from '@/components/MachineDashboard';

export default function Machine3Page() {
  const [machine, setMachine] = useState(getMachineById(3));

  if (!machine) {
    return <div>Machine not found</div>;
  }

  return (
    <MachineLayout currentMachine={machine}>
      <MachineDashboard machine={machine} />
    </MachineLayout>
  );
} 