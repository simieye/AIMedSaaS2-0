// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, useToast } from '@/components/ui';
// @ts-ignore;
import { Download, Plus } from 'lucide-react';

import { BillTable } from '@/components/BillTable';
import { FinancialStats } from '@/components/FinancialStats';
import { FinancialSearchFilter } from '@/components/FinancialSearchFilter';
export function FinancialManagement({
  $w,
  className,
  style
}) {
  const {
    toast
  } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('all');
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(false);
  const mockBills = [{
    id: 'BILL001',
    projectId: 'PRJ001',
    projectName: '心血管药物推广活动',
    sponsorId: 'SPN001',
    sponsorName: '辉瑞制药有限公司',
    type: 'sponsorship_fee',
    status: 'paid',
    amount: 2500000,
    currency: 'CNY',
    issueDate: '2024-01-01',
    dueDate: '2024-01-31',
    paidDate: '2024-01-28',
    paymentMethod: 'bank_transfer',
    invoiceNumber: 'INV202401001',
    invoiceStatus: 'issued',
    description: '第一季度赞助费用',
    paymentTerms: 'NET30',
    taxRate: 0.06,
    taxAmount: 150000,
    totalAmount: 2650000,
    createdAt: '2024-01-01 10:00:00',
    updatedAt: '2024-01-28 14:30:00'
  }, {
    id: 'BILL002',
    projectId: 'PRJ002',
    projectName: '糖尿病管理解决方案',
    sponsorId: 'SPN002',
    sponsorName: '阿斯利康投资（中国）有限公司',
    type: 'service_fee',
    status: 'pending',
    amount: 1750000,
    currency: 'CNY',
    issueDate: '2024-01-15',
    dueDate: '2024-02-15',
    paidDate: null,
    paymentMethod: null,
    invoiceNumber: 'INV202401002',
    invoiceStatus: 'issued',
    description: '技术服务费用',
    paymentTerms: 'NET30',
    taxRate: 0.06,
    taxAmount: 105000,
    totalAmount: 1855000,
    createdAt: '2024-01-15 09:00:00',
    updatedAt: '2024-01-15 09:00:00'
  }, {
    id: 'BILL003',
    projectId: 'PRJ003',
    projectName: '诊断设备品牌推广',
    sponsorId: 'SPN003',
    sponsorName: '罗氏诊断产品（上海）有限公司',
    type: 'setup_fee',
    status: 'overdue',
    amount: 500000,
    currency: 'CNY',
    issueDate: '2023-12-01',
    dueDate: '2023-12-31',
    paidDate: null,
    paymentMethod: null,
    invoiceNumber: 'INV202312001',
    invoiceStatus: 'issued',
    description: '项目设置费用',
    paymentTerms: 'NET30',
    taxRate: 0.06,
    taxAmount: 30000,
    totalAmount: 530000,
    createdAt: '2023-12-01 11:00:00',
    updatedAt: '2023-12-01 11:00:00'
  }, {
    id: 'BILL004',
    projectId: 'PRJ004',
    projectName: '肿瘤治疗学术推广',
    sponsorId: 'SPN004',
    sponsorName: '强生（中国）投资有限公司',
    type: 'sponsorship_fee',
    status: 'cancelled',
    amount: 2250000,
    currency: 'CNY',
    issueDate: '2023-11-15',
    dueDate: '2023-12-15',
    paidDate: null,
    paymentMethod: null,
    invoiceNumber: 'INV202311001',
    invoiceStatus: 'cancelled',
    description: '学术推广费用（项目取消）',
    paymentTerms: 'NET30',
    taxRate: 0.06,
    taxAmount: 135000,
    totalAmount: 2385000,
    createdAt: '2023-11-15 14:00:00',
    updatedAt: '2024-01-05 16:00:00'
  }];
  useEffect(() => {
    setBills(mockBills);
  }, []);
  const getStatusBadge = status => {
    const statusConfig = {
      paid: {
        color: 'bg-green-100 text-green-800',
        icon: 'CheckCircle',
        text: '已付款'
      },
      pending: {
        color: 'bg-yellow-100 text-yellow-800',
        icon: 'Clock',
        text: '待付款'
      },
      overdue: {
        color: 'bg-red-100 text-red-800',
        icon: 'AlertCircle',
        text: '逾期'
      },
      cancelled: {
        color: 'bg-gray-100 text-gray-800',
        icon: 'AlertCircle',
        text: '已取消'
      }
    };
    const config = statusConfig[status] || statusConfig.pending;
    return <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.text}
      </span>;
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
      maintenance_fee: {
        color: 'bg-orange-100 text-orange-800',
        text: '维护费'
      }
    };
    const config = typeConfig[type] || typeConfig.sponsorship_fee;
    return <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.text}
      </span>;
  };
  const formatCurrency = amount => {
    return new Intl.NumberFormat('zh-CN', {
      style: 'currency',
      currency: 'CNY',
      minimumFractionDigits: 0
    }).format(amount);
  };
  const handleViewDetails = billId => {
    toast({
      title: "查看详情",
      description: `正在查看账单 ${billId} 的详细信息`
    });
  };
  const handleEdit = billId => {
    toast({
      title: "编辑账单",
      description: `正在编辑账单 ${billId}`
    });
  };
  const handleSendInvoice = billId => {
    toast({
      title: "发送发票",
      description: `发票已发送给客户`
    });
  };
  const handleMarkAsPaid = billId => {
    setBills(prev => prev.map(bill => bill.id === billId ? {
      ...bill,
      status: 'paid',
      paidDate: new Date().toISOString().split('T')[0]
    } : bill));
    toast({
      title: "标记已付款",
      description: `账单 ${billId} 已标记为已付款`
    });
  };
  const handleExport = () => {
    toast({
      title: "导出数据",
      description: "正在导出财务数据..."
    });
  };
  const handleCreateBill = () => {
    toast({
      title: "创建账单",
      description: "正在打开账单创建界面"
    });
  };
  const filteredBills = bills.filter(bill => {
    const matchesSearch = bill.projectName.toLowerCase().includes(searchTerm.toLowerCase()) || bill.sponsorName.toLowerCase().includes(searchTerm.toLowerCase()) || bill.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || bill.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });
  return <div className={className} style={style}>
      <div className="space-y-6">
        {/* 头部 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">财务管理</h1>
            <p className="text-gray-600">管理账单、发票和付款状态跟踪</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={handleExport}>
              <Download className="w-4 h-4 mr-2" />
              导出报表
            </Button>
            <Button onClick={handleCreateBill}>
              <Plus className="w-4 h-4 mr-2" />
              创建账单
            </Button>
          </div>
        </div>

        {/* 筛选器 */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <FinancialSearchFilter searchTerm={searchTerm} onSearchChange={setSearchTerm} selectedStatus={selectedStatus} onStatusChange={setSelectedStatus} selectedPeriod={selectedPeriod} onPeriodChange={setSelectedPeriod} onExport={handleExport} onCreateBill={handleCreateBill} />
        </div>

        {/* 统计卡片 */}
        <FinancialStats bills={bills} />

        {/* 账单列表 */}
        <BillTable bills={filteredBills} onViewDetails={handleViewDetails} onEdit={handleEdit} onSendInvoice={handleSendInvoice} onMarkAsPaid={handleMarkAsPaid} getStatusBadge={getStatusBadge} getTypeBadge={getTypeBadge} formatCurrency={formatCurrency} />
      </div>
    </div>;
}