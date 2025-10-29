// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Badge, Progress, Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Label, Alert, AlertDescription } from '@/components/ui';
// @ts-ignore;
import { GitCompare, Play, Pause, Square, Eye, Settings, Trash2, Plus, TrendingUp, TrendingDown, Users, Clock, Target, BarChart3, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

// @ts-ignore;
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
// @ts-ignore;

export function ABTestManager({
  abTests,
  experiments,
  onCreateTest
}) {
  const [selectedTest, setSelectedTest] = useState(null);
  const [showCreateTest, setShowCreateTest] = useState(false);
  const [showTestDetails, setShowTestDetails] = useState(false);
  const [newTest, setNewTest] = useState({
    name: '',
    description: '',
    model_a: '',
    model_b: '',
    traffic_split: 50,
    duration: 7,
    metrics: ['accuracy', 'latency', 'user_satisfaction']
  });
  const getTestStatus = status => {
    const statusInfo = {
      running: {
        label: '运行中',
        color: 'bg-blue-100 text-blue-800',
        icon: <Play className="h-3 w-3" />
      },
      completed: {
        label: '已完成',
        color: 'bg-green-100 text-green-800',
        icon: <CheckCircle className="h-3 w-3" />
      },
      paused: {
        label: '已暂停',
        color: 'bg-yellow-100 text-yellow-800',
        icon: <Pause className="h-3 w-3" />
      },
      failed: {
        label: '失败',
        color: 'bg-red-100 text-red-800',
        icon: <XCircle className="h-3 w-3" />
      }
    };
    return statusInfo[status] || statusInfo.running;
  };
  const getWinner = test => {
    if (!test.results) return null;
    const modelA = test.results[test.models[0]];
    const modelB = test.results[test.models[1]];
    if (!modelA || !modelB) return null;

    // 简单的胜出判断逻辑
    let scoreA = 0;
    let scoreB = 0;
    test.metrics.forEach(metric => {
      if (metric === 'latency') {
        // 延迟越低越好
        if (modelA[metric] < modelB[metric]) scoreA++;else scoreB++;
      } else {
        // 其他指标越高越好
        if (modelA[metric] > modelB[metric]) scoreA++;else scoreB++;
      }
    });
    return scoreA > scoreB ? test.models[0] : scoreB > scoreA ? test.models[1] : 'tie';
  };
  const getConfidenceLevel = test => {
    if (!test.results) return 0;
    const modelA = test.results[test.models[0]];
    const modelB = test.results[test.models[1]];
    if (!modelA || !modelB) return 0;

    // 简化的置信度计算
    const diff = Math.abs(modelA.accuracy - modelB.accuracy);
    return Math.min(95, diff * 100);
  };
  const getTestProgress = test => {
    const start = new Date(test.start_time);
    const end = new Date(test.end_time);
    const now = new Date();
    const total = end - start;
    const elapsed = now - start;
    return Math.min(100, Math.max(0, elapsed / total * 100));
  };
  const generateTestData = test => {
    const data = [];
    const days = Math.ceil((new Date(test.end_time) - new Date(test.start_time)) / (1000 * 60 * 60 * 24));
    for (let i = 0; i < days; i++) {
      const date = new Date(test.start_time);
      date.setDate(date.getDate() + i);
      data.push({
        date: date.toLocaleDateString(),
        [test.models[0]]: 0.8 + Math.random() * 0.15,
        [test.models[1]]: 0.82 + Math.random() * 0.13,
        requests_a: Math.floor(Math.random() * 100) + 50,
        requests_b: Math.floor(Math.random() * 100) + 50
      });
    }
    return data;
  };
  const handleCreateTest = () => {
    // 这里应该调用API创建测试
    setShowCreateTest(false);
    onCreateTest && onCreateTest();
  };
  const handleStartTest = testId => {
    // 启动测试逻辑
    console.log('启动测试:', testId);
  };
  const handlePauseTest = testId => {
    // 暂停测试逻辑
    console.log('暂停测试:', testId);
  };
  const handleStopTest = testId => {
    // 停止测试逻辑
    console.log('停止测试:', testId);
  };
  const handleDeleteTest = testId => {
    // 删除测试逻辑
    console.log('删除测试:', testId);
  };
  const formatMetricValue = (metric, value) => {
    if (metric === 'latency') {
      return `${(value || 0).toFixed(0)}ms`;
    } else if (metric === 'user_satisfaction') {
      return `${(value || 0).toFixed(1)}/5`;
    } else if (metric === 'throughput') {
      return `${(value || 0).toFixed(0)} req/s`;
    } else {
      return `${((value || 0) * 100).toFixed(1)}%`;
    }
  };
  return <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">A/B测试管理</h2>
          <p className="text-muted-foreground">管理和监控模型A/B测试</p>
        </div>
        <Button onClick={() => setShowCreateTest(true)}>
          <Plus className="h-4 w-4 mr-2" />
          创建测试
        </Button>
      </div>

      {/* 测试概览 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <GitCompare className="h-8 w-8 mr-3 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">{abTests.length}</p>
                <p className="text-sm text-muted-foreground">总测试数</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Play className="h-8 w-8 mr-3 text-green-500" />
              <div>
                <p className="text-2xl font-bold">{abTests.filter(t => t.status === 'running').length}</p>
                <p className="text-sm text-muted-foreground">运行中</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 mr-3 text-purple-500" />
              <div>
                <p className="text-2xl font-bold">{abTests.filter(t => t.status === 'completed').length}</p>
                <p className="text-sm text-muted-foreground">已完成</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Users className="h-8 w-8 mr-3 text-orange-500" />
              <div>
                <p className="text-2xl font-bold">
                  {abTests.reduce((sum, t) => sum + (t.results ? Object.values(t.results).reduce((s, r) => s + (r.requests || 0), 0) : 0), 0).toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground">总请求数</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 测试列表 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {abTests.map(test => {
        const statusInfo = getTestStatus(test.status);
        const winner = getWinner(test);
        const confidence = getConfidenceLevel(test);
        const progress = getTestProgress(test);
        const testData = generateTestData(test);
        return <Card key={test.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">{test.name}</CardTitle>
                <Badge className={statusInfo.color}>
                  {statusInfo.icon}
                  {statusInfo.label}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* 测试进度 */}
                {test.status === 'running' && <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>测试进度</span>
                      <span>{progress.toFixed(1)}%</span>
                    </div>
                    <Progress value={progress} />
                  </div>}
                
                {/* 模型对比 */}
                <div className="grid grid-cols-2 gap-4">
                  {test.models.map((model, index) => {
                  const modelResults = test.results?.[model] || {};
                  const isWinner = winner === model;
                  return <div key={model} className={`p-3 border rounded-lg ${isWinner ? 'border-green-500 bg-green-50' : ''}`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">{model}</span>
                        {isWinner && <Badge className="bg-green-100 text-green-800">
                            胜出
                          </Badge>}
                      </div>
                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between">
                          <span>准确率:</span>
                          <span>{((modelResults.accuracy || 0) * 100).toFixed(1)}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>延迟:</span>
                          <span>{(modelResults.latency || 0).toFixed(0)}ms</span>
                        </div>
                        <div className="flex justify-between">
                          <span>请求:</span>
                          <span>{(modelResults.requests || 0).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>;
                })}
                </div>
                
                {/* 置信度 */}
                {test.status === 'completed' && <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>统计置信度</span>
                      <span>{confidence.toFixed(1)}%</span>
                    </div>
                    <Progress value={confidence} className="h-2" />
                  </div>}
                
                {/* 操作按钮 */}
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" onClick={() => {
                  setSelectedTest(test);
                  setShowTestDetails(true);
                }}>
                    <Eye className="h-3 w-3 mr-1" />
                    详情
                  </Button>
                  {test.status === 'running' && <Button size="sm" variant="outline" onClick={() => handlePauseTest(test.id)}>
                      <Pause className="h-3 w-3 mr-1" />
                      暂停
                    </Button>}
                  {test.status === 'paused' && <Button size="sm" variant="outline" onClick={() => handleStartTest(test.id)}>
                      <Play className="h-3 w-3 mr-1" />
                      继续
                    </Button>}
                  {test.status === 'running' && <Button size="sm" variant="outline" onClick={() => handleStopTest(test.id)}>
                      <Square className="h-3 w-3 mr-1" />
                      停止
                    </Button>}
                  <Button size="sm" variant="outline" onClick={() => handleDeleteTest(test.id)}>
                    <Trash2 className="h-3 w-3 mr-1" />
                    删除
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>;
      })}
      </div>

      {/* 创建测试对话框 */}
      <Dialog open={showCreateTest} onOpenChange={setShowCreateTest}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>创建A/B测试</DialogTitle>
            <DialogDescription>
              设置新的模型A/B测试来比较不同模型的性能
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="test-name">测试名称</Label>
              <Input id="test-name" value={newTest.name} onChange={e => setNewTest(prev => ({
              ...prev,
              name: e.target.value
            }))} placeholder="输入测试名称" />
            </div>
            
            <div>
              <Label htmlFor="test-description">描述</Label>
              <Input id="test-description" value={newTest.description} onChange={e => setNewTest(prev => ({
              ...prev,
              description: e.target.value
            }))} placeholder="输入测试描述" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="model-a">模型A</Label>
                <Select value={newTest.model_a} onValueChange={value => setNewTest(prev => ({
                ...prev,
                model_a: value
              }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="选择模型A" />
                  </SelectTrigger>
                  <SelectContent>
                    {experiments.map(exp => <SelectItem key={exp._id} value={exp._id}>
                        {exp.name}
                      </SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="model-b">模型B</Label>
                <Select value={newTest.model_b} onValueChange={value => setNewTest(prev => ({
                ...prev,
                model_b: value
              }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="选择模型B" />
                  </SelectTrigger>
                  <SelectContent>
                    {experiments.map(exp => <SelectItem key={exp._id} value={exp._id}>
                        {exp.name}
                      </SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="traffic-split">流量分配 (%)</Label>
                <Input id="traffic-split" type="number" value={newTest.traffic_split} onChange={e => setNewTest(prev => ({
                ...prev,
                traffic_split: parseInt(e.target.value)
              }))} min="1" max="99" />
              </div>
              
              <div>
                <Label htmlFor="duration">测试天数</Label>
                <Input id="duration" type="number" value={newTest.duration} onChange={e => setNewTest(prev => ({
                ...prev,
                duration: parseInt(e.target.value)
              }))} min="1" max="30" />
              </div>
            </div>
            
            <div>
              <Label>评估指标</Label>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {['accuracy', 'latency', 'user_satisfaction', 'throughput', 'error_rate', 'cost'].map(metric => <div key={metric} className="flex items-center space-x-2">
                    <input type="checkbox" id={metric} checked={newTest.metrics.includes(metric)} onChange={e => {
                  if (e.target.checked) {
                    setNewTest(prev => ({
                      ...prev,
                      metrics: [...prev.metrics, metric]
                    }));
                  } else {
                    setNewTest(prev => ({
                      ...prev,
                      metrics: prev.metrics.filter(m => m !== metric)
                    }));
                  }
                }} />
                    <Label htmlFor={metric} className="text-sm">{metric}</Label>
                  </div>)}
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setShowCreateTest(false)}>
              取消
            </Button>
            <Button onClick={handleCreateTest}>
              创建测试
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* 测试详情对话框 */}
      <Dialog open={showTestDetails} onOpenChange={setShowTestDetails}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>测试详情</DialogTitle>
          </DialogHeader>
          {selectedTest && <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* 性能对比图表 */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">性能对比</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={generateTestData(selectedTest)}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey={selectedTest.models[0]} stroke="#3b82f6" name={selectedTest.models[0]} />
                        <Line type="monotone" dataKey={selectedTest.models[1]} stroke="#10b981" name={selectedTest.models[1]} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                
                {/* 请求分布 */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">请求分布</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie data={[{
                      name: selectedTest.models[0],
                      value: selectedTest.results?.[selectedTest.models[0]]?.requests || 0
                    }, {
                      name: selectedTest.models[1],
                      value: selectedTest.results?.[selectedTest.models[1]]?.requests || 0
                    }]} cx="50%" cy="50%" labelLine={false} label={({
                      name,
                      percent
                    }) => `${name} ${(percent * 100).toFixed(0)}%`} outerRadius={80} fill="#8884d8" dataKey="value">
                          <Cell fill="#3b82f6" />
                          <Cell fill="#10b981" />
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
              
              {/* 详细结果 */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">详细结果</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {selectedTest.models.map(model => {
                  const results = selectedTest.results?.[model] || {};
                  const isWinner = getWinner(selectedTest) === model;
                  return <div key={model} className={`p-4 border rounded-lg ${isWinner ? 'border-green-500 bg-green-50' : ''}`}>
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-medium">{model}</h3>
                          {isWinner && <Badge className="bg-green-100 text-green-800">
                              胜出模型
                            </Badge>}
                        </div>
                        <div className="space-y-2">
                          {selectedTest.metrics.map(metric => <div key={metric} className="flex justify-between">
                              <span className="text-sm text-muted-foreground">{metric}:</span>
                              <span className="text-sm font-medium">
                                {formatMetricValue(metric, results[metric])}
                              </span>
                            </div>)}
                        </div>
                      </div>;
                })}
                  </div>
                </CardContent>
              </Card>
            </div>}
        </DialogContent>
      </Dialog>
    </div>;
}