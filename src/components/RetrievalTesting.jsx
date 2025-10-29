// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Select, Badge, useToast, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui';
// @ts-ignore;
import { Search, Send, ThumbsUp, ThumbsDown, Clock, CheckCircle, AlertCircle, BarChart3, Target, Zap, FileText, Database } from 'lucide-react';

export function RetrievalTesting({
  $w,
  className,
  style
}) {
  const {
    toast
  } = useToast();
  const [query, setQuery] = useState('');
  const [selectedModel, setSelectedModel] = useState('default');
  const [searchResults, setSearchResults] = useState([]);
  const [testHistory, setTestHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [evaluation, setEvaluation] = useState(null);
  const mockResults = [{
    id: 'RES001',
    title: '心血管疾病AI诊断技术综述',
    content: '本文综述了近年来心血管疾病AI诊断技术的发展现状，包括深度学习、机器学习等技术在心电图、超声心动图等医学影像分析中的应用...',
    score: 0.95,
    source: 'literature',
    sourceId: 'LIT001',
    relevance: 'high',
    snippets: ['深度学习在心血管疾病诊断中的应用', 'AI技术在心电图分析中的准确性', '机器学习算法的优化方法']
  }, {
    id: 'RES002',
    title: '心电图AI诊断算法优化研究',
    content: '研究针对心电图AI诊断算法的优化方法，通过改进网络结构和训练策略，提高了诊断的准确性和稳定性...',
    score: 0.88,
    source: 'literature',
    sourceId: 'LIT002',
    relevance: 'high',
    snippets: ['网络结构优化', '训练策略改进', '准确性提升方法']
  }, {
    id: 'RES003',
    title: '心血管影像诊断标准',
    content: '介绍了心血管影像诊断的标准流程和评估指标，为AI诊断系统的开发提供了参考依据...',
    score: 0.76,
    source: 'guideline',
    sourceId: 'GUID001',
    relevance: 'medium',
    snippets: ['诊断标准流程', '评估指标体系', '质量控制要求']
  }, {
    id: 'RES004',
    title: 'AI医疗设备监管政策',
    content: '分析了AI医疗设备的监管政策和审批流程，讨论了技术要求和安全性评估标准...',
    score: 0.65,
    source: 'policy',
    sourceId: 'POL001',
    relevance: 'low',
    snippets: ['监管政策框架', '审批流程要求', '安全性评估']
  }];
  const mockHistory = [{
    id: 'HIST001',
    query: '糖尿病视网膜病变AI诊断',
    timestamp: '2024-01-15 14:30:00',
    model: 'default',
    resultsCount: 5,
    avgScore: 0.82,
    userFeedback: 'positive',
    responseTime: 1.2
  }, {
    id: 'HIST002',
    query: '肿瘤免疫治疗生物标志物',
    timestamp: '2024-01-15 13:45:00',
    model: 'enhanced',
    resultsCount: 8,
    avgScore: 0.91,
    userFeedback: 'positive',
    responseTime: 1.8
  }, {
    id: 'HIST003',
    query: '神经退行性疾病早期诊断',
    timestamp: '2024-01-15 12:20:00',
    model: 'default',
    resultsCount: 3,
    avgScore: 0.74,
    userFeedback: 'negative',
    responseTime: 0.9
  }];
  const models = [{
    value: 'default',
    label: '默认模型'
  }, {
    value: 'enhanced',
    label: '增强模型'
  }, {
    value: 'fast',
    label: '快速模型'
  }, {
    value: 'accurate',
    label: '高精度模型'
  }];
  useEffect(() => {
    setTestHistory(mockHistory);
  }, []);
  const getRelevanceBadge = relevance => {
    const relevanceConfig = {
      high: {
        color: 'bg-green-100 text-green-800',
        text: '高相关'
      },
      medium: {
        color: 'bg-yellow-100 text-yellow-800',
        text: '中相关'
      },
      low: {
        color: 'bg-red-100 text-red-800',
        text: '低相关'
      }
    };
    const config = relevanceConfig[relevance] || relevanceConfig.low;
    return <Badge className={config.color}>{config.text}</Badge>;
  };
  const getSourceIcon = source => {
    const iconMap = {
      literature: FileText,
      guideline: Database,
      policy: FileText,
      clinical: Database
    };
    return iconMap[source] || FileText;
  };
  const handleSearch = async () => {
    if (!query.trim()) {
      toast({
        title: "请输入查询内容",
        description: "查询内容不能为空",
        variant: "destructive"
      });
      return;
    }
    setLoading(true);
    try {
      // 模拟搜索延迟
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSearchResults(mockResults);
      setEvaluation({
        precision: 0.85,
        recall: 0.78,
        f1Score: 0.81,
        responseTime: 1.2,
        totalResults: mockResults.length
      });
      toast({
        title: "搜索完成",
        description: `找到 ${mockResults.length} 个相关结果`
      });
    } catch (error) {
      toast({
        title: "搜索失败",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  const handleFeedback = (resultId, feedback) => {
    setSearchResults(prev => prev.map(result => result.id === resultId ? {
      ...result,
      userFeedback: feedback
    } : result));
    toast({
      title: "反馈已记录",
      description: `感谢您的反馈`
    });
  };
  const handleEvaluate = () => {
    if (searchResults.length === 0) {
      toast({
        title: "无搜索结果",
        description: "请先进行搜索",
        variant: "destructive"
      });
      return;
    }
    toast({
      title: "评估完成",
      description: "搜索结果评估已生成"
    });
  };
  const handleSaveTest = () => {
    if (!query || searchResults.length === 0) {
      toast({
        title: "无法保存",
        description: "请先进行有效的搜索",
        variant: "destructive"
      });
      return;
    }
    const newTest = {
      id: `HIST${Date.now()}`,
      query: query,
      timestamp: new Date().toISOString(),
      model: selectedModel,
      resultsCount: searchResults.length,
      avgScore: searchResults.reduce((sum, result) => sum + result.score, 0) / searchResults.length,
      userFeedback: 'pending',
      responseTime: evaluation?.responseTime || 0
    };
    setTestHistory(prev => [newTest, ...prev]);
    toast({
      title: "测试已保存",
      description: "搜索测试已保存到历史记录"
    });
  };
  return <div className={className} style={style}>
      <div className="space-y-6">
        {/* 头部 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">检索测试</h1>
            <p className="text-gray-600">测试RAG系统的检索效果，评估结果质量和相关性</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={handleSaveTest}>
              <Database className="w-4 h-4 mr-2" />
              保存测试
            </Button>
            <Button onClick={handleEvaluate}>
              <BarChart3 className="w-4 h-4 mr-2" />
              评估结果
            </Button>
          </div>
        </div>

        {/* 搜索界面 */}
        <Card>
          <CardHeader>
            <CardTitle>查询测试</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex space-x-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input placeholder="输入医学查询内容..." value={query} onChange={e => setQuery(e.target.value)} className="pl-10 text-lg" />
                </div>
                <Select value={selectedModel} onValueChange={setSelectedModel}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {models.map(model => <SelectItem key={model.value} value={model.value}>
                        {model.label}
                      </SelectItem>)}
                  </SelectContent>
                </Select>
                <Button onClick={handleSearch} disabled={loading}>
                  {loading ? <>
                      <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      搜索中...
                    </> : <>
                      <Send className="w-4 h-4 mr-2" />
                      搜索
                    </>}
                </Button>
              </div>
              
              {/* 快速查询示例 */}
              <div className="flex flex-wrap gap-2">
                <span className="text-sm text-gray-600">快速查询:</span>
                {['心血管疾病AI诊断', '糖尿病视网膜病变', '肿瘤免疫治疗', '神经退行性疾病'].map(example => <Button key={example} variant="outline" size="sm" onClick={() => setQuery(example)}>
                    {example}
                  </Button>)}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 搜索结果 */}
        {searchResults.length > 0 && <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>搜索结果 ({searchResults.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {searchResults.map(result => {
                  const Icon = getSourceIcon(result.source);
                  return <div key={result.id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <Icon className="w-5 h-5 text-gray-400" />
                            <div>
                              <h4 className="font-medium text-gray-900">{result.title}</h4>
                              <div className="flex items-center space-x-2 mt-1">
                                {getRelevanceBadge(result.relevance)}
                                <Badge variant="outline">{result.source}</Badge>
                                <span className="text-sm text-gray-500">评分: {result.score}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm" onClick={() => handleFeedback(result.id, 'positive')}>
                              <ThumbsUp className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleFeedback(result.id, 'negative')}>
                              <ThumbsDown className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        <p className="text-gray-700 text-sm mb-3">{result.content}</p>
                        <div className="flex flex-wrap gap-1">
                          {result.snippets.map((snippet, index) => <Badge key={index} variant="outline" className="text-xs">
                              {snippet}
                            </Badge>)}
                        </div>
                      </div>;
                })}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 评估结果 */}
            <div className="space-y-4">
              {evaluation && <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Target className="w-5 h-5 mr-2" />
                      评估指标
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">精确率</span>
                        <span className="font-semibold text-green-600">{(evaluation.precision * 100).toFixed(1)}%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">召回率</span>
                        <span className="font-semibold text-blue-600">{(evaluation.recall * 100).toFixed(1)}%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">F1分数</span>
                        <span className="font-semibold text-purple-600">{(evaluation.f1Score * 100).toFixed(1)}%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">响应时间</span>
                        <span className="font-semibold text-orange-600">{evaluation.responseTime}s</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">结果数量</span>
                        <span className="font-semibold text-gray-900">{evaluation.totalResults}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>}

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="w-5 h-5 mr-2" />
                    测试历史
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {testHistory.slice(0, 5).map(test => <div key={test.id} className="border rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-medium text-gray-900 truncate">{test.query}</h5>
                          <div className="flex items-center space-x-1">
                            {test.userFeedback === 'positive' ? <ThumbsUp className="w-4 h-4 text-green-500" /> : test.userFeedback === 'negative' ? <ThumbsDown className="w-4 h-4 text-red-500" /> : <Clock className="w-4 h-4 text-gray-400" />}
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                          <div>模型: {test.model}</div>
                          <div>结果: {test.resultsCount}</div>
                          <div>评分: {test.avgScore.toFixed(2)}</div>
                          <div>时间: {test.responseTime}s</div>
                        </div>
                      </div>)}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>}
      </div>
    </div>;
}