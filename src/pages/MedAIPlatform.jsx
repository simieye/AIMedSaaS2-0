// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Badge, Progress, Tabs, TabsContent, TabsList, TabsTrigger, useToast, Alert, AlertDescription } from '@/components/ui';
// @ts-ignore;
import { Bot, MessageCircle, Heart, Activity, Brain, Sparkles, TrendingUp, Clock, FileText, Image, Zap, Settings, ChevronRight, Play, Pause, Volume2, VolumeX, Headphones, Stethoscope, Pill, Calendar, User, Eye, Ear, Thermometer, CheckCircle, Mic, Camera, Upload, History, BarChart3, Users, Shield, Database, Cloud, Smartphone, Watch, Target, Award, AlertTriangle, Bell, Search, Filter, Download, RefreshCw, X } from 'lucide-react';

// 导入AI健康助手组件
import { AIChatModal } from '@/components/AIChatModal';
import { AIChatEntry } from '@/components/AIChatEntry';
export default function MedAIPlatform(props) {
  const {
    $w
  } = props;
  const [showAIChat, setShowAIChat] = useState(false);
  const [aiChatMode, setAiChatMode] = useState(null);
  const [aiChatInitialData, setAiChatInitialData] = useState(null);
  const [aiAssistantStatus, setAiAssistantStatus] = useState('online');
  const [healthScore, setHealthScore] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);
  const [totalConversations, setTotalConversations] = useState(0);
  const [systemHealth, setSystemHealth] = useState(95);
  const [recentActivities, setRecentActivities] = useState([]);
  const [healthMetrics, setHealthMetrics] = useState(null);
  const [personalizedSuggestions, setPersonalizedSuggestions] = useState([]);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [multimodalStats, setMultimodalStats] = useState({
    voiceInteractions: 0,
    imageAnalysis: 0,
    documentProcessing: 0,
    textConversations: 0,
    totalInteractions: 0
  });
  const [showQuickAssessment, setShowQuickAssessment] = useState(false);
  const [assessmentResults, setAssessmentResults] = useState(null);
  const {
    toast
  } = useToast();
  useEffect(() => {
    loadSystemStatus();
    loadHealthMetrics();
    loadPersonalizedSuggestions();
    loadRecentActivities();
    loadMultimodalStats();
  }, []);
  const loadSystemStatus = async () => {
    try {
      // 模拟加载系统状态
      setAiAssistantStatus('online');
      setHealthScore(85);
      setActiveUsers(1247);
      setTotalConversations(15678);
      setSystemHealth(95);
    } catch (error) {
      console.error('加载系统状态失败:', error);
      // 确保有默认值
      setAiAssistantStatus('offline');
      setHealthScore(0);
      setActiveUsers(0);
      setTotalConversations(0);
      setSystemHealth(0);
    }
  };
  const loadHealthMetrics = async () => {
    try {
      // 模拟加载健康指标
      const mockMetrics = {
        overall: {
          score: 85,
          status: 'good',
          trend: 'improving'
        },
        vitalSigns: {
          heartRate: {
            current: 72,
            normal: true,
            trend: 'stable'
          },
          bloodPressure: {
            systolic: 120,
            diastolic: 80,
            normal: true,
            trend: 'stable'
          },
          temperature: 36.5,
          normal: true
        },
        lifestyle: {
          sleep: {
            hours: 7.5,
            quality: 'good',
            trend: 'improving'
          },
          exercise: {
            minutes: 45,
            calories: 320,
            trend: 'stable'
          },
          stress: {
            level: 35,
            status: 'moderate',
            trend: 'decreasing'
          }
        },
        recommendations: ['保持规律作息', '增加有氧运动', '管理压力水平']
      };
      setHealthMetrics(mockMetrics);
    } catch (error) {
      console.error('加载健康指标失败:', error);
      setHealthMetrics(null);
    }
  };
  const loadPersonalizedSuggestions = async () => {
    try {
      // 模拟加载个性化建议
      const mockSuggestions = [{
        id: 1,
        type: 'exercise',
        title: '今日运动建议',
        description: '建议进行30分钟中等强度有氧运动，如快走或慢跑',
        priority: 'high',
        icon: <Activity className="h-4 w-4" />,
        action: '开始运动计划'
      }, {
        id: 2,
        type: 'diet',
        title: '饮食调整建议',
        description: '增加蔬菜水果摄入，减少高盐高脂食物',
        priority: 'medium',
        icon: <Heart className="h-4 w-4" />,
        action: '查看饮食方案'
      }, {
        id: 3,
        type: 'sleep',
        title: '睡眠质量改善',
        description: '建议晚上10:30前入睡，保证8小时充足睡眠',
        priority: 'high',
        icon: <Clock className="h-4 w-4" />,
        action: '制定睡眠计划'
      }, {
        id: 4,
        type: 'stress',
        title: '压力管理技巧',
        description: '尝试深呼吸练习或冥想来缓解工作压力',
        priority: 'medium',
        icon: <Brain className="h-4 w-4" />,
        action: '学习放松技巧'
      }];
      setPersonalizedSuggestions(mockSuggestions);
    } catch (error) {
      console.error('加载个性化建议失败:', error);
      setPersonalizedSuggestions([]);
    }
  };
  const loadRecentActivities = async () => {
    try {
      // 模拟加载最近活动
      const mockActivities = [{
        id: 1,
        type: 'voice_chat',
        description: '用户通过语音咨询疲劳问题',
        timestamp: new Date(Date.now() - 300000).toISOString(),
        user: '张三'
      }, {
        id: 2,
        type: 'image_analysis',
        description: 'AI分析皮肤状况图片',
        timestamp: new Date(Date.now() - 600000).toISOString(),
        user: '李四'
      }, {
        id: 3,
        type: 'health_scan',
        description: '完成快速健康评估',
        timestamp: new Date(Date.now() - 900000).toISOString(),
        user: '王五'
      }, {
        id: 4,
        type: 'document_analysis',
        description: '分析体检报告文档',
        timestamp: new Date(Date.now() - 1200000).toISOString(),
        user: '赵六'
      }];
      setRecentActivities(mockActivities);
    } catch (error) {
      console.error('加载最近活动失败:', error);
      setRecentActivities([]);
    }
  };
  const loadMultimodalStats = async () => {
    try {
      // 模拟加载多模态统计数据
      const mockStats = {
        voiceInteractions: 3456,
        imageAnalysis: 1234,
        documentProcessing: 890,
        textConversations: 5678,
        totalInteractions: 11258
      };
      setMultimodalStats(mockStats);
    } catch (error) {
      console.error('加载多模态统计失败:', error);
      // 确保有默认值
      setMultimodalStats({
        voiceInteractions: 0,
        imageAnalysis: 0,
        documentProcessing: 0,
        textConversations: 0,
        totalInteractions: 0
      });
    }
  };
  const handleOpenAIChat = (data = {}) => {
    setAiChatInitialData(data);
    setShowAIChat(true);
  };
  const handleCloseAIChat = () => {
    setShowAIChat(false);
    setAiChatMode(null);
    setAiChatInitialData(null);
  };
  const startQuickHealthAssessment = async () => {
    setIsScanning(true);
    setScanProgress(0);
    try {
      // 模拟健康评估过程
      for (let i = 0; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 200));
        setScanProgress(i);
      }
      const mockResults = {
        overallScore: 82,
        riskLevel: 'low',
        categories: {
          cardiovascular: {
            score: 88,
            status: 'excellent',
            findings: ['心率正常', '血压理想']
          },
          respiratory: {
            score: 85,
            status: 'good',
            findings: ['呼吸功能正常', '血氧饱和度良好']
          },
          metabolic: {
            score: 76,
            status: 'fair',
            findings: ['血糖略高', '需要控制饮食']
          },
          lifestyle: {
            score: 79,
            status: 'good',
            findings: ['运动量适中', '睡眠质量改善']
          }
        },
        recommendations: ['继续保持规律运动', '控制糖分摄入', '定期监测血糖', '保持良好作息'],
        nextAssessment: '2024-02-15'
      };
      setAssessmentResults(mockResults);
      setShowQuickAssessment(true);
      toast({
        title: "健康评估完成",
        description: "您的健康评估报告已生成",
        variant: "default"
      });
    } catch (error) {
      console.error('健康评估失败:', error);
      toast({
        title: "评估失败",
        description: "无法完成健康评估，请重试",
        variant: "destructive"
      });
    } finally {
      setIsScanning(false);
      setScanProgress(0);
    }
  };
  const handleSuggestionAction = suggestion => {
    // 根据建议类型执行相应操作
    switch (suggestion.type) {
      case 'exercise':
        handleOpenAIChat({
          mode: 'voice',
          initialMessage: '我想了解运动计划建议'
        });
        break;
      case 'diet':
        handleOpenAIChat({
          mode: 'text',
          initialMessage: '请为我制定健康的饮食方案'
        });
        break;
      case 'sleep':
        handleOpenAIChat({
          mode: 'voice',
          initialMessage: '如何改善睡眠质量？'
        });
        break;
      case 'stress':
        handleOpenAIChat({
          mode: 'text',
          initialMessage: '请教我一些压力管理的方法'
        });
        break;
      default:
        handleOpenAIChat();
    }
  };
  const formatTime = timestamp => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    if (minutes < 1) return '刚刚';
    if (minutes < 60) return `${minutes}分钟前`;
    if (hours < 24) return `${hours}小时前`;
    return date.toLocaleDateString('zh-CN');
  };
  const getActivityIcon = type => {
    switch (type) {
      case 'voice_chat':
        return <Mic className="h-4 w-4 text-blue-500" />;
      case 'image_analysis':
        return <Image className="h-4 w-4 text-green-500" />;
      case 'health_scan':
        return <Heart className="h-4 w-4 text-red-500" />;
      case 'document_analysis':
        return <FileText className="h-4 w-4 text-purple-500" />;
      default:
        return <MessageCircle className="h-4 w-4 text-gray-500" />;
    }
  };
  const getPriorityColor = priority => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  const getScoreColor = score => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };
  return <div className="min-h-screen bg-gray-50">
      {/* AI聊天模态框 */}
      <AIChatModal isOpen={showAIChat} onClose={handleCloseAIChat} patientId={$w.auth.currentUser?.userId || 'demo_user'} {...aiChatInitialData} />

      {/* 页面头部 */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-blue-500 rounded-lg">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">MedAI 智能医疗平台</h1>
                <p className="text-sm text-gray-600">AI驱动的全方位健康管理解决方案</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {/* AI助手状态显示 */}
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${aiAssistantStatus === 'online' ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                <span className="text-sm text-gray-600">AI助手 {aiAssistantStatus === 'online' ? '在线' : '离线'}</span>
              </div>
              <Button onClick={() => handleOpenAIChat()} className="bg-blue-500 hover:bg-blue-600">
                <MessageCircle className="h-4 w-4 mr-2" />
                开始咨询
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* 主要内容区域 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* AI健康助手入口 */}
        <div className="mb-8">
          <AIChatEntry onOpenChat={handleOpenAIChat} patientId={$w.auth.currentUser?.userId || 'demo_user'} />
        </div>

        {/* 系统概览 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">健康评分</p>
                  <p className={`text-3xl font-bold ${getScoreColor(healthScore)}`}>{healthScore}</p>
                </div>
                <div className="p-3 bg-blue-500 rounded-full">
                  <Heart className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center text-sm text-blue-600">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  较上周提升 5%
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600">活跃用户</p>
                  <p className="text-3xl font-bold text-green-700">{(activeUsers || 0).toLocaleString()}</p>
                </div>
                <div className="p-3 bg-green-500 rounded-full">
                  <Users className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center text-sm text-green-600">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  日增长 12%
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-600">总对话数</p>
                  <p className="text-3xl font-bold text-purple-700">{(totalConversations || 0).toLocaleString()}</p>
                </div>
                <div className="p-3 bg-purple-500 rounded-full">
                  <MessageCircle className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center text-sm text-purple-600">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  本周新增 1,234
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-orange-600">系统健康</p>
                  <p className="text-3xl font-bold text-orange-700">{systemHealth}%</p>
                </div>
                <div className="p-3 bg-orange-500 rounded-full">
                  <Shield className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center text-sm text-orange-600">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  运行正常
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 快速健康评估入口 */}
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Stethoscope className="h-5 w-5 mr-2" />
                快速健康评估
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-2">通过AI技术快速评估您的健康状况，获得个性化建议</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      评估时间: 约2分钟
                    </div>
                    <div className="flex items-center">
                      <Target className="h-4 w-4 mr-1" />
                      准确率: 95%+
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  {isScanning && <div className="text-right">
                      <div className="text-sm text-blue-600 mb-1">评估中...</div>
                      <Progress value={scanProgress} className="w-32" />
                    </div>}
                  <Button onClick={startQuickHealthAssessment} disabled={isScanning} className="bg-blue-500 hover:bg-blue-600">
                    {isScanning ? <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> : <Sparkles className="h-4 w-4 mr-2" />}
                    {isScanning ? '评估中...' : '开始评估'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 个性化健康建议 */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Brain className="h-5 w-5 mr-2" />
                    个性化健康建议
                  </div>
                  <Button variant="outline" size="sm" onClick={() => handleOpenAIChat()}>
                    <MessageCircle className="h-4 w-4 mr-2" />
                    获取更多建议
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {personalizedSuggestions.map(suggestion => <div key={suggestion.id} className="flex items-start space-x-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        {suggestion.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{suggestion.title}</h4>
                          <Badge className={getPriorityColor(suggestion.priority)}>
                            {suggestion.priority === 'high' ? '高优先级' : suggestion.priority === 'medium' ? '中优先级' : '低优先级'}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{suggestion.description}</p>
                        <Button size="sm" onClick={() => handleSuggestionAction(suggestion)}>
                          {suggestion.action}
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    </div>)}
                </div>
              </CardContent>
            </Card>

            {/* 多模态交互统计 */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="h-5 w-5 mr-2" />
                  多模态交互统计
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="p-2 bg-blue-100 rounded-full w-12 h-12 mx-auto mb-2 flex items-center justify-center">
                      <Mic className="h-6 w-6 text-blue-600" />
                    </div>
                    <p className="text-2xl font-bold text-blue-600">{(multimodalStats?.voiceInteractions || 0).toLocaleString()}</p>
                    <p className="text-sm text-gray-600">语音交互</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="p-2 bg-green-100 rounded-full w-12 h-12 mx-auto mb-2 flex items-center justify-center">
                      <Image className="h-6 w-6 text-green-600" />
                    </div>
                    <p className="text-2xl font-bold text-green-600">{(multimodalStats?.imageAnalysis || 0).toLocaleString()}</p>
                    <p className="text-sm text-gray-600">图像分析</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="p-2 bg-purple-100 rounded-full w-12 h-12 mx-auto mb-2 flex items-center justify-center">
                      <FileText className="h-6 w-6 text-purple-600" />
                    </div>
                    <p className="text-2xl font-bold text-purple-600">{(multimodalStats?.documentProcessing || 0).toLocaleString()}</p>
                    <p className="text-sm text-gray-600">文档处理</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="p-2 bg-orange-100 rounded-full w-12 h-12 mx-auto mb-2 flex items-center justify-center">
                      <MessageCircle className="h-6 w-6 text-orange-600" />
                    </div>
                    <p className="text-2xl font-bold text-orange-600">{(multimodalStats?.textConversations || 0).toLocaleString()}</p>
                    <p className="text-sm text-gray-600">文字对话</p>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">总交互次数</span>
                    <span className="text-lg font-bold text-gray-900">{(multimodalStats?.totalInteractions || 0).toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 最近活动 */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 mr-2" />
                    最近活动
                  </div>
                  <Button variant="outline" size="sm">
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map(activity => <div key={activity.id} className="flex items-start space-x-3">
                      <div className="p-2 bg-gray-100 rounded-full">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">{activity.description}</p>
                        <div className="flex items-center mt-1 text-xs text-gray-500">
                          <User className="h-3 w-3 mr-1" />
                          {activity.user}
                          <span className="mx-2">•</span>
                          {formatTime(activity.timestamp)}
                        </div>
                      </div>
                    </div>)}
                </div>
              </CardContent>
            </Card>

            {/* 健康指标概览 */}
            {healthMetrics && <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Activity className="h-5 w-5 mr-2" />
                    健康指标概览
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center">
                        <Heart className="h-4 w-4 mr-2 text-green-600" />
                        <span className="text-sm font-medium">心率</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-lg font-bold text-green-600">{healthMetrics.vitalSigns.heartRate.current}</span>
                        <span className="text-sm text-gray-500 ml-1">bpm</span>
                        <CheckCircle className="h-4 w-4 ml-2 text-green-500" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center">
                        <Activity className="h-4 w-4 mr-2 text-blue-600" />
                        <span className="text-sm font-medium">血压</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-lg font-bold text-blue-600">{healthMetrics.vitalSigns.bloodPressure.systolic}/{healthMetrics.vitalSigns.bloodPressure.diastolic}</span>
                        <span className="text-sm text-gray-500 ml-1">mmHg</span>
                        <CheckCircle className="h-4 w-4 ml-2 text-blue-500" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                      <div className="flex items-center">
                        <Thermometer className="h-4 w-4 mr-2 text-orange-600" />
                        <span className="text-sm font-medium">体温</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-lg font-bold text-orange-600">{healthMetrics.vitalSigns.temperature}</span>
                        <span className="text-sm text-gray-500 ml-1">°C</span>
                        <CheckCircle className="h-4 w-4 ml-2 text-orange-500" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>}
          </div>
        </div>

        {/* 多模态交互界面集成 */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Sparkles className="h-5 w-5 mr-2" />
                多模态交互界面
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Button variant="outline" onClick={() => handleOpenAIChat({
                mode: 'voice'
              })} className="flex flex-col items-center p-6 h-auto">
                  <Headphones className="h-8 w-8 mb-3 text-blue-600" />
                  <span className="font-medium">语音对话</span>
                  <span className="text-xs text-gray-500 mt-1">智能语音交互</span>
                </Button>
                <Button variant="outline" onClick={() => handleOpenAIChat({
                mode: 'image'
              })} className="flex flex-col items-center p-6 h-auto">
                  <Camera className="h-8 w-8 mb-3 text-green-600" />
                  <span className="font-medium">图像识别</span>
                  <span className="text-xs text-gray-500 mt-1">医学图像分析</span>
                </Button>
                <Button variant="outline" onClick={() => handleOpenAIChat({
                mode: 'document'
              })} className="flex flex-col items-center p-6 h-auto">
                  <FileText className="h-8 w-8 mb-3 text-purple-600" />
                  <span className="font-medium">文档分析</span>
                  <span className="text-xs text-gray-500 mt-1">报告文档解析</span>
                </Button>
                <Button variant="outline" onClick={() => handleOpenAIChat({
                mode: 'text'
              })} className="flex flex-col items-center p-6 h-auto">
                  <MessageCircle className="h-8 w-8 mb-3 text-orange-600" />
                  <span className="font-medium">文字对话</span>
                  <span className="text-xs text-gray-500 mt-1">智能问答咨询</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 健康评估结果模态框 */}
      {showQuickAssessment && assessmentResults && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">健康评估报告</h3>
              <Button variant="ghost" onClick={() => setShowQuickAssessment(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-6">
              {/* 总体评分 */}
              <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                <p className="text-sm text-blue-600 mb-2">综合健康评分</p>
                <p className={`text-4xl font-bold ${getScoreColor(assessmentResults.overallScore)}`}>{assessmentResults.overallScore}</p>
                <Badge className={`mt-2 ${assessmentResults.riskLevel === 'low' ? 'bg-green-100 text-green-800' : assessmentResults.riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                  {assessmentResults.riskLevel === 'low' ? '低风险' : assessmentResults.riskLevel === 'medium' ? '中风险' : '高风险'}
                </Badge>
              </div>

              {/* 分类评分 */}
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(assessmentResults.categories).map(([key, category]) => <div key={key} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium capitalize">{key}</span>
                      <span className={`text-lg font-bold ${getScoreColor(category.score)}`}>{category.score}</span>
                    </div>
                    <Badge className={`mb-2 ${category.status === 'excellent' ? 'bg-green-100 text-green-800' : category.status === 'good' ? 'bg-blue-100 text-blue-800' : category.status === 'fair' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                      {category.status === 'excellent' ? '优秀' : category.status === 'good' ? '良好' : category.status === 'fair' ? '一般' : '需关注'}
                    </Badge>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {category.findings.map((finding, index) => <li key={index}>• {finding}</li>)}
                    </ul>
                  </div>)}
              </div>

              {/* 建议 */}
              <div>
                <h4 className="font-medium mb-3">健康建议</h4>
                <ul className="space-y-2">
                  {assessmentResults.recommendations.map((rec, index) => <li key={index} className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                      {rec}
                    </li>)}
                </ul>
              </div>

              {/* 下次评估时间 */}
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">下次评估时间</p>
                <p className="text-lg font-medium">{assessmentResults.nextAssessment}</p>
              </div>

              {/* 操作按钮 */}
              <div className="flex justify-end space-x-3">
                <Button variant="outline" onClick={() => setShowQuickAssessment(false)}>
                  关闭
                </Button>
                <Button onClick={() => {
              setShowQuickAssessment(false);
              handleOpenAIChat({
                mode: 'voice',
                initialMessage: '请根据我的健康评估结果制定改善计划'
              });
            }}>
                  <MessageCircle className="h-4 w-4 mr-2" />
                  咨询AI助手
                </Button>
              </div>
            </div>
          </div>
        </div>}
    </div>;
}