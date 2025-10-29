// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Bell, Check, Clock, AlertTriangle } from 'lucide-react';
// @ts-ignore;
import { Button, Badge, Card, CardContent } from '@/components/ui';

export function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([{
    id: 1,
    type: 'warning',
    title: '系统维护提醒',
    message: '今晚23:00-24:00将进行系统维护',
    time: '2小时前',
    read: false
  }, {
    id: 2,
    type: 'info',
    title: '新患者注册',
    message: '张三完成了健康档案建立',
    time: '5小时前',
    read: false
  }, {
    id: 3,
    type: 'success',
    title: '任务完成',
    message: 'AI训练任务已成功完成',
    time: '1天前',
    read: true
  }]);
  const unreadCount = notifications.filter(n => !n.read).length;
  const getNotificationIcon = type => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'error':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case 'success':
        return <Check className="h-4 w-4 text-green-600" />;
      default:
        return <Bell className="h-4 w-4 text-blue-600" />;
    }
  };
  const markAsRead = id => {
    setNotifications(prev => prev.map(n => n.id === id ? {
      ...n,
      read: true
    } : n));
  };
  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({
      ...n,
      read: true
    })));
  };
  return <div className="relative">
      <Button variant="ghost" size="sm" className="relative" onClick={() => setIsOpen(!isOpen)}>
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs">
            {unreadCount}
          </Badge>}
      </Button>
      
      {isOpen && <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border z-50">
          <div className="p-4 border-b flex justify-between items-center">
            <h3 className="font-semibold">通知</h3>
            <Button variant="ghost" size="sm" onClick={markAllAsRead}>
              全部已读
            </Button>
          </div>
          
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? <div className="p-4 text-center text-gray-500">
                暂无通知
              </div> : notifications.map(notification => <div key={notification.id} className={`p-3 border-b hover:bg-gray-50 ${!notification.read ? 'bg-blue-50' : ''}`} onClick={() => markAsRead(notification.id)}>
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{notification.title}</p>
                      <p className="text-sm text-gray-600">{notification.message}</p>
                      <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                    </div>
                  </div>
                </div>)}
          </div>
          
          <div className="p-2 border-t">
            <Button variant="ghost" size="sm" className="w-full">
              查看所有通知
            </Button>
          </div>
        </div>}
    </div>;
}