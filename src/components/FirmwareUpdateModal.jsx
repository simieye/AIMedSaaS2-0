// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, Button, Progress } from '@/components/ui';
// @ts-ignore;
import { Download, CheckCircle, AlertCircle } from 'lucide-react';

export function FirmwareUpdateModal({
  isOpen,
  onClose,
  progress
}) {
  const hasProgress = Object.keys(progress).length > 0;
  const isCompleted = hasProgress && Object.values(progress).every(p => p === 100);
  return <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>固件更新</DialogTitle>
          <DialogDescription>
            {isCompleted ? '所有设备固件更新完成' : '正在更新设备固件...'}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {hasProgress ? Object.entries(progress).map(([deviceId, value]) => <div key={deviceId} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>设备 {deviceId.slice(-6)}</span>
                <span>{value}%</span>
              </div>
              <Progress value={value} />
            </div>) : <div className="text-center py-8">
              <Download className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">准备开始固件更新...</p>
            </div>}
          
          {isCompleted && <div className="flex items-center justify-center text-green-600">
              <CheckCircle className="h-6 w-6 mr-2" />
              <span>更新完成</span>
            </div>}
          
          <div className="flex space-x-2">
            <Button onClick={onClose} className="flex-1" disabled={!isCompleted}>
              {isCompleted ? '完成' : '更新中...'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>;
}