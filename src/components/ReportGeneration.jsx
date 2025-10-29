// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Badge, Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui';
// @ts-ignore;
import { FileText, Download, Printer, Mail, Calendar, Filter, BarChart3, PieChart, TrendingUp, DollarSign, Users, Target, Award, Settings, Eye, Edit, Plus, RefreshCw, FileSpreadsheet, FileImage, Presentation, FileCheck, Clock, CheckCircle } from 'lucide-react';

export function ReportGeneration({
  sponsors,
  projects,
  financialData
}) {
  const {
    toast
  } = useToast();
  const [selectedReportType, setSelectedReportType] = useState('summary');
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [selectedSponsor, setSelectedSponsor] = useState('all');
  const [selectedFormat, setSelectedFormat] = useState('pdf');
  const [isGenerating, setIsGenerating] = useState(false);
  const reportTypes = [{
    id: 'summary',
    name: '综合报告',
    description: '包含所有关键指标的综合分析报告',
    icon: BarChart3,
    sections: ['概览', '赞助商分析', '项目进展', '财务状况', 'ROI分析']
  }, {
    id: 'sponsor',
    name: '赞助商报告',
    description: '针对特定赞助商的详细报告',
    icon: Users,
    sections: ['赞助商概况', '合作项目', '财务数据', '绩效指标', '建议']
  }, {
    id: 'financial',
    name: '财务报告',
    description: '详细的财务分析和报表',
    icon: DollarSign,
    sections: ['收入分析', '成本分析', '利润分析', '现金流', '预测']
  }, {
    id: 'project',
    name: '项目报告',
    description: '项目进展和成果报告',
    icon: Target,
    sections: ['项目概况', '里程碑', '风险管理', '资源使用', '成果评估']
  }, {
    id: 'roi',
    name: 'ROI分析报告',
    description: '投资回报率专项分析',
    icon: TrendingUp,
    sections: ['ROI概览', '趋势分析', '对比分析', '预测', '建议']
  }, {
    id: 'performance',
    name: '绩效报告',
    description: '关键绩效指标报告',
    icon: Award,
    sections: ['KPI概览', '目标达成', '趋势分析', '改进建议']
  }];
  const reportFormats = [{
    id: 'pdf',
    name: 'PDF',
    description: '适合打印和分享',
    icon: FileText,
    extension: '.pdf'
  }, {
    id: 'excel',
    name: 'Excel',
    description: '适合数据分析',
    icon: FileSpreadsheet,
    extension: '.xlsx'
  }, {
    id: 'powerpoint',
    name: 'PowerPoint',
    description: '适合演示汇报',
    icon: Presentation,
    extension: '.pptx'
  }, {
    id: 'image',
    name: '图片',
    description: '适合快速查看',
    icon: FileImage,
    extension: '.png'
  }];
  const recentReports = [{
    id: 'RPT001',
    name: '2024年1月综合报告',
    type: 'summary',
    period: '2024-01',
    format: 'pdf',
    generatedAt: '2024-02-01 10:30:00',
    generatedBy: '系统管理员',
    size: '2.5MB',
    status: 'completed'
  }, {
    id: 'RPT002',
    name: '辉瑞制药赞助商报告',
    type: 'sponsor',
    period: '2024-Q1',
    format: 'pdf',
    generatedAt: '2024-02-05 14:20:00',
    generatedBy: '商务经理',
    size: '1.8MB',
    status: 'completed'
  }, {
    id: 'RPT003',
    name: '财务分析报告',
    type: 'financial',
    period: '2024-Q1',
    format: 'excel',
    generatedAt: '2024-02-10 09:15:00',
    generatedBy: '财务经理',
    size: '3.2MB',
    status: 'completed'
  }];
  const scheduledReports = [{
    id: 'SCH001',
    name: '月度综合报告',
    type: 'summary',
    frequency: 'monthly',
    nextRun: '2024-03-01 09:00:00',
    recipients: ['manager@company.com', 'finance@company.com'],
    format: 'pdf',
    status: 'active'
  }, {
    id: 'SCH002',
    name: '季度财务报告',
    type: 'financial',
    frequency: 'quarterly',
    nextRun: '2024-04-01 09:00:00',
    recipients: ['cfo@company.com', 'board@company.com'],
    format: 'excel',
    status: 'active'
  }];
  const handleGenerateReport = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      toast({
        title: "报告生成成功",
        description: `${selectedReportType === 'summary' ? '综合报告' : selectedReportType === 'sponsor' ? '赞助商报告' : selectedReportType === 'financial' ? '财务报告' : selectedReportType === 'project' ? '项目报告' : selectedReportType === 'roi' ? 'ROI分析报告' : '绩效报告'}已生成完成`
      });
    }, 3000);
  };
  const handleDownloadReport = (reportId, reportName) => {
    toast({
      title: "下载报告",
      description: `正在下载 ${reportName}`
    });
  };
  const handleScheduleReport = () => {
    toast({
      title: "定时报告",
      description: "正在设置定时报告任务"
    });
  };
  const handleEmailReport = (reportId, reportName) => {
    toast({
      title: "发送报告",
      description: `正在发送 ${reportName} 到邮箱`
    });
  };
  const getStatusBadge = status => {
    const statusConfig = {
      completed: {
        color: 'bg-green-100 text-green-800',
        icon: CheckCircle,
        text: '已完成'
      },
      generating: {
        color: 'bg-blue-100 text-blue-800',
        icon: Clock,
        text: '生成中'
      },
      failed: {
        color: 'bg-red-100 text-red-800',
        icon: FileText,
        text: '失败'
      }
    };
    const config = statusConfig[status] || statusConfig.completed;
    const Icon = config.icon;
    return <Badge className={config.color}>
      <Icon className="w-3 h-3 mr-1" />
      {config.text}
    </Badge>;
  };
  const getFrequencyBadge = frequency => {
    const frequencyConfig = {
      daily: {
        color: 'bg-blue-100 text-blue-800',
        text: '每日'
      },
      weekly: {
        color: 'bg-green-100 text-green-800',
        text: '每周'
      },
      monthly: {
        color: 'bg-yellow-100 text-yellow-800',
        text: '每月'
      },
      quarterly: {
        color: 'bg-purple-100 text-purple-800',
        text: '每季度'
      },
      yearly: {
        color: 'bg-red-100 text-red-800',
        text: '每年'
      }
    };
    const config = frequencyConfig[frequency] || frequencyConfig.monthly;
    return <Badge className={config.color}>{config.text}</Badge>;
  };
  const selectedReportConfig = reportTypes.find(r => r.id === selectedReportType);
  const selectedFormatConfig = reportFormats.find(f => f.id === selectedFormat);
  return <div className="space-y-6">
      {/* 报告生成配置 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Settings className="w-5 h-5 mr-2" />
            报告生成配置
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">报告类型</label>
                <Select value={selectedReportType} onValueChange={setSelectedReportType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {reportTypes.map(type => <SelectItem key={type.id} value={type.id}>
                        <div className="flex items-center space-x-2">
                          <type.icon className="w-4 h-4" />
                          <span>{type.name}</span>
                        </div>
                      </SelectItem>)}
                  </SelectContent>
                </Select>
                {selectedReportConfig && <p className="text-sm text-gray-500 mt-1">{selectedReportConfig.description}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">报告期间</label>
                <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">每日</SelectItem>
                    <SelectItem value="weekly">每周</SelectItem>
                    <SelectItem value="monthly">每月</SelectItem>
                    <SelectItem value="quarterly">每季度</SelectItem>
                    <SelectItem value="yearly">每年</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {selectedReportType === 'sponsor' && <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">选择赞助商</label>
                  <Select value={selectedSponsor} onValueChange={setSelectedSponsor}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">全部赞助商</SelectItem>
                      {sponsors.map(sponsor => <SelectItem key={sponsor.id} value={sponsor.id}>
                          {sponsor.name}
                        </SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>}
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">输出格式</label>
                <Select value={selectedFormat} onValueChange={setSelectedFormat}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {reportFormats.map(format => <SelectItem key={format.id} value={format.id}>
                        <div className="flex items-center space-x-2">
                          <format.icon className="w-4 h-4" />
                          <span>{format.name}</span>
                        </div>
                      </SelectItem>)}
                  </SelectContent>
                </Select>
                {selectedFormatConfig && <p className="text-sm text-gray-500 mt-1">{selectedFormatConfig.description}</p>}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">报告内容</label>
                {selectedReportConfig && <div className="space-y-1">
                    {selectedReportConfig.sections.map((section, index) => <div key={index} className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                        <span className="text-sm text-gray-700">{section}</span>
                      </div>)}
                  </div>}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4 mt-6">
            <Button onClick={handleGenerateReport} disabled={isGenerating}>
              {isGenerating ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <FileText className="w-4 h-4 mr-2" />}
              {isGenerating ? '生成中...' : '生成报告'}
            </Button>
            <Button variant="outline" onClick={handleScheduleReport}>
              <Calendar className="w-4 h-4 mr-2" />
              定时生成
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 最近生成的报告 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center">
              <FileText className="w-5 h-5 mr-2" />
              最近生成的报告
            </span>
            <Button variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              刷新
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentReports.map(report => <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <FileText className="w-8 h-8 text-gray-400" />
                  <div>
                    <h4 className="font-medium text-gray-900">{report.name}</h4>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>类型: {reportTypes.find(t => t.id === report.type)?.name}</span>
                      <span>格式: {report.format.toUpperCase()}</span>
                      <span>大小: {report.size}</span>
                      <span>生成时间: {report.generatedAt}</span>
                      <span>生成者: {report.generatedBy}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusBadge(report.status)}
                  <Button variant="ghost" size="sm" onClick={() => handleDownloadReport(report.id, report.name)}>
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleEmailReport(report.id, report.name)}>
                    <Mail className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </div>)}
          </div>
        </CardContent>
      </Card>

      {/* 定时报告任务 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              定时报告任务
            </span>
            <Button variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              新增定时任务
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {scheduledReports.map(report => <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <Clock className="w-8 h-8 text-gray-400" />
                  <div>
                    <h4 className="font-medium text-gray-900">{report.name}</h4>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>类型: {reportTypes.find(t => t.id === report.type)?.name}</span>
                      {getFrequencyBadge(report.frequency)}
                      <span>下次运行: {report.nextRun}</span>
                      <span>格式: {report.format.toUpperCase()}</span>
                      <span>收件人: {report.recipients.length}人</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={report.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                    {report.status === 'active' ? '运行中' : '已暂停'}
                  </Badge>
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <FileCheck className="w-4 h-4" />
                  </Button>
                </div>
              </div>)}
          </div>
        </CardContent>
      </Card>
    </div>;
}