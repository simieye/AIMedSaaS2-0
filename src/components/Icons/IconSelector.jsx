// @ts-ignore;
import React, { useState, useEffect, useMemo } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui';
// @ts-ignore;
import { Search, Grid, List, Filter, RefreshCw, Download, Copy } from 'lucide-react';
// @ts-ignore;
import { cn } from '@/lib/utils';

// @ts-ignore;
import { getAvailableIcons, getIconsByCategory, getAllCategories, searchIcons, renderIcon, getIconCacheStats, clearIconCache, preloadCommonIcons, iconThemes, applyIconTheme, batchGetIcons } from '@/components/Icons';

/**
 * 图标选择器组件
 * 提供图标浏览、搜索、选择和预览功能
 */
export function IconSelector({
  onIconSelect,
  selectedIcon,
  showCategories = true,
  showSearch = true,
  showCacheInfo = true,
  maxColumns = 8,
  className,
  ...props
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [hoveredIcon, setHoveredIcon] = useState(null);
  const [cacheStats, setCacheStats] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // 获取所有分类
  const categories = useMemo(() => {
    return ['all', ...getAllCategories()];
  }, []);

  // 过滤图标
  const filteredIcons = useMemo(() => {
    let icons = [];
    if (selectedCategory === 'all') {
      icons = getAvailableIcons();
    } else {
      icons = getIconsByCategory(selectedCategory);
    }
    if (searchQuery) {
      icons = searchIcons(searchQuery).filter(icon => icons.includes(icon));
    }
    return icons;
  }, [selectedCategory, searchQuery]);

  // 批量预加载图标
  useEffect(() => {
    if (filteredIcons.length > 0) {
      setIsLoading(true);
      // 批量获取图标以触发缓存
      batchGetIcons(filteredIcons.slice(0, 50)); // 只预加载前50个
      setTimeout(() => setIsLoading(false), 100);
    }
  }, [filteredIcons]);

  // 更新缓存统计
  useEffect(() => {
    if (showCacheInfo) {
      const updateStats = () => {
        setCacheStats(getIconCacheStats());
      };
      updateStats();
      const interval = setInterval(updateStats, 5000); // 每5秒更新一次

      return () => clearInterval(interval);
    }
  }, [showCacheInfo]);

  // 处理图标选择
  const handleIconSelect = iconName => {
    onIconSelect?.(iconName);
  };

  // 处理搜索
  const handleSearch = query => {
    setSearchQuery(query);
  };

  // 处理分类切换
  const handleCategoryChange = category => {
    setSelectedCategory(category);
  };

  // 处理视图模式切换
  const handleViewModeChange = mode => {
    setViewMode(mode);
  };

  // 刷新缓存
  const handleRefreshCache = () => {
    clearIconCache();
    preloadCommonIcons();
    setTimeout(() => {
      setCacheStats(getIconCacheStats());
    }, 500);
  };

  // 复制图标名称
  const handleCopyIconName = iconName => {
    navigator.clipboard.writeText(iconName);
  };

  // 渲染图标网格
  const renderIconGrid = () => {
    const gridCols = viewMode === 'grid' ? `grid-cols-${Math.min(maxColumns, 8)}` : 'grid-cols-1';
    return <div className={cn("grid gap-2 p-4", gridCols)}>
        {filteredIcons.map(iconName => <div key={iconName} className={cn("relative group cursor-pointer rounded-lg border p-3 hover:bg-gray-50 hover:border-blue-300 transition-colors", selectedIcon === iconName && "bg-blue-50 border-blue-500")} onClick={() => handleIconSelect(iconName)} onMouseEnter={() => setHoveredIcon(iconName)} onMouseLeave={() => setHoveredIcon(null)}>
            <div className="flex flex-col items-center space-y-2">
              {renderIcon(iconName, {
            size: viewMode === 'grid' ? 24 : 16,
            className: "text-gray-700"
          })}
              <span className="text-xs text-gray-600 text-center break-all">
                {viewMode === 'grid' ? iconName : iconName}
              </span>
            </div>
            
            {/* 悬停操作 */}
            {hoveredIcon === iconName && <div className="absolute top-1 right-1 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="outline" size="sm" className="h-6 w-6 p-0" onClick={e => {
            e.stopPropagation();
            handleCopyIconName(iconName);
          }}>
                  <Copy className="h-3 w-3" />
                </Button>
              </div>}
          </div>)}
      </div>;
  };

  // 渲染缓存信息
  const renderCacheInfo = () => {
    if (!showCacheInfo || !cacheStats) return null;
    return <div className="bg-gray-50 p-3 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-sm font-medium">缓存统计</h4>
          <Button variant="outline" size="sm" onClick={handleRefreshCache}>
            <RefreshCw className="h-3 w-3 mr-1" />
            刷新
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <span className="text-gray-500">缓存大小:</span>
            <span className="ml-1 font-medium">{cacheStats.size}/{cacheStats.maxSize}</span>
          </div>
          <div>
            <span className="text-gray-500">命中率:</span>
            <span className="ml-1 font-medium">{cacheStats.hitRate}</span>
          </div>
          <div>
            <span className="text-gray-500">命中次数:</span>
            <span className="ml-1 font-medium">{cacheStats.hitCount}</span>
          </div>
          <div>
            <span className="text-gray-500">未命中次数:</span>
            <span className="ml-1 font-medium">{cacheStats.missCount}</span>
          </div>
        </div>
      </div>;
  };
  return <div className={cn("space-y-4", className)} {...props}>
      {/* 搜索和筛选 */}
      {showSearch && <Card>
          <CardHeader>
            <CardTitle>搜索和筛选</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* 搜索框 */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input placeholder="搜索图标..." value={searchQuery} onChange={e => handleSearch(e.target.value)} className="pl-10" />
              </div>

              {/* 分类选择 */}
              {showCategories && <div>
                  <label className="block text-sm font-medium mb-2">分类</label>
                  <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => <SelectItem key={category} value={category}>
                          {category === 'all' ? '全部' : category}
                        </SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>}

              {/* 视图模式切换 */}
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium">视图模式:</label>
                <div className="flex space-x-1">
                  <Button variant={viewMode === 'grid' ? 'default' : 'outline'} size="sm" onClick={() => handleViewModeChange('grid')}>
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button variant={viewMode === 'list' ? 'default' : 'outline'} size="sm" onClick={() => handleViewModeChange('list')}>
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>}

      {/* 图标列表 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>图标列表 ({filteredIcons.length})</span>
            {isLoading && <span className="text-sm text-gray-500">加载中...</span>}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {filteredIcons.length > 0 ? renderIconGrid() : <div className="text-center py-8 text-gray-500">
              {searchQuery ? '没有找到匹配的图标' : '该分类下没有图标'}
            </div>}
        </CardContent>
      </Card>

      {/* 缓存信息 */}
      {renderCacheInfo()}

      {/* 选中图标预览 */}
      {selectedIcon && <Card>
          <CardHeader>
            <CardTitle>选中图标</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              {renderIcon(selectedIcon, {
            size: 48
          })}
              <div>
                <p className="font-medium">{selectedIcon}</p>
                <p className="text-sm text-gray-500">点击图标可以复制名称</p>
              </div>
            </div>
          </CardContent>
        </Card>}
    </div>;
}
export default IconSelector;