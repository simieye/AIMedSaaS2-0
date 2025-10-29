// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Badge, Tabs, TabsContent, TabsList, TabsTrigger, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, useToast, Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui';
// @ts-ignore;
import { Settings, Shield, Database, Users, Bell, Globe, Lock, Key, Eye, EyeOff, Save, RefreshCw, Download, Upload, Plus, Edit, Trash2, CheckCircle, AlertTriangle, Clock, Calendar, FileText, Server, Cpu, HardDrive, Wifi, Battery, Thermometer, Wind, Activity, BarChart3, Brain } from 'lucide-react';

export function SystemSettings({
  $w
}) {
  const {
    toast
  } = useToast();
  const [activeTab, setActiveTab] = React.useState('general');
  const [showPassword, setShowPassword] = React.useState(false);
  const [settings, setSettings] = React.useState({
    systemName: 'MedAI Platform',
    version: 'v2.1.0',
    language: 'zh-CN',
    timezone: 'Asia/Shanghai',
    adminPassword: '',
    sessionTimeout: '30',
    maxLoginAttempts: '5',
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    backupFrequency: 'daily',
    backupRetention: '30',
    autoBackup: true
  });
  const handleSaveSettings = () => {
    toast({
      title: "保存设置",
      description: "设置已成功保存"
    });
  };
  const handleResetSettings = () => {
    setSettings({
      systemName: 'MedAI Platform',
      version: 'v2.1.0',
      language: 'zh-CN',
      timezone: 'Asia/Shanghai',
      adminPassword: '',
      sessionTimeout: '30',
      maxLoginAttempts: '5',
      emailNotifications: true,
      smsNotifications: false,
      pushNotifications: true,
      backupFrequency: 'daily',
      backupRetention: '30',
      autoBackup: true
    });
    toast({
      title: "重置设置",
      description: "设置已重置为默认值"
    });
  };
  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };
  return <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">系统设置</h2>
          <p className="text-gray-600">配置系统参数和偏好设置</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={handleResetSettings} className="flex items-center space-x-2">
            <RefreshCw className="h-4 w-4" />
            <span>重置</span>
          </Button>
          <Button onClick={handleSaveSettings} className="flex items-center space-x-2">
            <Save className="h-4 w-4" />
            <span>保存</span>
          </Button>
        </div>
      </div>

      {/* Settings Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general">常规设置</TabsTrigger>
          <TabsTrigger value="security">安全设置</TabsTrigger>
          <TabsTrigger value="notifications">通知设置</TabsTrigger>
          <TabsTrigger value="system">系统设置</TabsTrigger>
          <TabsTrigger value="backup">备份设置</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                常规配置
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    系统名称
                  </label>
                  <input type="text" value={settings.systemName} onChange={e => handleSettingChange('systemName', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    系统版本
                  </label>
                  <input type="text" value={settings.version} disabled className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    默认语言
                  </label>
                  <Select value={settings.language} onValueChange={value => handleSettingChange('language', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="zh-CN">简体中文</SelectItem>
                      <SelectItem value="en-US">English</SelectItem>
                      <SelectItem value="ja-JP">日本語</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    时区设置
                  </label>
                  <Select value={settings.timezone} onValueChange={value => handleSettingChange('timezone', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Asia/Shanghai">Asia/Shanghai</SelectItem>
                      <SelectItem value="UTC">UTC</SelectItem>
                      <SelectItem value="America/New_York">America/New_York</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                安全配置
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    管理员密码
                  </label>
                  <div className="relative">
                    <input type={showPassword ? "text" : "password"} value={settings.adminPassword} onChange={e => handleSettingChange('adminPassword', e.target.value)} placeholder="输入新密码" className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      {showPassword ? <EyeOff className="h-4 w-4 text-gray-400" /> : <Eye className="h-4 w-4 text-gray-400" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    会话超时（分钟）
                  </label>
                  <input type="number" value={settings.sessionTimeout} onChange={e => handleSettingChange('sessionTimeout', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    最大登录尝试次数
                  </label>
                  <input type="number" value={settings.maxLoginAttempts} onChange={e => handleSettingChange('maxLoginAttempts', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    双因素认证
                  </label>
                  <Select defaultValue="enabled">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="enabled">启用</SelectItem>
                      <SelectItem value="disabled">禁用</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="h-5 w-5 mr-2" />
                通知配置
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">邮件通知</p>
                    <p className="text-sm text-gray-500">接收系统邮件通知</p>
                  </div>
                  <Button variant={settings.emailNotifications ? "default" : "outline"} onClick={() => handleSettingChange('emailNotifications', !settings.emailNotifications)}>
                    {settings.emailNotifications ? "已启用" : "已禁用"}
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">短信通知</p>
                    <p className="text-sm text-gray-500">接收短信通知</p>
                  </div>
                  <Button variant={settings.smsNotifications ? "default" : "outline"} onClick={() => handleSettingChange('smsNotifications', !settings.smsNotifications)}>
                    {settings.smsNotifications ? "已启用" : "已禁用"}
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">推送通知</p>
                    <p className="text-sm text-gray-500">接收应用内推送通知</p>
                  </div>
                  <Button variant={settings.pushNotifications ? "default" : "outline"} onClick={() => handleSettingChange('pushNotifications', !settings.pushNotifications)}>
                    {settings.pushNotifications ? "已启用" : "已禁用"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* System Settings */}
        <TabsContent value="system" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Server className="h-5 w-5 mr-2" />
                系统配置
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    数据库连接池大小
                  </label>
                  <input type="number" defaultValue="20" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    缓存过期时间（小时）
                  </label>
                  <input type="number" defaultValue="24" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    日志级别
                  </label>
                  <Select defaultValue="info">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="debug">Debug</SelectItem>
                      <SelectItem value="info">Info</SelectItem>
                      <SelectItem value="warning">Warning</SelectItem>
                      <SelectItem value="error">Error</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    API限流（请求/分钟）
                  </label>
                  <input type="number" defaultValue="1000" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Backup Settings */}
        <TabsContent value="backup" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="h-5 w-5 mr-2" />
                备份配置
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    备份频率
                  </label>
                  <Select value={settings.backupFrequency} onValueChange={value => handleSettingChange('backupFrequency', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">每小时</SelectItem>
                      <SelectItem value="daily">每日</SelectItem>
                      <SelectItem value="weekly">每周</SelectItem>
                      <SelectItem value="monthly">每月</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    备份保留天数
                  </label>
                  <input type="number" value={settings.backupRetention} onChange={e => handleSettingChange('backupRetention', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">自动备份</p>
                  <p className="text-sm text-gray-500">启用自动备份功能</p>
                </div>
                <Button variant={settings.autoBackup ? "default" : "outline"} onClick={() => handleSettingChange('autoBackup', !settings.autoBackup)}>
                  {settings.autoBackup ? "已启用" : "已禁用"}
                </Button>
              </div>
              <div className="flex space-x-4">
                <Button variant="outline" className="flex items-center space-x-2">
                  <Download className="h-4 w-4" />
                  <span>立即备份</span>
                </Button>
                <Button variant="outline" className="flex items-center space-x-2">
                  <Upload className="h-4 w-4" />
                  <span>恢复备份</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>;
}