// @ts-ignore;
import React, { useState, useRef, useEffect, useCallback } from 'react';
// @ts-ignore;
import { Dialog, DialogContent, DialogHeader, DialogTitle, Button, Input, useToast, Badge, Progress, Tabs, TabsContent, TabsList, TabsTrigger, Card, CardContent, CardHeader, CardTitle, ScrollArea } from '@/components/ui';
// @ts-ignore;
import { Send, Mic, MicOff, Camera, Upload, X, MessageCircle, Bot, User, FileText, Image, Video, Stethoscope, Heart, Activity, Brain, Eye, Ear, Pill, Calendar, Clock, AlertCircle, CheckCircle, Download, Share2, History, Settings, Volume2, VolumeX, Thermometer, Sparkles, TrendingUp, FileImage, FileVideo, Headphones, PauseCircle, PlayCircle, Trash2 } from 'lucide-react';

export function AIChatModal({
  isOpen,
  onClose,
  patientId
}) {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [activeTab, setActiveTab] = useState('chat');
  const [analysisResults, setAnalysisResults] = useState(null);
  const [healthMetrics, setHealthMetrics] = useState(null);
  const [conversationContext, setConversationContext] = useState([]);
  const [healthSuggestions, setHealthSuggestions] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const speechSynthesisRef = useRef(null);
  const {
    toast
  } = useToast();
  useEffect(() => {
    if (isOpen) {
      loadChatHistory();
      loadHealthMetrics();
      initializeSpeechSynthesis();
    }
    return () => {
      if (speechSynthesisRef.current) {
        speechSynthesisRef.current.cancel();
      }
    };
  }, [isOpen, patientId]);
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  const initializeSpeechSynthesis = () => {
    if ('speechSynthesis' in window) {
      speechSynthesisRef.current = window.speechSynthesis;
    }
  };
  const loadChatHistory = async () => {
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
          limit: 50
        }
      });
      if (response.records) {
        const chatMessages = response.records.map(record => ({
          id: record._id,
          type: record.message_type,
          content: record.content,
          sender: record.sender_type,
          timestamp: record.created_at,
          attachments: record.attachments || [],
          context: record.context || {}
        }));
        setMessages(chatMessages.reverse());
        updateConversationContext(chatMessages);
      }
    } catch (error) {
      console.error('加载聊天记录失败:', error);
      toast({
        title: "加载聊天记录失败",
        description: error.message || "无法获取历史对话",
        variant: "destructive"
      });
    }
  };
  const loadHealthMetrics = async () => {
    try {
      // 模拟加载健康指标数据
      const mockMetrics = {
        heartRate: {
          current: 72,
          normal: {
            min: 60,
            max: 100
          },
          trend: 'stable',
          history: generateHealthHistory('heartRate')
        },
        bloodPressure: {
          systolic: 120,
          diastolic: 80,
          normal: {
            systolic: {
              min: 90,
              max: 140
            },
            diastolic: {
              min: 60,
              max: 90
            }
          },
          trend: 'stable'
        },
        temperature: {
          current: 36.5,
          normal: {
            min: 36.0,
            max: 37.5
          },
          trend: 'stable',
          history: generateHealthHistory('temperature')
        },
        bloodSugar: {
          current: 5.2,
          normal: {
            min: 3.9,
            max: 6.1
          },
          trend: 'stable'
        },
        weight: {
          current: 70,
          bmi: 22.5,
          normal: {
            min: 18.5,
            max: 24.9
          }
        },
        sleep: {
          hours: 7.5,
          quality: 'good',
          trend: 'improving'
        },
        exercise: {
          minutes: 45,
          calories: 320,
          trend: 'stable'
        }
      };
      setHealthMetrics(mockMetrics);
      generateHealthSuggestions(mockMetrics);
    } catch (error) {
      console.error('加载健康指标失败:', error);
    }
  };
  const generateHealthHistory = metric => {
    const history = [];
    const now = new Date();
    for (let i = 29; i >= 0; i--) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      let value;
      switch (metric) {
        case 'heartRate':
          value = 65 + Math.random() * 25;
          break;
        case 'temperature':
          value = 36.2 + Math.random() * 0.8;
          break;
        default:
          value = 70 + Math.random() * 20;
      }
      history.push({
        date: date.toISOString().split('T')[0],
        value: parseFloat(value.toFixed(1))
      });
    }
    return history;
  };
  const generateHealthSuggestions = metrics => {
    const suggestions = [];

    // 基于心率生成建议
    if (metrics.heartRate.current > 85) {
      suggestions.push({
        type: 'exercise',
        title: '适度运动建议',
        description: '您的心率偏高，建议进行适度的有氧运动，如快走30分钟',
        priority: 'medium',
        icon: <Activity className="h-4 w-4" />
      });
    }

    // 基于睡眠质量生成建议
    if (metrics.sleep.hours < 7) {
      suggestions.push({
        type: 'sleep',
        title: '睡眠改善建议',
        description: '建议保持7-8小时的充足睡眠，有助于身体恢复',
        priority: 'high',
        icon: <Clock className="h-4 w-4" />
      });
    }

    // 基于运动量生成建议
    if (metrics.exercise.minutes < 30) {
      suggestions.push({
        type: 'exercise',
        title: '运动量增加建议',
        description: '建议每天至少进行30分钟的中等强度运动',
        priority: 'medium',
        icon: <TrendingUp className="h-4 w-4" />
      });
    }

    // 通用健康建议
    suggestions.push({
      type: 'general',
      title: '健康生活方式',
      description: '保持均衡饮食，多喝水，定期体检，维持良好心态',
      priority: 'low',
      icon: <Heart className="h-4 w-4" />
    });
    setHealthSuggestions(suggestions);
  };
  const updateConversationContext = chatMessages => {
    const recentMessages = chatMessages.slice(-5);
    const context = recentMessages.map(msg => ({
      sender: msg.sender,
      content: msg.content,
      timestamp: msg.timestamp,
      type: msg.type
    }));
    setConversationContext(context);
  };
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  const startVoiceRecording = async () => {
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
        await processVoiceInput(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };
      mediaRecorder.start();
      setIsRecording(true);
      setIsListening(true);
      toast({
        title: "开始录音",
        description: "请说话，录音将在您停止后自动处理",
        variant: "default"
      });
    } catch (error) {
      console.error('录音失败:', error);
      toast({
        title: "录音失败",
        description: "无法访问麦克风，请检查权限设置",
        variant: "destructive"
      });
    }
  };
  const stopVoiceRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsListening(false);
    }
  };
  const processVoiceInput = async audioBlob => {
    setIsProcessing(true);
    try {
      // 模拟语音识别和处理
      await new Promise(resolve => setTimeout(resolve, 2000));
      const recognizedTexts = ["我感觉最近有些疲劳，想了解一下健康状况", "我的血压有点高，应该注意什么", "最近睡眠质量不好，有什么建议吗", "我想了解一下如何改善我的饮食习惯"];
      const recognizedText = recognizedTexts[Math.floor(Math.random() * recognizedTexts.length)];
      setInputText(recognizedText);
      toast({
        title: "语音识别完成",
        description: "已将您的语音转换为文字",
        variant: "default"
      });
    } catch (error) {
      console.error('语音处理失败:', error);
      toast({
        title: "语音处理失败",
        description: "无法处理语音输入，请重试",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };
  const speakText = async text => {
    if (!voiceEnabled || !speechSynthesisRef.current) return;
    try {
      // 停止当前语音
      speechSynthesisRef.current.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'zh-CN';
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      speechSynthesisRef.current.speak(utterance);
    } catch (error) {
      console.error('语音合成失败:', error);
    }
  };
  const stopSpeaking = () => {
    if (speechSynthesisRef.current) {
      speechSynthesisRef.current.cancel();
      setIsSpeaking(false);
    }
  };
  const handleImageUpload = event => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = e => {
        setSelectedImage({
          file: file,
          url: e.target.result,
          name: file.name,
          size: (file.size / 1024 / 1024).toFixed(2) + ' MB'
        });
        analyzeImage(file);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleFileUpload = event => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile({
        file: file,
        name: file.name,
        type: file.type,
        size: (file.size / 1024 / 1024).toFixed(2) + ' MB'
      });
      analyzeDocument(file);
    }
  };
  const analyzeImage = async imageFile => {
    setIsAnalyzing(true);
    try {
      // 模拟图像分析
      await new Promise(resolve => setTimeout(resolve, 3000));
      const mockAnalysis = {
        type: 'medical_image',
        confidence: 0.92,
        findings: [{
          type: 'skin_condition',
          description: '轻微皮肤红肿',
          severity: 'low',
          confidence: 0.85
        }, {
          type: 'wound_healing',
          description: '伤口愈合良好',
          severity: 'normal',
          confidence: 0.78
        }],
        recommendations: ['保持清洁干燥', '避免抓挠', '如症状加重请及时就医'],
        urgency: 'low',
        analysis_details: {
          image_quality: 'good',
          lighting: 'adequate',
          clarity: 'high'
        }
      };
      setAnalysisResults(mockAnalysis);
      const analysisMessage = {
        id: Date.now(),
        type: 'image_analysis',
        content: `我已经分析了您上传的图片。${mockAnalysis.findings.map(f => f.description).join('，')}。${mockAnalysis.recommendations.join('，')}。`,
        sender: 'ai',
        timestamp: new Date().toISOString(),
        attachments: [{
          type: 'image',
          url: URL.createObjectURL(imageFile),
          name: imageFile.name,
          analysis: mockAnalysis
        }],
        context: {
          analysis_type: 'medical_image',
          confidence: mockAnalysis.confidence,
          urgency: mockAnalysis.urgency
        }
      };
      setMessages(prev => [...prev, analysisMessage]);
      await saveChatMessage(analysisMessage);

      // 语音播报分析结果
      if (voiceEnabled) {
        await speakText(analysisMessage.content);
      }
      toast({
        title: "图像分析完成",
        description: "AI已分析您的医学图像",
        variant: "default"
      });
    } catch (error) {
      console.error('图像分析失败:', error);
      toast({
        title: "图像分析失败",
        description: "无法分析图像，请重试",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };
  const analyzeDocument = async documentFile => {
    setIsAnalyzing(true);
    try {
      // 模拟文档分析
      await new Promise(resolve => setTimeout(resolve, 2000));
      const mockDocAnalysis = {
        type: 'medical_document',
        extracted_data: {
          patient_name: '张三',
          document_type: '体检报告',
          date: '2024-01-15',
          key_findings: ['血压正常', '血糖略高', '建议控制饮食'],
          metrics: {
            blood_pressure: '120/80',
            blood_sugar: '6.8',
            heart_rate: '72'
          }
        },
        summary: '体检报告显示整体健康状况良好，血糖略高需要注意饮食控制。',
        recommendations: ['控制糖分摄入', '增加运动量', '定期复查血糖']
      };
      const docMessage = {
        id: Date.now(),
        type: 'document_analysis',
        content: `已分析您的${mockDocAnalysis.extracted_data.document_type}。${mockDocAnalysis.summary}。建议：${mockDocAnalysis.recommendations.join('，')}。`,
        sender: 'ai',
        timestamp: new Date().toISOString(),
        attachments: [{
          type: 'document',
          name: documentFile.name,
          size: (documentFile.size / 1024 / 1024).toFixed(2) + ' MB',
          analysis: mockDocAnalysis
        }],
        context: {
          analysis_type: 'medical_document',
          document_type: mockDocAnalysis.extracted_data.document_type
        }
      };
      setMessages(prev => [...prev, docMessage]);
      await saveChatMessage(docMessage);

      // 语音播报分析结果
      if (voiceEnabled) {
        await speakText(docMessage.content);
      }
      toast({
        title: "文档分析完成",
        description: "已提取并分析文档内容",
        variant: "default"
      });
    } catch (error) {
      console.error('文档分析失败:', error);
      toast({
        title: "文档分析失败",
        description: "无法分析文档，请重试",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };
  const generateContextualResponse = async userMessage => {
    // 基于对话上下文生成智能回复
    const contextKeywords = conversationContext.map(ctx => ctx.content).join(' ').toLowerCase();
    const userContent = userMessage.content.toLowerCase();

    // 检测用户意图
    let intent = 'general';
    if (userContent.includes('疲劳') || userContent.includes('累')) {
      intent = 'fatigue';
    } else if (userContent.includes('血压') || userContent.includes('高压')) {
      intent = 'blood_pressure';
    } else if (userContent.includes('睡眠') || userContent.includes('失眠')) {
      intent = 'sleep';
    } else if (userContent.includes('饮食') || userContent.includes('吃')) {
      intent = 'diet';
    } else if (userContent.includes('运动') || userContent.includes('锻炼')) {
      intent = 'exercise';
    }

    // 基于意图和上下文生成回复
    const responses = {
      fatigue: {
        text: "根据您的描述，疲劳可能由多种因素引起。建议您：1)保证充足睡眠，每天7-8小时；2)适当运动，如散步30分钟；3)保持均衡饮食，多摄入维生素；4)如持续疲劳，建议就医检查。",
        suggestions: ['改善睡眠质量', '适度运动', '营养补充', '医疗检查']
      },
      blood_pressure: {
        text: "关于血压管理，建议您：1)减少钠盐摄入，每天不超过6克；2)保持健康体重；3)规律运动，每周至少150分钟；4)限制酒精摄入；5)定期监测血压。如有高血压家族史，请密切关注。",
        suggestions: ['低盐饮食', '控制体重', '规律运动', '定期监测']
      },
      sleep: {
        text: "改善睡眠质量的方法：1)建立规律作息，固定睡眠时间；2)睡前避免使用电子设备；3)保持卧室安静、黑暗、凉爽；4)避免咖啡因和酒精；5)尝试放松技巧如深呼吸、冥想。",
        suggestions: ['规律作息', '睡前放松', '优化睡眠环境', '避免刺激物']
      },
      diet: {
        text: "健康饮食建议：1)多吃蔬菜水果，每天5份以上；2)选择全谷物而非精制谷物；3)适量摄入优质蛋白质；4)限制加工食品和糖分；5)保持充足水分，每天8杯水。",
        suggestions: ['均衡营养', '多蔬果', '控制糖分', '充足水分']
      },
      exercise: {
        text: "科学运动建议：1)每周至少150分钟中等强度运动；2)包括有氧运动和力量训练；3)运动前后充分热身和拉伸；4)选择自己喜欢的运动方式；5)循序渐进，避免过度训练。",
        suggestions: ['有氧运动', '力量训练', '充分热身', '循序渐进']
      },
      general: {
        text: "我是您的AI健康助手，可以为您提供健康咨询、症状分析、用药指导等服务。请告诉我您的具体健康问题，我会根据您的个人情况给出专业建议。",
        suggestions: ['健康咨询', '症状分析', '用药指导', '预防保健']
      }
    };
    const response = responses[intent] || responses.general;

    // 如果有健康指标数据，结合数据生成个性化建议
    if (healthMetrics) {
      let personalizedText = response.text;
      if (healthMetrics.heartRate.current > 85 && intent === 'fatigue') {
        personalizedText += " 您的心率偏高，可能与疲劳有关，建议适当休息。";
      }
      if (healthMetrics.sleep.hours < 7 && intent === 'sleep') {
        personalizedText += " 根据您的睡眠数据，您确实需要改善睡眠质量。";
      }
      return {
        ...response,
        text: personalizedText,
        personalized: true
      };
    }
    return response;
  };
  const sendMessage = async () => {
    if (!inputText.trim() && !selectedImage && !selectedFile) return;
    const userMessage = {
      id: Date.now(),
      type: 'text',
      content: inputText,
      sender: 'user',
      timestamp: new Date().toISOString(),
      attachments: []
    };
    if (selectedImage) {
      userMessage.attachments.push({
        type: 'image',
        url: selectedImage.url,
        name: selectedImage.name,
        size: selectedImage.size
      });
    }
    if (selectedFile) {
      userMessage.attachments.push({
        type: 'file',
        name: selectedFile.name,
        size: selectedFile.size
      });
    }
    setMessages(prev => [...prev, userMessage]);
    await saveChatMessage(userMessage);
    setInputText('');
    setSelectedImage(null);
    setSelectedFile(null);
    setIsProcessing(true);
    try {
      // 生成智能回复
      await new Promise(resolve => setTimeout(resolve, 1500));
      const aiResponse = await generateContextualResponse(userMessage);
      const aiMessage = {
        id: Date.now() + 1,
        type: 'text',
        content: aiResponse.text,
        sender: 'ai',
        timestamp: new Date().toISOString(),
        attachments: [],
        context: {
          intent: aiResponse.intent || 'general',
          suggestions: aiResponse.suggestions || [],
          personalized: aiResponse.personalized || false
        }
      };
      setMessages(prev => [...prev, aiMessage]);
      await saveChatMessage(aiMessage);
      updateConversationContext([...messages, userMessage, aiMessage]);

      // 语音播报AI回复
      if (voiceEnabled) {
        await speakText(aiResponse.content);
      }
    } catch (error) {
      console.error('发送消息失败:', error);
      toast({
        title: "发送失败",
        description: error.message || "无法发送消息，请重试",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };
  const saveChatMessage = async message => {
    try {
      await $w.cloud.callDataSource({
        dataSourceName: 'chat_sessions',
        methodName: 'wedaCreateV2',
        params: {
          data: {
            patient_id: patientId,
            session_type: 'ai_health_assistant',
            message_type: message.type,
            content: message.content,
            sender_type: message.sender,
            attachments: message.attachments,
            context: message.context || {},
            created_at: message.timestamp
          }
        }
      });
    } catch (error) {
      console.error('保存聊天记录失败:', error);
    }
  };
  const clearChatHistory = async () => {
    try {
      // 清空本地消息
      setMessages([]);
      setConversationContext([]);

      // 可选：从数据库删除历史记录
      // await $w.cloud.callDataSource({
      //   dataSourceName: 'chat_sessions',
      //   methodName: 'wedaBatchDeleteV2',
      //   params: {
      //     filter: {
      //       where: {
      //         $and: [{
      //           patient_id: { $eq: patientId }
      //         }, {
      //           session_type: { $eq: 'ai_health_assistant' }
      //         }]
      //       }
      //     }
      //   }
      // });

      toast({
        title: "聊天记录已清空",
        description: "对话历史已清除",
        variant: "default"
      });
    } catch (error) {
      console.error('清空聊天记录失败:', error);
      toast({
        title: "操作失败",
        description: "无法清空聊天记录",
        variant: "destructive"
      });
    }
  };
  const exportChatHistory = () => {
    try {
      const chatContent = messages.map(msg => {
        const time = new Date(msg.timestamp).toLocaleString('zh-CN');
        const sender = msg.sender === 'user' ? '用户' : 'AI助手';
        let content = `[${time}] ${sender}: ${msg.content}`;
        if (msg.attachments && msg.attachments.length > 0) {
          content += '\n附件: ' + msg.attachments.map(att => att.name).join(', ');
        }
        return content;
      }).join('\n\n');
      const blob = new Blob([chatContent], {
        type: 'text/plain;charset=utf-8'
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `健康对话记录_${new Date().toLocaleDateString('zh-CN')}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast({
        title: "导出成功",
        description: "对话记录已导出为文本文件",
        variant: "default"
      });
    } catch (error) {
      console.error('导出失败:', error);
      toast({
        title: "导出失败",
        description: "无法导出对话记录",
        variant: "destructive"
      });
    }
  };
  const getHealthStatusColor = (current, normal) => {
    if (current < normal.min || current > normal.max) {
      return 'text-red-600';
    }
    return 'text-green-600';
  };
  const getHealthStatusIcon = (current, normal) => {
    if (current < normal.min || current > normal.max) {
      return <AlertCircle className="h-4 w-4" />;
    }
    return <CheckCircle className="h-4 w-4" />;
  };
  const formatFileSize = size => {
    if (typeof size === 'string') return size;
    const mb = size / 1024 / 1024;
    return mb > 1 ? `${mb.toFixed(2)} MB` : `${(size / 1024).toFixed(2)} KB`;
  };
  return <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[95vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Bot className="h-5 w-5 mr-2" />
            多模态AI健康助手
            <Badge className="ml-2" variant="secondary">
              <Sparkles className="h-3 w-3 mr-1" />
              智能对话
            </Badge>
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col h-[85vh]">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="chat" className="flex items-center">
                <MessageCircle className="h-4 w-4 mr-2" />
                智能对话
              </TabsTrigger>
              <TabsTrigger value="health" className="flex items-center">
                <Heart className="h-4 w-4 mr-2" />
                健康监测
              </TabsTrigger>
              <TabsTrigger value="analysis" className="flex items-center">
                <Brain className="h-4 w-4 mr-2" />
                智能分析
              </TabsTrigger>
              <TabsTrigger value="suggestions" className="flex items-center">
                <Sparkles className="h-4 w-4 mr-2" />
                健康建议
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="chat" className="flex-1 flex flex-col mt-4">
              {/* 聊天消息区域 */}
              <div className="flex-1 overflow-hidden rounded-lg border">
                <ScrollArea className="h-full p-4">
                  <div className="space-y-4">
                    {messages.length === 0 ? <div className="text-center py-8">
                        <Bot className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium mb-2">开始您的健康咨询</h3>
                        <p className="text-muted-foreground">我是您的AI健康助手，可以回答您的健康问题</p>
                      </div> : messages.map(message => <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[70%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                          <div className="flex items-center mb-1">
                            {message.sender === 'ai' ? <Bot className="h-4 w-4 mr-1" /> : <User className="h-4 w-4 mr-1" />}
                            <span className="text-xs text-muted-foreground">
                              {new Date(message.timestamp).toLocaleTimeString('zh-CN')}
                            </span>
                            {message.sender === 'ai' && voiceEnabled && <Button size="sm" variant="ghost" className="ml-2 h-6 w-6 p-0" onClick={() => speakText(message.content)}>
                              {isSpeaking ? <PauseCircle className="h-3 w-3" /> : <PlayCircle className="h-3 w-3" />}
                            </Button>}
                          </div>
                          <div className={`p-3 rounded-lg ${message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-white border border-gray-200'}`}>
                            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                            
                            {/* 附件显示 */}
                            {message.attachments && message.attachments.length > 0 && <div className="mt-2 space-y-2">
                                {message.attachments.map((attachment, index) => <div key={index}>
                                    {attachment.type === 'image' && <div className="mt-2">
                                        <img src={attachment.url} alt="上传的图片" className="max-w-full h-32 object-cover rounded" />
                                        {attachment.analysis && <div className="mt-2 p-2 bg-blue-50 rounded text-xs">
                                            <p className="font-medium">AI分析结果:</p>
                                            <p>置信度: {(attachment.analysis.confidence * 100).toFixed(1)}%</p>
                                            {attachment.analysis.findings.map((finding, idx) => <p key={idx}>• {finding.description}</p>)}
                                          </div>}
                                      </div>}
                                    {attachment.type === 'file' && <div className="flex items-center p-2 bg-gray-100 rounded">
                                        <FileText className="h-4 w-4 mr-2" />
                                        <span className="text-sm">{attachment.name}</span>
                                        {attachment.size && <span className="text-xs text-muted-foreground ml-2">({attachment.size})</span>}
                                      </div>}
                                  </div>)}
                              </div>}
                            
                            {/* 智能建议 */}
                            {message.context?.suggestions && message.context.suggestions.length > 0 && <div className="mt-3 p-2 bg-green-50 rounded">
                                <p className="text-xs font-medium text-green-800 mb-1">相关建议:</p>
                                <ul className="text-xs text-green-700 space-y-1">
                                  {message.context.suggestions.map((suggestion, idx) => <li key={idx}>• {suggestion}</li>)}
                                </ul>
                              </div>}
                          </div>
                        </div>
                      </div>)}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>
              </div>
              
              {/* 输入区域 */}
              <div className="border-t p-4">
                {/* 已选择的文件/图片预览 */}
                {(selectedImage || selectedFile) && <div className="mb-3 flex flex-wrap gap-2">
                    {selectedImage && <div className="relative inline-block">
                        <img src={selectedImage.url} alt="待上传图片" className="h-16 w-16 object-cover rounded border" />
                        <Button size="sm" variant="destructive" className="absolute -top-2 -right-2 h-6 w-6 p-0" onClick={() => setSelectedImage(null)}>
                          <X className="h-3 w-3" />
                        </Button>
                        <div className="text-xs text-muted-foreground mt-1">{selectedImage.size}</div>
                      </div>}
                    {selectedFile && <div className="relative inline-flex items-center p-2 bg-gray-100 rounded border">
                        <FileText className="h-4 w-4 mr-2" />
                        <span className="text-sm max-w-32 truncate">{selectedFile.name}</span>
                        <span className="text-xs text-muted-foreground ml-2">{selectedFile.size}</span>
                        <Button size="sm" variant="ghost" className="ml-2 h-6 w-6 p-0" onClick={() => setSelectedFile(null)}>
                          <X className="h-3 w-3" />
                        </Button>
                      </div>}
                  </div>}
                
                <div className="flex items-center space-x-2">
                  {/* 语音输入按钮 */}
                  <Button variant={isRecording ? "destructive" : "outline"} size="sm" onClick={isRecording ? stopVoiceRecording : startVoiceRecording} disabled={isProcessing}>
                    {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                    {isRecording ? '停止录音' : '语音输入'}
                  </Button>
                  
                  {/* 图片上传按钮 */}
                  <Button variant="outline" size="sm" onClick={() => imageInputRef.current?.click()} disabled={isProcessing}>
                    <Camera className="h-4 w-4 mr-1" />
                    图片
                  </Button>
                  <input ref={imageInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  
                  {/* 文件上传按钮 */}
                  <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()} disabled={isProcessing}>
                    <Upload className="h-4 w-4 mr-1" />
                    文件
                  </Button>
                  <input ref={fileInputRef} type="file" accept=".pdf,.doc,.docx,.txt" onChange={handleFileUpload} className="hidden" />
                  
                  {/* 语音控制按钮 */}
                  <Button variant="outline" size="sm" onClick={() => setVoiceEnabled(!voiceEnabled)}>
                    {voiceEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                    {voiceEnabled ? '静音' : '语音'}
                  </Button>
                  
                  {/* 文本输入框 */}
                  <Input value={inputText} onChange={e => setInputText(e.target.value)} placeholder="输入您的健康问题..." onKeyPress={e => e.key === 'Enter' && sendMessage()} disabled={isProcessing} className="flex-1" />
                  
                  {/* 发送按钮 */}
                  <Button onClick={sendMessage} disabled={isProcessing || !inputText.trim() && !selectedImage && !selectedFile}>
                    {isProcessing ? <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div> : <Send className="h-4 w-4" />}
                  </Button>
                </div>
                
                {/* 录音状态指示器 */}
                {isListening && <div className="mt-2 flex items-center text-sm text-red-600">
                    <div className="animate-pulse mr-2">🔴</div>
                    正在录音中...
                  </div>}
                
                {/* 分析状态指示器 */}
                {isAnalyzing && <div className="mt-2 flex items-center text-sm text-blue-600">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                    正在分析中...
                  </div>}
              </div>
            </TabsContent>
            
            <TabsContent value="health" className="flex-1 mt-4">
              <ScrollArea className="h-full">
                <div className="space-y-4">
                  {healthMetrics ? <>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <Card>
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <Heart className="h-5 w-5 mr-2 text-red-500" />
                                <span className="font-medium">心率</span>
                              </div>
                              <div className="flex items-center">
                                <span className={`text-lg font-bold ${getHealthStatusColor(healthMetrics.heartRate.current, healthMetrics.heartRate.normal)}`}>
                                  {healthMetrics.heartRate.current}
                                </span>
                                <span className="text-sm text-muted-foreground ml-1">bpm</span>
                                {getHealthStatusIcon(healthMetrics.heartRate.current, healthMetrics.heartRate.normal)}
                              </div>
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                              正常范围: {healthMetrics.heartRate.normal.min}-{healthMetrics.heartRate.normal.max}
                            </div>
                            {healthMetrics.heartRate.trend && <div className="text-xs text-muted-foreground mt-1">
                                趋势: {healthMetrics.heartRate.trend === 'stable' ? '稳定' : healthMetrics.heartRate.trend === 'improving' ? '改善' : '需要关注'}
                              </div>}
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <Activity className="h-5 w-5 mr-2 text-blue-500" />
                                <span className="font-medium">血压</span>
                              </div>
                              <div className="flex items-center">
                                <span className={`text-lg font-bold ${getHealthStatusColor(healthMetrics.bloodPressure.systolic, healthMetrics.bloodPressure.normal.systolic)}`}>
                                  {healthMetrics.bloodPressure.systolic}/{healthMetrics.bloodPressure.diastolic}
                                </span>
                                <span className="text-sm text-muted-foreground ml-1">mmHg</span>
                                {getHealthStatusIcon(healthMetrics.bloodPressure.systolic, healthMetrics.bloodPressure.normal.systolic)}
                              </div>
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                              正常范围: {healthMetrics.bloodPressure.normal.systolic.min}-{healthMetrics.bloodPressure.normal.systolic.max}/{healthMetrics.bloodPressure.normal.diastolic.min}-{healthMetrics.bloodPressure.normal.diastolic.max}
                            </div>
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <Thermometer className="h-5 w-5 mr-2 text-orange-500" />
                                <span className="font-medium">体温</span>
                              </div>
                              <div className="flex items-center">
                                <span className={`text-lg font-bold ${getHealthStatusColor(healthMetrics.temperature.current, healthMetrics.temperature.normal)}`}>
                                  {healthMetrics.temperature.current}
                                </span>
                                <span className="text-sm text-muted-foreground ml-1">°C</span>
                                {getHealthStatusIcon(healthMetrics.temperature.current, healthMetrics.temperature.normal)}
                              </div>
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                              正常范围: {healthMetrics.temperature.normal.min}-{healthMetrics.temperature.normal.max}
                            </div>
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <Activity className="h-5 w-5 mr-2 text-purple-500" />
                                <span className="font-medium">血糖</span>
                              </div>
                              <div className="flex items-center">
                                <span className={`text-lg font-bold ${getHealthStatusColor(healthMetrics.bloodSugar.current, healthMetrics.bloodSugar.normal)}`}>
                                  {healthMetrics.bloodSugar.current}
                                </span>
                                <span className="text-sm text-muted-foreground ml-1">mmol/L</span>
                                {getHealthStatusIcon(healthMetrics.bloodSugar.current, healthMetrics.bloodSugar.normal)}
                              </div>
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                              正常范围: {healthMetrics.bloodSugar.normal.min}-{healthMetrics.bloodSugar.normal.max}
                            </div>
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <Clock className="h-5 w-5 mr-2 text-indigo-500" />
                                <span className="font-medium">睡眠</span>
                              </div>
                              <div className="flex items-center">
                                <span className="text-lg font-bold text-indigo-600">
                                  {healthMetrics.sleep.hours}
                                </span>
                                <span className="text-sm text-muted-foreground ml-1">小时</span>
                              </div>
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                              质量: {healthMetrics.sleep.quality === 'good' ? '良好' : '一般'}
                            </div>
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <TrendingUp className="h-5 w-5 mr-2 text-green-500" />
                                <span className="font-medium">运动</span>
                              </div>
                              <div className="flex items-center">
                                <span className="text-lg font-bold text-green-600">
                                  {healthMetrics.exercise.minutes}
                                </span>
                                <span className="text-sm text-muted-foreground ml-1">分钟</span>
                              </div>
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                              消耗: {healthMetrics.exercise.calories} 卡路里
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </> : <div className="text-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                      <p className="text-muted-foreground">正在加载健康数据...</p>
                    </div>}
                </div>
              </ScrollArea>
            </TabsContent>
            
            <TabsContent value="analysis" className="flex-1 mt-4">
              <ScrollArea className="h-full">
                <div className="space-y-4">
                  {analysisResults && <Card>
                      <CardHeader>
                        <CardTitle className="text-base">最新分析结果</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span>分析类型:</span>
                            <Badge>{analysisResults.type}</Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>置信度:</span>
                            <span>{(analysisResults.confidence * 100).toFixed(1)}%</span>
                          </div>
                          <div>
                            <span className="font-medium">发现:</span>
                            <ul className="mt-1 space-y-1">
                              {analysisResults.findings.map((finding, index) => <li key={index} className="text-sm flex items-center">
                                  <AlertCircle className="h-3 w-3 mr-2 text-yellow-500" />
                                  {finding.description}
                                  <Badge className="ml-2" variant="outline">{finding.severity}</Badge>
                                </li>)}
                            </ul>
                          </div>
                          <div>
                            <span className="font-medium">建议:</span>
                            <ul className="mt-1 space-y-1">
                              {analysisResults.recommendations.map((rec, index) => <li key={index} className="text-sm flex items-center">
                                  <CheckCircle className="h-3 w-3 mr-2 text-green-500" />
                                  {rec}
                                </li>)}
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>}
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">AI健康分析功能</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                          <Eye className="h-8 w-8 mr-3 text-blue-500" />
                          <div>
                            <h4 className="font-medium">图像识别</h4>
                            <p className="text-sm text-gray-600">分析皮肤状况、伤口愈合等</p>
                          </div>
                        </div>
                        <div className="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                          <Ear className="h-8 w-8 mr-3 text-green-500" />
                          <div>
                            <h4 className="font-medium">语音识别</h4>
                            <p className="text-sm text-gray-600">语音输入症状描述</p>
                          </div>
                        </div>
                        <div className="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                          <FileText className="h-8 w-8 mr-3 text-purple-500" />
                          <div>
                            <h4 className="font-medium">文档分析</h4>
                            <p className="text-sm text-gray-600">解析体检报告、病历</p>
                          </div>
                        </div>
                        <div className="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                          <Brain className="h-8 w-8 mr-3 text-orange-500" />
                          <div>
                            <h4 className="font-medium">智能诊断</h4>
                            <p className="text-sm text-gray-600">基于症状的初步分析</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </ScrollArea>
            </TabsContent>
            
            <TabsContent value="suggestions" className="flex-1 mt-4">
              <ScrollArea className="h-full">
                <div className="space-y-4">
                  {healthSuggestions.length > 0 ? <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {healthSuggestions.map((suggestion, index) => <Card key={index}>
                          <CardContent className="p-4">
                            <div className="flex items-start space-x-3">
                              <div className="p-2 bg-blue-100 rounded-lg">
                                {suggestion.icon}
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium mb-1">{suggestion.title}</h4>
                                <p className="text-sm text-gray-600 mb-2">{suggestion.description}</p>
                                <Badge variant={suggestion.priority === 'high' ? 'destructive' : suggestion.priority === 'medium' ? 'default' : 'secondary'}>
                                  {suggestion.priority === 'high' ? '高优先级' : suggestion.priority === 'medium' ? '中优先级' : '低优先级'}
                                </Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>)}
                    </div> : <div className="text-center py-8">
                      <Sparkles className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium mb-2">暂无健康建议</h3>
                      <p className="text-muted-foreground">开始对话后，AI将根据您的健康状况提供个性化建议</p>
                    </div>}
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">对话历史操作</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex space-x-2">
                        <Button variant="outline" onClick={exportChatHistory}>
                          <Download className="h-4 w-4 mr-2" />
                          导出对话记录
                        </Button>
                        <Button variant="outline" onClick={clearChatHistory}>
                          <Trash2 className="h-4 w-4 mr-2" />
                          清空对话记录
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>;
}