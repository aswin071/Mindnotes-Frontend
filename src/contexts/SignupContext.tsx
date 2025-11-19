/**
 * Signup Context
 * Manages signup form data across onboarding screens
 */

import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface SignupData {
  email: string;
  password: string;
  full_name: string;
  dob: string;
  gender: string;
  profession: string;
}

interface SignupContextType {
  signupData: Partial<SignupData>;
  updateSignupData: (data: Partial<SignupData>) => void;
  clearSignupData: () => void;
}

const SignupContext = createContext<SignupContextType | undefined>(undefined);

export function SignupProvider({ children }: { children: ReactNode }) {
  const [signupData, setSignupData] = useState<Partial<SignupData>>({});

  const updateSignupData = (data: Partial<SignupData>) => {
    setSignupData((prev) => ({ ...prev, ...data }));
  };

  const clearSignupData = () => {
    setSignupData({});
  };

  return (
    <SignupContext.Provider
      value={{ signupData, updateSignupData, clearSignupData }}
    >
      {children}
    </SignupContext.Provider>
  );
}

export function useSignup() {
  const context = useContext(SignupContext);
  if (context === undefined) {
    throw new Error('useSignup must be used within a SignupProvider');
  }
  return context;
}
