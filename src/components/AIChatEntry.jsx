// @ts-ignore;
import React, { useState, useEffect, useRef } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, Badge, useToast, Dialog, DialogContent, DialogHeader, DialogTitle, Progress, ScrollArea, CardHeader } from '@/components/ui';
// @ts-ignore;
import { MessageCircle, Mic, Camera, Upload, History, Heart, Activity, Brain, Sparkles, TrendingUp, Clock, FileText, Image, Zap, Settings, ChevronRight, Play, Pause, Volume2, VolumeX, Headphones, Stethoscope, Pill, Calendar, User, Bot, Eye, Ear, Thermometer, CheckCircle, MicOff } from 'lucide-react';

export function AIChatEntry({
  onOpenChat,
  patientId,
  className = ""
}) {
  const [isQuickVoiceActive, setIsQuickVoiceActive] = useState(false);
  const [isHealthScanning, setIsHealthScanning] = useState(false);
  const [recentChats, setRecentChats] = useState([]);
  const [healthScore, setHealthScore] = useState(0);
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [healthStatus, setHealthStatus] = useState('good');
  const [unreadCount, setUnreadCount] = useState(0);
  const [quickHealthData, setQuickHealthData] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const {
    toast
  } = useToast();
  useEffect(() => {
    loadRecentChats();
    loadHealthStatus();
    loadQuickHealthData();
  }, [patientId]);
  const loadRecentChats = async () => {
    try {
      const response = await $w.cloud.callDataSource({
        dataSourceName: 'chat_sessions',
        methodName: 'wedaGetRecordsV2',
        params: {
          filter: {
            where: {
              $and: [{
                patient_id: {
                  $eq: patientId
                }
              }, {
                session_type: {
                  $eq: 'ai_health_assistant'
                }
              }]
            }
          },
          orderBy: [{
            created_at: 'desc'
          }],
          limit: 5
        }
      });
      if (response.records) {
        const chats = response.records.map(record => ({
          id: record._id,
          lastMessage: record.content,
          timestamp: record.created_at,
          type: record.message_type,
          unread: Math.random() > 0.7 // 模拟未读状态
        }));
        setRecentChats(chats);
        setUnreadCount(chats.filter(chat => chat.unread).length);
      }
    } catch (error) {
      console.error('加载聊天记录失败:', error);
    }
  };
  const loadHealthStatus = async () => {
    try {
      // 模拟加载健康状态
      const mockHealthData = {
        heartRate: 72 + Math.floor(Math.random() * 20),
        steps: 5000 + Math.floor(Math.random() * 10000),
        sleep: 6 + Math.random() * 3,
        stress: 20 + Math.floor(Math.random() * 60)
      };

      // 计算健康评分
      let score = 100;
      if (mockHealthData.heartRate > 85) score -= 10;
      if (mockHealthData.steps < 8000) score -= 15;
      if (mockHealthData.sleep < 7) score -= 20;
      if (mockHealthData.stress > 50) score -= 15;
      setHealthScore(Math.max(0, score));

      // 确定健康状态
      if (score >= 80) {
        setHealthStatus('excellent');
      } else if (score >= 60) {
        setHealthStatus('good');
      } else if (score >= 40) {
        setHealthStatus('fair');
      } else {
        setHealthStatus('poor');
      }
    } catch (error) {
      console.error('加载健康状态失败:', error);
    }
  };
  const loadQuickHealthData = async () => {
    try {
      // 模拟快速健康数据
      const mockData = {
        lastCheck: new Date(Date.now() - 3600000).toLocaleString('zh-CN'),
        heartRate: 72,
        bloodPressure: '120/80',
        temperature: 36.5,
        oxygenLevel: 98,
        stress: 35,
        recommendations: ['保持充足睡眠', '适量运动', '均衡饮食']
      };
      setQuickHealthData(mockData);
    } catch (error) {
      console.error('加载快速健康数据失败:', error);
    }
  };
  const startQuickVoiceChat = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true
      });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];
      mediaRecorder.ondataavailable = event => {
        audioChunksRef.current.push(event.data);
      };
      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: 'audio/wav'
        });
        await processQuickVoiceInput(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };
      mediaRecorder.start();
      setIsQuickVoiceActive(true);
      setIsListening(true);
      toast({
        title: "语音对话已启动",
        description: "请说出您的健康问题，AI助手正在聆听",
        variant: "default"
      });
    } catch (error) {
      console.error('启动语音对话失败:', error);
      toast({
        title: "语音启动失败",
        description: "无法访问麦克风，请检查权限设置",
        variant: "destructive"
      });
    }
  };
  const stopQuickVoiceChat = () => {
    if (mediaRecorderRef.current && isQuickVoiceActive) {
      mediaRecorderRef.current.stop();
      setIsQuickVoiceActive(false);
      setIsListening(false);
    }
  };
  const processQuickVoiceInput = async audioBlob => {
    try {
      // 模拟语音处理
      await new Promise(resolve => setTimeout(resolve, 2000));
      const recognizedTexts = ["我感觉最近有些疲劳", "我的血压有点高", "最近睡眠质量不好", "我想了解健康建议"];
      const recognizedText = recognizedTexts[Math.floor(Math.random() * recognizedTexts.length)];
      toast({
        title: "语音识别完成",
        description: `识别内容: "${recognizedText}"`,
        variant: "default"
      });

      // 打开聊天界面并预填识别的文本
      onOpenChat && onOpenChat({
        voiceInput: recognizedText
      });
    } catch (error) {
      console.error('语音处理失败:', error);
      toast({
        title: "语音处理失败",
        description: "无法处理语音输入，请重试",
        variant: "destructive"
      });
    }
  };
  const startQuickHealthScan = async () => {
    setIsHealthScanning(true);
    try {
      // 模拟健康扫描过程
      await new Promise(resolve => setTimeout(resolve, 3000));
      const scanResults = {
        heartRate: 68 + Math.floor(Math.random() * 20),
        bloodPressure: {
          systolic: 110 + Math.floor(Math.random() * 30),
          diastolic: 70 + Math.floor(Math.random() * 20)
        },
        temperature: 36.0 + Math.random() * 1.5,
        oxygenLevel: 95 + Math.random() * 5,
        stress: 20 + Math.floor(Math.random() * 40),
        timestamp: new Date().toLocaleString('zh-CN')
      };
      setQuickHealthData(prev => ({
        ...prev,
        ...scanResults,
        lastCheck: scanResults.timestamp
      }));

      // 生成健康建议
      let recommendations = [];
      if (scanResults.heartRate > 85) {
        recommendations.push('心率偏高，建议适当休息');
      }
      if (scanResults.stress > 60) {
        recommendations.push('压力较大，建议进行放松训练');
      }
      if (scanResults.oxygenLevel < 96) {
        recommendations.push('血氧偏低，建议深呼吸练习');
      }
      if (recommendations.length === 0) {
        recommendations.push('健康状况良好，继续保持');
      }
      setQuickHealthData(prev => ({
        ...prev,
        recommendations
      }));
      toast({
        title: "健康扫描完成",
        description: "您的健康数据已更新，点击查看详细报告",
        variant: "default"
      });
    } catch (error) {
      console.error('健康扫描失败:', error);
      toast({
        title: "健康扫描失败",
        description: "无法完成健康扫描，请重试",
        variant: "destructive"
      });
    } finally {
      setIsHealthScanning(false);
    }
  };
  const openChatWithHistory = chatId => {
    onOpenChat && onOpenChat({
      chatId: chatId
    });
  };
  const openChatWithImage = () => {
    onOpenChat && onOpenChat({
      mode: 'image'
    });
  };
  const openChatWithDocument = () => {
    onOpenChat && onOpenChat({
      mode: 'document'
    });
  };
  const openChatWithVoice = () => {
    onOpenChat && onOpenChat({
      mode: 'voice'
    });
  };
  const getHealthStatusColor = () => {
    switch (healthStatus) {
      case 'excellent':
        return 'text-green-600 bg-green-100';
      case 'good':
        return 'text-blue-600 bg-blue-100';
      case 'fair':
        return 'text-yellow-600 bg-yellow-100';
      case 'poor':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };
  const getHealthStatusText = () => {
    switch (healthStatus) {
      case 'excellent':
        return '优秀';
      case 'good':
        return '良好';
      case 'fair':
        return '一般';
      case 'poor':
        return '需关注';
      default:
        return '未知';
    }
  };
  const formatTime = timestamp => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    if (minutes < 1) return '刚刚';
    if (minutes < 60) return `${minutes}分钟前`;
    if (hours < 24) return `${hours}小时前`;
    if (days < 7) return `${days}天前`;
    return date.toLocaleDateString('zh-CN');
  };
  return <div className={`space-y-4 ${className}`}>
      {/* 主入口卡片 */}
      <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-blue-500 rounded-full">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">AI健康助手</h3>
                <p className="text-sm text-gray-600">您的智能健康顾问</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {unreadCount > 0 && <Badge className="bg-red-500 text-white">
                  {unreadCount}
                </Badge>}
              <Button onClick={() => onOpenChat && onOpenChat()} className="bg-blue-500 hover:bg-blue-600">
                <MessageCircle className="h-4 w-4 mr-2" />
                开始对话
              </Button>
            </div>
          </div>
          
          {/* 健康状态概览 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{healthScore}</div>
              <div className="text-xs text-gray-600">健康评分</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{quickHealthData?.heartRate || '--'}</div>
              <div className="text-xs text-gray-600">心率</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{quickHealthData?.stress || '--'}</div>
              <div className="text-xs text-gray-600">压力指数</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{quickHealthData?.oxygenLevel || '--'}</div>
              <div className="text-xs text-gray-600">血氧饱和度</div>
            </div>
          </div>
          
          {/* 快速操作按钮 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button variant="outline" onClick={startQuickVoiceChat} disabled={isQuickVoiceActive} className="relative">
              {isQuickVoiceActive ? <div className="animate-pulse absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div> : null}
              <Mic className="h-4 w-4 mr-2" />
              {isQuickVoiceActive ? '录音中...' : '语音对话'}
            </Button>
            <Button variant="outline" onClick={startQuickHealthScan} disabled={isHealthScanning}>
              <Heart className="h-4 w-4 mr-2" />
              {isHealthScanning ? '扫描中...' : '健康扫描'}
            </Button>
            <Button variant="outline" onClick={() => setShowQuickActions(!showQuickActions)}>
              <Zap className="h-4 w-4 mr-2" />
              快速操作
            </Button>
            <Button variant="outline" onClick={() => onOpenChat && onOpenChat()}>
              <History className="h-4 w-4 mr-2" />
              历史记录
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 快速操作面板 */}
      {showQuickActions && <Card className="border-purple-200">
          <CardContent className="p-4">
            <h4 className="font-medium mb-3 flex items-center">
              <Sparkles className="h-4 w-4 mr-2" />
              多模态输入方式
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Button variant="outline" onClick={openChatWithVoice} className="flex flex-col items-center p-4 h-auto">
                <Headphones className="h-6 w-6 mb-2" />
                <span className="text-sm">语音输入</span>
              </Button>
              <Button variant="outline" onClick={openChatWithImage} className="flex flex-col items-center p-4 h-auto">
                <Camera className="h-6 w-6 mb-2" />
                <span className="text-sm">图片识别</span>
              </Button>
              <Button variant="outline" onClick={openChatWithDocument} className="flex flex-col items-center p-4 h-auto">
                <FileText className="h-6 w-6 mb-2" />
                <span className="text-sm">文档分析</span>
              </Button>
              <Button variant="outline" onClick={() => onOpenChat && onOpenChat()} className="flex flex-col items-center p-4 h-auto">
                <MessageCircle className="h-6 w-6 mb-2" />
                <span className="text-sm">文字对话</span>
              </Button>
            </div>
          </CardContent>
        </Card>}

      {/* 健康扫描进度 */}
      {isHealthScanning && <Card className="border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-500"></div>
              <div className="flex-1">
                <div className="flex justify-between text-sm mb-1">
                  <span>正在进行健康扫描...</span>
                  <span>分析中</span>
                </div>
                <Progress value={66} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>}

      {/* 最近对话记录 */}
      {recentChats.length > 0 && <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <h4 className="font-medium flex items-center">
                <History className="h-4 w-4 mr-2" />
                最近对话
              </h4>
              <Button variant="ghost" size="sm" onClick={() => onOpenChat && onOpenChat()}>
                查看全部
                <ChevronRight className="h-3 w-3 ml-1" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <ScrollArea className="h-48">
              <div className="space-y-2">
                {recentChats.map(chat => <div key={chat.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors" onClick={() => openChatWithHistory(chat.id)}>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 rounded-full">
                        {chat.type === 'image_analysis' ? <Image className="h-4 w-4 text-blue-600" /> : chat.type === 'document_analysis' ? <FileText className="h-4 w-4 text-blue-600" /> : chat.type === 'voice' ? <Mic className="h-4 w-4 text-blue-600" /> : <MessageCircle className="h-4 w-4 text-blue-600" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{chat.lastMessage}</p>
                        <p className="text-xs text-gray-500">{formatTime(chat.timestamp)}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {chat.unread && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>)}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>}

      {/* 健康状态卡片 */}
      {quickHealthData && <Card className="border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium flex items-center">
                <Activity className="h-4 w-4 mr-2" />
                健康状态
              </h4>
              <Badge className={getHealthStatusColor()}>
                {getHealthStatusText()}
              </Badge>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <Heart className="h-4 w-4 mr-1 text-red-500" />
                  <span className="text-sm font-medium">{quickHealthData.heartRate}</span>
                </div>
                <div className="text-xs text-gray-600">心率</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <Activity className="h-4 w-4 mr-1 text-blue-500" />
                  <span className="text-sm font-medium">{quickHealthData.bloodPressure}</span>
                </div>
                <div className="text-xs text-gray-600">血压</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <Thermometer className="h-4 w-4 mr-1 text-orange-500" />
                  <span className="text-sm font-medium">{quickHealthData.temperature}°C</span>
                </div>
                <div className="text-xs text-gray-600">体温</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <Activity className="h-4 w-4 mr-1 text-purple-500" />
                  <span className="text-sm font-medium">{quickHealthData.oxygenLevel}%</span>
                </div>
                <div className="text-xs text-gray-600">血氧</div>
              </div>
            </div>
            
            {quickHealthData.recommendations && quickHealthData.recommendations.length > 0 && <div>
                <h5 className="text-sm font-medium mb-2">健康建议</h5>
                <div className="space-y-1">
                  {quickHealthData.recommendations.slice(0, 2).map((rec, index) => <div key={index} className="flex items-center text-xs text-gray-600">
                      <CheckCircle className="h-3 w-3 mr-1 text-green-500" />
                      {rec}
                    </div>)}
                </div>
              </div>}
            
            <div className="text-xs text-gray-500 mt-3">
              最后检查: {quickHealthData.lastCheck}
            </div>
          </CardContent>
        </Card>}

      {/* 语音对话状态指示器 */}
      {isQuickVoiceActive && <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="animate-pulse">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                </div>
                <div>
                  <p className="text-sm font-medium text-red-800">正在录音...</p>
                  <p className="text-xs text-red-600">请说出您的健康问题</p>
                </div>
              </div>
              <Button variant="destructive" size="sm" onClick={stopQuickVoiceChat}>
                <MicOff className="h-4 w-4 mr-2" />
                停止录音
              </Button>
            </div>
          </CardContent>
        </Card>}
    </div>;
}