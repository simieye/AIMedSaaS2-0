// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';

// @ts-ignore;
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, AreaChart, Area } from 'recharts';
export function PerformanceTrends({
  trends,
  className,
  style
}) {
  const formatNumber = num => {
    return new Intl.NumberFormat('zh-CN').format(num);
  };
  return <div className={className} style={style}>
      <div className="grid grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>查询量与响应时间趋势</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="queries" stroke="#3B82F6" name="查询量" strokeWidth={2} />
                <Line yAxisId="right" type="monotone" dataKey="avgResponseTime" stroke="#EF4444" name="响应时间(ms)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>成功率与准确性趋势</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={trends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[90, 100]} />
                <Tooltip formatter={(value, name) => [`${value}%`, name]} />
                <Legend />
                <Area type="monotone" dataKey="successRate" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.6} name="成功率" />
                <Area type="monotone" dataKey="accuracy" stackId="2" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.6} name="准确性" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>;
}