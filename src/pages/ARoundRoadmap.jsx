// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Badge, Tabs, TabsContent, TabsList, TabsTrigger, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, useToast, Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui';
// @ts-ignore;
import { Route, Calendar, Target, Users, TrendingUp, AlertTriangle, CheckCircle, Clock, Filter, Download, Upload, Plus, RefreshCw, Eye, Edit, Trash2, BarChart3, PieChart, GanttChart, Activity, Zap, Award, Settings, MapPin, Timeline, GitBranch, Layers, Cpu, HardDrive, Wifi, Battery, Thermometer, Wind, Handshake, DollarSign, FileContract, Star, MessageSquare, Hash, Link, GitMerge, GitPullRequest, GitCommit, Package, Code, Terminal, Monitor, Smartphone, Tablet, Cloud, Server, Shield, Lock, Key, UserCheck, Fingerprint, Bell, BellRing, BellOff, Volume2, VolumeX, Play, Pause, SkipForward, SkipBack, Repeat, Shuffle, Mic, MicOff, Video, VideoOff, Phone, PhoneOff, Mail, MailOpen, Send, Paperclip, PaperclipOff, Image, ImageOff, File, FilePlus, FileMinus, FileCheck, FileX, FileSearch, FileSignature, FileInput, FileOutput, FileDown, FileUp, FileCopy, FileMove, FileRename, FileDelete, FileArchive, FileUnarchive, FileLock, FileUnlock, FileQuestion, FileWarning, FileError, FileDone, FilePending, FileProcessing, FileUploading, FileDownloading, FileSync, FileSyncing, FileRefresh, FileRefreshCw, FileRefreshCcw, FileRotate, FileRotateCw, FileRotateCcw, FileFlip, FileFlipHorizontal, FileFlipVertical, FileZoomIn, FileZoomOut, FileMaximize, FileMinimize, FileExpand, FileShrink, FileFull, FileEmpty, Search } from 'lucide-react';

import { RoadmapTimeline } from '@/components/RoadmapTimeline';
import { FeatureProgress } from '@/components/FeatureProgress';
import { ResourceAllocation } from '@/components/ResourceAllocation';
import { RiskAssessment } from '@/components/RiskAssessment';
import { KPIDashboard } from '@/components/KPIDashboard';
export default function ARoundRoadmap(props) {
  const {
    $w,
    style
  } = props;
  const {
    toast
  } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedMilestone, setSelectedMilestone] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [milestones, setMilestones] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [risks, setRisks] = useState([]);
  const [resources, setResources] = useState([]);
  const [kpis, setKpis] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // 模拟里程碑数据
  const mockMilestones = [{
    id: 'MS001',
    name: '产品原型完成',
    description: '完成AI诊断系统的核心功能原型开发',
    category: 'product',
    status: 'completed',
    priority: 'high',
    startDate: '2024-01-01',
    endDate: '2024-02-15',
    actualEndDate: '2024-02-10',
    progress: 100,
    budget: 500000,
    actualCost: 480000,
    owner: '产品团队',
    dependencies: ['需求确认', '技术选型'],
    deliverables: ['原型设计文档', '交互原型', '技术架构图'],
    risks: ['技术风险', '时间延期'],
    kpis: {
      userSatisfaction: 4.5,
      featureCompleteness: 95,
      performanceScore: 88
    }
  }, {
    id: 'MS002',
    name: '临床试验启动',
    description: '与3家医院合作启动AI诊断临床试验',
    category: 'clinical',
    status: 'in_progress',
    priority: 'high',
    startDate: '2024-02-01',
    endDate: '2024-04-30',
    actualEndDate: null,
    progress: 65,
    budget: 1200000,
    actualCost: 780000,
    owner: '临床团队',
    dependencies: ['产品原型完成', '医院合作协议'],
    deliverables: ['临床试验方案', '伦理委员会批准', '患者招募计划'],
    risks: ['法规风险', '患者招募困难'],
    kpis: {
      patientRecruitment: 70,
      regulatoryApproval: 100,
      trialProgress: 65
    }
  }, {
    id: 'MS003',
    name: 'A轮融资完成',
    description: '完成A轮融资，获得2000万美元投资',
    category: 'funding',
    status: 'pending',
    priority: 'critical',
    startDate: '2024-03-01',
    endDate: '2024-06-30',
    actualEndDate: null,
    progress: 25,
    budget: 20000000,
    actualCost: 500000,
    owner: '融资团队',
    dependencies: ['产品原型完成', '临床试验数据'],
    deliverables: ['投资条款清单', '尽职调查报告', '融资协议'],
    risks: ['市场风险', '估值风险'],
    kpis: {
      investorInterest: 80,
      valuationTarget: 85,
      fundingProgress: 25
    }
  }, {
    id: 'MS004',
    name: '产品商业化',
    description: 'AI诊断系统正式商业化运营',
    category: 'business',
    status: 'planned',
    priority: 'medium',
    startDate: '2024-07-01',
    endDate: '2024-12-31',
    actualEndDate: null,
    progress: 0,
    budget: 3000000,
    actualCost: 0,
    owner: '商业团队',
    dependencies: ['A轮融资完成', '临床试验成功'],
    deliverables: ['商业化计划', '市场推广策略', '销售团队建设'],
    risks: ['市场接受度', '竞争风险'],
    kpis: {
      marketPenetration: 0,
      revenueTarget: 0,
      customerAcquisition: 0
    }
  }];

  // 模拟任务数据
  const mockTasks = [{
    id: 'TSK001',
    milestoneId: 'MS001',
    title: '用户界面设计',
    description: '设计AI诊断系统的用户界面和交互流程',
    assignee: '张设计师',
    status: 'completed',
    priority: 'high',
    startDate: '2024-01-05',
    dueDate: '2024-01-25',
    completedDate: '2024-01-22',
    estimatedHours: 120,
    actualHours: 108,
    progress: 100,
    dependencies: [],
    tags: ['UI/UX', '设计'],
    attachments: ['设计稿.fig', '交互原型.sketch'],
    comments: [{
      id: 1,
      author: '产品经理',
      content: '设计符合用户需求，交互流畅',
      timestamp: '2024-01-23 10:30:00'
    }]
  }, {
    id: 'TSK002',
    milestoneId: 'MS001',
    title: '核心算法开发',
    description: '开发AI诊断的核心算法模型',
    assignee: '李算法工程师',
    status: 'completed',
    priority: 'high',
    startDate: '2024-01-10',
    dueDate: '2024-02-10',
    completedDate: '2024-02-08',
    estimatedHours: 200,
    actualHours: 185,
    progress: 100,
    dependencies: ['数据准备完成'],
    tags: ['算法', 'AI', '机器学习'],
    attachments: ['算法文档.pdf', '模型文件.pkl'],
    comments: [{
      id: 2,
      author: '技术总监',
      content: '算法准确率达到95%，超出预期',
      timestamp: '2024-02-09 14:20:00'
    }]
  }, {
    id: 'TSK003',
    milestoneId: 'MS002',
    title: '医院合作协议签署',
    description: '与3家目标医院签署临床试验合作协议',
    assignee: '王商务经理',
    status: 'in_progress',
    priority: 'high',
    startDate: '2024-02-01',
    dueDate: '2024-03-15',
    completedDate: null,
    estimatedHours: 80,
    actualHours: 45,
    progress: 60,
    dependencies: ['合作协议模板'],
    tags: ['商务', '法务', '合作'],
    attachments: ['合作协议模板.docx'],
    comments: [{
      id: 3,
      author: '商务总监',
      content: '已与2家医院达成初步意向',
      timestamp: '2024-02-20 16:45:00'
    }]
  }, {
    id: 'TSK004',
    milestoneId: 'MS002',
    title: '伦理委员会申请',
    description: '向医院伦理委员会提交临床试验申请',
    assignee: '赵临床专员',
    status: 'pending',
    priority: 'medium',
    startDate: '2024-03-01',
    dueDate: '2024-03-30',
    completedDate: null,
    estimatedHours: 60,
    actualHours: 0,
    progress: 0,
    dependencies: ['医院合作协议签署'],
    tags: ['临床', '法规', '伦理'],
    attachments: [],
    comments: []
  }];

  // 模拟风险数据
  const mockRisks = [{
    id: 'RSK001',
    title: '技术实现风险',
    description: 'AI算法准确率可能不达预期',
    category: 'technical',
    probability: 'medium',
    impact: 'high',
    status: 'mitigated',
    owner: '技术团队',
    identifiedDate: '2024-01-15',
    mitigationPlan: '增加算法训练数据，优化模型架构',
    contingencyPlan: '采用第三方算法作为备选方案',
    progress: 80,
    kpis: {
      riskScore: 6.5,
      mitigationProgress: 80,
      residualRisk: 2.5
    }
  }, {
    id: 'RSK002',
    title: '法规合规风险',
    description: '医疗器械监管政策变化可能影响产品上市',
    category: 'regulatory',
    probability: 'low',
    impact: 'critical',
    status: 'monitoring',
    owner: '法务团队',
    identifiedDate: '2024-01-20',
    mitigationPlan: '密切关注政策变化，提前准备合规材料',
    contingencyPlan: '调整产品功能以符合新法规要求',
    progress: 40,
    kpis: {
      riskScore: 4.0,
      mitigationProgress: 40,
      residualRisk: 3.5
    }
  }, {
    id: 'RSK003',
    title: '市场竞争风险',
    description: '竞争对手可能推出类似产品',
    category: 'market',
    probability: 'high',
    impact: 'medium',
    status: 'active',
    owner: '市场团队',
    identifiedDate: '2024-02-01',
    mitigationPlan: '加快产品开发速度，建立技术壁垒',
    contingencyPlan: '调整产品定位，寻找差异化优势',
    progress: 30,
    kpis: {
      riskScore: 7.0,
      mitigationProgress: 30,
      residualRisk: 6.0
    }
  }];

  // 模拟资源数据
  const mockResources = [{
    id: 'RES001',
    type: 'human',
    name: '开发团队',
    category: 'engineering',
    totalCapacity: 100,
    allocatedCapacity: 85,
    availableCapacity: 15,
    utilization: 85,
    cost: 800000,
    budget: 1000000,
    members: [{
      name: '张工程师',
      role: '前端开发',
      allocation: 80,
      skills: ['React', 'TypeScript', 'UI/UX']
    }, {
      name: '李工程师',
      role: '后端开发',
      allocation: 90,
      skills: ['Python', 'Django', 'PostgreSQL']
    }],
    projects: ['产品原型完成', '核心算法开发'],
    constraints: ['技能匹配', '时间冲突']
  }, {
    id: 'RES002',
    type: 'financial',
    name: '研发预算',
    category: 'budget',
    totalCapacity: 5000000,
    allocatedCapacity: 3200000,
    availableCapacity: 1800000,
    utilization: 64,
    cost: 3200000,
    budget: 5000000,
    allocations: [{
      project: '产品原型完成',
      amount: 1500000,
      percentage: 30
    }, {
      project: '临床试验',
      amount: 1200000,
      percentage: 24
    }, {
      project: '算法开发',
      amount: 500000,
      percentage: 10
    }],
    constraints: ['预算限制', '成本控制']
  }, {
    id: 'RES003',
    type: 'infrastructure',
    name: '云服务资源',
    category: 'technology',
    totalCapacity: 100,
    allocatedCapacity: 60,
    availableCapacity: 40,
    utilization: 60,
    cost: 120000,
    budget: 200000,
    services: ['计算资源', '存储资源', '网络带宽'],
    projects: ['模型训练', '数据存储', 'API服务'],
    constraints: ['性能要求', '扩展性需求']
  }];

  // 模拟KPI数据
  const mockKpis = [{
    id: 'KPI001',
    name: '项目整体进度',
    category: 'progress',
    currentValue: 68,
    targetValue: 75,
    unit: '%',
    status: 'on_track',
    trend: 'up',
    lastUpdated: '2024-02-20',
    description: 'A轮路线图整体项目进度',
    calculation: '已完成里程碑权重 / 总里程碑权重',
    owner: '项目管理办公室',
    frequency: 'weekly',
    historicalData: [{
      date: '2024-01-01',
      value: 45
    }, {
      date: '2024-01-15',
      value: 52
    }, {
      date: '2024-02-01',
      value: 60
    }, {
      date: '2024-02-15',
      value: 65
    }, {
      date: '2024-02-20',
      value: 68
    }]
  }, {
    id: 'KPI002',
    name: '预算执行率',
    category: 'financial',
    currentValue: 64,
    targetValue: 70,
    unit: '%',
    status: 'on_track',
    trend: 'stable',
    lastUpdated: '2024-02-20',
    description: '项目预算使用情况',
    calculation: '实际支出 / 预算总额',
    owner: '财务部门',
    frequency: 'monthly',
    historicalData: [{
      date: '2024-01-01',
      value: 20
    }, {
      date: '2024-01-15',
      value: 35
    }, {
      date: '2024-02-01',
      value: 50
    }, {
      date: '2024-02-15',
      value: 58
    }, {
      date: '2024-02-20',
      value: 64
    }]
  }, {
    id: 'KPI003',
    name: '团队效率指数',
    category: 'efficiency',
    currentValue: 82,
    targetValue: 85,
    unit: '分',
    status: 'on_track',
    trend: 'up',
    lastUpdated: '2024-02-20',
    description: '团队工作效率综合评分',
    calculation: '任务完成率 × 质量评分 × 时间效率',
    owner: '人力资源部',
    frequency: 'weekly',
    historicalData: [{
      date: '2024-01-01',
      value: 75
    }, {
      date: '2024-01-15',
      value: 78
    }, {
      date: '2024-02-01',
      value: 80
    }, {
      date: '2024-02-15',
      value: 81
    }, {
      date: '2024-02-20',
      value: 82
    }]
  }];
  useEffect(() => {
    setMilestones(mockMilestones);
    setTasks(mockTasks);
    setRisks(mockRisks);
    setResources(mockResources);
    setKpis(mockKpis);
  }, []);
  const getStatusBadge = status => {
    const statusConfig = {
      completed: {
        color: 'bg-green-100 text-green-800',
        icon: CheckCircle,
        text: '已完成'
      },
      in_progress: {
        color: 'bg-blue-100 text-blue-800',
        icon: Clock,
        text: '进行中'
      },
      pending: {
        color: 'bg-yellow-100 text-yellow-800',
        icon: Clock,
        text: '待开始'
      },
      planned: {
        color: 'bg-gray-100 text-gray-800',
        icon: Calendar,
        text: '计划中'
      },
      delayed: {
        color: 'bg-red-100 text-red-800',
        icon: AlertTriangle,
        text: '延期'
      }
    };
    const config = statusConfig[status] || statusConfig.pending;
    const Icon = config.icon;
    return <Badge className={config.color}>
        <Icon className="w-3 h-3 mr-1" />
        {config.text}
      </Badge>;
  };
  const getPriorityBadge = priority => {
    const priorityConfig = {
      critical: {
        color: 'bg-red-100 text-red-800',
        text: '关键'
      },
      high: {
        color: 'bg-orange-100 text-orange-800',
        text: '高'
      },
      medium: {
        color: 'bg-yellow-100 text-yellow-800',
        text: '中'
      },
      low: {
        color: 'bg-green-100 text-green-800',
        text: '低'
      }
    };
    const config = priorityConfig[priority] || priorityConfig.medium;
    return <Badge className={config.color}>{config.text}</Badge>;
  };
  const getRiskBadge = (probability, impact) => {
    const riskScore = getRiskScore(probability, impact);
    if (riskScore >= 8) {
      return <Badge className="bg-red-100 text-red-800">高风险</Badge>;
    } else if (riskScore >= 5) {
      return <Badge className="bg-orange-100 text-orange-800">中风险</Badge>;
    } else {
      return <Badge className="bg-yellow-100 text-yellow-800">低风险</Badge>;
    }
  };
  const getRiskScore = (probability, impact) => {
    const probabilityScore = {
      low: 1,
      medium: 2,
      high: 3
    }[probability] || 1;
    const impactScore = {
      low: 1,
      medium: 2,
      high: 3,
      critical: 4
    }[impact] || 1;
    return probabilityScore * impactScore;
  };
  const handleViewMilestone = milestone => {
    setSelectedMilestone(milestone);
    setActiveTab('milestone-details');
  };
  const handleEditMilestone = milestone => {
    setSelectedMilestone(milestone);
    setActiveTab('edit-milestone');
  };
  const handleCreateMilestone = () => {
    setSelectedMilestone(null);
    setActiveTab('create-milestone');
  };
  const handleViewTask = task => {
    setSelectedTask(task);
    setActiveTab('task-details');
  };
  const handleEditTask = task => {
    setSelectedTask(task);
    setActiveTab('edit-task');
  };
  const handleCreateTask = () => {
    setSelectedTask(null);
    setActiveTab('create-task');
  };
  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "刷新成功",
        description: "数据已更新"
      });
    }, 1000);
  };
  const filteredMilestones = milestones.filter(milestone => {
    const matchesStatus = filterStatus === 'all' || milestone.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || milestone.priority === filterPriority;
    const matchesSearch = milestone.name.toLowerCase().includes(searchTerm.toLowerCase()) || milestone.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesPriority && matchesSearch;
  });
  const completedMilestones = milestones.filter(m => m.status === 'completed').length;
  const inProgressMilestones = milestones.filter(m => m.status === 'in_progress').length;
  const totalBudget = milestones.reduce((sum, m) => sum + m.budget, 0);
  const totalActualCost = milestones.reduce((sum, m) => sum + m.actualCost, 0);
  const overallProgress = milestones.length > 0 ? milestones.reduce((sum, m) => sum + m.progress, 0) / milestones.length : 0;
  const activeRisks = risks.filter(r => r.status === 'active').length;
  const mitigatedRisks = risks.filter(r => r.status === 'mitigated').length;
  return <div className="min-h-screen bg-gray-50" style={style}>
      <div className="container mx-auto px-4 py-6">
        <div className="space-y-6">
          {/* 页面标题 */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">A轮路线图管理</h1>
                <p className="text-gray-600 mt-2">
                  管理A轮融资路线图，包括里程碑、任务分配、资源规划和风险评估
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="outline" onClick={handleRefresh} disabled={loading}>
                  <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                  刷新
                </Button>
                <Button onClick={handleCreateMilestone}>
                  <Plus className="w-4 h-4 mr-2" />
                  新建里程碑
                </Button>
              </div>
            </div>
          </div>

          {/* 统计卡片 */}
          <div className="grid grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Target className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">总里程碑</p>
                    <p className="text-2xl font-bold text-gray-900">{milestones.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">已完成</p>
                    <p className="text-2xl font-bold text-gray-900">{completedMilestones}</p>
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
                    <p className="text-sm text-gray-600">进行中</p>
                    <p className="text-2xl font-bold text-gray-900">{inProgressMilestones}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">整体进度</p>
                    <p className="text-2xl font-bold text-gray-900">{overallProgress.toFixed(1)}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 功能标签页 */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-7">
              <TabsTrigger value="overview">概览</TabsTrigger>
              <TabsTrigger value="milestones">里程碑</TabsTrigger>
              <TabsTrigger value="tasks">任务管理</TabsTrigger>
              <TabsTrigger value="gantt">甘特图</TabsTrigger>
              <TabsTrigger value="resources">资源分配</TabsTrigger>
              <TabsTrigger value="risks">风险评估</TabsTrigger>
              <TabsTrigger value="kpis">KPI仪表板</TabsTrigger>
            </TabsList>

            {/* 概览标签页 */}
            <TabsContent value="overview" className="space-y-6">
              {/* 筛选器 */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input type="text" placeholder="搜索里程碑..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                    </div>
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">全部状态</SelectItem>
                        <SelectItem value="completed">已完成</SelectItem>
                        <SelectItem value="in_progress">进行中</SelectItem>
                        <SelectItem value="pending">待开始</SelectItem>
                        <SelectItem value="planned">计划中</SelectItem>
                        <SelectItem value="delayed">延期</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={filterPriority} onValueChange={setFilterPriority}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">全部优先级</SelectItem>
                        <SelectItem value="critical">关键</SelectItem>
                        <SelectItem value="high">高</SelectItem>
                        <SelectItem value="medium">中</SelectItem>
                        <SelectItem value="low">低</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* 里程碑列表 */}
              <Card>
                <CardHeader>
                  <CardTitle>里程碑概览</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredMilestones.map(milestone => <div key={milestone.id} className="border rounded-lg p-4 hover:bg-gray-50">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h4 className="font-medium text-gray-900">{milestone.name}</h4>
                              {getStatusBadge(milestone.status)}
                              {getPriorityBadge(milestone.priority)}
                            </div>
                            <p className="text-sm text-gray-600 mb-3">{milestone.description}</p>
                            <div className="grid grid-cols-4 gap-4 text-sm">
                              <div>
                                <span className="text-gray-500">开始日期:</span>
                                <span className="text-gray-900 ml-1">{milestone.startDate}</span>
                              </div>
                              <div>
                                <span className="text-gray-500">结束日期:</span>
                                <span className="text-gray-900 ml-1">{milestone.endDate}</span>
                              </div>
                              <div>
                                <span className="text-gray-500">负责人:</span>
                                <span className="text-gray-900 ml-1">{milestone.owner}</span>
                              </div>
                              <div>
                                <span className="text-gray-500">预算:</span>
                                <span className="text-gray-900 ml-1">¥{(milestone.budget / 10000).toFixed(1)}万</span>
                              </div>
                            </div>
                            <div className="mt-3">
                              <div className="flex items-center justify-between text-sm mb-1">
                                <span className="text-gray-600">进度</span>
                                <span className="text-gray-900">{milestone.progress}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-blue-600 h-2 rounded-full" style={{
                              width: `${milestone.progress}%`
                            }}></div>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 ml-4">
                            <Button variant="ghost" size="sm" onClick={() => handleViewMilestone(milestone)}>
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleEditMilestone(milestone)}>
                              <Edit className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>)}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* 里程碑标签页 */}
            <TabsContent value="milestones">
              <RoadmapTimeline milestones={milestones} tasks={tasks} onViewMilestone={handleViewMilestone} onEditMilestone={handleEditMilestone} />
            </TabsContent>

            {/* 任务管理标签页 */}
            <TabsContent value="tasks">
              <FeatureProgress tasks={tasks} milestones={milestones} onViewTask={handleViewTask} onEditTask={handleEditTask} onCreateTask={handleCreateTask} />
            </TabsContent>

            {/* 甘特图标签页 */}
            <TabsContent value="gantt" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center">
                      <GanttChart className="w-5 h-5 mr-2" />
                      甘特图视图
                    </span>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        导出
                      </Button>
                      <Button variant="outline" size="sm">
                        <Settings className="w-4 h-4 mr-2" />
                        设置
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-96 flex items-center justify-center text-gray-500">
                    <div className="text-center">
                      <GanttChart className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                      <p>甘特图组件 (需要集成图表库)</p>
                      <p className="text-sm mt-2">显示里程碑和任务的时间线关系</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 甘特图数据表格 */}
              <Card>
                <CardHeader>
                  <CardTitle>时间线详情</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>名称</TableHead>
                        <TableHead>类型</TableHead>
                        <TableHead>开始日期</TableHead>
                        <TableHead>结束日期</TableHead>
                        <TableHead>持续时间</TableHead>
                        <TableHead>进度</TableHead>
                        <TableHead>依赖关系</TableHead>
                        <TableHead>负责人</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {milestones.map(milestone => <TableRow key={milestone.id}>
                          <TableCell>
                            <div className="font-medium text-gray-900">{milestone.name}</div>
                            <div className="text-sm text-gray-500">里程碑</div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">里程碑</Badge>
                          </TableCell>
                          <TableCell>{milestone.startDate}</TableCell>
                          <TableCell>{milestone.endDate}</TableCell>
                          <TableCell>
                            {Math.ceil((new Date(milestone.endDate) - new Date(milestone.startDate)) / (1000 * 60 * 60 * 24))}天
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <div className="w-16 bg-gray-200 rounded-full h-2">
                                <div className="bg-blue-600 h-2 rounded-full" style={{
                              width: `${milestone.progress}%`
                            }}></div>
                              </div>
                              <span className="text-sm">{milestone.progress}%</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {milestone.dependencies.map((dep, index) => <Badge key={index} variant="secondary" className="text-xs">
                                  {dep}
                                </Badge>)}
                            </div>
                          </TableCell>
                          <TableCell>{milestone.owner}</TableCell>
                        </TableRow>)}
                      {tasks.map(task => <TableRow key={task.id}>
                          <TableCell>
                            <div className="font-medium text-gray-900">{task.title}</div>
                            <div className="text-sm text-gray-500">任务</div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">任务</Badge>
                          </TableCell>
                          <TableCell>{task.startDate}</TableCell>
                          <TableCell>{task.dueDate}</TableCell>
                          <TableCell>
                            {Math.ceil((new Date(task.dueDate) - new Date(task.startDate)) / (1000 * 60 * 60 * 24))}天
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <div className="w-16 bg-gray-200 rounded-full h-2">
                                <div className="bg-green-600 h-2 rounded-full" style={{
                              width: `${task.progress}%`
                            }}></div>
                              </div>
                              <span className="text-sm">{task.progress}%</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {task.dependencies.map((dep, index) => <Badge key={index} variant="secondary" className="text-xs">
                                  {dep}
                                </Badge>)}
                            </div>
                          </TableCell>
                          <TableCell>{task.assignee}</TableCell>
                        </TableRow>)}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* 资源分配标签页 */}
            <TabsContent value="resources">
              <ResourceAllocation resources={resources} milestones={milestones} />
            </TabsContent>

            {/* 风险评估标签页 */}
            <TabsContent value="risks">
              <RiskAssessment risks={risks} milestones={milestones} />
            </TabsContent>

            {/* KPI仪表板标签页 */}
            <TabsContent value="kpis">
              <KPIDashboard kpis={kpis} milestones={milestones} risks={risks} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>;
}