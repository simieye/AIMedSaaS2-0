// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Select, useToast, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui';
// @ts-ignore;
import { AlertTriangle, BarChart3, Activity, Target, Zap, Clock, CheckCircle, AlertCircle } from 'lucide-react';

import { HallucinationOverview } from '@/components/HallucinationOverview';
import { HallucinationTrends } from '@/components/HallucinationTrends';
import { CategoryAnalysis } from '@/components/CategoryAnalysis';
import { ModelPerformance } from '@/components/ModelPerformance';
import { AlertManagement } from '@/components/AlertManagement';
export function HallucinationMonitoring({
  $w,
  className,
  style
}) {
  const {
    toast
  } = useToast();
  const [selectedPeriod, setSelectedPeriod] = useState('7days');
  const [selectedModel, setSelectedModel] = useState('all');
  const [monitoringData, setMonitoringData] = useState({});
  const [alerts, setAlerts] = useState([]);
  const mockMonitoringData = {
    overview: {
      totalQueries: 15420,
      hallucinationRate: 0.08,
      accuracyRate: 0.92,
      avgConfidence: 0.85,
      highRiskQueries: 156,
      resolvedIssues: 89
    },
    trends: [{
      date: '2024-01-09',
      queries: 2100,
      hallucinations: 168,
      rate: 0.08,
      accuracy: 0.92
    }, {
      date: '2024-01-10',
      queries: 2250,
      hallucinations: 180,
      rate: 0.08,
      accuracy: 0.92
    }, {
      date: '2024-01-11',
      queries: 2180,
      hallucinations: 196,
      rate: 0.09,
      accuracy: 0.91
    }, {
      date: '2024-01-12',
      queries: 2320,
      hallucinations: 186,
      rate: 0.08,
      accuracy: 0.92
    }, {
      date: '2024-01-13',
      queries: 2450,
      hallucinations: 171,
      rate: 0.07,
      accuracy: 0.93
    }, {
      date: '2024-01-14',
      queries: 2380,
      hallucinations: 166,
      rate: 0.07,
      accuracy: 0.93
    }, {
      date: '2024-01-15',
      queries: 2240,
      hallucinations: 179,
      rate: 0.08,
      accuracy: 0.92
    }],
    categoryDistribution: [{
      category: '心血管疾病',
      queries: 3200,
      hallucinations: 224,
      rate: 0.07
    }, {
      category: '糖尿病',
      queries: 2800,
      hallucinations: 280,
      rate: 0.10
    }, {
      category: '肿瘤疾病',
      queries: 2500,
      hallucinations: 200,
      rate: 0.08
    }, {
      category: '神经疾病',
      queries: 2200,
      hallucinations: 198,
      rate: 0.09
    }, {
      category: '其他',
      queries: 2720,
      hallucinations: 236,
      rate: 0.087
    }],
    modelPerformance: [{
      model: 'default',
      queries: 8000,
      hallucinations: 720,
      rate: 0.09,
      accuracy: 0.91
    }, {
      model: 'enhanced',
      queries: 4500,
      hallucinations: 315,
      rate: 0.07,
      accuracy: 0.93
    }, {
      model: 'fast',
      queries: 2920,
      hallucinations: 292,
      rate: 0.10,
      accuracy: 0.90
    }]
  };
  const mockAlerts = [{
    id: 'ALT001',
    type: 'high_rate',
    severity: 'warning',
    message: '糖尿病相关查询幻觉率超过阈值',
    details: '当前幻觉率: 10%, 阈值: 8%',
    timestamp: '2024-01-15 14:30:00',
    status: 'active'
  }, {
    id: 'ALT002',
    type: 'accuracy_drop',
    severity: 'error',
    message: '快速模型准确率显著下降',
    details: '当前准确率: 85%, 基准: 90%',
    timestamp: '2024-01-15 13:45:00',
    status: 'active'
  }, {
    id: 'ALT003',
    type: 'pattern_detected',
    severity: 'info',
    message: '检测到新的幻觉模式',
    details: '在肿瘤诊断查询中发现新的错误模式',
    timestamp: '2024-01-15 12:20:00',
    status: 'investigating'
  }];
  useEffect(() => {
    setMonitoringData(mockMonitoringData);
    setAlerts(mockAlerts);
  }, []);
  const handleExportReport = () => {
    toast({
      title: "导出报告",
      description: "正在生成幻觉检测报告..."
    });
  };
  const handleInvestigateAlert = alertId => {
    setAlerts(prev => prev.map(alert => alert.id === alertId ? {
      ...alert,
      status: 'investigating'
    } : alert));
    toast({
      title: "开始调查",
      description: `正在调查警报 ${alertId}`
    });
  };
  const handleResolveAlert = alertId => {
    setAlerts(prev => prev.map(alert => alert.id === alertId ? {
      ...alert,
      status: 'resolved'
    } : alert));
    toast({
      title: "警报已解决",
      description: `警报 ${alertId} 已标记为已解决`
    });
  };
  return <div className={className} style={style}>
      <div className="space-y-6">
        {/* 头部 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">幻觉检测监控</h1>
            <p className="text-gray-600">实时监控AI系统的幻觉率，确保回答的准确性和可靠性</p>
          </div>
          <div className="flex items-center space-x-2">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24hours">24小时</SelectItem>
                <SelectItem value="7days">7天</SelectItem>
                <SelectItem value="30days">30天</SelectItem>
                <SelectItem value="90days">90天</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedModel} onValueChange={setSelectedModel}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="选择模型" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部模型</SelectItem>
                <SelectItem value="default">默认模型</SelectItem>
                <SelectItem value="enhanced">增强模型</SelectItem>
                <SelectItem value="fast">快速模型</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={handleExportReport}>
              <BarChart3 className="w-4 h-4 mr-2" />
              导出报告
            </Button>
          </div>
        </div>

        {/* 概览统计 */}
        <HallucinationOverview data={monitoringData.overview} />

        {/* 图表区域 */}
        <div className="grid grid-cols-2 gap-6">
          <HallucinationTrends data={monitoringData.trends} />
          <CategoryAnalysis data={monitoringData.categoryDistribution} />
        </div>

        {/* 模型性能和警报管理 */}
        <div className="grid grid-cols-2 gap-6">
          <ModelPerformance data={monitoringData.modelPerformance} />
          <AlertManagement alerts={alerts} onInvestigate={handleInvestigateAlert} onResolve={handleResolveAlert} />
        </div>
      </div>
    </div>;
}