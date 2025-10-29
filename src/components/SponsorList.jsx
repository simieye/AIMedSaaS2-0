// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Select, Badge, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, useToast, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui';
// @ts-ignore;
import { Search, Filter, Download, Eye, Edit, Trash2, Plus, Building2, Phone, Mail, Calendar, TrendingUp, Users, DollarSign } from 'lucide-react';

export function SponsorList({
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
  const [sponsors, setSponsors] = useState([]);
  const [loading, setLoading] = useState(false);
  const mockSponsors = [{
    id: 'SPN001',
    name: '辉瑞制药有限公司',
    englishName: 'Pfizer Inc.',
    type: 'pharmaceutical',
    status: 'active',
    contactPerson: '张经理',
    contactPhone: '010-12345678',
    contactEmail: 'zhang@pfizer.com',
    address: '北京市朝阳区建国门外大街1号',
    website: 'https://www.pfizer.com.cn',
    establishedYear: 1989,
    employees: 15000,
    revenue: '500亿',
    description: '全球领先的生物制药公司，专注于创新药物的研发和生产',
    projects: 8,
    totalInvestment: 25000000,
    activeProjects: 5,
    createdAt: '2023-01-15',
    lastContact: '2024-01-10'
  }, {
    id: 'SPN002',
    name: '阿斯利康投资（中国）有限公司',
    englishName: 'AstraZeneca',
    type: 'pharmaceutical',
    status: 'active',
    contactPerson: '李总监',
    contactPhone: '021-87654321',
    contactEmail: 'li@astrazeneca.com',
    address: '上海市浦东新区张江高科技园区',
    website: 'https://www.astrazeneca.com.cn',
    establishedYear: 1993,
    employees: 12000,
    revenue: '420亿',
    description: '全球性生物制药企业，专注于肿瘤、心血管等领域的创新药物',
    projects: 6,
    totalInvestment: 18000000,
    activeProjects: 4,
    createdAt: '2023-03-20',
    lastContact: '2024-01-08'
  }, {
    id: 'SPN003',
    name: '罗氏诊断产品（上海）有限公司',
    englishName: 'Roche Diagnostics',
    type: 'diagnostics',
    status: 'pending',
    contactPerson: '王经理',
    contactPhone: '021-11223344',
    contactEmail: 'wang@roche.com',
    address: '上海市浦东新区张江路',
    website: 'https://www.diagnostics.roche.com.cn',
    establishedYear: 2000,
    employees: 8000,
    revenue: '280亿',
    description: '全球领先的诊断解决方案提供商，专注于体外诊断领域',
    projects: 3,
    totalInvestment: 8000000,
    activeProjects: 2,
    createdAt: '2023-06-10',
    lastContact: '2023-12-20'
  }, {
    id: 'SPN004',
    name: '强生（中国）投资有限公司',
    englishName: 'Johnson & Johnson',
    type: 'pharmaceutical',
    status: 'suspended',
    contactPerson: '陈总监',
    contactPhone: '010-55667788',
    contactEmail: 'chen@jnj.com',
    address: '北京市朝阳区建国路77号',
    website: 'https://www.jnj.com.cn',
    establishedYear: 1985,
    employees: 20000,
    revenue: '650亿',
    description: '全球最大的医疗保健公司之一，涵盖制药、医疗器械等领域',
    projects: 10,
    totalInvestment: 32000000,
    activeProjects: 0,
    createdAt: '2022-11-05',
    lastContact: '2023-10-15'
  }];
  useEffect(() => {
    setSponsors(mockSponsors);
  }, []);
  const getStatusBadge = status => {
    const statusConfig = {
      active: {
        color: 'bg-green-100 text-green-800',
        text: '活跃'
      },
      pending: {
        color: 'bg-yellow-100 text-yellow-800',
        text: '待审核'
      },
      suspended: {
        color: 'bg-red-100 text-red-800',
        text: '暂停'
      },
      inactive: {
        color: 'bg-gray-100 text-gray-800',
        text: '未激活'
      }
    };
    const config = statusConfig[status] || statusConfig.inactive;
    return <Badge className={config.color}>{config.text}</Badge>;
  };
  const getTypeBadge = type => {
    const typeConfig = {
      pharmaceutical: {
        color: 'bg-blue-100 text-blue-800',
        text: '制药企业'
      },
      diagnostics: {
        color: 'bg-purple-100 text-purple-800',
        text: '诊断企业'
      },
      medical_device: {
        color: 'bg-green-100 text-green-800',
        text: '医疗器械'
      },
      biotech: {
        color: 'bg-orange-100 text-orange-800',
        text: '生物技术'
      }
    };
    const config = typeConfig[type] || typeConfig.pharmaceutical;
    return <Badge className={config.color}>{config.text}</Badge>;
  };
  const formatCurrency = amount => {
    return new Intl.NumberFormat('zh-CN', {
      style: 'currency',
      currency: 'CNY',
      minimumFractionDigits: 0
    }).format(amount);
  };
  const handleViewDetails = sponsorId => {
    toast({
      title: "查看详情",
      description: `正在查看赞助商 ${sponsorId} 的详细信息`
    });
  };
  const handleEdit = sponsorId => {
    toast({
      title: "编辑赞助商",
      description: `正在编辑赞助商 ${sponsorId}`
    });
  };
  const handleDelete = sponsorId => {
    setSponsors(prev => prev.filter(sponsor => sponsor.id !== sponsorId));
    toast({
      title: "删除成功",
      description: `赞助商 ${sponsorId} 已删除`,
      variant: "destructive"
    });
  };
  const handleExport = () => {
    toast({
      title: "导出数据",
      description: "正在导出赞助商数据..."
    });
  };
  const filteredSponsors = sponsors.filter(sponsor => {
    const matchesSearch = sponsor.name.toLowerCase().includes(searchTerm.toLowerCase()) || sponsor.englishName.toLowerCase().includes(searchTerm.toLowerCase()) || sponsor.contactPerson.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || sponsor.status === selectedStatus;
    const matchesType = selectedType === 'all' || sponsor.type === selectedType;
    return matchesSearch && matchesStatus && matchesType;
  });
  return <div className={className} style={style}>
      <div className="space-y-6">
        {/* 头部 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">赞助商管理</h1>
            <p className="text-gray-600">管理和监控所有药企赞助商信息</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={handleExport}>
              <Download className="w-4 h-4 mr-2" />
              导出数据
            </Button>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              新增赞助商
            </Button>
          </div>
        </div>

        {/* 筛选器 */}
        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input placeholder="搜索赞助商名称、英文名或联系人..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10" />
              </div>
              
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="选择状态" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部状态</SelectItem>
                  <SelectItem value="active">活跃</SelectItem>
                  <SelectItem value="pending">待审核</SelectItem>
                  <SelectItem value="suspended">暂停</SelectItem>
                  <SelectItem value="inactive">未激活</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="选择类型" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部类型</SelectItem>
                  <SelectItem value="pharmaceutical">制药企业</SelectItem>
                  <SelectItem value="diagnostics">诊断企业</SelectItem>
                  <SelectItem value="medical_device">医疗器械</SelectItem>
                  <SelectItem value="biotech">生物技术</SelectItem>
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
                  <Building2 className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">总赞助商</p>
                  <p className="text-2xl font-bold text-gray-900">{sponsors.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">活跃赞助商</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {sponsors.filter(s => s.status === 'active').length}
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
                  <p className="text-sm text-gray-600">总投资额</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatCurrency(sponsors.reduce((total, s) => total + s.totalInvestment, 0))}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Users className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">活跃项目</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {sponsors.reduce((total, s) => total + s.activeProjects, 0)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

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
                  <TableHead>联系人</TableHead>
                  <TableHead>项目数</TableHead>
                  <TableHead>总投资额</TableHead>
                  <TableHead>活跃项目</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead>最后联系</TableHead>
                  <TableHead>操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSponsors.map(sponsor => <TableRow key={sponsor.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium text-gray-900">{sponsor.name}</div>
                        <div className="text-sm text-gray-500">{sponsor.englishName}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getTypeBadge(sponsor.type)}
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium text-gray-900">{sponsor.contactPerson}</div>
                        <div className="text-sm text-gray-500">{sponsor.contactPhone}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium text-gray-900">{sponsor.projects}</div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium text-gray-900">
                        {formatCurrency(sponsor.totalInvestment)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium text-gray-900">{sponsor.activeProjects}</div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(sponsor.status)}
                    </TableCell>
                    <TableCell>
                      <div className="text-gray-900">{sponsor.lastContact}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => handleViewDetails(sponsor.id)}>
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(sponsor.id)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(sponsor.id)}>
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