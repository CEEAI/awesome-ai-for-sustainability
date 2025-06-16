
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Github } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { MarkdownRenderer } from './MarkdownRenderer';
import { ServerInfo } from '@/utils/markdownParser';

interface ServerReadmeProps {
  server: ServerInfo;
}

export const ServerReadme: React.FC<ServerReadmeProps> = ({ server }) => {
  const { language, t } = useLanguage();

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

  if (!server.githubUrl) {
    return null;
  }

  return (
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
          <MarkdownRenderer content={githubReadme} />
        ) : (
          <p className="text-gray-500">{t('server.readmeNotAvailable')}</p>
        )}
      </CardContent>
    </Card>
  );
};
