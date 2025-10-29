// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Select, Badge, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, useToast, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui';
// @ts-ignore;
import { Search, Filter, Download, Eye, Edit, Trash2, Plus, Upload, FileText, Calendar, Tag, Folder, Clock, CheckCircle, AlertCircle } from 'lucide-react';

export function DocumentLibrary({
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
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const mockDocuments = [{
    id: 'DOC001',
    title: '心血管疾病诊疗指南（2024版）',
    category: 'clinical_guideline',
    type: 'pdf',
    status: 'processed',
    size: '15.2MB',
    pages: 245,
    uploadDate: '2024-01-15',
    processedDate: '2024-01-16',
    author: '中华医学会心血管病学分会',
    publisher: '中华心血管病杂志',
    year: 2024,
    doi: '10.1234/ccm.2024.001',
    abstract: '本指南提供了心血管疾病的最新诊疗标准，包括诊断流程、治疗方案和预后评估等内容。',
    keywords: ['心血管疾病', '诊疗指南', '临床实践', '治疗方案'],
    tags: ['指南', '心血管', '临床'],
    embeddings: {
      vectorSize: 1536,
      chunks: 48,
      processed: true
    },
    metadata: {
      language: 'zh-CN',
      quality: 'high',
      relevance: 0.95
    }
  }, {
    id: 'DOC002',
    title: '糖尿病药物治疗的最新进展',
    category: 'research_paper',
    type: 'pdf',
    status: 'processing',
    size: '8.7MB',
    pages: 32,
    uploadDate: '2024-01-20',
    processedDate: null,
    author: '张三, 李四, 王五',
    publisher: '中华内分泌代谢杂志',
    year: 2024,
    doi: '10.1234/dm.2024.002',
    abstract: '本文综述了糖尿病药物治疗的最新研究进展，包括新型降糖药物的临床应用和安全性评价。',
    keywords: ['糖尿病', '药物治疗', '新型药物', '安全性'],
    tags: ['糖尿病', '药物', '研究'],
    embeddings: {
      vectorSize: 1536,
      chunks: 12,
      processed: false
    },
    metadata: {
      language: 'zh-CN',
      quality: 'medium',
      relevance: 0.87
    }
  }, {
    id: 'DOC003',
    title: 'AI在医学影像诊断中的应用',
    category: 'review_article',
    type: 'pdf',
    status: 'failed',
    size: '12.3MB',
    pages: 68,
    uploadDate: '2024-01-18',
    processedDate: null,
    author: '刘六, 赵七',
    publisher: '中华放射学杂志',
    year: 2023,
    doi: '10.1234/radiol.2023.003',
    abstract: '本文回顾了人工智能在医学影像诊断中的应用现状，包括深度学习算法、临床验证和未来发展方向。',
    keywords: ['人工智能', '医学影像', '深度学习', '诊断'],
    tags: ['AI', '影像', '诊断'],
    embeddings: {
      vectorSize: 1536,
      chunks: 0,
      processed: false
    },
    metadata: {
      language: 'zh-CN',
      quality: 'high',
      relevance: 0.92
    }
  }, {
    id: 'DOC004',
    title: '肿瘤免疫治疗临床实践指南',
    category: 'clinical_guideline',
    type: 'pdf',
    status: 'processed',
    size: '18.9MB',
    pages: 312,
    uploadDate: '2024-01-10',
    processedDate: '2024-01-12',
    author: '中国临床肿瘤学会',
    publisher: '中华肿瘤杂志',
    year: 2024,
    doi: '10.1234/cco.2024.004',
    abstract: '本指南系统介绍了肿瘤免疫治疗的临床应用，包括适应症、治疗方案、不良反应管理等内容。',
    keywords: ['肿瘤', '免疫治疗', '临床指南', '不良反应'],
    tags: ['肿瘤', '免疫', '指南'],
    embeddings: {
      vectorSize: 1536,
      chunks: 62,
      processed: true
    },
    metadata: {
      language: 'zh-CN',
      quality: 'high',
      relevance: 0.96
    }
  }];
  useEffect(() => {
    setDocuments(mockDocuments);
  }, []);
  const getStatusBadge = status => {
    const statusConfig = {
      processed: {
        color: 'bg-green-100 text-green-800',
        icon: CheckCircle,
        text: '已处理'
      },
      processing: {
        color: 'bg-yellow-100 text-yellow-800',
        icon: Clock,
        text: '处理中'
      },
      failed: {
        color: 'bg-red-100 text-red-800',
        icon: AlertCircle,
        text: '处理失败'
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
      clinical_guideline: {
        color: 'bg-blue-100 text-blue-800',
        text: '临床指南'
      },
      research_paper: {
        color: 'bg-purple-100 text-purple-800',
        text: '研究论文'
      },
      review_article: {
        color: 'bg-green-100 text-green-800',
        text: '综述文章'
      },
      case_report: {
        color: 'bg-orange-100 text-orange-800',
        text: '病例报告'
      },
      textbook: {
        color: 'bg-pink-100 text-pink-800',
        text: '教科书'
      }
    };
    const config = categoryConfig[category] || categoryConfig.research_paper;
    return <Badge className={config.color}>{config.text}</Badge>;
  };
  const formatFileSize = size => {
    return size;
  };
  const handleViewDetails = documentId => {
    toast({
      title: "查看详情",
      description: `正在查看文档 ${documentId} 的详细信息`
    });
  };
  const handleEdit = documentId => {
    toast({
      title: "编辑文档",
      description: `正在编辑文档 ${documentId}`
    });
  };
  const handleReprocess = documentId => {
    setDocuments(prev => prev.map(doc => doc.id === documentId ? {
      ...doc,
      status: 'processing'
    } : doc));
    toast({
      title: "重新处理",
      description: `文档 ${documentId} 正在重新处理`
    });
  };
  const handleDelete = documentId => {
    setDocuments(prev => prev.filter(doc => doc.id !== documentId));
    toast({
      title: "删除成功",
      description: `文档 ${documentId} 已删除`,
      variant: "destructive"
    });
  };
  const handleUpload = () => {
    toast({
      title: "上传文档",
      description: "正在打开文档上传界面"
    });
  };
  const handleExport = () => {
    toast({
      title: "导出数据",
      description: "正在导出文档数据..."
    });
  };
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) || doc.author.toLowerCase().includes(searchTerm.toLowerCase()) || doc.keywords.some(k => k.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || doc.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });
  return <div className={className} style={style}>
      <div className="space-y-6">
        {/* 头部 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">文献库管理</h1>
            <p className="text-gray-600">管理医学文献资源，包括上传、处理、分类和检索配置</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={handleExport}>
              <Download className="w-4 h-4 mr-2" />
              导出数据
            </Button>
            <Button onClick={handleUpload}>
              <Upload className="w-4 h-4 mr-2" />
              上传文档
            </Button>
          </div>
        </div>

        {/* 筛选器 */}
        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input placeholder="搜索文档标题、作者或关键词..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10" />
              </div>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="选择分类" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部分类</SelectItem>
                  <SelectItem value="clinical_guideline">临床指南</SelectItem>
                  <SelectItem value="research_paper">研究论文</SelectItem>
                  <SelectItem value="review_article">综述文章</SelectItem>
                  <SelectItem value="case_report">病例报告</SelectItem>
                  <SelectItem value="textbook">教科书</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="选择状态" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部状态</SelectItem>
                  <SelectItem value="processed">已处理</SelectItem>
                  <SelectItem value="processing">处理中</SelectItem>
                  <SelectItem value="failed">处理失败</SelectItem>
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
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">总文档数</p>
                  <p className="text-2xl font-bold text-gray-900">{documents.length}</p>
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
                  <p className="text-sm text-gray-600">已处理</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {documents.filter(d => d.status === 'processed').length}
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
                    {documents.filter(d => d.status === 'processing').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Folder className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">总页数</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {documents.reduce((sum, d) => sum + d.pages, 0)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 文档列表 */}
        <Card>
          <CardHeader>
            <CardTitle>文档列表</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>文档标题</TableHead>
                  <TableHead>分类</TableHead>
                  <TableHead>作者</TableHead>
                  <TableHead>大小/页数</TableHead>
                  <TableHead>上传日期</TableHead>
                  <TableHead>处理状态</TableHead>
                  <TableHead>向量块</TableHead>
                  <TableHead>质量评分</TableHead>
                  <TableHead>操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDocuments.map(doc => <TableRow key={doc.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium text-gray-900">{doc.title}</div>
                        <div className="text-sm text-gray-500">{doc.publisher} • {doc.year}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getCategoryBadge(doc.category)}
                    </TableCell>
                    <TableCell>
                      <div className="text-gray-900">{doc.author}</div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="text-gray-900">{formatFileSize(doc.size)}</div>
                        <div className="text-sm text-gray-500">{doc.pages} 页</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-gray-900">{doc.uploadDate}</div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(doc.status)}
                    </TableCell>
                    <TableCell>
                      <div className="text-gray-900">{doc.embeddings.chunks}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div className={`h-2 rounded-full ${doc.metadata.relevance >= 0.9 ? 'bg-green-500' : doc.metadata.relevance >= 0.8 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{
                        width: `${doc.metadata.relevance * 100}%`
                      }}></div>
                        </div>
                        <span className="text-sm text-gray-900">{(doc.metadata.relevance * 100).toFixed(0)}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => handleViewDetails(doc.id)}>
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(doc.id)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        {doc.status !== 'processed' && <Button variant="ghost" size="sm" onClick={() => handleReprocess(doc.id)}>
                            <Upload className="w-4 h-4" />
                          </Button>}
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(doc.id)}>
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