// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Badge, useToast, Tabs, TabsContent, TabsList, TabsTrigger, Legend } from '@/components/ui';
// @ts-ignore;
import { Activity, Cpu, HardDrive, Database, Zap, AlertTriangle, CheckCircle, Clock, TrendingUp, TrendingDown, Server, Wifi, Thermometer, RefreshCw } from 'lucide-react';

// @ts-ignore;
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
export function SystemMonitoring({
  $w,
  className,
  style
}) {
  const {
    toast
  } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [systemMetrics, setSystemMetrics] = useState({});
  const [alerts, setAlerts] = useState([]);
  const [performanceData, setPerformanceData] = useState([]);
  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];
  const mockSystemMetrics = {
    cpu: {
      usage: 65.2,
      cores: 16,
      temperature: 42.5,
      loadAverage: [2.1, 2.3, 2.0]
    },
    memory: {
      total: 65536,
      used: 42188,
      available: 23348,
      usage: 64.4
    },
    disk: {
      total: 2048,
      used: 1432,
      available: 616,
      usage: 69.9
    },
    network: {
      inbound: 125.6,
      outbound: 89.3,
      latency: 12.5,
      bandwidth: 1000
    },
    database: {
      connections: 45,
      maxConnections: 100,
      queryTime: 85.2,
      indexHitRate: 94.6
    },
    vectorDb: {
      dimensions: 1536,
      totalVectors: 2580000,
      indexSize: 15.6,
      queryTime: 120.5,
      accuracy: 0.92
    }
  };
  const mockAlerts = [{
    id: 'ALT001',
    type: 'warning',
    title: 'CPU使用率过高',
    description: 'CPU使用率持续超过80%，建议检查系统负载',
    timestamp: '2024-01-20 14:30:00',
    severity: 'medium',
    status: 'active'
  }, {
    id: 'ALT002',
    type: 'error',
    title: '向量数据库连接异常',
    description: '向量数据库响应时间超过500ms，可能影响检索性能',
    timestamp: '2024-01-20 14:25:00',
    severity: 'high',
    status: 'active'
  }, {
    id: 'ALT003',
    type: 'info',
    title: '系统自动扩容',
    description: '系统检测到负载增加，已自动扩容至2个实例',
    timestamp: '2024-01-20 13:45:00',
    severity: 'low',
    status: 'resolved'
  }];
  const mockPerformanceData = [{
    time: '00:00',
    cpu: 45.2,
    memory: 58.7,
    disk: 65.3,
    network: 78.9,
    queries: 1250
  }, {
    time: '04:00',
    cpu: 38.5,
    memory: 52.1,
    disk: 65.4,
    network: 45.2,
    queries: 890
  }, {
    time: '08:00',
    cpu: 72.8,
    memory: 68.9,
    disk: 66.1,
    network: 89.5,
    queries: 2450
  }, {
    time: '12:00',
    cpu: 85.3,
    memory: 74.2,
    disk: 67.8,
    network: 95.2,
    queries: 3200
  }, {
    time: '16:00',
    cpu: 78.9,
    memory: 71.5,
    disk: 68.2,
    network: 87.6,
    queries: 2890
  }, {
    time: '20:00',
    cpu: 62.4,
    memory: 64.8,
    disk: 68.5,
    network: 76.3,
    queries: 1980
  }];
  useEffect(() => {
    setSystemMetrics(mockSystemMetrics);
    setAlerts(mockAlerts);
    setPerformanceData(mockPerformanceData);
  }, []);
  const getSeverityBadge = severity => {
    const severityConfig = {
      low: {
        color: 'bg-blue-100 text-blue-800',
        text: '低'
      },
      medium: {
        color: 'bg-yellow-100 text-yellow-800',
        text: '中'
      },
      high: {
        color: 'bg-red-100 text-red-800',
        text: '高'
      },
      critical: {
        color: 'bg-purple-100 text-purple-800',
        text: '严重'
      }
    };
    const config = severityConfig[severity] || severityConfig.low;
    return <Badge className={config.color}>{config.text}</Badge>;
  };
  const getStatusIcon = status => {
    return status === 'active' ? <AlertTriangle className="w-4 h-4 text-red-500" /> : <CheckCircle className="w-4 h-4 text-green-500" />;
  };
  const formatBytes = bytes => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };
  const handleRefresh = () => {
    toast({
      title: "刷新数据",
      description: "正在刷新系统监控数据..."
    });
  };
  const handleResolveAlert = alertId => {
    setAlerts(prev => prev.map(alert => alert.id === alertId ? {
      ...alert,
      status: 'resolved'
    } : alert));
    toast({
      title: "告警已解决",
      description: `告警 ${alertId} 已标记为已解决`
    });
  };
  const resourceUsage = [{
    name: 'CPU',
    value: systemMetrics.cpu?.usage || 0,
    color: '#3B82F6'
  }, {
    name: '内存',
    value: systemMetrics.memory?.usage || 0,
    color: '#10B981'
  }, {
    name: '磁盘',
    value: systemMetrics.disk?.usage || 0,
    color: '#F59E0B'
  }, {
    name: '网络',
    value: systemMetrics.network?.inbound / 10 || 0,
    color: '#EF4444'
  }];
  return <div className={className} style={style}>
      <div className="space-y-6">
        {/* 头部 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">系统监控</h1>
            <p className="text-gray-600">实时监控RAG系统运行状态和性能指标</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={handleRefresh}>
              <RefreshCw className="w-4 h-4 mr-2" />
              刷新数据
            </Button>
          </div>
        </div>

        {/* 监控标签页 */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <Activity className="w-4 h-4" />
              <span>总览</span>
            </TabsTrigger>
            <TabsTrigger value="performance" className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4" />
              <span>性能</span>
            </TabsTrigger>
            <TabsTrigger value="resources" className="flex items-center space-x-2">
              <Server className="w-4 h-4" />
              <span>资源</span>
            </TabsTrigger>
            <TabsTrigger value="alerts" className="flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4" />
              <span>告警</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="space-y-6">
              {/* 系统状态卡片 */}
              <div className="grid grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Cpu className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">CPU使用率</p>
                        <p className="text-2xl font-bold text-gray-900">{systemMetrics.cpu?.usage.toFixed(1)}%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <Database className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">内存使用率</p>
                        <p className="text-2xl font-bold text-gray-900">{systemMetrics.memory?.usage.toFixed(1)}%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-yellow-100 rounded-lg">
                        <HardDrive className="w-6 h-6 text-yellow-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">磁盘使用率</p>
                        <p className="text-2xl font-bold text-gray-900">{systemMetrics.disk?.usage.toFixed(1)}%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <Wifi className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">网络延迟</p>
                        <p className="text-2xl font-bold text-gray-900">{systemMetrics.network?.latency.toFixed(1)}ms</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* 资源使用饼图 */}
              <div className="grid grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>资源使用分布</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie data={resourceUsage} cx="50%" cy="50%" labelLine={false} label={({
                        name,
                        value
                      }) => `${name}: ${value.toFixed(1)}%`} outerRadius={80} fill="#8884d8" dataKey="value">
                          {resourceUsage.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>数据库状态</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">连接数</span>
                        <span className="font-medium text-gray-900">{systemMetrics.database?.connections}/{systemMetrics.database?.maxConnections}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">查询时间</span>
                        <span className="font-medium text-gray-900">{systemMetrics.database?.queryTime.toFixed(1)}ms</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">索引命中率</span>
                        <span className="font-medium text-gray-900">{systemMetrics.database?.indexHitRate.toFixed(1)}%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">向量数量</span>
                        <span className="font-medium text-gray-900">{systemMetrics.vectorDb?.totalVectors.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">向量查询时间</span>
                        <span className="font-medium text-gray-900">{systemMetrics.vectorDb?.queryTime.toFixed(1)}ms</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">检索准确率</span>
                        <span className="font-medium text-gray-900">{(systemMetrics.vectorDb?.accuracy * 100).toFixed(1)}%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="performance">
            <div className="space-y-6">
              {/* 性能趋势图 */}
              <Card>
                <CardHeader>
                  <CardTitle>24小时性能趋势</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="cpu" stroke="#3B82F6" name="CPU使用率" strokeWidth={2} />
                      <Line type="monotone" dataKey="memory" stroke="#10B981" name="内存使用率" strokeWidth={2} />
                      <Line type="monotone" dataKey="queries" stroke="#F59E0B" name="查询数量" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* 查询性能统计 */}
              <div className="grid grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>查询性能统计</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">平均查询时间</span>
                        <span className="font-medium text-gray-900">125.5ms</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">P95查询时间</span>
                        <span className="font-medium text-gray-900">280.3ms</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">P99查询时间</span>
                        <span className="font-medium text-gray-900">450.7ms</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">今日查询总数</span>
                        <span className="font-medium text-gray-900">12,580</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">成功率</span>
                        <span className="font-medium text-green-600">99.2%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>向量检索性能</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">向量维度</span>
                        <span className="font-medium text-gray-900">{systemMetrics.vectorDb?.dimensions}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">索引大小</span>
                        <span className="font-medium text-gray-900">{systemMetrics.vectorDb?.indexSize}GB</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">平均检索时间</span>
                        <span className="font-medium text-gray-900">{systemMetrics.vectorDb?.queryTime.toFixed(1)}ms</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">检索准确率</span>
                        <span className="font-medium text-gray-900">{(systemMetrics.vectorDb?.accuracy * 100).toFixed(1)}%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">召回率</span>
                        <span className="font-medium text-gray-900">87.3%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="resources">
            <div className="space-y-6">
              {/* 资源使用详情 */}
              <div className="grid grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Cpu className="w-5 h-5 mr-2" />
                      CPU资源
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">使用率</span>
                        <span className="font-medium text-gray-900">{systemMetrics.cpu?.usage.toFixed(1)}%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">核心数</span>
                        <span className="font-medium text-gray-900">{systemMetrics.cpu?.cores}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">温度</span>
                        <span className="font-medium text-gray-900">{systemMetrics.cpu?.temperature.toFixed(1)}°C</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">负载均衡</span>
                        <span className="font-medium text-gray-900">{systemMetrics.cpu?.loadAverage.join(', ')}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Database className="w-5 h-5 mr-2" />
                      内存资源
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">总内存</span>
                        <span className="font-medium text-gray-900">{formatBytes(systemMetrics.memory?.total * 1024 * 1024)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">已使用</span>
                        <span className="font-medium text-gray-900">{formatBytes(systemMetrics.memory?.used * 1024 * 1024)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">可用内存</span>
                        <span className="font-medium text-gray-900">{formatBytes(systemMetrics.memory?.available * 1024 * 1024)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">使用率</span>
                        <span className="font-medium text-gray-900">{systemMetrics.memory?.usage.toFixed(1)}%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <HardDrive className="w-5 h-5 mr-2" />
                      磁盘资源
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">总容量</span>
                        <span className="font-medium text-gray-900">{formatBytes(systemMetrics.disk?.total * 1024 * 1024 * 1024)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">已使用</span>
                        <span className="font-medium text-gray-900">{formatBytes(systemMetrics.disk?.used * 1024 * 1024 * 1024)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">可用空间</span>
                        <span className="font-medium text-gray-900">{formatBytes(systemMetrics.disk?.available * 1024 * 1024 * 1024)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">使用率</span>
                        <span className="font-medium text-gray-900">{systemMetrics.disk?.usage.toFixed(1)}%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Wifi className="w-5 h-5 mr-2" />
                      网络资源
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">入站流量</span>
                        <span className="font-medium text-gray-900">{systemMetrics.network?.inbound.toFixed(1)}MB/s</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">出站流量</span>
                        <span className="font-medium text-gray-900">{systemMetrics.network?.outbound.toFixed(1)}MB/s</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">网络延迟</span>
                        <span className="font-medium text-gray-900">{systemMetrics.network?.latency.toFixed(1)}ms</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">带宽</span>
                        <span className="font-medium text-gray-900">{systemMetrics.network?.bandwidth}Mbps</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="alerts">
            <div className="space-y-6">
              {/* 告警列表 */}
              <Card>
                <CardHeader>
                  <CardTitle>系统告警</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {alerts.map(alert => <div key={alert.id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-3">
                            {getStatusIcon(alert.status)}
                            <div>
                              <h4 className="font-medium text-gray-900">{alert.title}</h4>
                              <p className="text-sm text-gray-600 mt-1">{alert.description}</p>
                              <div className="flex items-center space-x-4 mt-2">
                                <span className="text-sm text-gray-500">{alert.timestamp}</span>
                                {getSeverityBadge(alert.severity)}
                              </div>
                            </div>
                          </div>
                          {alert.status === 'active' && <Button variant="outline" size="sm" onClick={() => handleResolveAlert(alert.id)}>
                              标记解决
                            </Button>}
                        </div>
                      </div>)}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>;
}