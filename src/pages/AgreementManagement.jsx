// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Badge, Tabs, TabsContent, TabsList, TabsTrigger, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, useToast, Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui';
// @ts-ignore;
import { FileText, DollarSign, Users, Calendar, CheckCircle, Clock, AlertTriangle, Eye, Edit, Download, Upload, Plus, Search, Filter, RefreshCw, Building, User, FileSignature, CreditCard, TrendingUp, Activity, BarChart3, PieChart, FileCheck, Stamp, Mail, Phone, MapPin, Globe } from 'lucide-react';

import { AgreementList } from '@/components/AgreementList';
import { AgreementDetails } from '@/components/AgreementDetails';
import { AgreementForm } from '@/components/AgreementForm';
import { AgreementDocuments } from '@/components/AgreementDocuments';
import { PaymentTracking } from '@/components/PaymentTracking';
import { ApprovalWorkflow } from '@/components/ApprovalWorkflow';
export default function AgreementManagement(props) {
  const {
    $w,
    style
  } = props;
  const {
    toast
  } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedAgreement, setSelectedAgreement] = useState(null);
  const [agreements, setAgreements] = useState([]);
  const [payments, setPayments] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [approvals, setApprovals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  // 模拟合作协议数据
  const mockAgreements = [{
    id: 'AGR001',
    title: '与北京协和医院的AI诊断合作协议',
    partner: '北京协和医院',
    type: 'hospital',
    status: 'active',
    priority: 'high',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    value: 2500000,
    currency: 'CNY',
    description: '为北京协和医院提供AI辅助诊断系统，包括影像分析、病理诊断等服务',
    contactPerson: '张主任',
    contactEmail: 'zhang@xiehe.com',
    contactPhone: '010-12345678',
    address: '北京市东城区帅府园1号',
    department: '心内科',
    signedDate: '2023-12-15',
    renewalDate: '2024-11-01',
    terms: {
      paymentSchedule: 'quarterly',
      serviceLevel: 'premium',
      supportHours: '24/7',
      dataSecurity: 'enterprise'
    },
    performance: {
      completedServices: 1250,
      totalServices: 2000,
      satisfaction: 4.8,
      responseTime: 2.1
    }
  }, {
    id: 'AGR002',
    title: '与上海瑞金医院的医学影像分析合作',
    partner: '上海瑞金医院',
    type: 'hospital',
    status: 'pending',
    priority: 'medium',
    startDate: '2024-02-01',
    endDate: '2025-01-31',
    value: 1800000,
    currency: 'CNY',
    description: '为上海瑞金医院提供医学影像AI分析服务，包括CT、MRI、X光等影像分析',
    contactPerson: '李院长',
    contactEmail: 'li@ruijin.com',
    contactPhone: '021-87654321',
    address: '上海市黄浦区瑞金二路197号',
    department: '影像科',
    signedDate: null,
    renewalDate: null,
    terms: {
      paymentSchedule: 'monthly',
      serviceLevel: 'standard',
      supportHours: 'business',
      dataSecurity: 'standard'
    },
    performance: {
      completedServices: 0,
      totalServices: 1500,
      satisfaction: 0,
      responseTime: 0
    }
  }, {
    id: 'AGR003',
    title: '与辉瑞制药的新药研发合作',
    partner: '辉瑞制药',
    type: 'pharma',
    status: 'active',
    priority: 'high',
    startDate: '2023-06-01',
    endDate: '2025-05-31',
    value: 5000000,
    currency: 'USD',
    description: '与辉瑞制药合作开发新药AI辅助研发平台，加速药物发现和临床试验',
    contactPerson: '王博士',
    contactEmail: 'wang@pfizer.com',
    contactPhone: '+1-212-555-0123',
    address: '纽约市235东42街',
    department: '研发部',
    signedDate: '2023-05-15',
    renewalDate: '2025-04-01',
    terms: {
      paymentSchedule: 'milestone',
      serviceLevel: 'enterprise',
      supportHours: '24/7',
      dataSecurity: 'enterprise'
    },
    performance: {
      completedServices: 45,
      totalServices: 100,
      satisfaction: 4.9,
      responseTime: 1.8
    }
  }];

  // 模拟付款记录数据
  const mockPayments = [{
    id: 'PAY001',
    agreementId: 'AGR001',
    agreementTitle: '与北京协和医院的AI诊断合作协议',
    amount: 625000,
    currency: 'CNY',
    dueDate: '2024-03-31',
    paidDate: '2024-03-28',
    status: 'paid',
    paymentMethod: 'bank_transfer',
    invoiceNumber: 'INV-2024-Q1-001',
    description: '第一季度服务费用',
    category: 'service_fee'
  }, {
    id: 'PAY002',
    agreementId: 'AGR001',
    agreementTitle: '与北京协和医院的AI诊断合作协议',
    amount: 625000,
    currency: 'CNY',
    dueDate: '2024-06-30',
    paidDate: null,
    status: 'pending',
    paymentMethod: 'bank_transfer',
    invoiceNumber: 'INV-2024-Q2-002',
    description: '第二季度服务费用',
    category: 'service_fee'
  }, {
    id: 'PAY003',
    agreementId: 'AGR003',
    agreementTitle: '与辉瑞制药的新药研发合作',
    amount: 1000000,
    currency: 'USD',
    dueDate: '2024-02-15',
    paidDate: '2024-02-12',
    status: 'paid',
    paymentMethod: 'wire_transfer',
    invoiceNumber: 'INV-2024-M1-003',
    description: '第��阶段研发里程碑付款',
    category: 'milestone'
  }];

  // 模拟文档数据
  const mockDocuments = [{
    id: 'DOC001',
    agreementId: 'AGR001',
    title: '合作协议主文档',
    fileName: 'agreement_xiehe_main.pdf',
    fileType: 'pdf',
    fileSize: 2048576,
    uploadDate: '2023-12-15 10:30:00',
    uploadedBy: '法务部',
    version: 'v1.0',
    status: 'active',
    category: 'contract',
    description: '与北京协和医院的主合作协议文档',
    tags: ['主合同', '医院', 'AI诊断']
  }, {
    id: 'DOC002',
    agreementId: 'AGR001',
    title: '技术规格说明书',
    fileName: 'tech_spec_xiehe.pdf',
    fileType: 'pdf',
    fileSize: 1024000,
    uploadDate: '2023-12-15 11:00:00',
    uploadedBy: '技术部',
    version: 'v2.1',
    status: 'active',
    category: 'technical',
    description: 'AI诊断系统的技术规格和实施计划',
    tags: ['技术规格', '实施计划']
  }, {
    id: 'DOC003',
    agreementId: 'AGR002',
    title: '合作意向书',
    fileName: 'loi_ruijin.pdf',
    fileType: 'pdf',
    fileSize: 512000,
    uploadDate: '2024-01-20 14:00:00',
    uploadedBy: '商务部',
    version: 'v1.0',
    status: 'draft',
    category: 'preliminary',
    description: '与上海瑞金医院的合作意向书',
    tags: ['意向书', '待签署']
  }];

  // 模拟审批流程数据
  const mockApprovals = [{
    id: 'APP001',
    agreementId: 'AGR002',
    agreementTitle: '与上海瑞金医院的医学影像分析合作',
    currentStep: 'legal_review',
    status: 'in_progress',
    initiator: '商务部',
    initiatedDate: '2024-01-20 09:00:00',
    workflow: [{
      step: 'business_review',
      name: '商务审核',
      assignee: '商务总监',
      status: 'completed',
      completedDate: '2024-01-20 11:30:00',
      comments: '商务条款合理，建议通过'
    }, {
      step: 'legal_review',
      name: '法务审核',
      assignee: '法务总监',
      status: 'in_progress',
      completedDate: null,
      comments: '正在审核法律条款'
    }, {
      step: 'technical_review',
      name: '技术审核',
      assignee: '技术总监',
      status: 'pending',
      completedDate: null,
      comments: null
    }, {
      step: 'final_approval',
      name: '最终批准',
      assignee: 'CEO',
      status: 'pending',
      completedDate: null,
      comments: null
    }],
    priority: 'medium',
    estimatedCompletion: '2024-01-25'
  }];
  useEffect(() => {
    setAgreements(mockAgreements);
    setPayments(mockPayments);
    setDocuments(mockDocuments);
    setApprovals(mockApprovals);
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
        color: 'bg-red-100 text-red-800',
        icon: AlertTriangle,
        text: '已过期'
      },
      terminated: {
        color: 'bg-gray-100 text-gray-800',
        icon: FileText,
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
  const getPaymentStatusBadge = status => {
    const statusConfig = {
      paid: {
        color: 'bg-green-100 text-green-800',
        text: '已支付'
      },
      pending: {
        color: 'bg-yellow-100 text-yellow-800',
        text: '待支付'
      },
      overdue: {
        color: 'bg-red-100 text-red-800',
        text: '逾期'
      },
      cancelled: {
        color: 'bg-gray-100 text-gray-800',
        text: '已取消'
      }
    };
    const config = statusConfig[status] || statusConfig.pending;
    return <Badge className={config.color}>{config.text}</Badge>;
  };
  const getApprovalStatusBadge = status => {
    const statusConfig = {
      completed: {
        color: 'bg-green-100 text-green-800',
        text: '已完成'
      },
      in_progress: {
        color: 'bg-blue-100 text-blue-800',
        text: '进行中'
      },
      pending: {
        color: 'bg-yellow-100 text-yellow-800',
        text: '待处理'
      },
      rejected: {
        color: 'bg-red-100 text-red-800',
        text: '已拒绝'
      }
    };
    const config = statusConfig[status] || statusConfig.pending;
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
  const handleViewAgreement = agreement => {
    setSelectedAgreement(agreement);
    setActiveTab('details');
  };
  const handleEditAgreement = agreement => {
    setSelectedAgreement(agreement);
    setActiveTab('edit');
  };
  const handleCreateAgreement = () => {
    setSelectedAgreement(null);
    setActiveTab('create');
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
  const filteredAgreements = agreements.filter(agreement => {
    const matchesSearch = agreement.title.toLowerCase().includes(searchTerm.toLowerCase()) || agreement.partner.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || agreement.status === statusFilter;
    const matchesType = typeFilter === 'all' || agreement.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });
  const totalValue = agreements.reduce((sum, agreement) => {
    const convertedValue = agreement.currency === 'USD' ? agreement.value * 7.2 : agreement.value;
    return sum + convertedValue;
  }, 0);
  const activeAgreements = agreements.filter(a => a.status === 'active').length;
  const pendingAgreements = agreements.filter(a => a.status === 'pending').length;
  const totalPayments = payments.filter(p => p.status === 'paid').reduce((sum, payment) => {
    const convertedValue = payment.currency === 'USD' ? payment.amount * 7.2 : payment.amount;
    return sum + convertedValue;
  }, 0);
  return <div className="min-h-screen bg-gray-50" style={style}>
      <div className="container mx-auto px-4 py-6">
        <div className="space-y-6">
          {/* 页面标题 */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">合作协议管理</h1>
                <p className="text-gray-600 mt-2">
                  管理医院、药企等合作伙伴的合同协议、付款记录和审批流程
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="outline" onClick={handleRefresh} disabled={loading}>
                  <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                  刷新
                </Button>
                <Button onClick={handleCreateAgreement}>
                  <Plus className="w-4 h-4 mr-2" />
                  新建协议
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
                    <p className="text-sm text-gray-600">生效中</p>
                    <p className="text-2xl font-bold text-gray-900">{activeAgreements}</p>
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
                    <p className="text-2xl font-bold text-gray-900">{pendingAgreements}</p>
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
                    <p className="text-2xl font-bold text-gray-900">¥{(totalValue / 1000000).toFixed(1)}M</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 功能标签页 */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="overview">概览</TabsTrigger>
              <TabsTrigger value="details">协议详情</TabsTrigger>
              <TabsTrigger value="payments">付款记录</TabsTrigger>
              <TabsTrigger value="documents">文档管理</TabsTrigger>
              <TabsTrigger value="approvals">审批流程</TabsTrigger>
              <TabsTrigger value="analytics">数据分析</TabsTrigger>
            </TabsList>

            {/* 概览标签页 */}
            <TabsContent value="overview" className="space-y-6">
              {/* 筛选器 */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input type="text" placeholder="搜索协议名称或合作伙伴..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                    </div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">全部状态</SelectItem>
                        <SelectItem value="active">生效中</SelectItem>
                        <SelectItem value="pending">待签署</SelectItem>
                        <SelectItem value="expired">已过期</SelectItem>
                        <SelectItem value="terminated">已终止</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={typeFilter} onValueChange={setTypeFilter}>
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">全部类型</SelectItem>
                        <SelectItem value="hospital">医院</SelectItem>
                        <SelectItem value="pharma">药企</SelectItem>
                        <SelectItem value="research">研究机构</SelectItem>
                        <SelectItem value="other">其他</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* 协议列表 */}
              <Card>
                <CardHeader>
                  <CardTitle>协议列表</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>协议名称</TableHead>
                        <TableHead>合作伙伴</TableHead>
                        <TableHead>类型</TableHead>
                        <TableHead>状态</TableHead>
                        <TableHead>价值</TableHead>
                        <TableHead>开始日期</TableHead>
                        <TableHead>结束日期</TableHead>
                        <TableHead>操作</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredAgreements.map(agreement => <TableRow key={agreement.id} className="hover:bg-gray-50">
                          <TableCell>
                            <div>
                              <div className="font-medium text-gray-900">{agreement.title}</div>
                              <div className="text-sm text-gray-500">ID: {agreement.id}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium text-gray-900">{agreement.partner}</div>
                              <div className="text-sm text-gray-500">{agreement.contactPerson}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">
                              {agreement.type === 'hospital' ? '医院' : agreement.type === 'pharma' ? '药企' : agreement.type === 'research' ? '研究机构' : '其他'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {getStatusBadge(agreement.status)}
                          </TableCell>
                          <TableCell>
                            <div className="font-medium text-gray-900">
                              {formatCurrency(agreement.value, agreement.currency)}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-gray-900">{agreement.startDate}</div>
                          </TableCell>
                          <TableCell>
                            <div className="text-gray-900">{agreement.endDate}</div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Button variant="ghost" size="sm" onClick={() => handleViewAgreement(agreement)}>
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => handleEditAgreement(agreement)}>
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

            {/* 协议详情标签页 */}
            <TabsContent value="details">
              {selectedAgreement ? <AgreementDetails agreement={selectedAgreement} onEdit={() => handleEditAgreement(selectedAgreement)} /> : <Card>
                  <CardContent className="p-8 text-center">
                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">选择协议查看详情</h3>
                    <p className="text-gray-500">请从协议列表中选择一个协议来查看详细信息</p>
                  </CardContent>
                </Card>}
            </TabsContent>

            {/* 付款记录标签页 */}
            <TabsContent value="payments">
              <PaymentTracking payments={payments} agreements={agreements} />
            </TabsContent>

            {/* 文档管理标签页 */}
            <TabsContent value="documents">
              <AgreementDocuments documents={documents} agreements={agreements} selectedAgreement={selectedAgreement} />
            </TabsContent>

            {/* 审批流程标签页 */}
            <TabsContent value="approvals">
              <ApprovalWorkflow approvals={approvals} agreements={agreements} />
            </TabsContent>

            {/* 数据分析标签页 */}
            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2" />
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
                      协议类型分布
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center text-gray-500">
                      协议类型分布图表 (需要集成图表库)
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Activity className="w-5 h-5 mr-2" />
                      付款统计
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">已收付款</span>
                        <span className="font-semibold text-green-600">
                          ¥{(totalPayments / 1000000).toFixed(1)}M
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">待收付款</span>
                        <span className="font-semibold text-yellow-600">
                          ¥{(payments.filter(p => p.status === 'pending').reduce((sum, p) => {
                          const convertedValue = p.currency === 'USD' ? p.amount * 7.2 : p.amount;
                          return sum + convertedValue;
                        }, 0) / 1000000).toFixed(1)}M
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">逾期付款</span>
                        <span className="font-semibold text-red-600">
                          ¥{(payments.filter(p => p.status === 'overdue').reduce((sum, p) => {
                          const convertedValue = p.currency === 'USD' ? p.amount * 7.2 : p.amount;
                          return sum + convertedValue;
                        }, 0) / 1000000).toFixed(1)}M
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BarChart3 className="w-5 h-5 mr-2" />
                      协议绩效
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">平均满意度</span>
                        <span className="font-semibold">4.7/5.0</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">平均响应时间</span>
                        <span className="font-semibold">2.0小时</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">服务完成率</span>
                        <span className="font-semibold">87.5%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>;
}