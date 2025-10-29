// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Badge, Tabs, TabsContent, TabsList, TabsTrigger, useToast, Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, Label, Progress, Alert, AlertDescription, AlertTitle } from '@/components/ui';
// @ts-ignore;
import { Plus, Play, Pause, Square, RotateCcw, Copy, Trash2, Eye, Download, Settings, Clock, TrendingUp, Activity, CheckCircle, XCircle, AlertCircle, BarChart3, FileText, Zap, Star, GitBranch, Calendar, User, Search, Filter, RefreshCw, Rocket, Terminal, Target, Award, Globe, Shield, Beaker, TestTube, GitCompare, Scale, Trophy, ZapOff } from 'lucide-react';

// 导入自定义组件
import { ExperimentWizard } from './ExperimentWizard';
import { ExperimentCard } from './ExperimentCard';
import { TrainingProgress } from './TrainingProgress';
import { ExperimentComparison } from './ExperimentComparison';
import { TrainingLogs } from './TrainingLogs';
import { ModelReleaseModal } from './ModelReleaseModal';
import { ExperimentTemplateMarket } from './ExperimentTemplateMarket';
import { ExperimentStats } from './ExperimentStats';
import { ModelPerformanceAnalysis } from './ModelPerformanceAnalysis';
import { ABTestManager } from './ABTestManager';
import { ModelBenchmark } from './ModelBenchmark';
import { TrainingOptimization } from './TrainingOptimization';
export function AgentTrainer() {
  const [experiments, setExperiments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('experiments');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterModel, setFilterModel] = useState('all');
  const [showWizard, setShowWizard] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [showLogs, setShowLogs] = useState(false);
  const [showRelease, setShowRelease] = useState(false);
  const [showTemplateMarket, setShowTemplateMarket] = useState(false);
  const [showABTest, setShowABTest] = useState(false);
  const [showBenchmark, setShowBenchmark] = useState(false);
  const [showOptimization, setShowOptimization] = useState(false);
  const [selectedExperiment, setSelectedExperiment] = useState(null);
  const [selectedExperiments, setSelectedExperiments] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [performanceData, setPerformanceData] = useState({});
  const [abTests, setAbTests] = useState([]);
  const [benchmarkResults, setBenchmarkResults] = useState({});
  const [optimizationSuggestions, setOptimizationSuggestions] = useState([]);
  const {
    toast
  } = useToast();
  useEffect(() => {
    loadExperiments();
    loadTemplates();
    loadPerformanceData();
    loadABTests();
    loadBenchmarkResults();
  }, []);
  const loadExperiments = async () => {
    try {
      setLoading(true);
      const response = await $w.cloud.callDataSource({
        dataSourceName: 'agent_experiments',
        methodName: 'wedaGetRecordsV2',
        params: {
          select: {
            $master: true
          },
          orderBy: [{
            created_at: 'desc'
          }],
          getCount: true
        }
      });
      if (response.records) {
        setExperiments(response.records);
      }
    } catch (error) {
      console.error('加载实验失败:', error);
      toast({
        title: "加载实验失败",
        description: error.message || "无法获取实验列表",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  const loadTemplates = async () => {
    try {
      // 模拟加载模板数据
      const mockTemplates = [{
        id: 'medical_qa_bert',
        name: '医疗问答 BERT',
        description: '基于BERT的医疗问答模型',
        category: 'nlp',
        author: 'AI Research Team',
        downloads: 1250,
        rating: 4.8,
        tags: ['bert', 'medical', 'qa'],
        difficulty: 'intermediate',
        config: {
          model_type: 'bert',
          dataset: 'medical_qa',
          hyperparameters: {
            learning_rate: 2e-5,
            batch_size: 16,
            epochs: 3
          }
        }
      }];
      setTemplates(mockTemplates);
    } catch (error) {
      console.error('加载模板失败:', error);
    }
  };
  const loadPerformanceData = async () => {
    try {
      // 模拟加载性能数据
      const mockPerformanceData = {};
      experiments.forEach(exp => {
        mockPerformanceData[exp._id] = {
          accuracy: 0.85 + Math.random() * 0.1,
          precision: 0.82 + Math.random() * 0.1,
          recall: 0.88 + Math.random() * 0.1,
          f1_score: 0.85 + Math.random() * 0.1,
          latency: 50 + Math.random() * 100,
          throughput: 100 + Math.random() * 200,
          memory_usage: 512 + Math.random() * 1024,
          gpu_utilization: 60 + Math.random() * 30,
          training_time: 3600 + Math.random() * 7200,
          convergence_epoch: Math.floor(Math.random() * 10) + 5,
          loss_reduction: 0.8 + Math.random() * 0.15
        };
      });
      setPerformanceData(mockPerformanceData);
    } catch (error) {
      console.error('加载性能数据失败:', error);
    }
  };
  const loadABTests = async () => {
    try {
      // 模拟加载A/B测试数据
      const mockABTests = [{
        id: 'test_001',
        name: 'BERT vs GPT 医疗问答对比',
        status: 'running',
        models: ['bert_medical', 'gpt_medical'],
        metrics: ['accuracy', 'latency', 'user_satisfaction'],
        start_time: new Date(Date.now() - 86400000).toISOString(),
        end_time: new Date(Date.now() + 86400000 * 6).toISOString(),
        traffic_split: {
          'bert_medical': 0.5,
          'gpt_medical': 0.5
        },
        results: {
          'bert_medical': {
            accuracy: 0.87,
            latency: 85,
            user_satisfaction: 4.2,
            requests: 1250
          },
          'gpt_medical': {
            accuracy: 0.89,
            latency: 120,
            user_satisfaction: 4.5,
            requests: 1275
          }
        }
      }];
      setAbTests(mockABTests);
    } catch (error) {
      console.error('加载A/B测试失败:', error);
    }
  };
  const loadBenchmarkResults = async () => {
    try {
      // 模拟加载基准测试结果
      const mockBenchmarkResults = {
        'medical_qa': {
          dataset: 'MedicalQA_Benchmark',
          total_samples: 5000,
          results: {
            'bert_base': {
              accuracy: 0.82,
              f1_score: 0.81,
              latency_ms: 45,
              memory_mb: 512
            },
            'bert_large': {
              accuracy: 0.86,
              f1_score: 0.85,
              latency_ms: 78,
              memory_mb: 1024
            },
            'gpt_3.5': {
              accuracy: 0.88,
              f1_score: 0.87,
              latency_ms: 120,
              memory_mb: 2048
            }
          }
        }
      };
      setBenchmarkResults(mockBenchmarkResults);
    } catch (error) {
      console.error('加载基准测试结果失败:', error);
    }
  };
  const handleCreateExperiment = async experimentData => {
    try {
      const newExperiment = {
        ...experimentData,
        user_id: 'current_user_id',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        status: 'pending',
        metrics: {
          accuracy: [],
          loss: [],
          f1_score: []
        },
        logs: [],
        duration: 0
      };
      const response = await $w.cloud.callDataSource({
        dataSourceName: 'agent_experiments',
        methodName: 'wedaCreateV2',
        params: {
          data: newExperiment
        }
      });
      if (response.id) {
        toast({
          title: "实验创建成功",
          description: `实验 ${experimentData.name} 已创建`,
          variant: "default"
        });
        loadExperiments();
      }
    } catch (error) {
      console.error('创建实验失败:', error);
      toast({
        title: "创建实验失败",
        description: error.message || "无法创建实验",
        variant: "destructive"
      });
    }
  };
  const handleStartExperiment = async experimentId => {
    try {
      await $w.cloud.callDataSource({
        dataSourceName: 'agent_experiments',
        methodName: 'wedaUpdateV2',
        params: {
          data: {
            status: 'running',
            started_at: new Date().toISOString()
          },
          filter: {
            where: {
              _id: {
                $eq: experimentId
              }
            }
          }
        }
      });
      toast({
        title: "实验已启动",
        description: "训练任务已开始执行",
        variant: "default"
      });
      loadExperiments();
    } catch (error) {
      console.error('启动实验失败:', error);
      toast({
        title: "启动失败",
        description: error.message || "无法启动实验",
        variant: "destructive"
      });
    }
  };
  const handleStopExperiment = async experimentId => {
    try {
      await $w.cloud.callDataSource({
        dataSourceName: 'agent_experiments',
        methodName: 'wedaUpdateV2',
        params: {
          data: {
            status: 'completed',
            completed_at: new Date().toISOString()
          },
          filter: {
            where: {
              _id: {
                $eq: experimentId
              }
            }
          }
        }
      });
      toast({
        title: "实验已停止",
        description: "训练任务已停止",
        variant: "default"
      });
      loadExperiments();
    } catch (error) {
      console.error('停止实验失败:', error);
      toast({
        title: "停止失败",
        description: error.message || "无法停止实验",
        variant: "destructive"
      });
    }
  };
  const handleDeleteExperiment = async experimentId => {
    try {
      await $w.cloud.callDataSource({
        dataSourceName: 'agent_experiments',
        methodName: 'wedaDeleteV2',
        params: {
          filter: {
            where: {
              _id: {
                $eq: experimentId
              }
            }
          }
        }
      });
      toast({
        title: "实验已删除",
        description: "实验已从系统中移除",
        variant: "default"
      });
      loadExperiments();
    } catch (error) {
      console.error('删除实验失败:', error);
      toast({
        title: "删除失败",
        description: error.message || "无法删除实验",
        variant: "destructive"
      });
    }
  };
  const handleDuplicateExperiment = async experiment => {
    try {
      const duplicatedExperiment = {
        ...experiment,
        name: `${experiment.name} (副本)`,
        _id: undefined,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        status: 'pending',
        started_at: null,
        completed_at: null,
        metrics: {
          accuracy: [],
          loss: [],
          f1_score: []
        },
        logs: [],
        duration: 0
      };
      const response = await $w.cloud.callDataSource({
        dataSourceName: 'agent_experiments',
        methodName: 'wedaCreateV2',
        params: {
          data: duplicatedExperiment
        }
      });
      if (response.id) {
        toast({
          title: "实验已复制",
          description: "实验副本已创建",
          variant: "default"
        });
        loadExperiments();
      }
    } catch (error) {
      console.error('复制实验失败:', error);
      toast({
        title: "复制失败",
        description: error.message || "无法复制实验",
        variant: "destructive"
      });
    }
  };
  const handleUseTemplate = templateConfig => {
    setShowTemplateMarket(false);
    setShowWizard(true);
  };
  const toggleExperimentSelection = experimentId => {
    setSelectedExperiments(prev => prev.includes(experimentId) ? prev.filter(id => id !== experimentId) : [...prev, experimentId]);
  };
  const getExperimentStats = () => {
    const stats = {
      total: experiments.length,
      running: experiments.filter(e => e.status === 'running').length,
      completed: experiments.filter(e => e.status === 'completed').length,
      failed: experiments.filter(e => e.status === 'failed').length
    };
    return stats;
  };
  const filteredExperiments = experiments.filter(experiment => {
    const matchesSearch = experiment.name.toLowerCase().includes(searchTerm.toLowerCase()) || experiment.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || experiment.status === filterStatus;
    const matchesModel = filterModel === 'all' || experiment.model_type === filterModel;
    return matchesSearch && matchesStatus && matchesModel;
  });
  return <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">AI代理训练中心</h1>
          <p className="text-muted-foreground">管理和监控AI模型训练实验</p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={() => setShowBenchmark(true)} variant="outline">
            <Trophy className="h-4 w-4 mr-2" />
            基准测试
          </Button>
          <Button onClick={() => setShowABTest(true)} variant="outline">
            <GitCompare className="h-4 w-4 mr-2" />
            A/B测试
          </Button>
          <Button onClick={() => setShowOptimization(true)} variant="outline">
            <Zap className="h-4 w-4 mr-2" />
            训练优化
          </Button>
          <Button onClick={() => setShowTemplateMarket(true)} variant="outline">
            <FileText className="h-4 w-4 mr-2" />
            模板市场
          </Button>
          <Button onClick={() => setShowComparison(true)} variant="outline">
            <BarChart3 className="h-4 w-4 mr-2" />
            对比分析
          </Button>
          {selectedExperiments.length > 0 && <Button onClick={() => setShowComparison(true)} variant="outline">
              <Target className="h-4 w-4 mr-2" />
              对比选中 ({selectedExperiments.length})
            </Button>}
          <Button onClick={() => setShowWizard(true)}>
            <Plus className="h-4 w-4 mr-2" />
            新建实验
          </Button>
        </div>
      </div>

      {/* 统计概览 */}
      <ExperimentStats stats={getExperimentStats()} />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList>
          <TabsTrigger value="experiments">实验列表</TabsTrigger>
          <TabsTrigger value="training">训练进度</TabsTrigger>
          <TabsTrigger value="performance">性能评估</TabsTrigger>
          <TabsTrigger value="abtesting">A/B测试</TabsTrigger>
          <TabsTrigger value="logs">训练日志</TabsTrigger>
          <TabsTrigger value="models">模型管理</TabsTrigger>
        </TabsList>

        <TabsContent value="experiments">
          <div className="mb-4 flex space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input placeholder="搜索实验..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10" />
              </div>
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部状态</SelectItem>
                <SelectItem value="pending">待开始</SelectItem>
                <SelectItem value="running">运行中</SelectItem>
                <SelectItem value="completed">已完成</SelectItem>
                <SelectItem value="failed">失败</SelectItem>
                <SelectItem value="paused">已暂停</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterModel} onValueChange={setFilterModel}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部模型</SelectItem>
                <SelectItem value="transformer">Transformer</SelectItem>
                <SelectItem value="lstm">LSTM</SelectItem>
                <SelectItem value="cnn">CNN</SelectItem>
                <SelectItem value="bert">BERT</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {loading ? <div className="flex justify-center items-center h-64">
              <RefreshCw className="h-8 w-8 animate-spin" />
            </div> : filteredExperiments.length === 0 ? <div className="text-center py-12">
              <Activity className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">暂无实验</h3>
              <p className="text-muted-foreground mb-4">创建您的第一个AI训练实验</p>
              <div className="flex justify-center space-x-2">
                <Button onClick={() => setShowTemplateMarket(true)}>
                  <FileText className="h-4 w-4 mr-2" />
                  使用模板
                </Button>
                <Button onClick={() => setShowWizard(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  新建实验
                </Button>
              </div>
            </div> : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredExperiments.map(experiment => <ExperimentCard key={experiment._id} experiment={experiment} performanceData={performanceData[experiment._id] || {}} onSelect={exp => {
            setSelectedExperiment(exp);
            setShowLogs(true);
          }} onStart={() => handleStartExperiment(experiment._id)} onStop={() => handleStopExperiment(experiment._id)} onDelete={() => handleDeleteExperiment(experiment._id)} onDuplicate={() => handleDuplicateExperiment(experiment)} />)}
            </div>}
        </TabsContent>

        <TabsContent value="training">
          <TrainingProgress experiments={experiments.filter(e => e.status === 'running')} />
        </TabsContent>

        <TabsContent value="performance">
          <ModelPerformanceAnalysis experiments={experiments} performanceData={performanceData} />
        </TabsContent>

        <TabsContent value="abtesting">
          <ABTestManager abTests={abTests} experiments={experiments} onCreateTest={() => setShowABTest(true)} />
        </TabsContent>

        <TabsContent value="logs">
          <Card>
            <CardHeader>
              <CardTitle>训练日志</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Terminal className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">选择实验查看日志</h3>
                <p className="text-muted-foreground">点击实验卡片中的详情按钮查看训练日志</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="models">
          <Card>
            <CardHeader>
              <CardTitle>模型管理</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Rocket className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">模型发布</h3>
                <p className="text-muted-foreground mb-4">将训练完成的模型发布到生产环境</p>
                <Button onClick={() => {
                const completedExperiment = experiments.find(e => e.status === 'completed');
                if (completedExperiment) {
                  setSelectedExperiment(completedExperiment);
                  setShowRelease(true);
                } else {
                  toast({
                    title: "无可用模型",
                    description: "请先完成一个训练实验",
                    variant: "destructive"
                  });
                }
              }}>
                  <Rocket className="h-4 w-4 mr-2" />
                  发布模型
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* 模态框组件 */}
      <ExperimentWizard isOpen={showWizard} onClose={() => setShowWizard(false)} onCreate={handleCreateExperiment} />
      <ExperimentComparison isOpen={showComparison} onClose={() => setShowComparison(false)} experiments={experiments} />
      <TrainingLogs isOpen={showLogs} onClose={() => setShowLogs(false)} experiment={selectedExperiment} />
      <ModelReleaseModal isOpen={showRelease} onClose={() => setShowRelease(false)} experiment={selectedExperiment} />
      <ExperimentTemplateMarket isOpen={showTemplateMarket} onClose={() => setShowTemplateMarket(false)} onUseTemplate={handleUseTemplate} />
      <ModelPerformanceAnalysis isOpen={showBenchmark} onClose={() => setShowBenchmark(false)} experiments={experiments} performanceData={performanceData} />
      <ABTestManager isOpen={showABTest} onClose={() => setShowABTest(false)} experiments={experiments} />
      <TrainingOptimization isOpen={showOptimization} onClose={() => setShowOptimization(false)} experiments={experiments} performanceData={performanceData} />
    </div>;
}