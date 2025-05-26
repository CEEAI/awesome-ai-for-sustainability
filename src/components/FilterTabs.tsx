
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Star } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface FilterTabsProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const FilterTabs: React.FC<FilterTabsProps> = ({
  activeFilter,
  onFilterChange,
  searchQuery,
  onSearchChange,
}) => {
  const { t } = useLanguage();

  const filters = [
    { id: 'all', label: t('filter.all') },
    { id: 'official', label: t('filter.official'), icon: Star },
    { id: 'search', label: t('filter.search') },
    { id: 'web-scraping', label: t('filter.webScraping') },
    { id: 'communication', label: t('filter.communication') },
    { id: 'productivity', label: t('filter.productivity') },
    { id: 'development', label: t('filter.development') },
    { id: 'database', label: t('filter.database') },
    { id: 'cloud-service', label: t('filter.cloudService') },
    { id: 'file-system', label: t('filter.fileSystem') },
    { id: 'cloud-storage', label: t('filter.cloudStorage') },
    { id: 'version-control', label: t('filter.versionControl') },
    { id: 'other', label: t('filter.other') },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col space-y-6">
        {/* 搜索框区域 - 居中设计 */}
        <div className="flex justify-center">
          <div className="relative w-full max-w-2xl">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder={t('search.placeholder')}
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-12 pr-4 py-3 text-lg border-2 border-gray-200 rounded-xl bg-white/80 backdrop-blur-sm shadow-lg hover:border-blue-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                ✕
              </button>
            )}
          </div>
        </div>
        
        {/* 过滤标签区域 */}
        <div className="flex justify-center">
          <div className="flex flex-wrap gap-2 justify-center max-w-4xl">
            {filters.map((filter) => {
              const Icon = filter.icon;
              return (
                <Button
                  key={filter.id}
                  variant={activeFilter === filter.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => onFilterChange(filter.id)}
                  className="flex items-center space-x-1 hover:scale-105 transition-transform duration-150"
                >
                  {Icon && <Icon className="w-3 h-3" />}
                  <span>{filter.label}</span>
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterTabs;
