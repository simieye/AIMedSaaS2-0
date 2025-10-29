// @ts-ignore;
import React, { createContext, useContext, useState } from 'react';

const translations = {
  zh: {
    login: '登录',
    logout: '退出登录',
    dashboard: '仪表盘',
    triage: '智能分诊',
    reports: '报告助手',
    prescription: '处方助手',
    settings: '设置',
    welcome: '欢迎使用医生门户',
    wechatLogin: '微信登录',
    todayPatients: '今日接诊量',
    aiAssists: 'AI 辅助次数',
    satisfaction: '患者满意度',
    pendingTriage: '待分诊患者',
    patientName: '患者姓名',
    symptoms: '症状描述',
    aiSuggestion: 'AI 建议科室',
    confirmDepartment: '确认科室',
    modifyDepartment: '修改科室',
    uploadImage: '上传医学影像',
    aiAnalysis: 'AI 分析结果',
    generateReport: '生成结构化报告',
    drugRecommendation: '药物推荐',
    interactionCheck: '相互作用检查',
    inputSymptoms: '输入患者症状',
    currentMedications: '当前用药',
    language: '语言',
    chinese: '中文',
    english: '英文'
  },
  en: {
    login: 'Login',
    logout: 'Logout',
    dashboard: 'Dashboard',
    triage: 'Smart Triage',
    reports: 'Report Assistant',
    prescription: 'Prescription Assistant',
    settings: 'Settings',
    welcome: 'Welcome to Doctor Portal',
    wechatLogin: 'WeChat Login',
    todayPatients: 'Today\'s Patients',
    aiAssists: 'AI Assists',
    satisfaction: 'Patient Satisfaction',
    pendingTriage: 'Pending Triage',
    patientName: 'Patient Name',
    symptoms: 'Symptoms',
    aiSuggestion: 'AI Suggested Department',
    confirmDepartment: 'Confirm Department',
    modifyDepartment: 'Modify Department',
    uploadImage: 'Upload Medical Image',
    aiAnalysis: 'AI Analysis Result',
    generateReport: 'Generate Structured Report',
    drugRecommendation: 'Drug Recommendation',
    interactionCheck: 'Interaction Check',
    inputSymptoms: 'Input Patient Symptoms',
    currentMedications: 'Current Medications',
    language: 'Language',
    chinese: 'Chinese',
    english: 'English'
  }
};
const TranslationContext = createContext();
export function TranslationProvider({
  children
}) {
  const [language, setLanguage] = useState('zh');
  const t = key => translations[language][key] || key;
  return <TranslationContext.Provider value={{
    t,
    language,
    setLanguage
  }}>
      {children}
    </TranslationContext.Provider>;
}
export function useDoctorTranslation() {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useDoctorTranslation must be used within TranslationProvider');
  }
  return context;
}