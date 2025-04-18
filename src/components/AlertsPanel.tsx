import { useState, useEffect } from 'react';
import { 
  ExclamationTriangleIcon, 
  BellIcon,
  XMarkIcon,
  CheckCircleIcon,
  InformationCircleIcon
} from '@heroicons/react/24/solid';

interface Alert {
  id: number;
  message: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: Date;
  details: string;
  affectedPart: string;
  status: 'new' | 'acknowledged' | 'in-progress' | 'resolved';
}

interface AlertsPanelProps {
  machineId?: number;
}

export default function AlertsPanel({ machineId = 1 }: AlertsPanelProps) {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: 1,
      message: 'Tekanan mendekati ambang batas kritis',
      severity: 'high',
      timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
      details: 'Sistem mendeteksi tekanan udara yang mendekati batas maksimum yang diizinkan. Jika tekanan terus meningkat, sistem akan otomatis menghentikan operasi untuk mencegah kerusakan pada komponen.',
      affectedPart: 'Sistem tekanan udara',
      status: 'new'
    },
    {
      id: 2,
      message: 'Level oli di bawah tingkat yang direkomendasikan',
      severity: 'medium',
      timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
      details: 'Level oli pada sistem pelumasan telah turun di bawah tingkat yang direkomendasikan. Hal ini dapat menyebabkan peningkatan gesekan dan keausan pada komponen yang bergerak.',
      affectedPart: 'Sistem pelumasan',
      status: 'acknowledged'
    },
    {
      id: 3,
      message: 'Pemeliharaan terjadwal dalam 3 hari',
      severity: 'low',
      timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
      details: 'Pemeliharaan rutin terjadwal akan dilakukan dalam 3 hari. Tim teknisi dari PT Intidaya Dinamika Sejati akan melakukan pemeriksaan menyeluruh dan penggantian komponen yang diperlukan.',
      affectedPart: 'Semua sistem',
      status: 'acknowledged'
    },
    {
      id: 4,
      message: 'Fluktuasi suhu terdeteksi',
      severity: 'medium',
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      details: 'Sistem mendeteksi fluktuasi suhu yang tidak normal pada komponen utama. Fluktuasi ini dapat disebabkan oleh beban kerja yang berlebihan atau masalah pada sistem pendingin.',
      affectedPart: 'Sistem pendingin',
      status: 'in-progress'
    },
    {
      id: 5,
      message: 'Level getaran di atas normal',
      severity: 'high',
      timestamp: new Date(Date.now() - 1000 * 60 * 45), // 45 minutes ago
      details: 'Level getaran pada impeller telah melebihi batas normal. Hal ini dapat disebabkan oleh ketidakseimbangan pada impeller atau masalah pada bantalan. Pemeriksaan segera diperlukan.',
      affectedPart: 'Impeller dan bantalan',
      status: 'in-progress'
    },
    {
      id: 6,
      message: 'Konsumsi daya meningkat secara signifikan',
      severity: 'medium',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      details: 'Sistem mendeteksi peningkatan konsumsi daya yang signifikan. Hal ini dapat disebabkan oleh peningkatan beban kerja atau inefisiensi pada sistem. Pemeriksaan efisiensi diperlukan.',
      affectedPart: 'Sistem tenaga',
      status: 'acknowledged'
    },
    {
      id: 7,
      message: 'Keausan komponen terdeteksi',
      severity: 'high',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
      details: 'Sistem mendeteksi keausan yang tidak normal pada beberapa komponen. Keausan ini dapat disebabkan oleh penggunaan yang intensif atau masalah pada sistem pelumasan. Penggantian komponen mungkin diperlukan.',
      affectedPart: 'Komponen mekanis',
      status: 'in-progress'
    },
    {
      id: 8,
      message: 'Efisiensi sistem menurun',
      severity: 'medium',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
      details: 'Efisiensi sistem telah menurun secara bertahap selama beberapa hari terakhir. Hal ini dapat disebabkan oleh berbagai faktor termasuk keausan komponen, masalah pada sistem kontrol, atau perubahan kondisi operasi.',
      affectedPart: 'Sistem kontrol',
      status: 'acknowledged'
    },
    {
      id: 9,
      message: 'Koneksi ke sensor hilang',
      severity: 'critical',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
      details: 'Koneksi ke beberapa sensor telah terputus. Hal ini dapat menyebabkan hilangnya data monitoring dan potensi masalah keamanan. Pemeriksaan koneksi dan sensor diperlukan segera.',
      affectedPart: 'Sistem sensor',
      status: 'in-progress'
    },
    {
      id: 10,
      message: 'Kalibrasi diperlukan',
      severity: 'low',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
      details: 'Beberapa sensor memerlukan kalibrasi ulang untuk memastikan akurasi pengukuran. Kalibrasi rutin diperlukan untuk menjaga kinerja optimal sistem monitoring.',
      affectedPart: 'Sistem sensor',
      status: 'acknowledged'
    },
    {
      id: 11,
      message: 'Penggantian filter direkomendasikan',
      severity: 'medium',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 7), // 7 hours ago
      details: 'Filter udara telah mencapai akhir masa pakainya dan perlu diganti. Penggantian filter secara teratur diperlukan untuk menjaga kualitas udara dan efisiensi sistem.',
      affectedPart: 'Sistem filter',
      status: 'acknowledged'
    },
    {
      id: 12,
      message: 'Peningkatan kebisingan terdeteksi',
      severity: 'medium',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8), // 8 hours ago
      details: 'Sistem mendeteksi peningkatan level kebisingan yang tidak normal. Hal ini dapat disebabkan oleh masalah pada impeller, bantalan, atau komponen lain yang bergerak. Pemeriksaan akustik diperlukan.',
      affectedPart: 'Sistem impeller',
      status: 'new'
    }
  ]);

  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  // Simulate new alerts
  useEffect(() => {
    const interval = setInterval(() => {
      // 10% chance of generating a new alert
      if (Math.random() < 0.1) {
        const newAlert: Alert = {
          id: Date.now(),
          message: getRandomAlertMessage(),
          severity: getRandomSeverity(),
          timestamp: new Date(),
          details: getRandomAlertDetails(),
          affectedPart: getRandomAffectedPart(),
          status: 'new'
        };
        
        setAlerts(prevAlerts => [newAlert, ...prevAlerts].slice(0, 15));
      }
    }, 10000); // Check every 10 seconds
    
    return () => clearInterval(interval);
  }, []);

  const getRandomAlertMessage = () => {
    const messages = [
      'Fluktuasi suhu terdeteksi',
      'Level getaran di atas normal',
      'Konsumsi daya meningkat secara signifikan',
      'Keausan komponen terdeteksi',
      'Efisiensi sistem menurun',
      'Koneksi ke sensor hilang',
      'Kalibrasi diperlukan',
      'Penggantian filter direkomendasikan',
      'Peningkatan kebisingan terdeteksi',
      'Tekanan mendekati ambang batas kritis',
      'Level oli di bawah tingkat yang direkomendasikan',
      'Pemeliharaan terjadwal dalam 3 hari'
    ];
    
    return messages[Math.floor(Math.random() * messages.length)];
  };

  const getRandomAlertDetails = () => {
    const details = [
      'Sistem mendeteksi fluktuasi suhu yang tidak normal pada komponen utama. Fluktuasi ini dapat disebabkan oleh beban kerja yang berlebihan atau masalah pada sistem pendingin.',
      'Level getaran pada impeller telah melebihi batas normal. Hal ini dapat disebabkan oleh ketidakseimbangan pada impeller atau masalah pada bantalan. Pemeriksaan segera diperlukan.',
      'Sistem mendeteksi peningkatan konsumsi daya yang signifikan. Hal ini dapat disebabkan oleh peningkatan beban kerja atau inefisiensi pada sistem. Pemeriksaan efisiensi diperlukan.',
      'Sistem mendeteksi keausan yang tidak normal pada beberapa komponen. Keausan ini dapat disebabkan oleh penggunaan yang intensif atau masalah pada sistem pelumasan. Penggantian komponen mungkin diperlukan.',
      'Efisiensi sistem telah menurun secara bertahap selama beberapa hari terakhir. Hal ini dapat disebabkan oleh berbagai faktor termasuk keausan komponen, masalah pada sistem kontrol, atau perubahan kondisi operasi.',
      'Koneksi ke beberapa sensor telah terputus. Hal ini dapat menyebabkan hilangnya data monitoring dan potensi masalah keamanan. Pemeriksaan koneksi dan sensor diperlukan segera.',
      'Beberapa sensor memerlukan kalibrasi ulang untuk memastikan akurasi pengukuran. Kalibrasi rutin diperlukan untuk menjaga kinerja optimal sistem monitoring.',
      'Filter udara telah mencapai akhir masa pakainya dan perlu diganti. Penggantian filter secara teratur diperlukan untuk menjaga kualitas udara dan efisiensi sistem.',
      'Sistem mendeteksi peningkatan level kebisingan yang tidak normal. Hal ini dapat disebabkan oleh masalah pada impeller, bantalan, atau komponen lain yang bergerak. Pemeriksaan akustik diperlukan.',
      'Sistem mendeteksi tekanan udara yang mendekati batas maksimum yang diizinkan. Jika tekanan terus meningkat, sistem akan otomatis menghentikan operasi untuk mencegah kerusakan pada komponen.',
      'Level oli pada sistem pelumasan telah turun di bawah tingkat yang direkomendasikan. Hal ini dapat menyebabkan peningkatan gesekan dan keausan pada komponen yang bergerak.',
      'Pemeliharaan rutin terjadwal akan dilakukan dalam 3 hari. Tim teknisi dari PT Intidaya Dinamika Sejati akan melakukan pemeriksaan menyeluruh dan penggantian komponen yang diperlukan.'
    ];
    
    return details[Math.floor(Math.random() * details.length)];
  };

  const getRandomAffectedPart = () => {
    const parts = [
      'Sistem pendingin',
      'Impeller dan bantalan',
      'Sistem tenaga',
      'Komponen mekanis',
      'Sistem kontrol',
      'Sistem sensor',
      'Sistem filter',
      'Sistem tekanan udara',
      'Sistem pelumasan',
      'Semua sistem'
    ];
    
    return parts[Math.floor(Math.random() * parts.length)];
  };

  const getRandomSeverity = (): 'low' | 'medium' | 'high' | 'critical' => {
    const severities = ['low', 'medium', 'high', 'critical'] as const;
    const weights = [0.4, 0.3, 0.2, 0.1]; // Probabilities for each severity
    
    const random = Math.random();
    let sum = 0;
    
    for (let i = 0; i < weights.length; i++) {
      sum += weights[i];
      if (random < sum) {
        return severities[i];
      }
    }
    
    return 'low';
  };

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-500';
      case 'acknowledged':
        return 'bg-yellow-500';
      case 'in-progress':
        return 'bg-orange-500';
      case 'resolved':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'new':
        return 'Baru';
      case 'acknowledged':
        return 'Dikonfirmasi';
      case 'in-progress':
        return 'Dalam Proses';
      case 'resolved':
        return 'Selesai';
      default:
        return status;
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

  const dismissAlert = (id: number) => {
    setAlerts(prevAlerts => prevAlerts.filter(alert => alert.id !== id));
  };

  const handleAlertClick = (alert: Alert) => {
    setSelectedAlert(alert);
    setShowDetailModal(true);
  };

  const closeDetailModal = () => {
    setShowDetailModal(false);
    setSelectedAlert(null);
  };

  return (
    <>
      <div className="backdrop-blur-md bg-gray-800/40 rounded-lg p-3 shadow-lg border border-gray-700/50 h-full flex flex-col overflow-hidden">
        <h2 className="text-lg font-bold text-white mb-2 flex items-center">
          <BellIcon className="h-5 w-5 mr-2 text-yellow-400" />
          Alerts
        </h2>
        
        {alerts.length === 0 ? (
          <div className="text-gray-400 text-center py-2 text-sm">
            Tidak ada alert aktif
          </div>
        ) : (
          <div className="space-y-2 overflow-y-auto flex-grow pr-1">
            {alerts.map(alert => (
              <div 
                key={alert.id} 
                className={`${getSeverityColor(alert.severity)} bg-opacity-10 backdrop-blur-sm rounded-md p-2 relative border border-${getSeverityColor(alert.severity).replace('bg-', '')}/30 hover:border-${getSeverityColor(alert.severity).replace('bg-', '')}/50 transition-all duration-300 cursor-pointer`}
                onClick={() => handleAlertClick(alert)}
              >
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    dismissAlert(alert.id);
                  }}
                  className="absolute top-1 right-1 text-gray-400 hover:text-white"
                >
                  <XMarkIcon className="h-3 w-3" />
                </button>
                
                <div className="flex items-start">
                  <ExclamationTriangleIcon className={`h-4 w-4 mr-1 ${getSeverityColor(alert.severity)}`} />
                  <div>
                    <p className="text-white font-medium text-xs">{alert.message}</p>
                    <div className="flex items-center mt-0.5">
                      <span className="text-gray-400 text-xs">{formatTimeAgo(alert.timestamp)}</span>
                      <span className={`ml-2 px-1.5 py-0.5 rounded-full text-xs ${getStatusColor(alert.status)} bg-opacity-20`}>
                        {getStatusText(alert.status)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Alert Detail Modal */}
      {showDetailModal && selectedAlert && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="backdrop-blur-md bg-gray-800/80 rounded-lg p-4 shadow-xl border border-gray-700/50 max-w-md w-full">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-lg font-bold text-white flex items-center">
                <ExclamationTriangleIcon className={`h-5 w-5 mr-2 ${getSeverityColor(selectedAlert.severity)}`} />
                Detail Alert
              </h3>
              <button 
                onClick={closeDetailModal}
                className="text-gray-400 hover:text-white"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
            
            <div className="mb-4">
              <h4 className="text-white font-medium mb-1">{selectedAlert.message}</h4>
              <div className="flex items-center mb-2">
                <span className="text-gray-400 text-sm">{formatTimeAgo(selectedAlert.timestamp)}</span>
                <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${getStatusColor(selectedAlert.status)} bg-opacity-20`}>
                  {getStatusText(selectedAlert.status)}
                </span>
                <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${getSeverityColor(selectedAlert.severity)} bg-opacity-20`}>
                  {selectedAlert.severity === 'critical' ? 'Kritis' : 
                   selectedAlert.severity === 'high' ? 'Tinggi' : 
                   selectedAlert.severity === 'medium' ? 'Sedang' : 'Rendah'}
                </span>
              </div>
            </div>
            
            <div className="mb-4">
              <h5 className="text-blue-400 font-medium mb-1">Detail Masalah:</h5>
              <p className="text-gray-300 text-sm">{selectedAlert.details}</p>
            </div>
            
            <div className="mb-4">
              <h5 className="text-blue-400 font-medium mb-1">Bagian Terpengaruh:</h5>
              <p className="text-gray-300 text-sm">{selectedAlert.affectedPart}</p>
            </div>
            
            <div className="mb-4 p-3 bg-blue-900/20 rounded-md border border-blue-700/30">
              <div className="flex items-start">
                <InformationCircleIcon className="h-5 w-5 text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white text-sm">
                    Pesan alert ini telah dikirimkan ke PT Intidaya Dinamika Sejati. Tim teknisi akan segera melakukan pemeriksaan dan tindakan yang diperlukan.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <button 
                onClick={closeDetailModal}
                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm transition-colors duration-200"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 