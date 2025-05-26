
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

export const fetchReadmeContent = async (repoUrl: string, language: 'en' | 'zh' = 'en'): Promise<string> => {
  try {
    // 从 GitHub URL 提取用户名和仓库名
    const match = repoUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/);
    if (!match) {
      throw new Error('Invalid GitHub URL');
    }
    
    const [, owner, repo] = match;
    const fileName = language === 'zh' ? 'README_zh.md' : 'README.md';
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${fileName}`;
    
    const response = await fetch(apiUrl);
    if (!response.ok) {
      // 如果找不到指定语言的文件，回退到默认 README.md
      if (language === 'zh') {
        return fetchReadmeContent(repoUrl, 'en');
      }
      throw new Error(`Failed to fetch README: ${response.statusText}`);
    }
    
    const data = await response.json();
    if (data.content) {
      return atob(data.content.replace(/\s/g, ''));
    }
    
    throw new Error('No content found in README');
  } catch (error) {
    console.error('Error fetching README:', error);
    throw error;
  }
};
