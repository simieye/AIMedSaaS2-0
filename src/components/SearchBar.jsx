// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Input, Button } from '@/components/ui';
// @ts-ignore;
import { Search, Filter, X } from 'lucide-react';

export function SearchBar({
  placeholder = "搜索...",
  onSearch,
  onFilter,
  showFilters = false
}) {
  const [query, setQuery] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const handleSearch = e => {
    e.preventDefault();
    onSearch(query);
  };
  const handleClear = () => {
    setQuery('');
    onSearch('');
  };
  return <div className="space-y-2">
      <form onSubmit={handleSearch} className="flex space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input type="search" placeholder={placeholder} value={query} onChange={e => setQuery(e.target.value)} className="pl-10 pr-10" />
          {query && <button type="button" onClick={handleClear} className="absolute right-3 top-1/2 -translate-y-1/2">
              <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
            </button>}
        </div>
        {onFilter && <Button type="button" variant="outline" onClick={() => setShowAdvanced(!showAdvanced)}>
            <Filter className="h-4 w-4 mr-2" />
            筛选
          </Button>}
      </form>
      
      {showAdvanced && showFilters && <div className="p-4 bg-gray-50 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* 这里可以添加具体的筛选条件 */}
            <div>
              <label className="text-sm font-medium">日期范围</label>
              <Input type="date" />
            </div>
            <div>
              <label className="text-sm font-medium">状态</label>
              <select className="w-full p-2 border rounded-md">
                <option>全部</option>
                <option>活跃</option>
                <option>暂停</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">类型</label>
              <select className="w-full p-2 border rounded-md">
                <option>全部</option>
                <option>诊断</option>
                <option>随访</option>
              </select>
            </div>
          </div>
        </div>}
    </div>;
}