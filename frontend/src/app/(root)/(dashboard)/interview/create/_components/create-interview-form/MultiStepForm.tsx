'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { z } from 'zod';

import { FormHeader } from './FormHeader';
import { FormNavigation } from './FormNavigation';
import { InterviewNamingStep } from '../steps/InterviewNamingStep';
import { JobDescriptionStep } from '../steps/JobDescriptionStep';
import { ResumeUploadStep } from '../steps/ResumeUploadStep';
import { InterviewerSelectionStep } from '../steps/InterviewerSelectionStep';
import { StepIndicator } from './StepIndicator';

const formSchema = z.object({
  jobDescription: z
    .string()
    .min(10, 'Job description must be at least 10 characters'),
  resume: z.instanceof(File).optional(),
  interviewer: z.string().min(1, 'Please select an interviewer'),
  interviewName: z.string().min(1, 'Interview name is required'),
});

export type FormData = z.infer<typeof formSchema>;

const steps = [
  { id: 1, title: 'Job Description' },
  { id: 2, title: 'Resume Upload' },
  { id: 3, title: 'Interviewer Selection' },
  { id: 4, title: 'Interview Naming' },
];

export function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(0);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jobDescription: '',
      resume: undefined,
      interviewer: '',
      interviewName: '',
    },
  });

  const nextStep = async () => {
    const fieldsToValidate = getFieldsForStep(currentStep);
    const isValid = await form.trigger(fieldsToValidate);

    if (isValid && currentStep < steps.length) {
      setDirection(1);
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setDirection(-1);
      setCurrentStep(currentStep - 1);
    }
  };

  const getFieldsForStep = (step: number): (keyof FormData)[] => {
    switch (step) {
      case 1:
        return ['jobDescription'];
      case 2:
        return ['resume'];
      case 3:
        return ['interviewer'];
      case 4:
        return ['interviewName'];
      default:
        return [];
    }
  };

  const onSubmit = (data: FormData) => {
    console.log('Form submitted:', data);
    // Handle form submission
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <JobDescriptionStep form={form} />;
      case 2:
        return <ResumeUploadStep form={form} />;
      case 3:
        return <InterviewerSelectionStep form={form} />;
      case 4:
        return <InterviewNamingStep form={form} />;
      default:
        return null;
    }
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <FormHeader />

        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Answer the following questions to set up your interview profile
            </h2>
            <p className="text-gray-600">
              Step {currentStep} of {steps.length}:{' '}
              {steps[currentStep - 1].title}
            </p>
          </div>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="relative h-96 overflow-hidden">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={currentStep}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: 'spring', stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 },
                  }}
                  className="absolute inset-0"
                >
                  {renderStep()}
                </motion.div>
              </AnimatePresence>
            </div>

            <StepIndicator
              currentStep={currentStep}
              totalSteps={steps.length}
            />

            <FormNavigation
              currentStep={currentStep}
              totalSteps={steps.length}
              onNext={nextStep}
              onPrev={prevStep}
              isLoading={form.formState.isSubmitting}
            />
          </form>
        </div>
      </div>
    </div>
  );
}
