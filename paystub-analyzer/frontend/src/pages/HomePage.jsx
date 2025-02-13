// src/pages/HomePage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart2, Upload, FileText } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description, onClick }) => (
  <div
    onClick={onClick}
    className="bg-white border rounded-lg p-6 cursor-pointer transition-all hover:shadow-md"
  >
    <div className="flex flex-col items-center text-center">
      <div className="p-3 bg-blue-50 rounded-full mb-4">
        <Icon className="w-6 h-6 text-blue-600" />
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  </div>
);

const HomePage = () => {
  const navigate = useNavigate();
  
  const features = [
    {
      icon: Upload,
      title: 'Upload Documents',
      description: 'Securely upload your paystubs and bank statements',
      path: '/upload'
    },
    {
      icon: BarChart2,
      title: 'View Dashboard',
      description: 'Get insights into your finances',
      path: '/dashboard'
    },
    {
      icon: FileText,
      title: 'Manage Transactions',
      description: 'View and categorize your transactions',
      path: '/transactions'
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Finance Analyzer
        </h1>
        <p className="text-gray-600">
          Track and analyze your financial documents
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature) => (
          <FeatureCard
            key={feature.path}
            {...feature}
            onClick={() => navigate(feature.path)}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;