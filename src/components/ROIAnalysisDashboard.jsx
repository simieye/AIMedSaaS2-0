// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Badge, Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui';
// @ts-ignore;
import { TrendingUp, TrendingDown, BarChart3, PieChart, Target, DollarSign, Users, Calendar, Filter, Download, RefreshCw, ArrowUpRight, ArrowDownRight, Activity, Eye, MousePointer, ShoppingCart, Award, Zap, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

export function ROIAnalysisDashboard({
  sponsors,
  projects,
  financialData
}) {
  const [selectedPeriod, setSelectedPeriod] = useState('30days');
  const [selectedSponsor, setSelectedSponsor] = useState('all');
  const [selectedMetric, setSelectedMetric] = useState('all');

  // 模拟ROI分析数据
  const roiData = {
    overall: {
      totalInvestment: 9500000,
      totalRevenue: 11875000,
      totalProfit: 2375000,
      avgROI: 125,
      avgROAS: 4.75,
      customerAcquisitionCost: 850,
      customerLifetimeValue: 4200,
      paybackPeriod: 8.5
    },
    bySponsor: [{
      sponsorId: 'SPN001',
      sponsorName: '辉瑞制药',
      investment: 5000000,
      revenue: 6250000,
      profit: 1250000,
      roi: 125,
      roas: 5.0,
      cac: 800,
      ltv: 4500,
      paybackPeriod: 8.0,
      trends: {
        investment: [1000000, 1200000, 1300000, 1500000],
        revenue: [1200000, 1400000, 1600000, 2050000],
        roi: [120, 117, 123, 125]
      }
    }, {
      sponsorId: 'SPN002',
      sponsorName: '强生公司',
      investment: 3000000,
      revenue: 3540000,
      profit: 540000,
      roi: 98,
      roas: 3.92,
      cac: 920,
      ltv: 3800,
      paybackPeriod: 9.2,
      trends: {
        investment: [600000, 700000, 800000, 900000],
        revenue: [650000, 750000, 870000, 1270000],
        roi: [108, 107, 109, 98]
      }
    }, {
      sponsorId: 'SPN003',
      sponsorName: '罗氏制药',
      investment: 1500000,
      revenue: 2085000,
      profit: 585000,
      roi: 139,
      roas: 5.54,
      cac: 750,
      ltv: 4800,
      paybackPeriod: 7.5,
      trends: {
        investment: [300000, 350000, 400000, 450000],
        revenue: [380000, 450000, 520000, 735000],
        roi: [127, 129, 130, 139]
      }
    }],
    byProject: [{
      projectId: 'PRJ001',
      projectName: '新药研发AI平台合作',
      sponsorName: '辉瑞制药',
      investment: 2100000,
      revenue: 2625000,
      profit: 525000,
      roi: 125,
      milestones: [{
        name: '平台架构设计',
        investment: 400000,
        revenue: 500000,
        roi: 125
      }, {
        name: 'AI模型开发',
        investment: 1200000,
        revenue: 1500000,
        roi: 125
      }, {
        name: '临床试验集成',
        investment: 500000,
        revenue: 625000,
        roi: 125
      }]
    }],
    trends: [{
      period: '2024-Q1',
      investment: 2000000,
      revenue: 2500000,
      profit: 500000,
      roi: 125
    }, {
      period: '2024-Q2',
      investment: 2300000,
      revenue: 2875000,
      profit: 575000,
      roi: 125
    }, {
      period: '2024-Q3',
      investment: 2600000,
      revenue: 3250000,
      profit: 650000,
      roi: 125
    }, {
      period: '2024-Q4',
      investment: 2600000,
      revenue: 3250000,
      profit: 650000,
      roi: 125
    }]
  };
  const formatCurrency = (amount, currency = 'USD') => {
    const symbols = {
      CNY: '¥',
      USD: '$',
      EUR: '€'
    };
    return `${symbols[currency] || currency} ${amount.toLocaleString()}`;
  };
  const formatNumber = num => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };
  const getROIColor = roi => {
    if (roi >= 150) return 'text-green-600';
    if (roi >= 100) return 'text-blue-600';
    if (roi >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };
  const getTrendIcon = trend => {
    return trend > 0 ? <ArrowUpRight className="w-4 h-4 text-green-500" /> : <ArrowDownRight className="w-4 h-4 text-red-500" />;
  };
  const filteredSponsorData = selectedSponsor === 'all' ? roiData.bySponsor : roiData.bySponsor.filter(s => s.sponsorId === selectedSponsor);
  return <div className="space-y-6">
      {/* 筛选器 */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
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
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部赞助商</SelectItem>
                {sponsors.map(sponsor => <SelectItem key={sponsor.id} value={sponsor.id}>
                    {sponsor.name}
                  </SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={selectedMetric} onValueChange={setSelectedMetric}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部指标</SelectItem>
                <SelectItem value="roi">ROI</SelectItem>
                <SelectItem value="roas">ROAS</SelectItem>
                <SelectItem value="cac">CAC</SelectItem>
                <SelectItem value="ltv">LTV</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              导出报告
            </Button>
            <Button variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              刷新
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 总体ROI指标 */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">总投资</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(roiData.overall.totalInvestment)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">总收入</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(roiData.overall.totalRevenue)}
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
                <p className={`text-2xl font-bold ${getROIColor(roiData.overall.avgROI)}`}>
                  {roiData.overall.avgROI}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Users className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">平均ROAS</p>
                <p className="text-2xl font-bold text-gray-900">
                  {roiData.overall.avgROAS}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 客户获取指标 */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <ShoppingCart className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">客户获取成本</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(roiData.overall.customerAcquisitionCost)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <Award className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">客户终身价值</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(roiData.overall.customerLifetimeValue)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-teal-100 rounded-lg">
                <Clock className="w-6 h-6 text-teal-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">回本周期</p>
                <p className="text-2xl font-bold text-gray-900">
                  {roiData.overall.paybackPeriod}个月
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 赞助商ROI对比 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="w-5 h-5 mr-2" />
            赞助商ROI对比
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredSponsorData.map(sponsor => <div key={sponsor.sponsorId} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-gray-900">{sponsor.sponsorName}</h4>
                    <p className="text-sm text-gray-500">投资回报分析</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getROIColor(sponsor.roi)}>
                      ROI: {sponsor.roi}%
                    </Badge>
                    {getTrendIcon(sponsor.roi - 100)}
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">投资额</p>
                    <p className="font-medium text-gray-900">
                      {formatCurrency(sponsor.investment)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">收入</p>
                    <p className="font-medium text-gray-900">
                      {formatCurrency(sponsor.revenue)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">利润</p>
                    <p className="font-medium text-green-600">
                      {formatCurrency(sponsor.profit)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">ROAS</p>
                    <p className="font-medium text-gray-900">
                      {sponsor.roas}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-3">
                  <div>
                    <p className="text-sm text-gray-600">CAC</p>
                    <p className="font-medium text-gray-900">
                      {formatCurrency(sponsor.cac)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">LTV</p>
                    <p className="font-medium text-gray-900">
                      {formatCurrency(sponsor.ltv)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">回本周期</p>
                    <p className="font-medium text-gray-900">
                      {sponsor.paybackPeriod}个月
                    </p>
                  </div>
                </div>
              </div>)}
          </div>
        </CardContent>
      </Card>

      {/* 趋势分析 */}
      <div className="grid grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              ROI趋势分析
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center text-gray-500">
              ROI趋势图表 (需要集成图表库)
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <PieChart className="w-5 h-5 mr-2" />
              投资分布
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center text-gray-500">
              投资分布饼图 (需要集成图表库)
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 项目ROI详情 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Activity className="w-5 h-5 mr-2" />
            项目ROI详情
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {roiData.byProject.map(project => <div key={project.projectId} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-gray-900">{project.projectName}</h4>
                    <p className="text-sm text-gray-500">{project.sponsorName}</p>
                  </div>
                  <Badge className={getROIColor(project.roi)}>
                    ROI: {project.roi}%
                  </Badge>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">项目投资</p>
                    <p className="font-medium text-gray-900">
                      {formatCurrency(project.investment)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">项目收入</p>
                    <p className="font-medium text-gray-900">
                      {formatCurrency(project.revenue)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">项目利润</p>
                    <p className="font-medium text-green-600">
                      {formatCurrency(project.profit)}
                    </p>
                  </div>
                </div>
                <div className="mt-3">
                  <h5 className="font-medium text-gray-900 mb-2">里程碑ROI</h5>
                  <div className="space-y-2">
                    {project.milestones.map((milestone, index) => <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm text-gray-700">{milestone.name}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-600">
                            投资: {formatCurrency(milestone.investment)}
                          </span>
                          <span className="text-sm text-gray-600">
                            收入: {formatCurrency(milestone.revenue)}
                          </span>
                          <Badge className={getROIColor(milestone.roi)}>
                            {milestone.roi}%
                          </Badge>
                        </div>
                      </div>)}
                  </div>
                </div>
              </div>)}
          </div>
        </CardContent>
      </Card>
    </div>;
}