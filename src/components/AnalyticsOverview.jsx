// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
// @ts-ignore;
import { Target, Award, TrendingUp, BarChart3 } from 'lucide-react';

export function AnalyticsOverview({
  analyticsData,
  className,
  style
}) {
  return <div className={className} style={style}>
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">总诊断数</p>
                <p className="text-2xl font-bold text-gray-900">{analyticsData.overview?.totalDiagnoses || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Award className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">平均准确率</p>
                <p className="text-2xl font-bold text-gray-900">
                  {((analyticsData.overview?.avgAccuracy || 0) * 100).toFixed(1)}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">改进率</p>
                <p className="text-2xl font-bold text-gray-900">
                  +{((analyticsData.overview?.improvementRate || 0) * 100).toFixed(1)}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <BarChart3 className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">最佳科室</p>
                <p className="text-lg font-bold text-gray-900">
                  {analyticsData.overview?.topPerformingDept || '-'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>;
}