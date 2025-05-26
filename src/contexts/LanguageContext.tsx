
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'zh';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    'nav.home': 'Home',
    'nav.servers': 'Remote Servers',
    'nav.resources': 'Resources',
    'nav.submit': 'Submit',
    'nav.chatHub': 'ChatHub',
    'hero.title': 'Awesome MCP Servers',
    'hero.subtitle': 'A collection of servers for the Model Context Protocol.',
    'hero.newBadge': 'New: Remote MCP Servers',
    'filter.all': 'All',
    'filter.official': 'Official',
    'filter.search': 'Search',
    'filter.webScraping': 'Web Scraping',
    'filter.communication': 'Communication',
    'filter.productivity': 'Productivity',
    'filter.development': 'Development',
    'filter.database': 'Database',
    'filter.cloudService': 'Cloud Service',
    'filter.fileSystem': 'File System',
    'filter.cloudStorage': 'Cloud Storage',
    'filter.versionControl': 'Version Control',
    'filter.other': 'Other',
    'card.viewDetails': 'View Details',
    'search.placeholder': 'Search servers...',
  },
  zh: {
    'nav.home': '首页',
    'nav.servers': '远程服务器',
    'nav.resources': '资源',
    'nav.submit': '提交',
    'nav.chatHub': '聊天中心',
    'hero.title': '优秀的 MCP 服务器',
    'hero.subtitle': '模型上下文协议服务器集合。',
    'hero.newBadge': '新功能：远程 MCP 服务器',
    'filter.all': '全部',
    'filter.official': '官方',
    'filter.search': '搜索',
    'filter.webScraping': '网页抓取',
    'filter.communication': '通信',
    'filter.productivity': '生产力',
    'filter.development': '开发',
    'filter.database': '数据库',
    'filter.cloudService': '云服务',
    'filter.fileSystem': '文件系统',
    'filter.cloudStorage': '云存储',
    'filter.versionControl': '版本控制',
    'filter.other': '其他',
    'card.viewDetails': '查看详情',
    'search.placeholder': '搜索服务器...',
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
