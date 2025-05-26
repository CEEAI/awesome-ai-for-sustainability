
// 配置你的 GitHub 仓库信息
export const REPOSITORY_CONFIG = {
  // 替换为你的 GitHub 仓库 URL
  githubUrl: 'https://github.com/modelcontextprotocol/servers',
  // 或者使用环境变量
  // githubUrl: import.meta.env.VITE_GITHUB_REPO_URL || 'https://github.com/modelcontextprotocol/servers',
};

// 你可以通过环境变量来配置不同的仓库
export const getRepositoryUrl = (): string => {
  return import.meta.env.VITE_GITHUB_REPO_URL || REPOSITORY_CONFIG.githubUrl;
};
