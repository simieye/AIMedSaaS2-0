// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui';
// @ts-ignore;
import { Brain, Settings, BookOpen, BarChart3, Users, Activity, History } from 'lucide-react';

import { AIModelConfig } from '@/components/AIModelConfig';
import { MedicalKnowledgeIntegration } from '@/components/MedicalKnowledgeIntegration';
import { DiagnosisAccuracyAnalytics } from '@/components/DiagnosisAccuracyAnalytics';
import { MultiDepartmentSwitcher } from '@/components/MultiDepartmentSwitcher';
import { DiagnosisRecordManagement } from '@/components/DiagnosisRecordManagement';
export default function AIDiagnosisSystem(props) {
  const [activeTab, setActiveTab] = useState('models');
  return <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <div className="space-y-6">
          {/* 页面标题 */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">AI诊断辅助系统</h1>
                <p className="text-gray-600 mt-2">
                  专业的AI诊断辅助管理平台，提供模型配置、知识库集成、准确率分析和多科室管理功能
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
              <TabsTrigger value="models" className="flex items-center space-x-2">
                <Settings className="w-4 h-4" />
                <span>模型配置</span>
              </TabsTrigger>
              <TabsTrigger value="knowledge" className="flex items-center space-x-2">
                <BookOpen className="w-4 h-4" />
                <span>知识库集成</span>
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center space-x-2">
                <BarChart3 className="w-4 h-4" />
                <span>准确率分析</span>
              </TabsTrigger>
              <TabsTrigger value="departments" className="flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <span>多科室管理</span>
              </TabsTrigger>
              <TabsTrigger value="records" className="flex items-center space-x-2">
                <History className="w-4 h-4" />
                <span>诊断记录</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="models">
              <AIModelConfig $w={props.$w} />
            </TabsContent>

            <TabsContent value="knowledge">
              <MedicalKnowledgeIntegration $w={props.$w} />
            </TabsContent>

            <TabsContent value="analytics">
              <DiagnosisAccuracyAnalytics $w={props.$w} />
            </TabsContent>

            <TabsContent value="departments">
              <MultiDepartmentSwitcher $w={props.$w} />
            </TabsContent>

            <TabsContent value="records">
              <DiagnosisRecordManagement $w={props.$w} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>;
}