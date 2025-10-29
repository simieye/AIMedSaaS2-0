// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Badge, Input, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui';
// @ts-ignore;
import { Key, Copy, RotateCcw, Trash2, Plus } from 'lucide-react';

export function ApiKeys({
  partnerId,
  t
}) {
  // 防御式处理：确保 t 存在
  const safeT = t || (key => key);
  const [keys, setKeys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  useEffect(() => {
    loadApiKeys();
  }, [partnerId]);
  const loadApiKeys = async () => {
    try {
      setLoading(true);
      // 模拟数据加载
      setTimeout(() => {
        setKeys([{
          id: 'key-001',
          name: '生产环境密钥',
          key: 'ak_prod_xxx...',
          permissions: ['read', 'write'],
          status: 'active',
          createdAt: '2024-01-15',
          expiresAt: '2024-12-31'
        }, {
          id: 'key-002',
          name: '测试环境密钥',
          key: 'ak_test_xxx...',
          permissions: ['read'],
          status: 'active',
          createdAt: '2024-01-10',
          expiresAt: '2024-06-30'
        }]);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Failed to load API keys:', error);
      setLoading(false);
    }
  };
  const handleCreateKey = keyData => {
    const newKey = {
      id: `key-${Date.now()}`,
      ...keyData,
      key: `ak_${keyData.environment}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'active'
    };
    setKeys([...keys, newKey]);
    setShowCreateForm(false);
  };
  const handleDeleteKey = keyId => {
    setKeys(keys.filter(key => key.id !== keyId));
  };
  const handleCopyKey = key => {
    navigator.clipboard.writeText(key);
  };
  const getStatusBadge = status => {
    const variants = {
      active: 'default',
      inactive: 'secondary',
      expired: 'destructive'
    };
    return variants[status] || 'secondary';
  };
  const getStatusText = status => {
    const statusMap = {
      active: safeT('active'),
      inactive: safeT('inactive'),
      expired: safeT('expired')
    };
    return statusMap[status] || status;
  };
  return <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{safeT('apiKeys')}</h2>
        <Button onClick={() => setShowCreateForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          {safeT('createApiKey')}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{safeT('apiKeys')}</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? <div className="text-center py-12">
              <Key className="h-12 w-12 mx-auto text-gray-400 mb-4 animate-spin" />
              <p className="text-gray-500">{safeT('loading')}</p>
            </div> : keys.length === 0 ? <div className="text-center py-12">
              <Key className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500">{safeT('noData')}</p>
            </div> : <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{safeT('name')}</TableHead>
                  <TableHead>{safeT('key')}</TableHead>
                  <TableHead>{safeT('permissions')}</TableHead>
                  <TableHead>{safeT('status')}</TableHead>
                  <TableHead>{safeT('createdAt')}</TableHead>
                  <TableHead>{safeT('expiresAt')}</TableHead>
                  <TableHead>{safeT('actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {keys.map(key => <TableRow key={key.id}>
                    <TableCell>{key.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <code className="text-sm">{key.key}</code>
                        <Button size="sm" variant="ghost" onClick={() => handleCopyKey(key.key)}>
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>{key.permissions.join(', ')}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadge(key.status)}>{getStatusText(key.status)}</Badge>
                    </TableCell>
                    <TableCell>{key.createdAt}</TableCell>
                    <TableCell>{key.expiresAt}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="ghost">
                          <RotateCcw className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-red-600" onClick={() => handleDeleteKey(key.id)}>
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>)}
              </TableBody>
            </Table>}
        </CardContent>
      </Card>
    </div>;
}