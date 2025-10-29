// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Badge, Progress, Button } from '@/components/ui';
// @ts-ignore;
import { User, Heart, Activity, Calendar, AlertTriangle } from 'lucide-react';

export function PatientCard({
  patient,
  onViewDetails
}) {
  const getRiskColor = risk => {
    switch (risk) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  const getRiskIcon = risk => {
    switch (risk) {
      case 'high':
        return <AlertTriangle className="h-4 w-4" />;
      case 'medium':
        return <Activity className="h-4 w-4" />;
      case 'low':
        return <Heart className="h-4 w-4" />;
      default:
        return <User className="h-4 w-4" />;
    }
  };
  return <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-lg">{patient.name}</CardTitle>
              <p className="text-sm text-gray-500">{patient.age}岁</p>
            </div>
          </div>
          <Badge className={getRiskColor(patient.risk)}>
            <div className="flex items-center space-x-1">
              {getRiskIcon(patient.risk)}
              <span>{patient.risk === 'high' ? '高风险' : patient.risk === 'medium' ? '中风险' : '低风险'}</span>
            </div>
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div>
            <p className="text-sm text-gray-600 mb-1">疾病状况</p>
            <p className="text-sm font-medium">{patient.conditions.join(', ')}</p>
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>依从性</span>
              <span>{patient.adherence}%</span>
            </div>
            <Progress value={patient.adherence} className="h-2" />
          </div>
          
          <div className="flex justify-between text-sm">
            <div>
              <p className="text-gray-500">最后就诊</p>
              <p className="font-medium">{patient.lastVisit}</p>
            </div>
            <div>
              <p className="text-gray-500">随访状态</p>
              <Badge variant={patient.followUpStatus === 'due' ? 'destructive' : 'secondary'}>
                {patient.followUpStatus === 'due' ? '待随访' : '已随访'}
              </Badge>
            </div>
          </div>
          
          <div className="flex space-x-2 pt-2">
            <Button size="sm" variant="outline" onClick={() => onViewDetails(patient)}>
              查看详情
            </Button>
            <Button size="sm" variant="ghost">
              发起随访
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>;
}