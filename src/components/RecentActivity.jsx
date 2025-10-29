// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button } from '@/components/ui';
// @ts-ignore;
import { Activity, Clock, User, FileText, Bell, TrendingUp, Heart } from 'lucide-react';

export function RecentActivity() {
  const activities = [{
    id: 1,
    type: 'patient',
    title: '新患者注册',
    description: '张三完成了健康档案建立',
    time: '2分钟前',
    icon: User,
    color: 'text-blue-600'
  }, {
    id: 2,
    type: 'system',
    title: 'AI诊断完成',
    description: '诊断助手处理了15个新病例',
    time: '5分钟前',
    icon: Activity,
    color: 'text-green-600'
  }, {
    id: 3,
    type: 'partner',
    title: '新合同签署',
    description: '与岳阳第一人民医院签署合作协议',
    time: '10分钟前',
    icon: FileText,
    color: 'text-purple-600'
  }, {
    id: 4,
    type: 'alert',
    title: '异常提醒',
    description: '患者李四血压异常，需要关注',
    time: '15分钟前',
    icon: Bell,
    color: 'text-red-600'
  }, {
    id: 5,
    type: 'achievement',
    title: '里程碑达成',
    description: '本月患者依从性提升20%',
    time: '30分钟前',
    icon: TrendingUp,
    color: 'text-yellow-600'
  }, {
    id: 6,
    type: 'health',
    title: '健康报告',
    description: '生成了500份个性化健康报告',
    time: '1小时前',
    icon: Heart,
    color: 'text-pink-600'
  }];
  const getActivityIcon = (icon, color) => {
    const IconComponent = icon;
    return <IconComponent className={`h-5 w-5 ${color}`} />;
  };
  return <Card>
      <CardHeader>
        <CardTitle>最近活动</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map(activity => <div key={activity.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="flex-shrink-0">
                {getActivityIcon(activity.icon, activity.color)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                <p className="text-sm text-gray-500">{activity.description}</p>
                <div className="flex items-center mt-1">
                  <Clock className="h-3 w-3 text-gray-400 mr-1" />
                  <p className="text-xs text-gray-400">{activity.time}</p>
                </div>
              </div>
            </div>)}
        </div>
        
        <div className="mt-4 pt-4 border-t">
          <Button variant="ghost" size="sm" className="w-full">
            查看全部活动
          </Button>
        </div>
      </CardContent>
    </Card>;
}