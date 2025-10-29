// @ts-ignore;
import React from 'react';

// @ts-ignore;
import { ApiKeyManagement as ApiKeyManagementComponent } from '@/components/ApiKeyManagement';
// @ts-ignore;
import { AIChatEntry } from '@/components/AIChatEntry';
export default function ApiKeyManagement(props) {
  const {
    $w,
    style
  } = props;
  return <div style={style} className="min-h-screen bg-gray-50">
      <ApiKeyManagementComponent />
      <AIChatEntry />
    </div>;
}