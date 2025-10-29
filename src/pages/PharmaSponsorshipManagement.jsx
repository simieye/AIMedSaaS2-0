// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Badge, Tabs, TabsContent, TabsList, TabsTrigger, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, useToast, Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui';
// @ts-ignore;
import { Brain, Users, Activity, Settings, Database, Shield, BarChart3, Calendar, AlertTriangle, CheckCircle, TrendingUp, Clock, Zap, Target, FileText, Heart, Stethoscope, Pill, Microscope, Building, CreditCard, BookOpen, Search, Filter, Download, Upload, RefreshCw, Plus, Edit, Trash2, Eye, ChevronRight, Globe, Lock, Key, UserCheck, Server, Cpu, HardDrive, Wifi, Battery, Thermometer, Wind, Handshake, DollarSign, FileContract, Route, MapPin, Timeline, GanttChart, GitBranch, Layers, Network, PieChart, LineChart, AreaChart, ScatterChart, RadarChart, TreePine, Package, Code, Terminal, Monitor, Smartphone, Tablet, Cloud, Bell, BellRing, BellOff, Volume2, VolumeX, Play, Pause, SkipForward, SkipBack, Repeat, Shuffle, Mic, MicOff, Video, VideoOff, Phone, PhoneOff, Mail, MailOpen, Send, Paperclip, PaperclipOff, Image, ImageOff, File, FilePlus, FileMinus, FileCheck, FileX, FileSearch, FileSignature, FileInput, FileOutput, FileDown, FileUp, FileCopy, FileMove, FileRename, FileDelete, FileArchive, FileUnarchive, FileLock, FileUnlock, FileQuestion, FileWarning, FileError, FileDone, FilePending, FileProcessing, FileUploading, FileDownloading, FileSync, FileSyncing, FileRefresh, FileRefreshCw, FileRefreshCcw, FileRotate, FileRotateCw, FileRotateCcw, FileFlip, FileFlipHorizontal, FileFlipVertical, FileZoomIn, FileZoomOut, FileMaximize, FileMinimize, FileExpand, FileShrink, FileFull, FileEmpty, Home, Layout, Grid, List, MoreHorizontal, MoreVertical, Menu, X, ChevronLeft, ChevronDown, ChevronUp, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, ArrowDownRight, ArrowUpLeft, ArrowDownLeft, DoubleArrowUp, DoubleArrowDown, DoubleArrowLeft, DoubleArrowRight, Minimize, Maximize, Expand, Shrink, Fullscreen, ExitFullscreen, ZoomIn, ZoomOut, RotateCw, RotateCcw, Sun, Moon, CloudRain, CloudSnow, CloudDrizzle, CloudLightning, Umbrella, Droplets, Gauge, Fuel, Power, PowerOff, Plug, PlugZap, Unplug, Signal, SignalHigh, SignalLow, SignalMedium, SignalZero, Radio, RadioTower, Broadcast, Satellite, Radar, Waves, HeartPulse, HeartHandshake, Lungs, Bone, Ear, EarOff, EyeOff, Nose, Mouth, Smile, Frown, Meh, Angry, Dizzy, Confused, Surprised, Kiss, Grin, Laugh, Wink, FrownOpen, Grimace, Tongue, TongueWink, Star, StarHalf, StarOff, HeartOff, ThumbsUp, ThumbsDown, MessageSquare, MessageCircle, MessageSquarePlus, MessageSquareMinus, MessageSquareQuote, MessageSquareDashed, MessageSquareText, MessageSquareCode, MessageSquareShare, MessageSquareMore, Reply, ReplyAll, Forward, Forwarded, Share, Share2, SendToBack, BringToFront, AlignLeft, AlignCenter, AlignRight, AlignJustify, AlignStart, AlignEnd, Indent, Outdent, ListOrdered, ListChecks, ListTodo, ListMinus, ListPlus, ListX, ListVideo, ListMusic, ListEnd, ListStart, ListCollapse, ListFilter, ListFilterPlus, ListFilterMinus, ListFilterX, ListFilter2, ListFilter3, ListFilter4, ListFilter5, ListFilter6, ListFilter7, ListFilter8, ListFilter9, ListFilter0, ListFilterDot, ListFilterSquare, ListFilterCircle, ListFilterTriangle, ListFilterHexagon, ListFilterOctagon, ListFilterDiamond, ListFilterPentagon, ListFilterStar, ListFilterHeart, ListFilterFlower, ListFilterLeaf, ListFilterCloud, ListFilterSun, ListFilterMoon, ListFilterRain, ListFilterSnow, ListFilterLightning, ListFilterUmbrella, ListFilterDroplets, ListFilterGauge, ListFilterFuel, ListFilterZap, ListFilterBattery, ListFilterPower, ListFilterPlug, ListFilterWifi, ListFilterSignal, ListFilterRadio, ListFilterBroadcast, ListFilterSatellite, ListFilterRadar, ListFilterWaves, ListFilterActivity, ListFilterHeartPulse, ListFilterLungs, ListFilterBone, ListFilterEar, ListFilterNose, ListFilterMouth, ListFilterSmile, ListFilterFrown, ListFilterMeh, ListFilterAngry, ListFilterDizzy, ListFilterConfused, ListFilterSurprised, ListFilterKiss, ListFilterGrin, ListFilterLaugh, ListFilterWink, ListFilterTongue, ListFilterThumbs, ListFilterMessage, ListFilterReply, ListFilterForward, ListFilterShare, ListFilterSend, ListFilterAlign, ListFilterIndent, ListFilterList, ListFilterCollapse, ListFilterTree, ListFilterChevron, ListFilterArrow, ListFilterDoubleArrow, ListFilterMinimize, ListFilterMaximize, ListFilterExpand, ListFilterShrink, ListFilterFullscreen, ListFilterZoom, ListFilterRotate } from 'lucide-react';

import { SponsorList } from '@/components/SponsorList';
import { SponsorshipProjects } from '@/components/SponsorshipProjects';
import { AnalyticsDashboard } from '@/components/AnalyticsDashboard';
import { FinancialManagement } from '@/components/FinancialManagement';
import { AdPositionManagement } from '@/components/AdPositionManagement';
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
export default function PharmaSponsorshipManagement(props) {
  const {
    $w,
    style
  } = props;
  const {
    toast
  } = useToast();
  const [activeTab, setActiveTab] = React.useState('sponsors');
  const [isLoading, setIsLoading] = React.useState(false);
  const handleTabChange = value => {
    setActiveTab(value);
    toast({
      title: "页面切换",
      description: `已切换到${value === 'sponsors' ? '赞助商管理' : value === 'projects' ? '赞助项目' : value === 'analytics' ? '数据分析' : value === 'financial' ? '财务管理' : '广告位管理'}页面`
    });
  };
  return <div style={style} className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <ErrorBoundary>
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-600 rounded-lg">
                  <DollarSign className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">医药赞助管理</h1>
                  <p className="text-gray-600">赞助商合作和项目管理平台</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <SearchBar placeholder="搜索赞助商或项目..." />
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
            <TabsList className="grid w-full grid-cols-5 bg-white p-1 rounded-lg shadow">
              <TabsTrigger value="sponsors" className="flex items-center space-x-2">
                <Building className="h-4 w-4" />
                <span>赞助商管理</span>
              </TabsTrigger>
              <TabsTrigger value="projects" className="flex items-center space-x-2">
                <Target className="h-4 w-4" />
                <span>赞助项目</span>
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center space-x-2">
                <BarChart3 className="h-4 w-4" />
                <span>数据分析</span>
              </TabsTrigger>
              <TabsTrigger value="financial" className="flex items-center space-x-2">
                <CreditCard className="h-4 w-4" />
                <span>财务管理</span>
              </TabsTrigger>
              <TabsTrigger value="ads" className="flex items-center space-x-2">
                <Globe className="h-4 w-4" />
                <span>广告位管理</span>
              </TabsTrigger>
            </TabsList>

            {/* Tab Contents */}
            <TabsContent value="sponsors" className="space-y-6">
              {isLoading ? <LoadingOverlay /> : <SponsorList $w={$w} />}
            </TabsContent>

            <TabsContent value="projects" className="space-y-6">
              {isLoading ? <LoadingOverlay /> : <SponsorshipProjects $w={$w} />}
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              {isLoading ? <LoadingOverlay /> : <AnalyticsDashboard $w={$w} />}
            </TabsContent>

            <TabsContent value="financial" className="space-y-6">
              {isLoading ? <LoadingOverlay /> : <FinancialManagement $w={$w} />}
            </TabsContent>

            <TabsContent value="ads" className="space-y-6">
              {isLoading ? <LoadingOverlay /> : <AdPositionManagement $w={$w} />}
            </TabsContent>
          </Tabs>
        </div>
      </ErrorBoundary>
    </div>;
}