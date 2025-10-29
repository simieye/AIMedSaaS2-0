// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Badge } from '@/components/ui';
// @ts-ignore;
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';

export function ErrorAnalysisPanel({
  data,
  className,
  style
}) {
  const getTrendIcon = trend => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-red-500" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-green-500" />;
      default:
        return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };
  return <div className={className} style={style}>
      <Card>
        <CardHeader>
          <CardTitle>错误类型分析</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data?.map((error, index) => <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-8 bg-red-500 rounded"></div>
                  <div>
                    <h4 className="font-medium text-gray-900">{error.errorType}</h4>
                    <p className="text-sm text-gray-600">{error.count} 例 ({error.percentage}%)</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getTrendIcon(error.trend)}
                  <span className="text-sm text-gray-500">{error.trend === 'stable' ? '稳定' : error.trend === 'up' ? '上升' : '下降'}</span>
                </div>
              </div>)}
          </div>
        </CardContent>
      </Card>
    </div>;
}