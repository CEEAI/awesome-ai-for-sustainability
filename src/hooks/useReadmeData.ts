
import { useQuery } from '@tanstack/react-query';
import { parseMarkdownToServers, fetchReadmeContent, ServerInfo } from '@/utils/markdownParser';

interface UseReadmeDataProps {
  repoUrl?: string;
  language: 'en' | 'zh';
}

export const useReadmeData = ({ repoUrl, language }: UseReadmeDataProps) => {
  return useQuery({
    queryKey: ['readme-data', repoUrl, language],
    queryFn: async (): Promise<ServerInfo[]> => {
      if (!repoUrl) {
        // 如果没有提供仓库 URL，返回空数组或使用默认数据
        return [];
      }
      
      try {
        const markdownContent = await fetchReadmeContent(repoUrl, language);
        return parseMarkdownToServers(markdownContent);
      } catch (error) {
        console.error('Failed to fetch and parse README:', error);
        throw error;
      }
    },
    enabled: !!repoUrl,
    staleTime: 5 * 60 * 1000, // 5 分钟缓存
    retry: 2,
  });
};
