// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Select, Badge, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, useToast, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui';
// @ts-ignore;
import { Search, Filter, Download, Eye, Edit, CreditCard, Calendar, CheckCircle, Clock, AlertCircle, DollarSign, Receipt, TrendingUp, Plus } from 'lucide-react';

export function PaymentTracking({
  $w,
  className,
  style
}) {
  const {
    toast
  } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const mockPayments = [{
    id: 'PAY001',
    invoiceId: 'INV202401001',
    contractId: 'CON001',
    sponsorId: 'SPN001',
    sponsorName: '辉瑞制药有限公司',
    projectName: '心血管药物推广活动',
    type: 'sponsorship_fee',
    status: 'paid',
    amount: 2500000,
    currency: 'CNY',
    dueDate: '2024-01-31',
    paidDate: '2024-01-28',
    paymentMethod: 'bank_transfer',
    transactionId: 'TXN20240128001',
    description: '第一季度赞助费用',
    paymentTerms: 'NET30',
    lateFee: 0,
    discount: 0,
    createdAt: '2024-01-01 10:00:00',
    updatedAt: '2024-01-28 14:30:00'
  }, {
    id: 'PAY002',
    invoiceId: 'INV202401002',
    contractId: 'CON002',
    sponsorId: 'SPN002',
    sponsorName: '阿斯利康投资（中国）有限公司',
    projectName: '糖尿病管理解决方案',
    type: 'service_fee',
    status: 'pending',
    amount: 1750000,
    currency: 'CNY',
    dueDate: '2024-02-15',
    paidDate: null,
    paymentMethod: null,
    transactionId: null,
    description: '技术服务费用',
    paymentTerms: 'NET30',
    lateFee: 0,
    discount: 50000,
    createdAt: '2024-01-15 09:00:00',
    updatedAt: '2024-01-15 09:00:00'
  }, {
    id: 'PAY003',
    invoiceId: 'INV202312001',
    contractId: 'CON003',
    sponsorId: 'SPN003',
    sponsorName: '罗氏诊断产品（上海）有限公司',
    projectName: '诊断设备品牌推广',
    type: 'setup_fee',
    status: 'overdue',
    amount: 500000,
    currency: 'CNY',
    dueDate: '2023-12-31',
    paidDate: null,
    paymentMethod: null,
    transactionId: null,
    description: '项目设置费用',
    paymentTerms: 'NET30',
    lateFee: 25000,
    discount: 0,
    createdAt: '2023-12-01 11:00:00',
    updatedAt: '2023-12-01 11:00:00'
  }, {
    id: 'PAY004',
    invoiceId: 'INV202401003',
    contractId: 'CON001',
    sponsorId: 'SPN001',
    sponsorName: '辉瑞制药有限公司',
    projectName: '心血管药物推广活动',
    type: 'milestone_payment',
    status: 'processing',
    amount: 1500000,
    currency: 'CNY',
    dueDate: '2024-02-15',
    paidDate: null,
    paymentMethod: 'bank_transfer',
    transactionId: null,
    description: '里程碑付款 - 系统部署完成',
    paymentTerms: 'NET30',
    lateFee: 0,
    discount: 0,
    createdAt: '2024-01-20 16:00:00',
    updatedAt: '2024-01-20 16:00:00'
  }];
  useEffect(() => {
    setPayments(mockPayments);
  }, []);
  const getStatusBadge = status => {
    const statusConfig = {
      paid: {
        color: 'bg-green-100 text-green-800',
        icon: CheckCircle,
        text: '已付款'
      },
      pending: {
        color: 'bg-yellow-100 text-yellow-800',
        icon: Clock,
        text: '待付款'
      },
      overdue: {
        color: 'bg-red-100 text-red-800',
        icon: AlertCircle,
        text: '逾期'
      },
      processing: {
        color: 'bg-blue-100 text-blue-800',
        icon: Clock,
        text: '处理中'
      },
      cancelled: {
        color: 'bg-gray-100 text-gray-800',
        icon: AlertCircle,
        text: '已取消'
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
      sponsorship_fee: {
        color: 'bg-blue-100 text-blue-800',
        text: '赞助费'
      },
      service_fee: {
        color: 'bg-purple-100 text-purple-800',
        text: '服务费'
      },
      setup_fee: {
        color: 'bg-green-100 text-green-800',
        text: '设置费'
      },
      milestone_payment: {
        color: 'bg-orange-100 text-orange-800',
        text: '里程碑付款'
      }
    };
    const config = typeConfig[type] || typeConfig.sponsorship_fee;
    return <Badge className={config.color}>{config.text}</Badge>;
  };
  const formatCurrency = amount => {
    return new Intl.NumberFormat('zh-CN', {
      style: 'currency',
      currency: 'CNY',
      minimumFractionDigits: 0
    }).format(amount);
  };
  const handleViewDetails = paymentId => {
    toast({
      title: "查看详情",
      description: `正在查看付款 ${paymentId} 的详细信息`
    });
  };
  const handleEdit = paymentId => {
    toast({
      title: "编辑付款",
      description: `正在编辑付款 ${paymentId}`
    });
  };
  const handleSendReminder = paymentId => {
    toast({
      title: "发送提醒",
      description: `付款提醒已发送给客户`
    });
  };
  const handleMarkAsPaid = paymentId => {
    setPayments(prev => prev.map(payment => payment.id === paymentId ? {
      ...payment,
      status: 'paid',
      paidDate: new Date().toISOString().split('T')[0]
    } : payment));
    toast({
      title: "标记已付款",
      description: `付款 ${paymentId} 已标记为已付款`
    });
  };
  const handleExport = () => {
    toast({
      title: "导出数据",
      description: "正在导出付款数据..."
    });
  };
  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.invoiceId.toLowerCase().includes(searchTerm.toLowerCase()) || payment.sponsorName.toLowerCase().includes(searchTerm.toLowerCase()) || payment.projectName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || payment.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });
  const totalAmount = payments.reduce((sum, payment) => sum + payment.amount, 0);
  const paidAmount = payments.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0);
  const pendingAmount = payments.filter(p => p.status === 'pending' || p.status === 'overdue').reduce((sum, p) => sum + p.amount, 0);
  const overdueAmount = payments.filter(p => p.status === 'overdue').reduce((sum, p) => sum + p.amount + p.lateFee, 0);
  return <div className={className} style={style}>
      <div className="space-y-6">
        {/* 头部 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">付款跟踪</h1>
            <p className="text-gray-600">管理和监控所有付款状态和财务流程</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={handleExport}>
              <Download className="w-4 h-4 mr-2" />
              导出报表
            </Button>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              创建付款
            </Button>
          </div>
        </div>

        {/* 筛选器 */}
        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input placeholder="搜索发票号、赞助商或项目..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10" />
              </div>
              
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="选择状态" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部状态</SelectItem>
                  <SelectItem value="paid">已付款</SelectItem>
                  <SelectItem value="pending">待付款</SelectItem>
                  <SelectItem value="overdue">逾期</SelectItem>
                  <SelectItem value="processing">处理中</SelectItem>
                  <SelectItem value="cancelled">已取消</SelectItem>
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
                  <DollarSign className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">总金额</p>
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalAmount)}</p>
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
                  <p className="text-sm text-gray-600">已收款</p>
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(paidAmount)}</p>
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
                  <p className="text-sm text-gray-600">待收款</p>
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(pendingAmount)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">逾期金额</p>
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(overdueAmount)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 付款列表 */}
        <Card>
          <CardHeader>
            <CardTitle>付款列表</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>发票号</TableHead>
                  <TableHead>赞助商</TableHead>
                  <TableHead>项目</TableHead>
                  <TableHead>类型</TableHead>
                  <TableHead>金额</TableHead>
                  <TableHead>到期日期</TableHead>
                  <TableHead>付款日期</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead>操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPayments.map(payment => <TableRow key={payment.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium text-gray-900">{payment.invoiceId}</div>
                        {payment.transactionId && <div className="text-sm text-gray-500">{payment.transactionId}</div>}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-gray-900">{payment.sponsorName}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-gray-900">{payment.projectName}</div>
                    </TableCell>
                    <TableCell>
                      {getTypeBadge(payment.type)}
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium text-gray-900">{formatCurrency(payment.amount)}</div>
                        {payment.lateFee > 0 && <div className="text-sm text-red-500">滞纳金: {formatCurrency(payment.lateFee)}</div>}
                        {payment.discount > 0 && <div className="text-sm text-green-500">折扣: -{formatCurrency(payment.discount)}</div>}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-gray-900">{payment.dueDate}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-gray-900">{payment.paidDate || '-'}</div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(payment.status)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => handleViewDetails(payment.id)}>
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(payment.id)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        {(payment.status === 'pending' || payment.status === 'overdue') && <Button variant="ghost" size="sm" onClick={() => handleSendReminder(payment.id)}>
                            <Receipt className="w-4 h-4" />
                          </Button>}
                        {payment.status === 'pending' && <Button variant="ghost" size="sm" onClick={() => handleMarkAsPaid(payment.id)}>
                            <CheckCircle className="w-4 h-4" />
                          </Button>}
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