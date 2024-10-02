import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center space-x-2 animate-spin">
      <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
    </div>
  );
};

export default LoadingSpinner;
