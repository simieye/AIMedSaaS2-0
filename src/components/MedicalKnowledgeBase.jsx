// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Select, Badge, Tabs, TabsContent, TabsList, TabsTrigger, useToast, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui';
// @ts-ignore;
import { Search, BookOpen, FileText, Video, Download, Star, Clock, Eye, Filter, Heart, Brain, Microscope, Lung } from 'lucide-react';

export function MedicalKnowledgeBase({
  $w,
  className,
  style
}) {
  const {
    toast
  } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [activeTab, setActiveTab] = useState('guidelines');
  const [knowledgeItems, setKnowledgeItems] = useState([]);
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
  const mockKnowledgeItems = {
    guidelines: [{
      id: 'guide_001',
      title: '高血压诊断和治疗指南（2023版）',
      department: 'cardiology',
      category: 'diagnosis',
      type: 'guideline',
      description: '基于最新循证医学证据的高血压诊疗指南',
      author: '中华医学会心血管病学分会',
      publishDate: '2023-06-15',
      updateDate: '2023-12-01',
      views: 15234,
      downloads: 3456,
      rating: 4.8,
      tags: ['高血压', '诊断', '治疗', '指南'],
      difficulty: 'intermediate'
    }, {
      id: 'guide_002',
      title: '肺癌早期筛查专家共识',
      department: 'oncology',
      category: 'screening',
      type: 'guideline',
      description: '肺癌高危人群筛查策略和实施方案',
      author: '中国抗癌协会',
      publishDate: '2023-09-20',
      updateDate: '2024-01-10',
      views: 8921,
      downloads: 1234,
      rating: 4.6,
      tags: ['肺癌', '筛查', '早期诊断', '共识'],
      difficulty: 'advanced'
    }],
    cases: [{
      id: 'case_001',
      title: '急性心肌梗死典型病例分析',
      department: 'cardiology',
      category: 'emergency',
      type: 'case',
      description: '58岁男性急性心肌梗死的诊断和治疗过程',
      author: '王主任医师',
      publishDate: '2024-01-08',
      updateDate: '2024-01-08',
      views: 5678,
      rating: 4.9,
      tags: ['心肌梗死', '急诊', '病例分析'],
      difficulty: 'intermediate'
    }, {
      id: 'case_002',
      title: '乳腺癌保乳治疗成功案例',
      department: 'oncology',
      category: 'treatment',
      type: 'case',
      description: '42岁女性乳腺癌保乳综合治疗案例',
      author: '李副主任医师',
      publishDate: '2024-01-12',
      updateDate: '2024-01-12',
      views: 3456,
      rating: 4.7,
      tags: ['乳腺癌', '保乳治疗', '综合治疗'],
      difficulty: 'advanced'
    }],
    research: [{
      id: 'research_001',
      title: 'AI在心血管疾病诊断中的应用研究',
      department: 'cardiology',
      category: 'ai_application',
      type: 'research',
      description: '基于深度学习的心电图自动诊断系统研究',
      author: '张教授等',
      publishDate: '2023-11-15',
      updateDate: '2023-11-15',
      views: 7890,
      citations: 45,
      rating: 4.5,
      tags: ['AI', '心血管', '深度学习', '诊断'],
      difficulty: 'advanced'
    }, {
      id: 'research_002',
      title: '肿瘤免疫治疗最新进展',
      department: 'oncology',
      category: 'immunotherapy',
      type: 'research',
      description: 'PD-1/PD-L1抑制剂在实体瘤治疗中的应用',
      author: '刘研究员',
      publishDate: '2024-01-05',
      updateDate: '2024-01-05',
      views: 4567,
      citations: 23,
      rating: 4.8,
      tags: ['免疫治疗', 'PD-1', '肿瘤', '进展'],
      difficulty: 'expert'
    }],
    videos: [{
      id: 'video_001',
      title: '心电图基础解读教程',
      department: 'cardiology',
      category: 'education',
      type: 'video',
      description: '心电图基本原理和常见异常心电图解读',
      author: '心内科教学团队',
      publishDate: '2023-12-10',
      duration: '45:30',
      views: 12345,
      rating: 4.7,
      tags: ['心电图', '教程', '基础'],
      difficulty: 'beginner'
    }, {
      id: 'video_002',
      title: '胸腔穿刺术操作演示',
      department: 'respiratory',
      category: 'procedure',
      type: 'video',
      description: '标准胸腔穿刺术操作步骤和注意事项',
      author: '呼吸科临床教学组',
      publishDate: '2024-01-03',
      duration: '28:15',
      views: 6789,
      rating: 4.9,
      tags: ['胸腔穿刺', '操作演示', '呼吸科'],
      difficulty: 'intermediate'
    }]
  };
  useEffect(() => {
    setKnowledgeItems(mockKnowledgeItems);
  }, []);
  const getTypeIcon = type => {
    const icons = {
      guideline: BookOpen,
      case: FileText,
      research: Search,
      video: Video
    };
    return icons[type] || FileText;
  };
  const getDifficultyBadge = difficulty => {
    const difficultyConfig = {
      beginner: {
        color: 'bg-green-100 text-green-800',
        text: '初级'
      },
      intermediate: {
        color: 'bg-yellow-100 text-yellow-800',
        text: '中级'
      },
      advanced: {
        color: 'bg-orange-100 text-orange-800',
        text: '高级'
      },
      expert: {
        color: 'bg-red-100 text-red-800',
        text: '专家'
      }
    };
    const config = difficultyConfig[difficulty] || difficultyConfig.intermediate;
    return <Badge className={config.color}>{config.text}</Badge>;
  };
  const getDepartmentIcon = deptId => {
    const dept = departments.find(d => d.id === deptId);
    return dept ? dept.icon : BookOpen;
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
  const renderKnowledgeList = items => {
    const filteredItems = items.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || item.description.toLowerCase().includes(searchTerm.toLowerCase()) || item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesDepartment = selectedDepartment === 'all' || item.department === selectedDepartment;
      return matchesSearch && matchesDepartment;
    });
    return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map(item => {
        const Icon = getTypeIcon(item.type);
        const DeptIcon = getDepartmentIcon(item.department);
        return <Card key={item.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <Icon className="w-5 h-5 text-blue-600" />
                    <DeptIcon className="w-4 h-4 text-gray-500" />
                  </div>
                  {getDifficultyBadge(item.difficulty)}
                </div>
                
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                  {item.title}
                </h3>
                
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {item.description}
                </p>
                
                <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                  <span>{item.author}</span>
                  <span>{item.publishDate}</span>
                </div>
                
                <div className="flex flex-wrap gap-1 mb-3">
                  {item.tags.slice(0, 3).map((tag, index) => <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>)}
                </div>
                
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3 text-xs text-gray-500">
                    <div className="flex items-center">
                      <Eye className="w-3 h-3 mr-1" />
                      {item.views}
                    </div>
                    {item.downloads && <div className="flex items-center">
                        <Download className="w-3 h-3 mr-1" />
                        {item.downloads}
                      </div>}
                    {item.citations && <div className="flex items-center">
                        <FileText className="w-3 h-3 mr-1" />
                        {item.citations}
                      </div>}
                    {item.duration && <div className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {item.duration}
                      </div>}
                  </div>
                  <div className="flex items-center">
                    <Star className="w-3 h-3 text-yellow-500 mr-1" />
                    <span className="text-xs font-medium">{item.rating}</span>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1" onClick={() => handleViewDetails(item)}>
                    <Eye className="w-3 h-3 mr-1" />
                    查看
                  </Button>
                  {item.type !== 'video' && <Button variant="outline" size="sm" onClick={() => handleDownload(item)}>
                      <Download className="w-3 h-3" />
                    </Button>}
                </div>
              </CardContent>
            </Card>;
      })}
      </div>;
  };
  return <div className={className} style={style}>
      <div className="space-y-6">
        {/* 头部 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">医学知识库</h1>
            <p className="text-gray-600">专业的医学资料和学习资源</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              高级筛选
            </Button>
            <Button>
              <BookOpen className="w-4 h-4 mr-2" />
              上传资料
            </Button>
          </div>
        </div>

        {/* 搜索和筛选 */}
        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input placeholder="搜索知识库..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10" />
              </div>
              
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger>
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
                <SelectTrigger>
                  <SelectValue placeholder="选择分类" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部分类</SelectItem>
                  <SelectItem value="diagnosis">诊断相关</SelectItem>
                  <SelectItem value="treatment">治疗相关</SelectItem>
                  <SelectItem value="research">研究进展</SelectItem>
                  <SelectItem value="education">教育培训</SelectItem>
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
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">诊疗指南</p>
                  <p className="text-2xl font-bold text-gray-900">156</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <FileText className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">病例分析</p>
                  <p className="text-2xl font-bold text-gray-900">289</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Search className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">研究文献</p>
                  <p className="text-2xl font-bold text-gray-900">423</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <Video className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">教学视频</p>
                  <p className="text-2xl font-bold text-gray-900">178</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 知识库内容 */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="guidelines">诊疗指南</TabsTrigger>
            <TabsTrigger value="cases">病例分析</TabsTrigger>
            <TabsTrigger value="research">研究文献</TabsTrigger>
            <TabsTrigger value="videos">教学视频</TabsTrigger>
          </TabsList>
          
          <TabsContent value="guidelines" className="mt-6">
            {renderKnowledgeList(knowledgeItems.guidelines)}
          </TabsContent>
          
          <TabsContent value="cases" className="mt-6">
            {renderKnowledgeList(knowledgeItems.cases)}
          </TabsContent>
          
          <TabsContent value="research" className="mt-6">
            {renderKnowledgeList(knowledgeItems.research)}
          </TabsContent>
          
          <TabsContent value="videos" className="mt-6">
            {renderKnowledgeList(knowledgeItems.videos)}
          </TabsContent>
        </Tabs>
      </div>
    </div>;
}