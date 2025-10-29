// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Tabs, TabsContent, TabsList, TabsTrigger, Button } from '@/components/ui';
// @ts-ignore;
import { Roadmap, Users, Target, BarChart3, Calendar, AlertTriangle, Plus } from 'lucide-react';

import { RoadmapTimeline } from '@/components/RoadmapTimeline';
import { FeatureProgress } from '@/components/FeatureProgress';
import { ResourceAllocation } from '@/components/ResourceAllocation';
import { RiskAssessment } from '@/components/RiskAssessment';
import { KPIDashboard } from '@/components/KPIDashboard';
export default function ARoundRoadmap(props) {
  const [activeTab, setActiveTab] = useState('timeline');
  const [selectedTimeRange, setSelectedTimeRange] = useState('6months');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const handleViewTaskDetails = taskId => {
    console.log('查看任务详情:', taskId);
  };
  const handleEditMilestone = milestoneId => {
    console.log('编辑里程碑:', milestoneId);
  };
  const handleAssignTask = (taskId, assigneeId) => {
    console.log('分配任务:', taskId, '给', assigneeId);
  };
  const handleUpdateProgress = (taskId, progress) => {
    console.log('更新任务进度:', taskId, '进度:', progress);
  };
  return <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <div className="space-y-6">
          {/* 页面标题 */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">A轮开发路线图</h1>
                <p className="text-gray-600 mt-2">
                  展示A轮BP中规划的功能开发时间线、里程碑进度、任务分配和完成状态
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm text-gray-500">当前用户</p>
                  <p className="font-semibold text-gray-900">
                    {props.$w.auth.currentUser?.name || '项目经理'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 功能标签页 */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="timeline" className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>时间轴</span>
              </TabsTrigger>
              <TabsTrigger value="features" className="flex items-center space-x-2">
                <Target className="w-4 h-4" />
                <span>功能进度</span>
              </TabsTrigger>
              <TabsTrigger value="resources" className="flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <span>资源分配</span>
              </TabsTrigger>
              <TabsTrigger value="risks" className="flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4" />
                <span>风险评估</span>
              </TabsTrigger>
              <TabsTrigger value="kpi" className="flex items-center space-x-2">
                <BarChart3 className="w-4 h-4" />
                <span>KPI仪表板</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="timeline">
              <RoadmapTimeline $w={props.$w} selectedTimeRange={selectedTimeRange} selectedDepartment={selectedDepartment} onViewTaskDetails={handleViewTaskDetails} onEditMilestone={handleEditMilestone} />
            </TabsContent>

            <TabsContent value="features">
              <FeatureProgress $w={props.$w} selectedDepartment={selectedDepartment} onUpdateProgress={handleUpdateProgress} />
            </TabsContent>

            <TabsContent value="resources">
              <ResourceAllocation $w={props.$w} onAssignTask={handleAssignTask} />
            </TabsContent>

            <TabsContent value="risks">
              <RiskAssessment $w={props.$w} />
            </TabsContent>

            <TabsContent value="kpi">
              <KPIDashboard $w={props.$w} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>;
}