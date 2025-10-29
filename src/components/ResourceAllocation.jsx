// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Select, Badge, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, useToast, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui';
// @ts-ignore;
import { Users, UserPlus, AlertTriangle, Clock, Target, Edit, Eye, BarChart3, TrendingUp, TrendingDown } from 'lucide-react';

// @ts-ignore;
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
export function ResourceAllocation({
  $w,
  onAssignTask,
  className,
  style
}) {
  const {
    toast
  } = useToast();
  const [selectedTeam, setSelectedTeam] = useState('all');
  const [selectedView, setSelectedView] = useState('workload');
  const [teamMembers, setTeamMembers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [workloadData, setWorkloadData] = useState([]);
  const mockTeamMembers = [{
    id: 'member-1',
    name: '张三',
    role: '高级工程师',
    team: 'AI研发部',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
    skills: ['Python', '机器学习', '深度学习'],
    currentTasks: 3,
    maxTasks: 5,
    workload: 75,
    efficiency: 92,
    availability: 'available',
    completedTasks: 28,
    ongoingTasks: 3,
    pendingTasks: 2,
    hoursWorked: 160,
    estimatedHours: 180,
    performance: {
      quality: 4.5,
      speed: 4.2,
      collaboration: 4.8,
      innovation: 4.0
    }
  }, {
    id: 'member-2',
    name: '李四',
    role: '前端工程师',
    team: '前端部',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face',
    skills: ['React', 'TypeScript', 'UI/UX'],
    currentTasks: 4,
    maxTasks: 5,
    workload: 80,
    efficiency: 88,
    availability: 'busy',
    completedTasks: 22,
    ongoingTasks: 4,
    pendingTasks: 1,
    hoursWorked: 145,
    estimatedHours: 160,
    performance: {
      quality: 4.3,
      speed: 4.5,
      collaboration: 4.6,
      innovation: 4.2
    }
  }, {
    id: 'member-3',
    name: '王五',
    role: '后端工程师',
    team: '后端部',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face',
    skills: ['Java', 'Spring', '数据库'],
    currentTasks: 2,
    maxTasks: 5,
    workload: 40,
    efficiency: 95,
    availability: 'available',
    completedTasks: 31,
    ongoingTasks: 2,
    pendingTasks: 3,
    hoursWorked: 120,
    estimatedHours: 140,
    performance: {
      quality: 4.7,
      speed: 4.3,
      collaboration: 4.5,
      innovation: 3.8
    }
  }, {
    id: 'member-4',
    name: '赵六',
    role: '产品经理',
    team: '产品部',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face',
    skills: ['产品设计', '需求分析', '项目管理'],
    currentTasks: 5,
    maxTasks: 5,
    workload: 100,
    efficiency: 85,
    availability: 'overloaded',
    completedTasks: 18,
    ongoingTasks: 5,
    pendingTasks: 2,
    hoursWorked: 175,
    estimatedHours: 170,
    performance: {
      quality: 4.4,
      speed: 4.0,
      collaboration: 4.9,
      innovation: 4.6
    }
  }];
  const mockTeams = [{
    id: 'team-1',
    name: 'AI研发部',
    members: 8,
    currentWorkload: 75,
    avgEfficiency: 90,
    totalTasks: 25,
    completedTasks: 18,
    skills: ['Python', '机器学习', '深度学习', 'NLP'],
    utilization: 85
  }, {
    id: 'team-2',
    name: '前端部',
    members: 6,
    currentWorkload: 80,
    avgEfficiency: 88,
    totalTasks: 20,
    completedTasks: 14,
    skills: ['React', 'Vue', 'TypeScript', 'CSS'],
    utilization: 90
  }, {
    id: 'team-3',
    name: '后端部',
    members: 7,
    currentWorkload: 65,
    avgEfficiency: 92,
    totalTasks: 22,
    completedTasks: 16,
    skills: ['Java', 'Spring', '数据库', 'API'],
    utilization: 75
  }, {
    id: 'team-4',
    name: '产品部',
    members: 4,
    currentWorkload: 90,
    avgEfficiency: 85,
    totalTasks: 15,
    completedTasks: 10,
    skills: ['产品设计', '需求分析', '项目管理'],
    utilization: 95
  }];
  const mockWorkloadData = [{
    name: 'AI研发部',
    workload: 75,
    efficiency: 90,
    utilization: 85
  }, {
    name: '前端部',
    workload: 80,
    efficiency: 88,
    utilization: 90
  }, {
    name: '后端部',
    workload: 65,
    efficiency: 92,
    utilization: 75
  }, {
    name: '产品部',
    workload: 90,
    efficiency: 85,
    utilization: 95
  }];
  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];
  useEffect(() => {
    setTeamMembers(mockTeamMembers);
    setTeams(mockTeams);
    setWorkloadData(mockWorkloadData);
  }, []);
  const getAvailabilityBadge = availability => {
    const availabilityConfig = {
      available: {
        color: 'bg-green-100 text-green-800',
        text: '可用'
      },
      busy: {
        color: 'bg-yellow-100 text-yellow-800',
        text: '忙碌'
      },
      overloaded: {
        color: 'bg-red-100 text-red-800',
        text: '超载'
      }
    };
    const config = availabilityConfig[availability] || availabilityConfig.available;
    return <Badge className={config.color}>{config.text}</Badge>;
  };
  const getWorkloadColor = workload => {
    if (workload >= 90) return '#EF4444';
    if (workload >= 70) return '#F59E0B';
    return '#10B981';
  };
  const handleAssignTask = (memberId, taskId) => {
    if (onAssignTask) {
      onAssignTask(taskId, memberId);
    }
    toast({
      title: "任务分配",
      description: `任务已分配给团队成员`
    });
  };
  const handleViewDetails = memberId => {
    toast({
      title: "查看详情",
      description: `正在查看成员 ${memberId} 的详细信息`
    });
  };
  const handleEditMember = memberId => {
    toast({
      title: "编辑成员",
      description: `正在编辑成员 ${memberId}`
    });
  };
  const filteredMembers = teamMembers.filter(member => {
    const matchesTeam = selectedTeam === 'all' || member.team === selectedTeam;
    return matchesTeam;
  });
  const totalMembers = teamMembers.length;
  const availableMembers = teamMembers.filter(m => m.availability === 'available').length;
  const overloadedMembers = teamMembers.filter(m => m.availability === 'overloaded').length;
  const avgEfficiency = teamMembers.length > 0 ? teamMembers.reduce((sum, member) => sum + member.efficiency, 0) / teamMembers.length : 0;
  const radarData = teamMembers.map(member => ({
    subject: member.name,
    quality: member.performance.quality * 20,
    speed: member.performance.speed * 20,
    collaboration: member.performance.collaboration * 20,
    innovation: member.performance.innovation * 20,
    fullMark: 100
  }));
  return <div className={className} style={style}>
      <div className="space-y-6">
        {/* 头部控制 */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">资源分配</h2>
            <p className="text-gray-600">团队成员工作负载和任务分配管理</p>
          </div>
          <div className="flex items-center space-x-2">
            <Select value={selectedView} onValueChange={setSelectedView}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="workload">工作负载</SelectItem>
                <SelectItem value="performance">绩效分析</SelectItem>
                <SelectItem value="skills">技能分布</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedTeam} onValueChange={setSelectedTeam}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部团队</SelectItem>
                {teams.map(team => <SelectItem key={team.id} value={team.id}>
                    {team.name}
                  </SelectItem>)}
              </SelectContent>
            </Select>
            <Button variant="outline">
              <UserPlus className="w-4 h-4 mr-2" />
              添加成员
            </Button>
          </div>
        </div>

        {/* 团队统计 */}
        <div className="grid grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">总成员数</p>
                  <p className="text-2xl font-bold text-gray-900">{totalMembers}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">可用成员</p>
                  <p className="text-2xl font-bold text-gray-900">{availableMembers}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">超载成员</p>
                  <p className="text-2xl font-bold text-gray-900">{overloadedMembers}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <BarChart3 className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">平均效率</p>
                  <p className="text-2xl font-bold text-gray-900">{avgEfficiency.toFixed(0)}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 工作负载分析 */}
        {selectedView === 'workload' && <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>团队工作负载</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={workloadData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="workload" fill="#3B82F6" name="工作负载(%)" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="utilization" fill="#10B981" name="利用率(%)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>团队利用率</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie data={workloadData} cx="50%" cy="50%" labelLine={false} label={({
                  name,
                  utilization
                }) => `${name}: ${utilization}%`} outerRadius={80} fill="#8884d8" dataKey="utilization">
                      {workloadData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>}

        {/* 绩效分析 */}
        {selectedView === 'performance' && <Card>
            <CardHeader>
              <CardTitle>团队成员绩效雷达图</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} />
                  <Radar name="质量" dataKey="quality" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
                  <Radar name="速度" dataKey="speed" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
                  <Radar name="协作" dataKey="collaboration" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.6} />
                  <Radar name="创新" dataKey="innovation" stroke="#EF4444" fill="#EF4444" fillOpacity={0.6} />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>}

        {/* 成员列表 */}
        <Card>
          <CardHeader>
            <CardTitle>团队成员详情</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>成员</TableHead>
                  <TableHead>角色</TableHead>
                  <TableHead>团队</TableHead>
                  <TableHead>工作负载</TableHead>
                  <TableHead>效率</TableHead>
                  <TableHead>任务统计</TableHead>
                  <TableHead>可用性</TableHead>
                  <TableHead>操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMembers.map(member => <TableRow key={member.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <img src={member.avatar} alt={member.name} className="w-8 h-8 rounded-full" />
                        <div>
                          <div className="font-medium text-gray-900">{member.name}</div>
                          <div className="text-sm text-gray-500">{member.skills.join(', ')}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-gray-900">{member.role}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-gray-900">{member.team}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div className="h-2 rounded-full" style={{
                        width: `${member.workload}%`,
                        backgroundColor: getWorkloadColor(member.workload)
                      }}></div>
                        </div>
                        <span className="text-sm text-gray-900">{member.workload}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-gray-900">{member.efficiency}%</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-gray-900">
                        <div>完成: {member.completedTasks}</div>
                        <div>进行: {member.ongoingTasks}</div>
                        <div>待办: {member.pendingTasks}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getAvailabilityBadge(member.availability)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => handleViewDetails(member.id)}>
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleEditMember(member.id)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleAssignTask(member.id, 'new-task')}>
                          <UserPlus className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>)}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>;
}