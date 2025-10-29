// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
// @ts-ignore;
import { Users, DollarSign, TrendingUp, Target, Activity, ArrowUp, ArrowDown } from 'lucide-react';

// @ts-ignore;
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
export function KPIDashboard({
  kpiData,
  className,
  style
}) {
  const formatNumber = num => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };
  const formatCurrency = amount => {
    return new Intl.NumberFormat('zh-CN', {
      style: 'currency',
      currency: 'CNY',
      minimumFractionDigits: 0
    }).format(amount);
  };
  const getGrowthIcon = growth => {
    if (growth > 0) return <ArrowUp className="w-4 h-4 text-green-500" />;
    if (growth < 0) return <ArrowDown className="w-4 h-4 text-red-500" />;
    return <div className="w-4 h-4" />;
  };
  const getGrowthColor = growth => {
    if (growth > 0) return 'text-green-600';
    if (growth < 0) return 'text-red-600';
    return 'text-gray-600';
  };
  return <div className={className} style={style}>
      <div className="space-y-6">
        {/* KPI 概览卡片 */}
        <div className="grid grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">总用户数</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatNumber(kpiData?.totalUsers || 0)}
                  </p>
                  <div className="flex items-center space-x-1 text-sm">
                    {getGrowthIcon(kpiData?.userGrowth || 0)}
                    <span className={getGrowthColor(kpiData?.userGrowth || 0)}>
                      {Math.abs(kpiData?.userGrowth || 0)}%
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">总收入</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatCurrency(kpiData?.totalRevenue || 0)}
                  </p>
                  <div className="flex items-center space-x-1 text-sm">
                    {getGrowthIcon(kpiData?.revenueGrowth || 0)}
                    <span className={getGrowthColor(kpiData?.revenueGrowth || 0)}>
                      {Math.abs(kpiData?.revenueGrowth || 0)}%
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Target className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">转化率</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {((kpiData?.conversionRate || 0) * 100).toFixed(1)}%
                  </p>
                  <div className="flex items-center space-x-1 text-sm">
                    {getGrowthIcon(kpiData?.conversionGrowth || 0)}
                    <span className={getGrowthColor(kpiData?.conversionGrowth || 0)}>
                      {Math.abs(kpiData?.conversionGrowth || 0)}%
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Activity className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">活跃率</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {((kpiData?.activeRate || 0) * 100).toFixed(1)}%
                  </p>
                  <div className="flex items-center space-x-1 text-sm">
                    {getGrowthIcon(kpiData?.activeGrowth || 0)}
                    <span className={getGrowthColor(kpiData?.activeGrowth || 0)}>
                      {Math.abs(kpiData?.activeGrowth || 0)}%
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 图表区域 */}
        <div className="grid grid-cols-2 gap-6">
          {/* 用户增长趋势 */}
          <Card>
            <CardHeader>
              <CardTitle>用户增长趋势</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={kpiData?.userTrend || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="newUsers" stackId="1" stroke="#3B82F6" fill="#93BBFC" name="新用户" />
                  <Area type="monotone" dataKey="activeUsers" stackId="1" stroke="#10B981" fill="#86EFAC" name="活跃用户" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* 收入趋势 */}
          <Card>
            <CardHeader>
              <CardTitle>收入趋势</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={kpiData?.revenueTrend || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip formatter={value => [formatCurrency(value), '收入']} />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="#10B981" name="实际收入" strokeWidth={2} />
                  <Line type="monotone" dataKey="target" stroke="#F59E0B" name="目标收入" strokeWidth={2} strokeDasharray="5 5" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* 目标达成情况 */}
        <div className="grid grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>目标达成情况</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {kpiData?.targets?.map((target, index) => <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">{target.name}</span>
                      <span className="text-sm text-gray-500">
                        {target.actual.toLocaleString()} / {target.goal.toLocaleString()}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="h-2 rounded-full transition-all duration-300" style={{
                    width: `${Math.min(target.percentage, 100)}%`,
                    backgroundColor: target.percentage >= 100 ? '#10B981' : target.percentage >= 80 ? '#3B82F6' : target.percentage >= 60 ? '#F59E0B' : '#EF4444'
                  }}></div>
                    </div>
                    <div className="text-right text-sm">
                      <span className={`font-medium ${target.percentage >= 100 ? 'text-green-600' : target.percentage >= 80 ? 'text-blue-600' : target.percentage >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                        {target.percentage.toFixed(1)}%
                      </span>
                    </div>
                  </div>)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>关键指标对比</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={kpiData?.comparison || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="metric" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="current" fill="#3B82F6" name="当前" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="previous" fill="#93BBFC" name="上期" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="target" fill="#10B981" name="目标" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>;
}