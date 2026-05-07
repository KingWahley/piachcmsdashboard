'use client';

import { useEffect } from 'react';
import { useTheme } from '@/hooks/useTheme';

export default function ThemeProvider({ children }) {
  // This component just initializes the theme on mount
  useTheme(); 
  
  return <>{children}</>;
}
