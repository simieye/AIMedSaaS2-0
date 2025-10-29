
// @ts-ignore;
import { getIcon, getIconsByCategory, searchIcons, getAllIconNames, iconExists, iconUsageStats, iconCache, IconCategories } from '@/components/Icons';

/**
 * 图标助手工具函数
 * 提供便捷的图标管理和使用功能
 */

/**
 * 动态加载图标组件
 * @param {string} iconName - 图标名称
 * @param {Object} props - 图标属性
 * @param {string} fallbackIcon - 备用图标名称
 * @returns {React.Component|null} 图标组件
 */
export const loadIcon = (iconName, props = {}, fallbackIcon = 'HelpCircle') => {
  try {
    // 检查缓存
    const cachedIcon = iconCache.get(iconName);
    if (cachedIcon) {
      const IconComponent = cachedIcon;
      return <IconComponent {...props} />;
    }

    // 获取图标组件
    const IconComponent = getIcon(iconName);
    
    // 缓存图标
    iconCache.set(iconName, IconComponent);
    
    // 记录使用统计
    iconUsageStats.recordUsage(iconName);
    
    return <IconComponent {...props} />;
  } catch (error) {
    console.warn(`Failed to load icon "${iconName}":`, error);
    
    // 尝试加载备用图标
    if (fallbackIcon && iconExists(fallbackIcon)) {
      const FallbackIcon = getIcon(fallbackIcon);
      return <FallbackIcon {...props} />;
    }
    
    return null;
  }
};

/**
 * 批量加载图标
 * @param {Array} iconNames - 图标名称数组
 * @param {Object} defaultProps - 默认属性
 * @returns {Array} 图标组件数组
 */
export const loadIcons = (iconNames, defaultProps = {}) => {
  return iconNames.map(iconName => ({
    name: iconName,
    component: loadIcon(iconName, defaultProps)
  })).filter(item => item.component !== null);
};

/**
 * 按分类加载图标
 * @param {string} category - 分类名称
 * @param {Object} props - 图标属性
 * @returns {Array} 图标组件数组
 */
export const loadIconsByCategory = (category, props = {}) => {
  const icons = getIconsByCategory(category);
  return icons.map(({ name, component: IconComponent }) => ({
    name,
    component: <IconComponent {...props} />
  }));
};

/**
 * 搜索并加载图标
 * @param {string} query - 搜索关键词
 * @param {Object} props - 图标属性
 * @param {number} limit - 结果限制
 * @returns {Array} 搜索结果
 */
export const searchAndLoadIcons = (query, props = {}, limit = 50) => {
  const results = searchIcons(query);
  const limitedResults = results.slice(0, limit);
  
  return limitedResults.map(({ name, component: IconComponent }) => ({
    name,
    component: <IconComponent {...props} />
  }));
};

/**
 * 获取图标预览
 * @param {string} iconName - 图标名称
 * @param {Object} previewProps - 预览属性
 * @returns {Object} 预览信息
 */
export const getIconPreview = (iconName, previewProps = { size: 24, className: 'text-gray-600' }) => {
  if (!iconExists(iconName)) {
    return {
      exists: false,
      component: null,
      error: `Icon "${iconName}" not found`
    };
  }

  return {
    exists: true,
    component: loadIcon(iconName, previewProps),
    name: iconName,
    category: findIconCategory(iconName)
  };
};

/**
 * 查找图标所属分类
 * @param {string} iconName - 图标名称
 * @returns {string|null} 分类名称
 */
export const findIconCategory = (iconName) => {
  for (const [category, icons] of Object.entries(IconCategories)) {
    if (icons.includes(iconName)) {
      return category;
    }
  }
  return null;
};

/**
 * 获取所有分类
 * @returns {Array} 分类列表
 */
export const getAllCategories = () => {
  return Object.keys(IconCategories);
};

/**
 * 获取分类统计信息
 * @returns {Object} 统计信息
 */
export const getCategoryStats = () => {
  const stats = {};
  for (const [category, icons] of Object.entries(IconCategories)) {
    stats[category] = {
      count: icons.length,
      icons: icons
    };
  }
  return stats;
};

/**
 * 创建图标选择器数据
 * @returns {Object} 选择器数据
 */
export const createIconSelectorData = () => {
  const data = {};
  for (const [category, icons] of Object.entries(IconCategories)) {
    data[category] = icons.map(iconName => ({
      value: iconName,
      label: iconName,
      component: loadIcon(iconName, { size: 16 })
    }));
  }
  return data;
};

/**
 * 验证图标名称
 * @param {string} iconName - 图标名称
 * @returns {Object} 验证结果
 */
export const validateIconName = (iconName) => {
  if (!iconName || typeof iconName !== 'string') {
    return {
      valid: false,
      error: 'Icon name must be a non-empty string'
    };
  }

  if (!iconExists(iconName)) {
    return {
      valid: false,
      error: `Icon "${iconName}" does not exist`,
      suggestions: getSimilarIconNames(iconName)
    };
  }

  return {
    valid: true,
    category: findIconCategory(iconName)
  };
};

/**
 * 获取相似图标名称建议
 * @param {string} iconName - 图标名称
 * @returns {Array} 建议列表
 */
export const getSimilarIconNames = (iconName) => {
  const allIcons = getAllIconNames();
  const suggestions = [];
  
  // 模糊匹配
  for (const name of allIcons) {
    if (name.toLowerCase().includes(iconName.toLowerCase()) || 
        iconName.toLowerCase().includes(name.toLowerCase())) {
      suggestions.push(name);
    }
  }
  
  // 编辑距离匹配（简单实现）
  if (suggestions.length === 0) {
    for (const name of allIcons) {
      if (calculateSimilarity(iconName.toLowerCase(), name.toLowerCase()) > 0.6) {
        suggestions.push(name);
      }
    }
  }
  
  return suggestions.slice(0, 5); // 限制建议数量
};

/**
 * 计算字符串相似度
 * @param {string} str1 - 字符串1
 * @param {string} str2 - 字符串2
 * @returns {number} 相似度 (0-1)
 */
const calculateSimilarity = (str1, str2) => {
  const longer = str1.length > str2.length ? str1 : str2;
  const shorter = str1.length > str2.length ? str2 : str1;
  
  if (longer.length === 0) return 1.0;
  
  const editDistance = levenshteinDistance(longer, shorter);
  return (longer.length - editDistance) / longer.length;
};

/**
 * 计算编辑距离
 * @param {string} str1 - 字符串1
 * @param {string} str2 - 字符串2
 * @returns {number} 编辑距离
 */
const levenshteinDistance = (str1, str2) => {
  const matrix = [];
  
  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }
  
  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }
  
  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  
  return matrix[str2.length][str1.length];
};

/**
 * 图标性能优化工具
 */
export const iconOptimizer = {
  // 预加载常用图标
  preloadIcons(iconNames) {
    iconNames.forEach(iconName => {
      if (!iconCache.get(iconName)) {
        const IconComponent = getIcon(iconName);
        iconCache.set(iconName, IconComponent);
      }
    });
  },
  
  // 清理不常用的图标缓存
  cleanupCache(usageThreshold = 5) {
    const stats = iconUsageStats.getStats();
    const cachedIcons = Array.from(iconCache.cache.keys());
    
    cachedIcons.forEach(iconName => {
      const usage = stats[iconName] || 0;
      if (usage < usageThreshold) {
        iconCache.cache.delete(iconName);
      }
    });
  },
  
  // 获取缓存统计
  getCacheStats() {
    return {
      size: iconCache.size(),
      usage: iconUsageStats.getStats(),
      mostUsed: iconUsageStats.getMostUsed(10)
    };
  }
};

/**
 * 图标主题配置
 */
export const iconThemes = {
  default: {
    size: 20,
    className: 'text-gray-600',
    strokeWidth: 2
  },
  
  primary: {
    size: 24,
    className: 'text-blue-600',
    strokeWidth: 2
  },
  
  secondary: {
    size: 18,
    className: 'text-gray-500',
    strokeWidth: 1.5
  },
  
  success: {
    size: 20,
    className: 'text-green-600',
    strokeWidth: 2
  },
  
  warning: {
    size: 20,
    className: 'text-yellow-600',
    strokeWidth: 2
  },
  
  error: {
    size: 20,
    className: 'text-red-600',
    strokeWidth: 2
  },
  
  large: {
    size: 32,
    className: 'text-gray-700',
    strokeWidth: 1.5
  },
  
  small: {
    size: 16,
    className: 'text-gray-500',
    strokeWidth: 2
  }
};

/**
 * 应用主题到图标
 * @param {string} iconName - 图标名称
 * @param {string} themeName - 主题名称
 * @param {Object} additionalProps - 额外属性
 * @returns {React.Component} 主题化图标
 */
export const applyIconTheme = (iconName, themeName = 'default', additionalProps = {}) => {
  const theme = iconThemes[themeName] || iconThemes.default;
  const props = { ...theme, ...additionalProps };
  
  return loadIcon(iconName, props);
};

/**
 * 创建响应式图标
 * @param {string} iconName - 图标名称
 * @param {Object} sizeConfig - 尺寸配置
 * @param {Object} otherProps - 其他属性
 * @returns {React.Component} 响应式图标
 */
export const createResponsiveIcon = (iconName, sizeConfig = {}, otherProps = {}) => {
  const defaultSizeConfig = {
    sm: 16,
    md: 20,
    lg: 24,
    xl: 32
  };
  
  const finalSizeConfig = { ...defaultSizeConfig, ...sizeConfig };
  
  // 这里可以根据当前屏幕尺寸选择合适的尺寸
  // 简化实现，使用中等尺寸
  const size = finalSizeConfig.md;
  
  return loadIcon(iconName, { size, ...otherProps });
};

// 导出所有功能
export default {
  loadIcon,
  loadIcons,
  loadIconsByCategory,
  searchAndLoadIcons,
  getIconPreview,
  findIconCategory,
  getAllCategories,
  getCategoryStats,
  createIconSelectorData,
  validateIconName,
  getSimilarIconNames,
  iconOptimizer,
  iconThemes,
  applyIconTheme,
  createResponsiveIcon,
  
  // 重新导出原始功能
  getIcon,
  getIconsByCategory,
  searchIcons,
  getAllIconNames,
  iconExists,
  iconUsageStats,
  iconCache,
  IconCategories
};
