// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Card, CardContent, Badge, Progress } from '@/components/ui';
// @ts-ignore;
import { Heart, Activity, Thermometer, Battery, Droplets, Brain, TrendingUp, TrendingDown, Minus } from 'lucide-react';

export function HealthMetricsCard({
  device,
  data
}) {
  const getMetricStatus = (value, min, max) => {
    if (value < min || value > max) {
      return {
        status: 'abnormal',
        color: 'text-red-600',
        bgColor: 'bg-red-100'
      };
    }
    return {
      status: 'normal',
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    };
  };
  const getTrendIcon = trend => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-3 w-3 text-green-500" />;
      case 'down':
        return <TrendingDown className="h-3 w-3 text-red-500" />;
      default:
        return <Minus className="h-3 w-3 text-gray-500" />;
    }
  };
  const heartRateStatus = getMetricStatus(data.heart_rate || 75, 60, 100);
  const temperatureStatus = getMetricStatus(data.temperature || 36.5, 36.0, 37.5);
  const oxygenStatus = getMetricStatus(data.blood_oxygen || 98, 95, 100);
  const batteryStatus = getMetricStatus(data.battery_level || 100, 20, 100);
  return <Card className="h-full">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium text-sm">{device.brand} {device.model}</h3>
          <Badge variant={device.status === 'active' ? 'default' : 'secondary'}>
            {device.status === 'active' ? '在线' : '离线'}
          </Badge>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {/* 心率 */}
          <div className="flex items-center space-x-2">
            <Heart className={`h-4 w-4 ${heartRateStatus.color}`} />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">心率</span>
                {getTrendIcon('stable')}
              </div>
              <div className={`text-sm font-medium ${heartRateStatus.color}`}>
                {data.heart_rate || '--'}
                <span className="text-xs text-muted-foreground ml-1">bpm</span>
              </div>
            </div>
          </div>
          
          {/* 体温 */}
          <div className="flex items-center space-x-2">
            <Thermometer className={`h-4 w-4 ${temperatureStatus.color}`} />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">体温</span>
                {getTrendIcon('stable')}
              </div>
              <div className={`text-sm font-medium ${temperatureStatus.color}`}>
                {data.temperature || '--'}
                <span className="text-xs text-muted-foreground ml-1">°C</span>
              </div>
            </div>
          </div>
          
          {/* 血氧 */}
          <div className="flex items-center space-x-2">
            <Droplets className={`h-4 w-4 ${oxygenStatus.color}`} />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">血氧</span>
                {getTrendIcon('stable')}
              </div>
              <div className={`text-sm font-medium ${oxygenStatus.color}`}>
                {data.blood_oxygen || '--'}
                <span className="text-xs text-muted-foreground ml-1">%</span>
              </div>
            </div>
          </div>
          
          {/* 电量 */}
          <div className="flex items-center space-x-2">
            <Battery className={`h-4 w-4 ${batteryStatus.color}`} />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">电量</span>
                {getTrendIcon('down')}
              </div>
              <div className="flex items-center space-x-1">
                <div className={`text-sm font-medium ${batteryStatus.color}`}>
                  {data.battery_level || '--'}
                  <span className="text-xs text-muted-foreground ml-1">%</span>
                </div>
                <Progress value={data.battery_level || 0} className="flex-1 h-1" />
              </div>
            </div>
          </div>
        </div>
        
        {/* 压力水平 */}
        {data.stress_level !== undefined && <div className="mt-3 pt-3 border-t">
            <div className="flex items-center space-x-2">
              <Brain className="h-4 w-4 text-purple-500" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">压力</span>
                  {getTrendIcon(data.stress_level > 50 ? 'up' : 'down')}
                </div>
                <div className="flex items-center space-x-1">
                  <div className="text-sm font-medium text-purple-600">
                    {data.stress_level}
                    <span className="text-xs text-muted-foreground ml-1">%</span>
                  </div>
                  <Progress value={data.stress_level} className="flex-1 h-1" />
                </div>
              </div>
            </div>
          </div>}
        
        {/* 最后更新时间 */}
        <div className="mt-3 pt-3 border-t text-xs text-muted-foreground">
          更新: {data.last_update || '--'}
        </div>
      </CardContent>
    </Card>;
}