// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Badge, Progress } from '@/components/ui';
// @ts-ignore;
import { TrendingUp, TrendingDown, Minus, Calendar, Clock, Target, Award, AlertTriangle } from 'lucide-react';

// @ts-ignore;
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
// @ts-ignore;

export function HealthTrendAnalysis({
  devices,
  healthTrends,
  realtimeData
}) {
  // 生成趋势数据
  const generateTrendData = () => {
    const data = [];
    const now = new Date();
    for (let i = 29; i >= 0; i--) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      data.push({
        date: date.toLocaleDateString('zh-CN', {
          month: '2-digit',
          day: '2-digit'
        }),
        heartRate: 70 + Math.random() * 20,
        steps: Math.floor(Math.random() * 10000) + 5000,
        sleep: 6 + Math.random() * 3,
        stress: 20 + Math.random() * 60,
        weight: 70 + Math.random() * 5 - 2.5
      });
    }
    return data;
  };
  const trendData = generateTrendData();

  // 健康评分雷达图数据
  const radarData = [{
    subject: '心率健康',
    value: 85,
    fullMark: 100
  }, {
    subject: '活动量',
    value: 75,
    fullMark: 100
  }, {
    subject: '睡眠质量',
    value: 80,
    fullMark: 100
  }, {
    subject: '压力管理',
    value: 70,
    fullMark: 100
  }, {
    subject: '体重控制',
    value: 90,
    fullMark: 100
  }, {
    subject: '血氧水平',
    value: 95,
    fullMark: 100
  }];
  const getTrendIcon = (value, threshold = 0) => {
    if (value > threshold) {
      return <TrendingUp className="h-4 w-4 text-green-500" />;
    } else if (value < threshold) {
      return <TrendingDown className="h-4 w-4 text-red-500" />;
    }
    return <Minus className="h-4 w-4 text-gray-500" />;
  };
  const getTrendColor = (value, threshold = 0) => {
    if (value > threshold) {
      return 'text-green-600';
    } else if (value < threshold) {
      return 'text-red-600';
    }
    return 'text-gray-600';
  };
  const calculateWeeklyAverage = (data, field) => {
    const recentData = data.slice(-7);
    const sum = recentData.reduce((acc, item) => acc + item[field], 0);
    return (sum / recentData.length).toFixed(1);
  };
  const calculateMonthlyChange = (data, field) => {
    const firstWeek = data.slice(0, 7);
    const lastWeek = data.slice(-7);
    const firstAvg = firstWeek.reduce((acc, item) => acc + item[field], 0) / firstWeek.length;
    const lastAvg = lastWeek.reduce((acc, item) => acc + item[field], 0) / lastWeek.length;
    return ((lastAvg - firstAvg) / firstAvg * 100).toFixed(1);
  };
  return <div className="space-y-6">
      {/* 趋势概览 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">平均心率</p>
                <p className="text-2xl font-bold">{calculateWeeklyAverage(trendData, 'heartRate')}</p>
                <div className="flex items-center mt-1">
                  {getTrendIcon(parseFloat(calculateMonthlyChange(trendData, 'heartRate')))}
                  <span className={`text-sm ml-1 ${getTrendColor(parseFloat(calculateMonthlyChange(trendData, 'heartRate')))}`}>
                    {calculateMonthlyChange(trendData, 'heartRate')}%
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">日均步数</p>
                <p className="text-2xl font-bold">{Math.floor(calculateWeeklyAverage(trendData, 'steps'))}</p>
                <div className="flex items-center mt-1">
                  {getTrendIcon(parseFloat(calculateMonthlyChange(trendData, 'steps')))}
                  <span className={`text-sm ml-1 ${getTrendColor(parseFloat(calculateMonthlyChange(trendData, 'steps')))}`}>
                    {calculateMonthlyChange(trendData, 'steps')}%
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">平均睡眠</p>
                <p className="text-2xl font-bold">{calculateWeeklyAverage(trendData, 'sleep')}h</p>
                <div className="flex items-center mt-1">
                  {getTrendIcon(parseFloat(calculateMonthlyChange(trendData, 'sleep')))}
                  <span className={`text-sm ml-1 ${getTrendColor(parseFloat(calculateMonthlyChange(trendData, 'sleep')))}`}>
                    {calculateMonthlyChange(trendData, 'sleep')}%
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">压力水平</p>
                <p className="text-2xl font-bold">{Math.floor(calculateWeeklyAverage(trendData, 'stress'))}</p>
                <div className="flex items-center mt-1">
                  {getTrendIcon(-parseFloat(calculateMonthlyChange(trendData, 'stress')))}
                  <span className={`text-sm ml-1 ${getTrendColor(-parseFloat(calculateMonthlyChange(trendData, 'stress')))}`}>
                    {calculateMonthlyChange(trendData, 'stress')}%
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 30天趋势图 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              30天健康趋势
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="heartRate" stroke="#ff7300" name="心率" />
                <Line type="monotone" dataKey="steps" stroke="#387908" name="步数(百)" />
                <Line type="monotone" dataKey="sleep" stroke="#8884d8" name="睡眠(小时)" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        {/* 压力趋势图 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center">
              <AlertTriangle className="h-4 w-4 mr-2" />
              压力水平趋势
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="stress" stroke="#ff7300" fill="#ff7300" fillOpacity={0.3} name="压力水平" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      {/* 健康评分雷达图 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center">
            <Target className="h-4 w-4 mr-2" />
            综合健康评分
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={90} domain={[0, 100]} />
                <Radar name="健康评分" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
            
            <div className="space-y-4">
              <h4 className="font-medium">健康指标详情</h4>
              {radarData.map((item, index) => <div key={index} className="flex items-center justify-between">
                  <span className="text-sm">{item.subject}</span>
                  <div className="flex items-center space-x-2">
                    <Progress value={item.value} className="w-20" />
                    <span className="text-sm font-medium">{item.value}</span>
                    {item.value >= 80 && <Award className="h-4 w-4 text-yellow-500" />}
                  </div>
                </div>)}
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* 健康建议 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center">
            <Clock className="h-4 w-4 mr-2" />
            健康建议与目标
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">运动目标</h4>
              <p className="text-sm text-muted-foreground mb-2">建议每日步数达到10,000步</p>
              <div className="flex items-center justify-between">
                <span className="text-sm">当前: {Math.floor(calculateWeeklyAverage(trendData, 'steps'))}步</span>
                <Badge variant={calculateWeeklyAverage(trendData, 'steps') >= 10000 ? 'default' : 'secondary'}>
                  {calculateWeeklyAverage(trendData, 'steps') >= 10000 ? '已达标' : '未达标'}
                </Badge>
              </div>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">睡眠目标</h4>
              <p className="text-sm text-muted-foreground mb-2">建议每日睡眠7-9小时</p>
              <div className="flex items-center justify-between">
                <span className="text-sm">当前: {calculateWeeklyAverage(trendData, 'sleep')}小时</span>
                <Badge variant={calculateWeeklyAverage(trendData, 'sleep') >= 7 && calculateWeeklyAverage(trendData, 'sleep') <= 9 ? 'default' : 'secondary'}>
                  {calculateWeeklyAverage(trendData, 'sleep') >= 7 && calculateWeeklyAverage(trendData, 'sleep') <= 9 ? '正常' : '需调整'}
                </Badge>
              </div>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">压力管理</h4>
              <p className="text-sm text-muted-foreground mb-2">建议压力水平保持在40以下</p>
              <div className="flex items-center justify-between">
                <span className="text-sm">当前: {Math.floor(calculateWeeklyAverage(trendData, 'stress'))}</span>
                <Badge variant={calculateWeeklyAverage(trendData, 'stress') <= 40 ? 'default' : 'secondary'}>
                  {calculateWeeklyAverage(trendData, 'stress') <= 40 ? '良好' : '需关注'}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>;
}