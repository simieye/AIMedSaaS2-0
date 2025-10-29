// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Badge, Tabs, TabsContent, TabsList, TabsTrigger, useToast } from '@/components/ui';
// @ts-ignore;
import { Brain, Users, Activity, Settings, Database, Shield, BarChart3, Calendar, AlertTriangle, CheckCircle, TrendingUp, Clock, Zap, Target, FileText, Heart, Stethoscope, Pill, Microscope, Building, CreditCard, BookOpen, Search, Filter, Download, Upload, RefreshCw, Plus, Edit, Trash2, Eye, ChevronRight, Globe, Lock, Key, UserCheck, Server, Cpu, HardDrive, Wifi, Battery, Thermometer, Wind } from 'lucide-react';

// 导入子系统组件
import { UnifiedDashboard } from '@/components/UnifiedDashboard';
import { PatientManagementEnhanced } from '@/components/PatientManagementEnhanced';
import { DoctorManagement } from '@/components/DoctorManagement';
import { ApiKeyManagement } from '@/components/ApiKeyManagement';
import { AIDiagnosisWorkspace } from '@/components/AIDiagnosisWorkspace';
import { AgreementManagement } from '@/components/AgreementManagement';
import { PharmaSponsorshipManagement } from '@/components/PharmaSponsorshipManagement';
import { RAGSystemManagement } from '@/components/RAGSystemManagement';
import { ARoundRoadmap } from '@/components/ARoundRoadmap';
export default function MedAIPlatform(props) {
  const {
    $w,
    style
  } = props;
  const {
    toast
  } = useToast();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [systemStats, setSystemStats] = useState({});
  const [subsystems, setSubsystems] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [alerts, setAlerts] = useState([]);

  // 系统统计数据
  const mockSystemStats = {
    totalUsers: 15420,
    activeUsers: 3280,
    totalDoctors: 856,
    activeDoctors: 234,
    totalPatients: 14564,
    todayDiagnosis: 1250,
    accuracyRate: 94.2,
    systemHealth: 96.8,
    uptime: 99.9,
    responseTime: 1.2,
    dataProcessed: '2.5TB',
    apiCalls: 125000,
    errorRate: 0.02
  };

  // 子系统配置
  const mockSubsystems = [{
    id: 'patient-management',
    name: '患者管理',
    description: '患者信息管理、健康档案、随访管理',
    icon: Users,
    color: 'blue',
    status: 'active',
    users: 14564,
    lastUpdate: '2024-01-20 14:30:00',
    performance: 98.5,
    route: '/patient-management'
  }, {
    id: 'doctor-management',
    name: '医生管理',
    description: '医生信息管理、资质认证、排班管理',
    icon: Stethoscope,
    color: 'green',
    status: 'active',
    users: 856,
    lastUpdate: '2024-01-20 14:25:00',
    performance: 96.2,
    route: '/doctor-management'
  }, {
    id: 'ai-diagnosis',
    name: 'AI诊断',
    description: '智能诊断、影像分析、辅助决策',
    icon: Brain,
    color: 'purple',
    status: 'active',
    users: 2340,
    lastUpdate: '2024-01-20 14:35:00',
    performance: 94.8,
    route: '/ai-diagnosis'
  }, {
    id: 'rag-system',
    name: 'RAG系统',
    description: '知识库管理、文献检索、智能问答',
    icon: BookOpen,
    color: 'orange',
    status: 'active',
    users: 1250,
    lastUpdate: '2024-01-20 14:20:00',
    performance: 92.5,
    route: '/rag-system'
  }, {
    id: 'pharma-sponsorship',
    name: '医药赞助',
    description: '赞助项目管理、合同管理、财务跟踪',
    icon: Building,
    color: 'red',
    status: 'active',
    users: 45,
    lastUpdate: '2024-01-20 14:15:00',
    performance: 89.3,
    route: '/pharma-sponsorship'
  }, {
    id: 'api-management',
    name: 'API管理',
    description: 'API密钥管理、访问控制、使用统计',
    icon: Key,
    color: 'indigo',
    status: 'active',
    users: 125,
    lastUpdate: '2024-01-20 14:40:00',
    performance: 97.8,
    route: '/api-management'
  }, {
    id: 'agreement-management',
    name: '协议管理',
    description: '合同协议、文档管理、审批流程',
    icon: FileText,
    color: 'yellow',
    status: 'active',
    users: 67,
    lastUpdate: '2024-01-20 14:10:00',
    performance: 91.2,
    route: '/agreement-management'
  }, {
    id: 'roadmap',
    name: '开发路线图',
    description: '项目规划、里程碑、任务分配',
    icon: Calendar,
    color: 'teal',
    status: 'active',
    users: 23,
    lastUpdate: '2024-01-20 14:45:00',
    performance: 88.7,
    route: '/roadmap'
  }];

  // 最近活动数据
  const mockRecentActivities = [{
    id: 1,
    type: 'user_registration',
    description: '新用户注册：张医生',
    timestamp: '2024-01-20 14:30:00',
    user: '系统',
    status: 'success'
  }, {
    id: 2,
    type: 'ai_diagnosis',
    description: 'AI诊断完成：心血管疾病检测',
    timestamp: '2024-01-20 14:25:00',
    user: '李医生',
    status: 'success'
  }, {
    id: 3,
    type: 'system_alert',
    description: '系统性能警告：响应时间超过阈值',
    timestamp: '2024-01-20 14:20:00',
    user: '系统',
    status: 'warning'
  }, {
    id: 4,
    type: 'data_sync',
    description: '数据同步完成：患者记录更新',
    timestamp: '2024-01-20 14:15:00',
    user: '系统',
    status: 'success'
  }, {
    id: 5,
    type: 'api_call',
    description: 'API调用：第三方系统集成',
    timestamp: '2024-01-20 14:10:00',
    user: 'API网关',
    status: 'success'
  }];

  // 系统告警数据
  const mockAlerts = [{
    id: 1,
    type: 'error',
    title: '数据库连接异常',
    description: '主数据库连接池耗尽，需要立即处理',
    severity: 'critical',
    timestamp: '2024-01-20 14:35:00',
    status: 'active'
  }, {
    id: 2,
    type: 'warning',
    title: 'API响应时间过长',
    description: 'AI诊断API响应时间超过3秒阈值',
    severity: 'medium',
    timestamp: '2024-01-20 14:30:00',
    status: 'active'
  }, {
    id: 3,
    type: 'info',
    title: '系统维护通知',
    description: '计划于今晚22:00-24:00进行系统维护',
    severity: 'low',
    timestamp: '2024-01-20 14:00:00',
    status: 'scheduled'
  }];
  useEffect(() => {
    setSystemStats(mockSystemStats);
    setSubsystems(mockSubsystems);
    setRecentActivities(mockRecentActivities);
    setAlerts(mockAlerts);
  }, []);
  const handleSubsystemClick = subsystem => {
    toast({
      title: "子系统访问",
      description: `正在进入${subsystem.name}子系统`
    });
    // 这里可以添加路由跳转逻辑
    // $w.utils.navigateTo({ pageId: subsystem.route, params: {} });
  };
  const handleAlertAction = (alertId, action) => {
    toast({
      title: "告警处理",
      description: `正在处理告警 ${alertId} - ${action}`
    });
  };
  const handleRefresh = () => {
    toast({
      title: "刷新数据",
      description: "系统数据已更新"
    });
  };
  const getStatusColor = status => {
    const colors = {
      active: 'text-green-600 bg-green-100',
      inactive: 'text-gray-600 bg-gray-100',
      maintenance: 'text-yellow-600 bg-yellow-100',
      error: 'text-red-600 bg-red-100'
    };
    return colors[status] || colors.active;
  };
  const getSeverityColor = severity => {
    const colors = {
      critical: 'text-red-600 bg-red-100',
      high: 'text-orange-600 bg-orange-100',
      medium: 'text-yellow-600 bg-yellow-100',
      low: 'text-blue-600 bg-blue-100'
    };
    return colors[severity] || colors.low;
  };
  const formatNumber = num => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };
  return <div className="min-h-screen bg-gray-50" style={style}>
      <div className="container mx-auto px-4 py-6">
        <div className="space-y-6">
          {/* 页面标题 */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">MedAI Platform 管理中心</h1>
                <p className="text-gray-600 mt-2">
                  医疗AI平台统一管理系统 - 监控、管理、优化所有子系统
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Button variant="outline" onClick={handleRefresh}>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    刷新
                  </Button>
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    导出报告
                  </Button>
                  <Button>
                    <Settings className="w-4 h-4 mr-2" />
                    系统设置
                  </Button>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">当前用户</p>
                  <p className="font-semibold text-gray-900">
                    {$w.auth.currentUser?.name || '系统管理员'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 功能标签页 */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="dashboard" className="flex items-center space-x-2">
                <BarChart3 className="w-4 h-4" />
                <span>仪表板</span>
              </TabsTrigger>
              <TabsTrigger value="subsystems" className="flex items-center space-x-2">
                <Globe className="w-4 h-4" />
                <span>子系统</span>
              </TabsTrigger>
              <TabsTrigger value="users" className="flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <span>用户管理</span>
              </TabsTrigger>
              <TabsTrigger value="monitoring" className="flex items-center space-x-2">
                <Activity className="w-4 h-4" />
                <span>系统监控</span>
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center space-x-2">
                <Shield className="w-4 h-4" />
                <span>安全管理</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center space-x-2">
                <Settings className="w-4 h-4" />
                <span>系统设置</span>
              </TabsTrigger>
            </TabsList>

            {/* 仪表板标签页 */}
            <TabsContent value="dashboard" className="space-y-6">
              {/* 系统概览统计 */}
              <div className="grid grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Users className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">总用户数</p>
                        <p className="text-2xl font-bold text-gray-900">{formatNumber(systemStats.totalUsers)}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <Activity className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">活跃用户</p>
                        <p className="text-2xl font-bold text-gray-900">{formatNumber(systemStats.activeUsers)}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <Brain className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">今日诊断</p>
                        <p className="text-2xl font-bold text-gray-900">{formatNumber(systemStats.todayDiagnosis)}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-orange-100 rounded-lg">
                        <Target className="w-6 h-6 text-orange-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">准确率</p>
                        <p className="text-2xl font-bold text-gray-900">{systemStats.accuracyRate}%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* 系统健康状态 */}
              <div className="grid grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">系统健康度</p>
                        <p className="text-2xl font-bold text-gray-900">{systemStats.systemHealth}%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Clock className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">响应时间</p>
                        <p className="text-2xl font-bold text-gray-900">{systemStats.responseTime}s</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <Server className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">正常运行时间</p>
                        <p className="text-2xl font-bold text-gray-900">{systemStats.uptime}%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-red-100 rounded-lg">
                        <AlertTriangle className="w-6 h-6 text-red-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">错误率</p>
                        <p className="text-2xl font-bold text-gray-900">{systemStats.errorRate}%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* 最近活动和告警 */}
              <div className="grid grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Activity className="w-5 h-5 mr-2" />
                      最近活动
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {recentActivities.map(activity => <div key={activity.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className={`w-2 h-2 rounded-full ${activity.status === 'success' ? 'bg-green-500' : activity.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
                            <div>
                              <div className="font-medium text-gray-900">{activity.description}</div>
                              <div className="text-sm text-gray-500">{activity.user} • {activity.timestamp}</div>
                            </div>
                          </div>
                        </div>)}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <AlertTriangle className="w-5 h-5 mr-2" />
                      系统告警
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {alerts.map(alert => <div key={alert.id} className="flex items-start justify-between p-3 border rounded-lg">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h4 className="font-medium text-gray-900">{alert.title}</h4>
                              <Badge className={getSeverityColor(alert.severity)}>
                                {alert.severity === 'critical' ? '严重' : alert.severity === 'high' ? '高' : alert.severity === 'medium' ? '中' : '低'}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-1">{alert.description}</p>
                            <p className="text-xs text-gray-500">{alert.timestamp}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm" onClick={() => handleAlertAction(alert.id, 'view')}>
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleAlertAction(alert.id, 'resolve')}>
                              <CheckCircle className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>)}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* 子系统标签页 */}
            <TabsContent value="subsystems" className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                {subsystems.map(subsystem => {
                const Icon = subsystem.icon;
                return <Card key={subsystem.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-4">
                            <div className={`p-3 bg-${subsystem.color}-100 rounded-lg`}>
                              <Icon className={`w-8 h-8 text-${subsystem.color}-600`} />
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900">{subsystem.name}</h3>
                              <p className="text-sm text-gray-600 mt-1">{subsystem.description}</p>
                              <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                                <span>用户: {subsystem.users}</span>
                                <span>性能: {subsystem.performance}%</span>
                                <Badge className={getStatusColor(subsystem.status)}>
                                  {subsystem.status === 'active' ? '运行中' : subsystem.status === 'inactive' ? '未激活' : subsystem.status === 'maintenance' ? '维护中' : '错误'}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm" onClick={() => handleSubsystemClick(subsystem)}>
                              <Eye className="w-4 h-4 mr-1" />
                              查看
                            </Button>
                            <Button size="sm" onClick={() => handleSubsystemClick(subsystem)}>
                              <ChevronRight className="w-4 h-4 mr-1" />
                              进入
                            </Button>
                          </div>
                        </div>
                        <div className="mt-4 pt-4 border-t">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-500">最后更新: {subsystem.lastUpdate}</span>
                            <div className="flex items-center space-x-1">
                              <div className={`w-2 h-2 rounded-full ${subsystem.performance >= 95 ? 'bg-green-500' : subsystem.performance >= 85 ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
                              <span className="text-gray-600">性能状态</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>;
              })}
              </div>
            </TabsContent>

            {/* 用户管理标签页 */}
            <TabsContent value="users" className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Users className="w-5 h-5 mr-2" />
                      用户统计
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                        <span className="text-gray-700">总用户数</span>
                        <span className="font-semibold text-gray-900">{systemStats.totalUsers.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                        <span className="text-gray-700">活跃用户</span>
                        <span className="font-semibold text-green-600">{systemStats.activeUsers.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                        <span className="text-gray-700">医生用户</span>
                        <span className="font-semibold text-blue-600">{systemStats.totalDoctors}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                        <span className="text-gray-700">患者用户</span>
                        <span className="font-semibold text-purple-600">{systemStats.totalPatients.toLocaleString()}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <UserCheck className="w-5 h-5 mr-2" />
                      权限管理
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Button className="w-full justify-start" variant="outline">
                        <Users className="w-4 h-4 mr-2" />
                        患者管理
                      </Button>
                      <Button className="w-full justify-start" variant="outline">
                        <Stethoscope className="w-4 h-4 mr-2" />
                        医生管理
                      </Button>
                      <Button className="w-full justify-start" variant="outline">
                        <Key className="w-4 h-4 mr-2" />
                        API密钥管理
                      </Button>
                      <Button className="w-full justify-start" variant="outline">
                        <Shield className="w-4 h-4 mr-2" />
                        角色权限配置
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* 系统监控标签页 */}
            <TabsContent value="monitoring" className="space-y-6">
              <div className="grid grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Server className="w-5 h-5 mr-2" />
                      服务器状态
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">CPU使用率</span>
                        <span className="font-semibold">45%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">内存使用率</span>
                        <span className="font-semibold">68%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">磁盘使用率</span>
                        <span className="font-semibold">72%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">网络带宽</span>
                        <span className="font-semibold">125 Mbps</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Database className="w-5 h-5 mr-2" />
                      数据库状态
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">连接数</span>
                        <span className="font-semibold">234/500</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">查询响应时间</span>
                        <span className="font-semibold">12ms</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">数据大小</span>
                        <span className="font-semibold">2.5TB</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">备份状态</span>
                        <span className="font-semibold text-green-600">正常</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Wifi className="w-5 h-5 mr-2" />
                      网络状态
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">API调用次数</span>
                        <span className="font-semibold">{formatNumber(systemStats.apiCalls)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">平均响应时间</span>
                        <span className="font-semibold">{systemStats.responseTime}s</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">错误率</span>
                        <span className="font-semibold">{systemStats.errorRate}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">可用性</span>
                        <span className="font-semibold text-green-600">{systemStats.uptime}%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* 安全管理标签页 */}
            <TabsContent value="security" className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Lock className="w-5 h-5 mr-2" />
                      安全状态
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                        <span className="text-gray-700">防火墙状态</span>
                        <span className="font-semibold text-green-600">正常</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                        <span className="text-gray-700">SSL证书</span>
                        <span className="font-semibold text-green-600">有效</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-yellow-50 rounded">
                        <span className="text-gray-700">安全更新</span>
                        <span className="font-semibold text-yellow-600">待更新</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                        <span className="text-gray-700">入侵检测</span>
                        <span className="font-semibold text-green-600">无威胁</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Shield className="w-5 h-5 mr-2" />
                      访问控制
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Button className="w-full justify-start" variant="outline">
                        <Key className="w-4 h-4 mr-2" />
                        API密钥管理
                      </Button>
                      <Button className="w-full justify-start" variant="outline">
                        <UserCheck className="w-4 h-4 mr-2" />
                        用户权限管理
                      </Button>
                      <Button className="w-full justify-start" variant="outline">
                        <FileText className="w-4 h-4 mr-2" />
                        访问日志
                      </Button>
                      <Button className="w-full justify-start" variant="outline">
                        <AlertTriangle className="w-4 h-4 mr-2" />
                        安全事件
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* 系统设置标签页 */}
            <TabsContent value="settings" className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Settings className="w-5 h-5 mr-2" />
                      系统配置
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Button className="w-full justify-start" variant="outline">
                        <Database className="w-4 h-4 mr-2" />
                        数据库配置
                      </Button>
                      <Button className="w-full justify-start" variant="outline">
                        <Server className="w-4 h-4 mr-2" />
                        服务器配置
                      </Button>
                      <Button className="w-full justify-start" variant="outline">
                        <Brain className="w-4 h-4 mr-2" />
                        AI模型配置
                      </Button>
                      <Button className="w-full justify-start" variant="outline">
                        <Globe className="w-4 h-4 mr-2" />
                        系统集成配置
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <FileText className="w-5 h-5 mr-2" />
                      系统管理
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Button className="w-full justify-start" variant="outline">
                        <RefreshCw className="w-4 h-4 mr-2" />
                        系统重启
                      </Button>
                      <Button className="w-full justify-start" variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        数据备份
                      </Button>
                      <Button className="w-full justify-start" variant="outline">
                        <Upload className="w-4 h-4 mr-2" />
                        数据恢复
                      </Button>
                      <Button className="w-full justify-start" variant="outline">
                        <BarChart3 className="w-4 h-4 mr-2" />
                        系统日志
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>;
}