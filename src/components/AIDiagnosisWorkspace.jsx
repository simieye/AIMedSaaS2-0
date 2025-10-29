// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Select, Textarea, Badge, Alert, AlertDescription, Tabs, TabsContent, TabsList, TabsTrigger, useToast, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui';
// @ts-ignore;
import { Brain, Stethoscope, Activity, FileText, AlertTriangle, CheckCircle, Clock, TrendingUp, Users, BarChart3, Microscope, Heart, Lung } from 'lucide-react';

export function AIDiagnosisWorkspace({
  $w,
  className,
  style
}) {
  const {
    toast
  } = useToast();
  const [selectedDepartment, setSelectedDepartment] = useState('cardiology');
  const [selectedPatient, setSelectedPatient] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [medicalData, setMedicalData] = useState({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [diagnosisResult, setDiagnosisResult] = useState(null);
  const [recentDiagnoses, setRecentDiagnoses] = useState([]);
  const [departmentStats, setDepartmentStats] = useState({});
  const departments = [{
    id: 'cardiology',
    name: '心血管内科',
    icon: Heart,
    color: 'red'
  }, {
    id: 'oncology',
    name: '肿瘤科',
    icon: Microscope,
    color: 'purple'
  }, {
    id: 'neurology',
    name: '神经内科',
    icon: Brain,
    color: 'blue'
  }, {
    id: 'respiratory',
    name: '呼吸内科',
    icon: Lung,
    color: 'green'
  }];
  const mockPatients = [{
    id: 'patient_001',
    name: '张三',
    age: 34,
    gender: '男'
  }, {
    id: 'patient_002',
    name: '李四',
    age: 45,
    gender: '女'
  }, {
    id: 'patient_003',
    name: '王五',
    age: 58,
    gender: '男'
  }];
  const mockRecentDiagnoses = [{
    id: 'diag_001',
    patientName: '张三',
    department: 'cardiology',
    diagnosis: '高血压性心脏病',
    confidence: 0.85,
    time: '10分钟前',
    status: 'completed'
  }, {
    id: 'diag_002',
    patientName: '李四',
    department: 'oncology',
    diagnosis: '肺癌早期',
    confidence: 0.92,
    time: '25分钟前',
    status: 'reviewing'
  }, {
    id: 'diag_003',
    patientName: '王五',
    department: 'neurology',
    diagnosis: '脑梗塞',
    confidence: 0.78,
    time: '1小时前',
    status: 'completed'
  }];
  const mockDepartmentStats = {
    cardiology: {
      totalDiagnoses: 156,
      accuracy: 0.92,
      avgConfidence: 0.87,
      commonConditions: ['高血压', '冠心病', '心律失常']
    },
    oncology: {
      totalDiagnoses: 89,
      accuracy: 0.89,
      avgConfidence: 0.91,
      commonConditions: ['肺癌', '乳腺癌', '结直肠癌']
    },
    neurology: {
      totalDiagnoses: 67,
      accuracy: 0.85,
      avgConfidence: 0.83,
      commonConditions: ['脑梗塞', '癫痫', '帕金森病']
    },
    respiratory: {
      totalDiagnoses: 45,
      accuracy: 0.88,
      avgConfidence: 0.86,
      commonConditions: ['肺炎', '哮喘', 'COPD']
    }
  };
  useEffect(() => {
    setRecentDiagnoses(mockRecentDiagnoses);
    setDepartmentStats(mockDepartmentStats);
  }, []);
  const handleStartDiagnosis = async () => {
    if (!selectedPatient || !symptoms.trim()) {
      toast({
        title: "请完善信息",
        description: "请选择患者并输入症状描述",
        variant: "destructive"
      });
      return;
    }
    setIsAnalyzing(true);

    // 模拟AI诊断过程
    setTimeout(() => {
      const mockResult = {
        diagnosisId: `AID${Date.now()}`,
        primaryDiagnosis: selectedDepartment === 'cardiology' ? '高血压性心脏病' : selectedDepartment === 'oncology' ? '肺癌早期' : selectedDepartment === 'neurology' ? '脑梗塞' : '肺炎',
        confidence: 0.85 + Math.random() * 0.1,
        differentialDiagnosis: [{
          condition: '鉴别诊断1',
          probability: 0.15
        }, {
          condition: '鉴别诊断2',
          probability: 0.08
        }],
        recommendations: ['建议进行进一步检查', '调整治疗方案', '定期复查'],
        riskFactors: ['年龄', '家族史', '生活习惯'],
        treatmentOptions: ['药物治疗', '生活方式干预', '定期监测'],
        evidence: [{
          source: '临床指南',
          strength: '强'
        }, {
          source: '研究文献',
          strength: '中'
        }]
      };
      setDiagnosisResult(mockResult);
      setIsAnalyzing(false);
      toast({
        title: "AI诊断完成",
        description: "诊断分析已完成，请查看结果"
      });
    }, 3000);
  };
  const getDepartmentIcon = deptId => {
    const dept = departments.find(d => d.id === deptId);
    return dept ? dept.icon : Brain;
  };
  const getDepartmentColor = deptId => {
    const dept = departments.find(d => d.id === deptId);
    return dept ? dept.color : 'gray';
  };
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
  return <div className={className} style={style}>
      <div className="space-y-6">
        {/* 头部 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">AI诊断辅助工作台</h1>
            <p className="text-gray-600">基于人工智能的专科疾病诊断辅助系统</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <BarChart3 className="w-4 h-4 mr-2" />
              统计分析
            </Button>
            <Button variant="outline" size="sm">
              <FileText className="w-4 h-4 mr-2" />
              诊断报告
            </Button>
          </div>
        </div>

        {/* 科室选择 */}
        <div className="grid grid-cols-4 gap-4">
          {departments.map(dept => {
          const Icon = dept.icon;
          const stats = departmentStats[dept.id] || {};
          return <Card key={dept.id} className={`cursor-pointer transition-all ${selectedDepartment === dept.id ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:shadow-md'}`} onClick={() => setSelectedDepartment(dept.id)}>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg bg-${dept.color}-100`}>
                      <Icon className={`w-6 h-6 text-${dept.color}-600`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{dept.name}</h3>
                      <p className="text-sm text-gray-600">
                        {stats.totalDiagnoses || 0} 例诊断
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs">
                    <span className="text-gray-500">准确率</span>
                    <span className="font-semibold text-green-600">
                      {((stats.accuracy || 0) * 100).toFixed(1)}%
                    </span>
                  </div>
                </CardContent>
              </Card>;
        })}
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* 诊断输入区 */}
          <div className="col-span-2 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Stethoscope className="w-5 h-5 mr-2" />
                  诊断信息录入
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      选择患者
                    </label>
                    <Select value={selectedPatient} onValueChange={setSelectedPatient}>
                      <SelectTrigger>
                        <SelectValue placeholder="请选择患者" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockPatients.map(patient => <SelectItem key={patient.id} value={patient.id}>
                            {patient.name} ({patient.age}岁, {patient.gender})
                          </SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      选择科室
                    </label>
                    <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map(dept => <SelectItem key={dept.id} value={dept.id}>
                            {dept.name}
                          </SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    症状描述
                  </label>
                  <Textarea placeholder="请详细描述患者的症状..." value={symptoms} onChange={e => setSymptoms(e.target.value)} rows={4} />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      血压
                    </label>
                    <Input placeholder="120/80 mmHg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      心率
                    </label>
                    <Input placeholder="75 次/分" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      体温
                    </label>
                    <Input placeholder="36.5 ℃" />
                  </div>
                </div>

                <Button onClick={handleStartDiagnosis} disabled={isAnalyzing} className="w-full">
                  {isAnalyzing ? <>
                      <Activity className="w-4 h-4 mr-2 animate-spin" />
                      AI分析中...
                    </> : <>
                      <Brain className="w-4 h-4 mr-2" />
                      开始AI诊断
                    </>}
                </Button>
              </CardContent>
            </Card>

            {/* 诊断结果 */}
            {diagnosisResult && <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Brain className="w-5 h-5 mr-2" />
                    AI诊断结果
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-blue-900">主要诊断</h4>
                      <Badge className="bg-blue-100 text-blue-800">
                        置信度: {(diagnosisResult.confidence * 100).toFixed(1)}%
                      </Badge>
                    </div>
                    <p className="text-blue-800">{diagnosisResult.primaryDiagnosis}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">鉴别诊断</h4>
                    <div className="space-y-2">
                      {diagnosisResult.differentialDiagnosis.map((diff, index) => <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="text-gray-700">{diff.condition}</span>
                          <Badge variant="outline">
                            {(diff.probability * 100).toFixed(1)}%
                          </Badge>
                        </div>)}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">治疗建议</h4>
                    <div className="space-y-1">
                      {diagnosisResult.recommendations.map((rec, index) => <div key={index} className="flex items-center text-gray-700">
                          <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                          {rec}
                        </div>)}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button variant="outline" className="flex-1">
                      <FileText className="w-4 h-4 mr-2" />
                      生成报告
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Users className="w-4 h-4 mr-2" />
                      会诊申请
                    </Button>
                  </div>
                </CardContent>
              </Card>}
          </div>

          {/* 右侧信息栏 */}
          <div className="space-y-4">
            {/* 科室统计 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">科室统计</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">总诊断数</span>
                    <span className="font-semibold">
                      {departmentStats[selectedDepartment]?.totalDiagnoses || 0}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">准确率</span>
                    <span className="font-semibold text-green-600">
                      {((departmentStats[selectedDepartment]?.accuracy || 0) * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">平均置信度</span>
                    <span className="font-semibold text-blue-600">
                      {((departmentStats[selectedDepartment]?.avgConfidence || 0) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 常见疾病 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">常见疾病</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {departmentStats[selectedDepartment]?.commonConditions?.map((condition, index) => <div key={index} className="flex items-center p-2 bg-gray-50 rounded">
                      <TrendingUp className="w-4 h-4 mr-2 text-green-500" />
                      <span className="text-gray-700">{condition}</span>
                    </div>) || <p className="text-gray-500 text-sm">暂无数据</p>}
                </div>
              </CardContent>
            </Card>

            {/* 最近诊断 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">最近诊断</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentDiagnoses.slice(0, 3).map(diagnosis => {
                  const Icon = getDepartmentIcon(diagnosis.department);
                  return <div key={diagnosis.id} className="border rounded-lg p-3">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center">
                            <Icon className="w-4 h-4 mr-2 text-gray-600" />
                            <span className="font-medium text-gray-900">{diagnosis.patientName}</span>
                          </div>
                          {getStatusBadge(diagnosis.status)}
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{diagnosis.diagnosis}</p>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-500">{diagnosis.time}</span>
                          <span className="text-blue-600">
                            置信度: {(diagnosis.confidence * 100).toFixed(1)}%
                          </span>
                        </div>
                      </div>;
                })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>;
}