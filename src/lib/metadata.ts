import { absoluteUrl, site } from '../config/site';

interface WebPageMetadata {
  title: string;
  description: string;
  canonicalPath: string;
}

export function webPageStructuredData(metadata: WebPageMetadata) {
  const url = absoluteUrl(metadata.canonicalPath);

  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: metadata.title,
    description: metadata.description,
    url,
    isPartOf: {
      '@type': 'WebSite',
      name: site.name,
      url: absoluteUrl('/'),
    },
    publisher: {
      '@type': 'Organization',
      name: site.name,
      url: absoluteUrl('/'),
    },
  };
}
