// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Tabs, TabsContent, TabsList, TabsTrigger, Button } from '@/components/ui';
// @ts-ignore;
import { Building2, Target, TrendingUp, DollarSign, Layout, Plus } from 'lucide-react';

import { SponsorList } from '@/components/SponsorList';
import { SponsorshipProjects } from '@/components/SponsorshipProjects';
import { AnalyticsDashboard } from '@/components/AnalyticsDashboard';
import { FinancialManagement } from '@/components/FinancialManagement';
import { AdPositionManagement } from '@/components/AdPositionManagement';
export default function PharmaSponsorshipManagement(props) {
  const [activeTab, setActiveTab] = useState('sponsors');
  const handleViewSponsorDetails = sponsorId => {
    // 这里可以添加查看赞助商详情的逻辑
    console.log('查看赞助商详情:', sponsorId);
  };
  const handleEditSponsor = sponsorId => {
    // 这里可以添加编辑赞助商的逻辑
    console.log('编辑赞助商:', sponsorId);
  };
  const handleCreateSponsor = () => {
    // 这里可以添加创建赞助商的逻辑
    console.log('创建新赞助商');
  };
  const handleViewProjectDetails = projectId => {
    // 这里可以添加查看项目详情的逻辑
    console.log('查看项目详情:', projectId);
  };
  const handleEditProject = projectId => {
    // 这里可以添加编辑项目的逻辑
    console.log('编辑项目:', projectId);
  };
  const handleCreateProject = () => {
    // 这里可以添加创建项目的逻辑
    console.log('创建新项目');
  };
  return <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <div className="space-y-6">
          {/* 页面标题 */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">药企赞助管理</h1>
                <p className="text-gray-600 mt-2">
                  管理药企赞助商、赞助项目、效果分析、财务管理和广告位配置
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm text-gray-500">当前用户</p>
                  <p className="font-semibold text-gray-900">
                    {props.$w.auth.currentUser?.name || '管理员'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 功能标签页 */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="sponsors" className="flex items-center space-x-2">
                <Building2 className="w-4 h-4" />
                <span>赞助商管理</span>
              </TabsTrigger>
              <TabsTrigger value="projects" className="flex items-center space-x-2">
                <Target className="w-4 h-4" />
                <span>赞助项目</span>
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4" />
                <span>效果分析</span>
              </TabsTrigger>
              <TabsTrigger value="financial" className="flex items-center space-x-2">
                <DollarSign className="w-4 h-4" />
                <span>财务管理</span>
              </TabsTrigger>
              <TabsTrigger value="adpositions" className="flex items-center space-x-2">
                <Layout className="w-4 h-4" />
                <span>广告位管理</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="sponsors">
              <SponsorList $w={props.$w} onViewDetails={handleViewSponsorDetails} onEdit={handleEditSponsor} onCreate={handleCreateSponsor} />
            </TabsContent>

            <TabsContent value="projects">
              <SponsorshipProjects $w={props.$w} onViewDetails={handleViewProjectDetails} onEdit={handleEditProject} onCreate={handleCreateProject} />
            </TabsContent>

            <TabsContent value="analytics">
              <AnalyticsDashboard $w={props.$w} />
            </TabsContent>

            <TabsContent value="financial">
              <FinancialManagement $w={props.$w} />
            </TabsContent>

            <TabsContent value="adpositions">
              <AdPositionManagement $w={props.$w} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>;
}