// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Select, Badge, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, useToast, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui';
// @ts-ignore;
import { Search, Play, Save, Download, Eye, BarChart3, Settings, RefreshCw, CheckCircle, AlertCircle, Clock, TrendingUp, Target } from 'lucide-react';

// @ts-ignore;
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
export function RetrievalTesting({
  $w,
  onTest,
  className,
  style
}) {
  const {
    toast
  } = useToast();
  const [testQuery, setTestQuery] = useState('');
  const [selectedModel, setSelectedModel] = useState('default');
  const [selectedDataset, setSelectedDataset] = useState('medical_qa');
  const [testResults, setTestResults] = useState([]);
  const [testHistory, setTestHistory] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [currentTest, setCurrentTest] = useState(null);
  const mockTestResults = [{
    query: '心血管疾病的治疗方法有哪些？',
    response: '心血管疾病的治疗方法包括药物治疗、介入治疗和手术治疗等...',
    sources: ['心血管疾病诊疗指南2024版', '内科学教材第9版', '柳叶刀心血管专刊'],
    relevanceScore: 0.92,
    accuracy: 0.88,
    completeness: 0.85,
    responseTime: 1.2,
    timestamp: '2024-02-20 10:30:00'
  }, {
    query: '糖尿病的早期症状是什么？',
    response: '糖尿病的早期症状包括多饮、多尿、多食、体重下降等...',
    sources: ['糖尿病管理手册', 'WHO糖尿病指南', '中华内分泌杂志'],
    relevanceScore: 0.89,
    accuracy: 0.91,
    completeness: 0.82,
    responseTime: 0.8,
    timestamp: '2024-02-20 10:25:00'
  }];
  const mockTestHistory = [{
    id: 'TEST001',
    name: '心血管疾病问答测试',
    model: 'default',
    dataset: 'cardiology_qa',
    totalQueries: 50,
    avgRelevance: 0.87,
    avgAccuracy: 0.84,
    avgResponseTime: 1.1,
    status: 'completed',
    createdAt: '2024-02-19 15:30:00',
    completedAt: '2024-02-19 15:45:00'
  }, {
    id: 'TEST002',
    name: '全科室综合测试',
    model: 'gpt-4',
    dataset: 'medical_qa',
    totalQueries: 100,
    avgRelevance: 0.91,
    avgAccuracy: 0.89,
    avgResponseTime: 1.5,
    status: 'completed',
    createdAt: '2024-02-18 09:00:00',
    completedAt: '2024-02-18 09:25:00'
  }];
  const models = [{
    value: 'default',
    label: '默认模型'
  }, {
    value: 'gpt-3.5',
    label: 'GPT-3.5'
  }, {
    value: 'gpt-4',
    label: 'GPT-4'
  }, {
    value: 'claude',
    label: 'Claude'
  }];
  const datasets = [{
    value: 'medical_qa',
    label: '医学问答数据集'
  }, {
    value: 'cardiology_qa',
    label: '心血管问答集'
  }, {
    value: 'endocrinology_qa',
    label: '内分泌问答集'
  }, {
    value: 'oncology_qa',
    label: '肿瘤问答集'
  }];
  const performanceData = [{
    metric: '相关性',
    current: 0.87,
    baseline: 0.82,
    target: 0.90
  }, {
    metric: '准确性',
    current: 0.84,
    baseline: 0.78,
    target: 0.85
  }, {
    metric: '完整性',
    current: 0.82,
    baseline: 0.75,
    target: 0.80
  }, {
    metric: '响应速度',
    current: 0.78,
    baseline: 0.70,
    target: 0.85
  }];
  const radarData = [{
    subject: '相关性',
    A: 87,
    B: 82,
    fullMark: 100
  }, {
    subject: '准确性',
    A: 84,
    B: 78,
    fullMark: 100
  }, {
    subject: '完整性',
    A: 82,
    B: 75,
    fullMark: 100
  }, {
    subject: '响应速度',
    A: 78,
    B: 70,
    fullMark: 100
  }, {
    subject: '引用质量',
    A: 85,
    B: 80,
    fullMark: 100
  }];
  useEffect(() => {
    setTestResults(mockTestResults);
    setTestHistory(mockTestHistory);
  }, []);
  const getStatusBadge = status => {
    const statusConfig = {
      completed: {
        color: 'bg-green-100 text-green-800',
        icon: CheckCircle,
        text: '已完成'
      },
      running: {
        color: 'bg-blue-100 text-blue-800',
        icon: Clock,
        text: '运行中'
      },
      failed: {
        color: 'bg-red-100 text-red-800',
        icon: AlertCircle,
        text: '失败'
      }
    };
    const config = statusConfig[status] || statusConfig.running;
    const Icon = config.icon;
    return <Badge className={config.color}>
        <Icon className="w-3 h-3 mr-1" />
        {config.text}
      </Badge>;
  };
  const handleSingleTest = () => {
    if (!testQuery.trim()) {
      toast({
        title: "请输入测试查询",
        description: "测试查询不能为空",
        variant: "destructive"
      });
      return;
    }
    setIsRunning(true);
    // 模拟测试过程
    setTimeout(() => {
      const newResult = {
        query: testQuery,
        response: '这是针对查询的模拟回答...',
        sources: ['相关文献1', '相关文献2', '相关文献3'],
        relevanceScore: Math.random() * 0.3 + 0.7,
        accuracy: Math.random() * 0.3 + 0.7,
        completeness: Math.random() * 0.3 + 0.7,
        responseTime: Math.random() * 2 + 0.5,
        timestamp: new Date().toISOString()
      };
      setTestResults(prev => [newResult, ...prev]);
      setIsRunning(false);
      if (onTest) {
        onTest({
          query: testQuery,
          model: selectedModel
        });
      }
      toast({
        title: "测试完成",
        description: "单次测试已完成，请查看结果"
      });
    }, 2000);
  };
  const handleBatchTest = () => {
    setIsRunning(true);
    setCurrentTest({
      name: `批量测试 - ${new Date().toLocaleString()}`,
      model: selectedModel,
      dataset: selectedDataset,
      startTime: new Date()
    });
    // 模拟批量测试
    setTimeout(() => {
      const newTest = {
        id: `TEST${Date.now()}`,
        name: currentTest.name,
        model: selectedModel,
        dataset: selectedDataset,
        totalQueries: Math.floor(Math.random() * 50) + 50,
        avgRelevance: Math.random() * 0.2 + 0.8,
        avgAccuracy: Math.random() * 0.2 + 0.8,
        avgResponseTime: Math.random() * 1 + 0.5,
        status: 'completed',
        createdAt: currentTest.startTime.toISOString(),
        completedAt: new Date().toISOString()
      };
      setTestHistory(prev => [newTest, ...prev]);
      setIsRunning(false);
      setCurrentTest(null);
      toast({
        title: "批量测试完成",
        description: `已完成 ${newTest.totalQueries} 个查询的测试`
      });
    }, 5000);
  };
  const handleViewDetails = resultId => {
    toast({
      title: "查看详情",
      description: `正在查看测试结果 ${resultId} 的详细信息`
    });
  };
  const handleExportResults = () => {
    toast({
      title: "导出结果",
      description: "正在导出测试结果..."
    });
  };
  const handleSaveTest = () => {
    toast({
      title: "保存测试",
      description: "测试配置已保存"
    });
  };
  return <div className={className} style={style}>
      <div className="space-y-6">
        {/* 测试配置 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Search className="w-5 h-5 mr-2" />
              检索测试配置
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* 单次测试 */}
              <div className="border rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3">单次查询测试</h4>
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <Input placeholder="输入测试查询..." value={testQuery} onChange={e => setTestQuery(e.target.value)} />
                  </div>
                  <Select value={selectedModel} onValueChange={setSelectedModel}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {models.map(model => <SelectItem key={model.value} value={model.value}>
                          {model.label}
                        </SelectItem>)}
                    </SelectContent>
                  </Select>
                  <Button onClick={handleSingleTest} disabled={isRunning}>
                    <Play className="w-4 h-4 mr-2" />
                    {isRunning ? '测试中...' : '开始测试'}
                  </Button>
                </div>
              </div>

              {/* 批量测试 */}
              <div className="border rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3">批量测试</h4>
                <div className="grid grid-cols-3 gap-4">
                  <Select value={selectedModel} onValueChange={setSelectedModel}>
                    <SelectTrigger>
                      <SelectValue placeholder="选择模型" />
                    </SelectTrigger>
                    <SelectContent>
                      {models.map(model => <SelectItem key={model.value} value={model.value}>
                          {model.label}
                        </SelectItem>)}
                    </SelectContent>
                  </Select>
                  <Select value={selectedDataset} onValueChange={setSelectedDataset}>
                    <SelectTrigger>
                      <SelectValue placeholder="选择数据集" />
                    </SelectTrigger>
                    <SelectContent>
                      {datasets.map(dataset => <SelectItem key={dataset.value} value={dataset.value}>
                          {dataset.label}
                      </SelectItem>)}
                    </SelectContent>
                  </Select>
                  <Button onClick={handleBatchTest} disabled={isRunning}>
                    <Play className="w-4 h-4 mr-2" />
                    {isRunning ? '测试中...' : '批量测试'}
                  </Button>
                </div>
              </div>

              {/* 操作按钮 */}
              <div className="flex items-center space-x-2">
                <Button variant="outline" onClick={handleSaveTest}>
                  <Save className="w-4 h-4 mr-2" />
                  保存配置
                </Button>
                <Button variant="outline">
                  <Settings className="w-4 h-4 mr-2" />
                  高级设置
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 性能分析 */}
        <div className="grid grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>性能指标对比</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="metric" />
                  <YAxis domain={[0, 1]} />
                  <Tooltip formatter={value => [`${(value * 100).toFixed(0)}%`, '']} />
                  <Legend />
                  <Bar dataKey="current" fill="#3B82F6" name="当前性能" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="baseline" fill="#93BBFC" name="基线性能" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="target" fill="#10B981" name="目标性能" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>综合性能雷达图</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} />
                  <Radar name="当前模型" dataKey="A" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
                  <Radar name="基线模型" dataKey="B" stroke="#93BBFC" fill="#93BBFC" fillOpacity={0.6} />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* 测试结果 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>测试结果</span>
              <Button variant="outline" size="sm" onClick={handleExportResults}>
                <Download className="w-4 h-4 mr-2" />
                导出结果
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {testResults.map((result, index) => <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 mb-2">查询: {result.query}</h4>
                      <p className="text-gray-700 text-sm mb-2">{result.response}</p>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {result.sources.map((source, idx) => <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                            {source}
                          </span>)}
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => handleViewDetails(`result_${index}`)}>
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">相关性:</span>
                      <span className="ml-1 font-medium">{(result.relevanceScore * 100).toFixed(0)}%</span>
                    </div>
                    <div>
                      <span className="text-gray-600">准确性:</span>
                      <span className="ml-1 font-medium">{(result.accuracy * 100).toFixed(0)}%</span>
                    </div>
                    <div>
                      <span className="text-gray-600">完整性:</span>
                      <span className="ml-1 font-medium">{(result.completeness * 100).toFixed(0)}%</span>
                    </div>
                    <div>
                      <span className="text-gray-600">响应时间:</span>
                      <span className="ml-1 font-medium">{result.responseTime}s</span>
                    </div>
                  </div>
                </div>)}
            </div>
          </CardContent>
        </Card>

        {/* 测试历史 */}
        <Card>
          <CardHeader>
            <CardTitle>测试历史</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>测试名称</TableHead>
                  <TableHead>模型</TableHead>
                  <TableHead>数据集</TableHead>
                  <TableHead>查询数</TableHead>
                  <TableHead>平均相关性</TableHead>
                  <TableHead>平均准确性</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead>完成时间</TableHead>
                  <TableHead>操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {testHistory.map(test => <TableRow key={test.id}>
                    <TableCell>
                      <div className="font-medium text-gray-900">{test.name}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-gray-900">{test.model}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-gray-900">{test.dataset}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-gray-900">{test.totalQueries}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-gray-900">{(test.avgRelevance * 100).toFixed(0)}%</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-gray-900">{(test.avgAccuracy * 100).toFixed(0)}%</div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(test.status)}
                    </TableCell>
                    <TableCell>
                      <div className="text-gray-900">{test.completedAt}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => handleViewDetails(test.id)}>
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4" />
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