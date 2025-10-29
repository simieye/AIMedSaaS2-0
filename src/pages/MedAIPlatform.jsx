// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Badge, Tabs, TabsContent, TabsList, TabsTrigger, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, useToast, Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui';
// @ts-ignore;
import { Activity, Users, FileText, Settings as SettingsIcon, TrendingUp, AlertTriangle, CheckCircle, Clock, Database, Brain, Search, BookOpen, Target, Calendar, DollarSign, Building, Handshake, BarChart3, PieChart, GanttChart, Shield, Lock, Key, UserCheck, Fingerprint, Bell as BellIcon, BellRing as BellRingIcon, BellOff as BellOffIcon, Volume2 as Volume2Icon, VolumeX as VolumeXIcon, Play as PlayIcon, Pause as PauseIcon, SkipForward as SkipForwardIcon, SkipBack as SkipBackIcon, Repeat as RepeatIcon, Shuffle as ShuffleIcon, Mic as MicIcon, MicOff as MicOffIcon, Video as VideoIcon, VideoOff as VideoOffIcon, Phone as PhoneIcon, PhoneOff as PhoneOffIcon, Mail as MailIcon, MailOpen as MailOpenIcon, Send as SendIcon, Paperclip as PaperclipIcon, PaperclipOff as PaperclipOffIcon, Image as ImageIcon, ImageOff as ImageOffIcon, File as FileIcon, FilePlus as FilePlusIcon, FileMinus as FileMinusIcon, FileCheck as FileCheckIcon, FileX as FileXIcon, FileSearch as FileSearchIcon, FileSignature as FileSignatureIcon, FileInput as FileInputIcon, FileOutput as FileOutputIcon, FileDown as FileDownIcon, FileUp as FileUpIcon, FileCopy as FileCopyIcon, FileMove as FileMoveIcon, FileRename as FileRenameIcon, FileDelete as FileDeleteIcon, FileArchive as FileArchiveIcon, FileUnarchive as FileUnarchiveIcon, FileLock as FileLockIcon, FileUnlock as FileUnlockIcon, FileQuestion as FileQuestionIcon, FileWarning as FileWarningIcon, FileError as FileErrorIcon, FileDone as FileDoneIcon, FilePending as FilePendingIcon, FileProcessing as FileProcessingIcon, FileUploading as FileUploadingIcon, FileDownloading as FileDownloadingIcon, FileSync as FileSyncIcon, FileSyncing as FileSyncingIcon, FileRefresh as FileRefreshIcon, FileRefreshCw as FileRefreshCwIcon, FileRefreshCcw as FileRefreshCcwIcon, FileRotate as FileRotateIcon, FileRotateCw as FileRotateCwIcon, FileRotateCcw as FileRotateCcwIcon, FileFlip as FileFlipIcon, FileFlipHorizontal as FileFlipHorizontalIcon, FileFlipVertical as FileFlipVerticalIcon, FileZoomIn as FileZoomInIcon, FileZoomOut as FileZoomOutIcon, FileMaximize as FileMaximizeIcon, FileMinimize as FileMinimizeIcon, FileExpand as FileExpandIcon, FileShrink as FileShrinkIcon, FileFull as FileFullIcon, FileEmpty as FileEmptyIcon, Zap, Award, Globe, Network, GitBranch, Layers, Cpu, HardDrive, Wifi, Battery, Thermometer, Wind, Route, MapPin, Timeline, GitMerge, GitPullRequest, GitCommit, Package, Code, Terminal, Monitor, Smartphone, Tablet, Cloud, Server, Star, MessageSquare as MessageSquareIcon, Hash, Link, MoreHorizontal, User, Filter, Download, Upload, Plus, RefreshCw, Eye, Edit, Trash2, TrendingDown, ArrowUpRight, ArrowDownRight, CreditCard, Banknote, FileSpreadsheet, Printer, Layout, Megaphone, Ad, Analytics, Calculator, Receipt, Briefcase, FileContract, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize2, PlayCircle, PauseCircle, SkipBackCircle, SkipForwardCircle, RotateCcw, Save, Flag, Timer, Archive } from 'lucide-react';

export default function MedAIPlatform(props) {
  const {
    $w,
    style
  } = props;
  const {
    toast
  } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(false);
  const [systemStats, setSystemStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalDoctors: 0,
    totalPatients: 0,
    totalPartners: 0,
    totalApiKeys: 0,
    systemHealth: 0,
    uptime: 0
  });

  // 模拟系统统计数据
  const mockSystemStats = {
    totalUsers: 15420,
    activeUsers: 8932,
    totalDoctors: 342,
    totalPatients: 15078,
    totalPartners: 28,
    totalApiKeys: 156,
    systemHealth: 98.5,
    uptime: 99.9
  };

  // 模拟最近活动数据
  const mockRecentActivities = [{
    id: 1,
    type: 'user_registration',
    title: '新用户注册',
    description: '张医生完成了注册流程',
    timestamp: '2024-05-25 10:30:00',
    status: 'success',
    user: '张医生',
    module: '用户管理'
  }, {
    id: 2,
    type: 'api_key_created',
    title: 'API密钥创建',
    description: '辉瑞制药创建了新的API密钥',
    timestamp: '2024-05-25 09:45:00',
    status: 'success',
    user: '辉瑞制药',
    module: '合作伙伴'
  }, {
    id: 3,
    type: 'diagnosis_completed',
    title: 'AI诊断完成',
    description: '完成了第10000例AI诊断',
    timestamp: '2024-05-25 09:20:00',
    status: 'success',
    user: '系统',
    module: 'AI诊断'
  }, {
    id: 4,
    type: 'system_alert',
    title: '系统告警',
    description: '数据库连接池使用率超过80%',
    timestamp: '2024-05-25 08:55:00',
    status: 'warning',
    user: '系统',
    module: '系统监控'
  }, {
    id: 5,
    type: 'partner_agreement',
    title: '合作协议签署',
    description: '与强生公司签署了合作协议',
    timestamp: '2024-05-25 08:30:00',
    status: 'success',
    user: '法务部门',
    module: '合作伙伴'
  }];

  // 模拟系统状态数据
  const mockSystemStatus = [{
    name: 'API服务',
    status: 'healthy',
    uptime: 99.9,
    responseTime: 120,
    lastCheck: '2024-05-25 10:35:00'
  }, {
    name: '数据库',
    status: 'healthy',
    uptime: 99.8,
    responseTime: 45,
    lastCheck: '2024-05-25 10:35:00'
  }, {
    name: 'AI模型服务',
    status: 'healthy',
    uptime: 99.7,
    responseTime: 280,
    lastCheck: '2024-05-25 10:35:00'
  }, {
    name: '文件存储',
    status: 'healthy',
    uptime: 99.9,
    responseTime: 65,
    lastCheck: '2024-05-25 10:35:00'
  }, {
    name: '消息队列',
    status: 'warning',
    uptime: 98.5,
    responseTime: 180,
    lastCheck: '2024-05-25 10:35:00'
  }];
  useEffect(() => {
    setSystemStats(mockSystemStats);
  }, []);
  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "刷新成功",
        description: "系统数据已更新"
      });
    }, 1000);
  };
  const handleNavigation = (pageId, params = {}) => {
    $w.utils.navigateTo({
      pageId,
      params
    });
  };
  const getStatusBadge = status => {
    const statusConfig = {
      healthy: {
        color: 'bg-green-100 text-green-800',
        icon: CheckCircle,
        text: '正常'
      },
      warning: {
        color: 'bg-yellow-100 text-yellow-800',
        icon: AlertTriangle,
        text: '警告'
      },
      error: {
        color: 'bg-red-100 text-red-800',
        icon: AlertTriangle,
        text: '错误'
      }
    };
    const config = statusConfig[status] || statusConfig.healthy;
    const Icon = config.icon;
    return <Badge className={config.color}>
        <Icon className="w-3 h-3 mr-1" />
        {config.text}
      </Badge>;
  };
  const getActivityIcon = type => {
    const iconConfig = {
      user_registration: Users,
      api_key_created: Key,
      diagnosis_completed: Brain,
      system_alert: AlertTriangle,
      partner_agreement: Handshake
    };
    return iconConfig[type] || Activity;
  };
  return <div className="min-h-screen bg-gray-50" style={style}>
      <div className="container mx-auto px-4 py-6">
        <div className="space-y-6">
          {/* 页面标题 */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">OncoPilot 2.0 管理平台</h1>
                <p className="text-gray-600 mt-2">
                  AI医疗诊断系统综合管理平台 - 统一管理所有子系统功能
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="outline" onClick={handleRefresh} disabled={loading}>
                  <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                  刷新
                </Button>
                <Button>
                  <Settings className="w-4 h-4 mr-2" />
                  系统设置
                </Button>
              </div>
            </div>
          </div>

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
                    <p className="text-2xl font-bold text-gray-900">{systemStats.totalUsers.toLocaleString()}</p>
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
                    <p className="text-2xl font-bold text-gray-900">{systemStats.activeUsers.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Database className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">API调用</p>
                    <p className="text-2xl font-bold text-gray-900">{systemStats.totalApiKeys}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">系统健康度</p>
                    <p className="text-2xl font-bold text-gray-900">{systemStats.systemHealth}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 功能模块导航 */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-8">
              <TabsTrigger value="overview">系统概览</TabsTrigger>
              <TabsTrigger value="user-management">用户管理</TabsTrigger>
              <TabsTrigger value="partner-management">合作伙伴</TabsTrigger>
              <TabsTrigger value="agreement-management">合作协议</TabsTrigger>
              <TabsTrigger value="sponsorship-management">药企赞助</TabsTrigger>
              <TabsTrigger value="rag-management">RAG系统</TabsTrigger>
              <TabsTrigger value="roadmap-management">开发路线图</TabsTrigger>
              <TabsTrigger value="system-monitoring">系统监控</TabsTrigger>
            </TabsList>

            {/* 系统概览标签页 */}
            <TabsContent value="overview" className="space-y-6">
              {/* 快速导航卡片 */}
              <div className="grid grid-cols-4 gap-4">
                <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleNavigation('PatientManagement')}>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-blue-100 rounded-lg">
                        <Users className="w-8 h-8 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">患者管理</h3>
                        <p className="text-sm text-gray-600">管理患者信息和档案</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleNavigation('DoctorManagement')}>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-green-100 rounded-lg">
                        <UserCheck className="w-8 h-8 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">医生管理</h3>
                        <p className="text-sm text-gray-600">管理医生资质和权限</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleNavigation('ApiKeyManagement')}>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-purple-100 rounded-lg">
                        <Key className="w-8 h-8 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">API管理</h3>
                        <p className="text-sm text-gray-600">管理API密钥和权限</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleNavigation('AdminDashboard')}>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-orange-100 rounded-lg">
                        <Settings className="w-8 h-8 text-orange-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">系统管理</h3>
                        <p className="text-sm text-gray-600">系统配置和维护</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* 新增子系统管理卡片 */}
              <div className="grid grid-cols-4 gap-4">
                <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleNavigation('AgreementManagement')}>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-red-100 rounded-lg">
                        <FileContract className="w-8 h-8 text-red-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">合作协议</h3>
                        <p className="text-sm text-gray-600">管理合作伙伴协议</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleNavigation('PharmaSponsorshipManagement')}>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-indigo-100 rounded-lg">
                        <Building className="w-8 h-8 text-indigo-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">药企赞助</h3>
                        <p className="text-sm text-gray-600">管理医药企业赞助</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleNavigation('RAGSystemManagement')}>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-teal-100 rounded-lg">
                        <Brain className="w-8 h-8 text-teal-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">RAG系统</h3>
                        <p className="text-sm text-gray-600">知识库和检索管理</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleNavigation('DevelopmentRoadmap')}>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-pink-100 rounded-lg">
                        <GanttChart className="w-8 h-8 text-pink-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">开发路线图</h3>
                        <p className="text-sm text-gray-600">A轮开发进度管理</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* 最近活动 */}
              <Card>
                <CardHeader>
                  <CardTitle>最近活动</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockRecentActivities.map(activity => {
                    const Icon = getActivityIcon(activity.type);
                    return <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50">
                          <div className={`p-2 rounded-lg ${activity.status === 'success' ? 'bg-green-100' : activity.status === 'warning' ? 'bg-yellow-100' : 'bg-red-100'}`}>
                            <Icon className={`w-4 h-4 ${activity.status === 'success' ? 'text-green-600' : activity.status === 'warning' ? 'text-yellow-600' : 'text-red-600'}`} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium text-gray-900">{activity.title}</h4>
                              <span className="text-xs text-gray-500">{activity.timestamp}</span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                            <div className="flex items-center space-x-2 mt-2">
                              <Badge variant="outline" className="text-xs">
                                {activity.user}
                              </Badge>
                              <Badge variant="secondary" className="text-xs">
                                {activity.module}
                              </Badge>
                            </div>
                          </div>
                        </div>;
                  })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* 用户管理标签页 */}
            <TabsContent value="user-management">
              <Card>
                <CardContent className="p-6">
                  <div className="text-center py-12">
                    <Users className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">用户管理模块</h3>
                    <p className="text-gray-600 mb-4">点击下方按钮进入完整的用户管理界面</p>
                    <Button onClick={() => handleNavigation('PatientManagement')}>
                      进入用户管理
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* 合作伙伴管理标签页 */}
            <TabsContent value="partner-management">
              <Card>
                <CardContent className="p-6">
                  <div className="text-center py-12">
                    <Handshake className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">合作伙伴管理</h3>
                    <p className="text-gray-600 mb-4">管理合作伙伴关系和API密钥</p>
                    <div className="flex items-center justify-center space-x-4">
                      <Button onClick={() => handleNavigation('PartnerPortal')}>
                        合作伙伴门户
                      </Button>
                      <Button variant="outline" onClick={() => handleNavigation('ApiKeyManagement')}>
                        API密钥管理
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* 合作协议管理标签页 */}
            <TabsContent value="agreement-management">
              <Card>
                <CardContent className="p-6">
                  <div className="text-center py-12">
                    <FileContract className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">合作协议管理</h3>
                    <p className="text-gray-600 mb-4">管理合作伙伴协议、条款和签署流程</p>
                    <Button onClick={() => handleNavigation('AgreementManagement')}>
                      进入协议管理
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* 药企赞助管理标签页 */}
            <TabsContent value="sponsorship-management">
              <Card>
                <CardContent className="p-6">
                  <div className="text-center py-12">
                    <Building className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">药企赞助管理</h3>
                    <p className="text-gray-600 mb-4">管理医药企业赞助项目、广告位配置、ROI分析</p>
                    <Button onClick={() => handleNavigation('PharmaSponsorshipManagement')}>
                      进入赞助管理
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* RAG系统管理标签页 */}
            <TabsContent value="rag-management">
              <Card>
                <CardContent className="p-6">
                  <div className="text-center py-12">
                    <Brain className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">RAG系统管理</h3>
                    <p className="text-gray-600 mb-4">管理文献检索、知识库、幻觉检测和模型性能</p>
                    <Button onClick={() => handleNavigation('RAGSystemManagement')}>
                      进入RAG系统
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* 开发路线图管理标签页 */}
            <TabsContent value="roadmap-management">
              <Card>
                <CardContent className="p-6">
                  <div className="text-center py-12">
                    <GanttChart className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">开发路线图管理</h3>
                    <p className="text-gray-600 mb-4">管理A轮开发路线图、里程碑、甘特图和进度跟踪</p>
                    <Button onClick={() => handleNavigation('DevelopmentRoadmap')}>
                      进入路线图管理
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* 系统监控标签页 */}
            <TabsContent value="system-monitoring" className="space-y-6">
              {/* 系统状态概览 */}
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>系统健康状态</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockSystemStatus.map((service, index) => <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                          <div className="flex items-center space-x-3">
                            <div className={`w-3 h-3 rounded-full ${service.status === 'healthy' ? 'bg-green-500' : service.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
                            <div>
                              <div className="font-medium text-gray-900">{service.name}</div>
                              <div className="text-sm text-gray-500">响应时间: {service.responseTime}ms</div>
                            </div>
                          </div>
                          <div className="text-right">
                            {getStatusBadge(service.status)}
                            <div className="text-sm text-gray-500 mt-1">正常运行时间: {service.uptime}%</div>
                          </div>
                        </div>)}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>系统性能指标</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 rounded-lg border">
                        <div>
                          <div className="font-medium text-gray-900">CPU使用率</div>
                          <div className="text-sm text-gray-500">当前系统负载</div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-gray-900">45%</div>
                          <div className="text-sm text-green-600">正常</div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-lg border">
                        <div>
                          <div className="font-medium text-gray-900">内存使用率</div>
                          <div className="text-sm text-gray-500">当前内存占用</div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-gray-900">68%</div>
                          <div className="text-sm text-yellow-600">注意</div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-lg border">
                        <div>
                          <div className="font-medium text-gray-900">磁盘使用率</div>
                          <div className="text-sm text-gray-500">存储空间占用</div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-gray-900">32%</div>
                          <div className="text-sm text-green-600">正常</div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-lg border">
                        <div>
                          <div className="font-medium text-gray-900">网络带宽</div>
                          <div className="text-sm text-gray-500">当前网络使用</div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-gray-900">125Mbps</div>
                          <div className="text-sm text-green-600">正常</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* 系统日志 */}
              <Card>
                <CardHeader>
                  <CardTitle>系统日志</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3 p-3 rounded-lg bg-red-50 border border-red-200">
                      <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                      <div className="flex-1">
                        <div className="font-medium text-red-900">ERROR</div>
                        <div className="text-sm text-red-700">数据库连接池使用率超过80%</div>
                        <div className="text-xs text-red-600 mt-1">2024-05-25 08:55:00</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 p-3 rounded-lg bg-yellow-50 border border-yellow-200">
                      <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                      <div className="flex-1">
                        <div className="font-medium text-yellow-900">WARNING</div>
                        <div className="text-sm text-yellow-700">消息队列处理延迟增加</div>
                        <div className="text-xs text-yellow-600 mt-1">2024-05-25 08:30:00</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 p-3 rounded-lg bg-green-50 border border-green-200">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      <div className="flex-1">
                        <div className="font-medium text-green-900">INFO</div>
                        <div className="text-sm text-green-700">AI模型服务自动扩容完成</div>
                        <div className="text-xs text-green-600 mt-1">2024-05-25 08:15:00</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 p-3 rounded-lg bg-blue-50 border border-blue-200">
                      <Activity className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div className="flex-1">
                        <div className="font-medium text-blue-900">DEBUG</div>
                        <div className="text-sm text-blue-700">API响应时间监控正常</div>
                        <div className="text-xs text-blue-600 mt-1">2024-05-25 08:00:00</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>;
}