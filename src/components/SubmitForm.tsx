
import React from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Github, Globe } from 'lucide-react';
import { Ticket } from '@/types/ticket';
import { useToast } from '@/hooks/use-toast';

interface SubmitFormData {
  title: string;
  description: string;
  url: string;
}

const SubmitForm: React.FC = () => {
  const { toast } = useToast();
  const form = useForm<SubmitFormData>({
    defaultValues: {
      title: '',
      description: '',
      url: '',
    },
  });

  const watchedUrl = form.watch('url');
  const isGithubUrl = watchedUrl?.includes('github.com');

  const onSubmit = (data: SubmitFormData) => {
    const newTicket: Ticket = {
      id: Date.now().toString(),
      title: data.title,
      description: data.description,
      url: data.url,
      type: isGithubUrl ? 'github' : 'website',
      submittedAt: new Date().toISOString(),
      status: 'pending',
    };

    // 保存到本地存储
    const existingTickets = JSON.parse(localStorage.getItem('tickets') || '[]');
    const updatedTickets = [newTicket, ...existingTickets];
    localStorage.setItem('tickets', JSON.stringify(updatedTickets));

    toast({
      title: "提交成功！",
      description: "您的提交已保存，我们将尽快审核。",
    });

    form.reset();
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <span>提交项目</span>
          {watchedUrl && (
            <Badge variant="secondary" className="ml-2">
              {isGithubUrl ? (
                <>
                  <Github className="w-3 h-3 mr-1" />
                  GitHub
                </>
              ) : (
                <>
                  <Globe className="w-3 h-3 mr-1" />
                  网站
                </>
              )}
            </Badge>
          )}
        </CardTitle>
        <CardDescription>
          分享您的 GitHub 项目或网站链接，让更多人发现您的作品
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              rules={{ 
                required: '请输入项目标题',
                minLength: { value: 3, message: '标题至少需要3个字符' }
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>项目标题</FormLabel>
                  <FormControl>
                    <Input placeholder="输入您的项目标题" {...field} />
                  </FormControl>
                  <FormDescription>
                    一个简洁明了的项目名称
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="url"
              rules={{ 
                required: '请输入项目链接',
                pattern: {
                  value: /^https?:\/\/.+/,
                  message: '请输入有效的网址（以 http:// 或 https:// 开头）'
                }
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>项目链接</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="https://github.com/username/repo 或 https://yoursite.com" 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    GitHub 仓库地址或网站链接
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              rules={{ 
                required: '请输入项目描述',
                minLength: { value: 10, message: '描述至少需要10个字符' }
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>项目描述</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="请描述您的项目特点、功能或亮点..."
                      className="min-h-[100px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    详细介绍您的项目，让其他人了解它的价值
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              提交项目
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SubmitForm;
