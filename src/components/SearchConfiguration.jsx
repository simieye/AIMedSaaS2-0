// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Select, Badge, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, useToast, SelectTrigger, SelectValue, SelectContent, SelectItem, Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui';
// @ts-ignore;
import { Search, Settings, Play, Pause, Save, RotateCcw, BarChart3, Sliders, Target, Zap, Database, Brain, Filter } from 'lucide-react';

export function SearchConfiguration({
  $w,
  className,
  style
}) {
  const {
    toast
  } = useToast();
  const [activeTab, setActiveTab] = useState('algorithms');
  const [algorithms, setAlgorithms] = useState([]);
  const [configs, setConfigs] = useState([]);
  const [tests, setTests] = useState([]);
  const mockAlgorithms = [{
    id: 'ALG001',
    name: 'BM25检索',
    type: 'lexical',
    status: 'active',
    description: '基于BM25算法的词汇检索，适用于精确匹配查询',
    parameters: {
      k1: 1.2,
      b: 0.75,
      epsilon: 0.25
    },
    performance: {
      precision: 0.82,
      recall: 0.75,
      f1Score: 0.78,
      avgResponseTime: 120
    },
    lastUpdated: '2024-01-15'
  }, {
    id: 'ALG002',
    name: '向量相似度检索',
    type: 'semantic',
    status: 'active',
    description: '基于向量嵌入的语义检索，能够理解查询意图',
    parameters: {
      model: 'text-embedding-ada-002',
      similarityThreshold: 0.7,
      topK: 10
    },
    performance: {
      precision: 0.88,
      recall: 0.82,
      f1Score: 0.85,
      avgResponseTime: 200
    },
    lastUpdated: '2024-01-18'
  }, {
    id: 'ALG003',
    name: '混合检索',
    type: 'hybrid',
    status: 'testing',
    description: '结合词汇检索和语义检索的混合方法',
    parameters: {
      lexicalWeight: 0.4,
      semanticWeight: 0.6,
      fusionMethod: 'rrf'
    },
    performance: {
      precision: 0.91,
      recall: 0.87,
      f1Score: 0.89,
      avgResponseTime: 250
    },
    lastUpdated: '2024-01-20'
  }];
  const mockConfigs = [{
    id: 'CFG001',
    name: '默认检索配置',
    algorithm: 'ALG002',
    status: 'active',
    description: '系统默认的检索配置，适用于大多数查询场景',
    settings: {
      maxResults: 10,
      minSimilarity: 0.7,
      enableRerank: true,
      enableFilter: true
    },
    usage: {
      totalQueries: 15420,
      avgResponseTime: 180,
      successRate: 0.95
    },
    createdAt: '2024-01-01',
    lastUsed: '2024-01-20'
  }, {
    id: 'CFG002',
    name: '精确匹配配置',
    algorithm: 'ALG001',
    status: 'inactive',
    description: '适用于需要精确匹配的专业查询场景',
    settings: {
      maxResults: 20,
      minSimilarity: 0.9,
      enableRerank: false,
      enableFilter: true
    },
    usage: {
      totalQueries: 3280,
      avgResponseTime: 110,
      successRate: 0.92
    },
    createdAt: '2024-01-05',
    lastUsed: '2024-01-18'
  }];
  const mockTests = [{
    id: 'TEST001',
    name: '算法对比测试',
    status: 'completed',
    algorithms: ['ALG001', 'ALG002', 'ALG003'],
    testSet: 'medical_qa_1000',
    startDate: '2024-01-15',
    endDate: '2024-01-17',
    results: {
      bestAlgorithm: 'ALG003',
      avgPrecision: 0.87,
      avgRecall: 0.81,
      avgF1Score: 0.84
    }
  }, {
    id: 'TEST002',
    name: '参数优化测试',
    status: 'running',
    algorithms: ['ALG002'],
    testSet: 'clinical_guidelines_500',
    startDate: '2024-01-20',
    endDate: null,
    results: null
  }];
  useEffect(() => {
    setAlgorithms(mockAlgorithms);
    setConfigs(mockConfigs);
    setTests(mockTests);
  }, []);
  const getStatusBadge = status => {
    const statusConfig = {
      active: {
        color: 'bg-green-100 text-green-800',
        text: '活跃'
      },
      inactive: {
        color: 'bg-gray-100 text-gray-800',
        text: '未激活'
      },
      testing: {
        color: 'bg-yellow-100 text-yellow-800',
        text: '测试中'
      },
      completed: {
        color: 'bg-blue-100 text-blue-800',
        text: '已完成'
      },
      running: {
        color: 'bg-purple-100 text-purple-800',
        text: '运行中'
      }
    };
    const config = statusConfig[status] || statusConfig.inactive;
    return <Badge className={config.color}>{config.text}</Badge>;
  };
  const getTypeBadge = type => {
    const typeConfig = {
      lexical: {
        color: 'bg-blue-100 text-blue-800',
        text: '词汇检索'
      },
      semantic: {
        color: 'bg-purple-100 text-purple-800',
        text: '语义检索'
      },
      hybrid: {
        color: 'bg-green-100 text-green-800',
        text: '混合检索'
      }
    };
    const config = typeConfig[type] || typeConfig.lexical;
    return <Badge className={config.color}>{config.text}</Badge>;
  };
  const handleToggleAlgorithm = algorithmId => {
    setAlgorithms(prev => prev.map(alg => alg.id === algorithmId ? {
      ...alg,
      status: alg.status === 'active' ? 'inactive' : 'active'
    } : alg));
    toast({
      title: "状态切换",
      description: `算法 ${algorithmId} 状态已更新`
    });
  };
  const handleEditConfig = configId => {
    toast({
      title: "编辑配置",
      description: `正在编辑配置 ${configId}`
    });
  };
  const handleRunTest = testId => {
    toast({
      title: "运行测试",
      description: `正在运行测试 ${testId}`
    });
  };
  const handleViewResults = testId => {
    toast({
      title: "查看结果",
      description: `正在查看测试 ${testId} 的结果`
    });
  };
  return <div className={className} style={style}>
      <div className="space-y-6">
        {/* 头部 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">检索配置</h1>
            <p className="text-gray-600">配置检索算法、参数调优和性能测试</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline">
              <RotateCcw className="w-4 h-4 mr-2" />
              重置配置
            </Button>
            <Button>
              <Save className="w-4 h-4 mr-2" />
              保存配置
            </Button>
          </div>
        </div>

        {/* 配置标签页 */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="algorithms" className="flex items-center space-x-2">
              <Brain className="w-4 h-4" />
              <span>检索算法</span>
            </TabsTrigger>
            <TabsTrigger value="configs" className="flex items-center space-x-2">
              <Settings className="w-4 h-4" />
              <span>检索配置</span>
            </TabsTrigger>
            <TabsTrigger value="tests" className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4" />
              <span>性能测试</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="algorithms">
            <div className="space-y-6">
              {/* 算法列表 */}
              <Card>
                <CardHeader>
                  <CardTitle>检索算法管理</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>算法名称</TableHead>
                        <TableHead>类型</TableHead>
                        <TableHead>描述</TableHead>
                        <TableHead>精确率</TableHead>
                        <TableHead>召回率</TableHead>
                        <TableHead>F1分数</TableHead>
                        <TableHead>响应时间</TableHead>
                        <TableHead>状态</TableHead>
                        <TableHead>操作</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {algorithms.map(alg => <TableRow key={alg.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium text-gray-900">{alg.name}</div>
                              <div className="text-sm text-gray-500">ID: {alg.id}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            {getTypeBadge(alg.type)}
                          </TableCell>
                          <TableCell>
                            <div className="text-gray-900 max-w-xs truncate">{alg.description}</div>
                          </TableCell>
                          <TableCell>
                            <div className="text-gray-900">{(alg.performance.precision * 100).toFixed(1)}%</div>
                          </TableCell>
                          <TableCell>
                            <div className="text-gray-900">{(alg.performance.recall * 100).toFixed(1)}%</div>
                          </TableCell>
                          <TableCell>
                            <div className="text-gray-900">{(alg.performance.f1Score * 100).toFixed(1)}%</div>
                          </TableCell>
                          <TableCell>
                            <div className="text-gray-900">{alg.performance.avgResponseTime}ms</div>
                          </TableCell>
                          <TableCell>
                            {getStatusBadge(alg.status)}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Button variant="ghost" size="sm" onClick={() => handleToggleAlgorithm(alg.id)}>
                                {alg.status === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Sliders className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>)}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="configs">
            <div className="space-y-6">
              {/* 配置列表 */}
              <Card>
                <CardHeader>
                  <CardTitle>检索配置管理</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>配置名称</TableHead>
                        <TableHead>算法</TableHead>
                        <TableHead>描述</TableHead>
                        <TableHead>查询次数</TableHead>
                        <TableHead>平均响应时间</TableHead>
                        <TableHead>成功率</TableHead>
                        <TableHead>状态</TableHead>
                        <TableHead>操作</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {configs.map(config => <TableRow key={config.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium text-gray-900">{config.name}</div>
                              <div className="text-sm text-gray-500">ID: {config.id}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-gray-900">{config.algorithm}</div>
                          </TableCell>
                          <TableCell>
                            <div className="text-gray-900 max-w-xs truncate">{config.description}</div>
                          </TableCell>
                          <TableCell>
                            <div className="text-gray-900">{config.usage.totalQueries.toLocaleString()}</div>
                          </TableCell>
                          <TableCell>
                            <div className="text-gray-900">{config.usage.avgResponseTime}ms</div>
                          </TableCell>
                          <TableCell>
                            <div className="text-gray-900">{(config.usage.successRate * 100).toFixed(1)}%</div>
                          </TableCell>
                          <TableCell>
                            {getStatusBadge(config.status)}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Button variant="ghost" size="sm" onClick={() => handleEditConfig(config.id)}>
                                <Settings className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Target className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>)}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="tests">
            <div className="space-y-6">
              {/* 测试列表 */}
              <Card>
                <CardHeader>
                  <CardTitle>性能测试管理</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>测试名称</TableHead>
                        <TableHead>状态</TableHead>
                        <TableHead>测试算法</TableHead>
                        <TableHead>测试集</TableHead>
                        <TableHead>开始时间</TableHead>
                        <TableHead>结束时间</TableHead>
                        <TableHead>最佳算法</TableHead>
                        <TableHead>操作</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {tests.map(test => <TableRow key={test.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium text-gray-900">{test.name}</div>
                              <div className="text-sm text-gray-500">ID: {test.id}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            {getStatusBadge(test.status)}
                          </TableCell>
                          <TableCell>
                            <div className="text-gray-900">{test.algorithms.join(', ')}</div>
                          </TableCell>
                          <TableCell>
                            <div className="text-gray-900">{test.testSet}</div>
                          </TableCell>
                          <TableCell>
                            <div className="text-gray-900">{test.startDate}</div>
                          </TableCell>
                          <TableCell>
                            <div className="text-gray-900">{test.endDate || '-'}</div>
                          </TableCell>
                          <TableCell>
                            <div className="text-gray-900">{test.results?.bestAlgorithm || '-'}</div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              {test.status === 'completed' ? <Button variant="ghost" size="sm" onClick={() => handleViewResults(test.id)}>
                                  <BarChart3 className="w-4 h-4" />
                                </Button> : <Button variant="ghost" size="sm" onClick={() => handleRunTest(test.id)}>
                                  <Play className="w-4 h-4" />
                                </Button>}
                            </div>
                          </TableCell>
                        </TableRow>)}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>;
}