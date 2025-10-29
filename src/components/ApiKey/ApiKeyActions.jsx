// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Button } from '@/components/ui';
// @ts-ignore;
import { CheckCircle, XCircle, Trash2, Eye } from 'lucide-react';

export function ApiKeyActions({
  keyData,
  onToggleStatus,
  onRevoke
}) {
  return <div className="flex space-x-1">
      <Button size="sm" variant="ghost" onClick={() => onToggleStatus(keyData._id, keyData.status)} title={keyData.status === 'active' ? '停用' : '启用'}>
        {keyData.status === 'active' ? <XCircle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
      </Button>
      <Button size="sm" variant="ghost" onClick={() => onRevoke(keyData._id)} title="撤销" disabled={keyData.status === 'revoked'}>
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>;
}