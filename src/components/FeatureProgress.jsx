// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Select, Badge, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, useToast, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui';
// @ts-ignore;
import { Target, Clock, Users, AlertTriangle, CheckCircle, Play, Pause, Edit, Eye, TrendingUp, TrendingDown, BarChart3 } from 'lucide-react';

// @ts-ignore;
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
export function FeatureProgress({
  $w,
  selectedDepartment,
  onUpdateProgress,
  className,
  style
}) {
  const {
    toast
  } = useToast();
  const [selectedFeature, setSelectedFeature] = useState('all');
  const [features, setFeatures] = useState([]);
  const [progressHistory, setProgressHistory] = useState([]);
  const mockFeatures = [{
    id: 'feature-1',
    name: 'AI诊断系统',
    description: '基于深度学习的医学影像诊断系统',
    category: 'AI功能',
    department: 'AI研发部',
    status: 'in_progress',
    progress: 75,
    startDate: '2024-01-01',
    endDate: '2024-03-31',
    assignee: '张团队',
    priority: 'high',
    tasks: {
      total: 20,
      completed: 15,
      inProgress: 4,
      pending: 1
    },
    deliverables: ['模型训练', '系统集成', '测试验证'],
    risks: ['数据质量', '算法准确性'],
    dependencies: ['数据预处理模块'],
    estimatedHours: 1200,
    actualHours: 900
  }, {
    id: 'feature-2',
    name: 'RAG知识库',
    description: '检索增强生成知识库系统',
    category: '知识管理',
    department: 'AI研发部',
    status: 'in_progress',
    progress: 60,
    startDate: '2024-02-01',
    endDate: '2024-04-30',
    assignee: '李团队',
    priority: 'high',
    tasks: {
      total: 15,
      completed: 9,
      inProgress: 5,
      pending: 1
    },
    deliverables: ['文献索引', '检索算法', '答案生成'],
    risks: ['检索准确性', '响应速度'],
    dependencies: ['AI诊断系统'],
    estimatedHours: 800,
    actualHours: 650
  }, {
    id: 'feature-3',
    name: '用户界面优化',
    description: '前端用户界面体验优化',
    category: '前端开发',
    department: '前端部',
    status: 'in_progress',
    progress: 40,
    startDate: '2024-03-01',
    endDate: '2024-05-31',
    assignee: '王团队',
    priority: 'medium',
    tasks: {
      total: 25,
      completed: 10,
      inProgress: 8,
      pending: 7
    },
    deliverables: ['界面设计', '交互优化', '响应式布局'],
    risks: ['兼容性', '性能优化'],
    dependencies: [],
    estimatedHours: 600,
    actualHours: 350
  }, {
    id: 'feature-4',
    name: 'API接口开发',
    description: '后端API接口开发与集成',
    category: '后端开发',
    department: '后端部',
    status: 'pending',
    progress: 20,
    startDate: '2024-04-01',
    endDate: '2024-06-30',
    assignee: '赵团队',
    priority: 'high',
    tasks: {
      total: 18,
      completed: 3,
      inProgress: 2,
      pending: 13
    },
    deliverables: ['RESTful API', '文档编写', '接口测试'],
    risks: ['接口设计', '安全性'],
    dependencies: ['RAG知识库'],
    estimatedHours: 900,
    actualHours: 180
  }];
  const mockProgressHistory = [{
    date: '2024-01-01',
    'AI诊断系统': 0,
    'RAG知识库': 0,
    '用户界面优化': 0,
    'API接口开发': 0
  }, {
    date: '2024-01-15',
    'AI诊断系统': 15,
    'RAG知识库': 0,
    '用户界面优化': 0,
    'API接口开发': 0
  }, {
    date: '2024-02-01',
    'AI诊断系统': 35,
    'RAG知识库': 10,
    '用户界面优化': 0,
    'API接口开发': 0
  }, {
    date: '2024-02-15',
    'AI诊断系统': 50,
    'RAG知识库': 25,
    '用户界面优化': 5,
    'API接口开发': 0
  }, {
    date: '2024-03-01',
    'AI诊断系统': 65,
    'RAG知识库': 40,
    '用户界面优化': 15,
    'API接口开发': 0
  }, {
    date: '2024-03-15',
    'AI诊断系统': 75,
    'RAG知识库': 60,
    '用户界面优化': 40,
    'API接口开发': 20
  }];
  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];
  useEffect(() => {
    setFeatures(mockFeatures);
    setProgressHistory(mockProgressHistory);
  }, []);
  const getStatusBadge = status => {
    const statusConfig = {
      completed: {
        color: 'bg-green-100 text-green-800',
        icon: CheckCircle,
        text: '已完成'
      },
      in_progress: {
        color: 'bg-blue-100 text-blue-800',
        icon: Play,
        text: '进行中'
      },
      pending: {
        color: 'bg-gray-100 text-gray-800',
        icon: Pause,
        text: '待开始'
      },
      delayed: {
        color: 'bg-red-100 text-red-800',
        icon: AlertTriangle,
        text: '延期'
      }
    };
    const config = statusConfig[status] || statusConfig.pending;
    const Icon = config.icon;
    return <Badge className={config.color}>
        <Icon className="w-3 h-3 mr-1" />
        {config.text}
      </Badge>;
  };
  const getPriorityColor = priority => {
    const priorityColors = {
      critical: 'text-red-600',
      high: 'text-orange-600',
      medium: 'text-blue-600',
      low: 'text-green-600'
    };
    return priorityColors[priority] || 'text-gray-600';
  };
  const handleProgressUpdate = (featureId, newProgress) => {
    setFeatures(prev => prev.map(feature => feature.id === featureId ? {
      ...feature,
      progress: newProgress
    } : feature));
    if (onUpdateProgress) {
      onUpdateProgress(featureId, newProgress);
    }
    toast({
      title: "进度更新",
      description: `功能进度已更新为 ${newProgress}%`
    });
  };
  const handleViewDetails = featureId => {
    toast({
      title: "查看详情",
      description: `正在查看功能 ${featureId} 的详细信息`
    });
  };
  const filteredFeatures = features.filter(feature => {
    const matchesDepartment = selectedDepartment === 'all' || feature.department === selectedDepartment;
    const matchesFeature = selectedFeature === 'all' || feature.id === selectedFeature;
    return matchesDepartment && matchesFeature;
  });
  const categoryData = features.reduce((acc, feature) => {
    const existing = acc.find(item => item.category === feature.category);
    if (existing) {
      existing.count += 1;
      existing.avgProgress += feature.progress;
    } else {
      acc.push({
        category: feature.category,
        count: 1,
        avgProgress: feature.progress
      });
    }
    return acc;
  }, []).map(item => ({
    ...item,
    avgProgress: item.avgProgress / item.count
  }));
  const overallProgress = features.length > 0 ? features.reduce((sum, feature) => sum + feature.progress, 0) / features.length : 0;
  const completedFeatures = features.filter(f => f.status === 'completed').length;
  const delayedFeatures = features.filter(f => f.status === 'delayed').length;
  const totalEstimatedHours = features.reduce((sum, feature) => sum + feature.estimatedHours, 0);
  const totalActualHours = features.reduce((sum, feature) => sum + feature.actualHours, 0);
  return <div className={className} style={style}>
      <div className="space-y-6">
        {/* 头部控制 */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">功能进度跟踪</h2>
            <p className="text-gray-600">监控各功能模块的开发进度和状态</p>
          </div>
          <div className="flex items-center space-x-2">
            <Select value={selectedFeature} onValueChange={setSelectedFeature}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="选择功能" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部功能</SelectItem>
                {features.map(feature => <SelectItem key={feature.id} value={feature.id}>
                    {feature.name}
                  </SelectItem>)}
              </SelectContent>
            </Select>
            <Button variant="outline">
              <BarChart3 className="w-4 h-4 mr-2" />
              导出报告
            </Button>
          </div>
        </div>

        {/* 进度统计 */}
        <div className="grid grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Target className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">总功能数</p>
                  <p className="text-2xl font-bold text-gray-900">{features.length}</p>
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
                  <p className="text-sm text-gray-600">已完成</p>
                  <p className="text-2xl font-bold text-gray-900">{completedFeatures}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <AlertTriangle className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">延期风险</p>
                  <p className="text-2xl font-bold text-gray-900">{delayedFeatures}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">整体进度</p>
                  <p className="text-2xl font-bold text-gray-900">{overallProgress.toFixed(0)}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 进度趋势图 */}
        <div className="grid grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>进度趋势</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={progressHistory}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="AI诊断系统" stroke="#3B82F6" strokeWidth={2} />
                  <Line type="monotone" dataKey="RAG知识库" stroke="#10B981" strokeWidth={2} />
                  <Line type="monotone" dataKey="用户界面优化" stroke="#F59E0B" strokeWidth={2} />
                  <Line type="monotone" dataKey="API接口开发" stroke="#EF4444" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>分类进度分布</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={categoryData} cx="50%" cy="50%" labelLine={false} label={({
                  category,
                  avgProgress
                }) => `${category}: ${avgProgress.toFixed(0)}%`} outerRadius={80} fill="#8884d8" dataKey="avgProgress">
                    {categoryData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* 工时统计 */}
        <Card>
          <CardHeader>
            <CardTitle>工时统计</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-4">预估工时 vs 实际工时</h4>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={features}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="estimatedHours" fill="#93BBFC" name="预估工时" />
                    <Bar dataKey="actualHours" fill="#3B82F6" name="实际工时" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="text-gray-600">总预估工时</span>
                  <span className="font-semibold text-gray-900">{totalEstimatedHours}h</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="text-gray-600">总实际工时</span>
                  <span className="font-semibold text-gray-900">{totalActualHours}h</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="text-gray-600">工时效率</span>
                  <span className={`font-semibold ${totalActualHours < totalEstimatedHours ? 'text-green-600' : 'text-red-600'}`}>
                    {((totalEstimatedHours - totalActualHours) / totalEstimatedHours * 100).toFixed(0)}%
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 功能列表 */}
        <Card>
          <CardHeader>
            <CardTitle>功能详情</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>功能名称</TableHead>
                  <TableHead>分类</TableHead>
                  <TableHead>负责人</TableHead>
                  <TableHead>进度</TableHead>
                  <TableHead>任务完成</TableHead>
                  <TableHead>优先级</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead>操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFeatures.map(feature => <TableRow key={feature.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium text-gray-900">{feature.name}</div>
                        <div className="text-sm text-gray-500">{feature.description}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-gray-900">{feature.category}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-gray-900">{feature.assignee}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{
                        width: `${feature.progress}%`
                      }}></div>
                        </div>
                        <span className="text-sm text-gray-900">{feature.progress}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-gray-900">
                        {feature.tasks.completed}/{feature.tasks.total}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`font-medium ${getPriorityColor(feature.priority)}`}>
                        {feature.priority}
                      </span>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(feature.status)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => handleViewDetails(feature.id)}>
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleProgressUpdate(feature.id, Math.min(feature.progress + 10, 100))}>
                          <TrendingUp className="w-4 h-4" />
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