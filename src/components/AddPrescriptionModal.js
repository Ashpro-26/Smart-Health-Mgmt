import React, { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Input from './common/Input';
import Button from './common/Button';

const AddPrescriptionModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    medications: [{
      name: '',
      dosage: '',
      frequency: '',
      instructions: '',
      notes: ''
    }],
    diagnosis: '',
    prescribedBy: {
      name: ''
    },
    startDate: '',
    endDate: '',
    refills: {
      total: 0,
      remaining: 0
    },
    status: 'active',
    pharmacy: {
      name: '',
      phone: ''
    }
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handle nested fields like prescribedBy.name or pharmacy.name
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleMedicationChange = (index, e) => {
    const { name, value } = e.target;
    const newMedications = [...formData.medications];
    newMedications[index] = { ...newMedications[index], [name]: value };
    setFormData(prev => ({ ...prev, medications: newMedications }));

    // Clear error for specific medication field
    if (errors[`medications[${index}].${name}`]) {
      setErrors(prev => ({
        ...prev,
        [`medications[${index}].${name}`]: ''
      }));
    }
  };

  const handleAddMedication = () => {
    setFormData(prev => ({
      ...prev,
      medications: [...prev.medications, { name: '', dosage: '', frequency: '', instructions: '', notes: '' }]
    }));
  };

  const handleRemoveMedication = (index) => {
    const newMedications = [...formData.medications];
    newMedications.splice(index, 1);
    setFormData(prev => ({ ...prev, medications: newMedications }));

    // Clear any errors related to the removed medication
    const newErrors = { ...errors };
    Object.keys(newErrors).forEach(key => {
      if (key.startsWith(`medications[${index}]`)) {
        delete newErrors[key];
      }
    });
    setErrors(newErrors);
  };

  const validateForm = () => {
    const newErrors = {};
    formData.medications.forEach((med, index) => {
      if (!med.name.trim()) {
        newErrors[`medications[${index}].name`] = 'Medication name is required';
      }
      if (!med.dosage.trim()) {
        newErrors[`medications[${index}].dosage`] = 'Dosage is required';
      }
      if (!med.frequency.trim()) {
        newErrors[`medications[${index}].frequency`] = 'Frequency is required';
      }
    });
    if (!formData.diagnosis.trim()) {
      newErrors.diagnosis = 'Diagnosis is required';
    }
    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required';
    }
    if (!formData.endDate) {
      newErrors.endDate = 'End date is required';
    }
    if (!formData.prescribedBy.name.trim()) {
      newErrors['prescribedBy.name'] = 'Doctor name is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      
      setErrors(prev => ({ ...prev, submit: 'Please correct the errors in the form.' }));
      return;
    }

    setIsLoading(true);
    try {
      // Format dates to ISO string
      const formattedData = {
        ...formData,
        startDate: new Date(formData.startDate).toISOString(),
        endDate: new Date(formData.endDate).toISOString(),
        createdAt: new Date().toISOString()
      };

      await onSubmit(formattedData);

      // Reset form
      setFormData({
        medications: [{
          name: '',
          dosage: '',
          frequency: '',
          instructions: '',
          notes: ''
        }],
        diagnosis: '',
        prescribedBy: {
          name: ''
        },
        startDate: '',
        endDate: '',
        refills: {
          total: 0,
          remaining: 0
        },
        status: 'active',
        pharmacy: {
          name: '',
          phone: ''
        }
      });
      onClose();
    } catch (error) {
      setErrors({
        submit: 'Failed to add prescription. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border max-w-xl w-full shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">Add Prescription</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <Input
              label="Diagnosis"
              name="diagnosis"
              value={formData.diagnosis}
              onChange={handleChange}
              error={errors.diagnosis}
              required
            />

            <Input
              label="Doctor Name"
              name="prescribedBy.name"
              value={formData.prescribedBy.name}
              onChange={handleChange}
              error={errors['prescribedBy.name']}
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Start Date"
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                error={errors.startDate}
                required
              />

              <Input
                label="End Date"
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                error={errors.endDate}
                required
              />
            </div>

            {formData.medications.map((med, index) => (
              <div key={index} className="border p-4 rounded-md space-y-4 bg-gray-50">
                <h4 className="text-md font-semibold text-gray-800">Medication {index + 1}</h4>
                <Input
                  label="Medication Name"
                  name="name"
                  value={med.name}
                  onChange={(e) => handleMedicationChange(index, e)}
                  error={errors[`medications[${index}].name`]}
                  required
                />

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Dosage"
                    name="dosage"
                    value={med.dosage}
                    onChange={(e) => handleMedicationChange(index, e)}
                    error={errors[`medications[${index}].dosage`]}
                    required
                  />

                  <Input
                    label="Frequency"
                    name="frequency"
                    value={med.frequency}
                    onChange={(e) => handleMedicationChange(index, e)}
                    error={errors[`medications[${index}].frequency`]}
                    required
                  />
                </div>

                <Input
                  label="Instructions (e.g., take with food)"
                  name="instructions"
                  value={med.instructions}
                  onChange={(e) => handleMedicationChange(index, e)}
                />

                {formData.medications.length > 1 && (
                  <Button
                    type="button"
                    onClick={() => handleRemoveMedication(index)}
                    variant="secondary"
                    className="mt-2"
                  >
                    Remove Medication
                  </Button>
                )}
              </div>
            ))}

            <div className="flex justify-end">
              <Button
                type="button"
                onClick={handleAddMedication}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Add Another Medication
              </Button>
            </div>

            <Input
              label="Pharmacy Name"
              name="pharmacy.name"
              value={formData.pharmacy.name}
              onChange={handleChange}
            />

            <Input
              label="Pharmacy Phone"
              name="pharmacy.phone"
              value={formData.pharmacy.phone}
              onChange={handleChange}
            />

            {errors.submit && <p className="mt-2 text-sm text-red-600 text-center">{errors.submit}</p>}

            <div className="flex justify-end space-x-3 mt-6">
              <Button
                type="button"
                variant="secondary"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                {isLoading ? 'Adding...' : 'Add Prescription'}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPrescriptionModal; 