// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Badge, useToast } from '@/components/ui';
// @ts-ignore;
import { Plus, Search, Filter, Download, Upload, Users, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

// @ts-ignore;
import { PatientCard } from './PatientCard';
// @ts-ignore;
import { BatchOperations } from './BatchOperations';
// @ts-ignore;
import { OperationLogViewer } from './OperationLogViewer';
// @ts-ignore;
import { ConfirmDialog } from './ConfirmDialog';
export function PatientManagementEnhanced() {
  const [patients, setPatients] = useState([]);
  const [selectedPatients, setSelectedPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showBatchOperations, setShowBatchOperations] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);
  const [loading, setLoading] = useState(false);
  const {
    toast
  } = useToast();
  useEffect(() => {
    loadPatients();
  }, []);
  const loadPatients = async () => {
    try {
      setLoading(true);
      const response = await $w.cloud.callDataSource({
        dataSourceName: 'patients',
        methodName: 'wedaGetRecordsV2',
        params: {
          select: {
            $master: true
          },
          orderBy: [{
            created_at: 'desc'
          }],
          getCount: true
        }
      });
      setPatients(response.records || []);
    } catch (error) {
      toast({
        title: "加载患者失败",
        description: error.message || "无法获取患者列表",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  const handleSelectPatient = patientId => {
    setSelectedPatients(prev => prev.includes(patientId) ? prev.filter(id => id !== patientId) : [...prev, patientId]);
  };
  const handleSelectAll = () => {
    if (selectedPatients.length === filteredPatients.length) {
      setSelectedPatients([]);
    } else {
      setSelectedPatients(filteredPatients.map(p => p._id));
    }
  };
  const handleBatchAction = async (action, successCount, errorCount) => {
    setShowBatchOperations(false);
    if (successCount > 0) {
      await loadPatients();
      setSelectedPatients([]);
    }
  };
  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name?.toLowerCase().includes(searchTerm.toLowerCase()) || patient.email?.toLowerCase().includes(searchTerm.toLowerCase()) || patient.phone?.includes(searchTerm);
    const matchesStatus = filterStatus === 'all' || patient.status === filterStatus;
    return matchesSearch && matchesStatus;
  });
  const getStatusBadge = status => {
    const badges = {
      active: {
        label: '正常',
        color: 'bg-green-100 text-green-800'
      },
      inactive: {
        label: '停用',
        color: 'bg-red-100 text-red-800'
      },
      pending: {
        label: '待审核',
        color: 'bg-yellow-100 text-yellow-800'
      }
    };
    return badges[status] || badges.pending;
  };
  return <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">患者管理</h2>
          <p className="text-muted-foreground">管理患者账户和信息</p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={() => setShowBatchOperations(true)} disabled={selectedPatients.length === 0}>
            <Users className="h-4 w-4 mr-2" />
            批量操作 ({selectedPatients.length})
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            添加患者
          </Button>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input placeholder="搜索患者..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10" />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="状态筛选" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部状态</SelectItem>
            <SelectItem value="active">正常</SelectItem>
            <SelectItem value="inactive">停用</SelectItem>
            <SelectItem value="pending">待审核</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="border rounded-lg">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <input type="checkbox" checked={selectedPatients.length === filteredPatients.length && filteredPatients.length > 0} onChange={handleSelectAll} className="w-4 h-4" />
              <span className="text-sm text-muted-foreground">
                全选 ({selectedPatients.length}/{filteredPatients.length})
              </span>
            </div>
            <span className="text-sm text-muted-foreground">
              共 {filteredPatients.length} 位患者
            </span>
          </div>
        </div>

        <div className="divide-y">
          {loading ? <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div> : filteredPatients.length === 0 ? <div className="text-center py-8 text-muted-foreground">
              暂无患者数据
            </div> : filteredPatients.map(patient => <div key={patient._id} className="p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <input type="checkbox" checked={selectedPatients.includes(patient._id)} onChange={() => handleSelectPatient(patient._id)} className="w-4 h-4" />
                    <PatientCard patient={patient} />
                  </div>
                  <Badge className={getStatusBadge(patient.status).color}>
                    {getStatusBadge(patient.status).label}
                  </Badge>
                </div>
              </div>)}
        </div>
      </div>

      {showBatchOperations && <BatchOperations type="patient" selectedItems={selectedPatients} onComplete={handleBatchAction} onCancel={() => setShowBatchOperations(false)} />}

      <OperationLogViewer />
    </div>;
}