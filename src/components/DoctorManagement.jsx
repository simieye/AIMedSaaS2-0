// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Badge, useToast } from '@/components/ui';
// @ts-ignore;
import { Plus, Search, Shield, Users, Download, Upload } from 'lucide-react';

// @ts-ignore;
import { DoctorCard } from './DoctorCard';
// @ts-ignore;
import { BatchOperations } from './BatchOperations';
// @ts-ignore;
import { OperationLogViewer } from './OperationLogViewer';
export function DoctorManagement() {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctors, setSelectedDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterSpecialty, setFilterSpecialty] = useState('all');
  const [showBatchOperations, setShowBatchOperations] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    toast
  } = useToast();
  useEffect(() => {
    loadDoctors();
  }, []);
  const loadDoctors = async () => {
    try {
      setLoading(true);
      const response = await $w.cloud.callDataSource({
        dataSourceName: 'doctors',
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
      setDoctors(response.records || []);
    } catch (error) {
      toast({
        title: "加载医生失败",
        description: error.message || "无法获取医生列表",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  const handleSelectDoctor = doctorId => {
    setSelectedDoctors(prev => prev.includes(doctorId) ? prev.filter(id => id !== doctorId) : [...prev, doctorId]);
  };
  const handleSelectAll = () => {
    if (selectedDoctors.length === filteredDoctors.length) {
      setSelectedDoctors([]);
    } else {
      setSelectedDoctors(filteredDoctors.map(d => d._id));
    }
  };
  const handleBatchAction = async (action, successCount, errorCount) => {
    setShowBatchOperations(false);
    if (successCount > 0) {
      await loadDoctors();
      setSelectedDoctors([]);
    }
  };
  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name?.toLowerCase().includes(searchTerm.toLowerCase()) || doctor.email?.toLowerCase().includes(searchTerm.toLowerCase()) || doctor.license_number?.includes(searchTerm);
    const matchesStatus = filterStatus === 'all' || doctor.status === filterStatus;
    const matchesSpecialty = filterSpecialty === 'all' || doctor.specialty === filterSpecialty;
    return matchesSearch && matchesStatus && matchesSpecialty;
  });
  const specialties = [...new Set(doctors.map(d => d.specialty).filter(Boolean))];
  return <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">医生管理</h2>
          <p className="text-muted-foreground">管理医生账户和审核状态</p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={() => setShowBatchOperations(true)} disabled={selectedDoctors.length === 0}>
            <Shield className="h-4 w-4 mr-2" />
            批量操作 ({selectedDoctors.length})
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            添加医生
          </Button>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input placeholder="搜索医生..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10" />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="状态筛选" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部状态</SelectItem>
            <SelectItem value="pending">待审核</SelectItem>
            <SelectItem value="approved">已审核</SelectItem>
            <SelectItem value="rejected">已拒绝</SelectItem>
            <SelectItem value="frozen">已冻结</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterSpecialty} onValueChange={setFilterSpecialty}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="专业筛选" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部专业</SelectItem>
            {specialties.map(specialty => <SelectItem key={specialty} value={specialty}>{specialty}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div className="border rounded-lg">
        <div className="p-4 border-b bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <input type="checkbox" checked={selectedDoctors.length === filteredDoctors.length && filteredDoctors.length > 0} onChange={handleSelectAll} className="w-4 h-4" />
              <span className="text-sm text-muted-foreground">
                全选 ({selectedDoctors.length}/{filteredDoctors.length})
              </span>
            </div>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span>共 {filteredDoctors.length} 位医生</span>
              <span>已选择 {selectedDoctors.length} 位</span>
            </div>
          </div>
        </div>

        <div className="divide-y">
          {loading ? <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div> : filteredDoctors.length === 0 ? <div className="text-center py-8 text-muted-foreground">
              暂无医生数据
            </div> : filteredDoctors.map(doctor => <DoctorCard key={doctor._id} doctor={doctor} isSelected={selectedDoctors.includes(doctor._id)} onSelect={handleSelectDoctor} />)}
        </div>
      </div>

      {showBatchOperations && <BatchOperations type="doctor" selectedItems={selectedDoctors} onComplete={handleBatchAction} onCancel={() => setShowBatchOperations(false)} />}

      <OperationLogViewer />
    </div>;
}