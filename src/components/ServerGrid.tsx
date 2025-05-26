
import React from 'react';
import ServerCard from './ServerCard';

interface Server {
  id: string;
  name: string;
  description: string;
  category: string;
  isOfficial?: boolean;
}

interface ServerGridProps {
  servers: Server[];
}

const ServerGrid: React.FC<ServerGridProps> = ({ servers }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {servers.map((server, index) => (
          <div
            key={server.id}
            className="animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <ServerCard
              name={server.name}
              description={server.description}
              category={server.category}
              isOfficial={server.isOfficial}
            />
          </div>
        ))}
      </div>
      
      {servers.length === 0 && (
        <div className="text-center py-16">
          <div className="text-gray-400 text-lg mb-2">No servers found</div>
          <div className="text-gray-500 text-sm">Try adjusting your search or filters</div>
        </div>
      )}
    </div>
  );
};

export default ServerGrid;
