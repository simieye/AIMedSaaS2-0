// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Badge, Alert, AlertDescription, AlertTitle, Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui';
// @ts-ignore;
import { Users, Activity, Shield, Settings, Database, BarChart3, AlertTriangle, CheckCircle, Clock, TrendingUp, Server, UserCheck, FileText, MessageSquare } from 'lucide-react';

import { AdminStatsCard } from '@/components/AdminStatsCard';
import { SystemHealthMonitor } from '@/components/SystemHealthMonitor';
import { RecentActivity } from '@/components/RecentActivity';

// 管理员翻译提供者
function AdminTranslationProvider({
  children
}) {
  const translations = {
    zh: {
      adminDashboard: '管理员仪表板',
      systemOverview: '系统概览',
      userManagement: '用户管理',
      systemHealth: '系统健康',
      analytics: '数据分析',
      settings: '系统设置',
      totalUsers: '总用户数',
      activeUsers: '活跃用户',
      newUsersToday: '今日新用户',
      systemStatus: '系统状态',
      online: '在线',
      offline: '离线',
      maintenance: '维护中',
      serverStatus: '服务器状态',
      databaseStatus: '数据库状态',
      apiStatus: 'API状态',
      recentActivity: '最近活动',
      userReports: '用户报告',
      systemLogs: '系统日志',
      performanceMetrics: '性能指标',
      uptime: '正常运行时间',
      responseTime: '响应时间',
      errorRate: '错误率',
      loadAverage: '平均负载',
      diskUsage: '磁盘使用率',
      memoryUsage: '内存使用率',
      cpuUsage: 'CPU使用率',
      networkTraffic: '网络流量',
      securityAlerts: '安全警报',
      critical: '严重',
      warning: '警告',
      info: '信息',
      resolved: '已解决',
      pending: '待处理',
      inProgress: '进行中',
      viewDetails: '查看详情',
      takeAction: '采取行动',
      refresh: '刷新',
      export: '导出',
      filter: '筛选',
      search: '搜索',
      loading: '加载中...',
      error: '错误',
      retry: '重试',
      noData: '暂无数据',
      lastUpdated: '最后更新',
      version: '版本',
      build: '构建',
      environment: '环境'
    },
    en: {
      adminDashboard: 'Admin Dashboard',
      systemOverview: 'System Overview',
      userManagement: 'User Management',
      systemHealth: 'System Health',
      analytics: 'Analytics',
      settings: 'System Settings',
      totalUsers: 'Total Users',
      activeUsers: 'Active Users',
      newUsersToday: 'New Users Today',
      systemStatus: 'System Status',
      online: 'Online',
      offline: 'Offline',
      maintenance: 'Maintenance',
      serverStatus: 'Server Status',
      databaseStatus: 'Database Status',
      apiStatus: 'API Status',
      recentActivity: 'Recent Activity',
      userReports: 'User Reports',
      systemLogs: 'System Logs',
      performanceMetrics: 'Performance Metrics',
      uptime: 'Uptime',
      responseTime: 'Response Time',
      errorRate: 'Error Rate',
      loadAverage: 'Load Average',
      diskUsage: 'Disk Usage',
      memoryUsage: 'Memory Usage',
      cpuUsage: 'CPU Usage',
      networkTraffic: 'Network Traffic',
      securityAlerts: 'Security Alerts',
      critical: 'Critical',
      warning: 'Warning',
      info: 'Info',
      resolved: 'Resolved',
      pending: 'Pending',
      inProgress: 'In Progress',
      viewDetails: 'View Details',
      takeAction: 'Take Action',
      refresh: 'Refresh',
      export: 'Export',
      filter: 'Filter',
      search: 'Search',
      loading: 'Loading...',
      error: 'Error',
      retry: 'Retry',
      noData: 'No Data',
      lastUpdated: 'Last Updated',
      version: 'Version',
      build: 'Build',
      environment: 'Environment'
    }
  };
  const [language, setLanguage] = useState('zh');
  const t = key => translations[language][key] || key;
  return <div data-language={language}>
      {React.cloneElement(children, {
      t,
      language,
      setLanguage
    })}
    </div>;
}
function AdminDashboardContent({
  t,
  language,
  setLanguage
}) {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    newUsersToday: 0,
    systemAlerts: 0
  });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  // 模拟活动数据
  const recentActivities = [{
    type: 'user',
    title: '新用户注册',
    description: '用户 user@example.com 注册成功',
    time: '2分钟前'
  }, {
    type: 'system',
    title: '系统更新',
    description: '系统版本已更新至 v2.1.0',
    time: '1小时前'
  }, {
    type: 'alert',
    title: '安全警报',
    description: '检测到异常登录尝试',
    time: '3小时前'
  }, {
    type: 'document',
    title: '数据备份',
    description: '每日数据备份已完成',
    time: '5小时前'
  }];
  useEffect(() => {
    loadDashboardData();
  }, []);
  const loadDashboardData = async () => {
    try {
      setLoading(true);
      // 模拟数据加载
      setTimeout(() => {
        setStats({
          totalUsers: 12543,
          activeUsers: 8921,
          newUsersToday: 127,
          systemAlerts: 3
        });
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
      setLoading(false);
    }
  };
  const handleRefresh = () => {
    loadDashboardData();
  };
  return <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{t('adminDashboard')}</h1>
              <p className="text-gray-600 mt-1">{t('systemOverview')}</p>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" onClick={handleRefresh}>
                <Clock className="h-4 w-4 mr-2" />
                {t('refresh')}
              </Button>
              <Button>
                <BarChart3 className="h-4 w-4 mr-2" />
                {t('export')}
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <AdminStatsCard title={t('totalUsers')} value={stats.totalUsers.toLocaleString()} icon={Users} trend="+12% 本月" color="blue" />
          <AdminStatsCard title={t('activeUsers')} value={stats.activeUsers.toLocaleString()} icon={UserCheck} trend="+8% 本月" color="green" />
          <AdminStatsCard title={t('newUsersToday')} value={stats.newUsersToday.toLocaleString()} icon={TrendingUp} trend="+5% 昨日" color="purple" />
          <AdminStatsCard title={t('securityAlerts')} value={stats.systemAlerts} icon={AlertTriangle} trend="待处理" color="orange" />
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">{t('systemOverview')}</TabsTrigger>
            <TabsTrigger value="users">{t('userManagement')}</TabsTrigger>
            <TabsTrigger value="health">{t('systemHealth')}</TabsTrigger>
            <TabsTrigger value="analytics">{t('analytics')}</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <SystemHealthMonitor />
              </div>
              <div>
                <RecentActivity activities={recentActivities} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>{t('userManagement')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Users className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-500">用户管理功能开发中...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="health">
            <Card>
              <CardHeader>
                <CardTitle>{t('systemHealth')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-4">{t('performanceMetrics')}</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>{t('uptime')}</span>
                        <span className="font-medium">99.9%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>{t('responseTime')}</span>
                        <span className="font-medium">45ms</span>
                      </div>
                      <div className="flex justify-between">
                        <span>{t('errorRate')}</span>
                        <span className="font-medium">0.01%</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-4">{t('resourceUsage')}</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>{t('cpuUsage')}</span>
                        <span className="font-medium">32%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>{t('memoryUsage')}</span>
                        <span className="font-medium">64%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>{t('diskUsage')}</span>
                        <span className="font-medium">45%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>{t('analytics')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <BarChart3 className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-500">数据分析功能开发中...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>;
}
export default function AdminDashboard(props) {
  return <AdminTranslationProvider>
      <AdminDashboardContent {...props} />
    </AdminTranslationProvider>;
}