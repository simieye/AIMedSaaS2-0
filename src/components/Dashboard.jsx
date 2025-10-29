// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
// @ts-ignore;
import { Users, Calendar, FileText, TrendingUp, CheckCircle } from 'lucide-react';

export function Dashboard({
  doctorData,
  t
}) {
  return <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t ? t('todayAppointments') : '今日预约'}
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{doctorData?.todayAppointments || 0}</div>
            <p className="text-xs text-muted-foreground">
              {t ? t('appointmentsToday') : '今日预约'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t ? t('completed') : '已完成'}
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{doctorData?.completedAppointments || 0}</div>
            <p className="text-xs text-muted-foreground">
              {t ? t('completedToday') : '今日完成'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t ? t('pendingReports') : '待处理报告'}
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{doctorData?.pendingReports || 0}</div>
            <p className="text-xs text-muted-foreground">
              {t ? t('reportsToReview') : '待审核'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t ? t('activePatients') : '活跃患者'}
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{doctorData?.activePatients || 0}</div>
            <p className="text-xs text-muted-foreground">
              {t ? t('totalPatients') : '总患者数'}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t ? t('recentActivity') : '最近活动'}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              <div>
                <p className="text-sm font-medium">张三 - 高血压复诊</p>
                <p className="text-xs text-gray-500">10:30 - 已就诊</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
              <div>
                <p className="text-sm font-medium">李四 - 糖尿病检查</p>
                <p className="text-xs text-gray-500">11:00 - 待就诊</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              <div>
                <p className="text-sm font-medium">王五 - 体检报告</p>
                <p className="text-xs text-gray-500">11:30 - 已预约</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>;
}