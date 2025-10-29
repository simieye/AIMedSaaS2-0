// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Input, Select, Button, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui';
// @ts-ignore;
import { Search, Filter } from 'lucide-react';

export function AgreementSearchFilter({
  searchTerm,
  onSearchChange,
  selectedStatus,
  onStatusChange,
  selectedDateRange,
  onDateRangeChange,
  onExport,
  className,
  style
}) {
  return <div className={className} style={style}>
      <div className="grid grid-cols-3 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input placeholder="搜索协议名称、ID或负责人..." value={searchTerm} onChange={e => onSearchChange(e.target.value)} className="pl-10" />
        </div>
        
        <Select value={selectedStatus} onValueChange={onStatusChange}>
          <SelectTrigger>
            <SelectValue placeholder="选择状态" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部状态</SelectItem>
            <SelectItem value="active">激活</SelectItem>
            <SelectItem value="pending">待激活</SelectItem>
            <SelectItem value="suspended">暂停</SelectItem>
            <SelectItem value="expired">已过期</SelectItem>
            <SelectItem value="terminated">终止</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedDateRange} onValueChange={onDateRangeChange}>
          <SelectTrigger>
            <SelectValue placeholder="时间范围" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部时间</SelectItem>
            <SelectItem value="current">当前有效</SelectItem>
            <SelectItem value="expiring">即将到期</SelectItem>
            <SelectItem value="expired">已过期</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>;
}