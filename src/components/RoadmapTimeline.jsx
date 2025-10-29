// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Select, Badge, useToast, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui';
// @ts-ignore;
import { Calendar, Clock, Users, Target, AlertTriangle, CheckCircle, Play, Pause, Edit, Eye, Filter, ZoomIn, ZoomOut } from 'lucide-react';

export function RoadmapTimeline({
  $w,
  selectedTimeRange,
  selectedDepartment,
  onViewTaskDetails,
  onEditMilestone,
  className,
  style
}) {
  const {
    toast
  } = useToast();
  const [tasks, setTasks] = useState([]);
  const [milestones, setMilestones] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const mockTasks = [{
    start: new Date(2024, 0, 1),
    end: new Date(2024, 1, 15),
    name: 'AI诊断系统开发',
    id: 'task-1',
    type: 'task',
    progress: 75,
    dependencies: [],
    project: 'AI诊断',
    assignee: '张团队',
    priority: 'high',
    department: 'AI研发部',
    status: 'in_progress'
  }, {
    start: new Date(2024, 1, 1),
    end: new Date(2024, 2, 28),
    name: '知识库集成',
    id: 'task-2',
    type: 'task',
    progress: 60,
    dependencies: ['task-1'],
    project: 'RAG系统',
    assignee: '李团队',
    priority: 'high',
    department: 'AI研发部',
    status: 'in_progress'
  }, {
    start: new Date(2024, 2, 1),
    end: new Date(2024, 3, 30),
    name: '用户界面优化',
    id: 'task-3',
    type: 'task',
    progress: 40,
    dependencies: [],
    project: '前端开发',
    assignee: '王团队',
    priority: 'medium',
    department: '前端部',
    status: 'in_progress'
  }, {
    start: new Date(2024, 3, 1),
    end: new Date(2024, 4, 15),
    name: 'API接口开发',
    id: 'task-4',
    type: 'task',
    progress: 20,
    dependencies: ['task-2'],
    project: '后端开发',
    assignee: '赵团队',
    priority: 'high',
    department: '后端部',
    status: 'in_progress'
  }, {
    start: new Date(2024, 4, 1),
    end: new Date(2024, 4, 1),
    name: 'MVP版本发布',
    id: 'milestone-1',
    type: 'milestone',
    progress: 0,
    dependencies: ['task-1', 'task-2'],
    project: '里程碑',
    assignee: '项目经理',
    priority: 'critical',
    department: '管理部',
    status: 'pending'
  }, {
    start: new Date(2024, 4, 16),
    end: new Date(2024, 5, 31),
    name: '性能优化',
    id: 'task-5',
    type: 'task',
    progress: 0,
    dependencies: ['milestone-1'],
    project: '优化',
    assignee: '钱团队',
    priority: 'medium',
    department: '技术部',
    status: 'pending'
  }, {
    start: new Date(2024, 5, 1),
    end: new Date(2024, 5, 1),
    name: 'Beta版本发布',
    id: 'milestone-2',
    type: 'milestone',
    progress: 0,
    dependencies: ['task-3', 'task-4', 'task-5'],
    project: '里程碑',
    assignee: '项目经理',
    priority: 'critical',
    department: '管理部',
    status: 'pending'
  }];
  const mockMilestones = [{
    id: 'milestone-1',
    name: 'MVP版本发布',
    date: '2024-05-01',
    description: '发布最小可行产品版本',
    status: 'pending',
    dependencies: ['AI诊断系统开发', '知识库集成'],
    deliverables: ['核心功能完成', '基础测试通过', '文档齐全'],
    riskLevel: 'medium'
  }, {
    id: 'milestone-2',
    name: 'Beta版本发布',
    date: '2024-06-01',
    description: '发布Beta测试版本',
    status: 'pending',
    dependencies: ['用户界面优化', 'API接口开发', '性能优化'],
    deliverables: ['功能完整', '性能达标', '用户测试'],
    riskLevel: 'low'
  }, {
    id: 'milestone-3',
    name: '正式版本发布',
    date: '2024-07-01',
    description: '发布正式版本',
    status: 'pending',
    dependencies: ['Beta版本发布'],
    deliverables: ['所有功能完成', '性能优化', '安全认证'],
    riskLevel: 'high'
  }];
  useEffect(() => {
    setTasks(mockTasks);
    setMilestones(mockMilestones);
  }, []);
  const getStatusColor = status => {
    const statusColors = {
      completed: '#10B981',
      in_progress: '#3B82F6',
      pending: '#6B7280',
      delayed: '#EF4444'
    };
    return statusColors[status] || '#6B7280';
  };
  const getPriorityColor = priority => {
    const priorityColors = {
      critical: '#DC2626',
      high: '#F59E0B',
      medium: '#3B82F6',
      low: '#10B981'
    };
    return priorityColors[priority] || '#6B7280';
  };
  const handleTaskClick = task => {
    setSelectedTask(task);
    if (onViewTaskDetails) {
      onViewTaskDetails(task.id);
    }
  };
  const handleTaskChange = task => {
    setTasks(prev => prev.map(t => t.id === task.id ? {
      ...t,
      ...task
    } : t));
    toast({
      title: "任务更新",
      description: `任务 ${task.name} 已更新`
    });
  };
  const handleMilestoneEdit = milestoneId => {
    if (onEditMilestone) {
      onEditMilestone(milestoneId);
    }
    toast({
      title: "编辑里程碑",
      description: `正在编辑里程碑 ${milestoneId}`
    });
  };
  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.1, 2));
  };
  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.1, 0.5));
  };
  const filteredTasks = tasks.filter(task => {
    const matchesDepartment = selectedDepartment === 'all' || task.department === selectedDepartment;
    return matchesDepartment;
  });
  const completedTasks = tasks.filter(t => t.progress === 100).length;
  const inProgressTasks = tasks.filter(t => t.progress > 0 && t.progress < 100).length;
  const pendingTasks = tasks.filter(t => t.progress === 0).length;
  const overallProgress = tasks.length > 0 ? tasks.reduce((sum, task) => sum + task.progress, 0) / tasks.length : 0;
  return <div className={className} style={style}>
      <div className="space-y-6">
        {/* 头部控制 */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">项目时间轴</h2>
            <p className="text-gray-600">甘特图展示项目任务和里程碑</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={handleZoomOut}>
              <ZoomOut className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={handleZoomIn}>
              <ZoomIn className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              筛选
            </Button>
          </div>
        </div>

        {/* 进度统计 */}
        <div className="grid grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">已完成</p>
                  <p className="text-2xl font-bold text-gray-900">{completedTasks}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Play className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">进行中</p>
                  <p className="text-2xl font-bold text-gray-900">{inProgressTasks}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Pause className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">待开始</p>
                  <p className="text-2xl font-bold text-gray-900">{pendingTasks}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Target className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">整体进度</p>
                  <p className="text-2xl font-bold text-gray-900">{overallProgress.toFixed(0)}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 甘特图 */}
        <Card>
          <CardHeader>
            <CardTitle>甘特图视图</CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{
            transform: `scale(${zoomLevel})`,
            transformOrigin: 'top left',
            transition: 'transform 0.2s'
          }}>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">任务名称</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">开始时间</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">结束时间</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">进度</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">负责人</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">部门</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">优先级</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredTasks.map(task => <tr key={task.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => handleTaskClick(task)}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{task.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{task.start.toLocaleDateString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{task.end.toLocaleDateString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                              <div className="bg-blue-600 h-2 rounded-full" style={{
                            width: `${task.progress}%`
                          }}></div>
                            </div>
                            <span className="text-sm text-gray-900">{task.progress}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{task.assignee}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{task.department}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full" style={{
                        backgroundColor: `${getPriorityColor(task.priority)}20`,
                        color: getPriorityColor(task.priority)
                      }}>
                            {task.priority}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full" style={{
                        backgroundColor: `${getStatusColor(task.status)}20`,
                        color: getStatusColor(task.status)
                      }}>
                            {task.status === 'completed' ? '已完成' : task.status === 'in_progress' ? '进行中' : '待开始'}
                          </span>
                        </td>
                      </tr>)}
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 里程碑列表 */}
        <Card>
          <CardHeader>
            <CardTitle>关键里程碑</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {milestones.map(milestone => <div key={milestone.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <Target className="w-5 h-5 text-purple-600" />
                        <h4 className="font-medium text-gray-900">{milestone.name}</h4>
                        <Badge variant={milestone.status === 'completed' ? 'default' : 'secondary'}>
                          {milestone.status === 'completed' ? '已完成' : '待完成'}
                        </Badge>
                      </div>
                      <p className="text-gray-700 text-sm mb-2">{milestone.description}</p>
                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                        <div>
                          <span>计划日期:</span>
                          <span className="ml-1 font-medium text-gray-900">{milestone.date}</span>
                        </div>
                        <div>
                          <span>风险等级:</span>
                          <span className={`ml-1 font-medium ${milestone.riskLevel === 'high' ? 'text-red-600' : milestone.riskLevel === 'medium' ? 'text-yellow-600' : 'text-green-600'}`}>
                            {milestone.riskLevel === 'high' ? '高' : milestone.riskLevel === 'medium' ? '中' : '低'}
                          </span>
                        </div>
                      </div>
                      <div className="mt-2">
                        <span className="text-sm text-gray-600">交付物:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {milestone.deliverables.map((deliverable, index) => <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                              {deliverable}
                            </span>)}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => handleMilestoneEdit(milestone.id)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>)}
            </div>
          </CardContent>
        </Card>

        {/* 任务详情弹窗 */}
        {selectedTask && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{selectedTask.name}</h3>
                  <Button variant="ghost" onClick={() => setSelectedTask(null)}>
                    ×
                  </Button>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm text-gray-600">项目:</span>
                      <span className="ml-2 font-medium">{selectedTask.project}</span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">负责人:</span>
                      <span className="ml-2 font-medium">{selectedTask.assignee}</span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">部门:</span>
                      <span className="ml-2 font-medium">{selectedTask.department}</span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">优先级:</span>
                      <span className="ml-2 font-medium" style={{
                    color: getPriorityColor(selectedTask.priority)
                  }}>
                        {selectedTask.priority}
                      </span>
                    </div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">进度:</span>
                    <div className="mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{
                      width: `${selectedTask.progress}%`
                    }}></div>
                      </div>
                      <span className="text-sm text-gray-600 mt-1">{selectedTask.progress}%</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm text-gray-600">开始时间:</span>
                      <span className="ml-2 font-medium">{selectedTask.start.toLocaleDateString()}</span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">结束时间:</span>
                      <span className="ml-2 font-medium">{selectedTask.end.toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>}
      </div>
    </div>;
}