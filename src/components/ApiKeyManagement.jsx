// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Badge, useToast } from '@/components/ui';
// @ts-ignore;
import { Plus, Search, Key, Shield, Clock, Download, Upload } from 'lucide-react';

// @ts-ignore;
import { ApiKeyCard } from './ApiKeyCard';
// @ts-ignore;
import { BatchOperations } from './BatchOperations';
// @ts-ignore;
import { OperationLogViewer } from './OperationLogViewer';
export function ApiKeyManagement() {
  const [apiKeys, setApiKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [showBatchOperations, setShowBatchOperations] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    toast
  } = useToast();
  useEffect(() => {
    loadApiKeys();
  }, []);
  const loadApiKeys = async () => {
    try {
      setLoading(true);
      const response = await $w.cloud.callDataSource({
        dataSourceName: 'api_keys',
        methodName: 'wedaGetRecordsV2',
        params: {
          select: {
            $master: true
          },
          orderBy: [{
            created_at: 'desc'
          }],
          getCount: true
        }
      });
      setApiKeys(response.records || []);
    } catch (error) {
      toast({
        title: "加载API密钥失败",
        description: error.message || "无法获取API密钥列表",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  const handleSelectKey = keyId => {
    setSelectedKeys(prev => prev.includes(keyId) ? prev.filter(id => id !== keyId) : [...prev, keyId]);
  };
  const handleSelectAll = () => {
    if (selectedKeys.length === filteredKeys.length) {
      setSelectedKeys([]);
    } else {
      setSelectedKeys(filteredKeys.map(k => k._id));
    }
  };
  const handleBatchAction = async (action, successCount, errorCount) => {
    setShowBatchOperations(false);
    if (successCount > 0) {
      await loadApiKeys();
      setSelectedKeys([]);
    }
  };
  const filteredKeys = apiKeys.filter(key => {
    const matchesSearch = key.name?.toLowerCase().includes(searchTerm.toLowerCase()) || key.key?.includes(searchTerm) || key.created_by?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || key.status === filterStatus;
    const matchesType = filterType === 'all' || key.type === filterType;
    return matchesSearch && matchesStatus && matchesType;
  });
  const keyTypes = [...new Set(apiKeys.map(k => k.type).filter(Boolean))];
  return <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">API密钥管理</h2>
          <p className="text-muted-foreground">管理API密钥和访问权限</p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={() => setShowBatchOperations(true)} disabled={selectedKeys.length === 0}>
            <Shield className="h-4 w-4 mr-2" />
            批量操作 ({selectedKeys.length})
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            创建密钥
          </Button>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input placeholder="搜索密钥..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10" />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="状态筛选" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部状态</SelectItem>
            <SelectItem value="active">正常</SelectItem>
            <SelectItem value="expired">已过期</SelectItem>
            <SelectItem value="revoked">已吊销</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="类型筛选" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部类型</SelectItem>
            {keyTypes.map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div className="border rounded-lg">
        <div className="p-4 border-b bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <input type="checkbox" checked={selectedKeys.length === filteredKeys.length && filteredKeys.length > 0} onChange={handleSelectAll} className="w-4 h-4" />
              <span className="text-sm text-muted-foreground">
                全选 ({selectedKeys.length}/{filteredKeys.length})
              </span>
            </div>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span>共 {filteredKeys.length} 个密钥</span>
              <span>已选择 {selectedKeys.length} 个</span>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-4">
          {loading ? <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div> : filteredKeys.length === 0 ? <div className="text-center py-8 text-muted-foreground">
              暂无API密钥数据
            </div> : filteredKeys.map(key => <ApiKeyCard key={key._id} apiKey={key} isSelected={selectedKeys.includes(key._id)} onSelect={handleSelectKey} />)}
        </div>
      </div>

      {showBatchOperations && <BatchOperations type="api_key" selectedItems={selectedKeys} onComplete={handleBatchAction} onCancel={() => setShowBatchOperations(false)} />}

      <OperationLogViewer />
    </div>;
}