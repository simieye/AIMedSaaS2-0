// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Select, useToast, SelectTrigger, SelectValue, SelectContent, SelectItem, Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui';
// @ts-ignore;
import { BarChart3, TrendingUp, Target, Users, Search, Clock, CheckCircle, AlertCircle, Download, Calendar, Filter } from 'lucide-react';

import { PerformanceOverview } from '@/components/PerformanceOverview';
import { UserSatisfactionChart } from '@/components/UserSatisfactionChart';
import { QualityMetricsChart } from '@/components/QualityMetricsChart';
import { PerformanceTrends } from '@/components/PerformanceTrends';
export function PerformanceStatistics({
  $w,
  className,
  style
}) {
  const {
    toast
  } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPeriod, setSelectedPeriod] = useState('30days');
  const [selectedMetric, setSelectedMetric] = useState('all');
  const [statistics, setStatistics] = useState({});
  const [trends, setTrends] = useState([]);
  const [userSatisfaction, setUserSatisfaction] = useState([]);
  const mockStatistics = {
    overview: {
      totalQueries: 158420,
      avgResponseTime: 145.6,
      successRate: 0.987,
      userSatisfaction: 4.2,
      accuracy: 0.89,
      precision: 0.87,
      recall: 0.85,
      f1Score: 0.86
    },
    dailyStats: [{
      date: '2024-01-15',
      queries: 5240,
      avgResponseTime: 142.3,
      successRate: 0.989,
      userSatisfaction: 4.3,
      accuracy: 0.91
    }, {
      date: '2024-01-16',
      queries: 5890,
      avgResponseTime: 148.7,
      successRate: 0.985,
      userSatisfaction: 4.1,
      accuracy: 0.88
    }, {
      date: '2024-01-17',
      queries: 6120,
      avgResponseTime: 151.2,
      successRate: 0.982,
      userSatisfaction: 4.0,
      accuracy: 0.87
    }, {
      date: '2024-01-18',
      queries: 5780,
      avgResponseTime: 139.8,
      successRate: 0.991,
      userSatisfaction: 4.4,
      accuracy: 0.92
    }, {
      date: '2024-01-19',
      queries: 6350,
      avgResponseTime: 156.4,
      successRate: 0.978,
      userSatisfaction: 3.9,
      accuracy: 0.85
    }, {
      date: '2024-01-20',
      queries: 6890,
      avgResponseTime: 161.2,
      successRate: 0.975,
      userSatisfaction: 3.8,
      accuracy: 0.83
    }],
    categoryPerformance: [{
      category: '临床指南',
      queries: 45230,
      avgResponseTime: 132.5,
      accuracy: 0.94,
      userSatisfaction: 4.6
    }, {
      category: '研究论文',
      queries: 38960,
      avgResponseTime: 158.3,
      accuracy: 0.87,
      userSatisfaction: 4.1
    }, {
      category: '病例报告',
      queries: 28450,
      avgResponseTime: 145.7,
      accuracy: 0.82,
      userSatisfaction: 3.9
    }, {
      category: '药物信息',
      queries: 32180,
      avgResponseTime: 128.9,
      accuracy: 0.91,
      userSatisfaction: 4.3
    }, {
      category: '诊断标准',
      queries: 13600,
      avgResponseTime: 167.2,
      accuracy: 0.89,
      userSatisfaction: 4.0
    }],
    userFeedback: [{
      rating: 5,
      count: 8920,
      percentage: 56.3
    }, {
      rating: 4,
      count: 4850,
      percentage: 30.6
    }, {
      rating: 3,
      count: 1680,
      percentage: 10.6
    }, {
      rating: 2,
      count: 380,
      percentage: 2.4
    }, {
      rating: 1,
      count: 90,
      percentage: 0.1
    }],
    qualityMetrics: [{
      metric: '准确性',
      value: 0.89,
      benchmark: 0.85
    }, {
      metric: '完整性',
      value: 0.92,
      benchmark: 0.88
    }, {
      metric: '时效性',
      value: 0.86,
      benchmark: 0.82
    }, {
      metric: '相关性',
      value: 0.91,
      benchmark: 0.87
    }, {
      metric: '可用性',
      value: 0.94,
      benchmark: 0.90
    }]
  };
  useEffect(() => {
    setStatistics(mockStatistics);
    setTrends(mockStatistics.dailyStats);
    setUserSatisfaction(mockStatistics.userFeedback);
  }, []);
  const handleExportReport = () => {
    toast({
      title: "导出报告",
      description: "正在生成性能统计报告..."
    });
  };
  const formatNumber = num => {
    return new Intl.NumberFormat('zh-CN').format(num);
  };
  const formatPercentage = num => {
    return (num * 100).toFixed(1) + '%';
  };
  return <div className={className} style={style}>
      <div className="space-y-6">
        {/* 头部 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">性能统计</h1>
            <p className="text-gray-600">分析RAG系统性能指标、用户满意度和质量评估</p>
          </div>
          <div className="flex items-center space-x-2">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">7天</SelectItem>
                <SelectItem value="30days">30天</SelectItem>
                <SelectItem value="90days">90天</SelectItem>
                <SelectItem value="1year">1年</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={handleExportReport}>
              <Download className="w-4 h-4 mr-2" />
              导出报告
            </Button>
          </div>
        </div>

        {/* 统计标签页 */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4" />
              <span>概览</span>
            </TabsTrigger>
            <TabsTrigger value="trends" className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4" />
              <span>趋势</span>
            </TabsTrigger>
            <TabsTrigger value="satisfaction" className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>满意度</span>
            </TabsTrigger>
            <TabsTrigger value="quality" className="flex items-center space-x-2">
              <Target className="w-4 h-4" />
              <span>质量</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="space-y-6">
              {/* 性能概览 */}
              <PerformanceOverview statistics={statistics} />

              {/* 分类性能 */}
              <Card>
                <CardHeader>
                  <CardTitle>分类性能统计</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-5 gap-4">
                    {statistics.categoryPerformance?.map((category, index) => <div key={index} className="text-center p-4 border rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">{category.category}</h4>
                        <div className="space-y-2">
                          <div className="text-sm text-gray-600">
                            <div>查询量</div>
                            <div className="font-semibold text-gray-900">{formatNumber(category.queries)}</div>
                          </div>
                          <div className="text-sm text-gray-600">
                            <div>响应时间</div>
                            <div className="font-semibold text-gray-900">{category.avgResponseTime.toFixed(1)}ms</div>
                          </div>
                          <div className="text-sm text-gray-600">
                            <div>准确性</div>
                            <div className="font-semibold text-gray-900">{formatPercentage(category.accuracy)}</div>
                          </div>
                          <div className="text-sm text-gray-600">
                            <div>满意度</div>
                            <div className="font-semibold text-gray-900">{category.userSatisfaction.toFixed(1)}/5.0</div>
                          </div>
                        </div>
                      </div>)}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="trends">
            <div className="space-y-6">
              {/* 性能趋势 */}
              <PerformanceTrends trends={trends} />

              {/* 详细趋势数据 */}
              <Card>
                <CardHeader>
                  <CardTitle>详细趋势数据</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {trends.map((trend, index) => <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="text-gray-900 font-medium">{trend.date}</div>
                          <div className="text-sm text-gray-600">
                            查询量: <span className="font-semibold text-gray-900">{formatNumber(trend.queries)}</span>
                          </div>
                          <div className="text-sm text-gray-600">
                            响应时间: <span className="font-semibold text-gray-900">{trend.avgResponseTime.toFixed(1)}ms</span>
                          </div>
                          <div className="text-sm text-gray-600">
                            成功率: <span className="font-semibold text-green-600">{formatPercentage(trend.successRate)}</span>
                          </div>
                          <div className="text-sm text-gray-600">
                            准确性: <span className="font-semibold text-blue-600">{formatPercentage(trend.accuracy)}</span>
                          </div>
                          <div className="text-sm text-gray-600">
                            满意度: <span className="font-semibold text-purple-600">{trend.userSatisfaction.toFixed(1)}/5.0</span>
                          </div>
                        </div>
                      </div>)}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="satisfaction">
            <div className="space-y-6">
              {/* 用户满意度图表 */}
              <UserSatisfactionChart userFeedback={userSatisfaction} />

              {/* 满意度统计 */}
              <Card>
                <CardHeader>
                  <CardTitle>满意度详细统计</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-4">评分分布</h4>
                      <div className="space-y-3">
                        {userSatisfaction.map((feedback, index) => <div key={index} className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => <div key={i} className={`w-4 h-4 rounded-full ${i < feedback.rating ? 'bg-yellow-400' : 'bg-gray-300'}`} />)}
                              </div>
                              <span className="text-gray-900">{feedback.rating}星</span>
                            </div>
                            <div className="flex items-center space-x-4">
                              <span className="text-gray-900">{formatNumber(feedback.count)}人</span>
                              <span className="text-gray-600">{feedback.percentage}%</span>
                            </div>
                          </div>)}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-4">满意度指标</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">平均评分</span>
                          <span className="font-semibold text-gray-900">{statistics.overview?.userSatisfaction.toFixed(1)}/5.0</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">好评率 (4-5星)</span>
                          <span className="font-semibold text-green-600">
                            {(userSatisfaction.filter(f => f.rating >= 4).reduce((sum, f) => sum + f.count, 0) / userSatisfaction.reduce((sum, f) => sum + f.count, 0) * 100).toFixed(1)}%
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">差评率 (1-2星)</span>
                          <span className="font-semibold text-red-600">
                            {(userSatisfaction.filter(f => f.rating <= 2).reduce((sum, f) => sum + f.count, 0) / userSatisfaction.reduce((sum, f) => sum + f.count, 0) * 100).toFixed(1)}%
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">总评价数</span>
                          <span className="font-semibold text-gray-900">{formatNumber(userSatisfaction.reduce((sum, f) => sum + f.count, 0))}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="quality">
            <div className="space-y-6">
              {/* 质量指标图表 */}
              <QualityMetricsChart qualityMetrics={statistics.qualityMetrics} />

              {/* 质量指标详情 */}
              <Card>
                <CardHeader>
                  <CardTitle>质量指标详情</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {statistics.qualityMetrics?.map((metric, index) => <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Target className="w-6 h-6 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">{metric.metric}</h4>
                            <p className="text-sm text-gray-600">当前值 vs 基准值</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-6">
                          <div className="text-right">
                            <div className="text-sm text-gray-600">当前值</div>
                            <div className="font-semibold text-blue-600">{formatPercentage(metric.value)}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-gray-600">基准值</div>
                            <div className="font-semibold text-gray-900">{formatPercentage(metric.benchmark)}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-gray-600">差异</div>
                            <div className={`font-semibold ${metric.value >= metric.benchmark ? 'text-green-600' : 'text-red-600'}`}>
                              {metric.value >= metric.benchmark ? '+' : ''}{((metric.value - metric.benchmark) * 100).toFixed(1)}%
                            </div>
                          </div>
                        </div>
                      </div>)}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>;
}