"use client"

import { useEffect, useState } from 'react';
import { getMachineById } from '@/data/machines';
import MachineLayout from '@/components/MachineLayout';
import MachineDashboard from '@/components/MachineDashboard';

export default function Machine2Page() {
  const [machine, setMachine] = useState(getMachineById(2));

  if (!machine) {
    return <div>Machine not found</div>;
  }

  return (
    <MachineLayout currentMachine={machine}>
      <MachineDashboard machine={machine} />
    </MachineLayout>
  );
} 