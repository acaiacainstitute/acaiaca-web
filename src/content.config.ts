import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const researchAreas = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/research-areas',
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    canonicalPath: z.string().regex(/^\/research\/[a-z0-9-]+\/$/),
    pageKind: z.literal('research-area'),
    publication: z.object({
      status: z.enum(['draft', 'review', 'published', 'archived']),
      visibility: z.enum(['public', 'private']),
      published: z.coerce.date().optional(),
      updated: z.coerce.date().optional(),
    }),
    research: z.object({
      maturityLabel: z.string(),
      currentAsOf: z.string().optional(),
    }),
    provenance: z.object({
      publicPresentationOf: z.string(),
      publicSources: z.array(z.string()).optional(),
    }),
  }),
});

export const collections = { researchAreas };
