export const site = {
  name: 'Acaiaca Institute',
  origin: 'https://acaiacainstitute.org',
  description:
    'Acaiaca Institute exists to understand, preserve, and amplify human judgment in an AI-augmented world.',
} as const;

export function absoluteUrl(path: string) {
  return new URL(path, site.origin).toString();
}
