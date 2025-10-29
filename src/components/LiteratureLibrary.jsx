// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Select, Badge, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, useToast, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui';
// @ts-ignore;
import { Search, Filter, Upload, Download, Eye, Edit, Trash2, Plus, FileText, Book, Clock, CheckCircle, AlertCircle, RefreshCw, Database, Tag } from 'lucide-react';

export function LiteratureLibrary({
  $w,
  className,
  style
}) {
  const {
    toast
  } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [literature, setLiterature] = useState([]);
  const [loading, setLoading] = useState(false);
  const mockLiterature = [{
    id: 'LIT001',
    title: '心血管疾病AI诊断技术综述',
    authors: ['张三', '李四', '王五'],
    journal: '中华医学杂志',
    year: 2023,
    volume: '45',
    issue: '3',
    pages: '123-135',
    category: 'cardiology',
    status: 'indexed',
    indexedDate: '2024-01-15',
    fileSize: '2.5MB',
    format: 'PDF',
    doi: '10.1234/med.2023.45.3.123',
    abstract: '本文综述了近年来心血管疾病AI诊断技术的发展现状，包括深度学习、机器学习等技术在心电图、超声心动图等医学影像分析中的应用...',
    keywords: ['心血管疾病', 'AI诊断', '深度学习', '医学影像'],
    citations: 45,
    downloads: 128,
    relevanceScore: 0.92
  }, {
    id: 'LIT002',
    title: '糖尿病视网膜病变自动检测算法研究',
    authors: ['赵六', '钱七'],
    journal: '眼科新进展',
    year: 2023,
    volume: '28',
    issue: '2',
    pages: '67-78',
    category: 'endocrinology',
    status: 'processing',
    indexedDate: null,
    fileSize: '1.8MB',
    format: 'PDF',
    doi: '10.5678/oph.2023.28.2.67',
    abstract: '研究基于深度学习的糖尿病视网膜病变自动检测算法，通过大规模眼底图像数据训练模型，实现了高精度的病变识别...',
    keywords: ['糖尿病', '视网膜病变', '深度学习', '自动检测'],
    citations: 23,
    downloads: 67,
    relevanceScore: 0.88
  }, {
    id: 'LIT003',
    title: '肿瘤免疫治疗生物标志物研究进展',
    authors: ['孙八', '周九', '吴十'],
    journal: '肿瘤学杂志',
    year: 2022,
    volume: '38',
    issue: '4',
    pages: '234-245',
    category: 'oncology',
    status: 'indexed',
    indexedDate: '2024-01-10',
    fileSize: '3.2MB',
    format: 'PDF',
    doi: '10.9012/onc.2022.38.4.234',
    abstract: '综述了肿瘤免疫治疗相关生物标志物的最新研究进展，包括PD-L1表达、肿瘤突变负荷、微卫星不稳定性等关键指标...',
    keywords: ['肿瘤免疫', '生物标志物', 'PD-L1', '精准医疗'],
    citations: 78,
    downloads: 234,
    relevanceScore: 0.95
  }, {
    id: 'LIT004',
    title: '神经退行性疾病早期诊断方法比较',
    authors: ['郑十一', '王十二'],
    journal: '神经科学前沿',
    year: 2023,
    volume: '19',
    issue: '1',
    pages: '45-56',
    category: 'neurology',
    status: 'failed',
    indexedDate: null,
    fileSize: '2.1MB',
    format: 'PDF',
    doi: '10.3456/neu.2023.19.1.45',
    abstract: '比较分析了阿尔茨海默病、帕金森病等神经退行性疾病的早期诊断方法，包括影像学检查、生物标志物检测等...',
    keywords: ['神经退行性疾病', '早期诊断', '阿尔茨海默病', '帕金森病'],
    citations: 34,
    downloads: 89,
    relevanceScore: 0.85
  }];
  const categories = [{
    value: 'all',
    label: '全部分类'
  }, {
    value: 'cardiology',
    label: '心血管内科'
  }, {
    value: 'endocrinology',
    label: '内分泌科'
  }, {
    value: 'oncology',
    label: '肿瘤科'
  }, {
    value: 'neurology',
    label: '神经内科'
  }, {
    value: 'respiratory',
    label: '呼吸内科'
  }];
  useEffect(() => {
    setLiterature(mockLiterature);
  }, []);
  const getStatusBadge = status => {
    const statusConfig = {
      indexed: {
        color: 'bg-green-100 text-green-800',
        icon: CheckCircle,
        text: '已索引'
      },
      processing: {
        color: 'bg-yellow-100 text-yellow-800',
        icon: Clock,
        text: '处理中'
      },
      failed: {
        color: 'bg-red-100 text-red-800',
        icon: AlertCircle,
        text: '索引失败'
      },
      pending: {
        color: 'bg-gray-100 text-gray-800',
        icon: Clock,
        text: '待处理'
      }
    };
    const config = statusConfig[status] || statusConfig.pending;
    const Icon = config.icon;
    return <Badge className={config.color}>
        <Icon className="w-3 h-3 mr-1" />
        {config.text}
      </Badge>;
  };
  const getCategoryBadge = category => {
    const categoryConfig = {
      cardiology: {
        color: 'bg-blue-100 text-blue-800',
        text: '心血管内科'
      },
      endocrinology: {
        color: 'bg-purple-100 text-purple-800',
        text: '内分泌科'
      },
      oncology: {
        color: 'bg-red-100 text-red-800',
        text: '肿瘤科'
      },
      neurology: {
        color: 'bg-green-100 text-green-800',
        text: '神经内科'
      },
      respiratory: {
        color: 'bg-orange-100 text-orange-800',
        text: '呼吸内科'
      }
    };
    const config = categoryConfig[category] || categoryConfig.cardiology;
    return <Badge className={config.color}>{config.text}</Badge>;
  };
  const handleViewDetails = literatureId => {
    toast({
      title: "查看详情",
      description: `正在查看文献 ${literatureId} 的详细信息`
    });
  };
  const handleEdit = literatureId => {
    toast({
      title: "编辑文献",
      description: `正在编辑文献 ${literatureId}`
    });
  };
  const handleReindex = literatureId => {
    setLiterature(prev => prev.map(item => item.id === literatureId ? {
      ...item,
      status: 'processing'
    } : item));
    toast({
      title: "重新索引",
      description: `正在重新索引文献 ${literatureId}`
    });
  };
  const handleDelete = literatureId => {
    setLiterature(prev => prev.filter(item => item.id !== literatureId));
    toast({
      title: "删除成功",
      description: `文献 ${literatureId} 已删除`,
      variant: "destructive"
    });
  };
  const handleUpload = () => {
    toast({
      title: "上传文献",
      description: "正在打开文献上传界面..."
    });
  };
  const handleBatchReindex = () => {
    const processingItems = literature.filter(item => item.status !== 'indexed');
    setLiterature(prev => prev.map(item => processingItems.some(p => p.id === item.id) ? {
      ...item,
      status: 'processing'
    } : item));
    toast({
      title: "批量重新索引",
      description: `正在重新索引 ${processingItems.length} 篇文献`
    });
  };
  const filteredLiterature = literature.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || item.authors.some(author => author.toLowerCase().includes(searchTerm.toLowerCase())) || item.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });
  return <div className={className} style={style}>
      <div className="space-y-6">
        {/* 头部 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">文献库管理</h1>
            <p className="text-gray-600">管理医学文献资源，支持上传、分类和索引状态监控</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={handleBatchReindex}>
              <RefreshCw className="w-4 h-4 mr-2" />
              批量重新索引
            </Button>
            <Button onClick={handleUpload}>
              <Upload className="w-4 h-4 mr-2" />
              上传文献
            </Button>
          </div>
        </div>

        {/* 筛选器 */}
        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input placeholder="搜索标题、作者或关键词..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10" />
              </div>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="选择分类" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>)}
                </SelectContent>
              </Select>

              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="选择状态" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部状态</SelectItem>
                  <SelectItem value="indexed">已索引</SelectItem>
                  <SelectItem value="processing">处理中</SelectItem>
                  <SelectItem value="failed">索引失败</SelectItem>
                  <SelectItem value="pending">待处理</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* 统计卡片 */}
        <div className="grid grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Book className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">总文献数</p>
                  <p className="text-2xl font-bold text-gray-900">{literature.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">已索引</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {literature.filter(item => item.status === 'indexed').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">处理中</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {literature.filter(item => item.status === 'processing').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Database className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">总大小</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {literature.reduce((total, item) => total + parseFloat(item.fileSize), 0).toFixed(1)}MB
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 文献列表 */}
        <Card>
          <CardHeader>
            <CardTitle>文献列表</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>标题</TableHead>
                  <TableHead>作者</TableHead>
                  <TableHead>期刊</TableHead>
                  <TableHead>分类</TableHead>
                  <TableHead>年份</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead>相关性评分</TableHead>
                  <TableHead>引用数</TableHead>
                  <TableHead>操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLiterature.map(item => <TableRow key={item.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium text-gray-900">{item.title}</div>
                        <div className="text-sm text-gray-500">{item.journal} • {item.volume}({item.issue}): {item.pages}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-gray-900">{item.authors.join(', ')}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-gray-900">{item.journal}</div>
                    </TableCell>
                    <TableCell>
                      {getCategoryBadge(item.category)}
                    </TableCell>
                    <TableCell>
                      <div className="text-gray-900">{item.year}</div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(item.status)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{
                        width: `${item.relevanceScore * 100}%`
                      }}></div>
                        </div>
                        <span className="text-sm text-gray-900">{item.relevanceScore}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-gray-900">{item.citations}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => handleViewDetails(item.id)}>
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(item.id)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleReindex(item.id)}>
                          <RefreshCw className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(item.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>)}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>;
}