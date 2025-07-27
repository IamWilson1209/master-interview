'use client';

import { useState } from 'react';
import { ChatRoomAsidebar } from './_components/ChatRoomAsidebar';
import { ChatArea } from './_components/ChatRoom';
import { ChatRoomSidebar } from './_components/ChatRoomSidebar';

export default function InterviewPage() {
  const [interviews, setInterviews] = useState([
    'Frontend Developer Interview',
    'Backend Developer Interview',
    'Full Stack Interview',
    'System Design Interview',
  ]);

  const [activeInterview, setActiveInterview] = useState<string | null>(
    interviews[0]
  );

  const handleNewInterview = () => {
    const newInterview = `Interview ${interviews.length + 1}`;
    setInterviews([...interviews, newInterview]);
    setActiveInterview(newInterview);
  };

  const handleSelectInterview = (interview: string) => {
    setActiveInterview(interview);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Reserved space for navbar */}
      <div className="h-16 bg-white border-b border-gray-200">
        {/* Navbar will be inserted here */}
      </div>

      {/* Main content area */}
      <div className="flex-1 flex overflow-hidden">
        <ChatRoomAsidebar
          interviews={interviews}
          activeInterview={activeInterview}
          onSelectInterview={handleSelectInterview}
          onNewInterview={handleNewInterview}
        />

        <ChatArea interviewId={activeInterview || undefined} />

        <ChatRoomSidebar />
      </div>
    </div>
  );
}
