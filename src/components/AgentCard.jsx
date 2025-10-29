// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Badge, Progress } from '@/components/ui';
// @ts-ignore;
import { Bot, Activity, TrendingUp, Clock } from 'lucide-react';

export function AgentCard({
  agent,
  t
}) {
  const safeT = t || (key => key);
  const getStatusColor = status => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'idle':
        return 'bg-gray-100 text-gray-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      case 'training':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  const getStatusIcon = status => {
    switch (status) {
      case 'active':
        return <Activity className="h-4 w-4" />;
      case 'idle':
        return <Clock className="h-4 w-4" />;
      case 'error':
        return <Bot className="h-4 w-4" />;
      case 'training':
        return <TrendingUp className="h-4 w-4" />;
      default:
        return <Bot className="h-4 w-4" />;
    }
  };
  return <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{agent.name}</CardTitle>
          <Badge className={getStatusColor(agent.status)}>
            <div className="flex items-center space-x-1">
              {getStatusIcon(agent.status)}
              <span>{agent.status}</span>
            </div>
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>准确率</span>
              <span>{agent.accuracy}%</span>
            </div>
            <Progress value={agent.accuracy} className="h-2" />
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">调用次数</p>
              <p className="font-semibold">{agent.calls.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-gray-500">响应时间</p>
              <p className="font-semibold">{agent.responseTime || '< 1s'}</p>
            </div>
          </div>
          
          {agent.description && <p className="text-sm text-gray-600">{agent.description}</p>}
          
          <div className="flex space-x-2">
            <button className="text-xs text-blue-600 hover:underline">详情</button>
            <button className="text-xs text-green-600 hover:underline">训练</button>
            <button className="text-xs text-red-600 hover:underline">停用</button>
          </div>
        </div>
      </CardContent>
    </Card>;
}