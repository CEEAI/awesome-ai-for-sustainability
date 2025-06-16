import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Github, Package, ExternalLink } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { useReadmeData } from '@/hooks/useReadmeData';

const ServerDetail = () => {
  const { serverId } = useParams<{ serverId: string }>();
  const { language, t } = useLanguage();
  const { data, isLoading } = useReadmeData({ language });

  const server = data?.servers?.find(s => s.id === serverId);

  // Fetch README from GitHub using raw content URL
  const { data: githubReadme, isLoading: isLoadingReadme } = useQuery({
    queryKey: ['github-readme', server?.githubUrl, language],
    queryFn: async () => {
      if (!server?.githubUrl || !server.githubUrl.includes('github.com')) {
        return null;
      }
      
      // Extract owner and repo from GitHub URL
      const match = server.githubUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/);
      if (!match) return null;
      
      const [, owner, repo] = match;
      console.log(`Attempting to fetch README for ${owner}/${repo}`);
      
      // Helper function to try fetching a file using raw GitHub URL
      const tryFetchFile = async (filename: string): Promise<string | null> => {
        try {
          const url = `https://raw.githubusercontent.com/${owner}/${repo}/main/${filename}`;
          console.log(`Trying to fetch: ${url}`);
          const response = await fetch(url);
          if (response.ok) {
            const content = await response.text();
            console.log(`Successfully fetched: ${filename}`);
            return content;
          }
          console.log(`Failed to fetch ${filename}: ${response.status}`);
          return null;
        } catch (error) {
          console.log(`Error fetching ${filename}:`, error);
          return null;
        }
      };

      // Try only root directory paths
      const pathsToTry = [];
      
      // If Chinese interface, try Chinese README files first
      if (language === 'zh') {
        pathsToTry.push(
          'README_ZH.md',
          'README_CN.md',
          'readme_zh.md',
          'readme_cn.md'
        );
      }
      
      // Always try English READMEs from root
      pathsToTry.push(
        'README.md',
        'readme.md'
      );

      // Try each path until we find a README
      for (const filename of pathsToTry) {
        const content = await tryFetchFile(filename);
        if (content) {
          return content;
        }
      }
      
      console.log(`No README found for ${owner}/${repo}`);
      return null;
    },
    enabled: !!server?.githubUrl && server.githubUrl.includes('github.com'),
  });

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
        <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t('server.backToHome')}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <div className="flex items-start justify-between mb-4">
                <h1 className="text-3xl font-bold text-gray-900">{server.name}</h1>
                {server.isOfficial && (
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-200">
                    ⭐ {t('server.official')}
                  </Badge>
                )}
              </div>
              <p className="text-lg text-gray-600 mb-4">{server.description}</p>
              <Badge variant="outline">{server.category}</Badge>
            </div>

            {/* README Content */}
            {server.githubUrl && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Github className="w-5 h-5 mr-2" />
                    {t('server.readme')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoadingReadme ? (
                    <div className="animate-pulse">
                      <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
                      <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                      <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                    </div>
                  ) : githubReadme ? (
                    <div className="markdown-content">
                      <ReactMarkdown 
                        components={{
                          h1: ({children}) => <h1 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">{children}</h1>,
                          h2: ({children}) => <h2 className="text-xl font-semibold text-gray-800 mb-3 mt-6">{children}</h2>,
                          h3: ({children}) => <h3 className="text-lg font-medium text-gray-800 mb-2 mt-4">{children}</h3>,
                          h4: ({children}) => <h4 className="text-base font-medium text-gray-700 mb-2 mt-3">{children}</h4>,
                          p: ({children}) => <p className="text-gray-600 mb-4 leading-relaxed">{children}</p>,
                          ul: ({children}) => <ul className="list-disc list-inside text-gray-600 mb-4 space-y-1">{children}</ul>,
                          ol: ({children}) => <ol className="list-decimal list-inside text-gray-600 mb-4 space-y-1">{children}</ol>,
                          li: ({children}) => <li className="leading-relaxed">{children}</li>,
                          code: ({children, className}) => {
                            const isInline = !className;
                            return isInline ? 
                              <code className="bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">{children}</code> :
                              <code className="block bg-gray-50 text-gray-800 p-4 rounded-lg text-sm font-mono overflow-x-auto border">{children}</code>
                          },
                          pre: ({children}) => <pre className="bg-gray-50 p-4 rounded-lg mb-4 overflow-x-auto border">{children}</pre>,
                          blockquote: ({children}) => <blockquote className="border-l-4 border-blue-200 pl-4 py-2 mb-4 bg-blue-50 text-gray-700 italic">{children}</blockquote>,
                          a: ({children, href}) => <a href={href} className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">{children}</a>,
                          table: ({children}) => <div className="overflow-x-auto mb-4"><table className="min-w-full border border-gray-200 rounded-lg">{children}</table></div>,
                          thead: ({children}) => <thead className="bg-gray-50">{children}</thead>,
                          tbody: ({children}) => <tbody className="divide-y divide-gray-200">{children}</tbody>,
                          tr: ({children}) => <tr>{children}</tr>,
                          th: ({children}) => <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b border-gray-200">{children}</th>,
                          td: ({children}) => <td className="px-4 py-2 text-sm text-gray-600 border-b border-gray-200">{children}</td>,
                          hr: () => <hr className="border-gray-200 my-6" />,
                          strong: ({children}) => <strong className="font-semibold text-gray-900">{children}</strong>,
                          em: ({children}) => <em className="italic text-gray-700">{children}</em>
                        }}
                      >
                        {githubReadme}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    <p className="text-gray-500">{t('server.readmeNotAvailable')}</p>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
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
                {server.npmUrl && (
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => window.open(server.npmUrl, '_blank')}
                  >
                    <Package className="w-4 h-4 mr-2" />
                    {t('server.viewOnNPM')}
                  </Button>
                )}
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => window.open(server.githubUrl || server.npmUrl || '#', '_blank')}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  {t('server.openExternalLink')}
                </Button>
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
        </div>
      </div>
    </div>
  );
};

export default ServerDetail;
