// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Select, Badge, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, useToast, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui';
// @ts-ignore;
import { Search, Filter, Plus, Eye, Edit, Trash2, Monitor, Smartphone, Tablet, Layout, Calendar, DollarSign, TrendingUp, Clock, CheckCircle, AlertCircle } from 'lucide-react';

export function AdPositionManagement({
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
  const [adPositions, setAdPositions] = useState([]);
  const [loading, setLoading] = useState(false);
  const mockAdPositions = [{
    id: 'AD001',
    name: '首页横幅广告',
    type: 'banner',
    position: 'homepage_top',
    status: 'active',
    dimensions: {
      width: 1200,
      height: 200,
      unit: 'px'
    },
    devices: ['desktop', 'tablet'],
    pricing: {
      model: 'cpm',
      rate: 50,
      currency: 'CNY'
    },
    availability: {
      totalSlots: 10,
      occupiedSlots: 8,
      availableSlots: 2
    },
    performance: {
      impressions: 2500000,
      clicks: 87500,
      ctr: 3.5,
      revenue: 125000
    },
    targeting: {
      demographics: ['doctors', 'pharmacists'],
      specialties: ['cardiology', 'internal_medicine'],
      regions: ['beijing', 'shanghai', 'guangzhou']
    },
    schedule: {
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      timezone: 'Asia/Shanghai'
    },
    restrictions: {
      maxFileSize: '2MB',
      allowedFormats: ['jpg', 'png', 'gif'],
      contentRestrictions: ['no_misleading_claims', 'medical_approval_required']
    },
    createdAt: '2023-12-01',
    updatedAt: '2024-01-10'
  }, {
    id: 'AD002',
    name: '侧边栏广告',
    type: 'sidebar',
    position: 'right_sidebar',
    status: 'active',
    dimensions: {
      width: 300,
      height: 600,
      unit: 'px'
    },
    devices: ['desktop'],
    pricing: {
      model: 'cpc',
      rate: 2.5,
      currency: 'CNY'
    },
    availability: {
      totalSlots: 5,
      occupiedSlots: 3,
      availableSlots: 2
    },
    performance: {
      impressions: 1200000,
      clicks: 48000,
      ctr: 4.0,
      revenue: 120000
    },
    targeting: {
      demographics: ['doctors', 'researchers'],
      specialties: ['oncology', 'radiology'],
      regions: ['national']
    },
    schedule: {
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      timezone: 'Asia/Shanghai'
    },
    restrictions: {
      maxFileSize: '1MB',
      allowedFormats: ['jpg', 'png'],
      contentRestrictions: ['no_misleading_claims']
    },
    createdAt: '2023-12-05',
    updatedAt: '2024-01-08'
  }, {
    id: 'AD003',
    name: '移动端横幅',
    type: 'mobile_banner',
    position: 'mobile_header',
    status: 'active',
    dimensions: {
      width: 375,
      height: 100,
      unit: 'px'
    },
    devices: ['mobile'],
    pricing: {
      model: 'cpm',
      rate: 30,
      currency: 'CNY'
    },
    availability: {
      totalSlots: 8,
      occupiedSlots: 6,
      availableSlots: 2
    },
    performance: {
      impressions: 1800000,
      clicks: 54000,
      ctr: 3.0,
      revenue: 54000
    },
    targeting: {
      demographics: ['young_doctors', 'medical_students'],
      specialties: ['general', 'pediatrics'],
      regions: ['tier1_cities']
    },
    schedule: {
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      timezone: 'Asia/Shanghai'
    },
    restrictions: {
      maxFileSize: '500KB',
      allowedFormats: ['jpg', 'png'],
      contentRestrictions: ['mobile_optimized']
    },
    createdAt: '2023-12-10',
    updatedAt: '2024-01-12'
  }, {
    id: 'AD004',
    name: '内容赞助位',
    type: 'content_sponsorship',
    position: 'article_inline',
    status: 'inactive',
    dimensions: {
      width: 600,
      height: 400,
      unit: 'px'
    },
    devices: ['desktop', 'tablet', 'mobile'],
    pricing: {
      model: 'fixed',
      rate: 10000,
      currency: 'CNY'
    },
    availability: {
      totalSlots: 3,
      occupiedSlots: 0,
      availableSlots: 3
    },
    performance: {
      impressions: 0,
      clicks: 0,
      ctr: 0,
      revenue: 0
    },
    targeting: {
      demographics: ['all'],
      specialties: ['all'],
      regions: ['all']
    },
    schedule: {
      startDate: '2024-02-01',
      endDate: '2024-12-31',
      timezone: 'Asia/Shanghai'
    },
    restrictions: {
      maxFileSize: '3MB',
      allowedFormats: ['jpg', 'png', 'video'],
      contentRestrictions: ['high_quality_content']
    },
    createdAt: '2024-01-05',
    updatedAt: '2024-01-05'
  }];
  useEffect(() => {
    setAdPositions(mockAdPositions);
  }, []);
  const getStatusBadge = status => {
    const statusConfig = {
      active: {
        color: 'bg-green-100 text-green-800',
        icon: CheckCircle,
        text: '活跃'
      },
      inactive: {
        color: 'bg-gray-100 text-gray-800',
        icon: AlertCircle,
        text: '未激活'
      },
      maintenance: {
        color: 'bg-yellow-100 text-yellow-800',
        icon: Clock,
        text: '维护中'
      }
    };
    const config = statusConfig[status] || statusConfig.inactive;
    const Icon = config.icon;
    return <Badge className={config.color}>
        <Icon className="w-3 h-3 mr-1" />
        {config.text}
      </Badge>;
  };
  const getTypeBadge = type => {
    const typeConfig = {
      banner: {
        color: 'bg-blue-100 text-blue-800',
        text: '横幅广告'
      },
      sidebar: {
        color: 'bg-purple-100 text-purple-800',
        text: '侧边栏广告'
      },
      mobile_banner: {
        color: 'bg-green-100 text-green-800',
        text: '移动横幅'
      },
      content_sponsorship: {
        color: 'bg-orange-100 text-orange-800',
        text: '内容赞助'
      }
    };
    const config = typeConfig[type] || typeConfig.banner;
    return <Badge className={config.color}>{config.text}</Badge>;
  };
  const getDeviceIcon = devices => {
    if (devices.includes('mobile')) return <Smartphone className="w-4 h-4" />;
    if (devices.includes('tablet')) return <Tablet className="w-4 h-4" />;
    return <Monitor className="w-4 h-4" />;
  };
  const formatCurrency = amount => {
    return new Intl.NumberFormat('zh-CN', {
      style: 'currency',
      currency: 'CNY',
      minimumFractionDigits: 0
    }).format(amount);
  };
  const handleViewDetails = positionId => {
    toast({
      title: "查看详情",
      description: `正在查看广告位 ${positionId} 的详细信息`
    });
  };
  const handleEdit = positionId => {
    toast({
      title: "编辑广告位",
      description: `正在编辑广告位 ${positionId}`
    });
  };
  const handlePreview = positionId => {
    toast({
      title: "预览广告位",
      description: `正在预览广告位 ${positionId}`
    });
  };
  const handleStatusChange = (positionId, newStatus) => {
    setAdPositions(prev => prev.map(position => position.id === positionId ? {
      ...position,
      status: newStatus
    } : position));
    toast({
      title: "状态更新",
      description: `广告位 ${positionId} 状态已更新`
    });
  };
  const handleDelete = positionId => {
    setAdPositions(prev => prev.filter(position => position.id !== positionId));
    toast({
      title: "删除成功",
      description: `广告位 ${positionId} 已删除`,
      variant: "destructive"
    });
  };
  const filteredAdPositions = adPositions.filter(position => {
    const matchesSearch = position.name.toLowerCase().includes(searchTerm.toLowerCase()) || position.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || position.status === selectedStatus;
    const matchesType = selectedType === 'all' || position.type === selectedType;
    return matchesSearch && matchesStatus && matchesType;
  });
  const totalRevenue = adPositions.reduce((sum, position) => sum + position.performance.revenue, 0);
  const totalImpressions = adPositions.reduce((sum, position) => sum + position.performance.impressions, 0);
  const avgCTR = adPositions.length > 0 ? (adPositions.reduce((sum, position) => sum + position.performance.ctr, 0) / adPositions.length).toFixed(1) : 0;
  return <div className={className} style={style}>
      <div className="space-y-6">
        {/* 头部 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">广告位管理</h1>
            <p className="text-gray-600">管理广告位配置、排期和效果监控</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              创建广告位
            </Button>
          </div>
        </div>

        {/* 筛选器 */}
        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input placeholder="搜索广告位名称或位置..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10" />
              </div>
              
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="选择状态" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部状态</SelectItem>
                  <SelectItem value="active">活跃</SelectItem>
                  <SelectItem value="inactive">未激活</SelectItem>
                  <SelectItem value="maintenance">维护中</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="选择类型" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部类型</SelectItem>
                  <SelectItem value="banner">横幅广告</SelectItem>
                  <SelectItem value="sidebar">侧边栏广告</SelectItem>
                  <SelectItem value="mobile_banner">移动横幅</SelectItem>
                  <SelectItem value="content_sponsorship">内容赞助</SelectItem>
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
                  <Layout className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">总广告位</p>
                  <p className="text-2xl font-bold text-gray-900">{adPositions.length}</p>
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
                  <p className="text-sm text-gray-600">活跃广告位</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {adPositions.filter(p => p.status === 'active').length}
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
                  <p className="text-sm text-gray-600">总收入</p>
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalRevenue)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">平均CTR</p>
                  <p className="text-2xl font-bold text-gray-900">{avgCTR}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 广告位列表 */}
        <Card>
          <CardHeader>
            <CardTitle>广告位列表</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>广告位名称</TableHead>
                  <TableHead>类型</TableHead>
                  <TableHead>尺寸</TableHead>
                  <TableHead>设备</TableHead>
                  <TableHead>定价</TableHead>
                  <TableHead>占用率</TableHead>
                  <TableHead>展示次数</TableHead>
                  <TableHead>CTR</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead>操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAdPositions.map(position => <TableRow key={position.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium text-gray-900">{position.name}</div>
                        <div className="text-sm text-gray-500">{position.position}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getTypeBadge(position.type)}
                    </TableCell>
                    <TableCell>
                      <div className="text-gray-900">
                        {position.dimensions.width}×{position.dimensions.height}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        {getDeviceIcon(position.devices)}
                        <span className="text-gray-900">{position.devices.length}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium text-gray-900">
                          {position.pricing.model === 'cpm' ? 'CPM' : position.pricing.model === 'cpc' ? 'CPC' : '固定'}
                        </div>
                        <div className="text-sm text-gray-500">{formatCurrency(position.pricing.rate)}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{
                        width: `${position.availability.occupiedSlots / position.availability.totalSlots * 100}%`
                      }}></div>
                        </div>
                        <span className="text-sm text-gray-900">
                          {position.availability.occupiedSlots}/{position.availability.totalSlots}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-gray-900">{position.performance.impressions.toLocaleString()}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-gray-900">{position.performance.ctr}%</div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(position.status)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => handleViewDetails(position.id)}>
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handlePreview(position.id)}>
                          <Monitor className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(position.id)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Select onValueChange={value => handleStatusChange(position.id, value)}>
                          <SelectTrigger className="w-20 h-8">
                            <SelectValue placeholder="状态" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">激活</SelectItem>
                            <SelectItem value="inactive">停用</SelectItem>
                            <SelectItem value="maintenance">维护</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(position.id)}>
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