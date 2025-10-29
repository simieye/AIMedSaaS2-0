// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Card, CardContent, Badge, Button } from '@/components/ui';
// @ts-ignore;
import { Key, Clock, Shield, Copy, RefreshCw, XCircle } from 'lucide-react';

export function ApiKeyCard({
  apiKey,
  isSelected,
  onSelect
}) {
  const getStatusBadge = status => {
    const badges = {
      active: {
        label: '正常',
        color: 'bg-green-100 text-green-800'
      },
      expired: {
        label: '已过期',
        color: 'bg-red-100 text-red-800'
      },
      revoked: {
        label: '已吊销',
        color: 'bg-gray-100 text-gray-800'
      }
    };
    return badges[status] || badges.active;
  };
  const getUsageBadge = usage => {
    if (usage > 90) return {
      label: '高使用',
      color: 'bg-red-100 text-red-800'
    };
    if (usage > 70) return {
      label: '中使用',
      color: 'bg-yellow-100 text-yellow-800'
    };
    return {
      label: '低使用',
      color: 'bg-green-100 text-green-800'
    };
  };
  const formatDate = dateString => {
    return new Date(dateString).toLocaleDateString('zh-CN');
  };
  const copyToClipboard = text => {
    navigator.clipboard.writeText(text);
  };
  return <Card className={`${isSelected ? 'ring-2 ring-primary' : ''}`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <input type="checkbox" checked={isSelected} onChange={() => onSelect(apiKey._id)} className="w-4 h-4 mt-1" />
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Key className="h-4 w-4 text-muted-foreground" />
                <span className="font-mono text-sm">{apiKey.key.slice(0, 8)}...{apiKey.key.slice(-4)}</span>
                <Button variant="ghost" size="sm" onClick={() => copyToClipboard(apiKey.key)}>
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
              
              <div className="text-sm text-muted-foreground">
                <p>{apiKey.name}</p>
                <p>创建者: {apiKey.created_by}</p>
              </div>
              
              <div className="flex items-center space-x-2">
                <Badge className={getStatusBadge(apiKey.status).color}>
                  {getStatusBadge(apiKey.status).label}
                </Badge>
                <Badge className={getUsageBadge(apiKey.usage_percentage).color}>
                  {getUsageBadge(apiKey.usage_percentage).label}
                </Badge>
              </div>
            </div>
          </div>
          
          <div className="text-right text-sm text-muted-foreground">
            <div className="flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              <span>到期: {formatDate(apiKey.expires_at)}</span>
            </div>
            <div className="mt-1">
              <span>使用: {apiKey.usage_count}/{apiKey.usage_limit}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>;
}