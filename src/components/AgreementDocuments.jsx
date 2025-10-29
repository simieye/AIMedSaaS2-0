// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Select, Badge, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, useToast, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui';
// @ts-ignore;
import { Search, Filter, Download, Upload, Eye, Edit, Trash2, Plus, FileText, Calendar, AlertCircle, CheckCircle, Clock, FolderOpen, Tag, User, HardDrive } from 'lucide-react';

export function AgreementDocuments({
  $w,
  agreementId,
  className,
  style
}) {
  const {
    toast
  } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const mockDocuments = [{
    id: 'DOC001',
    agreementId: 'AGR001',
    name: '主协议.pdf',
    type: 'main_agreement',
    size: '2.5MB',
    version: 'v1.0',
    status: 'active',
    uploadDate: '2024-01-01 10:00:00',
    uploadBy: '张三',
    lastModified: '2024-01-15 14:30:00',
    modifiedBy: '李四',
    description: '合作协议主文档，包含所有基本条款和条件',
    tags: ['主协议', '正式版', '已签署'],
    url: '/documents/main_agreement.pdf',
    downloadCount: 45,
    category: 'legal'
  }, {
    id: 'DOC002',
    agreementId: 'AGR001',
    name: '技术附件.pdf',
    type: 'technical_attachment',
    size: '1.8MB',
    version: 'v2.1',
    status: 'active',
    uploadDate: '2024-01-01 10:15:00',
    uploadBy: '张三',
    lastModified: '2024-01-10 09:20:00',
    modifiedBy: '王五',
    description: '技术规格说明和系统要求文档',
    tags: ['技术', '规格', '系统要求'],
    url: '/documents/technical_attachment.pdf',
    downloadCount: 32,
    category: 'technical'
  }, {
    id: 'DOC003',
    agreementId: 'AGR001',
    name: '保密协议.pdf',
    type: 'confidentiality_agreement',
    size: '856KB',
    version: 'v1.0',
    status: 'active',
    uploadDate: '2024-01-01 10:30:00',
    uploadBy: '张三',
    lastModified: '2024-01-01 10:30:00',
    modifiedBy: '张三',
    description: '保密协议和数据处理条款',
    tags: ['保密', '数据保护', '合规'],
    url: '/documents/confidentiality_agreement.pdf',
    downloadCount: 28,
    category: 'legal'
  }, {
    id: 'DOC004',
    agreementId: 'AGR001',
    name: '实施计划.pdf',
    type: 'implementation_plan',
    size: '1.2MB',
    version: 'v1.5',
    status: 'draft',
    uploadDate: '2024-01-05 15:45:00',
    uploadBy: '李四',
    lastModified: '2024-01-18 11:15:00',
    modifiedBy: '李四',
    description: '项目实施计划和时间安排',
    tags: ['实施', '计划', '时间表'],
    url: '/documents/implementation_plan.pdf',
    downloadCount: 15,
    category: 'project'
  }, {
    id: 'DOC005',
    agreementId: 'AGR001',
    name: '会议纪要_20240110.pdf',
    type: 'meeting_minutes',
    size: '445KB',
    version: 'v1.0',
    status: 'active',
    uploadDate: '2024-01-10 16:30:00',
    uploadBy: '王五',
    lastModified: '2024-01-10 16:30:00',
    modifiedBy: '王五',
    description: '2024年1月10日项目启动会议纪要',
    tags: ['会议', '纪要', '启动'],
    url: '/documents/meeting_minutes_20240110.pdf',
    downloadCount: 8,
    category: 'communication'
  }];
  const documentTypes = [{
    value: 'all',
    label: '全部类型'
  }, {
    value: 'main_agreement',
    label: '主协议'
  }, {
    value: 'technical_attachment',
    label: '技术附件'
  }, {
    value: 'confidentiality_agreement',
    label: '保密协议'
  }, {
    value: 'implementation_plan',
    label: '实施计划'
  }, {
    value: 'meeting_minutes',
    label: '会议纪要'
  }, {
    value: 'appendix',
    label: '附录'
  }];
  const categories = [{
    value: 'all',
    label: '全部分类'
  }, {
    value: 'legal',
    label: '法律文件'
  }, {
    value: 'technical',
    label: '技术文档'
  }, {
    value: 'project',
    label: '项目文档'
  }, {
    value: 'communication',
    label: '沟通记录'
  }];
  useEffect(() => {
    setDocuments(mockDocuments);
  }, [agreementId]);
  const getStatusBadge = status => {
    const statusConfig = {
      active: {
        color: 'bg-green-100 text-green-800',
        icon: CheckCircle,
        text: '激活'
      },
      draft: {
        color: 'bg-yellow-100 text-yellow-800',
        icon: Clock,
        text: '草稿'
      },
      archived: {
        color: 'bg-gray-100 text-gray-800',
        icon: AlertCircle,
        text: '已归档'
      }
    };
    const config = statusConfig[status] || statusConfig.draft;
    const Icon = config.icon;
    return <Badge className={config.color}>
        <Icon className="w-3 h-3 mr-1" />
        {config.text}
      </Badge>;
  };
  const getTypeBadge = type => {
    const typeConfig = {
      main_agreement: {
        color: 'bg-blue-100 text-blue-800',
        text: '主协议'
      },
      technical_attachment: {
        color: 'bg-purple-100 text-purple-800',
        text: '技术附件'
      },
      confidentiality_agreement: {
        color: 'bg-red-100 text-red-800',
        text: '保密协议'
      },
      implementation_plan: {
        color: 'bg-green-100 text-green-800',
        text: '实施计划'
      },
      meeting_minutes: {
        color: 'bg-orange-100 text-orange-800',
        text: '会议纪要'
      },
      appendix: {
        color: 'bg-gray-100 text-gray-800',
        text: '附录'
      }
    };
    const config = typeConfig[type] || typeConfig.main_agreement;
    return <Badge className={config.color}>{config.text}</Badge>;
  };
  const getCategoryBadge = category => {
    const categoryConfig = {
      legal: {
        color: 'bg-red-100 text-red-800',
        text: '法律文件'
      },
      technical: {
        color: 'bg-blue-100 text-blue-800',
        text: '技术文档'
      },
      project: {
        color: 'bg-green-100 text-green-800',
        text: '项目文档'
      },
      communication: {
        color: 'bg-purple-100 text-purple-800',
        text: '沟通记录'
      }
    };
    const config = categoryConfig[category] || categoryConfig.legal;
    return <Badge className={config.color}>{config.text}</Badge>;
  };
  const handleViewDocument = document => {
    toast({
      title: "查看文档",
      description: `正在查看 ${document.name}`
    });
  };
  const handleDownloadDocument = document => {
    toast({
      title: "下载文档",
      description: `正在下载 ${document.name}...`
    });
    // 更新下载次数
    setDocuments(prev => prev.map(doc => doc.id === document.id ? {
      ...doc,
      downloadCount: doc.downloadCount + 1
    } : doc));
  };
  const handleEditDocument = document => {
    toast({
      title: "编辑文档",
      description: `正在编辑 ${document.name}`
    });
  };
  const handleDeleteDocument = documentId => {
    setDocuments(prev => prev.filter(doc => doc.id !== documentId));
    toast({
      title: "删除成功",
      description: "文档已删除",
      variant: "destructive"
    });
  };
  const handleFileUpload = event => {
    const files = Array.from(event.target.files);
    if (files.length === 0) return;
    setUploading(true);
    setTimeout(() => {
      const newDocuments = files.map((file, index) => ({
        id: `DOC${Date.now()}${index}`,
        agreementId: agreementId,
        name: file.name,
        type: 'appendix',
        size: `${(file.size / 1024 / 1024).toFixed(2)}MB`,
        version: 'v1.0',
        status: 'active',
        uploadDate: new Date().toISOString(),
        uploadBy: '当前用户',
        lastModified: new Date().toISOString(),
        modifiedBy: '当前用户',
        description: '新上传的文档',
        tags: ['新上传'],
        url: URL.createObjectURL(file),
        downloadCount: 0,
        category: 'project'
      }));
      setDocuments(prev => [...prev, ...newDocuments]);
      setUploading(false);
      toast({
        title: "上传成功",
        description: `已上传 ${files.length} 个文档`
      });
    }, 2000);
  };
  const filteredDocuments = documents.filter(document => {
    const matchesSearch = document.name.toLowerCase().includes(searchTerm.toLowerCase()) || document.description.toLowerCase().includes(searchTerm.toLowerCase()) || document.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = selectedType === 'all' || document.type === selectedType;
    const matchesCategory = selectedCategory === 'all' || document.category === selectedCategory;
    return matchesSearch && matchesType && matchesCategory;
  });
  return <div className={className} style={style}>
      <div className="space-y-6">
        {/* 头部 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">协议文档管理</h1>
            <p className="text-gray-600">管理协议相关的所有文档和文件</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <input type="file" multiple accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx" onChange={handleFileUpload} className="hidden" id="file-upload" />
              <Button onClick={() => document.getElementById('file-upload').click()} disabled={uploading}>
                {uploading ? <>
                    <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    上传中...
                  </> : <>
                    <Upload className="w-4 h-4 mr-2" />
                    上传文档
                  </>}
              </Button>
            </div>
          </div>
        </div>

        {/* 筛选器 */}
        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input placeholder="搜索文档名称、描述或标签..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10" />
              </div>
              
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="选择文档类型" />
                </SelectTrigger>
                <SelectContent>
                  {documentTypes.map(type => <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>)}
                </SelectContent>
              </Select>

              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="选择文档分类" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>)}
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
                  <p className="text-sm text-gray-600">激活文档</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {documents.filter(d => d.status === 'active').length}
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
                  <p className="text-sm text-gray-600">草稿文档</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {documents.filter(d => d.status === 'draft').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <HardDrive className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">总大小</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {documents.reduce((total, doc) => total + parseFloat(doc.size), 0).toFixed(1)}MB
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
                  <TableHead>文档名称</TableHead>
                  <TableHead>类型</TableHead>
                  <TableHead>分类</TableHead>
                  <TableHead>版本</TableHead>
                  <TableHead>大小</TableHead>
                  <TableHead>上传者</TableHead>
                  <TableHead>上传时间</TableHead>
                  <TableHead>下载次数</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead>操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDocuments.map(document => <TableRow key={document.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-gray-100 rounded-lg">
                          <FileText className="w-5 h-5 text-gray-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{document.name}</div>
                          <div className="text-sm text-gray-500">{document.description}</div>
                          <div className="flex items-center space-x-1 mt-1">
                            {document.tags.slice(0, 2).map((tag, index) => <Badge key={index} variant="outline" className="text-xs">
                                {tag}
                              </Badge>)}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getTypeBadge(document.type)}
                    </TableCell>
                    <TableCell>
                      {getCategoryBadge(document.category)}
                    </TableCell>
                    <TableCell>
                      <div className="font-medium text-gray-900">{document.version}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-gray-900">{document.size}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-900">{document.uploadBy}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-gray-900">{document.uploadDate}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Download className="w-3 h-3 text-gray-400" />
                        <span className="text-gray-900">{document.downloadCount}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(document.status)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => handleViewDocument(document)}>
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDownloadDocument(document)}>
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleEditDocument(document)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteDocument(document.id)}>
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