import React from 'react';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Navigation = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <div className="flex items-center">
              <img src="/logo.svg" alt="Logo" className="h-8 w-auto" />
            </div>
            <div className="hidden md:flex space-x-6">
              <a href="#" className="text-gray-700 hover:text-brand-600 transition-colors">
                {t('nav.home')}
              </a>
              <a href="#" className="text-gray-700 hover:text-brand-600 transition-colors">
                {t('nav.servers')}
              </a>
              <a href="#" className="text-gray-700 hover:text-brand-600 transition-colors">
                {t('nav.resources')}
              </a>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLanguage(language === 'en' ? 'zh' : 'en')}
              className="flex items-center space-x-1"
            >
              <Globe className="w-4 h-4" />
              <span>{language === 'en' ? '中文' : 'EN'}</span>
            </Button>
            
            <Button className="bg-gray-900 hover:bg-gray-800 text-white">
              {t('nav.submit')}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
