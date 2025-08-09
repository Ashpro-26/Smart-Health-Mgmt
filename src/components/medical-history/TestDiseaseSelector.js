import React, { useState } from 'react';
import DiseaseTestSelector from './DiseaseTestSelector';

const TestDiseaseSelector = () => {
  const [selectedTests, setSelectedTests] = useState([]);
  const [savedTests, setSavedTests] = useState([]);

  const handleTestSelect = (tests) => {
    setSelectedTests(tests);
    console.log('Selected Tests:', tests);
  };

  const handleSave = (tests) => {
    setSavedTests(tests);
    console.log('Saved Tests:', tests);
    alert('Tests saved successfully!');
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Test Disease and Test Selector</h2>
      
      <div className="bg-white shadow rounded-lg p-6">
        <DiseaseTestSelector 
          onTestSelect={handleTestSelect} 
          onSave={handleSave}
        />
      </div>

      {/* Selected Tests Display */}
      {selectedTests.length > 0 && (
        <div className="mt-8 bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Selected Tests Summary</h3>
          <div className="space-y-4">
            {selectedTests.map((test, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow">
                <h4 className="font-medium text-gray-900">{test.name}</h4>
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

      {/* Saved Tests Display */}
      {savedTests.length > 0 && (
        <div className="mt-8 bg-green-50 p-6 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Saved Tests</h3>
          <div className="space-y-4">
            {savedTests.map((test, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow">
                <h4 className="font-medium text-gray-900">{test.name}</h4>
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
    </div>
  );
};

export default TestDiseaseSelector; 