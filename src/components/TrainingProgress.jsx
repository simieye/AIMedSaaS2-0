// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Badge, Progress, Button, useToast } from '@/components/ui';
// @ts-ignore;
import { Play, Pause, Square, RotateCcw, TrendingUp, Clock, Cpu, Activity, AlertCircle, CheckCircle, XCircle } from 'lucide-react';

// @ts-ignore;
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
export function TrainingProgress({
  experiments
}) {
  const [selectedExperiment, setSelectedExperiment] = useState(null);
  const [realTimeData, setRealTimeData] = useState({});
  const {
    toast
  } = useToast();
  useEffect(() => {
    if (experiments.length > 0 && !selectedExperiment) {
      setSelectedExperiment(experiments[0]);
    }
  }, [experiments, selectedExperiment]);
  useEffect(() => {
    const interval = setInterval(() => {
      const mockData = {};
      experiments.forEach(exp => {
        const progress = Math.random() * 100;
        const loss = 2.0 - progress / 100 * 1.5;
        const accuracy = progress / 100 * 0.95;
        mockData[exp._id] = {
          progress: progress,
          loss: loss,
          accuracy: accuracy,
          epoch: Math.floor(progress / 10),
          learning_rate: 0.001 * Math.pow(0.95, Math.floor(progress / 10)),
          timestamp: new Date().toLocaleTimeString()
        };
      });
      setRealTimeData(mockData);
    }, 2000);
    return () => clearInterval(interval);
  }, [experiments]);
  const getStatusBadge = status => {
    const badges = {
      running: {
        label: '运行中',
        color: 'bg-blue-100 text-blue-800',
        icon: <Activity className="h-3 w-3" />
      },
      completed: {
        label: '已完成',
        color: 'bg-green-100 text-green-800',
        icon: <CheckCircle className="h-3 w-3" />
      },
      failed: {
        label: '失败',
        color: 'bg-red-100 text-red-800',
        icon: <XCircle className="h-3 w-3" />
      },
      paused: {
        label: '已暂停',
        color: 'bg-yellow-100 text-yellow-800',
        icon: <Pause className="h-3 w-3" />
      }
    };
    return badges[status] || badges.running;
  };
  const generateChartData = experimentId => {
    const data = [];
    for (let i = 0; i <= 10; i++) {
      data.push({
        epoch: i,
        loss: 2.0 - i * 0.15 + Math.random() * 0.1,
        accuracy: i * 0.09 + Math.random() * 0.02,
        val_loss: 2.1 - i * 0.14 + Math.random() * 0.1,
        val_accuracy: i * 0.085 + Math.random() * 0.02
      });
    }
    return data;
  };
  const handleControlAction = async (action, experimentId) => {
    try {
      // 模拟控制操作
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "操作成功",
        description: `${action} 操作已执行`,
        variant: "default"
      });
    } catch (error) {
      toast({
        title: "操作失败",
        description: error.message || "无法执行操作",
        variant: "destructive"
      });
    }
  };
  if (experiments.length === 0) {
    return <div className="text-center py-12">
        <Activity className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium mb-2">暂无运行中的实验</h3>
        <p className="text-muted-foreground">启动一个实验来查看训练进度</p>
      </div>;
  }
  return <div className="space-y-6">
      {/* 实验列表 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">运行中的实验</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {experiments.map(experiment => {
              const data = realTimeData[experiment._id] || {};
              return <div key={experiment._id} className={`p-3 border rounded-lg cursor-pointer transition-colors ${selectedExperiment?._id === experiment._id ? 'bg-primary/10 border-primary' : 'hover:bg-gray-50'}`} onClick={() => setSelectedExperiment(experiment)}>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-sm">{experiment.name}</h4>
                    <Badge className={getStatusBadge(experiment.status).color}>
                      {getStatusBadge(experiment.status).icon}
                      {getStatusBadge(experiment.status).label}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-xs text-muted-foreground mb-1">
                        <span>进度</span>
                        <span>{Math.round(data.progress || 0)}%</span>
                      </div>
                      <Progress value={data.progress || 0} />
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-muted-foreground">Loss:</span>
                        <span className="ml-1">{(data.loss || 0).toFixed(4)}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Accuracy:</span>
                        <span className="ml-1">{((data.accuracy || 0) * 100).toFixed(2)}%</span>
                      </div>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Epoch {data.epoch || 0}</span>
                      <span>{data.timestamp || ''}</span>
                    </div>
                  </div>
                </div>;
            })}
            </CardContent>
          </Card>
        </div>
        
        {/* 详细监控 */}
        <div className="lg:col-span-2 space-y-6">
          {selectedExperiment && <>
              {/* 实时指标 */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center justify-between">
                    <span>{selectedExperiment.name} - 实时指标</span>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleControlAction('pause', selectedExperiment._id)}>
                        <Pause className="h-3 w-3" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleControlAction('stop', selectedExperiment._id)}>
                        <Square className="h-3 w-3" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleControlAction('restart', selectedExperiment._id)}>
                        <RotateCcw className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <TrendingUp className="h-4 w-4 mx-auto mb-1 text-blue-600" />
                      <p className="text-lg font-semibold">{((realTimeData[selectedExperiment._id]?.accuracy || 0) * 100).toFixed(2)}%</p>
                      <p className="text-xs text-muted-foreground">准确率</p>
                    </div>
                    <div className="text-center p-3 bg-red-50 rounded-lg">
                      <Activity className="h-4 w-4 mx-auto mb-1 text-red-600" />
                      <p className="text-lg font-semibold">{(realTimeData[selectedExperiment._id]?.loss || 0).toFixed(4)}</p>
                      <p className="text-xs text-muted-foreground">损失值</p>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <Clock className="h-4 w-4 mx-auto mb-1 text-green-600" />
                      <p className="text-lg font-semibold">{realTimeData[selectedExperiment._id]?.epoch || 0}</p>
                      <p className="text-xs text-muted-foreground">当前轮数</p>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <Cpu className="h-4 w-4 mx-auto mb-1 text-purple-600" />
                      <p className="text-lg font-semibold">{(realTimeData[selectedExperiment._id]?.learning_rate || 0).toFixed(6)}</p>
                      <p className="text-xs text-muted-foreground">学习率</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* 训练图表 */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">训练曲线</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-medium mb-2">损失函数</h4>
                      <ResponsiveContainer width="100%" height={200}>
                        <LineChart data={generateChartData(selectedExperiment._id)}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="epoch" />
                          <YAxis />
                          <Tooltip />
                          <Line type="monotone" dataKey="loss" stroke="#ef4444" name="训练损失" />
                          <Line type="monotone" dataKey="val_loss" stroke="#f97316" name="验证损失" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-2">准确率</h4>
                      <ResponsiveContainer width="100%" height={200}>
                        <AreaChart data={generateChartData(selectedExperiment._id)}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="epoch" />
                          <YAxis />
                          <Tooltip />
                          <Area type="monotone" dataKey="accuracy" stroke="#10b981" fill="#10b981" fillOpacity={0.3} name="训练准确率" />
                          <Area type="monotone" dataKey="val_accuracy" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} name="验证准确率" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>}
        </div>
      </div>
    </div>;
}