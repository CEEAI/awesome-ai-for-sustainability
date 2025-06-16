
import React from 'react';
import { Github, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { ServerInfo } from '@/utils/markdownParser';

interface ServerSidebarProps {
  server: ServerInfo;
}

export const ServerSidebar: React.FC<ServerSidebarProps> = ({ server }) => {
  const { t } = useLanguage();

  return (
    <div className="lg:col-span-1">
      <Card>
        <CardHeader>
          <CardTitle>{t('server.links')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {server.githubUrl && (
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => window.open(server.githubUrl, '_blank')}
            >
              <Github className="w-4 h-4 mr-2" />
              {t('server.viewOnGitHub')}
            </Button>
          )}
          {server.externalUrl && (
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => window.open(server.externalUrl, '_blank')}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              {t('server.openExternalLink')}
            </Button>
          )}
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>{t('server.serverInfo')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div>
            <span className="font-medium text-gray-700">{t('server.category')}:</span>
            <span className="ml-2 text-gray-600">{server.category}</span>
          </div>
          <div>
            <span className="font-medium text-gray-700">{t('server.type')}:</span>
            <span className="ml-2 text-gray-600">
              {server.isOfficial ? t('server.official') : t('server.community')}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
