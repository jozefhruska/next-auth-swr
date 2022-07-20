import { Session } from 'next-auth';
import { SWRConfiguration, SWRResponse } from 'swr';
import { UseSessionOptions as OriginalUseSessionOptions } from 'next-auth/react';
export interface UseSessionOptions<R extends boolean> extends Partial<OriginalUseSessionOptions<R>> {
    config?: SWRConfiguration<Session | null>;
}
export declare const useSession: <R extends boolean>(options?: UseSessionOptions<R> | undefined) => SWRResponse<Session | null>;
//# sourceMappingURL=index.d.ts.map