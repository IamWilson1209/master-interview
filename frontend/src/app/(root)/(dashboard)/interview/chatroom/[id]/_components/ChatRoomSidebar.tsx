'use client';

import { Button } from '@/components/ui/button';
import { FileText, User, MessageSquare, Settings } from 'lucide-react';

export function ChatRoomSidebar() {
  const actions = [
    {
      name: 'Job Description',
      icon: FileText,
      color: 'bg-blue-500 hover:bg-blue-600',
    },
    {
      name: 'Resume',
      icon: User,
      color: 'bg-cyan-500 hover:bg-cyan-600',
    },
    {
      name: 'Interview',
      icon: MessageSquare,
      color: 'bg-yellow-500 hover:bg-yellow-600',
    },
    {
      name: 'Settings',
      icon: Settings,
      color: 'bg-purple-500 hover:bg-purple-600',
    },
  ];

  return (
    <div className="w-48 bg-white border-l border-gray-200 p-4">
      <div className="space-y-3">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <Button
              key={action.name}
              className={`w-full justify-start text-white ${action.color}`}
              onClick={() => console.log(`${action.name} clicked`)}
            >
              <Icon className="w-4 h-4 mr-2" />
              {action.name}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
