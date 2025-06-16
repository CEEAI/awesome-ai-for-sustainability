
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github, Package } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface ServerCardProps {
  id: string;
  name: string;
  description: string;
  category: string;
  isOfficial?: boolean;
  githubUrl?: string;
  npmUrl?: string;
}

const ServerCard: React.FC<ServerCardProps> = ({
  id,
  name,
  description,
  category,
  isOfficial = false,
  githubUrl,
  npmUrl,
}) => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleViewDetails = () => {
    // 优先检查是否有外部链接（非GitHub的githubUrl或者npmUrl）
    if (githubUrl && !githubUrl.includes('github.com')) {
      // 如果githubUrl存在但不是GitHub链接，直接打开
      window.open(githubUrl, '_blank');
    } else if (npmUrl && !githubUrl) {
      // 如果只有npmUrl没有githubUrl，打开npm链接
      window.open(npmUrl, '_blank');
    } else if (githubUrl && githubUrl.includes('github.com')) {
      // 如果是GitHub链接，跳转到详情页
      navigate(`/server/${id}`);
    } else {
      // 如果什么链接都没有，跳转到详情页
      navigate(`/server/${id}`);
    }
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur-sm border border-gray-200/50">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-brand-600 transition-colors">
            {name}
          </CardTitle>
          {isOfficial && (
            <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-200 text-xs">
              ⭐
            </Badge>
          )}
        </div>
        <CardDescription className="text-gray-600 text-sm leading-relaxed">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="text-xs">
            {category}
          </Badge>
          <div className="flex items-center space-x-2">
            {githubUrl && githubUrl.includes('github.com') && (
              <Button size="sm" variant="ghost" onClick={() => window.open(githubUrl, '_blank')}>
                <Github className="w-3 h-3" />
              </Button>
            )}
            {npmUrl && (
              <Button size="sm" variant="ghost" onClick={() => window.open(npmUrl, '_blank')}>
                <Package className="w-3 h-3" />
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
