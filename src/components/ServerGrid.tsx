
import React from 'react';
import ServerCard from './ServerCard';
import { ServerInfo } from '@/utils/markdownParser';

interface ServerGridProps {
  servers: ServerInfo[];
}

const ServerGrid: React.FC<ServerGridProps> = ({ servers }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {servers.map((server, index) => (
          <div
            key={`${server.id}-${index}`}
            className="opacity-0 animate-fade-in"
            style={{ 
              animationDelay: `${Math.min(index * 0.05, 0.5)}s`,
              animationFillMode: 'forwards'
            }}
          >
            <ServerCard
              id={server.id}
              name={server.name}
              description={server.description}
              category={server.category}
              isOfficial={server.isOfficial}
              githubUrl={server.githubUrl}
              npmUrl={server.npmUrl}
            />
          </div>
        ))}
      </div>
      
      {servers.length === 0 && (
        <div className="text-center py-16 opacity-0 animate-fade-in" style={{ animationFillMode: 'forwards' }}>
          <div className="text-gray-400 text-lg mb-2">No servers found</div>
          <div className="text-gray-500 text-sm">Try adjusting your search or filters</div>
        </div>
      )}
    </div>
  );
};

export default ServerGrid;
