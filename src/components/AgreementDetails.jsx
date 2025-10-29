// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Badge, Tabs, TabsContent, TabsList, TabsTrigger, useToast, Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui';
// @ts-ignore;
import { Building2, Calendar, DollarSign, User, Mail, Phone, FileText, Download, Edit, CheckCircle, Clock, Pause, Square, AlertCircle, Shield, Users, Database, Settings } from 'lucide-react';

export function AgreementDetails({
  $w,
  agreementId,
  className,
  style
}) {
  const {
    toast
  } = useToast();
  const [agreement, setAgreement] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('basic');
  const mockAgreement = {
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
    documents: [{
      id: 'DOC001',
      name: '主协议.pdf',
      type: 'main_agreement',
      size: '2.5MB',
      uploadDate: '2024-01-01 10:00:00',
      url: '/documents/main_agreement.pdf'
    }, {
      id: 'DOC002',
      name: '技术附件.pdf',
      type: 'technical_attachment',
      size: '1.8MB',
      uploadDate: '2024-01-01 10:15:00',
      url: '/documents/technical_attachment.pdf'
    }, {
      id: 'DOC003',
      name: '保密协议.pdf',
      type: 'confidentiality_agreement',
      size: '856KB',
      uploadDate: '2024-01-01 10:30:00',
      url: '/documents/confidentiality_agreement.pdf'
    }],
    terms: {
      purpose: '通过AI诊断技术提升医疗服务质量，建立长期战略合作关系',
      scope: 'AI诊断系统部署、技术支持、人员培训、数据共享',
      responsibilities: {
        provider: ['提供AI诊断系统', '技术支持和维护', '人员培训', '系统升级'],
        hospital: ['提供医疗数据', '配合系统部署', '人员配合', '反馈使用情况']
      },
      deliverables: ['AI诊断系统', '技术文档', '培训材料', '维护服务'],
      timeline: {
        deployment: '2024年1月-3月',
        training: '2024年2月-4月',
        operation: '2024年4月起'
      },
      payment: {
        total: 5000000,
        schedule: [{
          milestone: '合同签署',
          amount: 1000000,
          date: '2024-01-01'
        }, {
          milestone: '系统部署完成',
          amount: 2000000,
          date: '2024-03-31'
        }, {
          milestone: '验收合格',
          amount: 2000000,
          date: '2024-06-30'
        }]
      },
      dataSharing: {
        scope: '脱敏医疗数据',
        purpose: 'AI模型训练和优化',
        security: '符合HIPAA和GDPR标准',
        retention: '协议终止后2年'
      },
      confidentiality: {
        period: '协议期间及终止后5年',
        scope: '技术信息、商业信息、患者数据',
        penalty: '违约金100万元'
      },
      termination: {
        notice: '提前30天书面通知',
        conditions: ['重大违约', '破产', '不可抗力'],
        consequences: '系统停用、数据返还、赔偿'
      }
    },
    createdAt: '2024-01-01 10:00:00',
    updatedAt: '2024-01-15 14:30:00'
  };
  useEffect(() => {
    setTimeout(() => {
      setAgreement(mockAgreement);
      setLoading(false);
    }, 1000);
  }, [agreementId]);
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
  const handleDownloadDocument = document => {
    toast({
      title: "下载文档",
      description: `正在下载 ${document.name}...`
    });
  };
  const handleStatusChange = newStatus => {
    setAgreement(prev => ({
      ...prev,
      status: newStatus
    }));
    toast({
      title: "状态更新",
      description: `协议状态已更新为 ${newStatus}`
    });
  };
  if (loading) {
    return <div className={className} style={style}>
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">加载中...</div>
        </div>
      </div>;
  }
  if (!agreement) {
    return <div className={className} style={style}>
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">协议不存在</div>
        </div>
      </div>;
  }
  return <div className={className} style={style}>
      <div className="space-y-6">
        {/* 头部信息 */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Building2 className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{agreement.hospitalName}</h1>
                <div className="flex items-center space-x-3 mt-1">
                  <span className="text-gray-600">协议ID: {agreement.id}</span>
                  {getTypeBadge(agreement.type)}
                  {getStatusBadge(agreement.status)}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline">
                <Edit className="w-4 h-4 mr-2" />
                编辑协议
              </Button>
              <Select onValueChange={handleStatusChange}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="更改状态" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">激活</SelectItem>
                  <SelectItem value="suspended">暂停</SelectItem>
                  <SelectItem value="terminated">终止</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* 基本信息 */}
        <div className="grid grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                合作期限
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">开始日期</span>
                  <span className="font-medium">{agreement.startDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">结束日期</span>
                  <span className="font-medium">{agreement.endDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">合作期限</span>
                  <span className="font-medium">12个月</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="w-5 h-5 mr-2" />
                合作金额
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">总金额</span>
                  <span className="font-medium text-lg">{formatCurrency(agreement.value)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">付款方式</span>
                  <span className="font-medium">分期付款</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">付款次数</span>
                  <span className="font-medium">3次</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                联系信息
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">负责人</span>
                  <span className="font-medium">{agreement.responsiblePerson}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">邮箱</span>
                  <span className="font-medium text-sm">{agreement.contactEmail}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">电话</span>
                  <span className="font-medium">{agreement.contactPhone}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 详细信息标签页 */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="basic">基本信息</TabsTrigger>
            <TabsTrigger value="terms">协议条款</TabsTrigger>
            <TabsTrigger value="responsibilities">责任分工</TabsTrigger>
            <TabsTrigger value="data">数据共享</TabsTrigger>
            <TabsTrigger value="documents">协议文档</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>协议概述</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">合作目的</h4>
                    <p className="text-gray-700">{agreement.terms.purpose}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">合作范围</h4>
                    <p className="text-gray-700">{agreement.terms.scope}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">交付物</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {agreement.terms.deliverables.map((deliverable, index) => <div key={index} className="flex items-center text-gray-700">
                          <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                          {deliverable}
                        </div>)}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="terms" className="mt-6">
            <div className="grid grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>时间安排</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(agreement.terms.timeline).map(([phase, period]) => <div key={phase} className="flex justify-between">
                        <span className="text-gray-600 capitalize">{phase}</span>
                        <span className="font-medium">{period}</span>
                      </div>)}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>付款计划</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {agreement.terms.payment.schedule.map((payment, index) => <div key={index} className="border rounded-lg p-3">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-medium text-gray-900">{payment.milestone}</span>
                          <span className="font-semibold text-green-600">{formatCurrency(payment.amount)}</span>
                        </div>
                        <div className="text-sm text-gray-500">{payment.date}</div>
                      </div>)}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>保密条款</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">保密期限</span>
                      <span className="font-medium">{agreement.terms.confidentiality.period}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">保密范围</span>
                      <span className="font-medium">{agreement.terms.confidentiality.scope}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">违约金</span>
                      <span className="font-medium text-red-600">{agreement.terms.confidentiality.penalty}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>终止条款</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">通知期限</h4>
                      <p className="text-gray-700">{agreement.terms.termination.notice}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">终止条件</h4>
                      <div className="space-y-1">
                        {agreement.terms.termination.conditions.map((condition, index) => <div key={index} className="flex items-center text-gray-700">
                            <AlertCircle className="w-4 h-4 mr-2 text-orange-500" />
                            {condition}
                          </div>)}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="responsibilities" className="mt-6">
            <div className="grid grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Settings className="w-5 h-5 mr-2" />
                    服务方责任
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {agreement.terms.responsibilities.provider.map((responsibility, index) => <div key={index} className="flex items-start text-gray-700">
                        <CheckCircle className="w-4 h-4 mr-2 text-green-500 mt-0.5" />
                        <span>{responsibility}</span>
                      </div>)}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Building2 className="w-5 h-5 mr-2" />
                    医院责任
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {agreement.terms.responsibilities.hospital.map((responsibility, index) => <div key={index} className="flex items-start text-gray-700">
                        <CheckCircle className="w-4 h-4 mr-2 text-blue-500 mt-0.5" />
                        <span>{responsibility}</span>
                      </div>)}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="data" className="mt-6">
            <div className="grid grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Database className="w-5 h-5 mr-2" />
                    数据共享条款
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">数据范围</h4>
                      <p className="text-gray-700">{agreement.terms.dataSharing.scope}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">使用目的</h4>
                      <p className="text-gray-700">{agreement.terms.dataSharing.purpose}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">安全标准</h4>
                      <p className="text-gray-700">{agreement.terms.dataSharing.security}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">数据保留</h4>
                      <p className="text-gray-700">{agreement.terms.dataSharing.retention}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="w-5 h-5 mr-2" />
                    安全措施
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <h4 className="font-medium text-blue-900 mb-1">数据加密</h4>
                      <p className="text-sm text-blue-700">采用AES-256加密标准，确保数据传输和存储安全</p>
                    </div>
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <h4 className="font-medium text-green-900 mb-1">访问控制</h4>
                      <p className="text-sm text-green-700">基于角色的访问控制，严格限制数据访问权限</p>
                    </div>
                    <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                      <h4 className="font-medium text-purple-900 mb-1">审计日志</h4>
                      <p className="text-sm text-purple-700">完整的数据访问审计日志，确保可追溯性</p>
                    </div>
                    <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                      <h4 className="font-medium text-orange-900 mb-1">合规认证</h4>
                      <p className="text-sm text-orange-700">符合HIPAA、GDPR等国际数据保护标准</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="documents" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  协议文档
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {agreement.documents.map(document => <div key={document.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-gray-100 rounded-lg">
                            <FileText className="w-6 h-6 text-gray-600" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">{document.name}</h4>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span>{document.size}</span>
                              <span>上传于 {document.uploadDate}</span>
                            </div>
                          </div>
                        </div>
                        <Button variant="outline" onClick={() => handleDownloadDocument(document)}>
                          <Download className="w-4 h-4 mr-2" />
                          下载
                        </Button>
                      </div>
                    </div>)}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>;
}