// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, Button, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Label, useToast } from '@/components/ui';
// @ts-ignore;
import { Download, Calendar, FileSpreadsheet } from 'lucide-react';

export function DataExportModal({
  isOpen,
  onClose,
  devices
}) {
  const [exportConfig, setExportConfig] = useState({
    format: 'csv',
    dateRange: '7d',
    devices: 'all',
    dataTypes: ['heart_rate', 'steps', 'temperature', 'battery']
  });
  const [isExporting, setIsExporting] = useState(false);
  const {
    toast
  } = useToast();
  const handleExport = async () => {
    setIsExporting(true);
    try {
      // 模拟数据导出
      await new Promise(resolve => setTimeout(resolve, 2000));

      // 创建模拟CSV数据
      const csvContent = generateMockCSV();
      downloadFile(csvContent, `wearable_data_${new Date().toISOString().split('T')[0]}.csv`);
      toast({
        title: "导出成功",
        description: "数据已成功导出",
        variant: "default"
      });
      onClose();
    } catch (error) {
      toast({
        title: "导出失败",
        description: error.message || "无法导出数据",
        variant: "destructive"
      });
    } finally {
      setIsExporting(false);
    }
  };
  const generateMockCSV = () => {
    const headers = ['设备ID', '时间', '心率', '步数', '体温', '电量'];
    const rows = [['device_001', '2024-01-01 10:00:00', '75', '1000', '36.5', '85'], ['device_001', '2024-01-01 10:05:00', '78', '1050', '36.6', '84'], ['device_002', '2024-01-01 10:00:00', '72', '800', '36.4', '90']];
    return [headers, ...rows].map(row => row.join(',')).join('\n');
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
  return <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>导出健康数据</DialogTitle>
          <DialogDescription>
            选择导出格式和时间范围
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label>导出格式</Label>
            <Select value={exportConfig.format} onValueChange={value => setExportConfig(prev => ({
            ...prev,
            format: value
          }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="csv">CSV</SelectItem>
                <SelectItem value="excel">Excel</SelectItem>
                <SelectItem value="json">JSON</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label>时间范围</Label>
            <Select value={exportConfig.dateRange} onValueChange={value => setExportConfig(prev => ({
            ...prev,
            dateRange: value
          }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1d">最近1天</SelectItem>
                <SelectItem value="7d">最近7天</SelectItem>
                <SelectItem value="30d">最近30天</SelectItem>
                <SelectItem value="all">全部数据</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label>设备选择</Label>
            <Select value={exportConfig.devices} onValueChange={value => setExportConfig(prev => ({
            ...prev,
            devices: value
          }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部设备</SelectItem>
                <SelectItem value="selected">选中设备</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button onClick={handleExport} disabled={isExporting} className="w-full">
            {isExporting ? <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                导出中...
              </> : <>
                <Download className="h-4 w-4 mr-2" />
                导出数据
              </>}
          </Button>
        </div>
      </DialogContent>
    </Dialog>;
}