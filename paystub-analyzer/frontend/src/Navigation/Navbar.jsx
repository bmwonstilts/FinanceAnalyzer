// src/components/Navigation/Navbar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, BarChart2, Upload, FileText } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/dashboard', icon: BarChart2, label: 'Dashboard' },
    { path: '/transactions', icon: FileText, label: 'Transactions' },
    { path: '/upload', icon: Upload, label: 'Upload' }
  ];

  return (
    <nav className="border-b border-gray-200">
      <div className="flex justify-center space-x-8 p-4">
        {navItems.map(({ path, icon: Icon, label }) => (
          <Link
            key={path}
            to={path}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors
              ${location.pathname === path 
                ? 'bg-blue-50 text-blue-600' 
                : 'text-gray-600 hover:bg-gray-50'
              }`}
          >
            <Icon size={20} />
            <span className="font-medium">{label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;