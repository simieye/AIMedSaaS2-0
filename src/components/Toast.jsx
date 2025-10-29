// @ts-ignore;
import React, { useEffect } from 'react';
// @ts-ignore;
import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react';

export function Toast({
  message,
  type = 'success',
  duration = 3000,
  onClose
}) {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);
  const icons = {
    success: <CheckCircle className="h-5 w-5 text-green-500" />,
    error: <XCircle className="h-5 w-5 text-red-500" />,
    warning: <AlertCircle className="h-5 w-5 text-yellow-500" />,
    info: <AlertCircle className="h-5 w-5 text-blue-500" />
  };
  const bgColors = {
    success: 'bg-green-50 border-green-200',
    error: 'bg-red-50 border-red-200',
    warning: 'bg-yellow-50 border-yellow-200',
    info: 'bg-blue-50 border-blue-200'
  };
  return <div className={`fixed top-4 right-4 max-w-sm w-full ${bgColors[type]} border rounded-lg shadow-lg p-4 flex items-start space-x-3 z-50`}>
      <div className="flex-shrink-0">
        {icons[type]}
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-900">{message}</p>
      </div>
      <button onClick={onClose} className="flex-shrink-0 text-gray-400 hover:text-gray-600">
        <X className="h-4 w-4" />
      </button>
    </div>;
}