// frontend/src/pages/TransactionsPage.jsx
import React from 'react';
import TransactionList from '../components/Transactions/TransactionList';

const TransactionsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Transactions</h1>
        <TransactionList />
      </div>
    </div>
  );
};

export { TransactionsPage };