
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
    'nav.about': 'About CEEAI',
    'nav.submit': 'Submit',
    'nav.chatHub': 'ChatHub',
    'hero.title': 'Awesome AI for Sustainability',
    'hero.subtitle': 'Carefully curated AI tools, models, datasets, and learning resources for the ecological and environmental domain, selected by CEEAI',
    'hero.newBadge': 'New: TianGong AI MCP Servers',
    'filter.all': 'All',
    'filter.official': 'Featured',
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
    'search.placeholder': 'Search...',
    'server.backToHome': 'Back to Home',
    'server.notFound': 'Server Not Found',
    'server.notFoundDesc': 'The server you\'re looking for doesn\'t exist.',
    'server.readme': 'README',
    'server.readmeNotAvailable': 'README not available for this server',
    'server.links': 'Links',
    'server.viewOnGitHub': 'View on GitHub',
    'server.viewOnNPM': 'View on NPM',
    'server.openExternalLink': 'Open External Link',
    'server.serverInfo': 'Server Info',
    'server.category': 'Category',
    'server.type': 'Type',
    'server.official': 'Official',
    'server.community': 'Community',
    'about.title': 'About CEEAI',
    'about.subtitle': 'Committee of Ecological and Environmental Artificial Intelligence',
    'about.description': 'The Committee of Ecological and Environmental Artificial Intelligence (CEEAI) is a professional committee under the Chinese Society for Environmental Sciences, dedicated to promoting the application of artificial intelligence in the ecological and environmental domain.',
    'about.mission.title': 'Our Mission',
    'about.mission.desc': 'To advance the integration of AI technologies with environmental science and promote sustainable development through innovative solutions.',
    'about.vision.title': 'Our Vision',
    'about.vision.desc': 'To become a leading platform for AI-driven environmental solutions and foster collaboration between researchers, industry, and policymakers.',
    'about.contact.title': 'Contact Us',
    'about.contact.email': 'Email',
    'about.contact.address': 'Address',
    'about.contact.addressValue': 'School of Environment, Tsinghua University, Beijing, China',
    'about.contact.wechat': 'WeChat Official Account',
  },
  zh: {
    'nav.home': '首页',
    'nav.about': '关于CEEAI',
    'nav.submit': '提交',
    'nav.chatHub': '聊天中心',
    'hero.title': 'AI时代的生态环境领域引擎',
    'hero.subtitle': '中国环境科学学会生态环境人工智能专委会严选的\n生态环境领域AI工具、模型、数据与学习资源',
    'hero.newBadge': '新功能：远程 MCP 服务器',
    'filter.all': '全部',
    'filter.official': '推荐',
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
    'search.placeholder': '搜索...',
    'server.backToHome': '返回首页',
    'server.notFound': '服务器未找到',
    'server.notFoundDesc': '您正在寻找的服务器不存在。',
    'server.readme': '说明文档',
    'server.readmeNotAvailable': '此服务器没有可用的说明文档',
    'server.links': '链接',
    'server.viewOnGitHub': '在 GitHub 查看',
    'server.viewOnNPM': '在 NPM 查看',
    'server.openExternalLink': '打开外部链接',
    'server.serverInfo': '服务器信息',
    'server.category': '分类',
    'server.type': '类型',
    'server.official': '官方',
    'server.community': '社区',
    'about.title': '关于CEEAI',
    'about.subtitle': '中国环境科学学会生态环境人工智能专委会',
    'about.description': '中国环境科学学会生态环境人工智能专委会（Committee of Ecological and Environmental Artificial Intelligence, CEEAI）是中国环境科学学会下属的专业委员会，致力于推动人工智能技术在生态环境领域的应用。',
    'about.mission.title': '我们的使命',
    'about.mission.desc': '推进人工智能技术与环境科学的融合发展，通过创新解决方案促进可持续发展。',
    'about.vision.title': '我们的愿景',
    'about.vision.desc': '成为AI驱动的环境解决方案的引领平台，促进研究人员、产业界和政策制定者之间的合作。',
    'about.contact.title': '联系我们',
    'about.contact.email': '邮箱',
    'about.contact.address': '地址',
    'about.contact.addressValue': '清华大学环境学院，中国北京',
    'about.contact.wechat': '微信公众号',
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
