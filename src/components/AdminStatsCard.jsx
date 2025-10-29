// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';

export function AdminStatsCard({
  title,
  value,
  icon: Icon,
  color,
  trend
}) {
  return <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className={`h-4 w-4 ${color}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {trend && <p className="text-xs text-muted-foreground">{trend}</p>}
      </CardContent>
    </Card>;
}