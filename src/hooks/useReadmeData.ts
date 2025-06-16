
import { useQuery } from '@tanstack/react-query';
import { parseMarkdownToServers, fetchReadmeContent, ServerInfo } from '@/utils/markdownParser';

interface UseReadmeDataProps {
  language: 'en' | 'zh';
}

interface ReadmeDataResult {
  servers: ServerInfo[];
  categories: string[];
}

export const useReadmeData = ({ language }: UseReadmeDataProps) => {
  return useQuery({
    queryKey: ['readme-data', language],
    queryFn: async (): Promise<ReadmeDataResult> => {
      try {
        const markdownContent = await fetchReadmeContent(language);
        const servers = parseMarkdownToServers(markdownContent);
        
        // 提取所有唯一的分类，包括 "Other"
        const allCategories = Array.from(new Set(servers.map(server => server.category)))
          .filter(category => category && category.trim() !== '')
          .sort();
        
        // 确保 "Other" 分类在最后
        const categories = allCategories.filter(cat => cat !== 'Other');
        if (allCategories.includes('Other')) {
          categories.push('Other');
        }
        
        return { servers, categories };
      } catch (error) {
        console.error('Failed to fetch and parse README:', error);
        throw error;
      }
    },
    staleTime: 5 * 60 * 1000, // 5 分钟缓存
    retry: 2,
  });
};
