// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Badge, useToast } from '@/components/ui';
// @ts-ignore;
import { AlertTriangle, TrendingUp, TrendingDown, Eye, CheckCircle, Clock } from 'lucide-react';

export function AlertManagement({
  alerts,
  onInvestigate,
  onResolve,
  className,
  style
}) {
  const {
    toast
  } = useToast();
  const getSeverityBadge = severity => {
    const severityConfig = {
      error: {
        color: 'bg-red-100 text-red-800',
        icon: AlertTriangle,
        text: '严重'
      },
      warning: {
        color: 'bg-yellow-100 text-yellow-800',
        icon: Clock,
        text: '警告'
      },
      info: {
        color: 'bg-blue-100 text-blue-800',
        icon: Eye,
        text: '信息'
      }
    };
    const config = severityConfig[severity] || severityConfig.info;
    const Icon = config.icon;
    return <Badge className={config.color}>
        <Icon className="w-3 h-3 mr-1" />
        {config.text}
      </Badge>;
  };
  const getStatusBadge = status => {
    const statusConfig = {
      active: {
        color: 'bg-red-100 text-red-800',
        text: '活跃'
      },
      investigating: {
        color: 'bg-yellow-100 text-yellow-800',
        text: '调查中'
      },
      resolved: {
        color: 'bg-green-100 text-green-800',
        text: '已解决'
      }
    };
    const config = statusConfig[status] || statusConfig.active;
    return <Badge className={config.color}>{config.text}</Badge>;
  };
  const handleInvestigate = alertId => {
    if (onInvestigate) {
      onInvestigate(alertId);
    }
  };
  const handleResolve = alertId => {
    if (onResolve) {
      onResolve(alertId);
    }
  };
  return <div className={className} style={style}>
      <Card>
        <CardHeader>
          <CardTitle>警报管理</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {alerts?.map(alert => <div key={alert.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    {getSeverityBadge(alert.severity)}
                    <div>
                      <h4 className="font-medium text-gray-900">{alert.message}</h4>
                      <p className="text-sm text-gray-600 mt-1">{alert.details}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusBadge(alert.status)}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    {alert.timestamp}
                  </div>
                  <div className="flex items-center space-x-2">
                    {alert.status === 'active' && <Button variant="outline" size="sm" onClick={() => handleInvestigate(alert.id)}>
                        <Eye className="w-4 h-4 mr-2" />
                        调查
                      </Button>}
                    {alert.status !== 'resolved' && <Button variant="outline" size="sm" onClick={() => handleResolve(alert.id)}>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        解决
                      </Button>}
                  </div>
                </div>
              </div>)}
          </div>
        </CardContent>
      </Card>
    </div>;
}