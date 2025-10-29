// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Select, Badge, useToast, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui';
// @ts-ignore;
import { BarChart3, TrendingUp, TrendingDown, Target, Users, Clock, DollarSign, AlertTriangle, CheckCircle, Activity, Download, RefreshCw } from 'lucide-react';

// @ts-ignore;
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, AreaChart, Area } from 'recharts';
export function KPIDashboard({
  $w,
  className,
  style
}) {
  const {
    toast
  } = useToast();
  const [selectedTimeRange, setSelectedTimeRange] = useState('30days');
  const [selectedMetric, setSelectedMetric] = useState('all');
  const [kpiData, setKpiData] = useState({});
  const [trendData, setTrendData] = useState([]);
  const [teamPerformance, setTeamPerformance] = useState([]);
  const mockKpiData = {
    overall: {
      projectProgress: 68,
      budgetUtilization: 75,
      teamEfficiency: 85,
      qualityScore: 92,
      customerSatisfaction: 88,
      riskLevel: 25,
      onTimeDelivery: 80,
      innovationIndex: 78
    },
    financial: {
      totalBudget: 5000000,
      spentBudget: 3750000,
      remainingBudget: 1250000,
      costEfficiency: 85,
      roi: 120,
      budgetVariance: -5
    },
    development: {
      totalFeatures: 25,
      completedFeatures: 17,
      inProgressFeatures: 6,
      pendingFeatures: 2,
      bugRate: 2.3,
      codeQuality: 88,
      testCoverage: 75,
      deploymentFrequency: 12
    },
    team: {
      totalMembers: 25,
      activeMembers: 23,
      avgExperience: 3.5,
      trainingHours: 120,
      satisfactionScore: 82,
      turnoverRate: 8
    }
  };
  const mockTrendData = [{
    date: '2024-01-01',
    projectProgress: 45,
    budgetUtilization: 60,
    teamEfficiency: 78,
    qualityScore: 85,
    riskLevel: 35
  }, {
    date: '2024-01-15',
    projectProgress: 52,
    budgetUtilization: 65,
    teamEfficiency: 80,
    qualityScore: 87,
    riskLevel: 32
  }, {
    date: '2024-02-01',
    projectProgress: 58,
    budgetUtilization: 68,
    teamEfficiency: 82,
    qualityScore: 89,
    riskLevel: 30
  }, {
    date: '2024-02-15',
    projectProgress: 62,
    budgetUtilization: 70,
    teamEfficiency: 83,
    qualityScore: 90,
    riskLevel: 28
  }, {
    date: '2024-03-01',
    projectProgress: 68,
    budgetUtilization: 75,
    teamEfficiency: 85,
    qualityScore: 92,
    riskLevel: 25
  }];
  const mockTeamPerformance = [{
    team: 'AI研发部',
    efficiency: 90,
    quality: 88,
    innovation: 85,
    collaboration: 92,
    delivery: 85
  }, {
    team: '前端部',
    efficiency: 85,
    quality: 90,
    innovation: 80,
    collaboration: 88,
    delivery: 82
  }, {
    team: '后端部',
    efficiency: 88,
    quality: 85,
    innovation: 78,
    collaboration: 85,
    delivery: 88
  }, {
    team: '产品部',
    efficiency: 82,
    quality: 92,
    innovation: 88,
    collaboration: 90,
    delivery: 78
  }];
  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];
  useEffect(() => {
    setKpiData(mockKpiData);
    setTrendData(mockTrendData);
    setTeamPerformance(mockTeamPerformance);
  }, []);
  const getKPIStatus = (value, target, reverse = false) => {
    const ratio = value / target;
    if (reverse) {
      if (ratio <= 0.8) return {
        status: 'excellent',
        color: 'text-green-600',
        icon: TrendingDown
      };
      if (ratio <= 1.0) return {
        status: 'good',
        color: 'text-blue-600',
        icon: TrendingDown
      };
      return {
        status: 'warning',
        color: 'text-yellow-600',
        icon: TrendingUp
      };
    } else {
      if (ratio >= 0.9) return {
        status: 'excellent',
        color: 'text-green-600',
        icon: TrendingUp
      };
      if (ratio >= 0.7) return {
        status: 'good',
        color: 'text-blue-600',
        icon: TrendingUp
      };
      return {
        status: 'warning',
        color: 'text-yellow-600',
        icon: AlertTriangle
      };
    }
  };
  const handleRefresh = () => {
    toast({
      title: "刷新数据",
      description: "KPI数据已更新"
    });
  };
  const handleExportReport = () => {
    toast({
      title: "导出报告",
      description: "正在生成KPI报告..."
    });
  };
  const overallKPIs = [{
    title: '项目进度',
    value: kpiData.overall?.projectProgress || 0,
    target: 100,
    unit: '%',
    icon: Target,
    reverse: false
  }, {
    title: '预算利用率',
    value: kpiData.overall?.budgetUtilization || 0,
    target: 100,
    unit: '%',
    icon: DollarSign,
    reverse: false
  }, {
    title: '团队效率',
    value: kpiData.overall?.teamEfficiency || 0,
    target: 90,
    unit: '%',
    icon: Users,
    reverse: false
  }, {
    title: '质量评分',
    value: kpiData.overall?.qualityScore || 0,
    target: 95,
    unit: '%',
    icon: CheckCircle,
    reverse: false
  }, {
    title: '客户满意度',
    value: kpiData.overall?.customerSatisfaction || 0,
    target: 90,
    unit: '%',
    icon: Activity,
    reverse: false
  }, {
    title: '风险等级',
    value: kpiData.overall?.riskLevel || 0,
    target: 30,
    unit: '%',
    icon: AlertTriangle,
    reverse: true
  }, {
    title: '按时交付',
    value: kpiData.overall?.onTimeDelivery || 0,
    target: 85,
    unit: '%',
    icon: Clock,
    reverse: false
  }, {
    title: '创新指数',
    value: kpiData.overall?.innovationIndex || 0,
    target: 80,
    unit: '%',
    icon: BarChart3,
    reverse: false
  }];
  const radarData = teamPerformance.map(team => ({
    subject: team.team,
    efficiency: team.efficiency,
    quality: team.quality,
    innovation: team.innovation,
    collaboration: team.collaboration,
    delivery: team.delivery,
    fullMark: 100
  }));
  return <div className={className} style={style}>
      <div className="space-y-6">
        {/* 头部控制 */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">KPI仪表板</h2>
            <p className="text-gray-600">项目关键绩效指标监控和分析</p>
          </div>
          <div className="flex items-center space-x-2">
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
            <Select value={selectedMetric} onValueChange={setSelectedMetric}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部指标</SelectItem>
                <SelectItem value="development">开发指标</SelectItem>
                <SelectItem value="financial">财务指标</SelectItem>
                <SelectItem value="team">团队指标</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={handleRefresh}>
              <RefreshCw className="w-4 h-4 mr-2" />
              刷新
            </Button>
            <Button variant="outline" onClick={handleExportReport}>
              <Download className="w-4 h-4 mr-2" />
              导出报告
            </Button>
          </div>
        </div>

        {/* 核心KPI指标 */}
        <div className="grid grid-cols-4 gap-4">
          {overallKPIs.map((kpi, index) => {
          const Icon = kpi.icon;
          const status = getKPIStatus(kpi.value, kpi.target, kpi.reverse);
          const StatusIcon = status.icon;
          return <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-600">{kpi.title}</p>
                      <div className="flex items-center space-x-2">
                        <p className="text-2xl font-bold text-gray-900">{kpi.value}{kpi.unit}</p>
                        <StatusIcon className={`w-4 h-4 ${status.color}`} />
                      </div>
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className={`h-2 rounded-full ${status.status === 'excellent' ? 'bg-green-500' : status.status === 'good' ? 'bg-blue-500' : 'bg-yellow-500'}`} style={{
                    width: `${Math.min(kpi.value / kpi.target * 100, 100)}%`
                  }}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>;
        })}
        </div>

        {/* 趋势分析 */}
        <div className="grid grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>KPI趋势分析</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="projectProgress" stroke="#3B82F6" strokeWidth={2} name="项目进度" />
                  <Line type="monotone" dataKey="budgetUtilization" stroke="#10B981" strokeWidth={2} name="预算利用率" />
                  <Line type="monotone" dataKey="teamEfficiency" stroke="#F59E0B" strokeWidth={2} name="团队效率" />
                  <Line type="monotone" dataKey="qualityScore" stroke="#8B5CF6" strokeWidth={2} name="质量评分" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>风险趋势</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="riskLevel" stroke="#EF4444" fill="#FCA5A5" name="风险等级" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* 团队绩效雷达图 */}
        <Card>
          <CardHeader>
            <CardTitle>团队绩效对比</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={90} domain={[0, 100]} />
                <Radar name="效率" dataKey="efficiency" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
                <Radar name="质量" dataKey="quality" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
                <Radar name="创新" dataKey="innovation" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.6} />
                <Radar name="协作" dataKey="collaboration" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.6} />
                <Radar name="交付" dataKey="delivery" stroke="#EF4444" fill="#EF4444" fillOpacity={0.6} />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* 详细指标 */}
        <div className="grid grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>开发指标</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">功能完成率</span>
                  <span className="font-semibold">{kpiData.development?.completedFeatures || 0}/{kpiData.development?.totalFeatures || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Bug率</span>
                  <span className="font-semibold">{kpiData.development?.bugRate || 0}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">代码质量</span>
                  <span className="font-semibold">{kpiData.development?.codeQuality || 0}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">测试覆盖率</span>
                  <span className="font-semibold">{kpiData.development?.testCoverage || 0}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">部署频率</span>
                  <span className="font-semibold">{kpiData.development?.deploymentFrequency || 0}/月</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>财务指标</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">总预算</span>
                  <span className="font-semibold">¥{(kpiData.financial?.totalBudget || 0).toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">已使用</span>
                  <span className="font-semibold">¥{(kpiData.financial?.spentBudget || 0).toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">剩余预算</span>
                  <span className="font-semibold">¥{(kpiData.financial?.remainingBudget || 0).toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">成本效率</span>
                  <span className="font-semibold">{kpiData.financial?.costEfficiency || 0}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">ROI</span>
                  <span className="font-semibold">{kpiData.financial?.roi || 0}%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>团队指标</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">团队成员</span>
                  <span className="font-semibold">{kpiData.team?.totalMembers || 0}人</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">活跃成员</span>
                  <span className="font-semibold">{kpiData.team?.activeMembers || 0}人</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">平均经验</span>
                  <span className="font-semibold">{kpiData.team?.avgExperience || 0}年</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">培训时长</span>
                  <span className="font-semibold">{kpiData.team?.trainingHours || 0}小时</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">满意度</span>
                  <span className="font-semibold">{kpiData.team?.satisfactionScore || 0}%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>;
}