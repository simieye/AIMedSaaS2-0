// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Badge, Button } from '@/components/ui';
// @ts-ignore;
import { Star, Download, Eye, Clock, Users, Zap, Database, Code } from 'lucide-react';

export function TemplatePreview({
  template,
  onUseTemplate
}) {
  if (!template) {
    return <Card>
        <CardContent className="p-6 text-center text-muted-foreground">
          <Eye className="h-8 w-8 mx-auto mb-2" />
          <p>选择一个模板查看详情</p>
        </CardContent>
      </Card>;
  }
  const getDifficultyColor = difficulty => {
    const colors = {
      beginner: 'bg-green-100 text-green-800',
      intermediate: 'bg-yellow-100 text-yellow-800',
      advanced: 'bg-red-100 text-red-800'
    };
    return colors[difficulty] || colors.beginner;
  };
  const getDifficultyLabel = difficulty => {
    const labels = {
      beginner: '初级',
      intermediate: '中级',
      advanced: '高级'
    };
    return labels[difficulty] || labels.beginner;
  };
  return <Card>
      <CardHeader>
        <CardTitle className="text-base">{template.name}</CardTitle>
        <div className="flex items-center space-x-2">
          <Badge className={getDifficultyColor(template.difficulty)}>
            {getDifficultyLabel(template.difficulty)}
          </Badge>
          <div className="flex items-center">
            <Star className="h-3 w-3 text-yellow-500 mr-1" />
            <span className="text-sm">{template.rating}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-medium mb-2">描述</h4>
          <p className="text-sm text-muted-foreground">{template.description}</p>
        </div>
        
        <div>
          <h4 className="font-medium mb-2">作者</h4>
          <div className="flex items-center text-sm text-muted-foreground">
            <Users className="h-3 w-3 mr-1" />
            {template.author}
          </div>
        </div>
        
        <div>
          <h4 className="font-medium mb-2">统计信息</h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center">
              <Download className="h-3 w-3 mr-1" />
              <span>{template.downloads} 下载</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              <span>{template.estimated_time}</span>
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="font-medium mb-2">标签</h4>
          <div className="flex flex-wrap gap-1">
            {template.tags.map(tag => <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>)}
          </div>
        </div>
        
        <div>
          <h4 className="font-medium mb-2">系统要求</h4>
          <div className="space-y-1 text-sm">
            <div className="flex items-center">
              <Zap className="h-3 w-3 mr-2" />
              <span>GPU: {template.requirements.gpu ? '必需' : '可选'}</span>
            </div>
            <div className="flex items-center">
              <Database className="h-3 w-3 mr-2" />
              <span>内存: {template.requirements.memory}</span>
            </div>
            <div className="flex items-center">
              <Code className="h-3 w-3 mr-2" />
              <span>数据集: {template.requirements.dataset}</span>
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="font-medium mb-2">配置预览</h4>
          <div className="bg-gray-50 p-3 rounded text-xs font-mono">
            <div>模型类型: {template.config.model_type}</div>
            <div>数据集: {template.config.dataset}</div>
            <div>学习率: {template.config.hyperparameters.learning_rate}</div>
            <div>批次大小: {template.config.hyperparameters.batch_size}</div>
            <div>训练轮数: {template.config.hyperparameters.epochs}</div>
          </div>
        </div>
        
        <Button onClick={() => onUseTemplate(template)} className="w-full">
          使用此模板
        </Button>
      </CardContent>
    </Card>;
}