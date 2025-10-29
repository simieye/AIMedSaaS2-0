// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Tabs, TabsContent, TabsList, TabsTrigger, Button } from '@/components/ui';
// @ts-ignore;
import { Database, Search, Activity, BarChart3, Brain, Network, Settings } from 'lucide-react';

import { DocumentLibrary } from '@/components/DocumentLibrary';
import { SearchConfiguration } from '@/components/SearchConfiguration';
import { SystemMonitoring } from '@/components/SystemMonitoring';
import { PerformanceStatistics } from '@/components/PerformanceStatistics';
import { KnowledgeGraph } from '@/components/KnowledgeGraph';
export default function RAGSystemManagement(props) {
  const [activeTab, setActiveTab] = useState('documents');
  const handleDocumentUpload = () => {
    // 这里可以添加文档上传的逻辑
    console.log('上传文档');
  };
  const handleConfigurationSave = () => {
    // 这里可以添加配置保存的逻辑
    console.log('保存配置');
  };
  const handleSystemRefresh = () => {
    // 这里可以添加系统刷新的逻辑
    console.log('刷新系统');
  };
  const handleReportExport = () => {
    // 这里可以添加报告导出的逻辑
    console.log('导出报告');
  };
  const handleGraphExport = () => {
    // 这里可以添加图谱导出的逻辑
    console.log('导出图谱');
  };
  return <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <div className="space-y-6">
          {/* 页面标题 */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">RAG系统管理</h1>
                <p className="text-gray-600 mt-2">
                  管理检索增强生成系统，包括文献库、检索配置、系统监控、性能统计和知识图谱
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
              <TabsTrigger value="documents" className="flex items-center space-x-2">
                <Database className="w-4 h-4" />
                <span>文献库</span>
              </TabsTrigger>
              <TabsTrigger value="search" className="flex items-center space-x-2">
                <Search className="w-4 h-4" />
                <span>检索配置</span>
              </TabsTrigger>
              <TabsTrigger value="monitoring" className="flex items-center space-x-2">
                <Activity className="w-4 h-4" />
                <span>系统监控</span>
              </TabsTrigger>
              <TabsTrigger value="statistics" className="flex items-center space-x-2">
                <BarChart3 className="w-4 h-4" />
                <span>性能统计</span>
              </TabsTrigger>
              <TabsTrigger value="knowledge" className="flex items-center space-x-2">
                <Network className="w-4 h-4" />
                <span>知识图谱</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="documents">
              <DocumentLibrary $w={props.$w} onUpload={handleDocumentUpload} />
            </TabsContent>

            <TabsContent value="search">
              <SearchConfiguration $w={props.$w} onSave={handleConfigurationSave} />
            </TabsContent>

            <TabsContent value="monitoring">
              <SystemMonitoring $w={props.$w} onRefresh={handleSystemRefresh} />
            </TabsContent>

            <TabsContent value="statistics">
              <PerformanceStatistics $w={props.$w} onExport={handleReportExport} />
            </TabsContent>

            <TabsContent value="knowledge">
              <KnowledgeGraph $w={props.$w} onExport={handleGraphExport} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>;
}