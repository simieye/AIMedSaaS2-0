// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Label, Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui';
// @ts-ignore;
import { User, Building, Bell, Shield } from 'lucide-react';

export function PartnerSettings({
  partnerData,
  t
}) {
  // 防御式处理：确保 partnerData 和 t 存在
  const safePartnerData = partnerData || {};
  const safeT = t || (key => key);
  const [profile, setProfile] = useState({
    name: safePartnerData.name || '',
    email: safePartnerData.email || '',
    company: safePartnerData.company || '',
    phone: safePartnerData.phone || ''
  });
  const [activeTab, setActiveTab] = useState('profile');
  const handleProfileChange = (field, value) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };
  const handleSaveProfile = () => {
    // 保存逻辑
    console.log('Saving profile:', profile);
  };
  return <div className="space-y-6">
      <h2 className="text-2xl font-bold">{safeT('settings')}</h2>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile">{safeT('profile')}</TabsTrigger>
          <TabsTrigger value="company">{safeT('company')}</TabsTrigger>
          <TabsTrigger value="notifications">{safeT('notifications')}</TabsTrigger>
          <TabsTrigger value="security">{safeT('security')}</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>{safeT('profile')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>{safeT('name')}</Label>
                <Input value={profile.name} onChange={e => handleProfileChange('name', e.target.value)} />
              </div>
              <div>
                <Label>{safeT('email')}</Label>
                <Input type="email" value={profile.email} onChange={e => handleProfileChange('email', e.target.value)} />
              </div>
              <div>
                <Label>{safeT('phone')}</Label>
                <Input value={profile.phone} onChange={e => handleProfileChange('phone', e.target.value)} />
              </div>
              <Button onClick={handleSaveProfile}>{safeT('save')}</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="company">
          <Card>
            <CardHeader>
              <CardTitle>{safeT('company')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>{safeT('companyName')}</Label>
                <Input value={profile.company} onChange={e => handleProfileChange('company', e.target.value)} />
              </div>
              <div>
                <Label>{safeT('businessLicense')}</Label>
                <Input placeholder={safeT('uploadLicense') || '上传营业执照'} />
              </div>
              <Button>{safeT('save')}</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>{safeT('notifications')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">{safeT('notificationSettings') || '通知设置功能开发中...'}</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>{safeT('security')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">{safeT('securitySettings') || '安全设置功能开发中...'}</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>;
}