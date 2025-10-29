// @ts-ignore;
import React, { useState, useRef } from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, useToast } from '@/components/ui';
// @ts-ignore;
import { Upload, FileText, X, CheckCircle, AlertCircle } from 'lucide-react';

export function DocumentUpload({
  $w,
  agreementId,
  onUploadComplete,
  className,
  style
}) {
  const {
    toast
  } = useToast();
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});
  const fileInputRef = useRef(null);
  const maxFileSize = 10 * 1024 * 1024; // 10MB
  const allowedTypes = ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx'];
  const handleDrag = e => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };
  const handleDrop = e => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };
  const handleFileInput = e => {
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };
  const validateFile = file => {
    // 检查文件大小
    if (file.size > maxFileSize) {
      toast({
        title: "文件过大",
        description: `${file.name} 超过10MB限制`,
        variant: "destructive"
      });
      return false;
    }
    // 检查文件类型
    const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
    if (!allowedTypes.includes(fileExtension)) {
      toast({
        title: "文件��型不支持",
        description: `${file.name} 不是支持的文件类型`,
        variant: "destructive"
      });
      return false;
    }
    return true;
  };
  const handleFiles = files => {
    const validFiles = Array.from(files).filter(validateFile);
    if (validFiles.length === 0) return;
    const newFiles = validFiles.map(file => ({
      id: Date.now() + Math.random(),
      file: file,
      name: file.name,
      size: file.size,
      type: file.type,
      status: 'pending'
    }));
    setUploadedFiles(prev => [...prev, ...newFiles]);
    // 自动开始上传
    uploadFiles(newFiles);
  };
  const uploadFiles = files => {
    setUploading(true);
    files.forEach(fileObj => {
      // 模拟上传进度
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          setUploadedFiles(prev => prev.map(f => f.id === fileObj.id ? {
            ...f,
            status: 'completed'
          } : f));
          setUploadProgress(prev => {
            const newProgress = {
              ...prev
            };
            delete newProgress[fileObj.id];
            return newProgress;
          });
        } else {
          setUploadProgress(prev => ({
            ...prev,
            [fileObj.id]: progress
          }));
        }
      }, 500);
    });
    // 模拟全部完成
    setTimeout(() => {
      setUploading(false);
      toast({
        title: "上传完成",
        description: `成功上传 ${files.length} 个文件`
      });
      if (onUploadComplete) {
        onUploadComplete(files.map(f => ({
          name: f.name,
          size: `${(f.size / 1024 / 1024).toFixed(2)}MB`,
          type: f.type,
          uploadDate: new Date().toISOString()
        })));
      }
    }, 3000);
  };
  const removeFile = fileId => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
    setUploadProgress(prev => {
      const newProgress = {
        ...prev
      };
      delete newProgress[fileId];
      return newProgress;
    });
  };
  const formatFileSize = bytes => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };
  const getFileIcon = fileName => {
    const extension = fileName.split('.').pop().toLowerCase();
    const iconMap = {
      'pdf': '📄',
      'doc': '📝',
      'docx': '📝',
      'xls': '📊',
      'xlsx': '📊',
      'ppt': '📈',
      'pptx': '📈'
    };
    return iconMap[extension] || '📄';
  };
  return <div className={className} style={style}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Upload className="w-5 h-5 mr-2" />
            文档上传
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* 拖拽上传区域 */}
          <div className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`} onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}>
            <div className="flex flex-col items-center">
              <Upload className="w-12 h-12 text-gray-400 mb-4" />
              <div className="text-gray-600 mb-2">拖拽文件到此处或点击上传</div>
              <div className="text-sm text-gray-500 mb-4">
                支持 PDF、DOC、DOCX、XLS、XLSX、PPT、PPTX 格式
              </div>
              <div className="text-sm text-gray-500 mb-4">
                单个文件不超过 10MB
              </div>
              <input ref={fileInputRef} type="file" multiple accept={allowedTypes.join(',')} onChange={handleFileInput} className="hidden" />
              <Button variant="outline" onClick={() => fileInputRef.current?.click()} disabled={uploading}>
                选择文件
              </Button>
            </div>
          </div>

          {/* 上传文件列表 */}
          {uploadedFiles.length > 0 && <div className="mt-6">
              <h4 className="font-medium text-gray-900 mb-4">上传文件列表</h4>
              <div className="space-y-3">
                {uploadedFiles.map(fileObj => {
              const progress = uploadProgress[fileObj.id] || 0;
              return <div key={fileObj.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">{getFileIcon(fileObj.name)}</div>
                        <div>
                          <div className="font-medium text-gray-900">{fileObj.name}</div>
                          <div className="text-sm text-gray-500">{formatFileSize(fileObj.size)}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {fileObj.status === 'completed' && <CheckCircle className="w-5 h-5 text-green-500" />}
                        {fileObj.status === 'error' && <AlertCircle className="w-5 h-5 text-red-500" />}
                        <Button variant="ghost" size="sm" onClick={() => removeFile(fileObj.id)} disabled={uploading}>
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    {fileObj.status === 'pending' && progress > 0 && <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full transition-all duration-300" style={{
                    width: `${progress}%`
                  }}></div>
                      </div>}
                    {fileObj.status === 'pending' && progress === 0 && <div className="text-sm text-gray-500">等待上传...</div>}
                    {fileObj.status === 'completed' && <div className="text-sm text-green-600">上传完成</div>}
                  </div>;
            })}
              </div>
            </div>}

          {/* 上传状态 */}
          {uploading && <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-blue-800">正在上传文件...</span>
              </div>
            </div>}
        </CardContent>
      </Card>
    </div>;
}