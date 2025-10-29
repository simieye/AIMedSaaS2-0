// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Badge } from '@/components/ui';
// @ts-ignore;
import { AlertTriangle, Shield, TrendingDown, CheckCircle, AlertCircle } from 'lucide-react';

export function RiskAssessment({
  risks,
  className,
  style
}) {
  const getSeverityColor = severity => {
    const colorMap = {
      high: 'bg-red-100 text-red-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-green-100 text-green-800'
    };
    return colorMap[severity] || colorMap.medium;
  };
  const getSeverityIcon = severity => {
    const iconMap = {
      high: AlertTriangle,
      medium: AlertCircle,
      low: CheckCircle
    };
    return iconMap[severity] || iconMap.medium;
  };
  const getCategoryIcon = category => {
    const iconMap = {
      technical: Shield,
      market: TrendingDown,
      operational: AlertCircle,
      financial: AlertTriangle
    };
    return iconMap[category] || iconMap.technical;
  };
  const getMitigationStatus = status => {
    const statusMap = {
      mitigated: {
        color: 'bg-green-100 text-green-800',
        text: '已缓解'
      },
      in_progress: {
        color: 'bg-blue-100 text-blue-800',
        text: '进行中'
      },
      planned: {
        color: 'bg-gray-100 text-gray-800',
        text: '计划中'
      }
    };
    return statusMap[status] || statusMap.planned;
  };
  const riskMatrix = {
    high: {
      high: 3,
      medium: 2,
      low: 1
    },
    medium: {
      high: 2,
      medium: 1,
      low: 0
    },
    low: {
      high: 1,
      medium: 0,
      low: 0
    }
  };
  const getRiskScore = (probability, impact) => {
    return riskMatrix[probability]?.[impact] || 0;
  };
  const getRiskColor = score => {
    if (score >= 3) return 'bg-red-500';
    if (score >= 2) return 'bg-yellow-500';
    if (score >= 1) return 'bg-orange-500';
    return 'bg-green-500';
  };
  return <div className={className} style={style}>
      <div className="grid grid-cols-2 gap-6">
        {/* 风险矩阵 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2" />
              风险评估矩阵
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* 矩阵表头 */}
              <div className="grid grid-cols-4 gap-2 text-sm font-medium text-gray-700">
                <div></div>
                <div className="text-center">低影响</div>
                <div className="text-center">中影响</div>
                <div className="text-center">高影响</div>
              </div>
              
              {/* 矩阵行 */}
              {['high', 'medium', 'low'].map(probability => <div key={probability} className="grid grid-cols-4 gap-2">
                  <div className="text-sm font-medium text-gray-700 capitalize">
                    {probability === 'high' ? '高概率' : probability === 'medium' ? '中概率' : '低概率'}
                  </div>
                  {['low', 'medium', 'high'].map(impact => {
                const score = getRiskScore(probability, impact);
                const risksInCell = risks?.filter(risk => risk.probability === probability && risk.impact === impact) || [];
                return <div key={impact} className={`p-2 rounded border-2 border-dashed min-h-[60px] ${getRiskColor(score)}`}>
                      {risksInCell.map(risk => <div key={risk.id} className="text-xs text-white font-medium mb-1">
                          {risk.title}
                        </div>)}
                    </div>;
              })}
                </div>)}
            </div>
            
            {/* 图例 */}
            <div className="flex items-center space-x-4 mt-4 text-sm">
              <div className="flex items-center space-x-1">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span>低风险</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-4 h-4 bg-orange-500 rounded"></div>
                <span>中风险</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                <span>高风险</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-4 h-4 bg-red-500 rounded"></div>
                <span>极高风险</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 风险列表 */}
        <Card>
          <CardHeader>
            <CardTitle>风险详情</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {risks?.map(risk => {
              const SeverityIcon = getSeverityIcon(risk.severity);
              const CategoryIcon = getCategoryIcon(risk.category);
              const mitigationStatus = getMitigationStatus(risk.mitigationStatus);
              return <div key={risk.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <CategoryIcon className="w-5 h-5 text-gray-400" />
                      <div>
                        <h4 className="font-medium text-gray-900">{risk.title}</h4>
                        <p className="text-sm text-gray-600">{risk.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <SeverityIcon className={`w-4 h-4 ${risk.severity === 'high' ? 'text-red-500' : risk.severity === 'medium' ? 'text-yellow-500' : 'text-green-500'}`} />
                      <Badge className={getSeverityColor(risk.severity)}>
                        {risk.severity.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">概率:</span>
                      <span className="ml-1 font-medium capitalize">{risk.probability}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">影响:</span>
                      <span className="ml-1 font-medium capitalize">{risk.impact}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">缓解状态:</span>
                      <Badge className={`ml-1 ${mitigationStatus.color}`}>
                        {mitigationStatus.text}
                      </Badge>
                    </div>
                    <div>
                      <span className="text-gray-600">负责人:</span>
                      <span className="ml-1 font-medium">{risk.owner}</span>
                    </div>
                  </div>
                  
                  {risk.mitigation && <div className="mt-3 p-2 bg-gray-50 rounded text-sm">
                      <div className="font-medium text-gray-700 mb-1">缓解措施:</div>
                      <div className="text-gray-600">{risk.mitigation}</div>
                    </div>}
                </div>;
            })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>;
}