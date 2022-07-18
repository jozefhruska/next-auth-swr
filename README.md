<p align="center">
  <h2 align="center">NextAuth.js SWR Client</h2>
  <p align="center">next-auth-swr</p>
  <p align="center">An SWR-powered alternative to NextAuth.js built-in client</p>
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

## License

MIT
