// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Tabs, TabsContent, TabsList, TabsTrigger, Button } from '@/components/ui';
// @ts-ignore;
import { FileText, Plus, List, Eye, Download } from 'lucide-react';

import { AgreementList } from '@/components/AgreementList';
import { AgreementDetails } from '@/components/AgreementDetails';
import { AgreementForm } from '@/components/AgreementForm';
import { AgreementSearchFilter } from '@/components/AgreementSearchFilter';
import { AgreementStats } from '@/components/AgreementStats';
import { AgreementTable } from '@/components/AgreementTable';
export default function AgreementManagement(props) {
  const [activeTab, setActiveTab] = useState('list');
  const [selectedAgreementId, setSelectedAgreementId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedDateRange, setSelectedDateRange] = useState('all');
  const [agreements, setAgreements] = useState([]);
  const mockAgreements = [{
    _id: 'AGR001',
    name: '北京协和医院AI诊断系统合作协议',
    partner_id: 'partner_001',
    partner_name: '北京协和医院',
    status: 'active',
    start_date: '2024-01-01',
    end_date: '2024-12-31',
    type: 'strategic_cooperation',
    value: 5000000,
    responsible_person: '张主任',
    contact_email: 'zhang@xiehe.com',
    contact_phone: '010-12345678',
    description: '战略合作协议，包含AI诊断系统部署和技术支持',
    documents: ['主协议.pdf', '技术附件.pdf', '保密协议.pdf'],
    created_at: '2024-01-01 10:00:00',
    updated_at: '2024-01-15 14:30:00'
  }, {
    _id: 'AGR002',
    name: '上海瑞金医院技术服务协议',
    partner_id: 'partner_002',
    partner_name: '上海瑞金医院',
    status: 'pending',
    start_date: '2024-02-01',
    end_date: '2025-01-31',
    type: 'technical_service',
    value: 2000000,
    responsible_person: '李院长',
    contact_email: 'li@ruijin.com',
    contact_phone: '021-87654321',
    description: '技术服务协议，提供AI诊断系统维护和升级服务',
    documents: ['服务协议.pdf'],
    created_at: '2024-01-10 09:15:00',
    updated_at: '2024-01-10 09:15:00'
  }, {
    _id: 'AGR003',
    name: '广州中山医院试点项目协议',
    partner_id: 'partner_003',
    partner_name: '广州中山医院',
    status: 'suspended',
    start_date: '2023-06-01',
    end_date: '2024-05-31',
    type: 'pilot_project',
    value: 800000,
    responsible_person: '王副院长',
    contact_email: 'wang@zhongshan.com',
    contact_phone: '020-11223344',
    description: '试点项目协议，AI诊断系统试点应用',
    documents: ['试点协议.pdf', '实施方案.pdf'],
    created_at: '2023-05-15 16:20:00',
    updated_at: '2024-01-05 11:45:00'
  }, {
    _id: 'AGR004',
    name: '深圳人民医院科研合作协议',
    partner_id: 'partner_004',
    partner_name: '深圳人民医院',
    status: 'expired',
    start_date: '2023-01-01',
    end_date: '2023-12-31',
    type: 'research_cooperation',
    value: 1500000,
    responsible_person: '陈主任',
    contact_email: 'chen@szhospital.com',
    contact_phone: '0755-55667788',
    description: '科研合作协议，AI诊断算法研发和数据共享',
    documents: ['科研协议.pdf', '数据共享协议.pdf'],
    created_at: '2022-12-20 13:30:00',
    updated_at: '2023-12-31 17:00:00'
  }];
  React.useEffect(() => {
    setAgreements(mockAgreements);
  }, []);
  const getStatusBadge = status => {
    const statusConfig = {
      active: {
        color: 'bg-green-100 text-green-800',
        icon: 'CheckCircle',
        text: '激活'
      },
      pending: {
        color: 'bg-yellow-100 text-yellow-800',
        icon: 'Clock',
        text: '待激活'
      },
      suspended: {
        color: 'bg-orange-100 text-orange-800',
        icon: 'Pause',
        text: '暂停'
      },
      expired: {
        color: 'bg-gray-100 text-gray-800',
        icon: 'Square',
        text: '已过期'
      },
      terminated: {
        color: 'bg-red-100 text-red-800',
        icon: 'AlertCircle',
        text: '终止'
      }
    };
    const config = statusConfig[status] || statusConfig.pending;
    return <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.text}
      </span>;
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
  const handleViewAgreement = agreementId => {
    setSelectedAgreementId(agreementId);
    setActiveTab('details');
  };
  const handleEditAgreement = agreementId => {
    setSelectedAgreementId(agreementId);
    setShowForm(true);
  };
  const handleCreateAgreement = () => {
    setSelectedAgreementId(null);
    setShowForm(true);
  };
  const handleFormSave = formData => {
    setShowForm(false);
    setActiveTab('list');
    // 这里可以添加保存逻辑
  };
  const handleFormCancel = () => {
    setShowForm(false);
  };
  const handleViewDocuments = agreementId => {
    // 可以扩展为文档管理功能
    console.log('查看文档:', agreementId);
  };
  const handleStatusChange = (agreementId, newStatus) => {
    setAgreements(prev => prev.map(agreement => agreement._id === agreementId ? {
      ...agreement,
      status: newStatus
    } : agreement));
  };
  const handleDeleteAgreement = agreementId => {
    setAgreements(prev => prev.filter(agreement => agreement._id !== agreementId));
  };
  const handleExport = () => {
    // 导出功能
    console.log('导出数据');
  };
  const filteredAgreements = agreements.filter(agreement => {
    const matchesSearch = agreement.name.toLowerCase().includes(searchTerm.toLowerCase()) || agreement._id.toLowerCase().includes(searchTerm.toLowerCase()) || agreement.responsible_person.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || agreement.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });
  return <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <div className="space-y-6">
          {/* 页面标题 */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">合作协议管理</h1>
                <p className="text-gray-600 mt-2">
                  管理医院合作协议，包括协议创建、文档管理、状态监控等功能
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm text-gray-500">当前用户</p>
                  <p className="font-semibold text-gray-900">
                    {props.$w.auth.currentUser?.name || '管理员'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 功能标签页 */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="list" className="flex items-center space-x-2">
                <List className="w-4 h-4" />
                <span>协议列表</span>
              </TabsTrigger>
              <TabsTrigger value="details" className="flex items-center space-x-2">
                <Eye className="w-4 h-4" />
                <span>协议详情</span>
              </TabsTrigger>
              <TabsTrigger value="form" className="flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>新增协议</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="list">
              <div className="space-y-6">
                {/* 头部操作区 */}
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">协议列表</h2>
                    <p className="text-gray-600">管理和监控所有医院合作协议</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" onClick={handleExport}>
                      <Download className="w-4 h-4 mr-2" />
                      导出数据
                    </Button>
                    <Button onClick={handleCreateAgreement}>
                      <Plus className="w-4 h-4 mr-2" />
                      新增协议
                    </Button>
                  </div>
                </div>

                {/* 搜索筛选 */}
                <div className="bg-white rounded-lg shadow-sm p-4">
                  <AgreementSearchFilter searchTerm={searchTerm} onSearchChange={setSearchTerm} selectedStatus={selectedStatus} onStatusChange={setSelectedStatus} selectedDateRange={selectedDateRange} onDateRangeChange={setSelectedDateRange} onExport={handleExport} />
                </div>

                {/* 统计卡片 */}
                <AgreementStats agreements={agreements} />

                {/* 协议表格 */}
                <AgreementTable agreements={filteredAgreements} onViewAgreement={handleViewAgreement} onEditAgreement={handleEditAgreement} onViewDocuments={handleViewDocuments} onDeleteAgreement={handleDeleteAgreement} onStatusChange={handleStatusChange} getStatusBadge={getStatusBadge} getTypeBadge={getTypeBadge} formatCurrency={formatCurrency} />
              </div>
            </TabsContent>

            <TabsContent value="details">
              {selectedAgreementId ? <AgreementDetails $w={props.$w} agreementId={selectedAgreementId} /> : <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                  <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">请选择协议</h3>
                  <p className="text-gray-600">请先从协议列表中选择一个协议查看详情</p>
                  <Button className="mt-4" onClick={() => setActiveTab('list')}>
                    返回协议列表
                  </Button>
                </div>}
            </TabsContent>

            <TabsContent value="form">
              <AgreementForm $w={props.$w} agreementId={selectedAgreementId} onSave={handleFormSave} onCancel={handleFormCancel} />
            </TabsContent>
          </Tabs>
        </div>

        {/* 协议表单弹窗 */}
        {showForm && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-y-auto">
              <AgreementForm $w={props.$w} agreementId={selectedAgreementId} onSave={handleFormSave} onCancel={handleFormCancel} />
            </div>
          </div>}
      </div>
    </div>;
}