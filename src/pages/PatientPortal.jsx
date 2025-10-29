// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Badge, Alert, AlertDescription, AlertTitle, Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui';
// @ts-ignore;
import { User, Calendar, FileText, MessageSquare, Settings, Bell, Shield, Activity, Heart, TrendingUp, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

// 患者翻译提供者组件
function PatientTranslationProvider({
  children
}) {
  const translations = {
    zh: {
      welcome: '欢迎回来',
      dashboard: '健康仪表板',
      appointments: '预约管理',
      records: '健康档案',
      messages: '消息中心',
      settings: '个人设置',
      healthStatus: '健康状态',
      upcomingAppointments: '即将到来的预约',
      recentRecords: '最近记录',
      quickActions: '快捷操作',
      bookAppointment: '预约医生',
      viewRecords: '查看档案',
      contactDoctor: '联系医生',
      healthTips: '健康建议',
      medicationReminder: '用药提醒',
      vitalSigns: '生命体征',
      bloodPressure: '血压',
      heartRate: '心率',
      temperature: '体温',
      weight: '体重',
      loading: '加载中...',
      error: '加载失败',
      retry: '重试',
      noData: '暂无数据',
      online: '在线',
      offline: '离线',
      busy: '忙碌',
      todayAppointments: '今日预约',
      completed: '已完成',
      pendingReports: '待处理报告',
      patients: '患者管理',
      appointmentsToday: '今日预约',
      completedToday: '今日完成',
      reportsToReview: '待审核',
      totalPatients: '总患者数',
      recentActivity: '最近活动',
      triageManagement: '分诊管理',
      labReports: '检查报告',
      prescription: '处方管理',
      newPrescription: '新建处方',
      recentPrescriptions: '最近处方'
    },
    en: {
      welcome: 'Welcome Back',
      dashboard: 'Health Dashboard',
      appointments: 'Appointments',
      records: 'Health Records',
      messages: 'Messages',
      settings: 'Settings',
      healthStatus: 'Health Status',
      upcomingAppointments: 'Upcoming Appointments',
      recentRecords: 'Recent Records',
      quickActions: 'Quick Actions',
      bookAppointment: 'Book Appointment',
      viewRecords: 'View Records',
      contactDoctor: 'Contact Doctor',
      healthTips: 'Health Tips',
      medicationReminder: 'Medication Reminder',
      vitalSigns: 'Vital Signs',
      bloodPressure: 'Blood Pressure',
      heartRate: 'Heart Rate',
      temperature: 'Temperature',
      weight: 'Weight',
      loading: 'Loading...',
      error: 'Load Failed',
      retry: 'Retry',
      noData: 'No Data',
      online: 'Online',
      offline: 'Offline',
      busy: 'Busy',
      todayAppointments: 'Today Appointments',
      completed: 'Completed',
      pendingReports: 'Pending Reports',
      patients: 'Patient Management',
      appointmentsToday: 'Appointments Today',
      completedToday: 'Completed Today',
      reportsToReview: 'To Review',
      totalPatients: 'Total Patients',
      recentActivity: 'Recent Activity',
      triageManagement: 'Triage Management',
      labReports: 'Lab Reports',
      prescription: 'Prescription',
      newPrescription: 'New Prescription',
      recentPrescriptions: 'Recent Prescriptions'
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

// 患者仪表板组件
function PatientDashboard({
  patientData,
  t
}) {
  return <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t('healthStatus')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">{t('vitalSigns')}</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>{t('bloodPressure')}</span>
                  <span className="font-medium">{patientData?.vitalSigns?.bloodPressure}</span>
                </div>
                <div className="flex justify-between">
                  <span>{t('heartRate')}</span>
                  <span className="font-medium">{patientData?.vitalSigns?.heartRate} bpm</span>
                </div>
                <div className="flex justify-between">
                  <span>{t('temperature')}</span>
                  <span className="font-medium">{patientData?.vitalSigns?.temperature}°C</span>
                </div>
                <div className="flex justify-between">
                  <span>{t('weight')}</span>
                  <span className="font-medium">{patientData?.vitalSigns?.weight} kg</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">{t('quickActions')}</h3>
              <div className="space-y-3">
                <Button className="w-full">
                  <Calendar className="w-4 h-4 mr-2" />
                  {t('bookAppointment')}
                </Button>
                <Button className="w-full" variant="outline">
                  <FileText className="w-4 h-4 mr-2" />
                  {t('viewRecords')}
                </Button>
                <Button className="w-full" variant="outline">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  {t('contactDoctor')}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{t('upcomingAppointments')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">{t('noData')}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('recentRecords')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">{t('noData')}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>;
}

// 预约管理组件
function PatientAppointments({
  t
}) {
  return <Card>
      <CardHeader>
        <CardTitle>{t('appointments')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center py-12">
          <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">{t('noData')}</p>
        </div>
      </CardContent>
    </Card>;
}

// 健康档案组件
function PatientRecords({
  patientData,
  t
}) {
  return <Card>
      <CardHeader>
        <CardTitle>{t('records')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">基本信息</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">姓名:</span>
                <span className="ml-2">{patientData?.name}</span>
              </div>
              <div>
                <span className="text-gray-600">出生日期:</span>
                <span className="ml-2">{patientData?.dateOfBirth}</span>
              </div>
              <div>
                <span className="text-gray-600">性别:</span>
                <span className="ml-2">{patientData?.gender === 'male' ? '男' : '女'}</span>
              </div>
              <div>
                <span className="text-gray-600">血型:</span>
                <span className="ml-2">{patientData?.bloodType}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">过敏史</h3>
            <div className="space-y-2">
              {patientData?.allergies?.length > 0 ? patientData.allergies.map((allergy, index) => <Badge key={index} variant="outline" className="mr-2">
                    {allergy}
                  </Badge>) : <p className="text-gray-500">暂无过敏史</p>}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">用药记录</h3>
            <div className="space-y-2">
              {patientData?.medications?.length > 0 ? patientData.medications.map((med, index) => <div key={index} className="text-sm">
                    {med.name} - {med.dosage}
                  </div>) : <p className="text-gray-500">暂无用药记录</p>}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>;
}

// 消息中心组件
function PatientMessages({
  t
}) {
  return <Card>
      <CardHeader>
        <CardTitle>{t('messages')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center py-12">
          <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">{t('noData')}</p>
        </div>
      </CardContent>
    </Card>;
}

// 个人设置组件
function PatientSettings({
  t
}) {
  return <Card>
      <CardHeader>
        <CardTitle>{t('settings')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center py-12">
          <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">个人设置功能开发中</p>
        </div>
      </CardContent>
    </Card>;
}
export default function PatientPortal(props) {
  const [patientData, setPatientData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');

  // 获取当前用户信息
  const getCurrentUser = () => {
    return props.$w?.auth?.currentUser || {
      userId: 'patient-001',
      name: '张小明',
      email: 'patient@example.com',
      avatarUrl: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=150&h=150&fit=crop&crop=face'
    };
  };

  // 获取患者数据
  const fetchPatientData = async () => {
    try {
      setLoading(true);
      setError(null);
      const user = getCurrentUser();

      // 从 patient 数据模型获取患者信息
      const result = await props.$w.cloud.callDataSource({
        dataSourceName: 'patient',
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
          pageSize: 1
        }
      });
      if (result.records && result.records.length > 0) {
        const patient = result.records[0];
        setPatientData({
          id: patient._id,
          name: patient.name || user.name,
          email: patient.email || user.email,
          phone: patient.phone || '',
          dateOfBirth: patient.date_of_birth || '1990-01-01',
          gender: patient.gender || 'male',
          bloodType: patient.blood_type || 'A+',
          allergies: patient.allergies || [],
          medications: patient.medications || [],
          emergencyContact: patient.emergency_contact || {},
          medicalHistory: patient.medical_history || [],
          avatarUrl: user.avatarUrl,
          lastVisit: patient.last_visit || new Date().toISOString(),
          nextAppointment: patient.next_appointment || null,
          vitalSigns: patient.vital_signs || {
            bloodPressure: '120/80',
            heartRate: 72,
            temperature: 36.5,
            weight: 70,
            height: 175
          }
        });
      } else {
        // 如果没有找到患者记录，创建默认数据
        setPatientData({
          id: user.userId,
          name: user.name,
          email: user.email,
          phone: '',
          dateOfBirth: '1990-01-01',
          gender: 'male',
          bloodType: 'A+',
          allergies: [],
          medications: [],
          emergencyContact: {},
          medicalHistory: [],
          avatarUrl: user.avatarUrl,
          lastVisit: new Date().toISOString(),
          nextAppointment: null,
          vitalSigns: {
            bloodPressure: '120/80',
            heartRate: 72,
            temperature: 36.5,
            weight: 70,
            height: 175
          }
        });
      }
    } catch (err) {
      console.error('Error fetching patient data:', err);
      setError(err.message || 'Failed to load patient data');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchPatientData();
  }, []);
  if (loading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">加载中...</p>
        </div>
      </div>;
  }
  if (error) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={fetchPatientData} className="bg-blue-600 hover:bg-blue-700">
            重试
          </Button>
        </div>
      </div>;
  }
  return <PatientTranslationProvider>
      {({
      t
    }) => <div className="min-h-screen bg-gray-50">
          {/* 顶部导航 */}
          <header className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{t('welcome')}</h1>
                  <p className="text-sm text-gray-500">{patientData?.name}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <Button variant="ghost" size="sm">
                    <Bell className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Settings className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </header>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* 健康概览卡片 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                    <Heart className="w-4 h-4 mr-2" />
                    健康状态
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    <span className="text-lg font-semibold">良好</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    下次预约
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-semibold">
                    {patientData?.nextAppointment ? new Date(patientData.nextAppointment).toLocaleDateString('zh-CN') : '暂无预约'}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                    <Activity className="w-4 h-4 mr-2" />
                    生命体征
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm space-y-1">
                    <div>血压: {patientData?.vitalSigns?.bloodPressure}</div>
                    <div>心率: {patientData?.vitalSigns?.heartRate} bpm</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 主要内容区域 */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="dashboard">{t('dashboard')}</TabsTrigger>
                <TabsTrigger value="appointments">{t('appointments')}</TabsTrigger>
                <TabsTrigger value="records">{t('records')}</TabsTrigger>
                <TabsTrigger value="messages">{t('messages')}</TabsTrigger>
                <TabsTrigger value="settings">{t('settings')}</TabsTrigger>
              </TabsList>

              <TabsContent value="dashboard">
                <PatientDashboard patientData={patientData} t={t} />
              </TabsContent>

              <TabsContent value="appointments">
                <PatientAppointments t={t} />
              </TabsContent>

              <TabsContent value="records">
                <PatientRecords patientData={patientData} t={t} />
              </TabsContent>

              <TabsContent value="messages">
                <PatientMessages t={t} />
              </TabsContent>

              <TabsContent value="settings">
                <PatientSettings t={t} />
              </TabsContent>
            </Tabs>
          </div>
        </div>}
    </PatientTranslationProvider>;
}