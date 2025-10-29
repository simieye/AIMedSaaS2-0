// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Select, Badge, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, useToast, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui';
// @ts-ignore;
import { AlertTriangle, TrendingUp, TrendingDown, Shield, Eye, Edit, Plus, Filter, Download, Activity } from 'lucide-react';

// @ts-ignore;
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
export function RiskAssessment({
  $w,
  className,
  style
}) {
  const {
    toast
  } = useToast();
  const [selectedSeverity, setSelectedSeverity] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [risks, setRisks] = useState([]);
  const [riskTrends, setRiskTrends] = useState([]);
  const [mitigationPlans, setMitigationPlans] = useState([]);
  const mockRisks = [{
    id: 'risk-1',
    title: '技术债务积累',
    description: '快速开发导致技术债务积累，可能影响长期维护',
    category: '技术风险',
    severity: 'high',
    probability: 70,
    impact: 80,
    status: 'active',
    identifiedDate: '2024-01-15',
    owner: '技术总监',
    mitigation: '代码重构、技术升级',
    progress: 30,
    dependencies: ['AI诊断系统', 'RAG知识库'],
    affectedFeatures: ['系统性能', '可维护性'],
    riskScore: 56
  }, {
    id: 'risk-2',
    title: '关键人员流失',
    description: '核心开发人员可能离职，影响项目进度',
    category: '人力资源风险',
    severity: 'high',
    probability: 40,
    impact: 90,
    status: 'monitoring',
    identifiedDate: '2024-02-01',
    owner: 'HR总监',
    mitigation: '激励机制、知识共享',
    progress: 60,
    dependencies: [],
    affectedFeatures: ['整体进度'],
    riskScore: 36
  }, {
    id: 'risk-3',
    title: '需求变更频繁',
    description: '客户需求频繁变更，影响开发计划',
    category: '需求风险',
    severity: 'medium',
    probability: 60,
    impact: 60,
    status: 'active',
    identifiedDate: '2024-01-20',
    owner: '产品经理',
    mitigation: '需求冻结、变更控制',
    progress: 45,
    dependencies: [],
    affectedFeatures: ['开发计划', '资源分配'],
    riskScore: 36
  }, {
    id: 'risk-4',
    title: '第三方依赖风险',
    description: '依赖的第三方服务可能不稳定',
    category: '外部依赖风险',
    severity: 'medium',
    probability: 30,
    impact: 70,
    status: 'mitigated',
    identifiedDate: '2024-01-10',
    owner: '架构师',
    mitigation: '备选方案、服务监控',
    progress: 80,
    dependencies: ['API接口'],
    affectedFeatures: ['系统稳定性'],
    riskScore: 21
  }, {
    id: 'risk-5',
    title: '数据安全风险',
    description: '患者数据可能存在安全隐患',
    category: '安全风险',
    severity: 'critical',
    probability: 25,
    impact: 95,
    status: 'active',
    identifiedDate: '2024-02-10',
    owner: '安全官',
    mitigation: '加密、访问控制',
    progress: 70,
    dependencies: ['数据存储', '传输'],
    affectedFeatures: ['数据安全', '合规性'],
    riskScore: 23.75
  }];
  const mockRiskTrends = [{
    date: '2024-01-01',
    critical: 2,
    high: 8,
    medium: 12,
    low: 5,
    total: 27
  }, {
    date: '2024-01-15',
    critical: 3,
    high: 9,
    medium: 11,
    low: 6,
    total: 29
  }, {
    date: '2024-02-01',
    critical: 2,
    high: 10,
    medium: 13,
    low: 4,
    total: 29
  }, {
    date: '2024-02-15',
    critical: 1,
    high: 8,
    medium: 10,
    low: 3,
    total: 22
  }, {
    date: '2024-03-01',
    critical: 1,
    high: 6,
    medium: 8,
    low: 2,
    total: 17
  }];
  const mockMitigationPlans = [{
    riskId: 'risk-1',
    title: '技术债务重构计划',
    description: '系统性重构代码，减少技术债务',
    status: 'in_progress',
    progress: 30,
    owner: '技术总监',
    deadline: '2024-06-30',
    budget: 50000,
    resources: ['开发团队', '测试团队'],
    milestones: ['代码审查', '重构实施', '性能测试']
  }, {
    riskId: 'risk-2',
    title: '人才保留计划',
    description: '提升员工满意度和留存率',
    status: 'in_progress',
    progress: 60,
    owner: 'HR总监',
    deadline: '2024-12-31',
    budget: 100000,
    resources: ['HR团队', '管理层'],
    milestones: ['薪酬调整', '培训计划', '职业发展']
  }];
  const COLORS = ['#DC2626', '#F59E0B', '#3B82F6', '#10B981'];
  useEffect(() => {
    setRisks(mockRisks);
    setRiskTrends(mockRiskTrends);
    setMitigationPlans(mockMitigationPlans);
  }, []);
  const getSeverityBadge = severity => {
    const severityConfig = {
      critical: {
        color: 'bg-red-100 text-red-800',
        text: '严重'
      },
      high: {
        color: 'bg-orange-100 text-orange-800',
        text: '高'
      },
      medium: {
        color: 'bg-yellow-100 text-yellow-800',
        text: '中'
      },
      low: {
        color: 'bg-green-100 text-green-800',
        text: '低'
      }
    };
    const config = severityConfig[severity] || severityConfig.medium;
    return <Badge className={config.color}>{config.text}</Badge>;
  };
  const getStatusBadge = status => {
    const statusConfig = {
      active: {
        color: 'bg-red-100 text-red-800',
        text: '活跃'
      },
      monitoring: {
        color: 'bg-yellow-100 text-yellow-800',
        text: '监控中'
      },
      mitigated: {
        color: 'bg-green-100 text-green-800',
        text: '已缓解'
      },
      closed: {
        color: 'bg-gray-100 text-gray-800',
        text: '已关闭'
      }
    };
    const config = statusConfig[status] || statusConfig.active;
    return <Badge className={config.color}>{config.text}</Badge>;
  };
  const getRiskScoreColor = score => {
    if (score >= 50) return '#DC2626';
    if (score >= 30) return '#F59E0B';
    if (score >= 15) return '#3B82F6';
    return '#10B981';
  };
  const handleViewDetails = riskId => {
    toast({
      title: "查看详情",
      description: `正在查看风险 ${riskId} 的详细信息`
    });
  };
  const handleEditRisk = riskId => {
    toast({
      title: "编辑风险",
      description: `正在编辑风险 ${riskId}`
    });
  };
  const handleCreateMitigation = riskId => {
    toast({
      title: "创建缓解计划",
      description: `正在为风险 ${riskId} 创建缓解计划`
    });
  };
  const handleExportReport = () => {
    toast({
      title: "导出报告",
      description: "正在导出风险评估报告..."
    });
  };
  const filteredRisks = risks.filter(risk => {
    const matchesSeverity = selectedSeverity === 'all' || risk.severity === selectedSeverity;
    const matchesStatus = selectedStatus === 'all' || risk.status === selectedStatus;
    return matchesSeverity && matchesStatus;
  });
  const riskStats = {
    total: risks.length,
    critical: risks.filter(r => r.severity === 'critical').length,
    high: risks.filter(r => r.severity === 'high').length,
    medium: risks.filter(r => r.severity === 'medium').length,
    low: risks.filter(r => r.severity === 'low').length,
    active: risks.filter(r => r.status === 'active').length,
    mitigated: risks.filter(r => r.status === 'mitigated').length
  };
  const categoryData = risks.reduce((acc, risk) => {
    const existing = acc.find(item => item.category === risk.category);
    if (existing) {
      existing.count += 1;
      existing.avgScore += risk.riskScore;
    } else {
      acc.push({
        category: risk.category,
        count: 1,
        avgScore: risk.riskScore
      });
    }
    return acc;
  }, []).map(item => ({
    ...item,
    avgScore: item.avgScore / item.count
  }));
  return <div className={className} style={style}>
      <div className="space-y-6">
        {/* 头部控制 */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">风险评估</h2>
            <p className="text-gray-600">识别、评估和管理项目风险</p>
          </div>
          <div className="flex items-center space-x-2">
            <Select value={selectedSeverity} onValueChange={setSelectedSeverity}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部级别</SelectItem>
                <SelectItem value="critical">严重</SelectItem>
                <SelectItem value="high">高</SelectItem>
                <SelectItem value="medium">中</SelectItem>
                <SelectItem value="low">低</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部状态</SelectItem>
                <SelectItem value="active">活跃</SelectItem>
                <SelectItem value="monitoring">监控中</SelectItem>
                <SelectItem value="mitigated">已缓解</SelectItem>
                <SelectItem value="closed">已关闭</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={handleExportReport}>
              <Download className="w-4 h-4 mr-2" />
              导出报告
            </Button>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              新增风险
            </Button>
          </div>
        </div>

        {/* 风险统计 */}
        <div className="grid grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">总风险数</p>
                  <p className="text-2xl font-bold text-gray-900">{riskStats.total}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Shield className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">活跃风险</p>
                  <p className="text-2xl font-bold text-gray-900">{riskStats.active}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <TrendingDown className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">已缓解</p>
                  <p className="text-2xl font-bold text-gray-900">{riskStats.mitigated}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Activity className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">严重风险</p>
                  <p className="text-2xl font-bold text-gray-900">{riskStats.critical}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 风险趋势图 */}
        <div className="grid grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>风险趋势</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={riskTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="critical" stackId="1" stroke="#DC2626" fill="#FCA5A5" name="严重" />
                  <Area type="monotone" dataKey="high" stackId="1" stroke="#F59E0B" fill="#FCD34D" name="高" />
                  <Area type="monotone" dataKey="medium" stackId="1" stroke="#3B82F6" fill="#93BBFC" name="中" />
                  <Area type="monotone" dataKey="low" stackId="1" stroke="#10B981" fill="#86EFAC" name="低" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>风险分类分布</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={categoryData} cx="50%" cy="50%" labelLine={false} label={({
                  category,
                  count
                }) => `${category}: ${count}`} outerRadius={80} fill="#8884d8" dataKey="count">
                    {categoryData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* 风险列表 */}
        <Card>
          <CardHeader>
            <CardTitle>风险详情</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>风险标题</TableHead>
                  <TableHead>分类</TableHead>
                  <TableHead>严重程度</TableHead>
                  <TableHead>概率</TableHead>
                  <TableHead>影响</TableHead>
                  <TableHead>风险评分</TableHead>
                  <TableHead>负责人</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead>缓解进度</TableHead>
                  <TableHead>操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRisks.map(risk => <TableRow key={risk.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium text-gray-900">{risk.title}</div>
                        <div className="text-sm text-gray-500">{risk.description}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-gray-900">{risk.category}</div>
                    </TableCell>
                    <TableCell>
                      {getSeverityBadge(risk.severity)}
                    </TableCell>
                    <TableCell>
                      <div className="text-gray-900">{risk.probability}%</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-gray-900">{risk.impact}%</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full" style={{
                      backgroundColor: getRiskScoreColor(risk.riskScore)
                    }}></div>
                        <span className="font-medium text-gray-900">{risk.riskScore.toFixed(1)}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-gray-900">{risk.owner}</div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(risk.status)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{
                        width: `${risk.progress}%`
                      }}></div>
                        </div>
                        <span className="text-sm text-gray-900">{risk.progress}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => handleViewDetails(risk.id)}>
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleEditRisk(risk.id)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleCreateMitigation(risk.id)}>
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>)}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* 缓解计划 */}
        <Card>
          <CardHeader>
            <CardTitle>缓解计划</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mitigationPlans.map(plan => <div key={plan.riskId} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <Shield className="w-5 h-5 text-blue-600" />
                        <h4 className="font-medium text-gray-900">{plan.title}</h4>
                        <Badge variant={plan.status === 'completed' ? 'default' : 'secondary'}>
                          {plan.status === 'in_progress' ? '进行中' : plan.status === 'completed' ? '已完成' : '待开始'}
                        </Badge>
                      </div>
                      <p className="text-gray-700 text-sm mb-2">{plan.description}</p>
                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                        <div>
                          <span>负责人:</span>
                          <span className="ml-1 font-medium text-gray-900">{plan.owner}</span>
                        </div>
                        <div>
                          <span>截止日期:</span>
                          <span className="ml-1 font-medium text-gray-900">{plan.deadline}</span>
                        </div>
                        <div>
                          <span>预算:</span>
                          <span className="ml-1 font-medium text-gray-900">¥{plan.budget.toLocaleString()}</span>
                        </div>
                        <div>
                          <span>进度:</span>
                          <span className="ml-1 font-medium text-gray-900">{plan.progress}%</span>
                        </div>
                      </div>
                      <div className="mt-2">
                        <span className="text-sm text-gray-600">资源:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {plan.resources.map((resource, index) => <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                              {resource}
                            </span>)}
                        </div>
                      </div>
                      <div className="mt-2">
                        <span className="text-sm text-gray-600">里程碑:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {plan.milestones.map((milestone, index) => <span key={index} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                              {milestone}
                            </span>)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>)}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>;
}