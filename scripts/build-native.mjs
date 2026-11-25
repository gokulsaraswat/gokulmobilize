import { build } from 'astro';

/** App build (base '/', dist-native). Sets the flag in-process so `npm run build:native` works in any npm script shell (cmd on Windows). */
process.env.PUBLIC_HUB_NATIVE = 'true';
await build({});
