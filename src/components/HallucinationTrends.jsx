// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
// @ts-ignore;
import { TrendingUp } from 'lucide-react';

// @ts-ignore;
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
export function HallucinationTrends({
  data,
  className,
  style
}) {
  return <div className={className} style={style}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            幻觉检测趋势
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Area yAxisId="left" type="monotone" dataKey="hallucinations" stackId="1" stroke="#EF4444" fill="#FCA5A5" name="幻觉数量" />
              <Area yAxisId="right" type="monotone" dataKey="rate" stroke="#F59E0B" fill="#FCD34D" name="检测率(%)" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>;
}