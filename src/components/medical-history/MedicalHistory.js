import React, { useState } from 'react';
import Button from '../common/Button';
import DiseaseTestSelector from './DiseaseTestSelector';

const MedicalHistory = () => {
  const [records, setRecords] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [formData, setFormData] = useState({
    type: 'doctor_visit',
    date: '',
    title: '',
    description: '',
    provider: '',
    attachments: [],
    specificDisease: ''
  });
  const [showTestSelector, setShowTestSelector] = useState(false);

  const recordTypes = {
    doctor_visit: 'Doctor Visit',
    procedure: 'Medical Procedure',
    lab_result: 'Lab Result',
    vaccination: 'Vaccination',
    prescription: 'Prescription',
    test: 'Test'
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...files]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRecord = {
      id: Date.now(),
      ...formData,
      attachments: formData.attachments.map(file => file.name) // In a real app, you'd upload these files
    };

    setRecords(prev => [newRecord, ...prev]);
    setShowAddForm(false);
    setFormData({
      type: 'doctor_visit',
      date: '',
      title: '',
      description: '',
      provider: '',
      attachments: [],
      specificDisease: ''
    });
  };

  const handleSaveTests = (tests) => {
    // Create a new record for the tests
    const newTestRecord = {
      id: Date.now(),
      type: 'test',
      date: new Date().toISOString().split('T')[0],
      title: 'Medical Tests',
      description: `Tests selected for ${formData.specificDisease || tests[0]?.disease || 'unknown condition'}`,
      provider: 'Healthcare Provider',
      tests: tests,
      specificDisease: formData.specificDisease,
      attachments: []
    };

    setRecords(prev => [newTestRecord, ...prev]);
    setShowTestSelector(false);
    setFormData(prev => ({ ...prev, specificDisease: '' }));
  };

  const filteredRecords = activeFilter === 'all' 
    ? records 
    : records.filter(record => record.type === activeFilter);

  return (
    <div className="space-y-6 relative">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Medical History</h1>
        <div className="space-x-4">
          <Button
            onClick={() => setShowTestSelector(true)}
            className="bg-primary-600 hover:bg-primary-700"
          >
            Add Tests
          </Button>
          <Button
            onClick={() => setShowAddForm(true)}
            className="bg-primary-600 hover:bg-primary-700"
          >
            Add Record
          </Button>
        </div>
      </div>

      {/* Filter Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveFilter('all')}
            className={`${
              activeFilter === 'all'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm`}
          >
            All Records
          </button>
          {Object.entries(recordTypes).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setActiveFilter(key)}
              className={`${
                activeFilter === key
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm`}
            >
              {label}
            </button>
          ))}
        </nav>
      </div>

      {showTestSelector ? (
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Select Tests</h3>
          <DiseaseTestSelector 
            onSave={handleSaveTests}
          />
          <div className="mb-6 mt-6">
            <label htmlFor="specificDisease" className="block text-sm font-medium text-gray-700">
              Specify Disease
            </label>
            <input
              type="text"
              id="specificDisease"
              name="specificDisease"
              value={formData.specificDisease}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm py-3 px-3"
              placeholder="Type the specific disease (e.g., Blood Cancer, Bone Cancer, etc.)"
            />
          </div>
        </div>
      ) : showAddForm ? (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" style={{ zIndex: 9999 }}>
          <div className="relative mx-auto p-5 border w-full max-w-3xl shadow-lg rounded-md bg-white mt-10 mb-10">
            <div className="sticky top-0 bg-white pb-4 mb-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-medium text-gray-900">Add Medical Record</h2>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">Close</span>
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="overflow-y-auto max-h-[calc(100vh-200px)]">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                    Record Type
                  </label>
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="mt-1 block w-full pl-3 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                    required
                  >
                    {Object.entries(recordTypes).map(([key, label]) => (
                      <option key={key} value={key}>{label}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                      Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      id="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm py-3 px-3"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="provider" className="block text-sm font-medium text-gray-700">
                      Healthcare Provider
                    </label>
                    <input
                      type="text"
                      name="provider"
                      id="provider"
                      value={formData.provider}
                      onChange={handleChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:focus:border-primary-500 sm:text-sm py-3 px-3"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm py-3 px-3"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows="3"
                    value={formData.description}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm py-3 px-3"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Attachments
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                        >
                          <span>Upload files</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            multiple
                            onChange={handleFileChange}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, PDF up to 10MB each</p>
                      {formData.attachments.length > 0 && (
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">Selected files:</p>
                          <ul className="mt-1 text-sm text-gray-500">
                            {formData.attachments.map((file, index) => (
                              <li key={index}>{file.name}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="sticky bottom-0 bg-white pt-4 mt-6 border-t border-gray-200">
                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setShowAddForm(false)}
                      className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-primary-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      Save Record
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Medical Records Display */}
          {filteredRecords.map((record) => (
            <div key={record.id} className="bg-white shadow rounded-lg p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{record.title}</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {recordTypes[record.type]} • {record.date} • {record.provider}
                  </p>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                  {recordTypes[record.type]}
                </span>
              </div>
              <p className="mt-4 text-sm text-gray-600">{record.description}</p>
              
              {/* Display Tests if this is a test record */}
              {record.type === 'test' && record.tests && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-700">Selected Tests</h4>
                  {record.specificDisease && (
                    <div className="mt-2 mb-4">
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Specified Disease:</span> {record.specificDisease}
                      </p>
                    </div>
                  )}
                  <div className="mt-2 grid grid-cols-1 gap-4">
                    {record.tests.map((test, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <h5 className="font-medium text-gray-900">{test.name}</h5>
                        <p className="text-sm text-gray-600 mt-1">{test.description}</p>
                        <div className="mt-2 text-xs text-gray-500">
                          <p>Normal Range: {test.normalRange}</p>
                          <p>Frequency: {test.frequency}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {record.attachments.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-700">Attachments</h4>
                  <ul className="mt-2 space-y-1">
                    {record.attachments.map((file, index) => (
                      <li key={index} className="text-sm text-gray-600">
                        {file}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}

          {filteredRecords.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900">No medical records yet</h3>
              <p className="mt-1 text-sm text-gray-500">
                Add tests or records to get started
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MedicalHistory; 