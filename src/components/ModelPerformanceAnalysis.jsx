// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Badge, Progress } from '@/components/ui';
// @ts-ignore;
import { TrendingUp, TrendingDown, Activity, Zap, Clock, Memory, Cpu, Target, Award, AlertTriangle, CheckCircle } from 'lucide-react';

// @ts-ignore;
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ScatterChart, Scatter } from 'recharts';
// @ts-ignore;

export function ModelPerformanceAnalysis({
  experiments,
  performanceData
}) {
  const [selectedMetric, setSelectedMetric] = useState('accuracy');
  const [selectedExperiment, setSelectedExperiment] = useState('all');
  const [comparisonMode, setComparisonMode] = useState('overview');
  const metrics = [{
    key: 'accuracy',
    label: '准确率',
    icon: <Target className="h-4 w-4" />,
    color: '#3b82f6',
    unit: '%'
  }, {
    key: 'precision',
    label: '精确率',
    icon: <Award className="h-4 w-4" />,
    color: '#10b981',
    unit: '%'
  }, {
    key: 'recall',
    label: '召回率',
    icon: <Activity className="h-4 w-4" />,
    color: '#f59e0b',
    unit: '%'
  }, {
    key: 'f1_score',
    label: 'F1分数',
    icon: <CheckCircle className="h-4 w-4" />,
    color: '#8b5cf6',
    unit: '%'
  }, {
    key: 'latency',
    label: '延迟',
    icon: <Clock className="h-4 w-4" />,
    color: '#ef4444',
    unit: 'ms'
  }, {
    key: 'throughput',
    label: '吞吐量',
    icon: <Zap className="h-4 w-4" />,
    color: '#06b6d4',
    unit: 'req/s'
  }, {
    key: 'memory_usage',
    label: '内存使用',
    icon: <Memory className="h-4 w-4" />,
    color: '#84cc16',
    unit: 'MB'
  }, {
    key: 'gpu_utilization',
    label: 'GPU利用率',
    icon: <Cpu className="h-4 w-4" />,
    color: '#f97316',
    unit: '%'
  }];
  const getComparisonData = () => {
    const filteredExperiments = selectedExperiment === 'all' ? experiments : experiments.filter(exp => exp._id === selectedExperiment);
    return filteredExperiments.map(exp => {
      const perf = performanceData[exp._id] || {};
      return {
        name: exp.name,
        model_type: exp.model_type,
        ...perf
      };
    });
  };
  const getRadarData = () => {
    const filteredExperiments = selectedExperiment === 'all' ? experiments.slice(0, 3) : experiments.filter(exp => exp._id === selectedExperiment);
    return filteredExperiments.map(exp => {
      const perf = performanceData[exp._id] || {};
      return {
        experiment: exp.name,
        accuracy: (perf.accuracy || 0) * 100,
        precision: (perf.precision || 0) * 100,
        recall: (perf.recall || 0) * 100,
        f1_score: (perf.f1_score || 0) * 100,
        efficiency: Math.max(0, 100 - (perf.latency || 0) / 2),
        resource_efficiency: Math.max(0, 100 - (perf.memory_usage || 0) / 20)
      };
    });
  };
  const getPerformanceTrend = () => {
    const data = [];
    for (let i = 0; i < 30; i++) {
      data.push({
        epoch: i + 1,
        accuracy: 0.7 + Math.random() * 0.2,
        loss: 1.5 - Math.random() * 0.8,
        f1_score: 0.65 + Math.random() * 0.25
      });
    }
    return data;
  };
  const getBestPerformingModel = metric => {
    const data = getComparisonData();
    return data.reduce((best, current) => {
      const bestValue = best[metric] || 0;
      const currentValue = current[metric] || 0;
      return currentValue > bestValue ? current : best;
    }, data[0] || {});
  };
  const getPerformanceGrade = (value, metric) => {
    const thresholds = {
      accuracy: {
        excellent: 0.9,
        good: 0.8,
        fair: 0.7
      },
      latency: {
        excellent: 50,
        good: 100,
        fair: 200
      },
      throughput: {
        excellent: 200,
        good: 100,
        fair: 50
      }
    };
    const threshold = thresholds[metric] || thresholds.accuracy;
    if (metric === 'latency') {
      if (value <= threshold.excellent) return 'excellent';
      if (value <= threshold.good) return 'good';
      if (value <= threshold.fair) return 'fair';
      return 'poor';
    } else {
      if (value >= threshold.excellent) return 'excellent';
      if (value >= threshold.good) return 'good';
      if (value >= threshold.fair) return 'fair';
      return 'poor';
    }
  };
  const getGradeColor = grade => {
    const colors = {
      excellent: 'text-green-600',
      good: 'text-blue-600',
      fair: 'text-yellow-600',
      poor: 'text-red-600'
    };
    return colors[grade] || colors.fair;
  };
  const getGradeBadge = grade => {
    const badges = {
      excellent: 'bg-green-100 text-green-800',
      good: 'bg-blue-100 text-blue-800',
      fair: 'bg-yellow-100 text-yellow-800',
      poor: 'bg-red-100 text-red-800'
    };
    return badges[grade] || badges.fair;
  };
  const comparisonData = getComparisonData();
  const radarData = getRadarData();
  const trendData = getPerformanceTrend();
  const selectedMetricInfo = metrics.find(m => m.key === selectedMetric) || metrics[0];
  const bestModel = getBestPerformingModel(selectedMetric);
  return <div className="space-y-6">
      {/* 性能概览 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {metrics.slice(0, 4).map(metric => {
        const bestModel = getBestPerformingModel(metric.key);
        const grade = getPerformanceGrade(bestModel[metric.key], metric.key);
        return <Card key={metric.key}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  {metric.icon}
                  <span className="ml-2 text-sm font-medium">{metric.label}</span>
                </div>
                <Badge className={getGradeBadge(grade)}>
                  {grade === 'excellent' ? '优秀' : grade === 'good' ? '良好' : grade === 'fair' ? '一般' : '较差'}
                </Badge>
              </div>
              <div className="text-2xl font-bold">
                {((bestModel[metric.key] || 0) * (metric.unit === '%' ? 100 : 1)).toFixed(metric.unit === '%' ? 1 : 0)}
                <span className="text-sm text-muted-foreground ml-1">{metric.unit}</span>
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                最佳: {bestModel.name}
              </div>
            </CardContent>
          </Card>;
      })}
      </div>

      {/* 控制面板 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">性能分析控制面板</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">选择指标</label>
              <Select value={selectedMetric} onValueChange={setSelectedMetric}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {metrics.map(metric => <SelectItem key={metric.key} value={metric.key}>
                      <div className="flex items-center">
                        {metric.icon}
                        <span className="ml-2">{metric.label}</span>
                      </div>
                    </SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">选择实验</label>
              <Select value={selectedExperiment} onValueChange={setSelectedExperiment}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部实验</SelectItem>
                  {experiments.map(exp => <SelectItem key={exp._id} value={exp._id}>
                      {exp.name}
                    </SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">对比模式</label>
              <Select value={comparisonMode} onValueChange={setComparisonMode}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="overview">概览对比</SelectItem>
                  <SelectItem value="detailed">详细分析</SelectItem>
                  <SelectItem value="trend">趋势分析</SelectItem>
                  <SelectItem value="radar">雷达图</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 性能对比图表 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center">
              {selectedMetricInfo.icon}
              <span className="ml-2">{selectedMetricInfo.label}对比</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={comparisonData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip formatter={value => [`${(value * (selectedMetricInfo.unit === '%' ? 100 : 1)).toFixed(2)}${selectedMetricInfo.unit}`, selectedMetricInfo.label]} />
                <Bar dataKey={selectedMetric} fill={selectedMetricInfo.color} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">性能等级分布</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {['excellent', 'good', 'fair', 'poor'].map(grade => {
              const count = comparisonData.filter(exp => getPerformanceGrade(exp[selectedMetric], selectedMetric) === grade).length;
              const percentage = comparisonData.length > 0 ? count / comparisonData.length * 100 : 0;
              const gradeLabels = {
                excellent: '优秀',
                good: '良好',
                fair: '一般',
                poor: '较差'
              };
              const gradeColors = {
                excellent: 'bg-green-500',
                good: 'bg-blue-500',
                fair: 'bg-yellow-500',
                poor: 'bg-red-500'
              };
              return <div key={grade} className="flex items-center space-x-3">
                  <span className="text-sm w-12">{gradeLabels[grade]}</span>
                  <div className="flex-1">
                    <Progress value={percentage} className="h-2" />
                  </div>
                  <span className="text-sm w-12 text-right">{count}</span>
                </div>;
            })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 雷达图对比 */}
      {comparisonMode === 'radar' && <Card>
          <CardHeader>
            <CardTitle className="text-base">综合性能雷达图</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="experiment" />
                <PolarRadiusAxis angle={90} domain={[0, 100]} />
                {radarData.map((_, index) => <Radar key={index} name={radarData[index].experiment} dataKey={radarData[index].experiment} stroke={`hsl(${index * 60}, 70%, 50%)`} fill={`hsl(${index * 60}, 70%, 50%)`} fillOpacity={0.1} />)}
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>}

      {/* 训练趋势 */}
      {comparisonMode === 'trend' && <Card>
          <CardHeader>
            <CardTitle className="text-base">训练趋势分析</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="epoch" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="accuracy" stroke="#3b82f6" name="准确率" />
                <Line type="monotone" dataKey="f1_score" stroke="#8b5cf6" name="F1分数" />
                <Line type="monotone" dataKey="loss" stroke="#ef4444" name="损失" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>}

      {/* 最佳模型推荐 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center">
            <Award className="h-4 w-4 mr-2" />
            最佳模型推荐
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">最高准确率</h4>
              <div className="text-lg font-bold text-blue-600">
                {((bestModel.accuracy || 0) * 100).toFixed(1)}%
              </div>
              <div className="text-sm text-muted-foreground">{bestModel.name}</div>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">最低延迟</h4>
              <div className="text-lg font-bold text-green-600">
                {(bestModel.latency || 0).toFixed(0)}ms
              </div>
              <div className="text-sm text-muted-foreground">{bestModel.name}</div>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">最高吞吐量</h4>
              <div className="text-lg font-bold text-purple-600">
                {(bestModel.throughput || 0).toFixed(0)} req/s
              </div>
              <div className="text-sm text-muted-foreground">{bestModel.name}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>;
}