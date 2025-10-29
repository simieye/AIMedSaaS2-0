// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Badge, Tabs, TabsContent, TabsList, TabsTrigger, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, useToast, Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui';
// @ts-ignore;
import { TrendingUp, BarChart3, PieChart, LineChart, Download, Filter, Calendar, Users, Activity, DollarSign, Target, FileText, Eye, RefreshCw, Brain, Stethoscope, Heart, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

export function AnalyticsReports({
  $w
}) {
  const {
    toast
  } = useToast();
  const [selectedPeriod, setSelectedPeriod] = React.useState('30d');
  const [selectedReport, setSelectedReport] = React.useState('overview');
  const statsData = [{
    title: "总诊断数",
    value: "45,678",
    change: "+15.3%",
    icon: Brain,
    color: "text-blue-600",
    bgColor: "bg-blue-100"
  }, {
    title: "准确率",
    value: "96.8%",
    change: "+2.1%",
    icon: Target,
    color: "text-green-600",
    bgColor: "bg-green-100"
  }, {
    title: "活跃用户",
    value: "2,847",
    change: "+8.7%",
    icon: Users,
    color: "text-purple-600",
    bgColor: "bg-purple-100"
  }, {
    title: "处理时间",
    value: "2.3s",
    change: "-0.5s",
    icon: Clock,
    color: "text-orange-600",
    bgColor: "bg-orange-100"
  }];
  const reports = [{
    id: 1,
    name: "月度诊断报告",
    type: "monthly",
    date: "2024-01-31",
    size: "2.4 MB",
    status: "completed"
  }, {
    id: 2,
    name: "模型性能分析",
    type: "performance",
    date: "2024-01-28",
    size: "1.8 MB",
    status: "completed"
  }, {
    id: 3,
    name: "用户行为分析",
    type: "analytics",
    date: "2024-01-25",
    size: "3.1 MB",
    status: "processing"
  }];
  const handleExportReport = () => {
    toast({
      title: "导出报告",
      description: "正在生成报告..."
    });
  };
  const handleViewReport = report => {
    toast({
      title: "查看报告",
      description: `正在打开${report.name}...`
    });
  };
  return <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">分析报告</h2>
          <p className="text-gray-600">数据分析和报告生成</p>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">7天</SelectItem>
              <SelectItem value="30d">30天</SelectItem>
              <SelectItem value="90d">90天</SelectItem>
              <SelectItem value="1y">1年</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleExportReport} className="flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>导出报告</span>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-600">{stat.change}</span>
                  </div>
                </div>
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>)}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <LineChart className="h-5 w-5 mr-2" />
              诊断趋势
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <LineChart className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">诊断数量趋势图</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <PieChart className="h-5 w-5 mr-2" />
              诊断类型分布
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <PieChart className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">诊断类型饼图</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reports Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="h-5 w-5 mr-2" />
            报告列表
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>报告名称</TableHead>
                  <TableHead>类型</TableHead>
                  <TableHead>生成日期</TableHead>
                  <TableHead>文件大小</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead>操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reports.map(report => <TableRow key={report.id}>
                    <TableCell className="font-medium">{report.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {report.type === 'monthly' ? '月度报告' : report.type === 'performance' ? '性能分析' : '用户分析'}
                      </Badge>
                    </TableCell>
                    <TableCell>{report.date}</TableCell>
                    <TableCell>{report.size}</TableCell>
                    <TableCell>
                      <Badge variant={report.status === 'completed' ? 'default' : 'secondary'}>
                        {report.status === 'completed' ? '已完成' : '处理中'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => handleViewReport(report)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>)}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>;
}