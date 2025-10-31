// @ts-ignore;
import React, { useState, useEffect, useCallback } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui';
// @ts-ignore;
import { Monitor, TrendingUp as TrendingUpIcon, AlertTriangle, Download, RefreshCw, Search, Filter, Eye, Settings, Activity as ActivityIcon, Zap as ZapIcon, Shield as ShieldIcon, Database as DatabaseIcon, Globe as GlobeIcon, Cpu as CpuIcon, HardDrive as HardDriveIcon, Wifi as WifiIcon, Users as UsersIcon, Clock as ClockIcon, CheckCircle as CheckCircleIcon, XCircle as XCircleIcon, AlertCircle as AlertCircleIcon, TrendingDown as TrendingDownIcon, BarChart3, PieChartIcon, LineChartIcon, FileText, Folder, Archive, Trash2, Edit, Copy, Share, Upload, Save, X, Plus, Minus, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, MoreVertical, MoreHorizontal, Menu, Home, User, Bell, Mail, Phone, MapPin, Calendar, Star, Heart, Bookmark, MessageSquare, Send, Paperclip, Image, Video, Music, File, FilePlus, FileMinus, FolderOpen, FolderPlus, FolderMinus, Lock, Unlock, Key, EyeOff, UserPlus, UserMinus, UserCheck, UserX, Users2, Building, Building2, Store, ShoppingCart, CreditCard, DollarSign } from 'lucide-react';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { IconSelector } from '@/components/Icons/IconSelector';
import { IconPreview } from '@/components/Icons/IconPreview';
import { getAllIcons, getIconStats, searchIcons, filterIconsByCategory } from '@/components/Icons';
import { getIconUsageStats, getIconPerformanceMetrics, getIconVersionHistory, exportIconData, refreshIconCache } from '@/utils/iconHelper';
export default function IconMonitoringDashboard(props) {
  const {
    $w,
    style
  } = props;
  const {
    toast
  } = useToast();
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [iconStats, setIconStats] = useState(null);
  const [usageStats, setUsageStats] = useState(null);
  const [performanceMetrics, setPerformanceMetrics] = useState(null);
  const [versionHistory, setVersionHistory] = useState([]);
  const [filteredIcons, setFilteredIcons] = useState([]);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [timeRange, setTimeRange] = useState('7d');

  // 加载图标统计数据
  const loadIconStats = useCallback(async () => {
    try {
      setLoading(true);
      const stats = await getIconStats();
      const usage = await getIconUsageStats();
      const performance = await getIconPerformanceMetrics();
      const versions = await getIconVersionHistory();
      setIconStats(stats);
      setUsageStats(usage);
      setPerformanceMetrics(performance);
      setVersionHistory(versions);
    } catch (error) {
      toast({
        title: "加载失败",
        description: "无法加载图标统计数据",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  // 搜索和过滤图标
  const handleSearch = useCallback(() => {
    let icons = getAllIcons();
    if (searchTerm) {
      icons = searchIcons(icons, searchTerm);
    }
    if (selectedCategory !== 'all') {
      icons = filterIconsByCategory(icons, selectedCategory);
    }
    setFilteredIcons(icons);
  }, [searchTerm, selectedCategory]);

  // 刷新缓存
  const handleRefreshCache = async () => {
    try {
      setLoading(true);
      await refreshIconCache();
      await loadIconStats();
      toast({
        title: "刷新成功",
        description: "图标缓存已刷新"
      });
    } catch (error) {
      toast({
        title: "刷新失败",
        description: "无法刷新图标缓存",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // 导出数据
  const handleExport = async () => {
    try {
      setLoading(true);
      const data = await exportIconData();
      // 创建下载链接
      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: 'application/json'
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `icon-data-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast({
        title: "导出成功",
        description: "图标数据已导出"
      });
    } catch (error) {
      toast({
        title: "导出失败",
        description: "无法导出图标数据",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // 预览图标
  const handlePreviewIcon = icon => {
    setSelectedIcon(icon);
    setShowPreview(true);
  };
  useEffect(() => {
    loadIconStats();
    handleSearch();
  }, [loadIconStats, handleSearch]);

  // 图表数据
  const usageChartData = usageStats?.dailyUsage || [];
  const categoryData = iconStats?.categoryDistribution || [];
  const performanceData = performanceMetrics?.responseTime || [];
  return <div style={style} className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Monitor className="w-8 h-8 text-blue-600" />
            图标监控仪表板
          </h1>
          <p className="text-gray-600 mt-1">实时监控图标使用情况和性能指标</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleRefreshCache} disabled={loading} className="flex items-center gap-2">
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            刷新缓存
          </Button>
          <Button variant="outline" onClick={handleExport} disabled={loading} className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            导出数据
          </Button>
        </div>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">总图标数</p>
                <p className="text-2xl font-bold text-gray-900">{iconStats?.totalIcons || 0}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Database className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">今日使用</p>
                <p className="text-2xl font-bold text-gray-900">{usageStats?.todayUsage || 0}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">平均响应时间</p>
                <p className="text-2xl font-bold text-gray-900">{performanceMetrics?.avgResponseTime || 0}ms</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <Activity className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">错误率</p>
                <p className="text-2xl font-bold text-gray-900">{performanceMetrics?.errorRate || 0}%</p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 搜索和过滤 */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input type="text" placeholder="搜索图标..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
            </div>
            <div className="w-full md:w-48">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="选择分类" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部分类</SelectItem>
                  <SelectItem value="ui">UI图标</SelectItem>
                  <SelectItem value="social">社交图标</SelectItem>
                  <SelectItem value="business">商业图标</SelectItem>
                  <SelectItem value="media">媒体图标</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleSearch} className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              过滤
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 图表区域 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 使用趋势图 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              使用趋势
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={usageChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="count" stroke="#3B82F6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* 分类分布图 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChartIcon className="w-5 h-5" />
              分类分布
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={categoryData} cx="50%" cy="50%" labelLine={false} label={({
                name,
                percent
              }) => `${name} ${(percent * 100).toFixed(0)}%`} outerRadius={80} fill="#8884d8" dataKey="value">
                  {categoryData.map((entry, index) => <Cell key={`cell-${index}`} fill={['#3B82F6', '#10B981', '#F59E0B', '#EF4444'][index % 4]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* 图标列表 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5" />
            图标列表
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {filteredIcons.slice(0, 24).map((icon, index) => <div key={index} className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors" onClick={() => handlePreviewIcon(icon)}>
                <div className="w-12 h-12 flex items-center justify-center mb-2">
                  {icon.component && <icon.component className="w-8 h-8 text-gray-700" />}
                </div>
                <p className="text-xs text-gray-600 text-center">{icon.name}</p>
              </div>)}
          </div>
          {filteredIcons.length > 24 && <div className="mt-4 text-center">
              <Button variant="outline">
                查看更多 ({filteredIcons.length - 24} 个图标)
              </Button>
            </div>}
        </CardContent>
      </Card>

      {/* 图标预览模态框 */}
      {showPreview && selectedIcon && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">图标预览</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowPreview(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
            <IconPreview icon={selectedIcon} />
          </div>
        </div>}
    </div>;
}