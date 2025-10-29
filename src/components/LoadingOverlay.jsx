// @ts-ignore;
import React from 'react';

// @ts-ignore;
import { LoadingSpinner } from './LoadingSpinner';
export function LoadingOverlay({
  isLoading,
  message = '加载中...'
}) {
  if (!isLoading) return null;
  return <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 flex flex-col items-center">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-gray-600">{message}</p>
      </div>
    </div>;
}