// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Badge, Button } from '@/components/ui';
// @ts-ignore;
import { Star, Download, Eye, Clock, Users } from 'lucide-react';

export function TemplateGrid({
  templates,
  searchTerm,
  filterCategory,
  filterSort,
  selectedTemplate,
  setSelectedTemplate,
  onUseTemplate
}) {
  const categories = {
    all: '全部类别',
    nlp: '自然语言处理',
    classification: '分类任务',
    sequence: '序列建模',
    risk_assessment: '风险评估'
  };
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
  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) || template.description.toLowerCase().includes(searchTerm.toLowerCase()) || template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = filterCategory === 'all' || template.category === filterCategory;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    switch (filterSort) {
      case 'popular':
        return b.downloads - a.downloads;
      case 'rating':
        return b.rating - a.rating;
      case 'downloads':
        return b.downloads - a.downloads;
      default:
        return 0;
    }
  });
  return <div className="space-y-4">
      {filteredTemplates.length === 0 ? <div className="text-center py-8">
          <div className="text-muted-foreground">
            <p>未找到匹配的模板</p>
            <p className="text-sm">尝试调整搜索条件或筛选器</p>
          </div>
        </div> : <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredTemplates.map(template => <Card key={template.id} className={`cursor-pointer transition-all ${selectedTemplate?.id === template.id ? 'ring-2 ring-primary' : 'hover:shadow-md'}`} onClick={() => setSelectedTemplate(template)}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-base">{template.name}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">{template.description}</p>
                  </div>
                  <Badge className={getDifficultyColor(template.difficulty)}>
                    {getDifficultyLabel(template.difficulty)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Star className="h-3 w-3 text-yellow-500 mr-1" />
                      <span>{template.rating}</span>
                    </div>
                    <div className="flex items-center">
                      <Download className="h-3 w-3 text-muted-foreground mr-1" />
                      <span>{template.downloads}</span>
                    </div>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{template.estimated_time}</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1">
                  {template.tags.slice(0, 3).map(tag => <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>)}
                  {template.tags.length > 3 && <Badge variant="outline" className="text-xs">
                      +{template.tags.length - 3}
                    </Badge>}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-xs text-muted-foreground">
                    <Users className="h-3 w-3 inline mr-1" />
                    {template.author}
                  </div>
                  <Button size="sm" onClick={e => {
              e.stopPropagation();
              onUseTemplate(template);
            }}>
                    使用模板
                  </Button>
                </div>
              </CardContent>
            </Card>)}
        </div>}
    </div>;
}