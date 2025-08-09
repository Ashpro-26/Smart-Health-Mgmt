import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import PersonalInfo from './PersonalInfo';
import MedicalInfo from './MedicalInfo';
import AccountSettings from './AccountSettings';
import { motion, AnimatePresence } from 'framer-motion';

const tabContentVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

const Profile = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const { user, updateProfile } = useAuth();

  const tabs = [
    { id: 'personal', name: 'Personal Information' },
    { id: 'medical', name: 'Medical Information' },
    { id: 'settings', name: 'Account Settings' }
  ];

  const tabContent = {
    personal: <PersonalInfo user={user} onUpdate={updateProfile} />,
    medical: <MedicalInfo user={user} onUpdate={updateProfile} />,
    settings: <AccountSettings />,
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
              <p className="mt-2 text-sm text-gray-500">
                Manage your personal information, medical details, and account settings.
              </p>
            </div>

            <div>
              <nav className="relative flex space-x-8 border-b border-gray-200" aria-label="Tabs">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`${
                      activeTab === tab.id
                        ? 'text-primary-600'
                        : 'text-gray-500 hover:text-gray-700'
                    } whitespace-nowrap py-4 px-1 font-medium text-sm bg-transparent relative focus:outline-none`}
                    style={{ border: 'none', background: 'none' }}
                  >
                    {tab.name}
                    {activeTab === tab.id && (
                      <motion.div
                        layoutId="profile-underline"
                        className="absolute left-0 right-0 bottom-0 h-0.5 bg-primary-500 rounded"
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      />
                    )}
                  </button>
                ))}
              </nav>
            </div>

            <div className="mt-6 min-h-[200px] relative">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={activeTab}
                  variants={tabContentVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                  className="w-full"
                >
                  {tabContent[activeTab]}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 