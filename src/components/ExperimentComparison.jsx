// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, Button, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Card, CardContent, CardHeader, CardTitle, Badge, useToast } from '@/components/ui';
// @ts-ignore;
import { BarChart3, TrendingUp, Clock, Award, Target, Zap, CheckCircle, X } from 'lucide-react';

// @ts-ignore;
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, LineChart, Line } from 'recharts';
export function ExperimentComparison({
  isOpen,
  onClose,
  experiments
}) {
  const [selectedExperiments, setSelectedExperiments] = useState([]);
  const [comparisonMetric, setComparisonMetric] = useState('accuracy');
  const {
    toast
  } = useToast;
  const handleExperimentSelect = (experimentId, isSelected) => {
    if (isSelected) {
      if (selectedExperiments.length < 4) {
        setSelectedExperiments(prev => [...prev, experimentId]);
      } else {
        toast({
          title: "选择限制",
          description: "最多只能选择4个实验进行对比",
          variant: "destructive"
        });
      }
    } else {
      setSelectedExperiments(prev => prev.filter(id => id !== experimentId));
    }
  };
  const getComparisonData = () => {
    return selectedExperiments.map(expId => {
      const experiment = experiments.find(exp => exp._id === expId);
      if (!experiment) return null;
      return {
        name: experiment.name,
        accuracy: 0.85 + Math.random() * 0.1,
        loss: 0.2 + Math.random() * 0.3,
        f1_score: 0.8 + Math.random() * 0.15,
        precision: 0.82 + Math.random() * 0.12,
        recall: 0.78 + Math.random() * 0.18,
        training_time: 120 + Math.random() * 240,
        memory_usage: 2 + Math.random() * 6,
        inference_time: 10 + Math.random() * 50
      };
    }).filter(Boolean);
  };
  const getRadarData = () => {
    const data = getComparisonData();
    if (data.length === 0) return [];
    return [{
      metric: '准确率',
      ...data.reduce((acc, item, index) => ({
        ...acc,
        [`exp${index + 1}`]: item.accuracy
      }), {})
    }, {
      metric: 'F1分数',
      ...data.reduce((acc, item, index) => ({
        ...acc,
        [`exp${index + 1}`]: item.f1_score
      }), {})
    }, {
      metric: '精确率',
      ...data.reduce((acc, item, index) => ({
        ...acc,
        [`exp${index + 1}`]: item.precision
      }), {})
    }, {
      metric: '召回率',
      ...data.reduce((acc, item, index) => ({
        ...acc,
        [`exp${index + 1}`]: item.recall
      }), {})
    }, {
      metric: '速度',
      ...data.reduce((acc, item, index) => ({
        ...acc,
        [`exp${index + 1}`]: 1 - (item.inference_time - 10) / 40
      }), {})
    }];
  };
  const colors = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b'];
  return <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle>实验对比分析</DialogTitle>
              <DialogDescription>
                选择实验进行性能对比分析
              </DialogDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* 实验选择 */}
          <div>
            <h3 className="text-lg font-medium mb-3">选择实验 (最多4个)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {experiments.map(experiment => {
              const isSelected = selectedExperiments.includes(experiment._id);
              return <div key={experiment._id} className={`p-3 border rounded-lg cursor-pointer transition-colors ${isSelected ? 'bg-primary/10 border-primary' : 'hover:bg-gray-50'}`} onClick={() => handleExperimentSelect(experiment._id, !isSelected)}>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-sm">{experiment.name}</h4>
                    {isSelected && <CheckCircle className="h-4 w-4 text-primary" />}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    <div>模型: {experiment.model_type}</div>
                    <div>数据集: {experiment.dataset}</div>
                    <div>状态: {experiment.status}</div>
                  </div>
                </div>;
            })}
            </div>
          </div>
          
          {selectedExperiments.length > 0 && <>
              {/* 对比指标选择 */}
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium">主要对比指标:</span>
                <Select value={comparisonMetric} onValueChange={setComparisonMetric}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="accuracy">准确率</SelectItem>
                    <SelectItem value="loss">损失值</SelectItem>
                    <SelectItem value="f1_score">F1分数</SelectItem>
                    <SelectItem value="training_time">训练时间</SelectItem>
                    <SelectItem value="memory_usage">内存使用</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* 对比图表 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* 柱状图对比 */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">性能指标对比</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={getComparisonData()}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey={comparisonMetric} fill="#3b82f6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                
                {/* 雷达图对比 */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">综合性能雷达图</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <RadarChart data={getRadarData()}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="metric" />
                        <PolarRadiusAxis angle={90} domain={[0, 1]} />
                        {selectedExperiments.map((expId, index) => {
                      const experiment = experiments.find(exp => exp._id === expId);
                      return <Radar key={expId} name={experiment?.name} dataKey={`exp${index + 1}`} stroke={colors[index]} fill={colors[index]} fillOpacity={0.1} />;
                    })}
                        <Tooltip />
                      </RadarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
              
              {/* 详细对比表格 */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">详细指标对比</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">实验名称</th>
                          <th className="text-right p-2">准确率</th>
                          <th className="text-right p-2">损失值</th>
                          <th className="text-right p-2">F1分数</th>
                          <th className="text-right p-2">精确率</th>
                          <th className="text-right p-2">召回率</th>
                          <th className="text-right p-2">训练时间(分)</th>
                          <th className="text-right p-2">内存使用(GB)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {getComparisonData().map((data, index) => {
                      const experiment = experiments.find(exp => exp._id === selectedExperiments[index]);
                      return <tr key={selectedExperiments[index]} className="border-b">
                            <td className="p-2 font-medium">{experiment?.name}</td>
                            <td className="p-2 text-right">{(data.accuracy * 100).toFixed(2)}%</td>
                            <td className="p-2 text-right">{data.loss.toFixed(4)}</td>
                            <td className="p-2 text-right">{(data.f1_score * 100).toFixed(2)}%</td>
                            <td className="p-2 text-right">{(data.precision * 100).toFixed(2)}%</td>
                    <td className="p-2 text-right">{(data.recall * 100).toFixed(2)}%</td>
                            <td className="p-2 text-right">{data.training_time.toFixed(0)}</td>
                            <td className="p-2 text-right">{data.memory_usage.toFixed(1)}</td>
                          </tr>;
                    })}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </>}
        </div>
      </DialogContent>
    </Dialog>;
}