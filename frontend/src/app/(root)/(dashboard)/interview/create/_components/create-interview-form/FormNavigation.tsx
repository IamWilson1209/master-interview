'use client';

import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface FormNavigationProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrev: () => void;
  isLoading?: boolean;
}

export function FormNavigation({
  currentStep,
  totalSteps,
  onNext,
  onPrev,
  isLoading = false,
}: FormNavigationProps) {
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === totalSteps;

  return (
    <div className="flex justify-between items-center pt-6">
      <Button
        type="button"
        variant="outline"
        onClick={onPrev}
        disabled={isFirstStep}
        className="flex items-center space-x-2 bg-transparent"
      >
        <ChevronLeft className="w-4 h-4" />
        <span>Previous</span>
      </Button>

      <Button
        type={isLastStep ? 'submit' : 'button'}
        onClick={isLastStep ? undefined : onNext}
        disabled={isLoading}
        className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
      >
        <span>{isLastStep ? 'Complete' : 'Next'}</span>
        {!isLastStep && <ChevronRight className="w-4 h-4" />}
      </Button>
    </div>
  );
}
