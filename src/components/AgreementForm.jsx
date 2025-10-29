// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Select, Textarea, useToast, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui';
// @ts-ignore;
import { Building2, Calendar, DollarSign, User, Mail, Phone, FileText, Plus, X, Upload, Save } from 'lucide-react';

export function AgreementForm({
  $w,
  agreementId,
  onSave,
  onCancel,
  className,
  style
}) {
  const {
    toast
  } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    partner_id: '',
    type: 'strategic_cooperation',
    value: '',
    responsible_person: '',
    contact_email: '',
    contact_phone: '',
    start_date: '',
    end_date: '',
    description: '',
    terms: {
      purpose: '',
      scope: '',
      responsibilities: {
        provider: [],
        hospital: []
      },
      deliverables: [],
      data_sharing: {
        scope: '',
        purpose: '',
        security: '',
        retention: ''
      }
    }
  });
  const [newProviderResponsibility, setNewProviderResponsibility] = useState('');
  const [newHospitalResponsibility, setNewHospitalResponsibility] = useState('');
  const [newDeliverable, setNewDeliverable] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const agreementTypes = [{
    value: 'strategic_cooperation',
    label: '战略合作'
  }, {
    value: 'technical_service',
    label: '技术服务'
  }, {
    value: 'pilot_project',
    label: '试点项目'
  }, {
    value: 'research_cooperation',
    label: '科研合作'
  }];
  useEffect(() => {
    if (agreementId) {
      // 如果是编辑模式，加载现有数据
      setLoading(true);
      setTimeout(() => {
        const mockData = {
          name: '北京协和医院AI诊断系统合作协议',
          partner_id: 'partner_001',
          type: 'strategic_cooperation',
          value: '5000000',
          responsible_person: '张主任',
          contact_email: 'zhang@xiehe.com',
          contact_phone: '010-12345678',
          start_date: '2024-01-01',
          end_date: '2024-12-31',
          description: '战略合作协议，包含AI诊断系统部署和技术支持',
          terms: {
            purpose: '通过AI诊断技术提升医疗服务质量，建立长期战略合作关系',
            scope: 'AI诊断系统部署、技术支持、人员培训、数据共享',
            responsibilities: {
              provider: ['提供AI诊断系统', '技术支持和维护', '人员培训', '系统升级'],
              hospital: ['提供医疗数据', '配合系统部署', '人员配合', '反馈使用情况']
            },
            deliverables: ['AI诊断系统', '技术文档', '培训材料', '维护服务'],
            data_sharing: {
              scope: '脱敏医疗数据',
              purpose: 'AI模型训练和优化',
              security: '符合HIPAA和GDPR标准',
              retention: '协议终止后2年'
            }
          }
        };
        setFormData(mockData);
        setLoading(false);
      }, 1000);
    }
  }, [agreementId]);
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  const handleTermsChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      terms: {
        ...prev.terms,
        [field]: value
      }
    }));
  };
  const handleDataSharingChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      terms: {
        ...prev.terms,
        data_sharing: {
          ...prev.terms.data_sharing,
          [field]: value
        }
      }
    }));
  };
  const addProviderResponsibility = () => {
    if (newProviderResponsibility.trim()) {
      setFormData(prev => ({
        ...prev,
        terms: {
          ...prev.terms,
          responsibilities: {
            ...prev.terms.responsibilities,
            provider: [...prev.terms.responsibilities.provider, newProviderResponsibility.trim()]
          }
        }
      }));
      setNewProviderResponsibility('');
    }
  };
  const removeProviderResponsibility = index => {
    setFormData(prev => ({
      ...prev,
      terms: {
        ...prev.terms,
        responsibilities: {
          ...prev.terms.responsibilities,
          provider: prev.terms.responsibilities.provider.filter((_, i) => i !== index)
        }
      }
    }));
  };
  const addHospitalResponsibility = () => {
    if (newHospitalResponsibility.trim()) {
      setFormData(prev => ({
        ...prev,
        terms: {
          ...prev.terms,
          responsibilities: {
            ...prev.terms.responsibilities,
            hospital: [...prev.terms.responsibilities.hospital, newHospitalResponsibility.trim()]
          }
        }
      }));
      setNewHospitalResponsibility('');
    }
  };
  const removeHospitalResponsibility = index => {
    setFormData(prev => ({
      ...prev,
      terms: {
        ...prev.terms,
        responsibilities: {
          ...prev.terms.responsibilities,
          hospital: prev.terms.responsibilities.hospital.filter((_, i) => i !== index)
        }
      }
    }));
  };
  const addDeliverable = () => {
    if (newDeliverable.trim()) {
      setFormData(prev => ({
        ...prev,
        terms: {
          ...prev.terms,
          deliverables: [...prev.terms.deliverables, newDeliverable.trim()]
        }
      }));
      setNewDeliverable('');
    }
  };
  const removeDeliverable = index => {
    setFormData(prev => ({
      ...prev,
      terms: {
        ...prev.terms,
        deliverables: prev.terms.deliverables.filter((_, i) => i !== index)
      }
    }));
  };
  const handleFileUpload = event => {
    const files = Array.from(event.target.files);
    const newFiles = files.map(file => ({
      name: file.name,
      size: `${(file.size / 1024 / 1024).toFixed(2)}MB`,
      type: file.type,
      uploadDate: new Date().toISOString()
    }));
    setUploadedFiles(prev => [...prev, ...newFiles]);
  };
  const removeFile = index => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };
  const handleSubmit = async () => {
    // 基本验证
    if (!formData.name || !formData.responsible_person || !formData.contact_email || !formData.start_date || !formData.end_date) {
      toast({
        title: "验证失败",
        description: "请填写所有必填字段",
        variant: "destructive"
      });
      return;
    }
    setLoading(true);
    try {
      // 模拟保存操作
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast({
        title: "保存成功",
        description: agreementId ? "协议已更新" : "新协议已创建"
      });
      if (onSave) {
        onSave(formData);
      }
    } catch (error) {
      toast({
        title: "保存失败",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return <div className={className} style={style}>
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">加载中...</div>
        </div>
      </div>;
  }
  return <div className={className} style={style}>
      <div className="space-y-6">
        {/* 头部 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {agreementId ? '编辑协议' : '新增协议'}
            </h1>
            <p className="text-gray-600">
              {agreementId ? '修改现有合作协议信息' : '创建新的合作协议'}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={onCancel}>
              取消
            </Button>
            <Button onClick={handleSubmit} disabled={loading}>
              {loading ? <>
                  <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  保存中...
                </> : <>
                  <Save className="w-4 h-4 mr-2" />
                  保存协议
                </>}
            </Button>
          </div>
        </div>

        {/* 基本信息 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Building2 className="w-5 h-5 mr-2" />
              基本信息
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  协议名称 *
                </label>
                <Input value={formData.name} onChange={e => handleInputChange('name', e.target.value)} placeholder="请输入协议名称" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  合作伙伴ID
                </label>
                <Input value={formData.partner_id} onChange={e => handleInputChange('partner_id', e.target.value)} placeholder="请输入合作伙伴ID" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  协议类型 *
                </label>
                <Select value={formData.type} onValueChange={value => handleInputChange('type', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {agreementTypes.map(type => <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  合作金额 (元)
                </label>
                <Input type="number" value={formData.value} onChange={e => handleInputChange('value', e.target.value)} placeholder="请输入合作金额" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  负责人 *
                </label>
                <Input value={formData.responsible_person} onChange={e => handleInputChange('responsible_person', e.target.value)} placeholder="请输入负责人姓名" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  联系邮箱 *
                </label>
                <Input type="email" value={formData.contact_email} onChange={e => handleInputChange('contact_email', e.target.value)} placeholder="请输入联系邮箱" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  联系电话
                </label>
                <Input value={formData.contact_phone} onChange={e => handleInputChange('contact_phone', e.target.value)} placeholder="请输入联系电话" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  开始日期 *
                </label>
                <Input type="date" value={formData.start_date} onChange={e => handleInputChange('start_date', e.target.value)} />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  结束日期 *
                </label>
                <Input type="date" value={formData.end_date} onChange={e => handleInputChange('end_date', e.target.value)} />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  协议描述
                </label>
                <Textarea value={formData.description} onChange={e => handleInputChange('description', e.target.value)} placeholder="请输入协议描述" rows={3} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 协议条款 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="w-5 h-5 mr-2" />
              协议条款
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  合作目的
                </label>
                <Textarea value={formData.terms.purpose} onChange={e => handleTermsChange('purpose', e.target.value)} placeholder="请描述合作目的" rows={3} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  合作范围
                </label>
                <Textarea value={formData.terms.scope} onChange={e => handleTermsChange('scope', e.target.value)} placeholder="请描述合作范围" rows={3} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 责任分工 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="w-5 h-5 mr-2" />
              责任分工
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  服务方责任
                </label>
                <div className="space-y-2">
                  {formData.terms.responsibilities.provider.map((responsibility, index) => <div key={index} className="flex items-center space-x-2">
                      <span className="flex-1 text-gray-700">{responsibility}</span>
                      <Button variant="ghost" size="sm" onClick={() => removeProviderResponsibility(index)}>
                        <X className="w-4 h-4" />
                      </Button>
                    </div>)}
                  <div className="flex space-x-2">
                    <Input value={newProviderResponsibility} onChange={e => setNewProviderResponsibility(e.target.value)} placeholder="添加服务方责任" />
                    <Button onClick={addProviderResponsibility}>
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  医院责任
                </label>
                <div className="space-y-2">
                  {formData.terms.responsibilities.hospital.map((responsibility, index) => <div key={index} className="flex items-center space-x-2">
                      <span className="flex-1 text-gray-700">{responsibility}</span>
                      <Button variant="ghost" size="sm" onClick={() => removeHospitalResponsibility(index)}>
                        <X className="w-4 h-4" />
                      </Button>
                    </div>)}
                  <div className="flex space-x-2">
                    <Input value={newHospitalResponsibility} onChange={e => setNewHospitalResponsibility(e.target.value)} placeholder="添加医院责任" />
                    <Button onClick={addHospitalResponsibility}>
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 交付物 */}
        <Card>
          <CardHeader>
            <CardTitle>交付物</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {formData.terms.deliverables.map((deliverable, index) => <div key={index} className="flex items-center space-x-2">
                  <span className="flex-1 text-gray-700">{deliverable}</span>
                  <Button variant="ghost" size="sm" onClick={() => removeDeliverable(index)}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>)}
              <div className="flex space-x-2">
                <Input value={newDeliverable} onChange={e => setNewDeliverable(e.target.value)} placeholder="添加交付物" />
                <Button onClick={addDeliverable}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 数据共享 */}
        <Card>
          <CardHeader>
            <CardTitle>数据共享条款</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  数据范围
                </label>
                <Textarea value={formData.terms.data_sharing.scope} onChange={e => handleDataSharingChange('scope', e.target.value)} placeholder="请描述数据共享范围" rows={2} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  使用目的
                </label>
                <Textarea value={formData.terms.data_sharing.purpose} onChange={e => handleDataSharingChange('purpose', e.target.value)} placeholder="请描述数据使用目的" rows={2} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  安全标准
                </label>
                <Textarea value={formData.terms.data_sharing.security} onChange={e => handleDataSharingChange('security', e.target.value)} placeholder="请描述安全标准" rows={2} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  数据保留
                </label>
                <Textarea value={formData.terms.data_sharing.retention} onChange={e => handleDataSharingChange('retention', e.target.value)} placeholder="请描述数据保留期限" rows={2} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 文档上传 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Upload className="w-5 h-5 mr-2" />
              协议文档
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <div className="text-gray-600 mb-2">点击上传或拖拽文件到此处</div>
                <div className="text-sm text-gray-500">支持 PDF、DOC、DOCX 格式，单个文件不超过 10MB</div>
                <input type="file" multiple accept=".pdf,.doc,.docx" onChange={handleFileUpload} className="hidden" id="file-upload" />
                <Button variant="outline" className="mt-4" onClick={() => document.getElementById('file-upload').click()}>
                  选择文件
                </Button>
              </div>
              {uploadedFiles.length > 0 && <div className="space-y-2">
                  {uploadedFiles.map((file, index) => <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FileText className="w-5 h-5 text-gray-400" />
                        <div>
                          <div className="font-medium text-gray-900">{file.name}</div>
                          <div className="text-sm text-gray-500">{file.size} • {file.uploadDate}</div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => removeFile(index)}>
                        <X className="w-4 h-4" />
                      </Button>
                    </div>)}
                </div>}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>;
}