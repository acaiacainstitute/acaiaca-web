import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { absoluteUrl } from '../config/site';

const escapeXml = (value: string) =>
  value.replace(/[<>&'"]/g, (character) => {
    const entities: Record<string, string> = {
      '<': '&lt;',
      '>': '&gt;',
      '&': '&amp;',
      "'": '&apos;',
      '"': '&quot;',
    };

    return entities[character];
  });

export const GET: APIRoute = async () => {
  const researchAreas = await getCollection(
    'researchAreas',
    ({ data }) =>
      data.publication.visibility === 'public' &&
      data.publication.status === 'published',
  );
  const paths = ['/', '/research/', '/research/agenda/', '/research/current/', ...researchAreas.map(({ data }) => data.canonicalPath)];
  const urls = paths
    .map((path) => `  <url><loc>${escapeXml(absoluteUrl(path))}</loc></url>`)
    .join('\n');
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
