// @ts-check
import { defineConfig } from 'astro/config';
import { site } from './src/config/site.ts';

// https://astro.build/config
export default defineConfig({
  site: site.origin,
});
