// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Home, Settings, Menu, X, Search, Filter, Plus, Edit, Trash2, Eye, EyeOff, ChevronLeft, ChevronRight, ChevronDown, ChevronUp, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, MoreHorizontal, MoreVertical, Grid, List, Layout, File, FileText, FilePlus, FileCheck, FileX, Download, Upload, FileSearch, FileSignature, FileInput, FileOutput, FileDown, FileUp, FileCopy, FileMove, FileRename, FileDelete, FileArchive, FileUnarchive, FileLock, FileUnlock, FileQuestion, FileWarning, FileError, FileDone, FilePending, FileProcessing, FileUploading, FileDownloading, FileSync, FileSyncing, FileRefresh, FileRefreshCw, FileRefreshCcw, FileRotate, FileRotateCw, FileRotateCcw, FileFlip, FileFlipHorizontal, FileFlipVertical, FileZoomIn, FileZoomOut, FileMaximize, FileMinimize, FileExpand, FileShrink, FileFull, FileEmpty, FileMinus, ArrowUpRight, ArrowDownRight, ArrowUpLeft, ArrowDownLeft, DoubleArrowUp, DoubleArrowDown, DoubleArrowLeft, DoubleArrowRight, Minimize, Maximize, Expand, Shrink, Fullscreen, ExitFullscreen, ZoomIn, ZoomOut, RotateCw, RotateCcw, Heart, Stethoscope, Pill, Brain, Microscope, Activity, HeartPulse, HeartHandshake, Lungs, Bone, Ear, EarOff, Nose, Mouth, Thermometer, Building, CreditCard, DollarSign, Handshake, TrendingUp, BarChart3, PieChart, LineChart, AreaChart, ScatterChart, RadarChart, GanttChart, Timeline, Route, MapPin, TreePine, Server, Database, Shield, Lock, Key, Bell, BellRing, BellOff, Wifi, Battery, Power, PowerOff, Plug, PlugZap, Unplug, Signal, SignalHigh, SignalLow, SignalMedium, SignalZero, Radio, RadioTower, Broadcast, Satellite, Radar, Waves, Cpu, HardDrive, Cloud, Globe, Image, ImageOff, Video, VideoOff, Mic, MicOff, Volume2, VolumeX, Play, Pause, SkipForward, SkipBack, Repeat, Shuffle, Mail, MailOpen, Send, Paperclip, PaperclipOff, Phone, PhoneOff, MessageSquare, MessageCircle, MessageSquarePlus, MessageSquareMinus, MessageSquareQuote, MessageSquareDashed, MessageSquareText, MessageSquareCode, MessageSquareShare, MessageSquareMore, Reply, ReplyAll, Forward, Forwarded, Share, Share2, Clock, Calendar, Timer, AlertTriangle, CheckCircle, AlertCircle, Users, User, UserCheck, Sun, Moon, CloudRain, CloudSnow, CloudDrizzle, CloudLightning, Umbrella, Droplets, Wind, Smartphone, Tablet, Monitor, Laptop, Code, Terminal, GitBranch, Package, Zap, Star, StarHalf, StarOff, HeartOff, ThumbsUp, ThumbsDown, SendToBack, BringToFront, AlignLeft, AlignCenter, AlignRight, AlignJustify, AlignStart, AlignEnd, Indent, Outdent, ListOrdered, ListChecks, ListTodo, ListMinus, ListPlus, ListX, ListVideo, ListMusic, ListEnd, ListStart, ListCollapse, ListFilter, ListFilterPlus, ListFilterMinus, ListFilterX, ListFilter2, ListFilter3, ListFilter4, ListFilter5, ListFilter6, ListFilter7, ListFilter8, ListFilter9, ListFilter0, ListFilterDot, ListFilterSquare, ListFilterCircle, ListFilterTriangle, ListFilterHexagon, ListFilterOctagon, ListFilterDiamond, ListFilterPentagon, ListFilterStar, ListFilterHeart, ListFilterFlower, ListFilterLeaf, ListFilterCloud, ListFilterSun, ListFilterMoon, ListFilterRain, ListFilterSnow, ListFilterLightning, ListFilterUmbrella, ListFilterDroplets, ListFilterGauge, ListFilterFuel, ListFilterZap, ListFilterBattery, ListFilterPower, ListFilterPlug, ListFilterWifi, ListFilterSignal, ListFilterRadio, ListFilterBroadcast, ListFilterSatellite, ListFilterRadar, ListFilterWaves, ListFilterActivity, ListFilterHeartPulse, ListFilterLungs, ListFilterBone, ListFilterEar, ListFilterNose, ListFilterMouth, ListFilterSmile, ListFilterFrown, ListFilterMeh, ListFilterAngry, ListFilterDizzy, ListFilterConfused, ListFilterSurprised, ListFilterKiss, ListFilterGrin, ListFilterLaugh, ListFilterWink, ListFilterTongue, ListFilterThumbs, ListFilterMessage, ListFilterReply, ListFilterForward, ListFilterShare, ListFilterSend, ListFilterAlign, ListFilterIndent, ListFilterList, ListFilterCollapse, ListFilterTree, ListFilterChevron, ListFilterArrow, ListFilterDoubleArrow, ListFilterMinimize, ListFilterMaximize, ListFilterExpand, ListFilterShrink, ListFilterFullscreen, ListFilterZoom, ListFilterRotate, Smile, Frown, Meh, Angry, Dizzy, Confused, Surprised, Kiss, Grin, Laugh, Wink, FrownOpen, Grimace, Tongue, TongueWink, Gauge, Fuel, RefreshCw, Target, BookOpen, FileContract } from 'lucide-react';

// 图标缓存管理类
class IconCache {
  constructor() {
    this.cache = new Map();
    this.maxSize = 200; // 最大缓存数量
    this.hitCount = 0;
    this.missCount = 0;
    this.lastCleanup = Date.now();
    this.cleanupInterval = 5 * 60 * 1000; // 5分钟清理一次
  }

  /**
   * 获取缓存的图标
   * @param {string} key - 缓存键
   * @returns {any} - 缓存的值
   */
  get(key) {
    const item = this.cache.get(key);
    if (item) {
      // 更新访问时间
      item.lastAccessed = Date.now();
      this.hitCount++;
      return item.value;
    }
    this.missCount++;
    return null;
  }

  /**
   * 设置缓存
   * @param {string} key - 缓存键
   * @param {any} value - 缓存值
   */
  set(key, value) {
    // 如果缓存已满，清理最旧的项
    if (this.cache.size >= this.maxSize) {
      this.cleanup();
    }
    this.cache.set(key, {
      value,
      createdAt: Date.now(),
      lastAccessed: Date.now()
    });
  }

  /**
   * 清理过期和最少使用的缓存项
   */
  cleanup() {
    const now = Date.now();
    const maxAge = 30 * 60 * 1000; // 30分钟过期时间

    // 按最后访问时间排序
    const sortedItems = Array.from(this.cache.entries()).sort(([, a], [, b]) => a.lastAccessed - b.lastAccessed);

    // 删除过期项
    for (const [key, item] of sortedItems) {
      if (now - item.createdAt > maxAge || this.cache.size > this.maxSize * 0.8) {
        this.cache.delete(key);
      } else {
        break;
      }
    }
    this.lastCleanup = now;
  }

  /**
   * 清空缓存
   */
  clear() {
    this.cache.clear();
    this.hitCount = 0;
    this.missCount = 0;
  }

  /**
   * 获取缓存统计
   * @returns {object} - 缓存统计信息
   */
  getStats() {
    const total = this.hitCount + this.missCount;
    return {
      size: this.cache.size,
      maxSize: this.maxSize,
      hitCount: this.hitCount,
      missCount: this.missCount,
      hitRate: total > 0 ? (this.hitCount / total * 100).toFixed(2) + '%' : '0%',
      lastCleanup: this.lastCleanup
    };
  }

  /**
   * 预热缓存
   * @param {string[]} iconNames - 需要预热的图标名称
   */
  warmup(iconNames) {
    iconNames.forEach(name => {
      if (!this.cache.has(name)) {
        this.set(name, Icons[name]);
      }
    });
  }
}

// 创建全局图标缓存实例
const iconCache = new IconCache();

// 创建图标映射对象
const Icons = {
  // UI Icons
  Home,
  Settings,
  Menu,
  X,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  MoreHorizontal,
  MoreVertical,
  Grid,
  List,
  Layout,
  // File Icons
  File,
  FileText,
  FilePlus,
  FileCheck,
  FileX,
  Download,
  Upload,
  FileSearch,
  FileSignature,
  FileInput,
  FileOutput,
  FileDown,
  FileUp,
  FileCopy,
  FileMove,
  FileRename,
  FileDelete,
  FileArchive,
  FileUnarchive,
  FileLock,
  FileUnlock,
  FileQuestion,
  FileWarning,
  FileError,
  FileDone,
  FilePending,
  FileProcessing,
  FileUploading,
  FileDownloading,
  FileSync,
  FileSyncing,
  FileRefresh,
  FileRefreshCw,
  FileRefreshCcw,
  FileRotate,
  FileRotateCw,
  FileRotateCcw,
  FileFlip,
  FileFlipHorizontal,
  FileFlipVertical,
  FileZoomIn,
  FileZoomOut,
  FileMaximize,
  FileMinimize,
  FileExpand,
  FileShrink,
  FileFull,
  FileEmpty,
  FileMinus,
  // Navigation Icons
  ArrowUpRight,
  ArrowDownRight,
  ArrowUpLeft,
  ArrowDownLeft,
  DoubleArrowUp,
  DoubleArrowDown,
  DoubleArrowLeft,
  DoubleArrowRight,
  Minimize,
  Maximize,
  Expand,
  Shrink,
  Fullscreen,
  ExitFullscreen,
  ZoomIn,
  ZoomOut,
  RotateCw,
  RotateCcw,
  // Medical Icons
  Heart,
  Stethoscope,
  Pill,
  Brain,
  Microscope,
  Activity,
  HeartPulse,
  HeartHandshake,
  Lungs,
  Bone,
  Ear,
  EarOff,
  Nose,
  Mouth,
  Thermometer,
  // Business Icons
  Building,
  CreditCard,
  DollarSign,
  Handshake,
  TrendingUp,
  BarChart3,
  PieChart,
  LineChart,
  AreaChart,
  ScatterChart,
  RadarChart,
  GanttChart,
  Timeline,
  Route,
  MapPin,
  TreePine,
  // System Icons
  Server,
  Database,
  Shield,
  Lock,
  Key,
  Bell,
  BellRing,
  BellOff,
  Wifi,
  Battery,
  Power,
  PowerOff,
  Plug,
  PlugZap,
  Unplug,
  Signal,
  SignalHigh,
  SignalLow,
  SignalMedium,
  SignalZero,
  Radio,
  RadioTower,
  Broadcast,
  Satellite,
  Radar,
  Waves,
  Cpu,
  HardDrive,
  Cloud,
  Globe,
  // Media Icons
  Image,
  ImageOff,
  Video,
  VideoOff,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Repeat,
  Shuffle,
  // Communication Icons
  Mail,
  MailOpen,
  Send,
  Paperclip,
  PaperclipOff,
  Phone,
  PhoneOff,
  MessageSquare,
  MessageCircle,
  MessageSquarePlus,
  MessageSquareMinus,
  MessageSquareQuote,
  MessageSquareDashed,
  MessageSquareText,
  MessageSquareCode,
  MessageSquareShare,
  MessageSquareMore,
  Reply,
  ReplyAll,
  Forward,
  Forwarded,
  Share,
  Share2,
  // Time Icons
  Clock,
  Calendar,
  Timer,
  // Alert Icons
  AlertTriangle,
  CheckCircle,
  AlertCircle,
  // Social Icons
  Users,
  User,
  UserCheck,
  // Weather Icons
  Sun,
  Moon,
  CloudRain,
  CloudSnow,
  CloudDrizzle,
  CloudLightning,
  Umbrella,
  Droplets,
  Wind,
  // Device Icons
  Smartphone,
  Tablet,
  Monitor,
  Laptop,
  // Coding Icons
  Code,
  Terminal,
  GitBranch,
  Package,
  // Other Icons
  Zap,
  Star,
  StarHalf,
  StarOff,
  HeartOff,
  ThumbsUp,
  ThumbsDown,
  SendToBack,
  BringToFront,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  AlignStart,
  AlignEnd,
  Indent,
  Outdent,
  ListOrdered,
  ListChecks,
  ListTodo,
  ListMinus,
  ListPlus,
  ListX,
  ListVideo,
  ListMusic,
  ListEnd,
  ListStart,
  ListCollapse,
  ListFilter,
  ListFilterPlus,
  ListFilterMinus,
  ListFilterX,
  ListFilter2,
  ListFilter3,
  ListFilter4,
  ListFilter5,
  ListFilter6,
  ListFilter7,
  ListFilter8,
  ListFilter9,
  ListFilter0,
  ListFilterDot,
  ListFilterSquare,
  ListFilterCircle,
  ListFilterTriangle,
  ListFilterHexagon,
  ListFilterOctagon,
  ListFilterDiamond,
  ListFilterPentagon,
  ListFilterStar,
  ListFilterHeart,
  ListFilterFlower,
  ListFilterLeaf,
  ListFilterCloud,
  ListFilterSun,
  ListFilterMoon,
  ListFilterRain,
  ListFilterSnow,
  ListFilterLightning,
  ListFilterUmbrella,
  ListFilterDroplets,
  ListFilterGauge,
  ListFilterFuel,
  ListFilterZap,
  ListFilterBattery,
  ListFilterPower,
  ListFilterPlug,
  ListFilterWifi,
  ListFilterSignal,
  ListFilterRadio,
  ListFilterBroadcast,
  ListFilterSatellite,
  ListFilterRadar,
  ListFilterWaves,
  ListFilterActivity,
  ListFilterHeartPulse,
  ListFilterLungs,
  ListFilterBone,
  ListFilterEar,
  ListFilterNose,
  ListFilterMouth,
  ListFilterSmile,
  ListFilterFrown,
  ListFilterMeh,
  ListFilterAngry,
  ListFilterDizzy,
  ListFilterConfused,
  ListFilterSurprised,
  ListFilterKiss,
  ListFilterGrin,
  ListFilterLaugh,
  ListFilterWink,
  ListFilterTongue,
  ListFilterThumbs,
  ListFilterMessage,
  ListFilterReply,
  ListFilterForward,
  ListFilterShare,
  ListFilterSend,
  ListFilterAlign,
  ListFilterIndent,
  ListFilterList,
  ListFilterCollapse,
  ListFilterTree,
  ListFilterChevron,
  ListFilterArrow,
  ListFilterDoubleArrow,
  ListFilterMinimize,
  ListFilterMaximize,
  ListFilterExpand,
  ListFilterShrink,
  ListFilterFullscreen,
  ListFilterZoom,
  ListFilterRotate,
  // Face Icons
  Smile,
  Frown,
  Meh,
  Angry,
  Dizzy,
  Confused,
  Surprised,
  Kiss,
  Grin,
  Laugh,
  Wink,
  FrownOpen,
  Grimace,
  Tongue,
  TongueWink,
  // Utility Icons
  Gauge,
  Fuel,
  RefreshCw,
  Target,
  BookOpen,
  FileContract
};

// 图标主题配置
export const iconThemes = {
  default: {
    size: '24px',
    color: 'currentColor',
    strokeWidth: 2
  },
  small: {
    size: '16px',
    color: 'currentColor',
    strokeWidth: 2
  },
  large: {
    size: '32px',
    color: 'currentColor',
    strokeWidth: 1.5
  },
  colored: {
    size: '24px',
    color: '#3b82f6',
    // blue-500
    strokeWidth: 2
  },
  success: {
    size: '24px',
    color: '#10b981',
    // green-500
    strokeWidth: 2
  },
  warning: {
    size: '24px',
    color: '#f59e0b',
    // amber-500
    strokeWidth: 2
  },
  error: {
    size: '24px',
    color: '#ef4444',
    // red-500
    strokeWidth: 2
  }
};

// 获取指定图标组件（带缓存）
export const getIcon = iconName => {
  // 先检查缓存
  let iconComponent = iconCache.get(iconName);
  if (!iconComponent) {
    // 缓存中没有，从Icons中获取
    iconComponent = Icons[iconName];
    if (iconComponent) {
      // 存入缓存
      iconCache.set(iconName, iconComponent);
    }
  }
  return iconComponent || null;
};

// 获取所有可用的图标名称列表
export const getAvailableIcons = () => {
  return Object.keys(Icons);
};

// 检查图标是否存在
export const hasIcon = iconName => {
  return iconName in Icons;
};

// 根据类别获取图标列表
export const getIconsByCategory = category => {
  const categories = {
    ui: ['Home', 'Settings', 'Menu', 'X', 'Search', 'Filter', 'Plus', 'Edit', 'Trash2', 'Eye', 'EyeOff'],
    file: ['File', 'FileText', 'FilePlus', 'FileCheck', 'FileX', 'Download', 'Upload', 'FileSearch'],
    navigation: ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ChevronLeft', 'ChevronRight'],
    medical: ['Heart', 'Stethoscope', 'Pill', 'Brain', 'Microscope', 'Activity', 'HeartPulse'],
    business: ['Building', 'CreditCard', 'DollarSign', 'Handshake', 'TrendingUp', 'BarChart3'],
    system: ['Server', 'Database', 'Shield', 'Lock', 'Key', 'Bell', 'Wifi', 'Battery'],
    media: ['Image', 'Video', 'Mic', 'Volume2', 'Play', 'Pause'],
    chart: ['BarChart3', 'PieChart', 'LineChart', 'AreaChart', 'ScatterChart', 'RadarChart'],
    communication: ['Mail', 'Phone', 'MessageSquare', 'Send'],
    time: ['Clock', 'Calendar', 'Timer'],
    alert: ['AlertTriangle', 'CheckCircle', 'AlertCircle'],
    social: ['Users', 'User', 'UserCheck'],
    weather: ['Sun', 'Cloud', 'CloudRain', 'Umbrella'],
    device: ['Smartphone', 'Tablet', 'Monitor', 'Laptop'],
    coding: ['Code', 'Terminal', 'GitBranch', 'Package'],
    other: ['Zap', 'Star', 'Heart', 'Globe']
  };
  return categories[category] || [];
};

// 渲染图标组件（带错误处理）
export const renderIcon = (iconName, props = {}) => {
  try {
    const IconComponent = getIcon(iconName);
    if (!IconComponent) {
      console.warn(`Icon "${iconName}" not found`);
      // 返回默认图标或占位符
      return <div className="inline-flex items-center justify-center w-6 h-6 bg-gray-200 rounded" title={`Missing icon: ${iconName}`}>
          <span className="text-xs text-gray-500">?</span>
        </div>;
    }
    return <IconComponent {...props} />;
  } catch (error) {
    console.error(`Error rendering icon "${iconName}":`, error);
    // 返回错误占位符
    return <div className="inline-flex items-center justify-center w-6 h-6 bg-red-100 rounded" title={`Error rendering icon: ${iconName}`}>
        <span className="text-xs text-red-500">!</span>
      </div>;
  }
};

// 应用主题到图标
export const applyIconTheme = (iconName, themeName = 'default', additionalProps = {}) => {
  const theme = iconThemes[themeName] || iconThemes.default;
  const iconProps = {
    size: theme.size,
    color: theme.color,
    strokeWidth: theme.strokeWidth,
    ...additionalProps
  };
  return renderIcon(iconName, iconProps);
};

// 图标搜索功能
export const searchIcons = query => {
  const allIcons = getAvailableIcons();
  const lowerQuery = query.toLowerCase();
  return allIcons.filter(iconName => iconName.toLowerCase().includes(lowerQuery));
};

// 获取随机图标
export const getRandomIcon = category => {
  let icons;
  if (category) {
    icons = getIconsByCategory(category);
  } else {
    icons = getAvailableIcons();
  }
  if (icons.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * icons.length);
  return icons[randomIndex];
};

// 验证图标名称
export const validateIconName = iconName => {
  const errors = [];
  if (!iconName || typeof iconName !== 'string') {
    errors.push('图标名称必须是非空字符串');
  }
  if (iconName && !hasIcon(iconName)) {
    errors.push(`图标 "${iconName}" 不存在`);
  }
  if (iconName && !/^[A-Z][a-zA-Z0-9]*$/.test(iconName)) {
    errors.push('图标名称必须以大写字母开头，只包含字母和数字');
  }
  return {
    isValid: errors.length === 0,
    errors
  };
};

// 获取图标预览信息
export const getIconPreview = iconName => {
  const IconComponent = getIcon(iconName);
  if (!IconComponent) {
    return null;
  }
  return {
    name: iconName,
    component: IconComponent,
    category: Object.keys(getIconsByCategory()).find(cat => getIconsByCategory(cat).includes(iconName)) || 'other'
  };
};

// 获取所有分类
export const getAllCategories = () => {
  return ['ui', 'file', 'navigation', 'medical', 'business', 'system', 'media', 'chart', 'communication', 'time', 'alert', 'social', 'weather', 'device', 'coding', 'other'];
};

// 预热常用图标
export const preloadCommonIcons = () => {
  const commonIcons = ['Home', 'Settings', 'Search', 'Menu', 'X', 'Plus', 'Edit', 'Trash2', 'Eye', 'ChevronLeft', 'ChevronRight', 'ArrowUp', 'ArrowDown', 'File', 'Download', 'Upload', 'Heart', 'Brain', 'Activity', 'Building', 'BarChart3', 'Server', 'Database', 'Shield', 'Bell', 'Mail', 'Phone', 'Clock', 'Calendar', 'AlertTriangle', 'Users', 'Sun', 'Cloud', 'Monitor', 'Code', 'Star', 'Zap'];
  iconCache.warmup(commonIcons);
  console.log('Preloaded common icons:', commonIcons.length);
};

// 获取缓存统计
export const getIconCacheStats = () => {
  return iconCache.getStats();
};

// 清空图标缓存
export const clearIconCache = () => {
  iconCache.clear();
  console.log('Icon cache cleared');
};

// 图标性能监控
export const iconPerformanceMonitor = {
  startTime: null,
  endTime: null,
  start() {
    this.startTime = performance.now();
  },
  end() {
    this.endTime = performance.now();
    return this.endTime - this.startTime;
  },
  async measureRender(iconName, renderFunction) {
    this.start();
    const result = await renderFunction();
    const duration = this.end();
    console.log(`Icon "${iconName}" render time: ${duration.toFixed(2)}ms`);
    return result;
  }
};

// 批量获取图标（优化性能）
export const batchGetIcons = iconNames => {
  const results = {};
  iconNames.forEach(name => {
    results[name] = getIcon(name);
  });
  return results;
};

// 图标懒加载支持
export const lazyLoadIcon = async iconName => {
  return new Promise((resolve, reject) => {
    try {
      const icon = getIcon(iconName);
      if (icon) {
        resolve(icon);
      } else {
        reject(new Error(`Icon "${iconName}" not found`));
      }
    } catch (error) {
      reject(error);
    }
  });
};

// 导出缓存实例（用于调试）
export const iconCacheInstance = iconCache;

// 导出所有图标
export { Icons };

// 默认导出

// 初始化时预热常用图标
if (typeof window !== 'undefined') {
  // 浏览器环境下预热
  setTimeout(() => {
    preloadCommonIcons();
  }, 100);
}
export default Icons;