
import { useQuery } from '@tanstack/react-query';
import { parseMarkdownToServers, fetchReadmeContent, ServerInfo } from '@/utils/markdownParser';

interface UseReadmeDataProps {
  language: 'en' | 'zh';
}

export const useReadmeData = ({ language }: UseReadmeDataProps) => {
  return useQuery({
    queryKey: ['readme-data', language],
    queryFn: async (): Promise<ServerInfo[]> => {
      try {
        const markdownContent = await fetchReadmeContent(language);
        return parseMarkdownToServers(markdownContent);
      } catch (error) {
        console.error('Failed to fetch and parse README:', error);
        throw error;
      }
    },
    staleTime: 5 * 60 * 1000, // 5 分钟缓存
    retry: 2,
  });
};
