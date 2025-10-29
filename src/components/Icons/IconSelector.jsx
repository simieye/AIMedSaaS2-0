// @ts-ignore;
import React, { useState, useMemo, useCallback } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui';
// @ts-ignore;
import { Search, Grid, List, Filter, ChevronDown, ChevronUp } from 'lucide-react';
// @ts-ignore;
import { cn } from '@/lib/utils';

// @ts-ignore;
import { loadIconsByCategory, searchAndLoadIcons, getAllCategories, createIconSelectorData, iconThemes, applyIconTheme } from '@/components/Icons';
// @ts-ignore;

/**
 * 图标选择器组件
 * 提供图标浏览、搜索和选择功能
 */
export function IconSelector({
  value,
  onChange,
  placeholder = "选择图标",
  className,
  showThemeSelector = true,
  showCategoryFilter = true,
  showSearch = true,
  iconSize = 24,
  maxResults = 100,
  ...props
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTheme, setSelectedTheme] = useState('default');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [showAdvanced, setShowAdvanced] = useState(false);

  // 获取所有分类
  const categories = useMemo(() => {
    const cats = getAllCategories();
    return ['all', ...cats];
  }, []);

  // 获取图标数据
  const iconData = useMemo(() => {
    let icons = [];
    if (searchQuery) {
      // 搜索模式
      icons = searchAndLoadIcons(searchQuery, {
        size: iconSize
      }, maxResults);
    } else if (selectedCategory === 'all') {
      // 显示所有分类
      for (const category of getAllCategories()) {
        const categoryIcons = loadIconsByCategory(category, {
          size: iconSize
        });
        icons = [...icons, ...categoryIcons];
      }
    } else {
      // 显示特定分类
      icons = loadIconsByCategory(selectedCategory, {
        size: iconSize
      });
    }
    return icons.slice(0, maxResults);
  }, [searchQuery, selectedCategory, iconSize, maxResults]);

  // 处理图标选择
  const handleIconSelect = useCallback(iconName => {
    onChange?.(iconName);
  }, [onChange]);

  // 处理主题变更
  const handleThemeChange = useCallback(theme => {
    setSelectedTheme(theme);
  }, []);

  // 渲染图标项
  const renderIconItem = useCallback(icon => {
    const isSelected = value === icon.name;
    const themedIcon = applyIconTheme(icon.name, selectedTheme);
    if (viewMode === 'grid') {
      return <div key={icon.name} className={cn("flex flex-col items-center justify-center p-3 border rounded-lg cursor-pointer transition-all hover:bg-gray-50 hover:border-blue-300", isSelected && "bg-blue-50 border-blue-500 ring-2 ring-blue-200")} onClick={() => handleIconSelect(icon.name)} title={icon.name}>
          <div className="mb-2">
            {themedIcon}
          </div>
          <span className="text-xs text-gray-600 text-center truncate w-full">
            {icon.name}
          </span>
        </div>;
    } else {
      return <div key={icon.name} className={cn("flex items-center p-2 border-b cursor-pointer transition-all hover:bg-gray-50", isSelected && "bg-blue-50 border-l-4 border-l-blue-500")} onClick={() => handleIconSelect(icon.name)}>
          <div className="mr-3">
            {themedIcon}
          </div>
          <span className="text-sm text-gray-700">{icon.name}</span>
          {isSelected && <div className="ml-auto">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            </div>}
        </div>;
    }
  }, [value, selectedTheme, viewMode, handleIconSelect]);
  return <div className={cn("w-full space-y-4", className)} {...props}>
      {/* 搜索和过滤区域 */}
      {(showSearch || showCategoryFilter || showThemeSelector) && <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">图标选择器</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {/* 搜索框 */}
            {showSearch && <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input placeholder="搜索图标..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-10" />
              </div>}
            
            {/* 过滤器 */}
            <div className="flex flex-wrap gap-2">
              {/* 分类过滤 */}
              {showCategoryFilter && <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="选择分类" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => <SelectItem key={category} value={category}>
                        {category === 'all' ? '全部' : category}
                      </SelectItem>)}
                  </SelectContent>
                </Select>}
              
              {/* 主题选择 */}
              {showThemeSelector && <Select value={selectedTheme} onValueChange={handleThemeChange}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="主题" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(iconThemes).map(theme => <SelectItem key={theme} value={theme}>
                        {theme}
                      </SelectItem>)}
                  </SelectContent>
                </Select>}
              
              {/* 视图模式切换 */}
              <div className="flex border rounded-md">
                <Button variant={viewMode === 'grid' ? 'default' : 'ghost'} size="sm" onClick={() => setViewMode('grid')} className="rounded-r-none">
                  <Grid className="h-4 w-4" />
                </Button>
                <Button variant={viewMode === 'list' ? 'default' : 'ghost'} size="sm" onClick={() => setViewMode('list')} className="rounded-l-none">
                  <List className="h-4 w-4" />
                </Button>
              </div>
              
              {/* 高级选项 */}
              <Button variant="outline" size="sm" onClick={() => setShowAdvanced(!showAdvanced)}>
                <Filter className="h-4 w-4 mr-1" />
                高级
                {showAdvanced ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />}
              </Button>
            </div>
            
            {/* 高级选项 */}
            {showAdvanced && <div className="p-3 bg-gray-50 rounded-md space-y-2">
                <div className="text-sm font-medium">高级选项</div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>结果数量: {iconData.length}</div>
                  <div>图标尺寸: {iconSize}px</div>
                </div>
              </div>}
          </CardContent>
        </Card>}
      
      {/* 当前选择 */}
      {value && <Card>
          <CardContent className="p-3">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">当前选择:</span>
              <div className="flex items-center space-x-2">
                {applyIconTheme(value, selectedTheme)}
                <span className="text-sm font-medium">{value}</span>
              </div>
            </div>
          </CardContent>
        </Card>}
      
      {/* 图标列表 */}
      <Card>
        <CardContent className="p-4">
          {iconData.length === 0 ? <div className="text-center py-8 text-gray-500">
              {searchQuery ? '未找到匹配的图标' : '该分类下没有图标'}
            </div> : <div className={cn(viewMode === 'grid' ? "grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2" : "space-y-1 max-h-96 overflow-y-auto")}>
              {iconData.map(renderIconItem)}
            </div>}
        </CardContent>
      </Card>
    </div>;
}
export default IconSelector;