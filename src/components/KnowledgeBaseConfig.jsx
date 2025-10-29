// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Select, Badge, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, useToast, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui';
// @ts-ignore;
import { Upload, Search, Filter, Download, Eye, Edit, Trash2, Plus, Database, FileText, Folder, Settings, RefreshCw, CheckCircle, AlertCircle, Clock } from 'lucide-react';

export function KnowledgeBaseConfig({
  $w,
  onUploadDocument,
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
  const [uploading, setUploading] = useState(false);
  const mockDocuments = [{
    id: 'DOC001',
    name: '心血管疾病诊疗指南2024版',
    type: 'guideline',
    category: 'cardiology',
    status: 'indexed',
    size: 2048576,
    pages: 156,
    uploadDate: '2024-01-15',
    lastUpdated: '2024-01-20',
    uploadedBy: '张医生',
    description: '最新版心血管疾病诊疗指南，包含诊断标准、治疗方案等内容',
    tags: ['心血管', '诊疗指南', '2024版'],
    indexedPages: 156,
    processingStatus: 'completed',
    embeddings: 2048,
    version: 'v2.1'
  }, {
    id: 'DOC002',
    name: '糖尿病管理手册',
    type: 'handbook',
    category: 'endocrinology',
    status: 'processing',
    size: 1536000,
    pages: 98,
    uploadDate: '2024-02-10',
    lastUpdated: '2024-02-10',
    uploadedBy: '李医生',
    description: '糖尿病患者的综合管理手册，涵盖饮食、运动、药物治疗等方面',
    tags: ['糖尿病', '管理手册', '综合治疗'],
    indexedPages: 45,
    processingStatus: 'processing',
    embeddings: 896,
    version: 'v1.0'
  }, {
    id: 'DOC003',
    name: '肿瘤免疫治疗研究进展',
    type: 'research',
    category: 'oncology',
    status: 'pending',
    size: 3072000,
    pages: 234,
    uploadDate: '2024-02-15',
    lastUpdated: '2024-02-15',
    uploadedBy: '王教授',
    description: '肿瘤免疫治疗最新研究进展综述，包含临床试验数据和案例分析',
    tags: ['肿瘤', '免疫治疗', '研究进展'],
    indexedPages: 0,
    processingStatus: 'pending',
    embeddings: 0,
    version: 'v1.0'
  }, {
    id: 'DOC004',
    name: '医学影像诊断标准',
    type: 'standard',
    category: 'radiology',
    status: 'indexed',
    size: 1024000,
    pages: 67,
    uploadDate: '2024-01-08',
    lastUpdated: '2024-01-12',
    uploadedBy: '赵医生',
    description: '医学影像诊断的标准操作程序和质量控制要求',
    tags: ['医学影像', '诊断标准', '质量控制'],
    indexedPages: 67,
    processingStatus: 'completed',
    embeddings: 1024,
    version: 'v3.0'
  }];
  useEffect(() => {
    setDocuments(mockDocuments);
  }, []);
  const categories = [{
    value: 'all',
    label: '全部类别'
  }, {
    value: 'cardiology',
    label: '心血管'
  }, {
    value: 'endocrinology',
    label: '内分泌'
  }, {
    value: 'oncology',
    label: '肿瘤'
  }, {
    value: 'radiology',
    label: '放射学'
  }];
  const documentTypes = [{
    value: 'guideline',
    label: '诊疗指南'
  }, {
    value: 'handbook',
    label: '手册'
  }, {
    value: 'research',
    label: '研究文献'
  }, {
    value: 'standard',
    label: '标准规范'
  }];
  const getStatusBadge = status => {
    const statusConfig = {
      indexed: {
        color: 'bg-green-100 text-green-800',
        icon: CheckCircle,
        text: '已索引'
      },
      processing: {
        color: 'bg-blue-100 text-blue-800',
        icon: Clock,
        text: '处理中'
      },
      pending: {
        color: 'bg-yellow-100 text-yellow-800',
        icon: AlertCircle,
        text: '待处理'
      },
      failed: {
        color: 'bg-red-100 text-red-800',
        icon: AlertCircle,
        text: '处理失败'
      }
    };
    const config = statusConfig[status] || statusConfig.pending;
    const Icon = config.icon;
    return <Badge className={config.color}>
        <Icon className="w-3 h-3 mr-1" />
        {config.text}
      </Badge>;
  };
  const getTypeBadge = type => {
    const typeConfig = {
      guideline: 'bg-purple-100 text-purple-800',
      handbook: 'bg-blue-100 text-blue-800',
      research: 'bg-green-100 text-green-800',
      standard: 'bg-orange-100 text-orange-800'
    };
    const typeLabels = {
      guideline: '诊疗指南',
      handbook: '手册',
      research: '研究文献',
      standard: '标准规范'
    };
    return <Badge className={typeConfig[type] || 'bg-gray-100 text-gray-800'}>
        {typeLabels[type] || type}
      </Badge>;
  };
  const formatFileSize = bytes => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };
  const handleFileUpload = event => {
    const files = event.target.files;
    if (files.length > 0) {
      setUploading(true);
      // 模拟文件上传
      setTimeout(() => {
        const newDocument = {
          id: `DOC${Date.now()}`,
          name: files[0].name,
          type: 'research',
          category: 'cardiology',
          status: 'pending',
          size: files[0].size,
          pages: Math.floor(Math.random() * 100) + 50,
          uploadDate: new Date().toISOString().split('T')[0],
          lastUpdated: new Date().toISOString().split('T')[0],
          uploadedBy: $w.auth.currentUser?.name || '当前用户',
          description: '新上传的文档',
          tags: ['新文档'],
          indexedPages: 0,
          processingStatus: 'pending',
          embeddings: 0,
          version: 'v1.0'
        };
        setDocuments(prev => [newDocument, ...prev]);
        setUploading(false);
        if (onUploadDocument) {
          onUploadDocument(files[0]);
        }
        toast({
          title: "上传成功",
          description: `文档 ${files[0].name} 已上传成功`
        });
      }, 2000);
    }
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
  const handleDelete = documentId => {
    setDocuments(prev => prev.filter(doc => doc.id !== documentId));
    toast({
      title: "删除成功",
      description: `文档 ${documentId} 已删除`,
      variant: "destructive"
    });
  };
  const handleReindex = documentId => {
    setDocuments(prev => prev.map(doc => doc.id === documentId ? {
      ...doc,
      status: 'processing',
      processingStatus: 'processing'
    } : doc));
    toast({
      title: "重新索引",
      description: `文档 ${documentId} 正在重新索引`
    });
  };
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = !searchTerm || doc.name.toLowerCase().includes(searchTerm.toLowerCase()) || doc.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || doc.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });
  const totalDocuments = documents.length;
  const indexedDocuments = documents.filter(doc => doc.status === 'indexed').length;
  const processingDocuments = documents.filter(doc => doc.status === 'processing').length;
  const totalSize = documents.reduce((sum, doc) => sum + doc.size, 0);
  const totalEmbeddings = documents.reduce((sum, doc) => sum + doc.embeddings, 0);
  return <div className={className} style={style}>
      <div className="space-y-6">
        {/* 统计概览 */}
        <div className="grid grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Database className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">总文档数</p>
                  <p className="text-2xl font-bold text-gray-900">{totalDocuments}</p>
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
                  <p className="text-2xl font-bold text-gray-900">{indexedDocuments}</p>
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
                  <p className="text-2xl font-bold text-gray-900">{processingDocuments}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Settings className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">嵌入向量</p>
                  <p className="text-2xl font-bold text-gray-900">{totalEmbeddings.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 上传和筛选区域 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center">
                <Upload className="w-5 h-5 mr-2" />
                知识库管理
              </span>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  刷新索引
                </Button>
                <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4 mr-2" />
                  配置设置
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* 文件上传 */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <div className="space-y-2">
                  <p className="text-lg font-medium text-gray-900">上传文档</p>
                  <p className="text-sm text-gray-600">支持PDF、Word、TXT格式，最大50MB</p>
                </div>
                <div className="mt-4">
                  <input type="file" accept=".pdf,.doc,.docx,.txt" onChange={handleFileUpload} className="hidden" id="file-upload" />
                  <Button onClick={() => document.getElementById('file-upload').click()} disabled={uploading}>
                    {uploading ? '上传中...' : '选择文件'}
                  </Button>
                </div>
              </div>

              {/* 筛选器 */}
              <div className="grid grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input placeholder="搜索文档名称或描述..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10" />
                </div>
                
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="选择类别" />
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
                    <SelectItem value="pending">待处理</SelectItem>
                    <SelectItem value="failed">处理失败</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 文档列表 */}
        <Card>
          <CardHeader>
            <CardTitle>文档列表</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>文档名称</TableHead>
                  <TableHead>类型</TableHead>
                  <TableHead>类别</TableHead>
                  <TableHead>大小</TableHead>
                  <TableHead>页数</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead>上传者</TableHead>
                  <TableHead>上传时间</TableHead>
                  <TableHead>操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDocuments.map(doc => <TableRow key={doc.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium text-gray-900">{doc.name}</div>
                        <div className="text-sm text-gray-500">{doc.description}</div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {doc.tags.map((tag, index) => <span key={index} className="px-1 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                              {tag}
                            </span>)}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getTypeBadge(doc.type)}
                    </TableCell>
                    <TableCell>
                      <div className="text-gray-900">{doc.category}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-gray-900">{formatFileSize(doc.size)}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-gray-900">{doc.pages}</div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(doc.status)}
                    </TableCell>
                    <TableCell>
                      <div className="text-gray-900">{doc.uploadedBy}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-gray-900">{doc.uploadDate}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => handleViewDetails(doc.id)}>
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(doc.id)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        {doc.status === 'indexed' && <Button variant="ghost" size="sm" onClick={() => handleReindex(doc.id)}>
                            <RefreshCw className="w-4 h-4" />
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