
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import SubmitForm from '@/components/SubmitForm';
import TicketList from '@/components/TicketList';
import { Button } from '@/components/ui/button';
import { Plus, List } from 'lucide-react';

const SubmitPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'submit' | 'list'>('submit');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Navigation />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            项目提交系统
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            分享您的优秀项目，让更多人发现和使用
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="bg-white p-1 rounded-lg shadow-sm border">
            <Button
              variant={activeTab === 'submit' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('submit')}
              className="flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>提交项目</span>
            </Button>
            <Button
              variant={activeTab === 'list' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('list')}
              className="flex items-center space-x-2"
            >
              <List className="w-4 h-4" />
              <span>我的提交</span>
            </Button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          {activeTab === 'submit' ? <SubmitForm /> : <TicketList />}
        </div>
      </div>
    </div>
  );
};

export default SubmitPage;
