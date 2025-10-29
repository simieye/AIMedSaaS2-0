// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Select, Badge, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, useToast, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui';
// @ts-ignore;
import { Search, Filter, Download, Eye, Edit, Plus, FileText, Calendar, CheckCircle, Clock, AlertCircle, User, DollarSign } from 'lucide-react';

export function ContractManagement({
  $w,
  className,
  style
}) {
  const {
    toast
  } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(false);
  const mockContracts = [{
    id: 'CON001',
    name: '辉瑞制药2024年度赞助合同',
    sponsorId: 'SPN001',
    sponsorName: '辉瑞制药有限公司',
    projectId: 'PRJ001',
    projectName: '心血管药物推广活动',
    type: 'sponsorship',
    status: 'active',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    value: 5000000,
    currency: 'CNY',
    responsiblePerson: '张经理',
    contactEmail: 'zhang@pfizer.com',
    contactPhone: '010-12345678',
    description: '年度赞助合同，包含心血管药物推广活动',
    documents: ['主合同.pdf', '附件1.pdf', '附件2.pdf'],
    paymentTerms: 'NET30',
    renewalTerms: '自动续约',
    createdAt: '2024-01-01 10:00:00',
    updatedAt: '2024-01-15 14:30:00'
  }, {
    id: 'CON002',
    name: '阿斯利康技术服务合同',
    sponsorId: 'SPN002',
    sponsorName: '阿斯利康投资（中国）有限公司',
    projectId: 'PRJ002',
    projectName: '糖尿病管理解决方案',
    type: 'service',
    status: 'pending',
    startDate: '2024-02-01',
    endDate: '2025-01-31',
    value: 3500000,
    currency: 'CNY',
    responsiblePerson: '李总监',
    contactEmail: 'li@astrazeneca.com',
    contactPhone: '021-87654321',
    description: '技术服务合同，提供糖尿病管理解决方案',
    documents: ['服务合同.pdf'],
    paymentTerms: 'NET45',
    renewalTerms: '协商续约',
    createdAt: '2024-01-10 09:15:00',
    updatedAt: '2024-01-10 09:15:00'
  }, {
    id: 'CON003',
    name: '罗氏诊断设备采购合同',
    sponsorId: 'SPN003',
    sponsorName: '罗氏诊断产品（上海）有限公司',
    projectId: 'PRJ003',
    projectName: '诊断设备品牌推广',
    type: 'procurement',
    status: 'expired',
    startDate: '2023-01-01',
    endDate: '2023-12-31',
    value: 2000000,
    currency: 'CNY',
    responsiblePerson: '王经理',
    contactEmail: 'wang@roche.com',
    contactPhone: '021-11223344',
    description: '诊断设备采购合同',
    documents: ['采购合同.pdf', '技术规格.pdf'],
    paymentTerms: 'NET60',
    renewalTerms: '不续约',
    createdAt: '2022-12-20 13:30:00',
    updatedAt: '2023-12-31 17:00:00'
  }];
  useEffect(() => {
    setContracts(mockContracts);
  }, []);
  const getStatusBadge = status => {
    const statusConfig = {
      active: {
        color: 'bg-green-100 text-green-800',
        icon: CheckCircle,
        text: '生效中'
      },
      pending: {
        color: 'bg-yellow-100 text-yellow-800',
        icon: Clock,
        text: '待签署'
      },
      expired: {
        color: 'bg-gray-100 text-gray-800',
        icon: AlertCircle,
        text: '已过期'
      },
      terminated: {
        color: 'bg-red-100 text-red-800',
        icon: AlertCircle,
        text: '已终止'
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
      sponsorship: {
        color: 'bg-blue-100 text-blue-800',
        text: '赞助合同'
      },
      service: {
        color: 'bg-purple-100 text-purple-800',
        text: '服务合同'
      },
      procurement: {
        color: 'bg-green-100 text-green-800',
        text: '采购合同'
      },
      nda: {
        color: 'bg-orange-100 text-orange-800',
        text: '保密协议'
      }
    };
    const config = typeConfig[type] || typeConfig.sponsorship;
    return <Badge className={config.color}>{config.text}</Badge>;
  };
  const formatCurrency = amount => {
    return new Intl.NumberFormat('zh-CN', {
      style: 'currency',
      currency: 'CNY',
      minimumFractionDigits: 0
    }).format(amount);
  };
  const handleViewDetails = contractId => {
    toast({
      title: "查看详情",
      description: `正在查看合同 ${contractId} 的详细信息`
    });
  };
  const handleEdit = contractId => {
    toast({
      title: "编辑合同",
      description: `正在编辑合同 ${contractId}`
    });
  };
  const handleStatusChange = (contractId, newStatus) => {
    setContracts(prev => prev.map(contract => contract.id === contractId ? {
      ...contract,
      status: newStatus
    } : contract));
    toast({
      title: "状态更新",
      description: `合同 ${contractId} 状态已更新为 ${newStatus}`
    });
  };
  const handleExport = () => {
    toast({
      title: "导出数据",
      description: "正在导出合同数据..."
    });
  };
  const filteredContracts = contracts.filter(contract => {
    const matchesSearch = contract.name.toLowerCase().includes(searchTerm.toLowerCase()) || contract.sponsorName.toLowerCase().includes(searchTerm.toLowerCase()) || contract.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || contract.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });
  const totalValue = contracts.reduce((sum, contract) => sum + contract.value, 0);
  const activeContracts = contracts.filter(c => c.status === 'active').length;
  const pendingContracts = contracts.filter(c => c.status === 'pending').length;
  return <div className={className} style={style}>
      <div className="space-y-6">
        {/* 头部 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">合同管理</h1>
            <p className="text-gray-600">管理和监控所有赞助合同</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={handleExport}>
              <Download className="w-4 h-4 mr-2" />
              导出数据
            </Button>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              新建合同
            </Button>
          </div>
        </div>

        {/* 筛选器 */}
        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input placeholder="搜索合同名称、赞助商或ID..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10" />
              </div>
              
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="选择状态" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部状态</SelectItem>
                  <SelectItem value="active">生效中</SelectItem>
                  <SelectItem value="pending">待签署</SelectItem>
                  <SelectItem value="expired">已过期</SelectItem>
                  <SelectItem value="terminated">已终止</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex items-center space-x-2">
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  高级筛选
                </Button>
              </div>
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
                  <p className="text-sm text-gray-600">总合同数</p>
                  <p className="text-2xl font-bold text-gray-900">{contracts.length}</p>
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
                  <p className="text-sm text-gray-600">生效中</p>
                  <p className="text-2xl font-bold text-gray-900">{activeContracts}</p>
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
                  <p className="text-sm text-gray-600">待签署</p>
                  <p className="text-2xl font-bold text-gray-900">{pendingContracts}</p>
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
                  <p className="text-sm text-gray-600">总价值</p>
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalValue)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 合同列表 */}
        <Card>
          <CardHeader>
            <CardTitle>合同列表</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>合同ID</TableHead>
                  <TableHead>合同名称</TableHead>
                  <TableHead>赞助商</TableHead>
                  <TableHead>项目</TableHead>
                  <TableHead>类型</TableHead>
                  <TableHead>合同金额</TableHead>
                  <TableHead>开始日期</TableHead>
                  <TableHead>结束日期</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead>操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredContracts.map(contract => <TableRow key={contract.id}>
                    <TableCell>
                      <div className="font-medium text-gray-900">{contract.id}</div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium text-gray-900">{contract.name}</div>
                        <div className="text-sm text-gray-500">{contract.contactEmail}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium text-gray-900">{contract.sponsorName}</div>
                        <div className="text-sm text-gray-500">{contract.contactPhone}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-gray-900">{contract.projectName}</div>
                    </TableCell>
                    <TableCell>
                      {getTypeBadge(contract.type)}
                    </TableCell>
                    <TableCell>
                      <div className="font-medium text-gray-900">
                        {formatCurrency(contract.value)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-gray-900">{contract.startDate}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-gray-900">{contract.endDate}</div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(contract.status)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => handleViewDetails(contract.id)}>
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(contract.id)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Select onValueChange={value => handleStatusChange(contract.id, value)}>
                          <SelectTrigger className="w-20 h-8">
                            <SelectValue placeholder="状态" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">生效</SelectItem>
                            <SelectItem value="pending">待签署</SelectItem>
                            <SelectItem value="expired">过期</SelectItem>
                            <SelectItem value="terminated">终止</SelectItem>
                          </SelectContent>
                        </Select>
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