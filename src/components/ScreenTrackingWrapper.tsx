// src/components/ScreenTrackingWrapper.tsx
import React from 'react';
import { usePosthogScreenTracking } from '../hooks/usePosthogScreenTracking';

export const ScreenTrackingWrapper = ({ children }: { children: React.ReactNode }) => {
  usePosthogScreenTracking();
  return <>{children}</>;
};
