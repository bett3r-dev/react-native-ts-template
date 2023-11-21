import { useState, useContext, createContext, ReactNode } from 'react';

type Props = {children: ReactNode}
export type ErrorType =  { error?: string; message: string; } | null;
export type ErrorContextType = { error: ErrorType | undefined, setError: (value: ErrorType) => void}

export const errorContext = createContext<ErrorContextType | null>(null);


export const ProvideError = ({ children }: Props) => {
  const _error = useProvideError();
  return <errorContext.Provider value={_error}>{children}</errorContext.Provider>;
}

export default function useError() {
  return useContext(errorContext);
}

function useProvideError() {
    const [error, setError] = useState<ErrorType| null>()

  return {
    error,
    setError
  };
}