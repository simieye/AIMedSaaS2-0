// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Badge, Tabs, TabsContent, TabsList, TabsTrigger, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, useToast, Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui';
// @ts-ignore;
import { Stethoscope, Plus, Search, Filter, Download, Eye, Edit, Trash2, Calendar, Star, Clock, Mail, Phone, MapPin, Award, Users, Activity, Brain, Heart, CheckCircle, AlertTriangle, RefreshCw } from 'lucide-react';

export function DoctorManagement({
  $w
}) {
  const {
    toast
  } = useToast();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedDepartment, setSelectedDepartment] = React.useState('all');
  const [isLoading, setIsLoading] = React.useState(false);
  const doctors = [{
    id: 1,
    name: "王医生",
    title: "主任医师",
    department: "心内科",
    phone: "138****5678",
    email: "wang@hospital.com",
    status: "active",
    rating: 4.8,
    patients: 156,
    experience: "15年",
    specialties: ["冠心病", "高血压", "心律失常"],
    avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face"
  }, {
    id: 2,
    name: "李医生",
    title: "副主任医师",
    department: "神经内科",
    phone: "139****1234",
    email: "li@hospital.com",
    status: "active",
    rating: 4.6,
    patients: 98,
    experience: "10年",
    specialties: ["脑血管病", "癫痫", "帕金森病"],
    avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ce2?w=100&h=100&fit=crop&crop=face"
  }, {
    id: 3,
    name: "张医生",
    title: "主治医师",
    department: "呼吸内科",
    phone: "137****9876",
    email: "zhang@hospital.com",
    status: "inactive",
    rating: 4.5,
    patients: 67,
    experience: "8年",
    specialties: ["哮喘", "慢阻肺", "肺部感染"],
    avatar: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=100&h=100&fit=crop&crop=face"
  }];
  const departments = [{
    value: 'all',
    label: '全部科室'
  }, {
    value: 'cardiology',
    label: '心内科'
  }, {
    value: 'neurology',
    label: '神经内科'
  }, {
    value: 'respiratory',
    label: '呼吸内科'
  }, {
    value: 'orthopedics',
    label: '骨科'
  }, {
    value: 'pediatrics',
    label: '儿科'
  }];
  const handleAddDoctor = () => {
    toast({
      title: "添加医生",
      description: "正在打开添加医生表单..."
    });
  };
  const handleViewDoctor = doctor => {
    toast({
      title: "查看医生",
      description: `正在查看${doctor.name}的详细信息...`
    });
  };
  const handleEditDoctor = doctor => {
    toast({
      title: "编辑医生",
      description: `正在编辑${doctor.name}的信息...`
    });
  };
  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) || doctor.phone.includes(searchTerm) || doctor.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || doctor.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });
  return <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">医生管理</h2>
          <p className="text-gray-600">管理医生信息和排班安排</p>
        </div>
        <Button onClick={handleAddDoctor} className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>添加医生</span>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">总医生数</p>
                <p className="text-2xl font-bold text-gray-900">186</p>
              </div>
              <Stethoscope className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">在职医生</p>
                <p className="text-2xl font-bold text-gray-900">142</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">平均评分</p>
                <p className="text-2xl font-bold text-gray-900">4.7</p>
              </div>
              <Star className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">今日接诊</p>
                <p className="text-2xl font-bold text-gray-900">423</p>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
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
                <input type="text" placeholder="搜索医生姓名、电话或邮箱..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
            </div>
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="选择科室" />
              </SelectTrigger>
              <SelectContent>
                {departments.map(dept => <SelectItem key={dept.value} value={dept.value}>
                    {dept.label}
                  </SelectItem>)}
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

      {/* Doctors Table */}
      <Card>
        <CardHeader>
          <CardTitle>医生列表</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>医生信息</TableHead>
                  <TableHead>联系方式</TableHead>
                  <TableHead>科室</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead>评分</TableHead>
                  <TableHead>患者数</TableHead>
                  <TableHead>专长</TableHead>
                  <TableHead>操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDoctors.map(doctor => <TableRow key={doctor.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <img src={doctor.avatar} alt={doctor.name} className="h-10 w-10 rounded-full" />
                        <div>
                          <p className="font-medium">{doctor.name}</p>
                          <p className="text-sm text-gray-500">{doctor.title} · {doctor.experience}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-1">
                          <Phone className="h-3 w-3 text-gray-400" />
                          <span className="text-sm">{doctor.phone}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Mail className="h-3 w-3 text-gray-400" />
                          <span className="text-sm">{doctor.email}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{doctor.department}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={doctor.status === 'active' ? 'default' : 'secondary'}>
                        {doctor.status === 'active' ? '在职' : '离职'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">{doctor.rating}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm font-medium">{doctor.patients}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {doctor.specialties.slice(0, 2).map((specialty, index) => <Badge key={index} variant="outline" className="text-xs">
                            {specialty}
                          </Badge>)}
                        {doctor.specialties.length > 2 && <Badge variant="outline" className="text-xs">
                            +{doctor.specialties.length - 2}
                          </Badge>}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => handleViewDoctor(doctor)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleEditDoctor(doctor)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => {}} className="text-red-600 hover:text-red-700">
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