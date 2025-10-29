// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
// @ts-ignore;
import { TrendingUp, Activity, CheckCircle, XCircle, Clock, Zap, BarChart3 } from 'lucide-react';

export function ExperimentStats({
  stats
}) {
  return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center">
            <Activity className="h-4 w-4 mr-2" />
            总实验数
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{stats.total}</p>
          <p className="text-sm text-muted-foreground">个实验</p>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-green-50 to-green-100">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center">
            <TrendingUp className="h-4 w-4 mr-2" />
            运行中
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{stats.running}</p>
          <p className="text-sm text-muted-foreground">个实验</p>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center">
            <CheckCircle className="h-4 w-4 mr-2" />
            已完成
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{stats.completed}</p>
          <p className="text-sm text-muted-foreground">个实验</p>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-red-50 to-red-100">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center">
            <XCircle className="h-4 w-4 mr-2" />
            失败
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{stats.failed}</p>
          <p className="text-sm text-muted-foreground">个实验</p>
        </CardContent>
      </Card>
    </div>;
}