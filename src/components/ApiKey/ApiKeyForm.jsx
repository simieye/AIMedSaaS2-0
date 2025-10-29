// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Button, Input, Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Textarea } from '@/components/ui';

export function ApiKeyForm({
  partners,
  onSubmit,
  onCancel
}) {
  const [formData, setFormData] = useState({
    key_name: '',
    partner_id: '',
    permissions: [],
    daily_limit: 1000,
    monthly_limit: 30000,
    description: ''
  });
  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(formData);
  };
  return <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="key_name">密钥名称 *</Label>
        <Input id="key_name" value={formData.key_name} onChange={e => setFormData({
        ...formData,
        key_name: e.target.value
      })} required placeholder="例如：健康科技API密钥" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="partner_id">合作伙伴 *</Label>
        <Select value={formData.partner_id} onValueChange={value => setFormData({
        ...formData,
        partner_id: value
      })} required>
          <SelectTrigger>
            <SelectValue placeholder="选择合作伙伴" />
          </SelectTrigger>
          <SelectContent>
            {partners.map(partner => <SelectItem key={partner._id} value={partner._id}>
                {partner.name}
              </SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="daily_limit">每日限额</Label>
          <Input id="daily_limit" type="number" value={formData.daily_limit} onChange={e => setFormData({
          ...formData,
          daily_limit: parseInt(e.target.value)
        })} min="1" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="monthly_limit">每月限额</Label>
          <Input id="monthly_limit" type="number" value={formData.monthly_limit} onChange={e => setFormData({
          ...formData,
          monthly_limit: parseInt(e.target.value)
        })} min="1" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">描述</Label>
        <Textarea id="description" value={formData.description} onChange={e => setFormData({
        ...formData,
        description: e.target.value
      })} placeholder="密钥用途描述..." />
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          取消
        </Button>
        <Button type="submit">
          创建密钥
        </Button>
      </div>
    </form>;
}