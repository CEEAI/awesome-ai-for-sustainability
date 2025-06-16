
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github, Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface ServerCardProps {
  id: string;
  name: string;
  description: string;
  category: string;
  isOfficial?: boolean;
  githubUrl?: string;
  externalUrl?: string;
}

const ServerCard: React.FC<ServerCardProps> = ({
  id,
  name,
  description,
  category,
  isOfficial = false,
  githubUrl,
  externalUrl,
}) => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleViewDetails = () => {
    // 只有 GitHub 链接才跳转到内部详情页
    if (githubUrl) {
      navigate(`/server/${id}`);
    } else if (externalUrl) {
      // 任何其他外部链接都直接在新标签页打开
      window.open(externalUrl, '_blank');
    }
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur-sm border border-gray-200/50 h-[240px] flex flex-col">
      <CardHeader className="pb-3 flex-shrink-0">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-brand-600 transition-colors line-clamp-2">
            {name}
          </CardTitle>
          {isOfficial && (
            <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-200 text-xs flex-shrink-0">
              ⭐
            </Badge>
          )}
        </div>
        <CardDescription className="text-gray-600 text-sm leading-relaxed line-clamp-3">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0 flex-1 flex flex-col justify-end">
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="text-xs">
            {category}
          </Badge>
          <div className="flex items-center space-x-2">
            {githubUrl && (
              <Button size="sm" variant="ghost" onClick={() => window.open(githubUrl, '_blank')}>
                <Github className="w-3 h-3" />
              </Button>
            )}
            {externalUrl && !githubUrl && (
              <Button size="sm" variant="ghost" onClick={() => window.open(externalUrl, '_blank')}>
                <Globe className="w-3 h-3" />
              </Button>
            )}
            <Button size="sm" variant="ghost" className="text-brand-600 hover:text-brand-700 hover:bg-brand-50" onClick={handleViewDetails}>
              {t('card.viewDetails')}
              <ExternalLink className="w-3 h-3 ml-1" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServerCard;
