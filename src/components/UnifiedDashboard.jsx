// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Badge, Tabs, TabsContent, TabsList, TabsTrigger, Avatar, AvatarFallback, AvatarImage, Progress, Alert, AlertDescription, AlertTitle } from '@/components/ui';
// @ts-ignore;
import { Users, Activity, TrendingUp, Clock, AlertCircle, CheckCircle, Heart, Stethoscope, Building, Key, FileText, BarChart3 } from 'lucide-react';

export function UnifiedDashboard({
  userType = 'admin'
}) {
  const [stats, setStats] = useState({
    totalPatients: 0,
    totalDoctors: 0,
    activePartners: 0,
    totalApiCalls: 0,
    systemHealth: 98.5,
    pendingReviews: 0
  });
  const [recentActivities, setRecentActivities] = useState([]);
  const [systemAlerts, setSystemAlerts] = useState([]);
  useEffect(() => {
    loadDashboardData();
  }, []);
  const loadDashboardData = async () => {
    try {
      // 加载患者统计
      const patients = await $w.cloud.callDataSource({
        dataSourceName: 'patient',
        methodName: 'wedaGetRecordsV2',
        params: {
          getCount: true,
          select: {
            $master: true
          }
        }
      });
      // 加载医生统计
      const doctors = await $w.cloud.callDataSource({
        dataSourceName: 'doctor',
        methodName: 'wedaGetRecordsV2',
        params: {
          getCount: true,
          select: {
            $master: true
          }
        }
      });
      // 加载合作伙伴统计
      const partners = await $w.cloud.callDataSource({
        dataSourceName: 'partner',
        methodName: 'wedaGetRecordsV2',
        params: {
          filter: {
            where: {
              status: {
                $eq: 'active'
              }
            }
          },
          getCount: true,
          select: {
            $master: true
          }
        }
      });
      // 加载API使用统计
      const apiKeys = await $w.cloud.callDataSource({
        dataSourceName: 'api_key',
        methodName: 'wedaGetRecordsV2',
        params: {
          select: {
            usage: true
          }
        }
      });
      const totalApiCalls = apiKeys.records.reduce((sum, key) => sum + (key.usage?.total_usage || 0), 0);
      setStats({
        totalPatients: patients.total || 0,
        totalDoctors: doctors.total || 0,
        activePartners: partners.total || 0,
        totalApiCalls: totalApiCalls,
        systemHealth: 98.5,
        pendingReviews: 12
      });
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    }
  };
  const kpiCards = [{
    title: '总患者数',
    value: stats.totalPatients.toLocaleString(),
    icon: Users,
    color: 'text-blue-600',
    trend: '+12%',
    link: '/patients'
  }, {
    title: '注册医生',
    value: stats.totalDoctors.toLocaleString(),
    icon: Stethoscope,
    color: 'text-green-600',
    trend: '+8%',
    link: '/doctors'
  }, {
    title: '活跃合作伙伴',
    value: stats.activePartners.toLocaleString(),
    icon: Building,
    color: 'text-purple-600',
    trend: '+15%',
    link: '/partners'
  }, {
    title: 'API调用总量',
    value: stats.totalApiCalls.toLocaleString(),
    icon: BarChart3,
    color: 'text-orange-600',
    trend: '+23%',
    link: '/api-keys'
  }];
  return <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">医智云统一主控台</h1>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={loadDashboardData}>
            <Activity className="h-4 w-4 mr-2" />
            刷新数据
          </Button>
        </div>
      </div>

      {/* System Alerts */}
      {systemAlerts.length > 0 && <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>系统提醒</AlertTitle>
          <AlertDescription>
            有 {stats.pendingReviews} 项待审核内容需要处理
          </AlertDescription>
        </Alert>}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiCards.map((card, index) => <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => $w.utils.navigateTo({
        pageId: card.link.replace('/', '')
      })}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              <card.icon className={`h-4 w-4 ${card.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className="text-xs text-muted-foreground">{card.trend} 较上月</p>
            </CardContent>
          </Card>)}
      </div>

      {/* System Health */}
      <Card>
        <CardHeader>
          <CardTitle>系统健康状态</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span>系统可用性</span>
              <span>{stats.systemHealth}%</span>
            </div>
            <Progress value={stats.systemHealth} className="w-full" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="text-center">
                <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-600" />
                <div className="text-sm font-medium">数据库</div>
                <div className="text-xs text-muted-foreground">运行正常</div>
              </div>
              <div className="text-center">
                <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-600" />
                <div className="text-sm font-medium">API服务</div>
                <div className="text-xs text-muted-foreground">运行正常</div>
              </div>
              <div className="text-center">
                <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-600" />
                <div className="text-sm font-medium">AI引擎</div>
                <div className="text-xs text-muted-foreground">运行正常</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Button className="w-full justify-start" variant="default" onClick={() => $w.utils.navigateTo({
        pageId: 'patients'
      })}>
          <Users className="h-4 w-4 mr-2" />
          患者管理
        </Button>
        <Button className="w-full justify-start" variant="secondary" onClick={() => $w.utils.navigateTo({
        pageId: 'doctors'
      })}>
          <Stethoscope className="h-4 w-4 mr-2" />
          医生工作台
        </Button>
        <Button className="w-full justify-start" variant="outline" onClick={() => $w.utils.navigateTo({
        pageId: 'partners'
      })}>
          <Building className="h-4 w-4 mr-2" />
          合作伙伴
        </Button>
        <Button className="w-full justify-start" variant="outline" onClick={() => $w.utils.navigateTo({
        pageId: 'api-keys'
      })}>
          <Key className="h-4 w-4 mr-2" />
          API管理
        </Button>
      </div>
    </div>;
}