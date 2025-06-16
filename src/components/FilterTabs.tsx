
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface FilterTabsProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  categories: string[];
}

interface BaseFilter {
  id: string;
  label: string;
  emoji?: string;
}

const FilterTabs: React.FC<FilterTabsProps> = ({
  activeFilter,
  onFilterChange,
  searchQuery,
  onSearchChange,
  categories,
}) => {
  const { t } = useLanguage();

  // 基础过滤器
  const baseFilters: BaseFilter[] = [
    { id: 'all', label: t('filter.all') },
    { id: 'official', label: t('filter.official'), emoji: '🏅' },
  ];

  // 动态生成分类过滤器
  const categoryFilters: BaseFilter[] = categories.map(category => ({
    id: category.toLowerCase().replace(/\s+/g, '-'),
    label: category,
  }));

  const filters = [...baseFilters, ...categoryFilters];

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
              className="pl-12 pr-4 py-3 text-lg border-2 border-gray-200 rounded-lg bg-white/80 backdrop-blur-sm shadow-lg hover:border-blue-300 focus:border-blue-500 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 transition-all duration-200"
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
            {filters.map((filter) => (
              <Button
                key={filter.id}
                variant={activeFilter === filter.id ? "default" : "outline"}
                size="sm"
                onClick={() => onFilterChange(filter.id)}
                className="flex items-center space-x-1 hover:scale-105 transition-transform duration-150"
              >
                {filter.emoji && <span>{filter.emoji}</span>}
                <span>{filter.label}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterTabs;
