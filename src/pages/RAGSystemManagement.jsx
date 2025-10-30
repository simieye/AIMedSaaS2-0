// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Badge, Tabs, TabsContent, TabsList, TabsTrigger, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, useToast, Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui';

// @ts-ignore;
import { Brain, Users, Activity, Database, Shield, BarChart3, Calendar, AlertTriangle, CheckCircle, TrendingUp, Clock, Zap, Target, FileText, Heart, Stethoscope, Pill, Microscope, Building, CreditCard, BookOpen, Search, Filter, Download, Upload, RefreshCw, Plus, Edit, Trash2, Eye, ChevronRight, Globe, Lock, Key, UserCheck, Server, Cpu, HardDrive, Wifi, Battery, Thermometer, Wind, Handshake, DollarSign, FileContract, Route, MapPin, Timeline, GanttChart, GitBranch, Layers, Network, PieChart, LineChart, AreaChart, ScatterChart, RadarChart, TreePine, Package, Code, Terminal, Monitor, Smartphone, Tablet, Cloud, Bell, BellRing, BellOff, Volume2, VolumeX, Play, Pause, SkipForward, SkipBack, Repeat, Shuffle, Mic, MicOff, Video, VideoOff, Phone, PhoneOff, Mail, MailOpen, Send, Paperclip, PaperclipOff, Image, ImageOff, File, FilePlus, FileMinus, FileCheck, FileX, FileSearch, FileSignature, FileInput, FileOutput, FileDown, FileUp, FileCopy, FileMove, FileRename, FileDelete, FileArchive, FileUnarchive, FileLock, FileUnlock, FileQuestion, FileWarning, FileError, FileDone, FilePending, FileProcessing, FileUploading, FileDownloading, FileSync, FileSyncing, FileRefresh, FileRefreshCw, FileRefreshCcw, FileRotate, FileRotateCw, FileRotateCcw, FileFlip, FileFlipHorizontal, FileFlipVertical, FileZoomIn, FileZoomOut, FileMaximize, FileMinimize, FileExpand, FileShrink, FileFull, FileEmpty, Home, Layout, Grid, List, MoreHorizontal, MoreVertical, Menu, X, ChevronLeft, ChevronDown, ChevronUp, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, ArrowDownRight, ArrowUpLeft, ArrowDownLeft, DoubleArrowUp, DoubleArrowDown, DoubleArrowLeft, DoubleArrowRight, Minimize, Maximize, Expand, Shrink, Fullscreen, ExitFullscreen, ZoomIn, ZoomOut, RotateCw, RotateCcw, Sun, Moon, CloudRain, CloudSnow, CloudDrizzle, CloudLightning, Umbrella, Droplets, Gauge, Fuel, Power, PowerOff, Plug, PlugZap, Unplug, Signal, SignalHigh, SignalLow, SignalMedium, SignalZero, Radio, RadioTower, Broadcast, Satellite, Radar, Waves, HeartPulse, HeartHandshake, Lungs, Bone, Ear, EarOff, EyeOff, Nose, Mouth, Smile, Frown, Meh, Angry, Dizzy, Confused, Surprised, Kiss, Grin, Laugh, Wink, FrownOpen, Grimace, Tongue, TongueWink, Star, StarHalf, StarOff, HeartOff, ThumbsUp, ThumbsDown, MessageSquare, MessageCircle, MessageSquarePlus, MessageSquareMinus, MessageSquareQuote, MessageSquareDashed, MessageSquareText, MessageSquareCode, MessageSquareShare, MessageSquareMore, Reply, ReplyAll, Forward, Forwarded, Share, Share2, SendToBack, BringToFront, AlignLeft, AlignCenter, AlignRight, AlignJustify, AlignStart, AlignEnd, Indent, Outdent, ListOrdered, ListChecks, ListTodo, ListMinus, ListPlus, ListX, ListVideo, ListMusic, ListEnd, ListStart, ListCollapse, ListFilter, ListFilterPlus, ListFilterMinus, ListFilterX, ListFilter2, ListFilter3, ListFilter4, ListFilter5, ListFilter6, ListFilter7, ListFilter8, ListFilter9, ListFilter0, ListFilterDot, ListFilterSquare, ListFilterCircle, ListFilterTriangle, ListFilterHexagon, ListFilterOctagon, ListFilterDiamond, ListFilterPentagon, ListFilterStar, ListFilterHeart, ListFilterFlower, ListFilterLeaf, ListFilterCloud, ListFilterSun, ListFilterMoon, ListFilterRain, ListFilterSnow, ListFilterLightning, ListFilterUmbrella, ListFilterDroplets, ListFilterGauge, ListFilterFuel, ListFilterZap, ListFilterBattery, ListFilterPower, ListFilterPlug, ListFilterWifi, ListFilterSignal, ListFilterRadio, ListFilterBroadcast, ListFilterSatellite, ListFilterRadar, ListFilterWaves, ListFilterActivity, ListFilterHeartPulse, ListFilterLungs, ListFilterBone, ListFilterEar, ListFilterNose, ListFilterMouth, ListFilterSmile, ListFilterFrown, ListFilterMeh, ListFilterAngry, ListFilterDizzy, ListFilterConfused, ListFilterSurprised, ListFilterKiss, ListFilterGrin, ListFilterLaugh, ListFilterWink, ListFilterTongue, ListFilterThumbs, ListFilterMessage, ListFilterReply, ListFilterForward, ListFilterShare, ListFilterSend, ListFilterAlign, ListFilterIndent, ListFilterList, ListFilterCollapse, ListFilterTree, ListFilterChevron, ListFilterArrow, ListFilterDoubleArrow, ListFilterMinimize, ListFilterMaximize, ListFilterExpand, ListFilterShrink, ListFilterFullscreen, ListFilterZoom, ListFilterRotate, Settings as SettingsIcon } from '@/components/Icons';
import { LiteratureLibrary } from '@/components/LiteratureLibrary';
import { KnowledgeBaseConfig } from '@/components/KnowledgeBaseConfig';
import { RetrievalTesting } from '@/components/RetrievalTesting';
import { HallucinationMonitoring } from '@/components/HallucinationMonitoring';
import { HallucinationOverview } from '@/components/HallucinationOverview';
import { HallucinationTrends } from '@/components/HallucinationTrends';
import { CategoryAnalysis } from '@/components/CategoryAnalysis';
import { ModelPerformance } from '@/components/ModelPerformance';
import { AlertManagement } from '@/components/AlertManagement';
import { SystemPerformance } from '@/components/SystemPerformance';
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
export default function RAGSystemManagement(props) {
  const {
    $w,
    style
  } = props;
  const {
    toast
  } = useToast();
  const [activeTab, setActiveTab] = React.useState('literature');
  const [isLoading, setIsLoading] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [notifications, setNotifications] = React.useState([{
    id: 1,
    title: '文献库更新',
    message: '新增100篇医学文献到知识库',
    time: '10分钟前',
    read: false
  }, {
    id: 2,
    title: '幻觉检测警报',
    message: '检测到3个高置信度幻觉',
    time: '1小时前',
    read: false
  }, {
    id: 3,
    title: '系统性能优化',
    message: '检索性能提升15%',
    time: '2小时前',
    read: true
  }]);
  const handleTabChange = value => {
    setActiveTab(value);
    toast({
      title: "页面切换",
      description: `已切换到${value === 'literature' ? '文献库' : value === 'knowledge' ? '知识库配置' : value === 'testing' ? '检索测试' : value === 'hallucination' ? '幻觉监控' : value === 'overview' ? '总览' : value === 'trends' ? '趋势分析' : value === 'category' ? '分类分析' : value === 'performance' ? '模型性能' : value === 'alerts' ? '警报管理' : '系统性能'}页面`
    });
  };
  const handleSearch = query => {
    setSearchQuery(query);
    toast({
      title: "搜索",
      description: `正在搜索: ${query}`
    });
  };
  const handleNotificationClick = notification => {
    setNotifications(prev => prev.map(n => n.id === notification.id ? {
      ...n,
      read: true
    } : n));
    toast({
      title: "通知",
      description: notification.message
    });
  };
  const unreadCount = notifications.filter(n => !n.read).length;
  return <div style={style} className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <ErrorBoundary>
        <div className="max-w-7xl mx-auto p-4">
          {/* Header */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-600 rounded-lg">
                  <Database className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">RAG系统管理</h1>
                  <p className="text-gray-600">检索增强生成系统管理与监控</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <SearchBar onSearch={handleSearch} placeholder="搜索文献、配置..." />
                <NotificationBell notifications={notifications} onNotificationClick={handleNotificationClick} />
                <Button variant="outline" className="flex items-center space-x-2">
                  <SettingsIcon className="h-4 w-4" />
                  <span>设置</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
            <TabsList className="grid w-full grid-cols-6 bg-white p-1 rounded-lg shadow">
              <TabsTrigger value="literature" className="flex items-center space-x-2">
                <BookOpen className="h-4 w-4" />
                <span>文献库</span>
              </TabsTrigger>
              <TabsTrigger value="knowledge" className="flex items-center space-x-2">
                <Database className="h-4 w-4" />
                <span>知识库配置</span>
              </TabsTrigger>
              <TabsTrigger value="testing" className="flex items-center space-x-2">
                <Search className="h-4 w-4" />
                <span>检索测试</span>
              </TabsTrigger>
              <TabsTrigger value="hallucination" className="flex items-center space-x-2">
                <AlertTriangle className="h-4 w-4" />
                <span>幻觉监控</span>
              </TabsTrigger>
              <TabsTrigger value="overview" className="flex items-center space-x-2">
                <BarChart3 className="h-4 w-4" />
                <span>总览</span>
              </TabsTrigger>
              <TabsTrigger value="system" className="flex items-center space-x-2">
                <Server className="h-4 w-4" />
                <span>系统性能</span>
              </TabsTrigger>
            </TabsList>

            {/* Tab Contents */}
            <TabsContent value="literature" className="space-y-6">
              {isLoading ? <LoadingOverlay /> : <LiteratureLibrary $w={$w} />}
            </TabsContent>

            <TabsContent value="knowledge" className="space-y-6">
              {isLoading ? <LoadingOverlay /> : <KnowledgeBaseConfig $w={$w} />}
            </TabsContent>

            <TabsContent value="testing" className="space-y-6">
              {isLoading ? <LoadingOverlay /> : <RetrievalTesting $w={$w} />}
            </TabsContent>

            <TabsContent value="hallucination" className="space-y-6">
              {isLoading ? <LoadingOverlay /> : <HallucinationMonitoring $w={$w} />}
            </TabsContent>

            <TabsContent value="overview" className="space-y-6">
              {isLoading ? <LoadingOverlay /> : <HallucinationOverview $w={$w} />}
            </TabsContent>

            <TabsContent value="trends" className="space-y-6">
              {isLoading ? <LoadingOverlay /> : <HallucinationTrends $w={$w} />}
            </TabsContent>

            <TabsContent value="category" className="space-y-6">
              {isLoading ? <LoadingOverlay /> : <CategoryAnalysis $w={$w} />}
            </TabsContent>

            <TabsContent value="performance" className="space-y-6">
              {isLoading ? <LoadingOverlay /> : <ModelPerformance $w={$w} />}
            </TabsContent>

            <TabsContent value="alerts" className="space-y-6">
              {isLoading ? <LoadingOverlay /> : <AlertManagement $w={$w} />}
            </TabsContent>

            <TabsContent value="system" className="space-y-6">
              {isLoading ? <LoadingOverlay /> : <SystemPerformance $w={$w} />}
            </TabsContent>
          </Tabs>
        </div>
      </ErrorBoundary>
    </div>;
}