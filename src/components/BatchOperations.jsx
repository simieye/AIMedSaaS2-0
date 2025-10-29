// @ts-ignore;
import React, { useState, useRef } from 'react';
// @ts-ignore;
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, Input, Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Progress, useToast, Badge, Alert, AlertDescription, AlertTitle } from '@/components/ui';
// @ts-ignore;
import { Upload, Download, Users, Key, Shield, AlertTriangle, CheckCircle, XCircle, FileText, Clock, Filter, Search } from 'lucide-react';

export function BatchOperations({
  type,
  selectedItems,
  onComplete,
  onCancel
}) {
  const [operation, setOperation] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [file, setFile] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState(false);
  const [operationDetails, setOperationDetails] = useState({});
  const fileInputRef = useRef(null);
  const {
    toast
  } = useToast();
  const operations = {
    patient: [{
      value: 'import',
      label: '批量导入患者',
      icon: Upload
    }, {
      value: 'export',
      label: '批量导出患者',
      icon: Download
    }, {
      value: 'activate',
      label: '批量激活账户',
      icon: CheckCircle
    }, {
      value: 'deactivate',
      label: '批量停用账户',
      icon: XCircle
    }],
    doctor: [{
      value: 'approve',
      label: '批量审核医生',
      icon: Shield
    }, {
      value: 'freeze',
      label: '批量冻结医生',
      icon: AlertTriangle
    }, {
      value: 'unfreeze',
      label: '批量解冻医生',
      icon: CheckCircle
    }, {
      value: 'export',
      label: '批量导出医生',
      icon: Download
    }],
    api_key: [{
      value: 'renew',
      label: '批量续期密钥',
      icon: Clock
    }, {
      value: 'revoke',
      label: '批量吊销密钥',
      icon: XCircle
    }, {
      value: 'export',
      label: '批量导出密钥',
      icon: Download
    }]
  };
  const handleOperationSelect = value => {
    setOperation(value);
    if (value === 'import') {
      fileInputRef.current?.click();
    } else if (['activate', 'deactivate', 'approve', 'freeze', 'unfreeze', 'renew', 'revoke'].includes(value)) {
      setConfirmDialog(true);
    }
  };
  const handleFileUpload = event => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setOperationDetails({
        filename: uploadedFile.name,
        size: uploadedFile.size
      });
    }
  };
  const processBatchOperation = async () => {
    setIsProcessing(true);
    setProgress(0);
    try {
      let successCount = 0;
      let errorCount = 0;
      for (let i = 0; i < selectedItems.length; i++) {
        try {
          await processSingleItem(selectedItems[i], operation);
          successCount++;
        } catch (error) {
          errorCount++;
          console.error(`处理项目 ${selectedItems[i]} 失败:`, error);
        }
        setProgress((i + 1) / selectedItems.length * 100);

        // 添加延迟避免API限流
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      await logOperation(operation, selectedItems.length, successCount, errorCount);
      toast({
        title: "批量操作完成",
        description: `成功: ${successCount}, 失败: ${errorCount}`,
        variant: errorCount > 0 ? "warning" : "default"
      });
      onComplete(successCount, errorCount);
    } catch (error) {
      toast({
        title: "批量操作失败",
        description: error.message || "操作过程中出现错误",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
      setProgress(0);
      setConfirmDialog(false);
    }
  };
  const processSingleItem = async (itemId, operation) => {
    const dataSourceMap = {
      patient: 'patients',
      doctor: 'doctors',
      api_key: 'api_keys'
    };
    const dataSource = dataSourceMap[type];
    let updateData = {};
    switch (operation) {
      case 'activate':
      case 'approve':
      case 'unfreeze':
        updateData = {
          status: 'active',
          updated_at: new Date().toISOString()
        };
        break;
      case 'deactivate':
      case 'freeze':
        updateData = {
          status: 'inactive',
          updated_at: new Date().toISOString()
        };
        break;
      case 'renew':
        updateData = {
          expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          updated_at: new Date().toISOString()
        };
        break;
      case 'revoke':
        updateData = {
          status: 'revoked',
          revoked_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        break;
    }
    if (['activate', 'deactivate', 'approve', 'freeze', 'unfreeze', 'renew', 'revoke'].includes(operation)) {
      await $w.cloud.callDataSource({
        dataSourceName: dataSource,
        methodName: 'wedaUpdateV2',
        params: {
          data: updateData,
          filter: {
            where: {
              _id: {
                $eq: itemId
              }
            }
          }
        }
      });
    }
  };
  const logOperation = async (operation, totalCount, successCount, errorCount) => {
    const logData = {
      operation_type: operation,
      target_type: type,
      target_ids: selectedItems,
      total_count: totalCount,
      success_count: successCount,
      error_count: errorCount,
      operator_id: 'current_user_id',
      created_at: new Date().toISOString(),
      ip_address: 'user_ip_address',
      user_agent: 'user_agent_string'
    };
    await $w.cloud.callDataSource({
      dataSourceName: 'admin_log',
      methodName: 'wedaCreateV2',
      params: {
        data: logData
      }
    });
  };
  const handleExport = async () => {
    setIsProcessing(true);
    try {
      const dataSourceMap = {
        patient: 'patients',
        doctor: 'doctors',
        api_key: 'api_keys'
      };
      const response = await $w.cloud.callDataSource({
        dataSourceName: dataSourceMap[type],
        methodName: 'wedaGetRecordsV2',
        params: {
          select: {
            $master: true
          },
          filter: selectedItems.length > 0 ? {
            where: {
              _id: {
                $in: selectedItems
              }
            }
          } : undefined
        }
      });
      const data = response.records || [];
      const csvContent = convertToCSV(data);
      downloadFile(csvContent, `${type}_export_${new Date().toISOString().split('T')[0]}.csv`);
      await logOperation('export', data.length, data.length, 0);
      toast({
        title: "导出成功",
        description: `已导出 ${data.length} 条记录`,
        variant: "default"
      });
      onComplete(data.length, 0);
    } catch (error) {
      toast({
        title: "导出失败",
        description: error.message || "无法导出数据",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };
  const handleImport = async () => {
    if (!file) return;
    setIsProcessing(true);
    try {
      const text = await file.text();
      const data = parseCSV(text);
      let successCount = 0;
      let errorCount = 0;
      for (let i = 0; i < data.length; i++) {
        try {
          await $w.cloud.callDataSource({
            dataSourceName: type === 'patient' ? 'patients' : type === 'doctor' ? 'doctors' : 'api_keys',
            methodName: 'wedaCreateV2',
            params: {
              data: {
                ...data[i],
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
              }
            }
          });
          successCount++;
        } catch (error) {
          errorCount++;
        }
        setProgress((i + 1) / data.length * 100);
      }
      await logOperation('import', data.length, successCount, errorCount);
      toast({
        title: "导入完成",
        description: `成功: ${successCount}, 失败: ${errorCount}`,
        variant: errorCount > 0 ? "warning" : "default"
      });
      onComplete(successCount, errorCount);
    } catch (error) {
      toast({
        title: "导入失败",
        description: error.message || "无法导入数据",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };
  const convertToCSV = data => {
    if (!data || data.length === 0) return '';
    const headers = Object.keys(data[0]);
    const csvHeaders = headers.join(',');
    const csvRows = data.map(row => headers.map(header => {
      const value = row[header];
      return typeof value === 'string' && value.includes(',') ? `"${value}"` : value;
    }).join(','));
    return [csvHeaders, ...csvRows].join('\n');
  };
  const parseCSV = csvText => {
    const lines = csvText.split('\n');
    const headers = lines[0].split(',').map(h => h.trim());
    return lines.slice(1).filter(line => line.trim()).map(line => {
      const values = line.split(',').map(v => v.trim().replace(/^"|"$/g, ''));
      const obj = {};
      headers.forEach((header, index) => {
        obj[header] = values[index] || '';
      });
      return obj;
    });
  };
  const downloadFile = (content, filename) => {
    const blob = new Blob([content], {
      type: 'text/csv;charset=utf-8;'
    });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    URL.revokeObjectURL(link.href);
  };
  const getOperationDescription = () => {
    const op = operations[type]?.find(op => op.value === operation);
    return op ? `确认要对 ${selectedItems.length} 个${type === 'patient' ? '患者' : type === 'doctor' ? '医生' : 'API密钥'}执行"${op.label}"操作吗？` : '';
  };
  return <>
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">批量操作</h3>
        <span className="text-sm text-muted-foreground">
          已选择 {selectedItems.length} 项
        </span>
      </div>
      
      <div className="grid grid-cols-2 gap-2">
        {operations[type]?.map(({
          value,
          label,
          icon: Icon
        }) => <Button key={value} variant="outline" size="sm" onClick={() => handleOperationSelect(value)} disabled={isProcessing}>
            <Icon className="h-4 w-4 mr-2" />
            {label}
          </Button>)}
      </div>
      
      {operation === 'import' && file && <div className="p-3 border rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">{file.name}</p>
              <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</p>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setFile(null)}>
              移除
            </Button>
          </div>
          <Button className="w-full mt-2" onClick={handleImport} disabled={isProcessing}>
            {isProcessing ? <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                导入中...
              </> : '确认导入'}
          </Button>
        </div>}
      
      {operation === 'export' && <Button className="w-full" onClick={handleExport} disabled={isProcessing}>
          {isProcessing ? <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
              导出中...
            </> : '确认导出'}
        </Button>}
    </div>

    <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept=".csv,.xlsx" className="hidden" />

    <Dialog open={confirmDialog} onOpenChange={setConfirmDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>确认批量操作</DialogTitle>
          <DialogDescription>
            {getOperationDescription()}
          </DialogDescription>
        </DialogHeader>
        
        {isProcessing && <div className="space-y-2">
            <Progress value={progress} />
            <p className="text-sm text-center text-muted-foreground">
              处理中... {Math.round(progress)}%
            </p>
          </div>}
        
        <DialogFooter>
          <Button variant="outline" onClick={() => setConfirmDialog(false)} disabled={isProcessing}>
            取消
          </Button>
          <Button onClick={processBatchOperation} disabled={isProcessing}>
            {isProcessing ? '处理中...' : '确认执行'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </>;
}