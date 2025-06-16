
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { ServerInfo } from '@/utils/markdownParser';

interface ServerDetailHeaderProps {
  server: ServerInfo;
}

export const ServerDetailHeader: React.FC<ServerDetailHeaderProps> = ({ server }) => {
  const { t } = useLanguage();

  return (
    <>
      <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" />
        {t('server.backToHome')}
      </Link>

      <div className="mb-6">
        <div className="flex items-start justify-between mb-4">
          <h1 className="text-3xl font-bold text-gray-900">{server.name}</h1>
          {server.isOfficial && (
            <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-200">
              🏅 {t('server.official')}
            </Badge>
          )}
        </div>
        <p className="text-lg text-gray-600 mb-4">{server.description}</p>
        <Badge variant="outline">{server.category}</Badge>
      </div>
    </>
  );
};
