// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';

// @ts-ignore;
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
export function CategoryAnalysis({
  data,
  className,
  style
}) {
  return <div className={className} style={style}>
      <Card>
        <CardHeader>
          <CardTitle>分类幻觉率分析</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data || []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="rate" fill="#EF4444" name="幻觉率" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>;
}