// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Select, Badge, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, useToast, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui';
// @ts-ignore;
import { Search, Filter, Download, Eye, ExternalLink, Calendar, User, FileText, BookOpen, Star, TrendingUp } from 'lucide-react';

export function LiteratureLibrary({
  $w,
  onSearch,
  className,
  style
}) {
  const {
    toast
  } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');
  const [literature, setLiterature] = useState([]);
  const [loading, setLoading] = useState(false);
  const mockLiterature = [{
    id: 'LIT001',
    title: '人工智能在心血管疾病诊断中的应用研究',
    authors: ['张三', '李四', '王五'],
    journal: '中华心血管病杂志',
    year: 2024,
    volume: 52,
    issue: 3,
    pages: '234-242',
    doi: '10.1234/ccm.2024.52.3.234',
    abstract: '本研究探讨了人工智能技术在心血管疾病诊断中的应用，通过深度学习算法分析医学影像，提高了诊断准确性和效率...',
    category: 'cardiology',
    keywords: ['人工智能', '心血管疾病', '深度学习', '医学影像'],
    citationCount: 45,
    relevanceScore: 0.95,
    openAccess: true,
    pdfUrl: 'https://example.com/paper1.pdf',
    publishedDate: '2024-03-15',
    indexed: true
  }, {
    id: 'LIT002',
    title: '糖尿病视网膜病变的AI辅助诊断系统开发',
    authors: ['赵六', '钱七', '孙八'],
    journal: '中华糖尿病杂志',
    year: 2024,
    volume: 16,
    issue: 2,
    pages: '123-130',
    doi: '10.5678/dm.2024.16.2.123',
    abstract: '开发了一套基于深度学习的糖尿病视网膜病变AI辅助诊断系统，通过眼底图像分析实现早期病变检测...',
    category: 'endocrinology',
    keywords: ['糖尿病', '视网膜病变', 'AI诊断', '眼底图像'],
    citationCount: 32,
    relevanceScore: 0.88,
    openAccess: false,
    pdfUrl: null,
    publishedDate: '2024-02-20',
    indexed: true
  }, {
    id: 'LIT003',
    title: '肿瘤免疫治疗的新进展与临床应用',
    authors: ['周九', '吴十', '郑十一'],
    journal: '中华肿瘤杂志',
    year: 2023,
    volume: 45,
    issue: 8,
    pages: '567-575',
    doi: '10.9012/cjo.2023.45.8.567',
    abstract: '综述了肿瘤免疫治疗的最新进展，包括CAR-T细胞疗法、PD-1/PD-L1抑制剂等新型治疗方法...',
    category: 'oncology',
    keywords: ['肿瘤免疫', 'CAR-T', 'PD-1', '免疫治疗'],
    citationCount: 78,
    relevanceScore: 0.82,
    openAccess: true,
    pdfUrl: 'https://example.com/paper3.pdf',
    publishedDate: '2023-08-10',
    indexed: true
  }, {
    id: 'LIT004',
    title: '医学影像AI算法的验证与标准化研究',
    authors: ['冯十二', '陈十三', '褚十四'],
    journal: '中华放射学杂志',
    year: 2024,
    volume: 58,
    issue: 1,
    pages: '45-52',
    doi: '10.3456/cjr.2024.58.1.45',
    abstract: '研究了医学影像AI算法的验证方法和标准化流程，提出了统一的评估框架和质量控制标准...',
    category: 'radiology',
    keywords: ['医学影像', 'AI算法', '验证', '标准化'],
    citationCount: 28,
    relevanceScore: 0.79,
    openAccess: true,
    pdfUrl: 'https://example.com/paper4.pdf',
    publishedDate: '2024-01-08',
    indexed: true
  }];
  useEffect(() => {
    setLiterature(mockLiterature);
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
  const years = [{
    value: 'all',
    label: '全部年份'
  }, {
    value: '2024',
    label: '2024年'
  }, {
    value: '2023',
    label: '2023年'
  }, {
    value: '2022',
    label: '2022年'
  }];
  const sortOptions = [{
    value: 'relevance',
    label: '相关性'
  }, {
    value: 'citation',
    label: '引用数'
  }, {
    value: 'date',
    label: '发表日期'
  }, {
    value: 'impact',
    label: '影响因子'
  }];
  const getCategoryBadge = category => {
    const categoryMap = {
      cardiology: 'bg-blue-100 text-blue-800',
      endocrinology: 'bg-green-100 text-green-800',
      oncology: 'bg-red-100 text-red-800',
      radiology: 'bg-purple-100 text-purple-800'
    };
    const categoryLabels = {
      cardiology: '心血管',
      endocrinology: '内分泌',
      oncology: '肿瘤',
      radiology: '放射学'
    };
    return <Badge className={categoryMap[category] || 'bg-gray-100 text-gray-800'}>
        {categoryLabels[category] || category}
      </Badge>;
  };
  const handleSearch = () => {
    setLoading(true);
    if (onSearch) {
      onSearch(searchQuery);
    }
    // 模拟搜索延迟
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "搜索完成",
        description: `找到 ${literature.length} 篇相关文献`
      });
    }, 1000);
  };
  const handleViewDetails = literatureId => {
    toast({
      title: "查看详情",
      description: `正在查看文献 ${literatureId} 的详细信息`
    });
  };
  const handleDownloadPDF = (literatureId, pdfUrl) => {
    if (pdfUrl) {
      toast({
        title: "下载PDF",
        description: `正在下载文献 ${literatureId} 的PDF文件`
      });
    } else {
      toast({
        title: "无法下载",
        description: "该文献不提供开放访问",
        variant: "destructive"
      });
    }
  };
  const handleExportCitation = literatureId => {
    toast({
      title: "导出引用",
      description: `正在导出文献 ${literatureId} 的引用格式`
    });
  };
  const filteredLiterature = literature.filter(item => {
    const matchesSearch = !searchQuery || item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.abstract.toLowerCase().includes(searchQuery.toLowerCase()) || item.authors.some(author => author.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesYear = selectedYear === 'all' || item.year.toString() === selectedYear;
    return matchesSearch && matchesCategory && matchesYear;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'relevance':
        return b.relevanceScore - a.relevanceScore;
      case 'citation':
        return b.citationCount - a.citationCount;
      case 'date':
        return new Date(b.publishedDate) - new Date(a.publishedDate);
      default:
        return 0;
    }
  });
  return <div className={className} style={style}>
      <div className="space-y-6">
        {/* 搜索区域 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Search className="w-5 h-5 mr-2" />
              文献检索
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* 主搜索框 */}
              <div className="flex space-x-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input placeholder="输入关键词、作者、DOI或文献标题..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-10 text-lg" />
                </div>
                <Button onClick={handleSearch} disabled={loading} className="px-8">
                  {loading ? '搜索中...' : '搜索'}
                </Button>
              </div>

              {/* 高级筛选 */}
              <div className="grid grid-cols-4 gap-4">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="选择学科类别" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>)}
                  </SelectContent>
                </Select>

                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger>
                    <SelectValue placeholder="选择发表年份" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map(year => <SelectItem key={year.value} value={year.value}>
                        {year.label}
                      </SelectItem>)}
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="排序方式" />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map(option => <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>)}
                  </SelectContent>
                </Select>

                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  高级筛选
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 搜索统计 */}
        <div className="flex items-center justify-between">
          <div className="text-gray-600">
            找到 <span className="font-semibold text-gray-900">{filteredLiterature.length}</span> 篇相关文献
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              导出结果
            </Button>
          </div>
        </div>

        {/* 文献列表 */}
        <div className="space-y-4">
          {filteredLiterature.map(item => <Card key={item.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* 标题和基本信息 */}
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600 cursor-pointer" onClick={() => handleViewDetails(item.id)}>
                        {item.title}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <User className="w-4 h-4" />
                          <span>{item.authors.join(', ')}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <BookOpen className="w-4 h-4" />
                          <span>{item.journal}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{item.year}年{item.volume}卷{item.issue}期</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      {getCategoryBadge(item.category)}
                      <div className="flex items-center space-x-1 text-sm text-gray-500">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span>{item.citationCount} 引用</span>
                      </div>
                      <div className="text-sm text-gray-500">
                        相关性: {(item.relevanceScore * 100).toFixed(0)}%
                      </div>
                    </div>
                  </div>

                  {/* 摘要 */}
                  <div className="text-gray-700 text-sm leading-relaxed">
                    {item.abstract}
                  </div>

                  {/* 关键词 */}
                  <div className="flex flex-wrap gap-2">
                    {item.keywords.map((keyword, index) => <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                        {keyword}
                      </span>)}
                  </div>

                  {/* 操作按钮 */}
                  <div className="flex items-center justify-between pt-2 border-t">
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <span>DOI: {item.doi}</span>
                      {item.openAccess && <Badge variant="secondary" className="text-green-700 bg-green-100">
                          开放访问
                        </Badge>}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => handleViewDetails(item.id)}>
                        <Eye className="w-4 h-4 mr-1" />
                        详情
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleExportCitation(item.id)}>
                        <FileText className="w-4 h-4 mr-1" />
                        引用
                      </Button>
                      {item.pdfUrl && <Button variant="ghost" size="sm" onClick={() => handleDownloadPDF(item.id, item.pdfUrl)}>
                          <Download className="w-4 h-4 mr-1" />
                          PDF
                        </Button>}
                      <Button variant="ghost" size="sm" onClick={() => window.open(`https://doi.org/${item.doi}`, '_blank')}>
                        <ExternalLink className="w-4 h-4 mr-1" />
                        原文
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>)}
        </div>
      </div>
    </div>;
}