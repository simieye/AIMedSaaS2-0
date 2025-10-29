// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Card, CardContent } from '@/components/ui';
// @ts-ignore;
import { AlertTriangle, TrendingUp, Activity, Target, CheckCircle } from 'lucide-react';

export function HallucinationOverview({
  data,
  className,
  style
}) {
  const getRateColor = rate => {
    if (rate > 3) return 'text-red-600';
    if (rate > 2) return 'text-yellow-600';
    return 'text-green-600';
  };
  const getRateIcon = rate => {
    if (rate > 3) return AlertTriangle;
    if (rate > 2) return TrendingUp;
    return CheckCircle;
  };
  const RateIcon = getRateIcon(data?.hallucinationRate || 0);
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
                <p className="text-2xl font-bold text-gray-900">{data?.totalQueries?.toLocaleString() || 0}</p>
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
                <p className="text-sm text-gray-600">幻觉检测数</p>
                <p className="text-2xl font-bold text-gray-900">{data?.hallucinationCount || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <RateIcon className={`w-6 h-6 ${getRateColor(data?.hallucinationRate || 0)}`} />
              </div>
              <div>
                <p className="text-sm text-gray-600">幻觉检测率</p>
                <p className={`text-2xl font-bold ${getRateColor(data?.hallucinationRate || 0)}`}>
                  {(data?.hallucinationRate || 0).toFixed(2)}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Target className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">检测准确率</p>
                <p className="text-2xl font-bold text-gray-900">
                  {((data?.detectionAccuracy || 0) * 100).toFixed(0)}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 严重程度分布 */}
      <div className="grid grid-cols-3 gap-4 mt-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">高危幻觉</p>
                <p className="text-xl font-bold text-red-600">{data?.highSeverityCount || 0}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">中危幻觉</p>
                <p className="text-xl font-bold text-yellow-600">{data?.mediumSeverityCount || 0}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">低危幻觉</p>
                <p className="text-xl font-bold text-green-600">{data?.lowSeverityCount || 0}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>;
}