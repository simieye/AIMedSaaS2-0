// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui';

export function TemplateFilters({
  filterCategory,
  setFilterCategory,
  filterSort,
  setFilterSort
}) {
  const categories = {
    all: '全部类别',
    nlp: '自然语言处理',
    classification: '分类任务',
    sequence: '序列建模',
    risk_assessment: '风险评估'
  };
  const sortOptions = {
    popular: '最受欢迎',
    newest: '最新发布',
    rating: '评分最高',
    downloads: '下载最多'
  };
  return <>
      <Select value={filterCategory} onValueChange={setFilterCategory}>
        <SelectTrigger className="w-40">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(categories).map(([key, value]) => <SelectItem key={key} value={key}>
              {value}
            </SelectItem>)}
        </SelectContent>
      </Select>
      
      <Select value={filterSort} onValueChange={setFilterSort}>
        <SelectTrigger className="w-32">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(sortOptions).map(([key, value]) => <SelectItem key={key} value={key}>
              {value}
            </SelectItem>)}
        </SelectContent>
      </Select>
    </>;
}