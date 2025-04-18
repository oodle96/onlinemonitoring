import { useState, useEffect } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { ChartBarIcon, ClockIcon } from '@heroicons/react/24/solid';

// Time range options
const timeRanges = [
  { label: 'Minutes', value: 'minutes', hours: 1/60 },
  { label: 'Hour', value: 'hour', hours: 1 },
  { label: '3 Hours', value: '3hours', hours: 3 },
  { label: '12 Hours', value: '12hours', hours: 12 },
  { label: 'Day', value: 'day', hours: 24 },
  { label: '3 Days', value: '3days', hours: 72 },
  { label: 'Week', value: 'week', hours: 168 }
];

// Metric options
const metricOptions = [
  { label: 'Temperature', value: 'temperature' },
  { label: 'Pressure', value: 'pressure' },
  { label: 'Vibration', value: 'vibration' },
  { label: 'Power', value: 'power' },
  { label: 'Efficiency', value: 'efficiency' },
];

interface HistoryChartProps {
  machineId?: number;
}

// Generate dummy historical data
const generateHistoricalData = (metricName: string, baseValue: number, variance: number, hours: number = 24) => {
  const data = [];
  const now = new Date();
  const points = Math.min(100, Math.max(24, Math.floor(hours / 24 * 24))); // Scale points based on time range
  
  for (let i = points - 1; i >= 0; i--) {
    const time = new Date(now);
    time.setHours(now.getHours() - (hours * i / points));
    
    // Add some randomness to create a realistic pattern
    const randomFactor = (Math.random() - 0.5) * variance;
    const value = baseValue + randomFactor;
    
    // Format time based on the time range
    let timeString;
    if (hours <= 1) {
      // For minutes view, show MM:SS
      timeString = time.toLocaleTimeString([], { minute: '2-digit', second: '2-digit' });
    } else if (hours <= 24) {
      // For hour view, show HH:MM
      timeString = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (hours <= 72) {
      // For day view, show MM/DD HH:MM
      timeString = time.toLocaleString([], { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
    } else {
      // For week view, show MM/DD
      timeString = time.toLocaleString([], { month: '2-digit', day: '2-digit' });
    }
    
    data.push({
      time: timeString,
      value: parseFloat(value.toFixed(1))
    });
  }
  
  return data;
};

// Different metrics with their base values and variances
const metricsData = {
  'Temperature': { baseValue: 72, variance: 5, color: '#3b82f6' },
  'Pressure': { baseValue: 2.4, variance: 0.3, color: '#f59e0b' },
  'Power': { baseValue: 85, variance: 5, color: '#10b981' },
  'Vibration': { baseValue: 0.8, variance: 0.2, color: '#8b5cf6' },
  'Oil Level': { baseValue: 65, variance: 5, color: '#ef4444' },
  'Efficiency': { baseValue: 92, variance: 3, color: '#06b6d4' }
};

export default function HistoryChart({ machineId = 1 }: HistoryChartProps) {
  const [selectedMetric, setSelectedMetric] = useState('Temperature');
  const [selectedTimeRange, setSelectedTimeRange] = useState('day');
  const [historicalData, setHistoricalData] = useState<any[]>([]);
  
  // Update chart data when selected metric or time range changes
  useEffect(() => {
    const timeRange = timeRanges.find(range => range.value === selectedTimeRange);
    const hours = timeRange ? timeRange.hours : 24;
    
    const data = generateHistoricalData(
      selectedMetric, 
      metricsData[selectedMetric as keyof typeof metricsData].baseValue,
      metricsData[selectedMetric as keyof typeof metricsData].variance,
      hours
    );
    setHistoricalData(data);
  }, [selectedMetric, selectedTimeRange]);
  
  return (
    <div className="backdrop-blur-md bg-gray-800/40 rounded-lg p-3 shadow-lg border border-gray-700/50 h-full flex flex-col overflow-hidden">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-bold text-white flex items-center">
          <ChartBarIcon className="h-5 w-5 mr-2 text-blue-400" />
          Historical Data
        </h2>
        
        <div className="flex items-center">
          <ClockIcon className="h-4 w-4 mr-1 text-gray-400" />
          <select 
            className="bg-gray-700/50 text-white border border-gray-600/50 rounded-md px-1.5 py-0.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(e.target.value)}
          >
            {timeRanges.map((range) => (
              <option key={range.value} value={range.value}>{range.label}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="mb-2">
        <select 
          className="bg-gray-700/50 text-white border border-gray-600/50 rounded-md px-2 py-1 w-full text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedMetric}
          onChange={(e) => setSelectedMetric(e.target.value)}
        >
          {Object.keys(metricsData).map((metric) => (
            <option key={metric} value={metric}>{metric}</option>
          ))}
        </select>
      </div>
      
      <div className="flex-grow">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={historicalData}
            margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="time" 
              stroke="#9ca3af" 
              tick={{ fill: '#9ca3af', fontSize: 10 }}
              interval="preserveStartEnd"
            />
            <YAxis 
              stroke="#9ca3af" 
              tick={{ fill: '#9ca3af', fontSize: 10 }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(17, 24, 39, 0.8)', 
                border: '1px solid rgba(75, 85, 99, 0.5)',
                borderRadius: '0.375rem',
                color: '#f3f4f6'
              }}
              labelStyle={{ color: '#f3f4f6' }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="value" 
              name={selectedMetric}
              stroke={metricsData[selectedMetric as keyof typeof metricsData].color} 
              strokeWidth={2}
              dot={{ fill: metricsData[selectedMetric as keyof typeof metricsData].color, r: 3 }}
              activeDot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
} 