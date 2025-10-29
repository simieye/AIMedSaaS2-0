// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Card, CardContent, Badge, Button, Switch, useToast } from '@/components/ui';
// @ts-ignore;
import { Watch, Heart, Activity, Thermometer, Battery, Wifi, Bluetooth, Settings, Trash2, Download, Upload, Play, Pause, AlertCircle, CheckCircle, XCircle, RefreshCw, Video, HelpCircle } from 'lucide-react';

export function DeviceCard({
  device,
  realtimeData,
  chartData,
  alerts,
  onToggleStatus,
  onDelete,
  onUpdateFirmware,
  onShowTutorial,
  isSelected,
  onToggleSelection
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const {
    toast
  } = useToast();
  const getStatusBadge = status => {
    const badges = {
      active: {
        label: '在线',
        color: 'bg-green-100 text-green-800',
        icon: <CheckCircle className="h-3 w-3" />
      },
      inactive: {
        label: '离线',
        color: 'bg-gray-100 text-gray-800',
        icon: <XCircle className="h-3 w-3" />
      },
      error: {
        label: '异常',
        color: 'bg-red-100 text-red-800',
        icon: <AlertCircle className="h-3 w-3" />
      }
    };
    return badges[status] || badges.inactive;
  };
  const getDeviceIcon = type => {
    const icons = {
      smartwatch: <Watch className="h-8 w-8" />,
      fitness_tracker: <Activity className="h-8 w-8" />,
      smart_ring: <Activity className="h-8 w-8" />,
      medical_device: <Heart className="h-8 w-8" />
    };
    return icons[type] || <Watch className="h-8 w-8" />;
  };
  const getConnectionIcon = type => {
    const icons = {
      bluetooth: <Bluetooth className="h-4 w-4" />,
      wifi: <Wifi className="h-4 w-4" />,
      usb: <Download className="h-4 w-4" />
    };
    return icons[type] || icons.bluetooth;
  };
  const getBatteryColor = level => {
    if (level > 60) return 'text-green-600';
    if (level > 30) return 'text-yellow-600';
    return 'text-red-600';
  };
  const getSignalColor = strength => {
    if (strength > 70) return 'text-green-600';
    if (strength > 40) return 'text-yellow-600';
    return 'text-red-600';
  };
  const handleQuickAction = action => {
    switch (action) {
      case 'sync':
        toast({
          title: "同步中",
          description: "正在同步设备数据...",
          variant: "default"
        });
        break;
      case 'restart':
        toast({
          title: "重启设备",
          description: "设备重启指令已发送",
          variant: "default"
        });
        break;
      case 'update':
        onUpdateFirmware(device._id);
        break;
      case 'tutorial':
        onShowTutorial(device.device_type);
        break;
      default:
        break;
    }
  };
  return <Card className={`transition-all duration-200 ${isSelected ? 'ring-2 ring-primary' : ''} ${isExpanded ? 'col-span-full' : ''}`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <input type="checkbox" checked={isSelected} onChange={() => onToggleSelection(device._id)} className="w-4 h-4 mt-1" />
            <div className="flex items-center justify-center w-12 h-12 bg-blue-50 rounded-full">
              {getDeviceIcon(device.device_type)}
            </div>
            <div>
              <h3 className="font-medium">{device.name}</h3>
              <p className="text-sm text-muted-foreground">
                {device.brand} {device.model}
              </p>
              <div className="flex items-center space-x-2 mt-1">
                <Badge className={getStatusBadge(device.status).color}>
                  {getStatusBadge(device.status).icon}
                  {getStatusBadge(device.status).label}
                </Badge>
                <div className="flex items-center text-xs text-muted-foreground">
                  {getConnectionIcon(device.connection_type)}
                  <span className="ml-1">{device.connection_type}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" onClick={() => setShowActions(!showActions)}>
              <Settings className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setIsExpanded(!isExpanded)}>
              {isExpanded ? <XCircle className="h-4 w-4" /> : <Activity className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* 实时数据 */}
        {realtimeData && Object.keys(realtimeData).length > 0 && <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            <div className="text-center p-2 bg-red-50 rounded-lg">
              <Heart className="h-4 w-4 mx-auto mb-1 text-red-600" />
              <p className="text-lg font-semibold">{realtimeData.heart_rate || '--'}</p>
              <p className="text-xs text-muted-foreground">bpm</p>
            </div>
            <div className="text-center p-2 bg-green-50 rounded-lg">
              <Activity className="h-4 w-4 mx-auto mb-1 text-green-600" />
              <p className="text-lg font-semibold">{realtimeData.steps || '0'}</p>
              <p className="text-xs text-muted-foreground">步数</p>
            </div>
            <div className="text-center p-2 bg-orange-50 rounded-lg">
              <Thermometer className="h-4 w-4 mx-auto mb-1 text-orange-600" />
              <p className="text-lg font-semibold">{realtimeData.temperature || '--'}</p>
              <p className="text-xs text-muted-foreground">°C</p>
            </div>
            <div className="text-center p-2 bg-blue-50 rounded-lg">
              <Battery className={`h-4 w-4 mx-auto mb-1 ${getBatteryColor(realtimeData.battery_level || 0)}`} />
              <p className="text-lg font-semibold">{realtimeData.battery_level || '--'}</p>
              <p className="text-xs text-muted-foreground">电量</p>
            </div>
          </div>}

        {/* 设备信息 */}
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">设备ID</span>
            <span className="font-mono">{device.device_id.slice(-8)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">信号强度</span>
            <span className={getSignalColor(device.signal_strength || 0)}>
              {device.signal_strength || 0}%
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">最后同步</span>
            <span>{realtimeData.last_update || '从未'}</span>
          </div>
        </div>

        {/* 警报信息 */}
        {alerts && alerts.length > 0 && <div className="mb-4">
            <div className="flex items-center space-x-2 mb-2">
              <AlertCircle className="h-4 w-4 text-red-500" />
              <span className="text-sm font-medium text-red-500">异常警报</span>
            </div>
            <div className="space-y-1">
              {alerts.slice(0, 2).map((alert, idx) => <div key={idx} className="text-xs text-red-600 bg-red-50 p-2 rounded">
                  {alert.message}
                </div>)}
            </div>
          </div>}

        {/* 快速操作 */}
        {showActions && <div className="border-t pt-3">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <Button variant="outline" size="sm" onClick={() => handleQuickAction('sync')}>
                <RefreshCw className="h-3 w-3 mr-1" />
                同步
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleQuickAction('restart')}>
                <RefreshCw className="h-3 w-3 mr-1" />
                重启
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleQuickAction('update')}>
                <Upload className="h-3 w-3 mr-1" />
                更新
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleQuickAction('tutorial')}>
                <HelpCircle className="h-3 w-3 mr-1" />
                教程
              </Button>
            </div>
          </div>}

        {/* 控制按钮 */}
        <div className="flex items-center justify-between pt-3 border-t">
          <div className="flex items-center space-x-2">
            <Switch checked={device.status === 'active'} onCheckedChange={() => onToggleStatus(device._id, device.status)} />
            <span className="text-sm">{device.status === 'active' ? '已启用' : '已停用'}</span>
          </div>
          <div className="flex space-x-2">
            <Button variant="ghost" size="sm" onClick={() => onToggleSelection(device._id)}>
              {isSelected ? '取消选择' : '选择'}
            </Button>
            <Button variant="ghost" size="sm" onClick={() => onDelete(device._id)} className="text-red-600 hover:text-red-700">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* 展开的详细信息 */}
        {isExpanded && <div className="mt-4 pt-4 border-t">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">设备详情</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">固件版本</span>
                    <span>{device.firmware_version || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">序列号</span>
                    <span className="font-mono">{device.serial_number || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">注册时间</span>
                    <span>{new Date(device.registered_at).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">支持功能</h4>
                <div className="flex flex-wrap gap-1">
                  {(device.capabilities || ['heart_rate', 'steps', 'temperature']).map(capability => <Badge key={capability} variant="outline" className="text-xs">
                      {capability.replace('_', ' ')}
                    </Badge>)}
                </div>
              </div>
            </div>
          </div>}
      </CardContent>
    </Card>;
}