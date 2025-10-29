// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, Button, Badge, useToast } from '@/components/ui';
// @ts-ignore;
import { Search, Wifi, Bluetooth, Usb, RefreshCw, CheckCircle, XCircle, Loader2, Watch, Smartphone, Activity } from 'lucide-react';

export function DeviceDiscoveryModal({
  isOpen,
  onClose,
  onDeviceAdd
}) {
  const [isScanning, setIsScanning] = useState(false);
  const [discoveredDevices, setDiscoveredDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState({});
  const {
    toast
  } = useToast();
  useEffect(() => {
    if (isOpen && !isScanning) {
      startDiscovery();
    }
  }, [isOpen]);
  const startDiscovery = async () => {
    setIsScanning(true);
    setDiscoveredDevices([]);

    // 模拟设备发现过程
    const mockDevices = [{
      device_id: `device_${Date.now()}_1`,
      name: 'Apple Watch Series 8',
      brand: 'Apple',
      model: 'Series 8',
      device_type: 'smartwatch',
      connection_type: 'bluetooth',
      signal_strength: 85,
      battery_level: 75,
      is_paired: false,
      capabilities: ['heart_rate', 'steps', 'sleep', 'temperature', 'blood_oxygen'],
      firmware_version: '9.0.1',
      last_seen: new Date().toISOString()
    }, {
      device_id: `device_${Date.now()}_2`,
      name: 'Fitbit Charge 5',
      brand: 'Fitbit',
      model: 'Charge 5',
      device_type: 'fitness_tracker',
      connection_type: 'bluetooth',
      signal_strength: 72,
      battery_level: 60,
      is_paired: false,
      capabilities: ['heart_rate', 'steps', 'sleep', 'stress'],
      firmware_version: '1.2.3',
      last_seen: new Date().toISOString()
    }, {
      device_id: `device_${Date.now()}_3`,
      name: 'Oura Ring Gen 3',
      brand: 'Oura',
      model: 'Gen 3',
      device_type: 'smart_ring',
      connection_type: 'bluetooth',
      signal_strength: 68,
      battery_level: 45,
      is_paired: false,
      capabilities: ['heart_rate', 'sleep', 'temperature', 'activity'],
      firmware_version: '2.4.1',
      last_seen: new Date().toISOString()
    }];

    // 模拟扫描延迟
    setTimeout(() => {
      setDiscoveredDevices(mockDevices);
      setIsScanning(false);
    }, 3000);
  };
  const connectToDevice = async device => {
    setSelectedDevice(device.device_id);
    setConnectionStatus(prev => ({
      ...prev,
      [device.device_id]: 'connecting'
    }));
    try {
      // 模拟连接过程
      await new Promise(resolve => setTimeout(resolve, 2000));
      setConnectionStatus(prev => ({
        ...prev,
        [device.device_id]: 'connected'
      }));
      toast({
        title: "设备连接成功",
        description: `${device.name} 已成功连接`,
        variant: "default"
      });

      // 自动添加设备
      onDeviceAdd(device);

      // 延迟关闭模态框
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (error) {
      setConnectionStatus(prev => ({
        ...prev,
        [device.device_id]: 'error'
      }));
      toast({
        title: "连接失败",
        description: `无法连接到 ${device.name}`,
        variant: "destructive"
      });
    }
  };
  const getConnectionIcon = type => {
    const icons = {
      bluetooth: <Bluetooth className="h-4 w-4" />,
      wifi: <Wifi className="h-4 w-4" />,
      usb: <Usb className="h-4 w-4" />
    };
    return icons[type] || icons.bluetooth;
  };
  const getDeviceIcon = type => {
    const icons = {
      smartwatch: <Watch className="h-6 w-6" />,
      fitness_tracker: <Activity className="h-6 w-6" />,
      smart_ring: <Activity className="h-6 w-6" />,
      medical_device: <Smartphone className="h-6 w-6" />
    };
    return icons[type] || <Watch className="h-6 w-6" />;
  };
  const getStatusBadge = status => {
    const badges = {
      connecting: {
        label: '连接中',
        color: 'bg-yellow-100 text-yellow-800'
      },
      connected: {
        label: '已连接',
        color: 'bg-green-100 text-green-800'
      },
      error: {
        label: '连接失败',
        color: 'bg-red-100 text-red-800'
      }
    };
    return badges[status] || badges.connecting;
  };
  return <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>发现新设备</DialogTitle>
          <DialogDescription>
            扫描附近的智能穿戴设备并添加到您的健康监测系统
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {isScanning ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
              <span className="text-sm font-medium">
                {isScanning ? '正在扫描设备...' : '扫描完成'}
              </span>
            </div>
            <Button variant="outline" size="sm" onClick={startDiscovery} disabled={isScanning}>
              <RefreshCw className="h-4 w-4 mr-2" />
              重新扫描
            </Button>
          </div>
          
          {isScanning && <div className="text-center py-8">
              <div className="animate-pulse">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <Search className="h-8 w-8 text-blue-600" />
                </div>
                <p className="text-muted-foreground">正在搜索附近的设备...</p>
              </div>
            </div>}
          
          {!isScanning && discoveredDevices.length === 0 && <div className="text-center py-8">
              <XCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">未发现设备</h3>
              <p className="text-muted-foreground mb-4">请确保设备已开启并处于可发现状态</p>
              <Button onClick={startDiscovery}>
                <RefreshCw className="h-4 w-4 mr-2" />
                重新扫描
              </Button>
            </div>}
          
          {discoveredDevices.length > 0 && <div className="space-y-3 max-h-96 overflow-y-auto">
              {discoveredDevices.map(device => {
            const status = connectionStatus[device.device_id];
            return <div key={device.device_id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full">
                        {getDeviceIcon(device.device_type)}
                      </div>
                      
                      <div>
                        <h4 className="font-medium">{device.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {device.brand} {device.model}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <div className="flex items-center text-xs text-muted-foreground">
                            {getConnectionIcon(device.connection_type)}
                            <span className="ml-1">{device.connection_type}</span>
                          </div>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <span>信号: {device.signal_strength}%</span>
                          </div>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <span>电量: {device.battery_level}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {status && <Badge className={getStatusBadge(status).color}>
                          {getStatusBadge(status).label}
                        </Badge>}
                      
                      <Button size="sm" onClick={() => connectToDevice(device)} disabled={status === 'connecting' || status === 'connected'}>
                        {status === 'connecting' ? <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            连接中
                          </> : status === 'connected' ? <>
                            <CheckCircle className="h-4 w-4 mr-2" />
                            已连接
                          </> : '连接'}
                      </Button>
                    </div>
                  </div>
                  
                  {device.capabilities && <div className="mt-3">
                      <p className="text-xs text-muted-foreground mb-1">支持功能:</p>
                      <div className="flex flex-wrap gap-1">
                        {device.capabilities.map(capability => <Badge key={capability} variant="outline" className="text-xs">
                            {capability.replace('_', ' ')}
                          </Badge>)}
                      </div>
                    </div>}
                </div>;
          })}
            </div>}
        </div>
      </DialogContent>
    </Dialog>;
}