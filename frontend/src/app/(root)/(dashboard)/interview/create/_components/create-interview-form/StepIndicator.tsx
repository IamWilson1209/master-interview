'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  return (
    <div className="flex justify-center items-center space-x-4">
      {Array.from({ length: totalSteps }, (_, index) => {
        const stepNumber = index + 1;
        const isCompleted = stepNumber < currentStep;
        const isCurrent = stepNumber === currentStep;

        return (
          <div key={stepNumber} className="flex items-center">
            <motion.div
              className={`
                relative w-12 h-12 rounded-full flex items-center justify-center font-semibold text-sm
                ${
                  isCompleted
                    ? 'bg-green-500 text-white'
                    : isCurrent
                    ? 'bg-gradient-to-r from-orange-400 to-yellow-400 text-white shadow-lg'
                    : 'bg-gray-200 text-gray-500'
                }
              `}
              initial={false}
              animate={{
                scale: isCurrent ? 1.1 : 1,
                boxShadow: isCurrent
                  ? '0 4px 20px rgba(251, 146, 60, 0.4)'
                  : 'none',
              }}
              transition={{ duration: 0.2 }}
            >
              {isCompleted ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <Check className="w-5 h-5" />
                </motion.div>
              ) : (
                stepNumber
              )}
            </motion.div>

            {stepNumber < totalSteps && (
              <div
                className={`
                  w-8 h-0.5 mx-2
                  ${stepNumber < currentStep ? 'bg-green-500' : 'bg-gray-200'}
                `}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
