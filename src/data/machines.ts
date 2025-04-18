export type MachineStatus = 'on' | 'off' | 'maintenance';

export interface Machine {
  id: number;
  name: string;
  status: MachineStatus;
  description: string;
  lastMaintenance: string;
  nextMaintenance: string;
  location: string;
  manufacturer: string;
  model: string;
  serialNumber: string;
  installationDate: string;
}

export const machines: Machine[] = [
  {
    id: 1,
    name: 'Mesin Blower #IDS-2023',
    status: 'on',
    description: 'Kompresor udara bertekanan tinggi untuk proses produksi',
    lastMaintenance: '2023-12-15',
    nextMaintenance: '2024-06-15',
    location: 'Gedung A, Lantai 2',
    manufacturer: 'Atlas Copco',
    model: 'GA 75 VSD+',
    serialNumber: 'AC-2023-075',
    installationDate: '2023-01-10'
  },
  {
    id: 2,
    name: 'Mesin Blower #IDS-2024',
    status: 'maintenance',
    description: 'Kompresor udara bertekanan menengah untuk area produksi B',
    lastMaintenance: '2024-02-20',
    nextMaintenance: '2024-08-20',
    location: 'Gedung B, Lantai 1',
    manufacturer: 'Ingersoll Rand',
    model: 'Nirvana NV 90',
    serialNumber: 'IR-2024-090',
    installationDate: '2024-01-05'
  },
  {
    id: 3,
    name: 'Mesin Blower #IDS-2025',
    status: 'off',
    description: 'Kompresor udara bertekanan rendah untuk area packaging',
    lastMaintenance: '2024-03-10',
    nextMaintenance: '2024-09-10',
    location: 'Gedung C, Lantai 3',
    manufacturer: 'Kaeser',
    model: 'Sigma Control 2.0',
    serialNumber: 'KS-2025-110',
    installationDate: '2024-02-15'
  }
];

export const getMachineById = (id: number): Machine | undefined => {
  return machines.find(machine => machine.id === id);
};

export const getStatusColor = (status: MachineStatus) => {
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

export const getStatusText = (status: MachineStatus) => {
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

export const getNextStatus = (currentStatus: MachineStatus): MachineStatus => {
  if (currentStatus === 'on') return 'maintenance';
  if (currentStatus === 'maintenance') return 'off';
  return 'on';
}; 