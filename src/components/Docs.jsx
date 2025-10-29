// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button } from '@/components/ui';
// @ts-ignore;
import { BookOpen, Download, ExternalLink } from 'lucide-react';

export function Docs({
  t
}) {
  // 防御式处理：确保 t 存在
  const safeT = t || (key => key);
  const documentation = [{
    title: safeT('gettingStarted') || '快速开始',
    description: safeT('gettingStartedDesc') || '了解如何快速集成我们的API',
    category: 'guide',
    url: '#'
  }, {
    title: safeT('apiReference') || 'API参考',
    description: safeT('apiReferenceDesc') || '完整的API文档和示例',
    category: 'reference',
    url: '#'
  }, {
    title: safeT('sdkDownload') || 'SDK下载',
    description: safeT('sdkDownloadDesc') || '下载各种语言的SDK',
    category: 'sdk',
    url: '#'
  }, {
    title: safeT('codeExamples') || '代码示例',
    description: safeT('codeExamplesDesc') || '实用的代码示例和最佳实践',
    category: 'examples',
    url: '#'
  }, {
    title: safeT('troubleshooting') || '故障排除',
    description: safeT('troubleshootingDesc') || '常见问题和解决方案',
    category: 'help',
    url: '#'
  }, {
    title: safeT('bestPractices') || '最佳实践',
    description: safeT('bestPracticesDesc') || 'API使用的最佳实践指南',
    category: 'guide',
    url: '#'
  }];
  return <div className="space-y-6">
      <h2 className="text-2xl font-bold">{safeT('docs')}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {documentation.map((doc, index) => <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg">{doc.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">{doc.description}</p>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline">
                  <BookOpen className="h-4 w-4 mr-2" />
                  {safeT('read') || '阅读'}
                </Button>
                <Button size="sm" variant="ghost">
                  <Download className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>)}
      </div>
    </div>;
}