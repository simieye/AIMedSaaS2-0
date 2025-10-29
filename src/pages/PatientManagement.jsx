// @ts-ignore;
import React from 'react';

// @ts-ignore;
import { PatientManagementEnhanced } from '@/components/PatientManagementEnhanced';
// @ts-ignore;
import { AIChatEntry } from '@/components/AIChatEntry';
export default function PatientManagement(props) {
  const {
    $w,
    style
  } = props;
  return <div style={style} className="min-h-screen bg-gray-50">
      <PatientManagementEnhanced />
      <AIChatEntry />
    </div>;
}