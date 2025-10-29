// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Badge, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui';
// @ts-ignore;
import { CreditCard, Download, DollarSign, Calendar } from 'lucide-react';

export function Billing({
  partnerId,
  t
}) {
  // 防御式处理：确保 t 存在
  const safeT = t || (key => key);
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    loadInvoices();
  }, [partnerId]);
  const loadInvoices = async () => {
    try {
      setLoading(true);
      // 模拟数据加载
      setTimeout(() => {
        setInvoices([{
          id: 'inv-001',
          number: 'INV-2024-001',
          amount: 299.99,
          dueDate: '2024-02-15',
          status: 'paid',
          period: '2024-01'
        }, {
          id: 'inv-002',
          number: 'INV-2024-002',
          amount: 299.99,
          dueDate: '2024-03-15',
          status: 'pending',
          period: '2024-02'
        }, {
          id: 'inv-003',
          number: 'INV-2024-003',
          amount: 349.99,
          dueDate: '2024-04-15',
          status: 'unpaid',
          period: '2024-03'
        }]);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Failed to load invoices:', error);
      setLoading(false);
    }
  };
  const getStatusBadge = status => {
    const variants = {
      paid: 'default',
      pending: 'secondary',
      unpaid: 'destructive',
      overdue: 'destructive'
    };
    return variants[status] || 'secondary';
  };
  const getStatusText = status => {
    const statusMap = {
      paid: safeT('paid'),
      pending: safeT('pending'),
      unpaid: safeT('unpaid'),
      overdue: safeT('overdue')
    };
    return statusMap[status] || status;
  };
  const formatCurrency = amount => {
    return new Intl.NumberFormat('zh-CN', {
      style: 'currency',
      currency: 'CNY'
    }).format(amount);
  };
  return <div className="space-y-6">
      <h2 className="text-2xl font-bold">{safeT('billing')}</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">{safeT('currentBalance')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(1250.5)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">{safeT('monthlyUsage')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(299.99)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">{safeT('nextBillingDate')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2024-04-15</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{safeT('invoices')}</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? <div className="text-center py-12">
              <CreditCard className="h-12 w-12 mx-auto text-gray-400 mb-4 animate-spin" />
              <p className="text-gray-500">{safeT('loading')}</p>
            </div> : invoices.length === 0 ? <div className="text-center py-12">
              <CreditCard className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500">{safeT('noData')}</p>
            </div> : <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{safeT('invoiceNumber')}</TableHead>
                  <TableHead>{safeT('period')}</TableHead>
                  <TableHead>{safeT('amount')}</TableHead>
                  <TableHead>{safeT('dueDate')}</TableHead>
                  <TableHead>{safeT('status')}</TableHead>
                  <TableHead>{safeT('actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map(invoice => <TableRow key={invoice.id}>
                    <TableCell>{invoice.number}</TableCell>
                    <TableCell>{invoice.period}</TableCell>
                    <TableCell>{formatCurrency(invoice.amount)}</TableCell>
                    <TableCell>{invoice.dueDate}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadge(invoice.status)}>{getStatusText(invoice.status)}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="ghost">
                          <Download className="h-3 w-3 mr-1" />
                          {safeT('download')}
                        </Button>
                        {invoice.status === 'unpaid' && <Button size="sm">
                            {safeT('pay')}
                          </Button>}
                      </div>
                    </TableCell>
                  </TableRow>)}
              </TableBody>
            </Table>}
        </CardContent>
      </Card>
    </div>;
}