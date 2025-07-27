import type { UseFormReturn } from 'react-hook-form';
import type { FormData } from '../create-interview-form/MultiStepForm';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface JobDescriptionStepProps {
  form: UseFormReturn<FormData>;
}

export function JobDescriptionStep({ form }: JobDescriptionStepProps) {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <div className="space-y-6">
      <div>
        <Label
          htmlFor="jobDescription"
          className="text-lg font-medium text-gray-900"
        >
          Describe the job you want to apply.
        </Label>
        <p className="text-sm text-gray-600 mt-1">
          Provide details about the position, requirements, and company to get
          personalized interview questions.
        </p>
      </div>

      <div className="space-y-2">
        <Textarea
          id="jobDescription"
          placeholder="Copy and paste Job Description here"
          className="min-h-[200px] resize-none border-2 focus:border-blue-500 transition-colors"
          {...register('jobDescription')}
        />
        {errors.jobDescription && (
          <p className="text-sm text-red-600">
            {errors.jobDescription.message}
          </p>
        )}
      </div>
    </div>
  );
}
