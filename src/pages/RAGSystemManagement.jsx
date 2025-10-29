// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Tabs, TabsContent, TabsList, TabsTrigger, Button } from '@/components/ui';
// @ts-ignore;
import { Book, Database, Search, AlertTriangle, Activity, Settings } from 'lucide-react';

import { LiteratureLibrary } from '@/components/LiteratureLibrary';
import { KnowledgeBaseConfig } from '@/components/KnowledgeBaseConfig';
import { RetrievalTesting } from '@/components/RetrievalTesting';
import { HallucinationMonitoring } from '@/components/HallucinationMonitoring';
import { SystemPerformance } from '@/components/SystemPerformance';
export default function RAGSystemManagement(props) {
  const [activeTab, setActiveTab] = useState('literature');
  const handleTabChange = tabValue => {
    setActiveTab(tabValue);
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
                  管理文献库、知识库配置、检索测试、幻觉检测和系统性能监控
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
          <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="literature" className="flex items-center space-x-2">
                <Book className="w-4 h-4" />
                <span>文献库管理</span>
              </TabsTrigger>
              <TabsTrigger value="knowledge" className="flex items-center space-x-2">
                <Database className="w-4 h-4" />
                <span>知识库配置</span>
              </TabsTrigger>
              <TabsTrigger value="retrieval" className="flex items-center space-x-2">
                <Search className="w-4 h-4" />
                <span>检索测试</span>
              </TabsTrigger>
              <TabsTrigger value="hallucination" className="flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4" />
                <span>幻觉检测</span>
              </TabsTrigger>
              <TabsTrigger value="performance" className="flex items-center space-x-2">
                <Activity className="w-4 h-4" />
                <span>性能监控</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="literature">
              <LiteratureLibrary $w={props.$w} />
            </TabsContent>

            <TabsContent value="knowledge">
              <KnowledgeBaseConfig $w={props.$w} />
            </TabsContent>

            <TabsContent value="retrieval">
              <RetrievalTesting $w={props.$w} />
            </TabsContent>

            <TabsContent value="hallucination">
              <HallucinationMonitoring $w={props.$w} />
            </TabsContent>

            <TabsContent value="performance">
              <SystemPerformance $w={props.$w} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>;
}