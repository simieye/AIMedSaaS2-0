// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';

export function ImprovementSuggestions({
  className,
  style
}) {
  return <div className={className} style={style}>
      <Card>
        <CardHeader>
          <CardTitle>改进建议</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-1">增加训练数据</h4>
              <p className="text-sm text-blue-700">针对误诊率较高的疾病类型，增加相关训练数据</p>
            </div>
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <h4 className="font-medium text-green-900 mb-1">优化模型参数</h4>
              <p className="text-sm text-green-700">调整置信度阈值，平衡准确率和召回率</p>
            </div>
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h4 className="font-medium text-yellow-900 mb-1">集成多模态数据</h4>
              <p className="text-sm text-yellow-700">结合影像学数据，提高诊断准确性</p>
            </div>
            <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
              <h4 className="font-medium text-purple-900 mb-1">专家审核机制</h4>
              <p className="text-sm text-purple-700">建立专家审核流程，持续改进诊断质量</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>;
}