// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Tabs, TabsContent, TabsList, TabsTrigger, Button } from '@/components/ui';
// @ts-ignore;
import { FileText, Plus, List, Upload, Eye } from 'lucide-react';

import { AgreementList } from '@/components/AgreementList';
import { AgreementDetails } from '@/components/AgreementDetails';
import { AgreementForm } from '@/components/AgreementForm';
import { AgreementDocuments } from '@/components/AgreementDocuments';
import { DocumentUpload } from '@/components/DocumentUpload';
import { DocumentPreview } from '@/components/DocumentPreview';
export default function AgreementManagement(props) {
  const [activeTab, setActiveTab] = useState('list');
  const [selectedAgreementId, setSelectedAgreementId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showDocumentUpload, setShowDocumentUpload] = useState(false);
  const [showDocumentPreview, setShowDocumentPreview] = useState(false);
  const [selectedDocumentId, setSelectedDocumentId] = useState(null);
  const handleViewAgreement = agreementId => {
    setSelectedAgreementId(agreementId);
    setActiveTab('details');
  };
  const handleEditAgreement = agreementId => {
    setSelectedAgreementId(agreementId);
    setShowForm(true);
  };
  const handleCreateAgreement = () => {
    setSelectedAgreementId(null);
    setShowForm(true);
  };
  const handleFormSave = formData => {
    setShowForm(false);
    setActiveTab('list');
    // 这里可以添加保存逻辑
  };
  const handleFormCancel = () => {
    setShowForm(false);
  };
  const handleViewDocuments = agreementId => {
    setSelectedAgreementId(agreementId);
    setActiveTab('documents');
  };
  const handleUploadDocument = () => {
    setShowDocumentUpload(true);
  };
  const handleDocumentUploadComplete = files => {
    setShowDocumentUpload(false);
    // 这里可以添加上传完成后的逻辑
  };
  const handleViewDocument = documentId => {
    setSelectedDocumentId(documentId);
    setShowDocumentPreview(true);
  };
  return <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <div className="space-y-6">
          {/* 页面标题 */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">合作协议管理</h1>
                <p className="text-gray-600 mt-2">
                  管理医院合作协议，包括协议创建、文档管理、状态监控等功能
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
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="list" className="flex items-center space-x-2">
                <List className="w-4 h-4" />
                <span>协议列表</span>
              </TabsTrigger>
              <TabsTrigger value="details" className="flex items-center space-x-2">
                <Eye className="w-4 h-4" />
                <span>协议详情</span>
              </TabsTrigger>
              <TabsTrigger value="documents" className="flex items-center space-x-2">
                <FileText className="w-4 h-4" />
                <span>文档管理</span>
              </TabsTrigger>
              <TabsTrigger value="upload" className="flex items-center space-x-2">
                <Upload className="w-4 h-4" />
                <span>文档上传</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="list">
              <AgreementList $w={props.$w} onViewAgreement={handleViewAgreement} onEditAgreement={handleEditAgreement} onCreateAgreement={handleCreateAgreement} onViewDocuments={handleViewDocuments} />
            </TabsContent>

            <TabsContent value="details">
              {selectedAgreementId ? <AgreementDetails $w={props.$w} agreementId={selectedAgreementId} /> : <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                  <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">请选择协议</h3>
                  <p className="text-gray-600">请先从协议列表中选择一个协议查看详情</p>
                  <Button className="mt-4" onClick={() => setActiveTab('list')}>
                    返回协议列表
                  </Button>
                </div>}
            </TabsContent>

            <TabsContent value="documents">
              {selectedAgreementId ? <AgreementDocuments $w={props.$w} agreementId={selectedAgreementId} onViewDocument={handleViewDocument} onUploadDocument={handleUploadDocument} /> : <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                  <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">请选择协议</h3>
                  <p className="text-gray-600">请先从协议列表中选择一个协议管理文档</p>
                  <Button className="mt-4" onClick={() => setActiveTab('list')}>
                    返回协议列表
                  </Button>
                </div>}
            </TabsContent>

            <TabsContent value="upload">
              {selectedAgreementId ? <DocumentUpload $w={props.$w} agreementId={selectedAgreementId} onUploadComplete={handleDocumentUploadComplete} /> : <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                  <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">请选择协议</h3>
                  <p className="text-gray-600">请先从协议列表中选择一个协议上传文档</p>
                  <Button className="mt-4" onClick={() => setActiveTab('list')}>
                    返回协议列表
                  </Button>
                </div>}
            </TabsContent>
          </Tabs>
        </div>

        {/* 协议表单弹窗 */}
        {showForm && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-y-auto">
              <AgreementForm $w={props.$w} agreementId={selectedAgreementId} onSave={handleFormSave} onCancel={handleFormCancel} />
            </div>
          </div>}

        {/* 文档预览弹窗 */}
        {showDocumentPreview && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-y-auto">
              <DocumentPreview $w={props.$w} documentId={selectedDocumentId} onClose={() => setShowDocumentPreview(false)} />
            </div>
          </div>}
      </div>
    </div>;
}