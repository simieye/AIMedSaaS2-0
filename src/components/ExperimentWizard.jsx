// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, Button, Input, Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Textarea, useToast, Tabs, TabsContent, TabsList, TabsTrigger, Card, CardContent, CardHeader, CardTitle, Badge, Progress } from '@/components/ui';
// @ts-ignore;
import { Plus, Settings, Database, Cpu, Zap, CheckCircle, AlertCircle, Info, ArrowRight, ArrowLeft, Save, Play, Eye, Code, FileText, BarChart3, X } from 'lucide-react';

export function ExperimentWizard({
  isOpen,
  onClose,
  onCreate
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [experimentData, setExperimentData] = useState({
    name: '',
    description: '',
    model_type: 'transformer',
    dataset: 'medical_qa',
    hyperparameters: {
      learning_rate: 0.001,
      batch_size: 32,
      epochs: 10,
      optimizer: 'adam',
      dropout: 0.1,
      hidden_size: 256,
      num_layers: 2
    },
    environment: {
      python_version: '3.8.0',
      framework: 'pytorch',
      gpu_enabled: true,
      distributed: false
    },
    tags: []
  });
  const [isCreating, setIsCreating] = useState(false);
  const [newTag, setNewTag] = useState('');
  const {
    toast
  } = useToast();
  const steps = [{
    id: 'basic',
    title: '基本信息',
    description: '设置实验名称和描述',
    icon: <FileText className="h-4 w-4" />
  }, {
    id: 'model',
    title: '模型配置',
    description: '选择模型类型和架构',
    icon: <Cpu className="h-4 w-4" />
  }, {
    id: 'data',
    title: '数据集',
    description: '选择训练数据集',
    icon: <Database className="h-4 w-4" />
  }, {
    id: 'hyperparameters',
    title: '超参数',
    description: '配置训练超参数',
    icon: <Settings className="h-4 w-4" />
  }, {
    id: 'environment',
    title: '环境配置',
    description: '设置运行环境',
    icon: <Zap className="h-4 w-4" />
  }, {
    id: 'review',
    title: '确认创建',
    description: '检查配置并创建实验',
    icon: <CheckCircle className="h-4 w-4" />
  }];
  const modelTypes = {
    transformer: {
      name: 'Transformer',
      description: '基于注意力机制的序列模型',
      defaultParams: {
        learning_rate: 0.001,
        batch_size: 32,
        epochs: 10,
        optimizer: 'adam',
        dropout: 0.1,
        hidden_size: 256,
        num_layers: 2,
        num_heads: 8
      }
    },
    lstm: {
      name: 'LSTM',
      description: '长短期记忆网络',
      defaultParams: {
        learning_rate: 0.01,
        batch_size: 64,
        epochs: 20,
        optimizer: 'adam',
        dropout: 0.2,
        hidden_size: 128,
        num_layers: 2
      }
    },
    cnn: {
      name: 'CNN',
      description: '卷积神经网络',
      defaultParams: {
        learning_rate: 0.001,
        batch_size: 32,
        epochs: 15,
        optimizer: 'adam',
        dropout: 0.1,
        hidden_size: 256,
        num_filters: 64
      }
    },
    bert: {
      name: 'BERT',
      description: '预训练语言模型',
      defaultParams: {
        learning_rate: 2e-5,
        batch_size: 16,
        epochs: 3,
        optimizer: 'adamw',
        dropout: 0.1,
        hidden_size: 768,
        num_layers: 12
      }
    }
  };
  const datasets = {
    medical_qa: {
      name: '医疗问答数据集',
      description: '包含医疗相关问答对的数据集',
      size: '50K samples',
      format: 'JSON'
    },
    patient_records: {
      name: '患者记录数据集',
      description: '匿名化的患者医疗记录',
      size: '100K samples',
      format: 'CSV'
    },
    drug_interactions: {
      name: '药物相互作用数据集',
      description: '药物间相互作用关系数据',
      size: '25K samples',
      format: 'JSON'
    },
    symptoms_diagnosis: {
      name: '症状诊断数据集',
      description: '症状到诊断的映射数据',
      size: '75K samples',
      format: 'CSV'
    }
  };
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  const handleModelTypeChange = modelType => {
    setExperimentData(prev => ({
      ...prev,
      model_type: modelType,
      hyperparameters: modelTypes[modelType].defaultParams
    }));
  };
  const handleAddTag = () => {
    if (newTag.trim() && !experimentData.tags.includes(newTag.trim())) {
      setExperimentData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };
  const handleRemoveTag = tagToRemove => {
    setExperimentData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };
  const handleCreateExperiment = async () => {
    if (!experimentData.name.trim()) {
      toast({
        title: "请输入实验名称",
        description: "实验名称不能为空",
        variant: "destructive"
      });
      return;
    }
    setIsCreating(true);
    try {
      await onCreate(experimentData);
      toast({
        title: "实验创建成功",
        description: `实验 ${experimentData.name} 已创建`,
        variant: "default"
      });
      handleClose();
    } catch (error) {
      toast({
        title: "创建实验失败",
        description: error.message || "无法创建实验",
        variant: "destructive"
      });
    } finally {
      setIsCreating(false);
    }
  };
  const handleClose = () => {
    setCurrentStep(0);
    setExperimentData({
      name: '',
      description: '',
      model_type: 'transformer',
      dataset: 'medical_qa',
      hyperparameters: {
        learning_rate: 0.001,
        batch_size: 32,
        epochs: 10,
        optimizer: 'adam',
        dropout: 0.1,
        hidden_size: 256,
        num_layers: 2
      },
      environment: {
        python_version: '3.8.0',
        framework: 'pytorch',
        gpu_enabled: true,
        distributed: false
      },
      tags: []
    });
    setNewTag('');
    onClose();
  };
  const renderStepContent = () => {
    switch (steps[currentStep].id) {
      case 'basic':
        return <div className="space-y-4">
            <div>
              <Label>实验名称 *</Label>
              <Input value={experimentData.name} onChange={e => setExperimentData(prev => ({
              ...prev,
              name: e.target.value
            }))} placeholder="输入实验名称" />
            </div>
            <div>
              <Label>实验描述</Label>
              <Textarea value={experimentData.description} onChange={e => setExperimentData(prev => ({
              ...prev,
              description: e.target.value
            }))} placeholder="描述实验目标和预期结果" rows={3} />
            </div>
            <div>
              <Label>标签</Label>
              <div className="flex space-x-2">
                <Input value={newTag} onChange={e => setNewTag(e.target.value)} placeholder="添加标签" onKeyPress={e => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddTag();
                }
              }} />
                <Button onClick={handleAddTag} variant="outline">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {experimentData.tags.map(tag => <Badge key={tag} variant="secondary" className="cursor-pointer" onClick={() => handleRemoveTag(tag)}>
                    {tag} <X className="h-3 w-3 ml-1" />
                  </Badge>)}
              </div>
            </div>
          </div>;
      case 'model':
        return <div className="space-y-4">
            <div>
              <Label>模型类型</Label>
              <Select value={experimentData.model_type} onValueChange={handleModelTypeChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(modelTypes).map(([key, model]) => <SelectItem key={key} value={key}>
                      <div>
                        <div className="font-medium">{model.name}</div>
                        <div className="text-sm text-muted-foreground">{model.description}</div>
                      </div>
                    </SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">模型配置预览</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">模型类型:</span>
                    <div className="font-medium">{modelTypes[experimentData.model_type].name}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">默认学习率:</span>
                    <div className="font-medium">{modelTypes[experimentData.model_type].defaultParams.learning_rate}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">默认批次大小:</span>
                    <div className="font-medium">{modelTypes[experimentData.model_type].defaultParams.batch_size}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">默认训练轮数:</span>
                    <div className="font-medium">{modelTypes[experimentData.model_type].defaultParams.epochs}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>;
      case 'data':
        return <div className="space-y-4">
            <div>
              <Label>数据集</Label>
              <Select value={experimentData.dataset} onValueChange={value => setExperimentData(prev => ({
              ...prev,
              dataset: value
            }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(datasets).map(([key, dataset]) => <SelectItem key={key} value={key}>
                      <div>
                        <div className="font-medium">{dataset.name}</div>
                        <div className="text-sm text-muted-foreground">{dataset.description}</div>
                        <div className="text-xs text-muted-foreground">{dataset.size} • {dataset.format}</div>
                      </div>
                    </SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">数据集信息</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">数据集名称:</span>
                    <span className="font-medium">{datasets[experimentData.dataset].name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">数据量:</span>
                    <span className="font-medium">{datasets[experimentData.dataset].size}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">格式:</span>
                    <span className="font-medium">{datasets[experimentData.dataset].format}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>;
      case 'hyperparameters':
        return <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>学习率</Label>
                <Input type="number" step="0.0001" value={experimentData.hyperparameters.learning_rate} onChange={e => setExperimentData(prev => ({
                ...prev,
                hyperparameters: {
                  ...prev.hyperparameters,
                  learning_rate: parseFloat(e.target.value)
                }
              }))} />
              </div>
              <div>
                <Label>批次大小</Label>
                <Input type="number" value={experimentData.hyperparameters.batch_size} onChange={e => setExperimentData(prev => ({
                ...prev,
                hyperparameters: {
                  ...prev.hyperparameters,
                  batch_size: parseInt(e.target.value)
                }
              }))} />
              </div>
              <div>
                <Label>训练轮数</Label>
                <Input type="number" value={experimentData.hyperparameters.epochs} onChange={e => setExperimentData(prev => ({
                ...prev,
                hyperparameters: {
                  ...prev.hyperparameters,
                  epochs: parseInt(e.target.value)
                }
              }))} />
              </div>
              <div>
                <Label>优化器</Label>
                <Select value={experimentData.hyperparameters.optimizer} onValueChange={value => setExperimentData(prev => ({
                ...prev,
                hyperparameters: {
                  ...prev.hyperparameters,
                  optimizer: value
                }
              }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="adam">Adam</SelectItem>
                    <SelectItem value="adamw">AdamW</SelectItem>
                    <SelectItem value="sgd">SGD</SelectItem>
                    <SelectItem value="rmsprop">RMSprop</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Dropout率</Label>
                <Input type="number" step="0.1" min="0" max="1" value={experimentData.hyperparameters.dropout} onChange={e => setExperimentData(prev => ({
                ...prev,
                hyperparameters: {
                  ...prev.hyperparameters,
                  dropout: parseFloat(e.target.value)
                }
              }))} />
              </div>
              <div>
                <Label>隐藏层大小</Label>
                <Input type="number" value={experimentData.hyperparameters.hidden_size} onChange={e => setExperimentData(prev => ({
                ...prev,
                hyperparameters: {
                  ...prev.hyperparameters,
                  hidden_size: parseInt(e.target.value)
                }
              }))} />
              </div>
            </div>
          </div>;
      case 'environment':
        return <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Python版本</Label>
                <Select value={experimentData.environment.python_version} onValueChange={value => setExperimentData(prev => ({
                ...prev,
                environment: {
                  ...prev.environment,
                  python_version: value
                }
              }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3.7.0">Python 3.7.0</SelectItem>
                    <SelectItem value="3.8.0">Python 3.8.0</SelectItem>
                    <SelectItem value="3.9.0">Python 3.9.0</SelectItem>
                    <SelectItem value="3.10.0">Python 3.10.0</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>框架</Label>
                <Select value={experimentData.environment.framework} onValueChange={value => setExperimentData(prev => ({
                ...prev,
                environment: {
                  ...prev.environment,
                  framework: value
                }
              }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pytorch">PyTorch</SelectItem>
                    <SelectItem value="tensorflow">TensorFlow</SelectItem>
                    <SelectItem value="keras">Keras</SelectItem>
                    <SelectItem value="sklearn">Scikit-learn</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="gpu_enabled" checked={experimentData.environment.gpu_enabled} onChange={e => setExperimentData(prev => ({
                ...prev,
                environment: {
                  ...prev.environment,
                  gpu_enabled: e.target.checked
                }
              }))} />
                <Label htmlFor="gpu_enabled">启用GPU加速</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="distributed" checked={experimentData.environment.distributed} onChange={e => setExperimentData(prev => ({
                ...prev,
                environment: {
                  ...prev.environment,
                  distributed: e.target.checked
                }
              }))} />
                <Label htmlFor="distributed">分布式训练</Label>
              </div>
            </div>
          </div>;
      case 'review':
        return <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">实验配置总览</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-muted-foreground">实验名称:</span>
                    <div className="font-medium">{experimentData.name || '未设置'}</div>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">模型类型:</span>
                    <div className="font-medium">{modelTypes[experimentData.model_type].name}</div>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">数据集:</span>
                    <div className="font-medium">{datasets[experimentData.dataset].name}</div>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">框架:</span>
                    <div className="font-medium">{experimentData.environment.framework}</div>
                  </div>
                </div>
                
                {experimentData.tags.length > 0 && <div>
                    <span className="text-sm text-muted-foreground">标签:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {experimentData.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                    </div>
                  </div>}
                
                <div>
                  <span className="text-sm text-muted-foreground">超参数:</span>
                  <div className="grid grid-cols-3 gap-2 mt-1 text-sm">
                    <div>学习率: {experimentData.hyperparameters.learning_rate}</div>
                    <div>批次大小: {experimentData.hyperparameters.batch_size}</div>
                    <div>训练轮数: {experimentData.hyperparameters.epochs}</div>
                    <div>优化器: {experimentData.hyperparameters.optimizer}</div>
                    <div>Dropout: {experimentData.hyperparameters.dropout}</div>
                    <div>隐藏层: {experimentData.hyperparameters.hidden_size}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>;
      default:
        return null;
    }
  };
  return <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>创建新实验</DialogTitle>
          <DialogDescription>
            通过向导配置您的AI训练实验
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* 步骤指示器 */}
          <div className="flex items-center justify-between">
            {steps.map((step, index) => <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${index <= currentStep ? 'bg-primary text-primary-foreground border-primary' : 'border-muted-foreground text-muted-foreground'}`}>
                  {index < currentStep ? <CheckCircle className="h-4 w-4" /> : step.icon}
                </div>
                <div className="ml-2 hidden md:block">
                  <div className={`text-sm font-medium ${index <= currentStep ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {step.title}
                  </div>
                  <div className="text-xs text-muted-foreground">{step.description}</div>
                </div>
                {index < steps.length - 1 && <div className={`w-8 h-0.5 mx-4 ${index < currentStep ? 'bg-primary' : 'bg-muted'}`} />}
              </div>)}
          </div>
          
          {/* 进度条 */}
          <Progress value={(currentStep + 1) / steps.length * 100} />
          
          {/* 步骤内容 */}
          <div className="min-h-[300px]">
            {renderStepContent()}
          </div>
          
          {/* 操作按钮 */}
          <div className="flex justify-between">
            <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 0}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              上一步
            </Button>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={handleClose}>
                取消
              </Button>
              {currentStep === steps.length - 1 ? <Button onClick={handleCreateExperiment} disabled={isCreating}>
                  {isCreating ? <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      创建中...
                    </> : <>
                      <Play className="h-4 w-4 mr-2" />
                      创建实验
                    </>}
                </Button> : <Button onClick={handleNext}>
                  下一步
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>;
}