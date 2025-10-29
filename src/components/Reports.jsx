// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button } from '@/components/ui';
// @ts-ignore;
import { FileText, Download, Eye } from 'lucide-react';

export function Reports({
  doctorData,
  t
}) {
  const reports = [{
    id: 1,
    patient: '张三',
    type: '血常规',
    date: '2024-01-15',
    status: 'pending'
  }, {
    id: 2,
    patient: '李四',
    type: '尿常规',
    date: '2024-01-15',
    status: 'completed'
  }, {
    id: 3,
    patient: '王五',
    type: '心电图',
    date: '2024-01-14',
    status: 'pending'
  }];
  return <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t ? t('labReports') : '检查报告'}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reports.map(report => <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <FileText className="w-8 h-8 text-blue-500" />
                  <div>
                    <p className="font-medium">{report.patient} - {report.type}</p>
                    <p className="text-sm text-gray-600">{report.date}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${report.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                    {report.status === 'pending' ? '待审核' : '已完成'}
                  </span>
                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>)}
          </div>
        </CardContent>
      </Card>
    </div>;
}