// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Badge, Button, Progress, useToast } from '@/components/ui';
// @ts-ignore;
import { Play, Pause, Square, RotateCcw, Copy, Trash2, Eye, Download, Settings, Clock, TrendingUp, Activity, CheckCircle, XCircle, AlertCircle, BarChart3, FileText, Zap, Star, GitBranch, Calendar, User } from 'lucide-react';

export function ExperimentCard({
  experiment,
  isTemplate = false,
  onDelete,
  onSelect,
  onStart,
  onStop,
  onDuplicate,
  onUseTemplate
}) {
  const [showActions, setShowActions] = useState(false);
  const {
    toast
  } = useToast();
  const getStatusBadge = status => {
    const badges = {
      pending: {
        label: '待开始',
        color: 'bg-gray-100 text-gray-800',
        icon: <Clock className="h-3 w-3" />
      },
      running: {
        label: '运行中',
        color: 'bg-blue-100 text-blue-800',
        icon: <Activity className="h-3 w-3" />
      },
      completed: {
        label: '已完成',
        color: 'bg-green-100 text-green-800',
        icon: <CheckCircle className="h-3 w-3" />
      },
      failed: {
        label: '失败',
        color: 'bg-red-100 text-red-800',
        icon: <XCircle className="h-3 w-3" />
      },
      paused: {
        label: '已暂停',
        color: 'bg-yellow-100 text-yellow-800',
        icon: <Pause className="h-3 w-3" />
      }
    };
    return badges[status] || badges.pending;
  };
  const getModelTypeIcon = modelType => {
    const icons = {
      transformer: <Zap className="h-4 w-4" />,
      lstm: <Activity className="h-4 w-4" />,
      cnn: <BarChart3 className="h-4 w-4" />,
      bert: <FileText className="h-4 w-4" />
    };
    return icons[modelType] || icons.transformer;
  };
  const getProgressPercentage = experiment => {
    if (experiment.status === 'completed') return 100;
    if (experiment.status === 'failed') return 0;
    if (experiment.status === 'running') {
      // 模拟进度计算
      return Math.floor(Math.random() * 80) + 20;
    }
    return 0;
  };
  const getLatestMetrics = experiment => {
    if (!experiment.metrics || Object.keys(experiment.metrics).length === 0) {
      return {
        accuracy: 0,
        loss: 0,
        f1_score: 0
      };
    }
    const accuracy = experiment.metrics.accuracy?.[experiment.metrics.accuracy.length - 1] || 0;
    const loss = experiment.metrics.loss?.[experiment.metrics.loss.length - 1] || 0;
    const f1_score = experiment.metrics.f1_score?.[experiment.metrics.f1_score.length - 1] || 0;
    return {
      accuracy,
      loss,
      f1_score
    };
  };
  const handleAction = async action => {
    switch (action) {
      case 'start':
        onStart?.();
        break;
      case 'stop':
        onStop?.();
        break;
      case 'duplicate':
        onDuplicate?.();
        break;
      case 'delete':
        onDelete?.();
        break;
      case 'use_template':
        onUseTemplate?.();
        break;
      default:
        break;
    }
  };
  const formatDuration = seconds => {
    if (!seconds) return '0分钟';
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor(seconds % 3600 / 60);
    if (hours > 0) {
      return `${hours}小时${minutes}分钟`;
    }
    return `${minutes}分钟`;
  };
  const formatDate = dateString => {
    return new Date(dateString).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  const progress = getProgressPercentage(experiment);
  const metrics = getLatestMetrics(experiment);
  return <Card className={`transition-all duration-200 hover:shadow-md ${isTemplate ? 'border-blue-200' : ''}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              {getModelTypeIcon(experiment.model_type)}
              <CardTitle className="text-base">{experiment.name}</CardTitle>
              {isTemplate && <Badge variant="outline" className="text-blue-600">
                  模板
                </Badge>}
            </div>
            {experiment.description && <p className="text-sm text-muted-foreground line-clamp-2">
                {experiment.description}
              </p>}
          </div>
          <div className="flex items-center space-x-2">
            <Badge className={getStatusBadge(experiment.status).color}>
              {getStatusBadge(experiment.status).icon}
              {getStatusBadge(experiment.status).label}
            </Badge>
            <Button variant="ghost" size="sm" onClick={() => setShowActions(!showActions)}>
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* 进度条 */}
        {experiment.status === 'running' && <div>
            <div className="flex justify-between text-sm mb-1">
              <span>训练进度</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} />
          </div>}
        
        {/* 关键指标 */}
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div className="text-center">
            <div className="font-semibold text-green-600">
              {(metrics.accuracy * 100).toFixed(1)}%
            </div>
            <div className="text-muted-foreground">准确率</div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-red-600">
              {metrics.loss.toFixed(4)}
            </div>
            <div className="text-muted-foreground">损失值</div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-blue-600">
              {(metrics.f1_score * 100).toFixed(1)}%
            </div>
            <div className="text-muted-foreground">F1分数</div>
          </div>
        </div>
        
        {/* 实验信息 */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">模型类型:</span>
            <span className="font-medium">{experiment.model_type}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">数据集:</span>
            <span className="font-medium">{experiment.dataset}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">创建时间:</span>
            <span className="font-medium">{formatDate(experiment.created_at)}</span>
          </div>
          {experiment.duration > 0 && <div className="flex justify-between">
              <span className="text-muted-foreground">运行时长:</span>
              <span className="font-medium">{formatDuration(experiment.duration)}</span>
            </div>}
        </div>
        
        {/* 标签 */}
        {experiment.tags && experiment.tags.length > 0 && <div>
            <div className="flex flex-wrap gap-1">
              {experiment.tags.slice(0, 3).map(tag => <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>)}
              {experiment.tags.length > 3 && <Badge variant="outline" className="text-xs">
                  +{experiment.tags.length - 3}
                </Badge>}
            </div>
          </div>}
        
        {/* 操作按钮 */}
        {showActions && <div className="border-t pt-3 space-y-2">
            <div className="grid grid-cols-2 gap-2">
              {experiment.status === 'pending' && <Button size="sm" onClick={() => handleAction('start')} className="w-full">
                  <Play className="h-3 w-3 mr-1" />
                  开始
                </Button>}
              {experiment.status === 'running' && <Button size="sm" onClick={() => handleAction('stop')} className="w-full">
                  <Pause className="h-3 w-3 mr-1" />
                  暂停
                </Button>}
              {experiment.status === 'paused' && <Button size="sm" onClick={() => handleAction('start')} className="w-full">
                  <Play className="h-3 w-3 mr-1" />
                  继续
                </Button>}
              {experiment.status === 'failed' && <Button size="sm" onClick={() => handleAction('start')} className="w-full">
                  <RotateCcw className="h-3 w-3 mr-1" />
                  重试
                </Button>}
              
              <Button size="sm" variant="outline" onClick={() => handleAction('duplicate')} className="w-full">
                <Copy className="h-3 w-3 mr-1" />
                复制
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <Button size="sm" variant="outline" onClick={() => onSelect?.(experiment)} className="w-full">
                <Eye className="h-3 w-3 mr-1" />
                详情
              </Button>
              {!isTemplate && <Button size="sm" variant="outline" onClick={() => handleAction('delete')} className="w-full text-red-600 hover:text-red-700">
                  <Trash2 className="h-3 w-3 mr-1" />
                  删除
                </Button>}
              {isTemplate && <Button size="sm" onClick={() => handleAction('use_template')} className="w-full">
                  <Play className="h-3 w-3 mr-1" />
                  使用模板
                </Button>}
            </div>
          </div>}
      </CardContent>
    </Card>;
}