// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button } from '@/components/ui';
// @ts-ignore;
import { Pill, Plus } from 'lucide-react';

export function Prescription({
  doctorData,
  t
}) {
  const prescriptions = [{
    id: 1,
    patient: '张三',
    medication: '阿司匹林',
    dosage: '100mg',
    frequency: '每日一次'
  }, {
    id: 2,
    patient: '李四',
    medication: '二甲双胍',
    dosage: '500mg',
    frequency: '每日两次'
  }];
  return <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{t ? t('prescription') : '处方管理'}</h2>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          {t ? t('newPrescription') : '新建处方'}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t ? t('recentPrescriptions') : '最近处方'}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {prescriptions.map(prescription => <div key={prescription.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <Pill className="w-8 h-8 text-blue-500" />
                  <div>
                    <p className="font-medium">{prescription.patient}</p>
                    <p className="text-sm text-gray-600">
                      {prescription.medication} - {prescription.dosage} - {prescription.frequency}
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  查看详情
                </Button>
              </div>)}
          </div>
        </CardContent>
      </Card>
    </div>;
}