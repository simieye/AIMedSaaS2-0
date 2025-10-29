// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Badge, Tabs, TabsContent, TabsList, TabsTrigger, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, useToast, Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui';
// @ts-ignore;
import { Building, DollarSign, Users, Calendar, CheckCircle, Clock, AlertTriangle, Eye, Edit, Download, Upload, Plus, Search, Filter, RefreshCw, TrendingUp, BarChart3, PieChart, FileText, Target, Activity, Zap, Award, Globe, Mail as MailIcon, Phone, MapPin, Star, CreditCard, Banknote, FileSpreadsheet, Printer, Settings, Image, Layout, Megaphone, Ad, Analytics, Calculator, Receipt, Briefcase, Handshake, ArrowUpRight, ArrowDownRight, MoreHorizontal, User } from 'lucide-react';

import { SponsorList } from '@/components/SponsorList';
import { SponsorshipProjects } from '@/components/SponsorshipProjects';
import { AdPositionManagement } from '@/components/AdPositionManagement';
import { ROIAnalysisDashboard } from '@/components/ROIAnalysisDashboard';
import { FinancialManagement } from '@/components/FinancialManagement';
import { ReportGeneration } from '@/components/ReportGeneration';
export default function PharmaSponsorshipManagement(props) {
  const {
    $w,
    style
  } = props;
  const {
    toast
  } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedSponsor, setSelectedSponsor] = useState(null);
  const [sponsors, setSponsors] = useState([]);
  const [projects, setProjects] = useState([]);
  const [adPositions, setAdPositions] = useState([]);
  const [financialData, setFinancialData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  // 模拟赞助商数据
  const mockSponsors = [{
    id: 'SPN001',
    name: '辉瑞制药',
    englishName: 'Pfizer Inc.',
    type: 'pharmaceutical',
    status: 'active',
    level: 'platinum',
    contactPerson: '王博士',
    contactEmail: 'wang@pfizer.com',
    contactPhone: '+1-212-555-0123',
    address: '纽约市235东42街',
    website: 'https://www.pfizer.com',
    description: '全球领先的生物制药公司，专注于创新药物的研发和生产',
    foundedYear: 1849,
    employees: 78000,
    marketCap: '220B',
    revenue: '81.3B',
    specialties: ['肿瘤药物', '心血管药物', '疫苗', '罕见病药物'],
    projects: 5,
    totalInvestment: 5000000,
    roi: 125,
    satisfaction: 4.8,
    contractStart: '2023-06-01',
    contractEnd: '2025-05-31',
    lastPayment: '2024-01-15',
    nextPayment: '2024-04-15',
    performance: {
      brandAwareness: 85,
      leadGeneration: 92,
      conversionRate: 78,
      customerAcquisition: 88
    }
  }, {
    id: 'SPN002',
    name: '强生公司',
    englishName: 'Johnson & Johnson',
    type: 'pharmaceutical',
    status: 'active',
    level: 'gold',
    contactPerson: '李经理',
    contactEmail: 'li@jnj.com',
    contactPhone: '+1-732-524-0123',
    address: '新泽西州新不伦瑞克',
    website: 'https://www.jnj.com',
    description: '全球最大的医疗健康公司之一，涵盖制药、医疗器械和消费品',
    foundedYear: 1886,
    employees: 140000,
    marketCap: '430B',
    revenue: '94.9B',
    specialties: ['医疗器械', '消费品', '制药'],
    projects: 3,
    totalInvestment: 3000000,
    roi: 98,
    satisfaction: 4.6,
    contractStart: '2023-09-01',
    contractEnd: '2024-08-31',
    lastPayment: '2024-01-10',
    nextPayment: '2024-04-10',
    performance: {
      brandAwareness: 78,
      leadGeneration: 85,
      conversionRate: 72,
      customerAcquisition: 80
    }
  }, {
    id: 'SPN003',
    name: '罗氏制药',
    englishName: 'Roche Holding AG',
    type: 'pharmaceutical',
    status: 'pending',
    level: 'silver',
    contactPerson: '张总监',
    contactEmail: 'zhang@roche.com',
    contactPhone: '+41-61-688-1111',
    address: '瑞士巴塞尔',
    website: 'https://www.roche.com',
    description: '全球领先的生物技术公司，专注于肿瘤学和个性化医疗',
    foundedYear: 1896,
    employees: 100000,
    marketCap: '280B',
    revenue: '66.3B',
    specialties: ['肿瘤学', '个性化医疗', '诊断'],
    projects: 2,
    totalInvestment: 1500000,
    roi: 0,
    satisfaction: 0,
    contractStart: null,
    contractEnd: null,
    lastPayment: null,
    nextPayment: null,
    performance: {
      brandAwareness: 0,
      leadGeneration: 0,
      conversionRate: 0,
      customerAcquisition: 0
    }
  }];

  // 模拟赞助项目数据
  const mockProjects = [{
    id: 'PRJ001',
    sponsorId: 'SPN001',
    sponsorName: '辉瑞制药',
    title: '新药研发AI平台合作',
    type: 'research_development',
    status: 'active',
    priority: 'high',
    startDate: '2023-06-01',
    endDate: '2025-05-31',
    budget: 5000000,
    currency: 'USD',
    actualSpent: 2100000,
    description: '与辉瑞制药合作开发新药AI辅助研发平台，加速药物发现和临床试验',
    objectives: ['加速药物发现', '优化临床试验设计', '提高研发效率'],
    milestones: [{
      id: 'M001',
      name: '平台架构设计',
      dueDate: '2023-08-31',
      status: 'completed',
      completedDate: '2023-08-25',
      budget: 500000
    }, {
      id: 'M002',
      name: 'AI模型开发',
      dueDate: '2024-02-29',
      status: 'in_progress',
      completedDate: null,
      budget: 2000000
    }, {
      id: 'M003',
      name: '临床试验集成',
      dueDate: '2024-08-31',
      status: 'pending',
      completedDate: null,
      budget: 1500000
    }],
    team: ['项目经理', 'AI工程师', '医学专家', '数据科学家'],
    deliverables: ['AI研发平台', '数据分析报告', '技术文档'],
    risks: ['技术风险', '时间延期', '预算超支'],
    successMetrics: {
      drugDiscoverySpeed: 30,
      trialEfficiency: 25,
      costReduction: 20,
      accuracy: 95
    }
  }, {
    id: 'PRJ002',
    sponsorId: 'SPN002',
    sponsorName: '强生公司',
    title: '医疗器械AI诊断系统',
    type: 'medical_devices',
    status: 'active',
    priority: 'medium',
    startDate: '2023-09-01',
    endDate: '2024-08-31',
    budget: 3000000,
    currency: 'USD',
    actualSpent: 1200000,
    description: '为强生公司开发医疗器械AI诊断系统，提高诊断准确性和效率',
    objectives: ['提高诊断准确性', '缩短诊断时间', '降低医疗成本'],
    milestones: [{
      id: 'M004',
      name: '需求分析',
      dueDate: '2023-10-31',
      status: 'completed',
      completedDate: '2023-10-28',
      budget: 200000
    }, {
      id: 'M005',
      name: '系统开发',
      dueDate: '2024-03-31',
      status: 'in_progress',
      completedDate: null,
      budget: 1800000
    }],
    team: ['产品经理', '软件工程师', '医学专家'],
    deliverables: ['AI诊断系统', '用户手册', '培训材料'],
    risks: ['技术挑战', '法规合规', '用户接受度'],
    successMetrics: {
      diagnosticAccuracy: 92,
      timeReduction: 40,
      costSavings: 15,
      userSatisfaction: 88
    }
  }];

  // 模拟广告位数据
  const mockAdPositions = [{
    id: 'AD001',
    name: '首页横幅广告',
    type: 'banner',
    position: 'homepage_top',
    status: 'available',
    dimensions: '1200x300',
    price: 50000,
    currency: 'CNY',
    pricingModel: 'cpm',
    description: '网站首页顶部横幅广告位，高曝光率',
    specifications: {
      fileSize: '200KB',
      formats: ['JPG', 'PNG', 'GIF'],
      animation: '支持',
      clickTracking: '支持'
    },
    performance: {
      impressions: 2500000,
      clicks: 12500,
      ctr: 0.5,
      conversions: 1250,
      revenue: 625000
    },
    availability: {
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      bookedDates: ['2024-02-01', '2024-02-15'],
      availableDates: ['2024-01-16', '2024-01-31']
    }
  }, {
    id: 'AD002',
    name: '医生侧边栏广告',
    type: 'sidebar',
    position: 'doctor_sidebar',
    status: 'occupied',
    dimensions: '300x600',
    price: 30000,
    currency: 'CNY',
    pricingModel: 'cpc',
    description: '医生工作台侧边栏广告位，精准投放',
    currentSponsor: '辉瑞制药',
    contractEnd: '2024-06-30',
    specifications: {
      fileSize: '150KB',
      formats: ['JPG', 'PNG'],
      animation: '不支持',
      clickTracking: '支持'
    },
    performance: {
      impressions: 800000,
      clicks: 8000,
      ctr: 1.0,
      conversions: 800,
      revenue: 240000
    },
    availability: {
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      bookedDates: ['2024-01-01', '2024-06-30'],
      availableDates: ['2024-07-01', '2024-12-31']
    }
  }];

  // 模拟财务数据
  const mockFinancialData = [{
    id: 'FIN001',
    sponsorId: 'SPN001',
    sponsorName: '辉瑞制药',
    period: '2024-Q1',
    revenue: 1250000,
    cost: 800000,
    profit: 450000,
    profitMargin: 36,
    currency: 'USD',
    status: 'confirmed',
    invoiceDate: '2024-04-01',
    paymentDate: '2024-04-15',
    items: [{
      description: 'AI研发平台服务费',
      amount: 1000000,
      type: 'service'
    }, {
      description: '技术支持费',
      amount: 250000,
      type: 'support'
    }],
    notes: '第一季度项目进展顺利，客户满意度高'
  }, {
    id: 'FIN002',
    sponsorId: 'SPN002',
    sponsorName: '强生公司',
    period: '2024-Q1',
    revenue: 750000,
    cost: 500000,
    profit: 250000,
    profitMargin: 33.3,
    currency: 'USD',
    status: 'pending',
    invoiceDate: '2024-04-05',
    paymentDate: null,
    items: [{
      description: 'AI诊断系统开发费',
      amount: 600000,
      type: 'development'
    }, {
      description: '咨询服务费',
      amount: 150000,
      type: 'consulting'
    }],
    notes: '项目按计划进行，等待客户确认'
  }];
  useEffect(() => {
    setSponsors(mockSponsors);
    setProjects(mockProjects);
    setAdPositions(mockAdPositions);
    setFinancialData(mockFinancialData);
  }, []);
  const getStatusBadge = status => {
    const statusConfig = {
      active: {
        color: 'bg-green-100 text-green-800',
        icon: CheckCircle,
        text: '活跃'
      },
      pending: {
        color: 'bg-yellow-100 text-yellow-800',
        icon: Clock,
        text: '待审核'
      },
      inactive: {
        color: 'bg-gray-100 text-gray-800',
        icon: AlertTriangle,
        text: '未激活'
      },
      suspended: {
        color: 'bg-red-100 text-red-800',
        icon: AlertTriangle,
        text: '暂停'
      }
    };
    const config = statusConfig[status] || statusConfig.pending;
    const Icon = config.icon;
    return <Badge className={config.color}>
        <Icon className="w-3 h-3 mr-1" />
        {config.text}
      </Badge>;
  };
  const getLevelBadge = level => {
    const levelConfig = {
      platinum: {
        color: 'bg-purple-100 text-purple-800',
        text: '铂金'
      },
      gold: {
        color: 'bg-yellow-100 text-yellow-800',
        text: '黄金'
      },
      silver: {
        color: 'bg-gray-100 text-gray-800',
        text: '白银'
      },
      bronze: {
        color: 'bg-orange-100 text-orange-800',
        text: '青铜'
      }
    };
    const config = levelConfig[level] || levelConfig.silver;
    return <Badge className={config.color}>{config.text}</Badge>;
  };
  const formatCurrency = (amount, currency) => {
    const symbols = {
      CNY: '¥',
      USD: '$',
      EUR: '€'
    };
    return `${symbols[currency] || currency} ${amount.toLocaleString()}`;
  };
  const handleViewSponsor = sponsor => {
    setSelectedSponsor(sponsor);
    setActiveTab('sponsor-details');
  };
  const handleEditSponsor = sponsor => {
    setSelectedSponsor(sponsor);
    setActiveTab('edit-sponsor');
  };
  const handleCreateSponsor = () => {
    setSelectedSponsor(null);
    setActiveTab('create-sponsor');
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
  const filteredSponsors = sponsors.filter(sponsor => {
    const matchesSearch = sponsor.name.toLowerCase().includes(searchTerm.toLowerCase()) || sponsor.englishName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || sponsor.status === statusFilter;
    const matchesType = typeFilter === 'all' || sponsor.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });
  const totalRevenue = financialData.reduce((sum, item) => {
    const convertedValue = item.currency === 'USD' ? item.revenue * 7.2 : item.revenue;
    return sum + convertedValue;
  }, 0);
  const totalProfit = financialData.reduce((sum, item) => {
    const convertedValue = item.currency === 'USD' ? item.profit * 7.2 : item.profit;
    return sum + convertedValue;
  }, 0);
  const activeSponsors = sponsors.filter(s => s.status === 'active').length;
  const totalProjects = projects.length;
  const activeProjects = projects.filter(p => p.status === 'active').length;
  return <div className="min-h-screen bg-gray-50" style={style}>
      <div className="container mx-auto px-4 py-6">
        <div className="space-y-6">
          {/* 页面标题 */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">医药赞助管理</h1>
                <p className="text-gray-600 mt-2">
                  管理医药企业赞助项目、广告位配置、ROI分析和财务报表
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="outline" onClick={handleRefresh} disabled={loading}>
                  <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                  刷新
                </Button>
                <Button onClick={handleCreateSponsor}>
                  <Plus className="w-4 h-4 mr-2" />
                  新增赞助商
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
                    <Building className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">赞助商总数</p>
                    <p className="text-2xl font-bold text-gray-900">{sponsors.length}</p>
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
                    <p className="text-sm text-gray-600">活跃赞助商</p>
                    <p className="text-2xl font-bold text-gray-900">{activeSponsors}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Target className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">赞助项目</p>
                    <p className="text-2xl font-bold text-gray-900">{totalProjects}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <DollarSign className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">总收入</p>
                    <p className="text-2xl font-bold text-gray-900">¥{(totalRevenue / 1000000).toFixed(1)}M</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 功能标签页 */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-7">
              <TabsTrigger value="overview">概览</TabsTrigger>
              <TabsTrigger value="sponsors">赞助商管理</TabsTrigger>
              <TabsTrigger value="projects">项目管理</TabsTrigger>
              <TabsTrigger value="ad-positions">广告位配置</TabsTrigger>
              <TabsTrigger value="roi-analysis">ROI分析</TabsTrigger>
              <TabsTrigger value="financial">财务管理</TabsTrigger>
              <TabsTrigger value="reports">报表生成</TabsTrigger>
            </TabsList>

            {/* 概览标签页 */}
            <TabsContent value="overview" className="space-y-6">
              {/* 筛选器 */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input type="text" placeholder="搜索赞助商名称..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                    </div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">全部状态</SelectItem>
                        <SelectItem value="active">活跃</SelectItem>
                        <SelectItem value="pending">待审核</SelectItem>
                        <SelectItem value="inactive">未激活</SelectItem>
                        <SelectItem value="suspended">暂停</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={typeFilter} onValueChange={setTypeFilter}>
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">全部类型</SelectItem>
                        <SelectItem value="pharmaceutical">制药</SelectItem>
                        <SelectItem value="biotech">生物技术</SelectItem>
                        <SelectItem value="medical_devices">医疗器械</SelectItem>
                        <SelectItem value="healthcare">医疗保健</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* 赞助商列表 */}
              <Card>
                <CardHeader>
                  <CardTitle>赞助商列表</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>赞助商名称</TableHead>
                        <TableHead>类型</TableHead>
                        <TableHead>等级</TableHead>
                        <TableHead>状态</TableHead>
                        <TableHead>项目数</TableHead>
                        <TableHead>总投资</TableHead>
                        <TableHead>ROI</TableHead>
                        <TableHead>操作</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredSponsors.map(sponsor => <TableRow key={sponsor.id} className="hover:bg-gray-50">
                          <TableCell>
                            <div>
                              <div className="font-medium text-gray-900">{sponsor.name}</div>
                              <div className="text-sm text-gray-500">{sponsor.englishName}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">
                              {sponsor.type === 'pharmaceutical' ? '制药' : sponsor.type === 'biotech' ? '生物技术' : sponsor.type === 'medical_devices' ? '医疗器械' : '医疗保健'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {getLevelBadge(sponsor.level)}
                          </TableCell>
                          <TableCell>
                            {getStatusBadge(sponsor.status)}
                          </TableCell>
                          <TableCell>
                            <div className="text-gray-900">{sponsor.projects}</div>
                          </TableCell>
                          <TableCell>
                            <div className="font-medium text-gray-900">
                              {formatCurrency(sponsor.totalInvestment, 'USD')}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-1">
                              <span className="font-medium text-gray-900">{sponsor.roi}%</span>
                              {sponsor.roi > 100 ? <ArrowUpRight className="w-4 h-4 text-green-500" /> : <ArrowDownRight className="w-4 h-4 text-red-500" />}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Button variant="ghost" size="sm" onClick={() => handleViewSponsor(sponsor)}>
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => handleEditSponsor(sponsor)}>
                                <Edit className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>)}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* 赞助商详情标签页 */}
            <TabsContent value="sponsor-details">
              {selectedSponsor ? <div className="space-y-6">
                  {/* 赞助商基本信息 */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>{selectedSponsor.name} - 详细信息</span>
                        <div className="flex items-center space-x-2">
                          {getStatusBadge(selectedSponsor.status)}
                          {getLevelBadge(selectedSponsor.level)}
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">基本信息</h4>
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-gray-600">英文名称:</span>
                                <span className="text-gray-900">{selectedSponsor.englishName}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">成立年份:</span>
                                <span className="text-gray-900">{selectedSponsor.foundedYear}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">员工数量:</span>
                                <span className="text-gray-900">{selectedSponsor.employees.toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">市值:</span>
                                <span className="text-gray-900">${selectedSponsor.marketCap}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">年收入:</span>
                                <span className="text-gray-900">${selectedSponsor.revenue}</span>
                              </div>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">联系信息</h4>
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2">
                                <User className="w-4 h-4 text-gray-500" />
                                <span className="text-gray-600">联系人:</span>
                                <span className="text-gray-900">{selectedSponsor.contactPerson}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Mail className="w-4 h-4 text-gray-500" />
                                <span className="text-gray-600">邮箱:</span>
                                <span className="text-gray-900">{selectedSponsor.contactEmail}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Phone className="w-4 h-4 text-gray-500" />
                                <span className="text-gray-600">电话:</span>
                                <span className="text-gray-900">{selectedSponsor.contactPhone}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <MapPin className="w-4 h-4 text-gray-500" />
                                <span className="text-gray-600">地址:</span>
                                <span className="text-gray-900">{selectedSponsor.address}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Globe className="w-4 h-4 text-gray-500" />
                                <span className="text-gray-600">网站:</span>
                                <a href={selectedSponsor.website} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                                  {selectedSponsor.website}
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">专业领域</h4>
                            <div className="flex flex-wrap gap-2">
                              {selectedSponsor.specialties.map((specialty, index) => <Badge key={index} variant="outline">
                                  {specialty}
                                </Badge>)}
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">项目统计</h4>
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-gray-600">项目数量:</span>
                                <span className="text-gray-900">{selectedSponsor.projects}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">总投资:</span>
                                <span className="text-gray-900">{formatCurrency(selectedSponsor.totalInvestment, 'USD')}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">ROI:</span>
                                <span className="text-gray-900">{selectedSponsor.roi}%</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">满意度:</span>
                                <div className="flex items-center space-x-1">
                                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                  <span className="text-gray-900">{selectedSponsor.satisfaction}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">合同信息</h4>
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-gray-600">开始日期:</span>
                                <span className="text-gray-900">{selectedSponsor.contractStart || '未签署'}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">结束日期:</span>
                                <span className="text-gray-900">{selectedSponsor.contractEnd || '未签署'}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">上次付款:</span>
                                <span className="text-gray-900">{selectedSponsor.lastPayment || '无'}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">下次付款:</span>
                                <span className="text-gray-900">{selectedSponsor.nextPayment || '无'}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-6">
                        <h4 className="font-medium text-gray-900 mb-2">公司描述</h4>
                        <p className="text-gray-700">{selectedSponsor.description}</p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* 绩效指标 */}
                  <Card>
                    <CardHeader>
                      <CardTitle>绩效指标</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-4 gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600">{selectedSponsor.performance.brandAwareness}%</div>
                          <div className="text-sm text-gray-600">品牌知名度</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600">{selectedSponsor.performance.leadGeneration}%</div>
                          <div className="text-sm text-gray-600">潜在客户获取</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-600">{selectedSponsor.performance.conversionRate}%</div>
                          <div className="text-sm text-gray-600">转化率</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-orange-600">{selectedSponsor.performance.customerAcquisition}%</div>
                          <div className="text-sm text-gray-600">客户获取</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div> : <Card>
                  <CardContent className="p-8 text-center">
                    <Building className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">选择赞助商查看详情</h3>
                    <p className="text-gray-500">请从赞助商列表中选择一个赞助商来查看详细信息</p>
                  </CardContent>
                </Card>}
            </TabsContent>

            {/* 项目管理标签页 */}
            <TabsContent value="projects">
              <SponsorshipProjects projects={projects} sponsors={sponsors} />
            </TabsContent>

            {/* 广告位配置标签页 */}
            <TabsContent value="ad-positions">
              <AdPositionManagement adPositions={adPositions} sponsors={sponsors} />
            </TabsContent>

            {/* ROI分析标签页 */}
            <TabsContent value="roi-analysis">
              <ROIAnalysisDashboard sponsors={sponsors} projects={projects} financialData={financialData} />
            </TabsContent>

            {/* 财务管理标签页 */}
            <TabsContent value="financial">
              <FinancialManagement financialData={financialData} sponsors={sponsors} />
            </TabsContent>

            {/* 报表生成标签页 */}
            <TabsContent value="reports">
              <ReportGeneration sponsors={sponsors} projects={projects} financialData={financialData} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>;
}