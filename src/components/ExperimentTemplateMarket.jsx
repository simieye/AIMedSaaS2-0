// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, Button, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, useToast } from '@/components/ui';
// @ts-ignore;
import { Search, Filter, X } from 'lucide-react';

import { TemplateGrid } from './TemplateGrid';
import { TemplatePreview } from './TemplatePreview';
import { TemplateFilters } from './TemplateFilters';
export function ExperimentTemplateMarket({
  isOpen,
  onClose,
  onUseTemplate
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterSort, setFilterSort] = useState('popular');
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const {
    toast
  } = useToast();
  const templates = [{
    id: 'medical_qa_bert',
    name: '医疗问答 BERT',
    description: '基于BERT的医疗问答模型，支持多种医疗场景',
    category: 'nlp',
    author: 'AI Research Team',
    downloads: 1250,
    rating: 4.8,
    tags: ['bert', 'medical', 'qa', 'chinese'],
    difficulty: 'intermediate',
    estimated_time: '2-3 hours',
    requirements: {
      gpu: true,
      memory: '8GB',
      dataset: 'medical_qa'
    },
    config: {
      model_type: 'bert',
      dataset: 'medical_qa',
      hyperparameters: {
        learning_rate: 2e-5,
        batch_size: 16,
        epochs: 3,
        optimizer: 'adamw'
      }
    }
  }, {
    id: 'symptom_classifier',
    name: '症状分类器',
    description: '基于患者症状进行疾病分类的深度学习模型',
    category: 'classification',
    author: 'Medical AI Lab',
    downloads: 890,
    rating: 4.6,
    tags: ['classification', 'symptoms', 'disease', 'mlp'],
    difficulty: 'beginner',
    estimated_time: '1-2 hours',
    requirements: {
      gpu: false,
      memory: '4GB',
      dataset: 'symptoms_diagnosis'
    },
    config: {
      model_type: 'mlp',
      dataset: 'symptoms_diagnosis',
      hyperparameters: {
        learning_rate: 0.001,
        batch_size: 32,
        epochs: 10,
        optimizer: 'adam'
      }
    }
  }, {
    id: 'drug_interaction_lstm',
    name: '药物相互作用 LSTM',
    description: '使用LSTM预测药物间的相互作用关系',
    category: 'sequence',
    author: 'PharmaTech',
    downloads: 567,
    rating: 4.5,
    tags: ['lstm', 'drug', 'interaction', 'sequence'],
    difficulty: 'advanced',
    estimated_time: '4-6 hours',
    requirements: {
      gpu: true,
      memory: '16GB',
      dataset: 'drug_interactions'
    },
    config: {
      model_type: 'lstm',
      dataset: 'drug_interactions',
      hyperparameters: {
        learning_rate: 0.01,
        batch_size: 64,
        epochs: 20,
        optimizer: 'adam'
      }
    }
  }, {
    id: 'patient_risk_cnn',
    name: '患者风险评估 CNN',
    description: '基于患者历史数据进行健康风险评估',
    category: 'risk_assessment',
    author: 'Healthcare AI',
    downloads: 432,
    rating: 4.3,
    tags: ['cnn', 'risk', 'assessment', 'health'],
    difficulty: 'intermediate',
    estimated_time: '3-4 hours',
    requirements: {
      gpu: true,
      memory: '8GB',
      dataset: 'patient_records'
    },
    config: {
      model_type: 'cnn',
      dataset: 'patient_records',
      hyperparameters: {
        learning_rate: 0.001,
        batch_size: 32,
        epochs: 15,
        optimizer: 'adam'
      }
    }
  }];
  const handleUseTemplate = template => {
    onUseTemplate?.(template.config);
    toast({
      title: "模板已应用",
      description: `已应用模板 "${template.name}" 的配置`,
      variant: "default"
    });
    onClose();
  };
  return <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle>实验模板市场</DialogTitle>
              <DialogDescription>
                选择预定义的实验模板快速开始
              </DialogDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* 搜索和筛选 */}
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="搜索模板..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10" />
            </div>
            <TemplateFilters filterCategory={filterCategory} setFilterCategory={setFilterCategory} filterSort={filterSort} setFilterSort={setFilterSort} />
          </div>
          
          {/* 模板网格 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <TemplateGrid templates={templates} searchTerm={searchTerm} filterCategory={filterCategory} filterSort={filterSort} selectedTemplate={selectedTemplate} setSelectedTemplate={setSelectedTemplate} onUseTemplate={handleUseTemplate} />
            </div>
            
            {/* 模板预览 */}
            <div className="lg:col-span-1">
              <TemplatePreview template={selectedTemplate} onUseTemplate={handleUseTemplate} />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>;
}