// @ts-ignore;
import React from 'react';

// @ts-ignore;
import { UnifiedDashboard } from '@/components/UnifiedDashboard';
// @ts-ignore;
import { AIChatEntry } from '@/components/AIChatEntry';
export default function UnifiedPortal(props) {
  const {
    $w,
    style
  } = props;
  return <div style={style} className="min-h-screen bg-gray-50">
      <UnifiedDashboard />
      <AIChatEntry />
    </div>;
}