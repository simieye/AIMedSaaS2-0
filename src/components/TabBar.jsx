// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Home, Users, Building, Settings, Activity } from 'lucide-react';

export function TabBar({
  activeTab,
  onTabChange
}) {
  const tabs = [{
    id: 'dashboard',
    label: '控制台',
    icon: Home
  }, {
    id: 'patients',
    label: '患者',
    icon: Users
  }, {
    id: 'partners',
    label: '合作伙伴',
    icon: Building
  }, {
    id: 'mcp',
    label: '工具',
    icon: Activity
  }, {
    id: 'settings',
    label: '设置',
    icon: Settings
  }];
  return <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div className="max-w-md mx-auto px-4">
        <div className="flex justify-around">
          {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return <button key={tab.id} onClick={() => onTabChange(tab.id)} className={`flex flex-col items-center py-2 px-3 text-xs ${isActive ? 'text-blue-600' : 'text-gray-600'}`}>
              <Icon className={`h-5 w-5 mb-1 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
              {tab.label}
            </button>;
        })}
        </div>
      </div>
    </nav>;
}