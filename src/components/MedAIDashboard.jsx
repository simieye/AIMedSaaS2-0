// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Badge, Tabs, TabsContent, TabsList, TabsTrigger, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, useToast, Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui';
// @ts-ignore;
import { Brain, Users, Activity, TrendingUp, Clock, Zap, Target, Heart, Stethoscope, AlertTriangle, CheckCircle, Calendar, BarChart3, PieChart, LineChart, FileText, Database, Shield, Server, Cpu, HardDrive, Wifi, Battery, Thermometer, Wind, Eye, RefreshCw, Download, Filter } from 'lucide-react';

export function MedAIDashboard({
  $w
}) {
  const {
    toast
  } = useToast();
  const [selectedPeriod, setSelectedPeriod] = React.useState('7d');
  const [isLoading, setIsLoading] = React.useState(false);
  const statsData = [{
    title: "总患者数",
    value: "2,847",
    change: "+12.5%",
    icon: Users,
    color: "text-blue-600",
    bgColor: "bg-blue-100"
  }, {
    title: "AI诊断次数",
    value: "15,234",
    change: "+23.1%",
    icon: Brain,
    color: "text-purple-600",
    bgColor: "bg-purple-100"
  }, {
    title: "活跃医生",
    value: "186",
    change: "+5.2%",
    icon: Stethoscope,
    color: "text-green-600",
    bgColor: "bg-green-100"
  }, {
    title: "系统准确率",
    value: "98.7%",
    change: "+0.3%",
    icon: Target,
    color: "text-orange-600",
    bgColor: "bg-orange-100"
  }];
  const recentActivities = [{
    id: 1,
    type: "diagnosis",
    title: "AI诊断完成",
    description: "患者张三的胸部X光片AI分析完成",
    time: "2分钟前",
    status: "success"
  }, {
    id: 2,
    type: "patient",
    title: "新患者注册",
    description: "李四完成注册并上传医疗记录",
    time: "5分钟前",
    status: "info"
  }, {
    id: 3,
    type: "alert",
    title: "系统告警",
    description: "GPU使用率超过80%阈值",
    time: "10分钟前",
    status: "warning"
  }, {
    id: 4,
    type: "doctor",
    title: "医生上线",
    description: "王医生开始接诊",
    time: "15分钟前",
    status: "success"
  }];
  const systemHealth = [{
    name: "CPU使用率",
    value: 45,
    status: "normal",
    icon: Cpu
  }, {
    name: "内存使用",
    value: 67,
    status: "normal",
    icon: Database
  }, {
    name: "存储空间",
    value: 82,
    status: "warning",
    icon: HardDrive
  }, {
    name: "网络延迟",
    value: 12,
    status: "normal",
    icon: Wifi
  }];
  const handleRefresh = () => {
    setIsLoading(true);
    toast({
      title: "刷新数据",
      description: "正在获取最新数据..."
    });
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "刷新完成",
        description: "数据已更新"
      });
    }, 2000);
  };
  return <div className="space-y-6">
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

      {/* Charts and Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <BarChart3 className="h-5 w-5 mr-2" />
                AI诊断趋势
              </CardTitle>
              <div className="flex items-center space-x-2">
                <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="24h">24小时</SelectItem>
                    <SelectItem value="7d">7天</SelectItem>
                    <SelectItem value="30d">30天</SelectItem>
                    <SelectItem value="90d">90天</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isLoading}>
                  <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <LineChart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">诊断趋势图表</p>
                <p className="text-sm text-gray-400 mt-2">显示AI诊断数量随时间的变化</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="h-5 w-5 mr-2" />
              最近活动
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map(activity => <div key={activity.id} className="flex items-start space-x-3">
                  <div className={`p-2 rounded-full ${activity.status === 'success' ? 'bg-green-100' : activity.status === 'warning' ? 'bg-yellow-100' : activity.status === 'error' ? 'bg-red-100' : 'bg-blue-100'}`}>
                    {activity.type === 'diagnosis' && <Brain className="h-4 w-4 text-purple-600" />}
                    {activity.type === 'patient' && <Users className="h-4 w-4 text-blue-600" />}
                    {activity.type === 'alert' && <AlertTriangle className="h-4 w-4 text-yellow-600" />}
                    {activity.type === 'doctor' && <Stethoscope className="h-4 w-4 text-green-600" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                    <p className="text-sm text-gray-500">{activity.description}</p>
                    <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                  </div>
                </div>)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Health */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="h-5 w-5 mr-2" />
            系统健康状态
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {systemHealth.map((item, index) => <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <item.icon className="h-4 w-4 text-gray-600" />
                    <span className="text-sm font-medium">{item.name}</span>
                  </div>
                  <span className={`text-sm font-bold ${item.status === 'normal' ? 'text-green-600' : item.status === 'warning' ? 'text-yellow-600' : 'text-red-600'}`}>
                    {item.value}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className={`h-2 rounded-full ${item.status === 'normal' ? 'bg-green-500' : item.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'}`} style={{
                width: `${item.value}%`
              }} />
                </div>
              </div>)}
          </div>
        </CardContent>
      </Card>
    </div>;
}