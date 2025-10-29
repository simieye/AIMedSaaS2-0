// @ts-ignore;
import React, { useState, useEffect, useRef } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Badge, Tabs, TabsContent, TabsList, TabsTrigger, useToast, Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, Label, Switch, Progress, Alert, AlertDescription, AlertTitle } from '@/components/ui';
// @ts-ignore;
import { Plus, Watch, Heart, Activity, Thermometer, Battery, Wifi, AlertCircle, RefreshCw, Settings, Trash2, Edit, CheckCircle, XCircle, Loader2, Download, Play, Pause, Upload, Search, Filter, TrendingUp, BarChart3, FileSpreadsheet, Video, HelpCircle, Zap, Signal, Bluetooth, Radar, BarChart, TrendingDown, Calendar, Clock, User, Smartphone, Headphones, FootprintsIcon } from 'lucide-react';

// 导入自定义组件
import { DeviceDiscoveryModal } from './DeviceDiscoveryModal';
import { DeviceCard } from './DeviceCard';
import { RealtimeChart } from './RealtimeChart';
import { BatchConfigModal } from './BatchConfigModal';
import { DataExportModal } from './DataExportModal';
import { TutorialModal } from './TutorialModal';
import { FirmwareUpdateModal } from './FirmwareUpdateModal';
import { HealthMetricsCard } from './HealthMetricsCard';
import { DeviceAnalytics } from './DeviceAnalytics';
import { HealthTrendAnalysis } from './HealthTrendAnalysis';
export function WearableHub() {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddDevice, setShowAddDevice] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [realtimeData, setRealtimeData] = useState({});
  const [activeTab, setActiveTab] = useState('devices');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showDiscovery, setShowDiscovery] = useState(false);
  const [discoveryDevices, setDiscoveryDevices] = useState([]);
  const [showFirmwareUpdate, setShowFirmwareUpdate] = useState(false);
  const [firmwareUpdateProgress, setFirmwareUpdateProgress] = useState({});
  const [showTutorial, setShowTutorial] = useState(false);
  const [tutorialVideo, setTutorialVideo] = useState(null);
  const [selectedDevices, setSelectedDevices] = useState([]);
  const [showBatchConfig, setShowBatchConfig] = useState(false);
  const [showDataExport, setShowDataExport] = useState(false);
  const [alerts, setAlerts] = useState([]);
  const [healthTrends, setHealthTrends] = useState({});
  const [deviceAnalytics, setDeviceAnalytics] = useState({});
  const [historicalData, setHistoricalData] = useState({});
  const [healthScore, setHealthScore] = useState(0);
  const [riskAssessment, setRiskAssessment] = useState({});
  const {
    toast
  } = useToast();
  useEffect(() => {
    loadDevices();
    const realtimeInterval = startRealtimeUpdates();
    const trendsInterval = updateHealthTrends();
    return () => {
      if (realtimeInterval) {
        clearInterval(realtimeInterval);
      }
      if (trendsInterval) {
        clearInterval(trendsInterval);
      }
    };
  }, []);
  const loadDevices = async () => {
    try {
      setLoading(true);
      const response = await $w.cloud.callDataSource({
        dataSourceName: 'wearable_devices',
        methodName: 'wedaGetRecordsV2',
        params: {
          select: {
            $master: true
          },
          orderBy: [{
            registered_at: 'desc'
          }],
          getCount: true
        }
      });
      if (response.records) {
        setDevices(response.records);
        await loadDeviceAnalytics(response.records);
      }
    } catch (error) {
      console.error('加载设备失败:', error);
      toast({
        title: "加载设备失败",
        description: error.message || "无法获取设备列表",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  const loadDeviceAnalytics = async deviceList => {
    try {
      const analytics = {};
      for (const device of deviceList) {
        // 模拟加载设备分析数据
        analytics[device._id] = {
          totalSteps: Math.floor(Math.random() * 100000) + 50000,
          avgHeartRate: Math.floor(Math.random() * 20) + 65,
          sleepHours: (Math.random() * 3 + 6).toFixed(1),
          activeMinutes: Math.floor(Math.random() * 200) + 100,
          caloriesBurned: Math.floor(Math.random() * 1000) + 1500,
          batteryLife: Math.floor(Math.random() * 7) + 1,
          dataPoints: Math.floor(Math.random() * 10000) + 5000,
          lastSync: new Date(Date.now() - Math.random() * 3600000).toLocaleString()
        };
      }
      setDeviceAnalytics(analytics);
    } catch (error) {
      console.error('加载设备分析数据失败:', error);
    }
  };
  const startRealtimeUpdates = () => {
    const interval = setInterval(() => {
      const mockData = {};
      const newAlerts = [];
      devices.forEach(device => {
        const heartRate = 70 + Math.random() * 40;
        const temperature = 36.5 + Math.random() * 2;
        const steps = Math.floor(Math.random() * 1000);
        const battery = Math.floor(Math.random() * 30) + 70;
        const bloodOxygen = 95 + Math.random() * 5;
        const stressLevel = Math.floor(Math.random() * 100);
        const sleepQuality = Math.floor(Math.random() * 100);
        mockData[device.device_id] = {
          heart_rate: Math.round(heartRate),
          temperature: temperature.toFixed(1),
          steps: steps,
          battery_level: battery,
          blood_oxygen: Math.round(bloodOxygen),
          stress_level: stressLevel,
          sleep_quality: sleepQuality,
          last_update: new Date().toLocaleTimeString()
        };

        // 检查异常
        const deviceAlerts = checkAlerts({
          device_id: device.device_id,
          heart_rate: heartRate,
          temperature: temperature,
          battery_level: battery,
          blood_oxygen: bloodOxygen,
          stress_level: stressLevel
        });
        newAlerts.push(...deviceAlerts);
      });
      setRealtimeData(mockData);
      setAlerts(newAlerts);
      updateHealthScore(mockData);
    }, 5000);
    return interval;
  };
  const updateHealthTrends = () => {
    const interval = setInterval(() => {
      const trends = {};
      devices.forEach(device => {
        const currentData = realtimeData[device.device_id];
        if (currentData) {
          trends[device.device_id] = {
            heartRateTrend: calculateTrend(currentData.heart_rate, 70, 100),
            temperatureTrend: calculateTrend(currentData.temperature, 36.0, 37.5),
            activityTrend: calculateTrend(currentData.steps, 5000, 15000),
            sleepTrend: calculateTrend(currentData.sleep_quality || 75, 60, 90),
            stressTrend: calculateTrend(100 - currentData.stress_level, 60, 90)
          };
        }
      });
      setHealthTrends(trends);
    }, 30000); // 每30秒更新趋势
    return interval;
  };
  const calculateTrend = (current, min, max) => {
    const normalized = (current - min) / (max - min) * 100;
    const trend = normalized > 70 ? 'up' : normalized < 30 ? 'down' : 'stable';
    return {
      value: Math.max(0, Math.min(100, normalized)),
      trend: trend,
      status: normalized > 80 ? 'excellent' : normalized > 60 ? 'good' : normalized > 40 ? 'fair' : 'poor'
    };
  };
  const updateHealthScore = data => {
    const deviceIds = Object.keys(data);
    if (deviceIds.length === 0) return;
    let totalScore = 0;
    let metricsCount = 0;
    deviceIds.forEach(deviceId => {
      const deviceData = data[deviceId];
      // 心率评分 (60-100为正常)
      const heartRateScore = deviceData.heart_rate >= 60 && deviceData.heart_rate <= 100 ? 100 : 50;
      // 体温评分 (36.0-37.5为正常)
      const tempScore = deviceData.temperature >= 36.0 && deviceData.temperature <= 37.5 ? 100 : 50;
      // 血氧评分 (95-100为正常)
      const oxygenScore = deviceData.blood_oxygen >= 95 ? 100 : 70;
      // 压力评分 (越低越好)
      const stressScore = 100 - deviceData.stress_level;
      totalScore += (heartRateScore + tempScore + oxygenScore + stressScore) / 4;
      metricsCount++;
    });
    const overallScore = Math.round(totalScore / metricsCount);
    setHealthScore(overallScore);

    // 风险评估
    const riskLevel = overallScore >= 80 ? 'low' : overallScore >= 60 ? 'medium' : 'high';
    setRiskAssessment({
      level: riskLevel,
      score: overallScore,
      recommendations: getHealthRecommendations(overallScore, data)
    });
  };
  const getHealthRecommendations = (score, data) => {
    const recommendations = [];
    const deviceIds = Object.keys(data);
    if (score < 60) {
      recommendations.push('建议进行全面的健康检查');
    }
    deviceIds.forEach(deviceId => {
      const deviceData = data[deviceId];
      if (deviceData.heart_rate > 100) {
        recommendations.push('心率偏高，建议休息并咨询医生');
      }
      if (deviceData.temperature > 37.5) {
        recommendations.push('体温偏高，注意监测体温变化');
      }
      if (deviceData.blood_oxygen < 95) {
        recommendations.push('血氧偏低，建议深呼吸练习');
      }
      if (deviceData.stress_level > 70) {
        recommendations.push('压力水平较高，建议进行放松训练');
      }
    });
    return recommendations.length > 0 ? recommendations : ['健康状况良好，继续保持'];
  };
  const checkAlerts = deviceData => {
    const newAlerts = [];
    const thresholds = {
      heart_rate: {
        min: 60,
        max: 100
      },
      temperature: {
        min: 35.5,
        max: 37.5
      },
      battery: {
        min: 20
      },
      blood_oxygen: {
        min: 95
      },
      stress: {
        max: 80
      }
    };
    if (deviceData.heart_rate < thresholds.heart_rate.min || deviceData.heart_rate > thresholds.heart_rate.max) {
      newAlerts.push({
        type: 'heart_rate',
        message: `心率异常: ${deviceData.heart_rate} bpm`,
        severity: 'high',
        device: deviceData.device_id
      });
    }
    if (deviceData.temperature < thresholds.temperature.min || deviceData.temperature > thresholds.temperature.max) {
      newAlerts.push({
        type: 'temperature',
        message: `体温异常: ${deviceData.temperature}°C`,
        severity: 'medium',
        device: deviceData.device_id
      });
    }
    if (deviceData.battery_level < thresholds.battery.min) {
      newAlerts.push({
        type: 'battery',
        message: `电量过低: ${deviceData.battery_level}%`,
        severity: 'low',
        device: deviceData.device_id
      });
    }
    if (deviceData.blood_oxygen < thresholds.blood_oxygen.min) {
      newAlerts.push({
        type: 'blood_oxygen',
        message: `血氧偏低: ${deviceData.blood_oxygen}%`,
        severity: 'high',
        device: deviceData.device_id
      });
    }
    if (deviceData.stress_level > thresholds.stress.max) {
      newAlerts.push({
        type: 'stress',
        message: `压力过高: ${deviceData.stress_level}%`,
        severity: 'medium',
        device: deviceData.device_id
      });
    }
    return newAlerts;
  };
  const handleToggleDeviceStatus = async (deviceId, currentStatus) => {
    try {
      const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
      await $w.cloud.callDataSource({
        dataSourceName: 'wearable_devices',
        methodName: 'wedaUpdateV2',
        params: {
          data: {
            status: newStatus,
            updated_at: new Date().toISOString()
          },
          filter: {
            where: {
              _id: {
                $eq: deviceId
              }
            }
          }
        }
      });
      toast({
        title: `设备已${newStatus === 'active' ? '启用' : '停用'}`,
        variant: "default"
      });
      loadDevices();
    } catch (error) {
      console.error('更新设备状态失败:', error);
      toast({
        title: "操作失败",
        description: error.message || "无法更新设备状态",
        variant: "destructive"
      });
    }
  };
  const handleDeleteDevice = async deviceId => {
    try {
      await $w.cloud.callDataSource({
        dataSourceName: 'wearable_devices',
        methodName: 'wedaDeleteV2',
        params: {
          filter: {
            where: {
              _id: {
                $eq: deviceId
              }
            }
          }
        }
      });
      toast({
        title: "设备已删除",
        description: "设备已从系统中移除",
        variant: "default"
      });
      loadDevices();
    } catch (error) {
      console.error('删除设备失败:', error);
      toast({
        title: "删除失败",
        description: error.message || "无法删除设备",
        variant: "destructive"
      });
    }
  };
  const addDevice = async deviceData => {
    try {
      const newDevice = {
        ...deviceData,
        user_id: 'current_user_id',
        registered_at: new Date().toISOString(),
        last_sync_at: new Date().toISOString(),
        status: 'active',
        health_data: {
          heart_rate: 75,
          steps: 0,
          battery_level: 100,
          temperature: 36.5,
          blood_oxygen: 98,
          stress_level: 30,
          sleep_quality: 80
        },
        sync_config: {
          sync_frequency: 300,
          auto_sync: true,
          data_retention_days: 30
        },
        alert_thresholds: {
          heart_rate_min: 60,
          heart_rate_max: 100,
          temperature_min: 35.5,
          temperature_max: 37.5,
          battery_min: 20,
          blood_oxygen_min: 95,
          stress_max: 80
        }
      };
      const response = await $w.cloud.callDataSource({
        dataSourceName: 'wearable_devices',
        methodName: 'wedaCreateV2',
        params: {
          data: newDevice
        }
      });
      if (response.id) {
        toast({
          title: "设备添加成功",
          description: `${deviceData.brand} ${deviceData.model} 已成功添加`,
          variant: "default"
        });
        loadDevices();
      }
    } catch (error) {
      console.error('添加设备失败:', error);
      toast({
        title: "添加设备失败",
        description: error.message || "无法添加新设备",
        variant: "destructive"
      });
    }
  };
  const toggleDeviceSelection = deviceId => {
    setSelectedDevices(prev => prev.includes(deviceId) ? prev.filter(id => id !== deviceId) : [...prev, deviceId]);
  };
  const filteredDevices = devices.filter(device => {
    const matchesSearch = device.brand.toLowerCase().includes(searchTerm.toLowerCase()) || device.model.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || device.status === filterStatus;
    return matchesSearch && matchesStatus;
  });
  const getDeviceIcon = deviceType => {
    const icons = {
      smartwatch: <Watch className="h-5 w-5" />,
      fitness_tracker: <Activity className="h-5 w-5" />,
      smart_ring: <FootprintsIcon className="h-5 w-5" />,
      medical_device: <Heart className="h-5 w-5" />,
      headphones: <Headphones className="h-5 w-5" />,
      smartphone: <Smartphone className="h-5 w-5" />
    };
    return icons[deviceType] || icons.smartwatch;
  };
  return <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">智能穿戴设备中心</h1>
          <p className="text-muted-foreground">管理您的健康监测设备</p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={() => setShowDiscovery(true)} variant="outline">
            <Radar className="h-4 w-4 mr-2" />
            发现设备
          </Button>
          <Button onClick={() => setShowDataExport(true)} variant="outline">
            <Download className="h-4 w-4 mr-2" />
            导出数据
          </Button>
          {selectedDevices.length > 0 && <Button onClick={() => setShowBatchConfig(true)}>
              <Settings className="h-4 w-4 mr-2" />
              批量配置 ({selectedDevices.length})
            </Button>}
          <Button onClick={() => setShowAddDevice(true)}>
            <Plus className="h-4 w-4 mr-2" />
            添加设备
          </Button>
        </div>
      </div>

      {/* 健康评分概览 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center">
              <Heart className="h-4 w-4 mr-2" />
              健康评分
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{healthScore}</p>
            <p className="text-sm text-muted-foreground">综合健康指数</p>
            <Progress value={healthScore} className="mt-2" />
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-50 to-green-100">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center">
              <Activity className="h-4 w-4 mr-2" />
              活跃设备
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{devices.filter(d => d.status === 'active').length}</p>
            <p className="text-sm text-muted-foreground">台设备在线</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-orange-50 to-orange-100">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center">
              <AlertCircle className="h-4 w-4 mr-2" />
              健康警报
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{alerts.length}</p>
            <p className="text-sm text-muted-foreground">个异常指标</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center">
              <TrendingUp className="h-4 w-4 mr-2" />
              风险等级
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold capitalize">{riskAssessment.level}</p>
            <p className="text-sm text-muted-foreground">健康风险评估</p>
          </CardContent>
        </Card>
      </div>

      {/* 全局警报 */}
      {alerts.length > 0 && <div className="mb-4">
          <Alert variant={alerts.some(a => a.severity === 'high') ? 'destructive' : 'default'}>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>健康警报</AlertTitle>
            <AlertDescription>
              检测到 {alerts.length} 个异常指标，{alerts.filter(a => a.severity === 'high').length} 个需要立即关注
            </AlertDescription>
          </Alert>
        </div>}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList>
          <TabsTrigger value="devices">设备列表</TabsTrigger>
          <TabsTrigger value="monitoring">实时监控</TabsTrigger>
          <TabsTrigger value="health">健康分析</TabsTrigger>
          <TabsTrigger value="trends">趋势报告</TabsTrigger>
        </TabsList>

        <TabsContent value="devices">
          <div className="mb-4 flex space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input placeholder="搜索设备..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10" />
              </div>
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部状态</SelectItem>
                <SelectItem value="active">在线</SelectItem>
                <SelectItem value="inactive">离线</SelectItem>
                <SelectItem value="error">异常</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {loading ? <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div> : filteredDevices.length === 0 ? <div className="text-center py-12">
              <Signal className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">暂无设备</h3>
              <p className="text-muted-foreground mb-4">添加您的第一个智能穿戴设备开始监测健康数据</p>
              <div className="flex justify-center space-x-2">
                <Button onClick={() => setShowDiscovery(true)}>
                  <Radar className="h-4 w-4 mr-2" />
                  发现设备
                </Button>
                <Button onClick={() => setShowAddDevice(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  手动添加
                </Button>
              </div>
            </div> : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDevices.map(device => <DeviceCard key={device._id} device={device} realtimeData={realtimeData[device.device_id] || {}} chartData={generateChartData(device.device_id)} alerts={alerts.filter(alert => alert.device === device.device_id)} analytics={deviceAnalytics[device._id] || {}} onToggleStatus={handleToggleDeviceStatus} onDelete={handleDeleteDevice} onUpdateFirmware={deviceId => {
            setShowFirmwareUpdate(true);
            setFirmwareUpdateProgress(prev => ({
              ...prev,
              [deviceId]: 0
            }));
          }} onShowTutorial={type => {
            const videos = {
              smartwatch: {
                title: '智能手表使用教程',
                url: 'https://www.youtube.com/embed/smartwatch_tutorial',
                duration: '5:30'
              },
              fitness_tracker: {
                title: '健身追踪器使用教程',
                url: 'https://www.youtube.com/embed/fitness_tutorial',
                duration: '4:15'
              },
              smart_ring: {
                title: '智能戒指使用教程',
                url: 'https://www.youtube.com/embed/ring_tutorial',
                duration: '3:45'
              }
            };
            setTutorialVideo(videos[type] || videos.smartwatch);
            setShowTutorial(true);
          }} isSelected={selectedDevices.includes(device._id)} onToggleSelection={toggleDeviceSelection} />)}
            </div>}
        </TabsContent>

        <TabsContent value="monitoring">
          <div className="space-y-6">
            {/* 实时健康指标 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {devices.filter(d => d.status === 'active').map(device => {
              const data = realtimeData[device.device_id] || {};
              return <HealthMetricsCard key={device._id} device={device} data={data} />;
            })}
            </div>
            
            {/* 实时图表 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {devices.filter(d => d.status === 'active').map(device => <RealtimeChart key={device.device_id} device={device} data={generateChartData(device.device_id)} />)}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="health">
          <div className="space-y-6">
            {/* 健康风险评估 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  健康风险评估
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className={`text-4xl font-bold ${riskAssessment.level === 'low' ? 'text-green-600' : riskAssessment.level === 'medium' ? 'text-yellow-600' : 'text-red-600'}`}>
                      {healthScore}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">健康评分</p>
                    <Badge className={`mt-2 ${riskAssessment.level === 'low' ? 'bg-green-100 text-green-800' : riskAssessment.level === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                      {riskAssessment.level === 'low' ? '低风险' : riskAssessment.level === 'medium' ? '中风险' : '高风险'}
                    </Badge>
                  </div>
                  
                  <div className="col-span-2">
                    <h4 className="font-medium mb-3">健康建议</h4>
                    <ul className="space-y-2">
                      {riskAssessment.recommendations?.map((rec, index) => <li key={index} className="flex items-start">
                          <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-green-500" />
                          <span className="text-sm">{rec}</span>
                        </li>)}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* 设备分析 */}
            <DeviceAnalytics devices={devices} analytics={deviceAnalytics} realtimeData={realtimeData} />
          </div>
        </TabsContent>

        <TabsContent value="trends">
          <HealthTrendAnalysis devices={devices} healthTrends={healthTrends} realtimeData={realtimeData} />
        </TabsContent>
      </Tabs>

      {/* 模态框组件 */}
      <DeviceDiscoveryModal isOpen={showDiscovery} onClose={() => setShowDiscovery(false)} onDeviceAdd={addDevice} />
      <BatchConfigModal isOpen={showBatchConfig} onClose={() => setShowBatchConfig(false)} selectedDevices={selectedDevices} onConfigApply={loadDevices} />
      <DataExportModal isOpen={showDataExport} onClose={() => setShowDataExport(false)} devices={devices} />
      <TutorialModal isOpen={showTutorial} onClose={() => setShowTutorial(false)} video={tutorialVideo} />
      <FirmwareUpdateModal isOpen={showFirmwareUpdate} onClose={() => setShowFirmwareUpdate(false)} progress={firmwareUpdateProgress} />
    </div>;
}

// 辅助函数
const generateChartData = deviceId => {
  const baseTime = new Date();
  const data = [];
  for (let i = 0; i < 24; i++) {
    data.push({
      time: new Date(baseTime.getTime() - (23 - i) * 60000).toLocaleTimeString('zh-CN', {
        hour: '2-digit',
        minute: '2-digit'
      }),
      heart_rate: 70 + Math.random() * 20,
      temperature: 36.5 + Math.random() * 0.5,
      steps: Math.floor(Math.random() * 100),
      battery: 100 - i * 2 + Math.random() * 10,
      blood_oxygen: 95 + Math.random() * 5,
      stress_level: Math.floor(Math.random() * 100)
    });
  }
  return data;
};