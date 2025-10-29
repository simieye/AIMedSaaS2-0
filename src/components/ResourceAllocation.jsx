// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
// @ts-ignore;
import { Users, DollarSign, Clock, TrendingUp } from 'lucide-react';

// @ts-ignore;
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
export function ResourceAllocation({
  resources,
  className,
  style
}) {
  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];
  const teamData = resources?.team?.map(member => ({
    name: member.role,
    value: members.count,
    budget: member.budget
  })) || [];
  const budgetData = resources?.budget?.map(item => ({
    category: item.category,
    amount: item.amount,
    percentage: item.percentage
  })) || [];
  const timelineData = resources?.timeline?.map(item => ({
    phase: item.phase,
    headcount: item.headcount,
    budget: item.budget / 10000 // 转换为万元
  })) || [];
  return <div className={className} style={style}>
      <div className="grid grid-cols-2 gap-6">
        {/* 人力分配 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="w-5 h-5 mr-2" />
              人力分配
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={teamData} cx="50%" cy="50%" labelLine={false} label={({
                name,
                value
              }) => `${name}: ${value}人`} outerRadius={80} fill="#8884d8" dataKey="value">
                  {teamData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
            
            <div className="mt-4 space-y-2">
              {resources?.team?.map((member, index) => <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{
                  backgroundColor: COLORS[index % COLORS.length]
                }}></div>
                    <span className="text-gray-700">{member.role}</span>
                  </div>
                  <div className="text-gray-900">
                    <span className="font-medium">{member.count}</span>人
                    <span className="ml-2 text-gray-500">({member.budget}万)</span>
                  </div>
                </div>)}
            </div>
          </CardContent>
        </Card>

        {/* 预算分配 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <DollarSign className="w-5 h-5 mr-2" />
              预算分配
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={budgetData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip formatter={value => [`${value}万`, '预算']} />
                <Bar dataKey="amount" fill="#3B82F6" radius={[4, 4, 0, 0]}>
                  {budgetData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">总预算</span>
                <span className="text-lg font-semibold text-gray-900">
                  {resources?.budget?.reduce((sum, item) => sum + item.amount, 0) || 0}万
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 时间线资源分配 */}
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              各阶段资源分配
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={timelineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="phase" />
                <YAxis yAxisId="left" orientation="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="headcount" fill="#10B981" name="人力(人)" radius={[4, 4, 0, 0]} />
                <Bar yAxisId="right" dataKey="budget" fill="#F59E0B" name="预算(万元)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>;
}