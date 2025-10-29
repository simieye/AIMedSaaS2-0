// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Badge, Tabs, TabsContent, TabsList, TabsTrigger, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, useToast, Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui';
// @ts-ignore;
import { Brain, Users, Activity, Settings, Database, Shield, BarChart3, Calendar, AlertTriangle, CheckCircle, TrendingUp, Clock, Zap, Target, FileText, Heart, Stethoscope, Pill, Microscope, Building, CreditCard, BookOpen, Search, Filter, Download, Upload, RefreshCw, Plus, Edit, Trash2, Eye, ChevronRight, Globe, Lock, Key, UserCheck, Server, Cpu, HardDrive, Wifi, Battery, Thermometer, Wind, Handshake, DollarSign, FileContract, Route, MapPin, Timeline, GanttChart, GitBranch, Layers, Network, PieChart, LineChart, AreaChart, ScatterChart, RadarChart, TreePine, Package, Code, Terminal, Monitor, Smartphone, Tablet, Cloud, Bell, BellRing, BellOff, Volume2, VolumeX, Play, Pause, SkipForward, SkipBack, Repeat, Shuffle, Mic, MicOff, Video, VideoOff, Phone, PhoneOff, Mail, MailOpen, Send, Paperclip, PaperclipOff, Image, ImageOff, File, FilePlus, FileMinus, FileCheck, FileX, FileSearch, FileSignature, FileInput, FileOutput, FileDown, FileUp, FileCopy, FileMove, FileRename, FileDelete, FileArchive, FileUnarchive, FileLock, FileUnlock, FileQuestion, FileWarning, FileError, FileDone, FilePending, FileProcessing, FileUploading, FileDownloading, FileSync, FileSyncing, FileRefresh, FileRefreshCw, FileRefreshCcw, FileRotate, FileRotateCw, FileRotateCcw, FileFlip, FileFlipHorizontal, FileFlipVertical, FileZoomIn, FileZoomOut, FileMaximize, FileMinimize, FileExpand, FileShrink, FileFull, FileEmpty, Home, Layout, Grid, List, MoreHorizontal, MoreVertical, Menu, X, ChevronLeft, ChevronDown, ChevronUp, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, ArrowDownRight, ArrowUpLeft, ArrowDownLeft, DoubleArrowUp, DoubleArrowDown, DoubleArrowLeft, DoubleArrowRight, Minimize, Maximize, Expand, Shrink, Fullscreen, ExitFullscreen, ZoomIn, ZoomOut, RotateCw, RotateCcw, Sun, Moon, CloudRain, CloudSnow, CloudDrizzle, CloudLightning, Umbrella, Droplets, Gauge, Fuel, Power, PowerOff, Plug, PlugZap, Unplug, Signal, SignalHigh, SignalLow, SignalMedium, SignalZero, Radio, RadioTower, Broadcast, Satellite, Radar, Waves, HeartPulse, HeartHandshake, Lungs, Bone, Ear, EarOff, EyeOff, Nose, Mouth, Smile, Frown, Meh, Angry, Dizzy, Confused, Surprised, Kiss, Grin, Laugh, Wink, FrownOpen, Grimace, Tongue, TongueWink, Star, StarHalf, StarOff, HeartOff, ThumbsUp, ThumbsDown, MessageSquare, MessageCircle, MessageSquarePlus, MessageSquareMinus, MessageSquareQuote, MessageSquareDashed, MessageSquareText, MessageSquareCode, MessageSquareShare, MessageSquareMore, Reply, ReplyAll, Forward, Forwarded, Share, Share2, SendToBack, BringToFront, AlignLeft, AlignCenter, AlignRight, AlignJustify, AlignStart, AlignEnd, Indent, Outdent, ListOrdered, ListChecks, ListTodo, ListMinus, ListPlus, ListX, ListVideo, ListMusic, ListEnd, ListStart, ListCollapse, ListFilter, ListFilterPlus, ListFilterMinus, ListFilterX, ListFilter2, ListFilter3, ListFilter4, ListFilter5, ListFilter6, ListFilter7, ListFilter8, ListFilter9, ListFilter0, ListFilterDot, ListFilterSquare, ListFilterCircle, ListFilterTriangle, ListFilterHexagon, ListFilterOctagon, ListFilterDiamond, ListFilterPentagon, ListFilterStar, ListFilterHeart, ListFilterFlower, ListFilterLeaf, ListFilterCloud, ListFilterSun, ListFilterMoon, ListFilterRain, ListFilterSnow, ListFilterLightning, ListFilterUmbrella, ListFilterDroplets, ListFilterGauge, ListFilterFuel, ListFilterZap, ListFilterBattery, ListFilterPower, ListFilterPlug, ListFilterWifi, ListFilterSignal, ListFilterRadio, ListFilterBroadcast, ListFilterSatellite, ListFilterRadar, ListFilterWaves, ListFilterActivity, ListFilterHeartPulse, ListFilterLungs, ListFilterBone, ListFilterEar, ListFilterNose, ListFilterMouth, ListFilterSmile, ListFilterFrown, ListFilterMeh, ListFilterAngry, ListFilterDizzy, ListFilterConfused, ListFilterSurprised, ListFilterKiss, ListFilterGrin, ListFilterLaugh, ListFilterWink, ListFilterTongue, ListFilterThumbs, ListFilterMessage, ListFilterReply, ListFilterForward, ListFilterShare, ListFilterSend, ListFilterAlign, ListFilterIndent, ListFilterList, ListFilterCollapse, ListFilterTree, ListFilterChevron, ListFilterArrow, ListFilterDoubleArrow, ListFilterMinimize, ListFilterMaximize, ListFilterExpand, ListFilterShrink, ListFilterFullscreen, ListFilterZoom, ListFilterRotate } from 'lucide-react';

import { AdminStatsCard } from '@/components/AdminStatsCard';
import { SystemHealthMonitor } from '@/components/SystemHealthMonitor';
import { RecentActivity } from '@/components/RecentActivity';
import { AgentCard } from '@/components/AgentCard';
import { AgentForm } from '@/components/AgentForm';
import { AgentStats } from '@/components/AgentStats';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { EmptyState } from '@/components/EmptyState';
import { NotificationBell } from '@/components/NotificationBell';
import { SearchBar } from '@/components/SearchBar';
import { Pagination } from '@/components/Pagination';
import { Modal } from '@/components/Modal';
import { Toast } from '@/components/Toast';
import { Tooltip } from '@/components/Tooltip';
import { StatusBadge } from '@/components/StatusBadge';
import { DataTable } from '@/components/DataTable';
import { ChartContainer } from '@/components/ChartContainer';
import { ActionMenu } from '@/components/ActionMenu';
import { FormField } from '@/components/FormField';
import { LoadingOverlay } from '@/components/LoadingOverlay';
import { ConfirmDialog } from '@/components/ConfirmDialog';
export default function AdminDashboard(props) {
  const {
    $w,
    style
  } = props;
  const {
    toast
  } = useToast();
  const [activeTab, setActiveTab] = React.useState('overview');
  const [isLoading, setIsLoading] = React.useState(false);
  const [agents, setAgents] = React.useState([{
    id: 1,
    name: 'Medical Diagnosis Agent',
    type: 'diagnosis',
    status: 'active',
    accuracy: 95.2,
    lastTrained: '2024-01-15',
    description: '专门用于医疗诊断的AI代理'
  }, {
    id: 2,
    name: 'Patient Triage Agent',
    type: 'triage',
    status: 'training',
    accuracy: 89.7,
    lastTrained: '2024-01-10',
    description: '患者分诊和优先级评估'
  }, {
    id: 3,
    name: 'Drug Recommendation Agent',
    type: 'recommendation',
    status: 'inactive',
    accuracy: 92.1,
    lastTrained: '2024-01-08',
    description: '药物推荐和相互作用检查'
  }]);
  const [showAgentForm, setShowAgentForm] = React.useState(false);
  const [editingAgent, setEditingAgent] = React.useState(null);
  const statsData = [{
    title: '总代理数',
    value: '12',
    change: '+2',
    icon: Brain,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100'
  }, {
    title: '活跃代理',
    value: '8',
    change: '+1',
    icon: Activity,
    color: 'text-green-600',
    bgColor: 'bg-green-100'
  }, {
    title: '平均准确率',
    value: '91.5%',
    change: '+2.3%',
    icon: Target,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100'
  }, {
    title: '今日请求',
    value: '3,847',
    change: '+523',
    icon: Zap,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100'
  }];
  const handleTabChange = value => {
    setActiveTab(value);
    toast({
      title: "页面切换",
      description: `已切换到${value === 'overview' ? '概览' : value === 'agents' ? 'AI代理' : value === 'system' ? '系统监控' : '日志管理'}页面`
    });
  };
  const handleCreateAgent = () => {
    setEditingAgent(null);
    setShowAgentForm(true);
  };
  const handleEditAgent = agent => {
    setEditingAgent(agent);
    setShowAgentForm(true);
  };
  const handleDeleteAgent = agent => {
    setAgents(prev => prev.filter(a => a.id !== agent.id));
    toast({
      title: "删除成功",
      description: `代理 ${agent.name} 已删除`
    });
  };
  const handleSaveAgent = agentData => {
    if (editingAgent) {
      setAgents(prev => prev.map(a => a.id === editingAgent.id ? {
        ...a,
        ...agentData
      } : a));
      toast({
        title: "更新成功",
        description: `代理 ${agentData.name} 已更新`
      });
    } else {
      const newAgent = {
        id: Date.now(),
        ...agentData
      };
      setAgents(prev => [...prev, newAgent]);
      toast({
        title: "创建成功",
        description: `代理 ${agentData.name} 已创建`
      });
    }
    setShowAgentForm(false);
    setEditingAgent(null);
  };
  return <div style={style} className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <ErrorBoundary>
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gray-800 rounded-lg">
                  <Settings className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">管理员仪表板</h1>
                  <p className="text-gray-600">系统管理和AI代理配置</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <SearchBar placeholder="搜索代理..." />
                <NotificationBell />
                <Button variant="outline" className="flex items-center space-x-2">
                  <RefreshCw className="h-4 w-4" />
                  <span>刷新</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-white p-1 rounded-lg shadow">
              <TabsTrigger value="overview" className="flex items-center space-x-2">
                <BarChart3 className="h-4 w-4" />
                <span>系统概览</span>
              </TabsTrigger>
              <TabsTrigger value="agents" className="flex items-center space-x-2">
                <Brain className="h-4 w-4" />
                <span>AI代理</span>
              </TabsTrigger>
              <TabsTrigger value="system" className="flex items-center space-x-2">
                <Monitor className="h-4 w-4" />
                <span>系统监控</span>
              </TabsTrigger>
              <TabsTrigger value="logs" className="flex items-center space-x-2">
                <FileText className="h-4 w-4" />
                <span>日志管理</span>
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statsData.map((stat, index) => <AdminStatsCard key={index} {...stat} />)}
              </div>

              {/* Charts and Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="h-5 w-5 mr-2" />
                      系统性能趋势
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer type="line" data={{
                    labels: ['1月', '2月', '3月', '4月', '5月', '6月'],
                    datasets: [{
                      label: 'API请求',
                      data: [1200, 1900, 3000, 5000, 4000, 3800],
                      borderColor: 'rgb(59, 130, 246)',
                      backgroundColor: 'rgba(59, 130, 246, 0.1)'
                    }, {
                      label: 'AI诊断',
                      data: [800, 1200, 2000, 3200, 2800, 2500],
                      borderColor: 'rgb(16, 185, 129)',
                      backgroundColor: 'rgba(16, 185, 129, 0.1)'
                    }]
                  }} />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Clock className="h-5 w-5 mr-2" />
                      最近活动
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RecentActivity />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Agents Tab */}
            <TabsContent value="agents" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">AI代理管理</h2>
                <Button onClick={handleCreateAgent} className="flex items-center space-x-2">
                  <Plus className="h-4 w-4" />
                  <span>创建代理</span>
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {agents.map(agent => <AgentCard key={agent.id} agent={agent} onEdit={handleEditAgent} onDelete={handleDeleteAgent} />)}
              </div>

              {/* Agent Form Modal */}
              <Modal isOpen={showAgentForm} onClose={() => setShowAgentForm(false)} title={editingAgent ? '编辑代理' : '创建代理'}>
                <AgentForm agent={editingAgent} onSave={handleSaveAgent} onCancel={() => setShowAgentForm(false)} />
              </Modal>
            </TabsContent>

            {/* System Tab */}
            <TabsContent value="system" className="space-y-6">
              <SystemHealthMonitor />
            </TabsContent>

            {/* Logs Tab */}
            <TabsContent value="logs" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>系统日志</CardTitle>
                </CardHeader>
                <CardContent>
                  <EmptyState icon={FileText} title="日志管理" description="日志查看和管理功能正在开发中..." />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </ErrorBoundary>
    </div>;
}