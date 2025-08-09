// src/components/AppointmentBooking.js
import React, { useState } from 'react';
import Button from '../components/common/Button';
import Input from '../components/common/Input';

const Appointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [showBookingForm, setShowBookingForm] = useState(false);
    const [formData, setFormData] = useState({
        doctorName: '',
        specialization: '',
        date: '',
        time: '',
        reason: ''
    });
    const [errors, setErrors] = useState({});

    const specializations = [
        'General Physician',
        'Cardiologist',
        'Dermatologist',
        'Neurologist',
        'Pediatrician',
        'Orthopedist',
        'Psychiatrist',
        'Dentist'
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.doctorName.trim()) {
            newErrors.doctorName = 'Doctor name is required';
        }
        if (!formData.specialization) {
            newErrors.specialization = 'Specialization is required';
        }
        if (!formData.date) {
            newErrors.date = 'Date is required';
        } else {
            const selectedDate = new Date(formData.date);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            if (selectedDate < today) {
                newErrors.date = 'Date cannot be in the past';
            }
        }
        if (!formData.time) {
            newErrors.time = 'Time is required';
        }
        if (!formData.reason.trim()) {
            newErrors.reason = 'Reason for visit is required';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const newAppointment = {
            id: Date.now(),
            ...formData,
            status: 'Pending'
        };

        setAppointments(prev => [...prev, newAppointment]);
        setShowBookingForm(false);
        setFormData({
            doctorName: '',
            specialization: '',
            date: '',
            time: '',
            reason: ''
        });
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Confirmed':
                return 'text-green-600';
            case 'Cancelled':
                return 'text-red-600';
            default:
                return 'text-yellow-600';
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Appointments</h1>
                <Button onClick={() => setShowBookingForm(true)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                    Book Appointment
                </Button>
            </div>

            {showBookingForm && (
                <div className="bg-white shadow sm:rounded-lg p-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">Book New Appointment</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input
                            label="Doctor Name"
                            name="doctorName"
                            value={formData.doctorName}
                            onChange={handleChange}
                            error={errors.doctorName}
                            required
                        />

                        <div>
                            <label htmlFor="specialization" className="block text-sm font-medium text-gray-700">
                                Specialization
                            </label>
                            <select
                                id="specialization"
                                name="specialization"
                                value={formData.specialization}
                                onChange={handleChange}
                                className={`mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md ${
                                    errors.specialization ? 'border-red-300' : ''
                                }`}
                                required
                            >
                                <option value="">Select Specialization</option>
                                {specializations.map(spec => (
                                    <option key={spec} value={spec}>{spec}</option>
                                ))}
                            </select>
                            {errors.specialization && (
                                <p className="mt-2 text-sm text-red-600">{errors.specialization}</p>
                            )}
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <Input
                                label="Date"
                                name="date"
                                type="date"
                                value={formData.date}
                                onChange={handleChange}
                                error={errors.date}
                                required
                            />

                            <Input
                                label="Time"
                                name="time"
                                type="time"
                                value={formData.time}
                                onChange={handleChange}
                                error={errors.time}
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="reason" className="block text-sm font-medium text-gray-700">
                                Reason for Visit
                            </label>
                            <textarea
                                id="reason"
                                name="reason"
                                rows={3}
                                value={formData.reason}
                                onChange={handleChange}
                                className={`mt-1 block w-full border ${
                                    errors.reason ? 'border-red-300' : 'border-gray-300'
                                } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm`}
                                required
                            />
                            {errors.reason && (
                                <p className="mt-2 text-sm text-red-600">{errors.reason}</p>
                            )}
                        </div>

                        <div className="flex justify-end space-x-3">
                            <Button
                                variant="secondary"
                                onClick={() => setShowBookingForm(false)}
                            >
                                Cancel
                            </Button>
                            <Button type="submit"
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                            >
                                Book Appointment
                            </Button>
                        </div>
                    </form>
                </div>
            )}

            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                    <h2 className="text-lg font-medium text-gray-900">Your Appointments</h2>
                </div>
                {appointments.length > 0 ? (
                    <div className="border-t border-gray-200">
                        <ul className="divide-y divide-gray-200">
                            {appointments.map(appointment => (
                                <li key={appointment.id} className="px-4 py-4 sm:px-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex flex-col">
                                            <p className="text-sm font-medium text-gray-900">
                                                Dr. {appointment.doctorName}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {appointment.specialization}
                                            </p>
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <p className="text-sm text-gray-900">
                                                {new Date(appointment.date).toLocaleDateString()}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {appointment.time}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">{appointment.reason}</p>
                                        <p className={`text-sm font-medium mt-1 ${getStatusColor(appointment.status)}`}>
                                            {appointment.status}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <div className="px-4 py-5 sm:px-6 text-center text-gray-500">
                        No appointments scheduled. Book your first appointment now!
                    </div>
                )}
            </div>
        </div>
    );
};

export default Appointments;
