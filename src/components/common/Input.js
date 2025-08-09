import React from 'react';

const Input = ({ label, id, name, type = 'text', value, onChange, required = false, error, className = '' }) => {
  const inputClasses = `py-3 px-3 mt-1 block w-full rounded-md shadow-sm sm:text-sm ${error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'} ${className}`;

  return (
    <div>
      {label && (
        <label htmlFor={id || name} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
        type={type}
        id={id || name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={inputClasses}
      />
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default Input; 