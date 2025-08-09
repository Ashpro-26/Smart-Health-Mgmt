import React, { useState } from 'react';
import Button from '../common/Button';
import Alert from '../common/Alert';

const AccountSettings = ({ user, onUpdate }) => {
  const [formData, setFormData] = useState({
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    notifications: user?.notifications || {
      email: true,
      sms: false,
      appointments: true,
      reminders: true
    }
  });

  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        notifications: {
          ...prev.notifications,
          [name]: checked
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
    if (formData.newPassword !== formData.confirmPassword) {
      setError('New passwords do not match');
      return;
    }
    try {
      await onUpdate(formData);
      setSuccess('Account settings updated successfully');
      setIsEditing(false);
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
    } catch (err) {
      setError('Failed to update account settings');
    }
  };

  if (!isEditing) {
    return (
      <div className="space-y-6">
        {success && <Alert type="success" message={success} />}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium text-gray-500">Email</h4>
            <p className="mt-1">{formData.email}</p>
          </div>
          <div className="md:col-span-2">
            <h4 className="text-sm font-medium text-gray-500">Notification Preferences</h4>
            <div className="mt-2 space-y-2">
              <p>Email Notifications: {formData.notifications.email ? 'Enabled' : 'Disabled'}</p>
              <p>SMS Notifications: {formData.notifications.sms ? 'Enabled' : 'Disabled'}</p>
              <p>Appointment Reminders: {formData.notifications.appointments ? 'Enabled' : 'Disabled'}</p>
              <p>Medication Reminders: {formData.notifications.reminders ? 'Enabled' : 'Disabled'}</p>
            </div>
          </div>
        </div>
        <Button onClick={() => setIsEditing(true)}>Edit Settings</Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <Alert type="error" message={error} />}
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            required
          />
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-medium text-gray-700">Change Password</h4>
          <div>
            <label className="block text-sm font-medium text-gray-700">Current Password</label>
            <input
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">New Password</label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-medium text-gray-700">Notification Preferences</h4>
          <div className="space-y-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                name="email"
                checked={formData.notifications.email}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <label className="ml-2 block text-sm text-gray-700">
                Email Notifications
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="sms"
                checked={formData.notifications.sms}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <label className="ml-2 block text-sm text-gray-700">
                SMS Notifications
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="appointments"
                checked={formData.notifications.appointments}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <label className="ml-2 block text-sm text-gray-700">
                Appointment Reminders
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="reminders"
                checked={formData.notifications.reminders}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <label className="ml-2 block text-sm text-gray-700">
                Medication Reminders
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="secondary" onClick={() => setIsEditing(false)}>
          Cancel
        </Button>
        <Button type="submit">
          Save Changes
        </Button>
      </div>
    </form>
  );
};

export default AccountSettings; 