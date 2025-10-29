// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
// @ts-ignore;
import { Activity, FootprintsIcon, Moon, Zap, TrendingUp } from 'lucide-react';

// @ts-ignore;
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
// @ts-ignore;

export function DeviceAnalytics({
  devices,
  analytics,
  realtimeData
}) {
  const deviceTypeData = devices.reduce((acc, device) => {
    const type = device.device_type || 'unknown';
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});
  const pieData = Object.entries(deviceTypeData).map(([type, count]) => ({
    name: getDeviceTypeName(type),
    value: count
  }));
  const performanceData = devices.map(device => {
    const deviceAnalytics = analytics[device._id] || {};
    const realtime = realtimeData[device.device_id] || {};
    return {
      name: `${device.brand} ${device.model}`,
      steps: deviceAnalytics.totalSteps || 0,
      activeMinutes: deviceAnalytics.activeMinutes || 0,
      sleepHours: parseFloat(deviceAnalytics.sleepHours || 0),
      calories: deviceAnalytics.caloriesBurned || 0,
      heartRate: realtime.heart_rate || 75,
      battery: realtime.battery_level || 100
    };
  });
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];
  const getDeviceTypeName = type => {
    const names = {
      smartwatch: '智能手表',
      fitness_tracker: '健身追踪器',
      smart_ring: '智能戒指',
      medical_device: '医疗设备',
      unknown: '未知设备'
    };
    return names[type] || names.unknown;
  };
  const totalSteps = performanceData.reduce((sum, device) => sum + device.steps, 0);
  const totalCalories = performanceData.reduce((sum, device) => sum + device.calories, 0);
  const avgSleep = performanceData.length > 0 ? performanceData.reduce((sum, device) => sum + device.sleepHours, 0) / performanceData.length : 0;
  const avgActiveMinutes = performanceData.length > 0 ? performanceData.reduce((sum, device) => sum + device.activeMinutes, 0) / performanceData.length : 0;
  return <div className="space-y-6">
      {/* 设备统计概览 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Activity className="h-8 w-8 mr-3 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">{totalSteps.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">总步数</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Zap className="h-8 w-8 mr-3 text-orange-500" />
              <div>
                <p className="text-2xl font-bold">{totalCalories.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">总卡路里</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Moon className="h-8 w-8 mr-3 text-purple-500" />
              <div>
                <p className="text-2xl font-bold">{avgSleep.toFixed(1)}</p>
                <p className="text-sm text-muted-foreground">平均睡眠(小时)</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <FootprintsIcon className="h-8 w-8 mr-3 text-green-500" />
              <div>
                <p className="text-2xl font-bold">{Math.round(avgActiveMinutes)}</p>
                <p className="text-sm text-muted-foreground">平均活动(分钟)</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 设备类型分布 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">设备类型分布</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" labelLine={false} label={({
                name,
                percent
              }) => `${name} ${(percent * 100).toFixed(0)}%`} outerRadius={80} fill="#8884d8" dataKey="value">
                  {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        {/* 设备性能对比 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">设备性能对比</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="steps" fill="#8884d8" name="步数" />
                <Bar dataKey="activeMinutes" fill="#82ca9d" name="活动分钟" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      {/* 健康指标趋势 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">健康指标趋势</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="heartRate" stroke="#ff7300" name="心率" />
              <Line type="monotone" dataKey="battery" stroke="#387908" name="电量" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>;
}