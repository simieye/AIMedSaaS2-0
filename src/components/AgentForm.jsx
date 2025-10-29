// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Textarea, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Label } from '@/components/ui';
// @ts-ignore;
import { Save, RotateCcw } from 'lucide-react';

export function AgentForm({
  agent,
  onSave,
  onCancel
}) {
  const [formData, setFormData] = useState({
    name: agent?.name || '',
    type: agent?.type || 'diagnosis',
    description: agent?.description || '',
    model: agent?.model || 'gpt-4',
    temperature: agent?.temperature || 0.7,
    maxTokens: agent?.maxTokens || 1000,
    systemPrompt: agent?.systemPrompt || '',
    status: agent?.status || 'idle'
  });
  const handleSubmit = e => {
    e.preventDefault();
    onSave(formData);
  };
  const handleReset = () => {
    setFormData({
      name: '',
      type: 'diagnosis',
      description: '',
      model: 'gpt-4',
      temperature: 0.7,
      maxTokens: 1000,
      systemPrompt: '',
      status: 'idle'
    });
  };
  return <Card>
      <CardHeader>
        <CardTitle>{agent ? '编辑智能体' : '创建智能体'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>智能体名称</Label>
              <Input value={formData.name} onChange={e => setFormData({
              ...formData,
              name: e.target.value
            })} placeholder="输入智能体名称" required />
            </div>
            <div>
              <Label>类型</Label>
              <Select value={formData.type} onValueChange={value => setFormData({
              ...formData,
              type: value
            })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="diagnosis">诊断助手</SelectItem>
                  <SelectItem value="followup">随访管理</SelectItem>
                  <SelectItem value="medication">用药提醒</SelectItem>
                  <SelectItem value="education">健康教育</SelectItem>
                  <SelectItem value="triage">分诊助手</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div>
            <Label>描述</Label>
            <Textarea value={formData.description} onChange={e => setFormData({
            ...formData,
            description: e.target.value
          })} placeholder="描述智能体的功能和用途" rows={3} />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>模型</Label>
              <Select value={formData.model} onValueChange={value => setFormData({
              ...formData,
              model: value
            })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt-4">GPT-4</SelectItem>
                  <SelectItem value="gpt-3.5">GPT-3.5</SelectItem>
                  <SelectItem value="claude">Claude</SelectItem>
                  <SelectItem value="hunyuan">腾讯混元</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>温度</Label>
              <Input type="number" step="0.1" min="0" max="2" value={formData.temperature} onChange={e => setFormData({
              ...formData,
              temperature: parseFloat(e.target.value)
            })} />
            </div>
          </div>
          
          <div>
            <Label>系统提示词</Label>
            <Textarea value={formData.systemPrompt} onChange={e => setFormData({
            ...formData,
            systemPrompt: e.target.value
          })} placeholder="定义智能体的行为和角色" rows={4} />
          </div>
          
          <div className="flex space-x-2">
            <Button type="submit">
              <Save className="h-4 w-4 mr-2" />
              保存
            </Button>
            <Button type="button" variant="outline" onClick={handleReset}>
              <RotateCcw className="h-4 w-4 mr-2" />
              重置
            </Button>
            {onCancel && <Button type="button" variant="ghost" onClick={onCancel}>
                取消
              </Button>}
          </div>
        </form>
      </CardContent>
    </Card>;
}