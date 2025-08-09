import React, { useState } from 'react';
import diseasesAndTests from '../../data/diseasesAndTests.js';

const DiseaseTestSelector = ({ onSave }) => {
  const [selectedDisease, setSelectedDisease] = useState('');
  const [selectedTests, setSelectedTests] = useState([]);

  const handleDiseaseChange = (e) => {
    const disease = e.target.value;
    setSelectedDisease(disease);
    setSelectedTests([]);
  };

  const handleTestSelect = (test) => {
    const isSelected = selectedTests.some(t => t.name === test.name);
    let newSelectedTests;
    
    if (isSelected) {
      newSelectedTests = selectedTests.filter(t => t.name !== test.name);
    } else {
      newSelectedTests = [...selectedTests, test];
    }
    
    setSelectedTests(newSelectedTests);
  };

  const handleSave = () => {
    if (selectedTests.length === 0) {
      alert('Please select at least one test before saving.');
      return;
    }
    onSave(selectedTests);
  };

  return (
    <div className="space-y-6">
      {/* Disease Selection */}
      <div>
        <label htmlFor="disease" className="block text-sm font-medium text-gray-700">
          Select Disease
        </label>
        <select
          id="disease"
          value={selectedDisease}
          onChange={handleDiseaseChange}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
        >
          <option value="">Select a disease</option>
          {Object.keys(diseasesAndTests).map((disease) => (
            <option key={disease} value={disease}>
              {disease}
            </option>
          ))}
        </select>
      </div>

      {/* Disease Description */}
      {selectedDisease && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900">{selectedDisease}</h3>
          <p className="mt-1 text-sm text-gray-600">
            {diseasesAndTests[selectedDisease].description}
          </p>
        </div>
      )}

      {/* Available Tests */}
      {selectedDisease && (
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-gray-700">Available Tests</h4>
          <div className="grid grid-cols-1 gap-4">
            {diseasesAndTests[selectedDisease].tests.map((test) => (
              <div
                key={test.name}
                className={`p-4 border rounded-lg cursor-pointer transition-colors duration-200 ${
                  selectedTests.some(t => t.name === test.name)
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-primary-300'
                }`}
                onClick={() => handleTestSelect(test)}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h5 className="text-sm font-medium text-gray-900">{test.name}</h5>
                    <p className="mt-1 text-sm text-gray-600">{test.description}</p>
                  </div>
                  <div className="flex-shrink-0">
                    <input
                      type="checkbox"
                      checked={selectedTests.some(t => t.name === test.name)}
                      onChange={() => handleTestSelect(test)}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                  </div>
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  <p>Normal Range: {test.normalRange}</p>
                  <p>Frequency: {test.frequency}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Selected Tests Summary */}
      {selectedTests.length > 0 && (
        <div className="mt-6">
          <h4 className="text-sm font-medium text-gray-700">Selected Tests</h4>
          <ul className="mt-2 space-y-2">
            {selectedTests.map((test) => (
              <li key={test.name} className="text-sm text-gray-600">
                {test.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Save Button */}
      {selectedTests.length > 0 && (
        <div className="flex justify-end mt-6">
          <button
            onClick={handleSave}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            OK
          </button>
        </div>
      )}
    </div>
  );
};

export default DiseaseTestSelector; 