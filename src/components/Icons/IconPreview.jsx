
// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
// @ts-ignore;
import { Button } from '@/components/ui';
// @ts-ignore;
import { Input } from '@/components/ui';
// @ts-ignore;
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui';
// @ts-ignore;
import { Copy, Download, Eye, EyeOff } from 'lucide-react';
// @ts-ignore;
import { getIconPreview, validateIconName, iconThemes, applyIconTheme, getAllCategories } from '@/components/Icons';
// @ts-ignore;
import { cn } from '@/lib/utils';

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
  className,
  ...props 
}) {
  const [selectedTheme, setSelectedTheme] = useState('default');
  const [showCode, setShowCode] = useState(false);
  const [customSize, setCustomSize] = useState(24);
  const [customColor, setCustomColor] = useState('#6b728