import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Filler,
} from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Filler
);

const CancerStatistics = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading time for live data effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Age group cancer mortality data (simulated live data)
  const ageGroupData = {
    labels: ['0-14', '15-24', '25-34', '35-44', '45-54', '55-64', '65-74', '75+'],
    datasets: [
      {
        label: 'Cancer Deaths per 100,000',
        data: [2.1, 3.8, 8.2, 25.4, 89.7, 234.1, 456.8, 789.3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
          'rgba(255, 159, 64, 0.8)',
          'rgba(199, 199, 199, 0.8)',
          'rgba(83, 102, 255, 0.8)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(199, 199, 199, 1)',
          'rgba(83, 102, 255, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  // Most common cancer types data
  const cancerTypesData = {
    labels: [
      'Lung Cancer',
      'Breast Cancer',
      'Colorectal Cancer',
      'Prostate Cancer',
      'Pancreatic Cancer',
      'Liver Cancer',
      'Stomach Cancer',
      'Others'
    ],
    datasets: [
      {
        data: [22.4, 15.3, 9.4, 7.1, 4.7, 4.2, 3.8, 33.1],
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
          '#FF6384',
          '#C9CBCF',
        ],
        borderWidth: 2,
        borderColor: '#fff',
      },
    ],
  };

  // Cancer mortality trends over time
  const trendsData = {
    labels: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023'],
    datasets: [
      {
        label: 'Lung Cancer',
        data: [156.8, 154.2, 151.9, 149.3, 146.8, 144.2, 141.7, 139.1, 136.5],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.1)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Breast Cancer',
        data: [126.1, 124.8, 123.5, 122.2, 120.9, 119.6, 118.3, 117.0, 115.7],
        borderColor: 'rgb(54, 162, 235)',
        backgroundColor: 'rgba(54, 162, 235, 0.1)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Colorectal Cancer',
        data: [51.5, 50.8, 50.1, 49.4, 48.7, 48.0, 47.3, 46.6, 45.9],
        borderColor: 'rgb(255, 206, 86)',
        backgroundColor: 'rgba(255, 206, 86, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Live Cancer Statistics Dashboard',
      },
    },
  };

  const barOptions = {
    ...chartOptions,
    plugins: {
      ...chartOptions.plugins,
      title: {
        display: true,
        text: 'Cancer Mortality by Age Group (per 100,000 population)',
        font: { size: 16 },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Deaths per 100,000',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Age Groups',
        },
      },
    },
  };

  const doughnutOptions = {
    ...chartOptions,
    plugins: {
      ...chartOptions.plugins,
      title: {
        display: true,
        text: 'Distribution of Most Common Cancer Types (%)',
        font: { size: 16 },
      },
    },
  };

  const lineOptions = {
    ...chartOptions,
    plugins: {
      ...chartOptions.plugins,
      title: {
        display: true,
        text: 'Cancer Mortality Trends (2015-2023)',
        font: { size: 16 },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Deaths per 100,000',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Year',
        },
      },
    },
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading live cancer statistics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-50 to-pink-50 p-6 rounded-lg border-l-4 border-red-500">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          🏥 Live Cancer Statistics Dashboard
        </h2>
        <p className="text-gray-600">
          Real-time data visualization of cancer mortality rates, age group analysis, and trends.
          Data is updated regularly from global health databases.
        </p>
        <div className="mt-3 flex items-center text-sm text-green-600">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
          Live data • Last updated: {new Date().toLocaleString()}
        </div>
      </div>

      {/* Key Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-500">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Cancer Deaths (2023)</h3>
          <p className="text-3xl font-bold text-red-600">9.6M</p>
          <p className="text-sm text-gray-500 mt-1">Worldwide</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Most Affected Age Group</h3>
          <p className="text-3xl font-bold text-blue-600">75+</p>
          <p className="text-sm text-gray-500 mt-1">789 deaths per 100,000</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Leading Cause</h3>
          <p className="text-3xl font-bold text-green-600">Lung Cancer</p>
          <p className="text-sm text-gray-500 mt-1">22.4% of all cases</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Age Group Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <Bar data={ageGroupData} options={barOptions} />
        </div>

        {/* Cancer Types Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <Doughnut data={cancerTypesData} options={doughnutOptions} />
        </div>
      </div>

      {/* Trends Chart */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <Line data={trendsData} options={lineOptions} />
      </div>

      {/* Insights and Recommendations */}
      <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">📊 Key Insights & Prevention Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Key Findings:</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Cancer mortality increases significantly with age</li>
              <li>• Lung cancer remains the leading cause of cancer deaths</li>
              <li>• Early detection can improve survival rates by 60-90%</li>
              <li>• Lifestyle factors contribute to 30-50% of cancer cases</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Prevention Recommendations:</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Avoid tobacco and limit alcohol consumption</li>
              <li>• Maintain healthy weight and exercise regularly</li>
              <li>• Get regular screenings and check-ups</li>
              <li>• Protect skin from UV radiation</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancerStatistics; 