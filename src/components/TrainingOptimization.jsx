// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Badge, Progress, Alert, AlertDescription } from '@/components/ui';
// @ts-ignore;
import { Zap, Settings, TrendingUp, Cpu, Memory, Clock, Target, Lightbulb, AlertTriangle, CheckCircle, BarChart3, RefreshCw } from 'lucide-react';

// @ts-ignore;
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
// @ts-ignore;

export function TrainingOptimization({
  experiments,
  performanceData
}) {
  const [selectedExperiment, setSelectedExperiment] = useState('all');
  const [optimizationType, setOptimizationType] = useState('hyperparameter');
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizationProgress, setOptimizationProgress] = useState(0);
  const [suggestions, setSuggestions] = useState([]);
  const optimizationTypes = [{
    value: 'hyperparameter',
    label: '超参数优化',
    description: '自动调整学习率、批大小等超参数'
  }, {
    value: 'architecture',
    label: '架构优化',
    description: '优化模型结构和层数配置'
  }, {
    value: 'data',
    label: '数据优化',
    description: '优化数据预处理和增强策略'
  }, {
    value: 'resource',
    label: '资源优化',
    description: '优化GPU使用和内存分配'
  }];
  const generateOptimizationSuggestions = () => {
    const mockSuggestions = [{
      type: 'hyperparameter',
      title: '学习率调整建议',
      description: '当前学习率可能导致收敛缓慢，建议调整为 2e-5',
      impact: 'high',
      estimated_improvement: '+15%',
      confidence: 0.85
    }, {
      type: 'architecture',
      title: '模型层数优化',
      description: '减少2层Transformer层可提升训练速度30%，准确率损失<1%',
      impact: 'medium',
      estimated_improvement: '+8%',
      confidence: 0.72
    }, {
      type: 'data',
      title: '数据增强策略',
      description: '添加回译和同义词替换可提升模型泛化能力',
      impact: 'medium',
      estimated_improvement: '+12%',
      confidence: 0.78
    }, {
      type: 'resource',
      title: '批大小优化',
      description: '将批大小从16增加到32可提升GPU利用率',
      impact: 'low',
      estimated_improvement: '+5%',
      confidence: 0.65
    }];
    setSuggestions(mockSuggestions);
  };
  const runOptimization = async () => {
    setIsOptimizing(true);
    setOptimizationProgress(0);

    // 模拟优化过程
    for (let i = 0; i <= 100; i += 5) {
      await new Promise(resolve => setTimeout(resolve, 100));
      setOptimizationProgress(i);
    }
    setIsOptimizing(false);
    generateOptimizationSuggestions();
  };
  const getOptimizationData = () => {
    const data = [];
    for (let i = 0; i < 20; i++) {
      data.push({
        iteration: i + 1,
        current_accuracy: 0.75 + Math.random() * 0.1,
        optimized_accuracy: 0.80 + Math.random() * 0.1,
        current_loss: 0.5 - Math.random() * 0.2,
        optimized_loss: 0.4 - Math.random() * 0.2
      });
    }
    return data;
  };
  const getResourceUsageData = () => {
    return [{
      resource: 'GPU利用率',
      current: 65,
      optimized: 85,
      unit: '%'
    }, {
      resource: '内存使用',
      current: 8,
      optimized: 6,
      unit: 'GB'
    }, {
      resource: '训练时间',
      current: 120,
      optimized: 90,
      unit: '分钟'
    }, {
      resource: '能耗',
      current: 100,
      optimized: 75,
      unit: 'kWh'
    }];
  };
  const getPerformanceRadarData = () => {
    return [{
      aspect: '训练速度',
      current: 65,
      optimized: 85
    }, {
      aspect: '模型精度',
      current: 82,
      optimized: 88
    }, {
      aspect: '资源效率',
      current: 70,
      optimized: 90
    }, {
      aspect: '稳定性',
      current: 75,
      optimized: 85
    }, {
      aspect: '泛化能力',
      current: 78,
      optimized: 86
    }, {
      aspect: '收敛速度',
      current: 60,
      optimized: 80
    }];
  };
  const getImpactColor = impact => {
    const colors = {
      high: 'bg-red-100 text-red-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-green-100 text-green-800'
    };
    return colors[impact] || colors.low;
  };
  const getImpactLabel = impact => {
    const labels = {
      high: '高影响',
      medium: '中影响',
      low: '低影响'
    };
    return labels[impact] || labels.low;
  };
  const optimizationData = getOptimizationData();
  const resourceData = getResourceUsageData();
  const radarData = getPerformanceRadarData();
  const selectedOptimizationType = optimizationTypes.find(t => t.value === optimizationType) || optimizationTypes[0];
  return <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">训练优化</h2>
          <p className="text-muted-foreground">AI驱动的训练过程优化建议</p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={runOptimization} disabled={isOptimizing}>
            {isOptimizing ? <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> : <Zap className="h-4 w-4 mr-2" />}
            {isOptimizing ? '优化中...' : '开始优化'}
          </Button>
        </div>
      </div>

      {/* 优化进度 */}
      {isOptimizing && <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <RefreshCw className="h-6 w-6 animate-spin text-blue-500" />
              <div className="flex-1">
                <div className="flex justify-between text-sm mb-1">
                  <span>优化进度</span>
                  <span>{optimizationProgress}%</span>
                </div>
                <Progress value={optimizationProgress} />
              </div>
            </div>
          </CardContent>
        </Card>}

      {/* 优化类型选择 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">优化类型</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {optimizationTypes.map(type => <div key={type.value} className={`p-4 border rounded-lg cursor-pointer transition-colors ${optimizationType === type.value ? 'border-blue-500 bg-blue-50' : 'hover:border-gray-300'}`} onClick={() => setOptimizationType(type.value)}>
                <div className="flex items-center mb-2">
                  <Settings className="h-4 w-4 mr-2" />
                  <h3 className="font-medium">{type.label}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{type.description}</p>
              </div>)}
          </div>
        </CardContent>
      </Card>

      {/* 优化效果对比 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">训练效果对比</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={optimizationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="iteration" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="current_accuracy" stroke="#ef4444" name="当前准确率" />
                <Line type="monotone" dataKey="optimized_accuracy" stroke="#10b981" name="优化后准确率" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">资源使用对比</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={resourceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="resource" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="current" fill="#ef4444" name="当前" />
                <Bar dataKey="optimized" fill="#10b981" name="优化后" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* 性能雷达图 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">综合性能提升</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="aspect" />
              <PolarRadiusAxis angle={90} domain={[0, 100]} />
              <Radar name="当前性能" dataKey="current" stroke="#ef4444" fill="#ef4444" fillOpacity={0.1} />
              <Radar name="优化后性能" dataKey="optimized" stroke="#10b981" fill="#10b981" fillOpacity={0.1} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* 优化建议 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center">
            <Lightbulb className="h-4 w-4 mr-2" />
            智能优化建议
          </CardTitle>
        </CardHeader>
        <CardContent>
          {suggestions.length === 0 ? <div className="text-center py-8">
              <AlertTriangle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">暂无优化建议</h3>
              <p className="text-muted-foreground">点击"开始优化"按钮获取AI驱动的优化建议</p>
            </div> : <div className="space-y-4">
              {suggestions.map((suggestion, index) => <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h4 className="font-medium mb-1">{suggestion.title}</h4>
                      <p className="text-sm text-muted-foreground">{suggestion.description}</p>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <Badge className={getImpactColor(suggestion.impact)}>
                        {getImpactLabel(suggestion.impact)}
                      </Badge>
                      <div className="text-sm font-medium text-green-600">
                        {suggestion.estimated_improvement}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>置信度: {(suggestion.confidence * 100).toFixed(1)}%</span>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="outline">
                        应用建议
                      </Button>
                      <Button size="sm" variant="ghost">
                        查看详情
                      </Button>
                    </div>
                  </div>
                </div>)}
            </div>}
        </CardContent>
      </Card>

      {/* 优化统计 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 mr-3 text-green-500" />
              <div>
                <p className="text-2xl font-bold">+18%</p>
                <p className="text-sm text-muted-foreground">预期准确率提升</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Clock className="h-8 w-8 mr-3 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">-25%</p>
                <p className="text-sm text-muted-foreground">训练时间减少</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Cpu className="h-8 w-8 mr-3 text-purple-500" />
              <div>
                <p className="text-2xl font-bold">+30%</p>
                <p className="text-sm text-muted-foreground">GPU利用率提升</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Memory className="h-8 w-8 mr-3 text-orange-500" />
              <div>
                <p className="text-2xl font-bold">-20%</p>
                <p className="text-sm text-muted-foreground">内存使用减少</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>;
}