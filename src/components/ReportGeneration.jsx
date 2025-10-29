// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Select, Badge, useToast, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui';
// @ts-ignore;
import { BarChart3, Download, FileText, Calendar, TrendingUp, DollarSign, Users, Target, Eye, Settings, RefreshCw } from 'lucide-react';

export function ReportGeneration({
  $w,
  className,
  style
}) {
  const {
    toast
  } = useToast();
  const [selectedReportType, setSelectedReportType] = useState('sponsorship_performance');
  const [selectedTimeRange, setSelectedTimeRange] = useState('monthly');
  const [selectedFormat, setSelectedFormat] = useState('pdf');
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const reportTypes = [{
    value: 'sponsorship_performance',
    label: '赞助效果报告',
    description: '分析赞助活动的整体效果和ROI',
    icon: TrendingUp
  }, {
    value: 'financial_summary',
    label: '财务汇总报告',
    description: '财务收入、支出和利润分析',
    icon: DollarSign
  }, {
    value: 'sponsor_analytics',
    label: '赞助商分析报告',
    description: '赞助商表现和合作分析',
    icon: Users
  }, {
    value: 'project_performance',
    label: '项目执行报告',
    description: '项目执行情况和达成率分析',
    icon: Target
  }, {
    value: 'ad_performance',
    label: '广告效果报告',
    description: '广告位表现和转化分析',
    icon: BarChart3
  }, {
    value: 'custom_report',
    label: '自定义报告',
    description: '根据需求定制专属报告',
    icon: Settings
  }];
  const timeRanges = [{
    value: 'daily',
    label: '日报'
  }, {
    value: 'weekly',
    label: '周报'
  }, {
    value: 'monthly',
    label: '月报'
  }, {
    value: 'quarterly',
    label: '季报'
  }, {
    value: 'yearly',
    label: '年报'
  }, {
    value: 'custom',
    label: '自定义时间'
  }];
  const formats = [{
    value: 'pdf',
    label: 'PDF'
  }, {
    value: 'excel',
    label: 'Excel'
  }, {
    value: 'word',
    label: 'Word'
  }, {
    value: 'powerpoint',
    label: 'PowerPoint'
  }];
  const mockReports = [{
    id: 'RPT001',
    name: '2024年1月赞助效果报告',
    type: 'sponsorship_performance',
    format: 'pdf',
    status: 'completed',
    generatedDate: '2024-02-01 10:00:00',
    fileSize: '2.5MB',
    downloadUrl: '/reports/sponsorship_performance_202401.pdf',
    generatedBy: '系统管理员'
  }, {
    id: 'RPT002',
    name: '2024年Q1财务汇总报告',
    type: 'financial_summary',
    format: 'excel',
    status: 'completed',
    generatedDate: '2024-04-01 14:30:00',
    fileSize: '1.8MB',
    downloadUrl: '/reports/financial_summary_2024Q1.xlsx',
    generatedBy: '财务经理'
  }, {
    id: 'RPT003',
    name: '辉瑞制药合作分析报告',
    type: 'sponsor_analytics',
    format: 'pdf',
    status: 'generating',
    generatedDate: null,
    fileSize: null,
    downloadUrl: null,
    generatedBy: '系统管理员'
  }, {
    id: 'RPT004',
    name: '2023年度项目执行报告',
    type: 'project_performance',
    format: 'powerpoint',
    status: 'completed',
    generatedDate: '2024-01-15 09:15:00',
    fileSize: '5.2MB',
    downloadUrl: '/reports/project_performance_2023.pptx',
    generatedBy: '项目经理'
  }];
  useEffect(() => {
    setReports(mockReports);
  }, []);
  const getStatusBadge = status => {
    const statusConfig = {
      completed: {
        color: 'bg-green-100 text-green-800',
        text: '已完成'
      },
      generating: {
        color: 'bg-blue-100 text-blue-800',
        text: '生成中'
      },
      failed: {
        color: 'bg-red-100 text-red-800',
        text: '生成失败'
      },
      scheduled: {
        color: 'bg-yellow-100 text-yellow-800',
        text: '已计划'
      }
    };
    const config = statusConfig[status] || statusConfig.completed;
    return <Badge className={config.color}>{config.text}</Badge>;
  };
  const handleGenerateReport = async () => {
    setLoading(true);
    try {
      // 模拟报告生成过程
      await new Promise(resolve => setTimeout(resolve, 3000));
      const newReport = {
        id: `RPT${Date.now()}`,
        name: `${new Date().toLocaleDateString()} ${reportTypes.find(r => r.value === selectedReportType)?.label}`,
        type: selectedReportType,
        format: selectedFormat,
        status: 'completed',
        generatedDate: new Date().toISOString(),
        fileSize: '1.2MB',
        downloadUrl: `/reports/${selectedReportType}_${Date.now()}.${selectedFormat}`,
        generatedBy: '当前用户'
      };
      setReports(prev => [newReport, ...prev]);
      toast({
        title: "报告生成成功",
        description: `${newReport.name} 已生成完成`
      });
    } catch (error) {
      toast({
        title: "生成失败",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  const handleDownloadReport = report => {
    toast({
      title: "下载报告",
      description: `正在下载 ${report.name}...`
    });
  };
  const handleViewReport = report => {
    toast({
      title: "查看报告",
      description: `正在打开 ${report.name}...`
    });
  };
  const handleScheduleReport = () => {
    toast({
      title: "计划报告",
      description: "报告已加入生成计划"
    });
  };
  return <div className={className} style={style}>
      <div className="space-y-6">
        {/* 头部 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">数据报告生成</h1>
            <p className="text-gray-600">生成各类赞助效果、财务和项目执行报告</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              刷新列表
            </Button>
          </div>
        </div>

        {/* 报告生成配置 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="w-5 h-5 mr-2" />
              生成新报告
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  报告类型
                </label>
                <Select value={selectedReportType} onValueChange={setSelectedReportType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {reportTypes.map(type => <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>)}
                  </SelectContent>
                </Select>
                <p className="text-sm text-gray-500 mt-1">
                  {reportTypes.find(r => r.value === selectedReportType)?.description}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  时间范围
                </label>
                <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {timeRanges.map(range => <SelectItem key={range.value} value={range.value}>
                        {range.label}
                      </SelectItem>)}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  输出格式
                </label>
                <Select value={selectedFormat} onValueChange={setSelectedFormat}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {formats.map(format => <SelectItem key={format.value} value={format.value}>
                        {format.label}
                      </SelectItem>)}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button onClick={handleGenerateReport} disabled={loading} className="w-full">
                  {loading ? <>
                      <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      生成中...
                    </> : <>
                      <BarChart3 className="w-4 h-4 mr-2" />
                      生成报告
                    </>}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 报告类型概览 */}
        <div className="grid grid-cols-3 gap-6">
          {reportTypes.slice(0, 3).map(type => {
          const Icon = type.icon;
          return <Card key={type.value}>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{type.label}</h3>
                      <p className="text-sm text-gray-600">{type.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>;
        })}
        </div>

        {/* 历史报告列表 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                历史报告
              </span>
              <Button variant="outline" size="sm" onClick={handleScheduleReport}>
                计划报告
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reports.map(report => {
              const reportType = reportTypes.find(r => r.value === report.type);
              const Icon = reportType?.icon || FileText;
              return <div key={report.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-gray-100 rounded-lg">
                          <Icon className="w-6 h-6 text-gray-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{report.name}</h4>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>{reportType?.label}</span>
                            <span>{report.format.toUpperCase()}</span>
                            {report.fileSize && <span>{report.fileSize}</span>}
                            {report.generatedDate && <span>生成于 {new Date(report.generatedDate).toLocaleDateString()}</span>}
                            <span>生成者: {report.generatedBy}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusBadge(report.status)}
                        {report.status === 'completed' && <>
                            <Button variant="ghost" size="sm" onClick={() => handleViewReport(report)}>
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleDownloadReport(report)}>
                              <Download className="w-4 h-4 mr-2" />
                              下载
                            </Button>
                          </>}
                      </div>
                    </div>
                  </div>;
            })}
            </div>
          </CardContent>
        </Card>

        {/* 快速操作 */}
        <Card>
          <CardHeader>
            <CardTitle>快速操作</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-4">
              <Button variant="outline" className="h-20 flex-col">
                <TrendingUp className="w-6 h-6 mb-2" />
                <span>月度效果报告</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <DollarSign className="w-6 h-6 mb-2" />
                <span>季度财务报告</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <Users className="w-6 h-6 mb-2" />
                <span>赞助商分析</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <Target className="w-6 h-6 mb-2" />
                <span>项目执行报告</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>;
}