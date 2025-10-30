// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Badge, Tabs, TabsContent, TabsList, TabsTrigger, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, useToast, Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui';

// @ts-ignore;
import { Brain, Users, Activity, Database, Shield, BarChart3, Calendar, AlertTriangle, CheckCircle, TrendingUp, Clock, Zap, Target, FileText, Heart, Stethoscope, Pill, Microscope, Building, CreditCard, BookOpen, Search, Filter, Download, Upload, RefreshCw, Plus, Edit, Trash2, Eye, ChevronRight, Globe, Lock, Key, UserCheck, Server, Cpu, HardDrive, Wifi, Battery, Thermometer, Wind, Handshake, DollarSign, FileContract, Route, MapPin, Timeline, GanttChart, GitBranch, Layers, Network, PieChart, LineChart, AreaChart, ScatterChart, RadarChart, TreePine, Package, Code, Terminal, Monitor, Smartphone, Tablet, Cloud, Bell, BellRing, BellOff, Volume2, VolumeX, Play, Pause, SkipForward, SkipBack, Repeat, Shuffle, Mic, MicOff, Video, VideoOff, Phone, PhoneOff, Mail, MailOpen, Send, Paperclip, PaperclipOff, Image, ImageOff, File, FilePlus, FileMinus, FileCheck, FileX, FileSearch, FileSignature, FileInput, FileOutput, FileDown, FileUp, FileCopy, FileMove, FileRename, FileDelete, FileArchive, FileUnarchive, FileLock, FileUnlock, FileQuestion, FileWarning, FileError, FileDone, FilePending, FileProcessing, FileUploading, FileDownloading, FileSync, FileSyncing, FileRefresh, FileRefreshCw, FileRefreshCcw, FileRotate, FileRotateCw, FileRotateCcw, FileFlip, FileFlipHorizontal, FileFlipVertical, FileZoomIn, FileZoomOut, FileMaximize, FileMinimize, FileExpand, FileShrink, FileFull, FileEmpty, Home, Layout, Grid, List, MoreHorizontal, MoreVertical, Menu, X, ChevronLeft, ChevronDown, ChevronUp, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, ArrowDownRight, ArrowUpLeft, ArrowDownLeft, DoubleArrowUp, DoubleArrowDown, DoubleArrowLeft, DoubleArrowRight, Minimize, Maximize, Expand, Shrink, Fullscreen, ExitFullscreen, ZoomIn, ZoomOut, RotateCw, RotateCcw, Sun, Moon, CloudRain, CloudSnow, CloudDrizzle, CloudLightning, Umbrella, Droplets, Gauge, Fuel, Power, PowerOff, Plug, PlugZap, Unplug, Signal, SignalHigh, SignalLow, SignalMedium, SignalZero, Radio, RadioTower, Broadcast, Satellite, Radar, Waves, HeartPulse, HeartHandshake, Lungs, Bone, Ear, EarOff, EyeOff, Nose, Mouth, Smile, Frown, Meh, Angry, Dizzy, Confused, Surprised, Kiss, Grin, Laugh, Wink, FrownOpen, Grimace, Tongue, TongueWink, Star, StarHalf, StarOff, HeartOff, ThumbsUp, ThumbsDown, MessageSquare, MessageCircle, MessageSquarePlus, MessageSquareMinus, MessageSquareQuote, MessageSquareDashed, MessageSquareText, MessageSquareCode, MessageSquareShare, MessageSquareMore, Reply, ReplyAll, Forward, Forwarded, Share, Share2, SendToBack, BringToFront, AlignLeft, AlignCenter, AlignRight, AlignJustify, AlignStart, AlignEnd, Indent, Outdent, ListOrdered, ListChecks, ListTodo, ListMinus, ListPlus, ListX, ListVideo, ListMusic, ListEnd, ListStart, ListCollapse, ListFilter, ListFilterPlus, ListFilterMinus, ListFilterX, ListFilter2, ListFilter3, ListFilter4, ListFilter5, ListFilter6, ListFilter7, ListFilter8, ListFilter9, ListFilter0, ListFilterDot, ListFilterSquare, ListFilterCircle, ListFilterTriangle, ListFilterHexagon, ListFilterOctagon, ListFilterDiamond, ListFilterPentagon, ListFilterStar, ListFilterHeart, ListFilterFlower, ListFilterLeaf, ListFilterCloud, ListFilterSun, ListFilterMoon, ListFilterRain, ListFilterSnow, ListFilterLightning, ListFilterUmbrella, ListFilterDroplets, ListFilterGauge, ListFilterFuel, ListFilterZap, ListFilterBattery, ListFilterPower, ListFilterPlug, ListFilterWifi, ListFilterSignal, ListFilterRadio, ListFilterBroadcast, ListFilterSatellite, ListFilterRadar, ListFilterWaves, ListFilterActivity, ListFilterHeartPulse, ListFilterLungs, ListFilterBone, ListFilterEar, ListFilterNose, ListFilterMouth, ListFilterSmile, ListFilterFrown, ListFilterMeh, ListFilterAngry, ListFilterDizzy, ListFilterConfused, ListFilterSurprised, ListFilterKiss, ListFilterGrin, ListFilterLaugh, ListFilterWink, ListFilterTongue, ListFilterThumbs, ListFilterMessage, ListFilterReply, ListFilterForward, ListFilterShare, ListFilterSend, ListFilterAlign, ListFilterIndent, ListFilterList, ListFilterCollapse, ListFilterTree, ListFilterChevron, ListFilterArrow, ListFilterDoubleArrow, ListFilterMinimize, ListFilterMaximize, ListFilterExpand, ListFilterShrink, ListFilterFullscreen, ListFilterZoom, ListFilterRotate, Settings as SettingsIcon } from '@/components/Icons';
import { Dashboard } from '@/components/Dashboard';
import { Triage } from '@/components/Triage';
import { Reports } from '@/components/Reports';
import { Prescription } from '@/components/Prescription';
import { Settings } from '@/components/Settings';
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
export default function DoctorPortal(props) {
  const {
    $w,
    style
  } = props;
  const {
    toast
  } = useToast();
  const [activeTab, setActiveTab] = React.useState('dashboard');
  const [isLoading, setIsLoading] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [notifications, setNotifications] = React.useState([{
    id: 1,
    title: '新患者预约',
    message: '张三预约了明天上午的门诊',
    time: '5分钟前',
    read: false
  }, {
    id: 2,
    title: '诊断报告完成',
    message: '李四的AI辅助诊断报告已生成',
    time: '1小时前',
    read: false
  }, {
    id: 3,
    title: '处方审核提醒',
    message: '有3个处方需要审核',
    time: '2小时前',
    read: true
  }]);
  const handleTabChange = value => {
    setActiveTab(value);
    toast({
      title: "页面切换",
      description: `已切换到${value === 'dashboard' ? '仪表板' : value === 'triage' ? '分诊' : value === 'reports' ? '报告' : value === 'prescription' ? '处方' : '设置'}页面`
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
                  <Stethoscope className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">医生门户</h1>
                  <p className="text-gray-600">智能医疗诊断与管理平台</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <SearchBar onSearch={handleSearch} placeholder="搜索患者、诊断记录..." />
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
            <TabsList className="grid w-full grid-cols-5 bg-white p-1 rounded-lg shadow">
              <TabsTrigger value="dashboard" className="flex items-center space-x-2">
                <BarChart3 className="h-4 w-4" />
                <span>仪表板</span>
              </TabsTrigger>
              <TabsTrigger value="triage" className="flex items-center space-x-2">
                <Activity className="h-4 w-4" />
                <span>患者分诊</span>
              </TabsTrigger>
              <TabsTrigger value="reports" className="flex items-center space-x-2">
                <FileText className="h-4 w-4" />
                <span>诊断报告</span>
              </TabsTrigger>
              <TabsTrigger value="prescription" className="flex items-center space-x-2">
                <Pill className="h-4 w-4" />
                <span>处方管理</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center space-x-2">
                <SettingsIcon className="h-4 w-4" />
                <span>设置</span>
              </TabsTrigger>
            </TabsList>

            {/* Tab Contents */}
            <TabsContent value="dashboard" className="space-y-6">
              {isLoading ? <LoadingOverlay /> : <Dashboard $w={$w} />}
            </TabsContent>

            <TabsContent value="triage" className="space-y-6">
              {isLoading ? <LoadingOverlay /> : <Triage $w={$w} />}
            </TabsContent>

            <TabsContent value="reports" className="space-y-6">
              {isLoading ? <LoadingOverlay /> : <Reports $w={$w} />}
            </TabsContent>

            <TabsContent value="prescription" className="space-y-6">
              {isLoading ? <LoadingOverlay /> : <Prescription $w={$w} />}
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              {isLoading ? <LoadingOverlay /> : <Settings $w={$w} />}
            </TabsContent>
          </Tabs>
        </div>
      </ErrorBoundary>
    </div>;
}