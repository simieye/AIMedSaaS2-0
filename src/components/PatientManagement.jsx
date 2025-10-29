// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Badge, Tabs, TabsContent, TabsList, TabsTrigger, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, useToast, Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui';
// @ts-ignore;
import { Users, Plus, Search, Filter, Download, Eye, Edit, Trash2, Calendar, Heart, FileText, AlertTriangle, CheckCircle, Clock, Mail, Phone, MapPin, Activity, Pill, Stethoscope, Brain, RefreshCw } from 'lucide-react';

export function PatientManagement({
  $w
}) {
  const {
    toast
  } = useToast();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedStatus, setSelectedStatus] = React.useState('all');
  const [isLoading, setIsLoading] = React.useState(false);
  const patients = [{
    id: 1,
    name: "张三",
    age: 45,
    gender: "男",
    phone: "138****5678",
    email: "zhang***@email.com",
    status: "active",
    lastVisit: "2024-01-15",
    totalVisits: 12,
    conditions: ["高血压", "糖尿病"],
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
  }, {
    id: 2,
    name: "李四",
    age: 32,
    gender: "女",
    phone: "139****1234",
    email: "li***@email.com",
    status: "inactive",
    lastVisit: "2023-12-20",
    totalVisits: 8,
    conditions: ["哮喘"],
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
  }, {
    id: 3,
    name: "王五",
    age: 58,
    gender: "男",
    phone: "137****9876",
    email: "wang***@email.com",
    status: "active",
    lastVisit: "2024-01-18",
    totalVisits: 25,
    conditions: ["冠心病", "高血压"],
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
  }];
  const handleAddPatient = () => {
    toast({
      title: "添加患者",
      description: "正在打开添加患者表单..."
    });
  };
  const handleViewPatient = patient => {
    toast({
      title: "查看患者",
      description: `正在查看${patient.name}的详细信息...`
    });
  };
  const handleEditPatient = patient => {
    toast({
      title: "编辑患者",
      description: `正在编辑${patient.name}的信息...`
    });
  };
  const handleDeletePatient = patient => {
    toast({
      title: "删除患者",
      description: `正在删除${patient.name}...`,
      variant: "destructive"
    });
  };
  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) || patient.phone.includes(searchTerm) || patient.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || patient.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });
  return <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">患者管理</h2>
          <p className="text-gray-600">管理患者信息和医疗记录</p>
        </div>
        <Button onClick={handleAddPatient} className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>添加患者</span>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">总患者数</p>
                <p className="text-2xl font-bold text-gray-900">2,847</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">活跃患者</p>
                <p className="text-2xl font-bold text-gray-900">1,923</p>
              </div>
              <Activity className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">新增患者</p>
                <p className="text-2xl font-bold text-gray-900">156</p>
              </div>
              <Plus className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">待复诊</p>
                <p className="text-2xl font-bold text-gray-900">89</p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input type="text" placeholder="搜索患者姓名、电话或邮箱..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
            </div>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="选择状态" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部状态</SelectItem>
                <SelectItem value="active">活跃</SelectItem>
                <SelectItem value="inactive">非活跃</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="flex items-center space-x-2">
              <Filter className="h-4 w-4" />
              <span>更多筛选</span>
            </Button>
            <Button variant="outline" className="flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>导出</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Patients Table */}
      <Card>
        <CardHeader>
          <CardTitle>患者列表</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>患者信息</TableHead>
                  <TableHead>联系方式</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead>最后就诊</TableHead>
                  <TableHead>就诊次数</TableHead>
                  <TableHead>疾病诊断</TableHead>
                  <TableHead>操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPatients.map(patient => <TableRow key={patient.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <img src={patient.avatar} alt={patient.name} className="h-10 w-10 rounded-full" />
                        <div>
                          <p className="font-medium">{patient.name}</p>
                          <p className="text-sm text-gray-500">{patient.age}岁 · {patient.gender}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-1">
                          <Phone className="h-3 w-3 text-gray-400" />
                          <span className="text-sm">{patient.phone}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Mail className="h-3 w-3 text-gray-400" />
                          <span className="text-sm">{patient.email}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={patient.status === 'active' ? 'default' : 'secondary'}>
                        {patient.status === 'active' ? '活跃' : '非活跃'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3 text-gray-400" />
                        <span className="text-sm">{patient.lastVisit}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm font-medium">{patient.totalVisits}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {patient.conditions.map((condition, index) => <Badge key={index} variant="outline" className="text-xs">
                            {condition}
                          </Badge>)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => handleViewPatient(patient)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleEditPatient(patient)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDeletePatient(patient)} className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
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