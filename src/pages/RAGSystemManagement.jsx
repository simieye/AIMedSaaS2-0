// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Badge, Tabs, TabsContent, TabsList, TabsTrigger, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, useToast, Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui';

// @ts-ignore;
import { BookOpen, Search, Brain, FileText, Database, Settings, BarChart3, PieChart, TrendingUp, AlertTriangle, CheckCircle, Clock, Filter, Download, Upload, Plus, RefreshCw, Eye, Edit, Trash2, Zap, Target, Activity, Globe, Network, GitBranch, Layers, Cpu, HardDrive, Wifi, Battery, Thermometer, Wind, Handshake, DollarSign, FileContract, Route, MapPin, Timeline, GanttChart, Users, Calendar, Star, MessageSquare, Hash, Link, GitMerge, GitPullRequest, GitCommit, Package, Code, Terminal, Monitor, Smartphone, Tablet, Cloud, Server, Shield, Lock, Key, UserCheck, Fingerprint, Bell, BellRing, BellOff, Volume2, VolumeX, Play, Pause, SkipForward, SkipBack, Repeat, Shuffle, Mic, MicOff, Video, VideoOff, Phone, PhoneOff, Mail, MailOpen, Send, Paperclip, PaperclipOff, Image, ImageOff, File, FilePlus, FileMinus, FileCheck, FileX, FileSearch, FileSignature, FileInput, FileOutput, FileDown, FileUp, FileCopy, FileMove, FileRename, FileDelete, FileArchive, FileUnarchive, FileLock, FileUnlock, FileQuestion, FileWarning, FileError, FileDone, FilePending, FileProcessing, FileUploading, FileDownloading, FileSync, FileSyncing, FileRefresh, FileRefreshCw, FileRefreshCcw, FileRotate, FileRotateCw, FileRotateCcw, FileFlip, FileFlipHorizontal, FileFlipVertical, FileZoomIn, FileZoomOut, FileMaximize, FileMinimize, FileExpand, FileShrink, FileFull, FileEmpty, Languages, Globe2, Map, Compass, Navigation, ArrowUpRight, ArrowDownRight, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, MoreHorizontal, MoreVertical, Menu, X, Home, User, HelpCircle, Info, AlertCircle, AlertOctagon, CheckSquare, Square, MinusSquare, PlusSquare, RadioIcon, Checkbox, Triangle, Hexagon, Circle, Pentagon, Octagon, Heart, Award, Trophy, Medal, Crown, Gem, Diamond, Coins, Euro, PoundSterling, Currency, Banknote, Wallet, PiggyBank, Receipt } from '@/components/Icons';
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
    message: '新增了50篇医学文献到知识库',
    time: '10分钟前',
    read: false
  }, {
    id: 2,
    title: '检索测试完成',
    message: 'RAG检索准确率测试已完成，准确率提升3%',
    time: '1小时前',
    read: false
  }, {
    id: 3,
    title: '幻觉检测警报',
    message: '检测到模型回答中的异常模式，需要人工审核',
    time: '2小时前',
    read: true
  }]);
  const handleTabChange = value => {
    setActiveTab(value);
    toast({
      title: "页面切换",
      description: `已切换到${value === 'literature' ? '文献库' : value === 'knowledge' ? '知识库配置' : value === 'retrieval' ? '检索测试' : value === 'hallucination' ? '幻觉监控' : '系统性能'}页面`
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
                  <Brain className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">RAG系统管理</h1>
                  <p className="text-gray-600">检索增强生成与知识库管理平台</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <SearchBar onSearch={handleSearch} placeholder="搜索文献、知识库或测试记录..." />
                <NotificationBell notifications={notifications} onNotificationClick={handleNotificationClick} />
                <Button variant="outline" className="flex items-center space-x-2">
                  <Settings className="h-4 w-4" />
                  <span>设置</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
            <TabsList className="grid w-full grid-cols-5 bg-white p-1 rounded-lg shadow">
              <TabsTrigger value="literature" className="flex items-center space-x-2">
                <BookOpen className="h-4 w-4" />
                <span>文献库</span>
              </TabsTrigger>
              <TabsTrigger value="knowledge" className="flex items-center space-x-2">
                <Database className="h-4 w-4" />
                <span>知识库配置</span>
              </TabsTrigger>
              <TabsTrigger value="retrieval" className="flex items-center space-x-2">
                <Search className="h-4 w-4" />
                <span>检索测试</span>
              </TabsTrigger>
              <TabsTrigger value="hallucination" className="flex items-center space-x-2">
                <AlertTriangle className="h-4 w-4" />
                <span>幻觉监控</span>
              </TabsTrigger>
              <TabsTrigger value="performance" className="flex items-center space-x-2">
                <BarChart3 className="h-4 w-4" />
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

            <TabsContent value="retrieval" className="space-y-6">
              {isLoading ? <LoadingOverlay /> : <RetrievalTesting $w={$w} />}
            </TabsContent>

            <TabsContent value="hallucination" className="space-y-6">
              {isLoading ? <LoadingOverlay /> : <div className="space-y-6">
                  <HallucinationOverview $w={$w} />
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <HallucinationTrends $w={$w} />
                    <CategoryAnalysis $w={$w} />
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <ModelPerformance $w={$w} />
                    <AlertManagement $w={$w} />
                  </div>
                </div>}
            </TabsContent>

            <TabsContent value="performance" className="space-y-6">
              {isLoading ? <LoadingOverlay /> : <SystemPerformance $w={$w} />}
            </TabsContent>
          </Tabs>
        </div>
      </ErrorBoundary>
    </div>;
}