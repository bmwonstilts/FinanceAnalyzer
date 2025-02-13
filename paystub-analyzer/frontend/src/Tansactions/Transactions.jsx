// src/components/Transactions/TransactionList.jsx
import React, { useState } from 'react';
import { Search, Filter, Download } from 'lucide-react';

const TransactionRow = ({ date, description, amount, category }) => (
  <tr className="border-b hover:bg-gray-50">
    <td className="py-3 px-4">{date}</td>
    <td className="py-3 px-4">{description}</td>
    <td className="py-3 px-4">
      <span className="inline-block px-2 py-1 rounded-full text-sm bg-gray-100">
        {category}
      </span>
    </td>
    <td className={`py-3 px-4 text-right ${
      amount < 0 ? 'text-red-600' : 'text-green-600'
    }`}>
      ${Math.abs(amount).toFixed(2)}
    </td>
  </tr>
);

const TransactionsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const sampleTransactions = [
    { id: 1, date: '2025-02-13', description: 'Grocery Store', amount: -120.50, category: 'Groceries' },
    { id: 2, date: '2025-02-12', description: 'Salary Deposit', amount: 3000.00, category: 'Income' },
    { id: 3, date: '2025-02-11', description: 'Electric Bill', amount: -85.20, category: 'Utilities' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search transactions..."
            className="pl-10 pr-4 py-2 border rounded-lg w-full md:w-80"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
            <Filter className="h-5 w-5" />
            Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Download className="h-5 w-5" />
            Export
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left py-3 px-4 text-gray-600">Date</th>
              <th className="text-left py-3 px-4 text-gray-600">Description</th>
              <th className="text-left py-3 px-4 text-gray-600">Category</th>
              <th className="text-right py-3 px-4 text-gray-600">Amount</th>
            </tr>
          </thead>
          <tbody>
            {sampleTransactions.map((transaction) => (
              <TransactionRow key={transaction.id} {...transaction} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionsPage;