// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Badge, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, useToast, Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui';
// @ts-ignore;
import { DollarSign, Calendar, CheckCircle, Clock, AlertTriangle, Eye, Edit, Download, Plus, RefreshCw, CreditCard, Banknote, FileText, TrendingUp } from 'lucide-react';

export function PaymentTracking({
  payments,
  agreements
}) {
  const {
    toast
  } = useToast();
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterAgreement, setFilterAgreement] = useState('all');
  const getStatusBadge = status => {
    const statusConfig = {
      paid: {
        color: 'bg-green-100 text-green-800',
        icon: CheckCircle,
        text: '已支付'
      },
      pending: {
        color: 'bg-yellow-100 text-yellow-800',
        icon: Clock,
        text: '待支付'
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
  const formatCurrency = (amount, currency) => {
    const symbols = {
      CNY: '¥',
      USD: '$',
      EUR: '€'
    };
    return `${symbols[currency] || currency} ${amount.toLocaleString()}`;
  };
  const handleViewPayment = payment => {
    setSelectedPayment(payment);
    toast({
      title: "查看付款详情",
      description: `正在查看付款记录 ${payment.id}`
    });
  };
  const handleMarkAsPaid = paymentId => {
    toast({
      title: "标记已支付",
      description: `付款记录 ${paymentId} 已标记为已支付`
    });
  };
  const handleSendReminder = paymentId => {
    toast({
      title: "发送提醒",
      description: `已向相关方发送付款提醒 ${paymentId}`
    });
  };
  const filteredPayments = payments.filter(payment => {
    const matchesStatus = filterStatus === 'all' || payment.status === filterStatus;
    const matchesAgreement = filterAgreement === 'all' || payment.agreementId === filterAgreement;
    return matchesStatus && matchesAgreement;
  });
  const totalPaid = payments.filter(p => p.status === 'paid').reduce((sum, p) => {
    const convertedValue = p.currency === 'USD' ? p.amount * 7.2 : p.amount;
    return sum + convertedValue;
  }, 0);
  const totalPending = payments.filter(p => p.status === 'pending').reduce((sum, p) => {
    const convertedValue = p.currency === 'USD' ? p.amount * 7.2 : p.amount;
    return sum + convertedValue;
  }, 0);
  const totalOverdue = payments.filter(p => p.status === 'overdue').reduce((sum, p) => {
    const convertedValue = p.currency === 'USD' ? p.amount * 7.2 : p.amount;
    return sum + convertedValue;
  }, 0);
  return <div className="space-y-6">
      {/* 统计卡片 */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">已收付款</p>
                <p className="text-2xl font-bold text-gray-900">¥{(totalPaid / 1000000).toFixed(1)}M</p>
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
                <p className="text-sm text-gray-600">待收付款</p>
                <p className="text-2xl font-bold text-gray-900">¥{(totalPending / 1000000).toFixed(1)}M</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">逾期付款</p>
                <p className="text-2xl font-bold text-gray-900">¥{(totalOverdue / 1000000).toFixed(1)}M</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">收款率</p>
                <p className="text-2xl font-bold text-gray-900">
                  {payments.length > 0 ? (payments.filter(p => p.status === 'paid').length / payments.length * 100).toFixed(1) : 0}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 筛选器 */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部状态</SelectItem>
                <SelectItem value="paid">已支付</SelectItem>
                <SelectItem value="pending">待支付</SelectItem>
                <SelectItem value="overdue">逾期</SelectItem>
                <SelectItem value="cancelled">已取消</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterAgreement} onValueChange={setFilterAgreement}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部协议</SelectItem>
                {agreements.map(agreement => <SelectItem key={agreement.id} value={agreement.id}>
                    {agreement.partner}
                  </SelectItem>)}
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              添加付款记录
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 付款记录列表 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>付款记录</span>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              导出报表
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>付款ID</TableHead>
                <TableHead>协议</TableHead>
                <TableHead>金额</TableHead>
                <TableHead>到期日期</TableHead>
                <TableHead>支付日期</TableHead>
                <TableHead>状态</TableHead>
                <TableHead>发票号</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.map(payment => <TableRow key={payment.id} className="hover:bg-gray-50">
                  <TableCell>
                    <div className="font-medium text-gray-900">{payment.id}</div>
                    <div className="text-sm text-gray-500">{payment.category}</div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium text-gray-900">{payment.agreementTitle}</div>
                    <div className="text-sm text-gray-500">{payment.description}</div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium text-gray-900">
                      {formatCurrency(payment.amount, payment.currency)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-gray-900">{payment.dueDate}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-gray-900">
                      {payment.paidDate || '-'}
                    </div>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(payment.status)}
                  </TableCell>
                  <TableCell>
                    <div className="text-gray-900">{payment.invoiceNumber}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => handleViewPayment(payment)}>
                        <Eye className="w-4 h-4" />
                      </Button>
                      {payment.status === 'pending' && <Button variant="ghost" size="sm" onClick={() => handleMarkAsPaid(payment.id)}>
                          <CheckCircle className="w-4 h-4" />
                        </Button>}
                      {payment.status === 'pending' && <Button variant="ghost" size="sm" onClick={() => handleSendReminder(payment.id)}>
                          <FileText className="w-4 h-4" />
                        </Button>}
                    </div>
                  </TableCell>
                </TableRow>)}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>;
}