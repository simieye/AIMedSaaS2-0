// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Badge, Alert, AlertDescription, AlertTitle, Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui';
// @ts-ignore;
import { User, Calendar, FileText, MessageSquare, Settings as SettingsIcon, Bell, Shield, Activity, Heart, TrendingUp, Clock, CheckCircle, AlertTriangle, Users, Stethoscope, ClipboardList } from 'lucide-react';

import { Dashboard } from '@/components/Dashboard';
import { Triage } from '@/components/Triage';
import { Reports } from '@/components/Reports';
import { Prescription } from '@/components/Prescription';
import { Settings } from '@/components/Settings';

// 医生翻译提供者组件
function DoctorTranslationProvider({
  children
}) {
  const translations = {
    zh: {
      welcome: '欢迎回来',
      dashboard: '医生工作台',
      triage: '分诊管理',
      reports: '检查报告',
      prescription: '处方管理',
      settings: '个人设置',
      patients: '患者管理',
      appointments: '今日预约',
      stats: '今日统计',
      quickActions: '快捷操作',
      viewPatients: '查看患者',
      newAppointment: '新建预约',
      writeReport: '撰写报告',
      prescribe: '开具处方',
      healthAlerts: '健康提醒',
      systemStatus: '系统状态',
      loading: '加载中...',
      error: '加载失败',
      retry: '重试',
      noData: '暂无数据',
      online: '在线',
      offline: '离线',
      busy: '忙碌'
    },
    en: {
      welcome: 'Welcome Back',
      dashboard: 'Doctor Dashboard',
      triage: 'Triage Management',
      reports: 'Lab Reports',
      prescription: 'Prescription',
      settings: 'Settings',
      patients: 'Patient Management',
      appointments: 'Today Appointments',
      stats: 'Today Stats',
      quickActions: 'Quick Actions',
      viewPatients: 'View Patients',
      newAppointment: 'New Appointment',
      writeReport: 'Write Report',
      prescribe: 'Prescribe',
      healthAlerts: 'Health Alerts',
      systemStatus: 'System Status',
      loading: 'Loading...',
      error: 'Load Failed',
      retry: 'Retry',
      noData: 'No Data',
      online: 'Online',
      offline: 'Offline',
      busy: 'Busy'
    }
  };
  const [language, setLanguage] = useState('zh');
  const t = key => translations[language][key] || key;
  return children({
    t,
    language,
    setLanguage
  });
}
export default function DoctorPortal(props) {
  const [doctorData, setDoctorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');

  // 获取当前医生用户信息
  const getCurrentUser = () => {
    return props.$w?.auth?.currentUser || {
      userId: 'doctor-001',
      name: '李医生',
      email: 'doctor@hospital.com',
      avatarUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face'
    };
  };

  // 获取医生数据
  const fetchDoctorData = async () => {
    try {
      setLoading(true);
      setError(null);
      const user = getCurrentUser();

      // 从 doctor 数据模型获取医生信息
      const result = await props.$w.cloud.callDataSource({
        dataSourceName: 'doctor',
        methodName: 'wedaGetRecordsV2',
        params: {
          filter: {
            where: {
              user_id: {
                $eq: user.userId
              }
            }
          },
          select: {
            $master: true
          },
          limit: 1
        }
      });
      if (result.records && result.records.length > 0) {
        const doctor = result.records[0];
        setDoctorData({
          id: doctor._id,
          name: doctor.name || user.name,
          email: doctor.email || user.email,
          phone: doctor.phone || '',
          department: doctor.department || '内科',
          title: doctor.title || '主治医师',
          license: doctor.license || 'MD-2024001',
          specialization: doctor.specialization || ['内科', '心血管'],
          experience: doctor.experience || 8,
          avatarUrl: user.avatarUrl,
          status: doctor.status || 'online',
          todayAppointments: doctor.today_appointments || 12,
          completedAppointments: doctor.completed_appointments || 8,
          pendingReports: doctor.pending_reports || 5,
          activePatients: doctor.active_patients || 156
        });
      } else {
        // 如果没有找到医生记录，创建默认数据
        setDoctorData({
          id: user.userId,
          name: user.name,
          email: user.email,
          phone: '13800138000',
          department: '内科',
          title: '主治医师',
          license: 'MD-2024001',
          specialization: ['内科', '心血管'],
          experience: 8,
          avatarUrl: user.avatarUrl,
          status: 'online',
          todayAppointments: 12,
          completedAppointments: 8,
          pendingReports: 5,
          activePatients: 156
        });
      }
    } catch (err) {
      console.error('Error fetching doctor data:', err);
      setError(err.message || 'Failed to load doctor data');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchDoctorData();
  }, []);
  if (loading) {
    return <DoctorTranslationProvider>
        {({
        t
      }) => <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">{t('loading')}</p>
            </div>
          </div>}
      </DoctorTranslationProvider>;
  }
  if (error) {
    return <DoctorTranslationProvider>
        {({
        t
      }) => <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
              <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <p className="text-red-600 mb-4">{error}</p>
              <Button onClick={fetchDoctorData} className="bg-blue-600 hover:bg-blue-700">
                {t('retry')}
              </Button>
            </div>
          </div>}
      </DoctorTranslationProvider>;
  }
  return <DoctorTranslationProvider>
      {({
      t
    }) => <div className="min-h-screen bg-gray-50">
          {/* 顶部导航 */}
          <header className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center">
                  <Stethoscope className="w-8 h-8 text-blue-600 mr-3" />
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">{t('welcome')}</h1>
                    <p className="text-sm text-gray-500">{doctorData?.name} - {doctorData?.title}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${doctorData?.status === 'online' ? 'bg-green-500' : doctorData?.status === 'busy' ? 'bg-yellow-500' : 'bg-gray-500'}`}></div>
                    <span className="text-sm text-gray-600">
                      {doctorData?.status === 'online' ? t('online') : doctorData?.status === 'busy' ? t('busy') : t('offline')}
                    </span>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Bell className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <SettingsIcon className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </header>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* 统计卡片 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    {t('appointments')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">{doctorData?.todayAppointments}</div>
                  <p className="text-xs text-gray-500">今日预约</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    已完成
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{doctorData?.completedAppointments}</div>
                  <p className="text-xs text-gray-500">今日完成</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                    <ClipboardList className="w-4 h-4 mr-2" />
                    待处理
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-600">{doctorData?.pendingReports}</div>
                  <p className="text-xs text-gray-500">待处理报告</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                    <Users className="w-4 h-4 mr-2" />
                    {t('patients')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-600">{doctorData?.activePatients}</div>
                  <p className="text-xs text-gray-500">活跃患者</p>
                </CardContent>
              </Card>
            </div>

            {/* 主要内容区域 */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="dashboard">{t('dashboard')}</TabsTrigger>
                <TabsTrigger value="triage">{t('triage')}</TabsTrigger>
                <TabsTrigger value="reports">{t('reports')}</TabsTrigger>
                <TabsTrigger value="prescription">{t('prescription')}</TabsTrigger>
                <TabsTrigger value="settings">{t('settings')}</TabsTrigger>
              </TabsList>

              <TabsContent value="dashboard">
                <Dashboard doctorData={doctorData} t={t} />
              </TabsContent>

              <TabsContent value="triage">
                <Triage doctorData={doctorData} t={t} />
              </TabsContent>

              <TabsContent value="reports">
                <Reports doctorData={doctorData} t={t} />
              </TabsContent>

              <TabsContent value="prescription">
                <Prescription doctorData={doctorData} t={t} />
              </TabsContent>

              <TabsContent value="settings">
                <Settings doctorData={doctorData} t={t} />
              </TabsContent>
            </Tabs>
          </div>
        </div>}
    </DoctorTranslationProvider>;
}