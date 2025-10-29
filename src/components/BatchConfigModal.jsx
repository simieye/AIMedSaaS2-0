// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, Button, Input, Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, useToast } from '@/components/ui';
// @ts-ignore;
import { Settings, CheckCircle } from 'lucide-react';

export function BatchConfigModal({
  isOpen,
  onClose,
  selectedDevices,
  onConfigApply
}) {
  const [config, setConfig] = useState({
    sync_frequency: 300,
    auto_sync: true,
    data_retention_days: 30,
    alert_thresholds: {
      heart_rate_min: 60,
      heart_rate_max: 100,
      temperature_min: 35.5,
      temperature_max: 37.5,
      battery_min: 20
    }
  });
  const [isApplying, setIsApplying] = useState(false);
  const {
    toast
  } = useToast();
  const handleApplyConfig = async () => {
    setIsApplying(true);
    try {
      // 模拟批量配置应用
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast({
        title: "配置应用成功",
        description: `已为 ${selectedDevices.length} 个设备应用配置`,
        variant: "default"
      });
      onConfigApply();
      onClose();
    } catch (error) {
      toast({
        title: "配置应用失败",
        description: error.message || "无法应用配置",
        variant: "destructive"
      });
    } finally {
      setIsApplying(false);
    }
  };
  return <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>批量配置设备</DialogTitle>
          <DialogDescription>
            为选中的 {selectedDevices.length} 个设备应用配置
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label>同步频率（秒）</Label>
            <Input type="number" value={config.sync_frequency} onChange={e => setConfig(prev => ({
            ...prev,
            sync_frequency: parseInt(e.target.value)
          }))} />
          </div>
          
          <div>
            <Label>数据保留天数</Label>
            <Input type="number" value={config.data_retention_days} onChange={e => setConfig(prev => ({
            ...prev,
            data_retention_days: parseInt(e.target.value)
          }))} />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>心率最小值</Label>
              <Input type="number" value={config.alert_thresholds.heart_rate_min} onChange={e => setConfig(prev => ({
              ...prev,
              alert_thresholds: {
                ...prev.alert_thresholds,
                heart_rate_min: parseInt(e.target.value)
              }
            }))} />
            </div>
            <div>
              <Label>心率最大值</Label>
              <Input type="number" value={config.alert_thresholds.heart_rate_max} onChange={e => setConfig(prev => ({
              ...prev,
              alert_thresholds: {
                ...prev.alert_thresholds,
                heart_rate_max: parseInt(e.target.value)
              }
            }))} />
            </div>
          </div>
          
          <div className="flex space-x-2">
            <Button onClick={handleApplyConfig} disabled={isApplying} className="flex-1">
              {isApplying ? <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  应用中...
                </> : <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  应用配置
                </>}
            </Button>
            <Button variant="outline" onClick={onClose}>
              取消
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>;
}