// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Badge, Alert, AlertDescription, Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui';
// @ts-ignore;
import { BarChart3, Key, FileText, CreditCard, BookOpen, MessageSquare, Settings, User, Building, Bell, Shield } from 'lucide-react';

import { PartnerTranslationProvider, useTranslation } from '@/components/PartnerTranslationProvider';
import { PartnerLogin } from '@/components/PartnerLogin';
import { PartnerDashboard } from '@/components/PartnerDashboard';
import { ApiKeys } from '@/components/ApiKeys';
import { Agreements } from '@/components/Agreements';
import { Billing } from '@/components/Billing';
import { Docs } from '@/components/Docs';
import { Tickets } from '@/components/Tickets';
import { PartnerSettings } from '@/components/PartnerSettings';
function PartnerPortalContent(props) {
  const {
    t
  } = useTranslation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [partnerData, setPartnerData] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  useEffect(() => {
    // 检查登录状态
    const token = localStorage.getItem('partnerToken');
    const storedData = localStorage.getItem('partnerData');
    if (token && storedData) {
      setIsLoggedIn(true);
      setPartnerData(JSON.parse(storedData));
    }
  }, []);
  const handleLoginSuccess = data => {
    setIsLoggedIn(true);
    setPartnerData(data);
  };
  const handleLogout = () => {
    localStorage.removeItem('partnerToken');
    localStorage.removeItem('partnerData');
    setIsLoggedIn(false);
    setPartnerData(null);
  };
  if (!isLoggedIn) {
    return <PartnerLogin onLoginSuccess={handleLoginSuccess} />;
  }
  return <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold">{t('partnerPortal')}</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                {t('welcome')}, {partnerData?.name}
              </span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                {t('logout')}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-6 lg:grid-cols-7">
            <TabsTrigger value="dashboard">{t('dashboard')}</TabsTrigger>
            <TabsTrigger value="apiKeys">{t('apiKeys')}</TabsTrigger>
            <TabsTrigger value="agreements">{t('agreements')}</TabsTrigger>
            <TabsTrigger value="billing">{t('billing')}</TabsTrigger>
            <TabsTrigger value="docs">{t('docs')}</TabsTrigger>
            <TabsTrigger value="tickets">{t('tickets')}</TabsTrigger>
            <TabsTrigger value="settings">{t('settings')}</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <PartnerDashboard partnerData={partnerData} />
          </TabsContent>

          <TabsContent value="apiKeys">
            <ApiKeys partnerId={partnerData?.id} />
          </TabsContent>

          <TabsContent value="agreements">
            <Agreements partnerId={partnerData?.id} />
          </TabsContent>

          <TabsContent value="billing">
            <Billing partnerId={partnerData?.id} />
          </TabsContent>

          <TabsContent value="docs">
            <Docs />
          </TabsContent>

          <TabsContent value="tickets">
            <Tickets partnerId={partnerData?.id} />
          </TabsContent>

          <TabsContent value="settings">
            <PartnerSettings partnerData={partnerData} />
          </TabsContent>
        </Tabs>
      </div>
    </div>;
}
export default function PartnerPortal(props) {
  return <PartnerTranslationProvider>
      <PartnerPortalContent {...props} />
    </PartnerTranslationProvider>;
}