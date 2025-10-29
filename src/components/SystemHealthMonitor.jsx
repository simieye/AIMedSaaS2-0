// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
// @ts-ignore;
import { Activity, AlertCircle, CheckCircle } from 'lucide-react';

export function SystemHealthMonitor() {
  const [healthData, setHealthData] = useState({
    cpu: 45,
    memory: 62,
    disk: 78,
    network: 89,
    services: [{
      name: 'AI诊断服务',
      status: 'healthy',
      uptime: '99.8%'
    }, {
      name: '患者管理服务',
      status: 'healthy',
      uptime: '99.9%'
    }, {
      name: '合作伙伴API',
      status: 'warning',
      uptime: '98.5%'
    }, {
      name: '可穿戴数据',
      status: 'healthy',
      uptime: '99.7%'
    }]
  });
  useEffect(() => {
    const interval = setInterval(() => {
      setHealthData(prev => ({
        ...prev,
        cpu: Math.floor(Math.random() * 30) + 40,
        memory: Math.floor(Math.random() * 20) + 55,
        disk: Math.floor(Math.random() * 15) + 70,
        network: Math.floor(Math.random() * 10) + 85
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  const getStatusColor = status => {
    switch (status) {
      case 'healthy':
        return 'text-green-600';
      case 'warning':
        return 'text-yellow-600';
      case 'error':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };
  const getStatusIcon = status => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="h-4 w-4" />;
      case 'warning':
        return <AlertCircle className="h-4 w-4" />;
      case 'error':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };
  return <Card>
      <CardHeader>
        <CardTitle>系统健康监控</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex justify-between text-sm">
                <span>CPU使用率</span>
                <span>{healthData.cpu}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{
                width: `${healthData.cpu}%`
              }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm">
                <span>内存使用</span>
                <span>{healthData.memory}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{
                width: `${healthData.memory}%`
              }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm">
                <span>磁盘使用</span>
                <span>{healthData.disk}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-600 h-2 rounded-full" style={{
                width: `${healthData.disk}%`
              }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm">
                <span>网络流量</span>
                <span>{healthData.network}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{
                width: `${healthData.network}%`
              }} />
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-medium">服务状态</h4>
            {healthData.services.map(service => <div key={service.name} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span className="text-sm">{service.name}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm">{service.uptime}</span>
                  <div className={`${getStatusColor(service.status)}`}>
                    {getStatusIcon(service.status)}
                  </div>
                </div>
              </div>)}
          </div>
        </div>
      </CardContent>
    </Card>;
}