// eslint-disable-next-line @typescript-eslint/no-var-requires
const esbuild = require('esbuild');

esbuild
  .build({
    entryPoints: ['./src/index.tsx'],
    bundle: true,
    minify: true,
    sourcemap: true,
    format: 'esm',
    external: ['react', 'react-dom', 'swr'],
    outfile: './dist/index.mjs',
  })
  .catch(() => process.exit(1));

esbuild
  .build({
    entryPoints: ['./src/index.tsx'],
    bundle: true,
    minify: true,
    format: 'cjs',
    external: ['react', 'react-dom', 'swr'],
    outfile: './dist/index.cjs',
  })
  .catch(() => process.exit(1));
