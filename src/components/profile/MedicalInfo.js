import React, { useState } from 'react';
import Button from '../common/Button';
import Alert from '../common/Alert';

const MedicalInfo = ({ user, onUpdate }) => {
  const [formData, setFormData] = useState({
    bloodType: user?.bloodType || '',
    height: user?.height || '',
    weight: user?.weight || '',
    allergies: user?.allergies || '',
    conditions: user?.conditions || '',
    medications: user?.medications || '',
    emergencyContact: {
      name: user?.emergencyContact?.name || '',
      relationship: user?.emergencyContact?.relationship || '',
      phone: user?.emergencyContact?.phone || ''
    }
  });

  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onUpdate(formData);
      setSuccess('Medical information updated successfully');
      setIsEditing(false);
    } catch (err) {
      setError('Failed to update medical information');
    }
  };

  if (!isEditing) {
    return (
      <div className="space-y-6 overflow-y-auto">
        {success && <Alert type="success" message={success} />}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 rounded-lg p-4 shadow-sm">
            <h4 className="text-sm font-medium text-gray-500 mb-2">Blood Type</h4>
            <p className="text-base text-gray-900">{formData.bloodType || 'Not specified'}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 shadow-sm">
            <h4 className="text-sm font-medium text-gray-500 mb-2">Height</h4>
            <p className="text-base text-gray-900">{formData.height ? `${formData.height} cm` : 'Not specified'}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 shadow-sm">
            <h4 className="text-sm font-medium text-gray-500 mb-2">Weight</h4>
            <p className="text-base text-gray-900">{formData.weight ? `${formData.weight} kg` : 'Not specified'}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 shadow-sm">
            <h4 className="text-sm font-medium text-gray-500 mb-2">Allergies</h4>
            <p className="text-base text-gray-900">{formData.allergies || 'None'}</p>
          </div>
          <div className="col-span-full bg-gray-50 rounded-lg p-4 shadow-sm">
            <h4 className="text-sm font-medium text-gray-500 mb-2">Medical Conditions</h4>
            <p className="text-base text-gray-900">{formData.conditions || 'None'}</p>
          </div>
          <div className="col-span-full bg-gray-50 rounded-lg p-4 shadow-sm">
            <h4 className="text-sm font-medium text-gray-500 mb-2">Current Medications</h4>
            <p className="text-base text-gray-900">{formData.medications || 'None'}</p>
          </div>
          <div className="col-span-full bg-gray-50 rounded-lg p-4 shadow-sm">
            <h4 className="text-sm font-medium text-gray-500 mb-2">Emergency Contact</h4>
            <div className="space-y-2">
              <p className="text-base text-gray-900">Name: {formData.emergencyContact.name || 'Not specified'}</p>
              <p className="text-base text-gray-900">Relationship: {formData.emergencyContact.relationship || 'Not specified'}</p>
              <p className="text-base text-gray-900">Phone: {formData.emergencyContact.phone || 'Not specified'}</p>
            </div>
          </div>
        </div>
        <div className="pt-6">
          <Button onClick={() => setIsEditing(true)}>Edit Information</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 overflow-y-auto pb-6">
      {error && <Alert type="error" message={error} />}
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 rounded-lg p-4 shadow-sm">
            <label className="block text-sm font-medium text-gray-700 mb-2">Blood Type</label>
            <select
              name="bloodType"
              value={formData.bloodType}
              onChange={handleChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            >
              <option value="">Select Blood Type</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 shadow-sm">
            <label className="block text-sm font-medium text-gray-700 mb-2">Height (cm)</label>
            <input
              type="number"
              name="height"
              value={formData.height}
              onChange={handleChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              placeholder="Enter height in centimeters"
            />
          </div>

          <div className="bg-gray-50 rounded-lg p-4 shadow-sm">
            <label className="block text-sm font-medium text-gray-700 mb-2">Weight (kg)</label>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              placeholder="Enter weight in kilograms"
            />
          </div>

          <div className="bg-gray-50 rounded-lg p-4 shadow-sm">
            <label className="block text-sm font-medium text-gray-700 mb-2">Allergies</label>
            <input
              type="text"
              name="allergies"
              value={formData.allergies}
              onChange={handleChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              placeholder="List any allergies"
            />
          </div>

          <div className="col-span-full bg-gray-50 rounded-lg p-4 shadow-sm">
            <label className="block text-sm font-medium text-gray-700 mb-2">Medical Conditions</label>
            <textarea
              name="conditions"
              value={formData.conditions}
              onChange={handleChange}
              rows={3}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              placeholder="List any medical conditions"
            />
          </div>

          <div className="col-span-full bg-gray-50 rounded-lg p-4 shadow-sm">
            <label className="block text-sm font-medium text-gray-700 mb-2">Current Medications</label>
            <textarea
              name="medications"
              value={formData.medications}
              onChange={handleChange}
              rows={3}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              placeholder="List current medications"
            />
          </div>

          <div className="col-span-full bg-gray-50 rounded-lg p-4 shadow-sm">
            <h4 className="text-sm font-medium text-gray-700 mb-4">Emergency Contact</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  name="emergencyContact.name"
                  value={formData.emergencyContact.name}
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Relationship</label>
                <input
                  type="text"
                  name="emergencyContact.relationship"
                  value={formData.emergencyContact.relationship}
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  name="emergencyContact.phone"
                  value={formData.emergencyContact.phone}
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
          <Button type="button" variant="secondary" onClick={() => setIsEditing(false)}>
            Cancel
          </Button>
          <Button type="submit">
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
};

export default MedicalInfo; 