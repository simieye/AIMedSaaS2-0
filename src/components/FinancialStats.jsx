// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Card, CardContent } from '@/components/ui';
// @ts-ignore;
import { DollarSign, Clock, AlertCircle, Receipt } from 'lucide-react';

export function FinancialStats({
  bills,
  className,
  style
}) {
  const stats = {
    totalRevenue: bills.filter(b => b.status === 'paid').reduce((sum, b) => sum + b.totalAmount, 0),
    pendingRevenue: bills.filter(b => b.status === 'pending').reduce((sum, b) => sum + b.totalAmount, 0),
    overdueRevenue: bills.filter(b => b.status === 'overdue').reduce((sum, b) => sum + b.totalAmount, 0),
    totalBills: bills.length
  };
  const formatCurrency = amount => {
    return new Intl.NumberFormat('zh-CN', {
      style: 'currency',
      currency: 'CNY',
      minimumFractionDigits: 0
    }).format(amount);
  };
  return <div className={className} style={style}>
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">已收款</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.totalRevenue)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">待收款</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.pendingRevenue)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">逾期款项</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.overdueRevenue)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Receipt className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">总账单数</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalBills}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>;
}