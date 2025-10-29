// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
// @ts-ignore;
import { Search, Clock, CheckCircle, Users, Target, TrendingUp } from 'lucide-react';

export function PerformanceOverview({
  statistics,
  className,
  style
}) {
  const formatNumber = num => {
    return new Intl.NumberFormat('zh-CN').format(num);
  };
  const formatPercentage = num => {
    return (num * 100).toFixed(1) + '%';
  };
  const getTrendIcon = (current, previous) => {
    if (current > previous) {
      return <TrendingUp className="w-4 h-4 text-green-500" />;
    } else if (current < previous) {
      return <TrendingUp className="w-4 h-4 text-red-500 transform rotate-180" />;
    }
    return <div className="w-4 h-4 bg-gray-300 rounded-full" />;
  };
  return <div className={className} style={style}>
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Search className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">总查询数</p>
                <p className="text-2xl font-bold text-gray-900">{formatNumber(statistics.overview?.totalQueries || 0)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Clock className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">平均响应时间</p>
                <p className="text-2xl font-bold text-gray-900">{(statistics.overview?.avgResponseTime || 0).toFixed(1)}ms</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">成功率</p>
                <p className="text-2xl font-bold text-gray-900">{formatPercentage(statistics.overview?.successRate || 0)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Users className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">用户满意度</p>
                <p className="text-2xl font-bold text-gray-900">{(statistics.overview?.userSatisfaction || 0).toFixed(1)}/5.0</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>;
}