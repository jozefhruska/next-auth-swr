import React, { createContext, FC, ReactNode, useContext } from 'react';
import { Session } from 'next-auth';
import { UseSessionOptions as OriginalUseSessionOptions } from 'next-auth/react';
import useSWR, { SWRConfiguration, SWRResponse } from 'swr';

export type SessionContextValue = {
  session?: Session | null;
  config?: SWRConfiguration<Session | null>;
};

const SessionContext = createContext<SessionContextValue>({});

const fetcher = (url: string): Promise<Session | null> => {
  return fetch(url).then(async (response) => {
    const session = await response.json();

    if (Object.keys(session).length) {
      return session;
    }

    return null;
  });
};

export interface UseSessionOptions<R extends boolean>
  extends Partial<OriginalUseSessionOptions<R>> {
  config?: SWRConfiguration<Session | null>;
}

export const useSession = <R extends boolean>(
  options?: UseSessionOptions<R>
): SWRResponse<Session | null> => {
  const { session, config: globalConfig } = useContext(SessionContext);

  const {
    required,
    onUnauthenticated,
    config: localConfig,
  } = options ?? {};

  return useSWR<Session | null>('/api/auth/session', fetcher, {
    ...globalConfig,
    ...localConfig,
    fallbackData:
      localConfig?.fallbackData ?? session ?? globalConfig?.fallbackData,
    onSuccess: (data, key, config) => {
      if (typeof localConfig?.onSuccess === 'function') {
        localConfig.onSuccess(data, key, config);
      }

      if (required && !data) {
        return;
      }

      if (typeof onUnauthenticated === 'function') {
        onUnauthenticated();
      }
    },
    onError: (data, key, config) => {
      if (typeof localConfig?.onError === 'function') {
        localConfig.onError(data, key, config);
      }

      if (required && !data) {
        return;
      }

      if (typeof onUnauthenticated === 'function') {
        onUnauthenticated();
      }
    },
  });
};

export type SessionProviderProps = SessionContextValue & {
  children: ReactNode;
};

export const SessionProvider: FC<SessionProviderProps> = ({
  children,
  ...value
}) => (
  <SessionContext.Provider value={value}>
    {children}
  </SessionContext.Provider>
);
