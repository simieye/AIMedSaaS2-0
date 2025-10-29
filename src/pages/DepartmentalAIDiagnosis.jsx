// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui';
// @ts-ignore;
import { Brain, History, BookOpen, Settings } from 'lucide-react';

import { AIDiagnosisWorkspace } from '@/components/AIDiagnosisWorkspace';
import { DiagnosisHistory } from '@/components/DiagnosisHistory';
import { MedicalKnowledgeBase } from '@/components/MedicalKnowledgeBase';
export default function DepartmentalAIDiagnosis(props) {
  const [activeTab, setActiveTab] = useState('workspace');
  return <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <div className="space-y-6">
          {/* 页面标题 */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">科室AI诊断辅助系统</h1>
                <p className="text-gray-600 mt-2">
                  基于人工智能的专科疾病诊断辅助平台，为医生提供精准的诊断建议和治疗方案
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm text-gray-500">当前用户</p>
                  <p className="font-semibold text-gray-900">
                    {props.$w.auth.currentUser?.name || '医生'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 功能标签页 */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="workspace" className="flex items-center space-x-2">
                <Brain className="w-4 h-4" />
                <span>诊断工作台</span>
              </TabsTrigger>
              <TabsTrigger value="history" className="flex items-center space-x-2">
                <History className="w-4 h-4" />
                <span>诊断历史</span>
              </TabsTrigger>
              <TabsTrigger value="knowledge" className="flex items-center space-x-2">
                <BookOpen className="w-4 h-4" />
                <span>知识库</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center space-x-2">
                <Settings className="w-4 h-4" />
                <span>设置</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="workspace">
              <AIDiagnosisWorkspace $w={props.$w} />
            </TabsContent>

            <TabsContent value="history">
              <DiagnosisHistory $w={props.$w} />
            </TabsContent>

            <TabsContent value="knowledge">
              <MedicalKnowledgeBase $w={props.$w} />
            </TabsContent>

            <TabsContent value="settings">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">系统设置</h2>
                <div className="space-y-6">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 mb-2">AI模型配置</h3>
                    <p className="text-gray-600 text-sm mb-4">
                      配置各科室专用的AI诊断模型和参数
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">置信度阈值</label>
                        <input type="range" min="0.5" max="1.0" step="0.05" defaultValue="0.8" className="w-full" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">自动分诊</label>
                        <select className="w-full p-2 border rounded-md">
                          <option>启用</option>
                          <option>禁用</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 mb-2">科室设置</h3>
                    <p className="text-gray-600 text-sm mb-4">
                      管理各科室的诊断标准和治疗协议
                    </p>
                    <div className="space-y-2">
                      {['心血管内科', '肿瘤科', '神经内科', '呼吸内科'].map(dept => <div key={dept} className="flex items-center justify-between p-2 border rounded">
                          <span className="text-gray-700">{dept}</span>
                          <button className="text-blue-600 hover:text-blue-800 text-sm">
                            配置
                          </button>
                        </div>)}
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 mb-2">数据管理</h3>
                    <p className="text-gray-600 text-sm mb-4">
                      管理诊断数据和模型训练数据集
                    </p>
                    <div className="flex space-x-4">
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                        导出数据
                      </button>
                      <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                        数据备份
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>;
}