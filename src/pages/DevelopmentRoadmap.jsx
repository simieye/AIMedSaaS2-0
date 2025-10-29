// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Badge, Tabs, TabsContent, TabsList, TabsTrigger, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, useToast, Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui';
// @ts-ignore;
import { Calendar, Target, Users, TrendingUp, CheckCircle, Clock, AlertTriangle, Filter, Download, Upload, Plus, RefreshCw, Eye, Edit, Trash2, BarChart3, PieChart, GanttChart, Activity, Zap, Award, Settings, MapPin, Timeline, GitBranch, Layers, Cpu, HardDrive, Wifi, Battery, Thermometer, Wind, Handshake, DollarSign, FileContract, Route, User, Search, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize2, MoreHorizontal, Play, Pause, SkipForward, SkipBack, RotateCcw, Save, FileText, MessageSquare, Star, Flag, Timer, Archive, Bell, BellRing, BellOff, Volume2, VolumeX, PlayCircle, PauseCircle, SkipBackCircle, SkipForwardCircle, Repeat, Shuffle, Mic, MicOff, Video, VideoOff, Phone, PhoneOff, Mail, MailOpen, Send, Paperclip, PaperclipOff, Image, ImageOff, File, FilePlus, FileMinus, FileCheck, FileX, FileSearch, FileSignature, FileInput, FileOutput, FileDown, FileUp, FileCopy, FileMove, FileRename, FileDelete, FileArchive, FileUnarchive, FileLock, FileUnlock, FileQuestion, FileWarning, FileError, FileDone, FilePending, FileProcessing, FileUploading, FileDownloading, FileSync, FileSyncing, FileRefresh, FileRefreshCw, FileRefreshCcw, FileRotate, FileRotateCw, FileRotateCcw, FileFlip, FileFlipHorizontal, FileFlipVertical, FileZoomIn, FileZoomOut, FileMaximize, FileMinimize, FileExpand, FileShrink, FileFull, FileEmpty } from 'lucide-react';

import { RoadmapTimeline } from '@/components/RoadmapTimeline';
import { FeatureProgress } from '@/components/FeatureProgress';
import { ResourceAllocation } from '@/components/ResourceAllocation';
import { RiskAssessment } from '@/components/RiskAssessment';
import { KPIDashboard } from '@/components/KPIDashboard';
export default function DevelopmentRoadmap(props) {
  const {
    $w,
    style
  } = props;
  const {
    toast
  } = useToast();
  const [activeTab, setActiveTab] = useState('gantt');
  const [selectedMilestone, setSelectedMilestone] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [roadmapData, setRoadmapData] = useState(null);
  const [milestones, setMilestones] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [resources, setResources] = useState([]);
  const [risks, setRisks] = useState([]);
  const [kpis, setKpis] = useState([]);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState('month');
  const [zoomLevel, setZoomLevel] = useState(100);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // 模拟路线图数据
  const mockRoadmapData = {
    id: 'RDM001',
    name: 'OncoPilot 2.0 A轮开发路线图',
    description: '基于A轮融资计划的功能开发路线图，包含核心功能模块的开发时间线和里程碑',
    category: 'product_development',
    status: 'active',
    priority: 'high',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    budget: 15000000,
    actualCost: 8500000,
    owner: '产品开发团队',
    team: ['产品经理', '技术总监', '前端开发', '后端开发', 'AI工程师', '测试工程师'],
    progress: 65,
    tags: ['A轮融资', '产品开发', 'AI诊断', '医疗平台'],
    metadata: {
      version: 'v2.0',
      createdBy: '项目管理办公室',
      updatedBy: '产品团队'
    }
  };

  // 模拟里程碑数据
  const mockMilestones = [{
    id: 'MS001',
    name: 'AI诊断核心引擎完成',
    description: '完成AI诊断系统的核心算法开发和模型训练',
    category: 'ai_development',
    status: 'completed',
    priority: 'critical',
    startDate: '2024-01-15',
    endDate: '2024-03-31',
    actualEndDate: '2024-03-28',
    progress: 100,
    budget: 3000000,
    actualCost: 2800000,
    owner: 'AI开发团队',
    dependencies: ['数据准备完成', '算法设计确认'],
    deliverables: ['AI诊断模型', '算法文档', '性能测试报告'],
    risks: ['算法准确率不达标', '训练数据不足'],
    kpis: {
      accuracy: 95.2,
      processingSpeed: 1.2,
      modelSize: 850,
      deploymentSuccess: 98
    }
  }, {
    id: 'MS002',
    name: '用户界面重构完成',
    description: '完成用户界面的重新设计和开发，提升用户体验',
    category: 'frontend_development',
    status: 'completed',
    priority: 'high',
    startDate: '2024-02-01',
    endDate: '2024-04-30',
    actualEndDate: '2024-04-25',
    progress: 100,
    budget: 2000000,
    actualCost: 1900000,
    owner: '前端开发团队',
    dependencies: ['UI设计完成', 'API接口确定'],
    deliverables: ['新用户界面', '响应式设计', '交互原型'],
    risks: ['浏览器兼容性', '性能优化'],
    kpis: {
      userSatisfaction: 4.6,
      pageLoadTime: 1.8,
      mobileCompatibility: 96,
      accessibility: 92
    }
  }, {
    id: 'MS003',
    name: '数据安全系统部署',
    description: '部署完整的数据安全系统，确保患者数据安全',
    category: 'security',
    status: 'in_progress',
    priority: 'critical',
    startDate: '2024-03-15',
    endDate: '2024-06-30',
    actualEndDate: null,
    progress: 75,
    budget: 2500000,
    actualCost: 1800000,
    owner: '安全团队',
    dependencies: ['安全架构设计', '合规要求确认'],
    deliverables: ['加密系统', '访问控制', '审计日志'],
    risks: ['合规风险', '性能影响'],
    kpis: {
      securityScore: 94,
      complianceLevel: 98,
      auditCoverage: 100,
      incidentResponse: 2.5
    }
  }, {
    id: 'MS004',
    name: '医院系统集成',
    description: '与目标医院完成系统对接和集成测试',
    category: 'integration',
    status: 'in_progress',
    priority: 'high',
    startDate: '2024-04-01',
    endDate: '2024-08-31',
    actualEndDate: null,
    progress: 45,
    budget: 3500000,
    actualCost: 1500000,
    owner: '集成团队',
    dependencies: ['API开发完成', '医院合作协议'],
    deliverables: ['API接口', '集成文档', '测试报告'],
    risks: ['接口兼容性', '医院配合度'],
    kpis: {
      integrationSuccess: 88,
      apiStability: 95,
      hospitalSatisfaction: 4.2,
      dataSyncAccuracy: 99.5
    }
  }, {
    id: 'MS005',
    name: '临床试验支持功能',
    description: '开发支持临床试验的功能模块',
    category: 'clinical',
    status: 'pending',
    priority: 'medium',
    startDate: '2024-07-01',
    endDate: '2024-10-31',
    actualEndDate: null,
    progress: 0,
    budget: 2000000,
    actualCost: 0,
    owner: '临床团队',
    dependencies: ['医院系统集成', '临床试验协议'],
    deliverables: ['试验管理模块', '数据收集工具', '报告生成器'],
    risks: ['法规变化', '试验延期'],
    kpis: {
      trialEfficiency: 0,
      dataQuality: 0,
      regulatoryCompliance: 0,
      userAdoption: 0
    }
  }, {
    id: 'MS006',
    name: '商业化准备完成',
    description: '完成产品商业化的所有准备工作',
    category: 'business',
    status: 'planned',
    priority: 'high',
    startDate: '2024-09-01',
    endDate: '2024-12-31',
    actualEndDate: null,
    progress: 0,
    budget: 2000000,
    actualCost: 0,
    owner: '商业团队',
    dependencies: ['临床试验支持功能', '市场调研完成'],
    deliverables: ['商业化方案', '定价策略', '销售工具'],
    risks: ['市场接受度', '竞争压力'],
    kpis: {
      marketReadiness: 0,
      salesPipeline: 0,
      partnerInterest: 0,
      revenueProjection: 0
    }
  }];

  // 模拟任务数据
  const mockTasks = [{
    id: 'TSK001',
    milestoneId: 'MS001',
    title: '数据预处理算法开发',
    description: '开发医疗数据的预处理和清洗算法',
    assignee: '张算法工程师',
    status: 'completed',
    priority: 'high',
    startDate: '2024-01-15',
    dueDate: '2024-02-15',
    completedDate: '2024-02-12',
    estimatedHours: 160,
    actualHours: 145,
    progress: 100,
    dependencies: ['数据收集完成'],
    tags: ['算法', '数据处理', 'Python'],
    attachments: ['算法文档.pdf', '测试数据.csv'],
    comments: [{
      id: 1,
      author: '技术总监',
      content: '算法性能超出预期，处理速度提升30%',
      timestamp: '2024-02-13 10:30:00'
    }]
  }, {
    id: 'TSK002',
    milestoneId: 'MS001',
    title: '深度学习模型训练',
    description: '训练AI诊断的核心深度学习模型',
    assignee: '李AI工程师',
    status: 'completed',
    priority: 'critical',
    startDate: '2024-02-01',
    endDate: '2024-03-31',
    completedDate: '2024-03-28',
    estimatedHours: 320,
    actualHours: 310,
    progress: 100,
    dependencies: ['数据预处理算法开发'],
    tags: ['深度学习', '模型训练', 'TensorFlow'],
    attachments: ['模型文件.h5', '训练日志.txt', '性能报告.pdf'],
    comments: [{
      id: 2,
      author: 'AI团队负责人',
      content: '模型准确率达到95.2%，超过目标指标',
      timestamp: '2024-03-29 14:20:00'
    }]
  }, {
    id: 'TSK003',
    milestoneId: 'MS002',
    title: 'React组件重构',
    description: '重构现有React组件，提升性能和可维护性',
    assignee: '王前端工程师',
    status: 'completed',
    priority: 'high',
    startDate: '2024-02-01',
    dueDate: '2024-03-15',
    completedDate: '2024-03-10',
    estimatedHours: 200,
    actualHours: 185,
    progress: 100,
    dependencies: ['UI设计确认'],
    tags: ['React', '前端', '组件化'],
    attachments: ['组件库.zip', '设计规范.fig'],
    comments: [{
      id: 3,
      author: '前端团队负责人',
      content: '组件重构完成，页面加载速度提升40%',
      timestamp: '2024-03-11 16:45:00'
    }]
  }, {
    id: 'TSK004',
    milestoneId: 'MS003',
    title: '加密系统实现',
    description: '实现端到端的数据加密系统',
    assignee: '赵安全工程师',
    status: 'in_progress',
    priority: 'critical',
    startDate: '2024-03-15',
    dueDate: '2024-05-31',
    completedDate: null,
    estimatedHours: 240,
    actualHours: 180,
    progress: 75,
    dependencies: ['安全架构设计'],
    tags: ['安全', '加密', '网络安全'],
    attachments: ['安全架构.pdf', '加密算法.doc'],
    comments: [{
      id: 4,
      author: '安全团队负责人',
      content: '核心加密功能已完成，正在进行性能优化',
      timestamp: '2024-05-20 11:30:00'
    }]
  }, {
    id: 'TSK005',
    milestoneId: 'MS004',
    title: 'HL7接口开发',
    description: '开发符合HL7标准的医院系统接口',
    assignee: '钱后端工程师',
    status: 'in_progress',
    priority: 'high',
    startDate: '2024-04-01',
    dueDate: '2024-06-30',
    completedDate: null,
    estimatedHours: 280,
    actualHours: 120,
    progress: 45,
    dependencies: ['API设计完成'],
    tags: ['HL7', '后端', '集成'],
    attachments: ['HL7规范.pdf', '接口文档.md'],
    comments: [{
      id: 5,
      author: '集成团队负责人',
      content: '基础接口框架已完成，正在与医院进行联调测试',
      timestamp: '2024-05-25 09:15:00'
    }]
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
    cost: 8500000,
    budget: 10000000,
    members: [{
      name: '张工程师',
      role: '算法工程师',
      allocation: 90,
      skills: ['Python', '机器学习', '深度学习']
    }, {
      name: '李工程师',
      role: 'AI工程师',
      allocation: 95,
      skills: ['TensorFlow', 'PyTorch', 'NLP']
    }, {
      name: '王工程师',
      role: '前端工程师',
      allocation: 85,
      skills: ['React', 'TypeScript', 'UI/UX']
    }, {
      name: '赵工程师',
      role: '安全工程师',
      allocation: 80,
      skills: ['网络安全', '加密', '合规']
    }, {
      name: '钱工程师',
      role: '后端工程师',
      allocation: 85,
      skills: ['Java', 'Spring', '数据库']
    }],
    projects: ['AI诊断核心引擎', '用户界面重构', '数据安全系统', '医院系统集成'],
    constraints: ['技能匹配', '时间冲突', '预算限制']
  }, {
    id: 'RES002',
    type: 'infrastructure',
    name: '云服务资源',
    category: 'technology',
    totalCapacity: 100,
    allocatedCapacity: 70,
    availableCapacity: 30,
    utilization: 70,
    cost: 1200000,
    budget: 2000000,
    services: ['计算资源', '存储资源', '网络带宽', 'GPU集群'],
    projects: ['模型训练', '数据存储', 'API服务', '测试环境'],
    constraints: ['性能要求', '扩展性需求', '成本控制']
  }, {
    id: 'RES003',
    type: 'financial',
    name: '项目预算',
    category: 'budget',
    totalCapacity: 15000000,
    allocatedCapacity: 11500000,
    availableCapacity: 3500000,
    utilization: 77,
    cost: 11500000,
    budget: 15000000,
    allocations: [{
      project: 'AI诊断核心引擎',
      amount: 3000000,
      percentage: 20
    }, {
      project: '用户界面重构',
      amount: 2000000,
      percentage: 13.3
    }, {
      project: '数据安全系统',
      amount: 2500000,
      percentage: 16.7
    }, {
      project: '医院系统集成',
      amount: 3500000,
      percentage: 23.3
    }, {
      project: '临床试验支持',
      amount: 2000000,
      percentage: 13.3
    }, {
      project: '商业化准备',
      amount: 2000000,
      percentage: 13.3
    }],
    constraints: ['预算限制', '成本控制', '资金流动性']
  }];

  // 模拟风险数据
  const mockRisks = [{
    id: 'RSK001',
    title: '技术实现风险',
    description: 'AI算法准确率可能不达预期要求',
    category: 'technical',
    probability: 'low',
    impact: 'high',
    status: 'mitigated',
    owner: '技术团队',
    identifiedDate: '2024-01-15',
    mitigationPlan: '增加训练数据量，优化模型架构，引入专家知识',
    contingencyPlan: '采用第三方成熟算法作为备选方案',
    progress: 100,
    kpis: {
      riskScore: 2.0,
      mitigationProgress: 100,
      residualRisk: 0.5
    }
  }, {
    id: 'RSK002',
    title: '数据安全合规风险',
    description: '医疗数据安全合规要求严格，可能影响项目进度',
    category: 'regulatory',
    probability: 'medium',
    impact: 'critical',
    status: 'active',
    owner: '安全团队',
    identifiedDate: '2024-02-01',
    mitigationPlan: '提前进行合规评估，引入专业安全顾问，建立完善的审计机制',
    contingencyPlan: '调整功能范围，优先确保核心功能合规',
    progress: 75,
    kpis: {
      riskScore: 6.0,
      mitigationProgress: 75,
      residualRisk: 3.0
    }
  }, {
    id: 'RSK003',
    title: '医院集成风险',
    description: '与医院系统集成可能遇到技术和管理障碍',
    category: 'integration',
    probability: 'high',
    impact: 'medium',
    status: 'monitoring',
    owner: '集成团队',
    identifiedDate: '2024-03-01',
    mitigationPlan: '建立专门的技术支持团队，制定详细的集成计划，加强与医院沟通',
    contingencyPlan: '采用分阶段集成策略，优先集成核心功能',
    progress: 45,
    kpis: {
      riskScore: 6.0,
      mitigationProgress: 45,
      residualRisk: 4.5
    }
  }, {
    id: 'RSK004',
    title: '人才流失风险',
    description: '关键技术人员可能离职，影响项目进度',
    category: 'human',
    probability: 'medium',
    impact: 'high',
    status: 'monitoring',
    owner: '人力资源',
    identifiedDate: '2024-01-20',
    mitigationPlan: '提供有竞争力的薪酬福利，建立良好的工作环境，制定知识传承计划',
    contingencyPlan: '建立人才储备池，培养多技能人才',
    progress: 60,
    kpis: {
      riskScore: 6.0,
      mitigationProgress: 60,
      residualRisk: 3.5
    }
  }];

  // 模拟KPI数据
  const mockKpis = [{
    id: 'KPI001',
    name: '项目整体进度',
    category: 'progress',
    currentValue: 65,
    targetValue: 75,
    unit: '%',
    status: 'on_track',
    trend: 'up',
    lastUpdated: '2024-05-25',
    description: 'A轮路线图整体项目进度',
    calculation: '已完成里程碑权重 / 总里程碑权重',
    owner: '项目管理办公室',
    frequency: 'weekly',
    historicalData: [{
      date: '2024-01-01',
      value: 15
    }, {
      date: '2024-02-01',
      value: 25
    }, {
      date: '2024-03-01',
      value: 40
    }, {
      date: '2024-04-01',
      value: 55
    }, {
      date: '2024-05-01',
      value: 60
    }, {
      date: '2024-05-25',
      value: 65
    }]
  }, {
    id: 'KPI002',
    name: '预算执行率',
    category: 'financial',
    currentValue: 77,
    targetValue: 80,
    unit: '%',
    status: 'on_track',
    trend: 'stable',
    lastUpdated: '2024-05-25',
    description: '项目预算使用情况',
    calculation: '实际支出 / 预算总额',
    owner: '财务部门',
    frequency: 'monthly',
    historicalData: [{
      date: '2024-01-01',
      value: 10
    }, {
      date: '2024-02-01',
      value: 25
    }, {
      date: '2024-03-01',
      value: 40
    }, {
      date: '2024-04-01',
      value: 55
    }, {
      date: '2024-05-01',
      value: 70
    }, {
      date: '2024-05-25',
      value: 77
    }]
  }, {
    id: 'KPI003',
    name: '团队效率指数',
    category: 'efficiency',
    currentValue: 88,
    targetValue: 90,
    unit: '分',
    status: 'on_track',
    trend: 'up',
    lastUpdated: '2024-05-25',
    description: '团队工作效率综合评分',
    calculation: '任务完成率 × 质量评分 × 时间效率',
    owner: '人力资源部',
    frequency: 'weekly',
    historicalData: [{
      date: '2024-01-01',
      value: 75
    }, {
      date: '2024-02-01',
      value: 78
    }, {
      date: '2024-03-01',
      value: 82
    }, {
      date: '2024-04-01',
      value: 85
    }, {
      date: '2024-05-01',
      value: 86
    }, {
      date: '2024-05-25',
      value: 88
    }]
  }, {
    id: 'KPI004',
    name: '质量指标',
    category: 'quality',
    currentValue: 92,
    targetValue: 95,
    unit: '分',
    status: 'attention',
    trend: 'down',
    lastUpdated: '2024-05-25',
    description: '代码质量和系统稳定性综合评分',
    calculation: '代码质量分 × 测试覆盖率 × 系统稳定性',
    owner: '质量保证部',
    frequency: 'weekly',
    historicalData: [{
      date: '2024-01-01',
      value: 88
    }, {
      date: '2024-02-01',
      value: 90
    }, {
      date: '2024-03-01',
      value: 91
    }, {
      date: '2024-04-01',
      value: 93
    }, {
      date: '2024-05-01',
      value: 94
    }, {
      date: '2024-05-25',
      value: 92
    }]
  }];
  useEffect(() => {
    setRoadmapData(mockRoadmapData);
    setMilestones(mockMilestones);
    setTasks(mockTasks);
    setResources(mockResources);
    setRisks(mockRisks);
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
  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 10, 200));
  };
  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 10, 50));
  };
  const handleViewModeChange = mode => {
    setViewMode(mode);
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
  const completedTasks = tasks.filter(t => t.status === 'completed').length;
  const totalTasks = tasks.length;
  return <div className="min-h-screen bg-gray-50" style={style}>
      <div className="container mx-auto px-4 py-6">
        <div className="space-y-6">
          {/* 页面标题 */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">开发路线图</h1>
                <p className="text-gray-600 mt-2">
                  OncoPilot 2.0 A轮开发路线图 - 功能开发时间线和里程碑管理
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
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="gantt">甘特图</TabsTrigger>
              <TabsTrigger value="milestones">里程碑</TabsTrigger>
              <TabsTrigger value="tasks">任务管理</TabsTrigger>
              <TabsTrigger value="timeline">时间轴</TabsTrigger>
              <TabsTrigger value="resources">资源分配</TabsTrigger>
              <TabsTrigger value="kpis">KPI仪表板</TabsTrigger>
            </TabsList>

            {/* 甘特图标签页 */}
            <TabsContent value="gantt" className="space-y-6">
              {/* 甘特图控制栏 */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" onClick={handleZoomOut}>
                          <ZoomOut className="w-4 h-4" />
                        </Button>
                        <span className="text-sm font-medium">{zoomLevel}%</span>
                        <Button variant="outline" size="sm" onClick={handleZoomIn}>
                          <ZoomIn className="w-4 h-4" />
                        </Button>
                      </div>
                      <Select value={viewMode} onValueChange={handleViewModeChange}>
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="day">日视图</SelectItem>
                          <SelectItem value="week">周视图</SelectItem>
                          <SelectItem value="month">月视图</SelectItem>
                          <SelectItem value="quarter">季度视图</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        导出
                      </Button>
                      <Button variant="outline" size="sm">
                        <Maximize2 className="w-4 h-4 mr-2" />
                        全屏
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 甘特图主体 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center">
                      <GanttChart className="w-5 h-5 mr-2" />
                      项目甘特图
                    </span>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      <span>2024年1月 - 2024年12月</span>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-96 overflow-auto">
                    {/* 甘特图时间轴头部 */}
                    <div className="sticky top-0 bg-gray-50 border-b border-gray-200 p-2 z-10">
                      <div className="grid grid-cols-12 gap-2 text-xs font-medium text-gray-600">
                        <div>任务名称</div>
                        <div>1月</div>
                        <div>2月</div>
                        <div>3月</div>
                        <div>4月</div>
                        <div>5月</div>
                        <div>6月</div>
                        <div>7月</div>
                        <div>8月</div>
                        <div>9月</div>
                        <div>10月</div>
                        <div>11月</div>
                        <div>12月</div>
                      </div>
                    </div>

                    {/* 甘特图任务行 */}
                    <div className="space-y-2">
                      {milestones.map(milestone => <div key={milestone.id} className="border-b border-gray-100 p-2">
                          <div className="grid grid-cols-12 gap-2 items-center">
                            <div className="text-sm font-medium text-gray-900">
                              <div>{milestone.name}</div>
                              <div className="text-xs text-gray-500">{milestone.owner}</div>
                            </div>
                            <div className="col-span-11 relative h-8 bg-gray-100 rounded">
                              {/* 任务进度条 */}
                              <div className={`absolute h-full rounded ${milestone.status === 'completed' ? 'bg-green-500' : milestone.status === 'in_progress' ? 'bg-blue-500' : 'bg-gray-400'}`} style={{
                            left: `${getMonthPosition(milestone.startDate)}%`,
                            width: `${getMonthWidth(milestone.startDate, milestone.endDate)}%`
                          }}>
                                <div className="h-full flex items-center justify-center text-xs text-white font-medium">
                                  {milestone.progress}%
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>)}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 甘特图图例 */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-center space-x-6 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-green-500 rounded"></div>
                      <span>已完成</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-blue-500 rounded"></div>
                      <span>进行中</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-gray-400 rounded"></div>
                      <span>计划中</span>
                    </div>
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

            {/* 时间轴标签页 */}
            <TabsContent value="timeline" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center">
                      <Timeline className="w-5 h-5 mr-2" />
                      项目时间轴
                    </span>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      <span className="text-sm font-medium">2024年</span>
                      <Button variant="outline" size="sm">
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {milestones.map((milestone, index) => <div key={milestone.id} className="flex items-start space-x-4">
                        <div className="flex flex-col items-center">
                          <div className={`w-4 h-4 rounded-full ${milestone.status === 'completed' ? 'bg-green-500' : milestone.status === 'in_progress' ? 'bg-blue-500' : 'bg-gray-400'}`}></div>
                          {index < milestones.length - 1 && <div className="w-0.5 h-20 bg-gray-300 mt-2"></div>}
                        </div>
                        <div className="flex-1 pb-8">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-gray-900">{milestone.name}</h4>
                            <div className="flex items-center space-x-2">
                              {getStatusBadge(milestone.status)}
                              {getPriorityBadge(milestone.priority)}
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{milestone.description}</p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-3 h-3" />
                              <span>{milestone.startDate} - {milestone.endDate}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <User className="w-3 h-3" />
                              <span>{milestone.owner}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <TrendingUp className="w-3 h-3" />
                              <span>{milestone.progress}%</span>
                            </div>
                          </div>
                          {milestone.actualEndDate && <div className="mt-2 text-xs text-green-600">
                              实际完成: {milestone.actualEndDate}
                            </div>}
                        </div>
                      </div>)}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* 资源分配标签页 */}
            <TabsContent value="resources">
              <ResourceAllocation resources={resources} milestones={milestones} />
            </TabsContent>

            {/* KPI仪表板标签页 */}
            <TabsContent value="kpis">
              <KPIDashboard kpis={kpis} milestones={milestones} risks={risks} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>;

  // 辅助函数：计算月份位置
  function getMonthPosition(dateStr) {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = date.getMonth();
    if (year === 2024) {
      return month / 12 * 100;
    }
    return 0;
  }

  // 辅助函数：计算月份宽度
  function getMonthWidth(startDateStr, endDateStr) {
    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);
    const startMonth = startDate.getMonth();
    const endMonth = endDate.getMonth();
    const duration = endMonth - startMonth + 1;
    return duration / 12 * 100;
  }
}