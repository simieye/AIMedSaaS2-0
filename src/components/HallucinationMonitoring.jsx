// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Select, Badge, useToast, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui';
// @ts-ignore;
import { AlertTriangle, TrendingUp, TrendingDown, Eye, Download, Filter, RefreshCw, CheckCircle, AlertCircle, Clock, BarChart3, Activity } from 'lucide-react';

import { HallucinationOverview } from '@/components/HallucinationOverview';
import { HallucinationTrends } from '@/components/HallucinationTrends';
import { HallucinationAlerts } from '@/components/HallucinationAlerts';
import { CategoryAnalysis } from '@/components/CategoryAnalysis';
import { ModelPerformance } from '@/components/ModelPerformance';
export function HallucinationMonitoring({
  $w,
  onViewReport,
  className,
  style
}) {
  const {
    toast
  } = useToast();
  const [selectedTimeRange, setSelectedTimeRange] = useState('7days');
  const [selectedSeverity, setSelectedSeverity] = useState('all');
  const [selectedModel, setSelectedModel] = useState('all');
  const [hallucinationData, setHallucinationData] = useState({});
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(false);
  const timeRanges = [{
    value: '24hours',
    label: '24小时'
  }, {
    value: '7days',
    label: '7天'
  }, {
    value: '30days',
    label: '30天'
  }, {
    value: '90days',
    label: '90天'
  }];
  const severityLevels = [{
    value: 'all',
    label: '全部级别'
  }, {
    value: 'high',
    label: '高危'
  }, {
    value: 'medium',
    label: '中危'
  }, {
    value: 'low',
    label: '低危'
  }];
  const models = [{
    value: 'all',
    label: '全部模型'
  }, {
    value: 'default',
    label: '默认模型'
  }, {
    value: 'gpt-3.5',
    label: 'GPT-3.5'
  }, {
    value: 'gpt-4',
    label: 'GPT-4'
  }];
  const mockHallucinationData = {
    overview: {
      totalQueries: 10000,
      hallucinationCount: 234,
      hallucinationRate: 2.34,
      highSeverityCount: 45,
      mediumSeverityCount: 123,
      lowSeverityCount: 66,
      avgConfidence: 0.76,
      detectionAccuracy: 0.92
    },
    trends: [{
      date: '2024-02-14',
      queries: 1200,
      hallucinations: 28,
      rate: 2.33,
      confidence: 0.75
    }, {
      date: '2024-02-15',
      queries: 1350,
      hallucinations: 32,
      rate: 2.37,
      confidence: 0.74
    }, {
      date: '2024-02-16',
      queries: 1100,
      hallucinations: 25,
      rate: 2.27,
      confidence: 0.77
    }, {
      date: '2024-02-17',
      queries: 1400,
      hallucinations: 35,
      rate: 2.50,
      confidence: 0.73
    }, {
      date: '2024-02-18',
      queries: 1250,
      hallucinations: 29,
      rate: 2.32,
      confidence: 0.76
    }, {
      date: '2024-02-19',
      queries: 1300,
      hallucinations: 30,
      rate: 2.31,
      confidence: 0.77
    }, {
      date: '2024-02-20',
      queries: 1400,
      hallucinations: 35,
      rate: 2.50,
      confidence: 0.74
    }],
    severityDistribution: [{
      name: '高危',
      value: 45,
      color: '#EF4444'
    }, {
      name: '中危',
      value: 123,
      color: '#F59E0B'
    }, {
      name: '低危',
      value: 66,
      color: '#10B981'
    }],
    categoryAnalysis: [{
      category: '心血管疾病',
      total: 89,
      hallucinations: 67,
      rate: 75.3
    }, {
      category: '糖尿病',
      total: 67,
      hallucinations: 45,
      rate: 67.2
    }, {
      category: '肿瘤',
      total: 45,
      hallucinations: 34,
      rate: 75.6
    }, {
      category: '呼吸系统',
      total: 34,
      hallucinations: 23,
      rate: 67.6
    }, {
      category: '消化系统',
      total: 23,
      hallucinations: 15,
      rate: 65.2
    }],
    modelPerformance: [{
      model: '默认模型',
      queries: 4000,
      hallucinations: 89,
      rate: 2.23,
      accuracy: 0.94,
      confidence: 0.78
    }, {
      model: 'GPT-3.5',
      queries: 3500,
      hallucinations: 87,
      rate: 2.49,
      accuracy: 0.91,
      confidence: 0.74
    }, {
      model: 'GPT-4',
      queries: 2500,
      hallucinations: 58,
      rate: 2.32,
      accuracy: 0.93,
      confidence: 0.76
    }]
  };
  const mockAlerts = [{
    id: 'ALT001',
    type: 'high_risk',
    severity: 'high',
    title: '检测到高危幻觉内容',
    description: '在心血管疾病诊断建议中发现可能的不准确信息',
    query: '急性心肌梗死的治疗方案',
    response: '建议立即服用阿司匹林和硝酸甘油...',
    detectedAt: '2024-02-20 14:30:00',
    model: '默认模型',
    confidence: 0.92,
    status: 'pending',
    assignedTo: '张医生'
  }, {
    id: 'ALT002',
    type: 'trend_anomaly',
    severity: 'medium',
    title: '幻觉检测率异常上升',
    description: '过去24小时内幻觉检测率上升了15%',
    query: '批量查询分析',
    response: '系统检测到异常趋势...',
    detectedAt: '2024-02-20 12:15:00',
    model: '系统监控',
    confidence: 0.87,
    status: 'investigating',
    assignedTo: '李工程师'
  }, {
    id: 'ALT003',
    type: 'model_degradation',
    severity: 'medium',
    title: '模型性能下降',
    description: 'GPT-3.5模型在糖尿病相关问答中准确率下降',
    query: '糖尿病并发症预防',
    response: '模型回答质量评估下降...',
    detectedAt: '2024-02-20 10:45:00',
    model: 'GPT-3.5',
    confidence: 0.84,
    status: 'resolved',
    assignedTo: '王研究员'
  }];
  useEffect(() => {
    setHallucinationData(mockHallucinationData);
    setAlerts(mockAlerts);
  }, []);
  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "刷新完成",
        description: "幻觉检测数据已更新"
      });
    }, 2000);
  };
  const handleExportReport = () => {
    toast({
      title: "导出报告",
      description: "正在生成幻觉检测报告..."
    });
  };
  const handleViewAlert = alertId => {
    if (onViewReport) {
      onViewReport(alertId);
    }
    toast({
      title: "查看告警",
      description: `正在查看告警 ${alertId} 的详细信息`
    });
  };
  const filteredAlerts = alerts.filter(alert => {
    const matchesSeverity = selectedSeverity === 'all' || alert.severity === selectedSeverity;
    const matchesModel = selectedModel === 'all' || alert.model === selectedModel;
    return matchesSeverity && matchesModel;
  });
  return <div className={className} style={style}>
      <div className="space-y-6">
        {/* 头部控制 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">幻觉检测监控</h1>
            <p className="text-gray-600">实时监控AI回答中的潜在幻觉和准确性问题</p>
          </div>
          <div className="flex items-center space-x-2">
            <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {timeRanges.map(range => <SelectItem key={range.value} value={range.value}>
                    {range.label}
                  </SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={selectedSeverity} onValueChange={setSelectedSeverity}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {severityLevels.map(level => <SelectItem key={level.value} value={level.value}>
                    {level.label}
                  </SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={selectedModel} onValueChange={setSelectedModel}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {models.map(model => <SelectItem key={model.value} value={model.value}>
                    {model.label}
                  </SelectItem>)}
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={handleRefresh} disabled={loading}>
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              刷新
            </Button>
            <Button variant="outline" onClick={handleExportReport}>
              <Download className="w-4 h-4 mr-2" />
              导出报告
            </Button>
          </div>
        </div>

        {/* 监控概览 */}
        <HallucinationOverview data={hallucinationData.overview} />

        {/* 趋势分析和分类分析 */}
        <div className="grid grid-cols-2 gap-6">
          <HallucinationTrends data={hallucinationData.trends} />
          <CategoryAnalysis data={hallucinationData.categoryAnalysis} />
        </div>

        {/* 模型性能分析 */}
        <ModelPerformance data={hallucinationData.modelPerformance} />

        {/* 告警列表 */}
        <HallucinationAlerts alerts={filteredAlerts} onViewAlert={handleViewAlert} />
      </div>
    </div>;
}