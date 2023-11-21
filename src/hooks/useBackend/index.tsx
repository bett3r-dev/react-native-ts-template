import { useState, useContext, createContext, ReactNode, useEffect } from 'react';
// import { create as createBackend } from '@bett3r-dev/****-client-library'; //TODO:

type CreateBackendPropsType = { baseUrl: string};
const createBackend = ({baseUrl}:CreateBackendPropsType) => { };

type Props = {children: ReactNode}
export type BackendType = any;
export type BackendContextType = { backend: any, setBackend: ( value: BackendType ) => void}

export const backendContext = createContext<BackendContextType | null>( null );


export function ProvideBackend({ children }: Props ) {
  const _backend = useProvideBackend();
  return <backendContext.Provider value={_backend}>{children}</backendContext.Provider>;
}

export default function useBackend() {
  return useContext( backendContext );
}

function useProvideBackend() {
  const [ backend, setBackend ] = useState<ReturnType<typeof createBackend> | null>();

  useEffect(() => {
    setBackend( createBackend({ baseUrl:'http://localhost:1984' }));
    // return () => {
    //   backend.close();
    // };
  },[]);
  return {
    backend,
    setBackend
  };
}
