// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Badge, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui';
// @ts-ignore;
import { FileText, Eye, Download, CheckCircle } from 'lucide-react';

export function Agreements({
  partnerId,
  t
}) {
  // 防御式处理：确保 t 存在
  const safeT = t || (key => key);
  const [agreements, setAgreements] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    loadAgreements();
  }, [partnerId]);
  const loadAgreements = async () => {
    try {
      setLoading(true);
      // 模拟数据加载
      setTimeout(() => {
        setAgreements([{
          id: 'agr-001',
          name: '服务协议',
          version: '2.1',
          effectiveDate: '2024-01-01',
          status: 'signed',
          signedDate: '2024-01-15'
        }, {
          id: 'agr-002',
          name: '数据处理协议',
          version: '1.0',
          effectiveDate: '2024-02-01',
          status: 'pending',
          signedDate: null
        }, {
          id: 'agr-003',
          name: '隐私政策',
          version: '3.0',
          effectiveDate: '2024-01-15',
          status: 'signed',
          signedDate: '2024-01-20'
        }]);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Failed to load agreements:', error);
      setLoading(false);
    }
  };
  const handleSignAgreement = agreementId => {
    setAgreements(agreements.map(agr => agr.id === agreementId ? {
      ...agr,
      status: 'signed',
      signedDate: new Date().toISOString().split('T')[0]
    } : agr));
  };
  const getStatusBadge = status => {
    const variants = {
      signed: 'default',
      pending: 'secondary',
      expired: 'destructive'
    };
    return variants[status] || 'secondary';
  };
  const getStatusText = status => {
    const statusMap = {
      signed: safeT('signed'),
      pending: safeT('pending'),
      expired: safeT('expired')
    };
    return statusMap[status] || status;
  };
  return <div className="space-y-6">
      <h2 className="text-2xl font-bold">{safeT('agreements')}</h2>

      <Card>
        <CardHeader>
          <CardTitle>{safeT('agreements')}</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? <div className="text-center py-12">
              <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4 animate-spin" />
              <p className="text-gray-500">{safeT('loading')}</p>
            </div> : agreements.length === 0 ? <div className="text-center py-12">
              <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500">{safeT('noData')}</p>
            </div> : <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{safeT('agreementName')}</TableHead>
                  <TableHead>{safeT('version')}</TableHead>
                  <TableHead>{safeT('effectiveDate')}</TableHead>
                  <TableHead>{safeT('status')}</TableHead>
                  <TableHead>{safeT('signedDate')}</TableHead>
                  <TableHead>{safeT('actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {agreements.map(agreement => <TableRow key={agreement.id}>
                    <TableCell>{agreement.name}</TableCell>
                    <TableCell>{agreement.version}</TableCell>
                    <TableCell>{agreement.effectiveDate}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadge(agreement.status)}>{getStatusText(agreement.status)}</Badge>
                    </TableCell>
                    <TableCell>{agreement.signedDate || '-'}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="ghost">
                          <Eye className="h-3 w-3 mr-1" />
                          {safeT('view')}
                        </Button>
                        {agreement.status === 'pending' && <Button size="sm" onClick={() => handleSignAgreement(agreement.id)}>
                            <CheckCircle className="h-3 w-3 mr-1" />
                            {safeT('sign')}
                          </Button>}
                        <Button size="sm" variant="ghost">
                          <Download className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>)}
              </TableBody>
            </Table>}
        </CardContent>
      </Card>
    </div>;
}