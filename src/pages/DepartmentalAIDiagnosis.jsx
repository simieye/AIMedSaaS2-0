// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Badge, Tabs, TabsContent, TabsList, TabsTrigger, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, useToast, Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui';
// @ts-ignore;
import { Brain, Users, Activity, Settings, Database, Shield, BarChart3, Calendar, AlertTriangle, CheckCircle, TrendingUp, Clock, Zap, Target, FileText, Heart, Stethoscope, Pill, Microscope, Building, CreditCard, BookOpen, Search, Filter, Download, Upload, RefreshCw, Plus, Edit, Trash2, Eye, ChevronRight, Globe, Lock, Key, UserCheck, Server, Cpu, HardDrive, Wifi, Battery, Thermometer, Wind, Handshake, DollarSign, FileContract, Route, MapPin, Timeline, GanttChart, GitBranch, Layers, Network, PieChart, LineChart, AreaChart, ScatterChart, RadarChart, TreePine, Package, Code, Terminal, Monitor, Smartphone, Tablet, Cloud, Bell, BellRing, BellOff, Volume2, VolumeX, Play, Pause, SkipForward, SkipBack, Repeat, Shuffle, Mic, MicOff, Video, VideoOff, Phone, PhoneOff, Mail, MailOpen, Send, Paperclip, PaperclipOff, Image, ImageOff, File, FilePlus, FileMinus, FileCheck, FileX, FileSearch, FileSignature, FileInput, FileOutput, FileDown, FileUp, FileCopy, FileMove, FileRename, FileDelete, FileArchive, FileUnarchive, FileLock, FileUnlock, FileQuestion, FileWarning, FileError, FileDone, FilePending, FileProcessing, FileUploading, FileDownloading, FileSync, FileSyncing, FileRefresh, FileRefreshCw, FileRefreshCcw, FileRotate, FileRotateCw, FileRotateCcw, FileFlip, FileFlipHorizontal, FileFlipVertical, FileZoomIn, FileZoomOut, FileMaximize, FileMinimize, FileExpand, FileShrink, FileFull, FileEmpty, Home, Layout, Grid, List, MoreHorizontal, MoreVertical, Menu, X, ChevronLeft, ChevronDown, ChevronUp, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, ArrowDownRight, ArrowUpLeft, ArrowDownLeft, DoubleArrowUp, DoubleArrowDown, DoubleArrowLeft, DoubleArrowRight, Minimize, Maximize, Expand, Shrink, Fullscreen, ExitFullscreen, ZoomIn, ZoomOut, RotateCw, RotateCcw, Sun, Moon, CloudRain, CloudSnow, CloudDrizzle, CloudLightning, Umbrella, Droplets, Gauge, Fuel, Power, PowerOff, Plug, PlugZap, Unplug, Signal, SignalHigh, SignalLow, SignalMedium, SignalZero, Radio, RadioTower, Broadcast, Satellite, Radar, Waves, HeartPulse, HeartHandshake, Lungs, Bone, Ear, EarOff, EyeOff, Nose, Mouth, Smile, Frown, Meh, Angry, Dizzy, Confused, Surprised, Kiss, Grin, Laugh, Wink, FrownOpen, Grimace, Tongue, TongueWink, Star, StarHalf, StarOff, HeartOff, ThumbsUp, ThumbsDown, MessageSquare, MessageCircle, MessageSquarePlus, MessageSquareMinus, MessageSquareQuote, MessageSquareDashed, MessageSquareText, MessageSquareCode, MessageSquareShare, MessageSquareMore, Reply, ReplyAll, Forward, Forwarded, Share, Share2, SendToBack, BringToFront, AlignLeft, AlignCenter, AlignRight, AlignJustify, AlignStart, AlignEnd, Indent, Outdent, ListOrdered, ListChecks, ListTodo, ListMinus, ListPlus, ListX, ListVideo, ListMusic, ListEnd, ListStart, ListCollapse, ListFilter, ListFilterPlus, ListFilterMinus, ListFilterX, ListFilter2, ListFilter3, ListFilter4, ListFilter5, ListFilter6, ListFilter7, ListFilter8, ListFilter9, ListFilter0, ListFilterDot, ListFilterSquare, ListFilterCircle, ListFilterTriangle, ListFilterHexagon, ListFilterOctagon, ListFilterDiamond, ListFilterPentagon, ListFilterStar, ListFilterHeart, ListFilterFlower, ListFilterLeaf, ListFilterCloud, ListFilterSun, ListFilterMoon, ListFilterRain, ListFilterSnow, ListFilterLightning, ListFilterUmbrella, ListFilterDroplets, ListFilterGauge, ListFilterFuel, ListFilterZap, ListFilterBattery, ListFilterPower, ListFilterPlug, ListFilterWifi, ListFilterSignal, ListFilterRadio, ListFilterBroadcast, ListFilterSatellite, ListFilterRadar, ListFilterWaves, ListFilterActivity, ListFilterHeartPulse, ListFilterLungs, ListFilterBone, ListFilterEar, ListFilterNose, ListFilterMouth, ListFilterSmile, ListFilterFrown, ListFilterMeh, ListFilterAngry, ListFilterDizzy, ListFilterConfused, ListFilterSurprised, ListFilterKiss, ListFilterGrin, ListFilterLaugh, ListFilterWink, ListFilterTongue, ListFilterThumbs, ListFilterMessage, ListFilterReply, ListFilterForward, ListFilterShare, ListFilterSend, ListFilterAlign, ListFilterIndent, ListFilterList, ListFilterCollapse, ListFilterTree, ListFilterChevron, ListFilterArrow, ListFilterDoubleArrow, ListFilterMinimize, ListFilterMaximize, ListFilterExpand, ListFilterShrink, ListFilterFullscreen, ListFilterZoom, ListFilterRotate } from 'lucide-react';

import { AIDiagnosisWorkspace } from '@/components/AIDiagnosisWorkspace';
import { DiagnosisHistory } from '@/components/DiagnosisHistory';
import { MedicalKnowledgeBase } from '@/components/MedicalKnowledgeBase';
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
export default function DepartmentalAIDiagnosis(props) {
  const {
    $w,
    style
  } = props;
  const {
    toast
  } = useToast();
  const [activeTab, setActiveTab] = React.useState('workspace');
  const [selectedDepartment, setSelectedDepartment] = React.useState('cardiology');
  const [isLoading, setIsLoading] = React.useState(false);
  const departments = [{
    id: 'cardiology',
    name: '心内科',
    icon: Heart,
    color: 'text-red-600',
    bgColor: 'bg-red-100'
  }, {
    id: 'neurology',
    name: '神经内科',
    icon: Brain,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100'
  }, {
    id: 'respiratory',
    name: '呼吸内科',
    icon: Wind,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100'
  }, {
    id: 'orthopedics',
    name: '骨科',
    icon: Bone,
    color: 'text-green-600',
    bgColor: 'bg-green-100'
  }];
  const handleTabChange = value => {
    setActiveTab(value);
    toast({
      title: "页面切换",
      description: `已切换到${value === 'workspace' ? 'AI工作台' : value === 'history' ? '诊断历史' : '知识库'}页面`
    });
  };
  const handleDepartmentChange = value => {
    setSelectedDepartment(value);
    toast({
      title: "科室切换",
      description: `已切换到${departments.find(d => d.id === value)?.name}`
    });
  };
  const currentDepartment = departments.find(d => d.id === selectedDepartment);
  return <div style={style} className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <ErrorBoundary>
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-lg ${currentDepartment?.bgColor}`}>
                  <currentDepartment.icon className={`h-8 w-8 ${currentDepartment?.color}`} />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">科室AI诊断</h1>
                  <p className="text-gray-600">{currentDepartment?.name}智能诊断系统</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Select value={selectedDepartment} onValueChange={handleDepartmentChange}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="选择科室" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map(dept => <SelectItem key={dept.id} value={dept.id}>
                        {dept.name}
                      </SelectItem>)}
                  </SelectContent>
                </Select>
                <SearchBar placeholder="搜索患者或诊断记录..." />
                <NotificationBell />
              </div>
            </div>
          </div>

          {/* Department Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">今日诊断</p>
                    <p className="text-2xl font-bold text-gray-900">47</p>
                  </div>
                  <Activity className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">准确率</p>
                    <p className="text-2xl font-bold text-gray-900">96.2%</p>
                  </div>
                  <Target className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">待审核</p>
                    <p className="text-2xl font-bold text-gray-900">12</p>
                  </div>
                  <Clock className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">平均耗时</p>
                    <p className="text-2xl font-bold text-gray-900">2.3s</p>
                  </div>
                  <Zap className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Navigation Tabs */}
          <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 bg-white p-1 rounded-lg shadow">
              <TabsTrigger value="workspace" className="flex items-center space-x-2">
                <Brain className="h-4 w-4" />
                <span>AI工作台</span>
              </TabsTrigger>
              <TabsTrigger value="history" className="flex items-center space-x-2">
                <FileText className="h-4 w-4" />
                <span>诊断历史</span>
              </TabsTrigger>
              <TabsTrigger value="knowledge" className="flex items-center space-x-2">
                <BookOpen className="h-4 w-4" />
                <span>知识库</span>
              </TabsTrigger>
            </TabsList>

            {/* Tab Contents */}
            <TabsContent value="workspace" className="space-y-6">
              {isLoading ? <LoadingOverlay /> : <AIDiagnosisWorkspace $w={$w} department={selectedDepartment} />}
            </TabsContent>

            <TabsContent value="history" className="space-y-6">
              {isLoading ? <LoadingOverlay /> : <DiagnosisHistory $w={$w} department={selectedDepartment} />}
            </TabsContent>

            <TabsContent value="knowledge" className="space-y-6">
              {isLoading ? <LoadingOverlay /> : <MedicalKnowledgeBase $w={$w} department={selectedDepartment} />}
            </TabsContent>
          </Tabs>
        </div>
      </ErrorBoundary>
    </div>;
}