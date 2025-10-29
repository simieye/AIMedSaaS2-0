// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';

export function ChartContainer({
  title,
  children,
  className = '',
  height = 300
}) {
  return <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div style={{
        height: `${height}px`
      }}>
          {children}
        </div>
      </CardContent>
    </Card>;
}