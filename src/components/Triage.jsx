// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Badge } from '@/components/ui';
// @ts-ignore;
import { Clock, AlertTriangle, CheckCircle } from 'lucide-react';

export function Triage({
  doctorData,
  t
}) {
  const triageData = [{
    id: 1,
    patient: '张三',
    symptom: '发热38.5°C',
    priority: 'high',
    waitTime: '15分钟'
  }, {
    id: 2,
    patient: '李四',
    symptom: '咳嗽3天',
    priority: 'medium',
    waitTime: '30分钟'
  }, {
    id: 3,
    patient: '王五',
    symptom: '头痛',
    priority: 'low',
    waitTime: '45分钟'
  }];
  const getPriorityColor = priority => {
    switch (priority) {
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
  return <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t ? t('triageManagement') : '分诊管理'}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {triageData.map(item => <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div>
                    <p className="font-medium">{item.patient}</p>
                    <p className="text-sm text-gray-600">{item.symptom}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Badge className={getPriorityColor(item.priority)}>
                    {item.priority === 'high' ? '紧急' : item.priority === 'medium' ? '中等' : '一般'}
                  </Badge>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-1" />
                    {item.waitTime}
                  </div>
                </div>
              </div>)}
          </div>
        </CardContent>
      </Card>
    </div>;
}