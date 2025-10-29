// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';

// @ts-ignore;
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
export function ModelPerformance({
  data,
  className,
  style
}) {
  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];
  return <div className={className} style={style}>
      <Card>
        <CardHeader>
          <CardTitle>模型性能对比</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={data || []} cx="50%" cy="50%" labelLine={false} label={({
              model,
              rate
            }) => `${model}: ${(rate * 100).toFixed(1)}%`} outerRadius={80} fill="#8884d8" dataKey="queries">
                {(data || []).map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>;
}