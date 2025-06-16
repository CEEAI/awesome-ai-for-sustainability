
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Github, FileText, ExternalLink, ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';

const SubmitPage = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();

  const handleGitHubPR = () => {
    window.open('https://github.com/CEEAI/awesome-ai-for-sustainability', '_blank');
  };

  const handleFeishuForm = () => {
    window.open('https://uzmhiopsjv.feishu.cn/share/base/form/shrcnm50Digw3RIsMl4VOQd1QRe', '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* 返回按钮 */}
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="mb-6 flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{language === 'en' ? 'Back to Home' : '返回首页'}</span>
          </Button>

          {/* 页面标题和介绍 */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {language === 'en' ? 'Submit Your Project' : '提交您的资源'}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {language === 'en' 
                ? 'We welcome contributions to our awesome AI for sustainability collection. Choose your preferred way to submit your project or resource.'
                : '欢迎您为AI时代的生态环境领域引擎助力。请选择您偏好的提交方式。'
              }
            </p>
          </div>

          {/* 提交选项 */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* GitHub PR 选项 */}
            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white/80 backdrop-blur-sm border border-gray-200/50">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-gray-800 transition-colors">
                  <Github className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">
                  {language === 'en' ? 'GitHub Pull Request' : 'GitHub 拉取请求'}
                </CardTitle>
                <CardDescription className="text-gray-600">
                  {language === 'en' 
                    ? 'For developers familiar with GitHub workflow'
                    : '适合熟悉GitHub工作流的开发者'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-sm text-gray-600 space-y-2">
                  <p className="font-medium">
                    {language === 'en' ? 'Steps:' : '步骤：'}
                  </p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>
                      {language === 'en' 
                        ? <span>Fork the <a href="https://github.com/CEEAI/awesome-ai-for-sustainability" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">repository</a></span>
                        : <span>Fork <a href="https://github.com/CEEAI/awesome-ai-for-sustainability" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">本仓库</a></span>
                      }
                    </li>
                    <li>
                      {language === 'en' 
                        ? 'Edit the README.md file' 
                        : '编辑 README.md 文件'
                      }
                    </li>
                    <li>
                      {language === 'en' 
                        ? 'Add your tools/data/resources' 
                        : '添加您的工具/数据/资源'
                      }
                    </li>
                    <li>
                      {language === 'en' 
                        ? 'Submit a pull request' 
                        : '提交拉取请求(Pull Request)'
                      }
                    </li>
                  </ul>
                </div>
                <Button 
                  onClick={handleGitHubPR}
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white flex items-center justify-center space-x-2"
                >
                  <span>
                    {language === 'en' ? 'Go to GitHub' : '前往 GitHub'}
                  </span>
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </CardContent>
            </Card>

            {/* 飞书表单选项 */}
            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white/80 backdrop-blur-sm border border-gray-200/50">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-700 transition-colors">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">
                  {language === 'en' ? 'Feishu Form' : '飞书表单'}
                </CardTitle>
                <CardDescription className="text-gray-600">
                  {language === 'en' 
                    ? 'Simple form submission for everyone'
                    : '适合所有用户，填写表单即可提交。'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-sm text-gray-600 space-y-2">
                  <p className="font-medium">
                    {language === 'en' ? 'Features:' : '特点：'}
                  </p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>
                      {language === 'en' 
                        ? 'Easy to fill out' 
                        : '填写操作简单便捷'
                      }
                    </li>
                    <li>
                      {language === 'en' 
                        ? 'No technical knowledge required' 
                        : '无需任何技术基础'
                      }
                    </li>
                    <li>
                      {language === 'en' 
                        ? 'Admin will review and add' 
                        : '提交后由管理员审核并添加到资源库'
                      }
                    </li>
                    <li>
                      {language === 'en' 
                        ? 'Quick submission process' 
                        : '提交流程快速高效'
                      }
                    </li>
                  </ul>
                </div>
                <Button 
                  onClick={handleFeishuForm}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center space-x-2"
                >
                  <span>
                    {language === 'en' ? 'Fill Form' : '填写表单'}
                  </span>
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* 底部说明 */}
          <div className="mt-12 text-center">
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-6 border border-gray-200/50">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {language === 'en' ? 'Need Help?' : '需要帮助？'}
              </h3>
              <p className="text-gray-600 text-sm">
                {language === 'en' 
                  ? <>If you have any questions about submitting your project, please contact <a href="mailto:admin@ceeai.net" className="text-blue-600 hover:text-blue-800 font-medium underline">admin@ceeai.net</a>. We are here to help you contribute to the AI for sustainability community.</>
                  : <>如果您在提交时有任何疑问，请联系<a href="mailto:admin@ceeai.net" className="text-blue-600 hover:text-blue-800 font-medium underline">admin@ceeai.net</a>。我们随时为您提供帮助，共同为可持续AI社区做出贡献。</>
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitPage;
