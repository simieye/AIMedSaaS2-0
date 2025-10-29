// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
// @ts-ignore;
import { Activity, AlertTriangle, CheckCircle, Target } from 'lucide-react';

export function HallucinationOverview({
  data,
  className,
  style
}) {
  const formatPercentage = value => {
    return (value * 100).toFixed(1) + '%';
  };
  return <div className={className} style={style}>
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Activity className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">总查询数</p>
                <p className="text-2xl font-bold text-gray-900">
                  {data?.totalQueries?.toLocaleString() || 0}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">幻觉率</p>
                <p className="text-2xl font-bold text-red-600">
                  {formatPercentage(data?.hallucinationRate || 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">准确率</p>
                <p className="text-2xl font-bold text-green-600">
                  {formatPercentage(data?.accuracyRate || 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Target className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">高风险查询</p>
                <p className="text-2xl font-bold text-purple-600">
                  {data?.highRiskQueries || 0}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>;
}