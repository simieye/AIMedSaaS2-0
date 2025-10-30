// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui';
// @ts-ignore;
import { Copy, Download, Eye, EyeOff, Zap, Clock } from 'lucide-react';
// @ts-ignore;
import { cn } from '@/lib/utils';

// @ts-ignore;
import { getIconPreview, validateIconName, iconThemes, applyIconTheme, getAllCategories, getIconCacheStats, iconPerformanceMonitor, lazyLoadIcon } from '@/components/Icons';

/**
 * 图标预览组件
 * 提供图标预览、主题切换和代码生成功能
 */
export function IconPreview({
  iconName,
  onIconNameChange,
  showThemeSelector = true,
  showCodeGenerator = true,
  showValidation = true,
  showPerformanceInfo = true,
  className,
  ...props
}) {
  const [selectedTheme, setSelectedTheme] = useState('default');
  const [showCode, setShowCode] = useState(false);
  const [customSize, setCustomSize] = useState(24);
  const [customColor, setCustomColor] = useState('#6b7280');
  const [customStrokeWidth, setCustomStrokeWidth] = useState(2);
  const [cacheStats, setCacheStats] = useState(null);
  const [renderTime, setRenderTime] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // 验证图标名称
  const validation = validateIconName(iconName);

  // 获取图标预览信息
  const [iconPreview, setIconPreview] = useState(null);

  // 更新缓存统计
  useEffect(() => {
    const updateStats = () => {
      setCacheStats(getIconCacheStats());
    };
    updateStats();
    const interval = setInterval(updateStats, 3000);
    return () => clearInterval(interval);
  }, []);

  // 加载图标预览
  useEffect(() => {
    if (iconName && validation.isValid) {
      setIsLoading(true);

      // 测量渲染性能
      iconPerformanceMonitor.start();

      // 懒加载图标
      lazyLoadIcon(iconName).then(() => {
        const preview = getIconPreview(iconName);
        setIconPreview(preview);
        const duration = iconPerformanceMonitor.end();
        setRenderTime(duration);
        setIsLoading(false);
      }).catch(error => {
        console.error('Failed to load icon:', error);
        setIconPreview(null);
        setIsLoading(false);
      });
    } else {
      setIconPreview(null);
      setRenderTime(null);
    }
  }, [iconName, validation.isValid]);

  // 获取所有主题选项
  const themeOptions = Object.keys(iconThemes);

  // 应用主题到图标
  const themedIcon = applyIconTheme(iconName, selectedTheme, {
    size: customSize,
    color: customColor,
    strokeWidth: customStrokeWidth
  });

  // 生成导入代码
  const generateImportCode = () => {
    return `import { ${iconName} } from '@/components/Icons';`;
  };

  // 生成使用代码
  const generateUsageCode = () => {
    const theme = iconThemes[selectedTheme];
    return `<${iconName} 
  size="${theme.size}" 
  color="${theme.color}" 
  strokeWidth={${theme.strokeWidth}} 
/>`;
  };

  // 生成性能优化代码
  const generateOptimizedCode = () => {
    return `// 使用缓存优化的图标获取
import { getIcon } from '@/components/Icons';

const IconComponent = getIcon('${iconName}');
// 渲染时间: ${renderTime ? renderTime.toFixed(2) : 'N/A'}ms
// 缓存命中率: ${cacheStats?.hitRate || 'N/A'}`;
  };

  // 复制到剪贴板
  const copyToClipboard = text => {
    navigator.clipboard.writeText(text);
  };

  // 下载图标SVG
  const downloadIcon = () => {
    // 这里可以实现SVG下载功能
    console.log('下载图标:', iconName);
  };

  // 渲染性能信息
  const renderPerformanceInfo = () => {
    if (!showPerformanceInfo || !renderTime) return null;
    return <div className="bg-blue-50 p-3 rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          <Zap className="h-4 w-4 text-blue-600" />
          <h4 className="text-sm font-medium text-blue-900">性能信息</h4>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <span className="text-blue-700">渲染时间:</span>
            <span className="ml-1 font-medium text-blue-900">{renderTime.toFixed(2)}ms</span>
          </div>
          <div>
            <span className="text-blue-700">缓存状态:</span>
            <span className="ml-1 font-medium text-blue-900">
              {cacheStats ? `${cacheStats.size}/${cacheStats.maxSize}` : 'N/A'}
            </span>
          </div>
          <div>
            <span className="text-blue-700">命中率:</span>
            <span className="ml-1 font-medium text-blue-900">
              {cacheStats?.hitRate || 'N/A'}
            </span>
          </div>
          <div>
            <span className="text-blue-700">加载状态:</span>
            <span className="ml-1 font-medium text-blue-900">
              {isLoading ? '加载中' : '已完成'}
            </span>
          </div>
        </div>
      </div>;
  };
  return <div className={cn("space-y-6", className)} {...props}>
      {/* 图标预览区域 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            图标预览
            {isLoading && <span className="text-sm text-gray-500">加载中...</span>}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center p-8 border-2 border-dashed border-gray-300 rounded-lg">
            {iconPreview ? <div className="text-center">
                {themedIcon}
                <p className="mt-2 text-sm text-gray-600">{iconName}</p>
                {renderTime && <p className="text-xs text-gray-500">
                    <Clock className="inline h-3 w-3 mr-1" />
                    {renderTime.toFixed(2)}ms
                  </p>}
              </div> : <div className="text-center text-gray-500">
                <EyeOff className="h-12 w-12 mx-auto mb-2" />
                <p>图标不存在或名称无效</p>
              </div>}
          </div>
        </CardContent>
      </Card>

      {/* 性能信息 */}
      {renderPerformanceInfo()}

      {/* 图标名称输入 */}
      <Card>
        <CardHeader>
          <CardTitle>图标名称</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input value={iconName} onChange={e => onIconNameChange?.(e.target.value)} placeholder="输入图标名称..." className={cn(validation.isValid ? "border-green-500" : "border-red-500")} />
            {showValidation && !validation.isValid && <div className="text-sm text-red-600">
                {validation.errors.map((error, index) => <p key={index}>{error}</p>)}
              </div>}
          </div>
        </CardContent>
      </Card>

      {/* 主题选择器 */}
      {showThemeSelector && <Card>
          <CardHeader>
            <CardTitle>主题设置</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">预设主题</label>
                <Select value={selectedTheme} onValueChange={setSelectedTheme}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {themeOptions.map(theme => <SelectItem key={theme} value={theme}>
                        {theme}
                      </SelectItem>)}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">大小</label>
                  <Input type="number" value={customSize} onChange={e => setCustomSize(Number(e.target.value))} min="8" max="128" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">颜色</label>
                  <Input type="color" value={customColor} onChange={e => setCustomColor(e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">线宽</label>
                  <Input type="number" value={customStrokeWidth} onChange={e => setCustomStrokeWidth(Number(e.target.value))} min="0.5" max="4" step="0.5" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>}

      {/* 代码生成器 */}
      {showCodeGenerator && iconPreview && <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              代码生成
              <Button variant="outline" size="sm" onClick={() => setShowCode(!showCode)}>
                {showCode ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                {showCode ? '隐藏' : '显示'}代码
              </Button>
            </CardTitle>
          </CardHeader>
          {showCode && <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">导入代码</label>
                  <div className="relative">
                    <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
                      {generateImportCode()}
                    </pre>
                    <Button variant="outline" size="sm" className="absolute top-2 right-2" onClick={() => copyToClipboard(generateImportCode())}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">使用代码</label>
                  <div className="relative">
                    <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
                      {generateUsageCode()}
                    </pre>
                    <Button variant="outline" size="sm" className="absolute top-2 right-2" onClick={() => copyToClipboard(generateUsageCode())}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">性能优化代码</label>
                  <div className="relative">
                    <pre className="bg-blue-50 p-3 rounded text-sm overflow-x-auto">
                      {generateOptimizedCode()}
                    </pre>
                    <Button variant="outline" size="sm" className="absolute top-2 right-2" onClick={() => copyToClipboard(generateOptimizedCode())}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>}
        </Card>}

      {/* 操作按钮 */}
      <Card>
        <CardHeader>
          <CardTitle>操作</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <Button variant="outline" onClick={downloadIcon} disabled={!iconPreview}>
              <Download className="h-4 w-4 mr-2" />
              下载SVG
            </Button>
            <Button variant="outline" onClick={() => copyToClipboard(iconName)} disabled={!iconPreview}>
              <Copy className="h-4 w-4 mr-2" />
              复制名称
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>;
}
export default IconPreview;