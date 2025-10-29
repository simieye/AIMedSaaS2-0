// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Select, Badge, Tabs, TabsContent, TabsList, TabsTrigger, useToast, SelectTrigger, SelectValue, SelectContent, SelectItem, Alert, AlertDescription } from '@/components/ui';
// @ts-ignore;
import { Search, BookOpen, FileText, Video, Download, Star, Clock, Eye, Filter, Plus, Edit, Trash2, Upload, Link, Database, Brain, Heart, Microscope, Lung, RefreshCcw, Save } from 'lucide-react';

export function MedicalKnowledgeIntegration({
  $w,
  className,
  style
}) {
  const {
    toast
  } = useToast();
  const [activeTab, setActiveTab] = useState('search');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [knowledgeItems, setKnowledgeItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const departments = [{
    id: 'cardiology',
    name: '心血管内科',
    icon: Heart
  }, {
    id: 'oncology',
    name: '肿瘤科',
    icon: Microscope
  }, {
    id: 'neurology',
    name: '神经内科',
    icon: Brain
  }, {
    id: 'respiratory',
    name: '呼吸内科',
    icon: Lung
  }];

  // 从数据模型加载医学知识库
  const loadKnowledgeItems = async () => {
    setLoading(true);
    try {
      const result = await $w.cloud.callDataSource({
        dataSourceName: 'medical_knowledge_base',
        methodName: 'wedaGetRecordsV2',
        params: {
          select: {
            $master: true
          },
          getCount: true,
          pageSize: 100,
          orderBy: [{
            publishDate: 'desc'
          }]
        }
      });
      if (result.records) {
        setKnowledgeItems(result.records);
      }
    } catch (error) {
      console.error('加载医学知识库失败:', error);
      toast({
        title: "加载失败",
        description: "无法加载医学知识库数据",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadKnowledgeItems();
  }, []);
  const getTypeIcon = type => {
    const icons = {
      guideline: BookOpen,
      consensus: FileText,
      case: FileText,
      video: Video,
      research: Database
    };
    return icons[type] || FileText;
  };
  const getTypeBadge = type => {
    const typeConfig = {
      guideline: {
        color: 'bg-blue-100 text-blue-800',
        text: '指南'
      },
      consensus: {
        color: 'bg-green-100 text-green-800',
        text: '共识'
      },
      case: {
        color: 'bg-purple-100 text-purple-800',
        text: '病例'
      },
      video: {
        color: 'bg-red-100 text-red-800',
        text: '视频'
      },
      research: {
        color: 'bg-orange-100 text-orange-800',
        text: '研究'
      }
    };
    const config = typeConfig[type] || typeConfig.research;
    return <Badge className={config.color}>{config.text}</Badge>;
  };
  const getDepartmentIcon = deptId => {
    const dept = departments.find(d => d.id === deptId);
    return dept ? dept.icon : BookOpen;
  };
  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      toast({
        title: "请输入搜索内容",
        description: "请输入关键词进行搜索",
        variant: "destructive"
      });
      return;
    }
    setLoading(true);
    try {
      const result = await $w.cloud.callDataSource({
        dataSourceName: 'medical_knowledge_base',
        methodName: 'wedaGetRecordsV2',
        params: {
          select: {
            $master: true
          },
          filter: {
            where: {
              $or: [{
                title: {
                  $search: searchTerm
                }
              }, {
                content: {
                  $search: searchTerm
                }
              }, {
                tags: {
                  $search: searchTerm
                }
              }]
            }
          },
          getCount: true,
          pageSize: 50
        }
      });
      if (result.records) {
        setKnowledgeItems(result.records);
        toast({
          title: "搜索完成",
          description: `找到 ${result.records.length} 个相关结果`
        });
      }
    } catch (error) {
      console.error('搜索失败:', error);
      toast({
        title: "搜索失败",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  const handleViewDetails = item => {
    toast({
      title: "查看详情",
      description: `正在查看《${item.title}》的详细内容`
    });
  };
  const handleDownload = item => {
    toast({
      title: "下载文件",
      description: `正在下载《${item.title}》...`
    });
  };
  const handleIntegrate = item => {
    toast({
      title: "集成知识",
      description: `正在将《${item.title}》集成到AI诊断系统...`
    });
  };
  const filteredItems = knowledgeItems.filter(item => {
    const matchesSearch = item.title?.toLowerCase().includes(searchTerm.toLowerCase()) || item.content?.toLowerCase().includes(searchTerm.toLowerCase()) || item.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesDepartment = selectedDepartment === 'all' || item.department === selectedDepartment;
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesDepartment && matchesCategory;
  });
  return <div className={className} style={style}>
      <div className="space-y-6">
        {/* 头部 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">医学知识库集成</h1>
            <p className="text-gray-600">集成和管理医学知识资源，支持AI诊断系统</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline">
              <Link className="w-4 h-4 mr-2" />
              外部数据源
            </Button>
            <Button>
              <Upload className="w-4 h-4 mr-2" />
              上传知识
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="search">知识检索</TabsTrigger>
            <TabsTrigger value="manage">知识管理</TabsTrigger>
            <TabsTrigger value="integration">集成配置</TabsTrigger>
            <TabsTrigger value="analytics">使用分析</TabsTrigger>
          </TabsList>

          <TabsContent value="search" className="mt-6">
            {/* 搜索区域 */}
            <Card>
              <CardContent className="p-6">
                <div className="flex space-x-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input placeholder="搜索医学知识、指南、病例..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10 text-lg" />
                  </div>
                  <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="选择科室" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">全部科室</SelectItem>
                      {departments.map(dept => <SelectItem key={dept.id} value={dept.id}>
                          {dept.name}
                        </SelectItem>)}
                    </SelectContent>
                  </Select>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="选择分类" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">全部分类</SelectItem>
                      <SelectItem value="diagnosis">诊断相关</SelectItem>
                      <SelectItem value="treatment">治疗相关</SelectItem>
                      <SelectItem value="screening">筛查相关</SelectItem>
                      <SelectItem value="education">教育培训</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button onClick={handleSearch} disabled={loading}>
                    {loading ? <>
                        <Clock className="w-4 h-4 mr-2 animate-spin" />
                        搜索中...
                      </> : <>
                        <Search className="w-4 h-4 mr-2" />
                        搜索
                      </>}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* 搜索结果 */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  搜索结果 ({filteredItems.length})
                </h3>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    筛选
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    导出
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredItems.map(item => {
                const Icon = getTypeIcon(item.type);
                const DeptIcon = getDepartmentIcon(item.department);
                return <Card key={item._id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            <Icon className="w-5 h-5 text-blue-600" />
                            <DeptIcon className="w-4 h-4 text-gray-500" />
                            {getTypeBadge(item.type)}
                          </div>
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-500 mr-1" />
                            <span className="text-sm font-medium">{item.rating || 0}</span>
                          </div>
                        </div>
                        
                        <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                          {item.title}
                        </h4>
                        
                        <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                          {item.content}
                        </p>
                        
                        <div className="flex flex-wrap gap-1 mb-3">
                          {item.tags?.slice(0, 3).map((tag, index) => <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>)}
                        </div>
                        
                        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                          <span>{item.author}</span>
                          <span>{item.publishDate}</span>
                        </div>
                        
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3 text-xs text-gray-500">
                            <div className="flex items-center">
                              <Eye className="w-3 h-3 mr-1" />
                              {item.views || 0}
                            </div>
                            <div className="flex items-center">
                              <Download className="w-3 h-3 mr-1" />
                              {item.downloads || 0}
                            </div>
                            {item.duration && <div className="flex items-center">
                                <Clock className="w-3 h-3 mr-1" />
                                {item.duration}
                              </div>}
                          </div>
                          <div className="text-xs text-gray-500">
                            {item.fileSize} {item.format}
                          </div>
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" className="flex-1" onClick={() => handleViewDetails(item)}>
                            <Eye className="w-3 h-3 mr-1" />
                            查看
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleDownload(item)}>
                            <Download className="w-3 h-3" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleIntegrate(item)}>
                            <Link className="w-3 h-3" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>;
              })}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="manage" className="mt-6">
            <div className="grid grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>知识分类</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {['诊疗指南', '专家共识', '病例分析', '研究文献', '教学视频'].map((category, index) => <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <span className="font-medium text-gray-900">{category}</span>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">{Math.floor(Math.random() * 100) + 20}</Badge>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>)}
                  </div>
                  <Button className="w-full mt-4">
                    <Plus className="w-4 h-4 mr-2" />
                    添加分类
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>数据源管理</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">中华医学会数据库</h4>
                        <Badge className="bg-green-100 text-green-800">已连接</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">官方医学指南和共识</p>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500">最后同步: 2小时前</span>
                        <Button variant="ghost" size="sm">
                          <RefreshCcw className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">PubMed文献库</h4>
                        <Badge className="bg-blue-100 text-blue-800">同步中</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">国际医学研究文献</p>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500">最后同步: 1天前</span>
                        <Button variant="ghost" size="sm">
                          <RefreshCcw className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full mt-4" variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    添加数据源
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>质量控制</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-gray-600">数据完整性</span>
                        <span className="font-semibold text-green-600">98.5%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{
                        width: '98.5%'
                      }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-gray-600">内容准确性</span>
                        <span className="font-semibold text-blue-600">95.2%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{
                        width: '95.2%'
                      }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-gray-600">更新及时性</span>
                        <span className="font-semibold text-orange-600">87.8%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-orange-600 h-2 rounded-full" style={{
                        width: '87.8%'
                      }}></div>
                      </div>
                    </div>
                  </div>
                  <Alert className="mt-4">
                    <AlertDescription>
                      发现 3 个内容需要更新，建议及时处理
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="integration" className="mt-6">
            <div className="grid grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>AI模型集成</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-gray-900">心血管诊断模型</h4>
                        <Badge className="bg-green-100 text-green-800">已集成</Badge>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">集成知识条目</span>
                          <span className="font-medium">1,234</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">最后更新</span>
                          <span className="font-medium">2024-01-15</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">模型版本</span>
                          <span className="font-medium">v2.1.0</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="w-full mt-3">
                        <RefreshCcw className="w-3 h-3 mr-2" />
                        重新集成
                      </Button>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-gray-900">肿瘤诊断模型</h4>
                        <Badge className="bg-yellow-100 text-yellow-800">待更新</Badge>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">集成知识条目</span>
                          <span className="font-medium">856</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">最后更新</span>
                          <span className="font-medium">2024-01-08</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">模型版本</span>
                          <span className="font-medium">v3.0.0</span>
                        </div>
                      </div>
                      <Button size="sm" className="w-full mt-3">
                        <Upload className="w-3 h-3 mr-2" />
                        立即更新
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>集成配置</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        自动同步频率
                      </label>
                      <Select defaultValue="daily">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="realtime">实时同步</SelectItem>
                          <SelectItem value="hourly">每小时</SelectItem>
                          <SelectItem value="daily">每日</SelectItem>
                          <SelectItem value="weekly">每周</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        知识权重配置
                      </label>
                      <Select defaultValue="balanced">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="guideline优先">指南优先</SelectItem>
                          <SelectItem value="balanced">平衡权重</SelectItem>
                          <SelectItem value="research优先">研究优先</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        质量阈值
                      </label>
                      <Input type="number" step="0.1" min="0" max="1" defaultValue="0.8" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        冲突解决策略
                      </label>
                      <Select defaultValue="latest">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="latest">最新版本优先</SelectItem>
                          <SelectItem value="authority">权威来源优先</SelectItem>
                          <SelectItem value="manual">手动解决</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button className="w-full">
                      <Save className="w-4 h-4 mr-2" />
                      保存配置
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="mt-6">
            <div className="grid grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <BookOpen className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">总知识条目</p>
                      <p className="text-2xl font-bold text-gray-900">{knowledgeItems.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Eye className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">本月访问</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {knowledgeItems.reduce((sum, item) => sum + (item.views || 0), 0)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Download className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">本月下载</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {knowledgeItems.reduce((sum, item) => sum + (item.downloads || 0), 0)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-orange-100 rounded-lg">
                      <Star className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">平均评分</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {knowledgeItems.length > 0 ? (knowledgeItems.reduce((sum, item) => sum + (item.rating || 0), 0) / knowledgeItems.length).toFixed(1) : '0.0'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-2 gap-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>热门知识</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {knowledgeItems.slice(0, 4).map((item, index) => <div key={item._id} className="flex items-center justify-between p-2 border rounded">
                        <span className="text-gray-700">{item.title}</span>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <Eye className="w-3 h-3" />
                          <span>{item.views || 0}</span>
                        </div>
                      </div>)}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>使用趋势</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">日均访问量</span>
                      <span className="font-semibold text-green-600">+15.3%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">下载转化率</span>
                      <span className="font-semibold text-blue-600">23.1%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">用户满意度</span>
                      <span className="font-semibold text-purple-600">92.5%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">知识更新频率</span>
                      <span className="font-semibold text-orange-600">每周3次</span>
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