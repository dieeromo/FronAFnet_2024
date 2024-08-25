import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

const ErrorNotification = ({ message }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return ReactDOM.createPortal(
    <div className="fixed top-4 right-4 bg-red-500 text-white p-4 rounded shadow-lg z-50">
      <p>{message}</p>
    </div>,
    document.body
  );
};

export default ErrorNotification;
