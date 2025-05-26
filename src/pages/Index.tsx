
import React from 'react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import HomePage from '@/components/HomePage';

const Index = () => {
  return (
    <LanguageProvider>
      <HomePage />
    </LanguageProvider>
  );
};

export default Index;
