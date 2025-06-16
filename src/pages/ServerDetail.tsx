
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useReadmeData } from '@/hooks/useReadmeData';
import { ServerDetailHeader } from '@/components/ServerDetailHeader';
import { ServerReadme } from '@/components/ServerReadme';
import { ServerSidebar } from '@/components/ServerSidebar';

const ServerDetail = () => {
  const { serverId } = useParams<{ serverId: string }>();
  const { language, t } = useLanguage();
  const { data, isLoading } = useReadmeData({ language });

  const server = data?.servers?.find(s => s.id === serverId);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/4 mb-4"></div>
            <div className="h-32 bg-gray-300 rounded mb-6"></div>
            <div className="h-96 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!server) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('server.backToHome')}
          </Link>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">{t('server.notFound')}</h1>
            <p className="text-gray-600">{t('server.notFoundDesc')}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <ServerDetailHeader server={server} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <ServerReadme server={server} />
          </div>

          {/* Sidebar */}
          <ServerSidebar server={server} />
        </div>
      </div>
    </div>
  );
};

export default ServerDetail;
