// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Badge, Tabs, TabsContent, TabsList, TabsTrigger, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, useToast, Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui';
// @ts-ignore;
import { Brain, Users, Activity, Settings, Database, Shield, BarChart3, Calendar, AlertTriangle, CheckCircle, TrendingUp, Clock, Zap, Target, FileText, Heart, Stethoscope, Pill, Microscope, Building, CreditCard, BookOpen, Search, Filter, Download, Upload, RefreshCw, Plus, Edit, Trash2, ChevronRight, Globe, Lock, Key, UserCheck, Server, Cpu, HardDrive, Wifi, Battery, Thermometer, Wind, Handshake, DollarSign, FileContract, Route, MapPin, Timeline, GanttChart, GitBranch, Layers, Network, PieChart, LineChart, AreaChart, ScatterChart, RadarChart, TreePine, Package, Code, Terminal, Monitor, Smartphone, Tablet, Cloud, Bell, BellRing, BellOff, Volume2, VolumeX, Play, Pause, SkipForward, SkipBack, Repeat, Shuffle, Mic, MicOff, Video, VideoOff, Phone, PhoneOff, Mail, MailOpen, Send, Paperclip, PaperclipOff, Image, ImageOff, File, FilePlus, FileMinus, FileCheck, FileX, FileSearch, FileSignature, FileInput, FileOutput, FileDown, FileUp, FileCopy, FileMove, FileRename, FileDelete, FileArchive, FileUnarchive, FileLock, FileUnlock, FileQuestion, FileWarning, FileError, FileDone, FilePending, FileProcessing, FileUploading, FileDownloading, FileSync, FileSyncing, FileRefresh, FileRefreshCw, FileRefreshCcw, FileRotate, FileRotateCw, FileRotateCcw, FileFlip, FileFlipHorizontal, FileFlipVertical, FileZoomIn, FileZoomOut, FileMaximize, FileMinimize, FileExpand, FileShrink, FileFull, FileEmpty, Home, Layout, Grid, List, MoreHorizontal, MoreVertical, Menu, X, ChevronLeft, ChevronDown, ChevronUp, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, ArrowDownRight, ArrowUpLeft, ArrowDownLeft, DoubleArrowUp, DoubleArrowDown, DoubleArrowLeft, DoubleArrowRight, Minimize, Maximize, Expand, Shrink, Fullscreen, ExitFullscreen, ZoomIn, ZoomOut, RotateCw, RotateCcw, Sun, Moon, CloudRain, CloudSnow, CloudDrizzle, CloudLightning, Umbrella, Droplets, Gauge, Fuel, Power, PowerOff, Plug, PlugZap, Unplug, Signal, SignalHigh, SignalLow, SignalMedium, SignalZero, Radio, RadioTower, Broadcast, Satellite, Radar, Waves, HeartPulse, HeartHandshake, Lungs, Bone, Ear, EarOff, EyeOff, Nose, Mouth, Smile, Frown, Meh, Angry, Dizzy, Confused, Surprised, Kiss, Grin, Laugh, Wink, FrownOpen, Grimace, Tongue, TongueWink, Star, StarHalf, StarOff, HeartOff, ThumbsUp, ThumbsDown, MessageSquare, MessageCircle, MessageSquarePlus, MessageSquareMinus, MessageSquareQuote, MessageSquareDashed, MessageSquareText, MessageSquareCode, MessageSquareShare, MessageSquareMore, Reply, ReplyAll, Forward, Forwarded, Share, Share2, SendToBack, BringToFront, AlignLeft, AlignCenter, AlignRight, AlignJustify, AlignStart, AlignEnd, Indent, Outdent, ListOrdered, ListChecks, ListTodo, ListMinus, ListPlus, ListX, ListVideo, ListMusic, ListEnd, ListStart, ListCollapse, ListFilter, ListFilterPlus, ListFilterMinus, ListFilterX, ListFilter2, ListFilter3, ListFilter4, ListFilter5, ListFilter6, ListFilter7, ListFilter8, ListFilter9, ListFilter0, ListFilterDot, ListFilterSquare, ListFilterCircle, ListFilterTriangle, ListFilterHexagon, ListFilterOctagon, ListFilterDiamond, ListFilterPentagon, ListFilterStar, ListFilterHeart, ListFilterFlower, ListFilterLeaf, ListFilterCloud, ListFilterSun, ListFilterMoon, ListFilterRain, ListFilterSnow, ListFilterLightning, ListFilterUmbrella, ListFilterDroplets, ListFilterGauge, ListFilterFuel, ListFilterZap, ListFilterBattery, ListFilterPower, ListFilterPlug, ListFilterWifi, ListFilterSignal, ListFilterRadio, ListFilterBroadcast, ListFilterSatellite, ListFilterRadar, ListFilterWaves, ListFilterActivity, ListFilterHeartPulse, ListFilterLungs, ListFilterBone, ListFilterEar, ListFilterNose, ListFilterMouth, ListFilterSmile, ListFilterFrown, ListFilterMeh, ListFilterAngry, ListFilterDizzy, ListFilterConfused, ListFilterSurprised, ListFilterKiss, ListFilterGrin, ListFilterLaugh, ListFilterWink, ListFilterTongue, ListFilterThumbs, ListFilterMessage, ListFilterReply, ListFilterForward, ListFilterShare, ListFilterSend, ListFilterAlign, ListFilterIndent, ListFilterList, ListFilterCollapse, ListFilterTree, ListFilterChevron, ListFilterArrow, ListFilterDoubleArrow, ListFilterMinimize, ListFilterMaximize, ListFilterExpand, ListFilterShrink, ListFilterFullscreen, ListFilterZoom, ListFilterRotate } from 'lucide-react';

import { MedAIDashboard } from '@/components/MedAIDashboard';
import { PatientManagement } from '@/components/PatientManagement';
import { DoctorManagement } from '@/components/DoctorManagement';
import { AIWorkspace } from '@/components/AIWorkspace';
import { SystemSettings } from '@/components/SystemSettings';
import { AnalyticsReports } from '@/components/AnalyticsReports';
export default function MedAIPlatform(props) {
  const {
    $w,
    style
  } = props;
  const {
    toast
  } = useToast();
  const [activeTab, setActiveTab] = React.useState('dashboard');
  const [isLoading, setIsLoading] = React.useState(false);
  const handleTabChange = value => {
    setActiveTab(value);
    toast({
      title: "页面切换",
      description: `已切换到${value === 'dashboard' ? '仪表板' : value === 'patients' ? '患者管理' : value === 'doctors' ? '医生管理' : value === 'ai-workspace' ? 'AI工作台' : value === 'analytics' ? '分析报告' : '系统设置'}页面`
    });
  };
  return <div style={style} className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-600 rounded-lg">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">MedAI Platform</h1>
                <p className="text-gray-600">智能医疗AI管理平台</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" className="flex items-center space-x-2">
                <Bell className="h-4 w-4" />
                <span>通知</span>
                <Badge variant="destructive" className="ml-2">3</Badge>
              </Button>
              <Button variant="outline" className="flex items-center space-x-2">
                <Settings className="h-4 w-4" />
                <span>设置</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-white p-1 rounded-lg shadow">
            <TabsTrigger value="dashboard" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>仪表板</span>
            </TabsTrigger>
            <TabsTrigger value="patients" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>患者管理</span>
            </TabsTrigger>
            <TabsTrigger value="doctors" className="flex items-center space-x-2">
              <Stethoscope className="h-4 w-4" />
              <span>医生管理</span>
            </TabsTrigger>
            <TabsTrigger value="ai-workspace" className="flex items-center space-x-2">
              <Brain className="h-4 w-4" />
              <span>AI工作台</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4" />
              <span>分析报告</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center space-x-2">
              <Settings className="h-4 w-4" />
              <span>系统设置</span>
            </TabsTrigger>
          </TabsList>

          {/* Tab Contents */}
          <TabsContent value="dashboard" className="space-y-6">
            <MedAIDashboard $w={$w} />
          </TabsContent>

          <TabsContent value="patients" className="space-y-6">
            <PatientManagement $w={$w} />
          </TabsContent>

          <TabsContent value="doctors" className="space-y-6">
            <DoctorManagement $w={$w} />
          </TabsContent>

          <TabsContent value="ai-workspace" className="space-y-6">
            <AIWorkspace $w={$w} />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <AnalyticsReports $w={$w} />
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <SystemSettings $w={$w} />
          </TabsContent>
        </Tabs>
      </div>
    </div>;
}