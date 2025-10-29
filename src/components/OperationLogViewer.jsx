// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Badge, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, useToast } from '@/components/ui';
// @ts-ignore;
import { Search, Filter, Clock, User, FileText, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

export function OperationLogViewer() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterUser, setFilterUser] = useState('all');
  const [dateRange, setDateRange] = useState('7d');
  const {
    toast
  } = useToast();
  const logTypes = {
    patient: '患者管理',
    doctor: '医生管理',
    api_key: 'API密钥管理',
    import: '数据导入',
    export: '数据导出',
    batch_operation: '批量操作'
  };
  const logLevels = {
    success: {
      label: '成功',
      color: 'bg-green-100 text-green-800',
      icon: CheckCircle
    },
    warning: {
      label: '警告',
      color: 'bg-yellow-100 text-yellow-800',
      icon: AlertTriangle
    },
    error: {
      label: '错误',
      color: 'bg-red-100 text-red-800',
      icon: XCircle
    },
    info: {
      label: '信息',
      color: 'bg-blue-100 text-blue-800',
      icon: FileText
    }
  };
  useEffect(() => {
    loadLogs();
  }, [filterType, filterUser, dateRange]);
  const loadLogs = async () => {
    try {
      setLoading(true);
      let whereClause = {};
      if (filterType !== 'all') {
        whereClause.operation_type = {
          $eq: filterType
        };
      }
      if (filterUser !== 'all') {
        whereClause.operator_id = {
          $eq: filterUser
        };
      }

      // 日期范围过滤
      const now = new Date();
      let startDate;
      switch (dateRange) {
        case '1d':
          startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
          break;
        case '7d':
          startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
        case '30d':
          startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          break;
        default:
          startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      }
      whereClause.created_at = {
        $gte: startDate.toISOString()
      };
      const response = await $w.cloud.callDataSource({
        dataSourceName: 'admin_log',
        methodName: 'wedaGetRecordsV2',
        params: {
          select: {
            $master: true
          },
          filter: {
            where: whereClause
          },
          orderBy: [{
            created_at: 'desc'
          }],
          getCount: true
        }
      });
      setLogs(response.records || []);
    } catch (error) {
      toast({
        title: "加载日志失败",
        description: error.message || "无法获取操作日志",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  const filteredLogs = logs.filter(log => {
    const matchesSearch = searchTerm === '' || log.operation_type?.toLowerCase().includes(searchTerm.toLowerCase()) || log.target_type?.toLowerCase().includes(searchTerm.toLowerCase()) || log.operator_id?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });
  const formatDateTime = dateString => {
    return new Date(dateString).toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };
  return <div className="space-y-4">
    <div className="flex items-center justify-between">
      <h3 className="text-lg font-medium">操作日志审计</h3>
      <Badge variant="outline">
        {filteredLogs.length} 条记录
      </Badge>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input placeholder="搜索日志..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10" />
      </div>
      
      <Select value={filterType} onValueChange={setFilterType}>
        <SelectTrigger>
          <SelectValue placeholder="操作类型" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">全部类型</SelectItem>
          {Object.entries(logTypes).map(([key, label]) => <SelectItem key={key} value={key}>{label}</SelectItem>)}
        </SelectContent>
      </Select>
      
      <Select value={filterUser} onValueChange={setFilterUser}>
        <SelectTrigger>
          <SelectValue placeholder="操作人" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">全部用户</SelectItem>
          <SelectItem value="current_user_id">当前用户</SelectItem>
        </SelectContent>
      </Select>
      
      <Select value={dateRange} onValueChange={setDateRange}>
        <SelectTrigger>
          <SelectValue placeholder="时间范围" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1d">最近1天</SelectItem>
          <SelectItem value="7d">最近7天</SelectItem>
          <SelectItem value="30d">最近30天</SelectItem>
        </SelectContent>
      </Select>
    </div>
    
    <div className="border rounded-lg">
      <div className="max-h-96 overflow-y-auto">
        {loading ? <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div> : filteredLogs.length === 0 ? <div className="text-center py-8 text-muted-foreground">
            暂无操作日志
          </div> : <div className="divide-y">
            {filteredLogs.map((log, index) => {
            const levelConfig = logLevels[log.level || 'info'];
            return <div key={index} className="p-4 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge className={levelConfig.color}>
                          <levelConfig.icon className="h-3 w-3 mr-1" />
                          {logTypes[log.operation_type] || log.operation_type}
                        </Badge>
                        <Badge variant="outline">
                          {log.target_type}
                        </Badge>
                      </div>
                      
                      <div className="text-sm space-y-1">
                        <div className="flex items-center text-muted-foreground">
                          <User className="h-3 w-3 mr-1" />
                          <span>{log.operator_id}</span>
                          <Clock className="h-3 w-3 ml-3 mr-1" />
                          <span>{formatDateTime(log.created_at)}</span>
                        </div>
                        
                        <div>
                          <span className="font-medium">操作对象：</span>
                          <span>{log.target_ids?.length || 0} 个{item}</span>
                        </div>
                        
                        {log.total_count && <div>
                            <span className="font-medium">处理结果：</span>
                            <span className="text-green-600">成功 {log.success_count}</span>
                            <span className="mx-1">/</span>
                            <span className="text-red-600">失败 {log.error_count}</span>
                          </div>}
                      </div>
                    </div>
                  </div>
                </div>;
          })}
          </div>}
      </div>
    </div>
  </div>;
}