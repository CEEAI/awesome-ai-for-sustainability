
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, Globe, ExternalLink, Trash2 } from 'lucide-react';
import { Ticket } from '@/types/ticket';

const TicketList: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    const savedTickets = JSON.parse(localStorage.getItem('tickets') || '[]');
    setTickets(savedTickets);
  }, []);

  const deleteTicket = (id: string) => {
    const updatedTickets = tickets.filter(ticket => ticket.id !== id);
    setTickets(updatedTickets);
    localStorage.setItem('tickets', JSON.stringify(updatedTickets));
  };

  const getStatusBadge = (status: Ticket['status']) => {
    const variants = {
      pending: 'secondary',
      approved: 'default',
      rejected: 'destructive',
    } as const;

    const labels = {
      pending: '待审核',
      approved: '已批准',
      rejected: '已拒绝',
    };

    return (
      <Badge variant={variants[status]}>
        {labels[status]}
      </Badge>
    );
  };

  if (tickets.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg mb-4">暂无提交记录</p>
        <p className="text-gray-400 text-sm">提交您的第一个项目开始吧！</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">我的提交</h2>
      {tickets.map((ticket) => (
        <Card key={ticket.id} className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <CardTitle className="text-lg">{ticket.title}</CardTitle>
                {ticket.type === 'github' ? (
                  <Badge variant="outline" className="flex items-center space-x-1">
                    <Github className="w-3 h-3" />
                    <span>GitHub</span>
                  </Badge>
                ) : (
                  <Badge variant="outline" className="flex items-center space-x-1">
                    <Globe className="w-3 h-3" />
                    <span>网站</span>
                  </Badge>
                )}
                {getStatusBadge(ticket.status)}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => deleteTicket(ticket.id)}
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
            <CardDescription className="text-sm text-gray-500">
              提交时间: {new Date(ticket.submittedAt).toLocaleString('zh-CN')}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-gray-700 mb-3 line-clamp-2">{ticket.description}</p>
            <div className="flex items-center justify-between">
              <a
                href={ticket.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 text-sm flex items-center space-x-1 hover:underline"
              >
                <span className="truncate max-w-xs">{ticket.url}</span>
                <ExternalLink className="w-3 h-3 flex-shrink-0" />
              </a>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TicketList;
