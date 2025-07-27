import type { UseFormReturn } from 'react-hook-form';
import type { FormData } from '../create-interview-form/MultiStepForm';
import { FileUpload } from '../create-interview-form/FileUpload';

interface ResumeUploadStepProps {
  form: UseFormReturn<FormData>;
}

export function ResumeUploadStep({ form }: ResumeUploadStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900">
          Upload your resume.
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          Upload your resume to get personalized questions based on your
          experience.
        </p>
      </div>

      <FileUpload form={form} />
    </div>
  );
}
