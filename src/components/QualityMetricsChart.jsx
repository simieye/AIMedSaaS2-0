// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';

// @ts-ignore;
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
export function QualityMetricsChart({
  qualityMetrics,
  className,
  style
}) {
  const formatPercentage = num => {
    return (num * 100).toFixed(1) + '%';
  };
  return <div className={className} style={style}>
      <div className="grid grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>质量指标雷达图</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <RadarChart data={qualityMetrics}>
                <PolarGrid />
                <PolarAngleAxis dataKey="metric" />
                <PolarRadiusAxis angle={90} domain={[0, 1]} />
                <Radar name="当前值" dataKey="value" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
                <Radar name="基准值" dataKey="benchmark" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
                <Legend />
                <Tooltip formatter={(value, name) => [formatPercentage(value), name]} />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>质量指标对比</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={qualityMetrics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="metric" />
                <YAxis domain={[0, 1]} />
                <Tooltip formatter={(value, name) => [formatPercentage(value), name]} />
                <Legend />
                <Bar dataKey="value" fill="#3B82F6" name="当前值" />
                <Bar dataKey="benchmark" fill="#10B981" name="基准值" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>;
}