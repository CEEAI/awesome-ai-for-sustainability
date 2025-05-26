
import React, { useState, useMemo } from 'react';
import Navigation from './Navigation';
import HeroSection from './HeroSection';
import FilterTabs from './FilterTabs';
import ServerGrid from './ServerGrid';

// 示例数据 - 实际使用时会从 README.md 解析
const mockServers = [
  {
    id: 'brave-search',
    name: 'Brave Search',
    description: "Web and local search using Brave's Search API",
    category: 'Search',
    isOfficial: true,
  },
  {
    id: 'fetch',
    name: 'Fetch',
    description: 'Web content fetching and conversion for efficient LLM usage',
    category: 'Web Scraping',
    isOfficial: false,
  },
  {
    id: 'filesystem',
    name: 'Filesystem',
    description: 'Secure file operations with configurable access controls',
    category: 'File System',
    isOfficial: false,
  },
  {
    id: 'git',
    name: 'Git',
    description: 'Tools to read, search, and manipulate Git repositories',
    category: 'Version Control',
    isOfficial: false,
  },
  {
    id: 'gitlab',
    name: 'GitLab',
    description: 'GitLab API, enabling project management',
    category: 'Development',
    isOfficial: false,
  },
  {
    id: 'google-drive',
    name: 'Google Drive',
    description: 'File access and search capabilities for Google Drive',
    category: 'Cloud Storage',
    isOfficial: false,
  },
  {
    id: 'google-maps',
    name: 'Google Maps',
    description: 'Location services, directions, and place details',
    category: 'Cloud Service',
    isOfficial: false,
  },
  {
    id: 'memory',
    name: 'Memory',
    description: 'Knowledge graph-based persistent memory system',
    category: 'Database',
    isOfficial: false,
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    description: 'Read-only database access with schema inspection',
    category: 'Database',
    isOfficial: false,
  },
  {
    id: 'puppeteer',
    name: 'Puppeteer',
    description: 'Browser automation and web scraping',
    category: 'Web Scraping',
    isOfficial: false,
  },
  {
    id: 'sentry',
    name: 'Sentry',
    description: 'Retrieving and analyzing issues from Sentry.io',
    category: 'Development',
    isOfficial: false,
  },
  {
    id: 'sequential-thinking',
    name: 'Sequential Thinking',
    description: 'Dynamic and reflective problem-solving through thought sequences',
    category: 'Productivity',
    isOfficial: false,
  },
];

const HomePage = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredServers = useMemo(() => {
    let filtered = mockServers;

    // 应用搜索过滤
    if (searchQuery) {
      filtered = filtered.filter(
        server =>
          server.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          server.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // 应用分类过滤
    if (activeFilter !== 'all') {
      if (activeFilter === 'official') {
        filtered = filtered.filter(server => server.isOfficial);
      } else {
        const categoryMap: { [key: string]: string } = {
          'search': 'Search',
          'web-scraping': 'Web Scraping',
          'communication': 'Communication',
          'productivity': 'Productivity',
          'development': 'Development',
          'database': 'Database',
          'cloud-service': 'Cloud Service',
          'file-system': 'File System',
          'cloud-storage': 'Cloud Storage',
          'version-control': 'Version Control',
          'other': 'Other',
        };
        
        const targetCategory = categoryMap[activeFilter];
        if (targetCategory) {
          filtered = filtered.filter(server => server.category === targetCategory);
        }
      }
    }

    return filtered;
  }, [activeFilter, searchQuery]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <Navigation />
      <HeroSection />
      <FilterTabs
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <ServerGrid servers={filteredServers} />
    </div>
  );
};

export default HomePage;
