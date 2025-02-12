// frontend/src/pages/HomePage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Paystub & Bank Statement Analyzer
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Upload your financial documents and get instant insights
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" 
                onClick={() => navigate('/upload')}>
            <CardHeader>
              <CardTitle>Upload Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Upload your paystubs and bank statements for analysis</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => navigate('/dashboard')}>
            <CardHeader>
              <CardTitle>View Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <p>See your financial insights and trends</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => navigate('/transactions')}>
            <CardHeader>
              <CardTitle>Manage Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <p>View and categorize your transactions</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export { HomePage };