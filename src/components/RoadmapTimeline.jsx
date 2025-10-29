// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
// @ts-ignore;
import { CheckCircle, Clock, Target, Rocket, Users, TrendingUp } from 'lucide-react';

export function RoadmapTimeline({
  milestones,
  className,
  style
}) {
  const getPhaseIcon = phase => {
    const iconMap = {
      mvp: Rocket,
      beta: Target,
      scale: TrendingUp
    };
    return iconMap[phase] || Target;
  };
  const getPhaseColor = phase => {
    const colorMap = {
      mvp: 'bg-blue-100 text-blue-800',
      beta: 'bg-purple-100 text-purple-800',
      scale: 'bg-green-100 text-green-800'
    };
    return colorMap[phase] || colorMap.mvp;
  };
  const getStatusIcon = status => {
    const iconMap = {
      completed: CheckCircle,
      in_progress: Clock,
      planned: Target
    };
    return iconMap[status] || Target;
  };
  const getStatusColor = status => {
    const colorMap = {
      completed: 'text-green-600',
      in_progress: 'text-blue-600',
      planned: 'text-gray-400'
    };
    return colorMap[status] || colorMap.planned;
  };
  return <div className={className} style={style}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="w-5 h-5 mr-2" />
            里程碑时间轴
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            {/* 时间轴线 */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200"></div>
            
            {/* 里程碑节点 */}
            <div className="space-y-8">
              {milestones?.map((milestone, index) => {
              const Icon = getPhaseIcon(milestone.phase);
              const StatusIcon = getStatusIcon(milestone.status);
              return <div key={milestone.id} className="relative flex items-start space-x-6">
                  {/* 节点圆圈 */}
                  <div className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center ${getPhaseColor(milestone.phase)}`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  
                  {/* 内容 */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{milestone.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPhaseColor(milestone.phase)}`}>
                        {milestone.phase.toUpperCase()}
                      </span>
                      <StatusIcon className={`w-5 h-5 ${getStatusColor(milestone.status)}`} />
                    </div>
                    <p className="text-gray-600 mb-3">{milestone.description}</p>
                    <div className="flex items-center space-x-6 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{milestone.startDate} - {milestone.endDate}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{milestone.teamSize} 人团队</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <TrendingUp className="w-4 h-4" />
                        <span>{milestone.targetUsers} 目标用户</span>
                      </div>
                    </div>
                    
                    {/* 关键目标 */}
                    <div className="mt-4">
                      <h4 className="font-medium text-gray-900 mb-2">关键目标</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {milestone.keyObjectives?.map((objective, idx) => <div key={idx} className="flex items-center space-x-2 text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span>{objective}</span>
                          </div>)}
                      </div>
                    </div>
                  </div>
                </div>;
            })}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>;
}