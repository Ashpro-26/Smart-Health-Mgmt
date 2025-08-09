import React from 'react';

const Alert = ({ message, type }) => {
  let alertClasses = 'p-3 rounded-md mb-4';
  let textClasses = '';

  switch (type) {
    case 'success':
      alertClasses += ' bg-green-100 border border-green-400';
      textClasses = 'text-green-700';
      break;
    case 'error':
      alertClasses += ' bg-red-100 border border-red-400';
      textClasses = 'text-red-700';
      break;
    case 'info':
      alertClasses += ' bg-blue-100 border border-blue-400';
      textClasses = 'text-blue-700';
      break;
    default:
      alertClasses += ' bg-gray-100 border border-gray-400';
      textClasses = 'text-gray-700';
  }

  if (!message) return null;

  return (
    <div className={`${alertClasses} ${textClasses}`} role="alert">
      {message}
    </div>
  );
};

export default Alert; 