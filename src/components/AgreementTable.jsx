// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Select, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui';
// @ts-ignore;
import { Eye, Edit, FileText, Trash2 } from 'lucide-react';

export function AgreementTable({
  agreements,
  onViewAgreement,
  onEditAgreement,
  onViewDocuments,
  onDeleteAgreement,
  onStatusChange,
  getStatusBadge,
  getTypeBadge,
  formatCurrency,
  className,
  style
}) {
  return <div className={className} style={style}>
      <Card>
        <CardHeader>
          <CardTitle>协议列表</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>协议ID</TableHead>
                <TableHead>协议名称</TableHead>
                <TableHead>合作医院</TableHead>
                <TableHead>协议类型</TableHead>
                <TableHead>合作金额</TableHead>
                <TableHead>负责人</TableHead>
                <TableHead>开始日期</TableHead>
                <TableHead>结束日期</TableHead>
                <TableHead>状态</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {agreements.map(agreement => <TableRow key={agreement._id}>
                  <TableCell>
                    <div className="font-medium text-gray-900">{agreement._id}</div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium text-gray-900">{agreement.name}</div>
                      <div className="text-sm text-gray-500">{agreement.contact_email}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium text-gray-900">{agreement.partner_name}</div>
                      <div className="text-sm text-gray-500">{agreement.contact_phone}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {getTypeBadge(agreement.type)}
                  </TableCell>
                  <TableCell>
                    <div className="font-medium text-gray-900">
                      {formatCurrency(agreement.value)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium text-gray-900">{agreement.responsible_person}</div>
                      <div className="text-sm text-gray-500">{agreement.contact_phone}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-gray-900">{agreement.start_date}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-gray-900">{agreement.end_date}</div>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(agreement.status)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => onViewAgreement(agreement._id)}>
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => onEditAgreement(agreement._id)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => onViewDocuments(agreement._id)}>
                        <FileText className="w-4 h-4" />
                      </Button>
                      <Select onValueChange={value => onStatusChange(agreement._id, value)}>
                        <SelectTrigger className="w-24 h-8">
                          <SelectValue placeholder="状态" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">激活</SelectItem>
                          <SelectItem value="suspended">暂停</SelectItem>
                          <SelectItem value="terminated">终止</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="ghost" size="sm" onClick={() => onDeleteAgreement(agreement._id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>)}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>;
}