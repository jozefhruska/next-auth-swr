<p align="center">
  <h2 align="center">NextAuth.js SWR Client</h2>
  <p align="center">An SWR-powered alternative to NextAuth.js built-in client</p>
  <p align="center">
    <a aria-label="NPM version" href="https://www.npmjs.com/package/next-auth-swr">
      <img alt="npm version badge" src="https://badgen.net/npm/v/next-auth-swr">
    </a>
    <a aria-label="Package size" href="https://bundlephobia.com/package/next-auth-swr">
      <img alt="package size badge" src="https://badgen.net/bundlephobia/minzip/next-auth-swr">
    </a>
    <a aria-label="License" href="https://github.com/jozefhruska/next-auth-swr/blob/main/LICENSE">
      <img alt="license badge" src="https://badgen.net/npm/license/next-auth-swr">
    </a>
  </p>
</p>

## Overview

Inspired by [@next-auth/react-query](https://github.com/nextauthjs/react-query), `next-auth-swr` is an alternative client for `next-auth` powered by [SWR](https://github.com/vercel/swr). It works as a drop-in replacement for the standard `useSession` API and offers all the features of SWR we love so much ❤️️.

## Getting Started

```tsx
import { useSession } from 'next-auth-swr';

const Profile: React.FC = () => {
  const {
    data: session,
    error,
    isValidating,
    mutate,
  } = useSession({
    required: true,
    onUnauthenticated: () => {
      console.log('Who are you?');
    },
    config: {
      refreshInterval: 20000,
      dedupingInterval: 5000,
      // Other standard SWR options...
    },
  });

  if (error) return <div>Oops, something went wrong!</div>;

  if (!session && isValidating) return <div>Loading...</div>;

  if (!session) return <div>Hello, stranger!</div>;

  return <div>Hello, {session.user.name}!</div>;
};
```

> **Warning**  
> Ensure you import `useSession` from `next-auth-swr` and not the original `next-auth` package.

## Default session data

To configure the default session or SWR configuration globally, you can use the `SessionProvider`. All `useSession` hooks consuming the global context will use the default session as the fallback data.

```tsx
import { AppProps } from "next/app";
import { SWRConfig } from "swr";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <SessionProvider
    session={pageProps.session}
    config={{
      refreshInterval: 30000,
      refreshWhenHidden: false,
    }}
  >
    <Component {...pageProps} />
  </SessionProvider>
);

export default MyApp;
```

> **Note**  
> You can also use the standard `SWRConfig`, but remember this will affect all SWR hooks, not only the `useSession` hook.

## API Reference

### useSession

```ts
useSession(options?: UseSessionOptions): SWRResponse<Session | null>
```

#### Options

| Option              | Type               | Description                                                                                               |   Default   |
|:--------------------|:-------------------|:----------------------------------------------------------------------------------------------------------|:-----------:|
| `required`          | `boolean`          | Standard `next-auth` option ([See more](https://next-auth.js.org/getting-started/client#require-session)) |   `false`   |
| `onUnauthenticated` | `() => void`       | Standard `next-auth` option ([See more](https://next-auth.js.org/getting-started/client#require-session)) | `undefined` |
| `config`            | `SWRConfiguration` | Standard `swr` configuration ([See more](https://swr.vercel.app/docs/options))                            | `undefined` |

### SessionProvider

| Option              | Type               | Description                                                                                               |   Default   |
|:--------------------|:-------------------|:----------------------------------------------------------------------------------------------------------|:-----------:|
| `session`           | `Session`          | The default session (`useSession` fallback data)                                                          | `undefined` |
| `config`            | `SWRConfiguration` | Standard `swr` configuration ([See more](https://swr.vercel.app/docs/options))                            | `undefined` |

## License

MIT
