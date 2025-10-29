// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';

// @ts-ignore;
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, ResponsiveContainer } from 'recharts';
export function ModelPerformanceChart({
  data,
  className,
  style
}) {
  return <div className={className} style={style}>
      <Card>
        <CardHeader>
          <CardTitle>模型性能对比</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart data={data || []}>
              <PolarGrid />
              <PolarAngleAxis dataKey="model" />
              <PolarRadiusAxis angle={90} domain={[0, 1]} />
              <Radar name="精确率" dataKey="precision" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
              <Radar name="召回率" dataKey="recall" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
              <Radar name="F1分数" dataKey="f1Score" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.6} />
              <Radar name="AUC-ROC" dataKey="aucRoc" stroke="#EF4444" fill="#EF4444" fillOpacity={0.6} />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>;
}