// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Badge, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, useToast, Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui';
// @ts-ignore;
import { DollarSign, CreditCard, Banknote, FileText, Calendar, TrendingUp, TrendingDown, Download, Upload, Plus, Edit, Eye, CheckCircle, Clock, AlertTriangle, Filter, Search, RefreshCw, Receipt, Calculator, PieChart, BarChart3, ArrowUpRight, ArrowDownRight, Mail, Printer } from 'lucide-react';

export function FinancialManagement({
  financialData,
  sponsors
}) {
  const {
    toast
  } = useToast();
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterSponsor, setFilterSponsor] = useState('all');
  const [filterPeriod, setFilterPeriod] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const getStatusBadge = status => {
    const statusConfig = {
      confirmed: {
        color: 'bg-green-100 text-green-800',
        icon: CheckCircle,
        text: '已确认'
      },
      pending: {
        color: 'bg-yellow-100 text-yellow-800',
        icon: Clock,
        text: '待确认'
      },
      overdue: {
        color: 'bg-red-100 text-red-800',
        icon: AlertTriangle,
        text: '逾期'
      },
      cancelled: {
        color: 'bg-gray-100 text-gray-800',
        icon: FileText,
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
  const formatCurrency = (amount, currency = 'USD') => {
    const symbols = {
      CNY: '¥',
      USD: '$',
      EUR: '€'
    };
    return `${symbols[currency] || currency} ${amount.toLocaleString()}`;
  };
  const handleViewRecord = record => {
    setSelectedRecord(record);
    toast({
      title: "查看财务记录",
      description: `正在查看财务记录 ${record.id}`
    });
  };
  const handleSendInvoice = recordId => {
    toast({
      title: "发送发票",
      description: `发票已发送给客户 ${recordId}`
    });
  };
  const handleRecordPayment = recordId => {
    toast({
      title: "记录付款",
      description: `正在记录付款 ${recordId}`
    });
  };
  const filteredData = financialData.filter(record => {
    const matchesSearch = record.sponsorName.toLowerCase().includes(searchTerm.toLowerCase()) || record.period.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || record.status === filterStatus;
    const matchesSponsor = filterSponsor === 'all' || record.sponsorId === filterSponsor;
    const matchesPeriod = filterPeriod === 'all' || record.period === filterPeriod;
    return matchesSearch && matchesStatus && matchesSponsor && matchesPeriod;
  });
  const totalRevenue = financialData.reduce((sum, record) => {
    const convertedValue = record.currency === 'USD' ? record.revenue * 7.2 : record.revenue;
    return sum + convertedValue;
  }, 0);
  const totalProfit = financialData.reduce((sum, record) => {
    const convertedValue = record.currency === 'USD' ? record.profit * 7.2 : record.profit;
    return sum + convertedValue;
  }, 0);
  const avgProfitMargin = financialData.length > 0 ? financialData.reduce((sum, record) => sum + record.profitMargin, 0) / financialData.length : 0;
  const pendingAmount = financialData.filter(r => r.status === 'pending').reduce((sum, record) => {
    const convertedValue = record.currency === 'USD' ? record.revenue * 7.2 : record.revenue;
    return sum + convertedValue;
  }, 0);
  return <div className="space-y-6">
      {/* 统计卡片 */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">总收入</p>
                <p className="text-2xl font-bold text-gray-900">¥{(totalRevenue / 10000).toFixed(1)}万</p>
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
                <p className="text-sm text-gray-600">总利润</p>
                <p className="text-2xl font-bold text-gray-900">¥{(totalProfit / 10000).toFixed(1)}万</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Calculator className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">平均利润率</p>
                <p className="text-2xl font-bold text-gray-900">{avgProfitMargin.toFixed(1)}%</p>
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
                <p className="text-2xl font-bold text-gray-900">¥{(pendingAmount / 10000).toFixed(1)}万</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 筛选器 */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input type="text" placeholder="搜索赞助商或期间..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部状态</SelectItem>
                <SelectItem value="confirmed">已确认</SelectItem>
                <SelectItem value="pending">待确认</SelectItem>
                <SelectItem value="overdue">逾期</SelectItem>
                <SelectItem value="cancelled">已取消</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterSponsor} onValueChange={setFilterSponsor}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部赞助商</SelectItem>
                {sponsors.map(sponsor => <SelectItem key={sponsor.id} value={sponsor.id}>
                    {sponsor.name}
                  </SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={filterPeriod} onValueChange={setFilterPeriod}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部期间</SelectItem>
                <SelectItem value="2024-Q1">2024-Q1</SelectItem>
                <SelectItem value="2024-Q2">2024-Q2</SelectItem>
                <SelectItem value="2024-Q3">2024-Q3</SelectItem>
                <SelectItem value="2024-Q4">2024-Q4</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              新增财务记录
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 财务记录列表 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>财务记录</span>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                导出Excel
              </Button>
              <Button variant="outline" size="sm">
                <Printer className="w-4 h-4 mr-2" />
                打印报表
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>记录ID</TableHead>
                <TableHead>赞助商</TableHead>
                <TableHead>期间</TableHead>
                <TableHead>收入</TableHead>
                <TableHead>成本</TableHead>
                <TableHead>利润</TableHead>
                <TableHead>利润率</TableHead>
                <TableHead>状态</TableHead>
                <TableHead>发票日期</TableHead>
                <TableHead>付款日期</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map(record => <TableRow key={record.id} className="hover:bg-gray-50">
                  <TableCell>
                    <div className="font-medium text-gray-900">{record.id}</div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium text-gray-900">{record.sponsorName}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-gray-900">{record.period}</div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium text-gray-900">
                      {formatCurrency(record.revenue, record.currency)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-gray-900">
                      {formatCurrency(record.cost, record.currency)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium text-green-600">
                      {formatCurrency(record.profit, record.currency)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium text-gray-900">{record.profitMargin}%</div>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(record.status)}
                  </TableCell>
                  <TableCell>
                    <div className="text-gray-900">{record.invoiceDate}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-gray-900">{record.paymentDate || '-'}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => handleViewRecord(record)}>
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleSendInvoice(record.id)} disabled={record.status !== 'pending'}>
                        <Mail className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleRecordPayment(record.id)} disabled={record.status === 'confirmed'}>
                        <CreditCard className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>)}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* 财务分析图表 */}
      <div className="grid grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="w-5 h-5 mr-2" />
              收入趋势
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center text-gray-500">
              收入趋势图表 (需要集成图表库)
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <PieChart className="w-5 h-5 mr-2" />
              收入分布
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center text-gray-500">
              收入分布饼图 (需要集成图表库)
            </div>
          </CardContent>
        </Card>
      </div>
    </div>;
}