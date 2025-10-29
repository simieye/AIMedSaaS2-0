// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
// @ts-ignore;
import { Key, Activity, Clock, TrendingUp } from 'lucide-react';

export function ApiKeyStats({
  apiKeys
}) {
  const totalKeys = apiKeys.length;
  const activeKeys = apiKeys.filter(k => k.status === 'active').length;
  const inactiveKeys = apiKeys.filter(k => k.status === 'inactive').length;
  const revokedKeys = apiKeys.filter(k => k.status === 'revoked').length;
  const totalUsage = apiKeys.reduce((sum, key) => sum + (key.usage?.total_usage || 0), 0);
  const stats = [{
    title: '总密钥数',
    value: totalKeys,
    icon: Key,
    color: 'text-blue-600',
    description: '已创建密钥'
  }, {
    title: '活跃密钥',
    value: activeKeys,
    icon: Activity,
    color: 'text-green-600',
    description: '正在使用'
  }, {
    title: '停用密钥',
    value: inactiveKeys,
    icon: Clock,
    color: 'text-yellow-600',
    description: '已暂停'
  }, {
    title: '总调用次数',
    value: totalUsage.toLocaleString(),
    icon: TrendingUp,
    color: 'text-purple-600',
    description: 'API调用'
  }];
  return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => <Card key={index} className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>)}
    </div>;
}