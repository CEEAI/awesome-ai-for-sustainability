
import React, { useState, useMemo } from 'react';
import Navigation from './Navigation';
import HeroSection from './HeroSection';
import FilterTabs from './FilterTabs';
import ServerGrid from './ServerGrid';
import { useReadmeData } from '@/hooks/useReadmeData';
import { useLanguage } from '@/contexts/LanguageContext';
import { getRepositoryUrl } from '@/config/repository';

const HomePage = () => {
  const { language } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // 从 README 获取数据
  const { data: servers = [], isLoading, error } = useReadmeData({
    repoUrl: getRepositoryUrl(),
    language,
  });

  const filteredServers = useMemo(() => {
    let filtered = servers;

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
          filtered = filtered.filter(server => 
            server.category.toLowerCase().includes(targetCategory.toLowerCase())
          );
        }
      }
    }

    return filtered;
  }, [servers, activeFilter, searchQuery]);

  if (error) {
    console.error('Error loading README data:', error);
  }

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
      
      {isLoading ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="text-center py-16">
            <div className="text-gray-400 text-lg mb-2">Loading servers...</div>
            <div className="text-gray-500 text-sm">Fetching data from README.md</div>
          </div>
        </div>
      ) : error ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="text-center py-16">
            <div className="text-red-400 text-lg mb-2">Failed to load servers</div>
            <div className="text-gray-500 text-sm">Please check the repository configuration</div>
          </div>
        </div>
      ) : (
        <ServerGrid servers={filteredServers} />
      )}
    </div>
  );
};

export default HomePage;
