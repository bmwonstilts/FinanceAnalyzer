import React from 'react';
import Dashboard from '../components/Dashboard/Dashboard';
import { Card } from '@/components/ui/card';

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Financial Dashboard</h1>
        <Dashboard />
      </div>
    </div>
  );
};

export { DashboardPage };