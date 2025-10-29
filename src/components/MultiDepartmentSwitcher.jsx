// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Badge, useToast } from '@/components/ui';
// @ts-ignore;
import { Heart, Brain, Microscope, Lung, Activity, Users, TrendingUp, BarChart3, Settings, ArrowRight, CheckCircle, AlertCircle, Clock } from 'lucide-react';

export function MultiDepartmentSwitcher({
  $w,
  className,
  style
}) {
  const {
    toast
  } = useToast();
  const [selectedDepartment, setSelectedDepartment] = useState('cardiology');
  const [departments, setDepartments] = useState([]);
  const [departmentStats, setDepartmentStats] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const departmentConfig = [{
    id: 'cardiology',
    name: '心血管内科',
    icon: Heart,
    color: 'red',
    description: '高血压、冠心病、心律失常等心血管疾病诊疗',
    specialties: ['高血压', '冠心病', '心律失常', '心力衰竭'],
    modelVersion: 'v2.1.0',
    status: 'active'
  }, {
    id: 'oncology',
    name: '肿瘤科',
    icon: Microscope,
    color: 'purple',
    description: '各种恶性肿瘤的早期筛查、诊断和综合治疗',
    specialties: ['肺癌', '乳腺癌', '结直肠癌', '胃癌'],
    modelVersion: 'v3.0.0',
    status: 'active'
  }, {
    id: 'neurology',
    name: '神经内科',
    icon: Brain,
    color: 'blue',
    description: '脑血管病、癫痫、帕金森病等神经系统疾病',
    specialties: ['脑梗塞', '癫痫', '帕金森病', '偏头痛'],
    modelVersion: 'v1.8.0',
    status: 'training'
  }, {
    id: 'respiratory',
    name: '呼吸内科',
    icon: Lung,
    color: 'green',
    description: '肺炎、哮喘、COPD等呼吸系统疾病诊疗',
    specialties: ['肺炎', '哮喘', 'COPD', '肺结核'],
    modelVersion: 'v1.5.0',
    status: 'active'
  }];
  const mockDepartmentStats = {
    cardiology: {
      totalDiagnoses: 856,
      accuracy: 0.92,
      avgConfidence: 0.87,
      activeDoctors: 12,
      todayDiagnoses: 23,
      improvementRate: 0.08,
      patientSatisfaction: 0.94,
      avgDiagnosisTime: 3.2,
      errorRate: 0.02
    },
    oncology: {
      totalDiagnoses: 623,
      accuracy: 0.89,
      avgConfidence: 0.91,
      activeDoctors: 8,
      todayDiagnoses: 18,
      improvementRate: 0.12,
      patientSatisfaction: 0.91,
      avgDiagnosisTime: 4.5,
      errorRate: 0.03
    },
    neurology: {
      totalDiagnoses: 534,
      accuracy: 0.85,
      avgConfidence: 0.83,
      activeDoctors: 6,
      todayDiagnoses: 15,
      improvementRate: 0.06,
      patientSatisfaction: 0.88,
      avgDiagnosisTime: 5.1,
      errorRate: 0.04
    },
    respiratory: {
      totalDiagnoses: 443,
      accuracy: 0.82,
      avgConfidence: 0.86,
      activeDoctors: 5,
      todayDiagnoses: 12,
      improvementRate: 0.15,
      patientSatisfaction: 0.89,
      avgDiagnosisTime: 2.8,
      errorRate: 0.03
    }
  };
  useEffect(() => {
    setDepartments(departmentConfig);
    setDepartmentStats(mockDepartmentStats);
  }, []);
  const handleDepartmentSwitch = deptId => {
    setIsLoading(true);
    setTimeout(() => {
      setSelectedDepartment(deptId);
      setIsLoading(false);
      const dept = departments.find(d => d.id === deptId);
      toast({
        title: "科室切换成功",
        description: `已切换到${dept.name}`
      });
    }, 1000);
  };
  const getStatusBadge = status => {
    const statusConfig = {
      active: {
        color: 'bg-green-100 text-green-800',
        icon: CheckCircle,
        text: '运行中'
      },
      training: {
        color: 'bg-blue-100 text-blue-800',
        icon: Clock,
        text: '训练中'
      },
      inactive: {
        color: 'bg-gray-100 text-gray-800',
        icon: AlertCircle,
        text: '已停止'
      }
    };
    const config = statusConfig[status] || statusConfig.inactive;
    const Icon = config.icon;
    return <Badge className={config.color}>
        <Icon className="w-3 h-3 mr-1" />
        {config.text}
      </Badge>;
  };
  const getSelectedDepartmentData = () => {
    const dept = departments.find(d => d.id === selectedDepartment);
    const stats = departmentStats[selectedDepartment] || {};
    return {
      ...dept,
      ...stats
    };
  };
  const selectedDeptData = getSelectedDepartmentData();
  return <div className={className} style={style}>
      <div className="space-y-6">
        {/* 头部 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">多科室管理</h1>
            <p className="text-gray-600">管理和切换不同科室的AI诊断系统</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline">
              <Settings className="w-4 h-4 mr-2" />
              科室设置
            </Button>
            <Button>
              <BarChart3 className="w-4 h-4 mr-2" />
              数据分析
            </Button>
          </div>
        </div>

        {/* 科室选择器 */}
        <div className="grid grid-cols-4 gap-4">
          {departments.map(dept => {
          const Icon = dept.icon;
          const stats = departmentStats[dept.id] || {};
          return <Card key={dept.id} className={`cursor-pointer transition-all ${selectedDepartment === dept.id ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:shadow-md'}`} onClick={() => handleDepartmentSwitch(dept.id)}>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className={`p-2 rounded-lg bg-${dept.color}-100`}>
                      <Icon className={`w-6 h-6 text-${dept.color}-600`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{dept.name}</h3>
                      {getStatusBadge(dept.status)}
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">今日诊断</span>
                      <span className="font-medium">{stats.todayDiagnoses || 0}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">准确率</span>
                      <span className="font-medium text-green-600">
                        {((stats.accuracy || 0) * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">活跃医生</span>
                      <span className="font-medium">{stats.activeDoctors || 0}</span>
                    </div>
                  </div>
                  
                  {selectedDepartment === dept.id && <div className="mt-3 pt-3 border-t border-blue-200">
                      <div className="flex items-center text-blue-600 text-sm">
                        <span>当前科室</span>
                        <ArrowRight className="w-3 h-3 ml-1" />
                      </div>
                    </div>}
                </CardContent>
              </Card>;
        })}
        </div>

        {/* 选中科室详情 */}
        {selectedDeptData && <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 space-y-6">
              {/* 科室概览 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    {selectedDeptData.icon && <selectedDeptData.icon className="w-5 h-5 mr-2" />}
                    {selectedDeptData.name} - 概览
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{selectedDeptData.totalDiagnoses || 0}</div>
                      <div className="text-sm text-gray-600">总诊断数</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {((selectedDeptData.accuracy || 0) * 100).toFixed(1)}%
                      </div>
                      <div className="text-sm text-gray-600">准确率</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">
                        {((selectedDeptData.avgConfidence || 0) * 100).toFixed(1)}%
                      </div>
                      <div className="text-sm text-gray-600">平均置信度</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">{selectedDeptData.activeDoctors || 0}</div>
                      <div className="text-sm text-gray-600">活跃医生</div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h4 className="font-medium text-gray-900 mb-3">专科疾病</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedDeptData.specialties?.map((specialty, index) => <Badge key={index} variant="outline">
                          {specialty}
                        </Badge>)}
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h4 className="font-medium text-gray-900 mb-3">AI模型信息</h4>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">模型版本</span>
                        <span className="font-medium">{selectedDeptData.modelVersion}</span>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-gray-600">状态</span>
                        {getStatusBadge(selectedDeptData.status)}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 性能指标 */}
              <Card>
                <CardHeader>
                  <CardTitle>性能指标</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-gray-600">患者满意度</span>
                          <span className="font-semibold text-green-600">
                            {((selectedDeptData.patientSatisfaction || 0) * 100).toFixed(1)}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-600 h-2 rounded-full" style={{
                        width: `${(selectedDeptData.patientSatisfaction || 0) * 100}%`
                      }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-gray-600">改进率</span>
                          <span className="font-semibold text-blue-600">
                            +{((selectedDeptData.improvementRate || 0) * 100).toFixed(1)}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{
                        width: `${(selectedDeptData.improvementRate || 0) * 100}%`
                      }}></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-gray-600">平均诊断时间</span>
                          <span className="font-semibold text-purple-600">
                            {selectedDeptData.avgDiagnosisTime || 0} 分钟
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-purple-600 h-2 rounded-full" style={{
                        width: `${Math.min((selectedDeptData.avgDiagnosisTime || 0) * 10, 100)}%`
                      }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-gray-600">错误率</span>
                          <span className="font-semibold text-red-600">
                            {((selectedDeptData.errorRate || 0) * 100).toFixed(1)}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-red-600 h-2 rounded-full" style={{
                        width: `${(selectedDeptData.errorRate || 0) * 100}%`
                      }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 右侧信息栏 */}
            <div className="space-y-6">
              {/* 快速操作 */}
              <Card>
                <CardHeader>
                  <CardTitle>快速操作</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button className="w-full" variant="outline">
                      <Activity className="w-4 h-4 mr-2" />
                      查看实时诊断
                    </Button>
                    <Button className="w-full" variant="outline">
                      <Users className="w-4 h-4 mr-2" />
                      医生管理
                    </Button>
                    <Button className="w-full" variant="outline">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      性能分析
                    </Button>
                    <Button className="w-full" variant="outline">
                      <Settings className="w-4 h-4 mr-2" />
                      科室设置
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* 最近活动 */}
              <Card>
                <CardHeader>
                  <CardTitle>最近活动</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900">新诊断完成</div>
                        <div className="text-xs text-gray-500">2分钟前</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900">模型更新完成</div>
                        <div className="text-xs text-gray-500">15分钟前</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900">新医生加入</div>
                        <div className="text-xs text-gray-500">1小时前</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900">系统维护完成</div>
                        <div className="text-xs text-gray-500">2小时前</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 系统状态 */}
              <Card>
                <CardHeader>
                  <CardTitle>系统状态</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">AI模型</span>
                      <Badge className="bg-green-100 text-green-800">正常</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">数据库</span>
                      <Badge className="bg-green-100 text-green-800">正常</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">API服务</span>
                      <Badge className="bg-green-100 text-green-800">正常</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">知识库</span>
                      <Badge className="bg-yellow-100 text-yellow-800">更新中</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>}
      </div>
    </div>;
}