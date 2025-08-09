import React from 'react';

const PrescriptionList = ({ prescriptions, filter, onPrescriptionClick, expandedPrescriptionId }) => {
  const filteredPrescriptions = filter === 'all'
    ? prescriptions
    : prescriptions.filter(prescription => prescription.status === filter);

  if (!filteredPrescriptions.length) {
    return (
      <div className="bg-white shadow rounded-lg p-6 text-center text-gray-500">
        No prescriptions found matching the selected filter.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {filteredPrescriptions.map((prescription) => {
        const isExpanded = expandedPrescriptionId === prescription.id;
        return (
          <div
            key={prescription.id}
            className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200 cursor-pointer hover:shadow-lg transition-shadow duration-200"
            onClick={() => !isExpanded && onPrescriptionClick(prescription.id)}
          >
            <div className="px-4 py-5 sm:px-6 flex items-center justify-between">
              <div className="flex items-center">
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-gray-900">
                    {prescription.medication?.name || prescription.medications?.[0]?.name || '-'}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {prescription.medication?.dosage || prescription.medications?.[0]?.dosage || '-'} - {prescription.medication?.frequency || prescription.medications?.[0]?.frequency || '-'}
                  </p>
                </div>
              </div>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                prescription.status === 'active'
                  ? 'bg-green-100 text-green-800'
                  : prescription.status === 'pending'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {prescription.status.charAt(0).toUpperCase() + prescription.status.slice(1)}
              </span>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Diagnosis</dt>
                  <dd className="mt-1 text-sm text-gray-900">{prescription.diagnosis}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Prescribed by</dt>
                  <dd className="mt-1 text-sm text-gray-900">{prescription.prescribedBy?.name || prescription.prescribedBy || '-'}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Start Date</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {prescription.startDate}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">End Date</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {prescription.endDate}
                  </dd>
                </div>
              </dl>
              {prescription.notes && (
                <div className="mt-4">
                  <dt className="text-sm font-medium text-gray-500">Notes</dt>
                  <dd className="mt-1 text-sm text-gray-900">{prescription.notes}</dd>
                </div>
              )}
              {prescription.pharmacy?.name && (
                <div className="mt-4">
                  <dt className="text-sm font-medium text-gray-500">Pharmacy</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {prescription.pharmacy.name}
                    {prescription.pharmacy.address && `, ${prescription.pharmacy.address}`}
                    {prescription.pharmacy.phone && ` (${prescription.pharmacy.phone})`}
                  </dd>
                </div>
              )}
              {/* Expanded details */}
              {isExpanded && (
                <div className="mt-6">
                  <h4 className="text-md font-semibold mb-2">Medication Details</h4>
                  <ul className="list-disc pl-5">
                    {(prescription.medications || []).map((med, idx) => (
                      <li key={idx} className="mb-2">
                        <div><span className="font-medium">Name:</span> {med.name}</div>
                        <div><span className="font-medium">Dosage:</span> {med.dosage}</div>
                        <div><span className="font-medium">Frequency:</span> {med.frequency}</div>
                        {med.duration && <div><span className="font-medium">Duration:</span> {med.duration}</div>}
                        {med.instructions && <div><span className="font-medium">Instructions:</span> {med.instructions}</div>}
                        {med.notes && <div><span className="font-medium">Notes:</span> {med.notes}</div>}
                      </li>
                    ))}
                  </ul>
                  <button
                    className="mt-4 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm"
                    onClick={e => { e.stopPropagation(); onPrescriptionClick(null); }}
                  >
                    Collapse
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PrescriptionList; 