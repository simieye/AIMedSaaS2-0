// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Tabs, TabsContent, TabsList, TabsTrigger, Button } from '@/components/ui';
// @ts-ignore;
import { Target, Code, Users, AlertTriangle, TrendingUp, Download, Settings } from 'lucide-react';

import { RoadmapTimeline } from '@/components/RoadmapTimeline';
import { FeatureProgress } from '@/components/FeatureProgress';
import { ResourceAllocation } from '@/components/ResourceAllocation';
import { RiskAssessment } from '@/components/RiskAssessment';
import { KPIDashboard } from '@/components/KPIDashboard';
export default function ARoundRoadmap(props) {
  const [activeTab, setActiveTab] = useState('timeline');
  const [roadmapData, setRoadmapData] = useState({});
  const [loading, setLoading] = useState(false);
  const mockRoadmapData = {
    milestones: [{
      id: 'M001',
      title: 'MVP产品发布',
      phase: 'mvp',
      status: 'completed',
      description: '完成核心AI诊断功能，支持心血管和糖尿病基础诊断',
      startDate: '2024-01-01',
      endDate: '2024-03-31',
      teamSize: 8,
      targetUsers: 1000,
      keyObjectives: ['完成AI诊断核心功能', '建立基础数据集', '通过初步验证', '获得种子用户反馈']
    }, {
      id: 'M002',
      title: 'Beta版本测试',
      phase: 'beta',
      status: 'in_progress',
      description: '扩展疾病诊断范围，优化算法准确性，开展医院试点',
      startDate: '2024-04-01',
      endDate: '2024-09-30',
      teamSize: 15,
      targetUsers: 10000,
      keyObjectives: ['支持5种主要疾病诊断', '准确率达到90%+', '完成3家医院试点', '建立商业化模式']
    }, {
      id: 'M003',
      title: '规模化推广',
      phase: 'scale',
      status: 'planned',
      description: '全面市场推广，扩展产品功能，实现盈利目标',
      startDate: '2024-10-01',
      endDate: '2025-12-31',
      teamSize: 30,
      targetUsers: 100000,
      keyObjectives: ['覆盖50+医院', '年收入达到5000万', '完成A轮融资', '建立品牌影响力']
    }],
    features: [{
      id: 'F001',
      name: 'AI诊断核心引擎',
      description: '基于深度学习的医学影像诊断算法',
      module: 'core',
      status: 'completed',
      progress: 100,
      owner: '张三',
      estimatedHours: 2000,
      priority: 'high'
    }, {
      id: 'F002',
      name: '用户管理系统',
      description: '医生和患者用户注册、登录、权限管理',
      module: 'user',
      status: 'completed',
      progress: 100,
      owner: '李四',
      estimatedHours: 800,
      priority: 'high'
    }, {
      id: 'F003',
      name: '数据存储与处理',
      description: '医学数据存储、处理、隐私保护',
      module: 'data',
      status: 'in_progress',
      progress: 75,
      owner: '王五',
      estimatedHours: 1500,
      priority: 'high'
    }, {
      id: 'F004',
      name: '安全与合规',
      description: '数据安全、医疗合规、隐私保护',
      module: 'security',
      status: 'in_progress',
      progress: 60,
      owner: '赵六',
      estimatedHours: 1200,
      priority: 'high'
    }, {
      id: 'F005',
      name: '性能优化',
      description: '系统性能优化、响应时间提升',
      module: 'performance',
      status: 'planned',
      progress: 20,
      owner: '钱七',
      estimatedHours: 600,
      priority: 'medium'
    }, {
      id: 'F006',
      name: '移动端应用',
      description: 'iOS和Android移动端应用开发',
      module: 'user',
      status: 'planned',
      progress: 10,
      owner: '孙八',
      estimatedHours: 1800,
      priority: 'medium'
    }],
    resources: {
      team: [{
        role: 'AI算法工程师',
        count: 6,
        budget: 600
      }, {
        role: '前端开发',
        count: 4,
        budget: 320
      }, {
        role: '后端开发',
        count: 5,
        budget: 400
      }, {
        role: '产品经理',
        count: 2,
        budget: 240
      }, {
        role: 'UI/UX设计师',
        count: 2,
        budget: 160
      }, {
        role: '测试工程师',
        count: 3,
        budget: 180
      }],
      budget: [{
        category: '人力成本',
        amount: 1200,
        percentage: 60
      }, {
        category: '技术研发',
        amount: 400,
        percentage: 20
      }, {
        category: '市场营销',
        amount: 200,
        percentage: 10
      }, {
        category: '运营成本',
        amount: 120,
        percentage: 6
      }, {
        category: '其他费用',
        amount: 80,
        percentage: 4
      }],
      timeline: [{
        phase: 'MVP',
        headcount: 8,
        budget: 300
      }, {
        phase: 'Beta',
        headcount: 15,
        budget: 800
      }, {
        phase: 'Scale',
        headcount: 30,
        budget: 1500
      }]
    },
    risks: [{
      id: 'R001',
      title: 'AI算法准确性不足',
      description: '诊断准确率未达到临床应用标准',
      category: 'technical',
      severity: 'high',
      probability: 'medium',
      impact: 'high',
      mitigationStatus: 'in_progress',
      mitigation: '增加训练数据量，优化算法模型，引入专家审核机制',
      owner: '张三'
    }, {
      id: 'R002',
      title: '医疗合规风险',
      description: '产品不符合医疗行业监管要求',
      category: 'technical',
      severity: 'high',
      probability: 'low',
      impact: 'high',
      mitigationStatus: 'mitigated',
      mitigation: '聘请医疗合规顾问，建立完善的合规体系',
      owner: '李四'
    }, {
      id: 'R003',
      title: '市场竞争激烈',
      description: '同类产品竞争激烈，差异化优势不明显',
      category: 'market',
      severity: 'medium',
      probability: 'high',
      impact: 'medium',
      mitigationStatus: 'in_progress',
      mitigation: '加强产品差异化，建立技术壁垒，拓展细分市场',
      owner: '王五'
    }, {
      id: 'R004',
      title: '人才招聘困难',
      description: 'AI医疗领域专业人才稀缺，招聘难度大',
      category: 'operational',
      severity: 'medium',
      probability: 'medium',
      impact: 'medium',
      mitigationStatus: 'planned',
      mitigation: '建立校企合作，提供有竞争力的薪酬福利',
      owner: '赵六'
    }, {
      id: 'R005',
      title: '资金链断裂风险',
      description: '融资进度不及预期，可能导致资金链断裂',
      category: 'financial',
      severity: 'high',
      probability: 'low',
      impact: 'high',
      mitigationStatus: 'planned',
      mitigation: '多渠道融资，控制成本，提高资金使用效率',
      owner: '钱七'
    }],
    kpiData: {
      totalUsers: 25000,
      userGrowth: 15.2,
      totalRevenue: 2800000,
      revenueGrowth: 22.8,
      conversionRate: 0.12,
      conversionGrowth: 8.5,
      activeRate: 0.68,
      activeGrowth: 5.3,
      userTrend: [{
        date: '2024-01',
        newUsers: 1200,
        activeUsers: 8000
      }, {
        date: '2024-02',
        newUsers: 1500,
        activeUsers: 9500
      }, {
        date: '2024-03',
        newUsers: 1800,
        activeUsers: 11200
      }, {
        date: '2024-04',
        newUsers: 2200,
        activeUsers: 13400
      }, {
        date: '2024-05',
        newUsers: 2800,
        activeUsers: 16200
      }, {
        date: '2024-06',
        newUsers: 3200,
        activeUsers: 19400
      }],
      revenueTrend: [{
        date: '2024-01',
        revenue: 180000,
        target: 200000
      }, {
        date: '2024-02',
        revenue: 220000,
        target: 250000
      }, {
        date: '2024-03',
        revenue: 280000,
        target: 300000
      }, {
        date: '2024-04',
        revenue: 350000,
        target: 380000
      }, {
        date: '2024-05',
        revenue: 450000,
        target: 480000
      }, {
        date: '2024-06',
        revenue: 580000,
        target: 600000
      }],
      targets: [{
        name: '用户数目标',
        actual: 25000,
        goal: 30000,
        percentage: 83.3
      }, {
        name: '收入目标',
        actual: 2800000,
        goal: 3000000,
        percentage: 93.3
      }, {
        name: '准确率目标',
        actual: 92,
        goal: 95,
        percentage: 96.8
      }, {
        name: '医院覆盖目标',
        actual: 18,
        goal: 20,
        percentage: 90.0
      }],
      comparison: [{
        metric: '用户数',
        current: 25000,
        previous: 18000,
        target: 30000
      }, {
        metric: '收入(万)',
        current: 280,
        previous: 180,
        target: 300
      }, {
        metric: '准确率(%)',
        current: 92,
        previous: 88,
        target: 95
      }, {
        metric: '医院数',
        current: 18,
        previous: 12,
        target: 20
      }]
    }
  };
  useEffect(() => {
    setLoading(true);
    // 模拟数据加载
    setTimeout(() => {
      setRoadmapData(mockRoadmapData);
      setLoading(false);
    }, 1000);
  }, []);
  const handleExportReport = () => {
    // 导出功能实现
    console.log('导出A轮BP路线图报告');
  };
  const handleTabChange = tabValue => {
    setActiveTab(tabValue);
  };
  if (loading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">加载中...</div>
      </div>;
  }
  return <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <div className="space-y-6">
          {/* 页面标题 */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">A轮BP功能规划路线图</h1>
                <p className="text-gray-600 mt-2">
                  展示项目里程碑、功能进度、资源分配、风险评估和KPI监控
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm text-gray-500">当前用户</p>
                  <p className="font-semibold text-gray-900">
                    {props.$w.auth.currentUser?.name || '管理员'}
                  </p>
                </div>
                <Button variant="outline" onClick={handleExportReport}>
                  <Download className="w-4 h-4 mr-2" />
                  导出报告
                </Button>
              </div>
            </div>
          </div>

          {/* 功能标签页 */}
          <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="timeline" className="flex items-center space-x-2">
                <Target className="w-4 h-4" />
                <span>里程碑时间轴</span>
              </TabsTrigger>
              <TabsTrigger value="features" className="flex items-center space-x-2">
                <Code className="w-4 h-4" />
                <span>功能进度</span>
              </TabsTrigger>
              <TabsTrigger value="resources" className="flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <span>资源分配</span>
              </TabsTrigger>
              <TabsTrigger value="risks" className="flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4" />
                <span>风险评估</span>
              </TabsTrigger>
              <TabsTrigger value="kpi" className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4" />
                <span>KPI监控</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="timeline">
              <RoadmapTimeline milestones={roadmapData.milestones} />
            </TabsContent>

            <TabsContent value="features">
              <FeatureProgress features={roadmapData.features} />
            </TabsContent>

            <TabsContent value="resources">
              <ResourceAllocation resources={roadmapData.resources} />
            </TabsContent>

            <TabsContent value="risks">
              <RiskAssessment risks={roadmapData.risks} />
            </TabsContent>

            <TabsContent value="kpi">
              <KPIDashboard kpiData={roadmapData.kpiData} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>;
}