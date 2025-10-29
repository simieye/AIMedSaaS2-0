// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Select, Badge, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, useToast, SelectTrigger, SelectValue, SelectContent, SelectItem, Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui';
// @ts-ignore;
import { Search, Plus, Edit, Trash2, Eye, Network, Node, Link, Filter, Download, RefreshCw, Target } from 'lucide-react';

export function KnowledgeGraph({
  $w,
  className,
  style
}) {
  const {
    toast
  } = useToast();
  const [activeTab, setActiveTab] = useState('entities');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [entities, setEntities] = useState([]);
  const [relations, setRelations] = useState([]);
  const mockEntities = [{
    id: 'ENT001',
    name: '高血压',
    type: 'disease',
    category: '心血管疾病',
    description: '血压持续升高的慢性疾病，是心脑血管疾病的主要危险因素',
    properties: {
      icd10: 'I10',
      synonyms: ['原发性高血压', '特发性高血压'],
      prevalence: '25.2%',
      riskFactors: ['年龄', '肥胖', '高盐饮食', '缺乏运动']
    },
    relations: 45,
    confidence: 0.95,
    lastUpdated: '2024-01-18'
  }, {
    id: 'ENT002',
    name: '氨氯地平',
    type: 'drug',
    category: '钙通道阻滞剂',
    description: '二氢吡啶类钙通道阻滞剂，用于治疗高血压和心绞痛',
    properties: {
      atcCode: 'C08CA01',
      dosage: '5-10mg/日',
      contraindications: ['严重主动脉瓣狭窄', '心力衰竭'],
      sideEffects: ['水肿', '头痛', '面部潮红']
    },
    relations: 38,
    confidence: 0.92,
    lastUpdated: '2024-01-17'
  }, {
    id: 'ENT003',
    name: '糖尿病',
    type: 'disease',
    category: '内分泌疾病',
    description: '以血糖升高为特征的代谢性疾病，分为1型和2型',
    properties: {
      icd10: 'E14',
      synonyms: ['糖尿病 mellitus', 'DM'],
      prevalence: '11.2%',
      complications: ['肾病', '视网膜病变', '神经病变']
    },
    relations: 52,
    confidence: 0.94,
    lastUpdated: '2024-01-19'
  }, {
    id: 'ENT004',
    name: '二甲双胍',
    type: 'drug',
    category: '双胍类',
    description: '双胍类口服降糖药，是2型糖尿病的一线治疗药物',
    properties: {
      atcCode: 'A10BA02',
      dosage: '500-2000mg/日',
      contraindications: ['肾功能不全', '严重感染'],
      sideEffects: ['胃肠道反应', '乳酸酸中毒']
    },
    relations: 41,
    confidence: 0.96,
    lastUpdated: '2024-01-16'
  }];
  const mockRelations = [{
    id: 'REL001',
    source: 'ENT001',
    target: 'ENT002',
    type: 'treats',
    description: '氨氯地平用于治疗高血压',
    confidence: 0.98,
    evidence: ['临床指南', '随机对照试验'],
    lastUpdated: '2024-01-18'
  }, {
    id: 'REL002',
    source: 'ENT003',
    target: 'ENT004',
    type: 'treats',
    description: '二甲双胍用于治疗2型糖尿病',
    confidence: 0.99,
    evidence: ['临床指南', '专家共识'],
    lastUpdated: '2024-01-17'
  }, {
    id: 'REL003',
    source: 'ENT001',
    target: 'ENT003',
    type: 'comorbidity',
    description: '高血压和糖尿病常同时存在，增加心血管风险',
    confidence: 0.87,
    evidence: ['流行病学研究', '队列研究'],
    lastUpdated: '2024-01-16'
  }];
  useEffect(() => {
    setEntities(mockEntities);
    setRelations(mockRelations);
  }, []);
  const getTypeBadge = type => {
    const typeConfig = {
      disease: {
        color: 'bg-red-100 text-red-800',
        text: '疾病'
      },
      drug: {
        color: 'bg-blue-100 text-blue-800',
        text: '药物'
      },
      symptom: {
        color: 'bg-yellow-100 text-yellow-800',
        text: '症状'
      },
      treatment: {
        color: 'bg-green-100 text-green-800',
        text: '治疗'
      },
      risk_factor: {
        color: 'bg-purple-100 text-purple-800',
        text: '风险因素'
      }
    };
    const config = typeConfig[type] || typeConfig.disease;
    return <Badge className={config.color}>{config.text}</Badge>;
  };
  const getRelationTypeBadge = type => {
    const typeConfig = {
      treats: {
        color: 'bg-green-100 text-green-800',
        text: '治疗'
      },
      causes: {
        color: 'bg-red-100 text-red-800',
        text: '导致'
      },
      symptom_of: {
        color: 'bg-yellow-100 text-yellow-800',
        text: '症状'
      },
      comorbidity: {
        color: 'bg-purple-100 text-purple-800',
        text: '共病'
      },
      contraindication: {
        color: 'bg-orange-100 text-orange-800',
        text: '禁忌'
      }
    };
    const config = typeConfig[type] || typeConfig.treats;
    return <Badge className={config.color}>{config.text}</Badge>;
  };
  const handleViewEntity = entityId => {
    toast({
      title: "查看实体",
      description: `正在查看实体 ${entityId} 的详细信息`
    });
  };
  const handleEditEntity = entityId => {
    toast({
      title: "编辑实体",
      description: `正在编辑实体 ${entityId}`
    });
  };
  const handleDeleteEntity = entityId => {
    setEntities(prev => prev.filter(entity => entity.id !== entityId));
    toast({
      title: "删除成功",
      description: `实体 ${entityId} 已删除`,
      variant: "destructive"
    });
  };
  const handleViewRelation = relationId => {
    toast({
      title: "查看关系",
      description: `正在查看关系 ${relationId} 的详细信息`
    });
  };
  const handleExportGraph = () => {
    toast({
      title: "导出图谱",
      description: "正在导出知识图谱数据..."
    });
  };
  const handleRefreshGraph = () => {
    toast({
      title: "刷新图谱",
      description: "正在刷新知识图谱数据..."
    });
  };
  const filteredEntities = entities.filter(entity => {
    const matchesSearch = entity.name.toLowerCase().includes(searchTerm.toLowerCase()) || entity.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || entity.type === selectedType;
    return matchesSearch && matchesType;
  });
  return <div className={className} style={style}>
      <div className="space-y-6">
        {/* 头部 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">知识图谱</h1>
            <p className="text-gray-600">管理医学实体、关系和知识图谱可视化</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={handleRefreshGraph}>
              <RefreshCw className="w-4 h-4 mr-2" />
              刷新图谱
            </Button>
            <Button variant="outline" onClick={handleExportGraph}>
              <Download className="w-4 h-4 mr-2" />
              导出图谱
            </Button>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              添加实体
            </Button>
          </div>
        </div>

        {/* 知识图谱标签页 */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="entities" className="flex items-center space-x-2">
              <Node className="w-4 h-4" />
              <span>实体管理</span>
            </TabsTrigger>
            <TabsTrigger value="relations" className="flex items-center space-x-2">
              <Link className="w-4 h-4" />
              <span>关系管理</span>
            </TabsTrigger>
            <TabsTrigger value="visualization" className="flex items-center space-x-2">
              <Network className="w-4 h-4" />
              <span>图谱可视化</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="entities">
            <div className="space-y-6">
              {/* 筛选器 */}
              <Card>
                <CardContent className="p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input placeholder="搜索实体名称或描述..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10" />
                    </div>
                    
                    <Select value={selectedType} onValueChange={setSelectedType}>
                      <SelectTrigger>
                        <SelectValue placeholder="选择类型" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">全部类型</SelectItem>
                        <SelectItem value="disease">疾病</SelectItem>
                        <SelectItem value="drug">药物</SelectItem>
                        <SelectItem value="symptom">症状</SelectItem>
                        <SelectItem value="treatment">治疗</SelectItem>
                        <SelectItem value="risk_factor">风险因素</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* 实体列表 */}
              <Card>
                <CardHeader>
                  <CardTitle>实体列表</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>实体名称</TableHead>
                        <TableHead>类型</TableHead>
                        <TableHead>分类</TableHead>
                        <TableHead>描述</TableHead>
                        <TableHead>关系数</TableHead>
                        <TableHead>置信度</TableHead>
                        <TableHead>最后更新</TableHead>
                        <TableHead>操作</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredEntities.map(entity => <TableRow key={entity.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium text-gray-900">{entity.name}</div>
                              <div className="text-sm text-gray-500">ID: {entity.id}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            {getTypeBadge(entity.type)}
                          </TableCell>
                          <TableCell>
                            <div className="text-gray-900">{entity.category}</div>
                          </TableCell>
                          <TableCell>
                            <div className="text-gray-900 max-w-xs truncate">{entity.description}</div>
                          </TableCell>
                          <TableCell>
                            <div className="text-gray-900">{entity.relations}</div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-1">
                              <div className="w-16 bg-gray-200 rounded-full h-2">
                                <div className="bg-blue-600 h-2 rounded-full" style={{
                              width: `${entity.confidence * 100}%`
                            }}></div>
                              </div>
                              <span className="text-sm text-gray-900">{(entity.confidence * 100).toFixed(0)}%</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-gray-900">{entity.lastUpdated}</div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Button variant="ghost" size="sm" onClick={() => handleViewEntity(entity.id)}>
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => handleEditEntity(entity.id)}>
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => handleDeleteEntity(entity.id)}>
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
          </TabsContent>

          <TabsContent value="relations">
            <div className="space-y-6">
              {/* 关系列表 */}
              <Card>
                <CardHeader>
                  <CardTitle>关系列表</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>关系ID</TableHead>
                        <TableHead>源实体</TableHead>
                        <TableHead>目标实体</TableHead>
                        <TableHead>关系类型</TableHead>
                        <TableHead>描述</TableHead>
                        <TableHead>置信度</TableHead>
                        <TableHead>证据</TableHead>
                        <TableHead>操作</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {relations.map(relation => <TableRow key={relation.id}>
                          <TableCell>
                            <div className="font-medium text-gray-900">{relation.id}</div>
                          </TableCell>
                          <TableCell>
                            <div className="text-gray-900">{entities.find(e => e.id === relation.source)?.name || relation.source}</div>
                          </TableCell>
                          <TableCell>
                            <div className="text-gray-900">{entities.find(e => e.id === relation.target)?.name || relation.target}</div>
                          </TableCell>
                          <TableCell>
                            {getRelationTypeBadge(relation.type)}
                          </TableCell>
                          <TableCell>
                            <div className="text-gray-900 max-w-xs truncate">{relation.description}</div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-1">
                              <div className="w-16 bg-gray-200 rounded-full h-2">
                                <div className="bg-green-600 h-2 rounded-full" style={{
                              width: `${relation.confidence * 100}%`
                            }}></div>
                              </div>
                              <span className="text-sm text-gray-900">{(relation.confidence * 100).toFixed(0)}%</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-gray-900">{relation.evidence.join(', ')}</div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Button variant="ghost" size="sm" onClick={() => handleViewRelation(relation.id)}>
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Edit className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>)}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="visualization">
            <div className="space-y-6">
              {/* 图谱可视化 */}
              <Card>
                <CardHeader>
                  <CardTitle>知识图谱可视化</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-96 bg-gray-50 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Network className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">知识图谱可视化</h3>
                      <p className="text-gray-600 mb-4">这里将展示实体和关系的网络图</p>
                      <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                          <span>疾病</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span>药物</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                          <span>症状</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 图谱统计 */}
              <div className="grid grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Node className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">总实体数</p>
                        <p className="text-2xl font-bold text-gray-900">{entities.length}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <Link className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">总关系数</p>
                        <p className="text-2xl font-bold text-gray-900">{relations.length}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <Network className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">平均连接度</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {(entities.reduce((sum, e) => sum + e.relations, 0) / entities.length).toFixed(1)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-orange-100 rounded-lg">
                        <Target className="w-6 h-6 text-orange-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">平均置信度</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {(entities.reduce((sum, e) => sum + e.confidence, 0) / entities.length * 100).toFixed(1)}%
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>;
}