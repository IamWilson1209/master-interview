'use client';

import { useCallback, useState } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import { Upload, File, X } from 'lucide-react';
import type { FormData } from './MultiStepForm';
import { Button } from '@/components/ui/button';

interface FileUploadProps {
  form: UseFormReturn<FormData>;
}

export function FileUpload({ form }: FileUploadProps) {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const { setValue } = form;

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        setUploadedFile(file);
        setValue('resume', file);
      }
    },
    [setValue]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        ['.docx'],
    },
    maxFiles: 1,
  });

  const removeFile = () => {
    setUploadedFile(null);
    setValue('resume', undefined);
  };

  if (uploadedFile) {
    return (
      <div className="border-2 border-dashed border-green-300 bg-green-50 rounded-lg p-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <File className="w-8 h-8 text-green-600" />
            <div>
              <p className="font-medium text-green-900">{uploadedFile.name}</p>
              <p className="text-sm text-green-600">
                {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={removeFile}
            className="text-green-600 hover:text-green-700 hover:bg-green-100"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      {...getRootProps()}
      className={`
        border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
        ${
          isDragActive
            ? 'border-blue-400 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
        }
      `}
    >
      <input {...getInputProps()} />
      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
      <p className="text-lg font-medium text-gray-900 mb-2">
        {isDragActive ? 'Drop your resume here' : 'Upload your resume'}
      </p>
      <p className="text-sm text-gray-600 mb-4">
        Drag and drop your file here, or click to browse
      </p>
      <p className="text-xs text-gray-500">
        Supports PDF, DOC, DOCX files up to 10MB
      </p>
    </div>
  );
}
