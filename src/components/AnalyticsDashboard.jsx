// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Select, Badge, useToast, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui';
// @ts-ignore;
import { TrendingUp, TrendingDown, DollarSign, Eye, MousePointer, Target, Calendar, Download, BarChart3, PieChart as PieChartIcon, Activity } from 'lucide-react';

// @ts-ignore;
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
export function AnalyticsDashboard({
  $w,
  className,
  style
}) {
  const {
    toast
  } = useToast();
  const [selectedPeriod, setSelectedPeriod] = useState('30days');
  const [selectedSponsor, setSelectedSponsor] = useState('all');
  const [analyticsData, setAnalyticsData] = useState({});
  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];
  const mockAnalyticsData = {
    overview: {
      totalRevenue: 15000000,
      totalImpressions: 8500000,
      totalClicks: 285000,
      totalConversions: 7200,
      avgCTR: 3.35,
      avgConversionRate: 2.53,
      avgROI: 2.8,
      activeProjects: 12,
      activeSponsors: 8
    },
    revenueTrend: [{
      date: '2024-01-01',
      revenue: 1200000,
      impressions: 680000,
      clicks: 22000,
      conversions: 580
    }, {
      date: '2024-01-08',
      revenue: 1350000,
      impressions: 720000,
      clicks: 24500,
      conversions: 620
    }, {
      date: '2024-01-15',
      revenue: 1280000,
      impressions: 690000,
      clicks: 23100,
      conversions: 595
    }, {
      date: '2024-01-22',
      revenue: 1420000,
      impressions: 750000,
      clicks: 25800,
      conversions: 680
    }, {
      date: '2024-01-29',
      revenue: 1550000,
      impressions: 820000,
      clicks: 28900,
      conversions: 750
    }],
    sponsorPerformance: [{
      name: '辉瑞制药',
      revenue: 4500000,
      impressions: 2800000,
      clicks: 95000,
      conversions: 2400,
      roi: 3.2
    }, {
      name: '阿斯利康',
      revenue: 3800000,
      impressions: 2400000,
      clicks: 82000,
      conversions: 2100,
      roi: 2.9
    }, {
      name: '罗氏诊断',
      revenue: 2200000,
      impressions: 1500000,
      clicks: 48000,
      conversions: 1200,
      roi: 2.5
    }, {
      name: '强生',
      revenue: 1800000,
      impressions: 1200000,
      clicks: 38000,
      conversions: 950,
      roi: 2.1
    }, {
      name: '其他',
      revenue: 2700000,
      impressions: 1600000,
      clicks: 52000,
      conversions: 1350,
      roi: 2.8
    }],
    projectTypeDistribution: [{
      name: '药品推广',
      value: 45,
      revenue: 6750000
    }, {
      name: '解决方案推广',
      value: 25,
      revenue: 3750000
    }, {
      name: '品牌推广',
      value: 20,
      revenue: 3000000
    }, {
      name: '学术推广',
      value: 10,
      revenue: 1500000
    }],
    departmentPerformance: [{
      department: '心血管内科',
      impressions: 2100000,
      clicks: 72000,
      conversions: 1850,
      revenue: 3200000
    }, {
      department: '内分泌科',
      impressions: 1800000,
      clicks: 61000,
      conversions: 1580,
      revenue: 2800000
    }, {
      department: '肿瘤科',
      impressions: 1600000,
      clicks: 54000,
      conversions: 1420,
      revenue: 2500000
    }, {
      department: '检验科',
      impressions: 1200000,
      clicks: 38000,
      conversions: 980,
      revenue: 1800000
    }, {
      department: '其他科室',
      impressions: 1800000,
      clicks: 60000,
      conversions: 1370,
      revenue: 2700000
    }],
    roiAnalysis: [{
      month: '2023-08',
      roi: 2.1,
      revenue: 980000,
      investment: 467000
    }, {
      month: '2023-09',
      roi: 2.3,
      revenue: 1120000,
      investment: 487000
    }, {
      month: '2023-10',
      roi: 2.5,
      revenue: 1250000,
      investment: 500000
    }, {
      month: '2023-11',
      roi: 2.7,
      revenue: 1380000,
      investment: 511000
    }, {
      month: '2023-12',
      roi: 2.9,
      revenue: 1520000,
      investment: 524000
    }, {
      month: '2024-01',
      roi: 3.1,
      revenue: 1680000,
      investment: 542000
    }]
  };
  useEffect(() => {
    setAnalyticsData(mockAnalyticsData);
  }, []);
  const formatCurrency = amount => {
    return new Intl.NumberFormat('zh-CN', {
      style: 'currency',
      currency: 'CNY',
      minimumFractionDigits: 0
    }).format(amount);
  };
  const handleExportReport = () => {
    toast({
      title: "导出报告",
      description: "正在生成分析报告..."
    });
  };
  const formatNumber = num => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };
  return <div className={className} style={style}>
      <div className="space-y-6">
        {/* 头部 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">效果分析仪表板</h1>
            <p className="text-gray-600">赞助活动效果分析、ROI计算和数据可视化</p>
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
            <Select value={selectedSponsor} onValueChange={setSelectedSponsor}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="选择赞助商" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部赞助商</SelectItem>
                <SelectItem value="SPN001">辉瑞制药</SelectItem>
                <SelectItem value="SPN002">阿斯利康</SelectItem>
                <SelectItem value="SPN003">罗氏诊断</SelectItem>
                <SelectItem value="SPN004">强生</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={handleExportReport}>
              <Download className="w-4 h-4 mr-2" />
              导出报告
            </Button>
          </div>
        </div>

        {/* 概览统计 */}
        <div className="grid grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <DollarSign className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">总收入</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatCurrency(analyticsData.overview?.totalRevenue || 0)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Eye className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">总展示量</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatNumber(analyticsData.overview?.totalImpressions || 0)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Target className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">平均ROI</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {analyticsData.overview?.avgROI || 0}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Activity className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">活跃项目</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {analyticsData.overview?.activeProjects || 0}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 图表区域 */}
        <div className="grid grid-cols-2 gap-6">
          {/* 收入趋势 */}
          <Card>
            <CardHeader>
              <CardTitle>收入趋势</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={analyticsData.revenueTrend || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="revenue" stroke="#3B82F6" fill="#93BBFC" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* 赞助商表现 */}
          <Card>
            <CardHeader>
              <CardTitle>赞助商表现</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analyticsData.sponsorPerformance || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="revenue" fill="#3B82F6" />
                  <Bar dataKey="roi" fill="#10B981" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* 项目类型分布 */}
          <Card>
            <CardHeader>
              <CardTitle>项目类型分布</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={analyticsData.projectTypeDistribution || []} cx="50%" cy="50%" labelLine={false} label={({
                  name,
                  value
                }) => `${name}: ${value}%`} outerRadius={80} fill="#8884d8" dataKey="value">
                    {(analyticsData.projectTypeDistribution || []).map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* 科室表现 */}
          <Card>
            <CardHeader>
              <CardTitle>科室表现</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analyticsData.departmentPerformance || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="department" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="impressions" fill="#3B82F6" />
                  <Bar dataKey="conversions" fill="#10B981" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* ROI分析 */}
        <Card>
          <CardHeader>
            <CardTitle>ROI趋势分析</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={analyticsData.roiAnalysis || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="roi" stroke="#3B82F6" name="ROI" strokeWidth={2} />
                <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#10B981" name="收入" strokeWidth={2} />
                <Line yAxisId="right" type="monotone" dataKey="investment" stroke="#F59E0B" name="投入" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* 详细数据表格 */}
        <div className="grid grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>赞助商详细数据</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.sponsorPerformance?.map((sponsor, index) => <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">{sponsor.name}</div>
                      <div className="text-sm text-gray-500">展示: {formatNumber(sponsor.impressions)}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-green-600">{formatCurrency(sponsor.revenue)}</div>
                      <div className="text-sm text-gray-500">ROI: {sponsor.roi}</div>
                    </div>
                  </div>)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>关键指标</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">平均点击率</span>
                  <span className="font-semibold text-blue-600">{analyticsData.overview?.avgCTR || 0}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">平均转化率</span>
                  <span className="font-semibold text-green-600">{analyticsData.overview?.avgConversionRate || 0}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">总转化数</span>
                  <span className="font-semibold text-purple-600">{analyticsData.overview?.totalConversions || 0}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">活跃赞助商</span>
                  <span className="font-semibold text-orange-600">{analyticsData.overview?.activeSponsors || 0}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>;
}