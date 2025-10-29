// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Search, FileText, Users, Activity } from 'lucide-react';

export function EmptyState({
  type = 'default',
  title,
  description,
  action
}) {
  const states = {
    search: {
      icon: Search,
      title: title || '没有找到结果',
      description: description || '请尝试其他搜索条件'
    },
    data: {
      icon: FileText,
      title: title || '暂无数据',
      description: description || '数据正在加载中，请稍后再试'
    },
    users: {
      icon: Users,
      title: title || '暂无用户',
      description: description || '还没有添加任何用户'
    },
    activity: {
      icon: Activity,
      title: title || '暂无活动',
      description: description || '当前没有任何活动记录'
    },
    default: {
      icon: Search,
      title: title || '暂无内容',
      description: description || '这里还没有任何内容'
    }
  };
  const currentState = states[type] || states.default;
  const Icon = currentState.icon;
  return <div className="flex flex-col items-center justify-center py-12 text-center">
      <Icon className="h-12 w-12 text-gray-400 mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">{currentState.title}</h3>
      <p className="text-sm text-gray-500 mb-4">{currentState.description}</p>
      {action && <div>{action}</div>}
    </div>;
}