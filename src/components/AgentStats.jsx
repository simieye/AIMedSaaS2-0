// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
// @ts-ignore;
import { TrendingUp, Users, Activity, Target } from 'lucide-react';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
export function AgentStats() {
  const performanceData = [{
    date: '2024-10-01',
    accuracy: 92.5,
    calls: 145
  }, {
    date: '2024-10-02',
    accuracy: 94.2,
    calls: 167
  }, {
    date: '2024-10-03',
    accuracy: 93.8,
    calls: 189
  }, {
    date: '2024-10-04',
    accuracy: 95.1,
    calls: 201
  }, {
    date: '2024-10-05',
    accuracy: 94.7,
    calls: 178
  }];
  const typeDistribution = [{
    name: '诊断助手',
    value: 35,
    color: '#007BFF'
  }, {
    name: '随访管理',
    value: 28,
    color: '#28A745'
  }, {
    name: '用药提醒',
    value: 20,
    color: '#FFC107'
  }, {
    name: '健康教育',
    value: 17,
    color: '#DC3545'
  }];
  const stats = {
    totalAgents: 80,
    activeAgents: 72,
    avgAccuracy: 94.2,
    totalCalls: 12543,
    dailyCalls: 234,
    uptime: 99.8
  };
  return <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">总智能体数</CardTitle>
            <Target className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalAgents}</div>
            <p className="text-xs text-muted-foreground">+5 本月新增</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">活跃智能体</CardTitle>
            <Activity className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeAgents}</div>
            <p className="text-xs text-muted-foreground">{(stats.activeAgents / stats.totalAgents * 100).toFixed(1)}% 活跃率</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">平均准确率</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.avgAccuracy}%</div>
            <p className="text-xs text-muted-foreground">+2.1% 较上周</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">总调用次数</CardTitle>
            <Users className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCalls.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">{stats.dailyCalls}/日平均</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>性能趋势</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Line yAxisId="left" type="monotone" dataKey="accuracy" stroke="#007BFF" strokeWidth={2} name="准确率(%)" />
                <Line yAxisId="right" type="monotone" dataKey="calls" stroke="#28A745" strokeWidth={2} name="调用次数" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>智能体类型分布</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={typeDistribution} cx="50%" cy="50%" labelLine={false} label={({
                name,
                percent
              }) => `${name} ${(percent * 100).toFixed(0)}%`} outerRadius={80} fill="#8884d8" dataKey="value">
                  {typeDistribution.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>;
}