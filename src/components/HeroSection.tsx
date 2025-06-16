
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Sparkles } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex justify-center mb-6">
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-200 flex items-center space-x-1">
            <Sparkles className="w-3 h-3" />
            <span>{t('hero.newBadge')}</span>
          </Badge>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 animate-fade-in">
          {t('hero.title')}
        </h1>
        
        <p className="text-xl text-gray-600 max-w-2xl mx-auto animate-fade-in whitespace-pre-line">
          {t('hero.subtitle')}
        </p>
      </div>
    </div>
  );
};

export default HeroSection;
