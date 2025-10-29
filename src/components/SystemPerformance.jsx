// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Select, Badge, useToast, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui';
// @ts-ignore;
import { Activity, Zap, Clock, Users, Server, Database, TrendingUp, TrendingDown, AlertTriangle, CheckCircle } from 'lucide-react';

// @ts-ignore;
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
export function SystemPerformance({
  $w,
  className,
  style
}) {
  const {
    toast
  } = useToast();
  const [selectedPeriod, setSelectedPeriod] = useState('1hour');
  const [selectedMetric, setSelectedMetric] = useState('all');
  const [performanceData, setPerformanceData] = useState({});
  const [systemStatus, setSystemStatus] = useState({});
  const mockPerformanceData = {
    overview: {
      avgResponseTime: 1.2,
      maxResponseTime: 3.8,
      minResponseTime: 0.3,
      totalRequests: 45680,
      errorRate: 0.02,
      throughput: 127,
      concurrentUsers: 234,
      cpuUsage: 65,
      memoryUsage: 78,
      diskUsage: 45
    },
    responseTimeTrend: [{
      time: '14:00',
      avgTime: 1.1,
      maxTime: 2.8,
      minTime: 0.4,
      requests: 1200
    }, {
      time: '14:15',
      avgTime: 1.3,
      maxTime: 3.2,
      minTime: 0.5,
      requests: 1350
    }, {
      time: '14:30',
      avgTime: 1.5,
      maxTime: 3.8,
      minTime: 0.6,
      requests: 1420
    }, {
      time: '14:45',
      avgTime: 1.2,
      maxTime: 2.9,
      minTime: 0.3,
      requests: 1280
    }, {
      time: '15:00',
      avgTime: 1.0,
      maxTime: 2.5,
      minTime: 0.4,
      requests: 1180
    }, {
      time: '15:15',
      avgTime: 1.1,
      maxTime: 2.7,
      minTime: 0.3,
      requests: 1250
    }, {
      time: '15:30',
      avgTime: 1.2,
      maxTime: 3.0,
      minTime: 0.4,
      requests: 1300
    }],
    throughputTrend: [{
      time: '14:00',
      requests: 1200,
      users: 180,
      errors: 24
    }, {
      time: '14:15',
      requests: 1350,
      users: 195,
      errors: 27
    }, {
      time: '14:30',
      requests: 1420,
      users: 210,
      errors: 28
    }, {
      time: '14:45',
      requests: 1280,
      users: 190,
      errors: 26
    }, {
      time: '15:00',
      requests: 1180,
      users: 175,
      errors: 23
    }, {
      time: '15:15',
      requests: 1250,
      users: 185,
      errors: 25
    }, {
      time: '15:30',
      requests: 1300,
      users: 192,
      errors: 26
    }],
    resourceUsage: [{
      time: '14:00',
      cpu: 58,
      memory: 72,
      disk: 44,
      network: 65
    }, {
      time: '14:15',
      cpu: 62,
      memory: 75,
      disk: 45,
      network: 68
    }, {
      time: '14:30',
      cpu: 68,
      memory: 78,
      disk: 45,
      network: 72
    }, {
      time: '14:45',
      cpu: 65,
      memory: 76,
      disk: 45,
      network: 70
    }, {
      time: '15:00',
      cpu: 60,
      memory: 74,
      disk: 45,
      network: 66
    }, {
      time: '15:15',
      cpu: 63,
      memory: 75,
      disk: 45,
      network: 67
    }, {
      time: '15:30',
      cpu: 65,
      memory: 78,
      disk: 45,
      network: 69
    }],
    endpointPerformance: [{
      endpoint: '/api/search',
      avgTime: 1.2,
      requests: 15420,
      errorRate: 0.01
    }, {
      endpoint: '/api/retrieve',
      avgTime: 0.8,
      requests: 12350,
      errorRate: 0.02
    }, {
      endpoint: '/api/evaluate',
      avgTime: 2.1,
      requests: 8760,
      errorRate: 0.03
    }, {
      endpoint: '/api/index',
      avgTime: 3.5,
      requests: 2340,
      errorRate: 0.05
    }, {
      endpoint: '/api/health',
      avgTime: 0.2,
      requests: 6810,
      errorRate: 0.00
    }]
  };
  const mockSystemStatus = {
    database: {
      status: 'healthy',
      connections: 45,
      maxConnections: 100,
      responseTime: 0.8
    },
    cache: {
      status: 'healthy',
      hitRate: 0.92,
      memoryUsage: 67,
      evictionRate: 0.05
    },
    search: {
      status: 'degraded',
      indexSize: '2.3GB',
      queryTime: 1.5,
      indexHealth: 'yellow'
    },
    queue: {
      status: 'healthy',
      pendingJobs: 12,
      processingJobs: 3,
      failedJobs: 0
    }
  };
  useEffect(() => {
    setPerformanceData(mockPerformanceData);
    setSystemStatus(mockSystemStatus);
  }, []);
  const getStatusBadge = status => {
    const statusConfig = {
      healthy: {
        color: 'bg-green-100 text-green-800',
        icon: CheckCircle,
        text: '健康'
      },
      degraded: {
        color: 'bg-yellow-100 text-yellow-800',
        icon: AlertTriangle,
        text: '降级'
      },
      unhealthy: {
        color: 'bg-red-100 text-red-800',
        icon: AlertTriangle,
        text: '异常'
      }
    };
    const config = statusConfig[status] || statusConfig.healthy;
    const Icon = config.icon;
    return <Badge className={config.color}>
        <Icon className="w-3 h-3 mr-1" />
        {config.text}
      </Badge>;
  };
  const handleExportReport = () => {
    toast({
      title: "导出报告",
      description: "正在生成性能监控报告..."
    });
  };
  const handleRefresh = () => {
    toast({
      title: "刷新数据",
      description: "正在刷新性能数据..."
    });
  };
  return <div className={className} style={style}>
      <div className="space-y-6">
        {/* 头部 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">系统性能监控</h1>
            <p className="text-gray-600">实时监控系统响应时间、并发量和资源使用情况</p>
          </div>
          <div className="flex items-center space-x-2">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5min">5分钟</SelectItem>
                <SelectItem value="15min">15分钟</SelectItem>
                <SelectItem value="1hour">1小时</SelectItem>
                <SelectItem value="6hours">6小时</SelectItem>
                <SelectItem value="24hours">24小时</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedMetric} onValueChange={setSelectedMetric}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="选择指标" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部指标</SelectItem>
                <SelectItem value="response">响应时间</SelectItem>
                <SelectItem value="throughput">吞吐量</SelectItem>
                <SelectItem value="errors">错误率</SelectItem>
                <SelectItem value="resources">资源使用</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={handleRefresh}>
              <Activity className="w-4 h-4 mr-2" />
              刷新
            </Button>
            <Button variant="outline" onClick={handleExportReport}>
              <TrendingUp className="w-4 h-4 mr-2" />
              导出报告
            </Button>
          </div>
        </div>

        {/* 概览统计 */}
        <div className="grid grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">平均响应时间</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {performanceData.overview?.avgResponseTime || 0}s
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Zap className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">吞吐量</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {performanceData.overview?.throughput || 0}/s
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">并发用户</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {performanceData.overview?.concurrentUsers || 0}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Server className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">CPU使用率</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {performanceData.overview?.cpuUsage || 0}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 性能趋势图表 */}
        <div className="grid grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>响应时间趋势</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={performanceData.responseTimeTrend || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="avgTime" stroke="#3B82F6" name="平均响应时间" strokeWidth={2} />
                  <Line type="monotone" dataKey="maxTime" stroke="#EF4444" name="最大响应时间" strokeWidth={2} />
                  <Line type="monotone" dataKey="minTime" stroke="#10B981" name="最小响应时间" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>吞吐量和并发用户</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={performanceData.throughputTrend || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="requests" stroke="#3B82F6" fill="#93BBFC" name="请求数" />
                  <Area type="monotone" dataKey="users" stroke="#10B981" fill="#86EFAC" name="并发用户" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* 资源使用情况 */}
        <Card>
          <CardHeader>
            <CardTitle>资源使用情况</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={performanceData.resourceUsage || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="cpu" stroke="#EF4444" fill="#FCA5A5" name="CPU使用率" />
                <Area type="monotone" dataKey="memory" stroke="#3B82F6" fill="#93BBFC" name="内存使用率" />
                <Area type="monotone" dataKey="disk" stroke="#10B981" fill="#86EFAC" name="磁盘使用率" />
                <Area type="monotone" dataKey="network" stroke="#F59E0B" fill="#FCD34D" name="网络使用率" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* 端点性能和系统状态 */}
        <div className="grid grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>端点性能</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {performanceData.endpointPerformance?.map(endpoint => <div key={endpoint.endpoint} className="border rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{endpoint.endpoint}</h4>
                      <Badge variant="outline">{endpoint.requests} 请求</Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div>
                        <span className="text-gray-600">响应时间:</span>
                        <span className="ml-1 font-medium">{endpoint.avgTime}s</span>
                      </div>
                      <div>
                        <span className="text-gray-600">错误率:</span>
                        <span className="ml-1 font-medium">{(endpoint.errorRate * 100).toFixed(2)}%</span>
                      </div>
                      <div>
                        <span className="text-gray-600">QPS:</span>
                        <span className="ml-1 font-medium">{(endpoint.requests / 3600).toFixed(1)}</span>
                      </div>
                    </div>
                  </div>)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>系统组件状态</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(systemStatus).map(([component, status]) => <div key={component} className="border rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900 capitalize">{component}</h4>
                      {getStatusBadge(status.status)}
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      {Object.entries(status).filter(([key]) => key !== 'status').map(([key, value]) => <div key={key}>
                          <span className="text-gray-600 capitalize">{key}:</span>
                          <span className="ml-1 font-medium">
                            {typeof value === 'number' ? value.toFixed(2) : value}
                          </span>
                        </div>)}
                    </div>
                  </div>)}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>;
}