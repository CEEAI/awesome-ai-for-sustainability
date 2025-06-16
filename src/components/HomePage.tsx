
import React, { useState, useMemo } from 'react';
import Navigation from './Navigation';
import HeroSection from './HeroSection';
import FilterTabs from './FilterTabs';
import ServerGrid from './ServerGrid';
import { useReadmeData } from '@/hooks/useReadmeData';
import { useLanguage } from '@/contexts/LanguageContext';

const HomePage = () => {
  const { language } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // 从本地 README 获取数据和分类
  const { data, isLoading, error } = useReadmeData({
    language,
  });

  const servers = data?.servers || [];
  const categories = data?.categories || [];

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
        // 动态匹配分类
        const targetCategory = categories.find(cat => 
          cat.toLowerCase().replace(/\s+/g, '-') === activeFilter
        );
        
        if (targetCategory) {
          filtered = filtered.filter(server => 
            server.category === targetCategory
          );
        }
      }
    }

    return filtered;
  }, [servers, categories, activeFilter, searchQuery]);

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
        categories={categories}
      />
      
      {isLoading ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="text-center py-16">
            <div className="text-gray-400 text-lg mb-2">Loading servers...</div>
            <div className="text-gray-500 text-sm">Reading from local README files</div>
          </div>
        </div>
      ) : error ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="text-center py-16">
            <div className="text-red-400 text-lg mb-2">Failed to load servers</div>
            <div className="text-gray-500 text-sm">Please check the README.md file in the project root</div>
          </div>
        </div>
      ) : (
        <ServerGrid servers={filteredServers} />
      )}
    </div>
  );
};

export default HomePage;
