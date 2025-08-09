import React, { useState } from 'react';
import Button from '../common/Button';
import Input from '../common/Input';
import Alert from '../common/Alert';

const PersonalInfo = ({ user, onUpdate }) => {
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    dateOfBirth: user?.dateOfBirth || '',
    gender: user?.gender || '',
    policyNumber: user?.policyNumber || '',
    insuranceProvider: user?.insuranceProvider || '',
    city: user?.city || '',
    state: user?.state || '',
    zipCode: user?.zipCode || ''
  });

  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onUpdate(formData);
      setSuccess('Personal information updated successfully');
      setIsEditing(false);
    } catch (err) {
      setError('Failed to update personal information');
    }
  };

  if (!isEditing) {
    return (
      <div className="space-y-6">
        {success && <Alert type="success" message={success} />}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium text-gray-500">Full Name</h4>
            <p className="mt-1">{`${formData.firstName} ${formData.lastName}`}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500">Email</h4>
            <p className="mt-1">{formData.email}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500">Phone</h4>
            <p className="mt-1">{formData.phone}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500">Date of Birth</h4>
            <p className="mt-1">{formData.dateOfBirth}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500">Gender</h4>
            <p className="mt-1">{formData.gender}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500">Insurance Provider</h4>
            <p className="mt-1">{formData.insuranceProvider || 'Not specified'}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500">Policy Number</h4>
            <p className="mt-1">{formData.policyNumber || 'Not specified'}</p>
          </div>
          <div className="md:col-span-2">
            <h4 className="text-sm font-medium text-gray-500">Address</h4>
            <p className="mt-1">{formData.address}</p>
          </div>
        </div>
        <Button onClick={() => setIsEditing(true)}>Edit Information</Button>
      </div>
    );
  }

  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <Alert type="error" message={error} />}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Input
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <Input
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Input
              label="Date of Birth"
              name="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
            />
            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Input
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Input
              label="Phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Input
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <Input
              label="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
            <Input
              label="State"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
            />
            <Input
              label="ZIP Code"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Insurance Provider</label>
            <input
              type="text"
              name="insuranceProvider"
              value={formData.insuranceProvider}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              placeholder="Enter your insurance company name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Policy Number</label>
            <input
              type="text"
              name="policyNumber"
              value={formData.policyNumber}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              placeholder="Enter your policy number"
            />
          </div>

          <div className="flex justify-end">
            <Button type="submit">
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PersonalInfo; 