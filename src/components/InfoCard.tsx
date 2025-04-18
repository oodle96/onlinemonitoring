import { useState, useEffect } from 'react';
import { InformationCircleIcon } from '@heroicons/react/24/solid';

// Information slides in Indonesian
const infoSlides = [
  {
    title: "Tentang Mesin",
    content: "Blower Set Pedrogil adalah peralatan industri yang dirancang untuk menghasilkan aliran udara bertekanan tinggi. Mesin ini diproduksi oleh PT Intidaya Dinamika Sejati dengan standar kualitas internasional. Kapasitas maksimum mesin adalah 5000 m³/h dengan tekanan hingga 1000 mbar."
  },
  {
    title: "Cara Kerja",
    content: "Mesin ini menggunakan prinsip kerja impeller berputar yang menghasilkan tekanan udara. Motor listrik menggerakkan impeller dengan kecepatan hingga 3000 RPM. Sistem kontrol digital memastikan operasi yang stabil dan efisien. Sensor tekanan dan suhu terintegrasi memantau kinerja mesin secara real-time."
  },
  {
    title: "Pemeliharaan",
    content: "Lakukan pemeriksaan rutin setiap 500 jam operasi. Ganti filter udara setiap 1000 jam. Periksa level oli setiap 200 jam. Bersihkan impeller dari debu setiap 3 bulan. Kalibrasi sensor setiap 6 bulan. Jadwalkan pemeliharaan menyeluruh setiap tahun oleh teknisi terlatih."
  },
  {
    title: "Spesifikasi Teknis",
    content: "Dimensi: 2.5m x 1.8m x 1.5m. Berat: 850 kg. Konsumsi daya: 75 kW. Tegangan operasi: 380V/3 fase. Kebisingan maksimum: 85 dB. Bahan konstruksi: Stainless steel 316L untuk komponen kontak dengan udara."
  },
  {
    title: "Troubleshooting",
    content: "Jika tekanan udara menurun, periksa filter udara dan kebocoran pada sistem. Jika suhu mesin meningkat, periksa pendingin dan level oli. Jika terjadi getaran berlebihan, periksa keseimbangan impeller dan bantalan. Jika mesin tidak menyala, periksa sumber daya dan sistem kontrol."
  }
];

interface InfoCardProps {
  machineId?: number;
}

export default function InfoCard({ machineId = 1 }: InfoCardProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % infoSlides.length);
    }, 5000); // Change slide every 5 seconds
    
    return () => clearInterval(interval);
  }, []);
  
  // Manual navigation
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };
  
  return (
    <div className="backdrop-blur-md bg-gray-800/40 rounded-lg p-3 shadow-lg border border-gray-700/50 h-full flex flex-col overflow-hidden">
      <h2 className="text-lg font-bold text-white mb-2 flex items-center">
        <InformationCircleIcon className="h-5 w-5 mr-2 text-blue-400" />
        Informasi Mesin
      </h2>
      
      <div className="flex-grow relative overflow-hidden">
        {infoSlides.map((slide, index) => (
          <div 
            key={index} 
            className={`absolute inset-0 p-1 transition-opacity duration-500 ease-in-out ${
              currentSlide === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <h3 className="text-lg font-semibold text-blue-400 mb-2">{slide.title}</h3>
            <p className="text-gray-300 text-sm leading-relaxed">{slide.content}</p>
          </div>
        ))}
      </div>
      
      {/* Navigation dots */}
      <div className="flex justify-center space-x-1 mt-2">
        {infoSlides.map((_, index) => (
          <button
            key={index}
            className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
              currentSlide === index ? 'bg-blue-500' : 'bg-gray-600'
            }`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
} 