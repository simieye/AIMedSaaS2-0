// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Select, Badge, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, useToast, SelectTrigger, SelectValue, SelectContent, SelectItem, Switch } from '@/components/ui';
// @ts-ignore;
import { Database, Settings, RefreshCw, Plus, Edit, Trash2, Eye, Clock, CheckCircle, AlertCircle, Globe, FileText, Link, Zap } from 'lucide-react';

export function KnowledgeBaseConfig({
  $w,
  className,
  style
}) {
  const {
    toast
  } = useToast();
  const [dataSources, setDataSources] = useState([]);
  const [updateStrategies, setUpdateStrategies] = useState([]);
  const [loading, setLoading] = useState(false);
  const mockDataSources = [{
    id: 'DS001',
    name: 'PubMed医学文献数据库',
    type: 'api',
    url: 'https://pubmed.ncbi.nlm.nih.gov/',
    status: 'active',
    lastSync: '2024-01-15 14:30:00',
    syncFrequency: 'daily',
    totalRecords: 125000,
    indexedRecords: 118500,
    description: '美国国家医学图书馆的生物医学文献数据库',
    config: {
      apiKey: 'encrypted_key_***',
      queryLimit: 1000,
      timeout: 30000
    }
  }, {
    id: 'DS002',
    name: 'CNKI中国知网',
    type: 'crawler',
    url: 'https://www.cnki.net/',
    status: 'active',
    lastSync: '2024-01-15 02:00:00',
    syncFrequency: 'weekly',
    totalRecords: 89000,
    indexedRecords: 85600,
    description: '中国最大的学术文献数据库',
    config: {
      crawlDepth: 3,
      maxPages: 100,
      delay: 2000
    }
  }, {
    id: 'DS003',
    name: '本地PDF文献库',
    type: 'local',
    url: '/data/literature/',
    status: 'active',
    lastSync: '2024-01-15 10:15:00',
    syncFrequency: 'manual',
    totalRecords: 45000,
    indexedRecords: 44500,
    description: '本地存储的PDF格式医学文献',
    config: {
      path: '/data/literature/',
      supportedFormats: ['pdf', 'doc', 'docx'],
      maxSize: '50MB'
    }
  }, {
    id: 'DS004',
    name: '临床试验数据库',
    type: 'api',
    url: 'https://clinicaltrials.gov/',
    status: 'inactive',
    lastSync: '2024-01-10 16:45:00',
    syncFrequency: 'monthly',
    totalRecords: 32000,
    indexedRecords: 28900,
    description: '美国国立卫生研究院临床试验数据库',
    config: {
      apiKey: 'encrypted_key_***',
      regions: ['US', 'EU', 'Asia'],
      phases: ['Phase 1', 'Phase 2', 'Phase 3']
    }
  }];
  const mockUpdateStrategies = [{
    id: 'US001',
    name: '增量更新策略',
    type: 'incremental',
    status: 'active',
    schedule: '0 2 * * *',
    description: '只更新新增或修改的文献，提高更新效率',
    config: {
      batchSize: 1000,
      maxRetries: 3,
      conflictResolution: 'latest'
    }
  }, {
    id: 'US002',
    name: '全量更新策略',
    type: 'full',
    status: 'inactive',
    schedule: '0 3 1 * *',
    description: '每月1号进行全量更新，确保数据完整性',
    config: {
      batchSize: 500,
      maxRetries: 5,
      conflictResolution: 'merge'
    }
  }, {
    id: 'US003',
    name: '智能更新策略',
    type: 'smart',
    status: 'active',
    schedule: '0 */6 * * *',
    description: '基于文献重要性和更新频率智能调度',
    config: {
      priorityThreshold: 0.8,
      batchSize: 800,
      maxRetries: 3,
      conflictResolution: 'weighted'
    }
  }];
  useEffect(() => {
    setDataSources(mockDataSources);
    setUpdateStrategies(mockUpdateStrategies);
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
      error: {
        color: 'bg-red-100 text-red-800',
        icon: AlertCircle,
        text: '错误'
      }
    };
    const config = statusConfig[status] || statusConfig.inactive;
    const Icon = config.icon;
    return <Badge className={config.color}>
        <Icon className="w-3 h-3 mr-1" />
        {config.text}
      </Badge>;
  };
  const getTypeIcon = type => {
    const iconMap = {
      api: Globe,
      crawler: Link,
      local: FileText,
      database: Database
    };
    return iconMap[type] || Database;
  };
  const handleSyncDataSource = dataSourceId => {
    setDataSources(prev => prev.map(ds => ds.id === dataSourceId ? {
      ...ds,
      status: 'active'
    } : ds));
    toast({
      title: "同步数据源",
      description: `正在同步数据源 ${dataSourceId}`
    });
  };
  const handleEditDataSource = dataSourceId => {
    toast({
      title: "编辑数据源",
      description: `正在编辑数据源 ${dataSourceId}`
    });
  };
  const handleDeleteDataSource = dataSourceId => {
    setDataSources(prev => prev.filter(ds => ds.id !== dataSourceId));
    toast({
      title: "删除成功",
      description: `数据源 ${dataSourceId} 已删除`,
      variant: "destructive"
    });
  };
  const handleToggleStrategy = strategyId => {
    setUpdateStrategies(prev => prev.map(strategy => strategy.id === strategyId ? {
      ...strategy,
      status: strategy.status === 'active' ? 'inactive' : 'active'
    } : strategy));
    toast({
      title: "策略状态更新",
      description: `更新策略 ${strategyId} 状态已更改`
    });
  };
  const handleEditStrategy = strategyId => {
    toast({
      title: "编辑策略",
      description: `正在编辑更新策略 ${strategyId}`
    });
  };
  const handleTestConnection = dataSourceId => {
    toast({
      title: "测试连接",
      description: `正在测试数据源 ${dataSourceId} 的连接...`
    });
  };
  return <div className={className} style={style}>
      <div className="space-y-6">
        {/* 头部 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">知识库配置</h1>
            <p className="text-gray-600">管理数据源和更新策略，确保知识库数据的及时性和准确性</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              全量同步
            </Button>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              添加数据源
            </Button>
          </div>
        </div>

        {/* 数据源管理 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Database className="w-5 h-5 mr-2" />
              数据源管理
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>名称</TableHead>
                  <TableHead>类型</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead>总记录数</TableHead>
                  <TableHead>已索引</TableHead>
                  <TableHead>同步频率</TableHead>
                  <TableHead>最后同步</TableHead>
                  <TableHead>操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dataSources.map(dataSource => {
                const Icon = getTypeIcon(dataSource.type);
                return <TableRow key={dataSource.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Icon className="w-5 h-5 text-gray-400" />
                        <div>
                          <div className="font-medium text-gray-900">{dataSource.name}</div>
                          <div className="text-sm text-gray-500">{dataSource.description}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{dataSource.type}</Badge>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(dataSource.status)}
                    </TableCell>
                    <TableCell>
                      <div className="text-gray-900">{dataSource.totalRecords.toLocaleString()}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-gray-900">{dataSource.indexedRecords.toLocaleString()}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-gray-900">{dataSource.syncFrequency}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-gray-900">{dataSource.lastSync}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => handleSyncDataSource(dataSource.id)}>
                          <RefreshCw className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleTestConnection(dataSource.id)}>
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleEditDataSource(dataSource.id)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteDataSource(dataSource.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>;
              })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* 更新策略管理 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="w-5 h-5 mr-2" />
              更新策略管理
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {updateStrategies.map(strategy => <div key={strategy.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-3">
                        <Zap className="w-5 h-5 text-gray-400" />
                        <div>
                          <h4 className="font-medium text-gray-900">{strategy.name}</h4>
                          <p className="text-sm text-gray-500">{strategy.description}</p>
                        </div>
                      </div>
                      <Badge variant="outline">{strategy.type}</Badge>
                      {getStatusBadge(strategy.status)}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch checked={strategy.status === 'active'} onCheckedChange={() => handleToggleStrategy(strategy.id)} />
                      <Button variant="ghost" size="sm" onClick={() => handleEditStrategy(strategy.id)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="mt-3 grid grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">调度时间:</span>
                      <span className="ml-2 font-medium">{strategy.schedule}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">批次大小:</span>
                      <span className="ml-2 font-medium">{strategy.config.batchSize}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">最大重试:</span>
                      <span className="ml-2 font-medium">{strategy.config.maxRetries}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">冲突解决:</span>
                      <span className="ml-2 font-medium">{strategy.config.conflictResolution}</span>
                    </div>
                  </div>
                </div>)}
            </div>
          </CardContent>
        </Card>

        {/* 系统配置 */}
        <Card>
          <CardHeader>
            <CardTitle>系统配置</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-4">索引配置</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">自动索引</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">实时更新</span>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">增量索引</span>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-4">性能配置</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">并发处理数</span>
                    <Input type="number" defaultValue="5" className="w-20" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">超时时间(秒)</span>
                    <Input type="number" defaultValue="30" className="w-20" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">重试次数</span>
                    <Input type="number" defaultValue="3" className="w-20" />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>;
}