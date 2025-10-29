// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Input, Select, Button, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui';
// @ts-ignore;
import { Search, Download, Plus } from 'lucide-react';

export function FinancialSearchFilter({
  searchTerm,
  onSearchChange,
  selectedStatus,
  onStatusChange,
  selectedPeriod,
  onPeriodChange,
  onExport,
  onCreateBill,
  className,
  style
}) {
  return <div className={className} style={style}>
      <div className="grid grid-cols-3 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input placeholder="搜索项目名称、赞助商或发票号..." value={searchTerm} onChange={e => onSearchChange(e.target.value)} className="pl-10" />
        </div>
        
        <Select value={selectedStatus} onValueChange={onStatusChange}>
          <SelectTrigger>
            <SelectValue placeholder="选择状态" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部状态</SelectItem>
            <SelectItem value="paid">已付款</SelectItem>
            <SelectItem value="pending">待付款</SelectItem>
            <SelectItem value="overdue">逾期</SelectItem>
            <SelectItem value="cancelled">已取消</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedPeriod} onValueChange={onPeriodChange}>
          <SelectTrigger>
            <SelectValue placeholder="选择时间范围" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部时间</SelectItem>
            <SelectItem value="current_month">本月</SelectItem>
            <SelectItem value="last_month">上月</SelectItem>
            <SelectItem value="current_quarter">本季度</SelectItem>
            <SelectItem value="current_year">本年</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>;
}