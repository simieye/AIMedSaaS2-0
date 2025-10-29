// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Select, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui';
// @ts-ignore;
import { Eye, Edit, FileText, CheckCircle } from 'lucide-react';

export function BillTable({
  bills,
  onViewDetails,
  onEdit,
  onSendInvoice,
  onMarkAsPaid,
  getStatusBadge,
  getTypeBadge,
  formatCurrency,
  className,
  style
}) {
  return <div className={className} style={style}>
      <Card>
        <CardHeader>
          <CardTitle>账单列表</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>账单ID</TableHead>
                <TableHead>项目名称</TableHead>
                <TableHead>赞助商</TableHead>
                <TableHead>类型</TableHead>
                <TableHead>金额</TableHead>
                <TableHead>开票日期</TableHead>
                <TableHead>到期日期</TableHead>
                <TableHead>付款日期</TableHead>
                <TableHead>状态</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bills.map(bill => <TableRow key={bill.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium text-gray-900">{bill.id}</div>
                      <div className="text-sm text-gray-500">{bill.invoiceNumber}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium text-gray-900">{bill.projectName}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-gray-900">{bill.sponsorName}</div>
                  </TableCell>
                  <TableCell>
                    {getTypeBadge(bill.type)}
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium text-gray-900">{formatCurrency(bill.amount)}</div>
                      <div className="text-sm text-gray-500">含税: {formatCurrency(bill.totalAmount)}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-gray-900">{bill.issueDate}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-gray-900">{bill.dueDate}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-gray-900">{bill.paidDate || '-'}</div>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(bill.status)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => onViewDetails(bill.id)}>
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => onEdit(bill.id)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      {bill.status === 'pending' && <Button variant="ghost" size="sm" onClick={() => onSendInvoice(bill.id)}>
                          <FileText className="w-4 h-4" />
                        </Button>}
                      {bill.status === 'pending' && <Button variant="ghost" size="sm" onClick={() => onMarkAsPaid(bill.id)}>
                          <CheckCircle className="w-4 h-4" />
                        </Button>}
                    </div>
                  </TableCell>
                </TableRow>)}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>;
}