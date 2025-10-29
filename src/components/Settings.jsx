// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
// @ts-ignore;
import { User, Bell, Shield } from 'lucide-react';

export function Settings({
  doctorData,
  t
}) {
  return <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t ? t('settings') : '个人设置'}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <User className="w-5 h-5 mr-2" />
                个人信息
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">姓名</label>
                  <p className="text-gray-600">{doctorData?.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">科室</label>
                  <p className="text-gray-600">{doctorData?.department}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">职称</label>
                  <p className="text-gray-600">{doctorData?.title}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">执业证书</label>
                  <p className="text-gray-600">{doctorData?.license}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Bell className="w-5 h-5 mr-2" />
                通知设置
              </h3>
              <p className="text-gray-500">通知设置功能开发中</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                安全设置
              </h3>
              <p className="text-gray-500">安全设置功能开发中</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>;
}