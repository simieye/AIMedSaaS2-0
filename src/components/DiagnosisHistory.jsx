// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Select, Badge, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, useToast, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui';
// @ts-ignore;
import { Search, Filter, Download, Eye, Calendar, User, Activity, Brain, FileText } from 'lucide-react';

export function DiagnosisHistory({
  $w,
  className,
  style
}) {
  const {
    toast
  } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [dateRange, setDateRange] = useState('7days');
  const [diagnoses, setDiagnoses] = useState([]);
  const [loading, setLoading] = useState(false);
  const mockDiagnoses = [{
    id: 'AID202401150001',
    patientName: '张三',
    patientId: 'P001',
    department: 'cardiology',
    departmentName: '心血管内科',
    diagnosis: '高血压性心脏病',
    confidence: 0.85,
    doctorName: '王医生',
    status: 'completed',
    createdAt: '2024-01-15 10:30',
    aiModel: 'cardio_diagnosis_v2.1',
    riskLevel: 'medium'
  }, {
    id: 'AID202401150002',
    patientName: '李四',
    patientId: 'P002',
    department: 'oncology',
    departmentName: '肿瘤科',
    diagnosis: '肺癌早期',
    confidence: 0.92,
    doctorName: '李医生',
    status: 'reviewing',
    createdAt: '2024-01-15 09:15',
    aiModel: 'cancer_detection_v3.0',
    riskLevel: 'high'
  }, {
    id: 'AID202401150003',
    patientName: '王五',
    patientId: 'P003',
    department: 'neurology',
    departmentName: '神经内科',
    diagnosis: '脑梗塞',
    confidence: 0.78,
    doctorName: '张医生',
    status: 'completed',
    createdAt: '2024-01-15 08:45',
    aiModel: 'neuro_diagnosis_v1.8',
    riskLevel: 'high'
  }, {
    id: 'AID202401150004',
    patientName: '赵六',
    patientId: 'P004',
    department: 'respiratory',
    departmentName: '呼吸内科',
    diagnosis: '肺炎',
    confidence: 0.88,
    doctorName: '陈医生',
    status: 'pending',
    createdAt: '2024-01-14 16:20',
    aiModel: 'respiratory_diagnosis_v1.5',
    riskLevel: 'low'
  }];
  useEffect(() => {
    setDiagnoses(mockDiagnoses);
  }, []);
  const getStatusBadge = status => {
    const statusConfig = {
      completed: {
        color: 'bg-green-100 text-green-800',
        text: '已完成'
      },
      reviewing: {
        color: 'bg-yellow-100 text-yellow-800',
        text: '审核中'
      },
      pending: {
        color: 'bg-blue-100 text-blue-800',
        text: '待处理'
      }
    };
    const config = statusConfig[status] || statusConfig.pending;
    return <Badge className={config.color}>{config.text}</Badge>;
  };
  const getRiskBadge = level => {
    const riskConfig = {
      high: {
        color: 'bg-red-100 text-red-800',
        text: '高风险'
      },
      medium: {
        color: 'bg-yellow-100 text-yellow-800',
        text: '中风险'
      },
      low: {
        color: 'bg-green-100 text-green-800',
        text: '低风险'
      }
    };
    const config = riskConfig[level] || riskConfig.low;
    return <Badge className={config.color}>{config.text}</Badge>;
  };
  const getConfidenceColor = confidence => {
    if (confidence >= 0.9) return 'text-green-600';
    if (confidence >= 0.8) return 'text-blue-600';
    if (confidence >= 0.7) return 'text-yellow-600';
    return 'text-red-600';
  };
  const handleViewDetails = diagnosisId => {
    toast({
      title: "查看详情",
      description: `正在查看诊断记录 ${diagnosisId} 的详细信息`
    });
  };
  const handleExport = () => {
    toast({
      title: "导出数据",
      description: "正在导出诊断历史数据..."
    });
  };
  const filteredDiagnoses = diagnoses.filter(diagnosis => {
    const matchesSearch = diagnosis.patientName.toLowerCase().includes(searchTerm.toLowerCase()) || diagnosis.diagnosis.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || diagnosis.department === selectedDepartment;
    const matchesStatus = selectedStatus === 'all' || diagnosis.status === selectedStatus;
    return matchesSearch && matchesDepartment && matchesStatus;
  });
  return <div className={className} style={style}>
      <div className="space-y-6">
        {/* 头部 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">诊断历史</h1>
            <p className="text-gray-600">查看和管理AI诊断历史记录</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={handleExport}>
              <Download className="w-4 h-4 mr-2" />
              导出数据
            </Button>
          </div>
        </div>

        {/* 筛选器 */}
        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input placeholder="搜索患者或诊断..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10" />
              </div>
              
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger>
                  <SelectValue placeholder="选择科室" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部科室</SelectItem>
                  <SelectItem value="cardiology">心血管内科</SelectItem>
                  <SelectItem value="oncology">肿瘤科</SelectItem>
                  <SelectItem value="neurology">神经内科</SelectItem>
                  <SelectItem value="respiratory">呼吸内科</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="选择状态" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部状态</SelectItem>
                  <SelectItem value="completed">已完成</SelectItem>
                  <SelectItem value="reviewing">审核中</SelectItem>
                  <SelectItem value="pending">待处理</SelectItem>
                </SelectContent>
              </Select>

              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger>
                  <SelectValue placeholder="时间范围" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">今天</SelectItem>
                  <SelectItem value="7days">最近7天</SelectItem>
                  <SelectItem value="30days">最近30天</SelectItem>
                  <SelectItem value="90days">最近90天</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* 统计卡片 */}
        <div className="grid grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Activity className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">总诊断数</p>
                  <p className="text-2xl font-bold text-gray-900">{filteredDiagnoses.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Brain className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">平均置信度</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {(filteredDiagnoses.reduce((sum, d) => sum + d.confidence, 0) / filteredDiagnoses.length * 100).toFixed(1)}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <User className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">涉及患者</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {new Set(filteredDiagnoses.map(d => d.patientId)).size}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <Calendar className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">高风险诊断</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {filteredDiagnoses.filter(d => d.riskLevel === 'high').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 诊断列表 */}
        <Card>
          <CardHeader>
            <CardTitle>诊断记录</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>患者信息</TableHead>
                  <TableHead>科室</TableHead>
                  <TableHead>诊断结果</TableHead>
                  <TableHead>置信度</TableHead>
                  <TableHead>医生</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead>风险等级</TableHead>
                  <TableHead>时间</TableHead>
                  <TableHead>操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDiagnoses.map(diagnosis => <TableRow key={diagnosis.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium text-gray-900">{diagnosis.patientName}</div>
                        <div className="text-sm text-gray-500">{diagnosis.patientId}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-gray-900">{diagnosis.departmentName}</div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-xs">
                        <div className="font-medium text-gray-900 truncate">{diagnosis.diagnosis}</div>
                        <div className="text-sm text-gray-500">{diagnosis.aiModel}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className={`font-semibold ${getConfidenceColor(diagnosis.confidence)}`}>
                        {(diagnosis.confidence * 100).toFixed(1)}%
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-gray-900">{diagnosis.doctorName}</div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(diagnosis.status)}
                    </TableCell>
                    <TableCell>
                      {getRiskBadge(diagnosis.riskLevel)}
                    </TableCell>
                    <TableCell>
                      <div className="text-gray-900">{diagnosis.createdAt}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => handleViewDetails(diagnosis.id)}>
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <FileText className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>)}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>;
}