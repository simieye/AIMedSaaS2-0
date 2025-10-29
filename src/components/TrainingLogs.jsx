// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, Button, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Input, Badge, useToast } from '@/components/ui';
// @ts-ignore;
import { Terminal, Download, Filter, Search, AlertCircle, CheckCircle, Info, X, RefreshCw } from 'lucide-react';

export function TrainingLogs({
  isOpen,
  onClose,
  experiment
}) {
  const [logs, setLogs] = useState([]);
  const [logLevel, setLogLevel] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isAutoScroll, setIsAutoScroll] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const logsEndRef = React.useRef(null);
  const {
    toast
  } = useToast();
  useEffect(() => {
    if (isOpen && experiment) {
      loadLogs();
    }
  }, [isOpen, experiment]);
  useEffect(() => {
    if (isAutoScroll) {
      logsEndRef.current?.scrollIntoView({
        behavior: 'smooth'
      });
    }
  }, [logs, isAutoScroll]);
  const loadLogs = async () => {
    setIsLoading(true);
    try {
      // 模拟加载日志
      const mockLogs = [{
        timestamp: new Date(Date.now() - 10000).toISOString(),
        level: 'info',
        message: '开始训练实验',
        details: '初始化模型和数据加载器'
      }, {
        timestamp: new Date(Date.now() - 8000).toISOString(),
        level: 'info',
        message: 'Epoch 1/10 开始',
        details: '学习率: 0.001, 批次大小: 32'
      }, {
        timestamp: new Date(Date.now() - 6000).toISOString(),
        level: 'debug',
        message: 'Batch 1/100',
        details: 'Loss: 2.3456, Accuracy: 0.2345'
      }, {
        timestamp: new Date(Date.now() - 4000).toISOString(),
        level: 'warning',
        message: '梯度裁剪触发',
        details: '梯度范数超过阈值，已进行裁剪'
      }, {
        timestamp: new Date(Date.now() - 2000).toISOString(),
        level: 'info',
        message: 'Epoch 1/10 完成',
        details: '平均损失: 1.8234, 平均准确率: 0.4567'
      }, {
        timestamp: new Date().toISOString(),
        level: 'error',
        message: 'CUDA内存不足',
        details: '尝试减少批次大小或使用梯度累积'
      }];
      setLogs(mockLogs);
    } catch (error) {
      toast({
        title: "加载日志失败",
        description: error.message || "无法获取训练日志",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  const getLogLevelIcon = level => {
    const icons = {
      error: <AlertCircle className="h-3 w-3 text-red-500" />,
      warning: <AlertCircle className="h-3 w-3 text-yellow-500" />,
      info: <Info className="h-3 w-3 text-blue-500" />,
      debug: <Terminal className="h-3 w-3 text-gray-500" />
    };
    return icons[level] || icons.info;
  };
  const getLogLevelColor = level => {
    const colors = {
      error: 'text-red-600 bg-red-50',
      warning: 'text-yellow-600 bg-yellow-50',
      info: 'text-blue-600 bg-blue-50',
      debug: 'text-gray-600 bg-gray-50'
    };
    return colors[level] || colors.info;
  };
  const filteredLogs = logs.filter(log => {
    const matchesLevel = logLevel === 'all' || log.level === logLevel;
    const matchesSearch = searchTerm === '' || log.message.toLowerCase().includes(searchTerm.toLowerCase()) || log.details.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesLevel && matchesSearch;
  });
  const exportLogs = () => {
    const logText = filteredLogs.map(log => `[${log.timestamp}] [${log.level.toUpperCase()}] ${log.message} - ${log.details}`).join('\n');
    const blob = new Blob([logText], {
      type: 'text/plain'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${experiment?.name || 'experiment'}_logs.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast({
      title: "日志已导出",
      description: "训练日志已下载到本地",
      variant: "default"
    });
  };
  return <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle>训练日志</DialogTitle>
              <DialogDescription>
                {experiment?.name || '实验'} 的实时训练日志
              </DialogDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* 控制栏 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Select value={logLevel} onValueChange={setLogLevel}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部级别</SelectItem>
                  <SelectItem value="error">错误</SelectItem>
                  <SelectItem value="warning">警告</SelectItem>
                  <SelectItem value="info">信息</SelectItem>
                  <SelectItem value="debug">调试</SelectItem>
                </SelectContent>
              </Select>
              
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input placeholder="搜索日志..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10 w-64" />
              </div>
              
              <Button variant="outline" size="sm" onClick={() => setIsAutoScroll(!isAutoScroll)}>
                {isAutoScroll ? '自动滚动: 开' : '自动滚动: 关'}
              </Button>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={loadLogs} disabled={isLoading}>
                <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                刷新
              </Button>
              <Button variant="outline" size="sm" onClick={exportLogs}>
                <Download className="h-4 w-4 mr-2" />
                导出
              </Button>
            </div>
          </div>
          
          {/* 日志内容 */}
          <div className="bg-black text-green-400 font-mono text-sm p-4 rounded-lg overflow-hidden">
            <div className="h-96 overflow-y-auto">
              {isLoading ? <div className="flex justify-center items-center h-full">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-400"></div>
                </div> : filteredLogs.length === 0 ? <div className="text-center text-gray-500 py-8">
                  <Terminal className="h-8 w-8 mx-auto mb-2" />
                  <p>暂无日志记录</p>
                </div> : <div className="space-y-1">
                  {filteredLogs.map((log, index) => <div key={index} className={`p-2 rounded ${getLogLevelColor(log.level)}`}>
                      <div className="flex items-start space-x-2">
                        {getLogLevelIcon(log.level)}
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-gray-500">
                              {new Date(log.timestamp).toLocaleTimeString()}
                            </span>
                            <Badge variant="outline" className="text-xs">
                              {log.level.toUpperCase()}
                            </Badge>
                          </div>
                          <div className="text-white mt-1">{log.message}</div>
                          {log.details && <div className="text-gray-400 text-xs mt-1">{log.details}</div>}
                        </div>
                      </div>
                    </div>)}
                  <div ref={logsEndRef} />
                </div>}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>;
}