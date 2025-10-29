// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Badge, useToast } from '@/components/ui';
// @ts-ignore;
import { Download, Eye, Edit, Share2, Calendar, User, FileText, Tag, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

export function DocumentPreview({
  $w,
  documentId,
  onClose,
  className,
  style
}) {
  const {
    toast
  } = useToast();
  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(true);
  const [previewMode, setPreviewMode] = useState('view');
  const mockDocument = {
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
    category: 'legal',
    content: {
      pages: 25,
      words: 15000,
      created: '2024-01-01',
      modified: '2024-01-15',
      author: '张三',
      subject: 'AI诊断系统合作协议',
      keywords: ['AI诊断', '合作协议', '医疗技术', '战略合作']
    },
    permissions: {
      canView: true,
      canEdit: true,
      canDownload: true,
      canShare: true,
      canDelete: false
    },
    versions: [{
      version: 'v1.0',
      date: '2024-01-01 10:00:00',
      author: '张三',
      changes: '初始版本',
      size: '2.5MB'
    }, {
      version: 'v0.9',
      date: '2023-12-28 15:30:00',
      author: '李四',
      changes: '修订付款条款',
      size: '2.3MB'
    }, {
      version: 'v0.8',
      date: '2023-12-25 09:15:00',
      author: '王五',
      changes: '添加保密条款',
      size: '2.1MB'
    }]
  };
  useEffect(() => {
    setTimeout(() => {
      setDocument(mockDocument);
      setLoading(false);
    }, 1000);
  }, [documentId]);
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
        icon: AlertTriangle,
        text: '已归档'
      }
    };
    const config = statusConfig[status] || statusConfig.active;
    const Icon = config.icon;
    return <Badge className={config.color}>
        <Icon className="w-3 h-3 mr-1" />
        {config.text}
      </Badge>;
  };
  const handleDownload = () => {
    toast({
      title: "下载文档",
      description: `正在下载 ${document.name}...`
    });
  };
  const handleShare = () => {
    toast({
      title: "分享文档",
      description: "正在生成分享链接..."
    });
  };
  const handleEdit = () => {
    setPreviewMode('edit');
    toast({
      title: "编辑模式",
      description: "已切换到编辑模式"
    });
  };
  const handleVersionChange = version => {
    toast({
      title: "版本切换",
      description: `已切换到版本 ${version}`
    });
  };
  if (loading) {
    return <div className={className} style={style}>
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">加载中...</div>
        </div>
      </div>;
  }
  if (!document) {
    return <div className={className} style={style}>
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">文档不存在</div>
        </div>
      </div>;
  }
  return <div className={className} style={style}>
      <div className="space-y-6">
        {/* 头部 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{document.name}</h1>
              <div className="flex items-center space-x-3 mt-1">
                {getStatusBadge(document.status)}
                <span className="text-gray-600">版本: {document.version}</span>
                <span className="text-gray-600">大小: {document.size}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {document.permissions.canDownload && <Button variant="outline" onClick={handleDownload}>
                <Download className="w-4 h-4 mr-2" />
                下载
              </Button>}
            {document.permissions.canShare && <Button variant="outline" onClick={handleShare}>
                <Share2 className="w-4 h-4 mr-2" />
                分享
              </Button>}
            {document.permissions.canEdit && <Button onClick={handleEdit}>
                <Edit className="w-4 h-4 mr-2" />
                编辑
              </Button>}
            {onClose && <Button variant="outline" onClick={onClose}>
                关闭
              </Button>}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* 主要内容区 */}
          <div className="col-span-2 space-y-6">
            {/* 文档预览 */}
            <Card>
              <CardHeader>
                <CardTitle>文档预览</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 rounded-lg p-8 text-center">
                  <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <div className="text-gray-600 mb-2">PDF 文档预览</div>
                  <div className="text-sm text-gray-500 mb-4">
                    {document.content.pages} 页 • {document.content.words.toLocaleString()} 字
                  </div>
                  <Button onClick={handleDownload}>
                    <Download className="w-4 h-4 mr-2" />
                    下载完整文档
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* 版本历史 */}
            <Card>
              <CardHeader>
                <CardTitle>版本历史</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {document.versions.map((version, index) => <div key={index} className={`border rounded-lg p-4 ${index === 0 ? 'border-blue-500 bg-blue-50' : ''}`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${index === 0 ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                          <div>
                            <div className="font-medium text-gray-900">
                              版本 {version.version}
                              {index === 0 && <span className="ml-2 text-sm text-blue-600">(当前版本)</span>}
                            </div>
                            <div className="text-sm text-gray-500">{version.changes}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-600">{version.author}</div>
                          <div className="text-sm text-gray-500">{version.date}</div>
                        </div>
                      </div>
                      {index !== 0 && <div className="mt-3 pt-3 border-t border-gray-200">
                          <Button variant="outline" size="sm" onClick={() => handleVersionChange(version.version)}>
                            <Eye className="w-4 h-4 mr-2" />
                            查看此版本
                          </Button>
                        </div>}
                    </div>)}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 侧边栏 */}
          <div className="space-y-6">
            {/* 文档信息 */}
            <Card>
              <CardHeader>
                <CardTitle>文档信息</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">基本信息</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">文档类型</span>
                        <span className="font-medium">{document.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">分类</span>
                        <span className="font-medium">{document.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">大小</span>
                        <span className="font-medium">{document.size}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">页数</span>
                        <span className="font-medium">{document.content.pages}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">时间信息</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">创建时间</span>
                        <span className="font-medium">{document.uploadDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">修改时间</span>
                        <span className="font-medium">{document.lastModified}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">人员信息</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">上传者</span>
                        <span className="font-medium">{document.uploadBy}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">修改者</span>
                        <span className="font-medium">{document.modifiedBy}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 标签 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Tag className="w-5 h-5 mr-2" />
                  标签
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {document.tags.map((tag, index) => <Badge key={index} variant="outline">
                      {tag}
                    </Badge>)}
                </div>
              </CardContent>
            </Card>

            {/* 权限信息 */}
            <Card>
              <CardHeader>
                <CardTitle>权限信息</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">查看</span>
                    {document.permissions.canView ? <CheckCircle className="w-4 h-4 text-green-500" /> : <AlertTriangle className="w-4 h-4 text-red-500" />}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">编辑</span>
                    {document.permissions.canEdit ? <CheckCircle className="w-4 h-4 text-green-500" /> : <AlertTriangle className="w-4 h-4 text-red-500" />}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">下载</span>
                    {document.permissions.canDownload ? <CheckCircle className="w-4 h-4 text-green-500" /> : <AlertTriangle className="w-4 h-4 text-red-500" />}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">分享</span>
                    {document.permissions.canShare ? <CheckCircle className="w-4 h-4 text-green-500" /> : <AlertTriangle className="w-4 h-4 text-red-500" />}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">删除</span>
                    {document.permissions.canDelete ? <CheckCircle className="w-4 h-4 text-green-500" /> : <AlertTriangle className="w-4 h-4 text-red-500" />}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 统计信息 */}
            <Card>
              <CardHeader>
                <CardTitle>统计信息</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">下载次数</span>
                    <span className="font-medium">{document.downloadCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">字数</span>
                    <span className="font-medium">{document.content.words.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">版本数</span>
                    <span className="font-medium">{document.versions.length}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>;
}