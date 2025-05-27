
export interface ServerInfo {
  id: string;
  name: string;
  description: string;
  category: string;
  isOfficial?: boolean;
  githubUrl?: string;
  npmUrl?: string;
}

export const parseMarkdownToServers = (markdownContent: string): ServerInfo[] => {
  const servers: ServerInfo[] = [];
  const lines = markdownContent.split('\n');
  
  let currentCategory = 'Other';
  let isInServerSection = false;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // 检测分类标题 (## Category Name)
    if (line.startsWith('## ') && !line.includes('Table of Contents')) {
      currentCategory = line.replace('## ', '').trim();
      isInServerSection = true;
      continue;
    }
    
    // 检测服务器条目 (- [Server Name](url) - Description)
    if (isInServerSection && line.startsWith('- [')) {
      const match = line.match(/- \[([^\]]+)\]\(([^)]+)\)(.*)/);
      if (match) {
        const [, name, url, rest] = match;
        const description = rest.replace(/^[\s-]+/, '').trim();
        
        // 生成唯一 ID
        const id = name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
        
        // 判断是否为官方服务器
        const isOfficial = line.includes('⭐') || line.includes('official') || currentCategory.toLowerCase().includes('official');
        
        servers.push({
          id,
          name,
          description: description || 'No description available',
          category: currentCategory,
          isOfficial,
          githubUrl: url.includes('github.com') ? url : undefined,
          npmUrl: url.includes('npmjs.com') ? url : undefined,
        });
      }
    }
    
    // 如果遇到新的主要标题，停止解析当前部分
    if (line.startsWith('# ') && i > 0) {
      isInServerSection = false;
    }
  }
  
  return servers;
};

export const fetchReadmeContent = async (language: 'en' | 'zh' = 'en'): Promise<string> => {
  try {
    const fileName = language === 'zh' ? '../../README_CN.md' : '../../README.md';
    const response = await fetch(fileName);
    
    if (!response.ok) {
      // 如果找不到指定语言的文件，回退到默认 README.md
      if (language === 'zh') {
        return fetchReadmeContent('en');
      }
      throw new Error(`Failed to fetch README: ${response.statusText}`);
    }
    
    return await response.text();
  } catch (error) {
    console.error('Error fetching local README:', error);
    throw error;
  }
};
