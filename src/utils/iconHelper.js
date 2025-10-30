
/**
 * 图标辅助工具
 * 用于统一管理和使用图标组件
 */

import * as Icons from '@/components/Icons';

/**
 * 获取指定图标组件
 * @param {string} iconName - 图标名称
 * @returns {React.Component|null} - 图标组件或null
 */
export const getIcon = (iconName) => {
  return Icons[iconName] || null;
};

/**
 * 获取所有可用的图标名称列表
 * @returns {string[]} - 图标名称数组
 */
export const getAvailableIcons = () => {
  return Object.keys(Icons);
};

/**
 * 检查图标是否存在
 * @param {string} iconName - 图标名称
 * @returns {boolean} - 是否存在
 */
export const hasIcon = (iconName) => {
  return iconName in Icons;
};

/**
 * 根据类别获取图标列表
 * @param {string} category - 图标类别 (ui, file, navigation, etc.)
 * @returns {string[]} - 图标名称数组
 */
export const getIconsByCategory = (category) => {
  const categories = {
    ui: ['Home', 'Settings', 'Menu', 'X', 'Search', 'Filter', 'Plus', 'Edit', 'Trash2', 'Eye'],
    file: ['File', 'FileText', 'FilePlus', 'FileCheck', 'FileX', 'Download', 'Upload'],
    navigation: ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ChevronLeft', 'ChevronRight'],
    medical: ['Heart', 'Stethoscope', 'Pill', 'Brain', 'Microscope', 'Activity'],
    business: ['Building', 'CreditCard', 'DollarSign', 'Handshake', 'TrendingUp'],
    system: ['Server', 'Database', 'Shield', 'Key', 'Lock', 'Bell'],
    media: ['Image', 'Video', 'Mic', 'Volume2', 'Play', 'Pause'],
    chart: ['BarChart3', 'PieChart', 'LineChart', 'AreaChart'],
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

/**
 * 渲染图标组件
 * @param {string} iconName - 图标名称
 * @param {object} props - 传递给图标组件的props
 * @returns {React.ReactNode} - 图标组件或null
 */
export const renderIcon = (iconName, props = {}) => {
  const IconComponent = getIcon(iconName);
  if (!IconComponent) {
    console.warn(`Icon "${iconName}" not found`);
    return null;
  }

  return <IconComponent {...props} />;
};

/**
 * 图标搜索功能
 * @param {string} query - 搜索关键词
 * @returns {string[]} - 匹配的图标名称数组
 */
export const searchIcons = (query) => {
  const allIcons = getAvailableIcons();
  const lowerQuery = query.toLowerCase();
  
  return allIcons.filter(iconName => 
    iconName.toLowerCase().includes(lowerQuery)
  );
};

/**
 * 获取随机图标
 * @param {string} category - 可选的图标类别
 * @returns {string} - 随机图标名称
 */
export const getRandomIcon = (category) => {
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

/**
 * 图标使用统计（用于优化）
 */
const iconUsageStats = {};

/**
 * 记录图标使用
 * @param {string} iconName - 图标名称
 */
export const trackIconUsage = (iconName) => {
  iconUsageStats[iconName] = (iconUsageStats[iconName] || 0) + 1;
};

/**
 * 获取图标使用统计
 * @returns {object} - 使用统计对象
 */
export const getIconUsageStats = () => {
  return { ...iconUsageStats };
};

/**
 * 清理未使用的图标导入（开发工具）
 * @returns {string[]} - 未使用的图标名称数组
 */
export const getUnusedIcons = () => {
  const allIcons = getAvailableIcons();
  return allIcons.filter(iconName => !iconUsageStats[iconName]);
};

export default {
  getIcon,
  getAvailableIcons,
  hasIcon,
  getIconsByCategory,
  renderIcon,
  searchIcons,
  getRandomIcon,
  trackIconUsage,
  getIconUsageStats,
  getUnusedIcons
};
