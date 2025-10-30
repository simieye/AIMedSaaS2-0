// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Home, Settings, Menu, X, Search, Filter, Plus, Edit, Trash2, Eye, EyeOff, ChevronLeft, ChevronRight, ChevronDown, ChevronUp, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, MoreHorizontal, MoreVertical, Grid, List, Layout, File, FileText, FilePlus, FileCheck, FileX, Download, Upload, FileSearch, FileSignature, FileInput, FileOutput, FileDown, FileUp, FileCopy, FileMove, FileRename, FileDelete, FileArchive, FileUnarchive, FileLock, FileUnlock, FileQuestion, FileWarning, FileError, FileDone, FilePending, FileProcessing, FileUploading, FileDownloading, FileSync, FileSyncing, FileRefresh, FileRefreshCw, FileRefreshCcw, FileRotate, FileRotateCw, FileRotateCcw, FileFlip, FileFlipHorizontal, FileFlipVertical, FileZoomIn, FileZoomOut, FileMaximize, FileMinimize, FileExpand, FileShrink, FileFull, FileEmpty, FileMinus, ArrowUpRight, ArrowDownRight, ArrowUpLeft, ArrowDownLeft, DoubleArrowUp, DoubleArrowDown, DoubleArrowLeft, DoubleArrowRight, Minimize, Maximize, Expand, Shrink, Fullscreen, ExitFullscreen, ZoomIn, ZoomOut, RotateCw, RotateCcw, Heart, Stethoscope, Pill, Brain, Microscope, Activity, HeartPulse, HeartHandshake, Lungs, Bone, Ear, EarOff, Nose, Mouth, Thermometer, Building, CreditCard, DollarSign, Handshake, TrendingUp, BarChart3, PieChart, LineChart, AreaChart, ScatterChart, RadarChart, GanttChart, Timeline, Route, MapPin, TreePine, Server, Database, Shield, Lock, Key, Bell, BellRing, BellOff, Wifi, Battery, Power, PowerOff, Plug, PlugZap, Unplug, Signal, SignalHigh, SignalLow, SignalMedium, SignalZero, Radio, RadioTower, Broadcast, Satellite, Radar, Waves, Cpu, HardDrive, Cloud, Globe, Image, ImageOff, Video, VideoOff, Mic, MicOff, Volume2, VolumeX, Play, Pause, SkipForward, SkipBack, Repeat, Shuffle, Mail, MailOpen, Send, Paperclip, PaperclipOff, Phone, PhoneOff, MessageSquare, MessageCircle, MessageSquarePlus, MessageSquareMinus, MessageSquareQuote, MessageSquareDashed, MessageSquareText, MessageSquareCode, MessageSquareShare, MessageSquareMore, Reply, ReplyAll, Forward, Forwarded, Share, Share2, Clock, Calendar, Timer, AlertTriangle, CheckCircle, AlertCircle, Users, User, UserCheck, Sun, Moon, CloudRain, CloudSnow, CloudDrizzle, CloudLightning, Umbrella, Droplets, Wind, Smartphone, Tablet, Monitor, Laptop, Code, Terminal, GitBranch, Package, Zap, Star, StarHalf, StarOff, HeartOff, ThumbsUp, ThumbsDown, SendToBack, BringToFront, AlignLeft, AlignCenter, AlignRight, AlignJustify, AlignStart, AlignEnd, Indent, Outdent, ListOrdered, ListChecks, ListTodo, ListMinus, ListPlus, ListX, ListVideo, ListMusic, ListEnd, ListStart, ListCollapse, ListFilter, ListFilterPlus, ListFilterMinus, ListFilterX, ListFilter2, ListFilter3, ListFilter4, ListFilter5, ListFilter6, ListFilter7, ListFilter8, ListFilter9, ListFilter0, ListFilterDot, ListFilterSquare, ListFilterCircle, ListFilterTriangle, ListFilterHexagon, ListFilterOctagon, ListFilterDiamond, ListFilterPentagon, ListFilterStar, ListFilterHeart, ListFilterFlower, ListFilterLeaf, ListFilterCloud, ListFilterSun, ListFilterMoon, ListFilterRain, ListFilterSnow, ListFilterLightning, ListFilterUmbrella, ListFilterDroplets, ListFilterGauge, ListFilterFuel, ListFilterZap, ListFilterBattery, ListFilterPower, ListFilterPlug, ListFilterWifi, ListFilterSignal, ListFilterRadio, ListFilterBroadcast, ListFilterSatellite, ListFilterRadar, ListFilterWaves, ListFilterActivity, ListFilterHeartPulse, ListFilterLungs, ListFilterBone, ListFilterEar, ListFilterNose, ListFilterMouth, ListFilterSmile, ListFilterFrown, ListFilterMeh, ListFilterAngry, ListFilterDizzy, ListFilterConfused, ListFilterSurprised, ListFilterKiss, ListFilterGrin, ListFilterLaugh, ListFilterWink, ListFilterTongue, ListFilterThumbs, ListFilterMessage, ListFilterReply, ListFilterForward, ListFilterShare, ListFilterSend, ListFilterAlign, ListFilterIndent, ListFilterList, ListFilterCollapse, ListFilterTree, ListFilterChevron, ListFilterArrow, ListFilterDoubleArrow, ListFilterMinimize, ListFilterMaximize, ListFilterExpand, ListFilterShrink, ListFilterFullscreen, ListFilterZoom, ListFilterRotate, Smile, Frown, Meh, Angry, Dizzy, Confused, Surprised, Kiss, Grin, Laugh, Wink, FrownOpen, Grimace, Tongue, TongueWink, Gauge, Fuel, RefreshCw, Target, BookOpen, FileContract } from 'lucide-react';

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
  }
};

// 获取指定图标组件
export const getIcon = iconName => {
  return Icons[iconName] || null;
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

// 渲染图标组件
export const renderIcon = (iconName, props = {}) => {
  const IconComponent = getIcon(iconName);
  if (!IconComponent) {
    console.warn(`Icon "${iconName}" not found`);
    return null;
  }
  return <IconComponent {...props} />;
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

// 导出所有图标
export { Icons };

// 默认导出
export default Icons;