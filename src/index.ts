import { Session } from 'next-auth';
import useSWR, { SWRConfiguration, SWRResponse } from 'swr';
import { UseSessionOptions as OriginalUseSessionOptions } from 'next-auth/react';

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
  const { required, onUnauthenticated, config: swrConfig } = options ?? {};

  return useSWR<Session | null>('/api/auth/session', fetcher, {
    ...swrConfig,
    onSuccess: (data, key, config) => {
      if (typeof swrConfig?.onSuccess === 'function') {
        swrConfig.onSuccess(data, key, config);
      }

      if (required && !data) {
        return;
      }

      if (typeof onUnauthenticated === 'function') {
        onUnauthenticated();
      }
    },
    onError: (data, key, config) => {
      if (typeof swrConfig?.onError === 'function') {
        swrConfig.onError(data, key, config);
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
