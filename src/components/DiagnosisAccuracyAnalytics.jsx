// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Select, Badge, Tabs, TabsContent, TabsList, TabsTrigger, useToast, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui';
// @ts-ignore;
import { TrendingUp, TrendingDown, BarChart3, PieChart as PieChartIcon, Activity, Target, Award, Calendar, Download, Filter, RefreshCcw } from 'lucide-react';

// @ts-ignore;
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AnalyticsOverview } from '@/components/AnalyticsOverview';
import { AccuracyDistributionChart } from '@/components/AccuracyDistributionChart';
import { ConfidenceAnalysisChart } from '@/components/ConfidenceAnalysisChart';
import { ModelPerformanceChart } from '@/components/ModelPerformanceChart';
import { ErrorAnalysisPanel } from '@/components/ErrorAnalysisPanel';
import { ImprovementSuggestions } from '@/components/ImprovementSuggestions';
export function DiagnosisAccuracyAnalytics({
  $w,
  className,
  style
}) {
  const {
    toast
  } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedTimeRange, setSelectedTimeRange] = useState('30days');
  const [analyticsData, setAnalyticsData] = useState({});
  const [loading, setLoading] = useState(false);
  const departments = [{
    id: 'cardiology',
    name: '心血管内科'
  }, {
    id: 'oncology',
    name: '肿瘤科'
  }, {
    id: 'neurology',
    name: '神经内科'
  }, {
    id: 'respiratory',
    name: '呼吸内科'
  }];

  // 从数据模型加载诊断准确率统计数据
  const loadAnalyticsData = async () => {
    setLoading(true);
    try {
      const result = await $w.cloud.callDataSource({
        dataSourceName: 'analytics',
        methodName: 'wedaGetRecordsV2',
        params: {
          select: {
            $master: true
          },
          getCount: true,
          pageSize: 100,
          orderBy: [{
            statisticsDate: 'desc'
          }]
        }
      });
      if (result.records) {
        // 处理数据以适配图表格式
        const processedData = processAnalyticsData(result.records);
        setAnalyticsData(processedData);
      }
    } catch (error) {
      console.error('加载统计数据失败:', error);
      toast({
        title: "加载失败",
        description: "无法加载统计数据",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // 处理原始数据以适配图表格式
  const processAnalyticsData = records => {
    const monthlyTrend = records.filter(record => record.type === 'monthly_trend').map(record => ({
      month: new Date(record.statisticsDate).toLocaleDateString('zh-CN', {
        month: 'short'
      }),
      accuracy: record.accuracy || 0,
      diagnoses: record.totalDiagnoses || 0
    }));
    const departmentComparison = records.filter(record => record.type === 'department_comparison').map(record => ({
      name: record.departmentName,
      accuracy: record.accuracy || 0,
      diagnoses: record.totalDiagnoses || 0,
      improvement: record.improvementRate || 0
    }));
    const accuracyDistribution = records.filter(record => record.type === 'accuracy_distribution').map(record => ({
      range: record.accuracyRange,
      count: record.count || 0,
      percentage: record.percentage || 0
    }));
    const modelPerformance = records.filter(record => record.type === 'model_performance').map(record => ({
      model: record.modelName,
      precision: record.precision || 0,
      recall: record.recall || 0,
      f1Score: record.f1Score || 0,
      aucRoc: record.aucRoc || 0
    }));
    const confidenceAnalysis = records.filter(record => record.type === 'confidence_analysis').map(record => ({
      confidence: record.confidenceRange,
      accuracy: record.accuracy || 0,
      count: record.count || 0
    }));
    const errorAnalysis = records.filter(record => record.type === 'error_analysis').map(record => ({
      errorType: record.errorType,
      count: record.count || 0,
      percentage: record.percentage || 0,
      trend: record.trend || 'stable'
    }));

    // 计算总览数据
    const overview = {
      totalDiagnoses: records.reduce((sum, record) => sum + (record.totalDiagnoses || 0), 0),
      avgAccuracy: records.reduce((sum, record) => sum + (record.accuracy || 0), 0) / records.length || 0,
      improvementRate: records.reduce((sum, record) => sum + (record.improvementRate || 0), 0) / records.length || 0,
      topPerformingDept: departmentComparison.length > 0 ? departmentComparison.reduce((max, dept) => dept.accuracy > max.accuracy ? dept : max).name : '无',
      monthlyTrend
    };
    return {
      overview,
      departmentComparison,
      accuracyDistribution,
      modelPerformance,
      confidenceAnalysis,
      errorAnalysis
    };
  };
  useEffect(() => {
    loadAnalyticsData();
  }, [selectedTimeRange, selectedDepartment]);
  const handleExportReport = () => {
    toast({
      title: "导出报告",
      description: "正在生成诊断准确率分析报告..."
    });
  };
  const handleRefreshData = () => {
    loadAnalyticsData();
  };
  if (loading) {
    return <div className={className} style={style}>
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">加载中...</div>
        </div>
      </div>;
  }
  return <div className={className} style={style}>
      <div className="space-y-6">
        {/* 头部 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">诊断准确率统计分析</h1>
            <p className="text-gray-600">AI诊断系统的准确率分析和性能监控</p>
          </div>
          <div className="flex items-center space-x-2">
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="选择科室" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部科室</SelectItem>
                {departments.map(dept => <SelectItem key={dept.id} value={dept.id}>
                    {dept.name}
                  </SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
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
            <Button variant="outline" onClick={handleRefreshData}>
              <RefreshCcw className="w-4 h-4 mr-2" />
              刷新
            </Button>
            <Button onClick={handleExportReport}>
              <Download className="w-4 h-4 mr-2" />
              导出报告
            </Button>
          </div>
        </div>

        {/* 概览统计 */}
        <AnalyticsOverview analyticsData={analyticsData} />

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">总览</TabsTrigger>
            <TabsTrigger value="trends">趋势分析</TabsTrigger>
            <TabsTrigger value="comparison">科室对比</TabsTrigger>
            <TabsTrigger value="models">模型性能</TabsTrigger>
            <TabsTrigger value="errors">错误分析</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-2 gap-6">
              <AccuracyDistributionChart data={analyticsData.accuracyDistribution} />
              <ConfidenceAnalysisChart data={analyticsData.confidenceAnalysis} />
            </div>
          </TabsContent>

          <TabsContent value="trends" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>准确率趋势</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={analyticsData.overview?.monthlyTrend || []}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="accuracy" stroke="#3B82F6" name="准确率" strokeWidth={2} />
                    <Line yAxisId="right" type="monotone" dataKey="diagnoses" stroke="#10B981" name="诊断数" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="comparison" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>科室对比</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={analyticsData.departmentComparison || []}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="accuracy" fill="#3B82F6" name="准确率" />
                    <Bar dataKey="improvement" fill="#10B981" name="改进率" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="models" className="mt-6">
            <ModelPerformanceChart data={analyticsData.modelPerformance} />
          </TabsContent>

          <TabsContent value="errors" className="mt-6">
            <div className="grid grid-cols-2 gap-6">
              <ErrorAnalysisPanel data={analyticsData.errorAnalysis} />
              <ImprovementSuggestions />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>;
}