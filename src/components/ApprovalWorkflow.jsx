// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Badge, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, useToast, Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui';
// @ts-ignore;
import { CheckCircle, Clock, AlertTriangle, User, Calendar, MessageSquare, Eye, Edit, Send, RefreshCw, FileText, Stamp, Users, TrendingUp, Activity } from 'lucide-react';

export function ApprovalWorkflow({
  approvals,
  agreements
}) {
  const {
    toast
  } = useToast();
  const [selectedApproval, setSelectedApproval] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const getStatusBadge = status => {
    const statusConfig = {
      completed: {
        color: 'bg-green-100 text-green-800',
        icon: CheckCircle,
        text: '已完成'
      },
      in_progress: {
        color: 'bg-blue-100 text-blue-800',
        icon: Clock,
        text: '进行中'
      },
      pending: {
        color: 'bg-yellow-100 text-yellow-800',
        icon: AlertTriangle,
        text: '待处理'
      },
      rejected: {
        color: 'bg-red-100 text-red-800',
        icon: AlertTriangle,
        text: '已拒绝'
      }
    };
    const config = statusConfig[status] || statusConfig.pending;
    const Icon = config.icon;
    return <Badge className={config.color}>
      <Icon className="w-3 h-3 mr-1" />
      {config.text}
    </Badge>;
  };
  const getStepStatusBadge = status => {
    const statusConfig = {
      completed: {
        color: 'bg-green-100 text-green-800',
        text: '已完成'
      },
      in_progress: {
        color: 'bg-blue-100 text-blue-800',
        text: '进行中'
      },
      pending: {
        color: 'bg-yellow-100 text-yellow-800',
        text: '待处理'
      },
      rejected: {
        color: 'bg-red-100 text-red-800',
        text: '已拒绝'
      }
    };
    const config = statusConfig[status] || statusConfig.pending;
    return <Badge className={config.color}>{config.text}</Badge>;
  };
  const handleViewApproval = approval => {
    setSelectedApproval(approval);
    toast({
      title: "查看审批详情",
      description: `正在查看审批流程 ${approval.id}`
    });
  };
  const handleApproveStep = (approvalId, step) => {
    toast({
      title: "审批通过",
      description: `步骤 ${step} 已审批通过`
    });
  };
  const handleRejectStep = (approvalId, step) => {
    toast({
      title: "审批拒绝",
      description: `步骤 ${step} 已被拒绝`
    });
  };
  const filteredApprovals = approvals.filter(approval => {
    return filterStatus === 'all' || approval.status === filterStatus;
  });
  const completedApprovals = approvals.filter(a => a.status === 'completed').length;
  const inProgressApprovals = approvals.filter(a => a.status === 'in_progress').length;
  const pendingApprovals = approvals.filter(a => a.status === 'pending').length;
  return <div className="space-y-6">
      {/* 统计卡片 */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">总审批数</p>
                <p className="text-2xl font-bold text-gray-900">{approvals.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">已完成</p>
                <p className="text-2xl font-bold text-gray-900">{completedApprovals}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">进行中</p>
                <p className="text-2xl font-bold text-gray-900">{inProgressApprovals}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">待处理</p>
                <p className="text-2xl font-bold text-gray-900">{pendingApprovals}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 筛选器 */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部状态</SelectItem>
                <SelectItem value="completed">已完成</SelectItem>
                <SelectItem value="in_progress">进行中</SelectItem>
                <SelectItem value="pending">待处理</SelectItem>
                <SelectItem value="rejected">已拒绝</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              刷新
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 审批流程列表 */}
      <div className="grid grid-cols-1 gap-6">
        {filteredApprovals.map(approval => <Card key={approval.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{approval.agreementTitle}</CardTitle>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                    <span>审批ID: {approval.id}</span>
                    <span>发起人: {approval.initiator}</span>
                    <span>发起时间: {approval.initiatedDate}</span>
                    <span>预计完成: {approval.estimatedCompletion}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusBadge(approval.status)}
                  <Button variant="outline" size="sm" onClick={() => handleViewApproval(approval)}>
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* 审批流程步骤 */}
                <div className="relative">
                  <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-gray-300"></div>
                  {approval.workflow.map((step, index) => <div key={step.step} className="relative flex items-start space-x-4 pb-6">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step.status === 'completed' ? 'bg-green-500' : step.status === 'in_progress' ? 'bg-blue-500' : step.status === 'rejected' ? 'bg-red-500' : 'bg-gray-300'}`}>
                        {step.status === 'completed' ? <CheckCircle className="w-4 h-4 text-white" /> : step.status === 'in_progress' ? <Clock className="w-4 h-4 text-white" /> : step.status === 'rejected' ? <AlertTriangle className="w-4 h-4 text-white" /> : <div className="w-2 h-2 bg-white rounded-full"></div>}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-gray-900">{step.name}</h4>
                            <p className="text-sm text-gray-500">负责人: {step.assignee}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            {getStepStatusBadge(step.status)}
                            {step.completedDate && <span className="text-sm text-gray-500">{step.completedDate}</span>}
                          </div>
                        </div>
                        {step.comments && <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-700">{step.comments}</p>
                          </div>}
                        {step.status === 'in_progress' && <div className="mt-3 flex items-center space-x-2">
                            <Button size="sm" onClick={() => handleApproveStep(approval.id, step.step)}>
                              <CheckCircle className="w-4 h-4 mr-1" />
                              通过
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => handleRejectStep(approval.id, step.step)}>
                              <AlertTriangle className="w-4 h-4 mr-1" />
                              拒绝
                            </Button>
                            <Button size="sm" variant="outline">
                              <MessageSquare className="w-4 h-4 mr-1" />
                              评论
                            </Button>
                          </div>}
                      </div>
                    </div>)}
                </div>
              </div>
            </CardContent>
          </Card>)}
      </div>
    </div>;
}