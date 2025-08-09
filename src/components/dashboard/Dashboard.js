import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import CancerStatistics from './CancerStatistics';

const Dashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('Overview');

  const quickActions = [
    {
      name: 'Book Appointment',
      description: 'Schedule a new appointment with your healthcare provider',
      href: '/appointments',
      icon: '📅',
    },
    {
      name: 'View Medical History',
      description: 'Access your complete medical history and records',
      href: '/medical-history',
      icon: '📋',
    },
    {
      name: 'Manage Prescriptions',
      description: 'View and manage your current prescriptions',
      href: '/prescriptions',
      icon: '💊',
    },
    {
      name: 'Update Profile',
      description: 'Keep your personal information up to date',
      href: '/profile',
      icon: '👤',
    },
  ];

  return (
    <div>
      {/* Tab Bar */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {['Overview', 'Medical Statistics'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm focus:outline-none ${
                activeTab === tab
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'Overview' && (
        <>
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back, {user?.name || 'User'}!
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Here&apos;s an overview of your healthcare information and quick actions.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {quickActions.map((action) => (
              <Link
                key={action.name}
                to={action.href}
                className="block hover:bg-gray-50"
              >
                <div className="card">
                  <div className="p-6">
                    <div className="text-3xl mb-4">{action.icon}</div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {action.name}
                    </h3>
                    <p className="mt-2 text-sm text-gray-500">
                      {action.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="card">
              <div className="card-header">
                <h3 className="text-lg font-medium text-gray-900">
                  Upcoming Appointments
                </h3>
              </div>
              <div className="card-body">
                <p className="text-gray-500">No upcoming appointments scheduled.</p>
              </div>
              <div className="card-footer">
                <Link
                  to="/appointments"
                  className="text-sm font-medium text-primary-600 hover:text-primary-500"
                >
                  View all appointments →
                </Link>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h3 className="text-lg font-medium text-gray-900">
                  Recent Prescriptions
                </h3>
              </div>
              <div className="card-body">
                <p className="text-gray-500">No active prescriptions found.</p>
              </div>
              <div className="card-footer">
                <Link
                  to="/prescriptions"
                  className="text-sm font-medium text-primary-600 hover:text-primary-500"
                >
                  View all prescriptions →
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
      {activeTab === 'Medical Statistics' && (
        <div className="space-y-8">
          {/* Cancer Statistics Dashboard */}
          <CancerStatistics />
        </div>
      )}
    </div>
  );
};

export default Dashboard; 