// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Select, Badge, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Tabs, TabsContent, TabsList, TabsTrigger, useToast, SelectTrigger, SelectValue, SelectContent, SelectItem, Alert, AlertDescription } from '@/components/ui';
// @ts-ignore;
import { Settings, GitBranch, Activity, Zap, Shield, TrendingUp, Download, Upload, Play, Pause, RotateCcw, Eye, Edit, Trash2, Plus, Save } from 'lucide-react';

export function AIModelConfig({
  $w,
  className,
  style
}) {
  const {
    toast
  } = useToast();
  const [activeTab, setActiveTab] = useState('models');
  const [selectedModel, setSelectedModel] = useState(null);
  const [models, setModels] = useState([]);
  const [configData, setConfigData] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [loading, setLoading] = useState(false);

  // 从数据模型加载AI模型配置
  const loadModels = async () => {
    setLoading(true);
    try {
      const result = await $w.cloud.callDataSource({
        dataSourceName: 'ai_model_config',
        methodName: 'wedaGetRecordsV2',
        params: {
          select: {
            $master: true
          },
          getCount: true,
          pageSize: 100,
          orderBy: [{
            createdAt: 'desc'
          }]
        }
      });
      if (result.records) {
        setModels(result.records);
      }
    } catch (error) {
      console.error('加载AI模型配置失败:', error);
      toast({
        title: "加载失败",
        description: "无法加载AI模型配置数据",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadModels();
  }, []);
  const getStatusBadge = status => {
    const statusConfig = {
      active: {
        color: 'bg-green-100 text-green-800',
        icon: Play,
        text: '运行中'
      },
      training: {
        color: 'bg-blue-100 text-blue-800',
        icon: Activity,
        text: '训练中'
      },
      inactive: {
        color: 'bg-gray-100 text-gray-800',
        icon: Pause,
        text: '已停止'
      }
    };
    const config = statusConfig[status] || statusConfig.inactive;
    const Icon = config.icon;
    return <Badge className={config.color}>
        <Icon className="w-3 h-3 mr-1" />
        {config.text}
      </Badge>;
  };
  const handleModelSelect = model => {
    setSelectedModel(model);
    setConfigData(model.config || {});
  };
  const handleConfigChange = (key, value) => {
    setConfigData(prev => ({
      ...prev,
      [key]: value
    }));
  };
  const handleSaveConfig = async () => {
    if (!selectedModel) return;
    setIsSaving(true);
    try {
      await $w.cloud.callDataSource({
        dataSourceName: 'ai_model_config',
        methodName: 'wedaUpdateV2',
        params: {
          data: {
            config: configData
          },
          filter: {
            where: {
              _id: {
                $eq: selectedModel._id
              }
            }
          }
        }
      });
      setModels(prev => prev.map(model => model._id === selectedModel._id ? {
        ...model,
        config: configData
      } : model));
      toast({
        title: "配置保存成功",
        description: "模型配置已更新"
      });
    } catch (error) {
      console.error('保存配置失败:', error);
      toast({
        title: "保存失败",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };
  const handleModelAction = async (action, modelId) => {
    try {
      const actionMessages = {
        start: "模型已启动",
        stop: "模型已停止",
        train: "模型训练已开始",
        deploy: "模型部署中...",
        rollback: "模型版本回滚中..."
      };

      // 更新模型状态
      await $w.cloud.callDataSource({
        dataSourceName: 'ai_model_config',
        methodName: 'wedaUpdateV2',
        params: {
          data: {
            status: action === 'start' ? 'active' : action === 'stop' ? 'inactive' : 'training'
          },
          filter: {
            where: {
              _id: {
                $eq: modelId
              }
            }
          }
        }
      });
      setModels(prev => prev.map(model => model._id === modelId ? {
        ...model,
        status: action === 'start' ? 'active' : action === 'stop' ? 'inactive' : 'training'
      } : model));
      toast({
        title: "操作成功",
        description: actionMessages[action] || "操作已完成"
      });
    } catch (error) {
      console.error('模型操作失败:', error);
      toast({
        title: "操作失败",
        description: error.message,
        variant: "destructive"
      });
    }
  };
  return <div className={className} style={style}>
      <div className="space-y-6">
        {/* 头部 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">AI模型配置管理</h1>
            <p className="text-gray-600">管理和配置各科室专用的AI诊断模型</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline">
              <Upload className="w-4 h-4 mr-2" />
              导入模型
            </Button>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              新建模型
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="models">模型管理</TabsTrigger>
            <TabsTrigger value="config">参数配置</TabsTrigger>
            <TabsTrigger value="performance">性能监控</TabsTrigger>
          </TabsList>

          <TabsContent value="models" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>AI模型列表</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? <div className="flex items-center justify-center h-32">
                    <div className="text-gray-500">加载中...</div>
                  </div> : <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>模型名称</TableHead>
                        <TableHead>科室</TableHead>
                        <TableHead>类型</TableHead>
                        <TableHead>版本</TableHead>
                        <TableHead>准确率</TableHead>
                        <TableHead>状态</TableHead>
                        <TableHead>最后训练</TableHead>
                        <TableHead>操作</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {models.map(model => <TableRow key={model._id} className="cursor-pointer hover:bg-gray-50" onClick={() => handleModelSelect(model)}>
                          <TableCell>
                            <div>
                              <div className="font-medium text-gray-900">{model.name}</div>
                              <div className="text-sm text-gray-500">{model.description}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{model.department}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary">{model.type}</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-1">
                              <span>{model.version}</span>
                              <GitBranch className="w-3 h-3 text-gray-400" />
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-1">
                              <span className="font-semibold text-green-600">
                                {(model.accuracy * 100).toFixed(1)}%
                              </span>
                              <TrendingUp className="w-3 h-3 text-green-500" />
                            </div>
                          </TableCell>
                          <TableCell>
                            {getStatusBadge(model.status)}
                          </TableCell>
                          <TableCell>
                            <div className="text-gray-900">{model.lastTrained}</div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-1">
                              <Button variant="ghost" size="sm" onClick={e => {
                          e.stopPropagation();
                          handleModelAction('start', model._id);
                        }}>
                                <Play className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm" onClick={e => {
                          e.stopPropagation();
                          handleModelAction('train', model._id);
                        }}>
                                <Activity className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm" onClick={e => {
                          e.stopPropagation();
                          handleModelAction('deploy', model._id);
                        }}>
                                <Upload className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>)}
                    </TableBody>
                  </Table>}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="config" className="mt-6">
            <div className="grid grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>模型选择</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {models.map(model => <div key={model._id} className={`p-3 border rounded-lg cursor-pointer transition-colors ${selectedModel?._id === model._id ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'}`} onClick={() => handleModelSelect(model)}>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gray-900">{model.name}</h4>
                          {getStatusBadge(model.status)}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{model.description}</p>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-500">版本: {model.version}</span>
                          <span className="text-green-600">准确率: {(model.accuracy * 100).toFixed(1)}%</span>
                        </div>
                      </div>)}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Settings className="w-5 h-5 mr-2" />
                    参数配置
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedModel ? <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          置信度阈值
                        </label>
                        <Input type="number" step="0.01" min="0" max="1" value={configData.confidence_threshold || 0.8} onChange={e => handleConfigChange('confidence_threshold', parseFloat(e.target.value))} />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          最大特征数
                        </label>
                        <Input type="number" value={configData.max_features || 100} onChange={e => handleConfigChange('max_features', parseInt(e.target.value))} />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          学习率
                        </label>
                        <Input type="number" step="0.0001" min="0" max="1" value={configData.learning_rate || 0.001} onChange={e => handleConfigChange('learning_rate', parseFloat(e.target.value))} />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          批次大小
                        </label>
                        <Input type="number" value={configData.batch_size || 32} onChange={e => handleConfigChange('batch_size', parseInt(e.target.value))} />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          训练轮数
                        </label>
                        <Input type="number" value={configData.epochs || 100} onChange={e => handleConfigChange('epochs', parseInt(e.target.value))} />
                      </div>

                      <div className="flex space-x-2">
                        <Button onClick={handleSaveConfig} disabled={isSaving} className="flex-1">
                          {isSaving ? <>
                              <Activity className="w-4 h-4 mr-2 animate-spin" />
                              保存中...
                            </> : <>
                              <Save className="w-4 h-4 mr-2" />
                              保存配置
                            </>}
                        </Button>
                        <Button variant="outline">
                          <RotateCcw className="w-4 h-4 mr-2" />
                          重置
                        </Button>
                      </div>
                    </div> : <div className="text-center py-8">
                      <Settings className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">请选择一个模型进行配置</p>
                    </div>}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="mt-6">
            <div className="grid grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>性能指标</CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedModel ? <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">精确率</span>
                        <span className="font-semibold text-blue-600">
                          {((selectedModel.performance?.precision || 0) * 100).toFixed(1)}%
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">召回率</span>
                        <span className="font-semibold text-green-600">
                          {((selectedModel.performance?.recall || 0) * 100).toFixed(1)}%
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">F1分数</span>
                        <span className="font-semibold text-purple-600">
                          {((selectedModel.performance?.f1_score || 0) * 100).toFixed(1)}%
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">AUC-ROC</span>
                        <span className="font-semibold text-orange-600">
                          {((selectedModel.performance?.auc_roc || 0) * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div> : <div className="text-center py-8">
                      <Activity className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">请选择一个模型查看性能</p>
                    </div>}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>训练历史</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-gray-900">v{selectedModel?.version || '1.0.0'}</span>
                        <Badge className="bg-green-100 text-green-800">当前版本</Badge>
                      </div>
                      <div className="text-sm text-gray-600">训练时间: {selectedModel?.lastTrained || '未知'}</div>
                      <div className="text-sm text-green-600">准确率: {((selectedModel?.accuracy || 0) * 100).toFixed(1)}%</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>系统资源</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-gray-600">CPU使用率</span>
                        <span className="font-semibold">45%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{
                        width: '45%'
                      }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-gray-600">内存使用率</span>
                        <span className="font-semibold">68%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{
                        width: '68%'
                      }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-gray-600">GPU使用率</span>
                        <span className="font-semibold">82%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-600 h-2 rounded-full" style={{
                        width: '82%'
                      }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-gray-600">磁盘使用率</span>
                        <span className="font-semibold">35%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-orange-600 h-2 rounded-full" style={{
                        width: '35%'
                      }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>;
}