// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Select, Badge, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, useToast, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui';
// @ts-ignore;
import { Search, Filter, Download, Eye, Edit, Trash2, Plus, Calendar, Building2, FileText, AlertCircle, CheckCircle, Clock, Pause, Play, Square } from 'lucide-react';

export function AgreementList({
  $w,
  className,
  style
}) {
  const {
    toast
  } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedDateRange, setSelectedDateRange] = useState('all');
  const [agreements, setAgreements] = useState([]);
  const [loading, setLoading] = useState(false);
  const mockAgreements = [{
    id: 'AGR001',
    hospitalName: '北京协和医院',
    hospitalId: 'H001',
    status: 'active',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    type: 'strategic_cooperation',
    value: 5000000,
    responsiblePerson: '张主任',
    contactEmail: 'zhang@xiehe.com',
    contactPhone: '010-12345678',
    description: '战略合作协议，包含AI诊断系统部署和技术支持',
    documents: ['主协议.pdf', '技术附件.pdf', '保密协议.pdf'],
    createdAt: '2024-01-01 10:00:00',
    updatedAt: '2024-01-15 14:30:00'
  }, {
    id: 'AGR002',
    hospitalName: '上海瑞金医院',
    hospitalId: 'H002',
    status: 'pending',
    startDate: '2024-02-01',
    endDate: '2025-01-31',
    type: 'technical_service',
    value: 2000000,
    responsiblePerson: '李院长',
    contactEmail: 'li@ruijin.com',
    contactPhone: '021-87654321',
    description: '技术服务协议，提供AI诊断系统维护和升级服务',
    documents: ['服务协议.pdf'],
    createdAt: '2024-01-10 09:15:00',
    updatedAt: '2024-01-10 09:15:00'
  }, {
    id: 'AGR003',
    hospitalName: '广州中山医院',
    hospitalId: 'H003',
    status: 'suspended',
    startDate: '2023-06-01',
    endDate: '2024-05-31',
    type: 'pilot_project',
    value: 800000,
    responsiblePerson: '王副院长',
    contactEmail: 'wang@zhongshan.com',
    contactPhone: '020-11223344',
    description: '试点项目协议，AI诊断系统试点应用',
    documents: ['试点协议.pdf', '实施方案.pdf'],
    createdAt: '2023-05-15 16:20:00',
    updatedAt: '2024-01-05 11:45:00'
  }, {
    id: 'AGR004',
    hospitalName: '深圳人民医院',
    hospitalId: 'H004',
    status: 'expired',
    startDate: '2023-01-01',
    endDate: '2023-12-31',
    type: 'research_cooperation',
    value: 1500000,
    responsiblePerson: '陈主任',
    contactEmail: 'chen@szhospital.com',
    contactPhone: '0755-55667788',
    description: '科研合作协议，AI诊断算法研发和数据共享',
    documents: ['科研协议.pdf', '数据共享协议.pdf'],
    createdAt: '2022-12-20 13:30:00',
    updatedAt: '2023-12-31 17:00:00'
  }];
  useEffect(() => {
    setAgreements(mockAgreements);
  }, []);
  const getStatusBadge = status => {
    const statusConfig = {
      active: {
        color: 'bg-green-100 text-green-800',
        icon: CheckCircle,
        text: '激活'
      },
      pending: {
        color: 'bg-yellow-100 text-yellow-800',
        icon: Clock,
        text: '待激活'
      },
      suspended: {
        color: 'bg-orange-100 text-orange-800',
        icon: Pause,
        text: '暂停'
      },
      expired: {
        color: 'bg-gray-100 text-gray-800',
        icon: Square,
        text: '已过期'
      },
      terminated: {
        color: 'bg-red-100 text-red-800',
        icon: AlertCircle,
        text: '终止'
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
      strategic_cooperation: {
        color: 'bg-blue-100 text-blue-800',
        text: '战略合作'
      },
      technical_service: {
        color: 'bg-purple-100 text-purple-800',
        text: '技术服务'
      },
      pilot_project: {
        color: 'bg-green-100 text-green-800',
        text: '试点项目'
      },
      research_cooperation: {
        color: 'bg-orange-100 text-orange-800',
        text: '科研合作'
      }
    };
    const config = typeConfig[type] || typeConfig.strategic_cooperation;
    return <Badge className={config.color}>{config.text}</Badge>;
  };
  const formatCurrency = amount => {
    return new Intl.NumberFormat('zh-CN', {
      style: 'currency',
      currency: 'CNY',
      minimumFractionDigits: 0
    }).format(amount);
  };
  const handleViewDetails = agreementId => {
    toast({
      title: "查看详情",
      description: `正在查看协议 ${agreementId} 的详细信息`
    });
  };
  const handleEdit = agreementId => {
    toast({
      title: "编辑协议",
      description: `正在编辑协议 ${agreementId}`
    });
  };
  const handleStatusChange = (agreementId, newStatus) => {
    setAgreements(prev => prev.map(agreement => agreement.id === agreementId ? {
      ...agreement,
      status: newStatus
    } : agreement));
    toast({
      title: "状态更新",
      description: `协议 ${agreementId} 状态已更新`
    });
  };
  const handleDelete = agreementId => {
    setAgreements(prev => prev.filter(agreement => agreement.id !== agreementId));
    toast({
      title: "删除成功",
      description: `协议 ${agreementId} 已删除`,
      variant: "destructive"
    });
  };
  const handleExport = () => {
    toast({
      title: "导出数据",
      description: "正在导出协议数据..."
    });
  };
  const filteredAgreements = agreements.filter(agreement => {
    const matchesSearch = agreement.hospitalName.toLowerCase().includes(searchTerm.toLowerCase()) || agreement.id.toLowerCase().includes(searchTerm.toLowerCase()) || agreement.responsiblePerson.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || agreement.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });
  return <div className={className} style={style}>
      <div className="space-y-6">
        {/* 头部 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">合作协议管理</h1>
            <p className="text-gray-600">管理和监控所有医院合作协议</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={handleExport}>
              <Download className="w-4 h-4 mr-2" />
              导出数据
            </Button>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              新增协议
            </Button>
          </div>
        </div>

        {/* 筛选器 */}
        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input placeholder="搜索医院名称、协议ID或负责人..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10" />
              </div>
              
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="选择状态" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部状态</SelectItem>
                  <SelectItem value="active">激活</SelectItem>
                  <SelectItem value="pending">待激活</SelectItem>
                  <SelectItem value="suspended">暂停</SelectItem>
                  <SelectItem value="expired">已过期</SelectItem>
                  <SelectItem value="terminated">终止</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedDateRange} onValueChange={setSelectedDateRange}>
                <SelectTrigger>
                  <SelectValue placeholder="时间范围" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部时间</SelectItem>
                  <SelectItem value="current">当前有效</SelectItem>
                  <SelectItem value="expiring">即将到期</SelectItem>
                  <SelectItem value="expired">已过期</SelectItem>
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
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">总协议数</p>
                  <p className="text-2xl font-bold text-gray-900">{agreements.length}</p>
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
                  <p className="text-sm text-gray-600">激活协议</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {agreements.filter(a => a.status === 'active').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">待激活</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {agreements.filter(a => a.status === 'pending').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Building2 className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">合作医院</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {new Set(agreements.map(a => a.hospitalId)).size}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 协议列表 */}
        <Card>
          <CardHeader>
            <CardTitle>协议列表</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>协议ID</TableHead>
                  <TableHead>医院名称</TableHead>
                  <TableHead>协议类型</TableHead>
                  <TableHead>合作金额</TableHead>
                  <TableHead>负责人</TableHead>
                  <TableHead>开始日期</TableHead>
                  <TableHead>结束日期</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead>操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAgreements.map(agreement => <TableRow key={agreement.id}>
                    <TableCell>
                      <div className="font-medium text-gray-900">{agreement.id}</div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium text-gray-900">{agreement.hospitalName}</div>
                        <div className="text-sm text-gray-500">{agreement.contactEmail}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getTypeBadge(agreement.type)}
                    </TableCell>
                    <TableCell>
                      <div className="font-medium text-gray-900">
                        {formatCurrency(agreement.value)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium text-gray-900">{agreement.responsiblePerson}</div>
                        <div className="text-sm text-gray-500">{agreement.contactPhone}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-gray-900">{agreement.startDate}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-gray-900">{agreement.endDate}</div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(agreement.status)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => handleViewDetails(agreement.id)}>
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(agreement.id)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Select onValueChange={value => handleStatusChange(agreement.id, value)}>
                          <SelectTrigger className="w-24 h-8">
                            <SelectValue placeholder="状态" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">激活</SelectItem>
                            <SelectItem value="suspended">暂停</SelectItem>
                            <SelectItem value="terminated">终止</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(agreement.id)}>
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