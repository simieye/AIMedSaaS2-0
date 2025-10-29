// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
// @ts-ignore;
import { BarChart3, Users, FileText, Pill, Settings, LogOut, Globe } from 'lucide-react';

import { useDoctorTranslation } from '@/components/TranslationProvider';
export function Layout({
  children,
  currentPage,
  onNavigate
}) {
  const {
    t,
    language,
    setLanguage
  } = useDoctorTranslation();
  const menuItems = [{
    id: 'dashboard',
    label: t('dashboard'),
    icon: BarChart3
  }, {
    id: 'triage',
    label: t('triage'),
    icon: Users
  }, {
    id: 'reports',
    label: t('reports'),
    icon: FileText
  }, {
    id: 'prescription',
    label: t('prescription'),
    icon: Pill
  }, {
    id: 'settings',
    label: t('settings'),
    icon: Settings
  }];
  return <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-blue-600">DoctorPortal</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => setLanguage(language === 'zh' ? 'en' : 'zh')} className="flex items-center space-x-1">
                <Globe className="w-4 h-4" />
                <span>{language === 'zh' ? 'EN' : '中文'}</span>
              </Button>
              <Button variant="ghost" size="sm" onClick={() => onNavigate('login')} className="flex items-center space-x-1">
                <LogOut className="w-4 h-4" />
                <span>{t('logout')}</span>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        <aside className="w-64 bg-white shadow-sm h-screen">
          <nav className="mt-5 px-2">
            {menuItems.map(item => {
            const Icon = item.icon;
            return <button key={item.id} onClick={() => onNavigate(item.id)} className={`w-full flex items-center px-2 py-2 text-sm font-medium rounded-md mb-1 ${currentPage === item.id ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}>
                  <Icon className="mr-3 h-5 w-5" />
                  {item.label}
                </button>;
          })}
          </nav>
        </aside>

        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>;
}