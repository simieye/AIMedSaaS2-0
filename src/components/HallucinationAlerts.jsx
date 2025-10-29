// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Badge } from '@/components/ui';
// @ts-ignore;
import { AlertTriangle, Eye, Clock, CheckCircle, AlertCircle } from 'lucide-react';

export function HallucinationAlerts({
  alerts,
  onViewAlert,
  className,
  style
}) {
  const getSeverityBadge = severity => {
    const severityConfig = {
      high: {
        color: 'bg-red-100 text-red-800',
        icon: AlertTriangle,
        text: '高危'
      },
      medium: {
        color: 'bg-yellow-100 text-yellow-800',
        icon: AlertCircle,
        text: '中危'
      },
      low: {
        color: 'bg-green-100 text-green-800',
        icon: CheckCircle,
        text: '低危'
      }
    };
    const config = severityConfig[severity] || severityConfig.medium;
    const Icon = config.icon;
    return <Badge className={config.color}>
        <Icon className="w-3 h-3 mr-1" />
        {config.text}
      </Badge>;
  };
  const getStatusBadge = status => {
    const statusConfig = {
      pending: {
        color: 'bg-yellow-100 text-yellow-800',
        icon: Clock,
        text: '待处理'
      },
      investigating: {
        color: 'bg-blue-100 text-blue-800',
        icon: AlertCircle,
        text: '调查中'
      },
      resolved: {
        color: 'bg-green-100 text-green-800',
        icon: CheckCircle,
        text: '已解决'
      }
    };
    const config = statusConfig[status] || statusConfig.pending;
    const Icon = config.icon;
    return <Badge className={config.color}>
        <Icon className="w-3 h-3 mr-1" />
      {config.text}
      </Badge>;
  };
  return <div className={className} style={style}>
      <Card>
        <CardHeader>
          <CardTitle>幻觉检测告警</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {alerts.map(alert => <div key={alert.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="font-medium text-gray-900">{alert.title}</h4>
                      {getSeverityBadge(alert.severity)}
                      {getStatusBadge(alert.status)}
                    </div>
                    <p className="text-gray-700 text-sm mb-2">{alert.description}</p>
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                      <div>
                        <span>查询:</span>
                        <span className="ml-1 font-medium text-gray-900">{alert.query}</span>
                      </div>
                      <div>
                        <span>模型:</span>
                        <span className="ml-1 font-medium text-gray-900">{alert.model}</span>
                      </div>
                      <div>
                        <span>检测时间:</span>
                        <span className="ml-1 font-medium text-gray-900">{alert.detectedAt}</span>
                      </div>
                      <div>
                        <span>负责人:</span>
                        <span className="ml-1 font-medium text-gray-900">{alert.assignedTo}</span>
                      </div>
                    </div>
                    <div className="mt-2">
                      <span className="text-sm text-gray-600">置信度:</span>
                      <span className="ml-1 font-medium text-gray-900">{(alert.confidence * 100).toFixed(0)}%</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => onViewAlert(alert.id)}>
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </div>)}
          </div>
        </CardContent>
      </Card>
    </div>;
}