// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Badge } from '@/components/ui';
// @ts-ignore;
import { CheckCircle, Clock, AlertCircle, Code, Database, Users, Shield, Zap } from 'lucide-react';

// @ts-ignore;
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
export function FeatureProgress({
  features,
  className,
  style
}) {
  const getStatusBadge = status => {
    const statusConfig = {
      completed: {
        color: 'bg-green-100 text-green-800',
        icon: CheckCircle,
        text: '已完成'
      },
      in_progress: {
        color: 'bg-blue-100 text-blue-800',
        icon: Clock,
        text: '进行中'
      },
      planned: {
        color: 'bg-gray-100 text-gray-800',
        icon: AlertCircle,
        text: '计划中'
      }
    };
    const config = statusConfig[status] || statusConfig.planned;
    const Icon = config.icon;
    return <Badge className={config.color}>
        <Icon className="w-3 h-3 mr-1" />
        {config.text}
      </Badge>;
  };
  const getModuleIcon = module => {
    const iconMap = {
      core: Code,
      data: Database,
      user: Users,
      security: Shield,
      performance: Zap
    };
    return iconMap[module] || Code;
  };
  const getProgressColor = progress => {
    if (progress >= 80) return '#10B981';
    if (progress >= 50) return '#3B82F6';
    if (progress >= 20) return '#F59E0B';
    return '#EF4444';
  };
  const chartData = features?.map(feature => ({
    name: feature.name,
    progress: feature.progress,
    status: feature.status
  })) || [];
  return <div className={className} style={style}>
      <div className="grid grid-cols-2 gap-6">
        {/* 功能列表 */}
        <Card>
          <CardHeader>
            <CardTitle>功能开发进度</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {features?.map(feature => {
              const Icon = getModuleIcon(feature.module);
              return <div key={feature.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <Icon className="w-5 h-5 text-gray-400" />
                      <div>
                        <h4 className="font-medium text-gray-900">{feature.name}</h4>
                        <p className="text-sm text-gray-500">{feature.description}</p>
                      </div>
                    </div>
                    {getStatusBadge(feature.status)}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">进度</span>
                      <span className="font-medium">{feature.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="h-2 rounded-full transition-all duration-300" style={{
                      width: `${feature.progress}%`,
                      backgroundColor: getProgressColor(feature.progress)
                    }}></div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 mt-3 text-xs text-gray-500">
                    <div>
                      <span>负责人:</span>
                      <span className="ml-1 font-medium">{feature.owner}</span>
                    </div>
                    <div>
                      <span>预计:</span>
                      <span className="ml-1 font-medium">{feature.estimatedHours}h</span>
                    </div>
                    <div>
                      <span>优先级:</span>
                      <span className="ml-1 font-medium">{feature.priority}</span>
                    </div>
                  </div>
                </div>;
            })}
            </div>
          </CardContent>
        </Card>

        {/* 进度图表 */}
        <Card>
          <CardHeader>
            <CardTitle>进度概览</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={chartData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 100]} />
                <YAxis dataKey="name" type="category" width={80} />
                <Tooltip />
                <Bar dataKey="progress" radius={[0, 4, 4, 0]}>
                  {chartData.map((entry, index) => <Cell key={`cell-${index}`} fill={getProgressColor(entry.progress)} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            
            {/* 统计信息 */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {features?.filter(f => f.status === 'completed').length || 0}
                </div>
                <div className="text-sm text-gray-600">已完成</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {features?.filter(f => f.status === 'in_progress').length || 0}
                </div>
                <div className="text-sm text-gray-600">进行中</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-600">
                  {features?.filter(f => f.status === 'planned').length || 0}
                </div>
                <div className="text-sm text-gray-600">计划中</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>;
}