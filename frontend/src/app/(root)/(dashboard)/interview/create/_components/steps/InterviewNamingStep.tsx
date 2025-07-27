import type { UseFormReturn } from 'react-hook-form';
import type { FormData } from '../create-interview-form/MultiStepForm';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface InterviewNamingStepProps {
  form: UseFormReturn<FormData>;
}

export function InterviewNamingStep({ form }: InterviewNamingStepProps) {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <div className="space-y-6">
      <div>
        <Label
          htmlFor="interviewName"
          className="text-lg font-medium text-gray-900"
        >
          Name this Interview
        </Label>
        <p className="text-sm text-gray-600 mt-1">
          Give your interview session a memorable name for easy reference.
        </p>
      </div>

      <div className="space-y-2">
        <Input
          id="interviewName"
          placeholder="e.g., Frontend Developer at TechCorp"
          className="border-2 focus:border-blue-500 transition-colors"
          {...register('interviewName')}
        />
        {errors.interviewName && (
          <p className="text-sm text-red-600">{errors.interviewName.message}</p>
        )}
      </div>
    </div>
  );
}
