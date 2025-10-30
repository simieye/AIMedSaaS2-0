
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

/**
 * 动态导入图标组件（按需加载）
 * @param {string} iconName - 图标名称
 * @returns {Promise<React.Component>} - 图标组件Promise
 */
export const dynamicImportIcon = async (iconName) => {
  try {
    // 模拟动态导入，实际项目中可以根据需要实现真正的按需加载
    const iconModule = await import('@/components/Icons');
    const IconComponent = iconModule[iconName];
    
    if (!IconComponent) {
      throw new Error(`Icon "${iconName}" not found`);
    }
    
    return IconComponent;
  } catch (error) {
    console.error(`Failed to import icon "${iconName}":`, error);
    throw error;
  }
};

/**
 * 批量导入图标
 * @param {string[]} iconNames - 图标名称数组
 * @returns {Promise<object>} - 图标组件对象Promise
 */
export const batchImportIcons = async (iconNames) => {
  try {
    const iconModule = await import('@/components/Icons');
    const icons = {};
    
    iconNames.forEach(iconName => {
      if (iconModule[iconName]) {
        icons[iconName] = iconModule[iconName];
      }
    });
    
    return icons;
  } catch (error) {
    console.error('Failed to batch import icons:', error);
    throw error;
  }
};

/**
 * 预加载常用图标
 * @param {string[]} iconNames - 需要预加载的图标名称数组
 * @returns {Promise<void>}
 */
export const preloadIcons = async (iconNames) => {
  try {
    await batchImportIcons(iconNames);
    console.log(`Preloaded ${iconNames.length} icons`);
  } catch (error) {
    console.error('Failed to preload icons:', error);
  }
};

/**
 * 图标缓存管理
 */
class IconCache {
  constructor() {
    this.cache = new Map();
    this.maxSize = 100; // 最大缓存数量
  }

  /**
   * 获取缓存的图标
   * @param {string} iconName - 图标名称
   * @returns {React.Component|null} - 缓存的图标组件
   */
  get(iconName) {
    return this.cache.get(iconName) || null;
  }

  /**
   * 设置图标缓存
   * @param {string} iconName - 图标名称
   * @param {React.Component} iconComponent - 图标组件
   */
  set(iconName, iconComponent) {
    if (this.cache.size >= this.maxSize) {
      // 删除最旧的缓存项
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    this.cache.set(iconName, iconComponent);
  }

  /**
   * 清空缓存
   */
  clear() {
    this.cache.clear();
  }

  /**
   * 获取缓存大小
   * @returns {number} - 缓存项数量
   */
  size() {
    return this.cache.size;
  }
}

// 创建全局图标缓存实例
export const iconCache = new IconCache();

/**
 * 带缓存的图标获取
 * @param {string} iconName - 图标名称
 * @returns {React.Component|null} - 图标组件
 */
export const getCachedIcon = (iconName) => {
  // 先检查缓存
  let iconComponent = iconCache.get(iconName);
  
  if (!iconComponent) {
    // 缓存中没有，从Icons中获取
    iconComponent = getIcon(iconName);
    
    if (iconComponent) {
      // 存入缓存
      iconCache.set(iconName, iconComponent);
    }
  }
  
  return iconComponent;
};

/**
 * 图标主题配置
 */
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
    color: '#3b82f6', // blue-500
    strokeWidth: 2
  }
};

/**
 * 应用主题到图标
 * @param {string} iconName - 图标名称
 * @param {string} themeName - 主题名称
 * @param {object} additionalProps - 额外的props
 * @returns {React.ReactNode} - 应用主题的图标组件
 */
export const renderThemedIcon = (iconName, themeName = 'default', additionalProps = {}) => {
  const theme = iconThemes[themeName] || iconThemes.default;
  const iconProps = {
    size: theme.size,
    color: theme.color,
    strokeWidth: theme.strokeWidth,
    ...additionalProps
  };
  
  return renderIcon(iconName, iconProps);
};

/**
 * 图标验证器
 */
export const iconValidator = {
  /**
   * 验证图标名称是否有效
   * @param {string} iconName - 图标名称
   * @returns {boolean} - 是否有效
   */
  isValidIconName(iconName) {
    return typeof iconName === 'string' && 
           iconName.length > 0 && 
           /^[A-Z][a-zA-Z0-9]*$/.test(iconName);
  },

  /**
   * 验证图标props
   * @param {object} props - 图标props
   * @returns {object} - 验证结果
   */
  validateIconProps(props) {
    const errors = [];
    
    if (props.size && (typeof props.size !== 'string' && typeof props.size !== 'number')) {
      errors.push('Size must be a string or number');
    }
    
    if (props.color && typeof props.color !== 'string') {
      errors.push('Color must be a string');
    }
    
    if (props.strokeWidth && (typeof props.strokeWidth !== 'string' && typeof props.strokeWidth !== 'number')) {
      errors.push('StrokeWidth must be a string or number');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }
};

/**
 * 图标性能监控
 */
export const iconPerformanceMonitor = {
  startTime: null,
  endTime: null,
  
  /**
   * 开始性能监控
   */
  start() {
    this.startTime = performance.now();
  },
  
  /**
   * 结束性能监控并返回耗时
   * @returns {number} - 耗时（毫秒）
   */
  end() {
    this.endTime = performance.now();
    return this.endTime - this.startTime;
  },
  
  /**
   * 监控图标渲染性能
   * @param {string} iconName - 图标名称
   * @param {Function} renderFunction - 渲染函数
   * @returns {any} - 渲染结果
   */
  async measureRender(iconName, renderFunction) {
    this.start();
    const result = await renderFunction();
    const duration = this.end();
    
    console.log(`Icon "${iconName}" render time: ${duration.toFixed(2)}ms`);
    
    return result;
  }
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
  getUnusedIcons,
  dynamicImportIcon,
  batchImportIcons,
  preloadIcons,
  iconCache,
  getCachedIcon,
  iconThemes,
  renderThemedIcon,
  iconValidator,
  iconPerformanceMonitor
};
