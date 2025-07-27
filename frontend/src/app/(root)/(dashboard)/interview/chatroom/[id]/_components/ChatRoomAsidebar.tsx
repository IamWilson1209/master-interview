'use client';

import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface ChatRoomAsidebarProps {
  interviews: string[];
  activeInterview: string | null;
  onSelectInterview: (interview: string) => void;
  onNewInterview: () => void;
}

export function ChatRoomAsidebar({
  interviews,
  activeInterview,
  onSelectInterview,
  onNewInterview,
}: ChatRoomAsidebarProps) {
  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4">
        <Button
          onClick={onNewInterview}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Interview
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="px-4 pb-4">
          {interviews.map((interview, index) => (
            <button
              key={index}
              onClick={() => onSelectInterview(interview)}
              className={`w-full text-left p-3 mb-2 rounded-lg transition-colors ${
                activeInterview === interview
                  ? 'bg-blue-50 border border-blue-200'
                  : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <div className="font-medium text-gray-900">{interview}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
