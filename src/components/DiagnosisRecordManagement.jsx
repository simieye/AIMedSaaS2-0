// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Select, Badge, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, useToast, SelectTrigger, SelectValue, SelectContent, SelectItem, Alert, AlertDescription } from '@/components/ui';
// @ts-ignore;
import { Search, Filter, Download, Eye, Edit, Trash2, Plus, Calendar, User, Activity, FileText, AlertTriangle, CheckCircle, Clock, BarChart3, RefreshCcw } from 'lucide-react';

export function DiagnosisRecordManagement({
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
  const [selectedDateRange, setSelectedDateRange] = useState('7days');
  const [diagnosisRecords, setDiagnosisRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const departments = [{
    id: 'cardiology',
    name: '心血管内科'
  }, {
    id: 'oncology',
    name: '肿瘤科'
  }, {
    id: 'neurology',
    name: '神经内科'
  }, {
    id: 'respiratory',
    name: '呼吸内科'
  }];

  // 从数据模型加载诊断记录
  const loadDiagnosisRecords = async () => {
    setLoading(true);
    try {
      const result = await $w.cloud.callDataSource({
        dataSourceName: 'ai_diagnosis',
        methodName: 'wedaGetRecordsV2',
        params: {
          select: {
            $master: true
          },
          getCount: true,
          pageSize: 100,
          orderBy: [{
            createdAt: 'desc'
          }]
        }
      });
      if (result.records) {
        setDiagnosisRecords(result.records);
      }
    } catch (error) {
      console.error('加载诊断记录失败:', error);
      toast({
        title: "加载失败",
        description: "无法加载诊断记录数据",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadDiagnosisRecords();
  }, []);
  const getStatusBadge = status => {
    const statusConfig = {
      completed: {
        color: 'bg-green-100 text-green-800',
        icon: CheckCircle,
        text: '已完成'
      },
      reviewing: {
        color: 'bg-yellow-100 text-yellow-800',
        icon: Clock,
        text: '审核中'
      },
      pending: {
        color: 'bg-blue-100 text-blue-800',
        icon: Clock,
        text: '待处理'
      }
    };
    const config = statusConfig[status] || statusConfig.pending;
    const Icon = config.icon;
    return <Badge className={config.color}>
        <Icon className="w-3 h-3 mr-1" />
        {config.text}
      </Badge>;
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
  const handleViewDetails = record => {
    setSelectedRecord(record);
    setShowDetails(true);
  };
  const handleEdit = record => {
    toast({
      title: "编辑记录",
      description: `正在编辑诊断记录 ${record.id}`
    });
  };
  const handleDelete = async recordId => {
    try {
      await $w.cloud.callDataSource({
        dataSourceName: 'ai_diagnosis',
        methodName: 'wedaDeleteV2',
        params: {
          filter: {
            where: {
              _id: {
                $eq: recordId
              }
            }
          }
        }
      });
      setDiagnosisRecords(prev => prev.filter(record => record._id !== recordId));
      toast({
        title: "删除成功",
        description: "诊断记录已删除",
        variant: "destructive"
      });
    } catch (error) {
      console.error('删除记录失败:', error);
      toast({
        title: "删除失败",
        description: error.message,
        variant: "destructive"
      });
    }
  };
  const handleExport = () => {
    toast({
      title: "导出数据",
      description: "正在导出诊断记录数据..."
    });
  };
  const handleRefresh = () => {
    loadDiagnosisRecords();
  };
  const filteredRecords = diagnosisRecords.filter(record => {
    const matchesSearch = record.patientName?.toLowerCase().includes(searchTerm.toLowerCase()) || record.primaryDiagnosis?.toLowerCase().includes(searchTerm.toLowerCase()) || record._id?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || record.department === selectedDepartment;
    const matchesStatus = selectedStatus === 'all' || record.status === selectedStatus;
    return matchesSearch && matchesDepartment && matchesStatus;
  });
  return <div className={className} style={style}>
      <div className="space-y-6">
        {/* 头部 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">诊断记录管理</h1>
            <p className="text-gray-600">查看和管理AI诊断记录，支持搜索、筛选和导出</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={handleRefresh} disabled={loading}>
              {loading ? <>
                  <RefreshCcw className="w-4 h-4 mr-2 animate-spin" />
                  刷新中...
                </> : <>
                  <RefreshCcw className="w-4 h-4 mr-2" />
                  刷新
                </>}
            </Button>
            <Button variant="outline" onClick={handleExport}>
              <Download className="w-4 h-4 mr-2" />
              导出数据
            </Button>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              新建记录
            </Button>
          </div>
        </div>

        {/* 筛选器 */}
        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input placeholder="搜索患者、诊断或记录ID..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10" />
              </div>
              
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger>
                  <SelectValue placeholder="选择科室" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部科室</SelectItem>
                  {departments.map(dept => <SelectItem key={dept.id} value={dept.id}>
                      {dept.name}
                    </SelectItem>)}
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

              <Select value={selectedDateRange} onValueChange={setSelectedDateRange}>
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
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">总记录数</p>
                  <p className="text-2xl font-bold text-gray-900">{filteredRecords.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">已完成</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {filteredRecords.filter(r => r.status === 'completed').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">待处理</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {filteredRecords.filter(r => r.status === 'pending').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">高风险</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {filteredRecords.filter(r => r.riskLevel === 'high').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 诊断记录列表 */}
        <Card>
          <CardHeader>
            <CardTitle>诊断记录列表</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>记录ID</TableHead>
                  <TableHead>患者信息</TableHead>
                  <TableHead>科室</TableHead>
                  <TableHead>诊断结果</TableHead>
                  <TableHead>置信度</TableHead>
                  <TableHead>医生</TableHead>
                  <TableHead>风险等级</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead>创建时间</TableHead>
                  <TableHead>操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRecords.map(record => <TableRow key={record._id} className="cursor-pointer hover:bg-gray-50" onClick={() => handleViewDetails(record)}>
                    <TableCell>
                      <div className="font-medium text-gray-900">{record._id}</div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium text-gray-900">{record.patientName}</div>
                        <div className="text-sm text-gray-500">
                          {record.patientAge}岁 {record.patientGender}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-gray-900">{record.departmentName}</div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-xs">
                        <div className="font-medium text-gray-900 truncate">{record.primaryDiagnosis}</div>
                        <div className="text-sm text-gray-500">{record.aiModel}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className={`font-semibold ${getConfidenceColor(record.confidence)}`}>
                        {(record.confidence * 100).toFixed(1)}%
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-gray-900">{record.doctorName}</div>
                    </TableCell>
                    <TableCell>
                      {getRiskBadge(record.riskLevel)}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(record.status)}
                    </TableCell>
                    <TableCell>
                      <div className="text-gray-900">{record.createdAt}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" onClick={e => {
                      e.stopPropagation();
                      handleViewDetails(record);
                    }}>
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={e => {
                      e.stopPropagation();
                      handleEdit(record);
                    }}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={e => {
                      e.stopPropagation();
                      handleDelete(record._id);
                    }}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>)}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* 详情弹窗 */}
        {showDetails && selectedRecord && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">诊断记录详情</h2>
                <Button variant="ghost" onClick={() => setShowDetails(false)}>
                  ×
                </Button>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">基本信息</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">记录ID:</span>
                      <span className="font-medium">{selectedRecord._id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">患者姓名:</span>
                      <span className="font-medium">{selectedRecord.patientName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">年龄性别:</span>
                      <span className="font-medium">{selectedRecord.patientAge}岁 {selectedRecord.patientGender}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">科室:</span>
                      <span className="font-medium">{selectedRecord.departmentName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">医生:</span>
                      <span className="font-medium">{selectedRecord.doctorName}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">诊断信息</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">主要诊断:</span>
                      <span className="font-medium">{selectedRecord.primaryDiagnosis}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">置信度:</span>
                      <span className={`font-medium ${getConfidenceColor(selectedRecord.confidence)}`}>
                        {(selectedRecord.confidence * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">风险等级:</span>
                      {getRiskBadge(selectedRecord.riskLevel)}
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">状态:</span>
                      {getStatusBadge(selectedRecord.status)}
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">AI模型:</span>
                      <span className="font-medium">{selectedRecord.aiModel}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="font-semibold text-gray-900 mb-3">症状描述</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedRecord.symptoms?.map((symptom, index) => <Badge key={index} variant="outline">
                      {symptom}
                    </Badge>)}
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="font-semibold text-gray-900 mb-3">医疗数据</h3>
                <div className="grid grid-cols-3 gap-4">
                  {Object.entries(selectedRecord.medicalData || {}).map(([key, value]) => <div key={key} className="bg-gray-50 p-3 rounded">
                      <div className="text-sm text-gray-600">{key}</div>
                      <div className="font-medium">{value}</div>
                    </div>)}
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="font-semibold text-gray-900 mb-3">治疗建议</h3>
                <div className="space-y-2">
                  {selectedRecord.recommendations?.map((rec, index) => <div key={index} className="flex items-center text-gray-700">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                      {rec}
                    </div>)}
                </div>
              </div>
              
              {selectedRecord.notes && <div className="mt-6">
                  <h3 className="font-semibold text-gray-900 mb-3">备注</h3>
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-gray-700">{selectedRecord.notes}</p>
                  </div>
                </div>}
              
              <div className="mt-6 flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowDetails(false)}>
                  关闭
                </Button>
                <Button>
                  <FileText className="w-4 h-4 mr-2" />
                  导出报告
                </Button>
              </div>
            </div>
          </div>}
      </div>
    </div>;
}