// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Badge, Progress } from '@/components/ui';
// @ts-ignore;
import { Trophy, Target, Zap, Clock, Memory, Cpu, Play, BarChart3, Download, RefreshCw, Star, Award, TrendingUp } from 'lucide-react';

// @ts-ignore;
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, LineChart, Line } from 'recharts';
// @ts-ignore;

export function ModelBenchmark() {
  const [selectedDataset, setSelectedDataset] = useState('medical_qa');
  const [benchmarkStatus, setBenchmarkStatus] = useState('idle');
  const [benchmarkProgress, setBenchmarkProgress] = useState(0);
  const datasets = [{
    id: 'medical_qa',
    name: '医疗问答',
    description: '医学领域问答数据集',
    samples: 5000,
    difficulty: 'medium'
  }, {
    id: 'clinical_ner',
    name: '临床实体识别',
    description: '临床文本实体识别数据集',
    samples: 10000,
    difficulty: 'hard'
  }, {
    id: 'drug_interaction',
    name: '药物相互作用',
    description: '药物相互作用检测数据集',
    samples: 3000,
    difficulty: 'easy'
  }];
  const models = [{
    name: 'BERT Base',
    type: 'transformer',
    size: '110M',
    accuracy: 0.82,
    latency: 45,
    memory: 512,
    parameters: '110M'
  }, {
    name: 'BERT Large',
    type: 'transformer',
    size: '340M',
    accuracy: 0.86,
    latency: 78,
    memory: 1024,
    parameters: '340M'
  }, {
    name: 'GPT-3.5',
    type: 'llm',
    size: '175B',
    accuracy: 0.88,
    latency: 120,
    memory: 2048,
    parameters: '175B'
  }, {
    name: 'Custom Model',
    type: 'custom',
    size: '250M',
    accuracy: 0.84,
    latency: 65,
    memory: 768,
    parameters: '250M'
  }];
  const benchmarkResults = {
    medical_qa: {
      dataset: 'MedicalQA_Benchmark',
      total_samples: 5000,
      results: {
        'BERT Base': {
          accuracy: 0.82,
          f1_score: 0.81,
          precision: 0.83,
          recall: 0.79,
          latency_ms: 45,
          memory_mb: 512,
          throughput: 120
        },
        'BERT Large': {
          accuracy: 0.86,
          f1_score: 0.85,
          precision: 0.87,
          recall: 0.83,
          latency_ms: 78,
          memory_mb: 1024,
          throughput: 85
        },
        'GPT-3.5': {
          accuracy: 0.88,
          f1_score: 0.87,
          precision: 0.89,
          recall: 0.85,
          latency_ms: 120,
          memory_mb: 2048,
          throughput: 60
        },
        'Custom Model': {
          accuracy: 0.84,
          f1_score: 0.83,
          precision: 0.85,
          recall: 0.81,
          latency_ms: 65,
          memory_mb: 768,
          throughput: 95
        }
      }
    }
  };
  const currentResults = benchmarkResults[selectedDataset] || benchmarkResults.medical_qa;
  const runBenchmark = async () => {
    setBenchmarkStatus('running');
    setBenchmarkProgress(0);

    // 模拟基准测试过程
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setBenchmarkProgress(i);
    }
    setBenchmarkStatus('completed');
  };
  const getLeaderboardData = () => {
    const results = currentResults.results;
    return Object.entries(results).map(([name, data]) => ({
      name,
      accuracy: data.accuracy * 100,
      f1_score: data.f1_score * 100,
      latency: data.latency_ms,
      memory: data.memory_mb,
      throughput: data.throughput,
      overall_score: calculateOverallScore(data)
    })).sort((a, b) => b.overall_score - a.overall_score);
  };
  const calculateOverallScore = data => {
    // 综合评分计算
    const accuracyScore = data.accuracy * 40;
    const efficiencyScore = (100 - data.latency_ms / 2) * 20;
    const resourceScore = (100 - data.memory_mb / 20) * 20;
    const throughputScore = Math.min(100, data.throughput / 2) * 20;
    return accuracyScore + efficiencyScore + resourceScore + throughputScore;
  };
  const getRadarData = () => {
    const results = currentResults.results;
    return Object.entries(results).map(([name, data]) => ({
      model: name,
      accuracy: data.accuracy * 100,
      efficiency: Math.max(0, 100 - data.latency_ms / 2),
      resource_efficiency: Math.max(0, 100 - data.memory_mb / 20),
      throughput: Math.min(100, data.throughput / 2),
      f1_score: data.f1_score * 100
    }));
  };
  const getPerformanceTrend = () => {
    const data = [];
    for (let i = 0; i < 12; i++) {
      data.push({
        month: `${i + 1}月`,
        'BERT Base': 0.80 + Math.random() * 0.05,
        'BERT Large': 0.84 + Math.random() * 0.04,
        'GPT-3.5': 0.86 + Math.random() * 0.03,
        'Custom Model': 0.82 + Math.random() * 0.04
      });
    }
    return data;
  };
  const leaderboardData = getLeaderboardData();
  const radarData = getRadarData();
  const trendData = getPerformanceTrend();
  const selectedDatasetInfo = datasets.find(d => d.id === selectedDataset) || datasets[0];
  return <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">模型基准测试</h2>
          <p className="text-muted-foreground">评估和比较不同模型的性能表现</p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={runBenchmark} disabled={benchmarkStatus === 'running'}>
            {benchmarkStatus === 'running' ? <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> : <Play className="h-4 w-4 mr-2" />}
            {benchmarkStatus === 'running' ? '测试中...' : '运行基准测试'}
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            导出报告
          </Button>
        </div>
      </div>

      {/* 测试进度 */}
      {benchmarkStatus === 'running' && <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <RefreshCw className="h-6 w-6 animate-spin text-blue-500" />
              <div className="flex-1">
                <div className="flex justify-between text-sm mb-1">
                  <span>基准测试进度</span>
                  <span>{benchmarkProgress}%</span>
                </div>
                <Progress value={benchmarkProgress} />
              </div>
            </div>
          </CardContent>
        </Card>}

      {/* 数据集选择 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">测试数据集</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <div className="flex-1">
              <Select value={selectedDataset} onValueChange={setSelectedDataset}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {datasets.map(dataset => <SelectItem key={dataset.id} value={dataset.id}>
                      {dataset.name}
                    </SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <div className="p-3 border rounded-lg">
                <h4 className="font-medium">{selectedDatasetInfo.name}</h4>
                <p className="text-sm text-muted-foreground">{selectedDatasetInfo.description}</p>
                <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                  <span>样本数: {selectedDatasetInfo.samples.toLocaleString()}</span>
                  <span>难度: {selectedDatasetInfo.difficulty}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 排行榜 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center">
              <Trophy className="h-4 w-4 mr-2" />
              性能排行榜
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {leaderboardData.map((model, index) => {
              const rank = index + 1;
              const rankColor = rank === 1 ? 'text-yellow-500' : rank === 2 ? 'text-gray-400' : rank === 3 ? 'text-orange-600' : 'text-muted-foreground';
              return <div key={model.name} className="flex items-center space-x-3 p-3 border rounded-lg">
                  <div className={`text-lg font-bold ${rankColor}`}>
                    #{rank}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{model.name}</div>
                    <div className="text-sm text-muted-foreground">
                      准确率: {model.accuracy.toFixed(1)}% | 延迟: {model.latency}ms
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-blue-600">
                      {model.overall_score.toFixed(1)}
                    </div>
                    <div className="text-xs text-muted-foreground">综合评分</div>
                  </div>
                </div>;
            })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">性能指标对比</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={leaderboardData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="accuracy" fill="#3b82f6" name="准确率 (%)" />
                <Bar dataKey="f1_score" fill="#10b981" name="F1分数 (%)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* 雷达图对比 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">综合性能雷达图</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="model" />
              <PolarRadiusAxis angle={90} domain={[0, 100]} />
              {radarData.map((_, index) => <Radar key={index} name={radarData[index].model} dataKey={radarData[index].model} stroke={`hsl(${index * 60}, 70%, 50%)`} fill={`hsl(${index * 60}, 70%, 50%)`} fillOpacity={0.1} />)}
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* 性能趋势 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center">
            <TrendingUp className="h-4 w-4 mr-2" />
            性能趋势分析
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="BERT Base" stroke="#3b82f6" name="BERT Base" />
              <Line type="monotone" dataKey="BERT Large" stroke="#10b981" name="BERT Large" />
              <Line type="monotone" dataKey="GPT-3.5" stroke="#f59e0b" name="GPT-3.5" />
              <Line type="monotone" dataKey="Custom Model" stroke="#8b5cf6" name="Custom Model" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* 详细指标 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">详细性能指标</CardTitle>
        </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">模型</th>
                    <th className="text-left p-2">准确率</th>
                    <th className="text-left p-2">F1分数</th>
                    <th className="text-left p-2">精确率</th>
                    <th className="text-left p-2">召回率</th>
                    <th className="text-left p-2">延迟(ms)</th>
                    <th className="text-left p-2">内存(MB)</th>
                    <th className="text-left p-2">吞吐量</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboardData.map(model => {
                const results = currentResults.results[model.name];
                return <tr key={model.name} className="border-b">
                        <td className="p-2 font-medium">{model.name}</td>
                        <td className="p-2">{(results.accuracy * 100).toFixed(1)}%</td>
                        <td className="p-2">{(results.f1_score * 100).toFixed(1)}%</td>
                        <td className="p-2">{(results.precision * 100).toFixed(1)}%</td>
                        <td className="p-2">{(results.recall * 100).toFixed(1)}%</td>
                        <td className="p-2">{results.latency_ms}</td>
                        <td className="p-2">{results.memory_mb}</td>
                        <td className="p-2">{results.throughput}</td>
                      </tr>;
              })}
                </tbody>
              </table>
            </div>
          </CardContent>
      </Card>
    </div>;
}