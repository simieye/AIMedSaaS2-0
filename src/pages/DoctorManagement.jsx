// @ts-ignore;
import React from 'react';

// @ts-ignore;
import { DoctorManagement as DoctorManagementComponent } from '@/components/DoctorManagement';
// @ts-ignore;
import { AIChatEntry } from '@/components/AIChatEntry';
export default function DoctorManagement(props) {
  const {
    $w,
    style
  } = props;
  return <div style={style} className="min-h-screen bg-gray-50">
      <DoctorManagementComponent />
      <AIChatEntry />
    </div>;
}