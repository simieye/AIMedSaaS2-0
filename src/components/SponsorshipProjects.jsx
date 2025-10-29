// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Select, Badge, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, useToast, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui';
// @ts-ignore;
import { Search, Filter, Plus, Eye, Edit, Trash2, Calendar, DollarSign, Target, Users, TrendingUp, Clock, CheckCircle, AlertCircle, Play, Pause } from 'lucide-react';

export function SponsorshipProjects({
  $w,
  className,
  style
}) {
  const {
    toast
  } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const mockProjects = [{
    id: 'PRJ001',
    name: '心血管药物推广活动',
    sponsorId: 'SPN001',
    sponsorName: '辉瑞制药有限公司',
    type: 'drug_promotion',
    status: 'active',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    budget: 5000000,
    actualSpend: 2800000,
    targetDepartments: ['cardiology', 'internal_medicine'],
    targetAudience: ['doctors', 'patients'],
    adPositions: ['homepage_banner', 'sidebar_ad', 'article_banner'],
    displayRules: {
      frequency: '3_times_per_day',
      duration: '30_seconds',
      targetRegions: ['beijing', 'shanghai', 'guangzhou'],
      targetSpecialties: ['cardiology', 'internal_medicine']
    },
    performance: {
      impressions: 1250000,
      clicks: 45000,
      conversions: 1200,
      ctr: 3.6,
      conversionRate: 2.67,
      roi: 2.8
    },
    createdAt: '2023-12-15',
    lastModified: '2024-01-10'
  }, {
    id: 'PRJ002',
    name: '糖尿病管理解决方案',
    sponsorId: 'SPN002',
    sponsorName: '阿斯利康投资（中国）有限公司',
    type: 'solution_promotion',
    status: 'active',
    startDate: '2024-02-01',
    endDate: '2024-11-30',
    budget: 3500000,
    actualSpend: 1800000,
    targetDepartments: ['endocrinology', 'internal_medicine'],
    targetAudience: ['doctors', 'hospitals'],
    adPositions: ['homepage_banner', 'featured_content'],
    displayRules: {
      frequency: '2_times_per_day',
      duration: '45_seconds',
      targetRegions: ['shanghai', 'beijing', 'shenzhen'],
      targetSpecialties: ['endocrinology', 'internal_medicine']
    },
    performance: {
      impressions: 890000,
      clicks: 28000,
      conversions: 890,
      ctr: 3.15,
      conversionRate: 3.18,
      roi: 3.2
    },
    createdAt: '2024-01-10',
    lastModified: '2024-01-12'
  }, {
    id: 'PRJ003',
    name: '诊断设备品牌推广',
    sponsorId: 'SPN003',
    sponsorName: '罗氏诊断产品（上海）有限公司',
    type: 'brand_promotion',
    status: 'pending',
    startDate: '2024-03-01',
    endDate: '2024-09-30',
    budget: 2000000,
    actualSpend: 0,
    targetDepartments: ['laboratory', 'pathology'],
    targetAudience: ['laboratory_staff', 'doctors'],
    adPositions: ['sidebar_ad', 'content_sponsorship'],
    displayRules: {
      frequency: '4_times_per_day',
      duration: '25_seconds',
      targetRegions: ['shanghai', 'guangzhou', 'chengdu'],
      targetSpecialties: ['laboratory', 'pathology']
    },
    performance: {
      impressions: 0,
      clicks: 0,
      conversions: 0,
      ctr: 0,
      conversionRate: 0,
      roi: 0
    },
    createdAt: '2024-01-20',
    lastModified: '2024-01-20'
  }, {
    id: 'PRJ004',
    name: '肿瘤治疗学术推广',
    sponsorId: 'SPN004',
    sponsorName: '强生（中国）投资有限公司',
    type: 'academic_promotion',
    status: 'suspended',
    startDate: '2023-09-01',
    endDate: '2024-02-29',
    budget: 4500000,
    actualSpend: 3200000,
    targetDepartments: ['oncology', 'radiology'],
    targetAudience: ['doctors', 'researchers'],
    adPositions: ['homepage_banner', 'webinar_sponsorship'],
    displayRules: {
      frequency: '2_times_per_day',
      duration: '60_seconds',
      targetRegions: ['beijing', 'shanghai', 'guangzhou', 'shenzhen'],
      targetSpecialties: ['oncology', 'radiology']
    },
    performance: {
      impressions: 680000,
      clicks: 18000,
      conversions: 450,
      ctr: 2.65,
      conversionRate: 2.5,
      roi: 1.8
    },
    createdAt: '2023-08-15',
    lastModified: '2024-01-05'
  }];
  useEffect(() => {
    setProjects(mockProjects);
  }, []);
  const getStatusBadge = status => {
    const statusConfig = {
      active: {
        color: 'bg-green-100 text-green-800',
        icon: Play,
        text: '进行中'
      },
      pending: {
        color: 'bg-yellow-100 text-yellow-800',
        icon: Clock,
        text: '待启动'
      },
      suspended: {
        color: 'bg-red-100 text-red-800',
        icon: Pause,
        text: '已暂停'
      },
      completed: {
        color: 'bg-gray-100 text-gray-800',
        icon: CheckCircle,
        text: '已完成'
      }
    };
    const config = statusConfig[status] || statusConfig.pending;
    const Icon = config.icon;
    return <Badge className={config.color}>
        <Icon className="w-3 h-3 mr-1" />
        {config.text}
      </Badge>;
  };
  const getTypeBadge = type => {
    const typeConfig = {
      drug_promotion: {
        color: 'bg-blue-100 text-blue-800',
        text: '药品推广'
      },
      solution_promotion: {
        color: 'bg-purple-100 text-purple-800',
        text: '解决方案推广'
      },
      brand_promotion: {
        color: 'bg-green-100 text-green-800',
        text: '品牌推广'
      },
      academic_promotion: {
        color: 'bg-orange-100 text-orange-800',
        text: '学术推广'
      }
    };
    const config = typeConfig[type] || typeConfig.drug_promotion;
    return <Badge className={config.color}>{config.text}</Badge>;
  };
  const formatCurrency = amount => {
    return new Intl.NumberFormat('zh-CN', {
      style: 'currency',
      currency: 'CNY',
      minimumFractionDigits: 0
    }).format(amount);
  };
  const handleViewDetails = projectId => {
    toast({
      title: "查看详情",
      description: `正在查看项目 ${projectId} 的详细信息`
    });
  };
  const handleEdit = projectId => {
    toast({
      title: "编辑项目",
      description: `正在编辑项目 ${projectId}`
    });
  };
  const handleStatusChange = (projectId, newStatus) => {
    setProjects(prev => prev.map(project => project.id === projectId ? {
      ...project,
      status: newStatus
    } : project));
    toast({
      title: "状态更新",
      description: `项目 ${projectId} 状态已更新`
    });
  };
  const handleDelete = projectId => {
    setProjects(prev => prev.filter(project => project.id !== projectId));
    toast({
      title: "删除成功",
      description: `项目 ${projectId} 已删除`,
      variant: "destructive"
    });
  };
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) || project.sponsorName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || project.status === selectedStatus;
    const matchesType = selectedType === 'all' || project.type === selectedType;
    return matchesSearch && matchesStatus && matchesType;
  });
  return <div className={className} style={style}>
      <div className="space-y-6">
        {/* 头部 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">赞助项目管理</h1>
            <p className="text-gray-600">创建和管理药企赞助活动，设置展示规则和效果追踪</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              创建项目
            </Button>
          </div>
        </div>

        {/* 筛选器 */}
        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input placeholder="搜索项目名称或赞助商..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10" />
              </div>
              
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="选择状态" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部状态</SelectItem>
                  <SelectItem value="active">进行中</SelectItem>
                  <SelectItem value="pending">待启动</SelectItem>
                  <SelectItem value="suspended">已暂停</SelectItem>
                  <SelectItem value="completed">已完成</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="选择类型" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部类型</SelectItem>
                  <SelectItem value="drug_promotion">药品推广</SelectItem>
                  <SelectItem value="solution_promotion">解决方案推广</SelectItem>
                  <SelectItem value="brand_promotion">品牌推广</SelectItem>
                  <SelectItem value="academic_promotion">学术推广</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* 统计卡片 */}
        <div className="grid grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Target className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">总项目数</p>
                  <p className="text-2xl font-bold text-gray-900">{projects.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Play className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">进行中</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {projects.filter(p => p.status === 'active').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <DollarSign className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">总预算</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatCurrency(projects.reduce((total, p) => total + p.budget, 0))}
                  </p>
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
                  <p className="text-sm text-gray-600">平均ROI</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {projects.filter(p => p.performance.roi > 0).length > 0 ? (projects.filter(p => p.performance.roi > 0).reduce((sum, p) => sum + p.performance.roi, 0) / projects.filter(p => p.performance.roi > 0).length).toFixed(1) : '0'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 项目列表 */}
        <Card>
          <CardHeader>
            <CardTitle>赞助项目列表</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>项目名称</TableHead>
                  <TableHead>赞助商</TableHead>
                  <TableHead>类型</TableHead>
                  <TableHead>预算/实际</TableHead>
                  <TableHead>展示次数</TableHead>
                  <TableHead>点击率</TableHead>
                  <TableHead>ROI</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead>操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProjects.map(project => <TableRow key={project.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium text-gray-900">{project.name}</div>
                        <div className="text-sm text-gray-500">{project.startDate} - {project.endDate}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-gray-900">{project.sponsorName}</div>
                    </TableCell>
                    <TableCell>
                      {getTypeBadge(project.type)}
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium text-gray-900">{formatCurrency(project.budget)}</div>
                        <div className="text-sm text-gray-500">{formatCurrency(project.actualSpend)}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium text-gray-900">{project.performance.impressions.toLocaleString()}</div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium text-gray-900">{project.performance.ctr}%</div>
                    </TableCell>
                    <TableCell>
                      <div className={`font-medium ${project.performance.roi >= 2 ? 'text-green-600' : project.performance.roi >= 1 ? 'text-yellow-600' : 'text-red-600'}`}>
                        {project.performance.roi}
                      </div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(project.status)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => handleViewDetails(project.id)}>
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(project.id)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Select onValueChange={value => handleStatusChange(project.id, value)}>
                          <SelectTrigger className="w-20 h-8">
                            <SelectValue placeholder="状态" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">启动</SelectItem>
                            <SelectItem value="suspended">暂停</SelectItem>
                            <SelectItem value="completed">完成</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(project.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>)}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>;
}