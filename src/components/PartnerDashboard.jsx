// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Badge, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Progress } from '@/components/ui';
// @ts-ignore;
import { TrendingUp, Key, FileText, DollarSign, Users, MapPin, Activity, Clock } from 'lucide-react';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
export default function PartnerDashboard({
  partnerData,
  t
}) {
  const safeT = t || (key => key);
  const [selectedPartner, setSelectedPartner] = useState(null);
  const roiData = [{
    month: '1月',
    roi: 15.2
  }, {
    month: '2月',
    roi: 18.7
  }, {
    month: '3月',
    roi: 22.1
  }, {
    month: '4月',
    roi: 25.3
  }, {
    month: '5月',
    roi: 28.9
  }, {
    month: '6月',
    roi: 32.4
  }];
  const regionData = [{
    region: '岳阳',
    patients: 2341,
    revenue: 125000
  }, {
    region: '长沙',
    patients: 1876,
    revenue: 98000
  }, {
    region: '株洲',
    patients: 1234,
    revenue: 67000
  }, {
    region: '湘潭',
    patients: 987,
    revenue: 45000
  }];
  return <div className="space-y-6">
      {/* 顶部统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{safeT('totalRevenue')}</CardTitle>
            <DollarSign className={`h-4 w-4 text-green-600`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">¥1,250,000</div>
            <p className="text-xs text-muted-foreground">+12% 本月</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{safeT('activeKeys')}</CardTitle>
            <Key className={`h-4 w-4 text-blue-600`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">正常</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{safeT('monthlyUsage')}</CardTitle>
            <Activity className={`h-4 w-4 text-purple-600`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89.5%</div>
            <p className="text-xs text-muted-foreground">正常</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{safeT('pendingAgreements')}</CardTitle>
            <FileText className={`h-4 w-4 text-orange-600`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">待处理</p>
          </CardContent>
        </Card>
      </div>

      {/* 图表区域 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>ROI趋势</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={roiData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="roi" stroke="#007BFF" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>区域分布</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={regionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="region" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="patients" fill="#28A745" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* 合作伙伴列表 */}
      <Card>
        <CardHeader>
          <CardTitle>合作伙伴列表</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>名称</TableHead>
                <TableHead>类型</TableHead>
                <TableHead>地区</TableHead>
                <TableHead>状态</TableHead>
                <TableHead>ROI</TableHead>
                <TableHead>合同数</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {partnerData.map(partner => <TableRow key={partner.id}>
                  <TableCell>{partner.name}</TableCell>
                  <TableCell>{partner.type}</TableCell>
                  <TableCell>{partner.region}</TableCell>
                  <TableCell>
                    <Badge variant={partner.status === 'active' ? 'default' : 'secondary'}>
                      {partner.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{partner.roi}%</TableCell>
                  <TableCell>{partner.contracts}</TableCell>
                  <TableCell>
                    <Button size="sm" variant="ghost">
                      <Key className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>)}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>;
}