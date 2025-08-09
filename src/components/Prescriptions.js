import React, { useState, useEffect } from 'react';
import Alert from './common/Alert';
import AddPrescriptionModal from './AddPrescriptionModal'; // Import the original modal
import PrescriptionList from './PrescriptionList'; // Ensure PrescriptionList is imported

const Prescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([
    // Hardcoded data for demonstration. This one will be filtered out due to past date.
    {
      id: 1,
      diagnosis: 'Epilepsy',
      prescribedBy: 'Dr. Veena Kalra',
      startDate: '2024-06-12T00:00:00.000Z', // Past date
      endDate: '2024-06-20T00:00:00.000Z', // Changed to a past date for demonstration
      pharmacy: 'BAS (9897756864)',
      status: 'active',
      medications: [],
      notes: ''
    }
  ]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [alert, setAlert] = useState(null);
  const [expandedPrescriptionId, setExpandedPrescriptionId] = useState(null);

  // Function to filter out expired prescriptions
  const filterExpiredPrescriptions = () => {
    const now = new Date();
    setPrescriptions(prevPrescriptions =>
      prevPrescriptions.filter(prescription => {
        const endDate = new Date(prescription.endDate);
        return endDate >= now;
      })
    );
  };

  // Run filter on component mount and every 24 hours
  useEffect(() => {
    filterExpiredPrescriptions(); // Initial filter on mount

    const interval = setInterval(() => {
      filterExpiredPrescriptions();
    }, 24 * 60 * 60 * 1000); // Check every 24 hours (for demonstration)

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const handleAddPrescription = async (newPrescriptionData) => {
    console.log('New prescription data received:', newPrescriptionData);
    setPrescriptions(prev => {
      const updatedPrescriptions = [...prev, { ...newPrescriptionData, id: Date.now(), status: newPrescriptionData.status || 'active' }];
      console.log('Updated prescriptions state:', updatedPrescriptions);
      return updatedPrescriptions;
    });
    setAlert({ type: 'success', message: 'Prescription added successfully!' });
    setIsAddModalOpen(false);
    setTimeout(() => setAlert(null), 3000);
  };


  const handlePrescriptionClick = (id) => {
    setExpandedPrescriptionId(prev => (prev === id ? null : id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Prescriptions</h1>

      {alert && <Alert type={alert.type} message={alert.message} />}

      <div className="md:flex md:items-center md:justify-between mb-6">
        <div className="flex-1 min-w-0">
          <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
            <div className="mt-2 flex items-center text-sm text-gray-500">
              Manage your prescriptions and medications.
            </div>
          </div>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Add New Prescription
          </button>
        </div>
      </div>

      {/* Use PrescriptionList to display all filtered prescriptions */}
      <PrescriptionList 
        prescriptions={prescriptions} 
        filter="all" 
        onPrescriptionClick={handlePrescriptionClick}
        expandedPrescriptionId={expandedPrescriptionId}
      />

      {/* Original Add Prescription Modal */}
      <AddPrescriptionModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddPrescription}
      />
    </div>
  );
};

export default Prescriptions; 