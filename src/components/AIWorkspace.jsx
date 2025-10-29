// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Badge, Tabs, TabsContent, TabsList, TabsTrigger, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, useToast, Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui';
// @ts-ignore;
import { Brain, Plus, Upload, FileText, Activity, Clock, CheckCircle, AlertTriangle, Zap, Target, TrendingUp, BarChart3, PieChart, LineChart, Download, RefreshCw, Settings, Play, Pause, SkipForward, Eye, Edit, Trash2, Database, Cpu, HardDrive, Wifi, Battery, Thermometer, Wind } from 'lucide-react';

export function AIWorkspace({
  $w
}) {
  const {
    toast
  } = useToast();
  const [activeTab, setActiveTab] = React.useState('diagnosis');
  const [isProcessing, setIsProcessing] = React.useState(false);
  const recentDiagnoses = [{
    id: 1,
    patientName: "张三",
    type: "胸部X光",
    confidence: 95.2,
    result: "正常",
    time: "2分钟前",
    status: "completed"
  }, {
    id: 2,
    patientName: "李四",
    type: "CT扫描",
    confidence: 87.8,
    result: "肺炎",
    time: "5分钟前",
    status: "completed"
  }, {
    id: 3,
    patientName: "王五",
    type: "MRI",
    confidence: 92.1,
    result: "待确认",
    time: "8分钟前",
    status: "pending"
  }];
  const modelPerformance = [{
    name: "胸部X光诊断",
    accuracy: 98.5,
    precision: 97.2,
    recall: 96.8,
    f1Score: 97.0,
    status: "excellent"
  }, {
    name: "CT扫描分析",
    accuracy: 96.2,
    precision: 95.8,
    recall: 94.5,
    f1Score: 95.1,
    status: "good"
  }, {
    name: "MRI图像识别",
    accuracy: 94.7,
    precision: 93.9,
    recall: 92.8,
    f1Score: 93.3,
    status: "good"
  }];
  const systemResources = [{
    name: "GPU使用率",
    value: 78,
    status: "normal",
    icon: Cpu
  }, {
    name: "内存使用",
    value: 65,
    status: "normal",
    icon: Database
  }, {
    name: "存储空间",
    value: 82,
    status: "warning",
    icon: HardDrive
  }, {
    name: "网络带宽",
    value: 45,
    status: "normal",
    icon: Wifi
  }];
  const handleNewDiagnosis = () => {
    toast({
      title: "新建诊断",
      description: "正在打开新建诊断界面..."
    });
  };
  const handleUploadImage = () => {
    toast({
      title: "上传图像",
      description: "正在打开图像上传界面..."
    });
  };
  const handleStartProcessing = () => {
    setIsProcessing(true);
    toast({
      title: "开始处理",
      description: "AI模型正在处理中..."
    });
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "处理完成",
        description: "AI诊断已完成"
      });
    }, 3000);
  };
  return <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">AI工作台</h2>
          <p className="text-gray-600">智能诊断和模型管理</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button onClick={handleNewDiagnosis} className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>新建诊断</span>
          </Button>
          <Button variant="outline" onClick={handleUploadImage} className="flex items-center space-x-2">
            <Upload className="h-4 w-4" />
            <span>上传图像</span>
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="diagnosis">智能诊断</TabsTrigger>
          <TabsTrigger value="models">模型管理</TabsTrigger>
          <TabsTrigger value="performance">性能分析</TabsTrigger>
          <TabsTrigger value="resources">资源监控</TabsTrigger>
        </TabsList>

        {/* Diagnosis Tab */}
        <TabsContent value="diagnosis" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="h-5 w-5 mr-2" />
                  快速操作
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button onClick={handleStartProcessing} disabled={isProcessing} className="w-full flex items-center justify-center space-x-2">
                  {isProcessing ? <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      <span>处理中...</span>
                    </> : <>
                      <Play className="h-4 w-4" />
                      <span>开始AI诊断</span>
                    </>}
                </Button>
                <Button variant="outline" className="w-full flex items-center justify-center space-x-2">
                  <FileText className="h-4 w-4" />
                  <span>查看诊断报告</span>
                </Button>
                <Button variant="outline" className="w-full flex items-center justify-center space-x-2">
                  <Download className="h-4 w-4" />
                  <span>导出结果</span>
                </Button>
              </CardContent>
            </Card>

            {/* Recent Diagnoses */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  最近诊断
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentDiagnoses.map(diagnosis => <div key={diagnosis.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium">{diagnosis.patientName}</p>
                        <p className="text-sm text-gray-500">{diagnosis.type}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{diagnosis.result}</p>
                        <p className="text-xs text-gray-500">置信度: {diagnosis.confidence}%</p>
                      </div>
                      <Badge variant={diagnosis.status === 'completed' ? 'default' : 'secondary'} className="ml-2">
                        {diagnosis.status === 'completed' ? '完成' : '待确认'}
                      </Badge>
                    </div>)}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Models Tab */}
        <TabsContent value="models" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Brain className="h-5 w-5 mr-2" />
                模型性能
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>模型名称</TableHead>
                      <TableHead>准确率</TableHead>
                      <TableHead>精确率</TableHead>
                      <TableHead>召回率</TableHead>
                      <TableHead>F1分数</TableHead>
                      <TableHead>状态</TableHead>
                      <TableHead>操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {modelPerformance.map((model, index) => <TableRow key={index}>
                        <TableCell className="font-medium">{model.name}</TableCell>
                        <TableCell>{model.accuracy}%</TableCell>
                        <TableCell>{model.precision}%</TableCell>
                        <TableCell>{model.recall}%</TableCell>
                        <TableCell>{model.f1Score}%</TableCell>
                        <TableCell>
                          <Badge variant={model.status === 'excellent' ? 'default' : 'secondary'}>
                            {model.status === 'excellent' ? '优秀' : '良好'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Settings className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>)}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  诊断趋势
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <LineChart className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">诊断趋势图表</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PieChart className="h-5 w-5 mr-2" />
                  诊断分布
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <PieChart className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">诊断类型分布</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Resources Tab */}
        <TabsContent value="resources" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="h-5 w-5 mr-2" />
                系统资源
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {systemResources.map((resource, index) => <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <resource.icon className="h-4 w-4 text-gray-600" />
                        <span className="text-sm font-medium">{resource.name}</span>
                      </div>
                      <span className={`text-sm font-bold ${resource.status === 'normal' ? 'text-green-600' : resource.status === 'warning' ? 'text-yellow-600' : 'text-red-600'}`}>
                        {resource.value}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className={`h-2 rounded-full ${resource.status === 'normal' ? 'bg-green-500' : resource.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'}`} style={{
                    width: `${resource.value}%`
                  }} />
                    </div>
                  </div>)}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>;
}