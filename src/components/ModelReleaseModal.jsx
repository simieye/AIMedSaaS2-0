// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, Button, Input, Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Textarea, Badge, useToast, Alert, AlertDescription, Card, CardContent } from '@/components/ui';
// @ts-ignore;
import { Rocket, CheckCircle, AlertTriangle, Package, GitBranch, Calendar, User, Zap, Shield, Globe } from 'lucide-react';

export function ModelReleaseModal({
  isOpen,
  onClose,
  experiment
}) {
  const [releaseData, setReleaseData] = useState({
    version: '1.0.0',
    release_notes: '',
    deployment_target: 'staging',
    auto_rollback: true,
    health_check_enabled: true,
    canary_deployment: false,
    canary_percentage: 10
  });
  const [isReleasing, setIsReleasing] = useState(false);
  const [releaseStep, setReleaseStep] = useState(0);
  const {
    toast
  } = useToast();
  const releaseSteps = [{
    title: '验证模型',
    description: '检查模型文件和配置'
  }, {
    title: '构建镜像',
    description: '创建Docker镜像'
  }, {
    title: '部署测试',
    description: '部署到测试环境'
  }, {
    title: '健康检查',
    description: '验证服务健康状态'
  }, {
    title: '流量切换',
    description: '切换生产流量'
  }, {
    title: '发布完成',
    description: '模型已成功发布'
  }];
  const handleRelease = async () => {
    if (!experiment) {
      toast({
        title: "错误",
        description: "未选择实验",
        variant: "destructive"
      });
      return;
    }
    setIsReleasing(true);
    setReleaseStep(0);
    try {
      // 模拟发布流程
      for (let i = 0; i < releaseSteps.length; i++) {
        setReleaseStep(i);
        await new Promise(resolve => setTimeout(resolve, 1500));
      }
      toast({
        title: "发布成功",
        description: `模型 ${experiment.name} v${releaseData.version} 已成功发布`,
        variant: "default"
      });
      onClose();
    } catch (error) {
      toast({
        title: "发布失败",
        description: error.message || "模型发布过程中出现错误",
        variant: "destructive"
      });
    } finally {
      setIsReleasing(false);
      setReleaseStep(0);
    }
  };
  const getDeploymentTargetInfo = target => {
    const targets = {
      staging: {
        name: '测试环境',
        description: '用于内部测试和验证',
        color: 'bg-blue-100 text-blue-800'
      },
      production: {
        name: '生产环境',
        description: '面向用户的正式环境',
        color: 'bg-green-100 text-green-800'
      },
      canary: {
        name: '金丝雀环境',
        description: '小流量验证新版本',
        color: 'bg-yellow-100 text-yellow-800'
      }
    };
    return targets[target] || targets.staging;
  };
  return <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>发布模型</DialogTitle>
          <DialogDescription>
            将实验模型发布到生产环境
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* 实验信息 */}
          {experiment && <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">{experiment.name}</h3>
                    <p className="text-sm text-muted-foreground">{experiment.description}</p>
                  </div>
                  <Badge variant="outline">{experiment.status}</Badge>
                </div>
              </CardContent>
            </Card>}
          
          {/* 发布配置 */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>版本号</Label>
                <Input value={releaseData.version} onChange={e => setReleaseData(prev => ({
                ...prev,
                version: e.target.value
              }))} placeholder="1.0.0" />
              </div>
              <div>
                <Label>部署目标</Label>
                <Select value={releaseData.deployment_target} onValueChange={value => setReleaseData(prev => ({
                ...prev,
                deployment_target: value
              }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="staging">测试环境</SelectItem>
                    <SelectItem value="production">生产环境</SelectItem>
                    <SelectItem value="canary">金丝雀发布</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <Label>发布说明</Label>
              <Textarea value={releaseData.release_notes} onChange={e => setReleaseData(prev => ({
              ...prev,
              release_notes: e.target.value
            }))} placeholder="描述本次发布的主要变更和改进..." rows={3} />
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="auto_rollback" checked={releaseData.auto_rollback} onChange={e => setReleaseData(prev => ({
                ...prev,
                auto_rollback: e.target.checked
              }))} />
                <Label htmlFor="auto_rollback" className="flex items-center">
                  <Shield className="h-4 w-4 mr-2" />
                  启用自动回滚
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="health_check" checked={releaseData.health_check_enabled} onChange={e => setReleaseData(prev => ({
                ...prev,
                health_check_enabled: e.target.checked
              }))} />
                <Label htmlFor="health_check" className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  启用健康检查
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="canary" checked={releaseData.canary_deployment} onChange={e => setReleaseData(prev => ({
                ...prev,
                canary_deployment: e.target.checked
              }))} />
                <Label htmlFor="canary" className="flex items-center">
                  <GitBranch className="h-4 w-4 mr-2" />
                  金丝雀发布
                </Label>
              </div>
            </div>
            
            {releaseData.canary_deployment && <div>
                <Label>金丝雀流量比例 (%)</Label>
                <Input type="number" min="1" max="50" value={releaseData.canary_percentage} onChange={e => setReleaseData(prev => ({
              ...prev,
              canary_percentage: parseInt(e.target.value)
            }))} />
              </div>}
          </div>
          
          {/* 部署目标信息 */}
          <Alert>
            <Globe className="h-4 w-4" />
            <AlertDescription>
              <div className="flex items-center justify-between">
                <span>
                  部署到: <strong>{getDeploymentTargetInfo(releaseData.deployment_target).name}</strong>
                </span>
                <Badge className={getDeploymentTargetInfo(releaseData.deployment_target).color}>
                  {getDeploymentTargetInfo(releaseData.deployment_target).description}
                </Badge>
              </div>
            </AlertDescription>
          </Alert>
          
          {/* 发布进度 */}
          {isReleasing && <div className="space-y-3">
              <h4 className="font-medium">发布进度</h4>
              {releaseSteps.map((step, index) => <div key={index} className="flex items-center space-x-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${index < releaseStep ? 'bg-green-500 text-white' : index === releaseStep ? 'bg-blue-500 text-white animate-pulse' : 'bg-gray-200 text-gray-500'}`}>
                    {index < releaseStep ? <CheckCircle className="h-3 w-3" /> : index + 1}
                  </div>
                  <div className="flex-1">
                    <div className={`font-medium ${index <= releaseStep ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {step.title}
                    </div>
                    <div className="text-sm text-muted-foreground">{step.description}</div>
                  </div>
                </div>)}
            </div>}
          
          {/* 操作按钮 */}
          <div className="flex space-x-2">
            <Button variant="outline" onClick={onClose} disabled={isReleasing}>
              取消
            </Button>
            <Button onClick={handleRelease} disabled={isReleasing} className="flex-1">
              {isReleasing ? <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  发布中...
                </> : <>
                  <Rocket className="h-4 w-4 mr-2" />
                  发布模型
                </>}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>;
}