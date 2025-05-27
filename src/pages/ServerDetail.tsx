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
  const { language } = useLanguage();
  const { data: servers, isLoading } = useReadmeData({ language });

  const server = servers?.find(s => s.id === serverId);

  // Fetch GitHub README if it's a GitHub project
  const { data: githubReadme, isLoading: isLoadingReadme } = useQuery({
    queryKey: ['github-readme', server?.githubUrl],
    queryFn: async () => {
      if (!server?.githubUrl || !server.githubUrl.includes('github.com')) {
        return null;
      }
      
      // Extract owner and repo from GitHub URL
      const match = server.githubUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/);
      if (!match) return null;
      
      const [, owner, repo] = match;
      const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/readme`);
      
      if (!response.ok) return null;
      
      const data = await response.json();
      // Decode base64 content
      return atob(data.content);
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
            Back to Home
          </Link>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Server Not Found</h1>
            <p className="text-gray-600">The server you're looking for doesn't exist.</p>
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
          Back to Home
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <div className="flex items-start justify-between mb-4">
                <h1 className="text-3xl font-bold text-gray-900">{server.name}</h1>
                {server.isOfficial && (
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-200">
                    ⭐ Official
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
                    README
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
                    <div className="prose prose-gray max-w-none prose-headings:text-gray-900 prose-links:text-blue-600 prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-gray-50 prose-pre:border">
                      <ReactMarkdown>{githubReadme}</ReactMarkdown>
                    </div>
                  ) : (
                    <p className="text-gray-500">README not available</p>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {server.githubUrl && (
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => window.open(server.githubUrl, '_blank')}
                  >
                    <Github className="w-4 h-4 mr-2" />
                    View on GitHub
                  </Button>
                )}
                {server.npmUrl && (
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => window.open(server.npmUrl, '_blank')}
                  >
                    <Package className="w-4 h-4 mr-2" />
                    View on NPM
                  </Button>
                )}
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => window.open(server.githubUrl || server.npmUrl || '#', '_blank')}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Open External Link
                </Button>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Server Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <span className="font-medium text-gray-700">Category:</span>
                  <span className="ml-2 text-gray-600">{server.category}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Type:</span>
                  <span className="ml-2 text-gray-600">
                    {server.isOfficial ? 'Official' : 'Community'}
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
