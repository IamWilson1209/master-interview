'use client';

import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Interviewer {
  id: string;
  name: string;
  description: string;
  avatar: string;
}

interface InterviewerCardProps {
  interviewer: Interviewer;
  isSelected: boolean;
  onSelect: () => void;
}

export function InterviewerCard({
  interviewer,
  isSelected,
  onSelect,
}: InterviewerCardProps) {
  return (
    <motion.div
      className={`
        relative p-4 rounded-xl border-2 cursor-pointer transition-all
        ${
          isSelected
            ? 'border-orange-400 bg-orange-50 shadow-lg'
            : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
        }
      `}
      onClick={onSelect}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex flex-col items-center text-center space-y-3">
        <div className="relative">
          <Avatar className="w-16 h-16">
            <AvatarImage src={interviewer.avatar || '/placeholder.svg'} />
            <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold">
              {interviewer.name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </AvatarFallback>
          </Avatar>
          {isSelected && (
            <motion.div
              className="absolute -top-1 -right-1 w-6 h-6 bg-orange-400 rounded-full flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1 }}
            >
              <div className="w-2 h-2 bg-white rounded-full" />
            </motion.div>
          )}
        </div>

        <div>
          <h4 className="font-medium text-gray-900 text-sm">
            {interviewer.name}
          </h4>
          <p className="text-xs text-gray-600 mt-1">
            {interviewer.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
