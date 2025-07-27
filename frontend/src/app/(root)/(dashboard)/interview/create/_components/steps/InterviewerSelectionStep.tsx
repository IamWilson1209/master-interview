'use client';

import type { UseFormReturn } from 'react-hook-form';
import type { FormData } from '../create-interview-form/MultiStepForm';
import { InterviewerCard } from '../create-interview-form/InterviewerCard';

interface InterviewerSelectionStepProps {
  form: UseFormReturn<FormData>;
}

const interviewers = [
  {
    id: 'technical',
    name: 'Technical Expert',
    description: 'Senior developer with 10+ years experience',
    avatar: '/placeholder.svg?height=80&width=80',
  },
  {
    id: 'hr',
    name: 'HR Professional',
    description: 'Experienced in behavioral interviews',
    avatar: '/placeholder.svg?height=80&width=80',
  },
  {
    id: 'manager',
    name: 'Engineering Manager',
    description: 'Leadership and team management focus',
    avatar: '/placeholder.svg?height=80&width=80',
  },
  {
    id: 'ceo',
    name: 'Executive Leader',
    description: 'C-level executive perspective',
    avatar: '/placeholder.svg?height=80&width=80',
  },
];

export function InterviewerSelectionStep({
  form,
}: InterviewerSelectionStepProps) {
  const {
    watch,
    setValue,
    formState: { errors },
  } = form;
  const selectedInterviewer = watch('interviewer');

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900">
          Which kind of interviewer you like to practice?
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          Choose the type of interviewer that matches your target role.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {interviewers.map((interviewer) => (
          <InterviewerCard
            key={interviewer.id}
            interviewer={interviewer}
            isSelected={selectedInterviewer === interviewer.id}
            onSelect={() => setValue('interviewer', interviewer.id)}
          />
        ))}
      </div>

      {errors.interviewer && (
        <p className="text-sm text-red-600 text-center">
          {errors.interviewer.message}
        </p>
      )}
    </div>
  );
}
