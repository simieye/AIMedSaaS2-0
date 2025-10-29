// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Badge, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, useToast, Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui';
// @ts-ignore;
import { Layout, Image, Ad, Megaphone, Eye, Edit, Plus, Calendar, DollarSign, BarChart3, TrendingUp, Users, Target, Settings, Monitor, Smartphone, Tablet, Globe, Zap, Clock, CheckCircle, AlertTriangle, Filter, Search, RefreshCw } from 'lucide-react';

export function AdPositionManagement({
  adPositions,
  sponsors
}) {
  const {
    toast
  } = useToast();
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const getStatusBadge = status => {
    const statusConfig = {
      available: {
        color: 'bg-green-100 text-green-800',
        icon: CheckCircle,
        text: '可用'
      },
      occupied: {
        color: 'bg-blue-100 text-blue-800',
        icon: Users,
        text: '已占用'
      },
      maintenance: {
        color: 'bg-yellow-100 text-yellow-800',
        icon: AlertTriangle,
        text: '维护中'
      },
      disabled: {
        color: 'bg-gray-100 text-gray-800',
        icon: Settings,
        text: '已禁用'
      }
    };
    const config = statusConfig[status] || statusConfig.available;
    const Icon = config.icon;
    return <Badge className={config.color}>
      <Icon className="w-3 h-3 mr-1" />
      {config.text}
    </Badge>;
  };
  const getTypeIcon = type => {
    const icons = {
      banner: Layout,
      sidebar: Monitor,
      popup: Smartphone,
      native: Tablet,
      video: Zap
    };
    return icons[type] || Layout;
  };
  const formatCurrency = (amount, currency) => {
    const symbols = {
      CNY: '¥',
      USD: '$',
      EUR: '€'
    };
    return `${symbols[currency] || currency} ${amount.toLocaleString()}`;
  };
  const handleViewPosition = position => {
    setSelectedPosition(position);
    toast({
      title: "查看广告位详情",
      description: `正在查看广告位 ${position.name}`
    });
  };
  const handleEditPosition = position => {
    toast({
      title: "编辑广告位",
      description: `正在编辑广告位 ${position.name}`
    });
  };
  const handleBookPosition = position => {
    if (position.status === 'available') {
      toast({
        title: "预订广告位",
        description: `正在预订广告位 ${position.name}`
      });
    } else {
      toast({
        title: "广告位不可用",
        description: "该广告位当前不可预订",
        variant: "destructive"
      });
    }
  };
  const filteredPositions = adPositions.filter(position => {
    const matchesSearch = position.name.toLowerCase().includes(searchTerm.toLowerCase()) || position.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || position.status === filterStatus;
    const matchesType = filterType === 'all' || position.type === filterType;
    return matchesSearch && matchesStatus && matchesType;
  });
  const availablePositions = adPositions.filter(p => p.status === 'available').length;
  const occupiedPositions = adPositions.filter(p => p.status === 'occupied').length;
  const totalRevenue = adPositions.reduce((sum, position) => {
    const convertedValue = position.currency === 'USD' ? position.performance.revenue * 7.2 : position.performance.revenue;
    return sum + convertedValue;
  }, 0);
  const avgCTR = adPositions.length > 0 ? adPositions.reduce((sum, position) => sum + position.performance.ctr, 0) / adPositions.length : 0;
  return <div className="space-y-6">
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
                <p className="text-sm text-gray-600">可用广告位</p>
                <p className="text-2xl font-bold text-gray-900">{availablePositions}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">已占用</p>
                <p className="text-2xl font-bold text-gray-900">{occupiedPositions}</p>
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
                <p className="text-2xl font-bold text-gray-900">¥{(totalRevenue / 10000).toFixed(1)}万</p>
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
              <input type="text" placeholder="搜索广告位名称..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部状态</SelectItem>
                <SelectItem value="available">可用</SelectItem>
                <SelectItem value="occupied">已占用</SelectItem>
                <SelectItem value="maintenance">维护中</SelectItem>
                <SelectItem value="disabled">已禁用</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部类型</SelectItem>
                <SelectItem value="banner">横幅</SelectItem>
                <SelectItem value="sidebar">侧边栏</SelectItem>
                <SelectItem value="popup">弹窗</SelectItem>
                <SelectItem value="native">原生</SelectItem>
                <SelectItem value="video">视频</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              新增广告位
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 广告位列表 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>广告位列表</span>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span>平均CTR: {avgCTR.toFixed(2)}%</span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>广告位名称</TableHead>
                <TableHead>类型</TableHead>
                <TableHead>位置</TableHead>
                <TableHead>尺寸</TableHead>
                <TableHead>状态</TableHead>
                <TableHead>价格</TableHead>
                <TableHead>展示次数</TableHead>
                <TableHead>CTR</TableHead>
                <TableHead>收入</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPositions.map(position => {
              const Icon = getTypeIcon(position.type);
              return <TableRow key={position.id} className="hover:bg-gray-50">
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Icon className="w-5 h-5 text-gray-500" />
                      <div>
                        <div className="font-medium text-gray-900">{position.name}</div>
                        <div className="text-sm text-gray-500">{position.description}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {position.type === 'banner' ? '横幅' : position.type === 'sidebar' ? '侧边栏' : position.type === 'popup' ? '弹窗' : position.type === 'native' ? '原生' : '视频'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-gray-900">{position.position}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-gray-900">{position.dimensions}</div>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(position.status)}
                  </TableCell>
                  <TableCell>
                    <div className="text-gray-900">
                      {formatCurrency(position.price, position.currency)}
                    </div>
                    <div className="text-xs text-gray-500">{position.pricingModel.toUpperCase()}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-gray-900">{position.performance.impressions.toLocaleString()}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-gray-900">{position.performance.ctr}%</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-gray-900">
                      {formatCurrency(position.performance.revenue, position.currency)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => handleViewPosition(position)}>
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleEditPosition(position)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleBookPosition(position)} disabled={position.status !== 'available'}>
                        <Calendar className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>;
            })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* 广告位详情弹窗 */}
      {selectedPosition && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">{selectedPosition.name}</h3>
                <Button variant="ghost" onClick={() => setSelectedPosition(null)}>
                  ×
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">基本信息</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">类型:</span>
                        <span className="text-gray-900">{selectedPosition.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">位置:</span>
                        <span className="text-gray-900">{selectedPosition.position}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">尺寸:</span>
                        <span className="text-gray-900">{selectedPosition.dimensions}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">价格:</span>
                        <span className="text-gray-900">{formatCurrency(selectedPosition.price, selectedPosition.currency)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">计费模式:</span>
                        <span className="text-gray-900">{selectedPosition.pricingModel.toUpperCase()}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">技术规格</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">文件大小:</span>
                        <span className="text-gray-900">{selectedPosition.specifications.fileSize}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">支持格式:</span>
                        <span className="text-gray-900">{selectedPosition.specifications.formats.join(', ')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">动画支持:</span>
                        <span className="text-gray-900">{selectedPosition.specifications.animation ? '是' : '否'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">点击跟踪:</span>
                        <span className="text-gray-900">{selectedPosition.specifications.clickTracking ? '是' : '否'}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">性能数据</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">展示次数:</span>
                        <span className="text-gray-900">{selectedPosition.performance.impressions.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">点击次数:</span>
                        <span className="text-gray-900">{selectedPosition.performance.clicks.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">CTR:</span>
                        <span className="text-gray-900">{selectedPosition.performance.ctr}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">转化次数:</span>
                        <span className="text-gray-900">{selectedPosition.performance.conversions.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">收入:</span>
                        <span className="text-gray-900">{formatCurrency(selectedPosition.performance.revenue, selectedPosition.currency)}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">可用性</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">开始日期:</span>
                        <span className="text-gray-900">{selectedPosition.availability.startDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">结束日期:</span>
                        <span className="text-gray-900">{selectedPosition.availability.endDate}</span>
                      </div>
                      {selectedPosition.currentSponsor && <div className="flex justify-between">
                          <span className="text-gray-600">当前赞助商:</span>
                          <span className="text-gray-900">{selectedPosition.currentSponsor}</span>
                        </div>}
                      {selectedPosition.contractEnd && <div className="flex justify-between">
                          <span className="text-gray-600">合同结束:</span>
                          <span className="text-gray-900">{selectedPosition.contractEnd}</span>
                        </div>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>}
    </div>;
}