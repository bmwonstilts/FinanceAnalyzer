// src/components/Dashboard/Dashboard.jsx
import React from 'react';
import { DollarSign, TrendingUp, TrendingDown, BarChart2 } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, trend }) => (
  <div className="bg-white p-6 rounded-lg border shadow-sm">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-600 mb-1">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
      <div className={`p-3 rounded-full ${
        trend === 'up' ? 'bg-green-50' : trend === 'down' ? 'bg-red-50' : 'bg-blue-50'
      }`}>
        <Icon className={`w-6 h-6 ${
          trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-blue-600'
        }`} />
      </div>
    </div>
  </div>
);

const DashboardPage = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Income"
          value="$8,450"
          icon={DollarSign}
          trend="up"
        />
        <StatCard
          title="Total Expenses"
          value="$3,200"
          icon={TrendingDown}
          trend="down"
        />
        <StatCard
          title="Net Savings"
          value="$5,250"
          icon={TrendingUp}
          trend="up"
        />
        <StatCard
          title="Monthly Average"
          value="$4,225"
          icon={BarChart2}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Monthly Overview</h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
            Chart Component Will Go Here
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Expense Breakdown</h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
            Pie Chart Will Go Here
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;