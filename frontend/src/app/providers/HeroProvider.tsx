'use client';
import { ReactNode } from 'react';
import { HeroUIProvider } from '@heroui/react';

export const HeroProvider = ({ children }: { children: ReactNode }) => {
  return <HeroUIProvider>{children}</HeroUIProvider>;
};
