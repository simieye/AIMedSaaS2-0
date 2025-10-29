// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { AlertTriangle } from 'lucide-react';
// @ts-ignore;
import { Button, Modal } from '@/components/ui';

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title = '确认操作',
  message = '确定要执行此操作吗？',
  confirmText = '确认',
  cancelText = '取消',
  type = 'warning'
}) {
  const getIconColor = () => {
    switch (type) {
      case 'error':
        return 'text-red-500';
      case 'warning':
        return 'text-yellow-500';
      case 'info':
        return 'text-blue-500';
      default:
        return 'text-gray-500';
    }
  };
  return <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <AlertTriangle className={`h-6 w-6 ${getIconColor()}`} />
          <p className="text-gray-700">{message}</p>
        </div>
        
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>
            {cancelText}
          </Button>
          <Button variant={type === 'error' ? 'destructive' : 'default'} onClick={onConfirm}>
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>;
}