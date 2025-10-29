// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react';

export function StatusBadge({
  status,
  size = 'sm'
}) {
  const statusConfig = {
    active: {
      label: '活跃',
      color: 'bg-green-100 text-green-800',
      icon: CheckCircle
    },
    inactive: {
      label: '非活跃',
      color: 'bg-gray-100 text-gray-800',
      icon: Clock
    },
    error: {
      label: '错误',
      color: 'bg-red-100 text-red-800',
      icon: XCircle
    },
    warning: {
      label: '警告',
      color: 'bg-yellow-100 text-yellow-800',
      icon: AlertCircle
    },
    pending: {
      label: '待处理',
      color: 'bg-blue-100 text-blue-800',
      icon: Clock
    },
    success: {
      label: '成功',
      color: 'bg-green-100 text-green-800',
      icon: CheckCircle
    }
  };
  const config = statusConfig[status] || statusConfig.inactive;
  const Icon = config.icon;
  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-2.5 py-0.5',
    lg: 'text-sm px-3 py-1'
  };
  return <span className={`inline-flex items-center rounded-full font-medium ${config.color} ${sizeClasses[size]}`}>
      <Icon className="mr-1 h-3 w-3" />
      {config.label}
    </span>;
}